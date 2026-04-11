import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

async function findPosts() {
  // Query for all documents of type 'post', including drafts
  const allPosts = await client.fetch(`*[_type == "post"]{
    _id,
    _type,
    title,
    "authorName": author->name
  }`)
  
  console.log(`\n--- ALL 'post' documents (${allPosts.length}) ---`)
  allPosts.forEach(p => {
    console.log(`ID: ${p._id} | Title: "${p.title}" | Author: ${p.authorName}`)
  })
}

findPosts().catch(console.error)
