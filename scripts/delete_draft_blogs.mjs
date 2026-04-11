import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

async function deleteDraftBlogs() {
  // Query for all draft documents of type 'post'
  // Drafts in Sanity have IDs starting with 'drafts.'
  const drafts = await client.fetch(`*[_type == "post" && _id in drafts]`)
  
  console.log(`Found ${drafts.length} unpublished (draft) blog posts.`)
  
  if (drafts.length === 0) {
    console.log('Nothing to delete.')
    return
  }

  for (const draft of drafts) {
    console.log(`Deleting draft: "${draft.title || draft._id}"`)
    await client.delete(draft._id)
    console.log(` ✓ Deleted ${draft._id}`)
  }
  
  console.log('\n--- PURGE OF UNPUBLISHED BLOGS COMPLETE ---')
}

deleteDraftBlogs().catch(console.error)
