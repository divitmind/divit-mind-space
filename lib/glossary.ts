// Glossary entries — each is a widely-accepted clinical definition suitable
// for a public-facing explainer. Every relatedPath points to a real page on our site.
export type GlossaryEntry = {
  term: string;
  slug: string;
  shortDef: string;
  /** Links out to the page where the reader can learn more / book. Must be a real route. */
  relatedPaths: { label: string; href: string }[];
};

export const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    term: "Autism (Autism Spectrum Disorder, ASD)",
    slug: "autism",
    shortDef:
      "A neurodevelopmental condition affecting social communication, behavior, and sensory processing. Autism is a spectrum — every individual presents differently. Early assessment and strength-based support lead to the best long-term outcomes.",
    relatedPaths: [
      { label: "Autism — Bangalore", href: "/conditions/autism" },
      { label: "Psychometric Assessments", href: "/services/psychometric-assessments" },
      { label: "Speech Therapy", href: "/services/speech-therapy" },
      { label: "Occupational Therapy", href: "/services/occupational-therapy" },
    ],
  },
  {
    term: "ADHD (Attention-Deficit / Hyperactivity Disorder)",
    slug: "adhd",
    shortDef:
      "A neurodevelopmental condition involving patterns of inattention, impulsivity, and/or hyperactivity. ADHD is common in both children and adults, and can be identified through clinical assessment. Support typically combines counseling, cognitive strategies, and environment adjustments.",
    relatedPaths: [
      { label: "ADHD — Bangalore", href: "/conditions/adhd" },
      { label: "Psychoeducational Assessment", href: "/services/psychoeducational-assessments" },
      { label: "Counselling (Child, Teen, Adult, Parent)", href: "/services/counselling" },
    ],
  },
  {
    term: "Learning Disabilities (LD)",
    slug: "learning-disabilities",
    shortDef:
      "A group of neurodevelopmental conditions that affect how the brain processes information — common examples include dyslexia (reading), dyscalculia (math), and dysgraphia (writing). Learning Disabilities are identified through psychoeducational assessment.",
    relatedPaths: [
      { label: "Learning Disabilities — Bangalore", href: "/conditions/learning-disabilities" },
      { label: "Psychoeducational Assessment", href: "/services/psychoeducational-assessments" },
      { label: "Special Education & Remedial Sessions", href: "/services/special-education--remedial-sessions" },
    ],
  },
  {
    term: "Sensory Integration / Sensory Processing",
    slug: "sensory-integration",
    shortDef:
      "The way the nervous system receives and organizes sensory information (touch, sound, movement, etc.). Sensory Integration Therapy helps individuals — often children with autism or sensory processing differences — respond more comfortably to everyday sensory input.",
    relatedPaths: [
      { label: "Sensory Integration Therapy", href: "/services/sensory-integration-program" },
      { label: "Occupational Therapy", href: "/services/occupational-therapy" },
    ],
  },
  {
    term: "NIOS (National Institute of Open Schooling)",
    slug: "nios",
    shortDef:
      "India's national open schooling board, offering flexible academic pathways for students who benefit from alternatives to traditional classroom schedules. Widely used by neurodivergent learners, student-athletes, and children needing personalized pacing.",
    relatedPaths: [
      { label: "NIOS Support Program", href: "/services/nios-support-program" },
      { label: "Learning Disabilities — Bangalore", href: "/conditions/learning-disabilities" },
    ],
  },
  {
    term: "Early Intervention",
    slug: "early-intervention",
    shortDef:
      "Clinical and developmental support provided to children in their earliest years (typically 0–6) when development is most plastic. Early intervention produces the largest gains in communication, motor skills, behavior, and school readiness.",
    relatedPaths: [
      { label: "Early Intervention Program", href: "/services/early-intervention-program" },
      { label: "School Readiness Program", href: "/services/school-readiness-program" },
    ],
  },
  {
    term: "Cognitive Therapy (CBT)",
    slug: "cognitive-therapy",
    shortDef:
      "A structured, evidence-based talking therapy that helps individuals notice and reframe unhelpful thought patterns. Used for stress, anxiety, depression, adult ADHD, and many mental health challenges.",
    relatedPaths: [
      { label: "Cognitive Therapy", href: "/services/cognitive-therapy" },
      { label: "Stress, Anxiety & Depression — Bangalore", href: "/conditions/stress-anxiety-depression" },
    ],
  },
  {
    term: "Occupational Therapy (OT)",
    slug: "occupational-therapy",
    shortDef:
      "Therapy that helps individuals participate in the everyday activities (school, work, self-care, play) that give life meaning. Covers motor skills, sensory regulation, daily-living skills, and assistive device training.",
    relatedPaths: [
      { label: "Occupational Therapy", href: "/services/occupational-therapy" },
      { label: "Sensory Integration Therapy", href: "/services/sensory-integration-program" },
    ],
  },
  {
    term: "Speech-Language Pathology",
    slug: "speech-therapy",
    shortDef:
      "Clinical field focused on communication — speech sound production, language comprehension, fluency (stuttering), voice, and social communication. Speech therapists also support feeding and swallowing.",
    relatedPaths: [
      { label: "Speech Therapy", href: "/services/speech-therapy" },
    ],
  },
  {
    term: "Post-Surgical Rehabilitation",
    slug: "post-surgical-rehabilitation",
    shortDef:
      "Physiotherapy-led recovery after orthopedic or soft-tissue surgery (knee, hip, shoulder, spine, ligament repairs). Protocols align with the surgeon's plan and progress patients safely from early mobility to full functional return.",
    relatedPaths: [
      { label: "Post-Surgical Rehabilitation", href: "/services/post-surgical-rehabilitation" },
      { label: "Pain Management", href: "/services/pain-management" },
    ],
  },
  {
    term: "Assistive Devices",
    slug: "assistive-devices",
    shortDef:
      "Tools and equipment — walkers, canes, crutches, orthoses, wheelchairs — that support independence, safety, and mobility. Physiotherapists assess, recommend, and train individuals and caregivers in correct use.",
    relatedPaths: [
      { label: "Assistive Devices", href: "/services/assistive-devices" },
      { label: "Wheelchair Training", href: "/services/wheelchair-training" },
    ],
  },
  {
    term: "Shadow Teacher",
    slug: "shadow-teacher",
    shortDef:
      "A trained educator who supports a neurodivergent student within the mainstream classroom — helping the student access curriculum, manage sensory/social demands, and generalize therapy goals to school life.",
    relatedPaths: [
      { label: "Shadow Teacher Training Program", href: "/services/training-program-shadow-teacher-training-program" },
      { label: "Special Education & Remedial Sessions", href: "/services/special-education--remedial-sessions" },
    ],
  },
  {
    term: "Neurodiversity / Neuro-Affirming Care",
    slug: "neurodiversity",
    shortDef:
      "The view that neurological differences (autism, ADHD, dyslexia, etc.) are natural variations of the human brain — not pathologies to be erased. Neuro-affirming care focuses on strengths, accommodations, and quality of life rather than attempting to make neurodivergent individuals appear neurotypical.",
    relatedPaths: [
      { label: "About Divit MindSpace", href: "/about-us" },
      { label: "Conditions We Support", href: "/conditions" },
    ],
  },
  {
    term: "Adult ADHD",
    slug: "adult-adhd",
    shortDef:
      "ADHD that persists or is first identified in adulthood. Adult presentation often includes executive-function challenges, time management difficulty, and emotional regulation — and is very treatable with assessment, counseling, and cognitive strategies.",
    relatedPaths: [
      { label: "ADHD — Bangalore", href: "/conditions/adhd" },
      { label: "Counselling for Adults", href: "/services/counselling" },
      { label: "Cognitive Therapy", href: "/services/cognitive-therapy" },
    ],
  },
  {
    term: "Adult Autism",
    slug: "adult-autism",
    shortDef:
      "Autism that was missed in childhood or only identified in adulthood. Adult assessment can bring clarity, access to accommodations, and a strengths-based path forward — especially for individuals who have 'masked' for years.",
    relatedPaths: [
      { label: "Autism — Bangalore", href: "/conditions/autism" },
      { label: "Psychometric Assessments", href: "/services/psychometric-assessments" },
    ],
  },
  {
    term: "Pain Modalities",
    slug: "pain-modalities",
    shortDef:
      "Physiotherapy tools — ultrasound, TENS (transcutaneous electrical nerve stimulation), IFT (interferential therapy), and heat/cold applications — used alongside active rehabilitation to accelerate pain relief and tissue healing.",
    relatedPaths: [
      { label: "Pain Modalities", href: "/services/pain-modalities" },
      { label: "Pain Management", href: "/services/pain-management" },
    ],
  },
  {
    term: "Behavioral Therapy",
    slug: "behavioral-therapy",
    shortDef:
      "A structured, goal-oriented therapy that identifies unhelpful behaviors and builds alternative skills. Commonly used for children and adults with ADHD, autism, and emotional regulation challenges — and often combined with counseling or parental training.",
    relatedPaths: [
      { label: "Behavioral Therapy", href: "/services/behavioral-therapy" },
      { label: "ADHD — Bangalore", href: "/conditions/adhd" },
    ],
  },
  {
    term: "Play Therapy",
    slug: "play-therapy",
    shortDef:
      "A child-led therapy where play is the primary medium for communication and processing. Helps children express feelings, work through stress or trauma, and build social skills in an environment that feels natural to them.",
    relatedPaths: [
      { label: "Play Therapy", href: "/services/play-therapy" },
      { label: "Stress, Anxiety & Depression — Bangalore", href: "/conditions/stress-anxiety-depression" },
    ],
  },
  {
    term: "Psychometric Assessment",
    slug: "psychometric-assessment",
    shortDef:
      "A standardized evaluation using validated tests to measure specific cognitive, emotional, or behavioral dimensions. Core component of clinical assessments for autism, ADHD, learning disabilities, and developmental profiles.",
    relatedPaths: [
      { label: "Psychometric Assessments", href: "/services/psychometric-assessments" },
      { label: "Autism — Bangalore", href: "/conditions/autism" },
      { label: "ADHD — Bangalore", href: "/conditions/adhd" },
    ],
  },
  {
    term: "Late-Diagnosis",
    slug: "late-diagnosis",
    shortDef:
      "Receiving a diagnosis — typically autism or ADHD — as a teenager or adult, after years of the condition being missed or misattributed. Late-diagnosis is common and brings clarity plus access to accommodations, but can come with grief or relief (often both).",
    relatedPaths: [
      { label: "Adult ADHD (glossary)", href: "/glossary#adult-adhd" },
      { label: "Adult Autism (glossary)", href: "/glossary#adult-autism" },
      { label: "ADHD — Bangalore", href: "/conditions/adhd" },
      { label: "Autism — Bangalore", href: "/conditions/autism" },
    ],
  },
];
