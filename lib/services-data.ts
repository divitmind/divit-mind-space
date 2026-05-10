import { type Specialist } from "@/sanity/types";

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
      }[];
    }[];
    approachItems?: string[];
    whyChooseItems?: string[];
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
    description: "Our psychometric assessments are designed to gently and accurately understand your **child**'s learning style, strengths, and areas where they may need additional support.",
    category: "assessments",
    image: "/features-service-card/child-autism-assessment.png",
    content: {
      overview: "Our psychometric assessments are designed to gently and accurately understand your **child**'s learning style, strengths, and areas where they may need additional support. These assessments help identify cognitive abilities, emotional patterns, and developmental needs to create a clear roadmap for your **child**'s growth.",
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
    description: "At Divit MindSpace, we see communication as more than a skill—it is a **child**’s way of connecting with the world, expressing emotions, and building relationships.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "We focus not just on how a **child** speaks, but on why they communicate, how they feel while doing so, and how communication can become meaningful for them. Our approach integrates speech clarity, language understanding, fluency, and social communication naturally into play, interaction, and everyday experiences—rather than isolating them into rigid drills.\n\nBy blending therapeutic expertise with a relationship-based, **child**-led approach, we help **children** move from pressure to comfort, and from hesitation to confident expression.",
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
    description: "Play is the natural language of **children**. Through guided play, neurodivergent **children** explore emotions, develop social skills, and process experiences in a safe, affirming environment.",
    category: "therapy",
    image: "/features-service-card/therapy-services.png",
    content: {
      overview: "Play is the natural language of all **children**, regardless of diagnosis or developmental differences. At Divit MindSpace, our Play Therapy services provide a safe, affirming space where neurodivergent **children** can express thoughts and feelings that may be difficult to put into words. Through **child**-led play, sand tray therapy, creative arts, and structured activities, **children** develop emotional regulation, social skills, and self-expression — all while doing what comes naturally: playing.",
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
      overview: "Many neurodivergent individuals experience the world differently through their senses — sounds may feel overwhelming, textures uncomfortable, or movement either calming or distressing. Our Sensory Integration Program, led by trained occupational therapists, helps **children** and **adults** better process and respond to sensory information. Using specialized equipment in our sensory gym, we work on improving sensory modulation, body awareness, and adaptive responses for better daily functioning.",
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
    description: "We believe every **child** deserves the right support in mainstream classrooms. Our Shadow Teacher Training Program is a comprehensive certification course designed for educators and caregivers.",
    category: "programs",
    image: "/features-service-card/parent-education.png",
    content: {
      overview: "We believe every **child** deserves the right support in mainstream classrooms. Our Shadow Teacher Training Program is a comprehensive certification course designed for educators, special educators, and caregivers who want to effectively support neurodivergent **children** in school settings. This program equips participants with practical skills and strategies for inclusive education.",
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
    description: "The early years of a **child**'s life are critical for brain development. When developmental delays or early signs of learning differences are identified and addressed promptly, outcomes improve significantly.",
    category: "programs",
    image: "/about_pic1.png",
    content: {
      overview: "The early years of a **child**'s life are critical for brain development. When developmental delays or early signs of learning differences are identified and addressed promptly, outcomes improve significantly. Our Early Intervention Program provides comprehensive support for young **children** (0-6 years) showing developmental concerns, helping them build a strong foundation for future learning.",
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
    description: "Our Special Education and Remedial Sessions are designed to support **children** who experience learning difficulties, developmental delays, or academic challenges.",
    category: "programs",
    image: "/about_pic2.png",
    content: {
      overview: "Our Special Education and Remedial Sessions are designed to support **children** who experience learning difficulties, developmental delays, or academic challenges. Using specialized teaching methods and individualized attention, we help **children** build academic skills at their own pace while addressing underlying learning differences.",
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
    description: "Starting school is a major milestone in a **child**'s life. For many **children**, especially those with developmental or learning challenges, the transition can feel overwhelming.",
    category: "programs",
    image: "/about_pic3.png",
    content: {
      overview: "Starting school is a major milestone in a **child**'s life. For many **children**, especially those with developmental or learning challenges, the transition can feel overwhelming. Our School Readiness Program prepares **children** for this important step by building the foundational skills they need to thrive in a classroom environment.",
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
    description: "Parenting a neurodivergent **child** doesn't come with a guide — we help families build one that works. Evidence-based strategies for understanding your **child**'s unique wiring and needs.",
    category: "programs",
    image: "/features-service-card/parent-education.png",
    content: {
      overview: "Parenting a neurodivergent **child** is a journey that requires understanding, patience, and the right strategies. Our Parental Training Program empowers parents and caregivers with evidence-based knowledge and practical skills to support their **child**'s unique needs. Through structured sessions, we help you understand your **child**'s wiring, manage challenging behaviors, support emotional regulation, and advocate effectively — so you can parent with confidence, not confusion.",
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
    description: "Comprehensive two-year professional qualification preparing special educators to work with neurodivergent **children** and **adults** across educational and therapeutic settings.",
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
    description: "A structured, fun-filled program where neurodivergent **children** and **teens** build confidence, friendships, and life skills through therapeutic recreation and peer connection.",
    category: "programs",
    image: "/about_pic3.png",
    content: {
      overview: "Summer should be a time of growth, connection, and fun — for every **child**. Our Summer Camp is designed specifically for neurodivergent **children** and **teens**, providing a structured yet joyful environment where they can build social skills, make genuine friendships, and develop confidence through therapeutic recreation. With low staff-to-camper ratios, sensory-friendly activities, and trained facilitators, we create a space where neurodivergent kids can truly be themselves while learning essential life skills.",
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
  // Normalize slug for CBT specifically
  const normalizedSlug = (slug === "cognitive-behavioral-therapy-cbt") ? "cbt-cognitive-behavioral-therapy" : slug;
  return services.find((service) => service.slug === normalizedSlug);
}

export function getServicesByCategory(category: string): ServiceData[] {
  if (category === "all") return services;
  return services.filter((service) => service.category === category);
}
