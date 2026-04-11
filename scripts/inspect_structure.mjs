import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

async function inspectPublishedPost() {
  const post = await client.fetch(`*[_type == "post" && !(_id in path("drafts.**"))][0]{
    title,
    body
  }`)
  
  console.log(`Title: ${post.title}`)
  console.log("\nStructure Outline:")
  post.body.forEach(block => {
    if (block.style) {
      const text = block.children ? block.children.map(c => c.text).join('') : ''
      console.log(`[${block.style}] ${text.substring(0, 50)}...`)
    } else if (block.listItem) {
      console.log(` - [List Item]`)
    }
  })
}

inspectPublishedPost().catch(console.error)
