import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
})

const PUBLIC_DIR = 'D:\\plus_ev_code_base\\divit-mind-space\\public'

async function uploadImage(imagePath) {
  if (!imagePath) return null
  const fullPath = join(PUBLIC_DIR, imagePath.replace(/^\//, ''))
  if (!existsSync(fullPath)) {
    console.warn(`⚠️ Image not found: ${fullPath}`)
    return null
  }
  try {
    const fileBuffer = readFileSync(fullPath)
    const asset = await client.assets.upload('image', fileBuffer, {
      filename: imagePath.split('/').pop()
    })
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    }
  } catch (error) {
    console.error(`❌ Failed to upload image ${imagePath}:`, error.message)
    return null
  }
}

async function pushAwareness() {
  console.log('🚀 Starting Awareness Page Migration...')

  const heroImg = await uploadImage('/awareness-jyoti-nivas.jpeg')
  const highlightsImg = await uploadImage('/awareness-tisb.jpg')
  const pastSessionImg1 = await uploadImage('/awareness-jyoti-nivas.jpeg')
  const pastSessionImg2 = await uploadImage('/awareness-tisb.jpg')

  const awarenessDoc = {
    _type: 'awareness',
    hero: {
      badge: "100% Free Sessions",
      title: "Awareness Programs for Schools & Communities",
      description: "We conduct FREE sessions to help teachers, parents, and communities understand neurodivergence and early intervention.",
      stats: [
        { label: "Sessions Done", value: "10+" },
        { label: "People Reached", value: "500+" },
        { label: "Always", value: "FREE" }
      ],
      image: heroImg
    },
    benefits: {
      title: "What Your School Gets",
      subtitle: "Tangible benefits for your institution and community",
      items: [
        { title: "Teacher Training", description: "Equip your staff to recognize early signs and support neurodivergent students effectively.", icon: "GraduationCap" },
        { title: "Parent Awareness", description: "Help parents understand neurodivergence, reducing stigma and encouraging early action.", icon: "Users" },
        { title: "Inclusive Culture", description: "Build a more understanding and supportive environment for all children.", icon: "Heart" },
        { title: "No Cost to You", description: "All sessions are completely FREE. We believe awareness should be accessible to everyone.", icon: "School" }
      ]
    },
    highlights: {
      title: "What We Cover",
      description: "Each session is tailored to your audience—whether teachers, parents, or students. Here's what participants learn:",
      items: [
        "Understanding neurodivergence (Autism, ADHD, Learning Disabilities)",
        "Recognizing early signs in children",
        "Breaking myths and reducing stigma",
        "Practical tips for teachers and parents",
        "When and how to seek professional help",
        "Q&A with experienced therapists"
      ],
      image: highlightsImg
    },
    pastSessions: {
      title: "Sessions We've Conducted",
      subtitle: "Real impact in schools and colleges across Bangalore",
      sessions: [
        {
          venue: "Jyoti Nivas College, Koramangala",
          audience: "Education Students & Faculty",
          image: pastSessionImg1
        },
        {
          venue: "TISB School, Domasandra",
          audience: "Teachers & Staff",
          image: pastSessionImg2
        }
      ]
    },
    cta: {
      title: "Want to Host a Session?",
      description: "Bring awareness to your school, college, or organization—completely free. Just reach out and we'll coordinate everything.",
      buttonText: "Request a Free Session"
    }
  }

  try {
    await client.createOrReplace({ ...awarenessDoc, _id: 'awareness' })
    await client.createOrReplace({ ...awarenessDoc, _id: 'drafts.awareness' })
    console.log('✅ Awareness Page pushed successfully (Published + Draft)!')
  } catch (error) {
    console.error('❌ Failed to push awareness document:', error.message)
  }
}

pushAwareness().catch(err => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
