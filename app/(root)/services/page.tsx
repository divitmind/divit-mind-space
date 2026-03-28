import type { Metadata } from "next";
import { Suspense } from "react";
import ServicesPage from "@/components/services/services-page";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_SERVICES_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Our Services | Divit MindSpace",
  description:
    "Explore our comprehensive range of specialized services including educational assessments, psychometric assessments, special education sessions, and training programs for neurodivergent individuals.",
  openGraph: {
    title: "Our Services | Divit MindSpace",
    description:
      "Explore our comprehensive range of specialized services including educational assessments, psychometric assessments, special education sessions, and training programs for neurodivergent individuals.",
    type: "website",
    url: "https://divitmindspace.com/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Divit MindSpace",
    description:
      "Explore our comprehensive range of specialized services including educational assessments, psychometric assessments, special education sessions, and training programs for neurodivergent individuals.",
  },
  alternates: {
    canonical: "https://divitmindspace.com/services",
  },
};

interface SanityService {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  popular: boolean;
  isTherapy: boolean;
  category: string;
  image?: {
    asset?: { _ref: string };
    hotspot?: { x: number; y: number; height: number; width: number };
    crop?: { top: number; bottom: number; left: number; right: number };
    alt?: string;
  };
}

export default async function ServicesListPage() {
  const { data: services } = await sanityFetch({
    query: ALL_SERVICES_QUERY,
    tags: ["services"],
  }) as { data: SanityService[] | null };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Divit MindSpace Services",
    description:
      "Comprehensive services for neurodivergent individuals including assessments, special education, and training programs.",
    numberOfItems: 14,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Psychometric Assessment" },
      { "@type": "ListItem", position: 2, name: "Educational Assessment" },
      { "@type": "ListItem", position: 3, name: "Behavioral Assessment" },
      { "@type": "ListItem", position: 4, name: "Developmental Screening" },
      { "@type": "ListItem", position: 5, name: "Speech Therapy" },
      { "@type": "ListItem", position: 6, name: "Occupational Therapy" },
      { "@type": "ListItem", position: 7, name: "Behavior Therapy" },
      { "@type": "ListItem", position: 8, name: "Play Therapy" },
      { "@type": "ListItem", position: 9, name: "Parent Counseling" },
      { "@type": "ListItem", position: 10, name: "Teacher Training" },
      { "@type": "ListItem", position: 11, name: "School Consultation" },
      { "@type": "ListItem", position: 12, name: "Special Education Program" },
      { "@type": "ListItem", position: 13, name: "Social Skills Group" },
      { "@type": "ListItem", position: 14, name: "Summer Enrichment Program" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense fallback={<div className="min-h-screen bg-[#FAF9F5]" />}>
        <ServicesPage services={services || []} />
      </Suspense>
    </>
  );
}
