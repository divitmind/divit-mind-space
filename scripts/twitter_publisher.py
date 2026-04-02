#!/usr/bin/env python3
"""
Twitter/X Publisher for divit-mind-space

Posts tweets using Twitter API v2 with OAuth 1.0a authentication.
"""

import json
import os
from pathlib import Path
from requests_oauthlib import OAuth1Session

# Load config
CONFIG_PATH = Path(__file__).parent.parent / "config" / "twitter_config.json"

def load_config():
    """Load Twitter API credentials from config file."""
    with open(CONFIG_PATH) as f:
        return json.load(f)

def post_tweet(text: str, reply_to: str = None) -> dict:
    """
    Post a tweet to Twitter/X.

    Args:
        text: Tweet content (max 280 characters)
        reply_to: Optional tweet ID to reply to

    Returns:
        API response with tweet data
    """
    config = load_config()

    # Create OAuth1 session
    oauth = OAuth1Session(
        config["X_API_KEY"],
        client_secret=config["X_API_SECRET"],
        resource_owner_key=config["X_ACCESS_TOKEN"],
        resource_owner_secret=config["X_ACCESS_TOKEN_SECRET"],
    )

    # Twitter API v2 endpoint
    url = "https://api.twitter.com/2/tweets"

    # Build payload
    payload = {"text": text}

    if reply_to:
        payload["reply"] = {"in_reply_to_tweet_id": reply_to}

    # Post tweet
    response = oauth.post(url, json=payload)

    if response.status_code == 201:
        data = response.json()
        return {
            "success": True,
            "tweet_id": data["data"]["id"],
            "text": data["data"]["text"]
        }
    else:
        return {
            "success": False,
            "status_code": response.status_code,
            "error": response.text
        }

def post_thread(tweets: list) -> list:
    """
    Post a thread of tweets.

    Args:
        tweets: List of tweet texts

    Returns:
        List of results for each tweet
    """
    results = []
    previous_id = None

    for tweet_text in tweets:
        result = post_tweet(tweet_text, reply_to=previous_id)
        results.append(result)

        if result["success"]:
            previous_id = result["tweet_id"]
        else:
            break  # Stop thread if any tweet fails

    return results

def verify_credentials() -> dict:
    """Verify Twitter credentials are working."""
    config = load_config()

    oauth = OAuth1Session(
        config["X_API_KEY"],
        client_secret=config["X_API_SECRET"],
        resource_owner_key=config["X_ACCESS_TOKEN"],
        resource_owner_secret=config["X_ACCESS_TOKEN_SECRET"],
    )

    # Get authenticated user info
    url = "https://api.twitter.com/2/users/me"
    response = oauth.get(url)

    if response.status_code == 200:
        data = response.json()
        return {
            "success": True,
            "user_id": data["data"]["id"],
            "username": data["data"]["username"],
            "name": data["data"]["name"]
        }
    else:
        return {
            "success": False,
            "status_code": response.status_code,
            "error": response.text
        }


if __name__ == "__main__":
    print("Testing Twitter credentials...")
    result = verify_credentials()

    if result["success"]:
        print(f"SUCCESS! Connected as @{result['username']} ({result['name']})")
    else:
        print(f"FAILED: {result.get('error', 'Unknown error')}")
        print(f"Status code: {result.get('status_code', 'N/A')}")
