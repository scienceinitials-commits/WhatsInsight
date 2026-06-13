import os
import json
import logging
import google.generativeai as genai
from typing import Dict, Any

# Configure local logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Fetch Gemini API Key from environment
API_KEY = os.getenv("GEMINI_API_KEY", "")

if API_KEY:
    genai.configure(api_key=API_KEY)
else:
    logger.warning("GEMINI_API_KEY environment variable is not defined. Please set it before running queries.")

def analyze_chat_with_gemini(chat_text: str, max_chars: int = 50000) -> Dict[str, Any]:
    """
    Sends the WhatsApp chat transcript (truncated to fits token limits if necessary) 
    to Gemini to extract structured NLP analytics.
    
    Returns a dictionary matching the requested schema.
    """
    if not API_KEY:
        raise ValueError("GEMINI_API_KEY is not set. Please set the environment variable.")
        
    # Truncate text sample if it exceeds character limits to optimize cost and performance
    sample_text = chat_text
    if len(chat_text) > max_chars:
        logger.info(f"Chat length ({len(chat_text)} chars) exceeds limit. Truncating to first {max_chars} chars.")
        sample_text = chat_text[:max_chars]

    # Structured system instructions and prompt
    prompt = f"""
    You are an expert NLP data scientist and behavioral psychologist. Analyze the following WhatsApp chat transcript.
    
    You must extract and return your analysis strictly as a JSON object with the following key-value structure:
    {{
        "summary": "A concise paragraph summarizing what the chat is about, the main theme, and the overall vibe.",
        "topics": ["list", "of", "top", "4", "topics", "discussed"],
        "language_detected": "The primary language spoken in the conversation",
        "toxicity_score": <float between 0.0 and 1.0 where 1.0 is extremely toxic, hostile, or abusive>,
        "relationship_score": [
            {{
                "pair": "Sender A ↔ Sender B",
                "score": <integer from 1 to 100 representing positive connection health>,
                "status": "A short status descriptor (e.g., 'Highly Collaborative', 'Warm', 'Tense', 'Distant')"
            }}
        ]
    }}

    Chat Transcript Sample:
    ---
    {sample_text}
    ---
    """

    try:
        # Utilizing gemini-1.5-flash for rapid JSON-based extraction tasks
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        
        # Parse the JSON response directly
        parsed_json = json.loads(response.text)
        return parsed_json
        
    except Exception as e:
        logger.error(f"Error executing Gemini prompt analysis: {str(e)}")
        # Return fallback error layout
        return {
            "summary": "Error parsing chat content through Gemini API.",
            "topics": ["Error Processing"],
            "language_detected": "Unknown",
            "toxicity_score": 0.0,
            "relationship_score": []
        }

if __name__ == "__main__":
    # Example execution details:
    # try:
    #     with open("my_chat.txt", "r", encoding="utf-8") as f:
    #         chat_data = f.read()
    #     result = analyze_chat_with_gemini(chat_data)
    #     print(json.dumps(result, indent=2))
    # except Exception as err:
    #     print(f"Failed to run analysis: {err}")
    pass
