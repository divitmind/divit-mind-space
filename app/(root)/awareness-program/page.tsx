import type { Metadata } from "next";
import { AwarenessPage } from "@/components/awareness/awareness-page";
import { sanityFetch } from "@/sanity/lib/live";
import { AWARENESS_QUERY } from "@/sanity/lib/queries";
import { AwarenessQueryResult } from "@/sanity/types";
import { ORGANIZATION_REF, SITE_URL } from "@/lib/seo";

// Force dynamic rendering - always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

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

type PastSession = { venue?: string; audience?: string; image?: { asset?: { url?: string } } };

export default async function AwarenessProgramRoute() {
  const awarenessData = await sanityFetch({
    query: AWARENESS_QUERY,
    tags: ["awareness"],
  });

  const awareness = awarenessData.data as AwarenessQueryResult;
  const pastSessions: PastSession[] = (awareness?.pastSessions?.sessions as PastSession[]) ?? [];

  // Past awareness sessions used to be emitted as EducationEvent schema, but Google's
  // Rich Result validator flagged them as invalid for missing required `startDate` +
  // `location` fields (Sanity's sessions don't store dates). Rather than synthesise
  // dates, we surface them as ImageObject entries (visible content + proper schema,
  // no Event-rich-result claim). When Sanity starts capturing real session dates in
  // future, we can switch these back to EducationEvent with correct startDate/endDate.
  const pastSessionsSchema = pastSessions
    .filter((s) => s.venue)
    .map((s) => ({
      "@type": "ImageObject" as const,
      contentUrl: s.image?.asset?.url,
      name: `Awareness session at ${s.venue}`,
      description: s.audience
        ? `Free awareness session for ${s.audience} delivered by Divit MindSpace Bangalore.`
        : `Free awareness session delivered by Divit MindSpace Bangalore.`,
      creator: ORGANIZATION_REF,
    }))
    .filter((s) => s.contentUrl);

  const educationalOrgJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/awareness-program#edu-org`,
    name: "Divit MindSpace",
    url: SITE_URL,
    description:
      "Provider of free awareness programs on early intervention, autism, ADHD, and neurodiversity — delivered to schools, colleges, and community groups across Bangalore.",
    parentOrganization: ORGANIZATION_REF,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Aadeshwar Chambers, Kasavanahalli, Off Sarjapur Road",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      postalCode: "560035",
      addressCountry: "IN",
    },
    ...(pastSessionsSchema.length > 0 && { image: pastSessionsSchema }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Awareness Program", item: `${SITE_URL}/awareness-program` },
    ],
  };

  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [educationalOrgJsonLd, breadcrumbJsonLd].map((s) => {
      const clone: Record<string, unknown> = { ...(s as Record<string, unknown>) };
      delete clone["@context"];
      return clone;
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageGraph) }}
      />
      <AwarenessPage data={awareness || undefined} />
    </>
  );
}
