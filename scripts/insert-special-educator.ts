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

async function insertSpecialEducator() {
  const job = {
    _type: 'career',
    title: 'Special Educator',
    slug: {
      _type: 'slug',
      current: 'special-educator',
    },
    employmentType: 'Full-time',
    locationType: 'In-office',
    salaryRange: {
      min: 0,
      max: 0,
      currency: 'INR',
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
            text: 'We are looking for a passionate and empathetic Special Educator to join our team at Divit MindSpace. The role involves creating inclusive learning environments and providing personalized support to neurodiverse children with diverse learning and developmental needs.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    responsibilities: [
      'Develop and implement individualized education plans (IEPs)',
      'Use adaptive and child-centered teaching methods',
      'Collaborate with therapists, parents, and other educators',
      'Monitor student progress and adjust teaching strategies accordingly',
      'Create a safe, inclusive, and engaging learning environment',
      'Support children with diverse learning and developmental needs',
      'Train and guide parents and teachers on special education strategies and inclusive practices',
      'Participate in team meetings and progress discussions',
    ],
    requirements: [
      'Diploma / B.Ed. / M.Ed. in Special Education from a recognized institution',
      'Minimum 1 year of experience preferred (freshers with relevant training can apply)',
      'Strong communication and interpersonal skills',
      'High level of patience, empathy, and creativity',
      'Ability to handle diverse learning needs effectively',
      'Experience or ability to conduct training programs for parents and teachers on special education topics',
      'Understanding of inclusive education practices',
      'Basic documentation and reporting skills',
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
            text: 'Experience in NIOS teaching will be an added advantage.',
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
            text: 'Opportunity to work with neurodiverse children in a nurturing environment',
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
            text: 'Collaborative work with a multidisciplinary team',
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
            text: 'Meaningful impact on children’s learning and development',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    skills: [],
    isActive: true,
    postedDate: new Date().toISOString().split('T')[0],
  }

  try {
    const result = await client.create(job)
    console.log(`Successfully created job: ${result.title} (${result._id})`)
  } catch (error) {
    console.error('Error creating job:', error)
  }
}

insertSpecialEducator()
