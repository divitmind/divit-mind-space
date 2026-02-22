import type { Metadata } from "next";
import { HeroSection } from "@/components/homepage/hero-section";
import { FeaturesShowcaseSection } from "@/components/homepage/features-showcase-section";
import { WhyJoinSection } from "@/components/homepage/why-join-section";
import { ServicesSection } from "@/components/homepage/services-section";
import { WhoNeedsItSection } from "@/components/homepage/who-needs-it-section";
import { TestimonialsSection } from "@/components/homepage/testimonials-section";
import { FaqSection } from "@/components/homepage/faq-section";
import { CtaSection } from "@/components/homepage/cta-section";
import { ValueProps } from "@/components/homepage/value-props";

export const metadata: Metadata = {
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
      name: "Do I need a referral to book an assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, you do not need a referral. You can book an appointment directly with us. However, if you have any reports from schools or other professionals, please bring them along.",
      },
    },
    {
      "@type": "Question",
      name: "What happens during the initial consultation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The initial consultation is a casual conversation where we listen to your concerns, understand your child's history, and discuss your goals. It helps us recommend the right assessments or therapy plan.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer online therapy sessions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer online options for parent guidance and certain types of therapy. However, assessments and some interventions are best conducted in person for accuracy and effectiveness.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical assessment take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A comprehensive assessment usually takes 2-3 sessions, spread over a few days. This ensures your child is comfortable and performs their best without fatigue.",
      },
    },
    {
      "@type": "Question",
      name: "My child is very young. Is it too early to seek help?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Early intervention is key. If you have concerns about your child's development, it is never too early to seek professional advice. We work with children as young as 18 months.",
      },
    },
  ],
};

export default function Page() {
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
        <HeroSection />
        <FeaturesShowcaseSection />
        <WhyJoinSection />
        <ValueProps />
        <ServicesSection />
        <WhoNeedsItSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
    </>
  );
}
