import type { Metadata } from "next";
import { Suspense } from "react";
import ServicesPage from "@/components/services/services-page";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_SERVICES_QUERY } from "@/sanity/lib/queries";
import type { ServicesQueryResult } from "@/sanity/types";

export const metadata: Metadata = {
// ... rest of metadata
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

export default async function ServicesListPage() {
  const { data } = await sanityFetch({ 
    query: ALL_SERVICES_QUERY, 
    tags: ["services"] 
  });
  
  const servicesData = (data as ServicesQueryResult) || [];

  const jsonLd = {
// ... rest of jsonLd
      itemListElement: servicesData.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense fallback={<div className="min-h-screen bg-[#FAF9F5]" />}>
        <ServicesPage initialServices={servicesData} />
      </Suspense>
    </>
  );
}
