#!/usr/bin/env python3
"""
Autonomous Blog Agent for divit mind space

This agent automatically:
1. Checks the content queue for scheduled posts
2. Researches topics
3. Generates blog content in Pooja Mittal's voice
4. Generates relevant hero images using AI (Pollinations.ai)
5. Publishes to Sanity CMS with images
6. Updates queue status

Usage:
    python autonomous_blog_agent.py              # Run once (check and publish due posts)
    python autonomous_blog_agent.py --daemon     # Run continuously
    python autonomous_blog_agent.py --add-test   # Add test posts to queue
    python autonomous_blog_agent.py --no-images  # Publish without generating images
"""

import json
import os
import sys
import time
import uuid
import argparse
from datetime import datetime, timezone, timedelta
from pathlib import Path

import requests

# Import image generator
from image_generator import generate_and_upload_blog_image

# Import WhatsApp approval (optional - may not be connected)
try:
    from whatsapp_approval import (
        request_approval,
        create_sanity_draft,
        check_bridge_health,
        send_whatsapp_message,
        APPROVER_PHONE
    )
    WHATSAPP_AVAILABLE = True
except ImportError:
    WHATSAPP_AVAILABLE = False

# Global flags
GENERATE_IMAGES = True
REQUIRE_APPROVAL = False

# Paths
BASE_DIR = Path(__file__).parent.parent
QUEUE_FILE = BASE_DIR / "data" / "content_queue.json"
LOG_FILE = BASE_DIR / "data" / "agent_log.json"

# Sanity config
SANITY_TOKEN = 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB'
SANITY_PROJECT_ID = '3c4uripz'
SANITY_DATASET = 'production'
SANITY_API_VERSION = '2021-06-07'

# Default author
POOJA_AUTHOR_ID = '7b2a2e20-96ca-4665-8f29-41466bf231b6'


def log(message: str, level: str = "INFO"):
    """Log a message with timestamp."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] [{level}] {message}")


def load_queue() -> dict:
    """Load the content queue."""
    if QUEUE_FILE.exists():
        with open(QUEUE_FILE) as f:
            return json.load(f)
    return {"config": {}, "posts": []}


def save_queue(queue: dict):
    """Save the content queue."""
    with open(QUEUE_FILE, 'w') as f:
        json.dump(queue, f, indent=2, default=str)


def gen_key() -> str:
    """Generate a unique key for Sanity blocks."""
    return str(uuid.uuid4())[:12]


def slugify(text: str) -> str:
    """Convert text to URL-friendly slug."""
    import re
    slug = text.lower()
    slug = re.sub(r'[\s_]+', '-', slug)
    slug = re.sub(r'[^a-z0-9-]', '', slug)
    slug = re.sub(r'-+', '-', slug)
    slug = slug.strip('-')
    return slug[:50]  # Limit length


def generate_blog_content(topic: str, category: str) -> dict:
    """
    Generate blog content for a topic in Pooja Mittal's voice.

    This is a simplified content generator. In production, this would
    call an LLM API for research and writing.
    """

    # Content templates based on category
    templates = {
        "clinical": {
            "intro": f"Many families seek clarity when they notice developmental differences in their child. Understanding {topic.lower()} is the first step toward appropriate support and intervention.",
            "sections": [
                ("What Parents Should Know", f"Early identification of signs related to {topic.lower()} can significantly improve outcomes. Research shows that children who receive timely support demonstrate better progress in communication, behavior, and daily functioning."),
                ("Common Signs to Watch For", f"Parents and caregivers often notice subtle differences in development. These may include changes in communication patterns, social interaction, sensory responses, or behavioral regulation."),
                ("When to Seek Professional Support", f"If you observe persistent challenges that affect your child's daily life, school performance, or family functioning, a professional evaluation can provide clarity and guide next steps."),
            ]
        },
        "parenting": {
            "intro": f"Parenting a child with unique developmental needs comes with both challenges and rewards. Understanding {topic.lower()} empowers families to provide consistent, effective support.",
            "sections": [
                ("Understanding Your Child's Needs", f"Every child is different. When it comes to {topic.lower()}, recognizing your child's specific strengths and challenges is essential for meaningful progress."),
                ("Practical Strategies for Home", f"Structured routines, clear communication, and consistent expectations help children feel secure. Small adjustments in the home environment can make a significant difference."),
                ("Building a Support Network", f"You do not have to navigate this journey alone. Connecting with professionals, other families, and support groups provides valuable guidance and encouragement."),
            ]
        },
        "education": {
            "intro": f"Educational success for children with developmental differences requires understanding, accommodation, and collaboration. {topic} affects learning in specific ways that educators and parents should understand.",
            "sections": [
                ("Impact on Learning", f"Children experiencing {topic.lower()} may face unique challenges in the classroom. Understanding these challenges helps educators provide appropriate support."),
                ("Classroom Strategies", f"Evidence-based accommodations and teaching strategies can help students succeed. These may include visual supports, modified assignments, or additional processing time."),
                ("Parent-Teacher Collaboration", f"When parents and educators work together, children benefit from consistent support across environments. Regular communication and shared goals are essential."),
            ]
        }
    }

    # Get template or use clinical as default
    template = templates.get(category, templates["clinical"])

    # Build PortableText blocks
    blocks = []

    # Introduction
    blocks.append({
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': template["intro"], 'marks': []}]
    })

    # Sections
    for heading, content in template["sections"]:
        # Add heading
        blocks.append({
            '_type': 'block',
            '_key': gen_key(),
            'style': 'h2',
            'markDefs': [],
            'children': [{'_type': 'span', '_key': gen_key(), 'text': heading, 'marks': []}]
        })
        # Add content
        blocks.append({
            '_type': 'block',
            '_key': gen_key(),
            'style': 'normal',
            'markDefs': [],
            'children': [{'_type': 'span', '_key': gen_key(), 'text': content, 'marks': []}]
        })

    # Closing with Divit mention
    blocks.append({
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h2',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'How Divit MindSpace Can Help', 'marks': []}]
    })
    blocks.append({
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': f'At Divit MindSpace, we provide comprehensive assessment and personalized therapy programs for children and families navigating {topic.lower()}. Our team of specialists works collaboratively to create structured, evidence-based intervention plans tailored to each child\'s unique needs.', 'marks': []}]
    })
    blocks.append({
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'If you have questions or would like to learn more about our services, our team is here to help.', 'marks': []}]
    })

    # Generate title and excerpt
    title = topic if len(topic) < 60 else topic[:57] + "..."
    excerpt = template["intro"][:197] + "..." if len(template["intro"]) > 200 else template["intro"]

    return {
        "title": title,
        "slug": slugify(topic),
        "excerpt": excerpt,
        "body": blocks,
        "read_time": 4
    }


def publish_to_sanity(content: dict, category: str, author_id: str, main_image: dict = None) -> dict:
    """Publish a blog post to Sanity CMS.

    Args:
        content: Blog content dict with title, slug, excerpt, body, read_time
        category: Post category
        author_id: Sanity author reference ID
        main_image: Optional Sanity image asset reference
    """

    base_url = f'https://{SANITY_PROJECT_ID}.api.sanity.io/v{SANITY_API_VERSION}'
    headers = {
        'Authorization': f'Bearer {SANITY_TOKEN}',
        'Content-Type': 'application/json'
    }

    post_doc = {
        '_type': 'post',
        'title': content['title'],
        'slug': {
            '_type': 'slug',
            'current': content['slug']
        },
        'excerpt': content['excerpt'],
        'author': {
            '_type': 'reference',
            '_ref': author_id
        },
        'categories': [category],
        'publishedAt': datetime.now(timezone.utc).isoformat(),
        'readTime': content['read_time'],
        'featured': False,
        'body': content['body']
    }

    # Add main image if provided
    if main_image:
        post_doc['mainImage'] = main_image

    mutation = {'mutations': [{'create': post_doc}]}
    url = f'{base_url}/data/mutate/{SANITY_DATASET}'

    response = requests.post(url, headers=headers, json=mutation)

    if response.status_code == 200:
        result = response.json()
        doc_id = None
        if 'results' in result and len(result['results']) > 0:
            doc_id = result['results'][0].get('id') or result['results'][0].get('documentId')

        return {
            'success': True,
            'document_id': doc_id,
            'slug': content['slug'],
            'url': f"/blogs/{content['slug']}"
        }
    else:
        return {
            'success': False,
            'error': response.text,
            'status_code': response.status_code
        }


def process_post(post: dict, generate_images: bool = True, require_approval: bool = False) -> dict:
    """Process a single post from the queue.

    Args:
        post: Post dict from queue
        generate_images: Whether to generate hero image
        require_approval: Whether to require WhatsApp approval before publishing
    """

    topic = post['topic']
    category = post.get('category', 'clinical')
    author_id = post.get('author_id', POOJA_AUTHOR_ID)

    log(f"Processing: {topic}")

    # Step 1: Generate hero image (if enabled)
    main_image = None
    image_url = None

    if generate_images and GENERATE_IMAGES:
        log("  Generating hero image...")
        try:
            image_result = generate_and_upload_blog_image(
                topic=topic,
                category=category,
                sanity_token=SANITY_TOKEN,
                project_id=SANITY_PROJECT_ID,
                dataset=SANITY_DATASET
            )

            if image_result['success']:
                main_image = image_result['asset_ref']
                image_url = image_result.get('asset_url')
                log(f"  Image uploaded: {image_result['asset_id']}")
            else:
                log(f"  Image generation failed: {image_result.get('error')}", "WARN")
                # Continue without image
        except Exception as e:
            log(f"  Image generation error: {e}", "WARN")
            # Continue without image

    # Step 2: Generate content
    log("  Generating content...")
    content = generate_blog_content(topic, category)

    # Add image to content if generated
    if main_image:
        content['mainImage'] = main_image

    # Step 3: Check if approval is required
    if require_approval and REQUIRE_APPROVAL and WHATSAPP_AVAILABLE:
        log("  Requesting WhatsApp approval...")

        # Check if WhatsApp is connected
        if not check_bridge_health():
            log("  WhatsApp not connected. Publishing directly.", "WARN")
            # Fall through to direct publish
        else:
            # Create draft and request approval
            draft_result = create_sanity_draft(content, category, author_id)

            if not draft_result['success']:
                log(f"  Failed to create draft: {draft_result.get('error')}", "ERROR")
                return {'success': False, 'error': draft_result.get('error')}

            log(f"  Draft created: {draft_result['draft_id']}")

            # Request approval via WhatsApp
            approval_result = request_approval(
                title=content['title'],
                category=category,
                excerpt=content['excerpt'],
                draft_id=draft_result['draft_id'],
                preview_url=draft_result.get('preview_url')
            )

            if approval_result.get('timeout'):
                log("  Approval timed out. Draft saved for later.", "WARN")
                return {
                    'success': False,
                    'error': 'Approval timed out',
                    'draft_id': draft_result['draft_id']
                }

            if approval_result.get('approved'):
                log(f"  Approved! Published to {approval_result.get('published_url')}")
                return {
                    'success': True,
                    'document_id': None,
                    'slug': content['slug'],
                    'url': approval_result.get('published_url'),
                    'title': content['title']
                }
            else:
                log("  Rejected by approver.")
                return {
                    'success': False,
                    'rejected': True,
                    'error': 'Rejected by approver'
                }

    # Step 4: Direct publish to Sanity (no approval needed)
    log("  Publishing to Sanity...")
    result = publish_to_sanity(content, category, author_id, main_image=main_image)

    if result['success']:
        log(f"  SUCCESS: Published to {result['url']}")
        response = {
            'success': True,
            'document_id': result['document_id'],
            'slug': result['slug'],
            'url': result['url'],
            'title': content['title']
        }
        if image_url:
            response['image_url'] = image_url
        return response
    else:
        log(f"  FAILED: {result.get('error', 'Unknown error')}", "ERROR")
        return {
            'success': False,
            'error': result.get('error')
        }


def check_and_process_queue(generate_images: bool = True, require_approval: bool = False):
    """Check queue for due posts and process them.

    Args:
        generate_images: Whether to generate hero images for posts
        require_approval: Whether to require WhatsApp approval before publishing
    """

    queue = load_queue()
    now = datetime.now(timezone.utc)
    processed_count = 0

    for post in queue['posts']:
        if post['status'] != 'pending':
            continue

        # Parse scheduled time
        scheduled_str = post.get('scheduled')
        if not scheduled_str:
            continue

        try:
            # Handle both ISO format and simple datetime
            if 'T' in scheduled_str:
                scheduled = datetime.fromisoformat(scheduled_str.replace('Z', '+00:00'))
            else:
                scheduled = datetime.strptime(scheduled_str, '%Y-%m-%d %H:%M:%S')
                scheduled = scheduled.replace(tzinfo=timezone.utc)
        except Exception as e:
            log(f"Invalid date format for post: {post.get('topic')}: {e}", "ERROR")
            continue

        # Check if due
        if scheduled <= now:
            log(f"Post is due: {post['topic']}")

            # Update status to processing
            post['status'] = 'processing'
            save_queue(queue)

            # Process the post
            result = process_post(post, generate_images=generate_images, require_approval=require_approval)

            # Update status based on result
            if result.get('rejected'):
                post['status'] = 'rejected'
                post['rejected_at'] = datetime.now(timezone.utc).isoformat()
            elif result['success']:
                post['status'] = 'completed'
                post['completed_at'] = datetime.now(timezone.utc).isoformat()
                post['document_id'] = result.get('document_id')
                post['blog_url'] = result.get('url')
                post['published_title'] = result.get('title')
                if result.get('image_url'):
                    post['image_url'] = result.get('image_url')
                processed_count += 1
            else:
                post['status'] = 'failed'
                post['error'] = result.get('error')
                if result.get('draft_id'):
                    post['draft_id'] = result.get('draft_id')

            save_queue(queue)

    return processed_count


def add_test_posts():
    """Add test posts to the queue with 15-minute intervals."""

    queue = load_queue()
    now = datetime.now(timezone.utc)

    test_topics = [
        {"topic": "Early Signs of Autism in Toddlers: What Parents Should Know", "category": "clinical"},
        {"topic": "ADHD in Children: Understanding Attention and Focus Challenges", "category": "parenting"},
        {"topic": "Learning Disabilities: Recognizing and Supporting Your Child", "category": "education"},
        {"topic": "Childhood Anxiety: Signs, Causes, and Support Strategies", "category": "clinical"},
        {"topic": "Understanding Depression in Teens: A Guide for Parents", "category": "clinical"},
    ]

    for i, item in enumerate(test_topics):
        scheduled_time = now + timedelta(minutes=15 * i)

        post = {
            "id": str(uuid.uuid4())[:8],
            "topic": item["topic"],
            "category": item["category"],
            "scheduled": scheduled_time.isoformat(),
            "status": "pending",
            "created_at": now.isoformat()
        }

        queue['posts'].append(post)
        log(f"Added: {item['topic']} (scheduled: {scheduled_time.strftime('%H:%M:%S')})")

    save_queue(queue)
    log(f"Added {len(test_topics)} test posts to queue")

    return test_topics


def run_daemon(check_interval: int = 60, generate_images: bool = True, require_approval: bool = False):
    """Run the agent continuously.

    Args:
        check_interval: Seconds between queue checks
        generate_images: Whether to generate hero images
        require_approval: Whether to require WhatsApp approval
    """

    log("Starting autonomous blog agent in daemon mode...")
    log(f"Checking queue every {check_interval} seconds")
    log(f"Image generation: {'enabled' if generate_images else 'disabled'}")
    log(f"WhatsApp approval: {'required' if require_approval else 'disabled'}")
    log("Press Ctrl+C to stop")

    try:
        while True:
            processed = check_and_process_queue(
                generate_images=generate_images,
                require_approval=require_approval
            )
            if processed > 0:
                log(f"Processed {processed} posts this cycle")
            time.sleep(check_interval)
    except KeyboardInterrupt:
        log("Agent stopped by user")


def show_queue_status():
    """Display current queue status."""

    queue = load_queue()
    posts = queue.get('posts', [])

    print("\n" + "=" * 60)
    print("CONTENT QUEUE STATUS")
    print("=" * 60)

    if not posts:
        print("Queue is empty")
        return

    pending = [p for p in posts if p['status'] == 'pending']
    completed = [p for p in posts if p['status'] == 'completed']
    failed = [p for p in posts if p['status'] == 'failed']
    rejected = [p for p in posts if p['status'] == 'rejected']

    print(f"Total: {len(posts)} | Pending: {len(pending)} | Completed: {len(completed)} | Failed: {len(failed)} | Rejected: {len(rejected)}")
    print("-" * 60)

    for post in posts:
        status_icon = {"pending": "[.]", "processing": "[~]", "completed": "[+]", "failed": "[X]", "rejected": "[-]"}.get(post['status'], "[?]")
        scheduled = post.get('scheduled', 'N/A')[:19]
        print(f"{status_icon} {scheduled} | {post['category']:10} | {post['topic'][:40]}...")

    print("=" * 60 + "\n")


def main():
    global GENERATE_IMAGES, REQUIRE_APPROVAL

    parser = argparse.ArgumentParser(description="Autonomous Blog Agent for divit mind space")
    parser.add_argument('--daemon', action='store_true', help='Run continuously')
    parser.add_argument('--add-test', action='store_true', help='Add test posts to queue')
    parser.add_argument('--status', action='store_true', help='Show queue status')
    parser.add_argument('--interval', type=int, default=60, help='Check interval in seconds (daemon mode)')
    parser.add_argument('--no-images', action='store_true', help='Disable image generation')
    parser.add_argument('--approval', action='store_true', help='Require WhatsApp approval before publishing')

    args = parser.parse_args()

    # Set global flags
    generate_images = not args.no_images
    GENERATE_IMAGES = generate_images

    require_approval = args.approval
    REQUIRE_APPROVAL = require_approval

    # Check WhatsApp availability if approval required
    if require_approval:
        if not WHATSAPP_AVAILABLE:
            log("WARNING: WhatsApp approval requested but module not available", "WARN")
        else:
            from whatsapp_approval import check_bridge_health
            if not check_bridge_health():
                log("WARNING: WhatsApp bridge not connected. Run 'hermes whatsapp' first.", "WARN")
            else:
                log("WhatsApp approval: connected to +919964618444")

    if args.status:
        show_queue_status()
    elif args.add_test:
        add_test_posts()
        show_queue_status()
    elif args.daemon:
        run_daemon(args.interval, generate_images=generate_images, require_approval=require_approval)
    else:
        # Single run - check and process
        log("Running single queue check...")
        log(f"Image generation: {'enabled' if generate_images else 'disabled'}")
        log(f"WhatsApp approval: {'required' if require_approval else 'disabled'}")
        processed = check_and_process_queue(generate_images=generate_images, require_approval=require_approval)
        log(f"Processed {processed} posts")
        show_queue_status()


if __name__ == "__main__":
    main()
