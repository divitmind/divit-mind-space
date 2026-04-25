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

async function deleteAllCareers() {
  try {
    const query = '*[_type == "career"]._id'
    const ids = await client.fetch(query)

    if (ids.length === 0) {
      console.log('No career documents found to delete.')
      return
    }

    console.log(`Found ${ids.length} career documents. Deleting...`)

    const transaction = client.transaction()
    ids.forEach((id: string) => {
      transaction.delete(id)
    })

    await transaction.commit()
    console.log('Successfully deleted all career documents.')
  } catch (error) {
    console.error('Error deleting career documents:', error)
  }
}

deleteAllCareers()
