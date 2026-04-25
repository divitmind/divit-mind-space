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

async function insertOccupationalTherapist() {
  const job = {
    _type: 'career',
    title: 'Occupational Therapist (Pediatric)',
    slug: {
      _type: 'slug',
      current: 'occupational-therapist-pediatric',
    },
    department: 'Clinical Services',
    location: ['mumbai'],
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
            text: 'We are seeking a compassionate and skilled Occupational Therapist to work with children having developmental, sensory, and motor challenges. The role focuses on helping children improve their motor skills, sensory processing, and daily living abilities through play-based interventions.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    responsibilities: [
      'Conduct sensory, motor, and functional assessments',
      'Develop and implement individualized therapy plans',
      'Deliver one-on-one and group therapy sessions using play-based techniques',
      'Work on sensory integration, fine motor skills, and Activities of Daily Living (ADLs)',
      'Collaborate with parents, educators, and the multidisciplinary team',
      'Monitor progress and maintain therapy records',
      'Provide home programs and caregiver training',
    ],
    requirements: [
      'Bachelor’s or Master’s degree in Occupational Therapy',
      'Registration with All India Occupational Therapists Association (AIOTA) preferred',
      '0–3 years of experience in pediatric OT (freshers welcome)',
      'Strong knowledge of sensory integration and child development',
      'Excellent communication and interpersonal skills',
      'Patience, empathy, and ability to engage with children',
    ],
    additionalAdvantage: [
      {
        _key: 'adv1',
        _type: 'block',
        children: [
          {
            _key: 'child1',
            _type: 'span',
            marks: [],
            text: 'Experience in Adult Occupational Therapy will be an added advantage.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    whatWeOffer: [
      {
        _key: 'offer1',
        _type: 'block',
        children: [
          {
            _key: 'child1',
            _type: 'span',
            marks: [],
            text: 'Opportunity to work with a diverse pediatric population in a state-of-the-art clinical setting',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
      {
        _key: 'offer2',
        _type: 'block',
        children: [
          {
            _key: 'child2',
            _type: 'span',
            marks: [],
            text: 'Collaborative environment with a multidisciplinary team of specialists',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
      {
        _key: 'offer3',
        _type: 'block',
        children: [
          {
            _key: 'child3',
            _type: 'span',
            marks: [],
            text: 'Professional growth through case discussions and internal workshops',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
      {
        _key: 'offer4',
        _type: 'block',
        children: [
          {
            _key: 'child4',
            _type: 'span',
            marks: [],
            text: 'Meaningful impact on the functional independence and quality of life for children',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    skills: [],
    isActive: true,
    postedDate: new Date().toISOString(),
  }

  try {
    const result = await client.create(job)
    console.log(`Successfully created job: ${result.title} (${result._id})`)
  } catch (error) {
    console.error('Error creating job:', error)
  }
}

insertOccupationalTherapist()
