import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

async function publishTeenDepression() {
  const authorId = '62aceb06-d288-4682-a3ad-441a655839fc' // Dr. Pavithra
  
  const post = {
    _type: 'post',
    title: "Teen Depression: Beyond 'Just a Phase'",
    slug: { _type: 'slug', current: 'teen-depression-beyond-just-a-phase' },
    excerpt: "Adolescent depression is frequently dismissed as 'teenage moodiness' or 'hormones.' This dismissal can be dangerous. Depression in teens presents differently than in adults—often as irritability, social withdrawal, or declining academic performance rather than expressed sadness.",
    author: { _type: 'reference', _ref: authorId },
    categories: ['parenting', 'clinical'],
    publishedAt: new Date().toISOString(),
    readTime: 6,
    featured: true,
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: "Adolescent depression is frequently dismissed as 'teenage moodiness' or 'hormones.' This dismissal can be dangerous. Depression in teens presents differently than in adults—often as irritability, social withdrawal, or declining academic performance rather than expressed sadness. Understanding these signs can be life-saving.", marks: [] }]
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'h2',
        children: [{ _type: 'span', _key: 's2', text: "Recognizing Teen Depression", marks: [] }]
      },
      {
        _type: 'block',
        _key: 'b3',
        style: 'normal',
        children: [{ _type: 'span', _key: 's3', text: "Warning signs include: persistent irritability or anger, loss of interest in previously enjoyed activities, social withdrawal, sleep changes (too much or too little), academic decline, physical complaints, hopelessness, and—critically—any mention of death or self-harm. These patterns persisting for two or more weeks require attention.", marks: [] }]
      }
    ]
  }

  console.log('Publishing Teen Depression article...')
  try {
    const result = await client.create(post)
    console.log(`✓ Published successfully! ID: ${result._id}`)
  } catch (err) {
    console.error('Publication failed:', err.message)
  }
}

publishTeenDepression().catch(console.error)
