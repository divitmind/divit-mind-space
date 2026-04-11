import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

async function findAnything() {
  const result = await client.fetch(`*[title match "*Apparao*"]`)
  console.log(`Found with 'Apparao' in title: ${result.length}`)
  
  const result2 = await client.fetch(`*[slug.current match "*apparao*"]`)
  console.log(`Found with 'apparao' in slug: ${result2.length}`)

  const result3 = await client.fetch(`*[_type == "post"]`)
  console.log(`Final check for _type == "post": ${result3.length}`)
}

findAnything().catch(console.error)
