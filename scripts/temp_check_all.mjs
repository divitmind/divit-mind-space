import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

async function checkAll() {
  const authors = await client.fetch(`*[_type == "author"]{name, _id}`)
  const posts = await client.fetch(`*[_type == "post"]{title, "authorName": author->name, _id}`)
  
  console.log('--- ALL Authors ---')
  authors.forEach(a => console.log(` - ${a.name} (${a._id})`))
  
  console.log('\n--- ALL Posts ---')
  posts.forEach(p => console.log(` - "${p.title}" by ${p.authorName}`))
}

checkAll().catch(console.error)
