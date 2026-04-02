#!/usr/bin/env python3
"""Publish a blog post to Sanity CMS."""

import os
import json
import requests
import uuid
from datetime import datetime, timezone

# Set the token
TOKEN = 'sk66qaMuOOdqEqeyLznWKTu3NGQ97XPcWLpOTIWbvwES0rc3rI4r9PJ1aqK8F6ISVEaxwtXu1tdZplSHrh8ZGcTAsiFtlohY3rQ0PoOjsf0t2wzUe9CpuqZAfCTOiv2qTAvqPLyJbTQi9BO4pKlhYWX7RBZq5u5COTHAKpiYZSIk6iHX3RWm'

PROJECT_ID = '3c4uripz'
DATASET = 'production'
API_VERSION = '2021-06-07'

base_url = f'https://{PROJECT_ID}.api.sanity.io/v{API_VERSION}'
headers = {
    'Authorization': f'Bearer {TOKEN}',
    'Content-Type': 'application/json'
}

def gen_key():
    return str(uuid.uuid4())[:12]

# PortableText blocks for the blog post
body_blocks = [
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Your kid walks in the door.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Backpack hits the floor. Within minutes — tears, yelling, maybe a slammed door.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Meanwhile, the teacher says they are doing great in class. Sound familiar?', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'You are not imagining it. And no, you are not doing something wrong at home.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h2',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': "It's Called After-School Restraint Collapse", 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Your child spends the entire school day holding it together. Following rules. Managing sensory overload. Navigating social situations. Suppressing impulses.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': "That takes enormous energy — especially for neurodivergent kids. By 3pm, they're running on empty.", 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': "Home is safe. You are safe. So they finally let go of everything they've been holding in all day.", 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': "It's not misbehavior. It's decompression.", 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h2',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Why This Hits ADHD and Autistic Kids Harder', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Neurotypical kids get tired after school too. But for kids with ADHD, autism, or anxiety, the effort to mask and keep up is significantly greater.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Think about it:', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'ADHD kids spend all day fighting their impulses, trying to sit still, working twice as hard to focus', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': "Autistic kids navigate sensory environments that can feel overwhelming, while trying to read social cues that don't come naturally", 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Anxious kids manage worry all day while appearing calm on the outside', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': "By the time they get home, there's nothing left in the tank.", 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h2',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': '5 Things That Actually Help', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h3',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': '1. Build in decompression time', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': "Don't ask about school the moment they walk in.", 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Give them 20-30 minutes of zero demands. Snack. Quiet space. Movement. Whatever helps them reset.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'The homework talk can wait.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h3',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': '2. Create a landing zone', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Same spot. Same routine. Every day.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Backpack goes here. Snack is ready there. They know exactly what to expect.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Predictability reduces the mental load.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h3',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': '3. Offer sensory relief', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'What helps your child regulate?', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Jumping on a trampoline', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Squeezing playdough', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Lying under a weighted blanket', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Listening to music with headphones', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Build this into the after-school routine before you need it.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h3',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': '4. Lower your expectations (temporarily)', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': "The after-school version of your child isn't the real them.", 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': "It's the depleted version. The version that needs connection and rest — not corrections and homework pressure.", 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Meet them where they are.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h3',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': '5. Watch for patterns', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Does it happen every day? Only certain days?', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Track what makes it worse:', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Substitute teachers', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Tests or transitions', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Less sleep the night before', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Skipped meals', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'The more you understand the triggers, the more you can plan ahead.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h2',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': "When It's More Than Just A Bad Day", 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Some after-school difficulty is normal.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'But if meltdowns are:', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Lasting over an hour', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Becoming physically unsafe', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Happening every single day without improvement', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Significantly impacting family life', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'It might be time to look deeper.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'An evaluation can help you understand what your child is dealing with — and get them the support they need.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h2',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'The Bottom Line', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': "Your child isn't giving you their worst.", 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': "They're giving you what's left after giving school their best.", 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'That meltdown? It means they trust you enough to fall apart.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'And with the right support, you can make the landing a little softer.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': "If you're wondering whether your child might benefit from an ADHD or autism evaluation, our team works with neurodivergent families every day. We're here when you're ready to talk.", 'marks': []}]
    }
]

# Build the post document
post_doc = {
    '_type': 'post',
    'title': 'Why Your Child Falls Apart After School (And What Actually Helps)',
    'slug': {
        '_type': 'slug',
        'current': 'after-school-meltdown-adhd'
    },
    'excerpt': "Your child holds it together at school then melts down at home. Here's why — and what actually helps.",
    'author': {
        '_type': 'reference',
        '_ref': '62aceb06-d288-4682-a3ad-441a655839fc'
    },
    'categories': ['parenting'],
    'publishedAt': datetime.now(timezone.utc).isoformat(),
    'readTime': 5,
    'featured': False,
    'body': body_blocks,
    'seo': {
        'metaTitle': 'After-School Meltdowns in ADHD Kids | divit mind space',
        'metaDescription': 'Why neurodivergent kids fall apart after school and 5 strategies that actually help.'
    }
}

mutation = {'mutations': [{'create': post_doc}]}
url = f'{base_url}/data/mutate/{DATASET}'

print('Publishing to Sanity CMS...')
print(f'Title: {post_doc["title"]}')
print(f'Slug: {post_doc["slug"]["current"]}')
print(f'Category: {post_doc["categories"][0]}')
print()

response = requests.post(url, headers=headers, json=mutation)

print(f'Status Code: {response.status_code}')

if response.status_code == 200:
    result = response.json()
    if 'results' in result and len(result['results']) > 0:
        doc_id = result['results'][0].get('id') or result['results'][0].get('documentId')
        print()
        print('=' * 50)
        print('SUCCESS! Blog post published!')
        print('=' * 50)
        print(f'Document ID: {doc_id}')
        print(f'URL: /blogs/after-school-meltdown-adhd')
        print()
    else:
        print(f'Response: {json.dumps(result, indent=2)}')
else:
    print(f'Error: {response.text}')
