import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

async function extremePurgeDrafts() {
  console.log('Searching for ALL draft documents...')
  
  // Use a raw GROQ query to find anything starting with drafts.
  const allDrafts = await client.fetch(`*[ _id in drafts ]`)
  
  console.log(`Found ${allDrafts.length} total draft documents across all types.`)
  
  for (const doc of allDrafts) {
    if (doc._type === 'post') {
      console.log(`Deleting Blog Draft: "${doc.title || doc._id}"`)
      await client.delete(doc._id)
      console.log(` ✓ Purged`)
    } else {
      console.log(`Skipping non-blog draft: ${doc._id} (Type: ${doc._type})`)
    }
  }
  
  console.log('\n--- Draft Purge Complete ---')
}

extremePurgeDrafts().catch(console.error)
