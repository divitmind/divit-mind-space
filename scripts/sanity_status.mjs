import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

async function checkSanity() {
  const authors = await client.fetch(`*[_type == "author"]{name, _id}`)
  const posts = await client.fetch(`*[_type == "post"]{title, "authorName": author->name}`)
  const news = await client.fetch(`*[_type == "news"]{title}`)
  
  console.log('--- Current Sanity State ---')
  console.log('Authors:', authors.length)
  authors.forEach(a => console.log(` - ${a.name}`))
  
  console.log('\nPosts:', posts.length)
  posts.forEach(p => console.log(` - "${p.title}"`))
  
  console.log('\nNews:', news.length)
  news.forEach(n => console.log(` - "${n.title}"`))
}

checkSanity().catch(console.error)
