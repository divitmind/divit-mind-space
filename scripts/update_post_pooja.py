#!/usr/bin/env python3
"""Update blog post with Pooja Mittal's voice and set her as author."""

import requests
import uuid
from datetime import datetime, timezone

TOKEN = 'sk66qaMuOOdqEqeyLznWKTu3NGQ97XPcWLpOTIWbvwES0rc3rI4r9PJ1aqK8F6ISVEaxwtXu1tdZplSHrh8ZGcTAsiFtlohY3rQ0PoOjsf0t2wzUe9CpuqZAfCTOiv2qTAvqPLyJbTQi9BO4pKlhYWX7RBZq5u5COTHAKpiYZSIk6iHX3RWm'

PROJECT_ID = '3c4uripz'
DATASET = 'production'
API_VERSION = '2021-06-07'

base_url = f'https://{PROJECT_ID}.api.sanity.io/v{API_VERSION}'
headers = {
    'Authorization': f'Bearer {TOKEN}',
    'Content-Type': 'application/json'
}

POST_ID = '4356CayLMjUUkSc3XFTdtw'
POOJA_AUTHOR_ID = '7b2a2e20-96ca-4665-8f29-41466bf231b6'

def gen_key():
    return str(uuid.uuid4())[:12]

# Rewritten in Pooja Mittal's voice
body_blocks = [
    # Intro - Pooja's style: relatable opening
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Many parents notice a confusing pattern: their child seems calm and well-behaved at school, but the moment they come home, there are tears, meltdowns, and emotional outbursts.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Teachers say everything is fine. Yet at home, the picture looks completely different.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'If this sounds familiar, you are not alone. This is a common experience for families of neurodivergent children, and there is a reason behind it.', 'marks': []}]
    },
    # Section 1 - What Is header (Pooja's style)
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h2',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'What Is After-School Restraint Collapse?', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'After-school restraint collapse refers to the emotional and behavioral release children experience after holding themselves together throughout the school day.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'During school hours, children work hard to follow rules, manage sensory input, navigate social situations, and control impulses. This requires significant mental and emotional effort, especially for children with autism, ADHD, or anxiety.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'By the time they reach home, their emotional energy is depleted. Home feels safe. Parents feel safe. So the child finally releases everything they have been holding in.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'This is not misbehavior. It is emotional decompression.', 'marks': []}]
    },
    # Section 2 - Why header (Pooja's style)
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h2',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Why Neurodivergent Children Are More Affected', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'All children experience some level of fatigue after school. However, children with ADHD, autism spectrum disorder, or anxiety face additional challenges that intensify this experience.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Children with ADHD spend the day working harder to maintain focus, control impulses, and remain seated', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Children with autism may struggle with sensory overload and the effort required to interpret social cues', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Children with anxiety often mask their worries throughout the day while appearing calm externally', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'This consistent effort to "fit in" and manage expectations is exhausting. By the end of the school day, there is little emotional capacity remaining.', 'marks': []}]
    },
    # Section 3 - Strategies (Pooja's structured approach)
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h2',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Practical Strategies to Support Your Child', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Understanding the cause is the first step. The next step is creating a structured after-school routine that supports emotional regulation.', 'marks': []}]
    },
    # Strategy 1
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h3',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': '1. Allow Decompression Time', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Avoid asking questions about school immediately after arrival. Instead, provide 20 to 30 minutes of low-demand time. This may include a quiet snack, free play, or simply resting.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Homework and structured activities can wait until the child has had time to reset.', 'marks': []}]
    },
    # Strategy 2
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h3',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': '2. Create a Predictable Routine', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Consistency reduces anxiety and mental effort. Establish a predictable after-school routine:', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Designate a specific place for the backpack', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Prepare a snack in advance', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Keep the environment calm and predictable', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'When children know what to expect, they require less mental energy to navigate the transition.', 'marks': []}]
    },
    # Strategy 3
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h3',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': '3. Incorporate Sensory Regulation Activities', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Sensory input helps children regulate their nervous system. Consider activities such as:', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Physical movement like jumping or swinging', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Deep pressure activities like weighted blankets', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Calming sensory tools like playdough or fidgets', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Quiet listening with headphones', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Building these activities into the daily routine before a meltdown occurs is more effective than using them as intervention after.', 'marks': []}]
    },
    # Strategy 4
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h3',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': '4. Adjust Expectations During Transition', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'The child you see after school is not reflecting their true capabilities. They are emotionally depleted and need connection and rest rather than additional demands.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Lowering expectations during this window and meeting the child where they are reduces conflict and supports recovery.', 'marks': []}]
    },
    # Strategy 5
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h3',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': '5. Identify Triggers and Patterns', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Observe whether certain days are more difficult than others. Common triggers include:', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Changes in routine such as substitute teachers', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Tests or academic pressure', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Poor sleep the previous night', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Skipped meals or hunger', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Tracking these patterns allows for proactive planning and support.', 'marks': []}]
    },
    # When to Seek Help (Pooja's style)
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h2',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'When to Seek Professional Support', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Some degree of after-school difficulty is common and manageable. However, professional evaluation may be helpful if meltdowns are:', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Lasting more than an hour consistently', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Becoming physically unsafe for the child or family', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Occurring daily without improvement', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Significantly affecting family functioning', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'A comprehensive evaluation can identify underlying factors such as ADHD, autism, anxiety, or sensory processing differences, and guide appropriate intervention.', 'marks': []}]
    },
    # Conclusion (Pooja's empowering style with Divit mention)
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'h2',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'Supporting Your Child Through Understanding', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'When a child falls apart after school, it is not a reflection of poor parenting or defiance. It is a sign that the child feels safe enough to release what they have been carrying all day.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'With structured routines, sensory support, and adjusted expectations, parents can help their child transition more smoothly and reduce the intensity of these episodes.', 'marks': []}]
    },
    {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': 'At Divit MindSpace, we work with families to understand their child\'s unique needs and develop personalized strategies for home and school. If you are looking for clarity and support, our team is here to help.', 'marks': []}]
    }
]

# Update the post
update_data = {
    'author': {
        '_type': 'reference',
        '_ref': POOJA_AUTHOR_ID
    },
    'body': body_blocks,
    'excerpt': 'After-school meltdowns are common in neurodivergent children. Understanding restraint collapse and structured strategies can help families support smoother transitions.'
}

mutation = {
    'mutations': [{
        'patch': {
            'id': POST_ID,
            'set': update_data
        }
    }]
}

url = f'{base_url}/data/mutate/{DATASET}'

print('Updating post with Pooja Mittal voice...')
print(f'Post ID: {POST_ID}')
print(f'New Author: Pooja Mittal ({POOJA_AUTHOR_ID})')
print()

response = requests.post(url, headers=headers, json=mutation)

if response.status_code == 200:
    print('=' * 50)
    print('SUCCESS! Post updated.')
    print('=' * 50)
    print('Author: Pooja Mittal')
    print('Voice: Professional, structured, evidence-based')
    print('URL: /blogs/after-school-meltdown-adhd')
else:
    print(f'Error: {response.status_code}')
    print(response.text)
