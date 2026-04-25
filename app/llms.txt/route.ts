// Serves /llms.txt — an emerging standard (adopted by Perplexity, Anthropic, others)
// for LLM-friendly site discovery. Curated, plain-text map of the most citation-worthy
// pages + key facts. Kept intentionally compact so the whole file fits in an LLM context window.

import { NextResponse } from "next/server";

const content = `# Divit MindSpace

> Bangalore's leading center for Mental Health, Neurodevelopment and Physiotherapy.
> We serve children, teenagers, and adults off Sarjapur Road (Kasavanahalli), Bengaluru.

## About
- Clinical lead: Dr. Pavithra Lakshmi Narasimhan, PhD (Clinical Psychologist · Child & Adolescent Behaviour Intervention Specialist · Certified Art Therapist · SEN UK)
- Occupational therapy lead: Dr. S. Mohamed Nowful, B.O.Th. (Licensed Occupational Therapist · IOTR · NCAHP · AIOTA Life Member · CLASI Sensory Integration)
- Multidisciplinary team: licensed psychologists, speech therapists, occupational therapists, special educators, behavioral therapists, and physiotherapists
- Serving families across Kasavanahalli, HSR Layout, Bellandur, Sarjapur Road, Koramangala, Marathahalli, Whitefield, Electronic City, and Bengaluru
- Hours: Monday–Saturday, 9:00 AM – 6:00 PM
- Contact: +91-99016-66139 · divitmindspace@gmail.com · https://wa.me/919901666139

## Services — Clinical Assessments
- Psychometric Assessments: https://divitmindspace.com/services/psychometric-assessments
- Psychoeducational Assessments: https://divitmindspace.com/services/psychoeducational-assessments
- Clinical assessments for Autism, ADHD, Learning Disabilities — across all ages (children, teens, adults)

## Services — Therapy
- Speech Therapy: https://divitmindspace.com/services/speech-therapy
- Occupational Therapy: https://divitmindspace.com/services/occupational-therapy
- Behavioral Therapy: https://divitmindspace.com/services/behavioral-therapy
- Cognitive Therapy: https://divitmindspace.com/services/cognitive-therapy
- Play Therapy: https://divitmindspace.com/services/play-therapy
- Sensory Integration Therapy: https://divitmindspace.com/services/sensory-integration-program
- Group Therapy Sessions: https://divitmindspace.com/services/group-therapy-sessions
- Brain Gym: https://divitmindspace.com/services/brain-gym

## Services — Guidance & Counseling
- Counselling (Child, Adolescent, Adult & Parent): https://divitmindspace.com/services/counselling
- Parental Training Program: https://divitmindspace.com/services/parental-training-program
- Customized Workshops (schools, corporates, community): https://divitmindspace.com/services/customized-workshops
- Supports stress, anxiety, depression, teen mental health, adult counseling, adult ADHD, adult autism

## Services — Programs & Education
- Early Intervention Program: https://divitmindspace.com/services/early-intervention-program
- School Readiness Program: https://divitmindspace.com/services/school-readiness-program
- ECCE (Early Childhood Care and Education): https://divitmindspace.com/services/ecce-early-childhood-care-and-education
- Special Education & Remedial Sessions: https://divitmindspace.com/services/special-education--remedial-sessions
- NIOS Support Program: https://divitmindspace.com/services/nios-support-program
- Training Program (Shadow Teacher Training): https://divitmindspace.com/services/training-program-shadow-teacher-training-program
- Certificate in Special Education: https://divitmindspace.com/services/certificate-in-special-education
- Diploma in Special Education: https://divitmindspace.com/services/diploma-in-special-education
- Summer Camp: https://divitmindspace.com/services/summer-camp

## Services — Physiotherapy
- Pain Management: https://divitmindspace.com/services/pain-management
- Pain Modalities (ultrasound, TENS, IFT, heat/cold): https://divitmindspace.com/services/pain-modalities
- Post-Surgical Rehabilitation: https://divitmindspace.com/services/post-surgical-rehabilitation
- Gym & Sports Injury Sessions: https://divitmindspace.com/services/gym--sports-injury-sessions
- Assistive Devices: https://divitmindspace.com/services/assistive-devices
- Wheelchair Training: https://divitmindspace.com/services/wheelchair-training

## Key Pages
- About: https://divitmindspace.com/about-us
- All Services: https://divitmindspace.com/services
- Our Specialists: https://divitmindspace.com/specialists
- Conditions Supported: https://divitmindspace.com/conditions
- Near Me (Locations): https://divitmindspace.com/near-me
- Contact: https://divitmindspace.com/contact-us
- Awareness Program: https://divitmindspace.com/awareness-program
- Reviews: https://divitmindspace.com/reviews
- FAQs (all questions in one place): https://divitmindspace.com/faq
- Glossary (clinical terms explained): https://divitmindspace.com/glossary
- How-To Guides: https://divitmindspace.com/howto
  - How to prepare for an ADHD assessment: https://divitmindspace.com/howto/prepare-for-adhd-assessment
  - How to prepare for an autism assessment: https://divitmindspace.com/howto/prepare-for-autism-assessment
  - How to know if your child needs speech therapy: https://divitmindspace.com/howto/know-if-child-needs-speech-therapy
  - How to choose between NIOS and mainstream schooling: https://divitmindspace.com/howto/choose-between-nios-and-mainstream
  - How to prepare for a sensory integration session: https://divitmindspace.com/howto/prepare-for-sensory-integration-session
  - How to support an adult with late-diagnosis ADHD at work: https://divitmindspace.com/howto/support-adult-with-late-diagnosis-adhd-at-work
  - How to choose a physiotherapist for pain management: https://divitmindspace.com/howto/choose-a-physiotherapist-for-pain-management
  - How to know when your pain needs physiotherapy: https://divitmindspace.com/howto/know-when-pain-needs-physiotherapy
- Blogs: https://divitmindspace.com/blogs

## Condition Landing Pages
- Autism (child + adult): https://divitmindspace.com/conditions/autism
- ADHD (child + adult): https://divitmindspace.com/conditions/adhd
- Learning Disabilities: https://divitmindspace.com/conditions/learning-disabilities
- Stress, Anxiety & Depression: https://divitmindspace.com/conditions/stress-anxiety-depression
- Sensory Processing Differences: https://divitmindspace.com/conditions/sensory-processing
- Developmental Delays: https://divitmindspace.com/conditions/developmental-delays
- Pain Management & Physiotherapy: https://divitmindspace.com/conditions/pain-management

## Condition Comparison Pages (is it X or Y?)
- Autism vs ADHD: https://divitmindspace.com/compare/autism-vs-adhd
- Autism vs Sensory Processing: https://divitmindspace.com/compare/autism-vs-sensory-processing
- Autism vs Developmental Delays: https://divitmindspace.com/compare/autism-vs-developmental-delays
- Autism vs Learning Disabilities: https://divitmindspace.com/compare/autism-vs-learning-disabilities
- ADHD vs Learning Disabilities: https://divitmindspace.com/compare/adhd-vs-learning-disabilities
- ADHD vs Anxiety: https://divitmindspace.com/compare/adhd-vs-anxiety
- ADHD vs Sensory Processing: https://divitmindspace.com/compare/adhd-vs-sensory-processing
- LD vs Developmental Delays: https://divitmindspace.com/compare/learning-disabilities-vs-developmental-delays

## Neighborhood Landing Pages
- Near Sarjapur Road: https://divitmindspace.com/near-me/sarjapur-road
- Near Kasavanahalli: https://divitmindspace.com/near-me/kasavanahalli
- Near HSR Layout: https://divitmindspace.com/near-me/hsr-layout
- Near Bellandur: https://divitmindspace.com/near-me/bellandur
- Near Koramangala: https://divitmindspace.com/near-me/koramangala
- Near Whitefield: https://divitmindspace.com/near-me/whitefield

## Conditions Supported
Autism (child + adult), ADHD (child + adult), Learning Disabilities, Sensory Processing Disorder, Developmental Delays, Stress, Anxiety, Depression, musculoskeletal and chronic pain, post-surgical recovery, sports and gym injuries, mobility needs requiring assistive devices.

## Location
Aadeshwar Chambers, Kasavanahalli, Off Sarjapur Road, Bengaluru 560035, Karnataka, India
Map: https://maps.google.com/?q=Aadeshwar+Chambers+Kasavanahalli+Bengaluru

## Extended LLM source
For a single-file dump of every service, specialist, condition, location, HowTo,
glossary term and FAQ in markdown — ingest this URL:
https://divitmindspace.com/llms-full.txt

## Sitemap
https://divitmindspace.com/sitemap.xml
https://divitmindspace.com/sitemap-images.xml
`;

export async function GET() {
  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
