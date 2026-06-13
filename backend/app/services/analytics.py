import re
import pandas as pd
import emoji
from collections import Counter
from typing import List, Dict, Any

# Regex to detect links
URL_PATTERN = re.compile(r'https?://[^\s]+')

# Media attachment tokens commonly used by WhatsApp
MEDIA_INDICATORS = ["<media omitted>", "image omitted", "video omitted", "sticker omitted", "audio omitted", "document omitted"]

def analyze_chat_dataframe(parsed_messages: List[Dict[str, Any]]) -> Dict[str, Any]:
    if not parsed_messages:
        return {
            "total_messages": 0,
            "total_words": 0,
            "media_shared": 0,
            "links_shared": 0,
            "active_users": [],
            "emoji_analysis": [],
            "monthly_timeline": [],
            "daily_activity": []
        }
        
    df = pd.DataFrame(parsed_messages)
    
    # 1. Total statistics
    total_messages = len(df)
    
    # Word count estimation
    df['word_count'] = df['message'].apply(lambda x: len(str(x).split()))
    total_words = int(df['word_count'].sum())
    
    # Media shared check
    df['is_media'] = df['message'].apply(
        lambda x: any(indicator in str(x).lower() for indicator in MEDIA_INDICATORS)
    )
    media_shared = int(df['is_media'].sum())
    
    # Links shared count
    df['link_count'] = df['message'].apply(lambda x: len(URL_PATTERN.findall(str(x))))
    links_shared = int(df['link_count'].sum())
    
    # 2. Monthly Timeline
    # We parse date (format MM/DD/YY or similar)
    df['datetime'] = pd.to_datetime(df['date'], errors='coerce')
    df['month_year'] = df['datetime'].dt.strftime('%b %Y') # e.g. "Jun 2026"
    
    # Drop rows with invalid date formatting if any
    timeline_df = df.dropna(subset=['month_year'])
    monthly_counts = timeline_df.groupby('month_year').size().reset_index(name='message_count')
    # Re-sort using actual datetime index
    timeline_df['month_period'] = timeline_df['datetime'].dt.to_period('M')
    monthly_sorted = timeline_df.groupby(['month_period', 'month_year']).size().reset_index(name='message_count')
    monthly_timeline = monthly_sorted[['month_year', 'message_count']].to_dict(orient='records')
    
    # 3. Daily Activity
    df['day_name'] = df['datetime'].dt.strftime('%a') # "Mon", "Tue"...
    daily_sorted = df.dropna(subset=['day_name'])
    day_order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    daily_counts = daily_sorted.groupby('day_name').size().reindex(day_order, fill_value=0).reset_index(name='message_count')
    daily_activity = daily_counts.rename(columns={"day_name": "name"}).to_dict(orient='records')
    
    # 4. Most Active Users
    user_counts = df.groupby('sender').agg(
        message_count=('message', 'size'),
        word_count=('word_count', 'sum')
    ).reset_index()
    user_counts = user_counts.sort_values(by='message_count', ascending=False).head(10)
    active_users = user_counts.rename(columns={"sender": "sender_name"}).to_dict(orient='records')
    
    # 5. Emoji Analysis
    all_text = " ".join(df['message'].astype(str))
    emojis_found = [c for c in all_text if emoji.is_emoji(c)]
    emoji_counts = Counter(emojis_found).most_common(10)
    emoji_analysis = [{"emoji": e, "count": cnt} for e, cnt in emoji_counts]
    
    return {
        "total_messages": total_messages,
        "total_words": total_words,
        "media_shared": media_shared,
        "links_shared": links_shared,
        "active_users": active_users,
        "emoji_analysis": emoji_analysis,
        "monthly_timeline": monthly_timeline,
        "daily_activity": daily_activity
    }
