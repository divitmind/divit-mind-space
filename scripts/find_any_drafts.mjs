import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

async function findAnyDrafts() {
  const drafts = await client.fetch(`*[ _id in drafts ]{_id, _type, title}`)
  console.log(`Found ${drafts.length} total draft documents of ANY type.`)
  drafts.forEach(d => {
    console.log(` - ID: ${d._id} | Type: ${d._type} | Title: ${d.title || 'Untitled'}`)
  })
}

findAnyDrafts().catch(console.error)
