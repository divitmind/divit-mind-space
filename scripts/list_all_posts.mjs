import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

async function listAllPosts() {
  // Use '*[_type == "post"]' to get all post documents (published)
  // To include drafts, we often need to check the document IDs specifically or use a broader query
  const posts = await client.fetch(`*[_type == "post"]{title, _id, _createdAt, _updatedAt}`)
  
  console.log(`Found ${posts.length} published 'post' documents:`)
  posts.forEach(p => console.log(`ID: ${p._id} | Title: "${p.title}" | Created: ${p._createdAt}`))

  const drafts = await client.fetch(`*[_id in path("drafts.**") && _type == "post"]{title, _id, _createdAt}`)
  console.log(`\nFound ${drafts.length} 'draft' post documents:`)
  drafts.forEach(d => console.log(`ID: ${d._id} | Title: "${d.title}" | Created: ${d._createdAt}`))
}

listAllPosts().catch(console.error)
