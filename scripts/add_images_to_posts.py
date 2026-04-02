#!/usr/bin/env python3
"""
Add Images to Existing Blog Posts

This script:
1. Queries Sanity for posts without mainImage
2. Generates tailored images for each post
3. Uploads to Sanity CDN
4. Patches the posts with the new images
"""

import json
import time
import requests
import urllib.parse
from pathlib import Path
from datetime import datetime

# Import image generator
from image_generator import generate_blog_image, upload_to_sanity

# Sanity config
SANITY_TOKEN = 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB'
SANITY_PROJECT_ID = '3c4uripz'
SANITY_DATASET = 'production'
SANITY_API_VERSION = '2021-06-07'

# Tailored image prompts for specific topics
TAILORED_PROMPTS = {
    "autism": "a toddler in a sensory-friendly therapy room, soft lighting, gentle colors, comfortable cushions, developmental toys, warm and safe environment, professional pediatric setting, no text",
    "adhd": "a child focused on a structured activity at a desk, organized workspace, calm supportive environment, natural lighting, educational materials, concentration and focus, warm colors, no text",
    "learning disabilities": "a supportive learning environment, child with educational materials, patient teacher presence, organized classroom, visual learning aids, encouraging atmosphere, bright but calm colors, no text",
    "anxiety": "a peaceful calming corner for children, soft cushions, sensory items, gentle lighting, safe space, breathing exercise visuals, soothing blues and greens, therapy room, no text",
    "depression": "a hopeful scene with light coming through window, supportive family moment, warm connection, gentle natural lighting, teen in comfortable setting, hope and healing atmosphere, no text",
    "executive function": "organized workspace for children, visual schedules, task boards, structured environment, time management tools, colorful but organized, supportive learning space, no text"
}


def get_tailored_prompt(topic: str, category: str) -> str:
    """Generate a highly tailored prompt based on topic keywords."""

    topic_lower = topic.lower()

    # Check for specific topic keywords
    for keyword, prompt in TAILORED_PROMPTS.items():
        if keyword in topic_lower:
            return prompt + ", photorealistic, high quality, professional healthcare"

    # Fallback to category-based prompts
    category_prompts = {
        "clinical": "professional child therapy room, warm clinical setting, developmental assessment area, soft natural lighting, calming colors, supportive environment, no text, photorealistic",
        "parenting": "warm family home environment, parent and child connection, supportive home setting, natural lighting, comfortable living space, nurturing atmosphere, no text, photorealistic",
        "education": "inclusive classroom environment, learning support materials, organized educational space, bright natural light, engaging but calm, supportive school setting, no text, photorealistic"
    }

    return category_prompts.get(category, category_prompts["clinical"])


def query_posts_without_images() -> list:
    """Query Sanity for posts that don't have a mainImage."""

    # GROQ query for posts without mainImage
    query = '*[_type == "post" && !defined(mainImage)]{_id, title, slug, categories}'
    encoded_query = urllib.parse.quote(query)

    url = f"https://{SANITY_PROJECT_ID}.api.sanity.io/v{SANITY_API_VERSION}/data/query/{SANITY_DATASET}?query={encoded_query}"

    headers = {
        'Authorization': f'Bearer {SANITY_TOKEN}'
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return data.get('result', [])
    else:
        print(f"Error querying Sanity: {response.text}")
        return []


def delete_post_by_slug(slug: str) -> bool:
    """Delete a post by its slug."""

    # First find the post ID
    query = f'*[_type == "post" && slug.current == "{slug}"][0]._id'
    encoded_query = urllib.parse.quote(query)

    url = f"https://{SANITY_PROJECT_ID}.api.sanity.io/v{SANITY_API_VERSION}/data/query/{SANITY_DATASET}?query={encoded_query}"

    headers = {
        'Authorization': f'Bearer {SANITY_TOKEN}'
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        post_id = data.get('result')

        if post_id:
            # Delete the post
            delete_url = f"https://{SANITY_PROJECT_ID}.api.sanity.io/v{SANITY_API_VERSION}/data/mutate/{SANITY_DATASET}"
            mutation = {
                'mutations': [{'delete': {'id': post_id}}]
            }

            delete_response = requests.post(
                delete_url,
                headers={**headers, 'Content-Type': 'application/json'},
                json=mutation
            )

            if delete_response.status_code == 200:
                print(f"Deleted post: {slug} (ID: {post_id})")
                return True
            else:
                print(f"Failed to delete: {delete_response.text}")
                return False

    return False


def patch_post_with_image(post_id: str, asset_ref: dict) -> bool:
    """Update a Sanity post with a mainImage."""

    url = f"https://{SANITY_PROJECT_ID}.api.sanity.io/v{SANITY_API_VERSION}/data/mutate/{SANITY_DATASET}"

    headers = {
        'Authorization': f'Bearer {SANITY_TOKEN}',
        'Content-Type': 'application/json'
    }

    mutation = {
        'mutations': [{
            'patch': {
                'id': post_id,
                'set': {
                    'mainImage': asset_ref
                }
            }
        }]
    }

    response = requests.post(url, headers=headers, json=mutation)

    return response.status_code == 200


def add_images_to_existing_posts():
    """Main function to add images to all posts without images."""

    print("=" * 60)
    print("ADDING IMAGES TO EXISTING BLOG POSTS")
    print("=" * 60)

    # First, delete the test post if it exists
    print("\n[1] Cleaning up test post...")
    delete_post_by_slug("executive-function-in-children-building-organizati")

    # Query posts without images
    print("\n[2] Querying posts without images...")
    posts = query_posts_without_images()

    if not posts:
        print("No posts found without images.")
        return

    print(f"Found {len(posts)} posts without images:")
    for post in posts:
        print(f"  - {post.get('title', 'Untitled')}")

    # Process each post
    print("\n[3] Generating and uploading images...")
    print("-" * 60)

    success_count = 0

    for i, post in enumerate(posts, 1):
        post_id = post.get('_id')
        title = post.get('title', 'Untitled')
        categories = post.get('categories', ['clinical'])
        category = categories[0] if categories else 'clinical'

        print(f"\n[{i}/{len(posts)}] {title}")

        # Generate tailored prompt
        prompt = get_tailored_prompt(title, category)
        print(f"  Category: {category}")
        print(f"  Prompt: {prompt[:60]}...")

        # Generate image with custom prompt
        print("  Generating image...")

        # Use direct Pollinations URL with custom prompt
        encoded_prompt = urllib.parse.quote(prompt)
        image_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=1200&height=630&nologo=true"

        try:
            response = requests.get(image_url, timeout=120)

            if response.status_code == 200 and len(response.content) > 1000:
                # Save locally
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                save_path = Path(__file__).parent.parent / "data" / "generated_images" / f"blog_{i}_{timestamp}.png"

                with open(save_path, "wb") as f:
                    f.write(response.content)

                print(f"  Image saved: {len(response.content):,} bytes")

                # Upload to Sanity
                print("  Uploading to Sanity CDN...")
                upload_result = upload_to_sanity(
                    file_path=str(save_path),
                    sanity_token=SANITY_TOKEN,
                    project_id=SANITY_PROJECT_ID,
                    dataset=SANITY_DATASET
                )

                if upload_result['success']:
                    print(f"  Uploaded: {upload_result['asset_id']}")

                    # Patch the post
                    print("  Updating post...")
                    if patch_post_with_image(post_id, upload_result['asset_ref']):
                        print(f"  SUCCESS: Image added to post")
                        success_count += 1
                    else:
                        print(f"  FAILED: Could not update post")
                else:
                    print(f"  FAILED: Upload failed - {upload_result.get('error')}")
            else:
                print(f"  FAILED: Image generation failed")

        except Exception as e:
            print(f"  ERROR: {e}")

        # Small delay between requests
        if i < len(posts):
            print("  Waiting before next image...")
            time.sleep(3)

    print("\n" + "=" * 60)
    print(f"COMPLETE: {success_count}/{len(posts)} posts updated with images")
    print("=" * 60)


if __name__ == "__main__":
    add_images_to_existing_posts()
