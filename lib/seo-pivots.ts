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
          "Call +91-99016-66139 or WhatsApp https://wa.me/919901666139 to book. We're open Monday–Saturday, 9 AM–6 PM at Aadeshwar Chambers, Kasavanahalli.",
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

  // ============================================================
  // NEW CONDITION ENTRIES
  // Existing condition logic above is unchanged.
  // ============================================================

  {
    slug: "de-addiction",
    name: "De-addiction",
    intro:
      "Psychological and counseling support for individuals and families navigating substance use, recovery, and related emotional challenges at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "counselling",
      "cognitive-therapy",
      "group-therapy-sessions",
    ],
    specialtyTags: [
      "De-addiction",
      "Addiction",
      "Substance Use",
      "Addiction Psychiatry",
    ],
    faqs: [
      {
        question: "Does Divit MindSpace provide de-addiction support in Bangalore?",
        answer:
          "Divit MindSpace provides counseling and psychological support for individuals and families navigating substance use and recovery-related concerns at our Kasavanahalli center off Sarjapur Road.",
      },
      {
        question: "Can family members receive support during addiction recovery?",
        answer:
          "Yes. Family counseling and psychological support can help family members understand recovery-related challenges and develop healthier ways of providing support.",
      },
      {
        question: "What kind of psychological support may be available for substance use concerns?",
        answer:
          "Depending on the individual's needs, support may include counseling, cognitive therapy, and appropriate group-based support following an individual assessment.",
      },
    ],
    metaTitle: "De-addiction & Addiction Support in Bangalore | Divit MindSpace",
    metaDescription:
      "Psychological counseling and family support for individuals navigating substance use and recovery at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    keywords: [
      "de addiction Bangalore",
      "de addiction counseling Bangalore",
      "addiction support Bangalore",
      "substance use counseling Bangalore",
      "addiction psychologist Bangalore",
      "de addiction Kasavanahalli",
    ],
  },

  {
    slug: "depression",
    name: "Depression",
    intro:
      "Professional psychological support for individuals experiencing depression, persistent low mood, loss of interest, and related emotional challenges at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "counselling",
      "cognitive-therapy",
      "group-therapy-sessions",
    ],
    specialtyTags: [
      "Depression",
      "Mental Health",
      "Counselling",
    ],
    faqs: [
      {
        question: "Does Divit MindSpace provide counseling for depression in Bangalore?",
        answer:
          "Yes. Divit MindSpace provides counseling and cognitive therapy for individuals experiencing depression and related emotional challenges at our Kasavanahalli center off Sarjapur Road.",
      },
      {
        question: "Can teenagers receive support for depression?",
        answer:
          "Yes. Teenagers can receive age-appropriate psychological support following an individual assessment of their emotional and developmental needs.",
      },
      {
        question: "What psychological support may be helpful for depression?",
        answer:
          "Depending on individual needs, counseling and cognitive therapy may be considered to help individuals understand and manage emotional, cognitive, and behavioural challenges associated with depression.",
      },
    ],
    metaTitle: "Depression Counseling & Therapy in Bangalore | Divit MindSpace",
    metaDescription:
      "Professional counseling and cognitive therapy for depression and related emotional challenges at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    keywords: [
      "depression counseling Bangalore",
      "depression therapy Bangalore",
      "depression psychologist Bangalore",
      "depression support Kasavanahalli",
      "depression counseling Sarjapur Road",
    ],
  },

  {
    slug: "panic-disorder",
    name: "Panic Disorder",
    intro:
      "Psychological support for individuals experiencing recurrent panic attacks, fear of future attacks, and related anxiety concerns at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "counselling",
      "cognitive-therapy",
    ],
    specialtyTags: [
      "Panic Disorder",
      "Panic Attacks",
      "Anxiety",
      "Anxiety Disorders",
    ],
    faqs: [
      {
        question: "Does Divit MindSpace provide support for panic disorder?",
        answer:
          "Yes. Counseling and cognitive therapy may be considered for individuals experiencing panic-related concerns following an appropriate clinical assessment.",
      },
      {
        question: "Can panic attacks be discussed during counseling?",
        answer:
          "Yes. Counseling provides a structured setting to understand panic experiences, triggers, thoughts, emotions, and coping strategies.",
      },
      {
        question: "When should someone seek professional support for panic attacks?",
        answer:
          "If panic attacks are recurrent, distressing, affecting daily life, or causing avoidance, professional assessment and support may be helpful.",
      },
    ],
    metaTitle: "Panic Disorder Counseling & Support in Bangalore | Divit MindSpace",
    metaDescription:
      "Psychological counseling and cognitive therapy for panic disorder and panic-related concerns at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    keywords: [
      "panic disorder Bangalore",
      "panic attack counseling Bangalore",
      "panic disorder therapy Bangalore",
      "panic attacks psychologist Bangalore",
      "panic disorder Kasavanahalli",
    ],
  },

  {
    slug: "dementias",
    name: "Dementias",
    intro:
      "Psychological assessment, counseling, and supportive care for older adults and families navigating dementia-related concerns at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "psychometric-assessments",
      "counselling",
      "group-therapy-sessions",
    ],
    specialtyTags: [
      "Dementia",
      "Dementias",
      "Geriatric Mental Health",
      "Memory Disorders",
    ],
    faqs: [
      {
        question: "Does Divit MindSpace support older adults with dementia-related concerns?",
        answer:
          "Divit MindSpace provides psychological assessment and supportive counseling for older adults and families navigating dementia-related concerns.",
      },
      {
        question: "Can caregivers receive counseling for dementia-related challenges?",
        answer:
          "Yes. Counseling can provide emotional and practical support for caregivers and families managing changing needs associated with dementia.",
      },
      {
        question: "What kind of assessment may be considered for memory concerns?",
        answer:
          "A psychological assessment may help understand cognitive and functional concerns. The appropriate assessment is determined based on the individual's presentation and clinical needs.",
      },
    ],
    metaTitle: "Dementia Assessment & Support in Bangalore | Divit MindSpace",
    metaDescription:
      "Psychological assessment and supportive counseling for older adults and families navigating dementia-related concerns at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    keywords: [
      "dementia support Bangalore",
      "dementia assessment Bangalore",
      "dementia counseling Bangalore",
      "geriatric counseling Bangalore",
      "memory assessment Bangalore",
      "dementia support Kasavanahalli",
    ],
  },

  {
    slug: "schizophrenia",
    name: "Schizophrenia",
    intro:
      "Psychological and family support for individuals and caregivers navigating schizophrenia and related mental health concerns, with care coordinated according to individual clinical needs.",
    serviceSlugs: [
      "counselling",
      "cognitive-therapy",
      "group-therapy-sessions",
    ],
    specialtyTags: [
      "Schizophrenia",
      "Psychotic Disorders",
      "Mental Health",
    ],
    faqs: [
      {
        question: "Does Divit MindSpace provide psychological support for schizophrenia?",
        answer:
          "Divit MindSpace provides psychological and family support for individuals navigating schizophrenia and related mental health concerns, with care based on individual clinical needs.",
      },
      {
        question: "Can families receive support when a loved one has schizophrenia?",
        answer:
          "Yes. Family counseling and psychoeducation can help caregivers understand the condition and support the individual's ongoing care.",
      },
      {
        question: "Does counseling replace psychiatric treatment for schizophrenia?",
        answer:
          "No. Psychological support should complement appropriate medical or psychiatric care when required. Treatment decisions should be made with qualified professionals based on the individual's needs.",
      },
    ],
    metaTitle: "Schizophrenia Psychological & Family Support in Bangalore | Divit MindSpace",
    metaDescription:
      "Psychological and family support for individuals and caregivers navigating schizophrenia and related mental health concerns in Bangalore.",
    keywords: [
      "schizophrenia support Bangalore",
      "schizophrenia counseling Bangalore",
      "schizophrenia psychologist Bangalore",
      "schizophrenia family support Bangalore",
      "schizophrenia support Kasavanahalli",
    ],
  },

  {
    slug: "bipolar-disorder",
    name: "Bipolar Disorder",
    intro:
      "Psychological counseling and supportive care for individuals and families navigating bipolar disorder and related mood concerns at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "counselling",
      "cognitive-therapy",
      "group-therapy-sessions",
    ],
    specialtyTags: [
      "Bipolar Disorder",
      "Bipolar",
      "Mood Disorders",
      "Mental Health",
    ],
    faqs: [
      {
        question: "Does Divit MindSpace provide psychological support for bipolar disorder?",
        answer:
          "Yes. Psychological counseling and supportive care may be provided based on the individual's needs and in coordination with appropriate psychiatric care where required.",
      },
      {
        question: "Can families receive support for bipolar disorder?",
        answer:
          "Yes. Family counseling and psychoeducation can help families understand mood changes and develop supportive strategies.",
      },
      {
        question: "Can counseling replace medication for bipolar disorder?",
        answer:
          "Counseling does not replace prescribed psychiatric treatment. Psychological support can complement medical care when recommended by qualified professionals.",
      },
    ],
    metaTitle: "Bipolar Disorder Counseling & Support in Bangalore | Divit MindSpace",
    metaDescription:
      "Psychological counseling and family support for individuals navigating bipolar disorder and related mood concerns in Bangalore.",
    keywords: [
      "bipolar disorder Bangalore",
      "bipolar counseling Bangalore",
      "bipolar psychologist Bangalore",
      "bipolar support Kasavanahalli",
      "mood disorder counseling Bangalore",
    ],
  }, 
  {
    slug: "anxiety",
    name: "Anxiety",
    intro:
      "Professional psychological support for individuals experiencing anxiety, excessive worry, fear, and related emotional challenges at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "counselling",
      "cognitive-therapy",
      "group-therapy-sessions",
    ],
    specialtyTags: ["Anxiety", "Anxiety Disorders"],
    faqs: [
      {
        question:
          "Does Divit MindSpace provide counseling for anxiety in Bangalore?",
        answer:
          "Yes. Divit MindSpace provides counseling and cognitive therapy for individuals experiencing anxiety and related emotional challenges at our Kasavanahalli center off Sarjapur Road.",
      },
      {
        question: "Can teenagers receive support for anxiety?",
        answer:
          "Yes. Teenagers can receive age-appropriate psychological support following an individual assessment of their emotional and developmental needs.",
      },
      {
        question: "What psychological support may help with anxiety?",
        answer:
          "Depending on individual needs, counseling and cognitive therapy may be considered to help individuals understand and manage anxiety-related thoughts, emotions, and behaviours.",
      },
    ],
    metaTitle: "Anxiety Counseling & Therapy in Bangalore | Divit MindSpace",
    metaDescription:
      "Professional counseling and cognitive therapy for anxiety and related emotional challenges at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    keywords: [
      "anxiety counseling Bangalore",
      "anxiety therapy Bangalore",
      "anxiety psychologist Bangalore",
      "anxiety support Kasavanahalli",
      "anxiety counseling Sarjapur Road",
    ],
  },

  {
    slug: "social-communication",
    name: "Social Communication",
    intro:
      "Support for children who experience challenges with social communication, interaction, conversation, and understanding social cues at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "speech-therapy",
      "occupational-therapy",
      "play-therapy",
      "group-therapy-sessions",
      "early-intervention-program",
    ],
    specialtyTags: [
      "Social Communication",
      "Social Communication Disorder",
      "Communication",
      "Speech and Language",
    ],
    faqs: [
      {
        question: "Does Divit MindSpace support children with social communication difficulties?",
        answer:
          "Yes. Speech Therapy and developmentally appropriate therapy approaches can support children who experience challenges with social communication and interaction.",
      },
      {
        question: "Can social communication difficulties be supported through speech therapy?",
        answer:
          "Yes. Speech Therapy may address communication, pragmatic language, conversational skills, and other areas depending on the child's individual profile.",
      },
      {
        question: "Are group sessions available for social communication skills?",
        answer:
          "Group-based therapy may be appropriate for some children and can provide opportunities to practice communication and interaction skills in a supported setting.",
      },
    ],
    metaTitle: "Social Communication Support & Therapy in Bangalore | Divit MindSpace",
    metaDescription:
      "Speech Therapy and developmental support for children with social communication and interaction challenges at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    keywords: [
      "social communication therapy Bangalore",
      "social communication disorder Bangalore",
      "pragmatic language therapy Bangalore",
      "social skills therapy Bangalore",
      "speech therapy social communication",
    ],
  },

  {
    slug: "articulation-disorders",
    name: "Articulation Disorders",
    intro:
      "Speech Therapy support for children experiencing difficulties producing speech sounds clearly and accurately at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "speech-therapy",
      "early-intervention-program",
      "group-therapy-sessions",
    ],
    specialtyTags: [
      "Articulation Disorders",
      "Articulation",
      "Speech Therapy",
      "Speech and Language",
    ],
    faqs: [
      {
        question: "Does Divit MindSpace provide speech therapy for articulation difficulties?",
        answer:
          "Yes. Speech Therapy can support children who experience difficulties producing speech sounds clearly and accurately.",
      },
      {
        question: "When should parents seek an assessment for unclear speech?",
        answer:
          "If a child's speech is consistently difficult to understand or parents have concerns about speech sound development, a speech-language assessment can help identify the child's needs.",
      },
      {
        question: "How does articulation therapy work?",
        answer:
          "A speech-language professional assesses the child's speech sound patterns and develops an individualized therapy plan based on the child's specific difficulties.",
      },
    ],
    metaTitle: "Articulation Disorder Speech Therapy in Bangalore | Divit MindSpace",
    metaDescription:
      "Speech Therapy for children with articulation and speech sound difficulties at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    keywords: [
      "articulation therapy Bangalore",
      "articulation disorder Bangalore",
      "speech sound therapy Bangalore",
      "speech therapy Kasavanahalli",
      "child speech therapy Bangalore",
    ],
  },

  {
    slug: "language-delays",
    name: "Language Delays",
    intro:
      "Speech and language support for children experiencing delays in understanding or using language at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "speech-therapy",
      "early-intervention-program",
      "play-therapy",
      "parental-training-program",
    ],
    specialtyTags: [
      "Language Delays",
      "Language Delay",
      "Speech and Language",
      "Speech Therapy",
    ],
    faqs: [
      {
        question: "Does Divit MindSpace provide therapy for language delays?",
        answer:
          "Yes. Speech Therapy and Early Intervention can support children experiencing delays in understanding or using language.",
      },
      {
        question: "When should parents seek help for a language delay?",
        answer:
          "Parents can seek professional guidance whenever they have concerns about a child's communication or language development. An assessment can help determine whether additional support is appropriate.",
      },
      {
        question: "Can parents be involved in language development therapy?",
        answer:
          "Yes. Parent involvement can help children practice communication and language skills across everyday routines and interactions.",
      },
    ],
    metaTitle: "Language Delay & Speech Therapy in Bangalore | Divit MindSpace",
    metaDescription:
      "Speech Therapy and Early Intervention for children with language delays at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    keywords: [
      "language delay Bangalore",
      "language delay therapy Bangalore",
      "speech therapy Bangalore",
      "child language therapy Kasavanahalli",
      "early language intervention Bangalore",
    ],
  },

  {
    slug: "emotional-dysregulation",
    name: "Emotional Dysregulation",
    intro:
      "Support for children and young people who experience difficulty managing strong emotions, frustration, transitions, or emotional responses at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "behavioral-therapy",
      "counselling",
      "occupational-therapy",
      "play-therapy",
      "parental-training-program",
    ],
    specialtyTags: [
      "Emotional Dysregulation",
      "Emotional Regulation",
      "Behavioral Therapy",
      "Mental Health",
    ],
    faqs: [
      {
        question: "Does Divit MindSpace support children with emotional dysregulation?",
        answer:
          "Yes. Depending on the child's needs, behavioral therapy, counseling, occupational therapy, play therapy, and parent training may be considered as part of an individualized support plan.",
      },
      {
        question: "What can emotional dysregulation look like in children?",
        answer:
          "Some children may have difficulty managing frustration, transitions, disappointment, or strong emotions. The underlying reasons can vary, so individual assessment is important.",
      },
      {
        question: "Can parents learn strategies to support emotional regulation?",
        answer:
          "Yes. Parent training can help caregivers understand emotional and behavioral patterns and develop practical strategies for everyday situations.",
      },
    ],
    metaTitle: "Emotional Dysregulation Support for Children in Bangalore | Divit MindSpace",
    metaDescription:
      "Behavioral Therapy, Counseling, Occupational Therapy, Play Therapy, and Parent Training for children experiencing emotional regulation difficulties in Bangalore.",
    keywords: [
      "emotional dysregulation Bangalore",
      "emotional regulation therapy Bangalore",
      "child emotional regulation Bangalore",
      "behavioral therapy Bangalore",
      "parent training emotional regulation",
    ],
  },

  {
    slug: "peer-socialization",
    name: "Peer Socialization",
    intro:
      "Developmental support for children who need help building peer interaction, communication, play, cooperation, and social participation skills at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "group-therapy-sessions",
      "play-therapy",
      "speech-therapy",
      "occupational-therapy",
    ],
    specialtyTags: [
      "Peer Socialization",
      "Social Skills",
      "Social Communication",
      "Group Therapy",
    ],
    faqs: [
      {
        question: "Does Divit MindSpace support children's peer socialization skills?",
        answer:
          "Yes. Depending on a child's needs, group therapy, play therapy, speech therapy, and occupational therapy may support peer interaction and social participation.",
      },
      {
        question: "Can group therapy help children practice social skills?",
        answer:
          "For children who are appropriate for a group setting, structured group sessions can provide opportunities to practice communication, cooperation, turn-taking, and peer interaction.",
      },
      {
        question: "What skills can children develop through peer-based activities?",
        answer:
          "Depending on the child's goals, activities may focus on communication, turn-taking, sharing, cooperation, emotional regulation, and participating in group routines.",
      },
    ],
    metaTitle: "Peer Socialization & Social Skills Support in Bangalore | Divit MindSpace",
    metaDescription:
      "Developmental support for children's peer interaction, social communication, play, cooperation, and social participation at our Kasavanahalli center.",
    keywords: [
      "peer socialization Bangalore",
      "social skills therapy Bangalore",
      "child social skills Bangalore",
      "peer interaction therapy Bangalore",
      "social communication therapy Bangalore",
    ],
  },

  {
    slug: "pediatric-group-therapy",
    name: "Pediatric Group Therapy",
    intro:
      "Structured group-based support for children to practice communication, social interaction, participation, and developmental skills in an age-appropriate setting at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    serviceSlugs: [
      "group-therapy-sessions",
      "play-therapy",
      "speech-therapy",
      "occupational-therapy",
    ],
    specialtyTags: [
      "Pediatric Group Therapy",
      "Group Therapy",
      "Group Therapy Sessions",
      "Pediatric Therapy",
    ],
    faqs: [
      {
        question: "Does Divit MindSpace offer pediatric group therapy?",
        answer:
          "Divit MindSpace offers structured group-based support for children where group participation is appropriate for their developmental and therapeutic goals.",
      },
      {
        question: "What can children work on during group therapy?",
        answer:
          "Depending on the group and individual goals, children may practice communication, turn-taking, cooperation, peer interaction, participation, and social skills.",
      },
      {
        question: "Is group therapy suitable for every child?",
        answer:
          "Not every child will benefit from the same group format. Suitability should be determined based on the child's developmental profile, communication needs, goals, and ability to participate safely in a group.",
      },
    ],
    metaTitle: "Pediatric Group Therapy in Bangalore | Divit MindSpace",
    metaDescription:
      "Structured pediatric group therapy supporting communication, social interaction, participation, and developmental skills at our Kasavanahalli center off Sarjapur Road, Bangalore.",
    keywords: [
      "pediatric group therapy Bangalore",
      "children group therapy Bangalore",
      "child group therapy Kasavanahalli",
      "group therapy for children Bangalore",
      "pediatric therapy Bangalore",
    ],
  },
];
/**
 * Explicit specialist-to-condition mappings.
 *
 * These mappings are used only for specialists listed here.
 * All other specialists continue using the existing specialtyTags
 * matching logic in the specialist page.
 */
export const SPECIALIST_CONDITION_MAP: Record<string, string[]> = {
  "srinithi-s-o-": [
    "de-addiction",
    "depression",
    "anxiety",
    "panic-disorder",
    "dementias",
    "adhd",
    "schizophrenia",
    "bipolar-disorder",
  ],

  "akhila-r-n": [
    "autism",
    "social-communication",
    "articulation-disorders",
    "language-delays",
    "emotional-dysregulation",
    "peer-socialization",
    "pediatric-group-therapy",
  ],
};

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
    metaTitle:
      "Mental Health, Neurodevelopment & Physiotherapy near Sarjapur Road | Divit MindSpace",
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
    metaTitle:
      "Therapy, Assessments & Physiotherapy in Kasavanahalli | Divit MindSpace",
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
    metaTitle:
      "Mental Health, Neurodevelopment & Physiotherapy near HSR Layout | Divit MindSpace",
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
    metaTitle:
      "Mental Health, Neurodevelopment & Physiotherapy near Bellandur | Divit MindSpace",
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
    metaTitle:
      "Mental Health, Neurodevelopment & Physiotherapy near Koramangala | Divit MindSpace",
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
    metaTitle:
      "Mental Health, Neurodevelopment & Physiotherapy near Whitefield | Divit MindSpace",
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


