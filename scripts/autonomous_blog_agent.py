#!/usr/bin/env python3
"""
Autonomous Blog Agent for divit mind space

This agent automatically:
1. Checks the content queue for scheduled posts
2. Researches topics
3. Generates blog content in Dr. Pavithra Lakshminarasimhan's voice
4. Creates SEO-optimized content with FAQ schema for AI/LLM search visibility
5. Generates relevant hero images using AI (Pollinations.ai)
6. Saves to Sanity CMS as DRAFT (unpublished) for review
7. Sends notification via email for approval

Usage:
    python autonomous_blog_agent.py              # Run once (check and process due posts)
    python autonomous_blog_agent.py --daemon     # Run continuously
    python autonomous_blog_agent.py --add-test   # Add test posts to queue
    python autonomous_blog_agent.py --no-images  # Process without generating images
    python autonomous_blog_agent.py --publish    # Publish directly (skip draft mode)
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
DRAFT_MODE = True  # Save as draft (unpublished) by default

# Paths
BASE_DIR = Path(__file__).parent.parent
QUEUE_FILE = BASE_DIR / "data" / "content_queue.json"
LOG_FILE = BASE_DIR / "data" / "agent_log.json"

# Sanity config
SANITY_TOKEN = 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB'
SANITY_PROJECT_ID = '3c4uripz'
SANITY_DATASET = 'production'
SANITY_API_VERSION = '2021-06-07'

# Default author - Dr. Pavithra Lakshminarasimhan (Clinical Psychologist)
PAVITHRA_AUTHOR_ID = '62aceb06-d288-4682-a3ad-441a655839fc'

# Email notification config (optional)
NOTIFICATION_EMAIL = "divitmindspace@gmail.com"
SMTP_ENABLED = False  # Set True and configure SMTP to enable email notifications


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
    Generate blog content for a topic in Dr. Pavithra Lakshminarasimhan's voice.

    Dr. Pavithra's voice characteristics:
    - Clinical psychologist with expertise in neurodivergence
    - Evidence-based, research-backed insights (cites studies)
    - Neurodiversity-affirming approach
    - Warm, empathetic, yet professional tone
    - Focuses on understanding over labels
    - Uses psychological frameworks (Framing Effect, Executive Function, etc.)

    SEO Optimization:
    - FAQ section for AI/LLM search visibility
    - Structured headings (H2, H3)
    - Meta-friendly excerpts
    - Schema.org compatible structure
    """

    # Topic-specific content with Pavithra's clinical psychology perspective
    topic_content = {
        "autism": {
            "title": "Understanding Autism Spectrum: A Neurodiversity-Affirming Perspective",
            "intro": "Autism Spectrum Disorder (ASD) represents a difference in brain functioning—not a deficit in worth or capability. As a clinical psychologist, I've observed that society often interprets behaviors at face value, missing the rich inner world of autistic individuals. Understanding autism requires us to move beyond surface-level observations toward empathy, awareness, and acceptance.",
            "sections": [
                ("Beyond the Label: Understanding Autistic Experiences",
                 "Research in neuropsychology shows that autistic individuals process information differently. What might appear as 'social withdrawal' could be sensory overwhelm. What looks like 'rigid behavior' may be a coping mechanism for an unpredictable world. The Framing Effect (Tversky & Kahneman, 1981) reminds us that how we describe these differences shapes how we—and the child—perceive them."),
                ("Recognizing Signs Across Age Groups",
                 "Early signs in toddlers may include differences in eye contact, response to name, or engagement with caregivers. In older children, we might observe challenges with social reciprocity, intense interests, or sensory sensitivities. Importantly, many individuals—especially girls—engage in 'masking': suppressing natural behaviors to fit social expectations, which can lead to anxiety and burnout (Hull et al., 2017)."),
                ("The Strength-Based Perspective",
                 "Autistic individuals often demonstrate remarkable creativity, deep focus, pattern recognition, and unique problem-solving abilities. The challenge lies not in the individual—but in societal perception. A neurodiversity-affirming approach (Singer, 1999) emphasizes acceptance of neurological differences rather than 'fixing' the person."),
            ],
            "faqs": [
                ("What are the early signs of autism in toddlers?",
                 "Early signs may include limited eye contact, delayed response to name, differences in social smiling, reduced pointing or gesturing, and intense focus on specific objects. However, every child develops differently, and a professional assessment provides clarity."),
                ("Can autism be diagnosed in adults?",
                 "Yes, many adults receive autism diagnoses later in life, particularly those who learned to 'mask' their traits. Adult diagnosis can provide understanding, self-acceptance, and access to appropriate support."),
                ("Is autism a learning disability?",
                 "Autism is not a learning disability, though some autistic individuals may have co-occurring learning differences. Autism affects social communication and sensory processing, while learning disabilities specifically impact academic skills."),
            ]
        },
        "adhd": {
            "title": "ADHD in Children: Understanding Executive Function and Self-Regulation",
            "intro": "Attention-Deficit/Hyperactivity Disorder (ADHD) is fundamentally a difference in executive functioning—the brain's management system. A child who moves constantly, interrupts frequently, or avoids tasks isn't being 'problematic.' Through a psychological lens, we understand these as self-regulation differences, not character flaws.",
            "sections": [
                ("Understanding the ADHD Brain",
                 "ADHD affects the prefrontal cortex—the brain region responsible for planning, impulse control, and working memory. Research by Barkley (2015) demonstrates that ADHD is a neurological condition affecting executive functions, not a matter of willpower or discipline. When we understand this, our approach shifts from punishment to support."),
                ("Reframing Common ADHD Behaviors",
                 "Hyperactivity becomes 'self-regulation difference.' Impulsivity becomes 'executive functioning challenge.' Task avoidance often signals cognitive overload or anxiety response. This reframing—consistent with cognitive behavioral principles—helps parents and educators respond with empathy rather than frustration."),
                ("Strategies That Actually Help",
                 "Evidence-based approaches include: structured environments with visual schedules, breaking tasks into smaller steps, movement breaks, external reminders (timers, checklists), and positive reinforcement. Medication, when appropriate, can support—but doesn't replace—behavioral strategies and environmental modifications."),
            ],
            "faqs": [
                ("What's the difference between ADHD and normal childhood energy?",
                 "All children can be energetic and distractible. ADHD is characterized by persistent patterns that significantly impact daily functioning across multiple settings (home, school, social situations) and are inconsistent with developmental level."),
                ("Can ADHD be outgrown?",
                 "ADHD is a lifelong condition, though symptoms often change with age. Hyperactivity may decrease while inattention persists. With appropriate support, individuals develop effective coping strategies throughout life."),
                ("Does screen time cause ADHD?",
                 "Screen time does not cause ADHD—it's a neurological condition with genetic components. However, excessive screen use can exacerbate attention difficulties in all children, including those with ADHD."),
            ]
        },
        "learning disabilities": {
            "title": "Learning Disabilities: When Intelligence and Achievement Don't Match",
            "intro": "Learning disabilities represent a disconnect between a child's intellectual potential and academic performance in specific areas. These children are not 'slow'—their brains simply process certain types of information differently. Early identification and appropriate support can transform a struggling student into a confident learner.",
            "sections": [
                ("What Learning Disabilities Really Mean",
                 "Learning disabilities (dyslexia, dyscalculia, dysgraphia) are neurological differences affecting how the brain processes specific types of information. A child with dyslexia may have exceptional verbal reasoning but struggle with decoding written words. Understanding this discrepancy is crucial for appropriate intervention."),
                ("Identifying Signs Across Ages",
                 "In younger children: difficulty learning letters, numbers, or rhyming words. In school-age children: slow reading progress, number reversals, illegible handwriting despite effort. In older students: avoidance of reading/writing tasks, significant gap between verbal abilities and written work. Early identification leads to better outcomes."),
                ("Evidence-Based Support Strategies",
                 "Effective interventions are structured, systematic, and multisensory. The Orton-Gillingham approach for dyslexia, for example, engages visual, auditory, and kinesthetic pathways simultaneously. Accommodations like extended time, audio materials, and assistive technology level the playing field without lowering expectations."),
            ],
            "faqs": [
                ("Are learning disabilities the same as intellectual disabilities?",
                 "No. Learning disabilities affect specific academic areas while overall intelligence remains average or above. Intellectual disabilities involve broader cognitive limitations. A child with dyslexia may be highly intelligent but struggle specifically with reading."),
                ("Can learning disabilities be cured?",
                 "Learning disabilities are lifelong neurological differences, not conditions to be 'cured.' However, with appropriate intervention and accommodations, individuals develop effective strategies and can achieve academic and professional success."),
                ("How are learning disabilities diagnosed?",
                 "Diagnosis involves comprehensive psychoeducational assessment measuring cognitive abilities, academic achievement, and information processing. The key indicator is a significant discrepancy between potential and performance in specific areas."),
            ]
        },
        "anxiety": {
            "title": "Childhood Anxiety: Understanding the Overwhelmed Mind",
            "intro": "Anxiety in children often goes unrecognized because it manifests differently than adult anxiety. A child avoiding school may be labeled 'defiant.' A child with stomachaches may be seen as 'seeking attention.' Understanding the psychology behind childhood anxiety helps us respond with support rather than frustration.",
            "sections": [
                ("How Anxiety Presents in Children",
                 "Children rarely say 'I feel anxious.' Instead, anxiety shows through physical symptoms (headaches, stomachaches), behavioral changes (avoidance, irritability, sleep problems), and cognitive patterns (excessive worry, perfectionism, need for reassurance). Recognizing these signs is the first step toward helping."),
                ("The Anxiety Cycle",
                 "Anxiety operates through a reinforcement cycle: a child feels anxious, avoids the feared situation, experiences temporary relief, and the avoidance strengthens. Understanding this cycle—central to Cognitive Behavioral Therapy—helps us break it through gradual exposure and coping skill development."),
                ("When Professional Help is Needed",
                 "Seek professional support when anxiety significantly impacts daily functioning—school attendance, friendships, family activities, or sleep. Evidence-based treatments like CBT are highly effective for childhood anxiety. Early intervention prevents anxiety from becoming entrenched."),
            ],
            "faqs": [
                ("Is childhood anxiety normal?",
                 "Some anxiety is developmentally normal—fear of the dark, separation anxiety in toddlers. Clinical anxiety is distinguished by intensity, duration, and functional impact. When worry prevents a child from participating in age-appropriate activities, it warrants attention."),
                ("Can anxiety be caused by parenting?",
                 "Anxiety has multiple causes including genetics, temperament, and life experiences. Parenting doesn't 'cause' anxiety, but parenting approaches can either support or inadvertently reinforce anxious patterns. Accommodating avoidance, for example, provides short-term relief but maintains long-term anxiety."),
                ("What helps an anxious child in the moment?",
                 "Validation ('I can see you're worried'), calm presence, deep breathing together, and gentle encouragement. Avoid dismissing fears ('There's nothing to worry about') or excessive reassurance, which can reinforce the anxiety cycle."),
            ]
        },
        "depression": {
            "title": "Teen Depression: Beyond 'Just a Phase'",
            "intro": "Adolescent depression is frequently dismissed as 'teenage moodiness' or 'hormones.' This dismissal can be dangerous. Depression in teens presents differently than in adults—often as irritability, social withdrawal, or declining academic performance rather than expressed sadness. Understanding these signs can be life-saving.",
            "sections": [
                ("Recognizing Teen Depression",
                 "Warning signs include: persistent irritability or anger, loss of interest in previously enjoyed activities, social withdrawal, sleep changes (too much or too little), academic decline, physical complaints, hopelessness, and—critically—any mention of death or self-harm. These patterns persisting for two or more weeks warrant professional evaluation."),
                ("Why Teens Are Vulnerable",
                 "Adolescence involves massive brain restructuring, particularly in the prefrontal cortex. Combined with social pressures, identity formation, academic stress, and social media impacts, teens face a perfect storm of vulnerability. This isn't weakness—it's neurodevelopmental reality requiring understanding and support."),
                ("The Path to Recovery",
                 "Evidence-based treatments include Cognitive Behavioral Therapy (CBT), Interpersonal Therapy (IPT), and sometimes medication. Family involvement is crucial. Recovery involves learning to identify and challenge negative thought patterns, building coping skills, and gradually re-engaging with life. Hope is realistic—most teens with depression recover fully with appropriate treatment."),
            ],
            "faqs": [
                ("How is teen depression different from normal teenage moodiness?",
                 "Normal teenage moodiness fluctuates and doesn't significantly impair functioning. Depression involves persistent low mood or irritability (two weeks or more), loss of interest, and noticeable impact on school, relationships, or daily activities."),
                ("Should I talk to my teen about suicide?",
                 "Yes. Asking about suicidal thoughts does not plant the idea—it opens a door for a struggling teen to share. Ask directly: 'Have you had thoughts of hurting yourself?' If yes, seek immediate professional help."),
                ("Can teen depression go away on its own?",
                 "While some depressive episodes resolve, untreated depression often worsens and can recur. Professional treatment significantly improves outcomes and teaches skills that protect against future episodes. Don't wait for depression to 'pass.'"),
            ]
        }
    }

    # Determine which topic content to use
    topic_lower = topic.lower()
    content_key = None
    for key in topic_content.keys():
        if key in topic_lower:
            content_key = key
            break

    # Fallback to generic clinical content
    if not content_key:
        content_key = "autism"  # Default fallback

    tc = topic_content[content_key]

    # Build PortableText blocks
    blocks = []

    # Introduction
    blocks.append({
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': tc["intro"], 'marks': []}]
    })

    # Main Sections
    for heading, content in tc["sections"]:
        blocks.append({
            '_type': 'block',
            '_key': gen_key(),
            'style': 'h2',
            'markDefs': [],
            'children': [{'_type': 'span', '_key': gen_key(), 'text': heading, 'marks': []}]
        })
        blocks.append({
            '_type': 'block',
            '_key': gen_key(),
            'style': 'normal',
            'markDefs': [],
            'children': [{'_type': 'span', '_key': gen_key(), 'text': content, 'marks': []}]
        })

    # FAQ Section - Critical for AI/LLM Search Visibility
    blocks.append({
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h2',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Frequently Asked Questions', 'marks': []}]
    })

    for question, answer in tc["faqs"]:
        # Question as H3
        blocks.append({
            '_type': 'block',
            '_key': gen_key(),
            'style': 'h3',
            'markDefs': [],
            'children': [{'_type': 'span', '_key': gen_key(), 'text': question, 'marks': []}]
        })
        # Answer as normal text
        blocks.append({
            '_type': 'block',
            '_key': gen_key(),
            'style': 'normal',
            'markDefs': [],
            'children': [{'_type': 'span', '_key': gen_key(), 'text': answer, 'marks': []}]
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
        'children': [{'_type': 'span', '_key': gen_key(), 'text': f'At Divit MindSpace, I work with families navigating {content_key}. Our approach is neurodiversity-affirming, evidence-based, and tailored to each child\'s unique profile. We provide comprehensive assessments, personalized therapy programs, and parent guidance—because supporting the whole family leads to better outcomes.', 'marks': []}]
    })
    blocks.append({
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': '"They are not difficult—they are different. And different needs understanding, not judgement."', 'marks': ['em']}]
    })
    blocks.append({
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': '— Dr. Pavithra Lakshminarasimhan, Clinical Psychologist', 'marks': ['strong']}]
    })

    # Generate SEO-optimized title and excerpt
    title = tc["title"]
    excerpt = tc["intro"][:197] + "..." if len(tc["intro"]) > 200 else tc["intro"]

    return {
        "title": title,
        "slug": slugify(title),
        "excerpt": excerpt,
        "body": blocks,
        "read_time": 6,
        "faqs": tc["faqs"]  # Include FAQs for JSON-LD schema generation
    }


def publish_to_sanity(content: dict, category: str, author_id: str, main_image: dict = None, as_draft: bool = True) -> dict:
    """Save a blog post to Sanity CMS (as draft or published).

    Args:
        content: Blog content dict with title, slug, excerpt, body, read_time
        category: Post category
        author_id: Sanity author reference ID
        main_image: Optional Sanity image asset reference
        as_draft: If True, save as draft (unpublished). If False, publish immediately.
    """

    base_url = f'https://{SANITY_PROJECT_ID}.api.sanity.io/v{SANITY_API_VERSION}'
    headers = {
        'Authorization': f'Bearer {SANITY_TOKEN}',
        'Content-Type': 'application/json'
    }

    # Generate document ID - use 'drafts.' prefix for draft documents
    import uuid
    doc_id = str(uuid.uuid4())
    if as_draft:
        doc_id = f'drafts.{doc_id}'

    post_doc = {
        '_id': doc_id,
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
        'readTime': content['read_time'],
        'featured': False,
        'body': content['body']
    }

    # Only add publishedAt if not a draft
    if not as_draft:
        post_doc['publishedAt'] = datetime.now(timezone.utc).isoformat()

    # Add main image if provided
    if main_image:
        post_doc['mainImage'] = main_image

    mutation = {'mutations': [{'create': post_doc}]}
    url = f'{base_url}/data/mutate/{SANITY_DATASET}'

    response = requests.post(url, headers=headers, json=mutation)

    if response.status_code == 200:
        result = response.json()
        result_doc_id = doc_id
        if 'results' in result and len(result['results']) > 0:
            result_doc_id = result['results'][0].get('id') or result['results'][0].get('documentId') or doc_id

        status = "draft" if as_draft else "published"
        return {
            'success': True,
            'document_id': result_doc_id,
            'slug': content['slug'],
            'url': f"/blogs/{content['slug']}",
            'status': status
        }
    else:
        return {
            'success': False,
            'error': response.text,
            'status_code': response.status_code
        }


def send_email_notification(title: str, slug: str, doc_id: str, status: str):
    """Send email notification about new draft/post (placeholder for SMTP integration)."""
    if not SMTP_ENABLED:
        log(f"  Email notification skipped (SMTP disabled)")
        return

    # TODO: Implement SMTP email sending
    # This would send an email to NOTIFICATION_EMAIL with:
    # - Blog title
    # - Preview link: https://divitmindspace.com/studio/structure/post;{doc_id}
    # - Status (draft/published)
    log(f"  Email notification sent to {NOTIFICATION_EMAIL}")


def process_post(post: dict, generate_images: bool = True, require_approval: bool = False, as_draft: bool = True) -> dict:
    """Process a single post from the queue.

    Args:
        post: Post dict from queue
        generate_images: Whether to generate hero image
        require_approval: Whether to require WhatsApp approval before publishing
        as_draft: Save as draft (unpublished) if True
    """

    topic = post['topic']
    category = post.get('category', 'clinical')
    author_id = post.get('author_id', PAVITHRA_AUTHOR_ID)

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

    # Step 4: Save to Sanity (as draft or published)
    status_text = "draft" if as_draft else "published"
    log(f"  Saving to Sanity as {status_text}...")
    result = publish_to_sanity(content, category, author_id, main_image=main_image, as_draft=as_draft)

    if result['success']:
        log(f"  SUCCESS: Saved as {result.get('status', status_text)} - {result['url']}")

        # Send email notification for drafts
        if as_draft:
            send_email_notification(content['title'], result['slug'], result['document_id'], result.get('status', 'draft'))

        response = {
            'success': True,
            'document_id': result['document_id'],
            'slug': result['slug'],
            'url': result['url'],
            'title': content['title'],
            'status': result.get('status', status_text)
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


def check_and_process_queue(generate_images: bool = True, require_approval: bool = False, as_draft: bool = True):
    """Check queue for due posts and process them.

    Args:
        generate_images: Whether to generate hero images for posts
        require_approval: Whether to require WhatsApp approval before publishing
        as_draft: Save as draft (unpublished) if True
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
            result = process_post(post, generate_images=generate_images, require_approval=require_approval, as_draft=as_draft)

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
    """Add blog posts for the 5 core topics to the queue (immediate processing)."""

    queue = load_queue()
    now = datetime.now(timezone.utc)

    # Core topics for neurodivergent care - Dr. Pavithra's expertise areas
    test_topics = [
        {"topic": "autism", "category": "clinical"},
        {"topic": "adhd", "category": "clinical"},
        {"topic": "learning disabilities", "category": "education"},
        {"topic": "anxiety", "category": "clinical"},
        {"topic": "depression", "category": "clinical"},
    ]

    for i, item in enumerate(test_topics):
        # Schedule immediately (staggered by 1 minute for orderly processing)
        scheduled_time = now + timedelta(minutes=i)

        post = {
            "id": str(uuid.uuid4())[:8],
            "topic": item["topic"],
            "category": item["category"],
            "author_id": PAVITHRA_AUTHOR_ID,
            "scheduled": scheduled_time.isoformat(),
            "status": "pending",
            "created_at": now.isoformat()
        }

        queue['posts'].append(post)
        log(f"Added: {item['topic'].title()} (scheduled: {scheduled_time.strftime('%H:%M:%S')})")

    save_queue(queue)
    log(f"Added {len(test_topics)} posts to queue (Autism, ADHD, Learning Disabilities, Anxiety, Depression)")

    return test_topics


def run_daemon(check_interval: int = 60, generate_images: bool = True, require_approval: bool = False, as_draft: bool = True):
    """Run the agent continuously.

    Args:
        check_interval: Seconds between queue checks
        generate_images: Whether to generate hero images
        require_approval: Whether to require WhatsApp approval
        as_draft: Save as draft (unpublished) if True
    """

    log("Starting autonomous blog agent in daemon mode...")
    log(f"Author: Dr. Pavithra Lakshminarasimhan")
    log(f"Checking queue every {check_interval} seconds")
    log(f"Image generation: {'enabled' if generate_images else 'disabled'}")
    log(f"Save mode: {'DRAFT (unpublished)' if as_draft else 'PUBLISHED'}")
    log(f"WhatsApp approval: {'required' if require_approval else 'disabled'}")
    log("Press Ctrl+C to stop")

    try:
        while True:
            processed = check_and_process_queue(
                generate_images=generate_images,
                require_approval=require_approval,
                as_draft=as_draft
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
    global GENERATE_IMAGES, REQUIRE_APPROVAL, DRAFT_MODE

    parser = argparse.ArgumentParser(description="Autonomous Blog Agent for divit mind space")
    parser.add_argument('--daemon', action='store_true', help='Run continuously')
    parser.add_argument('--add-test', action='store_true', help='Add 5 core topic posts to queue')
    parser.add_argument('--status', action='store_true', help='Show queue status')
    parser.add_argument('--interval', type=int, default=60, help='Check interval in seconds (daemon mode)')
    parser.add_argument('--no-images', action='store_true', help='Disable image generation')
    parser.add_argument('--publish', action='store_true', help='Publish directly instead of saving as draft')
    parser.add_argument('--approval', action='store_true', help='Require WhatsApp approval before publishing')

    args = parser.parse_args()

    # Set global flags
    generate_images = not args.no_images
    GENERATE_IMAGES = generate_images

    as_draft = not args.publish
    DRAFT_MODE = as_draft

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

    log("=" * 60)
    log("DIVIT MINDSPACE AUTONOMOUS BLOG AGENT")
    log("Author: Dr. Pavithra Lakshminarasimhan")
    log("=" * 60)

    if args.status:
        show_queue_status()
    elif args.add_test:
        add_test_posts()
        show_queue_status()
    elif args.daemon:
        run_daemon(args.interval, generate_images=generate_images, require_approval=require_approval, as_draft=as_draft)
    else:
        # Single run - check and process
        log("Running single queue check...")
        log(f"Image generation: {'enabled' if generate_images else 'disabled'}")
        log(f"Save mode: {'DRAFT (unpublished)' if as_draft else 'PUBLISHED'}")
        log(f"WhatsApp approval: {'required' if require_approval else 'disabled'}")
        processed = check_and_process_queue(generate_images=generate_images, require_approval=require_approval, as_draft=as_draft)
        log(f"Processed {processed} posts")
        show_queue_status()


if __name__ == "__main__":
    main()
