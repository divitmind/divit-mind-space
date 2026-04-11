import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

async function purgeBlogs() {
  // Check for 'post' documents
  const posts = await client.fetch(`*[_type == "post"]`)
  console.log(`Found ${posts.length} 'post' documents to delete.`)
  for (const post of posts) {
    console.log(`Deleting post: ${post.title || post._id}`)
    await client.delete(post._id)
  }

  // Check for 'news' documents as well since post was 0
  const news = await client.fetch(`*[_type == "news"]`)
  console.log(`Found ${news.length} 'news' documents to delete.`)
  for (const item of news) {
    console.log(`Deleting news: ${item.title || item._id}`)
    await client.delete(item._id)
  }

  console.log('--- PURGE COMPLETE ---')
}

purgeBlogs().catch(console.error)
