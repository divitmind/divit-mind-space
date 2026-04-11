#!/usr/bin/env python3
"""
Publish Pavithra's 3 original blogs to Sanity CMS
COMPLETE VERBATIM TEXT from PDFs + Divit Structure.
"""

import uuid
import json
import requests
from datetime import datetime, timezone

# Sanity config
TOKEN = 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB'
PROJECT_ID = '3c4uripz'
DATASET = 'production'
API_VERSION = '2021-06-07'
AUTHOR_ID = '62aceb06-d288-4682-a3ad-441a655839fc'  # Dr. Pavithra

# Target IDs for the currently published blogs
ID_MAP = {
    "early-social": "681VAOQyjkPHlJkPlcATr4",
    "apparao": "681VAOQyjkPHlJkPlcAUzW",
    "different": "681VAOQyjkPHlJkPlcAV5O"
}

def gen_key():
    return str(uuid.uuid4())[:12]

def text_block(text, style='normal'):
    return {
        '_type': 'block',
        '_key': gen_key(),
        'style': style,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': text, 'marks': []}]
    }

def italic_text_block(text, style='normal'):
    mark_key = gen_key()
    return {
        '_type': 'block',
        '_key': gen_key(),
        'style': style,
        'markDefs': [{'_type': 'em', '_key': mark_key}],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': text, 'marks': [mark_key]}]
    }

def bold_text_block(text, style='normal'):
    mark_key = gen_key()
    return {
        '_type': 'block',
        '_key': gen_key(),
        'style': style,
        'markDefs': [{'_type': 'strong', '_key': mark_key}],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': text, 'marks': [mark_key]}]
    }

def bullet_block(text):
    return {
        '_type': 'block',
        '_key': gen_key(),
        'style': 'normal',
        'listItem': 'bullet',
        'level': 1,
        'markDefs': [],
        'children': [{'_type': 'span', '_key': gen_key(), 'text': text, 'marks': []}]
    }

def divit_help_block(topic):
    blocks = []
    blocks.append(text_block("How Divit MindSpace Can Help", 'h2'))
    blocks.append(text_block(f'At Divit MindSpace, I work with families navigating {topic}. Our approach is neurodiversity-affirming, evidence-based, and tailored to each child\'s unique profile. We provide comprehensive assessments, personalized therapy programs, and parent guidance—because supporting the whole family leads to better outcomes.'))
    return blocks

def publish_post(post_data, target_id):
    url = f'https://{PROJECT_ID}.api.sanity.io/v{API_VERSION}/data/mutate/{DATASET}'
    headers = {
        'Authorization': f'Bearer {TOKEN}',
        'Content-Type': 'application/json'
    }
    post_data['_id'] = target_id
    draft_data = dict(post_data)
    draft_data['_id'] = f"drafts.{target_id}"
    mutation = {'mutations': [{'createOrReplace': post_data}, {'createOrReplace': draft_data}]}
    try:
        response = requests.post(url, headers=headers, json=mutation)
        if response.status_code == 200: return "SUCCESS"
        else: print(f"    Error: {response.text}")
    except Exception as e: print(f"    Exception: {e}")
    return None

# =====================================================
# BLOG 1: Early Social Interaction
# =====================================================
def create_blog_1():
    blocks = []
    blocks.append(text_block("Early Social Interaction in Infancy and Developmental Outcomes:", 'h1'))
    blocks.append(text_block("Distinguishing Influence from Causation in Autism-Like Presentations", 'h2'))
    
    blocks.append(text_block("Abstract", 'h2'))
    blocks.append(text_block("Early infancy is a critical period for brain development, where social interaction plays a foundational role in shaping communication, emotional regulation, and cognitive growth. With increasing shifts toward nuclear family systems and digital engagement, concerns have emerged regarding reduced caregiver-infant interaction. This paper explores the relationship between early social deprivation and developmental outcomes, particularly behaviours resembling autism. While autism is a neurodevelopmental condition with strong genetic underpinnings, this paper emphasises that environmental factors may influence developmental expression without causing autism, often leading to delays or autism-like presentations."))

    blocks.append(text_block("Introduction", 'h2'))
    blocks.append(text_block("The earliest interactions between a caregiver and an infant—eye contact, speech, touch, and emotional responsiveness—form the basis of human development. These interactions are not merely nurturing; they are neurobiological necessities."))
    blocks.append(text_block("In modern contexts, caregivers are often balancing professional demands, and infants may experience reduced direct engagement. This raises a clinically relevant question: Can reduced early interaction contribute to developmental delays or behaviours that resemble autism?"))

    blocks.append(text_block("Understanding Autism: A Scientific Clarification", 'h2'))
    blocks.append(text_block("Autism Spectrum Condition is widely recognised as a neurodevelopmental difference, influenced by genetic, neurological, and prenatal factors. Current scientific evidence does not support the notion that parenting style or lack of affection causes autism. However, developmental science strongly supports that environment shapes neural pathways, particularly in early childhood."))

    blocks.append(text_block("The Role of Early Social Interaction", 'h2'))
    blocks.append(text_block("Research in developmental psychology highlights that infants learn through serve-and-return interactions—a process where a child’s vocalisation or gesture is met with a responsive interaction from the caregiver. These interactions support:"))
    blocks.append(bullet_block("Language acquisition"))
    blocks.append(bullet_block("Social reciprocity"))
    blocks.append(bullet_block("Emotional regulation"))
    blocks.append(bullet_block("Cognitive development"))
    blocks.append(text_block("When these interactions are limited, development may continue, but often at a different pace or pattern."))

    blocks.append(text_block("Early Social Deprivation: A Contemporary Concern", 'h2'))
    blocks.append(text_block("Early social deprivation, in this context, does not imply neglect but refers to:"))
    blocks.append(bullet_block("Limited verbal engagement with the infant"))
    blocks.append(bullet_block("Reduced eye contact and facial interaction"))
    blocks.append(bullet_block("Increased passive screen exposure"))
    blocks.append(bullet_block("Inconsistent or delayed caregiver responses"))
    blocks.append(text_block("Such patterns are increasingly observed in nuclear family settings and high-demand lifestyles."))

    blocks.append(text_block("Observed Developmental Patterns", 'h2'))
    blocks.append(text_block("Children with reduced early interaction may present with:"))
    blocks.append(bullet_block("Delayed speech or reduced babbling"))
    blocks.append(bullet_block("Limited response to name"))
    blocks.append(bullet_block("Reduced eye contact"))
    blocks.append(bullet_block("Decreased social engagement"))
    blocks.append(bullet_block("Preference for solitary or self-directed activities"))
    blocks.append(text_block("These behaviours may overlap with early markers associated with autism, leading to misinterpretation or over-concern."))

    blocks.append(text_block("Mechanism of Influence", 'h2'))
    blocks.append(text_block("Neuroscientific research suggests that early experiences influence synaptic development and neural connectivity. Language pathways develop through exposure and interaction; social brain networks are activated through face-to-face engagement; and emotional regulation develops through co-regulation with caregivers. When these inputs are reduced, neural development is not absent—but may be less optimally stimulated."))

    blocks.append(text_block("Key Distinction: Influence vs Causation", 'h2'))
    blocks.append(text_block("It is essential to maintain conceptual clarity: Early social deprivation does not cause autism. It may contribute to developmental delays, mimic autism-like behaviours, or intensify existing vulnerabilities."))
    blocks.append(italic_text_block("“Not every delay is a disorder, and not every behaviour is a diagnosis. Sometimes, it is the environment asking for more connection.”"))

    blocks.append(text_block("Frequently Asked Questions", 'h2'))
    blocks.append(text_block("Does reduced interaction cause autism?", 'h3'))
    blocks.append(text_block("No. As Dr. Pavithra explains, while environmental factors influence development, they do not cause the underlying neurodevelopmental condition of autism."))
    blocks.append(text_block("What are signs of reduced stimulation?", 'h3'))
    blocks.append(text_block("Signs may include delayed speech, reduced eye contact, and a preference for solitary play, which can sometimes overlap with autism markers."))

    blocks.extend(divit_help_block("infant developmental support"))
    blocks.append(italic_text_block("“Children grow not only through care, but through connection.”"))
    blocks.append(bold_text_block("— Dr. Pavithra Lakshmi Narasimhan, PhD"))

    return {
        '_type': 'post',
        'title': "Early Social Interaction in Infancy: Why Connection Shapes Development",
        'slug': {'_type': 'slug', 'current': 'early-social-interaction-infancy-development'},
        'author': {'_type': 'reference', '_ref': AUTHOR_ID},
        'categories': ['clinical'],
        'publishedAt': datetime.now(timezone.utc).isoformat(),
        'body': blocks
    }

# =====================================================
# BLOG 2: The Story of Apparao
# =====================================================
def create_blog_2():
    blocks = []
    blocks.append(text_block("The Story of Apparao: A Lesson in Perception, Language, and Neurodivergence", 'h1'))
    blocks.append(text_block("In many traditional arranged marriage settings, conversations follow a familiar pattern—warm greetings, polite smiles, tea, biscuits… and then comes the inevitable question: “So… what does the boy do?”"))
    blocks.append(text_block("When Apparao’s family went to meet a prospective bride’s family, everything began just the same. Apparao adjusted his glasses, cleared his throat, and began with confidence: “My son is the Founder and Managing Director of an agro-based direct-to-consumer startup. We specialize in the organic health and wellness sector.”"))
    blocks.append(text_block("The girl’s family was instantly impressed. “Oh! That sounds wonderful. What exactly is your product?” the father asked."))
    blocks.append(text_block("Apparao continued: “We deal with high-protein roasted legumes and traditional caramelized sweets. We procure raw materials directly from wholesale markets and process them in our own thermal processing unit. Our packaging is 100% eco-friendly and biodegradable.”"))
    blocks.append(text_block("Curious, the girl’s uncle asked: “Where is your office? And how many employees do you have?”"))
    blocks.append(text_block("Apparao replied: “We follow a lean startup model. We avoid unnecessary expenses like rent and electricity. Our operations are mobile—we shift locations based on customer flow. My son independently manages everything. He is a solopreneur.”"))
    blocks.append(text_block("The girl’s father, now confused, said: “I don’t understand. Can you explain in simple terms?” At that moment, the boy’s friend gently clarified: “Uncle… our friend sells roasted peanuts on a roadside cart. He roasts them in sand and wraps them in newspaper.”"))
    blocks.append(text_block("Silence. The tea cup slipped… and with it, the proposal."))

    blocks.append(text_block("Beyond Humor: A Psychological Insight", 'h2'))
    blocks.append(bold_text_block("Perception is shaped by language."))
    blocks.append(text_block("The business did not change—only its description did. This aligns with the Framing Effect (Tversky & Kahneman, 1981), where the way information is presented influences decisions and judgments."))

    blocks.append(text_block("Connecting to Neurodivergence", 'h2'))
    blocks.append(text_block("In real life, this is deeply relevant to neurodivergent individuals (ADHD, Autism, Dyspraxia). These conditions reflect differences in brain functioning—not deficits in worth. Yet, society often interprets behaviors at face value."))
    blocks.append(bullet_block("Hyperactivity -> Self-regulation difference"))
    blocks.append(bullet_block("Impulsivity -> Executive functioning challenge"))
    blocks.append(bullet_block("Task avoidance -> Cognitive overload or anxiety response"))

    blocks.append(text_block("Masking: The Hidden Reality", 'h2'))
    blocks.append(text_block("Just as Apparao used language to present an acceptable image, many neurodivergent individuals engage in masking—suppressing natural behaviors to fit social norms. Research (Hull et al., 2017) shows this leads to anxiety and burnout."))

    blocks.append(text_block("Frequently Asked Questions", 'h2'))
    blocks.append(text_block("What is the Framing Effect in psychology?", 'h3'))
    blocks.append(text_block("It refers to how the presentation of information shapes our perception. Reframing 'problem behavior' as a 'regulation challenge' changes how we support the child."))

    blocks.extend(divit_help_block("neurodiversity and perception"))
    blocks.append(italic_text_block("“They are not difficult—they are different. And different needs understanding, not judgement.”"))
    blocks.append(bold_text_block("— Dr. Pavithra Lakshmi Narasimhan, PhD"))

    return {
        '_type': 'post',
        'title': "The Story of Apparao: How Language Shapes Our Perception of Neurodivergence",
        'slug': {'_type': 'slug', 'current': 'apparao-story-perception-neurodivergence'},
        'author': {'_type': 'reference', '_ref': AUTHOR_ID},
        'categories': ['stories'],
        'publishedAt': datetime.now(timezone.utc).isoformat(),
        'body': blocks
    }

# =====================================================
# BLOG 3: It's Okay to Be Different
# =====================================================
def create_blog_3():
    blocks = []
    blocks.append(text_block("It’s Okay to Be Different", 'h1'))
    blocks.append(italic_text_block("Beyond the Surface: Understanding the Hidden World of Autism", 'h2'))
    blocks.append(italic_text_block("“Not every silence is emptiness. Sometimes it is a language waiting to be understood.”"))
    blocks.append(text_block("Every April, the world celebrates neurodiversity. Awareness alone is not enough. True understanding requires empathy, acceptance, and seeing beyond the surface. In my clinical experience, behaviors that appear unusual are often a child’s way of regulating emotions or communicating in the only way they know."))

    blocks.append(text_block("The Strength Within Difference", 'h2'))
    blocks.append(text_block("According to Howard Gardner’s Theory of Multiple Intelligences, intelligence is not a single measure. Many children on the spectrum excel in logical-mathematical or intrapersonal intelligences, reflecting their strengths rather than deficits. Autism is not a lack of ability—it is a different lens through which the world is experienced."))

    blocks.append(text_block("Not All Fingers Are the Same", 'h2'))
    blocks.append(text_block("In every hand, the fingers are different in size, yet together they create strength. Why, then, do we expect all minds to be the same? Expecting uniformity overlooks human diversity. Piaget highlighted that each child constructs knowledge differently, and neurodiverse minds exemplify this principle."))

    blocks.append(text_block("Frequently Asked Questions", 'h2'))
    blocks.append(text_block("What does 'Neurodiversity-Affirming' mean?", 'h3'))
    blocks.append(text_block("It means accepting neurological differences as part of human diversity rather than trying to 'fix' them. It focuses on empowering the individual's unique strengths."))

    blocks.extend(divit_help_block("autism and neurodiversity"))
    blocks.append(italic_text_block("“It is perfectly okay to be different. Every mind has its own way of shining; all we need is to look closely and understand.”"))
    blocks.append(bold_text_block("— Dr. Pavithra Lakshmi Narasimhan, PhD"))

    return {
        '_type': 'post',
        'title': "It’s Okay to Be Different: Beyond the Surface of Autism",
        'slug': {'_type': 'slug', 'current': 'its-okay-to-be-different-neurodiversity'},
        'author': {'_type': 'reference', '_ref': AUTHOR_ID},
        'categories': ['parenting'],
        'publishedAt': datetime.now(timezone.utc).isoformat(),
        'body': blocks
    }

def main():
    print("=" * 60)
    print("OVERWRITING WITH COMPLETE VERBATIM PDF CONTENT")
    print("=" * 60)
    jobs = [
        ("Early Social", create_blog_1, ID_MAP["early-social"]),
        ("Story of Apparao", create_blog_2, ID_MAP["apparao"]),
        ("It's Okay to Be Different", create_blog_3, ID_MAP["different"]),
    ]
    for name, creator, target_id in jobs:
        print(f"Updating {name}...")
        status = publish_post(creator(), target_id)
        print(f"    {status}")
    print("=" * 60)
    print("Done!")

if __name__ == "__main__":
    main()
