import { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobDetail } from "@/components/careers/job-detail";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { ALL_CAREER_SLUGS_QUERY, SINGLE_CAREER_QUERY } from "@/sanity/lib/queries";
import type { Career } from "@/sanity/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all careers at build time
export async function generateStaticParams() {
  const careers = await client.fetch<{ slug: string }[]>(ALL_CAREER_SLUGS_QUERY);

  return careers?.map((career) => ({
    slug: career.slug,
  })) || [];
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data: job } = await sanityFetch({
    query: SINGLE_CAREER_QUERY,
    params: { slug },
    tags: ["career"],
  });

  const jobData = job as Career;

  if (!jobData) {
    return {
      title: "Job Not Found",
    };
  }

  const employmentTypeLabel = jobData.employmentType.replace(/-/g, " ");

  return {
    title: `${jobData.title} | Careers | Divit MindSpace`,
    description: `Apply for the ${jobData.title} position at Divit MindSpace in Bangalore. ${jobData.department} department • ${employmentTypeLabel}. Join us in supporting neurodivergent individuals.`,
    alternates: {
      canonical: `https://divitmindspace.com/careers/${jobData.slug.current}`,
    },
    openGraph: {
      title: `${jobData.title} | Careers | Divit MindSpace`,
      description: `Apply for the ${jobData.title} position at Divit MindSpace. ${jobData.department} • ${employmentTypeLabel}`,
      type: "website",
      url: `https://divitmindspace.com/careers/${jobData.slug.current}`,
      images: [
        {
          url: "/divit-mindspace-logo.png",
          width: 1200,
          height: 630,
          alt: `${jobData.title} — Divit MindSpace`,
        },
      ],
      siteName: "Divit MindSpace",
    },
    twitter: {
      card: "summary_large_image",
      title: `${jobData.title} | Careers | Divit MindSpace`,
      description: `Apply for the ${jobData.title} position at Divit MindSpace`,
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
}

export default async function JobDetailRoute({ params }: PageProps) {
  const { slug } = await params;

  const { data: job } = await sanityFetch({
    query: SINGLE_CAREER_QUERY,
    params: { slug },
    tags: ["career"],
  });

  const jobData = job as Career;

  if (!jobData) {
    notFound();
  }

  const employmentTypeMap: Record<string, string> = {
    "full-time": "FULL_TIME",
    "part-time": "PART_TIME",
    "contract": "CONTRACTOR",
    "internship": "INTERN",
    "volunteer": "VOLUNTEER",
    "temporary": "TEMPORARY",
  };

  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: jobData.title,
    description: jobData.aboutRole || `${jobData.title} position at Divit MindSpace`,
    datePosted: jobData.postedDate,
    employmentType: employmentTypeMap[jobData.employmentType] || "OTHER",
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: jobData.location || "Bangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
    ...(jobData.locationType === "remote" || jobData.locationType === "hybrid"
      ? { jobLocationType: "TELECOMMUTE" }
      : {}),
    hiringOrganization: {
      "@type": "Organization",
      name: "Divit MindSpace",
      sameAs: "https://divitmindspace.com",
      logo: "https://divitmindspace.com/divit-mindspace-logo.png",
    },
    occupationalCategory: jobData.department,
    ...(jobData.salaryRange
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "INR",
            value: {
              "@type": "QuantitativeValue",
              value: jobData.salaryRange,
              unitText: "YEAR",
            },
          },
        }
      : {}),
    url: `https://divitmindspace.com/careers/${jobData.slug.current}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
      />
      <JobDetail job={jobData} />
    </>
  );
}
