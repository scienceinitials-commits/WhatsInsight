import re
from datetime import datetime
from typing import List, Dict, Any

# Pattern matching Android style: "12/31/25, 12:34 PM - Sender: Message"
# Or iOS style: "[12/31/25, 12:34:56 PM] Sender: Message"
pattern_android = re.compile(r'^(\d{1,2}/\d{1,2}/\d{2,4}),\s*(\d{1,2}:\d{2}\s*[APap][Mm])\s*-\s*([^:]+):\s*(.*)$')
pattern_ios = re.compile(r'^\[?(\d{1,2}/\d{1,2}/\d{2,4}),\s*(\d{1,2}:\d{2}:\d{2}\s*[APap][Mm])\]?\s*([^:]+):\s*(.*)$')

def parse_whatsapp_line(line: str) -> Dict[str, Any] | None:
    # Try Android pattern
    match = pattern_android.match(line)
    if match:
        date_str, time_str, sender, msg = match.groups()
        return {
            "date": date_str,
            "time": time_str,
            "sender": sender.strip(),
            "message": msg.strip()
        }
    
    # Try iOS pattern
    match = pattern_ios.match(line)
    if match:
        date_str, time_str, sender, msg = match.groups()
        return {
            "date": date_str,
            "time": time_str,
            "sender": sender.strip(),
            "message": msg.strip()
        }
    
    return None

def parse_chat_file(file_content: str) -> List[Dict[str, Any]]:
    parsed_messages = []
    lines = file_content.splitlines()
    
    current_message = None
    
    for line in lines:
        if not line.strip():
            continue
            
        parsed = parse_whatsapp_line(line)
        if parsed:
            if current_message:
                parsed_messages.append(current_message)
            current_message = parsed
        else:
            # Multi-line message handler: append text to previous message body
            if current_message:
                current_message["message"] += "\n" + line.strip()
            else:
                # Discard orphan metadata line before first message
                continue
                
    if current_message:
        parsed_messages.append(current_message)
        
    return parsed_messages
