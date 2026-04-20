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

async function updateLocations() {
  try {
    const jobs = await client.fetch(`*[_type == "career"] { _id, title, location }`)
    console.log(`Found ${jobs.length} jobs to update.`)

    for (const job of jobs) {
      await client
        .patch(job._id)
        .set({ location: ['bangalore'] })
        .commit()
      console.log(`Updated location for: ${job.title}`)
    }
    console.log('Location update complete!')
  } catch (error) {
    console.error('Error updating locations:', error)
  }
}

updateLocations()
