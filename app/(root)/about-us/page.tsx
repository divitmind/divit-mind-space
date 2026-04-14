import type { Metadata } from "next";
import { HeroSection } from "@/components/about-us/hero-section";
import { PhilosophySection } from "@/components/about-us/philosophy-section";
import { StorySection } from "@/components/about-us/story-section";
import { FoundersSpecialistsSection } from "@/components/about-us/founders-specialists-section";
import { CtaSection } from "@/components/homepage/cta-section";
import { FaqSection } from "@/components/homepage/faq-section";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_US_QUERY, SPECIALISTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { AboutUsQueryResult, SpecialistsQueryResult, Specialist } from "@/sanity/types";
import type { SiteSettings, FAQ } from "@/lib/types";

// Generate Person schema for specialists (critical for LLM "who" queries)
function generateSpecialistSchema(specialist: Specialist) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: specialist.name,
    jobTitle: specialist.title,
    description: specialist.teaser,
    image: specialist.image?.asset?.url,
    worksFor: {
      "@type": "MedicalBusiness",
      name: "Divit MindSpace",
      url: "https://divitmindspace.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kasavanahalli, Off Sarjapur Road",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
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

// Default FAQs for fallback when Sanity data isn't available
const defaultAboutFaqs: FAQ[] = [
  {
    question: "Who are the founders and specialists at Divit MindSpace Bangalore?",
    answer: "Divit MindSpace was founded by Debarati Basak (Clinical Psychologist) and Pavithra Lakshmi (Behavioral Therapist). Our multidisciplinary team includes licensed speech therapists, occupational therapists, special educators, and physiotherapists—all with specialized training in neurodevelopmental conditions like autism and ADHD.",
  },
  {
    question: "What makes Divit MindSpace different from other therapy centers in Bangalore?",
    answer: "We combine clinical expertise with personal understanding—our founders have firsthand experience with neurodivergent families. Our neuro-affirming approach focuses on each child's strengths, not just challenges. We also conduct FREE awareness sessions across schools and communities in Sarjapur Road, HSR Layout, and Bellandur areas.",
  },
  {
    question: "Does Divit MindSpace offer services for adults with ADHD or autism?",
    answer: "Yes, we provide comprehensive services for adults including ADHD assessments, autism evaluations, counseling, cognitive therapy, and physiotherapy. Many adults visit our Kasavanahalli center for late-diagnosis support, workplace challenges, and mental health concerns.",
  },
];

// Generate FAQ Schema JSON-LD dynamically
function generateFaqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
  title: "About Us | Divit MindSpace - Mental Health & Neurodevelopment Bangalore",
  description: "Bangalore's leading center for mental health, neurodevelopment, and physiotherapy. Expert clinical assessments, professional counseling, and specialized education for all ages. Located off Sarjapur Road, we provide trusted care for families in Kasavanahalli, HSR Layout, Bellandur, and Bengaluru.",
  keywords: [
    "mental health Bangalore",
    "neurodevelopmental care Bangalore",
    "physiotherapy Sarjapur Road",
    "clinical assessments Bangalore",
    "special education Bangalore",
    "autism support Bangalore",
    "ADHD counseling Bangalore",
    "Kasavanahalli therapy center",
    "HSR Layout child development",
    "Bellandur mental health services"
  ],
  openGraph: {
    type: "website",
    url: "https://divitmindspace.com/about-us",
    title: "About Us | Divit MindSpace - Leading Center for Mental Health & Neurodevelopment",
    description: "Expert clinical assessments, therapies, and specialized education off Sarjapur Road. Trusted care for families in Kasavanahalli, HSR Layout, and Bellandur.",
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
    title: "About Us | Divit MindSpace - Mental Health & Neurodevelopment Bangalore",
    description: "Clinical assessments, therapies, and family support for neurodivergent individuals off Sarjapur Road.",
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
  const [aboutUsData, specialistsData, siteSettingsData] = await Promise.all([
    sanityFetch({ query: ABOUT_US_QUERY, tags: ["aboutUs"] }),
    sanityFetch({ query: SPECIALISTS_QUERY, tags: ["specialist"] }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);

  const aboutUs = aboutUsData.data as AboutUsQueryResult;
  const specialists = (specialistsData.data as SpecialistsQueryResult) || [];
  const siteSettings = siteSettingsData.data;

  // Generate Person schemas for all specialists
  const specialistSchemas = specialists.map(generateSpecialistSchema);

  // Get FAQ data from Sanity with fallback
  const aboutFaqs = siteSettings?.aboutPage?.faqs?.length ? siteSettings.aboutPage.faqs : defaultAboutFaqs;

  // Generate FAQ Schema dynamically
  const faqJsonLd = generateFaqSchema(aboutFaqs);

  // Breadcrumb schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://divitmindspace.com" },
      { "@type": "ListItem", position: 2, name: "About Us", item: "https://divitmindspace.com/about-us" },
    ],
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* FAQ Schema for LLM visibility */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Person Schema for each specialist - critical for LLM "who" queries */}
      {specialistSchemas.map((schema, index) => (
        <script
          key={`specialist-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main className="min-h-screen">
        <HeroSection data={aboutUs?.hero} />
        <PhilosophySection data={aboutUs?.philosophy} />
        <StorySection data={aboutUs?.story} />
        <FoundersSpecialistsSection specialists={specialists} />
        <FaqSection faqs={aboutFaqs} title="Frequently Asked Questions" subtitle="About Our Team & Approach" />
        <CtaSection />
      </main>
    </>
  );
}
