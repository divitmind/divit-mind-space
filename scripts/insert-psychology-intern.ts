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

async function insertPsychologyIntern() {
  const job = {
    _type: 'career',
    title: 'Psychology Intern / Trainee',
    slug: {
      _type: 'slug',
      current: 'psychology-intern-trainee',
    },
    department: 'Clinical Services',
    location: ['mumbai'],
    employmentType: 'internship',
    locationType: 'onsite',
    salaryRange: {
      min: '',
      max: '',
      note: 'Stipend provided based on performance and duration',
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
            text: 'We are looking for a motivated and enthusiastic Psychology Intern to join our team. This position provides valuable hands-on experience in pediatric psychology, supporting children and families through assessments, therapy, and behavioral interventions in a supportive clinical setting.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    responsibilities: [
      'Assist in conducting psychological assessments and evaluations',
      'Participate in individual and group therapy sessions',
      'Support the development and implementation of behavioral interventions',
      'Collaborate with senior psychologists and the multidisciplinary team',
      'Maintain session notes and assist with documentation',
    ],
    requirements: [
      'Currently enrolled in a Bachelor’s or Master’s program in Psychology',
      'Genuine interest in working with children and families',
      'Basic understanding of child development and psychological principles',
      'Good communication and interpersonal skills',
      'Empathy, patience, and a strong willingness to learn',
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
            text: 'Hands-on practical exposure in pediatric psychology',
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
            text: 'Structured training programs',
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
            text: 'Mentorship from experienced psychologists',
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
            text: 'Opportunity to work in a child-friendly, supportive environment',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
      {
        _key: 'offer5',
        _type: 'block',
        children: [
          {
            _key: 'child5',
            _type: 'span',
            marks: [],
            text: 'Training Certificate upon successful completion',
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

insertPsychologyIntern()
