#!/usr/bin/env python3
"""
Test Gemini Image Generation API
"""

import requests
import base64
import json
from pathlib import Path

GEMINI_API_KEY = "AIzaSyAu56Ch7YYtKJA4a_K7tAOQMBDJcIqE0ec"

def generate_image(prompt: str, output_path: str = None) -> dict:
    """
    Generate an image using Gemini 2.5 Flash Image model.

    Args:
        prompt: Description of image to generate
        output_path: Optional path to save the image

    Returns:
        dict with success status and image data
    """

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key={GEMINI_API_KEY}"

    payload = {
        "contents": [{
            "parts": [{"text": f"Generate an image: {prompt}"}]
        }],
        "generationConfig": {
            "responseModalities": ["IMAGE"]
        }
    }

    headers = {"Content-Type": "application/json"}

    print(f"Generating image for: {prompt}")

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        data = response.json()

        # Extract image from response
        if "candidates" in data and len(data["candidates"]) > 0:
            parts = data["candidates"][0].get("content", {}).get("parts", [])

            for part in parts:
                if "inlineData" in part:
                    image_data = part["inlineData"]["data"]
                    mime_type = part["inlineData"]["mimeType"]

                    # Save image if path provided
                    if output_path:
                        image_bytes = base64.b64decode(image_data)
                        with open(output_path, "wb") as f:
                            f.write(image_bytes)
                        print(f"Image saved to: {output_path}")

                    return {
                        "success": True,
                        "mime_type": mime_type,
                        "image_data": image_data,
                        "saved_to": output_path
                    }

        return {
            "success": False,
            "error": "No image in response",
            "raw_response": data
        }

    elif response.status_code == 429:
        return {
            "success": False,
            "error": "Rate limited - wait 60 seconds and try again",
            "status_code": 429
        }

    else:
        return {
            "success": False,
            "error": response.text,
            "status_code": response.status_code
        }


def test_image_generation():
    """Test the image generation with a sample prompt."""

    # Test prompt relevant to divit mind space
    prompt = "A warm, calming therapy room for children with soft natural lighting, comfortable seating, colorful but not overwhelming decor, and a sense of safety and comfort. Professional healthcare setting."

    output_dir = Path(__file__).parent.parent / "data" / "generated_images"
    output_dir.mkdir(exist_ok=True)

    output_path = output_dir / "test_therapy_room.png"

    result = generate_image(prompt, str(output_path))

    print("\n" + "="*50)
    print("RESULT:")
    print("="*50)

    if result["success"]:
        print(f"SUCCESS! Image generated")
        print(f"  MIME type: {result['mime_type']}")
        print(f"  Saved to: {result['saved_to']}")
    else:
        print(f"FAILED: {result.get('error', 'Unknown error')}")
        if "raw_response" in result:
            print(f"  Response: {json.dumps(result['raw_response'], indent=2)[:500]}")

    return result


if __name__ == "__main__":
    test_image_generation()
