#!/usr/bin/env python3
"""
Image Generator for divit mind space

Uses Pollinations.ai (free, no API key required) to generate images.
Can be used for blog posts, social media, and other website content.
"""

import os
import re
import time
import urllib.parse
import requests
from pathlib import Path
from datetime import datetime

# Paths
BASE_DIR = Path(__file__).parent.parent
IMAGES_DIR = BASE_DIR / "data" / "generated_images"
IMAGES_DIR.mkdir(parents=True, exist_ok=True)

# Pollinations.ai config
POLLINATIONS_BASE_URL = "https://image.pollinations.ai/prompt"

# Default image settings for divit mind space
DEFAULT_WIDTH = 1200
DEFAULT_HEIGHT = 630  # Good for blog hero images and social sharing
DEFAULT_SEED = None   # Random each time, or set for consistency


def generate_image_prompt(topic: str, category: str) -> str:
    """
    Generate an appropriate image prompt based on blog topic and category.

    Creates prompts that produce warm, professional, therapy-appropriate images.
    """

    # Category-specific style guides
    style_guides = {
        "clinical": "professional healthcare setting, clinical but warm, soft lighting, calming colors",
        "parenting": "warm family environment, supportive atmosphere, gentle colors, nurturing feeling",
        "education": "bright learning environment, organized classroom, engaging and supportive, colorful but calm",
        "adult": "professional office setting, modern and calm, adult-focused, serene atmosphere",
        "stories": "hopeful and warm scene, family connection, progress and growth, soft natural lighting",
        "school": "school setting, supportive classroom, inclusive environment, bright and organized"
    }

    style = style_guides.get(category, style_guides["clinical"])

    # Extract key themes from topic
    topic_lower = topic.lower()

    # Theme-specific imagery
    if "adhd" in topic_lower:
        theme = "child focusing on activity, calm environment, organized space"
    elif "autism" in topic_lower:
        theme = "child in sensory-friendly room, comfortable setting, gentle interaction"
    elif "anxiety" in topic_lower:
        theme = "peaceful calming space, relaxation area, soothing environment"
    elif "depression" in topic_lower:
        theme = "hopeful scene, light coming through window, supportive atmosphere"
    elif "learning" in topic_lower or "education" in topic_lower:
        theme = "child learning with support, educational materials, engaging activity"
    elif "therapy" in topic_lower or "support" in topic_lower:
        theme = "therapy room, comfortable seating, professional but warm"
    elif "parent" in topic_lower or "family" in topic_lower:
        theme = "parent and child together, supportive interaction, warm home environment"
    else:
        theme = "child development center, supportive environment, professional care"

    # Compose final prompt
    prompt = f"{theme}, {style}, no text, no watermark, photorealistic, high quality"

    return prompt


def generate_image(
    prompt: str,
    width: int = DEFAULT_WIDTH,
    height: int = DEFAULT_HEIGHT,
    seed: int = None,
    save_path: str = None
) -> dict:
    """
    Generate an image using Pollinations.ai.

    Args:
        prompt: Description of image to generate
        width: Image width in pixels
        height: Image height in pixels
        seed: Random seed for reproducibility (optional)
        save_path: Path to save the image (optional, auto-generated if not provided)

    Returns:
        dict with success status, file path, and metadata
    """

    # Build URL
    encoded_prompt = urllib.parse.quote(prompt)
    url = f"{POLLINATIONS_BASE_URL}/{encoded_prompt}"

    params = {
        "width": width,
        "height": height,
        "nologo": "true"
    }

    if seed is not None:
        params["seed"] = seed

    # Add params to URL
    param_string = "&".join(f"{k}={v}" for k, v in params.items())
    full_url = f"{url}?{param_string}"

    print(f"  Generating image...")
    print(f"  Prompt: {prompt[:80]}...")

    try:
        # Download image
        response = requests.get(full_url, timeout=120)

        if response.status_code == 200 and len(response.content) > 1000:
            # Generate save path if not provided
            if save_path is None:
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                filename = f"blog_image_{timestamp}.png"
                save_path = str(IMAGES_DIR / filename)

            # Save image
            with open(save_path, "wb") as f:
                f.write(response.content)

            file_size = len(response.content)
            print(f"  Image saved: {save_path} ({file_size:,} bytes)")

            return {
                "success": True,
                "file_path": save_path,
                "file_size": file_size,
                "width": width,
                "height": height,
                "prompt": prompt
            }
        else:
            return {
                "success": False,
                "error": f"Invalid response: status={response.status_code}, size={len(response.content)}"
            }

    except requests.Timeout:
        return {
            "success": False,
            "error": "Request timed out (120s)"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


def generate_blog_image(topic: str, category: str, save_path: str = None) -> dict:
    """
    Generate a blog-appropriate image for a given topic.

    This is the main function to use for blog automation.

    Args:
        topic: Blog post topic/title
        category: Blog category (clinical, parenting, education, etc.)
        save_path: Optional path to save the image

    Returns:
        dict with success status and image details
    """

    # Generate appropriate prompt
    prompt = generate_image_prompt(topic, category)

    # Generate image
    result = generate_image(
        prompt=prompt,
        width=DEFAULT_WIDTH,
        height=DEFAULT_HEIGHT,
        save_path=save_path
    )

    if result["success"]:
        result["topic"] = topic
        result["category"] = category

    return result


# Sanity CDN upload function
def upload_to_sanity(file_path: str, sanity_token: str, project_id: str = "3c4uripz", dataset: str = "production") -> dict:
    """
    Upload an image to Sanity CDN.

    Args:
        file_path: Path to the image file
        sanity_token: Sanity API write token
        project_id: Sanity project ID
        dataset: Sanity dataset name

    Returns:
        dict with success status and asset reference
    """

    url = f"https://{project_id}.api.sanity.io/v2021-06-07/assets/images/{dataset}"

    headers = {
        "Authorization": f"Bearer {sanity_token}"
    }

    # Determine content type
    file_path_lower = file_path.lower()
    if file_path_lower.endswith(".png"):
        content_type = "image/png"
    elif file_path_lower.endswith(".jpg") or file_path_lower.endswith(".jpeg"):
        content_type = "image/jpeg"
    elif file_path_lower.endswith(".webp"):
        content_type = "image/webp"
    else:
        content_type = "image/png"

    print(f"  Uploading to Sanity CDN...")

    try:
        with open(file_path, "rb") as f:
            response = requests.post(
                url,
                headers={**headers, "Content-Type": content_type},
                data=f.read(),
                timeout=60
            )

        if response.status_code == 200:
            data = response.json()
            document = data.get("document", {})
            asset_id = document.get("_id")
            asset_url = document.get("url")

            print(f"  Uploaded! Asset ID: {asset_id}")

            return {
                "success": True,
                "asset_id": asset_id,
                "asset_url": asset_url,
                "asset_ref": {
                    "_type": "image",
                    "asset": {
                        "_type": "reference",
                        "_ref": asset_id
                    }
                }
            }
        else:
            return {
                "success": False,
                "error": response.text,
                "status_code": response.status_code
            }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


def generate_and_upload_blog_image(
    topic: str,
    category: str,
    sanity_token: str,
    project_id: str = "3c4uripz",
    dataset: str = "production"
) -> dict:
    """
    Generate a blog image and upload it to Sanity CDN.

    This is the all-in-one function for the blog automation pipeline.

    Args:
        topic: Blog post topic/title
        category: Blog category
        sanity_token: Sanity API write token
        project_id: Sanity project ID
        dataset: Sanity dataset name

    Returns:
        dict with success status, local file path, and Sanity asset reference
    """

    # Step 1: Generate image
    gen_result = generate_blog_image(topic, category)

    if not gen_result["success"]:
        return {
            "success": False,
            "error": f"Image generation failed: {gen_result.get('error')}",
            "step": "generation"
        }

    # Step 2: Upload to Sanity
    upload_result = upload_to_sanity(
        file_path=gen_result["file_path"],
        sanity_token=sanity_token,
        project_id=project_id,
        dataset=dataset
    )

    if not upload_result["success"]:
        return {
            "success": False,
            "error": f"Sanity upload failed: {upload_result.get('error')}",
            "step": "upload",
            "local_file": gen_result["file_path"]
        }

    # Success - return combined result
    return {
        "success": True,
        "local_file": gen_result["file_path"],
        "asset_id": upload_result["asset_id"],
        "asset_url": upload_result["asset_url"],
        "asset_ref": upload_result["asset_ref"],
        "prompt": gen_result["prompt"]
    }


# Test function
def test_generation():
    """Test image generation with sample topics."""

    test_cases = [
        ("Early Signs of Autism in Toddlers", "clinical"),
        ("ADHD Morning Routine Tips for Parents", "parenting"),
        ("Understanding Learning Disabilities", "education"),
    ]

    print("=" * 60)
    print("IMAGE GENERATION TEST")
    print("=" * 60)

    for topic, category in test_cases:
        print(f"\nTopic: {topic}")
        print(f"Category: {category}")
        print("-" * 40)

        result = generate_blog_image(topic, category)

        if result["success"]:
            print(f"SUCCESS!")
            print(f"  File: {result['file_path']}")
            print(f"  Size: {result['file_size']:,} bytes")
        else:
            print(f"FAILED: {result.get('error')}")

        # Small delay between requests
        time.sleep(2)

    print("\n" + "=" * 60)


if __name__ == "__main__":
    test_generation()
