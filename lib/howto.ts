// HowTo articles — each is a plain-English guide with a stepwise structure that
// maps to Google's HowTo rich-snippet schema. Content is derived from standard
// clinical preparation practices that any licensed practitioner would recommend.

// Reverse index: Sanity service slug → matching HowTo article slug.
// Rendered as "Preparation Guide" CTA on service detail pages.
// Condition slug → array of matching HowTo article slugs. Rendered on condition pivot
// pages as a "Prepare for This" section, closing the condition ↔ howto entity graph.
export const CONDITION_TO_HOWTOS: Record<string, string[]> = {
  autism: ["prepare-for-autism-assessment", "prepare-for-sensory-integration-session", "know-if-child-needs-speech-therapy"],
  adhd: ["prepare-for-adhd-assessment", "support-adult-with-late-diagnosis-adhd-at-work"],
  "learning-disabilities": ["choose-between-nios-and-mainstream"],
  "sensory-processing": ["prepare-for-sensory-integration-session"],
  "developmental-delays": ["know-if-child-needs-speech-therapy", "prepare-for-sensory-integration-session"],
  "pain-management": ["choose-a-physiotherapist-for-pain-management", "know-when-pain-needs-physiotherapy"],
};

export const SERVICE_TO_HOWTO: Record<string, string> = {
  "psychometric-assessments": "prepare-for-adhd-assessment",
  "psychoeducational-assessments": "prepare-for-adhd-assessment",
  "speech-therapy": "know-if-child-needs-speech-therapy",
  "sensory-integration-program": "prepare-for-sensory-integration-session",
  "occupational-therapy": "prepare-for-sensory-integration-session",
  "nios-support-program": "choose-between-nios-and-mainstream",
  "pain-management": "choose-a-physiotherapist-for-pain-management",
  "pain-modalities": "choose-a-physiotherapist-for-pain-management",
  "post-surgical-rehabilitation": "choose-a-physiotherapist-for-pain-management",
  "gym--sports-injury-sessions": "choose-a-physiotherapist-for-pain-management",
  "assistive-devices": "choose-a-physiotherapist-for-pain-management",
  "wheelchair-training": "choose-a-physiotherapist-for-pain-management",
};

export type HowToArticle = {
  slug: string;
  title: string;
  lead: string;
  /** Time estimate to complete the entire preparation, shown in schema `totalTime`. */
  totalTime: string; // ISO 8601 duration (e.g., PT30M, P1D)
  totalTimeLabel: string; // Human-readable
  steps: { name: string; text: string }[];
  /** Terms readers should understand — we link to /glossary#<slug>. */
  relatedGlossarySlugs: string[];
  /** Real service/condition pages we cross-link to. */
  relatedPaths: { label: string; href: string }[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

export const HOWTO_ARTICLES: HowToArticle[] = [
  {
    slug: "prepare-for-adhd-assessment",
    title: "How to Prepare for an ADHD Assessment",
    lead:
      "A clear, practical checklist for what to gather and what to expect before your first ADHD assessment at Divit MindSpace — applies equally to child, teen, and adult assessments.",
    totalTime: "P1D",
    totalTimeLabel: "Roughly 1 day to gather everything",
    steps: [
      {
        name: "Gather current concerns in writing",
        text:
          "Write down the specific attention, focus, or behavior concerns you want to address — at home, at school or work, and in social settings. Include how long the concerns have been noticed and how they impact daily life. A short bullet list is enough; it does not need to be polished.",
      },
      {
        name: "Collect past school, work, or medical reports",
        text:
          "Bring any previous report cards, teacher comments, earlier psychological or medical reports, or prior therapy notes you have access to. For adults, a short timeline of education, work, and any earlier assessments is useful. These documents give the assessor important context.",
      },
      {
        name: "Note current medications and health history",
        text:
          "List any medications currently taken (name, dose, frequency) and relevant health history — sleep patterns, recent life stressors, known medical conditions. This helps the clinician interpret results accurately.",
      },
      {
        name: "Fill out pre-assessment forms ahead of time",
        text:
          "If we send pre-assessment questionnaires, complete them before the visit. Filling them at home — in your own time, without the pressure of the clinic — produces more accurate answers and saves appointment time for the interview.",
      },
      {
        name: "Plan for 2 to 3 hours at the center",
        text:
          "A full ADHD assessment typically runs 2 to 3 hours across one or two visits, depending on age and complexity. Bring water, a snack, and — for children — a small familiar object or book for breaks.",
      },
      {
        name: "Bring a parent or partner for context if relevant",
        text:
          "For children and teens, parent input is essential. For adults, an optional support person (spouse, parent, close friend) can offer useful day-to-day observations during the interview.",
      },
      {
        name: "Know what happens after the assessment",
        text:
          "After testing, our clinician schedules a results-discussion session. You'll receive a written report, a diagnostic conclusion where applicable, and a tailored next-step plan — which may include counseling, cognitive therapy, parental training, or school-liaison support.",
      },
    ],
    relatedGlossarySlugs: ["adhd", "adult-adhd", "cognitive-therapy"],
    relatedPaths: [
      { label: "ADHD — Bangalore", href: "/conditions/adhd" },
      { label: "Psychoeducational Assessment", href: "/services/psychoeducational-assessments" },
      { label: "Psychometric Assessment", href: "/services/psychometric-assessments" },
      { label: "Book a Free Consultation", href: "/contact-us" },
    ],
    metaTitle: "How to Prepare for an ADHD Assessment | Divit MindSpace Bangalore",
    metaDescription:
      "Step-by-step guide to preparing for an ADHD assessment at Divit MindSpace Bangalore — what to gather, what to expect, and how long it takes. For children, teens, and adults off Sarjapur Road (Kasavanahalli).",
    keywords: [
      "ADHD assessment preparation",
      "what to bring to ADHD assessment",
      "ADHD diagnosis Bangalore",
      "adult ADHD assessment guide",
      "ADHD evaluation Sarjapur Road",
      "child ADHD assessment checklist",
    ],
  },
  {
    slug: "prepare-for-autism-assessment",
    title: "How to Prepare for an Autism Assessment",
    lead:
      "What to gather and what to expect before an autism assessment at Divit MindSpace — practical guidance for families of children and for adults seeking their own evaluation.",
    totalTime: "P1D",
    totalTimeLabel: "Roughly 1 day to gather everything",
    steps: [
      {
        name: "List your specific concerns and observations",
        text:
          "Write down what you've noticed — in social interactions, communication, routines, sensory responses, or play/behavior. Include a few concrete examples for each. If you are the person being assessed as an adult, describe how these traits show up in your own life.",
      },
      {
        name: "Gather developmental history (for children and teens)",
        text:
          "Collect what you know about early development: when first words appeared, early social milestones, any feeding or sleep patterns, and key memories from early childhood. For adults, gather school reports, early family anecdotes, or prior reports if available.",
      },
      {
        name: "Compile any prior assessments, reports, or therapy notes",
        text:
          "Bring earlier psychological, speech, occupational therapy, or developmental reports. If a school has shared observations, include those. Prior reports help the assessment team build a complete picture without retesting what's already known.",
      },
      {
        name: "Note sensory sensitivities or strong preferences",
        text:
          "Autism assessments work best when the clinician knows upfront about sensory sensitivities (sounds, lights, textures) or strong routines. This lets us adjust the environment and the flow of the visit so the person being assessed is comfortable.",
      },
      {
        name: "Plan for multiple visits if appropriate",
        text:
          "A comprehensive autism assessment often takes 2 to 3 visits — an intake/interview, structured observation and testing, and a feedback session. For children, bringing a comfort item or familiar snack helps.",
      },
      {
        name: "Prepare any questions about next steps",
        text:
          "Write down any questions you want answered by the end — about therapy options, school support, adult accommodations, or family next-steps. The feedback session is the time to get these addressed.",
      },
      {
        name: "Understand that diagnosis is the start, not the goal",
        text:
          "Whether or not a diagnosis is given, the assessment's real output is a personalized plan: strengths to build on, supports to put in place, and services to consider. Our team walks you through all options at the feedback visit.",
      },
    ],
    relatedGlossarySlugs: ["autism", "adult-autism", "sensory-integration", "neurodiversity"],
    relatedPaths: [
      { label: "Autism — Bangalore", href: "/conditions/autism" },
      { label: "Psychometric Assessment", href: "/services/psychometric-assessments" },
      { label: "Sensory Integration Therapy", href: "/services/sensory-integration-program" },
      { label: "Book a Free Consultation", href: "/contact-us" },
    ],
    metaTitle: "How to Prepare for an Autism Assessment | Divit MindSpace Bangalore",
    metaDescription:
      "Practical guide to preparing for an autism assessment at Divit MindSpace Bangalore — what to bring, what to expect, and how the feedback session works. For children, teens, and adults.",
    keywords: [
      "autism assessment preparation",
      "what to bring to autism assessment",
      "autism diagnosis Bangalore",
      "adult autism assessment guide",
      "autism evaluation Sarjapur Road",
      "child autism assessment checklist",
    ],
  },
  {
    slug: "know-if-child-needs-speech-therapy",
    title: "How to Know If Your Child Needs Speech Therapy",
    lead:
      "Practical signs to watch for at each age — and what to do if any of them sound like your child. From Divit MindSpace's speech-language team in Bangalore.",
    totalTime: "PT15M",
    totalTimeLabel: "About 15 minutes to read and reflect",
    steps: [
      {
        name: "Know the typical early milestones",
        text:
          "Communication develops in patterns, not on a strict schedule. By 12 months, most children babble and respond to their name. By 18 months, many say a few clear words and understand simple instructions. By age 2, short phrases and a rapidly growing vocabulary are common. Wider variation is normal — but persistent gaps are worth a closer look.",
      },
      {
        name: "Look for specific red flags",
        text:
          "Common signs that warrant an assessment include: few or no words by 18 months, not responding to their name consistently, difficulty following simple requests, frustration at not being understood, or trouble producing specific sounds past age 4. Stuttering that persists or worsens after age 4 is also worth evaluating.",
      },
      {
        name: "Pay attention to social communication",
        text:
          "Speech therapy also supports social-communication: taking turns in conversation, understanding tone, making and keeping eye contact, and engaging in pretend play. Difficulties here — especially when combined with sensory or behavioral differences — are often part of a broader picture that speech therapy can help with.",
      },
      {
        name: "Trust your gut, book an assessment",
        text:
          "Parents usually notice something first. If you have a gut feeling, book a speech-language assessment — it's non-invasive, the child often enjoys the activities, and you'll leave with clarity either way. Early support is significantly easier than late catch-up.",
      },
      {
        name: "Know what an assessment includes",
        text:
          "A speech-language assessment at Divit MindSpace includes a parent interview, standardized testing, observation of interaction and play, and review of any reports you bring. You'll receive a report, a diagnosis if applicable, and a tailored therapy plan.",
      },
      {
        name: "Understand how therapy works",
        text:
          "Speech therapy at our Kasavanahalli center is play-based and individualized. Parents are partners — the therapist gives you strategies to use at home so progress keeps happening between sessions.",
      },
    ],
    relatedGlossarySlugs: ["speech-therapy", "autism", "early-intervention"],
    relatedPaths: [
      { label: "Speech Therapy", href: "/services/speech-therapy" },
      { label: "Autism — Bangalore", href: "/conditions/autism" },
      { label: "Developmental Delays — Bangalore", href: "/conditions/developmental-delays" },
      { label: "Early Intervention Program", href: "/services/early-intervention-program" },
    ],
    metaTitle: "How to Know If Your Child Needs Speech Therapy | Divit MindSpace Bangalore",
    metaDescription:
      "A parent's guide to recognizing speech and language concerns in children — red flags by age, what to look for, and when to book an assessment at Divit MindSpace Bangalore.",
    keywords: [
      "does my child need speech therapy",
      "child speech delay Bangalore",
      "speech therapist Sarjapur Road",
      "speech therapy Kasavanahalli",
      "child language delay signs",
      "toddler speech therapy Bangalore",
    ],
  },
  {
    slug: "choose-between-nios-and-mainstream",
    title: "How to Choose Between NIOS and Mainstream Schooling",
    lead:
      "A clear framework for families weighing NIOS versus mainstream — especially for neurodivergent students or children whose pace or profile doesn't fit the standard classroom.",
    totalTime: "PT20M",
    totalTimeLabel: "About 20 minutes to think through",
    steps: [
      {
        name: "Start with the child's current experience",
        text:
          "Ask three honest questions: Is the child meeting daily academic demands without overwhelming stress? Are they sustaining friendships or social growth? Are they thriving outside school hours, or are evenings dominated by recovering from the school day? The answers shape everything.",
      },
      {
        name: "Understand what NIOS is",
        text:
          "NIOS (National Institute of Open Schooling) is a national board offering flexible academic pathways. It covers standard secondary and senior secondary curricula but allows self-paced learning, flexible exam schedules, and adapted support — widely used by neurodivergent learners, student-athletes, and children needing personalized pacing.",
      },
      {
        name: "Understand what mainstream offers",
        text:
          "Mainstream schools provide structured routines, daily peer interaction, and a rhythm that suits many learners. They're ideal when the child is meeting the academic bar with reasonable effort and gaining from the social environment.",
      },
      {
        name: "Consider the middle path: mainstream plus support",
        text:
          "Many families don't need to choose: mainstream schooling with Shadow Teacher support, Special Education sessions, or Parental Training can keep a neurodivergent student in their school while adding the scaffolding they need. This is often the first path to try.",
      },
      {
        name: "Know when NIOS becomes the right call",
        text:
          "NIOS often fits best when: the child is not coping academically despite consistent support; school-related stress is affecting mental health at home; the family wants flexibility for therapy, sport, or other commitments; or a late-diagnosis has made conventional schedules untenable.",
      },
      {
        name: "Don't see it as permanent",
        text:
          "Choosing NIOS is not a one-way door. Many students do NIOS for a phase — to stabilize, catch up, or make room for therapy — and return to mainstream or move directly to higher education. Keep the decision focused on the next 2–3 years, not the whole life.",
      },
      {
        name: "Get a professional perspective",
        text:
          "If the decision feels murky, book a conversation with our team. We combine clinical assessment with years of working with both NIOS and mainstream schools in Bangalore, and can help you weigh trade-offs against your child's specific profile.",
      },
    ],
    relatedGlossarySlugs: ["nios", "learning-disabilities", "shadow-teacher"],
    relatedPaths: [
      { label: "NIOS Support Program", href: "/services/nios-support-program" },
      { label: "Learning Disabilities — Bangalore", href: "/conditions/learning-disabilities" },
      { label: "Special Education & Remedial Sessions", href: "/services/special-education--remedial-sessions" },
      { label: "Shadow Teacher Training", href: "/services/training-program-shadow-teacher-training-program" },
    ],
    metaTitle: "How to Choose Between NIOS and Mainstream Schooling | Divit MindSpace Bangalore",
    metaDescription:
      "A practical framework for families weighing NIOS versus mainstream schooling — especially for neurodivergent students. From Divit MindSpace Bangalore.",
    keywords: [
      "NIOS vs mainstream",
      "should I put my child in NIOS",
      "NIOS support Bangalore",
      "alternative schooling Bangalore",
      "open schooling neurodivergent child",
    ],
  },
  {
    slug: "prepare-for-sensory-integration-session",
    title: "How to Prepare for a Sensory Integration Session",
    lead:
      "What to expect, what to bring, and how to prepare your child (or yourself) for a sensory integration therapy session at our Kasavanahalli center.",
    totalTime: "PT15M",
    totalTimeLabel: "About 15 minutes to prepare",
    steps: [
      {
        name: "Understand what sensory integration work looks like",
        text:
          "Sensory integration sessions combine play-like, movement-rich activities — swinging, climbing, textured materials, structured pressure — with a therapist's careful guidance. Sessions look very different from traditional therapy: movement is the point, not a distraction.",
      },
      {
        name: "Dress for movement",
        text:
          "Come in comfortable, flexible clothing you can move in — tracks, leggings, soft t-shirts. Avoid stiff jeans, tight collars, or anything with dangling jewelry. For children, bring a change of clothes in case of spills or perspiration.",
      },
      {
        name: "Bring familiar sensory items if relevant",
        text:
          "If your child has a comfort object — a soft toy, a chewy, a favorite textured item — bring it. For adults, bring noise-cancelling headphones or sunglasses if you use them outside the clinic. Being able to self-regulate between activities helps the session stay productive.",
      },
      {
        name: "Share today's state with the therapist",
        text:
          "Mention how the day has been: poor sleep, a hard morning at school, missed meals, or a recent illness. Sensory integration work responds to the nervous system's current state — so the therapist can adjust activity intensity accordingly.",
      },
      {
        name: "Plan for 45–60 minutes",
        text:
          "A typical session is 45 to 60 minutes. For children, it's often a good idea to have a quiet activity (audiobook, drawing) planned for after the session to give the nervous system time to settle.",
      },
      {
        name: "Notice and share post-session observations",
        text:
          "After the session, notice shifts in mood, sleep, focus, or tolerance for sensory input across the next 24–48 hours. Sharing this feedback at the next visit helps the therapist refine the plan.",
      },
    ],
    relatedGlossarySlugs: ["sensory-integration", "occupational-therapy", "autism"],
    relatedPaths: [
      { label: "Sensory Integration Therapy", href: "/services/sensory-integration-program" },
      { label: "Occupational Therapy", href: "/services/occupational-therapy" },
      { label: "Sensory Processing — Bangalore", href: "/conditions/sensory-processing" },
    ],
    metaTitle: "How to Prepare for a Sensory Integration Session | Divit MindSpace Bangalore",
    metaDescription:
      "What to wear, what to bring, and how to get the most out of a sensory integration therapy session at Divit MindSpace's Kasavanahalli center in Bangalore.",
    keywords: [
      "sensory integration preparation",
      "sensory integration therapy Bangalore",
      "how to prepare for sensory therapy",
      "sensory integration Kasavanahalli",
      "sensory integration Sarjapur Road",
    ],
  },
  {
    slug: "support-adult-with-late-diagnosis-adhd-at-work",
    title: "How to Support an Adult with Late-Diagnosis ADHD at Work",
    lead:
      "Late-diagnosis ADHD is common — often identified only in adulthood after years of 'something feels off'. A practical guide for the individual and the workplace to make adjustments that genuinely help.",
    totalTime: "PT20M",
    totalTimeLabel: "About 20 minutes to plan",
    steps: [
      {
        name: "Reframe the diagnosis as information, not a label",
        text:
          "Late-diagnosis often lands heavily — years of self-criticism suddenly have a name. The most useful reframe: the diagnosis is information about how your brain works, not a judgment about who you are. Give yourself a few weeks to sit with it before making big decisions.",
      },
      {
        name: "Map your actual workday friction points",
        text:
          "Track one week of real work: when do you lose focus, hyperfocus, procrastinate, or miss details? Note trigger conditions — time of day, type of task, energy state. The pattern, not the theory, is what you design around.",
      },
      {
        name: "Start with the smallest helpful adjustment",
        text:
          "Pick one friction point and one change to test for 2 weeks. Examples: time-blocking mornings for deep work, 25-minute focus sprints, a single priority per day, noise-cancelling headphones, or a pre-meeting written agenda. Change one variable at a time so you know what actually helps.",
      },
      {
        name: "Decide what (if anything) to share with your employer",
        text:
          "Disclosure is your call. Many adults share nothing and work around things privately. Others tell a trusted manager and request small accommodations. Some go formal. None of these is wrong — base it on your workplace culture and what you actually need.",
      },
      {
        name: "Build in recovery, not just productivity",
        text:
          "ADHD tax — the mental cost of constant compensation — is real. Build routine recovery into your week: sleep non-negotiables, movement, time without screens, and a quiet wind-down pattern. Recovery is a performance input, not a reward for productivity.",
      },
      {
        name: "Get clinical support as part of the plan",
        text:
          "Counseling, cognitive therapy, or an assessment-driven support plan can accelerate this work significantly. Our adult-focused counseling at Divit MindSpace combines practical strategies with emotional processing — both matter, especially after a late diagnosis.",
      },
      {
        name: "Revisit quarterly, not daily",
        text:
          "Habits take time. Every 3 months, review what's working and what isn't. Don't abandon strategies after one bad week — look at 8-week trends. And celebrate the wins; late-diagnosis adults rarely do this enough.",
      },
    ],
    relatedGlossarySlugs: ["adult-adhd", "adhd", "cognitive-therapy"],
    relatedPaths: [
      { label: "ADHD — Bangalore", href: "/conditions/adhd" },
      { label: "Counselling for Adults", href: "/services/counselling" },
      { label: "Cognitive Therapy", href: "/services/cognitive-therapy" },
      { label: "Book a Free Consultation", href: "/contact-us" },
    ],
    metaTitle: "How to Support Adult Late-Diagnosis ADHD at Work | Divit MindSpace Bangalore",
    metaDescription:
      "A practical 7-step guide for adults with late-diagnosis ADHD — how to adapt at work, when to disclose, what adjustments actually help. From Divit MindSpace Bangalore.",
    keywords: [
      "adult ADHD at work",
      "late diagnosis ADHD adult",
      "ADHD workplace accommodations",
      "adult ADHD Bangalore",
      "ADHD coaching Sarjapur Road",
      "adult ADHD counseling Kasavanahalli",
    ],
  },
  {
    slug: "know-when-pain-needs-physiotherapy",
    title: "How to Know When Your Pain Needs Professional Physiotherapy",
    lead:
      "Not every ache needs a clinic — but some do, and delaying only makes recovery longer. A clear, honest guide to when self-care is enough and when it's time to book.",
    totalTime: "PT10M",
    totalTimeLabel: "About 10 minutes to assess",
    steps: [
      {
        name: "Give acute pain 3–5 days of basic care",
        text:
          "For a recent, mild ache — rest, gentle movement, and over-the-counter relief if appropriate usually resolves it in 3–5 days. If you're clearly improving day over day, keep monitoring. If you're not, stop waiting.",
      },
      {
        name: "Watch for 'doesn't quite go away' as the real signal",
        text:
          "The most common reason pain becomes chronic is that it never got fully resolved at the acute stage. If something has been nagging for more than 2 weeks — even if it's not bad enough to stop you — book. Early intervention is dramatically easier than late.",
      },
      {
        name: "Recognize sharper warning signs",
        text:
          "Book sooner rather than later if you notice: pain that wakes you at night, sudden loss of range of motion, weakness or numbness, pain that refers down a limb, or pain following a clear injury. These patterns benefit from a physiotherapist's eye early.",
      },
      {
        name: "Don't wait out post-surgical recovery alone",
        text:
          "After orthopedic or soft-tissue surgery, physiotherapy is usually part of the plan from day one. Even when you feel like 'resting is enough', guided mobility and strengthening prevent long-term stiffness, scar tissue issues, and re-injury.",
      },
      {
        name: "Gym or sports pain? Address mechanics, not just soreness",
        text:
          "Training-related pain that keeps coming back is almost always about movement patterns, not just overuse. A physiotherapist can assess biomechanics and correct the pattern so you can train harder, not less.",
      },
      {
        name: "Trust the first assessment as information",
        text:
          "Even if you feel like you're 'overreacting', a single physiotherapy assessment gives you clarity. You'll leave with either a clear plan or reassurance that you're handling things well. Both outcomes are useful.",
      },
      {
        name: "Know what our program covers",
        text:
          "At Divit MindSpace's Kasavanahalli center, our physiotherapy team covers Pain Management, Pain Modalities (ultrasound, TENS, IFT, heat/cold), Post-Surgical Rehabilitation, Gym and Sports Injury Sessions, Assistive Devices, and Wheelchair Training — for all ages.",
      },
    ],
    relatedGlossarySlugs: ["post-surgical-rehabilitation", "pain-modalities", "assistive-devices"],
    relatedPaths: [
      { label: "Physiotherapy — Bangalore", href: "/conditions/pain-management" },
      { label: "Pain Management", href: "/services/pain-management" },
      { label: "Post-Surgical Rehabilitation", href: "/services/post-surgical-rehabilitation" },
      { label: "Gym & Sports Injury Sessions", href: "/services/gym--sports-injury-sessions" },
      { label: "Book a Free Consultation", href: "/contact-us" },
    ],
    metaTitle: "How to Know When Your Pain Needs Physiotherapy | Divit MindSpace Bangalore",
    metaDescription:
      "A practical guide — when self-care is enough, when it's time to book a physiotherapist, and what our Kasavanahalli center covers. From Divit MindSpace Bangalore.",
    keywords: [
      "when to see physiotherapist",
      "chronic pain physiotherapy",
      "back pain Bangalore",
      "pain management Sarjapur Road",
      "post surgical rehab Bangalore",
      "gym injury physiotherapy Kasavanahalli",
    ],
  },
  {
    slug: "choose-a-physiotherapist-for-pain-management",
    title: "How to Choose the Right Physiotherapist for Pain Management",
    lead:
      "A practical guide to picking a physiotherapist who will actually solve your pain — whether it's chronic back or neck pain, a gym or sports injury, or post-surgical recovery.",
    totalTime: "PT30M",
    totalTimeLabel: "About 30 minutes of research",
    steps: [
      {
        name: "Describe your pain in plain terms",
        text:
          "Write a short description of your pain: where it hurts, how it started, what makes it better or worse, and how long you've had it. This helps you communicate clearly with any physiotherapist you speak to — and lets them tell you quickly if they can help.",
      },
      {
        name: "Check for relevant qualifications and registration",
        text:
          "Look for a physiotherapist with appropriate clinical qualifications (e.g., B.P.T. or M.P.T.) and registration with the relevant professional body. Ask about their experience with your specific issue — back pain, sports injury, post-surgical rehab — rather than general experience.",
      },
      {
        name: "Ask how they assess before treating",
        text:
          "A good physiotherapist starts with a thorough assessment — movement tests, history-taking, and a discussion of goals — before applying any modality or exercise. Be cautious of anyone who starts treatment without first understanding your condition.",
      },
      {
        name: "Check what approaches they combine",
        text:
          "Modern pain management blends hands-on manual therapy, targeted exercise, pain modalities (ultrasound, TENS, IFT), and patient education. A practitioner using only one approach is limiting your options. Ask what their typical plan looks like.",
      },
      {
        name: "Understand expected timelines and milestones",
        text:
          "Ask for a realistic estimate: how many sessions are typical, what milestones you should expect at each stage, and when they would reassess the plan. Clear milestones help you judge progress rather than just 'feeling better'.",
      },
      {
        name: "Look for coordination with your other care",
        text:
          "If you are post-surgical or under a doctor's care, a good physiotherapist welcomes coordination with your surgeon or physician. Protocol alignment reduces the risk of setbacks and speeds full recovery.",
      },
      {
        name: "Trust the center, not just the individual",
        text:
          "A multidisciplinary center — where physiotherapy is supported by assistive-device training, post-surgical rehab pathways, and onward-referral channels — gives you more options if your case evolves. Divit MindSpace's Kasavanahalli center brings all of these under one roof.",
      },
    ],
    relatedGlossarySlugs: ["post-surgical-rehabilitation", "pain-modalities", "assistive-devices"],
    relatedPaths: [
      { label: "Physiotherapy — Bangalore", href: "/conditions/pain-management" },
      { label: "Pain Management", href: "/services/pain-management" },
      { label: "Pain Modalities", href: "/services/pain-modalities" },
      { label: "Post-Surgical Rehabilitation", href: "/services/post-surgical-rehabilitation" },
      { label: "Gym & Sports Injury Sessions", href: "/services/gym--sports-injury-sessions" },
      { label: "Book a Free Consultation", href: "/contact-us" },
    ],
    metaTitle: "How to Choose the Right Physiotherapist for Pain Management | Divit MindSpace",
    metaDescription:
      "A practical guide to picking a physiotherapist who solves pain — whether chronic back pain, sports injury, or post-surgical recovery. Divit MindSpace Bangalore, off Sarjapur Road.",
    keywords: [
      "how to choose physiotherapist",
      "best physiotherapist Bangalore",
      "pain management physiotherapy Sarjapur Road",
      "sports injury physiotherapist Kasavanahalli",
      "post surgical rehabilitation Bangalore",
    ],
  },
];
