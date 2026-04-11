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

// FIX: Use absolute path to the divit-mind-space/public folder
const PUBLIC_DIR = 'D:\\plus_ev_code_base\\divit-mind-space\\public'

async function uploadImage(imagePath) {
  const fullPath = join(PUBLIC_DIR, imagePath.replace(/^\//, ''))
  if (!existsSync(fullPath)) {
    console.warn(`⚠️ Image not found: ${fullPath}`)
    return null
  }
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
}

function textToBlocks(paragraphs) {
  return paragraphs.map(text => ({
    _type: 'block',
    children: [{ _type: 'span', text }]
  }))
}

async function pushAboutUs() {
  console.log('🚀 Starting About Us Migration (Syncing Published + Draft)...')

  // 1. Hero Images
  const heroImg1 = await uploadImage('/about_pic1.png')
  const heroImg2 = await uploadImage('/about_pic2.png')
  const heroImg3 = await uploadImage('/about_pic3.png')
  const storyImg = await uploadImage('/about_pic4.png')

  const aboutUsDoc = {
    _type: 'aboutUs',
    hero: {
      title: 'Empowering Every Neurodivergent Child to Thrive',
      italicSubtitle: 'with Care & Expertise',
      description: 'We provide expert assessments, therapy, and family support—helping children build confidence and independence in a nurturing environment.',
      images: [heroImg1, heroImg2, heroImg3].filter(Boolean)
    },
    philosophy: {
      title: 'Why Families Choose Us',
      description: 'What sets Divit MindSpace apart from other centers',
      points: [
        { title: 'Expert-Led Care', description: 'Our team includes licensed psychologists, speech therapists, occupational therapists, and special educators.', icon: 'Brain' },
        { title: 'Child-First Approach', description: 'We focus on each child\'s unique strengths, not just their challenges. Every plan is personalized.', icon: 'Heart' },
        { title: 'Family Involvement', description: 'Parents are partners in therapy. We equip you with strategies that work at home too.', icon: 'Users' },
        { title: 'Safe & Nurturing', description: 'A warm, sensory-friendly environment where children feel comfortable and supported.', icon: 'Shield' },
        { title: 'Holistic Development', description: 'We address communication, motor skills, behavior, academics, and social skills together.', icon: 'Sparkles' },
        { title: 'Early Intervention Focus', description: 'The earlier we start, the better the outcomes. We work with children as young as 18 months.', icon: 'Clock' }
      ]
    },
    story: {
      title: 'Our Story',
      paragraphs: [
        'Divit MindSpace was born from a deeply personal journey. Our founder\'s experience raising a neurodivergent child revealed the gaps in accessible, compassionate care.',
        'What started as a search for answers became a mission: to create a space where every child is seen for their potential, not their diagnosis.',
        'Today, we combine clinical expertise with genuine understanding—because we\'ve walked this path ourselves. Every family that comes to us is treated like our own.'
      ],
      image: storyImg
    }
  }

  // Push both published and draft to be absolutely sure Navami sees it
  await client.createOrReplace({ ...aboutUsDoc, _id: 'aboutUs' })
  await client.createOrReplace({ ...aboutUsDoc, _id: 'drafts.aboutUs' })
  console.log('✅ About Us Page pushed successfully (Published + Draft)!')

  // 2. Specialists
  const PEOPLE = [
    {
      id: "debarati-basak",
      name: "Dr. Debarati Basak",
      title: "Psy.D · Founding Partner, Carpediem EdPsych Consultancy LLP · Chief Growth Officer",
      image: "/Debarati.jpeg",
      experience: "20+ years",
      specialties: ["Counselling", "Mental Health", "Inclusive Education", "Life Skills"],
      teaser: "I help children, teens, and adults navigate emotions and relationships through counselling and psychotherapy.",
      fullBio: [
        "Dr. Debarati is a practicing psychologist with 20+ years of experience in research, counselling, and psychotherapy. She has completed her M.Sc. in Psychology from Calcutta University and M.S in Psychotherapy & Counselling from a U.S. University.",
        "Her research areas are cognition, disability and parental role. She is a recipient of a scholarship from the Lady Tata Memorial Trust for her research in the field of disability.",
        "Her previous assignments include being the Head of a reputed school's Department of Special Needs and Center Head of a Counselling Center in Bangalore. She has extensive experience in school counselling, taking care of the mental health of stakeholders in the school, and supporting schools in their journey toward inclusion.",
        "She has conducted training sessions for students, teachers, and parents in mental health. She is a CBSE master trainer in Life Skills and Inclusion & Inclusive Practices. Her areas of interest are counselling and psychotherapy. She has an affinity for working with children, adolescents, and the adult population and has extensive experience working with students, teachers, and parents in mental health and relationship management.",
        "She is a Professor of Practice (Adjunct Faculty) at the Kristu Jayanti College, Autonomous, Bengaluru and a guest lecturer at various educational institutions. She is also a POSH Certified Trainer (TUV-SUD). She is a Professor of Practice at the Kristu Jayanti College, Bangalore and a guest faculty at Jyoti Nivas College, Autonomous Bangalore."
      ],
      order: 10
    },
    {
      id: "pavithra-lakshmi-narasimhan",
      name: "Dr. Pavithra Lakshmi Narasimhan",
      title: "PhD · Clinical Psychologist · Child & Adolescent Behaviour Intervention Specialist · Certified Art Therapist · SEN (UK certified)",
      image: "/pavithra-lakshmi.png",
      experience: "18+ years",
      specialties: ["ADHD", "Behavioural Support", "Emotional Regulation", "Art Therapy"],
      teaser: "I help children and teens build emotional regulation and confidence through behavioural therapy and art-based approaches.",
      fullBio: [
        "Dr. Pavithra Lakshmi Narasimhan is a Clinical Psychologist, Behaviour Intervention Therapist, and Certified Art Therapist with over 18 years of experience in the fields of education, mental health counselling, and behavioural intervention. Her work is dedicated to supporting the emotional, behavioural, and developmental well-being of children, adolescents, and families.",
        "She holds a PhD in Clinical Psychology, along with a Master's degree in Psychology and a Bachelor of Education (B.Ed.), and has specialized training in Special Educational Needs (SEN), child counselling, trauma support, and expressive art therapy.",
        "Dr. Pavithra has extensive experience working in inclusive educational settings, providing individualized support for children with neurodivergent profiles such as ADHD, learning differences, behavioural regulation challenges, and emotional difficulties. She designs individualized behaviour intervention plans, psychological assessments, and therapeutic programs that help children build self-awareness, emotional regulation, and social confidence.",
        "Her therapeutic approach integrates evidence-based methods including Cognitive Behavioural Therapy (CBT), Dialectical Behaviour Therapy (DBT), Mindfulness-Based Therapy (MBT), Acceptance and Commitment Therapy (ACT), Functional Communication Training (FCT), and expressive art therapy techniques.",
        "Currently working as a Behaviour Intervention Specialist, Dr. Pavithra collaborates closely with parents, teachers, and multidisciplinary professionals to create supportive learning environments that nurture each child's unique potential.",
        "Dr. Pavithra believes that when children feel understood and supported, they gain the confidence to grow, learn, and thrive."
      ],
      order: 9
    },
    {
      id: "dinesh-jayabalakrishnan",
      name: "Dinesh Jayabalakrishnan",
      title: "B.O.Th. · Table Tennis Coach",
      image: "/Dinesh.png",
      experience: "14+ years",
      specialties: ["Focus & Coordination", "Para-athletes", "Motor Skills", "Sports Therapy"],
      teaser: "I build focus, coordination, and confidence through Table Tennis — 1000+ students trained, including national champion para-athletes.",
      fullBio: [
        "In the fast-paced world of Table Tennis, Dinesh Jayabalakrishnan stands out as a dedicated coach and passionate advocate of this game. This game, known for enhancing reflexes, coordination, and concentration, has been Dinesh's lifelong passion. Despite Dinesh's academic achievements, his heart was set on Table Tennis. As a schoolboy in Tamil Nadu, he achieved state-ranking status during his sub-junior stage. He continued to excel in university, representing Bharathiar University in South Zone Inter-University competitions and leading his college team to multiple victories. Internationally, Dinesh played for PT 75 Club in Tampere, Finland, winning several tournaments and securing a ranking position in the SPTL. Back in India, he consistently won team and individual prizes in inter-corporate competitions from 2000 onwards.",
        "With over 14 years of coaching experience, Dinesh has trained over 1000 students, including more than 10 para-athletes. Dinesh has guided para-athletes to become national champions and international medalists. As the State Coach for Karnataka (2019-2022), his students have excelled in national ranking events, winning state championships in U-11 and U-13 categories. His students have also triumphed in CBSE school tournaments and various inter-school competitions.",
        "Dinesh is ITTF Level 1 (2012) and Level 2 Certified Coach (2014)—among the country's elite, being one of only 16 coaches to achieve this certification. He has completed 'Beginning Coaching: General Principles' from Australia (Certificate Number 286671/2011).",
        "Dinesh Jayabalakrishnan's journey is fueled by a singular goal: to promote the game of Table Tennis. He strives to teach the fundamentals of the game, coaching students to excel and supporting them to bring laurels to their institutions and training academies through competition success. His journey is a testament to the transformative power of dedication, passion, and the unyielding spirit to uplift others through sport."
      ],
      order: 8
    },
    {
      id: "akhila-r-n",
      name: "Akhila R N",
      title: "M.Sc. (Audiology & Speech-Language Pathology) · RCI Licensed Speech Language Pathologist",
      image: "/akhila.png",
      experience: "8+ years",
      specialties: ["Autism", "Language Delays", "Apraxia", "Stuttering", "Speech Therapy"],
      teaser: "I help children find their voice — from first words to confident communication — and equip parents with practical strategies for home.",
      fullBio: [
        "Akhila R N is an accomplished Speech Language Pathologist with over 8 years of experience specializing in paediatric speech therapy. She holds an RCI license and has established a thriving practice that values individualized, child-led interventions and parent empowerment.",
        "Akhila completed her Bachelor's degree in Speech and Hearing from Mysore University and earned her Master's degree in Audiology and Speech-Language Pathology from Kasturba Medical College, Mangalore, Manipal University. She is certified in several internationally recognized programs, including the Hanen Programs (More Than Words and TalkAbility), Talk Tools (Levels 1 & 2), PROMPT Therapy (Introduction and Bridging), and Play Therapy. Additionally, she is a Certified Storyteller and a Life Member of the Indian Speech and Hearing Association (ISHA).",
        "Her clinical expertise covers a broad spectrum of communication disorders such as Autism Spectrum Disorders, Language Delays, Motor Speech Disorders (including Apraxia), Articulation Disorders, Stuttering, Social Communication challenges, Oral Motor issues, and Voice Disorders. Akhila is renowned for her ability to translate research into practical, everyday strategies for families, often conducting parent training workshops that create lasting impact.",
        "Akhila's therapeutic philosophy is built on the belief that active family involvement leads to the best outcomes. She systematically integrates meaningful changes into daily routines and equips parents with tools to foster their child's communication at home. Committed to lifelong learning, she continually pursues advanced training and certifications to further enhance the quality of her practice.",
        "By blending evidence-based methods with creative, holistic approaches, Akhila strives to make therapy both effective and enriching for children and their families."
      ],
      order: 7
    },
    {
      id: "mohamed-nowful",
      name: "Dr. S. Mohamed Nowful",
      title: "B.O.Th. · Licensed Occupational Therapist · IOTR, NCAHP, AIOTA Life Member · USA certified BLS, ACLS & OPT-1, CLASI Sensory Integration, oromotor stimulation",
      image: "/mohmed.jpeg",
      experience: "2+ years",
      specialties: ["ASD", "ADHD", "Sensory Processing", "Daily Living Skills", "Occupational Therapy"],
      teaser: "I help children and adults build independence through sensory regulation and daily living skills training.",
      fullBio: [
        "Dr. S. Mohamed Nowful is a licensed Occupational Therapist holding a Bachelor of Occupational Therapy (B.O.Th.) from JKK Munirajah Medical Research Foundation College of Occupational Therapy. He is a registered member of the Indian Occupational Therapy Registration (IOTR), the National Commission for Allied and Healthcare Professions (NCAHP), and holds Life Membership in the All India Occupational Therapists' Association (AIOTA). He is also USA certified in BLS, ACLS & OPT-1, CLASI Sensory Integration Modules-1, along with certification in oromotor stimulation.",
        "With over 2 years of specialized experience, Dr. Nowful focuses on developmental pediatrics, neurorehabilitation, and mental health. He is skilled in conducting assessments for children and individuals with developmental disorders, neurodevelopmental conditions, and disabilities.",
        "His key areas of expertise include sensory integration therapy, play therapy, reflex integration, daily living skills training, adaptive skills development, and promoting independence across the lifespan—from early intervention to adult lifestyle management.",
        "He provides specialized support for conditions such as Autism Spectrum Disorder (ASD), Cerebral Palsy (CP), Global Developmental Delay (GDD), Sensory Processing Disorders, learning and intellectual disabilities, Attention-Deficit/Hyperactivity Disorder (ADHD), and various genetic disorders. Dr. Nowful is also trained in mental health interventions, including screen addiction management, neuroplasticity-based approaches, and integrating occupational therapy with complementary therapies such as behavioral therapy."
      ],
      order: 6
    }
  ]

  for (const person of PEOPLE) {
    console.log(`👤 Pushing specialist: ${person.name}...`)
    const imgAsset = await uploadImage(person.image)
    
    const specialistDoc = {
      _type: 'specialist',
      name: person.name,
      slug: { _type: 'slug', current: person.id },
      title: person.title,
      image: imgAsset,
      experience: person.experience,
      specialties: person.specialties,
      teaser: person.teaser,
      fullBio: textToBlocks(person.fullBio),
      order: person.order
    }

    // Sync both published and draft
    await client.createOrReplace({ ...specialistDoc, _id: `specialist-${person.id}` })
    await client.createOrReplace({ ...specialistDoc, _id: `drafts.specialist-${person.id}` })
  }

  console.log('✅ All specialists pushed successfully (Published + Draft)!')
}

pushAboutUs().catch(err => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
