// Static data for condition-pivot and location-pivot SEO pages.
// Every claim here is backed by either (a) a real Sanity service slug, or (b) a real
// neighborhood already in the Organization's areaServed. Nothing is fabricated.

export type ConditionPivot = {
  slug: string;
  /** Display name shown in UI. */
  name: string;
  /** Short intro paragraph (1–2 sentences) — conservative, factual. */
  intro: string;
  /** Sanity service slugs most relevant to this condition. Rendered as linked cards. */
  serviceSlugs: string[];
  /** Tag strings to match against Sanity specialist.specialties for auto-filtering. */
  specialtyTags: string[];
  /** FAQ pairs — each answer is a self-contained paragraph for LLM citation. */
  faqs: { question: string; answer: string }[];
  /** SEO metadata */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

// Curated "related conditions" graph — captures clinically common comorbidities and
// topical adjacencies so readers can pivot to a nearby page without backtracking to index.
// Every slug here must exist in CONDITION_PIVOTS below.
export const RELATED_CONDITIONS: Record<string, string[]> = {
  autism: ["sensory-processing", "developmental-delays", "adhd"],
  adhd: ["learning-disabilities", "autism", "stress-anxiety-depression"],
  "learning-disabilities": ["adhd", "developmental-delays"],
  "stress-anxiety-depression": ["adhd"],
  "sensory-processing": ["autism", "developmental-delays"],
  "developmental-delays": ["autism", "sensory-processing", "learning-disabilities"],
  "pain-management": [],
};

export const CONDITION_PIVOTS: ConditionPivot[] = [
  {
    slug: "autism",
    name: "Autism Spectrum",
    intro:
      "Divit MindSpace supports children, teenagers, and adults on the autism spectrum with evidence-based clinical assessments, therapies, and family programs at our Kasavanahalli center (off Sarjapur Road, Bangalore).",
    serviceSlugs: [
      "psychometric-assessments",
      "psychoeducational-assessments",
      "speech-therapy",
      "occupational-therapy",
      "behavioral-therapy",
      "sensory-integration-program",
      "play-therapy",
      "early-intervention-program",
      "parental-training-program",
    ],
    specialtyTags: ["Autism", "ASD", "Autism Spectrum Disorder"],
    faqs: [
      {
        question: "Does Divit MindSpace offer autism assessment for adults in Bangalore?",
        answer:
          "Yes. We conduct clinical assessments for adult autism at our Kasavanahalli center off Sarjapur Road, serving HSR Layout, Bellandur, Koramangala, Whitefield, and Bengaluru. Many adults visit us for late-diagnosis support, workplace challenges, and mental health care.",
      },
      {
        question: "What therapies do you offer for children with autism?",
        answer:
          "Our autism programs combine Speech Therapy, Occupational Therapy, Behavioral Therapy, Sensory Integration Therapy, Play Therapy, and Early Intervention. We also run Parental Training so families can continue the work at home.",
      },
      {
        question: "How do I book an autism consultation near Sarjapur Road?",
        answer:
          "Call +91-99016-66139 or WhatsApp https://wa.me/919901666139 to book. We're open Monday–Saturday, 10 AM–7 PM at Aadeshwar Chambers, Kasavanahalli.",
      },
    ],
    metaTitle: "Autism Assessment & Therapy in Bangalore | Divit MindSpace (Child + Adult)",
    metaDescription:
      "Clinical assessments and therapy for Autism (child + adult) in Bangalore. Speech, OT, Behavioral, Sensory Integration, Play Therapy, and Early Intervention at our Kasavanahalli center off Sarjapur Road — serving HSR Layout, Bellandur, Koramangala, and Bengaluru.",
    keywords: [
      "autism assessment Bangalore",
      "autism therapy Bangalore",
      "adult autism Bangalore",
      "autism spectrum Kasavanahalli",
      "autism diagnosis Sarjapur Road",
      "ASD therapy HSR Layout",
      "autism specialist Bellandur",
      "early intervention autism Bangalore",
    ],
  },
  {
    slug: "adhd",
    name: "ADHD",
    intro:
      "Expert assessment and evidence-based support for children, teens, and adults with ADHD at our Kasavanahalli center off Sarjapur Road — serving families across Bangalore.",
    serviceSlugs: [
      "psychometric-assessments",
      "psychoeducational-assessments",
      "cognitive-therapy",
      "behavioral-therapy",
      "counselling",
      "parental-training-program",
    ],
    specialtyTags: ["ADHD", "Attention-Deficit/Hyperactivity Disorder"],
    faqs: [
      {
        question: "Where can I get an ADHD assessment near Sarjapur Road?",
        answer:
          "Divit MindSpace, at Aadeshwar Chambers, Kasavanahalli (off Sarjapur Road), offers comprehensive ADHD clinical assessments for children, teens, and adults. Book a free consultation: +91-99016-66139.",
      },
      {
        question: "Do you offer adult ADHD counseling in Bangalore?",
        answer:
          "Yes. We provide adult ADHD assessments, counseling, cognitive therapy, and late-diagnosis support. Our center serves HSR Layout, Bellandur, Koramangala, and across Bengaluru.",
      },
      {
        question: "Is parent training available for ADHD management?",
        answer:
          "Yes — our Parental Training Program equips parents and caregivers with strategies that work at home, school, and work, complementing any therapy or assessment plan.",
      },
    ],
    metaTitle: "ADHD Assessment & Counseling in Bangalore | Divit MindSpace (Child + Adult)",
    metaDescription:
      "Clinical assessments, counseling, cognitive therapy, and parent training for ADHD — child and adult — at our Kasavanahalli center off Sarjapur Road, Bangalore. Serving HSR Layout, Bellandur, and Bengaluru.",
    keywords: [
      "ADHD assessment Bangalore",
      "adult ADHD Bangalore",
      "ADHD specialist Sarjapur Road",
      "ADHD counseling Kasavanahalli",
      "ADHD therapy HSR Layout",
      "child ADHD Bellandur",
      "parent training ADHD Bangalore",
    ],
  },
  {
    slug: "learning-disabilities",
    name: "Learning Disabilities",
    intro:
      "Psychoeducational assessment and structured academic support for children and teenagers with learning disabilities, dyslexia, and related challenges — at our Kasavanahalli center off Sarjapur Road.",
    serviceSlugs: [
      "psychoeducational-assessments",
      "psychometric-assessments",
      "special-education--remedial-sessions",
      "nios-support-program",
      "school-readiness-program",
      "training-program-shadow-teacher-training-program",
    ],
    specialtyTags: ["Learning Disabilities", "LD", "Dyslexia"],
    faqs: [
      {
        question: "Where can I get a learning disability assessment in Bangalore?",
        answer:
          "Divit MindSpace offers Psychoeducational Assessments for Learning Disabilities at our Kasavanahalli center off Sarjapur Road. We serve families across HSR Layout, Bellandur, Koramangala, and Bengaluru.",
      },
      {
        question: "Do you offer NIOS support for students with learning disabilities?",
        answer:
          "Yes. Our NIOS Support Program is tailored for students who need an alternative academic pathway. We combine it with Special Education and Remedial Sessions and, where appropriate, Shadow Teacher Training.",
      },
      {
        question: "Can you help with school readiness for neurodivergent children?",
        answer:
          "Yes — our School Readiness Program prepares children with neurodevelopmental profiles for mainstream and inclusive classrooms in Bangalore.",
      },
    ],
    metaTitle: "Learning Disability Assessment & Special Education in Bangalore | Divit MindSpace",
    metaDescription:
      "Psychoeducational assessments, Special Education & Remedial Sessions, NIOS Support, School Readiness, and Shadow Teacher Training at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    keywords: [
      "learning disability assessment Bangalore",
      "dyslexia assessment Sarjapur Road",
      "special education Bangalore",
      "NIOS support Bangalore",
      "remedial sessions Kasavanahalli",
      "school readiness Bangalore",
      "shadow teacher training Bangalore",
    ],
  },
  {
    slug: "stress-anxiety-depression",
    name: "Stress, Anxiety & Depression",
    intro:
      "Professional counseling and cognitive therapy for stress, anxiety, and depression — teenagers and adults — at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "counselling",
      "cognitive-therapy",
      "group-therapy-sessions",
      "play-therapy",
    ],
    specialtyTags: ["Counselling", "Mental Health", "Anxiety", "Depression", "Stress"],
    faqs: [
      {
        question: "Where can adults find counseling for stress or anxiety near HSR Layout?",
        answer:
          "Divit MindSpace offers professional counseling for teenagers and adults, covering stress, anxiety, depression, and related mental health concerns. Our Kasavanahalli center (off Sarjapur Road) serves HSR Layout, Bellandur, Koramangala, and Bengaluru.",
      },
      {
        question: "Do you offer cognitive therapy in Bangalore?",
        answer:
          "Yes. Our Cognitive Therapy sessions help individuals manage stress, anxiety, depression, and related challenges using evidence-based approaches, delivered by licensed psychologists.",
      },
      {
        question: "Can teenagers get counseling without a parent present?",
        answer:
          "Yes. We offer confidential counseling for teenagers as well as family-inclusive formats. Both options are available at our Kasavanahalli center.",
      },
    ],
    metaTitle: "Stress, Anxiety & Depression Counseling in Bangalore | Divit MindSpace",
    metaDescription:
      "Professional counseling, cognitive therapy, and group therapy for stress, anxiety, and depression — teenagers and adults — at our Kasavanahalli center off Sarjapur Road, Bangalore. Serving HSR Layout and Bellandur.",
    keywords: [
      "stress counseling Bangalore",
      "anxiety therapy Sarjapur Road",
      "depression therapy Kasavanahalli",
      "cognitive therapy Bangalore",
      "mental health counseling HSR Layout",
      "teen counseling Bangalore",
      "adult counseling Bangalore",
    ],
  },
  {
    slug: "sensory-processing",
    name: "Sensory Processing Differences",
    intro:
      "Sensory integration therapy and occupational therapy for children, teenagers, and adults who experience sensory processing differences — at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "sensory-integration-program",
      "occupational-therapy",
      "play-therapy",
      "early-intervention-program",
    ],
    specialtyTags: ["Sensory Processing", "Sensory Integration", "Motor Skills"],
    faqs: [
      {
        question: "Where can I find sensory integration therapy near Sarjapur Road?",
        answer:
          "Divit MindSpace's Kasavanahalli center (off Sarjapur Road) offers dedicated Sensory Integration Therapy combined with Occupational Therapy and Play Therapy. We serve HSR Layout, Bellandur, Koramangala, and Bengaluru.",
      },
      {
        question: "Who benefits from sensory integration therapy?",
        answer:
          "Children, teenagers, and adults who experience differences in how they process touch, sound, movement, or other sensory input — common in autism, ADHD, and sensory processing disorder — benefit from sensory integration therapy.",
      },
      {
        question: "Is sensory integration therapy evidence-based?",
        answer:
          "Yes. Sensory integration therapy, when delivered by a trained occupational therapist, is a widely-used and well-studied approach for supporting sensory processing differences.",
      },
    ],
    metaTitle: "Sensory Processing Therapy in Bangalore | Divit MindSpace",
    metaDescription:
      "Sensory Integration Therapy, Occupational Therapy, Play Therapy, and Early Intervention for sensory processing differences — at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    keywords: [
      "sensory processing therapy Bangalore",
      "sensory integration Sarjapur Road",
      "sensory integration therapy Kasavanahalli",
      "occupational therapy sensory HSR Layout",
      "sensory processing disorder Bangalore",
    ],
  },
  {
    slug: "developmental-delays",
    name: "Developmental Delays",
    intro:
      "Early intervention, developmental screening, and multidisciplinary support for children with developmental delays — at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "early-intervention-program",
      "school-readiness-program",
      "ecce-early-childhood-care-and-education",
      "speech-therapy",
      "occupational-therapy",
      "behavioral-therapy",
      "group-therapy-sessions",
      "psychometric-assessments",
      "psychoeducational-assessments",
    ],
    specialtyTags: ["Developmental Delays", "Early Intervention", "Motor Skills"],
    faqs: [
      {
        question: "At what age can developmental delays be identified and supported?",
        answer:
          "Developmental concerns can be noticed and supported from as early as 18 months. Our Early Intervention Program is tailored for the earliest years when development is most plastic. Earlier support produces the largest long-term gains.",
      },
      {
        question: "What does early intervention look like at Divit MindSpace?",
        answer:
          "Our Early Intervention Program combines Speech Therapy, Occupational Therapy, Sensory Integration, Play Therapy, and parental coaching — structured around the child's specific developmental profile. Delivered at our Kasavanahalli center.",
      },
      {
        question: "Do you assess for developmental delays in Bangalore?",
        answer:
          "Yes. Our Psychometric and Psychoeducational Assessments are commonly used to evaluate developmental profiles in children and teens. We serve families across Sarjapur Road, HSR Layout, Bellandur, Koramangala, and Bengaluru.",
      },
    ],
    metaTitle: "Developmental Delay Support & Early Intervention in Bangalore | Divit MindSpace",
    metaDescription:
      "Early Intervention, School Readiness, Speech Therapy, Occupational Therapy, and assessments for children with developmental delays — at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    keywords: [
      "developmental delay Bangalore",
      "early intervention Sarjapur Road",
      "early intervention Kasavanahalli",
      "developmental assessment Bangalore",
      "school readiness Bangalore",
      "motor skills delay Bangalore",
    ],
  },
  {
    slug: "pain-management",
    name: "Pain Management & Physiotherapy",
    intro:
      "Dedicated physiotherapy for acute and chronic pain, post-surgical rehabilitation, sports and gym injuries, and mobility needs — at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "pain-management",
      "pain-modalities",
      "post-surgical-rehabilitation",
      "gym--sports-injury-sessions",
      "assistive-devices",
      "wheelchair-training",
    ],
    specialtyTags: ["Pain Management", "Physiotherapy", "Physical Therapy"],
    faqs: [
      {
        question: "Where can I find physiotherapy for gym or sports injury near Kasavanahalli?",
        answer:
          "Divit MindSpace's Kasavanahalli center (off Sarjapur Road) offers Gym & Sports Injury Sessions alongside Pain Management, Pain Modalities, and Post-Surgical Rehabilitation. Serving HSR Layout, Bellandur, and Bengaluru.",
      },
      {
        question: "Do you provide post-operative physiotherapy near Sarjapur Road?",
        answer:
          "Yes. Our Post-Surgical Rehabilitation program aligns with your surgeon's protocol across knee, hip, shoulder, and spine recoveries, with phased progression from early mobility to full functional return.",
      },
      {
        question: "Can Divit MindSpace help with mobility aids or wheelchair training?",
        answer:
          "Yes. We offer Assistive Devices assessment and Wheelchair Training — including caregiver coaching — at our Kasavanahalli center for adults and seniors across Bangalore.",
      },
    ],
    metaTitle: "Physiotherapy for Pain Management & Sports Injuries in Bangalore | Divit MindSpace",
    metaDescription:
      "Pain Management, Pain Modalities (ultrasound, TENS, IFT), Post-Surgical Rehab, Gym & Sports Injury Sessions, Assistive Devices, and Wheelchair Training at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    keywords: [
      "physiotherapy Bangalore",
      "pain management Sarjapur Road",
      "post surgical rehab Kasavanahalli",
      "sports injury physiotherapy Bangalore",
      "gym injury physiotherapy HSR Layout",
      "physical therapy Bellandur",
      "wheelchair training Bangalore",
      "assistive devices Bangalore",
    ],
  },
];

export type LocationPivot = {
  slug: string;
  name: string;
  intro: string;
  /** "Near" phrasing — e.g. "5 minutes from Kasavanahalli" */
  proximity: string;
  /** Nearby neighborhoods that share our service area. */
  nearby: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

export const LOCATION_PIVOTS: LocationPivot[] = [
  {
    slug: "sarjapur-road",
    name: "Sarjapur Road",
    intro:
      "Divit MindSpace is located directly off Sarjapur Road at Aadeshwar Chambers, Kasavanahalli — easy access for families along the Sarjapur Road corridor.",
    proximity: "Directly off Sarjapur Road",
    nearby: ["Kasavanahalli", "HSR Layout", "Bellandur", "Koramangala"],
    metaTitle: "Mental Health, Neurodevelopment & Physiotherapy near Sarjapur Road | Divit MindSpace",
    metaDescription:
      "Expert Clinical Assessments, Therapies, Counseling, Special Education, NIOS Support, and Physiotherapy near Sarjapur Road, Bangalore. Serving families in Kasavanahalli, HSR Layout, Bellandur, and Koramangala.",
    keywords: [
      "therapy center near Sarjapur Road",
      "mental health Sarjapur Road",
      "physiotherapy Sarjapur Road",
      "autism assessment Sarjapur Road",
      "ADHD specialist Sarjapur Road",
      "counseling Sarjapur Road",
    ],
  },
  {
    slug: "kasavanahalli",
    name: "Kasavanahalli",
    intro:
      "Our center is in Kasavanahalli at Aadeshwar Chambers — walking distance for residents, and a short drive from anywhere along Sarjapur Road.",
    proximity: "In Kasavanahalli (Aadeshwar Chambers)",
    nearby: ["Sarjapur Road", "HSR Layout", "Bellandur", "Koramangala"],
    metaTitle: "Therapy, Assessments & Physiotherapy in Kasavanahalli | Divit MindSpace",
    metaDescription:
      "Divit MindSpace at Aadeshwar Chambers, Kasavanahalli — Clinical Assessments, Therapies, Counseling, Special Education, NIOS Support, and Physiotherapy. Serving Sarjapur Road, HSR Layout, Bellandur, and Bengaluru.",
    keywords: [
      "therapy center Kasavanahalli",
      "mental health Kasavanahalli",
      "physiotherapy Kasavanahalli",
      "autism Kasavanahalli",
      "ADHD Kasavanahalli",
      "counseling Kasavanahalli",
    ],
  },
  {
    slug: "hsr-layout",
    name: "HSR Layout",
    intro:
      "Divit MindSpace serves families across HSR Layout — a short drive from our Kasavanahalli center, off Sarjapur Road.",
    proximity: "Short drive from HSR Layout",
    nearby: ["Sarjapur Road", "Kasavanahalli", "Bellandur", "Koramangala"],
    metaTitle: "Mental Health, Neurodevelopment & Physiotherapy near HSR Layout | Divit MindSpace",
    metaDescription:
      "Clinical Assessments, Therapies, Counseling, and Physiotherapy for families in HSR Layout. Our Kasavanahalli center (off Sarjapur Road) is easily accessible.",
    keywords: [
      "therapy center near HSR Layout",
      "mental health HSR Layout",
      "physiotherapy HSR Layout",
      "autism HSR Layout",
      "ADHD HSR Layout",
      "counseling HSR Layout",
    ],
  },
  {
    slug: "bellandur",
    name: "Bellandur",
    intro:
      "Divit MindSpace is a short drive from Bellandur, serving families and individuals with the full range of our clinical and physiotherapy services.",
    proximity: "Short drive from Bellandur",
    nearby: ["Sarjapur Road", "Kasavanahalli", "HSR Layout", "Marathahalli"],
    metaTitle: "Mental Health, Neurodevelopment & Physiotherapy near Bellandur | Divit MindSpace",
    metaDescription:
      "Clinical Assessments, Therapies, Counseling, and Physiotherapy for families in Bellandur. Our Kasavanahalli center is just off Sarjapur Road.",
    keywords: [
      "therapy center near Bellandur",
      "mental health Bellandur",
      "physiotherapy Bellandur",
      "autism Bellandur",
      "ADHD Bellandur",
      "counseling Bellandur",
    ],
  },
  {
    slug: "koramangala",
    name: "Koramangala",
    intro:
      "Divit MindSpace serves families in Koramangala with the full range of our clinical, educational, and physiotherapy services at our nearby Kasavanahalli center.",
    proximity: "Short drive from Koramangala",
    nearby: ["HSR Layout", "Sarjapur Road", "Kasavanahalli", "Bellandur"],
    metaTitle: "Mental Health, Neurodevelopment & Physiotherapy near Koramangala | Divit MindSpace",
    metaDescription:
      "Clinical Assessments, Therapies, Counseling, Special Education, and Physiotherapy for families in Koramangala, at our Kasavanahalli center off Sarjapur Road.",
    keywords: [
      "therapy center near Koramangala",
      "mental health Koramangala",
      "autism Koramangala",
      "ADHD Koramangala",
      "counseling Koramangala",
      "physiotherapy Koramangala",
    ],
  },
  {
    slug: "whitefield",
    name: "Whitefield",
    intro:
      "Divit MindSpace supports families in Whitefield with clinical assessments, therapy, counseling, and physiotherapy at our Kasavanahalli center (off Sarjapur Road).",
    proximity: "Accessible from Whitefield",
    nearby: ["Marathahalli", "Bellandur", "Sarjapur Road", "Kasavanahalli"],
    metaTitle: "Mental Health, Neurodevelopment & Physiotherapy near Whitefield | Divit MindSpace",
    metaDescription:
      "Clinical Assessments, Therapies, Counseling, and Physiotherapy for families in Whitefield at our Kasavanahalli center off Sarjapur Road.",
    keywords: [
      "therapy center near Whitefield",
      "mental health Whitefield",
      "autism Whitefield",
      "ADHD Whitefield",
      "counseling Whitefield",
      "physiotherapy Whitefield",
    ],
  },
];
