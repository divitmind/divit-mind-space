import type { Metadata } from "next";
import { HeroSection } from "@/components/homepage/hero-section";
import { ServicesSection } from "@/components/homepage/services-section";
import { TestimonialsSection } from "@/components/homepage/testimonials-section";
import { WhoNeedsItSection } from "@/components/homepage/who-needs-it-section";
import { FaqSection } from "@/components/homepage/faq-section";
import { CtaSection } from "@/components/homepage/cta-section";
import { sanityFetch } from "@/sanity/lib/live";
import { TOP_REVIEWS_QUERY, THERAPY_SERVICES_QUERY, ANNOUNCEMENT_QUERY } from "@/sanity/lib/queries";
import { ReviewsQueryResult, ServicesQueryResult, AnnouncementQueryResult } from "@/sanity/types";

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
  name: "Divit MindSpace",
  url: "https://divitmindspace.com",
  description:
    "Bangalore’s leading center for Mental Health, Neurodevelopment & Physiotherapy. Divit MindSpace provides expert-led Clinical Assessments, Professional Counseling, Speech Therapy, and Occupational Therapy for children, teens, and adults off Sarjapur Road (Kasavanahalli).",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://divitmindspace.com/blogs?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need a diagnosis or referral before booking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No referral or prior diagnosis is needed. You can book directly with us. If you have any existing reports from schools or doctors, bring them along—but they're not required to get started.",
      },
    },
    {
      "@type": "Question",
      name: "My child is very young. Is it too early to seek help?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Early intervention is one of the most effective ways to support development. If you have concerns, it's never too early to consult. We work with children as young as 18 months.",
      },
    },
    {
      "@type": "Question",
      name: "How long does an assessment take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A comprehensive assessment typically takes 2-3 sessions spread over a few days. This approach ensures your child is comfortable and performs their best without fatigue.",
      },
    },
    {
      "@type": "Question",
      name: "How soon will I see progress with therapy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every child is different. Some families notice changes within weeks, while others see gradual progress over months. We set realistic milestones together and keep you informed throughout the journey.",
      },
    },
    {
      "@type": "Question",
      name: "What if my child doesn't cooperate during sessions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This is completely normal and expected. Our therapists are trained to work with children at their own pace. We use play-based and child-led approaches to build trust before diving into structured activities.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer online sessions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer online options for parent guidance and certain therapies. However, assessments and some interventions are more effective in person. We'll recommend what works best for your situation.",
      },
    },
  ],
};

export default async function Page() {
  const [{ data: reviews }, { data: therapyServices }, { data: announcement }] = await Promise.all([
    sanityFetch({ query: TOP_REVIEWS_QUERY }),
    sanityFetch({ query: THERAPY_SERVICES_QUERY, tags: ["services"] }),
    sanityFetch({ query: ANNOUNCEMENT_QUERY, tags: ["promowebsite"] }),
  ]);

  const therapyServicesData = (therapyServices as ServicesQueryResult) ?? [];
  const announcementData = announcement as AnnouncementQueryResult;

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
        <HeroSection announcement={announcementData?.text} />
        <ServicesSection therapyServices={therapyServicesData} />
        <TestimonialsSection reviews={(reviews as ReviewsQueryResult) ?? []} />
        <WhoNeedsItSection />
        <FaqSection />
        <CtaSection />
      </main>
    </>
  );
}
