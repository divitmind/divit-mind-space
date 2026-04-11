import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

async function restoreNews() {
  const newsItems = [
    {
      _type: 'news',
      title: 'Kindergarten Orientation Programme',
      slug: { _type: 'slug', current: 'kindergarten-orientation-programme' },
      excerpt: 'Join us for an orientation session at Bishop Cotton Girls School.',
      externalUrl: 'https://bishopcottongirls.com/kindergarten-orientation-programme-11th-june-2025/',
      featured: false,
      sourceName: 'Bishop Cotton Girls School',
      publishedAt: '2026-03-23T23:47:40.370Z',
      postFormat: 'external',
      mainImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-7aa229b2d10c8e9bbf1d27b398ead9f42391afab-1600x1066-jpg'
        }
      }
    },
    {
      _type: 'news',
      title: 'Raising special kids require special care for parents too',
      slug: { _type: 'slug', current: 'raising-special-kids-require-special-care-for-parents-too' },
      excerpt: 'An insightful article on the importance of parental care in the neurodivergent journey.',
      externalUrl: 'https://www.newindianexpress.com/lifestyle/health/2025/May/30/raising-special-kids-require-special-care-for-parents-too',
      featured: true,
      sourceName: 'The New Indian Express',
      publishedAt: '2026-03-23T23:46:02.557Z',
      postFormat: 'external',
      mainImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-2aa8ca6b00e29d6de28d935d72646e5f0a562d6b-2816x1536-png'
        }
      }
    }
  ]

  console.log('Restoring news items...')
  for (const item of newsItems) {
    try {
      await client.create(item)
      console.log(`✓ Restored: ${item.title}`)
    } catch (err) {
      console.error(`Failed to restore ${item.title}:`, err.message)
    }
  }
}

restoreNews().catch(console.error)
