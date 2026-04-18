import type { Metadata } from "next";
import { HeroSection } from "@/components/about-us/hero-section";
import { PhilosophySection } from "@/components/about-us/philosophy-section";
import { StorySection } from "@/components/about-us/story-section";
import { FoundersSpecialistsSection } from "@/components/about-us/founders-specialists-section";
import { CtaSection } from "@/components/homepage/cta-section";
import { FaqSection } from "@/components/homepage/faq-section";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_US_QUERY, SPECIALISTS_QUERY, SITE_SETTINGS_QUERY, ALL_SERVICES_QUERY } from "@/sanity/lib/queries";
import type { AboutUsQueryResult, SpecialistsQueryResult, Specialist } from "@/sanity/types";
import type { SiteSettings, FAQ } from "@/lib/types";
import { ORGANIZATION_ID, ORGANIZATION_REF, SITE_URL, SITE_LANGUAGE, WEBSITE_ID } from "@/lib/seo";

// Generate Person schema for specialists (critical for LLM "who" queries)
// worksFor references the canonical Organization via @id — one entity across the site.
function generateSpecialistSchema(specialist: Specialist) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: specialist.name,
    jobTitle: specialist.title,
    description: specialist.teaser,
    image: specialist.image?.asset?.url,
    worksFor: ORGANIZATION_REF,
    knowsAbout: specialist.specialties || [],
    ...(specialist.experience && {
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Experience",
        name: `${specialist.experience} of professional experience`,
      }
    }),
  };
}

// Force dynamic rendering - always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

// Default FAQs — each question targets a high-intent "near me" / localized search pattern.
// Answers are citation-ready paragraphs for LLMs (ChatGPT, Perplexity, Gemini, Claude).
const defaultAboutFaqs: FAQ[] = [
  {
    question:
      "Where is the best autism and ADHD assessment center near Sarjapur Road or Kasavanahalli in Bangalore?",
    answer:
      "Divit MindSpace, located at Aadeshwar Chambers, Kasavanahalli (off Sarjapur Road), is a leading center for clinical assessments of Autism, ADHD, Learning Disabilities, Adult Autism, and Adult ADHD. Our licensed psychologists serve families across Sarjapur Road, Kasavanahalli, HSR Layout, Bellandur, Koramangala, Whitefield, and Bengaluru. Book a free consultation at +91-99016-66139.",
  },
  {
    question:
      "Is there a physiotherapy clinic near Kasavanahalli or HSR Layout for pain management, sports & gym injury rehab, and post-surgical care?",
    answer:
      "Yes. Divit MindSpace's Kasavanahalli center (off Sarjapur Road) offers dedicated physiotherapy including Pain Management, Pain Modalities (ultrasound, TENS, IFT, heat and cold therapy), Post-Surgical Rehabilitation, Gym & Sports Injury Sessions, Assistive Devices assessment, and Wheelchair Training — for all ages. We serve families in Kasavanahalli, HSR Layout, Bellandur, Bengaluru, and surrounding areas.",
  },
  {
    question:
      "Where can teenagers and adults find counseling for stress, anxiety, depression, adult ADHD, or adult autism near Bellandur or Sarjapur Road?",
    answer:
      "Divit MindSpace provides professional counseling for teenagers and adults covering stress, anxiety, depression, adult ADHD, and adult autism. Located at Kasavanahalli off Sarjapur Road, we serve Bellandur, HSR Layout, Koramangala, Whitefield, and Bengaluru. Appointments: +91-99016-66139 or WhatsApp https://wa.me/919901666139.",
  },
  {
    question:
      "Which center near Bangalore offers NIOS support, special education, shadow teacher training, and parent coaching?",
    answer:
      "Divit MindSpace's Kasavanahalli center (off Sarjapur Road) offers NIOS Support Program, Special Education and Remedial Sessions, Certificate and Diploma in Special Education, Shadow Teacher Training, and Parental Training Programs. We support neurodivergent children, teens, and adults — and their families — across Bangalore including HSR Layout, Bellandur, Koramangala, Whitefield, and Electronic City.",
  },
  {
    question:
      "What makes Divit MindSpace different from other therapy centers in Bangalore?",
    answer:
      "We combine clinical expertise with personal understanding — our team has firsthand experience with neurodivergent families. Our strength-based, neuro-affirming approach focuses on each individual's strengths, not just challenges, and plans are tailored to age and goals. We also run free awareness sessions across schools and communities around Sarjapur Road, HSR Layout, and Bellandur.",
  },
  {
    question:
      "Does Divit MindSpace offer services for adults with ADHD, autism, anxiety, or chronic pain?",
    answer:
      "Yes. Our Kasavanahalli center provides adult-focused services including Adult ADHD and Adult Autism assessments, professional counseling for stress, anxiety, and depression, cognitive therapy, and physiotherapy for pain management, post-surgical rehab, and gym/sports injuries. Many adults visit us for late-diagnosis support, workplace challenges, and mental health care.",
  },
];

// Generate FAQ Schema JSON-LD dynamically
function generateFaqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/about-us#faq`,
    inLanguage: SITE_LANGUAGE,
    isPartOf: { "@id": WEBSITE_ID },
    about: ORGANIZATION_REF,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h3"],
    },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export const metadata: Metadata = {
  title: "About Us | Divit MindSpace - Mental Health, Neurodevelopment & Physiotherapy Bangalore",
  description: "Expert Clinical Assessments (Autism, ADHD, Learning Disabilities, Adult Autism, Adult ADHD, Stress, Anxiety, Depression), Therapies, Professional Counseling for Teenagers and Adults, Special Education, NIOS Support, Teacher & Parent Training, Physiotherapy (Pain Management, Pain Modalities, Post-Surgical Rehab, Gym & Sports Injury Sessions, Assistive Devices, Wheelchair Training) and Customized Workshops. Located off Sarjapur Road — trusted care for families in Kasavanahalli, HSR Layout, Bellandur, and Bengaluru.",
  keywords: [
    // Umbrella
    "mental health Bangalore",
    "neurodevelopmental care Bangalore",
    "physiotherapy Sarjapur Road",
    "clinical assessments Bangalore",
    "special education Bangalore",
    // Conditions
    "autism support Bangalore",
    "adult autism Bangalore",
    "autism assessment Bangalore",
    "ADHD counseling Bangalore",
    "adult ADHD Bangalore",
    "ADHD assessment Bangalore",
    "learning disability assessment Bangalore",
    "psychometric assessment Bangalore",
    "psychoeducational assessment Bangalore",
    // Mental health
    "stress anxiety counseling Sarjapur Road",
    "depression therapy Kasavanahalli",
    "counseling for teenagers Bangalore",
    "counseling for adults Bangalore",
    "cognitive therapy Bangalore",
    // Therapies
    "speech therapy Sarjapur Road",
    "occupational therapy Bangalore",
    "behavioral therapy Bangalore",
    "play therapy Bangalore",
    "sensory integration therapy Bangalore",
    // Education & training
    "NIOS support Bangalore",
    "teacher training neurodiversity",
    "parent training ADHD Bangalore",
    "early intervention Kasavanahalli",
    "shadow teacher training Bangalore",
    // Physiotherapy (backed by real services)
    "pain management physiotherapy Bangalore",
    "pain modalities physiotherapy Sarjapur Road",
    "post surgical rehabilitation Bangalore",
    "post operative physiotherapy Kasavanahalli",
    "gym injury physiotherapy Bangalore",
    "sports injury physiotherapy Kasavanahalli",
    "assistive devices Bangalore",
    "wheelchair training physiotherapy Bangalore",
    "physical therapy HSR Layout",
    // Workshops
    "customized workshops Bangalore",
    "mental health workshops Sarjapur Road",
    // Hyperlocal
    "Kasavanahalli therapy center",
    "HSR Layout mental health",
    "Bellandur mental health services",
    "Sarjapur Road physiotherapy",
  ],
  openGraph: {
    type: "website",
    url: "https://divitmindspace.com/about-us",
    title: "About Us | Divit MindSpace - Mental Health, Neurodevelopment & Physiotherapy Bangalore",
    description: "Expert Clinical Assessments (Autism, ADHD, LD, Adult Autism, Adult ADHD, Stress, Anxiety, Depression), Therapies, Professional Counseling for Teenagers and Adults, Special Education, NIOS Support, Teacher & Parent Training, Physiotherapy and Customized Workshops. Off Sarjapur Road — Kasavanahalli, HSR Layout, Bellandur, Bengaluru.",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Divit MindSpace - About Us"
      }
    ],
    siteName: "Divit MindSpace"
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Divit MindSpace - Mental Health, Neurodevelopment & Physiotherapy Bangalore",
    description: "Expert Clinical Assessments, Therapies, Counseling for Teenagers & Adults, Special Education, NIOS Support, Teacher & Parent Training, Physiotherapy and Customized Workshops off Sarjapur Road — Kasavanahalli, HSR Layout, Bellandur, Bengaluru.",
    images: ["/divit-mindspace-logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://divitmindspace.com/about-us"
  }
};

export default async function AboutUsPage() {
  const [aboutUsData, specialistsData, siteSettingsData, servicesData] = await Promise.all([
    sanityFetch({ query: ABOUT_US_QUERY, tags: ["aboutUs"] }),
    sanityFetch({ query: SPECIALISTS_QUERY, tags: ["specialist"] }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: ALL_SERVICES_QUERY, tags: ["services"] }),
  ]);

  const aboutUs = aboutUsData.data as AboutUsQueryResult;
  const specialists = (specialistsData.data as SpecialistsQueryResult) || [];
  const siteSettings = siteSettingsData.data;

  // Build a chip-label → service-slug map so hero chips link to real service detail pages.
  // Chip labels differ slightly from Sanity titles; aliases close the gap without fuzzy matching.
  type SanitySvc = { title: string; slug?: { current?: string }; category?: string };
  const allServices = (servicesData.data as SanitySvc[] | undefined) ?? [];
  const titleToSlug = new Map<string, string>();
  for (const s of allServices) {
    if (s?.slug?.current) titleToSlug.set(s.title.toLowerCase(), s.slug.current);
  }
  const chipAliasToTitle: Record<string, string> = {
    "post-surgical rehab": "post-surgical rehabilitation",
    "counseling for teenagers & adults": "counselling (child, adolescent, adult & parent)",
    "nios support": "nios support program",
    "teacher & parent training": "parental training program",
    "group sessions": "group therapy sessions",
  };
  const serviceSlugByChipLabel: Record<string, string> = {};
  for (const [label, slug] of titleToSlug) {
    serviceSlugByChipLabel[label] = slug;
  }
  for (const [alias, targetTitle] of Object.entries(chipAliasToTitle)) {
    const slug = titleToSlug.get(targetTitle.toLowerCase());
    if (slug) serviceSlugByChipLabel[alias] = slug;
  }

  // Generate Person schemas for all specialists
  const specialistSchemas = specialists.map(generateSpecialistSchema);

  // Get FAQ data from Sanity with fallback
  const aboutFaqs = siteSettings?.aboutPage?.faqs?.length ? siteSettings.aboutPage.faqs : defaultAboutFaqs;

  // Generate FAQ Schema dynamically
  const faqJsonLd = generateFaqSchema(aboutFaqs);

  // Single consolidated @graph — cleaner signal than N independent JSON-LD blocks.
  // All entities cross-reference the canonical Organization + WebSite via @id.
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/about-us#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "About Us", item: `${SITE_URL}/about-us` },
        ],
      },
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about-us#aboutpage`,
        url: `${SITE_URL}/about-us`,
        name: "About Divit MindSpace",
        description:
          "About Divit MindSpace — Bangalore's leading center for Mental Health, Neurodevelopment and Physiotherapy off Sarjapur Road (Kasavanahalli). Our story, our team, and the full range of services we offer across all ages.",
        inLanguage: SITE_LANGUAGE,
        isPartOf: { "@id": WEBSITE_ID },
        about: ORGANIZATION_REF,
        mainEntity: ORGANIZATION_ID,
        primaryImageOfPage: `${SITE_URL}/divit-mindspace-logo.png`,
      },
      // Strip @context from individual entries — it's declared once at the graph root.
      ...[faqJsonLd, ...specialistSchemas].map((s) => {
        const clone: Record<string, unknown> = { ...(s as Record<string, unknown>) };
        delete clone["@context"];
        return clone;
      }),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageGraph) }}
      />
      <main className="min-h-screen">
        <HeroSection data={aboutUs?.hero} metrics={siteSettings?.metrics} serviceSlugByChipLabel={serviceSlugByChipLabel} />
        <StorySection data={aboutUs?.story} />
        <PhilosophySection data={aboutUs?.philosophy} />
        <FoundersSpecialistsSection specialists={specialists} />
        <FaqSection faqs={aboutFaqs} title="Frequently Asked Questions" subtitle="" />
        <CtaSection />
      </main>
    </>
  );
}
