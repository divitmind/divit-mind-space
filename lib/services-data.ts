export interface ServiceData {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: "assessments" | "therapy" | "guidance" | "programs";
  image: string;
  content: {
    overview: string;
    benefits: string[];
    whatToExpect: string[];
    whoIsItFor: string[];
    duration?: string;
    format?: string;
  };
}

export const services: ServiceData[] = [
  // ============================================================================
  // ASSESSMENTS
  // ============================================================================
  {
    id: "1",
    title: "Psychometric Assessment",
    slug: "psychometric-assessment",
    description: "Comprehensive evaluation of cognitive abilities, learning styles, and developmental milestones to understand your child's unique profile.",
    category: "assessments",
    image: "/services/assessment-1.jpg",
    content: {
      overview: "Our Psychometric Assessment provides a comprehensive evaluation of your child's cognitive abilities, intellectual functioning, and developmental profile. Using standardized, internationally recognized tools, we create a detailed picture of your child's strengths and areas that may need support.",
      benefits: [
        "Clear understanding of your child's cognitive strengths and challenges",
        "Detailed written report with actionable recommendations",
        "Personalized strategies for home and school",
        "Identification of learning style preferences",
        "Foundation for educational planning and interventions",
      ],
      whatToExpect: [
        "Initial parent consultation to understand concerns and history",
        "2-3 assessment sessions with your child (child-friendly environment)",
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
    title: "Educational Assessment",
    slug: "educational-assessment",
    description: "Detailed analysis of academic strengths, learning gaps, and educational needs to create personalized learning strategies.",
    category: "assessments",
    image: "/services/assessment-2.jpg",
    content: {
      overview: "Our Educational Assessment focuses specifically on academic skills and learning. We evaluate reading, writing, mathematics, and other academic areas to identify specific learning difficulties such as dyslexia, dyscalculia, or dysgraphia, and create targeted intervention plans.",
      benefits: [
        "Identification of specific learning disabilities",
        "Detailed academic skill profile across subjects",
        "Customized learning strategies and accommodations",
        "Recommendations for school support and IEP planning",
        "Clear roadmap for academic improvement",
      ],
      whatToExpect: [
        "Review of school records and previous assessments",
        "Parent and teacher questionnaires",
        "Direct assessment of reading, writing, and math skills",
        "Analysis of learning patterns and error types",
        "Comprehensive report with grade-level comparisons",
      ],
      whoIsItFor: [
        "Children struggling with reading or writing",
        "Students with persistent math difficulties",
        "Children whose grades don't reflect their effort",
        "Students needing school accommodations documentation",
        "Parents concerned about learning disabilities",
      ],
      duration: "2-3 sessions (60-90 minutes each)",
      format: "In-person at our center",
    },
  },
  {
    id: "3",
    title: "Behavioral Assessment",
    slug: "behavioral-assessment",
    description: "In-depth observation and analysis of behavioral patterns to identify triggers, needs, and effective intervention strategies.",
    category: "assessments",
    image: "/services/assessment-3.jpg",
    content: {
      overview: "Our Behavioral Assessment provides a thorough analysis of your child's behavioral patterns, including challenging behaviors, social interactions, and emotional regulation. We identify underlying causes and triggers to develop effective, positive behavior support strategies.",
      benefits: [
        "Understanding the 'why' behind challenging behaviors",
        "Identification of triggers and patterns",
        "Positive behavior support plan",
        "Strategies for home and school consistency",
        "Improved family dynamics and reduced stress",
      ],
      whatToExpect: [
        "Detailed parent interview about behavioral concerns",
        "Direct observation of child in various settings",
        "Functional behavior analysis",
        "Review of previous interventions and their effectiveness",
        "Comprehensive behavior support plan with strategies",
      ],
      whoIsItFor: [
        "Children with frequent tantrums or meltdowns",
        "Families struggling with challenging behaviors at home",
        "Schools needing behavior intervention plans",
        "Children with attention or impulse control issues",
        "Parents seeking positive discipline strategies",
      ],
      duration: "2-4 sessions including observations",
      format: "In-person with home/school observation options",
    },
  },
  {
    id: "4",
    title: "Developmental Screening",
    slug: "developmental-screening",
    description: "Early identification of developmental delays or concerns to ensure timely intervention and support.",
    category: "assessments",
    image: "/services/assessment-4.jpg",
    content: {
      overview: "Our Developmental Screening is designed for early identification of potential developmental concerns. This quick, comprehensive check evaluates key developmental areas including motor skills, language, social-emotional development, and adaptive behaviors to determine if further evaluation is needed.",
      benefits: [
        "Early identification of developmental concerns",
        "Peace of mind for worried parents",
        "Quick turnaround with clear next steps",
        "Referrals for specialized assessments if needed",
        "Early intervention leads to better outcomes",
      ],
      whatToExpect: [
        "Brief parent questionnaire about developmental history",
        "Structured observation and interaction with child",
        "Screening across all developmental domains",
        "Same-day verbal feedback",
        "Written summary with recommendations within 3 days",
      ],
      whoIsItFor: [
        "Parents with concerns about their child's development",
        "Children not meeting age-appropriate milestones",
        "Pediatrician referrals for developmental concerns",
        "Families wanting routine developmental check-ups",
        "Children aged 0-6 years",
      ],
      duration: "Single session (45-60 minutes)",
      format: "In-person at our center",
    },
  },

  // ============================================================================
  // THERAPY
  // ============================================================================
  {
    id: "5",
    title: "Speech Therapy",
    slug: "speech-therapy",
    description: "Targeted sessions to improve communication skills, language development, and speech clarity for confident expression.",
    category: "therapy",
    image: "/services/therapy-1.jpg",
    content: {
      overview: "Our Speech Therapy services help children develop clear speech, effective communication, and strong language skills. Our licensed speech-language pathologists use evidence-based techniques tailored to each child's needs, whether they're working on articulation, language delays, fluency, or social communication.",
      benefits: [
        "Improved speech clarity and articulation",
        "Enhanced vocabulary and language expression",
        "Better social communication skills",
        "Increased confidence in speaking",
        "Parent training for home practice",
      ],
      whatToExpect: [
        "Initial assessment of speech and language skills",
        "Individualized therapy goals and plan",
        "Weekly therapy sessions (play-based for young children)",
        "Regular progress updates and home practice activities",
        "Collaboration with schools when needed",
      ],
      whoIsItFor: [
        "Children with speech delays or unclear speech",
        "Children with language delays or disorders",
        "Children who stutter or have fluency issues",
        "Children with autism needing communication support",
        "Children with hearing impairment affecting speech",
      ],
      duration: "45-minute sessions, typically weekly",
      format: "In-person or online options available",
    },
  },
  {
    id: "6",
    title: "Occupational Therapy",
    slug: "occupational-therapy",
    description: "Hands-on therapy to develop fine motor skills, sensory processing, and daily living independence.",
    category: "therapy",
    image: "/services/therapy-2.jpg",
    content: {
      overview: "Our Occupational Therapy helps children develop the skills they need for daily life and school success. We work on fine motor skills, sensory processing, self-care abilities, and handwriting through engaging, play-based activities that build confidence and independence.",
      benefits: [
        "Improved fine motor skills and hand strength",
        "Better sensory regulation and processing",
        "Enhanced handwriting and school readiness",
        "Greater independence in self-care tasks",
        "Improved attention and focus for learning",
      ],
      whatToExpect: [
        "Comprehensive OT evaluation",
        "Sensory profile assessment if needed",
        "Individualized therapy plan with specific goals",
        "Fun, engaging therapy sessions",
        "Home program with activities to practice",
      ],
      whoIsItFor: [
        "Children with sensory processing difficulties",
        "Children struggling with handwriting",
        "Children with fine motor delays",
        "Children needing help with self-care skills",
        "Children with coordination difficulties",
      ],
      duration: "45-minute sessions, typically weekly",
      format: "In-person at our sensory-equipped center",
    },
  },
  {
    id: "7",
    title: "Behavior Therapy",
    slug: "behavior-therapy",
    description: "Evidence-based interventions to build positive behaviors, social skills, and emotional regulation.",
    category: "therapy",
    image: "/services/therapy-3.jpg",
    content: {
      overview: "Our Behavior Therapy uses Applied Behavior Analysis (ABA) principles and other evidence-based approaches to help children develop positive behaviors, reduce challenging behaviors, and build essential life skills. We focus on understanding behavior and teaching replacement skills.",
      benefits: [
        "Reduction in challenging behaviors",
        "Development of positive coping strategies",
        "Improved social skills and interactions",
        "Better emotional regulation",
        "Parent training for consistency at home",
      ],
      whatToExpect: [
        "Functional behavior assessment",
        "Individualized behavior intervention plan",
        "Regular therapy sessions with skilled therapists",
        "Data collection to track progress",
        "Parent training and involvement",
      ],
      whoIsItFor: [
        "Children with autism spectrum disorder",
        "Children with ADHD and behavioral challenges",
        "Children with emotional regulation difficulties",
        "Families struggling with challenging behaviors",
        "Children needing social skills development",
      ],
      duration: "Session length varies based on needs",
      format: "In-person, home-based, or center-based",
    },
  },
  {
    id: "8",
    title: "Play Therapy",
    slug: "play-therapy",
    description: "Child-centered therapeutic approach using play to help children express feelings and develop coping skills.",
    category: "therapy",
    image: "/services/therapy-4.jpg",
    content: {
      overview: "Play Therapy is a developmentally appropriate way to help children express their feelings, process experiences, and develop coping skills. Through play, children naturally communicate and work through challenges in a safe, supportive environment with a trained play therapist.",
      benefits: [
        "Safe outlet for expressing difficult emotions",
        "Improved emotional regulation",
        "Enhanced self-esteem and confidence",
        "Better coping skills for anxiety and stress",
        "Strengthened parent-child relationship",
      ],
      whatToExpect: [
        "Initial parent consultation",
        "Child-led play sessions in a specially equipped playroom",
        "Regular parent updates and guidance",
        "Gradual progress toward therapy goals",
        "Closure activities when goals are met",
      ],
      whoIsItFor: [
        "Children experiencing anxiety or fears",
        "Children who have experienced trauma",
        "Children going through family changes (divorce, loss)",
        "Children with behavioral or emotional difficulties",
        "Children who struggle to express feelings verbally",
      ],
      duration: "45-minute sessions, typically weekly",
      format: "In-person in our play therapy room",
    },
  },

  // ============================================================================
  // GUIDANCE
  // ============================================================================
  {
    id: "9",
    title: "Parent Counseling",
    slug: "parent-counseling",
    description: "One-on-one guidance sessions to help parents understand their child's needs and develop effective parenting strategies.",
    category: "guidance",
    image: "/services/guidance-1.jpg",
    content: {
      overview: "Our Parent Counseling provides dedicated support for parents navigating the challenges of raising a neurodivergent child. We offer a safe space to discuss concerns, learn effective strategies, and build confidence in your parenting approach.",
      benefits: [
        "Personalized strategies for your child's needs",
        "Emotional support and validation",
        "Improved understanding of your child's condition",
        "Practical tools for daily challenges",
        "Reduced parental stress and burnout",
      ],
      whatToExpect: [
        "Confidential one-on-one sessions",
        "Discussion of specific challenges you're facing",
        "Evidence-based parenting strategies",
        "Resources and referrals as needed",
        "Ongoing support and follow-up",
      ],
      whoIsItFor: [
        "Parents of newly diagnosed children",
        "Parents feeling overwhelmed or burnt out",
        "Parents seeking specific behavior strategies",
        "Parents wanting to better understand their child",
        "Parents needing emotional support",
      ],
      duration: "60-minute sessions",
      format: "In-person or online",
    },
  },
  {
    id: "10",
    title: "Teacher Training",
    slug: "teacher-training",
    description: "Professional development for educators on inclusive practices and supporting neurodivergent students in the classroom.",
    category: "guidance",
    image: "/services/guidance-2.jpg",
    content: {
      overview: "Our Teacher Training programs equip educators with the knowledge and practical strategies needed to support neurodivergent students effectively. We cover understanding different conditions, classroom accommodations, behavior management, and creating inclusive learning environments.",
      benefits: [
        "Better understanding of neurodevelopmental conditions",
        "Practical classroom strategies and accommodations",
        "Improved classroom management techniques",
        "Tools for differentiating instruction",
        "Increased confidence in supporting diverse learners",
      ],
      whatToExpect: [
        "Customized training based on school needs",
        "Interactive workshops with practical activities",
        "Case study discussions",
        "Resource materials and handouts",
        "Follow-up support and consultation",
      ],
      whoIsItFor: [
        "Classroom teachers seeking inclusion strategies",
        "Special educators wanting updated approaches",
        "School counselors and support staff",
        "School administrators",
        "Teaching assistants and aides",
      ],
      duration: "Half-day or full-day workshops",
      format: "On-site at schools or at our center",
    },
  },
  {
    id: "11",
    title: "School Consultation",
    slug: "school-consultation",
    description: "Expert guidance for schools on creating inclusive environments and implementing support systems.",
    category: "guidance",
    image: "/services/guidance-3.jpg",
    content: {
      overview: "Our School Consultation services help educational institutions develop and implement effective support systems for neurodivergent students. We work with schools to create inclusive policies, train staff, and establish best practices for student support.",
      benefits: [
        "Comprehensive inclusion policy development",
        "Staff capacity building",
        "Individual student support planning",
        "Parent communication strategies",
        "Ongoing expert guidance",
      ],
      whatToExpect: [
        "Initial needs assessment of school",
        "Review of current practices and policies",
        "Customized recommendations and action plan",
        "Staff training and workshops",
        "Ongoing consultation and support",
      ],
      whoIsItFor: [
        "Schools developing inclusion programs",
        "Schools with increasing neurodivergent enrollment",
        "Schools needing IEP development support",
        "Educational institutions seeking expert guidance",
        "Schools wanting to improve support systems",
      ],
      duration: "Varies based on school needs",
      format: "On-site visits and virtual meetings",
    },
  },

  // ============================================================================
  // PROGRAMS
  // ============================================================================
  {
    id: "12",
    title: "Special Education Program",
    slug: "special-education-program",
    description: "Structured learning program designed for children who need individualized educational approaches and support.",
    category: "programs",
    image: "/services/program-1.jpg",
    content: {
      overview: "Our Special Education Program provides individualized academic instruction for children who need alternative learning approaches. Using specialized teaching methods and a low student-teacher ratio, we help children make meaningful academic progress at their own pace.",
      benefits: [
        "Individualized education plan (IEP) for each child",
        "Specialized teaching methods and materials",
        "Low student-teacher ratio",
        "Regular progress monitoring and reporting",
        "Integration of therapeutic support",
      ],
      whatToExpect: [
        "Initial assessment of learning needs",
        "Development of individualized goals",
        "Structured daily learning sessions",
        "Regular parent communication",
        "Periodic progress reviews and goal updates",
      ],
      whoIsItFor: [
        "Children with learning disabilities",
        "Children with intellectual disabilities",
        "Children with autism needing academic support",
        "Children not thriving in mainstream education",
        "Children needing individualized instruction",
      ],
      duration: "Half-day or full-day program options",
      format: "In-person at our center",
    },
  },
  {
    id: "13",
    title: "Social Skills Group",
    slug: "social-skills-group",
    description: "Small group sessions focused on building peer relationships, communication, and social confidence.",
    category: "programs",
    image: "/services/program-2.jpg",
    content: {
      overview: "Our Social Skills Groups provide a structured, supportive environment for children to learn and practice social skills with peers. Through games, role-play, and guided activities, children develop the skills they need for friendships and social success.",
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
    id: "14",
    title: "Summer Enrichment Program",
    slug: "summer-enrichment-program",
    description: "Engaging summer activities combining learning, therapy, and fun in a supportive group environment.",
    category: "programs",
    image: "/services/program-3.jpg",
    content: {
      overview: "Our Summer Enrichment Program offers a structured, fun-filled summer experience for neurodivergent children. The program combines continued skill development with recreational activities, social opportunities, and therapeutic support in a nurturing environment.",
      benefits: [
        "Prevent summer learning regression",
        "Continued therapeutic support",
        "Social opportunities with peers",
        "Fun, structured daily activities",
        "Respite for parents during summer",
      ],
      whatToExpect: [
        "Themed weekly activities and projects",
        "Balance of learning and recreation",
        "Small group sizes with trained staff",
        "Integration of therapy goals",
        "Field trips and special events",
      ],
      whoIsItFor: [
        "Children enrolled in our therapy programs",
        "Children needing structured summer activities",
        "Children who benefit from consistent routine",
        "Families seeking summer support options",
        "Children aged 4-14 years",
      ],
      duration: "Half-day or full-day options (4-8 week program)",
      format: "In-person at our center",
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
