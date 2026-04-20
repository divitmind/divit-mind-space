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

async function updateSpecialEducator() {
  try {
    // Find the existing document by slug
    const query = '*[_type == "career" && slug.current == "special-educator"][0]._id'
    const id = await client.fetch(query)

    if (!id) {
      console.error('Special Educator role not found.')
      return
    }

    const patch = {
      department: 'Education',
      location: ['bangalore'],
      employmentType: 'full-time',
      locationType: 'onsite',
      salaryRange: {
        min: '',
        max: '',
        note: 'Competitive and based on experience',
      },
    }

    const result = await client.patch(id).set(patch).commit()
    console.log(`Successfully updated job: ${result.title} (${result._id})`)
  } catch (error) {
    console.error('Error updating job:', error)
  }
}

updateSpecialEducator()
