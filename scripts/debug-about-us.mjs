import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

async function checkAboutUs() {
  console.log('🔍 Checking About Us documents (including drafts) in Sanity...')
  const result = await client.fetch(`*[_id == "aboutUs" || _id == "drafts.aboutUs"]`)
  console.log(`Found ${result.length} documents`)
  result.forEach(doc => {
    console.log(`ID: ${doc._id}, Type: ${doc._type}, Updated: ${doc._updatedAt}`)
    // Check if hero is empty
    if (!doc.hero || Object.keys(doc.hero).length === 0) {
      console.log('   ⚠️ Hero section is EMPTY in this version')
    } else {
      console.log('   ✅ Hero section has data')
    }
  })
}

checkAboutUs().catch(console.error)
