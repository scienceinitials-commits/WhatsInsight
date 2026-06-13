import json
import re
import pandas as pd
from collections import Counter
from typing import Dict, Any, List

# Basic English stopwords to filter out from Word Cloud Data
STOPWORDS = set([
    "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", 
    "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", 
    "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", 
    "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", 
    "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", 
    "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", 
    "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", 
    "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", 
    "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", 
    "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", 
    "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", 
    "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now", "d", 
    "ll", "m", "o", "re", "ve", "y", "omitted", "media", "message", "deleted"
])

def get_total_messages(df: pd.DataFrame) -> int:
    return int(len(df))

def get_total_words(df: pd.DataFrame) -> int:
    if df.empty:
        return 0
    return int(df['message'].apply(lambda x: len(str(x).split())).sum())

def get_media_count(df: pd.DataFrame) -> int:
    if df.empty or 'is_media' not in df.columns:
        return 0
    return int(df['is_media'].sum())

def get_links_count(df: pd.DataFrame) -> int:
    if df.empty or 'links' not in df.columns:
        return 0
    return int(df['links'].apply(len).sum())

def get_monthly_timeline(df: pd.DataFrame) -> List[Dict[str, Any]]:
    if df.empty or 'timestamp' not in df.columns:
        return []
    
    # Copy to avoid side-effects on original dataframe
    temp_df = df.dropna(subset=['timestamp']).copy()
    if temp_df.empty:
        return []
        
    temp_df['month_period'] = temp_df['timestamp'].dt.to_period('M')
    temp_df['month_year'] = temp_df['timestamp'].dt.strftime('%b %Y')
    
    monthly_sorted = temp_df.groupby(['month_period', 'month_year']).size().reset_index(name='message_count')
    return monthly_sorted[['month_year', 'message_count']].to_dict(orient='records')

def get_daily_activity(df: pd.DataFrame) -> List[Dict[str, Any]]:
    if df.empty or 'timestamp' not in df.columns:
        return []
        
    temp_df = df.dropna(subset=['timestamp']).copy()
    if temp_df.empty:
        return []
        
    temp_df['day_name'] = temp_df['timestamp'].dt.strftime('%a')
    day_order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    
    daily_counts = temp_df.groupby('day_name').size().reindex(day_order, fill_value=0).reset_index(name='message_count')
    return daily_counts.rename(columns={"day_name": "name"}).to_dict(orient='records')

def get_most_active_users(df: pd.DataFrame) -> List[Dict[str, Any]]:
    if df.empty or 'sender' not in df.columns:
        return []
        
    # Estimate word count if not present
    temp_df = df.copy()
    temp_df['word_count'] = temp_df['message'].apply(lambda x: len(str(x).split()))
    
    user_counts = temp_df.groupby('sender').agg(
        message_count=('message', 'size'),
        word_count=('word_count', 'sum')
    ).reset_index()
    
    user_sorted = user_counts.sort_values(by='message_count', ascending=False).head(10)
    return user_sorted.rename(columns={"sender": "sender_name"}).to_dict(orient='records')

def get_word_cloud_data(df: pd.DataFrame, limit: int = 50) -> List[Dict[str, Any]]:
    if df.empty:
        return []
        
    # Join messages, strip non-alphabetic chars and convert to lowercase
    all_text = " ".join(df['message'].astype(str)).lower()
    words = re.findall(r'\b[a-zA-Z]{3,}\b', all_text)
    
    # Filter stopwords
    filtered_words = [w for w in words if w not in STOPWORDS]
    
    counts = Counter(filtered_words).most_common(limit)
    return [{"text": word, "value": count} for word, count in counts]

def get_emoji_frequency(df: pd.DataFrame) -> List[Dict[str, Any]]:
    if df.empty or 'emojis' not in df.columns:
        return []
        
    all_emojis = []
    for emoji_list in df['emojis']:
        all_emojis.extend(emoji_list)
        
    counts = Counter(all_emojis).most_common(10)
    return [{"emoji": emo, "count": count} for emo, count in counts]

def generate_full_analysis_json(df: pd.DataFrame) -> str:
    """
    Runs all analytics functions on the dataframe and returns a formatted JSON string.
    """
    analysis_report = {
        "summary": {
            "total_messages": get_total_messages(df),
            "total_words": get_total_words(df),
            "media_count": get_media_count(df),
            "links_count": get_links_count(df)
        },
        "monthly_timeline": get_monthly_timeline(df),
        "daily_activity": get_daily_activity(df),
        "most_active_users": get_most_active_users(df),
        "word_cloud": get_word_cloud_data(df),
        "emoji_frequency": get_emoji_frequency(df)
    }
    
    return json.dumps(analysis_report, indent=2, ensure_ascii=False)
