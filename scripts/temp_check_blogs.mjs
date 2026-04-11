import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

async function checkBlogs() {
  const posts = await client.fetch(`*[_type == "post" && author->name match "*Pavithra*"]{
    title,
    "authorName": author->name,
    _id,
    _createdAt,
    "status": select(_id in drafts => "draft", "published")
  }`)
  
  console.log('--- Dr. Pavithra\'s Blogs in Sanity ---')
  posts.forEach((p, i) => {
    console.log(`${i+1}. "${p.title}" [Status: ${p._id.startsWith('drafts.') ? 'DRAFT' : 'PUBLISHED'}]`)
  })
  console.log('---------------------------------------')
}

checkBlogs().catch(console.error)
