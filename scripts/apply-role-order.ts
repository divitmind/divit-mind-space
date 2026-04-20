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

const ROLE_ORDER: Record<string, number> = {
  'psychologist': 1,
  'speech-therapist': 2,
  'occupational-therapist-pediatric': 3,
  'special-educator': 4,
  'physiotherapist': 5,
  'psychology-intern-trainee': 6,
}

async function applyRoleOrder() {
  try {
    const jobs = await client.fetch(`*[_type == "career"] { _id, slug }`)
    console.log(`Found ${jobs.length} jobs to reorder.`)

    for (const job of jobs) {
      const slug = job.slug?.current
      const order = ROLE_ORDER[slug]

      if (order !== undefined) {
        await client
          .patch(job._id)
          .set({ order })
          .commit()
        console.log(`Updated ${slug} with order ${order}`)
      } else {
        console.log(`No order defined for ${slug}, skipping.`)
      }
    }
    console.log('Reordering complete!')
  } catch (error) {
    console.error('Error reordering jobs:', error)
  }
}

applyRoleOrder()
