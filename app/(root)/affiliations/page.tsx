import type { Metadata } from "next";
import { AffiliationsPage } from "@/components/affiliations/affiliations-page";
import { sanityFetch } from "@/sanity/lib/live";
import { AFFILIATIONS_QUERY } from "@/sanity/lib/queries";
import type { AffiliationsQueryResult } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Strategic Partnerships | Divit MindSpace x GD Goenka Healthcare Academy",
  description: "Divit Health partners with GD Goenka Healthcare Academy to deliver specialized training programs for parents, teachers, and professionals supporting neurodivergent children. Evidence-based strategies for inclusive education.",
  keywords: [
    "healthcare training partnerships",
    "neurodivergent education collaboration",
    "professional development",
    "teacher training programs",
    "parent education courses",
    "GD Goenka Healthcare",
    "special education training",
    "inclusive education programs",
    "evidence-based strategies",
    "healthcare education",
    "neurodiversity training",
    "professional certification"
  ],
  openGraph: {
    type: "website",
    url: "https://divitmindspace.com/affiliations",
    title: "Strategic Partnerships | Divit Health x GD Goenka Healthcare Academy",
    description: "Collaborative training programs empowering educators and parents to support neurodivergent children effectively. Evidence-based, professional, impactful.",
    images: [
      {
        url: "/affiliations.png",
        width: 1200,
        height: 630,
        alt: "Partnership between Divit Health and GD Goenka Healthcare Academy showing collaborative healthcare education"
      }
    ],
    siteName: "Divit MindSpace"
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategic Partnerships | Divit Health x GD Goenka",
    description: "Specialized training programs for neurodivergent support. Evidence-based education for parents, teachers, and professionals.",
    images: ["/affiliations.png"]
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
    canonical: "https://divitmindspace.com/affiliations"
  }
};

export default async function AffiliationsRoute() {
  const { data } = await sanityFetch({ 
    query: AFFILIATIONS_QUERY, 
    tags: ["affiliations"] 
  });
  
  const affiliationsData = data as AffiliationsQueryResult;

  return (
    <>
      {/* JSON-LD Structured Data for Partnership and Organizations */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Divit MindSpace",
            "url": "https://divitmindspace.com",
            "description": "Provider of specialized care and education for neurodivergent children",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bangalore",
              "addressCountry": "IN"
            },
            "partner": {
              "@type": "EducationalOrganization",
              "name": "GD Goenka Healthcare Academy",
              "description": "Leading healthcare education provider offering specialized training programs",
              "url": "https://www.gdgoenkahealthcare.com",
              "parentOrganization": {
                "@type": "Organization",
                "name": "GD Goenka Group",
                "description": "Leading education group with over 100,000 students across India"
              }
            },
            "offers": {
              "@type": "EducationalOccupationalProgram",
              "name": "Specialized Training Programs for Neurodivergent Support",
              "description": "Evidence-based training for parents, teachers, and professionals on supporting neurodivergent children",
              "provider": [
                {
                  "@type": "Organization",
                  "name": "Divit Health"
                },
                {
                  "@type": "Organization",
                  "name": "GD Goenka Healthcare Academy"
                }
              ],
              "educationalCredentialAwarded": "Professional Certificate",
              "audience": {
                "@type": "EducationalAudience",
                "audienceType": "Parents, Teachers, Healthcare Professionals"
              }
            }
          })
        }}
      />
      <AffiliationsPage data={affiliationsData} />
    </>
  );
}
