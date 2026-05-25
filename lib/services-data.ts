import { type Specialist } from "@/sanity/types";

export interface ServiceData {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: "assessments" | "therapy" | "guidance" | "programs";
  image: string;
  demographics?: string[];
  content: {
    overview: string;
    benefits?: string[];
    whatToExpect?: string[];
    whoIsItFor?: string[];
    duration?: string;
    format?: string;
    faqs?: { question: string; answer: string }[];
    audienceSections?: {
    audienceType: "children" | "teens" | "adults" | "geriatrics";
    title: string;      hero?: {
        shortDescription?: string;
        overview?: string;
      };
      contentBlocks?: Record<string, unknown>[];
      // Legacy Fallbacks
      shortDescription?: string;
      overview?: string;
      whoIsItFor?: string[];
      whoIsItForIntro?: string;
      benefits?: string[];
      expectations?: string[];
      expectationsIntro?: string;
      supportedItems?: (string | { heading?: string; items: string[] })[];
      supportedItemsTitle?: string;
      supportedItemsIntro?: string;
      approachItems?: string[];
      whyChooseItems?: string[];
      additionalSections?: {
        title: string;
        intro?: string;
        items: string[];
        color?: string;
        position?: "bottom";
      }[];
    }[];
    approachItems?: string[];
    whyChooseItems?: string[];
    additionalSections?: {
      title: string;
      intro?: string;
      items: string[];
      color?: string;
      position?: "bottom";
    }[];
  };
}

export const services: ServiceData[] = [
  // ============================================================================
  // ASSESSMENTS
  // ============================================================================
  {
    id: "1",
    title: "Psychometric Assessments",
    slug: "psychometric-assessments",
    description: "Our Psychometric Assessment Services help **children, adolescents, adults, and older adults** gain deeper insight into their cognitive, emotional, behavioral, and social functioning — creating a clear roadmap for support, self-understanding, and growth.",
    category: "assessments",
    image: "/features-service-card/child-autism-assessment.png",
    demographics: ["Children", "Adolescents", "Adults", "Geriatric"],
    content: {
      overview: "A psychometric assessment is more than a diagnosis — it is a compassionate process that helps individuals and families better understand strengths, challenges, and support needs. At Divit MindSpace, we combine evidence-based clinical tools with an empathetic, neuro-affirming approach to provide meaningful insights that guide intervention, accommodations, emotional well-being, and long-term success.\n\nOur assessments are designed to explore cognitive abilities, emotional functioning, behavior patterns, executive functioning, adaptive skills, personality traits, and learning profiles in a holistic manner. We focus not only on identifying challenges, but also on recognizing strengths and creating practical, individualized recommendations for home, school, workplace, and everyday life.\n\nWe provide assessments for **children, adolescents, adults, and geriatrics** across areas such as Autism, ADHD, Learning Disabilities, Anxiety, Depression, Trauma, Executive Functioning, Personality, Cognitive Changes, and Emotional Well-Being.",
      benefits: [
        "Clear understanding of cognitive, emotional, behavioral, and personality functioning",
        "Identification of learning, attention, executive functioning, emotional, or behavioral challenges",
        "Insight into strengths, coping styles, sensory profiles, and support needs",
        "Diagnostic clarification where relevant",
        "Personalized recommendations for therapy, school, workplace, and daily-life support",
        "Guidance for accommodations, interventions, and future planning",
        "A comprehensive roadmap for emotional well-being, self-awareness, and growth",
        "Support in securing appropriate school, workplace, or lifestyle accommodations",
        "Practical strategies for improving functioning across home, school, work, and social environments"
      ],
      whatToExpect: [
        "Detailed clinical interview and developmental history",
        "Review of previous reports, school/work records, and relevant documentation",
        "Parent, teacher, caregiver, or self-report questionnaires where appropriate",
        "Standardized psychometric testing using evidence-based tools",
        "Assessment of cognitive, emotional, behavioral, social, adaptive, and executive functioning",
        "Child-friendly and supportive assessment process tailored to the individual’s pace and comfort",
        "Comprehensive report with clear interpretation of findings and practical recommendations",
        "Guidance regarding interventions, accommodations, therapy, and next steps"
      ],
      audienceSections: [
        {
          audienceType: "children",
          title: "Children",
          hero: {
            shortDescription: "We take a holistic view of a child’s cognitive, emotional, academic, and social development. Our goal is to translate complex behaviors into clear, actionable insights that support success at home, school, and beyond.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "pa-children-right-support",
              title: "Is This the Right Support for You?",
              intro: "When to Reach Out for a Child or Adolescent Assessment:",
              items: [
                "Developmental gaps — delayed speech, social interaction, play, or motor milestones",
                "Academic struggles — high effort with low outcomes, inconsistent performance, or increasing resistance to school",
                "Attention and organization difficulties- affecting learning or daily functioning",
                "Emotional volatility — intense meltdowns, withdrawal, anxiety, or low frustration tolerance",
                "Behavioral patterns — sensory sensitivities, repetitive behaviors, impulsivity, or challenges understanding social situations",
                "Recommendations from teachers, therapists, or caregivers for additional support or accommodations",
                "Need for diagnostic clarification, school accommodations, or individualized educational planning"
              ]
            }
          ],
          additionalSections: [
            {
              title: "Assessments for Children",
              intro: "We take a holistic view of a child’s cognitive, emotional, academic, and social development. Our goal is to translate complex behaviors into clear, actionable insights that support success at home, school, and beyond.",
              items: [
                "Autism Spectrum Assessments: Beyond surface symptoms, we explore social communication, sensory processing, adaptive functioning, emotional regulation, and special interests to help the child feel truly seen and understood.",
                "ADHD & Executive Functioning Assessments: We look beyond hyperactivity to evaluate attention, organization, working memory, impulse control, planning, and emotional regulation — while carefully differentiating ADHD from anxiety, trauma, or learning differences.",
                "Learning Disability & Psychoeducational Assessments: Focused evaluations for reading, writing, spelling, and mathematics to uncover the root causes of academic struggles, including dyslexia, dyscalculia, and dysgraphia.",
                "Emotional & Behavioral Assessments: Assessment of anxiety, mood concerns, emotional dysregulation, behavioral difficulties, social challenges, and adaptive functioning impacting daily life.",
                "Goal: To foster self-understanding, secure appropriate school accommodations and support, guide intervention planning, and create a personalized developmental and educational roadmap."
              ]
            }
          ]
        },
        {
          audienceType: "teens",
          title: "Adolescents",
          hero: {
            shortDescription: "We take a holistic view of a child’s cognitive, emotional, academic, and social development. Our goal is to translate complex behaviors into clear, actionable insights that support success at home, school, and beyond.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "pa-teens-right-support",
              title: "Is This the Right Support for You?",
              intro: "When to Reach Out for a Child or Adolescent Assessment:",
              items: [
                "Developmental gaps — delayed speech, social interaction, play, or motor milestones",
                "Academic struggles — high effort with low outcomes, inconsistent performance, or increasing resistance to school",
                "Attention and organization difficulties- affecting learning or daily functioning",
                "Emotional volatility — intense meltdowns, withdrawal, anxiety, or low frustration tolerance",
                "Behavioral patterns — sensory sensitivities, repetitive behaviors, impulsivity, or challenges understanding social situations",
                "Recommendations from teachers, therapists, or caregivers for additional support or accommodations",
                "Need for diagnostic clarification, school accommodations, or individualized educational planning"
              ]
            }
          ],
          additionalSections: [
            {
              title: "Assessments for Adolescents",
              intro: "We take a holistic view of a child’s cognitive, emotional, academic, and social development. Our goal is to translate complex behaviors into clear, actionable insights that support success at home, school, and beyond.",
              items: [
                "Autism Spectrum Assessments: Beyond surface symptoms, we explore social communication, sensory processing, adaptive functioning, emotional regulation, and special interests to help the child feel truly seen and understood.",
                "ADHD & Executive Functioning Assessments: We look beyond hyperactivity to evaluate attention, organization, working memory, impulse control, planning, and emotional regulation — while carefully differentiating ADHD from anxiety, trauma, or learning differences.",
                "Learning Disability & Psychoeducational Assessments: Focused evaluations for reading, writing, spelling, and mathematics to uncover the root causes of academic struggles, including dyslexia, dyscalculia, and dysgraphia.",
                "Emotional & Behavioral Assessments: Assessment of anxiety, mood concerns, emotional dysregulation, behavioral difficulties, social challenges, and adaptive functioning impacting daily life.",
                "Goal: To foster self-understanding, secure appropriate school accommodations and support, guide intervention planning, and create a personalized developmental and educational roadmap."
              ]
            }
          ]
        },
        {
          audienceType: "adults",
          title: "Adults",
          hero: {
            shortDescription: "Understanding your experiences can be a powerful step toward healing, clarity, and self-acceptance. Our adult and geriatric assessments are compassionate, collaborative, and focused on understanding the whole person — not just symptoms.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "pa-adults-right-support",
              title: "Is This the Right Support for You?",
              intro: "When to Reach Out for an Adult or Senior Assessment:",
              items: [
                "Persistent stress, burnout, or emotional exhaustion",
                "Anxiety, intrusive thoughts, panic, or social fears affecting daily life",
                "Low mood, loss of motivation, or prolonged emotional distress",
                "Difficulties with focus, organization, emotional regulation, or executive functioning",
                "Exploration of lifelong patterns related to Adult ADHD or Autism",
                "Trauma, grief, or unresolved emotional experiences impacting well-being",
                "Concerns regarding substance use or addictive patterns",
                "Changes in memory, mood, cognition, or independence in later adulthood"
              ]
            }
          ],
          additionalSections: [
            {
              title: "Assessments for Adults",
              intro: "Understanding your experiences can be a powerful step toward healing, clarity, and self-acceptance. Our adult and geriatric assessments are compassionate, collaborative, and focused on understanding the whole person — not just symptoms.",
              items: [
                "Stress, Burnout & Emotional Well-Being: We identify stress patterns, emotional overload, coping styles, and nervous system responses to support movement from survival mode toward sustainable balance and resilience.",
                "Anxiety & Mood Assessments: Support for anxiety disorders, OCD, panic, social anxiety, depression, burnout, and emotional regulation challenges through evidence-based evaluation and practical recommendations.",
                "Adult Autism & Adult ADHD Assessments: Neuro-affirming evaluations for late-identified individuals seeking clarity about lifelong patterns, executive functioning, masking, sensory experiences, and identity — while differentiating neurodivergence from anxiety, trauma, or burnout.",
                "Trauma, Grief & Personality Assessments: Safe, trauma-informed assessments that help individuals understand emotional patterns, coping mechanisms, interpersonal functioning, and the impact of past experiences.",
                "Substance Use & Addiction Assessments: Non-judgmental evaluation of substance use patterns, underlying emotional factors, co-occurring concerns, and readiness for support.",
                "Goal: To promote self-awareness, emotional well-being, effective coping strategies, workplace or lifestyle accommodations, and personalized plans for long-term psychological health and quality of life."
              ]
            }
          ]
        },
        {
          audienceType: "geriatrics",
          title: "Geriatric",
          hero: {
            shortDescription: "Understanding your experiences can be a powerful step toward healing, clarity, and self-acceptance. Our adult and geriatric assessments are compassionate, collaborative, and focused on understanding the whole person — not just symptoms.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "pa-geriatrics-right-support",
              title: "Is This the Right Support for You?",
              intro: "When to Reach Out for an Adult or Senior Assessment:",
              items: [
                "Persistent stress, burnout, or emotional exhaustion",
                "Anxiety, intrusive thoughts, panic, or social fears affecting daily life",
                "Low mood, loss of motivation, or prolonged emotional distress",
                "Difficulties with focus, organization, emotional regulation, or executive functioning",
                "Exploration of lifelong patterns related to Adult ADHD or Autism",
                "Trauma, grief, or unresolved emotional experiences impacting well-being",
                "Concerns regarding substance use or addictive patterns",
                "Changes in memory, mood, cognition, or independence in later adulthood"
              ]
            }
          ],
          additionalSections: [
            {
              title: "Assessments for Geriatric",
              intro: "Understanding your experiences can be a powerful step toward healing, clarity, and self-acceptance. Our adult and geriatric assessments are compassionate, collaborative, and focused on understanding the whole person — not just symptoms.",
              items: [
                "Stress, Burnout & Emotional Well-Being: We identify stress patterns, emotional overload, coping styles, and nervous system responses to support movement from survival mode toward sustainable balance and resilience.",
                "Anxiety & Mood Assessments: Support for anxiety disorders, OCD, panic, social anxiety, depression, burnout, and emotional regulation challenges through evidence-based evaluation and practical recommendations.",
                "Adult Autism & Adult ADHD Assessments: Neuro-affirming evaluations for late-identified individuals seeking clarity about lifelong patterns, executive functioning, masking, sensory experiences, and identity — while differentiating neurodivergence from anxiety, trauma, or burnout.",
                "Trauma, Grief & Personality Assessments: Safe, trauma-informed assessments that help individuals understand emotional patterns, coping mechanisms, interpersonal functioning, and the impact of past experiences.",
                "Substance Use & Addiction Assessments: Non-judgmental evaluation of substance use patterns, underlying emotional factors, co-occurring concerns, and readiness for support.",
                "Geriatric Assessments (55+): Dignified assessment of memory, cognition, mood, emotional well-being, and functional abilities to support independence, quality of life, and healthy aging.",
                "Goal: To promote self-awareness, emotional well-being, effective coping strategies, workplace or lifestyle accommodations, and personalized plans for long-term psychological health and quality of life."
              ]
            }
          ]
        }
      ],
      approachItems: [
        "Neuro-affirming, strengths-based, and person-centered perspective",
        "Holistic understanding of emotional, cognitive, behavioral, social, and environmental factors",
        "Collaborative process involving the individual, family, caregivers, and educators where relevant",
        "Clear, practical, and actionable recommendations",
        "Focus on empowerment through self-understanding and informed support",
        "Respect for each individual’s unique experiences, identity, strengths, and goals"
      ],
      whyChooseItems: [
        "At Divit MindSpace, we go beyond labels and standardized scores.",
        "We advocate for compassionate, neuro-affirming, and strengths-based care that honors the individuality of every person. Our clinicians combine scientific expertise with empathy to create a safe and supportive assessment experience that focuses on understanding the whole individual - not just symptoms.",
        "Our assessments are practical, collaborative, and designed to provide actionable recommendations that families, schools, workplaces, and individuals can confidently implement. Beyond assessment, we continue to guide individuals and families toward meaningful support, emotional well-being, self-acceptance, and long-term growth."
      ],
      duration: "2-3 sessions (60-90 minutes each)",
      format: "In-person at our center",
    },
  },
  {
    id: "2",
    title: "Psychoeducational Assessments",
    slug: "psychoeducational-assessments",
    description: "Create a clear, actionable roadmap to help children understand their unique learning profile and thrive academically and emotionally.",
    category: "assessments",
    image: "/Psychoeducational Assessments.jpeg",
    content: {
      overview: "Psychoeducational assessments play a pivotal role in supporting **children and adolescents** — those with learning differences such as ADHD, dyslexia, dyscalculia, dysgraphia, or autism spectrum conditions. At Divit MindSpace, we go beyond simple diagnosis to create a clear, actionable roadmap that helps children and teenagers understand their unique learning profile and thrive academically and emotionally.\n\nUsing a combination of evidence-based tools and a neuro-affirming approach, we identify strengths, uncover specific learning challenges, and provide practical recommendations tailored to the individual's needs.",
      benefits: [
        "Identification of specific learning disabilities (dyslexia, dyscalculia, dysgraphia)",
        "Detailed academic skill profile across reading, writing, and math",
        "Clear understanding of cognitive strengths and weaknesses",
        "Customized learning strategies and classroom accommodations",
        "Recommendations for school support and IEP/504 planning",
        "A comprehensive roadmap for academic improvement and self-understanding"
      ],
      whatToExpect: [
        "Review of school records and previous assessments",
        "Parent and teacher questionnaires",
        "Direct, age-appropriate assessment of reading, writing, and math skills",
        "Cognitive and achievement testing using standardized tools",
        "Comprehensive, easy-to-understand report with grade-level comparisons",
        "Detailed recommendations for home and school support"
      ],
      audienceSections: [
        {
          audienceType: "children",
          title: "Children",
          hero: {
            shortDescription: "Helping children understand their unique learning profile and thrive academically through neuro-affirming evaluations and actionable roadmaps.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "psychoed-children-right-support",
              title: "Is This the Right Support for Your Child?",
              intro: "This assessment is ideal for children facing any of the following challenges:",
              items: [
                "Struggling with reading, writing, or spelling (suspected dyslexia)",
                "Persistent difficulties with math (suspected dyscalculia)",
                "Challenges with handwriting or written expression (suspected dysgraphia)",
                "Grades that don’t reflect their true effort or potential",
                "Difficulty sustaining attention, organizing work, or completing tasks (suspected ADHD)",
                "Suspected autism spectrum conditions affecting learning and academics",
                "Need for formal documentation to request school accommodations or support"
              ]
            }
          ]
        },
        {
          audienceType: "teens",
          title: "Adolescents",
          hero: {
            shortDescription: "Supporting teenagers in navigating academic challenges, secondary school accommodations, and self-understanding through specialized learning profile evaluations.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "psychoed-adolescents-right-support",
              title: "Is This the Right Support for Your Teenager?",
              intro: "This assessment is ideal for adolescents facing any of the following challenges:",
              items: [
                "Struggling with complex reading, writing, or higher-level math",
                "Difficulty managing high school academic workload or exam preparation",
                "Persistent challenges with executive functions (planning, organization, deadlines)",
                "Academic performance that has plateaued or declined despite increased effort",
                "Seeking clarity on learning style before transitioning to college or university",
                "Need for updated documentation for Board Exam accommodations (IB, IGCSE, CBSE, NIOS)",
                "Desire for self-understanding of their neurodivergent learning profile"
              ]
            }
          ]
        }
      ],
      approachItems: [
        "Neuro-affirming and strengths-based perspective",
        "Holistic evaluation of cognitive, academic, and emotional factors",
        "Clear, practical, and actionable recommendations",
        "Collaborative process involving parents, teachers, and the child/teen",
        "Focus on empowering the individual with self-understanding and tools for success"
      ],
      whyChooseItems: [
        "Compassionate, age-appropriate assessment process",
        "Experienced clinicians who combine clinical expertise with empathy",
        "Detailed reports that schools and parents can easily understand and implement",
        "Support beyond assessment — guidance for next steps and ongoing collaboration"
      ],
      duration: "3-4 sessions (60-90 minutes each)",
      format: "In-person at our center",
    },
  },

  // ============================================================================
  // THERAPY
  // ============================================================================
  {
    id: "3",
    title: "Speech Therapy",
    slug: "speech-therapy",
    description: "At Divit MindSpace, we see communication as more than a skill—it is a child’s way of connecting with the world, expressing emotions, and building relationships.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    demographics: ["Children", "Adolescents", "Adults"],
    content: {
      overview: "We focus not just on how a child speaks, but on why they communicate, how they feel while doing so, and how communication can become meaningful for them.\n\nWe look at communication as a whole, including:\n• Speech clarity (articulation)\n• Understanding and using language\n• Fluency (flow of speech)\n• Social communication (verbal and non-verbal connection)\n\nOur approach integrates these areas naturally into play, interaction, and everyday experiences—rather than isolating them into rigid drills.\n\nBy blending therapeutic expertise with a relationship-based, child-led approach, we help children move from pressure to comfort, and from hesitation to confident expression.",
      benefits: [
        "Clearer and more confident speech",
        "Improved understanding and use of language",
        "Increased willingness to communicate",
        "Better social interaction and connection",
        "Reduced communication-related frustration",
        "Stronger self-expression of needs, thoughts, and emotions"
      ],
      whatToExpect: [
        "A gentle, observation-based initial assessment",
        "Individualized goals aligned with your child’s readiness",
        "Play-based, interaction-driven therapy sessions",
        "Ongoing parent guidance and support",
        "Practical strategies for home carryover",
        "Collaboration with other therapies (if applicable)"
      ],
      whoIsItFor: [
        "Speech delays or limited speech",
        "Non-verbal or very limited verbal communication",
        "Unclear speech or pronunciation difficulties",
        "Difficulty forming complete or grammatically correct sentences",
        "Communication challenges associated with autism",
        "Difficulty initiating or sustaining communication"
      ],
      approachItems: [
        "**Child-Led, Relationship-Based:** We follow the child’s interests to create meaningful communication opportunities.",
        "**Play as a Medium:** Communication is built through play, interaction, and shared experiences.",
        "**Emotional Safety First:** A regulated child communicates better—so we prioritize comfort and trust.",
        "**Parent as a Partner:** We support parents with practical strategies for everyday communication.",
        "**Integrated Development:** We work on communication alongside attention, regulation, and social connection."
      ],
      whyChooseItems: [
        "Warm, non-judgmental, and accepting environment",
        "Therapists who combine expertise with empathy",
        "Focus on long-term communication, not quick fixes",
        "Respect for each child’s individuality and pace",
        "A space where children feel seen, heard, and understood"
      ],
      additionalSections: [
        {
          title: "Children We Support",
          intro: "We support children with a wide range of communication needs, including:",
          items: [
            "**Speech Clarity Difficulties:** Challenges with clear sound production (articulation) and speech patterns that make understanding difficult.",
            "**Language Delays:** Difficulty understanding or expressing words, ideas, or sentences.",
            "**Fluency Challenges:** Stuttering, repetitions, or interruptions in speech flow.",
            "**Autism & Social Communication Differences:** Support in building verbal and non-verbal communication, and strengthening connection and interaction with others.",
            "**Hearing-Related Communication Needs:** Supporting speech and language development in children with hearing differences.",
            "**Developmental Differences:** Including Down syndrome, cerebral palsy, and other conditions that may impact communication."
          ]
        },
        {
          title: "Beyond Speech — Building Connection",
          intro: "At Divit MindSpace, our goal is not just to help children speak better, but to help them connect better—with themselves and with the world around them.\n\nBecause when a child feels understood, communication naturally follows.",
          items: [],
          color: "sage",
          position: "bottom"
        }
      ],
      duration: "45-minute sessions, typically weekly",
      format: "In-person at our center",
    },
  },
  {
    id: "4",
    title: "Occupational Therapy",
    slug: "occupational-therapy",
    description: "At Divit MindSpace, we see independence as more than a skill—it is a person’s ability to engage with the world, participate in daily life, and feel confident in their own abilities.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "Occupational therapy helps **children, adolescents, and adults** build motor skills, improve sensory processing, and gain independence—supporting confidence in daily activities, school, work, and life.\n\nWe look at development as a whole, including:\n• Fine motor skills (hand use, writing, precision)\n• Gross motor coordination (balance, movement, strength)\n• Sensory processing (how the body understands and responds to input)\n• Daily living skills (self-care, routines, independence)\n\nOur approach integrates these areas naturally into play, real-life tasks, and meaningful activities—rather than isolating them into repetitive exercises.",
      benefits: [
        "Improved strength, coordination, and motor control",
        "Better sensory regulation and body awareness",
        "Increased independence in daily activities",
        "Enhanced focus, planning, and task completion",
        "Greater participation in school, work, and play",
        "Reduced frustration in everyday tasks",
        "Stronger confidence and self-reliance"
      ],
      whatToExpect: [
        "A comprehensive, observation-based assessment",
        "Individualized goals aligned with developmental needs",
        "Activity-based, engaging therapy sessions",
        "Practical strategies for home and daily routines",
        "Ongoing parent and caregiver guidance",
        "Collaboration with other therapies (if applicable)"
      ],
      audienceSections: [
        {
          audienceType: "children",
          title: "Children",
          hero: {
            shortDescription: "Play-based, engaging activities that make learning feel natural and enjoyable—while building foundational motor, sensory, and self-care skills.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "ot-children-right-support",
              title: "Is This the Right Support for You?",
              intro: "OT for Children is ideal for those facing challenges with:",
              items: [
                "Fine Motor: Difficulty with buttons, zippers, scissors, or weak grip",
                "Gross Motor: Poor balance, frequent falls, or trouble climbing or jumping",
                "Developmental Skills: Delays in toileting, dressing, feeding, or play skills",
                "Sensory Processing: Over-sensitivity to sounds/textures or difficulty sitting still"
              ]
            }
          ]
        },
        {
          audienceType: "teens",
          title: "Adolescents",
          hero: {
            shortDescription: "Practical, real-life skill building focused on independence, organization, social participation, and transition readiness.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "ot-teens-right-support",
              title: "Is This the Right Support for You?",
              intro: "OT for Adolescents is designed for those experiencing:",
              items: [
                "Daily Living Skills: Challenges with time management, organization, or meal preparation",
                "Academic & Social Participation: Sensory sensitivities affecting school or peer interaction",
                "Executive Functioning: Difficulties with planning, attention, or impulse control",
                "Transitions: Building readiness for pre-vocational tasks and independent living"
              ]
            }
          ]
        },
        {
          audienceType: "adults",
          title: "Adults",
          hero: {
            shortDescription: "Goal-oriented, functional therapy to enhance daily productivity, independence, and quality of life.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "ot-adults-right-support",
              title: "Is This the Right Support for You?",
              intro: "OT for Adults supports those facing challenges with:",
              items: [
                "Daily Functioning: Difficulty managing routines, self-care, or household tasks",
                "Work & Productivity: Challenges with focus, organization, or task completion",
                "Physical Recovery: Regaining strength, coordination, or function after injury or health conditions",
                "Sensory & Stress Regulation: Managing overwhelm, fatigue, or sensory sensitivities in daily life",
                "Independence & Quality of Life: Building confidence in personal, social, and work environments"
              ]
            }
          ]
        }
      ],
      approachItems: [
        "Individualized & Functional: We tailor therapy to real-life goals that matter in everyday routines.",
        "Learning Through Doing: Skills are built through meaningful activities, not isolated drills.",
        "Sensory-Informed Care: We understand how sensory experiences impact behavior, attention, and participation.",
        "Building Independence Gradually: We support step-by-step progress toward autonomy.",
        "Parent and Caregiver as a Partner: We equip families with practical tools to support progress beyond sessions."
      ],
      whyChooseItems: [
        "Warm, supportive, and non-judgmental environment",
        "Therapists who combine expertise with empathy",
        "Focus on long-term independence, not quick fixes",
        "Respect for each individual’s pace and journey",
        "A space where every individual feels capable and empowered"
      ],
      additionalSections: [
        {
          title: "Needs We Support",
          intro: "Our Occupational Therapy program supports individuals across age groups with a wide range of needs:",
          items: [
            "## Motor Development",
            "Difficulty with fine motor skills (writing, buttoning, grip)",
            "Challenges with balance, coordination, or physical movement",
            "Delays in motor milestones",
            "## Sensory Processing",
            "Over- or under-sensitivity to sounds, textures, or movement",
            "Difficulty staying regulated or attentive",
            "Sensory-seeking or sensory-avoidant behaviors",
            "## Daily Living & Independence",
            "Challenges with dressing, grooming, feeding, or toileting",
            "Difficulty managing routines and everyday tasks",
            "Delays in age-appropriate independence",
            "## Attention & Regulation",
            "Difficulty with focus, planning, and task completion",
            "Impulse control and executive functioning challenges",
            "Emotional and behavioral regulation difficulties",
            "## Developmental & Neurological Differences",
            "Autism Spectrum differences",
            "ADHD",
            "Learning challenges",
            "Conditions such as Down syndrome, cerebral palsy, and related needs"
          ]
        },
        {
          title: "Services We Offer",
          intro: "Occupational Therapy at Divit MindSpace includes a wide range of services to address various developmental and functional challenges:",
          items: [
            "Sensory Integration Therapy",
            "Fine Motor Skill Development",
            "Gross Motor Skill Development",
            "Self-Care & Independence Training",
            "Social & Emotional Skill Support",
            "Adaptive Strategies & Modifications",
            "Parent & Caregiver Guidance"
          ],
          color: "white"
        },
        {
          title: "Beyond Therapy — Building Independence",
          intro: "At Divit MindSpace, our goal is not just to improve skills, but to help individuals participate more fully in their daily lives.",
          items: [
            "Building Independence: When a person feels capable, independence naturally follows.",
            "Participate Fully: Helping individuals engage with their world.",
            "Meaningful Outcomes: Focusing on goals that matter in real life."
          ],
          color: "sage"
        }
      ],
      duration: "45-minute sessions, typically weekly",
      format: "In-person at our sensory-equipped center",
    },
  },
  {
    id: "5",
    title: "Behavioral Therapy",
    slug: "behavioral-therapy",
    description: "Empowering children and adults to build meaningful skills and thrive authentically through neuro-affirming support.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "Every individual navigates the world differently. Our neuro-affirming behavioural therapy honors these differences by focusing on building meaningful skills, fostering emotional regulation, and empowering **children, adolescents, teens and adults** to thrive authentically — on their own terms.\n\nWe move beyond traditional rigid approaches to offer therapy that is deeply empathetic, highly individualized, and rooted in neurodiversity-affirming practices. Instead of encouraging masking, we provide practical tools and support to help unlock each person’s unique potential.",
      benefits: [
        "Improved emotional regulation and self-awareness",
        "Better coping strategies for stress, anxiety, and overwhelm",
        "Enhanced social communication and interaction skills",
        "Stronger executive functioning and daily living skills",
        "Increased confidence and self-acceptance",
        "Practical tools that respect your unique way of thinking and processing",
        "Greater ability to navigate school, work, and relationships authentically"
      ],
      whatToExpect: [
        "A safe, validating, and neuro-affirming therapeutic space",
        "Comprehensive initial assessment of strengths and support needs",
        "Individualized goals created collaboratively with you or your family",
        "Creative and engaging therapy methods, including play and expressive techniques",
        "Practical, real-life strategies that can be easily applied at home or work",
        "Regular progress reviews with clear feedback and adjustments",
        "Active involvement of parents (for **children, adolescents and teens**)"
      ],
      audienceSections: [
        {
          audienceType: "children",
          title: "Children & Teens",
          hero: {
            shortDescription: "Creative, play-based, and engaging sessions designed to help young minds build essential social-emotional skills, communication, and confidence in a fun and validating environment.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "bt-children-right-support",
              title: "Is This the Right Support for You?",
              intro: "For **Children & Teens**:",
              items: [
                "Challenges with emotional regulation or frequent meltdowns",
                "Difficulty with social communication or peer interactions",
                "Executive functioning difficulties (organization, attention, impulse control)",
                "Need for early developmental support in a neuro-affirming way",
                "Anxiety, stress, or behavioural challenges related to neurodivergence"
              ]
            }
          ]
        },
        {
          audienceType: "adults",
          title: "Adults",
          hero: {
            shortDescription: "Personalized support focused on emotional regulation, executive functioning, and developing practical strategies that align with your neurodivergent strengths and daily life needs.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "bt-adults-right-support",
              title: "Is This the Right Support for You?",
              intro: "For **Adults**:",
              items: [
                "Struggling with emotional regulation, burnout, or overwhelm",
                "Challenges with executive functioning in daily or work life",
                "Desire for neuro-affirming support for ADHD or Autism",
                "Difficulty with masking and wanting to build authentic coping strategies",
                "Need for personalized tools to navigate relationships and life transitions"
              ]
            }
          ]
        }
      ],
      approachItems: [
        "Deeply neuro-affirming and individualized care",
        "Integration of creative, expressive, and play-based methods",
        "Focus on strengths rather than deficits",
        "Collaborative goal-setting with individuals and families",
        "Practical strategies that support real-life success without masking"
      ],
      whyChooseItems: [
        "A safe and validating space for neurodivergent individuals",
        "Experienced therapists who truly understand neurodiversity",
        "Engaging therapy that respects each person’s unique pace and style",
        "Emphasis on empowerment, self-acceptance, and long-term growth"
      ],
      duration: "45-60 minute sessions, typically weekly",
      format: "In-person at our center",
    },
  },
  {
    id: "6",
    title: "Cognitive Behavioral Therapy (CBT)",
    slug: "cbt-cognitive-behavioral-therapy",
    description: "Practical, solution-focused support helping children and adults navigate life with greater confidence, clarity, and calm.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "Cognitive Behavioral Therapy (CBT) is a practical, goal-oriented, and evidence-based approach that explores the connection between thoughts, feelings, and behaviors. At Divit MindSpace, we offer CBT that is tailored for both neurotypical and neurodivergent individuals (ADHD/Autism). We don’t aim to change who you are — we equip you with effective tools to navigate life with greater confidence, clarity, and calm.",
      whatToExpect: [
        "Initial assessment to understand specific needs and goals",
        "Personalized, practical skill-building sessions",
        "Fun, engaging activities for **children** and **teens**",
        "Solution-focused techniques and real-life practice for **adults**",
        "Homework or simple practice exercises between sessions",
        "Regular progress reviews with parent involvement (for **children**)",
        "Collaborative adjustments to the therapy plan"
      ],
      audienceSections: [
        {
          audienceType: "children",
          title: "Children",
          hero: {
            shortDescription: "We use age-appropriate language, play, and engaging activities to help younger minds understand their emotions and build resilience in a fun, supportive way.",
          },
          benefits: [
            "Better understanding of thoughts and emotions",
            "Simple, effective coping strategies for anxiety and stress",
            "Improved emotional regulation and self-control",
            "Stronger problem-solving skills and self-confidence",
            "Healthy ways to manage big emotions and school pressure"
          ],
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "cbt-children-right-support",
              title: "Is This the Right Support for You?",
              intro: "CBT for **Children** & **Teens**",
              items: [
                "Anxiety, worry, or school-related stress",
                "Frequent meltdowns or emotional outbursts",
                "Difficulty with emotional regulation or self-control",
                "Challenges related to ADHD or Autism",
                "Low self-confidence or persistent negative thinking"
              ]
            }
          ]
        },
        {
          audienceType: "teens",
          title: "Adolescents",
          hero: {
            shortDescription: "Supporting teenagers in understanding the link between thoughts and behaviors, providing them with tools to manage stress and build academic and social resilience.",
          },
          benefits: [
            "Better understanding of thoughts and emotions",
            "Simple, effective coping strategies for anxiety and stress",
            "Improved emotional regulation and self-control",
            "Stronger problem-solving skills and self-confidence",
            "Healthy ways to manage big emotions and school pressure"
          ],
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "cbt-teens-right-support",
              title: "Is This the Right Support for You?",
              intro: "CBT for **Children** & **Teens**",
              items: [
                "Anxiety, worry, or school-related stress",
                "Frequent meltdowns or emotional outbursts",
                "Difficulty with emotional regulation or self-control",
                "Challenges related to ADHD or Autism",
                "Low self-confidence or persistent negative thinking"
              ]
            }
          ]
        },
        {
          audienceType: "adults",
          title: "Adults",
          hero: {
            shortDescription: "Practical, solution-focused strategies to manage work stress, relationship challenges, persistent negative thinking, and the mental loops that impact daily life.",
          },
          benefits: [
            "Deeper awareness of unhelpful thought patterns",
            "Effective tools for managing anxiety, stress, and overwhelm",
            "Better emotional regulation and resilience",
            "Improved decision-making and overall well-being",
            "Neuro-affirming strategies for ADHD and Autism-related challenges"
          ],
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "cbt-adults-right-support",
              title: "Is This the Right Support for You?",
              intro: "CBT for **Adults**",
              items: [
                "Burnout, work stress, or overwhelming life pressures",
                "Panic attacks, persistent anxiety, or negative thought patterns",
                "Relationship difficulties or interpersonal challenges",
                "Need for neuro-affirming coping strategies (ADHD/Autism)",
                "Desire to build resilience, emotional regulation, and long-term well-being"
              ]
            }
          ]
        }
      ],
      approachItems: [
        "Evidence-based and practical CBT techniques",
        "Neuro-affirming and individualized therapy",
        "Age-appropriate methods that make learning natural and engaging",
        "Focus on building real-life skills, not just insight",
        "Strong collaboration with parents for **children** and **teens**"
      ],
      whyChooseItems: [
        "Warm, supportive, and non-judgmental environment",
        "Therapists experienced in working with both neurotypical and neurodivergent clients",
        "Practical tools that create meaningful, lasting change",
        "Personalized care that respects each person’s unique needs and pace"
      ],
      duration: "50-60 minute sessions, typically weekly",
      format: "In-person or online",
    },
  },
  {
    id: "22",
    title: "Cognitive Therapy",
    slug: "cognitive-therapy",
    description: "Build emotional resilience and confidence through a collaborative space that explores the connection between thoughts, emotions, and actions.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "Our minds are powerful storytellers, but sometimes the scripts we follow can hold us back.\n\nCognitive Therapy offers a collaborative and supportive space to explore the deep connection between your thoughts, emotions, and actions — helping **children, teens, and adults** understand these cognitive processes, gain greater clarity, and build emotional resilience and confidence.",
      benefits: [
        "Greater awareness of thought patterns and their impact on emotions and behavior",
        "Practical tools to reframe unhelpful or negative thinking",
        "Improved emotional regulation and resilience",
        "Reduced anxiety, self-doubt, and overwhelm",
        "Stronger problem-solving and decision-making skills",
        "Increased self-confidence and a healthier inner dialogue",
        "Personalized strategies that respect your unique cognitive style"
      ],
      whatToExpect: [
        "A safe, collaborative, and neuro-affirming therapeutic environment",
        "Initial assessment to understand your specific thought patterns and goals",
        "Personalized sessions tailored to your age and needs",
        "Creative and expressive techniques alongside traditional cognitive methods",
        "Practical tools and real-world strategies to practice between sessions",
        "Regular progress reviews and adjustments to the therapy plan"
      ],
      audienceSections: [
        {
          audienceType: "children",
          title: "Children & Teens",
          hero: {
            shortDescription: "We use age-appropriate, engaging methods to help young minds understand their thoughts and emotions, build healthy inner narratives, and develop strong emotional foundations.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "ct-children-right-support",
              title: "Is This the Right Support for You?",
              intro: "Cognitive Therapy for **Children & Teens**:",
              items: [
                "Difficulty understanding or managing big emotions",
                "Negative self-talk or low self-confidence",
                "Anxiety, worry, or school-related stress",
                "Challenges with emotional regulation or rigid thinking",
                "Need for support in building healthy thought patterns early in life"
              ]
            }
          ]
        },
        {
          audienceType: "adults",
          title: "Adults",
          hero: {
            shortDescription: "Practical, insightful support for identifying unhelpful thought patterns and reframing them, especially during life transitions, stress, anxiety, or self-doubt.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "ct-adults-right-support",
              title: "Is This the Right Support for You?",
              intro: "Cognitive Therapy for **Adults**:",
              items: [
                "Persistent negative or unhelpful thought patterns",
                "Struggles with anxiety, self-doubt, or overwhelming stress",
                "Difficulty managing life transitions or burnout",
                "Desire for neuro-affirming cognitive support",
                "Wanting practical tools to improve emotional well-being and resilience"
              ]
            }
          ]
        }
      ],
      approachItems: [
        "Neuro-affirming and individualized cognitive therapy",
        "Gentle exploration and reframing of thought patterns",
        "Integration of expressive and creative methods when helpful",
        "Focus on practical, actionable toolkits for daily life",
        "Respect for different cognitive processing styles"
      ],
      whyChooseItems: [
        "A validating and empowering space for all types of minds",
        "Experienced therapists who honor neurodiversity",
        "Practical strategies that create real, lasting change",
        "Therapy adapted thoughtfully for every age and stage"
      ],
      duration: "45-60 minute sessions, typically weekly",
      format: "In-person at our center",
    },
  },
  {
    id: "13",
    title: "Group Therapy Sessions",
    slug: "group-therapy-sessions",
    description: "Build essential social and communication skills through meaningful peer connection and guided support.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "Group therapy helps children and adults develop essential social, emotional, and communication skills through guided peer interactions in a safe, supportive, and confidential environment.\n\nAt Divit MindSpace, we believe real growth happens in connection with others. We look at connection as a whole, including:\n• Social communication (understanding cues and interaction)\n• Emotional regulation (managing feelings in a group)\n• Friendship skills (building and maintaining connections)\n• Personal growth (gaining confidence and resilience)\n\nWe create meaningful group experiences where individuals can practice skills, receive gentle feedback, and build confidence while feeling accepted and understood.",
      audienceSections: [
        {
          audienceType: "children",
          title: "Children",
          hero: {
            shortDescription: "Play-based and engaging sessions that help children build social communication, emotional regulation, and friendship skills through fun activities and guided peer interactions.",
          },
          benefits: [
            "Improved social and communication skills",
            "Better understanding and interpretation of social cues",
            "Increased confidence in group settings and peer interactions",
            "Enhanced friendship-building and conversation skills",
            "Better emotional regulation and cooperation abilities"
          ],
          expectations: [
            "Small, carefully balanced groups (4–6 participants)",
            "Structured sessions with clear goals and themes",
            "Age-appropriate activities, games, and role-play",
            "Real-time feedback from experienced therapists",
            "Regular progress updates and home strategies",
            "Safe, confidential, and non-judgmental environment"
          ],
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "group-therapy-children-right-support",
              title: "Is This the Right Support for You?",
              intro: "Group Therapy for Children",
              items: [
                "Children with autism spectrum conditions needing social communication support",
                "Difficulty making or maintaining friendships",
                "Social anxiety or discomfort in group settings",
                "Challenges in understanding or responding to social cues",
                "Need for structured practice in peer interactions and turn-taking",
                "Limited social exposure or delayed social skills"
              ]
            }
          ]
        },
        {
          audienceType: "adults",
          title: "Adults",
          hero: {
            shortDescription: "Supportive and confidential groups focused on addiction recovery, emotional regulation, interpersonal skills, and personal growth — offering peer support and practical tools for lasting change.",
          },
          benefits: [
            "Greater awareness of addiction triggers and healthier coping strategies",
            "Stronger relapse prevention skills and craving management",
            "Improved emotional regulation and stress management",
            "Enhanced interpersonal and communication skills",
            "Reduced feelings of shame, guilt, and isolation through peer support",
            "Increased self-confidence and motivation for long-term recovery"
          ],
          expectations: [
            "Small, carefully balanced groups (4–6 participants)",
            "Structured sessions with clear goals and themes",
            "Guided discussions and skill-building exercises",
            "Real-time feedback from experienced therapists",
            "Safe, confidential, and non-judgmental environment"
          ],
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "group-therapy-adults-right-support",
              title: "Is This the Right Support for You?",
              intro: "Group Therapy for Adults",
              items: [
                "Individuals seeking support for addiction recovery and relapse prevention",
                "Challenges with emotional regulation and stress management",
                "Difficulty in interpersonal relationships or setting healthy boundaries",
                "Feelings of isolation, shame, or guilt related to personal struggles",
                "Need for peer support and shared experiences in a safe space",
                "Support for family dynamics and rebuilding a balanced life"
              ]
            }
          ]
        }
      ],
      approachItems: [
        "Small, intentionally formed groups for meaningful interaction",
        "Skill-building through real-life practice and guided feedback",
        "Safe, inclusive, and neuro-affirming environment",
        "Focus on connection, acceptance, and personal growth",
        "Collaboration with individual therapists when needed"
      ],
      whyChooseItems: [
        "Warm, supportive, and confidential setting",
        "Experienced therapists who combine expertise with empathy",
        "Practical, real-world skills rather than theory alone",
        "Emphasis on building genuine connections and confidence",
        "A space where every participant feels valued and understood"
      ],
      duration: "60-minute sessions, typically weekly",
      format: "In-person at our supportive therapy center",
    },
  },
  {
    id: "8",
    title: "Play Therapy",
    slug: "play-therapy",
    description: "For **children**, toys are their words, and play is their conversation.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "Play Therapy is a dynamic and developmentally appropriate approach that allows **children** to explore their emotions, process complex experiences, and communicate their inner world safely. At Divit MindSpace, we provide a nurturing, neuro-inclusive space where **children** can freely express themselves, build resilience, and discover their strengths through the natural language of play.",
      benefits: [
        "Emotional Regulation: Developing the tools to understand and manage big feelings naturally.",
        "Enhanced Communication: Finding new ways to express needs, boundaries, and thoughts.",
        "Confidence & Autonomy: Fostering a sense of self-worth and independence through child-led exploration.",
        "Coping Strategies: Building healthy mechanisms to navigate stress, anxiety, or life transitions.",
        "Stronger Family Bonds: Empowering parents with insights and strategies to support their child's unique developmental journey.",
      ],
      whatToExpect: [
        "A warm, judgment-free environment tailored to your child's sensory and emotional needs.",
        "Sessions are primarily child-directed — the child leads the play while the therapist gently facilitates, observes, and engages.",
        "Collaborative care — parents and caregivers are kept in the loop through regular touchpoints to ensure strategies translate to everyday life at home.",
      ],
      whoIsItFor: [
        "Experiencing anxiety, persistent sadness, or emotional dysregulation.",
        "Navigating major life transitions (e.g., changing schools, family separation, grief).",
        "Seeking neuro-affirming support for ADHD, Autism, or other neurodivergent profiles.",
        "Showing sudden behavioral shifts at home or school.",
        "Processing traumatic events or medical anxiety.",
      ],
      duration: "45-50 minute sessions, typically weekly",
      format: "In-person at our child-friendly therapy room",
      additionalSections: [
        {
          title: "Modalities We Use",
          intro: "We integrate a variety of evidence-based and creative modalities to best support your child's unique profile:",
          items: [
            "Non-Directive (Child-Centered) Play: Allowing the child complete freedom to choose their activities, fostering self-healing and autonomy.",
            "Expressive Arts Therapy: Utilizing drawing, painting, and clay to help children articulate feelings that are difficult to put into words.",
            "Therapeutic Storytelling & Theater: Using role-play, puppets, and dramatic arts to safely explore social dynamics, process experiences, and build empathy.",
            "Sand Tray Therapy: A tactile, sensory-rich modality where children create miniature worlds to map out their inner landscapes.",
            "Somatic & Movement Play: Engaging the body to help release stored tension and regulate the nervous system.",
          ],
        },
        {
          title: "Why Choose Divit MindSpace",
          intro: "At Divit MindSpace, we don't just treat behaviors; we honor the whole child.",
          items: [
            "Our approach is deeply rooted in neurodiversity-affirming care and early childhood developmental support.",
            "We recognize that every child's brain is beautifully unique, and our specialized team — bringing expertise across clinical psychology, expressive arts, and developmental education — works collaboratively to meet your child exactly where they are.",
            "We partner with your family to ensure that the growth that starts in our playroom blossoms in all areas of your child's life.",
          ],
          color: "sage",
        },
      ],
    },
  },

  {
    id: "14",
    title: "Sensory Integration Therapy",
    slug: "sensory-integration-program",
    description: "Our Sensory Integration Therapy Program helps children and adults process sensory information more effectively, improve emotional and behavioral regulation, enhance participation in daily activities, and build greater confidence, independence, and functional engagement in everyday life.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    demographics: ["Children", "Adolescents", "Adults"],
    content: {
      overview: "At Divit MindSpace, our Sensory Integration Therapy Program is designed to help children and adults process, organize, and respond to sensory input from their environment. Using play-based, movement-oriented, and evidence-based therapeutic approaches, we support individuals facing difficulties in processing touch, movement, sound, textures, and body awareness.\n\nOur therapists create supportive, sensory-rich environments (such as our specialized sensory gym) where individuals can safely explore movement, sensory experiences, and self-regulation strategies. By building custom sensory programs, we help improve focus, attention, emotional balance, motor coordination, and functional independence in everyday life.",
      benefits: [
        "Improved sensory processing and regulation skills",
        "Better attention, focus, and participation in daily activities",
        "Enhanced emotional regulation and coping abilities",
        "Improved balance, coordination, body awareness, and motor planning",
        "Reduced sensory overwhelm, anxiety, or dysregulation",
        "Greater comfort with sensory experiences and environmental transitions",
        "Improved independence and participation across home, school, workplace, and social settings",
        "Increased confidence, self-awareness, and functional engagement",
      ],
      whatToExpect: [
        "Comprehensive sensory and functional assessment",
        "Identification of sensory strengths, challenges, and regulation needs",
        "Individualized therapy planning based on developmental and functional goals",
        "Structured sensory integration sessions using evidence-based therapeutic activities",
        "Sensory-rich, play-based, movement-based, and functional interventions",
        "Personalized sensory diet and home/school/workplace recommendations",
        "Parent, caregiver, educator, or self-regulation guidance where required",
        "Ongoing monitoring of progress and adaptation of intervention strategies",
      ],
      whoIsItFor: [
        "Difficulty managing sensory input such as sound, touch, movement, textures, or lights",
        "Sensory-seeking or sensory-avoidant behaviors",
        "Frequent emotional dysregulation, meltdowns, or sensory overwhelm",
        "Attention, focus, or participation challenges",
        "Motor coordination, balance, or body-awareness difficulties",
        "Difficulty with transitions, routines, or environmental changes",
        "Sensory sensitivities impacting school, work, social interaction, or daily functioning",
        "Challenges associated with Autism, ADHD, SPD, anxiety, developmental delays, or neurodivergence",
        "Need for sensory strategies to improve regulation and participation",
      ],
      duration: "45-minute sessions, 1-2 times weekly",
      format: "In-person at our sensory-equipped center",
      approachItems: [
        "Neuro-affirming, strengths-based, and individualized approach",
        "Play-based, movement-oriented, and evidence-based intervention",
        "Safe, supportive, and sensory-friendly therapeutic environments",
        "Focus on emotional safety, regulation, confidence, and participation",
        "Collaborative involvement of families, caregivers, educators, and individuals",
        "Functional and practical sensory strategies integrated into everyday life",
      ],
      whyChooseItems: [
        "At Divit MindSpace, we believe sensory experiences shape how individuals engage with the world around them.",
        "Our dedicated therapists combine expertise, compassion, and evidence-based sensory integration approaches to help individuals better understand and regulate their sensory experiences. Through individualized therapy, sensory-rich interventions, and collaborative support, we help children and adults build confidence, participation, emotional balance, and functional independence.",
        "We are committed to empowering individuals and families to navigate sensory experiences with greater comfort, understanding, resilience, and success.",
      ],
      additionalSections: [
        {
          title: "Objective",
          items: [
            "To improve sensory processing and sensory regulation abilities",
            "To enhance attention, participation, emotional regulation, and adaptive functioning",
            "To support motor coordination, balance, body awareness, and planning skills",
            "To reduce sensory overwhelm, avoidance, or sensory-seeking behaviors",
            "To improve participation in school, home, work, social, and community environments",
            "To help individuals respond more effectively to sensory stimuli in daily life",
            "To support confidence, independence, and overall well-being",
          ],
        },
        {
          title: "Sensory Integration Therapy",
          items: [
            "Our Sensory Integration Therapy sessions are individualized based on each person’s sensory profile, developmental needs, strengths, challenges, and daily-life goals.",
            "Therapy sessions may include: Swinging and vestibular activities, Balance and movement-based exercises, Tactile and sensory exploration, Deep pressure and proprioceptive activities, Motor coordination and body-awareness tasks, Visual and auditory processing activities, Sensory obstacle courses and structured play, Emotional regulation and calming strategies, Attention and participation-focused activities",
            "By engaging in sensory-rich and meaningful therapeutic experiences, individuals learn to modulate sensory responses, improve self-regulation, strengthen motor skills, and enhance overall participation in everyday life.",
          ],
        },
        {
          title: "Sensory Diet",
          items: [
            "As part of our comprehensive sensory approach, we provide individualized Sensory Diets tailored to each person’s unique sensory needs and daily routines.",
            "A Sensory Diet is a carefully planned set of sensory activities and strategies designed to provide the right balance of sensory input throughout the day.",
            "Our therapists collaborate closely with families, caregivers, educators, and individuals to develop practical and sustainable sensory strategies that may include: Proprioceptive and heavy-work activities, Vestibular and movement-based input, Tactile exploration and calming sensory experiences, Deep pressure and body-awareness activities, Visual and auditory regulation strategies, Movement breaks and environmental adaptations, Self-regulation tools for home, school, workplace, or community settings",
          ],
        },
        {
          title: "Sensory Integration Therapy for Adults",
          items: [
            "Sensory processing challenges are not limited to childhood. Many adolescents and adults experience sensory sensitivities, sensory overload, emotional dysregulation, burnout, anxiety, attention difficulties, or challenges managing environmental stimulation in work, social, or daily-life settings.",
            "Our Sensory Integration Therapy for Adults focuses on helping individuals better understand their sensory profiles, regulate sensory responses, reduce overwhelm, and improve daily functioning.",
            "Through individualized sensory strategies, movement-based regulation techniques, body-awareness work, environmental adaptations, and nervous-system regulation approaches, adults are supported in improving focus, emotional balance, stress management, productivity, comfort, and overall quality of life.",
          ],
        },
        {
          title: "Areas We Focus On",
          items: [
            "Sensory Processing & Regulation: Helping individuals process sensory input related to touch, movement, sound, visual stimuli, textures, and body awareness more effectively.",
            "Attention & Participation: Improving focus, engagement, task participation, classroom or workplace functioning, and adaptive responses.",
            "Motor Coordination & Body Awareness: Supporting balance, posture, bilateral coordination, motor planning, movement control, and physical confidence.",
            "Emotional & Behavioral Regulation: Enhancing coping strategies, frustration tolerance, self-regulation, and nervous-system regulation.",
            "Adaptive Functioning & Independence: Supporting daily routines, transitions, self-care tasks, and meaningful participation across environments.",
            "Sensory-Friendly Environmental Support: Providing sensory strategies, modifications, and accommodations for home, school, work, and community settings.",
          ],
        },
        {
          title: "Goal",
          items: [
            "To help individuals process sensory information more effectively, regulate responses confidently, improve participation and independence, and experience greater comfort, confidence, and success in everyday life.",
          ],
        },
      ],
    },
  },
  {
    id: "15",
    title: "Brain Gym",
    slug: "brain-gym",
    description: "It is a fun, active, and evidence-based way to unlock a **child**'s full potential, bridging the gap between physical movement and cognitive function.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "Brain Gym is a dynamic, movement-based program designed to supercharge a **child**'s learning, focus, and cognitive development. By using specific, purposeful physical activities, Brain Gym stimulates neural pathways, helping the brain and body work together in perfect harmony. It is a fun, active, and evidence-based way to unlock a **child**'s full potential, bridging the gap between physical movement and cognitive function.",
      benefits: [
        "Enhanced Focus & Concentration: Better attention spans for academic tasks and daily routines.",
        "Improved Motor Skills: Greater physical coordination, balance, and spatial awareness.",
        "Emotional Regulation: Practical tools to manage stress, anxiety, and sensory overload.",
        "Boosted Academic Performance: Targeted support for reading, writing, and memory retention.",
        "Increased Confidence: A stronger sense of self-awareness, independence, and capability."
      ],
      whatToExpect: [
        "Expect a vibrant, active environment! Our Brain Gym sessions feel more like play than work.",
        "Your child will be gently guided through a series of specialized, cross-lateral movements and engaging exercises tailored to their specific developmental needs.",
        "Sessions are structured yet flexible, ensuring a positive experience that keeps kids motivated, moving, and having fun while they learn."
      ],
      whoIsItFor: [
        "Struggles with focus, attention, or sitting still in a classroom setting.",
        "Experiences challenges with handwriting, reading comprehension, or physical coordination.",
        "Needs gentle, effective support with sensory processing or emotional regulation.",
        "Would benefit from a highly engaging, movement-based approach to building cognitive skills."
      ],
      duration: "30-45 minute sessions",
      format: "In-person, individual or small group",
      additionalSections: [
        {
          title: "Why Choose Divit Mindspace",
          intro: "At Divit Mindspace, we believe in holistic, neuro-inclusive care that celebrates every child's unique developmental journey.",
          items: [
            "We don't just guide children through physical exercises; we integrate these movements with our deep understanding of child psychology, expressive arts, and early childhood development.",
            "Our compassionate team creates a safe, affirming space where your child can thrive, blending evidence-based techniques with a playful atmosphere to foster real, lasting growth."
          ],
          color: "sage"
        }
      ]
    },
  },
  // ============================================================================
  // GUIDANCE
  // ============================================================================
  {
    id: "7",
    title: "Counselling Services",
    slug: "counselling",
    description: "Navigate life’s challenges with greater clarity, resilience, and emotional well-being through personalized, integrated therapy.",
    category: "guidance",
    image: "/features-service-card/adult-counseling.png",
    content: {
      overview: "At Divit MindSpace, our counselling services support individuals across all age groups in navigating life’s challenges with greater clarity, resilience, and emotional well-being. We offer personalized, evidence-based therapy in a safe, compassionate, and neuro-affirming environment.\n\nWhether you are seeking support for developmental concerns, life transitions, emotional difficulties, or personal growth, our integrated approach addresses the whole person — mind, body, and spirit.",
      benefits: [
        "Improved emotional regulation and stress management",
        "Greater self-awareness and resilience",
        "Healthier coping strategies for anxiety, depression, and overwhelm",
        "Stronger relationships and interpersonal skills",
        "Enhanced self-confidence and sense of inner security",
        "Tools for navigating life transitions and neurodivergent challenges",
        "A deeper connection to yourself and a more balanced life"
      ],
      whatToExpect: [
        "A warm, confidential, and non-judgmental space",
        "Comprehensive initial assessment of your needs and goals",
        "Personalized therapy plan using evidence-based approaches",
        "Regular progress reviews and collaborative adjustments",
        "Practical tools and strategies for real-life application",
        "Optional integration of somatic awareness and expressive arts therapy"
      ],
      audienceSections: [
        {
          audienceType: "children",
          title: "Children & Adolescents",
          hero: {
            shortDescription: "Focused on developmental milestones, school-related stress, emotional regulation, and neurodevelopmental support to help **children** and **teens** thrive at home and school.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "counselling-children-right-support",
              title: "Is This the Right Support for You?",
              intro: "We provide specialized support for the following concerns in **children** and **teens**:",
              items: [
                "Neurodivergence Support: Neuro-affirming care that honors unique brain wiring, strengthens executive functioning, and helps build an authentic life.",
                "Anxiety & Stress Management: Breaking the cycle of chronic worry, school-related stress, or high-functioning burnout.",
                "Depression: Gentle, compassionate support to process feelings of heaviness and isolation while rebuilding connection.",
                "Trauma: Trauma-informed, safety-focused therapy that incorporates somatic awareness to process past experiences.",
                "Expressive Arts Therapy: Creative healing through art and movement — ideal when words alone are not enough."
              ]
            }
          ]
        },
        {
          audienceType: "adults",
          title: "Adults",
          hero: {
            shortDescription: "Support for life transitions, career burnout, relationship dynamics, stress management, and personal growth.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "counselling-adults-right-support",
              title: "Is This the Right Support for You?",
              intro: "We provide specialized support for **adults** facing:",
              items: [
                "Neurodivergence Support (ADHD, Autism): Neuro-affirming care that honors unique wiring and strengthens executive functioning.",
                "Anxiety & Stress Management: Breaking the cycle of chronic worry or high-functioning burnout using CBT and mindfulness.",
                "Depression: Compassionate support to process feelings of heaviness while rebuilding purpose.",
                "Trauma: Trauma-informed therapy incorporating somatic awareness to restore inner security.",
                "Expressive Arts Therapy: Creative healing through art and movement for emotional exploration and release."
              ]
            }
          ]
        },
        {
          audienceType: "geriatrics",
          title: "Geriatrics / Late-Life Support",
          hero: {
            shortDescription: "Compassionate care addressing aging, grief, loss, cognitive changes, and emotional well-being in the golden years.",
          },
          contentBlocks: [
            {
              _type: "fullWidthListBlock",
              _key: "counselling-geriatrics-right-support",
              title: "Is This the Right Support for You?",
              intro: "Our Late-Life Support addresses concerns such as:",
              items: [
                "Aging & Life Transitions: Navigating the emotional complexities of aging.",
                "Grief & Loss: Compassionate support for processing the loss of loved ones or life changes.",
                "Cognitive Changes: Support for managing the emotional impact of cognitive shifts.",
                "Emotional Well-being: Rebuilding connection and purpose in the golden years.",
                "Trauma-Informed Care: Safety-focused therapy to restore inner security."
              ]
            }
          ]
        }
      ],
      approachItems: [
        "Evidence-Based Foundations: Rooted in scientifically validated frameworks including CBT, DBT, and ACT.",
        "Integrated Approach: We combine traditional talk therapy with somatic awareness and expressive arts therapy.",
        "Holistic Healing: Addressing the mind, body, and spirit for lasting transformation.",
        "Neuro-Affirming: We honor your unique brain wiring and support you in building an authentic life."
      ],
      whyChooseItems: [
        "Compassionate, neuro-affirming, and holistic approach",
        "Experienced therapists offering both evidence-based and creative modalities",
        "Personalized care tailored to your unique life stage and needs",
        "A safe space where you feel truly heard, understood, and supported",
        "Integration of mind, body, and creative expression for deeper healing"
      ],
      additionalSections: [
        {
          title: "Group Therapy: The Power of Shared Experience",
          intro: "In addition to individual sessions, we offer group programs to foster connection and growth:",
          items: [
            "Support Groups",
            "Targeted groups for specific concerns such as postpartum challenges or neurodivergent **adults**.",
            "Process Groups",
            "Focused on interpersonal growth, relational patterns, and emotional processing.",
            "Skill-Building Groups",
            "Practical groups teaching DBT skills or social-emotional learning."
          ],
          color: "sage"
        }
      ],
      duration: "45-60 minute sessions, typically weekly",
      format: "In-person or online",
    },
  },
  {
    id: "8",
    title: "Training Program (Shadow Teacher Training)",
    slug: "training-program-shadow-teacher-training-program",
    description: "Every **child** deserves the opportunity to thrive in a mainstream learning environment.",
    category: "programs",
    image: "/features-service-card/parent-education.png",
    content: {
      overview: "Every **child** deserves the opportunity to thrive in a mainstream learning environment. Our Shadow Teacher Training Program equips passionate individuals with the specialized skills required to provide dedicated, one-on-one support to students with unique learning and developmental needs. We focus on bridging the gap between a **child**'s potential and their classroom experience, ensuring they feel secure, understood, and empowered to succeed.",
      benefits: [
        "Neuro-Affirming Expertise: A deep, practical understanding of neurodiversity and how to champion child-centric, inclusive support.",
        "Behavioral Strategies: Evidence-based techniques for facilitating emotional regulation, focus, and positive behavior modification.",
        "Collaborative Skills: The communication tools needed to work seamlessly alongside classroom teachers, parents, and clinical teams.",
        "Classroom Confidence: The practical know-how to successfully adapt curriculum and implement Individualized Education Programs (IEPs) in real time.",
      ],
      whatToExpect: [
        "Interactive Learning: Engaging, crisp modules that blend foundational developmental psychology with real-world classroom scenarios.",
        "Expert Mentorship: Direct guidance and insights from seasoned clinical professionals dedicated to early childhood development.",
        "A Practical Toolkit: Actionable frameworks, observation techniques, and expressive tools that you can apply on day one.",
      ],
      whoIsItFor: [
        "Aspiring shadow teachers",
        "Special educators seeking additional training",
        "Parents wanting to support their child better",
        "School staff working with diverse learners",
        "Caregivers of neurodivergent children",
      ],
      duration: "Multi-day intensive program",
      format: "In-person workshop at our center",
      additionalSections: [
        {
          title: "Why Choose Divit MindSpace",
          intro: "At Divit MindSpace, we go beyond basic protocols.",
          items: [
            "We advocate for compassionate, holistic care that genuinely honors the whole child.",
            "You will be learning directly from active clinical practitioners who integrate standardized developmental frameworks with creative, empathetic support.",
            "Upon successful completion of the program, you will receive a Professional Certificate from Divit MindSpace — validating your specialized expertise and setting you apart as a highly qualified professional ready to make a lasting impact in the field of inclusive education.",
          ],
          color: "sage",
        },
      ],
    },
  },

  // ============================================================================
  // PROGRAMS
  // ============================================================================
  {
    id: "9",
    title: "Early Intervention Program",
    slug: "early-intervention-program",
    description: "Our Early Intervention Program supports young children in building strong developmental foundations by enhancing communication, cognition, motor abilities, social-emotional growth, adaptive functioning, and overall participation through individualized, evidence-based, and family-centered intervention.",
    category: "programs",
    image: "/about_pic1.png",
    content: {
      overview: "At Divit MindSpace, our Early Intervention Program is dedicated to empowering children aged 0–8 years with developmental delays or neurodevelopmental differences (such as Autism, ADHD, or speech delays). We focus on building foundational skills during the critical early years of growth.\n\nBeginning with a comprehensive assessment, we set collaborative goals across physical, cognitive, communication, social-emotional, and adaptive domains. Through play-based therapy and caregiver coaching, we create nurturing, neuro-affirming experiences that help children reach their fullest potential.",
      benefits: [
        "Improved communication, interaction, and social engagement",
        "Enhanced motor, sensory, cognitive, and adaptive skills",
        "Better emotional regulation, participation, and independence",
        "Increased readiness for school and structured learning environments",
        "Strengthened play, attention, and problem-solving abilities",
        "Personalized developmental goals and intervention strategies",
        "Parent guidance and practical home-based support techniques",
        "Greater confidence, understanding, and support for the entire family",
      ],
      whatToExpect: [
        "Comprehensive developmental assessment and family consultation",
        "Identification of strengths, developmental needs, and priority goals",
        "Individualized intervention planning tailored to the child and family",
        "Play-based, structured, and engaging therapy sessions",
        "Multidisciplinary support across developmental domains",
        "Parent training, guidance, and collaborative goal-setting",
        "Regular progress monitoring and adaptation of intervention plans",
        "Ongoing emotional, educational, and developmental support for families",
      ],
      whoIsItFor: [
        "Delayed speech, communication, or social interaction",
        "Difficulty with attention, play, learning, or emotional regulation",
        "Sensory sensitivities or sensory-seeking behaviors",
        "Delayed milestones related to movement, coordination, or adaptive skills",
        "Concerns regarding Autism, ADHD, developmental delays, or learning differences",
        "Difficulty participating in routines, preschool, or peer interaction",
        "Challenges with behavior, transitions, or self-regulation",
        "Parental concerns regarding developmental progress or readiness skills",
      ],
      duration: "Ongoing program with weekly sessions",
      format: "In-person at our center",
      approachItems: [
        "Neuro-affirming, strengths-based, and child-centered intervention",
        "Play-based, engaging, and evidence-based therapeutic strategies",
        "Collaborative partnership with families and caregivers",
        "Individualized support tailored to each child’s developmental profile",
        "Focus on emotional safety, participation, and meaningful progress",
        "Holistic support addressing both child and family well-being",
      ],
      whyChooseItems: [
        "At Divit MindSpace, we believe every child deserves the opportunity to grow, connect, communicate, and participate meaningfully in the world around them.",
        "Our Early Intervention Program combines compassionate care, evidence-based practices, individualized planning, and family-centered support to help children build strong developmental foundations during their most important years of growth.",
        "Through collaborative guidance, nurturing therapeutic environments, and personalized intervention, we help children and families feel supported, empowered, and confident throughout their developmental journey.",
      ],
      additionalSections: [
        {
          title: "Objective",
          items: [
            "To strengthen developmental foundations during early childhood",
            "To support communication, cognitive, social, emotional, sensory, and motor development",
            "To improve participation in daily routines, play, learning, and social interaction",
            "To help children build independence and adaptive functioning skills",
            "To empower families with knowledge, strategies, and emotional support",
            "To reduce developmental barriers and support long-term growth and participation",
            "To promote confidence, engagement, and meaningful developmental progress",
          ],
        },
        {
          title: "Our Process",
          items: [
            "The Early Intervention Program begins with understanding the child’s developmental history, strengths, sensory profile, communication abilities, emotional functioning, adaptive skills, and family concerns. Individualized intervention plans are then developed collaboratively with families.",
            "Intervention may include: Developmental and functional assessments, Speech and language support, Occupational therapy and sensory integration support, Cognitive and play-based intervention, Behavioral and emotional regulation support, Social communication and interaction activities, Adaptive functioning and daily living skill development, Parent coaching and home-program guidance, School-readiness and participation support",
          ],
        },
        {
          title: "Areas We Focus On",
          items: [
            "Physical Development: Supporting gross motor, fine motor, balance, coordination, posture, movement, and body-awareness skills.",
            "Cognitive Development: Enhancing attention, memory, problem-solving, early learning, reasoning, and play skills.",
            "Communication & Language Development: Improving receptive language, expressive communication, interaction, speech, and social communication abilities.",
            "Social & Emotional Development: Building emotional regulation, social engagement, confidence, connection, play participation, and adaptive coping skills.",
            "Adaptive & Functional Development: Supporting independence in daily routines, self-care, transitions, participation, and functional living skills.",
            "Sensory & Behavioral Regulation: Helping children process sensory information effectively while improving self-regulation, attention, and participation.",
            "Parent & Family Support: continuous guidance, practical strategies, emotional support, and developmental education to help parents confidently support their child at home and within daily routines.",
          ],
        },
        {
          title: "Goal",
          items: [
            "To maximize each child’s developmental potential through individualized early support while empowering families with the knowledge, confidence, and tools needed to nurture growth, participation, independence, and emotional well-being.",
          ],
        },
      ],
    },
  },
  {
    id: "10",
    title: "Special Education & Remedial Sessions",
    slug: "special-education--remedial-sessions",
    description: "Our Special Education & Remedial Sessions help children and adolescents strengthen academic, cognitive, communication, and learning-related skills through individualized, structured, and supportive intervention tailored to their unique learning needs.",
    category: "programs",
    image: "/about_pic2.png",
    content: {
      overview: "At Divit MindSpace, our Special Education & Remedial Sessions support children facing challenges in learning, attention, academics, comprehension, or classroom participation. Using individualized, neuro-affirming, and evidence-based approaches, we help strengthen academic, cognitive, social, and functional skills while building confidence, independence, and positive learning experiences.\n\nThrough personalized learning plans, multisensory teaching methods, evidence-based intervention strategies, and small-group or one-on-one support, we aim to strengthen confidence, independence, participation, and meaningful progress across educational and everyday settings.",
      benefits: [
        "Improved reading, writing, spelling, and mathematics skills",
        "Better attention, focus, and classroom participation",
        "Enhanced comprehension, memory, and problem-solving abilities",
        "Increased confidence and motivation toward learning",
        "Development of individualized learning strategies and study skills",
        "Improved communication and expressive abilities related to academics",
        "Better emotional regulation and reduced academic frustration",
        "Greater independence in school-related tasks and routines",
        "Improved social interaction and participation within learning environments",
      ],
      whatToExpect: [
        "Initial assessment of academic, cognitive, behavioral, and learning-related needs",
        "Individualized goal-setting based on the child’s strengths and challenges",
        "Structured one-on-one or small-group intervention sessions",
        "Multisensory and engaging teaching approaches tailored to learning style",
        "Activities targeting literacy, numeracy, comprehension, attention, reasoning, and executive functioning skills",
        "Ongoing monitoring of progress and adaptation of learning goals",
        "Parent guidance and home-based learning strategies",
        "Collaboration with schools, educators, and caregivers where needed",
      ],
      whoIsItFor: [
        "Difficulty with reading, writing, spelling, or mathematics",
        "Poor academic performance despite effort and support",
        "Difficulty understanding classroom instructions or concepts",
        "Attention, focus, memory, or organizational challenges affecting learning",
        "Learning differences such as dyslexia, dyscalculia, dysgraphia, ADHD, or Autism",
        "Low confidence, frustration, or emotional distress related to academics",
        "Need for individualized learning support or classroom accommodations",
        "Recommendations from teachers, therapists, or caregivers for additional academic intervention",
        "Difficulty adapting to school expectations, peer interaction, or structured learning environments",
      ],
      duration: "45-60 minute sessions, 2-3 times weekly",
      format: "In-person at our center",
      approachItems: [
        "Neuro-affirming, strengths-based, and child-centered intervention",
        "Inclusive and supportive learning environment",
        "Individualized learning strategies tailored to each child’s pace and profile",
        "Multisensory, engaging, and evidence-based teaching methods",
        "Focus on emotional safety, encouragement, confidence-building, and participation",
        "Collaborative involvement of families, caregivers, educators, and therapists",
        "Balance of academic support, cognitive development, social-emotional growth, and functional learning",
      ],
      whyChooseItems: [
        "At Divit MindSpace, we believe every child is capable of learning and thriving when provided with the right support, understanding, and opportunities.",
        "Our Special Education & Remedial Sessions go beyond academics by focusing on the child’s overall confidence, emotional well-being, participation, and learning experience. Through compassionate guidance, individualized intervention, adaptive teaching strategies, and collaborative support, we help children overcome challenges and develop the skills needed to participate meaningfully and succeed in school and everyday life.",
        "By fostering a culture of acceptance, inclusion, empowerment, and encouragement, we strive to create positive learning environments where every child feels understood, supported, and capable of reaching their fullest potential.",
      ],
      additionalSections: [
        {
          title: "Objective",
          items: [
            "To strengthen foundational academic and learning skills",
            "To improve attention, comprehension, memory, and problem-solving abilities",
            "To support children with learning differences and developmental challenges",
            "To build confidence, participation, and independence in learning environments",
            "To provide individualized learning strategies tailored to the child’s needs",
            "To improve classroom readiness and academic functioning",
            "To support emotional well-being, positive learning experiences, and social participation",
          ],
        },
        {
          title: "Our Process",
          items: [
            "The Special Education & Remedial Program begins with understanding the child’s academic profile, developmental needs, strengths, challenges, emotional functioning, and learning style. Intervention plans are individualized and regularly adapted based on progress and support requirements.",
            "Sessions may include: Academic skill-building activities, Remedial instruction for reading, writing, and mathematics, Attention and executive functioning support, Cognitive and memory-enhancement activities, Language and comprehension support, Structured teaching and multisensory learning approaches, Assistive strategies and adaptive learning resources, Behavioral and emotional support during learning, Small-group learning opportunities and peer interaction, School coordination and parent guidance where required",
          ],
        },
        {
          title: "Areas We Focus On",
          items: [
            "Reading & Literacy Skills: Supporting phonics, reading fluency, comprehension, spelling, vocabulary, and written expression.",
            "Writing & Fine Motor Skills: Improving handwriting, sentence formation, written organization, and academic expression.",
            "Mathematics & Problem-Solving Skills: Building foundational numeracy, calculation, reasoning, sequencing, and conceptual understanding.",
            "Attention & Executive Functioning: Enhancing focus, organization, planning, working memory, task completion, and classroom participation.",
            "Cognitive & Learning Skills: Supporting memory, processing speed, comprehension, reasoning, and adaptive learning strategies.",
            "Communication & Academic Language: Strengthening receptive and expressive language skills required for learning and classroom interaction.",
            "Social, Emotional & Behavioral Support: Helping children manage frustration, build confidence, regulate emotions, improve peer interaction, and develop a positive relationship with learning.",
            "Inclusive & Adaptive Learning Support: Using differentiated instruction, evidence-based teaching strategies, adaptive resources, and individualized accommodations to support diverse learning needs.",
          ],
        },
        {
          title: "Goal",
          items: [
            "To help children become confident, capable, and engaged learners by strengthening academic foundations, supporting individualized learning needs, and promoting positive educational, emotional, and social experiences.",
          ],
        },
      ],
    },
  },
  {
    id: "11",
    title: "School Readiness Program",
    slug: "school-readiness-program",
    description: "Our School Readiness Program helps children build the foundational skills needed to transition into school with greater confidence, independence, emotional regulation, and participation. The program focuses on preparing children not just academically, but socially, emotionally, behaviorally, and developmentally for a successful school experience.",
    category: "programs",
    image: "/about_pic3.png",
    content: {
      overview: "Starting school is a significant milestone in a child’s life. Some children may need additional support to develop the skills required to adapt to classroom routines, group learning, communication demands, and social expectations. At Divit MindSpace, our School Readiness Program is designed to nurture the whole child through a structured, play-based, and neuro-affirming approach while considering each child’s individual strengths and special needs.\n\nThe aim of the program is to help children become school-ready by supporting their social, emotional, behavioral, communication, and academic development in a safe and supportive environment. We recognize that every child develops differently, and our approach focuses on building confidence, reducing anxiety, improving participation, and creating positive learning experiences.\n\nOur multidisciplinary team works collaboratively with parents and educators to ensure children are equipped with the practical, emotional, and developmental tools needed to thrive in school environments.",
      benefits: [
        "Improved ability to follow classroom routines and instructions",
        "Enhanced communication and social interaction skills",
        "Better attention span, listening, and participation abilities",
        "Development of emotional regulation and coping skills",
        "Increased independence in daily and classroom-related tasks",
        "Strengthened fine motor, play, and pre-academic skills",
        "Confidence in group settings and transitions",
        "Improved readiness for structured learning environments",
        "Greater comfort interacting with peers, teachers, and unfamiliar settings",
      ],
      whatToExpect: [
        "Initial developmental screening and readiness assessment",
        "Individualized goal-setting based on the child’s developmental profile",
        "Structured sessions focusing on communication, social, emotional, motor, behavioral, and pre-academic skills",
        "Play-based learning activities and guided peer interaction",
        "Activities targeting attention, sitting tolerance, transitions, and classroom participation",
        "Parent guidance and home-based support strategies",
        "Regular monitoring of progress and adjustment of goals as needed",
        "Collaborative feedback and support for school transition planning",
      ],
      whoIsItFor: [
        "Children preparing to start formal school",
        "Children with developmental delays entering school",
        "Children who missed preschool experiences",
        "Children anxious about starting school",
        "Children age from 2-6 years",
      ],
      duration: "4-month structured program with an additional 2+2 months extension if required, depending on the child’s progress and support needs.",
      format: "In-person small group at our center",
      approachItems: [
        "Neuro-affirming, child-centered, and strengths-based approach",
        "Play-based and engaging learning experiences",
        "Individualized support tailored to each child’s developmental profile",
        "Focus on emotional safety, confidence-building, and positive participation",
        "Collaborative involvement of parents, caregivers, therapists, and educators",
        "Balance of structured teaching and naturalistic learning opportunities",
      ],
      whyChooseItems: [
        "At Divit MindSpace, we understand that school readiness is about far more than academics.",
        "We focus on helping children feel secure, confident, capable, and emotionally prepared for the demands of school life. Our multidisciplinary team combines developmental expertise with compassion to create supportive, engaging, and individualized learning experiences for every child.",
        "Through structured therapies, guided social interaction, and family collaboration, we aim to make the transition to school smoother, more positive, and empowering for both children and families.",
      ],
      additionalSections: [
        {
          title: "Objective",
          items: [
            "To help the child develop pre-requisite educational and readiness skills",
            "To work on the child’s individual strengths, challenges, and unique support needs",
            "To help the child become familiar and comfortable with school environments and routines",
            "To encourage positive interaction and comfort around peers and group settings",
            "To build emotional regulation, independence, and participation skills necessary for classroom learning",
          ],
        },
        {
          title: "Our Process",
          items: [
            "Duration: 4-month structured program with an additional 2+2 months extension if required, depending on the child’s progress and support needs.",
            "Session Planning: 5 days a week",
            "Session details: 4 sessions per day over 3 hours",
            "Session format: 3 individual sessions and 1 group session daily",
            "The program may include: Occupational Therapy, Speech Therapy, Cognitive Therapy, Special Education support, Social and group interaction activities",
          ],
        },
        {
          title: "Areas We Focus On",
          items: [
            "Creating a Supportive & Inclusive Environment: Building emotional safety, confidence, participation, and comfort within structured settings.",
            "Developing Social Skills: Turn-taking, sharing, cooperative play, peer interaction, communication, and group participation.",
            "Building Foundational Academic Skills: Early literacy, pre-writing, pre-math concepts, problem-solving, listening, and classroom learning readiness.",
            "Addressing Behavior & Emotional Regulation: Improving attention, transitions, emotional regulation, coping skills, frustration tolerance, and adaptive responses.",
            "Communication & Language Development: Understanding instructions, expressing needs, conversation skills, and classroom communication abilities.",
            "Motor & Adaptive Skills: Fine motor development, pencil grasp, self-help skills, sensory regulation, dressing, eating independence, and classroom-related routines.",
            "Parent & Caregiver Involvement: Supporting families through guidance, resources, strategies, and collaborative goal-setting to ensure consistency across home and school environments.",
            "Monitoring Progress & Program Adaptation: Regular review of developmental progress and ongoing modification of intervention plans based on the child’s evolving needs.",
          ],
        },
        {
          title: "Goal",
          items: [
            "To help children transition into school environments with confidence, independence, emotional readiness, and the foundational skills required for meaningful participation, learning, and social engagement.",
          ],
        },
      ],
    },
  },
  {
    id: "16",
    title: "Parental Training Program",
    slug: "parental-training-program",
    description: "Parenting doesn't come with a manual, but it can come with expert guidance.",
    category: "programs",
    image: "/features-service-card/parent-education.png",
    content: {
      overview: "Parenting doesn't come with a manual, but it can come with expert guidance. The Divit MindSpace Parental Training Program is designed to help you navigate the beautiful yet complex journey of raising resilient, happy **children**. Whether you are dealing with toddler tantrums, teenage rebellion, or simply want to foster a deeper connection with your **child**, this program bridges the gap between intention and action. We equip you with evidence-based strategies to transform everyday struggles into opportunities for growth, helping you build a nurturing, peaceful, and supportive home environment.",
      benefits: [
        "Effective Communication: Learn how to listen actively and speak in a way that encourages your child to open up.",
        "Positive Discipline Strategies: Shift from reactive parenting to proactive guidance, replacing yelling and power struggles with understanding and boundaries.",
        "Emotional Regulation: Master techniques to manage your own parenting stress and respond to your child's emotional triggers calmly.",
        "Developmental Insights: Gain a deeper understanding of child psychology and age-appropriate milestones.",
        "A Stronger Bond: Cultivate mutual respect, trust, and a lifelong, harmonious connection with your child.",
      ],
      whatToExpect: [
        "Interactive Sessions: Engaging, expert-led workshops that move beyond textbook theory into real-world application.",
        "Practical Problem-Solving: Role-playing exercises and scenario-based learning tailored to everyday parenting challenges.",
        "Actionable Takeaways: Step-by-step frameworks and toolkits you can immediately apply in your home.",
        "A Safe Haven: A non-judgmental, supportive community where you can share experiences and grow alongside fellow parents.",
      ],
      whoIsItFor: [
        "Parents of children with autism, ADHD, or learning differences",
        "Caregivers seeking structured parenting strategies",
        "Families navigating a new diagnosis",
        "Parents feeling overwhelmed or isolated",
        "Those wanting to strengthen family dynamics",
      ],
      duration: "6-8 week program with weekly sessions",
      format: "In-person group sessions or individual coaching",
      additionalSections: [
        {
          title: "Why Choose Divit MindSpace",
          intro: "At Divit MindSpace, we believe that when parents grow, children thrive.",
          items: [
            "Our approach is deeply rooted in empathy, backed by child development experts, and specifically tailored to the nuances of modern parenting.",
            "We don't just offer generic advice; we provide personalized, transformative tools that create lasting change in your family dynamic.",
          ],
          color: "sage",
        },
      ],
    },
  },
  {
    id: "17",
    title: "ECCE (Early Childhood Care and Education)",
    slug: "ecce-early-childhood-care-and-education",
    description: "Foundational early learning program for **children** aged 3-6, with specialized support for neurodivergent learners — building school readiness through play-based, developmentally appropriate education.",
    category: "programs",
    image: "/about_pic1.png",
    content: {
      overview: "The early years are the foundation for lifelong learning. Our ECCE program provides developmentally appropriate, play-based education for **children** aged 3-6, with specialized support for neurodivergent learners. Aligned with the National Education Policy 2020 framework, we focus on foundational literacy, numeracy, social-emotional development, and school readiness — all in a sensory-friendly, inclusive environment that honors each **child**'s unique pace and learning style.",
      benefits: [
        "Strong foundation in early literacy and numeracy",
        "Social-emotional skill development",
        "Sensory-friendly learning environment",
        "Individualized learning plans for each child",
        "Smooth transition to formal schooling",
      ],
      whatToExpect: [
        "Play-based, activity-driven learning approach",
        "Small class sizes with trained educators",
        "Focus on holistic development across all domains",
        "Regular parent communication and involvement",
        "Accommodations for diverse learning needs",
      ],
      whoIsItFor: [
        "Children aged 3-6 years preparing for school",
        "Neurodivergent children needing specialized early education",
        "Children with developmental delays or early intervention needs",
        "Families seeking inclusive preschool options",
        "Children who learn best with individualized attention",
      ],
      duration: "Full academic year program",
      format: "In-person at our center (half-day or full-day options)",
    },
  },
  {
    id: "18",
    title: "Certificate in Special Education",
    slug: "certificate-in-special-education",
    description: "Our Certificate in Special Education equips individuals with the knowledge, practical skills, therapeutic understanding, and hands-on experience required to effectively support children with diverse learning, developmental, behavioral, and educational needs across inclusive and specialized settings.",
    category: "programs",
    image: "/features-service-card/parent-education.png",
    demographics: ["Students", "Parents", "Educators", "Professionals"],
    content: {
      overview: "At Divit MindSpace, we believe that creating inclusive, supportive, and empowering environments for children begins with well-trained, compassionate, and skilled professionals. Our Certificate in Special Education is a specialized vocational training program designed to prepare participants for meaningful careers supporting children with special educational and developmental needs.\n\nThis program combines theoretical learning, practical exposure, guided mentorship, and internship-based experience to help participants develop the confidence and competence required to support neurodivergent and diverse learners effectively.",
      benefits: [
        "Comprehensive understanding of child development and special educational needs",
        "Knowledge of neurodevelopmental conditions and learning differences",
        "Practical strategies for classroom support and individualized intervention",
        "Skills in behavior management, communication support, and inclusive teaching practices",
        "Hands-on training through practical sessions and internships",
        "Exposure to real-life therapeutic and educational environments",
        "Professional confidence and career readiness",
        "Certification from Divit MindSpace upon successful completion",
      ],
      whatToExpect: [
        "Structured theoretical learning sessions",
        "Practical demonstrations and interactive workshops",
        "Real-life case discussions and intervention planning",
        "Guided observation and supervised practical exposure",
        "Internship opportunities for hands-on learning",
        "Personalized mentorship and professional guidance",
        "Skill-building in educational and therapeutic support strategies",
        "Certification upon successful course completion",
      ],
      whoIsItFor: [
        "Psychology students, undergraduates, and graduates interested in child development and therapy",
        "Physiotherapy students looking to expand their knowledge in pediatric rehabilitation and developmental support",
        "Parents of children with special needs seeking deeper understanding and practical strategies",
        "Educators, shadow teachers, caregivers, and school staff working with children with diverse learning needs",
        "Individuals aspiring to build careers in special education and child development",
        "Professionals looking to enhance their skills in therapeutic and educational interventions",
      ],
      duration: "6 Months (3 Months Theory + 3 Months Internship)",
      format: "Online / Offline / Hybrid",
      approachItems: [
        "Comprehensive curriculum covering theory and practical application",
        "Hands-on learning and supervised practical exposure",
        "Internship opportunities with real-world experience",
        "Guidance from experienced clinicians and professionals",
        "Small batch sizes ensuring personalized learning and mentorship",
        "Flexible learning modes — Online, Offline, and Hybrid options available",
        "Professional networking and career-building opportunities",
      ],
      whyChooseItems: [
        "At Divit MindSpace, we go beyond textbook learning to provide immersive, practical, and meaningful training experiences rooted in empathy, inclusion, and real-world application.",
        "Our training programs are led by active clinicians and professionals who combine therapeutic expertise with compassionate, neuro-affirming approaches to child development and education. Through personalized mentorship, practical exposure, and evidence-based learning, we prepare participants to confidently support children and families across educational and therapeutic settings.",
        "We are committed to nurturing professionals who not only develop strong technical skills, but also cultivate empathy, understanding, and the ability to create inclusive spaces where every child can thrive.",
      ],
      additionalSections: [
        {
          title: "Course Structure",
          intro: "The course combines classroom learning, case discussions, practical demonstrations, observation opportunities, and supervised internships to ensure participants gain both conceptual clarity and applied experience.",
          items: [
            "Mode: Online / Offline / Hybrid",
            "Total Duration: 6 Months",
            "Theory & Practical Training (Internship): 3 + 3 Months",
            "Batch Size: Limited to 10 participants per batch",
            "Certification: Certificate from Divit MindSpace",
            "Course Fee: Rs. 25,000",
          ],
        },
        {
          title: "Objective",
          items: [
            "To provide foundational and advanced understanding of special education needs",
            "To train participants in supporting children with developmental and learning differences",
            "To build practical skills in classroom support, behavior management, and individualized intervention",
            "To promote inclusive, neuro-affirming, and child-centered educational practices",
            "To prepare participants for professional opportunities in therapeutic and educational settings",
            "To provide hands-on exposure through supervised practical learning and internships",
          ],
        },
        {
          title: "Areas We Focus On",
          items: [
            "Child Development & Learning: Understanding developmental milestones, cognitive development, emotional growth, communication, and adaptive functioning.",
            "Special Educational Needs: Learning about Autism, ADHD, Learning Disabilities, developmental delays, sensory processing differences, and other neurodevelopmental conditions.",
            "Inclusive Education & Classroom Support: Supporting participation, individualized learning, accommodations, classroom engagement, and inclusive teaching practices.",
            "Behavior Management & Emotional Support: Understanding child behavior, emotional regulation, positive behavior support, and co-regulation strategies.",
            "Therapeutic & Intervention Strategies: Introduction to evidence-based intervention approaches used across developmental and educational settings.",
            "Practical Exposure & Internship: Hands-on experience through observation, guided participation, case-based learning, and supervised internships.",
          ],
        },
        {
          title: "Scope & Career Opportunities",
          intro: "Upon successful completion of the course, participants can explore opportunities in:",
          items: [
            "Hospitals",
            "Occupational Therapy & Rehabilitation Centres",
            "Child Development Centres",
            "Therapeutic Centres",
            "Schools & Inclusive Education Settings",
            "Special Education Programs",
            "Clinics and Pediatric Support Centres",
            "Academic and Educational Support Services",
            "The course also helps participants strengthen their foundation for advanced studies and future specialization in child development, therapy, and inclusive education.",
          ],
        },
        {
          title: "Goal",
          items: [
            "To develop skilled, compassionate, and confident professionals who can effectively support children with special educational and developmental needs through inclusive, evidence-based, and child-centered practices.",
          ],
        },
      ],
    },
  },
  {
    id: "19",
    title: "Diploma in Special Education",
    slug: "diploma-in-special-education",
    description: "Our Diploma in Special Education equips individuals with advanced knowledge, practical skills, therapeutic understanding, and extensive hands-on experience required to effectively support children with diverse learning, developmental, behavioral, and educational needs across inclusive and specialized settings.",
    category: "programs",
    image: "/features-service-card/parent-education.png",
    demographics: ["Educators", "Parents", "Students", "Professionals"],
    content: {
      overview: "At Divit MindSpace, we believe that creating inclusive, supportive, and empowering environments for children begins with well-trained, compassionate, and skilled professionals. Our Diploma in Special Education is an advanced vocational training program designed to prepare participants for meaningful careers supporting children with special educational and developmental needs.\n\nThis program combines in-depth theoretical learning, practical exposure, guided mentorship, and internship-based experience to help participants develop the confidence, competence, and practical understanding required to support neurodivergent and diverse learners effectively.",
      benefits: [
        "Comprehensive understanding of child development and special educational needs",
        "Knowledge of neurodevelopmental conditions and learning differences",
        "Practical strategies for classroom support and individualized intervention",
        "Skills in behavior management, communication support, and inclusive teaching practices",
        "Hands-on training through practical sessions and internships",
        "Exposure to real-life therapeutic and educational environments",
        "Professional confidence and career readiness",
        "Advanced understanding of special education support procedures and accommodations",
        "Diploma from Divit Academy upon successful completion",
      ],
      whatToExpect: [
        "Structured theoretical learning sessions",
        "Practical demonstrations and interactive workshops",
        "Real-life case discussions and intervention planning",
        "Guided observation and supervised practical exposure",
        "Internship opportunities for hands-on learning",
        "Personalized mentorship and professional guidance",
        "Skill-building in educational and therapeutic support strategies",
        "Diploma upon successful course completion",
      ],
      whoIsItFor: [
        "Aspiring special educators and shadow teachers",
        "Working teachers and educators supporting children with special needs",
        "Psychology students, undergraduates, and graduates interested in child development and therapy",
        "Physiotherapy students looking to expand their knowledge in pediatric rehabilitation and developmental support",
        "Parents of children with special needs seeking deeper understanding and practical strategies",
        "Caregivers, school staff, and professionals working with neurodivergent children",
        "Individuals aspiring to build careers in special education and child development",
        "Professionals seeking advanced training in therapeutic and educational interventions",
      ],
      duration: "11 Months (6 Months Theory + 5 Months Internship)",
      format: "Online / Offline / Hybrid",
      approachItems: [
        "Comprehensive curriculum covering theory and advanced practical application",
        "Hands-on learning and supervised practical exposure",
        "Extended internship opportunities with real-world experience",
        "Guidance from experienced clinicians, educators, and professionals",
        "Small batch sizes ensuring personalized learning and mentorship",
        "Flexible learning modes — Online, Offline, and Hybrid options available",
        "Professional networking and career-building opportunities",
        "Focus on inclusive, neuro-affirming, and child-centered educational practices",
      ],
      whyChooseItems: [
        "At Divit MindSpace, we go beyond textbook learning to provide immersive, practical, and meaningful training experiences rooted in empathy, inclusion, and real-world application.",
        "Our training programs are led by active clinicians and professionals who combine therapeutic expertise with compassionate, neuro-affirming approaches to child development and education. Through personalized mentorship, practical exposure, and evidence-based learning, we prepare participants to confidently support children and families across educational and therapeutic settings.",
        "We are committed to nurturing professionals who not only develop strong technical skills, but also cultivate empathy, understanding, and the ability to create inclusive spaces where every child can thrive.",
      ],
      additionalSections: [
        {
          title: "Course Structure",
          intro: "The course combines classroom learning, case discussions, practical demonstrations, observation opportunities, and supervised internships to ensure participants gain both conceptual clarity and extensive applied experience.",
          items: [
            "Mode: Online / Offline / Hybrid",
            "Total Duration: 11 Months",
            "Theory & Practical Training: 6 Months",
            "Internship: 5 Months",
            "Batch Size: Limited to 10 participants per batch",
            "Certification: Diploma from Divit Academy",
            "Course Fee: Rs. 35,000",
          ],
        },
        {
          title: "Objective",
          items: [
            "To provide foundational and advanced understanding of special education needs",
            "To train participants in supporting children with developmental and learning differences",
            "To build practical skills in classroom support, behavior management, and individualized intervention",
            "To promote inclusive, neuro-affirming, and child-centered educational practices",
            "To prepare participants for professional opportunities in therapeutic and educational settings",
            "To provide extensive hands-on exposure through supervised practical learning and internships",
          ],
        },
        {
          title: "Areas We Focus On",
          items: [
            "Child Development & Learning: Understanding developmental milestones, cognitive development, emotional growth, communication, adaptive functioning, and learning profiles.",
            "Special Educational Needs: Learning about Autism, ADHD, Learning Disabilities, developmental delays, sensory processing differences, and other neurodevelopmental conditions.",
            "Inclusive Education & Classroom Support: Supporting participation, individualized learning, accommodations, classroom engagement, and inclusive teaching practices.",
            "Behavior Management & Emotional Support: Understanding child behavior, emotional regulation, positive behavior support, and co-regulation strategies.",
            "Therapeutic & Intervention Strategies: Introduction to evidence-based intervention approaches used across developmental and educational settings.",
            "Practical Exposure & Internship: Hands-on experience through observation, guided participation, case-based learning, classroom support, and supervised internships.",
            "Guidance & Support Procedures: Understanding educational planning, individualized support strategies, and effective procedures for students receiving special education support.",
          ],
        },
        {
          title: "Scope & Career Opportunities",
          intro: "Upon successful completion of the course, participants can explore opportunities in:",
          items: [
            "Hospitals",
            "Occupational Therapy & Rehabilitation Centres",
            "Child Development Centres",
            "Therapeutic Centres",
            "Schools & Inclusive Education Settings",
            "Special Education Programs",
            "Clinics and Pediatric Support Centres",
            "Academic and Educational Support Services",
            "The course also helps participants strengthen their foundation for advanced studies and future specialization in child development, therapy, and inclusive education.",
          ],
        },
        {
          title: "Goal",
          items: [
            "To develop skilled, compassionate, and confident professionals who can effectively support children with special educational and developmental needs through inclusive, evidence-based, and child-centered practices.",
          ],
        },
      ],
    },
  },
  {
    id: "20",
    title: "NIOS Support Program",
    slug: "nios-support-program",
    description: "Our NIOS Support Program helps students successfully navigate the National Institute of Open Schooling (NIOS) curriculum by providing individualized academic support, structured learning strategies, emotional encouragement, and skill-building to improve confidence, independence, and academic success.",
    category: "programs",
    image: "/about_pic2.png",
    content: {
      overview: "At Divit MindSpace, our NIOS Support Program supports students pursuing education through the National Institute of Open Schooling (NIOS) framework. We provide flexible, personalized guidance for students with learning differences, anxiety, school refusal, or those requiring alternative educational pathways.\n\nBy combining remedial support, subject guidance, executive functioning, and exam preparation, we help students build confidence and study skills at their own pace. Our compassionate approach focuses on reducing academic stress, fostering self-awareness, and promoting long-term academic success.",
      benefits: [
        "Improved understanding of NIOS subjects and concepts",
        "Better organization, planning, and study strategies",
        "Enhanced attention, comprehension, and learning confidence",
        "Individualized academic support based on learning needs",
        "Improved exam preparation and academic performance",
        "Reduced academic stress and increased emotional support",
        "Greater independence in managing coursework and assignments",
        "Positive learning experiences and long-term educational confidence",
      ],
      whatToExpect: [
        "Initial assessment of academic strengths, learning needs, and educational goals",
        "Individualized learning plans tailored to the student’s pace and curriculum requirements",
        "Structured one-on-one or small-group academic support sessions",
        "Assistance with concept clarity, assignments, and exam preparation",
        "Strategies for organization, time management, and independent study skills",
        "Support for emotional regulation, academic confidence, and motivation",
        "Regular monitoring of progress and adaptation of learning goals",
        "Collaboration with families and support systems where needed",
      ],
      whoIsItFor: [
        "Difficulty coping with mainstream school environments or rigid academic systems",
        "Learning differences such as ADHD, Autism, dyslexia, dysgraphia, or dyscalculia",
        "Academic stress, anxiety, burnout, or school refusal",
        "Need for flexible and individualized learning support",
        "Difficulty understanding concepts, managing assignments, or preparing for exams",
        "Challenges with attention, organization, or independent studying",
        "Students transitioning to NIOS from traditional schooling systems",
        "Need for emotional and academic support during NIOS coursework",
      ],
      duration: "Ongoing support aligned with NIOS academic calendar",
      format: "In-person or online tutoring",
      approachItems: [
        "Neuro-affirming, student-centered, and strengths-based support",
        "Flexible learning approaches tailored to individual needs and pace",
        "Structured yet compassionate academic guidance",
        "Focus on emotional well-being alongside academic growth",
        "Encouraging, supportive, and confidence-building environment",
        "Collaborative involvement of families, caregivers, and educators where appropriate",
      ],
      whyChooseItems: [
        "At Divit MindSpace, we understand that educational journeys are unique, and success looks different for every learner.",
        "Our NIOS Support Program goes beyond academic teaching by focusing on the student’s confidence, emotional well-being, learning style, and long-term growth. Through individualized support, flexible strategies, and compassionate guidance, we help students navigate the NIOS curriculum with greater clarity, independence, and confidence.",
        "We are committed to creating supportive learning environments where students feel understood, empowered, and capable of achieving their educational goals at their own pace.",
      ],
      additionalSections: [
        {
          title: "Objective",
          items: [
            "To provide individualized academic support for NIOS students",
            "To strengthen subject understanding and foundational learning skills",
            "To improve study habits, organization, and time-management abilities",
            "To support students with diverse learning and emotional needs",
            "To reduce academic stress, anxiety, and learning-related overwhelm",
            "To build confidence, motivation, and independent learning skills",
            "To support successful completion of NIOS coursework and examinations",
          ],
        },
        {
          title: "Our Process",
          items: [
            "The NIOS Support Program begins with understanding the student’s academic history, learning profile, emotional needs, educational goals, strengths, and challenges. Intervention plans are personalized to ensure flexible and meaningful support.",
            "Support may include: Subject-specific academic guidance, Remedial support for foundational learning gaps, Assignment and project assistance, Executive functioning and study-skills support, Time management and planning strategies, Exam preparation and revision support, Emotional and motivational support during academics, Parent guidance and progress reviews where required",
          ],
        },
        {
          title: "Areas We Focus On",
          items: [
            "Academic Support & Concept Building: Strengthening understanding of core NIOS subjects through individualized teaching approaches and concept clarification.",
            "Remedial & Foundational Learning Support: Addressing learning gaps in reading, writing, comprehension, mathematics, and subject-based skills.",
            "Executive Functioning & Study Skills: Supporting planning, organization, time management, attention, task completion, and independent learning abilities.",
            "Exam Preparation & Academic Confidence: Helping students prepare effectively for assessments while reducing stress and building confidence.",
            "Emotional & Motivational Support: Providing encouragement, emotional regulation strategies, and a supportive environment for students experiencing academic anxiety, burnout, or low confidence.",
            "Flexible & Neuro-Affirming Learning Support: Adapting teaching methods and pacing to suit individual learning profiles, strengths, and support needs.",
          ],
        },
        {
          title: "Goal",
          items: [
            "To help students pursuing NIOS education feel confident, supported, capable, and academically prepared while promoting independence, emotional well-being, and meaningful educational success.",
          ],
        },
      ],
    },
  },
  {
    id: "21",
    title: "Summer Camp for Teens",
    slug: "summer-camp",
    description: "Our Summer Camp is a fun, welcoming space where you can make friends, try cool activities, build confidence, and just be yourself through guided fun and exploration.",
    category: "programs",
    image: "/about_pic3.png",
    content: {
      overview: "At Divit MindSpace, we create a joyful, inclusive summer hangout. We blend hands-on learning, creative arts, movement, and social time in a safe, neuro-affirming environment.\n\nWe focus on emotional well-being, independence, and real connections. Every activity is designed to spark curiosity and collaboration while fully respecting your unique personality and support needs.\n\nEveryone belongs here. We celebrate diversity and foster a culture of kindness, empathy, and acceptance.",
      benefits: [
        "Better social confidence and peer connections.",
        "More comfort participating in group activities.",
        "Outlets for creative thinking and self-expression.",
        "Stronger communication and teamwork skills.",
        "Tools for emotional regulation and coping.",
        "New, positive memories and meaningful friendships.",
      ],
      whatToExpect: [
        "Clear Routines: Predictable daily schedules with engaging activities.",
        "Safe Spaces: Fully supervised environments with trained professionals.",
        "True Inclusion: Activities adapted to match your individual needs.",
        "No Pressure: Encouragement to build independence at your own pace.",
        "Total Support: Positive reinforcement and emotional support throughout the day.",
        "Family Updates: Regular communication and guidance for parents.",
      ],
      whoIsItFor: [
        "You want a structured, predictable, and engaging summer routine.",
        "You are looking to build social connections and peer interactions.",
        "You want to boost confidence and creative skills.",
        "You thrive best in an environment that understands and welcomes neurodivergence.",
        "You want a fun, meaningful experience during the school break.",
      ],
      duration: "2-4 week summer program",
      format: "In-person day camp at our center",
      approachItems: [
        "Neuro-Affirming: We focus on your unique strengths, not your deficits.",
        "Experiential: Learning by doing through fun, hands-on play.",
        "Balanced: A mix of organized activities and independent choice.",
        "Safe & Kind: Prioritizing emotional safety, empathy, and a true sense of belonging.",
      ],
      whyChooseItems: [
        "At Divit MindSpace, we believe summer should be full of joy, connection, and real growth.",
        "Our camp goes beyond basic entertainment. We offer a nurturing environment with compassionate mentors, customized support, and an accepting atmosphere. We are dedicated to making sure you feel valued, capable, and successful every single day.",
      ],
      additionalSections: [
        {
          title: "Objective",
          items: [
            "To give you a positive, exciting, and meaningful summer break.",
            "To boost your creativity and hands-on exploration.",
            "To help you practice social skills and build real friendships.",
            "To grow your confidence, team-building, and independence.",
            "To provide a safe, structured, and genuinely inclusive space for fun.",
          ],
        },
        {
          title: "Our Process",
          items: [
            "We mix structured activities with free, play-based learning tailored to your age and pace. We make sure to balance high-energy movement with calm, creative downtime.",
          ],
        },
        {
          title: "Areas We Focus On",
          items: [
            "Social Interaction & Friendship: Practicing communication, sharing, and positive teamwork with peers.",
            "Creativity & Expression: Exploring imagination through arts, crafts, and storytelling.",
            "Confidence & Independence: Feeling safe to try new things and speak up comfortably.",
            "Emotional Well-Being: Building self-regulation, resilience, and positive self-esteem in a safe zone.",
            "Sensory & Movement: Enjoying fun, low-stress physical activities and sensory exploration.",
          ],
        },
        {
          title: "Goal",
          items: [
            "To create a joyful, enriching summer where you can build lasting friendships, discover new interests, grow your confidence, and make amazing memories.",
          ],
          color: "sage",
        },
      ],
    },
  },
  {
    id: "22",
    title: "Wheelchair Training Program",
    slug: "wheelchair-training",
    description: "Our Wheelchair Training Program helps individuals develop the skills, confidence, safety awareness, and independence needed to use a wheelchair effectively in daily life, school, workplace, community, and recreational environments.",
    category: "programs",
    image: "/about_pic3.png",
    demographics: ["Children", "Adolescents", "Adults"],
    content: {
      overview: "At Divit MindSpace, our Wheelchair Training Program is designed to empower individuals with mobility challenges to navigate their environments safely, comfortably, and confidently. We understand that wheelchair mobility is not just about movement — it is about independence, participation, dignity, accessibility, and quality of life.\n\nThe aim of the program is to help individuals build functional mobility skills, improve confidence in wheelchair use, and increase participation in everyday activities. Through a supportive, structured, and individualized approach, we work on mobility techniques, posture, transfers, environmental navigation, safety skills, endurance, and adaptive strategies based on each individual’s unique needs and abilities.\n\nOur multidisciplinary and person-centered approach ensures that training is practical, goal-oriented, and tailored to real-life environments such as home, school, workplace, and community settings.",
      benefits: [
        "Improved wheelchair mobility and maneuvering skills",
        "Better confidence in indoor and outdoor navigation",
        "Enhanced independence in daily activities and participation",
        "Safe transfer and positioning techniques",
        "Improved posture, balance, and endurance while using a wheelchair",
        "Strategies for managing barriers and navigating different environments",
        "Greater awareness of safety, accessibility, and adaptive mobility skills",
        "Increased confidence, participation, and quality of life",
      ],
      whatToExpect: [
        "Initial assessment of mobility, posture, strength, and functional needs",
        "Individualized goal-setting based on daily-life requirements and participation goals",
        "Structured wheelchair mobility and safety training sessions",
        "Practice in real-life and simulated environments",
        "Guidance on posture, positioning, pressure relief, and endurance",
        "Support for transfers, adaptive techniques, and accessibility challenges",
        "Caregiver training and home/environment recommendations where needed",
        "Ongoing monitoring of progress and functional independence",
      ],
      whoIsItFor: [
        "Difficulty maneuvering or navigating a wheelchair independently",
        "Challenges with posture, positioning, or comfort during wheelchair use",
        "Fear, hesitation, or reduced confidence in mobility",
        "Need for safe transfer training and mobility strategies",
        "Transition to using a wheelchair after injury, illness, or medical condition",
        "Support required for school, workplace, or community participation",
        "Need for caregiver guidance regarding wheelchair support and mobility assistance",
        "Difficulty accessing or adapting to different environments safely",
      ],
      duration: "Individualized based on mobility goals and needs",
      format: "In-person at our center or home/community environments",
      approachItems: [
        "Person-centered, strengths-based, and functional approach",
        "Respectful, empowering, and dignity-focused support",
        "Training tailored to real-life goals and environments",
        "Focus on independence, participation, and quality of life",
        "Safe, supportive, and encouraging learning environment",
        "Collaborative involvement of families, caregivers, and support systems where appropriate",
      ],
      whyChooseItems: [
        "At Divit MindSpace, we believe mobility is deeply connected to independence, confidence, and inclusion.",
        "Our Wheelchair Training Program focuses not only on physical mobility skills, but also on empowering individuals to participate fully and confidently in everyday life. Through compassionate guidance, individualized support, and practical training, we help individuals build the skills needed to navigate their environments safely and independently.",
        "We are committed to creating supportive, accessible, and empowering experiences that promote dignity, participation, and long-term functional independence.",
      ],
      additionalSections: [
        {
          title: "Objective",
          items: [
            "To improve independent and safe wheelchair mobility",
            "To build confidence in navigating different environments",
            "To enhance participation in school, work, social, and daily activities",
            "To improve posture, endurance, and functional mobility skills",
            "To teach safe transfers and wheelchair handling techniques",
            "To promote accessibility awareness and adaptive problem-solving skills",
            "To support emotional adjustment, independence, and self-confidence",
          ],
        },
        {
          title: "Our Process",
          items: [
            "Wheelchair positioning and posture training",
            "Safe transfer techniques",
            "Indoor and outdoor mobility practice",
            "Navigation through ramps, doorways, uneven surfaces, and public spaces",
            "Strengthening and endurance-building activities",
            "Wheelchair handling and maneuvering skills",
            "Community mobility and accessibility training",
            "Caregiver and family guidance where required",
          ],
        },
        {
          title: "Areas We Focus On",
          items: [
            "Wheelchair Mobility Skills: Propelling, turning, reversing, maneuvering through spaces, and navigating safely across different surfaces and environments.",
            "Posture & Positioning: Promoting comfort, alignment, pressure management, and long-term physical well-being during wheelchair use.",
            "Transfers & Functional Independence: Safe techniques for moving between wheelchair, bed, chair, toilet, car, or other daily environments.",
            "Safety & Environmental Navigation: Learning to navigate ramps, curbs, elevators, doorways, crowded spaces, and community environments safely and confidently.",
            "Strength & Endurance Building: Improving physical endurance, upper body strength, coordination, and mobility efficiency.",
            "Community Participation & Accessibility: Supporting participation in school, workplace, social, and recreational settings while building adaptive problem-solving skills.",
          ],
        },
        {
          title: "Goal",
          items: [
            "To empower individuals with the mobility skills, confidence, independence, and safety awareness needed to participate meaningfully and comfortably in daily life and community environments.",
          ],
        },
      ],
    },
  },
  {
    id: "23",
    title: "Gym & Sports Injury Sessions",
    slug: "gym--sports-injury-sessions",
    description: "Our Gym & Sports Injury Sessions help individuals recover safely from injuries, improve physical performance, prevent future injuries, and return to daily activities, fitness routines, and sports participation with greater strength, confidence, and mobility.",
    category: "programs",
    image: "/about_pic3.png",
    demographics: ["Children", "Adolescents", "Adults"],
    content: {
      overview: "At Divit MindSpace, our Gym & Sports Injury Sessions are designed to support individuals recovering from physical strain, sports-related injuries, movement limitations, postural concerns, and fitness-related discomfort through a structured, therapeutic, and evidence-based approach.\n\nWhether the goal is recovery, rehabilitation, strength-building, injury prevention, mobility enhancement, or return-to-sport training, our sessions are tailored to each individual’s physical condition, activity level, lifestyle, and recovery goals.\n\nWe combine therapeutic exercise, movement retraining, strengthening, mobility work, functional rehabilitation, and guided physical conditioning to promote safe recovery and long-term physical well-being. The focus is not only on healing the injury, but also on improving body awareness, movement efficiency, endurance, posture, and overall functional performance.\n\nOur approach is individualized, supportive, and goal-oriented — helping individuals return to activities with improved confidence, safety, and resilience.",
      benefits: [
        "Improved strength, mobility, and physical endurance",
        "Better recovery from sports, gym, or movement-related injuries",
        "Enhanced flexibility, posture, and body mechanics",
        "Reduced pain, stiffness, and movement discomfort",
        "Improved balance, coordination, and physical control",
        "Safer return to exercise, sports, and physical activity",
        "Injury prevention strategies and movement awareness",
        "Greater confidence in physical functioning and performance",
      ],
      whatToExpect: [
        "Initial assessment of posture, strength, mobility, pain, and movement patterns",
        "Individualized rehabilitation and fitness planning based on recovery goals",
        "Structured exercise and therapeutic movement sessions",
        "Progressive strengthening and mobility training",
        "Functional and activity-specific rehabilitation exercises",
        "Education regarding posture, body mechanics, and injury prevention",
        "Monitoring of recovery, endurance, and physical performance",
        "Guidance for safe return to sports, workouts, and daily activities",
      ],
      whoIsItFor: [
        "Pain or discomfort during exercise, sports, or movement",
        "Recovery from sports injuries, muscle strain, or physical overuse",
        "Difficulty returning to workouts or sports after injury",
        "Reduced flexibility, balance, strength, or endurance",
        "Postural issues or movement-related discomfort",
        "Fear of re-injury or hesitation during physical activity",
        "Need for guided rehabilitation or conditioning support",
        "Desire to improve physical performance safely and effectively",
      ],
      duration: "Individualized based on recovery goals and needs",
      format: "In-person at our center",
      approachItems: [
        "Individualized, evidence-based, and goal-oriented intervention",
        "Focus on safe recovery, prevention, and long-term physical well-being",
        "Supportive and motivating environment",
        "Functional rehabilitation tailored to real-life activities and sports participation",
        "Gradual progression based on comfort, endurance, and recovery",
        "Emphasis on movement quality, body awareness, and confidence-building",
      ],
      whyChooseItems: [
        "At Divit MindSpace, we believe recovery and physical fitness should be safe, empowering, and sustainable.",
        "Our Gym & Sports Injury Sessions focus on understanding the individual as a whole — not just the injury. Through personalized rehabilitation, guided movement training, and compassionate support, we help individuals regain strength, confidence, mobility, and participation in the activities they enjoy.",
        "We are committed to helping individuals move better, recover stronger, and return to active living with confidence and resilience.",
      ],
      additionalSections: [
        {
          title: "Objective",
          items: [
            "To support recovery from gym-related or sports injuries",
            "To improve strength, flexibility, balance, endurance, and mobility",
            "To reduce pain, stiffness, and movement limitations",
            "To prevent re-injury and improve movement mechanics",
            "To support safe return to sports, fitness, or daily activities",
            "To improve posture, body awareness, and functional performance",
            "To build confidence in movement and physical participation",
          ],
        },
        {
          title: "Our Process",
          items: [
            "Therapeutic strengthening exercises",
            "Mobility and flexibility training",
            "Postural correction and body mechanics training",
            "Functional rehabilitation exercises",
            "Balance and coordination activities",
            "Sports-specific or activity-specific conditioning",
            "Pain management and recovery support",
            "Endurance and movement retraining",
            "Guided warm-up and injury prevention strategies",
          ],
        },
        {
          title: "Areas We Focus On",
          items: [
            "Injury Rehabilitation: Supporting recovery from sports injuries, muscle strain, joint discomfort, overuse injuries, post-workout pain, and movement-related limitations.",
            "Strength & Conditioning: Improving muscle strength, endurance, stability, coordination, and physical resilience.",
            "Mobility & Flexibility: Enhancing range of motion, flexibility, movement quality, and physical comfort.",
            "Posture & Movement Mechanics: Correcting movement patterns and improving posture to reduce strain and prevent future injuries.",
            "Balance & Functional Performance: Improving coordination, agility, balance, and movement control for daily activities and sports participation.",
            "Injury Prevention & Recovery Education: Building awareness regarding safe exercise techniques, warm-up routines, recovery practices, and long-term injury prevention.",
          ],
        },
        {
          title: "Goal",
          items: [
            "To help individuals recover safely, move confidently, improve physical performance, and return to active lifestyles with better strength, mobility, endurance, and injury prevention awareness.",
          ],
        },
      ],
    },
  },
  {
    id: "24",
    title: "Pain Management",
    slug: "pain-management",
    description: "Our Pain Management Program helps individuals reduce pain, improve physical functioning, restore mobility, and enhance overall quality of life through a holistic, evidence-based, and individualized therapeutic approach.",
    category: "programs",
    image: "/about_pic3.png",
    demographics: ["Children", "Adolescents", "Adults"],
    content: {
      overview: "At Divit MindSpace, our Pain Management Program is designed to support individuals experiencing acute, chronic, recurring, or movement-related pain that affects daily life, physical functioning, emotional well-being, and participation in routine activities.\n\nPain can impact mobility, sleep, energy, mood, work performance, relationships, and overall quality of life. Our approach focuses not only on symptom relief, but also on understanding the underlying physical, functional, postural, emotional, and lifestyle factors contributing to pain.\n\nThrough individualized assessment and intervention, we help individuals improve movement, reduce discomfort, build physical resilience, and regain confidence in their bodies. The program integrates therapeutic exercises, movement-based rehabilitation, posture correction, body mechanics training, relaxation strategies, and functional support tailored to each individual’s needs and goals.\n\nOur focus is on helping individuals move toward long-term pain management, improved independence, and sustainable physical well-being.",
      benefits: [
        "Reduced pain, stiffness, and physical discomfort",
        "Improved mobility, flexibility, and movement confidence",
        "Better posture, body mechanics, and physical alignment",
        "Enhanced strength, endurance, and physical functioning",
        "Greater ability to participate in daily activities comfortably",
        "Improved awareness of pain triggers and self-management strategies",
        "Support in managing stress and emotional impact related to chronic pain",
        "Improved quality of life and overall well-being",
      ],
      whatToExpect: [
        "Initial assessment of pain patterns, posture, mobility, strength, and daily functioning",
        "Identification of contributing physical, functional, and lifestyle factors",
        "Individualized pain management and rehabilitation planning",
        "Structured therapeutic exercise and movement sessions",
        "Gradual progression of mobility, endurance, and functional activities",
        "Guidance regarding posture, ergonomics, pacing, and body mechanics",
        "Strategies for self-management, recovery, and prevention of recurring pain",
        "Ongoing monitoring of progress and functional improvement",
      ],
      whoIsItFor: [
        "Persistent or recurring pain affecting daily life",
        "Neck, back, shoulder, joint, or muscle pain",
        "Pain related to posture, work strain, or repetitive activities",
        "Difficulty moving comfortably or participating in physical activities",
        "Recovery after injury, physical strain, or surgery",
        "Reduced flexibility, endurance, or physical confidence",
        "Stress-related physical tension or discomfort",
        "Need for long-term strategies to manage chronic pain safely and effectively",
      ],
      duration: "Individualized based on recovery goals and needs",
      format: "In-person at our center",
      approachItems: [
        "Individualized, holistic, and evidence-based intervention",
        "Focus on functional improvement and quality of life",
        "Compassionate, supportive, and person-centered care",
        "Combination of rehabilitation, movement therapy, and preventive strategies",
        "Gradual and safe progression tailored to each individual’s comfort and goals",
        "Emphasis on long-term self-management, resilience, and sustainable recovery",
      ],
      whyChooseItems: [
        "At Divit MindSpace, we understand that pain affects more than just the body — it can influence emotional well-being, confidence, independence, and participation in daily life.",
        "Our Pain Management Program focuses on helping individuals feel heard, supported, and empowered throughout their recovery journey. Through personalized care, therapeutic guidance, and functional rehabilitation, we help individuals move toward reduced pain, improved movement, and greater overall well-being.",
        "We are committed to creating safe, compassionate, and empowering experiences that support long-term recovery, confidence, and quality of life.",
      ],
      additionalSections: [
        {
          title: "Objective",
          items: [
            "To reduce physical pain and discomfort",
            "To improve mobility, flexibility, and functional independence",
            "To address movement patterns, posture, and physical strain contributing to pain",
            "To improve strength, endurance, and body awareness",
            "To support emotional well-being associated with chronic pain experiences",
            "To enhance participation in daily activities, work, exercise, and social life",
            "To promote long-term pain management and injury prevention strategies",
          ],
        },
        {
          title: "Our Process",
          items: [
            "Therapeutic exercises and guided movement",
            "Mobility and flexibility training",
            "Postural correction and ergonomic guidance",
            "Strengthening and stabilization exercises",
            "Relaxation and body-awareness techniques",
            "Pain-relief modalities and functional rehabilitation",
            "Breathing and stress-regulation strategies",
            "Education regarding pacing, recovery, and injury prevention",
            "Lifestyle and activity modification guidance where required",
          ],
        },
        {
          title: "Areas We Focus On",
          items: [
            "Chronic & Recurring Pain: Support for long-term pain conditions affecting physical functioning, movement, and quality of life.",
            "Musculoskeletal Pain: Management of neck pain, back pain, shoulder discomfort, joint pain, muscle tightness, and movement-related strain.",
            "Posture & Ergonomics: Improving body alignment, sitting posture, movement habits, and workspace ergonomics to reduce physical stress and discomfort.",
            "Mobility & Functional Rehabilitation: Enhancing flexibility, movement quality, endurance, and participation in everyday activities.",
            "Stress & Pain Regulation: Addressing the relationship between stress, tension, emotional overload, and physical pain experiences.",
            "Strength & Physical Resilience: Building muscle support, physical stability, and body awareness to improve long-term functioning and reduce re-injury risk.",
          ],
        },
        {
          title: "Goal",
          items: [
            "To help individuals manage pain effectively, improve physical functioning, regain confidence in movement, and enhance overall well-being through safe, supportive, and sustainable therapeutic intervention.",
          ],
        },
      ],
    },
  },
  {
    id: "25",
    title: "Post-Surgical Rehabilitation",
    slug: "post-surgical-rehabilitation",
    description: "Our Post-Surgical Rehabilitation Program helps individuals recover safely after surgery by improving mobility, strength, flexibility, endurance, pain management, and functional independence while supporting a smoother and more confident return to daily activities and overall well-being.",
    category: "programs",
    image: "/about_pic3.png",
    demographics: ["Children", "Adolescents", "Adults"],
    content: {
      overview: "At Divit MindSpace, our Post-Surgical Rehabilitation Program supports individuals through every stage of recovery following surgery. We provide individualized plans tailored to your specific procedure and recovery goals, helping you heal safely and regain functional mobility.\n\nThrough structured therapeutic exercises, gradual movement training, and pain management strategies, we facilitate a safe transition back to daily life, restoring your strength and independence.\n\nOur approach emphasizes safe progression, physical recovery, emotional support, and long-term functional well-being while ensuring that rehabilitation is personalized, compassionate, and goal-oriented.",
      benefits: [
        "Improved mobility, flexibility, and physical functioning",
        "Better pain management and reduced physical discomfort",
        "Enhanced muscle strength, balance, and endurance",
        "Safer return to daily activities, work, exercise, or sports participation",
        "Improved posture, movement confidence, and body awareness",
        "Reduced risk of stiffness, weakness, and movement-related complications",
        "Greater independence in everyday tasks and routines",
        "Structured guidance and support throughout the recovery process",
      ],
      whatToExpect: [
        "Initial assessment of mobility, pain, strength, flexibility, posture, and functional limitations",
        "Individualized rehabilitation planning based on surgical recovery goals",
        "Structured and progressive therapeutic exercise sessions",
        "Guided movement and mobility training tailored to recovery stage",
        "Pain management and functional rehabilitation strategies",
        "Monitoring of healing progress, endurance, and movement quality",
        "Education regarding posture, body mechanics, pacing, and recovery precautions",
        "Ongoing support for safe return to daily routines and activities",
      ],
      whoIsItFor: [
        "Difficulty moving comfortably after surgery",
        "Pain, stiffness, weakness, or reduced mobility during recovery",
        "Need for guided rehabilitation after orthopedic, neurological, abdominal, or other surgeries",
        "Difficulty returning to walking, exercise, work, or daily activities",
        "Reduced balance, endurance, coordination, or physical confidence",
        "Need for structured recovery support and movement retraining",
        "Concerns regarding posture, strength, or physical functioning after surgery",
        "Need for long-term rehabilitation and recovery planning",
      ],
      duration: "Individualized based on recovery goals and needs",
      format: "In-person at our center",
      approachItems: [
        "Individualized, evidence-based, and goal-oriented rehabilitation",
        "Safe and gradual progression based on recovery stage and comfort",
        "Focus on functional independence, mobility, and quality of life",
        "Compassionate, supportive, and person-centered care",
        "Collaborative involvement of caregivers, medical professionals, and families where required",
        "Emphasis on long-term recovery, resilience, and sustainable physical well-being",
      ],
      whyChooseItems: [
        "At Divit MindSpace, we believe recovery after surgery is both a physical and emotional journey.",
        "Our Post-Surgical Rehabilitation Program focuses on helping individuals feel supported, confident, and empowered throughout the healing process. Through personalized rehabilitation plans, therapeutic guidance, and compassionate care, we help individuals safely regain strength, mobility, independence, and participation in everyday life.",
        "We are committed to providing structured, holistic, and supportive rehabilitation experiences that promote recovery, confidence, comfort, and long-term well-being.",
      ],
      additionalSections: [
        {
          title: "Objective",
          items: [
            "To support safe and effective recovery after surgery",
            "To reduce pain, stiffness, swelling, and physical discomfort",
            "To improve mobility, flexibility, strength, and endurance",
            "To restore functional independence and participation in daily activities",
            "To prevent post-surgical complications and movement limitations",
            "To improve balance, posture, coordination, and movement confidence",
            "To support emotional well-being and confidence during recovery",
          ],
        },
        {
          title: "Our Process",
          items: [
            "The Post-Surgical Rehabilitation Program is individualized based on the person’s surgery type, recovery stage, medical recommendations, mobility needs, and rehabilitation goals.",
            "Rehabilitation sessions may include: Therapeutic strengthening and mobility exercises, Flexibility and range-of-motion training, Balance and coordination activities, Pain management and recovery support, Functional rehabilitation and movement retraining, Posture and body mechanics training, Walking and gait training where required, Breathing, endurance, and conditioning exercises, Home exercise programs and recovery guidance",
          ],
        },
        {
          title: "Areas We Focus On",
          items: [
            "Mobility & Functional Recovery: Improving movement, flexibility, walking ability, transfers, and participation in everyday activities.",
            "Strength & Physical Conditioning: Rebuilding muscle strength, endurance, stability, and physical confidence after surgery.",
            "Pain & Swelling Management: Supporting comfort, recovery, circulation, and reduction of stiffness or discomfort during healing.",
            "Balance, Coordination & Gait Training: Improving movement control, balance, posture, and walking patterns where needed.",
            "Posture & Body Mechanics: Helping individuals move safely and efficiently while reducing strain during recovery.",
            "Return to Daily Activities: Supporting safe transition back to work, school, exercise, sports, self-care, and community participation.",
          ],
        },
        {
          title: "Goal",
          items: [
            "To help individuals recover safely and confidently after surgery by restoring physical functioning, improving independence, reducing discomfort, and supporting long-term mobility and quality of life.",
          ],
        },
      ],
    },
  },
  {
    id: "26",
    title: "Pain Modalities",
    slug: "pain-modalities",
    description: "Our Pain Modalities Program helps individuals manage pain, reduce physical discomfort, improve mobility, promote healing, and enhance overall physical functioning through evidence-based therapeutic pain-relief techniques and supportive rehabilitation approaches.",
    category: "programs",
    image: "/about_pic3.png",
    demographics: ["Children", "Adolescents", "Adults"],
    content: {
      overview: "At Divit MindSpace, our Pain Modalities Program supports individuals experiencing acute, chronic, post-surgical, or movement-related pain. We focus on reducing discomfort, improving mobility, and helping you return to daily activities with greater ease and confidence.\n\nUsing personalized assessments, we integrate therapeutic pain-relief techniques (such as heat/cold, ultrasound, and stimulation) with target exercises. This approach addresses inflammation, muscle tightness, and stiffness to support long-term functional recovery.\n\nOur goal-oriented care is tailored to your unique pain patterns, physical condition, and lifestyle, promoting sustainable well-being and independence.",
      benefits: [
        "Reduced pain and muscle discomfort",
        "Improved flexibility, movement, and physical comfort",
        "Better circulation, relaxation, and tissue recovery",
        "Enhanced mobility and functional participation",
        "Improved posture and reduced physical strain",
        "Greater ease in performing daily activities",
        "Support for rehabilitation and recovery processes",
        "Improved confidence, comfort, and overall well-being",
      ],
      whatToExpect: [
        "Initial assessment of pain, mobility, posture, and physical functioning",
        "Identification of pain triggers, movement limitations, and contributing factors",
        "Individualized pain-relief and rehabilitation planning",
        "Safe and structured application of therapeutic pain modalities",
        "Integration of movement, strengthening, and flexibility exercises where required",
        "Monitoring of pain levels, comfort, mobility, and recovery progress",
        "Education regarding posture, body mechanics, pacing, and self-management strategies",
        "Ongoing guidance for long-term pain management and prevention",
      ],
      whoIsItFor: [
        "Persistent or recurring muscle or joint pain",
        "Physical discomfort affecting movement or daily activities",
        "Post-surgical or post-injury pain and stiffness",
        "Reduced mobility, flexibility, or physical endurance",
        "Muscle tightness, tension, or inflammation",
        "Pain related to posture, repetitive strain, or physical overuse",
        "Need for supportive pain-relief interventions during rehabilitation",
        "Difficulty participating comfortably in work, exercise, or routine activities",
      ],
      duration: "Individualized based on recovery goals and needs",
      format: "In-person at our center",
      approachItems: [
        "Individualized and evidence-based pain management support",
        "Focus on comfort, recovery, and functional improvement",
        "Safe, structured, and person-centered therapeutic interventions",
        "Combination of pain-relief modalities with rehabilitation strategies",
        "Gradual and goal-oriented progression tailored to individual needs",
        "Emphasis on long-term well-being, prevention, and improved quality of life",
      ],
      whyChooseItems: [
        "At Divit MindSpace, we understand that pain affects not only physical functioning, but also emotional well-being, confidence, and participation in everyday life.",
        "Our Pain Modalities Program focuses on helping individuals feel supported, comfortable, and empowered throughout their recovery process. Through individualized therapeutic care, evidence-based pain-relief techniques, and compassionate rehabilitation support, we help individuals improve comfort, movement, recovery, and overall quality of life.",
        "We are committed to providing safe, holistic, and supportive care that promotes healing, independence, resilience, and long-term physical well-being.",
      ],
      additionalSections: [
        {
          title: "Objective",
          items: [
            "To reduce pain, stiffness, and physical discomfort",
            "To improve mobility, circulation, and muscle relaxation",
            "To support tissue healing and physical recovery",
            "To improve posture, flexibility, and movement quality",
            "To reduce muscle tension, inflammation, and physical strain",
            "To improve participation in daily activities and physical functioning",
            "To support long-term pain management and rehabilitation goals",
          ],
        },
        {
          title: "Our Process",
          items: [
            "The Pain Modalities Program is individualized based on the person’s pain condition, physical needs, rehabilitation goals, and medical recommendations. Therapeutic interventions are carefully selected to support comfort, recovery, and improved physical functioning.",
            "Pain management support may include: Heat and cold therapy, Electrical stimulation modalities where appropriate, Therapeutic ultrasound support, Muscle relaxation and soft tissue techniques, Stretching and mobility exercises, Postural correction and ergonomic guidance, Pain-relief positioning strategies, Movement-based rehabilitation support, Relaxation and body-awareness techniques",
          ],
        },
        {
          title: "Areas We Focus On",
          items: [
            "Musculoskeletal Pain Relief: Support for neck pain, back pain, shoulder pain, joint discomfort, muscle tightness, and movement-related strain.",
            "Post-Injury & Post-Surgical Recovery: Reducing discomfort, stiffness, and movement limitations during rehabilitation and healing.",
            "Mobility & Functional Improvement: Enhancing flexibility, movement quality, posture, endurance, and physical participation.",
            "Muscle Relaxation & Recovery: Supporting circulation, reducing muscle tension, and promoting physical relaxation and comfort.",
            "Posture & Ergonomic Support: Improving movement patterns, alignment, and physical habits that contribute to discomfort and strain.",
            "Pain Management & Rehabilitation Integration: Combining pain-relief techniques with functional rehabilitation and strengthening strategies for long-term improvement.",
          ],
        },
        {
          title: "Goal",
          items: [
            "To help individuals experience reduced pain, improved mobility, greater physical comfort, and enhanced participation in daily life through safe, evidence-based, and supportive therapeutic pain management approaches.",
          ],
        },
      ],
    },
  },
  {
    id: "27",
    title: "Customized Workshops",
    slug: "customized-workshops",
    description: "Our Customized Workshops empower participants with practical knowledge, evidence-based strategies, emotional awareness, and actionable tools tailored to their specific environments, helping individuals, families, educators, professionals, and communities build greater understanding, confidence, inclusion, and well-being.",
    category: "programs",
    image: "/features-service-card/parent-education.png",
    demographics: ["Parents", "Teachers", "Corporates", "Communities"],
    content: {
      overview: "At Divit MindSpace, we believe meaningful learning happens when conversations are relevant, engaging, and tailored to the real-life needs of the audience. Our Customized Workshops are thoughtfully designed to create interactive, insightful, and impactful learning experiences for diverse groups across educational, professional, healthcare, and community settings.\n\nEvery workshop is fully customizable and developed based on the specific goals, age group, challenges, and profile of the audience. We combine evidence-based knowledge with relatable discussions, real-world applications, and practical strategies that participants can immediately apply in their environments.",
      benefits: [
        "Practical tools and strategies relevant to your environment and role",
        "Greater awareness and understanding of developmental, emotional, educational, and behavioral topics",
        "Improved communication, connection-building, and relationship skills",
        "Confidence in responding to real-life challenges and situations",
        "Enhanced emotional awareness, empathy, and inclusive practices",
        "Interactive learning experiences tailored to participant needs",
      ],
      whatToExpect: [
        "Initial discussion to understand organizational goals and participant needs",
        "Customized workshop planning and content development",
        "Interactive and engaging session delivery",
        "Practical tools, strategies, and real-world applications",
        "Opportunities for participant interaction and discussion",
        "Supportive, inclusive, and emotionally safe learning environments",
      ],
      whoIsItFor: [
        "Need for awareness sessions on developmental, emotional, educational, or mental health topics",
        "Desire to create safer, more inclusive, and emotionally supportive environments",
        "Need for practical training for educators, parents, professionals, or teams",
        "Concerns regarding student well-being, bullying, or digital safety",
        "Need for neurodiversity awareness and inclusion training",
        "Workplace well-being or community awareness initiatives",
      ],
      duration: "Customized (Typically 1.5 to 3 hours)",
      format: "In-person or Online",
      approachItems: [
        "Interactive, practical, and audience-centered learning experiences",
        "Customized content tailored to organizational goals and participant needs",
        "Evidence-based, neuro-affirming, and emotionally informed discussions",
        "Safe, inclusive, and collaborative environments for learning and reflection",
        "Focus on practical strategies, empathy, connection, and meaningful impact",
      ],
      whyChooseItems: [
        "At Divit MindSpace, we believe workshops should go beyond information-sharing and create experiences that inspire reflection, confidence, empathy, and actionable change.",
        "Through customized content, compassionate facilitation, and practical strategies, we help organizations create informed, inclusive, emotionally supportive, and empowered communities.",
      ],
      additionalSections: [
        {
          title: "Objective",
          items: [
            "To provide practical, evidence-based, and audience-specific learning experiences",
            "To promote emotional well-being, awareness, inclusion, and mental health literacy",
            "To equip participants with actionable strategies for real-life situations",
            "To strengthen communication, relationships, emotional regulation, and supportive environments",
            "To foster awareness regarding developmental, behavioral, educational, and psychosocial challenges",
            "To encourage empathy, collaboration, confidence, and informed decision-making",
          ],
        },
        {
          title: "Our Process",
          intro: "Each workshop is carefully planned after understanding the organization’s goals, audience profile, age group, challenges, and preferred outcomes. Sessions are customized to ensure relevance, engagement, and practical value.",
          items: [
            "Interactive presentations and discussions",
            "Case studies and real-life examples",
            "Practical strategies and actionable techniques",
            "Role-play activities and reflective exercises",
            "Q&A and guided conversations",
            "Resource sharing and take-home strategies",
          ],
        },
        {
          title: "Popular Workshop Topics",
          intro: "We offer a wide range of topics that can be fully customized for schools, colleges, corporates, and communities. Some of our popular workshop areas include:",
          items: [
            "Child Growth & Development: Understanding developmental milestones, emotional growth, learning patterns, and signs parents and educators should track during childhood and adolescence.",
            "Screen Time Management: Building healthy digital habits for children, adolescents, families, and classrooms while promoting balance and mindful technology use.",
            "Bullying Prevention: Recognizing, responding to, and preventing bullying behaviors while fostering emotionally safe and inclusive school environments.",
            "Cybersecurity Awareness: Understanding online safety, responsible digital behavior, and safe technology practices for students, parents, and educators.",
            "Connecting with Your Students: Practical relationship-building strategies that help teachers create trust, emotional safety, engagement, and positive classroom environments.",
            "Mental Health & Emotional Well-Being: Promoting emotional resilience, stress management, burnout prevention, and supportive communication.",
            "Neurodiversity & Inclusion: Creating inclusive spaces for individuals with Autism, ADHD, learning differences, sensory needs, and other neurodevelopmental profiles.",
            "And many more topics customized to the unique needs of the organization or audience.",
          ],
        },
        {
          title: "Who These Workshops Are For",
          items: [
            "Schools and educational institutions",
            "Teachers, educators, and school leadership teams",
            "Parents and caregivers",
            "College students and youth groups",
            "Corporate organizations and workplace teams",
            "Hospitals and healthcare professionals",
            "Apartment communities and community groups",
          ],
        },
        {
          title: "Complimentary Awareness Sessions",
          intro: "At Divit MindSpace, awareness and education are a core part of our mission. We believe meaningful change begins with understanding, early identification, and reducing the stigma surrounding mental health and neurodivergence.\n\nAs part of our commitment to building informed and inclusive communities, we regularly conduct complimentary awareness sessions for parents, teachers, caregivers, schools, and communities on topics related to neurodivergence, emotional well-being, child development, inclusion, and early intervention.\n\nAll awareness sessions are offered free of charge. However, Customized Workshops involving tailored content creation, presentation development, structured facilitation, specialized expertise, and organization-specific training are conducted with reasonable professional remuneration to support the time, preparation, and expertise involved in delivering high-quality and impactful sessions.",
          items: [],
          position: "bottom",
        },
        {
          title: "Goal",
          items: [
            "To create meaningful, practical, and empowering learning experiences that help individuals and communities build awareness, emotional resilience, communication skills, inclusion, confidence, and supportive environments for growth and well-being.",
          ],
        },
      ],
    },
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  // Normalize slug for CBT specifically
  const normalizedSlug = (slug === "cognitive-behavioral-therapy-cbt") ? "cbt-cognitive-behavioral-therapy" : slug;
  return services.find((service) => service.slug === normalizedSlug);
}

export function getServicesByCategory(category: string): ServiceData[] {
  if (category === "all") return services;
  return services.filter((service) => service.category === category);
}
