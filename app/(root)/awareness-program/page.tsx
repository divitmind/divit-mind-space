import type { Metadata } from "next";
import { AwarenessPage } from "@/components/awareness/awareness-page";
import { sanityFetch } from "@/sanity/lib/live";
import { AWARENESS_QUERY } from "@/sanity/lib/queries";
import { AwarenessQueryResult } from "@/sanity/types";
import { ORGANIZATION_REF, SITE_URL, SITE_LANGUAGE, WEBSITE_ID } from "@/lib/seo";
import {
  AWARENESS_INSTITUTIONS,
  AWARENESS_WORKSHOP_TITLES,
  AWARENESS_FAQS,
} from "@/lib/awareness-content";

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

  // ItemList of the 15+ institutions we've reached — named social proof that
  // Google + LLMs can cite as concrete delivery evidence.
  const institutionsListJsonLd = {
    "@type": "ItemList",
    "@id": `${SITE_URL}/awareness-program#institutions`,
    name: "Institutions where Divit MindSpace has conducted awareness programs",
    numberOfItems: AWARENESS_INSTITUTIONS.length,
    itemListElement: AWARENESS_INSTITUTIONS.map((name, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: { "@type": "EducationalOrganization", name },
    })),
  };

  // Course schema per workshop topic — each is an eligible Google "Course"
  // carousel entry for the specific topic phrase (Screen Time Management,
  // Bullying Prevention, etc.). provider references the canonical Org via @id.
  const workshopCoursesJsonLd = AWARENESS_WORKSHOP_TITLES.map((topicTitle, idx) => ({
    "@type": "Course",
    "@id": `${SITE_URL}/awareness-program#workshop-${idx}`,
    name: topicTitle,
    description: `Customised ${topicTitle} workshop delivered by Divit MindSpace for schools, colleges, corporates, hospitals, and apartment communities in Bangalore.`,
    provider: ORGANIZATION_REF,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR", availability: "https://schema.org/InStock" },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "https://schema.org/OnSite",
      inLanguage: SITE_LANGUAGE,
    },
  }));

  // FAQPage schema — biggest AEO lever on this route; the Q&A answers are
  // citation-ready for ChatGPT / Perplexity / Google AI Overviews. Speakable
  // spec signals Google Assistant to read the Q/A aloud for voice search.
  const faqPageJsonLd = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/awareness-program#faq`,
    inLanguage: SITE_LANGUAGE,
    isPartOf: { "@id": WEBSITE_ID },
    about: ORGANIZATION_REF,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable]", "h3", "h2"],
    },
    mainEntity: AWARENESS_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  // DefinedTerm — gives LLMs a clean semantic anchor for "awareness program"
  // so when a user asks "what is an awareness program by Divit MindSpace"
  // there's a ready-to-quote definition block.
  const definedTermJsonLd = {
    "@type": "DefinedTerm",
    "@id": `${SITE_URL}/awareness-program#definition`,
    name: "Awareness Program",
    termCode: "awareness-program",
    description:
      "A complimentary session delivered by Divit MindSpace that empowers teachers, parents, and communities with knowledge about neurodivergence, early intervention, and mental health. Sessions are customised to the audience and always free of charge.",
    inDefinedTermSet: ORGANIZATION_REF,
  };

  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      educationalOrgJsonLd,
      breadcrumbJsonLd,
      institutionsListJsonLd,
      ...workshopCoursesJsonLd,
      faqPageJsonLd,
      definedTermJsonLd,
    ].map((s) => {
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
