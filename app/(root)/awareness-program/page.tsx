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

  // Dynamic EducationEvent schema per real past session from Sanity — no fabrication.
  // If Sanity has no sessions, we skip the event[] block entirely.
  const eventJsonLd = pastSessions.length > 0
    ? pastSessions
        .filter((s) => s.venue)
        .map((s) => ({
          "@type": "EducationEvent",
          name: `Awareness Session at ${s.venue}`,
          description: s.audience
            ? `Free awareness session for ${s.audience} on early intervention, neurodivergence recognition, and community support — delivered by Divit MindSpace Bangalore.`
            : "Free awareness session on early intervention and neurodivergence support by Divit MindSpace Bangalore.",
          location: {
            "@type": "Place",
            name: s.venue,
          },
          organizer: ORGANIZATION_REF,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
          ...(s.audience && {
            audience: {
              "@type": "EducationalAudience",
              audienceType: s.audience,
            },
          }),
          ...(s.image?.asset?.url && { image: s.image.asset.url }),
        }))
    : [];

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
    ...(eventJsonLd.length > 0 && { event: eventJsonLd }),
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
