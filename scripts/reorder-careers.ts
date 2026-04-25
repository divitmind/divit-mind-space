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

async function reorderCareers() {
  const orderMap: { [key: string]: number } = {
    'speech-therapist': 2,
    'occupational-therapist-pediatric': 3,
    'special-educator': 4,
    'psychology-intern-trainee': 6,
  }

  try {
    const query = '*[_type == "career"]{_id, "slug": slug.current}'
    const careers = await client.fetch(query)

    console.log(`Found ${careers.length} careers to update.`)

    const transaction = client.transaction()
    careers.forEach((career: { _id: string; slug: string }) => {
      const order = orderMap[career.slug]
      if (order !== undefined) {
        transaction.patch(career._id, (p) => p.set({ order }))
        console.log(`Setting order ${order} for ${career.slug}`)
      }
    })

    await transaction.commit()
    console.log('Successfully reordered careers.')
  } catch (error) {
    console.error('Error reordering careers:', error)
  }
}

reorderCareers()
