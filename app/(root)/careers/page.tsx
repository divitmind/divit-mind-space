import { Metadata } from "next";
import { CareersPage } from "@/components/careers/careers-page";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CAREERS_QUERY } from "@/sanity/lib/queries";
import type { CareersQueryResult, CareerListItem } from "@/sanity/types";

// Force dynamic rendering - always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers | Divit MindSpace - Therapy & Mental Health Jobs Bangalore",
  description:
    "Join Divit MindSpace in Bangalore. We're hiring Speech Therapists, Occupational Therapists, Psychologists, Special Educators, and Physiotherapists at our center off Sarjapur Road, Kasavanahalli. Work with neurodivergent children and families in HSR Layout, Bellandur area.",
  keywords: [
    "speech therapist jobs Bangalore",
    "occupational therapist jobs Sarjapur Road",
    "psychologist careers Bangalore",
    "special educator jobs Bangalore",
    "physiotherapist jobs Kasavanahalli",
    "mental health jobs Bangalore",
    "therapy jobs HSR Layout",
    "child development center careers Bangalore",
    "neurodevelopment jobs Bangalore",
    "ABA therapist jobs Bangalore",
    "clinical psychologist jobs Sarjapur Road",
    "pediatric therapist jobs Bangalore",
    "Divit MindSpace careers",
    "therapy center jobs Bellandur",
  ],
  alternates: {
    canonical: "https://divitmindspace.com/careers",
  },
  openGraph: {
    title: "Careers at Divit MindSpace | Therapy & Mental Health Jobs Bangalore",
    description:
      "Join our team off Sarjapur Road, Bangalore. Hiring Speech Therapists, OTs, Psychologists, Special Educators. Make a difference in neurodivergent care.",
    type: "website",
    url: "https://divitmindspace.com/careers",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Careers at Divit MindSpace Bangalore",
      },
    ],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Divit MindSpace | Jobs in Bangalore",
    description:
      "Hiring therapists, psychologists, and educators at our center off Sarjapur Road, Kasavanahalli. Join us in supporting neurodivergent families.",
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

// Organization data for JobPosting schema
const hiringOrganization = {
  "@type": "Organization",
  name: "Divit MindSpace",
  sameAs: "https://divitmindspace.com",
  logo: {
    "@type": "ImageObject",
    url: "https://divitmindspace.com/divit-mindspace-logo.png",
  },
};

// Job location for all positions
const jobLocation = {
  "@type": "Place",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kasavanahalli, Off Sarjapur Road",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560035",
    addressCountry: "IN",
  },
};

// Map employment types to Schema.org format
function getEmploymentType(type: string): string {
  const typeMap: Record<string, string> = {
    "full-time": "FULL_TIME",
    "part-time": "PART_TIME",
    "contract": "CONTRACTOR",
    "internship": "INTERN",
    "temporary": "TEMPORARY",
  };
  return typeMap[type.toLowerCase()] || "FULL_TIME";
}

// Generate JobPosting schema for each job
function generateJobPostingSchema(job: CareerListItem) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `${job.title} position at Divit MindSpace, Bangalore's leading center for mental health, neurodevelopment, and physiotherapy. Join our ${job.department} team at our center off Sarjapur Road, Kasavanahalli.`,
    datePosted: job.postedDate || new Date().toISOString().split("T")[0],
    employmentType: getEmploymentType(job.employmentType),
    hiringOrganization,
    jobLocation,
    jobLocationType: job.locationType === "onsite" ? "TELECOMMUTE" : undefined,
    applicantLocationRequirements: {
      "@type": "Country",
      name: "India",
    },
    directApply: true,
    url: `https://divitmindspace.com/careers/${job.slug.current}`,
    industry: "Healthcare, Mental Health, Child Development",
    occupationalCategory: job.department,
    ...(job.salaryRange && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "INR",
        value: {
          "@type": "QuantitativeValue",
          minValue: job.salaryRange.min,
          maxValue: job.salaryRange.max,
          unitText: "YEAR",
        },
      },
    }),
  };
}

// Breadcrumb schema
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://divitmindspace.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Careers",
      item: "https://divitmindspace.com/careers",
    },
  ],
};

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function CareersRoute({ searchParams }: PageProps) {
  const params = await searchParams;
  const { data: jobs } = await sanityFetch({
    query: ALL_CAREERS_QUERY,
    tags: ["career"],
  });

  const jobsList = (jobs as CareersQueryResult) || [];

  // Generate JobPosting schema for each active job
  const jobPostingSchemas = jobsList.map(generateJobPostingSchema);

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Individual JobPosting Schema for each job - critical for Google Jobs */}
      {jobPostingSchemas.map((schema, index) => (
        <script
          key={`job-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CareersPage jobs={jobsList} initialFilter={params.type} />
    </>
  );
}
