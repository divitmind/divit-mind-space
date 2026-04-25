import type { Metadata } from "next";
import { Suspense } from "react";
import ServicesPage from "@/components/services/services-page";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_SERVICES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/lib/types";
import { ORGANIZATION_REF, SITE_URL, SITE_LANGUAGE, WEBSITE_ID } from "@/lib/seo";

// Force dynamic rendering - always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Services | Divit MindSpace Bangalore",
  description:
    "Explore the full catalog at Divit MindSpace — Clinical Assessments, Therapies, Counseling, Special Education, NIOS Support, Teacher & Parent Training, Physiotherapy (Pain Management, Post-Surgical Rehab, Sports Injuries, Assistive Devices, Wheelchair Training), and Customized Workshops. Off Sarjapur Road (Kasavanahalli), Bangalore.",
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/services`,
    title: "Our Services | Divit MindSpace Bangalore",
    description:
      "Clinical Assessments, Therapies, Counseling, Special Education, NIOS Support, Training Programs, Physiotherapy, and Customized Workshops — for all ages.",
    images: [{ url: "/divit-mindspace-logo.png", width: 1200, height: 630, alt: "Divit MindSpace Services" }],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Divit MindSpace Bangalore",
    description:
      "Full service catalog — clinical assessments, therapies, education, physiotherapy, and workshops at our Kasavanahalli center.",
    images: ["/divit-mindspace-logo.png"],
  },
  robots: { index: true, follow: true },
};

// Services-index FAQs — answer category-level questions that apply across the catalog.
const servicesFaqs = [
  {
    question: "What categories of services does Divit MindSpace offer?",
    answer:
      "Divit MindSpace organizes its 28+ services into five categories: Assessments (psychometric, psychoeducational, condition-specific), Therapy (speech, occupational, behavioral, cognitive, play, sensory integration, group, Brain Gym), Guidance (counseling and family support), Programs (early intervention, special education, NIOS, school readiness, certificate and diploma courses), and Physiotherapy (pain management, post-surgical rehab, sports injury, assistive devices, wheelchair training).",
  },
  {
    question: "Do I need a referral to book a service at Divit MindSpace?",
    answer:
      "No referral is required. You can book any of our services directly by calling +91-99016-66139 or WhatsApp at https://wa.me/919901666139. If you have prior reports or assessments, bring them to your first visit — they help but are not required.",
  },
  {
    question: "Are services available for adults, or only for children?",
    answer:
      "We support all ages — children, teenagers, and adults. Adult-focused services include Adult ADHD and Adult Autism assessments, professional counseling (stress, anxiety, depression, adult ADHD), cognitive therapy, and the full range of physiotherapy services.",
  },
  {
    question: "Where are services delivered?",
    answer:
      "All services are delivered in-person at Aadeshwar Chambers, Kasavanahalli (off Sarjapur Road), Bengaluru 560035. We serve families across Sarjapur Road, Kasavanahalli, HSR Layout, Bellandur, Koramangala, Whitefield, Marathahalli, and Electronic City.",
  },
  {
    question: "How long does a typical session last?",
    answer:
      "Most therapy and physiotherapy sessions run 45 to 60 minutes. Assessments typically take 2 to 3 hours across one or two visits. Program-based offerings (Early Intervention, School Readiness, NIOS Support, Certificate/Diploma courses) run across multiple sessions over weeks or months depending on the program.",
  },
];

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
  const [{ data: services }, { data: siteSettings }] = await Promise.all([
    sanityFetch({
      query: ALL_SERVICES_QUERY,
      tags: ["services"],
    }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);

  // Dynamic ItemList from live Sanity services; falls back to curated list if Sanity is empty
  const sanityServiceList = (services as SanityService[] | undefined) ?? [];
  const staticServiceNames = [
    "Psychometric Assessment",
    "Psychoeducational Assessment",
    "Clinical Assessment for Autism",
    "Clinical Assessment for ADHD",
    "Learning Disability Assessment",
    "Adult Autism Assessment",
    "Adult ADHD Assessment",
    "Speech Therapy",
    "Occupational Therapy",
    "Behavioral Therapy",
    "Cognitive Therapy",
    "Play Therapy",
    "Sensory Integration Therapy",
    "Group Therapy Sessions",
    "Brain Gym",
    "Counseling for Teenagers and Adults",
    "Stress, Anxiety and Depression Therapy",
    "Early Intervention Program",
    "Special Education and Remedial Sessions",
    "School Readiness Program",
    "Parental Training Program",
    "Teacher Training Program",
    "NIOS Support Program",
    "Certificate in Special Education",
    "Diploma in Special Education",
    "Summer Camp",
    "Physiotherapy — Pain Management",
    "Physiotherapy — Pain Modalities",
    "Post-Surgical Rehabilitation",
    "Physiotherapy for Gym and Sports Injuries",
    "Assistive Devices Assessment and Training",
    "Wheelchair Training",
    "Customized Workshops",
  ];
  const serviceNames = sanityServiceList.length
    ? sanityServiceList.map((s) => s.title)
    : staticServiceNames;
  const pageUrl = `${SITE_URL}/services`;
  // Single consolidated @graph — BreadcrumbList + CollectionPage + ItemList + FAQPage.
  // Every entity references the canonical Organization + WebSite via @id.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: pageUrl },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name: "Divit MindSpace Services",
        description:
          "Comprehensive services for neurodivergent individuals and adults — clinical assessments, therapies, counseling, special education, training programs, physiotherapy, and customized workshops.",
        inLanguage: SITE_LANGUAGE,
        isPartOf: { "@id": WEBSITE_ID },
        about: ORGANIZATION_REF,
        provider: ORGANIZATION_REF,
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#list`,
        name: "All Services at Divit MindSpace",
        numberOfItems: serviceNames.length,
        itemListElement: (sanityServiceList.length
          ? sanityServiceList.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: `${SITE_URL}/services/${s.slug.current}`,
            }))
          : serviceNames.map((name, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name,
            }))),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: SITE_LANGUAGE,
        isPartOf: { "@id": WEBSITE_ID },
        about: ORGANIZATION_REF,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h3"],
        },
        mainEntity: servicesFaqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense fallback={<div className="min-h-screen bg-[#FAF9F5]" />}>
        <ServicesPage services={(services as SanityService[]) || []} siteSettings={siteSettings} />
      </Suspense>
    </>
  );
}
