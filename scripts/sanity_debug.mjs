import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

async function debugSanity() {
  const allDocs = await client.fetch(`*[_type == "post"]`)
  console.log(`\nTotal 'post' documents found: ${allDocs.length}`)
  
  const drafts = await client.fetch(`*[_type == "post" && _id in drafts]`)
  console.log(`Draft 'post' documents found: ${drafts.length}`)
  
  const allTypes = await client.fetch(`count(*[])`)
  console.log(`Total documents in dataset: ${allTypes}`)
}

debugSanity().catch(console.error)
