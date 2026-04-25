import type { Metadata } from "next";
import { HeroSection } from "@/components/homepage/hero-section";
import { ServicesSection } from "@/components/homepage/services-section";
import { TestimonialsSection } from "@/components/homepage/testimonials-section";
import { WhoNeedsItSection } from "@/components/homepage/who-needs-it-section";
import { FaqSection } from "@/components/homepage/faq-section";
import { CtaSection } from "@/components/homepage/cta-section";
import { ExplorePivotsSection } from "@/components/homepage/explore-pivots-section";
import { LocalAuthoritySection } from "@/components/homepage/local-authority-section";
import { sanityFetch } from "@/sanity/lib/live";
import { TOP_REVIEWS_QUERY, THERAPY_SERVICES_QUERY, ANNOUNCEMENT_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { ReviewsQueryResult, ServicesQueryResult, AnnouncementQueryResult } from "@/sanity/types";
import type { SiteSettings, FAQ } from "@/lib/types";
import {
  ORGANIZATION_REF,
  SITE_URL,
  SITE_LANGUAGE,
  WEBSITE_ID,
} from "@/lib/seo";

// Force dynamic rendering - always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Divit MindSpace | Leading Center for Mental Health, Neurodevelopment & Physiotherapy Bangalore",
  description:
    "Bangalore’s leading center for Mental Health, Neurodevelopment & Physiotherapy, serving children, teens, and adults. Located off Sarjapur Road (Kasavanahalli), we provide expert Clinical Assessments and therapies including Speech Therapy, Occupational Therapy, ABA, Pediatric & Adult Physiotherapy, CBT, and Special Education.",
  keywords: [
    "mental health Bangalore",
    "neurodevelopmental care Bangalore",
    "physiotherapy Sarjapur Road",
    "clinical assessments Bangalore",
    "special education Bangalore",
    "autism support Bangalore",
    "ADHD counseling Bangalore",
    "adult mental health Bangalore",
    "teen counseling Bangalore",
    "child development center Bangalore",
    "integrative wellness Bangalore",
    "speech therapy Bangalore",
    "occupational therapy Bangalore",
    "ABA therapy Bangalore",
  ],
  alternates: {
    canonical: "https://divitmindspace.com",
  },
  openGraph: {
    type: "website",
    url: "https://divitmindspace.com",
    title: "Divit MindSpace | Leading Center for Mental Health & Neurodevelopment",
    description:
      "Bangalore’s leading center for Mental Health, Neurodevelopment & Physiotherapy. Supporting children, teens, and adults with clinical excellence off Sarjapur Road (Kasavanahalli).",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Divit MindSpace — Mental Health & Neurodevelopment",
      },
    ],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divit MindSpace | Mental Health & Neurodevelopment",
    description:
      "Expert clinical assessments, physiotherapy, and 21+ evidence-based services for all ages off Sarjapur Road (Kasavanahalli).",
    images: ["/divit-mindspace-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Divit MindSpace",
  alternateName: "Divit MindSpace Bangalore",
  url: SITE_URL,
  inLanguage: SITE_LANGUAGE,
  publisher: ORGANIZATION_REF,
  description:
    "Bangalore's leading center for Mental Health, Neurodevelopment & Physiotherapy. Divit MindSpace provides expert-led Clinical Assessments, Professional Counseling, Speech Therapy, Occupational Therapy, Special Education, NIOS Support, and Physiotherapy for children, teens, and adults off Sarjapur Road (Kasavanahalli).",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blogs?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// Default FAQs for fallback when Sanity data isn't available
const defaultFaqs: FAQ[] = [
  {
    question: "Do I need a diagnosis or referral before booking at Divit MindSpace?",
    answer: "No referral or prior diagnosis is needed. You can book directly with us at our Kasavanahalli center off Sarjapur Road, Bangalore. If you have any existing reports from schools or doctors, bring them along—but they're not required to get started.",
  },
  {
    question: "My child is very young. Is it too early to seek help?",
    answer: "Early intervention is one of the most effective ways to support development. If you have concerns, it's never too early to consult our specialists in Bangalore. We work with children as young as 18 months at our center off Sarjapur Road.",
  },
  {
    question: "How soon will I see progress with therapy?",
    answer: "Every child is different. Some families notice changes within weeks, while others see gradual progress over months. Our Bangalore-based therapists set realistic milestones together and keep you informed throughout the journey.",
  },
  {
    question: "What if my child doesn't cooperate during sessions?",
    answer: "This is completely normal and expected. Our therapists at Divit MindSpace are trained to work with children at their own pace. We use play-based and child-led approaches to build trust before diving into structured activities.",
  },
];

// FAQPage JSON-LD — includes Speakable specification so voice assistants
// (Google Assistant, Alexa, Siri) know which parts of the page to read aloud.
function generateFaqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#homepage-faq`,
    inLanguage: SITE_LANGUAGE,
    isPartOf: { "@id": WEBSITE_ID },
    about: ORGANIZATION_REF,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h3", "[role='region']"],
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

export default async function Page() {
  const [{ data: reviews }, { data: therapyServices }, { data: announcement }, { data: siteSettings }] = await Promise.all([
    sanityFetch({ query: TOP_REVIEWS_QUERY }),
    sanityFetch({ query: THERAPY_SERVICES_QUERY, tags: ["services"] }),
    sanityFetch({ query: ANNOUNCEMENT_QUERY, tags: ["promowebsite"] }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);

  const therapyServicesData = (therapyServices as ServicesQueryResult) ?? [];
  const announcementData = announcement as AnnouncementQueryResult;

  // Get FAQ data from Sanity with fallback
  const homepageFaqs = siteSettings?.homepage?.faqs?.length ? siteSettings.homepage.faqs : defaultFaqs;
  const faqTitle = siteSettings?.homepage?.faqTitle || "Frequently Asked Questions";
  const faqSubtitle = siteSettings?.homepage?.faqSubtitle || "";

  // Generate FAQ Schema dynamically
  const faqJsonLd = generateFaqSchema(homepageFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main>
        <HeroSection announcement={announcementData?.text} siteSettings={siteSettings} />
        <ServicesSection serviceCategories={siteSettings?.homepage?.serviceCategories} />
        <TestimonialsSection reviews={(reviews as ReviewsQueryResult) ?? []} />
        <WhoNeedsItSection
          title={siteSettings?.homepage?.whoNeedsItTitle}
          items={siteSettings?.homepage?.whoNeedsIt}
        />
        <ExplorePivotsSection />
        <FaqSection faqs={homepageFaqs} title={faqTitle} subtitle={faqSubtitle} />
        <LocalAuthoritySection />
        <CtaSection />
      </main>
    </>
  );
}
