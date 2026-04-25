import { createClient } from 'next-sanity'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_WRITE_TOKEN

if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2023-05-03',
})

async function insertPhysiotherapist() {
  const job = {
    _type: 'career',
    title: 'Physiotherapist',
    slug: {
      _type: 'slug',
      current: 'physiotherapist',
    },
    department: 'Clinical Services',
    location: ['bangalore'],
    employmentType: 'full-time',
    locationType: 'onsite',
    salaryRange: {
      min: '',
      max: '',
      note: 'Competitive and based on experience',
    },
    aboutRole: [
      {
        _key: 'about1',
        _type: 'block',
        children: [
          {
            _key: 'child1',
            _type: 'span',
            marks: [],
            text: 'We are looking for a dedicated Physiotherapist to join our multidisciplinary team. The role involves managing pain, rehabilitating injuries, and improving physical functioning for patients of all ages.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    responsibilities: [
      'Provide evidence-based physiotherapy for pain management and rehabilitation',
      'Conduct assessments for assistive devices and wheelchair training',
      'Develop personalized exercise and recovery programs',
      'Collaborate with the multidisciplinary team of therapists',
      'Monitor and document patient progress',
    ],
    requirements: [
      'Bachelor\'s or Master\'s degree in Physiotherapy (BPT/MPT)',
      'Registration with relevant state or national council',
      'Experience in pain management, sports injuries, or pediatric/geriatric rehab',
      'Strong clinical assessment skills',
    ],
    additionalAdvantage: [
      {
        _key: 'adv1',
        _type: 'block',
        children: [{ _type: 'span', marks: [], text: 'Specialization in Neuro-Physiotherapy or Pediatric Rehab.' }],
        style: 'normal',
      },
      {
        _key: 'adv2',
        _type: 'block',
        children: [{ _type: 'span', marks: [], text: 'Hands-on experience with advanced rehabilitative equipment.' }],
        style: 'normal',
      },
    ],
    whatWeOffer: [
      {
        _key: 'offer1',
        _type: 'block',
        children: [{ _type: 'span', text: 'Opportunity to lead rehabilitative programs for diverse age groups.' }],
        style: 'normal',
      },
      {
        _key: 'offer2',
        _type: 'block',
        children: [{ _type: 'span', text: 'Collaboration with a top-tier multidisciplinary team.' }],
        style: 'normal',
      },
    ],
    skills: [
      'Physical Assessment',
      'Exercise Prescription',
      'Manual Therapy',
      'Patient Education',
    ],
    isActive: true,
    postedDate: new Date().toISOString(),
    order: 5, // Physiotherapist after Special Educator
  }

  try {
    const result = await client.create(job)
    console.log(`Successfully created job: ${result.title} (${result._id})`)
  } catch (error) {
    console.error('Error creating job:', error)
  }
}

insertPhysiotherapist()
