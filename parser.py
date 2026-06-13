import re
import emoji
import pandas as pd
from datetime import datetime
from typing import List, Dict, Any

# Regex to capture URL links
URL_PATTERN = re.compile(r'https?://[^\s]+')

# Media placeholders commonly injected by WhatsApp
MEDIA_INDICATORS = [
    "<media omitted>", "image omitted", "video omitted", 
    "sticker omitted", "audio omitted", "document omitted",
    "attached"
]

# Supported Datetime patterns
# Android: "12/31/22, 14:30 - Sender: Message" or "12/31/22, 2:30 PM - Sender: Message"
# iOS: "[12/31/22, 14:30:52] Sender: Message" or "[12/31/22, 2:30:52 PM] Sender: Message"
android_regex = re.compile(r'^(\d{1,2}/\d{1,2}/\d{2,4}),\s*(\d{1,2}:\d{2}(?:\s*[APap][Mm])?)\s*-\s*([^:]+):\s*(.*)$')
ios_regex = re.compile(r'^\[?(\d{1,2}/\d{1,2}/\d{2,4}),\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[APap][Mm])?)\]?\s*([^:]+):\s*(.*)$')

def try_parse_timestamp(date_str: str, time_str: str) -> datetime | None:
    """
    Attempts to parse date and time strings into a datetime object.
    Supports 12-hour (with AM/PM) and 24-hour formats.
    """
    # Clean padding and standardise spaces
    time_str = re.sub(r'\s+', ' ', time_str.strip())
    date_str = date_str.strip()
    
    # Unified full string
    full_str = f"{date_str} {time_str}"
    
    # Try different format combinations
    formats = [
        # 12-hour patterns
        "%m/%d/%y %I:%M %p", "%d/%m/%y %I:%M %p",
        "%m/%d/%Y %I:%M %p", "%d/%m/%Y %I:%M %p",
        "%m/%d/%y %I:%M:%S %p", "%d/%m/%y %I:%M:%S %p",
        "%m/%d/%Y %I:%M:%S %p", "%d/%m/%Y %I:%M:%S %p",
        # 24-hour patterns
        "%m/%d/%y %H:%M", "%d/%m/%y %H:%M",
        "%m/%d/%Y %H:%M", "%d/%m/%Y %H:%M",
        "%m/%d/%y %H:%M:%S", "%d/%m/%y %H:%M:%S",
        "%m/%d/%Y %H:%M:%S", "%d/%m/%Y %H:%M:%S"
    ]
    
    for fmt in formats:
        try:
            return datetime.strptime(full_str, fmt)
        except ValueError:
            continue
            
    # Fallback to date parsing without time if failed
    try:
        return datetime.strptime(date_str, "%m/%d/%y")
    except ValueError:
        return None

def parse_whatsapp_txt(file_path: str) -> pd.DataFrame:
    """
    Reads a WhatsApp exported .txt chat log, parses line metadata,
    extracts details (emojis, URLs, media tags), and returns a Pandas DataFrame.
    """
    parsed_records = []
    current_record = None

    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue

            # Try Android matching
            match = android_regex.match(line)
            if not match:
                # Try iOS matching
                match = ios_regex.match(line)

            if match:
                # If there's an existing accumulated message, save it
                if current_record:
                    parsed_records.append(current_record)

                date_val, time_val, sender, message_text = match.groups()
                timestamp = try_parse_timestamp(date_val, time_val)

                current_record = {
                    "timestamp": timestamp,
                    "sender": sender.strip(),
                    "message": message_text.strip()
                }
            else:
                # Handle multi-line message logs
                if current_record:
                    current_record["message"] += "\n" + line
                else:
                    # Ignore lines before the first parsed message (system headers)
                    continue

        # Append final record
        if current_record:
            parsed_records.append(current_record)

    # Perform detailed extraction on each parsed record
    for record in parsed_records:
        msg = record["message"]
        
        # 1. Extract links
        links = URL_PATTERN.findall(msg)
        record["links"] = links
        
        # 2. Identify media omitted strings
        is_media = any(indicator in msg.lower() for indicator in MEDIA_INDICATORS)
        record["is_media"] = is_media
        
        # 3. Extract Emojis
        emojis = [c for c in msg if emoji.is_emoji(c)]
        record["emojis"] = emojis

    # Convert to DataFrame
    df = pd.DataFrame(parsed_records)
    
    # Fill defaults if file was empty
    if df.empty:
        return pd.DataFrame(columns=["timestamp", "sender", "message", "links", "is_media", "emojis"])
        
    return df

# Example Usage
if __name__ == "__main__":
    # Example execution:
    # df = parse_whatsapp_txt("chat_log.txt")
    # print(df.head())
    pass
