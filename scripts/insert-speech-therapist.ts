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

async function insertSpeechTherapist() {
  const job = {
    _type: 'career',
    title: 'Speech Therapist',
    slug: {
      _type: 'slug',
      current: 'speech-therapist',
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
            text: 'We are looking for a dedicated and compassionate Speech Therapist to assess, diagnose, and treat children with speech, language, communication, and swallowing disorders. The role involves developing personalized therapy plans to improve communication skills and enhance the overall quality of life in a supportive clinical environment.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    responsibilities: [
      'Conduct comprehensive speech, language, and communication assessments',
      'Develop individualized, goal-oriented treatment plans',
      'Deliver one-on-one and group therapy sessions using play-based techniques',
      'Collaborate with parents, caregivers, teachers, and healthcare professionals',
      'Monitor progress and maintain detailed therapy records and reports',
      'Educate parents and caregivers on home-based therapy strategies',
      'Participate in team meetings, case discussions, and workshops',
    ],
    requirements: [
      'BASLP or MASLP from a recognized institution',
      'RCI registration (preferred or eligible)',
      '0–3 years of experience in pediatric speech therapy (freshers are welcome)',
      'Strong knowledge of assessment tools and therapy techniques',
      'Excellent communication and interpersonal skills',
      'High level of patience, empathy, and ability to engage with children',
      'Good documentation and record-keeping skills',
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
            text: 'Hands-on experience in pediatric speech therapy',
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
            text: 'Opportunity to work in a child-friendly, supportive environment',
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
            text: 'Collaborative work with a multidisciplinary team',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    skills: [], // We are using 'requirements' for the bullet points provided
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

insertSpeechTherapist()
