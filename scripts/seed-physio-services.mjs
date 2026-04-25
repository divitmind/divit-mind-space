// Seeds new Physiotherapy services + Customized Workshops + re-categorizes Parental Training.
// Run: node scripts/seed-physio-services.mjs
// Idempotent: skips docs whose slug already exists.

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

const slugify = (s) =>
  s.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').slice(0, 96)

const physioServices = [
  {
    title: 'Pain Management',
    category: 'physiotherapy',
    description:
      'Personalized physiotherapy for acute and chronic pain — back, neck, shoulder, joint, and musculoskeletal pain management for all ages.',
    duration: '45-minute sessions',
    format: 'In-person at our Kasavanahalli center',
    overview:
      'Our Pain Management program uses evidence-based physiotherapy techniques to assess, treat, and reduce acute and chronic pain. Sessions are tailored to your specific condition and age, combining hands-on therapy, targeted exercises, and patient education so you can return to daily activities with confidence.',
    benefits: [
      'Reduction in chronic and acute pain intensity',
      'Improved mobility, posture, and functional strength',
      'Personalized exercise plans you can continue at home',
      'Education on pain triggers and prevention strategies',
      'Care plans coordinated with your clinician or specialist',
    ],
    whatToExpect: [
      'Initial assessment of pain history, lifestyle, and movement patterns',
      'Hands-on physiotherapy combined with therapeutic exercises',
      'Progress tracking and session-to-session plan adjustments',
      'Home exercise program and posture guidance',
    ],
    whoIsItFor: [
      'Adults with chronic back, neck, shoulder, or joint pain',
      'Individuals recovering from injuries or surgical procedures',
      'Office professionals with posture-related or repetitive strain pain',
      'Seniors managing age-related musculoskeletal discomfort',
    ],
    faqs: [
      {
        question: 'How many pain management sessions will I need?',
        answer:
          'It depends on your condition and goals. Most clients see meaningful improvement within 6–10 sessions, though chronic conditions may benefit from longer care plans. Your therapist reviews progress at regular intervals.',
      },
      {
        question: 'Do I need a doctor referral to start physiotherapy at Divit MindSpace?',
        answer:
          'A referral is not required, but we welcome collaboration with your physician or specialist. If you already have scans, reports, or prescriptions, please bring them to your first visit.',
      },
      {
        question: 'Can physiotherapy help with chronic back pain from sitting long hours?',
        answer:
          'Yes. Our Kasavanahalli center regularly supports IT professionals and adults in HSR Layout, Bellandur, and off Sarjapur Road with posture-related and sedentary-lifestyle pain through targeted physiotherapy.',
      },
    ],
  },
  {
    title: 'Pain Modalities',
    category: 'physiotherapy',
    description:
      'Advanced physiotherapy modalities including ultrasound, TENS, IFT, heat and cold therapy for targeted pain relief and tissue healing.',
    duration: '30–45-minute sessions',
    format: 'In-person at our Kasavanahalli center',
    overview:
      'Pain Modalities brings together advanced therapeutic tools — including ultrasound therapy, TENS, interferential therapy (IFT), and heat/cold applications — to accelerate pain relief, reduce inflammation, and support tissue healing. Used alone or alongside active physiotherapy, modalities are matched to your condition.',
    benefits: [
      'Faster relief from inflammation and soft-tissue pain',
      'Non-invasive, drug-free pain management options',
      'Improved circulation and tissue healing',
      'Complements active rehab and exercise programs',
    ],
    whatToExpect: [
      'Clinical assessment to select the right modality for your condition',
      'Application of modality by a qualified physiotherapist',
      'Integration with stretching and strengthening as needed',
      'Review of progress and adjustment of approach session by session',
    ],
    whoIsItFor: [
      'Individuals with acute injury-related pain or swelling',
      'Patients with soft-tissue strains, sprains, or overuse conditions',
      'Those seeking non-invasive alternatives to pain medication',
      'Clients in post-surgical or post-injury recovery phases',
    ],
    faqs: [
      {
        question: 'Are pain modalities safe?',
        answer:
          'Yes, when delivered by trained physiotherapists. At Divit MindSpace our team screens for contraindications (such as pregnancy, pacemakers, or open wounds) before any modality is applied.',
      },
      {
        question: 'Can modalities replace exercise-based physiotherapy?',
        answer:
          'Modalities work best as part of a broader plan that includes movement, strengthening, and education. They accelerate early-stage relief so active rehab can progress faster.',
      },
    ],
  },
  {
    title: 'Post-Surgical Rehabilitation',
    category: 'physiotherapy',
    description:
      'Structured post-operative physiotherapy for knee, hip, shoulder, spine, and orthopedic surgeries — restoring strength, mobility, and confidence.',
    duration: '45–60-minute sessions',
    format: 'In-person at our Kasavanahalli center',
    overview:
      'Our Post-Surgical Rehabilitation program supports recovery after orthopedic and soft-tissue surgeries — including knee and hip replacements, shoulder repairs, spine surgery, and ligament reconstruction. Protocols align with your surgeon\'s guidelines and progress you safely from early healing to full functional return.',
    benefits: [
      'Protocol-driven recovery aligned with your surgeon\'s plan',
      'Restoration of range of motion, strength, and balance',
      'Reduced risk of post-surgical complications and stiffness',
      'Return to daily activities, work, and sport at your own pace',
      'Ongoing reassessment throughout each phase of healing',
    ],
    whatToExpect: [
      'Review of operative notes and any surgeon-prescribed precautions',
      'Phased rehabilitation — early mobility, strengthening, functional return',
      'Manual therapy, targeted exercise, and modality-based pain control as needed',
      'Home exercise program updated at each stage of recovery',
    ],
    whoIsItFor: [
      'Post knee, hip, shoulder, or spine surgery patients',
      'Individuals recovering from ligament or tendon repairs',
      'Patients needing structured recovery after orthopedic procedures',
      'Anyone wanting guided, safe progression back to activity',
    ],
    faqs: [
      {
        question: 'When should I start physiotherapy after surgery?',
        answer:
          'Your surgeon usually recommends a start date based on your procedure. Many clients begin within the first 1–3 weeks post-op; we coordinate closely with your operating team to stay aligned with your protocol.',
      },
      {
        question: 'How long does post-surgical rehab typically take?',
        answer:
          'Timelines vary by surgery — for example, knee replacement rehab often spans 3–6 months, while smaller procedures may finish in 6–12 weeks. We set clear milestones so you always know where you are.',
      },
    ],
  },
  {
    title: 'Gym & Sports Injury Sessions',
    category: 'physiotherapy',
    description:
      'Dedicated physiotherapy for gym pain, sports injuries, muscle strains, and overuse — get back to training safely with a guided recovery plan.',
    duration: '45-minute sessions',
    format: 'In-person at our Kasavanahalli center',
    overview:
      'Regular sessions designed for gym-goers, runners, and amateur-to-serious athletes dealing with training-related pain and injury. We assess movement mechanics, address the source of the problem, and build a recovery-to-performance plan so you can return to your sport stronger and with lower re-injury risk.',
    benefits: [
      'Targeted recovery from gym, running, and sports-related injuries',
      'Biomechanical assessment to identify movement faults',
      'Progressive strengthening and mobility programs',
      'Return-to-sport planning with measurable milestones',
      'Education on warm-up, recovery, and injury prevention',
    ],
    whatToExpect: [
      'Detailed injury history and movement assessment',
      'Hands-on therapy plus sport-specific corrective exercises',
      'Progress reviews tied to your training and performance goals',
      'Home and gym exercise programs matched to your schedule',
    ],
    whoIsItFor: [
      'Gym-goers with back, knee, shoulder, or training-related pain',
      'Runners and weekend athletes managing strains or overuse injuries',
      'Athletes returning from injury wanting safe progression',
      'Anyone whose training has been interrupted by pain',
    ],
    faqs: [
      {
        question: 'I have pain from lifting at the gym — can physiotherapy help?',
        answer:
          'Yes. We regularly support gym-goers in Kasavanahalli, HSR Layout, and Bellandur with lifting-related back, shoulder, and knee pain. Sessions address both immediate relief and the movement patterns that caused the issue.',
      },
      {
        question: 'Will I need to stop training completely during recovery?',
        answer:
          'Usually not. Most plans modify rather than stop training. Your physiotherapist works with you to keep as much active training as is safe while you recover.',
      },
    ],
  },
  {
    title: 'Assistive Devices',
    category: 'physiotherapy',
    description:
      'Assessment, selection, and training on assistive devices — walkers, canes, orthoses, and mobility aids — for independence and safety.',
    duration: '45-minute sessions',
    format: 'In-person at our Kasavanahalli center',
    overview:
      'Our Assistive Devices program helps individuals and caregivers select and confidently use the right mobility aids — walkers, canes, crutches, orthoses, and other supports. Our physiotherapists assess your needs, recommend appropriate devices, and train you in safe, independent use at home and in the community.',
    benefits: [
      'Right-fit device recommendation based on your needs and goals',
      'Improved safety, independence, and fall risk reduction',
      'Training on device use across daily environments',
      'Caregiver education and home-setup guidance',
      'Ongoing support as mobility needs change',
    ],
    whatToExpect: [
      'Assessment of mobility, balance, strength, and home environment',
      'Device recommendation and fitting guidance',
      'Hands-on training on correct, safe device usage',
      'Caregiver and family coaching when relevant',
    ],
    whoIsItFor: [
      'Adults and seniors needing mobility support at home or outdoors',
      'Individuals recovering from surgery or injury',
      'Neurological patients requiring gait and balance aids',
      'Caregivers supporting a family member\'s mobility needs',
    ],
    faqs: [
      {
        question: 'How do I know which mobility aid is right for me?',
        answer:
          'Our physiotherapists assess your strength, balance, and daily environment before recommending any device. The goal is independence and safety — not just ticking a box.',
      },
      {
        question: 'Do you help with sourcing the device itself?',
        answer:
          'We guide you on what to buy and where, and help you fit and use it correctly. We do not sell devices directly, which keeps our recommendations fully independent.',
      },
    ],
  },
  {
    title: 'Wheelchair Training',
    category: 'physiotherapy',
    description:
      'Wheelchair skills training — propulsion, transfers, indoor/outdoor navigation — for users and their caregivers. Safety-first, dignity-first.',
    duration: '45–60-minute sessions',
    format: 'In-person at our Kasavanahalli center',
    overview:
      'Wheelchair Training is a structured program for new and existing wheelchair users — and their families — covering propulsion technique, transfers, indoor and outdoor navigation, and everyday skills. Our physiotherapists focus on safety, confidence, and independence across real-life environments.',
    benefits: [
      'Confident, efficient wheelchair propulsion and maneuvering',
      'Safe transfers to and from bed, chair, car, and toilet',
      'Navigation skills for uneven surfaces, curbs, and ramps',
      'Caregiver training on safe assistance techniques',
      'Posture and pressure-relief strategies to prevent injury',
    ],
    whatToExpect: [
      'Assessment of current wheelchair skills and home/work environment',
      'Stepwise training in propulsion, transfers, and navigation',
      'Joint sessions with caregivers where appropriate',
      'Progress review and goal-setting for independent use',
    ],
    whoIsItFor: [
      'New wheelchair users and their caregivers',
      'Long-term users looking to improve skills and efficiency',
      'Neurological and spinal injury patients',
      'Families adapting their home or routines around wheelchair use',
    ],
    faqs: [
      {
        question: 'We just got a wheelchair for a family member — where do we start?',
        answer:
          'Book an initial session and bring the wheelchair. We\'ll assess fit, review the home environment, and build a stepwise plan starting with the most important skills for daily life.',
      },
      {
        question: 'Can caregivers join the sessions?',
        answer:
          'Yes — and we strongly recommend it. Caregiver training is built into the program so assistance is safe for both the user and the person helping.',
      },
    ],
  },
]

const workshopsService = {
  title: 'Customized Workshops',
  category: 'guidance',
  description:
    'Tailored workshops for schools, corporates, and community groups on autism, ADHD, mental health, neurodiversity, and caregiver wellbeing.',
  duration: 'Half-day or full-day formats',
  format: 'On-site at your venue or at our Kasavanahalli center',
  overview:
    'Our Customized Workshops bring clinical expertise directly to schools, workplaces, and community organizations across Bangalore. Topics are tailored to your audience — awareness of autism and ADHD, neurodiversity in the workplace, parent and teacher skill-building, adolescent mental health, and caregiver wellbeing — and delivered by our multidisciplinary team.',
  benefits: [
    'Content tailored to your audience, goals, and context',
    'Clinically accurate, evidence-based, and practical',
    'Interactive formats including case discussions and Q&A',
    'Follow-up resources and onward-referral pathways',
    'Support for schools, corporates, NGOs, and community groups',
  ],
  whatToExpect: [
    'Discovery call to understand your audience, goals, and context',
    'Custom workshop outline and agenda for your review',
    'Delivery by our clinical team — in-person or virtual',
    'Post-workshop resource pack and optional follow-up sessions',
  ],
  whoIsItFor: [
    'Schools seeking teacher, student, or parent awareness sessions',
    'Corporates building neuro-inclusive workplaces and wellbeing programs',
    'NGOs and community groups running outreach programs',
    'Residential communities, PTAs, and parent networks',
  ],
  faqs: [
    {
      question: 'How far in advance should we book a workshop?',
      answer:
        '3–4 weeks\' notice works best so we can tailor content properly. Shorter turnarounds are sometimes possible — reach out and we\'ll do our best to accommodate.',
    },
    {
      question: 'Can the workshop be delivered at our school or office?',
      answer:
        'Yes. We travel across Bangalore — Sarjapur Road, HSR Layout, Bellandur, Koramangala, Whitefield, and more — and also deliver workshops at our Kasavanahalli center or online.',
    },
  ],
}

async function seed() {
  console.log('\n🌱 Seeding services...\n')
  const allServices = [...physioServices, workshopsService]
  let created = 0
  let skipped = 0

  for (const svc of allServices) {
    const slug = slugify(svc.title)
    const existing = await client.fetch(
      `*[_type=="services" && slug.current==$slug][0]{_id, title, category}`,
      { slug },
    )
    if (existing) {
      console.log(`   ⏭  skip (exists): ${svc.title} [${existing.category}]`)
      skipped++
      continue
    }
    const doc = {
      _type: 'services',
      title: svc.title,
      slug: { _type: 'slug', current: slug },
      category: svc.category,
      description: svc.description,
      popular: false,
      isTherapy: false,
      duration: svc.duration,
      format: svc.format,
      overview: svc.overview,
      benefits: svc.benefits,
      whatToExpect: svc.whatToExpect,
      whoIsItFor: svc.whoIsItFor,
      onDemand: false,
      faqs: (svc.faqs || []).map((f) => ({
        _key: Math.random().toString(36).slice(2, 10),
        question: f.question,
        answer: f.answer,
      })),
    }
    const result = await client.create(doc)
    console.log(`   ✅ created: ${svc.title} [${svc.category}] → ${result._id}`)
    created++
  }

  console.log('\n🔀 Re-categorizing Parental Training Program: programs → guidance...\n')
  const parental = await client.fetch(
    `*[_type=="services" && title=="Parental Training Program"][0]{_id, category}`,
  )
  if (!parental) {
    console.log('   ⚠  Parental Training Program not found — skipping.')
  } else if (parental.category === 'guidance') {
    console.log('   ⏭  already in guidance.')
  } else {
    await client.patch(parental._id).set({ category: 'guidance' }).commit()
    console.log('   ✅ moved to guidance.')
  }

  console.log(`\n✨ Done. Created: ${created}, Skipped: ${skipped}.\n`)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
