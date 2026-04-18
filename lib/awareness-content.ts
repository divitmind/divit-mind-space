// Awareness Program content — single source of truth shared by the server
// route (app/(root)/awareness-program/page.tsx) for JSON-LD schema and the
// client component (components/awareness/awareness-page.tsx) for rendering.
// Text here is verbatim from public/awareness.txt; do not fabricate.

export const AWARENESS_MISSION_PARAGRAPHS = [
  "At Divit MindSpace, our mission is to support the mental well-being of individuals across all age groups and their families. From the very beginning, we believed that simply opening a mental health clinic is not enough. In a society where ignorance, myths, and stigma around mental health remain widespread, true change can only happen through awareness and education.",
  "That is why awareness is a core pillar of our work. Without it, mental health support stays inaccessible and inclusivity remains a distant goal. With this conviction, Divit MindSpace is deeply committed to conducting complimentary awareness sessions that empower teachers, parents, and communities with knowledge about neurodivergence and the importance of early intervention.",
];

// Named institutions from awareness.txt — keep exact spellings.
export const AWARENESS_INSTITUTIONS = [
  "TISB",
  "Bishop Cotton Girls School",
  "Ryan International School (and its 4 branches)",
  "Shlok International School",
  "Samaskar School",
  "DPS East",
  "Beehive Chain of Schools",
  "Jyoti Niwas College",
  "Kristu Jayanthi College",
  "Krupanidhi College",
];

// Workshop titles verbatim from awareness.txt.
export const AWARENESS_WORKSHOP_TITLES = [
  "Child Growth and Development",
  "Screen Time Management",
  "Bullying Prevention",
  "Cybersecurity Awareness",
  "Connecting with Your Students",
  "Building Emotionally Healthy Classrooms",
  "Classroom Management",
  "Employee Assistance Programs (EAPs) for Corporates",
];

// FAQ answers drawn from awareness.txt content and verified ops facts.
export const AWARENESS_FAQS = [
  {
    question: "Are your awareness sessions really free?",
    answer:
      "Yes. All awareness sessions are offered free of charge. Our mission is to make mental health knowledge accessible to every school, parent, and community member across Bangalore.",
  },
  {
    question: "Which organisations can host an awareness session?",
    answer:
      "We design and facilitate sessions for schools, colleges, corporates, hospitals, and apartment communities. If your organisation has teachers, parents, or employees who would benefit from awareness on neurodivergence, mental health, or early intervention, we can tailor a session for you.",
  },
  {
    question: "What topics do you cover in the awareness sessions and workshops?",
    answer:
      "Core awareness sessions focus on neurodivergence, early intervention, stigma reduction, and practical support strategies. Beyond awareness, we run customised workshops on Child Growth and Development, Screen Time Management, Bullying Prevention, Cybersecurity Awareness, Connecting with Your Students, Building Emotionally Healthy Classrooms, Classroom Management, and Employee Assistance Programs for corporates.",
  },
  {
    question: "How long is a typical awareness session?",
    answer:
      "Session length is tailored to your audience and schedule — a single 60 to 90 minute seminar, or a multi-session workshop series. We agree the format with you when you book.",
  },
  {
    question: "How do I request a session for my school or organisation?",
    answer:
      "Message us on WhatsApp at +91 99016 66139 or email divitmindspace@gmail.com. Share your organisation name, approximate audience size, and the topics you are interested in, and we will propose a format that fits.",
  },
];
