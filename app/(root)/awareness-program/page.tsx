import type { Metadata } from "next";
import { AwarenessPage } from "@/components/awareness/awareness-page";

export const metadata: Metadata = {
  title: "Awareness Programs | Divit MindSpace - Community Education & Outreach",
  description: "Join our FREE awareness sessions on early intervention for neurodivergent children. Learn to recognize signs, break stigma, and support families across preschools, schools, and organizations in Bangalore.",
  keywords: [
    "neurodivergent awareness",
    "early intervention education",
    "autism awareness sessions",
    "ADHD awareness workshops",
    "teacher training neurodiversity",
    "parent awareness programs",
    "inclusive education training",
    "community outreach",
    "free awareness sessions",
    "Bangalore awareness programs",
    "neurodiversity education",
    "special education awareness"
  ],
  openGraph: {
    type: "website",
    url: "https://divitmindspace.com/awareness-program",
    title: "FREE Awareness Programs on Neurodivergent Early Intervention",
    description: "Breaking myths and building understanding. Free awareness sessions for teachers, parents, and communities about early intervention and neurodiversity support.",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Divit MindSpace Awareness Programs - Community Education"
      }
    ],
    siteName: "Divit MindSpace"
  },
  twitter: {
    card: "summary_large_image",
    title: "FREE Awareness Programs | Divit MindSpace",
    description: "Breaking stigma through education. Free sessions on early intervention for neurodivergent children across schools and communities.",
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
    canonical: "https://divitmindspace.com/awareness-program"
  }
};

export default function AwarenessProgramRoute() {
  return (
    <>
      {/* JSON-LD Structured Data for Educational Events */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Divit MindSpace",
            "url": "https://divitmindspace.com",
            "description": "Provider of awareness programs and education on early intervention for neurodivergent children",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bangalore",
              "addressCountry": "IN"
            },
            "event": [
              {
                "@type": "EducationEvent",
                "name": "Awareness Workshop at Jyoti Nivas College, Koramangala",
                "description": "FREE awareness session on early intervention for neurodivergent children, covering recognition of early signs, therapy benefits, and breaking stigma",
                "location": {
                  "@type": "Place",
                  "name": "Jyoti Nivas College",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Koramangala, Bangalore",
                    "addressCountry": "IN"
                  }
                },
                "organizer": {
                  "@type": "Organization",
                  "name": "Divit MindSpace",
                  "url": "https://divitmindspace.com"
                },
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "INR",
                  "availability": "https://schema.org/InStock"
                },
                "audience": {
                  "@type": "EducationalAudience",
                  "audienceType": "Teachers, Parents, Students"
                }
              },
              {
                "@type": "EducationEvent",
                "name": "Awareness Session for Teachers at TISB School, Domasandra",
                "description": "FREE teacher training on recognizing neurodivergence signs and supporting neurodivergent students in educational settings",
                "location": {
                  "@type": "Place",
                  "name": "TISB School",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Domasandra, Bangalore",
                    "addressCountry": "IN"
                  }
                },
                "organizer": {
                  "@type": "Organization",
                  "name": "Divit MindSpace",
                  "url": "https://divitmindspace.com"
                },
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "INR",
                  "availability": "https://schema.org/InStock"
                },
                "audience": {
                  "@type": "EducationalAudience",
                  "audienceType": "Teachers, Educators"
                }
              }
            ]
          })
        }}
      />
      <AwarenessPage />
    </>
  );
}
