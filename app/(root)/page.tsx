import type { Metadata } from "next";
import { HeroSection } from "@/components/homepage/hero-section";
import { TrustMetrics } from "@/components/homepage/trust-metrics";
import { ServicesSection } from "@/components/homepage/services-section";
import { TestimonialsSection } from "@/components/homepage/testimonials-section";
import { WhoNeedsItSection } from "@/components/homepage/who-needs-it-section";
import { FaqSection } from "@/components/homepage/faq-section";
import { CtaSection } from "@/components/homepage/cta-section";
import { sanityFetch } from "@/sanity/lib/live";
import { TOP_REVIEWS_QUERY, THERAPY_SERVICES_QUERY, ANNOUNCEMENT_QUERY } from "@/sanity/lib/queries";
import { ReviewsQueryResult, ServicesQueryResult, AnnouncementQueryResult } from "@/sanity/types";

export const metadata: Metadata = {
// ... rest of metadata unchanged
  title: "Divit MindSpace | Neurodivergent Care & Education in Bangalore",
  description:
    "Divit MindSpace empowers neurodivergent children and their families through diagnostic assessments, customized special education, and professional training programs in Bangalore. Book a consultation today.",
  keywords: [
    "neurodivergent care Bangalore",
    "autism assessment Bangalore",
    "ADHD support India",
    "special education Bangalore",
    "early intervention neurodivergent",
    "learning disability assessment",
    "psychometric assessment children",
    "parent training neurodiversity",
    "neurodiversity support India",
    "special needs school Bangalore",
  ],
  alternates: {
    canonical: "https://divitmindspace.com",
  },
  openGraph: {
    type: "website",
    url: "https://divitmindspace.com",
    title: "Divit MindSpace | Neurodivergent Care & Education in Bangalore",
    description:
      "Empowering neurodivergent children through diagnostic assessments, customized special education, and family training programs in Bangalore.",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Divit MindSpace — Neurodivergent Care & Education",
      },
    ],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divit MindSpace | Neurodivergent Care & Education in Bangalore",
    description:
      "Diagnostic assessments, customized special education, and family training for neurodivergent individuals in Bangalore.",
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
    "Neurodivergent care and education — diagnostic assessments, customized teaching, and training in Bangalore.",
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
        <TrustMetrics />
        <ServicesSection therapyServices={therapyServicesData} />
        <TestimonialsSection reviews={(reviews as ReviewsQueryResult) ?? []} />
        <WhoNeedsItSection />
        <FaqSection />
        <CtaSection />
      </main>
    </>
  );
}
