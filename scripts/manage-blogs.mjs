import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

// The Story of Apparao - formatted in Pavithra's voice
const apparaoBlogContent = [
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'In many traditional arranged marriage settings, conversations follow a familiar pattern—warm greetings, polite smiles, tea, biscuits… and then comes the inevitable question:',
      },
    ],
  },
  {
    _type: 'block',
    style: 'blockquote',
    children: [
      {
        _type: 'span',
        text: '"So… what does the boy do?"',
        marks: ['strong'],
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'When Apparao\'s family went to meet a prospective bride\'s family, everything began just the same. After a few pleasantries, the girl\'s father gently leaned forward and asked the question.',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Apparao adjusted his glasses, cleared his throat, and began with confidence:',
      },
    ],
  },
  {
    _type: 'block',
    style: 'blockquote',
    children: [
      {
        _type: 'span',
        text: '"My son is the Founder and Managing Director of an agro-based direct-to-consumer startup. We specialize in the organic health and wellness sector."',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'The girl\'s family was instantly impressed.',
      },
    ],
  },
  {
    _type: 'block',
    style: 'blockquote',
    children: [
      {
        _type: 'span',
        text: '"Oh! That sounds wonderful. What exactly is your product?" the father asked.',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Apparao continued:',
      },
    ],
  },
  {
    _type: 'block',
    style: 'blockquote',
    children: [
      {
        _type: 'span',
        text: '"We deal with high-protein roasted legumes and traditional caramelized sweets. We procure raw materials directly from wholesale markets and process them in our own thermal processing unit. Our packaging is 100% eco-friendly and biodegradable."',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'The room filled with admiration. It sounded like a modern enterprise.',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Curious, the girl\'s uncle asked:',
      },
    ],
  },
  {
    _type: 'block',
    style: 'blockquote',
    children: [
      {
        _type: 'span',
        text: '"Where is your office? And how many employees do you have?"',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Apparao replied:',
      },
    ],
  },
  {
    _type: 'block',
    style: 'blockquote',
    children: [
      {
        _type: 'span',
        text: '"We follow a lean startup model. We avoid unnecessary expenses like rent and electricity. Our operations are mobile—we shift locations based on customer flow. My son independently manages everything. He is a solopreneur."',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'The girl\'s father, now confused, said:',
      },
    ],
  },
  {
    _type: 'block',
    style: 'blockquote',
    children: [
      {
        _type: 'span',
        text: '"I don\'t understand. Can you explain in simple terms?"',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'At that moment, the boy\'s friend gently clarified:',
      },
    ],
  },
  {
    _type: 'block',
    style: 'blockquote',
    children: [
      {
        _type: 'span',
        text: '"Uncle… our friend sells roasted peanuts on a roadside cart. He roasts them in sand and wraps them in newspaper."',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Silence.',
        marks: ['em'],
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'The tea cup slipped… and with it, the proposal.',
        marks: ['em'],
      },
    ],
  },
  // Beyond Humor Section
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'Beyond Humor: A Psychological Insight',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'This story highlights a powerful psychological concept:',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Perception is shaped by language.',
        marks: ['strong'],
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'The business did not change—only its ',
      },
      {
        _type: 'span',
        text: 'description',
        marks: ['em'],
      },
      {
        _type: 'span',
        text: ' did.',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'This aligns with the ',
      },
      {
        _type: 'span',
        text: 'Framing Effect',
        marks: ['strong'],
      },
      {
        _type: 'span',
        text: ' — where the way information is presented influences decisions and judgments (Tversky & Kahneman, 1981).',
      },
    ],
  },
  // Connecting to Neurodivergence Section
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'Connecting to Neurodivergence',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'In real life, this phenomenon is deeply relevant to neurodivergent individuals, including those with ADHD, Autism Spectrum Disorder, and Dyspraxia.',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'These conditions reflect differences in brain functioning—not deficits in worth or capability. Yet, society often interprets behaviors at face value.',
      },
    ],
  },
  // Misinterpretation Section
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'Misinterpretation of Behavior',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'A child who moves constantly, interrupts frequently, or avoids tasks may be labeled as "problematic."',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'However, through a psychological lens:',
      },
    ],
  },
  {
    _type: 'block',
    listItem: 'bullet',
    children: [
      {
        _type: 'span',
        text: 'Hyperactivity → ',
      },
      {
        _type: 'span',
        text: 'Self-regulation difference',
        marks: ['strong'],
      },
    ],
  },
  {
    _type: 'block',
    listItem: 'bullet',
    children: [
      {
        _type: 'span',
        text: 'Impulsivity → ',
      },
      {
        _type: 'span',
        text: 'Executive functioning challenge',
        marks: ['strong'],
      },
    ],
  },
  {
    _type: 'block',
    listItem: 'bullet',
    children: [
      {
        _type: 'span',
        text: 'Task avoidance → ',
      },
      {
        _type: 'span',
        text: 'Cognitive overload or anxiety response',
        marks: ['strong'],
      },
    ],
  },
  // Masking Section
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'Masking: The Hidden Reality',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Just as Apparao used language to present a more acceptable image, many neurodivergent individuals engage in ',
      },
      {
        _type: 'span',
        text: 'masking',
        marks: ['em'],
      },
      {
        _type: 'span',
        text: '.',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Masking involves suppressing natural behaviors, mimicking socially accepted norms, and constant self-monitoring.',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Research (Hull et al., 2017) shows that masking is particularly common in individuals with Autism Spectrum Disorder and can lead to anxiety, burnout, and identity confusion.',
      },
    ],
  },
  // Role of Language in Therapy
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'The Role of Language in Therapy and Support',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'The goal is not to exaggerate reality, nor to reduce it—but to ',
      },
      {
        _type: 'span',
        text: 'understand it accurately',
        marks: ['strong'],
      },
      {
        _type: 'span',
        text: '.',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Therapeutic approaches such as Cognitive Behavioral Therapy help individuals reframe thoughts, build coping strategies, and develop self-awareness.',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'This reflects a ',
      },
      {
        _type: 'span',
        text: 'strength-based and neurodiversity-affirming approach',
        marks: ['strong'],
      },
      {
        _type: 'span',
        text: ' (Singer, 1999), which emphasizes acceptance of neurological differences.',
      },
    ],
  },
  // Strength-Based Perspective
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'Strength-Based Perspective',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Just as the peanut seller demonstrated independence, adaptability, and entrepreneurial thinking—neurodivergent individuals often demonstrate creativity, innovation, deep focus, and unique problem-solving abilities.',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'The challenge lies not in the individual—but in societal perception.',
        marks: ['strong'],
      },
    ],
  },
  // Conclusion
  {
    _type: 'block',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'Conclusion',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'The story of Apparao teaches us that ',
      },
      {
        _type: 'span',
        text: 'language can shape dignity',
        marks: ['strong'],
      },
      {
        _type: 'span',
        text: '. But psychology reminds us that true understanding goes beyond words—it requires empathy, awareness, and acceptance.',
      },
    ],
  },
  // Final Reflection
  {
    _type: 'block',
    style: 'blockquote',
    children: [
      {
        _type: 'span',
        text: '"They are not difficult—they are different. And different needs understanding, not judgement."',
        marks: ['em'],
      },
    ],
  },
  // References
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'References',
      },
    ],
  },
  {
    _type: 'block',
    listItem: 'bullet',
    children: [
      {
        _type: 'span',
        text: 'Tversky, A., & Kahneman, D. (1981). The Framing of Decisions and the Psychology of Choice. Science.',
      },
    ],
  },
  {
    _type: 'block',
    listItem: 'bullet',
    children: [
      {
        _type: 'span',
        text: 'Daniel Kahneman (2011). Thinking, Fast and Slow.',
      },
    ],
  },
  {
    _type: 'block',
    listItem: 'bullet',
    children: [
      {
        _type: 'span',
        text: 'Judy Singer (1999). Neurodiversity: The Birth of an Idea.',
      },
    ],
  },
  {
    _type: 'block',
    listItem: 'bullet',
    children: [
      {
        _type: 'span',
        text: 'Hull, L., et al. (2017). "Putting on My Best Normal": Social Camouflaging in Autism Spectrum Conditions.',
      },
    ],
  },
  {
    _type: 'block',
    listItem: 'bullet',
    children: [
      {
        _type: 'span',
        text: 'American Psychiatric Association (2013). DSM-5 (Diagnostic and Statistical Manual of Mental Disorders).',
      },
    ],
  },
  {
    _type: 'block',
    listItem: 'bullet',
    children: [
      {
        _type: 'span',
        text: 'Barkley, R. A. (2015). Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis and Treatment.',
      },
    ],
  },
]

async function main() {
  console.log('🔍 Fetching authors and posts...\n')

  // Get all authors
  const authors = await client.fetch(`*[_type == "author"]{_id, name, slug}`)
  console.log('Authors found:')
  authors.forEach(a => console.log(`  - ${a.name} (${a._id})`))

  // Get all posts with author info
  const posts = await client.fetch(`*[_type == "post"]{_id, title, "authorName": author->name, "authorId": author._ref}`)
  console.log('\nPosts found:')
  posts.forEach(p => console.log(`  - "${p.title}" by ${p.authorName}`))

  // Find Pooja Mittal's posts
  const poojaPosts = posts.filter(p => p.authorName?.toLowerCase().includes('pooja'))
  console.log(`\n🗑️  Found ${poojaPosts.length} posts by Pooja Mittal to delete`)

  // Delete Pooja's posts
  for (const post of poojaPosts) {
    console.log(`   Deleting: "${post.title}"...`)
    await client.delete(post._id)
    console.log(`   ✓ Deleted`)
  }

  // Find Pavithra author
  let pavithraAuthor = authors.find(a =>
    a.name?.toLowerCase().includes('pavithra') ||
    a.name?.toLowerCase().includes('lakshminarasimhan')
  )

  if (!pavithraAuthor) {
    console.log('\n📝 Creating author: Dr. Pavithra Lakshminarasimhan...')
    pavithraAuthor = await client.create({
      _type: 'author',
      name: 'Dr. Pavithra Lakshminarasimhan',
      slug: { current: 'dr-pavithra-lakshminarasimhan' },
      bio: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Clinical Psychologist specializing in neurodivergence, child development, and therapeutic interventions.',
            },
          ],
        },
      ],
    })
    console.log(`   ✓ Created author with ID: ${pavithraAuthor._id}`)
  } else {
    console.log(`\n✓ Found Pavithra author: ${pavithraAuthor.name} (${pavithraAuthor._id})`)
  }

  // Check if this blog already exists
  const existingPost = await client.fetch(
    `*[_type == "post" && slug.current == "the-story-of-apparao-a-lesson-in-perception"][0]`
  )

  if (existingPost) {
    console.log('\n⚠️  Blog "The Story of Apparao" already exists. Skipping creation.')
  } else {
    // Create the new blog post
    console.log('\n📝 Creating new blog post: "The Story of Apparao"...')

    const newPost = await client.create({
      _type: 'post',
      title: 'The Story of Apparao: A Lesson in Perception, Language, and Neurodivergence',
      slug: { current: 'the-story-of-apparao-a-lesson-in-perception' },
      excerpt: 'Through the humorous tale of Apparao, we explore how perception is shaped by language—and how this connects to the lived experiences of neurodivergent individuals who often face misinterpretation of their behaviors.',
      author: { _type: 'reference', _ref: pavithraAuthor._id },
      categories: ['stories', 'clinical'],
      featured: false,
      publishedAt: new Date().toISOString(),
      readTime: 5,
      body: apparaoBlogContent,
    })

    console.log(`   ✓ Created blog post with ID: ${newPost._id}`)
  }

  // Final summary
  console.log('\n' + '='.repeat(50))
  console.log('✅ SUMMARY:')
  console.log(`   - Deleted ${poojaPosts.length} posts by Pooja Mittal`)
  console.log(`   - Pavithra author: ${pavithraAuthor._id}`)
  console.log('   - Created/verified "The Story of Apparao" blog post')

  // Show remaining posts
  const remainingPosts = await client.fetch(`*[_type == "post"]{title, "authorName": author->name}`)
  console.log('\n📚 Current posts in Sanity:')
  remainingPosts.forEach(p => console.log(`   - "${p.title}" by ${p.authorName}`))
}

main().catch(console.error)
