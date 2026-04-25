#!/usr/bin/env python3
"""
Regenerate High-Quality Images for Blog Posts

Higher resolution, better prompts, professional quality.
"""

import json
import time
import requests
import urllib.parse
from pathlib import Path
from datetime import datetime

from image_generator import upload_to_sanity

# Sanity config
SANITY_TOKEN = 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB'
SANITY_PROJECT_ID = '3c4uripz'
SANITY_DATASET = 'production'
SANITY_API_VERSION = '2021-06-07'

# High resolution settings
IMAGE_WIDTH = 1920
IMAGE_HEIGHT = 1080

# High-quality detailed prompts for each topic
HQ_PROMPTS = {
    "autism": {
        "prompt": "Professional pediatric therapy room for toddlers, sensory-friendly environment with soft natural lighting from large windows, pastel colored walls in sage green and cream, wooden Montessori toys on low shelves, soft play mat on floor, comfortable cushioned seating area, plants adding warmth, clean modern Scandinavian design, warm and inviting atmosphere, ultra high quality, 8k, professional interior photography, shallow depth of field",
        "slug": "early-signs-of-autism-in-toddlers-what-parents-sho"
    },
    "adhd": {
        "prompt": "Organized child's study space with natural sunlight streaming through window, clean wooden desk with minimal distractions, colorful but organized school supplies in containers, visual schedule on wall, fidget tools in a basket, green plant on desk, calm focused atmosphere, warm afternoon lighting, modern home office for kids, professional interior photography, 8k ultra detailed, shallow depth of field",
        "slug": "adhd-in-children-understanding-attention-and-focus"
    },
    "learning_disabilities": {
        "prompt": "Warm supportive classroom environment with teacher helping young student one-on-one, natural light from windows, educational materials and visual aids on walls, colorful but organized learning space, books and learning tools on desk, patient supportive interaction, inclusive education setting, professional educational photography, warm tones, 8k ultra high quality, cinematic lighting",
        "slug": "learning-disabilities-recognizing-and-supporting-y"
    },
    "anxiety": {
        "prompt": "Peaceful calming corner in a children's therapy room, soft cushions and bean bags in soothing blue and mint green colors, sensory bottles on shelf, soft fairy lights, cozy reading nook with books, large window with sheer curtains filtering soft natural light, breathing exercise poster on wall, tranquil zen atmosphere, professional interior photography, 8k ultra detailed, warm and safe feeling",
        "slug": "childhood-anxiety-signs-causes-and-support-strateg"
    },
    "depression": {
        "prompt": "Hopeful scene of teenager sitting by large window with warm golden sunlight streaming in, cozy bedroom with soft blankets, journal and cup of tea nearby, plants on windowsill, gentle supportive atmosphere, hope and healing mood, soft bokeh background, professional lifestyle photography, warm color grading, 8k ultra high quality, cinematic natural lighting, emotional depth",
        "slug": "understanding-depression-in-teens-a-guide-for-pare"
    },
    "after_school": {
        "prompt": "Warm cozy living room scene with parent and child having a calm moment together after school, comfortable sofa with soft throw blankets, warm afternoon sunlight through windows, peaceful home atmosphere, cup of hot chocolate on coffee table, family connection moment, professional lifestyle photography, warm golden hour lighting, 8k ultra detailed, shallow depth of field, emotional warmth",
        "slug": "why-your-child-falls-apart-after-school-and-what-a"
    }
}


def get_post_id_by_slug(slug: str) -> str:
    """Get Sanity post ID by slug."""
    query = f'*[_type == "post" && slug.current match "{slug}*"][0]._id'
    encoded_query = urllib.parse.quote(query)

    url = f"https://{SANITY_PROJECT_ID}.api.sanity.io/v{SANITY_API_VERSION}/data/query/{SANITY_DATASET}?query={encoded_query}"
    headers = {'Authorization': f'Bearer {SANITY_TOKEN}'}

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json().get('result')
    return None


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
                'set': {'mainImage': asset_ref}
            }
        }]
    }

    response = requests.post(url, headers=headers, json=mutation)
    return response.status_code == 200


def generate_hq_image(prompt: str, filename: str) -> str:
    """Generate high-quality image using Pollinations with Flux model."""

    # Use Flux model for higher quality
    encoded_prompt = urllib.parse.quote(prompt)

    # Pollinations URL with high quality settings
    url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width={IMAGE_WIDTH}&height={IMAGE_HEIGHT}&model=flux&nologo=true&enhance=true"

    print(f"  Generating HQ image ({IMAGE_WIDTH}x{IMAGE_HEIGHT})...")
    print(f"  Using Flux model for higher quality...")

    try:
        response = requests.get(url, timeout=180)  # Longer timeout for HQ

        if response.status_code == 200 and len(response.content) > 10000:
            save_dir = Path(__file__).parent.parent / "data" / "generated_images" / "hq"
            save_dir.mkdir(parents=True, exist_ok=True)

            save_path = save_dir / filename

            with open(save_path, "wb") as f:
                f.write(response.content)

            size_kb = len(response.content) / 1024
            print(f"  Saved: {filename} ({size_kb:.1f} KB)")

            return str(save_path)
        else:
            print(f"  Failed: status={response.status_code}, size={len(response.content)}")
            return None

    except Exception as e:
        print(f"  Error: {e}")
        return None


def regenerate_all_images():
    """Regenerate all blog images in high quality."""

    print("=" * 70)
    print("REGENERATING HIGH-QUALITY BLOG IMAGES")
    print(f"Resolution: {IMAGE_WIDTH}x{IMAGE_HEIGHT}")
    print(f"Model: Flux (high quality)")
    print("=" * 70)

    success_count = 0
    total = len(HQ_PROMPTS)

    for i, (topic, data) in enumerate(HQ_PROMPTS.items(), 1):
        print(f"\n[{i}/{total}] {topic.upper()}")
        print("-" * 50)

        prompt = data["prompt"]
        slug = data["slug"]

        print(f"  Slug: {slug}")
        print(f"  Prompt: {prompt[:80]}...")

        # Get post ID
        post_id = get_post_id_by_slug(slug)
        if not post_id:
            print(f"  ERROR: Post not found for slug: {slug}")
            continue

        print(f"  Post ID: {post_id}")

        # Generate high-quality image
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"hq_{topic}_{timestamp}.png"

        file_path = generate_hq_image(prompt, filename)

        if not file_path:
            print(f"  FAILED: Could not generate image")
            continue

        # Upload to Sanity
        print(f"  Uploading to Sanity CDN...")
        upload_result = upload_to_sanity(
            file_path=file_path,
            sanity_token=SANITY_TOKEN,
            project_id=SANITY_PROJECT_ID,
            dataset=SANITY_DATASET
        )

        if not upload_result['success']:
            print(f"  FAILED: Upload failed - {upload_result.get('error')}")
            continue

        print(f"  Asset ID: {upload_result['asset_id']}")

        # Patch post
        print(f"  Updating post...")
        if patch_post_with_image(post_id, upload_result['asset_ref']):
            print(f"  SUCCESS!")
            success_count += 1
        else:
            print(f"  FAILED: Could not update post")

        # Delay between requests
        if i < total:
            print(f"  Waiting 5s for next image...")
            time.sleep(5)

    print("\n" + "=" * 70)
    print(f"COMPLETE: {success_count}/{total} posts updated with HQ images")
    print("=" * 70)


if __name__ == "__main__":
    regenerate_all_images()
