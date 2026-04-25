// Replaces the siteSettings.aboutPage.faqs array with 6 high-intent FAQs
// aligned to the /about-us page defaults. Run: node scripts/update-about-faqs.mjs

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => line.split('=').slice(0, 2)),
)

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-02-09',
  token: env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const faqs = [
  {
    question:
      'Where is the best autism and ADHD assessment center near Sarjapur Road or Kasavanahalli in Bangalore?',
    answer:
      "Divit MindSpace, located at Aadeshwar Chambers, Kasavanahalli (off Sarjapur Road), is a leading center for clinical assessments of Autism, ADHD, Learning Disabilities, Adult Autism, and Adult ADHD. Our licensed psychologists serve families across Sarjapur Road, Kasavanahalli, HSR Layout, Bellandur, Koramangala, Whitefield, and Bengaluru. Book a free consultation at +91-99016-66139.",
  },
  {
    question:
      'Is there a physiotherapy clinic near Kasavanahalli or HSR Layout for pain management, sports & gym injury rehab, and post-surgical care?',
    answer:
      "Yes. Divit MindSpace's Kasavanahalli center (off Sarjapur Road) offers dedicated physiotherapy including Pain Management, Pain Modalities (ultrasound, TENS, IFT, heat and cold therapy), Post-Surgical Rehabilitation, Gym & Sports Injury Sessions, Assistive Devices assessment, and Wheelchair Training — for all ages. We serve families in Kasavanahalli, HSR Layout, Bellandur, Bengaluru, and surrounding areas.",
  },
  {
    question:
      'Where can teenagers and adults find counseling for stress, anxiety, depression, adult ADHD, or adult autism near Bellandur or Sarjapur Road?',
    answer:
      'Divit MindSpace provides professional counseling for teenagers and adults covering stress, anxiety, depression, adult ADHD, and adult autism. Located at Kasavanahalli off Sarjapur Road, we serve Bellandur, HSR Layout, Koramangala, Whitefield, and Bengaluru. Appointments: +91-99016-66139 or WhatsApp https://wa.me/919901666139.',
  },
  {
    question:
      'Which center near Bangalore offers NIOS support, special education, shadow teacher training, and parent coaching?',
    answer:
      "Divit MindSpace's Kasavanahalli center (off Sarjapur Road) offers NIOS Support Program, Special Education and Remedial Sessions, Certificate and Diploma in Special Education, Shadow Teacher Training, and Parental Training Programs. We support neurodivergent children, teens, and adults — and their families — across Bangalore including HSR Layout, Bellandur, Koramangala, Whitefield, and Electronic City.",
  },
  {
    question: 'What makes Divit MindSpace different from other therapy centers in Bangalore?',
    answer:
      "We combine clinical expertise with personal understanding — our founders have firsthand experience with neurodivergent families. Our strength-based, neuro-affirming approach focuses on each individual's strengths, not just challenges, and plans are tailored to age and goals. We also run free awareness sessions across schools and communities around Sarjapur Road, HSR Layout, and Bellandur.",
  },
  {
    question: 'Does Divit MindSpace offer services for adults with ADHD, autism, anxiety, or chronic pain?',
    answer:
      'Yes. Our Kasavanahalli center provides adult-focused services including Adult ADHD and Adult Autism assessments, professional counseling for stress, anxiety, and depression, cognitive therapy, and physiotherapy for pain management, post-surgical rehab, and gym/sports injuries. Many adults visit us for late-diagnosis support, workplace challenges, and mental health care.',
  },
]

async function run() {
  const faqBlocks = faqs.map((f) => ({
    _key: Math.random().toString(36).slice(2, 10),
    _type: 'faq',
    question: f.question,
    answer: f.answer,
  }))

  console.log(`🔁 Updating siteSettings.aboutPage.faqs → ${faqBlocks.length} FAQs...`)
  await client.patch('siteSettings').set({ 'aboutPage.faqs': faqBlocks }).commit()
  console.log('✅ Done.')
}

run().catch((e) => {
  console.error('❌ Failed:', e)
  process.exit(1)
})
