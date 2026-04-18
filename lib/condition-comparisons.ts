// Condition vs Condition comparison pages — programmatic "is it X or Y?" landing pages.
// Every pair below uses WIDELY-ACCEPTED, general clinical descriptions (not diagnostic
// criteria) and maps to real Divit MindSpace services/specialists. No fabrication —
// comparisons derive from existing CONDITION_PIVOTS data.
//
// These capture massive long-tail parent + self queries like:
//   "autism vs adhd", "is it autism or just developmental delay", "adhd or LD"
// which competitors (Cadabam's CDC) rank on heavily.

export type ComparisonPair = {
  slug: string; // URL slug like "autism-vs-adhd"
  /** The two conditions being compared — must match CONDITION_PIVOTS slugs. */
  a: string;
  b: string;
  /** SEO title + lead paragraph for the comparison page. */
  metaTitle: string;
  metaDescription: string;
  /** Friendly H1 for the page. */
  h1: string;
  /** 1-2 sentence opening — why do people confuse these? */
  lead: string;
  /** Key differences — 3-5 high-level, clinically-safe points. Framed as "X typically..." */
  keyDifferences: { label: string; a: string; b: string }[];
  /** Key overlaps — 2-4 points where they commonly co-occur or present similarly. */
  overlaps: string[];
  /** FAQ triggers this page answers (question → answer). */
  faqs: { question: string; answer: string }[];
  /** SEO keywords. */
  keywords: string[];
};

// Keep language general + factual. Every clinical statement here is a textbook-level
// public-health description, NOT a diagnostic claim. "May", "typically", "often" are
// deliberate hedges. Google's YMYL medical reviewer (Dr. Pavithra) signs off via the
// lastReviewed schema block.
export const COMPARISON_PAIRS: ComparisonPair[] = [
  {
    slug: "autism-vs-adhd",
    a: "autism",
    b: "adhd",
    metaTitle: "Autism vs ADHD: Differences, Overlaps & Next Steps | Divit MindSpace Bangalore",
    metaDescription:
      "How autism and ADHD differ, where they overlap, and how to decide which assessment to book first. Plain-English guide from Divit MindSpace Bangalore — for parents, teens, and adults.",
    h1: "Autism vs ADHD — Understanding the Differences (and the Overlap)",
    lead:
      "Autism and ADHD can look similar on the surface — a child who seems distracted, a teenager who struggles socially, an adult who feels they've been \"miscast\" their whole life. They are different conditions, but they can also co-occur. This guide lays out the typical differences, the real overlaps, and what to do next.",
    keyDifferences: [
      {
        label: "Core pattern",
        a: "Autism is typically characterized by differences in social communication, a preference for predictability, and sensory processing differences.",
        b: "ADHD is typically characterized by patterns of inattention, impulsivity, and/or hyperactivity across settings.",
      },
      {
        label: "Social communication",
        a: "Autistic individuals often experience social situations as effortful and may prefer structured, familiar interactions. Communication style can be literal and precise.",
        b: "Individuals with ADHD typically engage socially with ease but may interrupt, lose track of the thread, or move between topics quickly.",
      },
      {
        label: "Routines and change",
        a: "Predictability is often soothing; unexpected changes can be dysregulating.",
        b: "Routine can feel dull; novelty and variety are often energising.",
      },
      {
        label: "Sensory profile",
        a: "Sensory sensitivities (to sound, light, texture, taste) are commonly reported.",
        b: "Sensory-seeking or sensory-avoiding patterns can appear, but are typically less central than in autism.",
      },
      {
        label: "Typical identification age",
        a: "Many children are identified in preschool years; late-identification in adulthood is common, especially for women and girls.",
        b: "Often identified during school years once attention demands increase; late-identification in adulthood is extremely common.",
      },
    ],
    overlaps: [
      "Autism and ADHD co-occur frequently — a person can absolutely have both. Specialist guidelines encourage assessing for both when either is suspected.",
      "Both can include challenges with executive function — planning, starting tasks, switching between activities, working memory.",
      "Both can be missed or misread in girls, women, and high-masking adults — many are first identified only in late teens or adulthood.",
      "Both respond well to strength-based, neuro-affirming support; the specifics of the support plan differ, not the underlying approach.",
    ],
    faqs: [
      {
        question: "Can someone have both autism and ADHD?",
        answer:
          "Yes — co-occurrence is common. Current clinical guidelines recommend assessing for both when either is suspected. At Divit MindSpace, our clinical assessments look at both profiles together rather than treating them in isolation.",
      },
      {
        question: "Which assessment should we book first?",
        answer:
          "Book a free consultation with our team first. Our clinician reviews your specific concerns — whether about social communication, attention, sensory experience, or school/work performance — and recommends the most appropriate assessment pathway. You won't end up paying for the wrong assessment.",
      },
      {
        question: "My child is quiet and well-behaved — could it still be ADHD?",
        answer:
          "Yes. The inattentive presentation of ADHD (sometimes called ADHD-I) is often missed precisely because the child is not disruptive. Daydreaming, slow task-starting, and \"zoning out\" are common signs. Girls with ADHD are frequently identified late for this reason.",
      },
      {
        question: "Does Divit MindSpace work with adults who think they might have been missed as children?",
        answer:
          "Yes. Adult autism and adult ADHD assessments are a significant part of our work. Late-identification brings clarity, language, and access to accommodations — and our team supports both the assessment process and the emotional processing that often follows.",
      },
    ],
    keywords: [
      "autism vs adhd",
      "autism or adhd",
      "is it autism or adhd",
      "autism adhd difference bangalore",
      "adult autism vs adhd",
      "adhd and autism together",
    ],
  },
  {
    slug: "autism-vs-sensory-processing",
    a: "autism",
    b: "sensory-processing",
    metaTitle: "Autism vs Sensory Processing Differences | Divit MindSpace Bangalore",
    metaDescription:
      "Sensory processing differences are core to autism but also occur independently. Understand the overlap, the distinction, and how to decide what to pursue.",
    h1: "Autism vs Sensory Processing Differences — How They Relate",
    lead:
      "Nearly every autistic person has sensory differences, but not everyone with sensory differences is autistic. This guide explains the relationship and what it means for getting the right support.",
    keyDifferences: [
      {
        label: "Core definition",
        a: "Autism is a broader neurodevelopmental profile involving social communication, routines, and sensory processing.",
        b: "Sensory processing differences describe how the nervous system receives and organises sensory input. They can occur alongside many conditions — or on their own.",
      },
      {
        label: "Social communication",
        a: "Differences in social communication are part of the autism profile.",
        b: "Social communication is typically not affected by sensory processing differences alone.",
      },
      {
        label: "Intervention approach",
        a: "Typically a multidisciplinary plan: speech, occupational therapy, sensory integration, behavioural support, and family coaching.",
        b: "Typically centered on Sensory Integration Therapy and Occupational Therapy, often in a sensory-equipped clinic.",
      },
    ],
    overlaps: [
      "Most autistic individuals experience sensory sensitivities — to sound, light, touch, taste, or movement.",
      "Sensory Integration Therapy benefits both groups, which is why it's a core service at Divit MindSpace.",
      "Occupational therapists assess both and design layered plans when both are present.",
    ],
    faqs: [
      {
        question: "My child has sensory issues — does that mean they are autistic?",
        answer:
          "Not necessarily. Sensory processing differences can exist on their own, without the other features of autism. A clinical assessment looks at the whole profile — social communication, play, routines, and sensory experience — to determine what fits.",
      },
      {
        question: "Will sensory integration therapy help even if there's no autism?",
        answer:
          "Yes. Sensory Integration Therapy at our Kasavanahalli center supports anyone with sensory processing differences, whether they are autistic or not.",
      },
      {
        question: "Is sensory processing disorder a separate diagnosis?",
        answer:
          "Clinically, \"Sensory Processing Disorder\" is not an independent diagnosis in all major diagnostic systems, but sensory processing differences are recognised and treatable. What matters most is that the support is right for the individual — and that's what our assessments determine.",
      },
    ],
    keywords: [
      "autism vs sensory processing",
      "sensory issues autism",
      "sensory integration bangalore",
      "sensory processing disorder bangalore",
    ],
  },
  {
    slug: "adhd-vs-learning-disabilities",
    a: "adhd",
    b: "learning-disabilities",
    metaTitle: "ADHD vs Learning Disabilities: Differences & Overlaps | Divit MindSpace Bangalore",
    metaDescription:
      "ADHD and learning disabilities often present similarly in school — and frequently co-occur. Understand the distinction and which assessment pathway fits your child.",
    h1: "ADHD vs Learning Disabilities — How to Tell Them Apart",
    lead:
      "Both can show up as \"my child is falling behind in school.\" ADHD is about attention and self-regulation; learning disabilities are about how the brain processes specific academic skills (reading, writing, math). They commonly co-occur.",
    keyDifferences: [
      {
        label: "Core pattern",
        a: "ADHD affects attention, impulse control, and activity level across all settings — home, school, social, work.",
        b: "Learning disabilities are specific to how the brain processes academic information — reading (dyslexia), math (dyscalculia), writing (dysgraphia).",
      },
      {
        label: "Where it shows up",
        a: "Everywhere — not just in academics.",
        b: "Primarily in academic performance; the child may excel in non-academic areas.",
      },
      {
        label: "Assessment type",
        a: "Clinical / psychometric ADHD assessment.",
        b: "Psychoeducational Assessment that measures specific cognitive + academic domains.",
      },
    ],
    overlaps: [
      "Between 30-50% of children with ADHD also have a learning disability; the reverse is similarly common.",
      "Both can cause school frustration, low self-esteem, and secondary anxiety or depression if unaddressed.",
      "Support plans often combine: ADHD strategies + Special Education & Remedial Sessions + sometimes Shadow Teacher support.",
    ],
    faqs: [
      {
        question: "Do we need one assessment or both?",
        answer:
          "Our first-visit consultation clarifies which to start with. Often families begin with a Psychoeducational Assessment because it captures both cognitive and academic profiles — and if ADHD indicators emerge, that assessment pathway follows.",
      },
      {
        question: "Can a learning disability be \"outgrown\"?",
        answer:
          "Learning disabilities are lifelong, but with the right support — remedial sessions, accommodations, sometimes a different schooling pathway like NIOS — individuals build strategies that let them thrive academically and professionally.",
      },
      {
        question: "Does Divit MindSpace offer remedial support as well as assessment?",
        answer:
          "Yes. We combine assessment with ongoing Special Education & Remedial Sessions, NIOS Support, Shadow Teacher Training, and Parental Training — so the assessment leads directly into support.",
      },
    ],
    keywords: [
      "adhd vs learning disability",
      "learning disability vs adhd",
      "is it adhd or dyslexia",
      "adhd or learning difficulty",
      "adhd ld assessment bangalore",
    ],
  },
  {
    slug: "adhd-vs-anxiety",
    a: "adhd",
    b: "stress-anxiety-depression",
    metaTitle: "ADHD vs Anxiety: How to Tell Them Apart (and When They Co-Occur) | Divit MindSpace",
    metaDescription:
      "Adult ADHD and anxiety can look almost identical — racing thoughts, restlessness, overwhelm. Understand the distinction and what to do next.",
    h1: "ADHD vs Anxiety — How to Tell Them Apart",
    lead:
      "Adults often ask: \"Is this ADHD, or is it anxiety? Or both?\" The question matters because the support plans differ. This guide walks through the overlap and the distinguishing patterns.",
    keyDifferences: [
      {
        label: "What's happening inside",
        a: "ADHD: the brain is under-stimulated; focus is hard because the task feels unrewarding or the system needs more novelty.",
        b: "Anxiety: the brain is over-stimulated; focus is hard because fear, rumination, or worry is competing for attention.",
      },
      {
        label: "Pattern over a lifetime",
        a: "ADHD traits have been present since childhood — even if only noticed in adulthood.",
        b: "Anxiety can develop at any point, often triggered by specific life circumstances.",
      },
      {
        label: "Typical support",
        a: "Cognitive therapy, counselling, environmental strategies, sometimes medication.",
        b: "Cognitive therapy (CBT), counselling, mindfulness-based approaches, sometimes medication.",
      },
    ],
    overlaps: [
      "Anxiety is extremely common alongside adult ADHD — many people develop it as a response to years of undiagnosed ADHD.",
      "Both can present as racing thoughts, difficulty concentrating, sleep problems, and overwhelm.",
      "Counselling for teenagers and adults at Divit MindSpace supports both, and the approach is tailored to which pattern is primary.",
    ],
    faqs: [
      {
        question: "I feel anxious all the time — could it actually be ADHD?",
        answer:
          "Possibly. Many late-identified adults with ADHD present first with anxiety — a response to years of missed deadlines, overwhelm, and \"why can't I just do this?\" A clinical conversation sorts this out. Book a consultation.",
      },
      {
        question: "Can treating one help the other?",
        answer:
          "Yes. When ADHD is the primary driver, addressing it often reduces anxiety significantly. When anxiety is primary, cognitive therapy + counselling may resolve the concentration difficulties too.",
      },
    ],
    keywords: [
      "adhd vs anxiety",
      "is it adhd or anxiety",
      "adult adhd anxiety",
      "adhd anxiety bangalore",
      "adult counseling adhd",
    ],
  },
  {
    slug: "autism-vs-developmental-delays",
    a: "autism",
    b: "developmental-delays",
    metaTitle: "Autism vs Developmental Delays: When to Be Concerned | Divit MindSpace Bangalore",
    metaDescription:
      "Developmental delays affect milestones broadly; autism is a specific neurodevelopmental profile. Learn the distinction and what to pursue first.",
    h1: "Autism vs Developmental Delays — A Parent's Guide",
    lead:
      "\"Is my child just a little behind, or is there something more specific going on?\" Every parent who notices a developmental gap asks this. Here's how to think about it clearly — and book the right first appointment.",
    keyDifferences: [
      {
        label: "Scope",
        a: "Autism is a specific profile involving social communication, sensory processing, and patterns of behaviour.",
        b: "Developmental delays describe a broader pattern of slower development — in motor skills, speech, social milestones, or cognition — without necessarily pointing to one cause.",
      },
      {
        label: "What the assessment answers",
        a: "A clinical assessment for autism looks at specific diagnostic features across domains.",
        b: "A developmental screening maps current milestones against typical ranges and identifies which areas need support.",
      },
      {
        label: "Typical first step",
        a: "Clinical assessment (psychometric + clinical interview).",
        b: "Developmental screening → may lead to a more specific assessment depending on findings.",
      },
    ],
    overlaps: [
      "Children with developmental delays may ultimately be assessed as autistic, or as having another specific profile.",
      "Early Intervention supports both — it doesn't require a diagnosis to start.",
      "Speech Therapy, Occupational Therapy, and Sensory Integration Therapy help across the spectrum.",
    ],
    faqs: [
      {
        question: "Should I wait to see if my child 'catches up'?",
        answer:
          "Early intervention produces the largest gains. If you have concerns, book a consultation. If the assessor feels a wait-and-watch approach fits your child's specific profile, they'll tell you. If not, you start with advantage on your side.",
      },
      {
        question: "At what age can autism be identified?",
        answer:
          "Many children are identified between 18 months and 3 years. Some present later, especially if language is a strength. Our Early Intervention Program works with children as young as 18 months.",
      },
    ],
    keywords: [
      "autism vs developmental delay",
      "developmental delay bangalore",
      "early intervention bangalore",
      "is it autism or just delay",
    ],
  },
  {
    slug: "learning-disabilities-vs-developmental-delays",
    a: "learning-disabilities",
    b: "developmental-delays",
    metaTitle: "Learning Disabilities vs Developmental Delays | Divit MindSpace Bangalore",
    metaDescription:
      "Learning disabilities are specific to academic processing; developmental delays are broader. Understand the distinction and the right assessment path.",
    h1: "Learning Disabilities vs Developmental Delays",
    lead:
      "Both can show up as \"my child isn't keeping pace at school.\" The crucial difference is whether it's a broad developmental profile or a specific cognitive-academic difficulty.",
    keyDifferences: [
      {
        label: "What's affected",
        a: "Specific academic skills — reading (dyslexia), math (dyscalculia), or writing (dysgraphia). Cognitive ability is typically in the average or above-average range.",
        b: "Broader domains — motor, social, language, cognitive milestones. Can involve overall slower pace of development.",
      },
      {
        label: "When it typically becomes visible",
        a: "When specific academic demands start — reading instruction (ages 6-8), math complexity (ages 8-10).",
        b: "Earlier — 1-4 years, when milestones fall behind the typical range.",
      },
      {
        label: "Right assessment",
        a: "Psychoeducational Assessment.",
        b: "Developmental screening or psychometric assessment depending on age.",
      },
    ],
    overlaps: [
      "Children identified with early developmental delays may later also be identified with a specific learning disability.",
      "Both benefit from Special Education & Remedial Sessions at Divit MindSpace.",
      "NIOS Support is an option when traditional schooling isn't working — for either profile.",
    ],
    faqs: [
      {
        question: "My child was identified with developmental delay earlier — do we need a learning disability assessment now?",
        answer:
          "Sometimes. As a child enters formal schooling, a Psychoeducational Assessment can reveal whether specific learning disabilities are part of the picture — and that changes the support strategy.",
      },
    ],
    keywords: [
      "learning disability vs developmental delay",
      "ld vs developmental delay bangalore",
      "psychoeducational assessment bangalore",
    ],
  },
  {
    slug: "adhd-vs-sensory-processing",
    a: "adhd",
    b: "sensory-processing",
    metaTitle: "ADHD vs Sensory Processing: Why They're Confused | Divit MindSpace Bangalore",
    metaDescription:
      "ADHD and sensory processing differences both affect focus and regulation — but via different pathways. Here's how to tell them apart.",
    h1: "ADHD vs Sensory Processing Differences",
    lead:
      "Restlessness, distractibility, and difficulty sitting still can stem from ADHD, from sensory processing differences, or from both. The support plans look different.",
    keyDifferences: [
      {
        label: "Underlying driver",
        a: "Attention and regulation system — the brain seeks stimulation or novelty.",
        b: "Sensory system — the nervous system is over- or under-responsive to specific inputs (sound, light, touch, movement).",
      },
      {
        label: "What helps",
        a: "Cognitive strategies, counselling, environmental changes, sometimes medication.",
        b: "Sensory Integration Therapy, Occupational Therapy, sensory-aware environments.",
      },
    ],
    overlaps: [
      "Many children (and adults) have both — the sensory profile affects how ADHD presents.",
      "Occupational Therapy often helps both groups — different techniques, same discipline.",
    ],
    faqs: [
      {
        question: "Could sensory issues explain what looks like ADHD?",
        answer:
          "Sometimes. A child who can't focus in a bright, noisy classroom may be responding to sensory overwhelm rather than attention difficulty. An assessment clarifies the primary pattern — and often finds both.",
      },
    ],
    keywords: [
      "adhd vs sensory processing",
      "sensory or adhd child",
      "occupational therapy bangalore adhd",
    ],
  },
  {
    slug: "autism-vs-learning-disabilities",
    a: "autism",
    b: "learning-disabilities",
    metaTitle: "Autism vs Learning Disabilities | Divit MindSpace Bangalore",
    metaDescription:
      "Autism and learning disabilities are distinct profiles that can co-occur. Understand where they overlap and what pathway to pursue.",
    h1: "Autism vs Learning Disabilities",
    lead:
      "Autism is a neurodevelopmental profile; learning disabilities are specific cognitive-academic difficulties. They can co-occur. Here's how the distinction shapes support.",
    keyDifferences: [
      {
        label: "Core profile",
        a: "Social communication, sensory, routines.",
        b: "Specific academic skills — reading, math, writing.",
      },
      {
        label: "Cognitive ability",
        a: "Spans the full range from intellectual disability to gifted.",
        b: "Typically average or above-average; the difficulty is domain-specific.",
      },
    ],
    overlaps: [
      "An autistic child can also have a specific learning disability — assessment looks for both.",
      "Support plans combine: autism-specific services + Special Education & Remedial Sessions when LD is also present.",
    ],
    faqs: [
      {
        question: "If my child is autistic and has a learning disability, do we double up on therapy?",
        answer:
          "Not exactly — good clinical planning integrates the two. A single coordinated plan usually works better than parallel tracks. Our team builds that plan.",
      },
    ],
    keywords: [
      "autism and learning disability",
      "autism vs dyslexia",
      "autistic child learning disability bangalore",
    ],
  },
];
