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

async function insertPsychologist() {
  const job = {
    _type: 'career',
    title: 'Psychologist',
    slug: {
      _type: 'slug',
      current: 'psychologist',
    },
    department: 'Psychology',
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
            text: 'We are looking for a compassionate Psychologist to join our multidisciplinary team. The role involves conducting assessments and providing evidence-based therapy for children, teenagers, and adults in a neuro-affirming environment.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    responsibilities: [
      'Conduct psychometric and psychoeducational assessments',
      'Provide individual and group counseling sessions',
      'Develop personalized intervention plans',
      'Collaborate with the multidisciplinary team of therapists',
      'Maintain detailed clinical documentation',
    ],
    requirements: [
      'Master\'s degree in Clinical or Counseling Psychology',
      'RCI Registration (preferred for clinical roles)',
      'Experience in pediatric or adult mental health',
      'Strong interpersonal and communication skills',
    ],
    additionalAdvantage: [
      {
        _key: 'adv1',
        _type: 'block',
        children: [{ _type: 'span', marks: [], text: 'Certification in specific therapeutic modalities like CBT, DBT, or ACT.' }],
        style: 'normal',
      },
      {
        _key: 'adv2',
        _type: 'block',
        children: [{ _type: 'span', marks: [], text: 'Experience working in multidisciplinary clinical settings.' }],
        style: 'normal',
      },
    ],
    whatWeOffer: [
      {
        _key: 'offer1',
        _type: 'block',
        children: [{ _type: 'span', text: 'Professional growth and mentorship from senior clinical specialists.' }],
        style: 'normal',
      },
      {
        _key: 'offer2',
        _type: 'block',
        children: [{ _type: 'span', text: 'A supportive, neuro-affirming work environment.' }],
        style: 'normal',
      },
    ],
    skills: [
      'Clinical Assessment',
      'Individual Counseling',
      'Crisis Intervention',
      'Documentation & Case Management',
    ],
    isActive: true,
    postedDate: new Date().toISOString(),
    order: 1, // Psychologist first
  }

  try {
    const result = await client.create(job)
    console.log(`Successfully created job: ${result.title} (${result._id})`)
  } catch (error) {
    console.error('Error creating job:', error)
  }
}

insertPsychologist()
