export interface ServiceData {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: "assessments" | "therapy" | "guidance" | "programs";
  image: string;
  content: {
    overview: string;
    benefits?: string[];
    whatToExpect?: string[];
    whoIsItFor?: string[];
    duration?: string;
    format?: string;
    faqs?: { question: string; answer: string }[];
    audienceSections?: {
      audienceType: "children" | "teens" | "adults";
      title: string;
      hero?: {
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
      supportedItems?: string[];
      supportedItemsTitle?: string;
      supportedItemsIntro?: string;
      approachItems?: string[];
      whyChooseItems?: string[];
    }[];
    additionalSections?: {
      title: string;
      intro?: string;
      items: string[];
      color?: string;
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
    description: "Our psychometric assessments are designed to gently and accurately understand your child's learning style, strengths, and areas where they may need additional support.",
    category: "assessments",
    image: "/features-service-card/child-autism-assessment.png",
    content: {
      overview: "Our psychometric assessments are designed to gently and accurately understand your child's learning style, strengths, and areas where they may need additional support. These assessments help identify cognitive abilities, emotional patterns, and developmental needs to create a clear roadmap for your child's growth.",
      benefits: [
        "Clear understanding of your child's cognitive strengths and challenges",
        "Detailed written report with actionable recommendations",
        "Personalized strategies for home and school",
        "Identification of learning style preferences",
        "Foundation for educational planning and interventions",
      ],
      whatToExpect: [
        "Initial parent consultation to understand concerns and history",
        "2-3 assessment sessions with your child in a child-friendly environment",
        "Standardized testing using age-appropriate tools",
        "Comprehensive written report within 7-10 days",
        "Feedback session to discuss findings and recommendations",
      ],
      whoIsItFor: [
        "Children showing learning difficulties at school",
        "Parents seeking clarity about their child's abilities",
        "Schools requiring formal assessment for support planning",
        "Children being considered for gifted programs",
        "Families wanting to understand developmental delays",
      ],
      duration: "2-3 sessions (60-90 minutes each)",
      format: "In-person at our center",
    },
  },
  {
    id: "2",
    title: "Psychoeducational Assessments",
    slug: "psychoeducational-assessments",
    description: "Psychoeducational assessments play a pivotal role in supporting neurodivergent children — those with learning differences such as ADHD, dyslexia, or autism spectrum disorders.",
    category: "assessments",
    image: "/Psychoeducational Assessments.jpeg",
    content: {
      overview: "Psychoeducational assessments play a pivotal role in supporting neurodivergent children — those with learning differences such as ADHD, dyslexia, or autism spectrum disorders. These comprehensive evaluations examine both cognitive abilities and academic achievement to identify specific learning disabilities and create targeted intervention plans.",
      benefits: [
        "Identification of specific learning disabilities (dyslexia, dyscalculia, dysgraphia)",
        "Detailed academic skill profile across subjects",
        "Customized learning strategies and accommodations",
        "Recommendations for school support and IEP planning",
        "Clear roadmap for academic improvement",
      ],
      whatToExpect: [
        "Review of school records and previous assessments",
        "Parent and teacher questionnaires",
        "Direct assessment of reading, writing, and math skills",
        "Cognitive and achievement testing",
        "Comprehensive report with grade-level comparisons",
      ],
      whoIsItFor: [
        "Children struggling with reading or writing",
        "Students with persistent math difficulties",
        "Children whose grades don't reflect their effort",
        "Students needing school accommodations documentation",
        "Children with suspected ADHD, dyslexia, or autism",
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
    content: {
      overview: "We focus not just on how a child speaks, but on why they communicate, how they feel while doing so, and how communication can become meaningful for them. Our approach integrates speech clarity, language understanding, fluency, and social communication naturally into play, interaction, and everyday experiences—rather than isolating them into rigid drills.\n\nBy blending therapeutic expertise with a relationship-based, child-led approach, we help children move from pressure to comfort, and from hesitation to confident expression.",
      benefits: [
        "Confident communication across home, school, and social settings.",
        "Clearer speech that is easily understood by family, peers, and teachers.",
        "Enhanced ability to follow instructions and process language.",
        "Stronger social skills, helping them build meaningful friendships.",
        "Reduced frustration by giving them alternative ways to express needs.",
        "A foundation for better reading, writing, and academic success."
      ],
      whatToExpect: [
        "A gentle, observation-based initial assessment of your child’s communication profile.",
        "Individualized goals aligned with your child’s readiness and unique strengths.",
        "Play-based, interaction-driven therapy sessions that feel like fun, not \"work.\"",
        "Ongoing parent guidance and support to help you understand your child’s progress.",
        "Practical tools and home strategies for everyday communication.",
        "A collaborative approach with other therapies or schools, if applicable."
      ],
      whoIsItFor: [
        "Speech delays or limited speech for their age.",
        "Difficulty being understood by people outside the family.",
        "Struggling to follow simple instructions or understand questions.",
        "Repeating words or sounds (stuttering) or avoiding talking.",
        "Difficulty initiating or sustaining communication with peers.",
        "Neurodivergent children (Autism/ADHD) needing communication support."
      ],
      duration: "45-minute sessions, typically weekly",
      format: "In-person or online options available",
      audienceSections: [
        {
          audienceType: "children",
          title: "Speech Therapy for Children",
          hero: {
            shortDescription: "At Divit MindSpace, we see communication as more than a skill—it is a child’s way of connecting with the world, expressing emotions, and building relationships.",
            overview: "",
          },
          contentBlocks: [
            {
              _type: "clinicalIndexBlock",
              _key: "supported-needs",
              title: "Communication Needs We Support",
              intro: "Our Speech Therapy program supports children with a range of communication needs, including:",
              groups: [
                {
                  heading: "Speech & Language Development",
                  items: [
                    "Speech delays, limited speech, or unclear pronunciation",
                    "Difficulty understanding or expressing words, ideas, or sentences",
                    "Challenges forming complete or grammatically correct sentences"
                  ]
                },
                {
                  heading: "Communication & Interaction",
                  items: [
                    "Difficulty initiating or sustaining communication",
                    "Social communication challenges (verbal and non-verbal)",
                    "Communication differences associated with autism"
                  ]
                },
                {
                  heading: "Fluency & Expression",
                  items: [
                    "Stuttering, repetitions, or interruptions in speech flow"
                  ]
                },
                {
                  heading: "Diverse Communication Needs",
                  items: [
                    "Non-verbal or minimally verbal children",
                    "Children with hearing-related communication needs",
                    "Developmental differences such as Down syndrome, cerebral palsy, and related conditions"
                  ]
                }
              ]
            }
          ],
          benefits: [
            "Confident communication across home, school, and social settings.",
            "Clearer speech that is easily understood by family, peers, and teachers.",
            "Enhanced ability to follow instructions and process language.",
            "Stronger social skills, helping them build meaningful friendships.",
            "Reduced frustration by giving them alternative ways to express needs.",
            "A foundation for better reading, writing, and academic success."
          ],
          expectations: [
            "Clinical Profile — A gentle, observation-based initial assessment of your child’s communication profile.",
            "Individualized Goals — Goals aligned with your child’s readiness and unique strengths.",
            "Meaningful Interaction — Play-based, interaction-driven therapy sessions that feel like fun, not \"work.\"",
            "Parent Partnership — Ongoing guidance and support to help you understand your child’s progress.",
            "Daily Tools — Practical tools and home strategies for everyday communication.",
            "Collaboration — A collaborative approach with other therapies or schools, if applicable."
          ],
          expectationsIntro: "Our Speech Therapy program follows a structured yet flexible approach to support your child’s journey:",
          whoIsItFor: [
            "Speech delays or limited speech for their age.",
            "Difficulty being understood by people outside the family.",
            "Struggling to follow simple instructions or understand questions.",
            "Repeating words or sounds (stuttering) or avoiding talking.",
            "Difficulty initiating or sustaining communication with peers.",
            "Neurodivergent children (Autism/ADHD) needing communication support."
          ],
          approachItems: [
            "Child-Led, Relationship-Based: We follow the child’s interests to create meaningful communication opportunities.",
            "Play as a Medium: Communication is built through play, interaction, and shared experiences.",
            "Neurodiversity-Affirming: We honor each child's unique communication style and pace.",
            "Family-Centered: We empower parents with tools to support communication in daily life."
          ],
          whyChooseItems: [
            "Personalized Care: Strategies tailored to your child's specific profile.",
            "Expert Therapists: Experienced professionals specializing in neurodevelopment.",
            "Natural Environment: Therapy that feels like play in a comfortable setting.",
            "Evidence-Based: Using proven methods like Hanen and Social Thinking."
          ],
        }
      ],
      additionalSections: [
        {
          title: "Why Communication Matters",
          intro: "Communication is the heartbeat of human connection. It's how we share our world, express our needs, and build relationships.",
          items: [
            "Emotional Regulation: Giving words to feelings reduces frustration.",
            "Academic Foundation: Strong language skills are essential for reading and writing.",
            "Social Connection: Communication is the key to making and keeping friends.",
            "Confidence & Autonomy: Being understood empowers a child to navigate their world."
          ],
          color: "sage"
        }
      ],
    },
  },
  {
    id: "4",
    title: "Occupational Therapy",
    slug: "occupational-therapy",
    description: "Every child needs essential daily life skills to grow with confidence and independence. When a child struggles with motor skills, coordination, sensory processing, or routine activities, occupational therapy can help.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "Occupational therapy helps children, adolescents, and adults build motor skills, improve sensory processing, and gain independence—supporting confidence in daily activities, school, work, and life. At Divit MindSpace, we see independence as more than a skill—it is a person’s ability to engage with the world, participate in daily life, and feel confident in their own abilities.\n\nWe focus not just on what a person can or cannot do, but on how they experience everyday activities, what may be holding them back, and how we can make these experiences meaningful and achievable.\n\nWe look at development as a whole, including:\n\nFine motor skills (hand use, writing, precision)\nGross motor coordination (balance, movement, strength)\nSensory processing (how the body understands and responds to input)\nDaily living skills (self-care, routines, independence)\n\nOur approach integrates these areas naturally into play, real-life tasks, and meaningful activities—rather than isolating them into repetitive exercises.",
      audienceSections: [
        {
          audienceType: "children",
          title: "Children",
          hero: {
            shortDescription: "Play-based, engaging activities that make learning feel natural and enjoyable—while building foundational motor, sensory, and self-care skills.",
            overview: "We look at development as a whole, including:\n\nFine motor skills (hand use, writing, precision)\nGross motor coordination (balance, movement, strength)\nSensory processing (how the body understands and responds to input)\nDaily living skills (self-care, routines, independence)",
          },
          contentBlocks: [
            {
              _type: "duoGridBlock",
              _key: "ot-children-gain-expectations",
              leftColumn: {
                title: "What You Will Gain",
                items: [
                  "Improved strength, coordination, and motor control",
                  "Better sensory regulation and body awareness",
                  "Increased independence in daily activities",
                  "Enhanced focus, planning, and task completion",
                  "Greater participation in school, work, and play",
                  "Reduced frustration in everyday tasks",
                  "Stronger confidence and self-reliance"
                ],
                style: "tick"
              },
              rightColumn: {
                title: "What to Expect",
                items: [
                  "A comprehensive, observation-based assessment",
                  "Individualized goals aligned with developmental needs",
                  "Activity-based, engaging therapy sessions",
                  "Practical strategies for home and daily routines",
                  "Ongoing parent and caregiver guidance",
                  "Collaboration with other therapies (if applicable)"
                ],
                style: "tick"
              }
            },
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
            },
            {
              _type: "clinicalIndexBlock",
              _key: "ot-needs-support",
              title: "Needs We Support",
              intro: "Our Occupational Therapy program supports individuals across age groups with a wide range of needs:",
              groups: [
                {
                  heading: "Motor Development",
                  items: [
                    "Difficulty with fine motor skills (writing, buttoning, grip)",
                    "Challenges with balance, coordination, or physical movement",
                    "Delays in motor milestones"
                  ]
                },
                {
                  heading: "Sensory Processing",
                  items: [
                    "Over- or under-sensitivity to sounds, textures, or movement",
                    "Difficulty staying regulated or attentive",
                    "Sensory-seeking or sensory-avoidant behaviors"
                  ]
                },
                {
                  heading: "Daily Living & Independence",
                  items: [
                    "Challenges with dressing, grooming, feeding, or toileting",
                    "Difficulty managing routines and everyday tasks",
                    "Delays in age-appropriate independence"
                  ]
                },
                {
                  heading: "Attention & Regulation",
                  items: [
                    "Difficulty with focus, planning, and task completion",
                    "Impulse control and executive functioning challenges",
                    "Emotional and behavioral regulation difficulties"
                  ]
                },
                {
                  heading: "Developmental & Neurological Differences",
                  items: [
                    "Autism Spectrum differences",
                    "ADHD",
                    "Learning challenges",
                    "Conditions such as Down syndrome, cerebral palsy, and related needs"
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
          ]
        },
        {
          audienceType: "teens",
          title: "Adolescents",
          hero: {
            shortDescription: "Practical, real-life skill building focused on independence, organization, social participation, and transition readiness.",
            overview: "At Divit MindSpace, we see independence as more than a skill—it is a person’s ability to engage with the world, participate in daily life, and feel confident in their own abilities.",
          },
          contentBlocks: [
            {
              _type: "duoGridBlock",
              _key: "ot-teens-gain-expectations",
              leftColumn: {
                title: "What You Will Gain",
                items: [
                  "Improved strength, coordination, and motor control",
                  "Better sensory regulation and body awareness",
                  "Increased independence in daily activities",
                  "Enhanced focus, planning, and task completion",
                  "Greater participation in school, work, and play",
                  "Reduced frustration in everyday tasks",
                  "Stronger confidence and self-reliance"
                ],
                style: "tick"
              },
              rightColumn: {
                title: "What to Expect",
                items: [
                  "A comprehensive, observation-based assessment",
                  "Individualized goals aligned with developmental needs",
                  "Activity-based, engaging therapy sessions",
                  "Practical strategies for home and daily routines",
                  "Ongoing parent and caregiver guidance",
                  "Collaboration with other therapies (if applicable)"
                ],
                style: "tick"
              }
            },
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
          ]
        },
        {
          audienceType: "adults",
          title: "Adults",
          hero: {
            shortDescription: "Goal-oriented, functional therapy to enhance daily productivity, independence, and quality of life.",
            overview: "We focus not just on what a person can or cannot do, but on how they experience everyday activities, what may be holding them back, and how we can make these experiences meaningful and achievable.",
          },
          contentBlocks: [
            {
              _type: "duoGridBlock",
              _key: "ot-adults-gain-expectations",
              leftColumn: {
                title: "What You Will Gain",
                items: [
                  "Improved strength, coordination, and motor control",
                  "Better sensory regulation and body awareness",
                  "Increased independence in daily activities",
                  "Enhanced focus, planning, and task completion",
                  "Greater participation in school, work, and play",
                  "Reduced frustration in everyday tasks",
                  "Stronger confidence and self-reliance"
                ],
                style: "tick"
              },
              rightColumn: {
                title: "What to Expect",
                items: [
                  "A comprehensive, observation-based assessment",
                  "Individualized goals aligned with developmental needs",
                  "Activity-based, engaging therapy sessions",
                  "Practical strategies for home and daily routines",
                  "Ongoing parent and caregiver guidance",
                  "Collaboration with other therapies (if applicable)"
                ],
                style: "tick"
              }
            },
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
          ]
        }
      ],
      additionalSections: [
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
    description: "Every child expresses emotions differently. Sometimes, challenging behaviors are not defiance — but a way of communicating unmet needs, frustration, or difficulty coping.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "Every child expresses emotions differently. Sometimes, challenging behaviors are not defiance — but a way of communicating unmet needs, frustration, or difficulty coping. Our Behavioral Therapy program is designed to help children develop positive behaviors, emotional regulation skills, and healthier responses to everyday situations. At Divit MindSpace, we focus on understanding the reason behind the behavior — not just correcting it.",
      benefits: [
        "Reduction in challenging behaviors",
        "Development of emotional regulation skills",
        "Improved impulse control",
        "Better social behaviors and interactions",
        "Parent guidance and training for consistency",
      ],
      whatToExpect: [
        "Identifying triggers and behavioral patterns",
        "Teaching emotional awareness",
        "Building coping mechanisms",
        "Positive reinforcement strategies",
        "Consistent progress monitoring",
      ],
      whoIsItFor: [
        "Children with frequent tantrums or meltdowns",
        "Children struggling with anger management",
        "Children displaying aggressive behavior",
        "Children finding it hard to follow rules",
        "Children diagnosed with ADHD, Autism, or developmental conditions",
      ],
      duration: "45-60 minute sessions",
      format: "In-person, home-based, or center-based",
    },
  },
  {
    id: "6",
    title: "Group Therapy Sessions",
    slug: "group-therapy-sessions",
    description: "Our Group Therapy Sessions are designed to help children develop essential social, emotional, and communication skills in a structured and supportive group setting.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "Our Group Therapy Sessions are designed to help children develop essential social, emotional, and communication skills in a structured and supportive group setting. Children learn best when they interact with peers, and group therapy provides the perfect environment for practicing real-world social skills with guidance from trained therapists.",
      benefits: [
        "Practice social skills with same-age peers",
        "Learn friendship and conversation skills",
        "Build confidence in social situations",
        "Develop perspective-taking abilities",
        "Make genuine peer connections",
      ],
      whatToExpect: [
        "Small groups of 4-6 children",
        "Structured curriculum targeting specific skills",
        "Fun, engaging activities and games",
        "Practice opportunities with peer feedback",
        "Parent updates on skills being learned",
      ],
      whoIsItFor: [
        "Children with autism spectrum disorder",
        "Children struggling to make friends",
        "Children with social anxiety",
        "Children who misread social cues",
        "Children needing peer interaction practice",
      ],
      duration: "60-minute weekly sessions (8-12 week programs)",
      format: "In-person small group at our center",
    },
  },
  {
    id: "12",
    title: "Cognitive Therapy",
    slug: "cognitive-therapy",
    description: "Cognitive therapy helps neurodivergent individuals recognize the connection between thoughts, feelings, and behaviors — building practical coping skills for anxiety, emotional regulation, and daily challenges.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "Cognitive therapy helps neurodivergent individuals understand and reshape the connection between their thoughts, feelings, and behaviors. At Divit MindSpace, we use adapted, neurodiversity-affirming approaches that are concrete, experiential, and tailored to each individual's unique way of processing the world. Our goal isn't to change who you are — it's to help you develop practical skills for managing anxiety, regulating emotions, and navigating daily challenges with confidence.",
      benefits: [
        "Better understanding of thought-feeling-behavior connections",
        "Practical coping strategies for anxiety and stress",
        "Improved emotional regulation skills",
        "Enhanced problem-solving abilities",
        "Greater self-awareness and self-compassion",
      ],
      whatToExpect: [
        "Initial assessment of current challenges and goals",
        "Concrete, visual, and experiential therapeutic techniques",
        "Practical skill-building exercises adapted for neurodivergent minds",
        "Homework activities to practice skills between sessions",
        "Regular progress review and goal adjustment",
      ],
      whoIsItFor: [
        "Children, teens, and adults with anxiety",
        "Individuals with autism seeking coping strategies",
        "Those with ADHD struggling with emotional regulation",
        "Anyone experiencing negative thought patterns",
        "Neurodivergent individuals facing social or daily life challenges",
      ],
      duration: "50-60 minute sessions, typically weekly",
      format: "In-person or online",
    },
  },
  {
    id: "13",
    title: "Play Therapy",
    slug: "play-therapy",
    description: "Play is the natural language of children. Through guided play, neurodivergent children explore emotions, develop social skills, and process experiences in a safe, affirming environment.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "Play is the natural language of all children, regardless of diagnosis or developmental differences. At Divit MindSpace, our Play Therapy services provide a safe, affirming space where neurodivergent children can express thoughts and feelings that may be difficult to put into words. Through child-led play, sand tray therapy, creative arts, and structured activities, children develop emotional regulation, social skills, and self-expression — all while doing what comes naturally: playing.",
      benefits: [
        "Safe expression of difficult emotions through play",
        "Improved emotional regulation and self-awareness",
        "Enhanced social and communication skills",
        "Better processing of sensory experiences",
        "Strengthened parent-child relationships through guided play",
      ],
      whatToExpect: [
        "Child-led, non-directive play sessions",
        "Use of sand tray, art materials, puppets, and sensory toys",
        "Neurodiversity-affirming therapeutic approach",
        "Parent coaching for play-based connection at home",
        "Regular feedback on your child's progress and themes",
      ],
      whoIsItFor: [
        "Children with autism spectrum conditions",
        "Children with ADHD or attention challenges",
        "Children struggling with anxiety or emotional expression",
        "Children who have experienced trauma or transitions",
        "Children with communication or social difficulties",
      ],
      duration: "45-50 minute sessions, typically weekly",
      format: "In-person at our child-friendly therapy room",
    },
  },
  {
    id: "14",
    title: "Sensory Integration Program",
    slug: "sensory-integration-program",
    description: "For individuals who experience the world differently through their senses — helping them process, organize, and respond to sensory input for better daily functioning and comfort.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "Many neurodivergent individuals experience the world differently through their senses — sounds may feel overwhelming, textures uncomfortable, or movement either calming or distressing. Our Sensory Integration Program, led by trained occupational therapists, helps children and adults better process and respond to sensory information. Using specialized equipment in our sensory gym, we work on improving sensory modulation, body awareness, and adaptive responses for better daily functioning.",
      benefits: [
        "Improved ability to process sensory information",
        "Better regulation of sensory seeking or avoiding behaviors",
        "Enhanced focus and attention for learning",
        "Greater comfort in everyday environments",
        "Improved motor coordination and body awareness",
      ],
      whatToExpect: [
        "Comprehensive sensory profile assessment",
        "Individualized sensory diet and intervention plan",
        "Sessions in our sensory gym with specialized equipment",
        "Activities using swings, weighted materials, tactile tools",
        "Home sensory strategies for parents and caregivers",
      ],
      whoIsItFor: [
        "Children and adults with sensory processing differences",
        "Individuals with autism (90-95% experience sensory challenges)",
        "Those with ADHD and sensory sensitivities",
        "Children who are sensory seekers or avoiders",
        "Anyone struggling with sensory overload in daily life",
      ],
      duration: "45-minute sessions, 1-2 times weekly",
      format: "In-person at our sensory-equipped center",
    },
  },
  {
    id: "15",
    title: "Brain Gym",
    slug: "brain-gym",
    description: "Movement-based exercises that integrate brain-body connections — improving focus, coordination, memory, and learning readiness through simple, targeted activities.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "Brain Gym uses 26 specially designed movement exercises that support brain-body integration, helping individuals improve focus, coordination, memory, and learning readiness. Based on Educational Kinesiology principles, these simple activities — including cross-lateral movements, lazy eights, and PACE exercises — help activate both hemispheres of the brain and support primitive reflex integration. At Divit MindSpace, we incorporate Brain Gym as part of a holistic approach to supporting neurodivergent learners.",
      benefits: [
        "Improved focus, concentration, and attention",
        "Better hand-eye coordination and motor skills",
        "Enhanced reading, writing, and learning readiness",
        "Reduced stress and improved emotional regulation",
        "Support for primitive reflex integration",
      ],
      whatToExpect: [
        "Assessment of coordination and learning challenges",
        "Introduction to core Brain Gym movements",
        "PACE exercises for learning readiness",
        "Fun, engaging movement sessions",
        "Take-home exercises for daily practice",
      ],
      whoIsItFor: [
        "Children with learning difficulties or dyslexia",
        "Individuals with ADHD or attention challenges",
        "Those with coordination or motor planning difficulties",
        "Children struggling with reading or writing",
        "Anyone seeking to improve focus through movement",
      ],
      duration: "30-45 minute sessions",
      format: "In-person, individual or small group",
    },
  },

  // ============================================================================
  // GUIDANCE
  // ============================================================================
  {
    id: "7",
    title: "Counselling (Child, Adolescent, Adult & Parent)",
    slug: "counselling",
    description: "Neurodiversity-affirming counselling for every stage of life — supporting children, teenagers, adults, and parents in navigating emotions, relationships, and the unique challenges of neurodivergent experiences.",
    category: "guidance",
    image: "/features-service-card/adult-counseling.png",
    content: {
      overview: "At Divit MindSpace, we offer neurodiversity-affirming counselling services for individuals and families across all life stages. Whether you're a child learning to understand your emotions, a teenager navigating academic and social pressures, an adult managing life's complexities, or a parent seeking support — our trained counsellors provide a safe, confidential space to explore feelings, develop coping strategies, and build emotional resilience. We don't aim to change who you are; we help you thrive as yourself.",
      benefits: [
        "Safe, non-judgmental space to express emotions",
        "Neurodiversity-affirming therapeutic approaches",
        "Improved emotional regulation and coping skills",
        "Better understanding of self and relationships",
        "Support for the entire family system",
      ],
      whatToExpect: [
        "Age-appropriate counselling approaches (play-based for children)",
        "Confidential individual or family sessions",
        "Evidence-based, neurodiversity-affirming techniques",
        "Collaborative goal-setting and progress tracking",
        "Parent coaching and family involvement as needed",
      ],
      whoIsItFor: [
        "Children struggling with emotions, anxiety, or transitions",
        "Teenagers facing academic, social, or identity challenges",
        "Adults managing stress, relationships, or neurodivergent experiences",
        "Parents needing support in raising neurodivergent children",
        "Families seeking to improve communication and connection",
      ],
      duration: "45-60 minute sessions (varies by age)",
      format: "In-person or online",
    },
  },
  {
    id: "8",
    title: "Training Program (Shadow Teacher Training)",
    slug: "training-program-shadow-teacher-training-program",
    description: "We believe every child deserves the right support in mainstream classrooms. Our Shadow Teacher Training Program is a comprehensive certification course designed for educators and caregivers.",
    category: "programs",
    image: "/features-service-card/parent-education.png",
    content: {
      overview: "We believe every child deserves the right support in mainstream classrooms. Our Shadow Teacher Training Program is a comprehensive certification course designed for educators, special educators, and caregivers who want to effectively support neurodivergent children in school settings. This program equips participants with practical skills and strategies for inclusive education.",
      benefits: [
        "Comprehensive understanding of neurodevelopmental conditions",
        "Practical classroom support strategies",
        "Behavior management techniques",
        "Communication and collaboration skills",
        "Certification upon completion",
      ],
      whatToExpect: [
        "Theory sessions on child development and learning differences",
        "Practical workshops with role-play scenarios",
        "Case study discussions",
        "Hands-on training with real-world applications",
        "Assessment and certification",
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
    },
  },

  // ============================================================================
  // PROGRAMS
  // ============================================================================
  {
    id: "9",
    title: "Early Intervention Program",
    slug: "early-intervention-program",
    description: "The early years of a child's life are critical for brain development. When developmental delays or early signs of learning differences are identified and addressed promptly, outcomes improve significantly.",
    category: "programs",
    image: "/about_pic1.png",
    content: {
      overview: "The early years of a child's life are critical for brain development. When developmental delays or early signs of learning differences are identified and addressed promptly, outcomes improve significantly. Our Early Intervention Program provides comprehensive support for young children (0-6 years) showing developmental concerns, helping them build a strong foundation for future learning.",
      benefits: [
        "Early identification of developmental concerns",
        "Improved developmental outcomes",
        "Stronger foundation for future learning",
        "Parent empowerment and training",
        "Coordinated multi-disciplinary support",
      ],
      whatToExpect: [
        "Developmental screening and assessment",
        "Individualized intervention plan",
        "Regular therapy sessions across needed areas",
        "Parent coaching and home strategies",
        "Progress monitoring and plan adjustments",
      ],
      whoIsItFor: [
        "Children aged 0-6 years with developmental delays",
        "Children not meeting age-appropriate milestones",
        "Children showing early signs of autism or ADHD",
        "Premature babies or high-risk infants",
        "Parents concerned about their child's development",
      ],
      duration: "Ongoing program with weekly sessions",
      format: "In-person at our center",
    },
  },
  {
    id: "10",
    title: "Special Education & Remedial Sessions",
    slug: "special-education--remedial-sessions",
    description: "Our Special Education and Remedial Sessions are designed to support children who experience learning difficulties, developmental delays, or academic challenges.",
    category: "programs",
    image: "/about_pic2.png",
    content: {
      overview: "Our Special Education and Remedial Sessions are designed to support children who experience learning difficulties, developmental delays, or academic challenges. Using specialized teaching methods and individualized attention, we help children build academic skills at their own pace while addressing underlying learning differences.",
      benefits: [
        "Individualized education plan (IEP) for each child",
        "Specialized teaching methods and materials",
        "Targeted remediation of academic gaps",
        "Building foundational literacy and numeracy skills",
        "Improved confidence and motivation to learn",
      ],
      whatToExpect: [
        "Initial assessment of learning needs",
        "Development of individualized goals",
        "Regular one-on-one or small group sessions",
        "Use of multi-sensory teaching approaches",
        "Regular progress reports for parents",
      ],
      whoIsItFor: [
        "Children with learning disabilities",
        "Children falling behind in academics",
        "Children with dyslexia, dyscalculia, or dysgraphia",
        "Children needing individualized instruction",
        "Students struggling in mainstream classrooms",
      ],
      duration: "45-60 minute sessions, 2-3 times weekly",
      format: "In-person at our center",
    },
  },
  {
    id: "11",
    title: "School Readiness Program",
    slug: "school-readiness-program",
    description: "Starting school is a major milestone in a child's life. For many children, especially those with developmental or learning challenges, the transition can feel overwhelming.",
    category: "programs",
    image: "/about_pic3.png",
    content: {
      overview: "Starting school is a major milestone in a child's life. For many children, especially those with developmental or learning challenges, the transition can feel overwhelming. Our School Readiness Program prepares children for this important step by building the foundational skills they need to thrive in a classroom environment.",
      benefits: [
        "Smooth transition to formal schooling",
        "Development of pre-academic skills",
        "Improved attention and focus",
        "Better social skills for classroom settings",
        "Increased confidence and independence",
      ],
      whatToExpect: [
        "Assessment of school readiness skills",
        "Structured group sessions simulating classroom environment",
        "Focus on pre-literacy and pre-numeracy skills",
        "Social skills training for peer interactions",
        "Parent guidance for supporting transition at home",
      ],
      whoIsItFor: [
        "Children preparing to start formal school",
        "Children with developmental delays entering school",
        "Children who missed preschool experiences",
        "Children anxious about starting school",
        "Children aged 4-6 years",
      ],
      duration: "6-8 week program with regular sessions",
      format: "In-person small group at our center",
    },
  },
  {
    id: "16",
    title: "Parental Training Program",
    slug: "parental-training-program",
    description: "Parenting a neurodivergent child doesn't come with a guide — we help families build one that works. Evidence-based strategies for understanding your child's unique wiring and needs.",
    category: "programs",
    image: "/features-service-card/parent-education.png",
    content: {
      overview: "Parenting a neurodivergent child is a journey that requires understanding, patience, and the right strategies. Our Parental Training Program empowers parents and caregivers with evidence-based knowledge and practical skills to support their child's unique needs. Through structured sessions, we help you understand your child's wiring, manage challenging behaviors, support emotional regulation, and advocate effectively — so you can parent with confidence, not confusion.",
      benefits: [
        "Deep understanding of your child's neurodivergent profile",
        "Practical behavior management strategies that work",
        "Skills for supporting emotional regulation at home",
        "Improved parent-child communication and connection",
        "Confidence in advocating for your child's needs",
      ],
      whatToExpect: [
        "Group sessions with other parents on similar journeys",
        "One-on-one coaching for personalized guidance",
        "Evidence-based curriculum covering key parenting strategies",
        "Practical tools and resources to use at home",
        "Ongoing support and community connection",
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
    },
  },
  {
    id: "17",
    title: "ECCE (Early Childhood Care and Education)",
    slug: "ecce-early-childhood-care-and-education",
    description: "Foundational early learning program for children aged 3-6, with specialized support for neurodivergent learners — building school readiness through play-based, developmentally appropriate education.",
    category: "programs",
    image: "/about_pic1.png",
    content: {
      overview: "The early years are the foundation for lifelong learning. Our ECCE program provides developmentally appropriate, play-based education for children aged 3-6, with specialized support for neurodivergent learners. Aligned with the National Education Policy 2020 framework, we focus on foundational literacy, numeracy, social-emotional development, and school readiness — all in a sensory-friendly, inclusive environment that honors each child's unique pace and learning style.",
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
    description: "Entry-level professional certification for individuals seeking to support neurodivergent learners — comprehensive training in understanding and supporting diverse learning needs.",
    category: "programs",
    image: "/features-service-card/parent-education.png",
    content: {
      overview: "Our Certificate in Special Education provides foundational training for individuals who want to support neurodivergent learners effectively. This comprehensive program covers neurodevelopmental conditions including autism, ADHD, and learning disabilities, along with practical strategies for classroom support, behavior management, and inclusive education. Whether you're a parent seeking deeper knowledge, an aspiring special educator, or a professional wanting to upskill, this certification equips you with essential skills and understanding.",
      benefits: [
        "Comprehensive understanding of neurodevelopmental conditions",
        "Practical classroom and home support strategies",
        "Behavior management and communication techniques",
        "Foundation for career in special education",
        "Certificate of completion for professional development",
      ],
      whatToExpect: [
        "Theory sessions on autism, ADHD, learning disabilities",
        "Practical workshops and case study discussions",
        "Hands-on training with real-world applications",
        "Assessment and evaluation components",
        "Certificate upon successful completion",
      ],
      whoIsItFor: [
        "Aspiring special educators and shadow teachers",
        "Parents wanting deeper understanding of their child's needs",
        "School staff and mainstream teachers",
        "Caregivers working with neurodivergent individuals",
        "Anyone seeking foundational special education knowledge",
      ],
      duration: "3-6 month program",
      format: "In-person or blended learning",
    },
  },
  {
    id: "19",
    title: "Diploma in Special Education",
    slug: "diploma-in-special-education",
    description: "Comprehensive two-year professional qualification preparing special educators to work with neurodivergent children and adults across educational and therapeutic settings.",
    category: "programs",
    image: "/features-service-card/parent-education.png",
    content: {
      overview: "Our Diploma in Special Education is a comprehensive professional qualification designed to prepare educators for rewarding careers supporting neurodivergent learners. This rigorous program covers intellectual and developmental disabilities (IDD), autism spectrum conditions, specific learning disabilities, and evidence-based intervention strategies. With extensive theory and practical training, graduates are equipped to work in schools, therapy centers, rehabilitation settings, and inclusive education environments.",
      benefits: [
        "Professional qualification recognized in the field",
        "In-depth knowledge of diverse neurodevelopmental conditions",
        "Extensive practical training and hands-on experience",
        "Career opportunities in schools, centers, and NGOs",
        "Skills to create individualized education programs (IEPs)",
      ],
      whatToExpect: [
        "Comprehensive curriculum covering IDD, autism, and learning disabilities",
        "Theory sessions combined with practical placements",
        "Case studies, assessments, and supervised practice",
        "Training in specialized teaching methodologies",
        "Final assessment and diploma certification",
      ],
      whoIsItFor: [
        "10+2 graduates seeking special education careers",
        "Teachers wanting to specialize in inclusive education",
        "Professionals transitioning to special education field",
        "Individuals committed to supporting neurodivergent learners",
        "Those seeking recognized professional qualification",
      ],
      duration: "2-year program (4 semesters)",
      format: "In-person with practical placements",
    },
  },
  {
    id: "20",
    title: "NIOS Support Program",
    slug: "nios-support-program",
    description: "Personalized academic support for neurodivergent learners pursuing education through NIOS — flexible, self-paced learning with accommodations that honor each student's unique needs.",
    category: "programs",
    image: "/about_pic2.png",
    content: {
      overview: "The National Institute of Open Schooling (NIOS) offers a lifeline for neurodivergent learners who thrive outside traditional classroom settings. Our NIOS Support Program provides personalized academic coaching, exam preparation, and advocacy support for students pursuing secondary and senior secondary education through NIOS. We help with subject selection, accommodation documentation, remedial support, and life skills integration — ensuring every student can achieve their academic goals at their own pace.",
      benefits: [
        "Flexible, self-paced academic support",
        "Help navigating NIOS accommodations and exemptions",
        "Personalized tutoring aligned with NIOS curriculum",
        "Exam preparation with appropriate strategies",
        "Integration of life skills alongside academics",
      ],
      whatToExpect: [
        "Individual academic assessment and planning",
        "One-on-one or small group tutoring sessions",
        "Support with accommodation applications and documentation",
        "Subject-specific coaching and exam strategies",
        "Regular progress monitoring and parent updates",
      ],
      whoIsItFor: [
        "Neurodivergent teens and adults pursuing NIOS education",
        "School dropouts seeking alternative education pathways",
        "Students with learning disabilities needing flexible options",
        "Those who struggled in mainstream school settings",
        "Learners requiring self-paced academic support",
      ],
      duration: "Ongoing support aligned with NIOS academic calendar",
      format: "In-person or online tutoring",
    },
  },
  {
    id: "21",
    title: "Summer Camp",
    slug: "summer-camp",
    description: "A structured, fun-filled program where neurodivergent children and teens build confidence, friendships, and life skills through therapeutic recreation and peer connection.",
    category: "programs",
    image: "/about_pic3.png",
    content: {
      overview: "Summer should be a time of growth, connection, and fun — for every child. Our Summer Camp is designed specifically for neurodivergent children and teens, providing a structured yet joyful environment where they can build social skills, make genuine friendships, and develop confidence through therapeutic recreation. With low staff-to-camper ratios, sensory-friendly activities, and trained facilitators, we create a space where neurodivergent kids can truly be themselves while learning essential life skills.",
      benefits: [
        "Social skill development in a supportive peer environment",
        "Genuine friendships with like-minded peers",
        "Confidence building through achievable challenges",
        "Structured fun in a sensory-friendly setting",
        "Skill-building in a non-academic environment",
      ],
      whatToExpect: [
        "Themed daily activities including arts, games, and outdoor fun",
        "Social skills groups integrated into camp activities",
        "Sensory-friendly environment and accommodations",
        "Low staff-to-camper ratios for individualized support",
        "End-of-camp celebration and progress sharing with parents",
      ],
      whoIsItFor: [
        "Children and teens aged 6-16 with autism or ADHD",
        "Neurodivergent kids who struggle in typical camp settings",
        "Children seeking peer connections during summer break",
        "Those who benefit from structured recreational activities",
        "Families wanting summer enrichment with therapeutic value",
      ],
      duration: "2-4 week summer program",
      format: "In-person day camp at our center",
    },
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesByCategory(category: string): ServiceData[] {
  if (category === "all") return services;
  return services.filter((service) => service.category === category);
}
