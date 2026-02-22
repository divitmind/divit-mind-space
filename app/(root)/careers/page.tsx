import { Metadata } from "next";
import { CareersPage } from "@/components/careers/careers-page";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CAREERS_QUERY } from "@/sanity/lib/queries";
import type { CareersQueryResult } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Careers | Divit MindSpace",
  description:
    "Join our team and make a difference in neurodivergent care and education. Explore open positions in education, training, clinical services, and more.",
  alternates: {
    canonical: "https://divitmindspace.com/careers",
  },
  openGraph: {
    title: "Careers | Divit MindSpace",
    description:
      "Join our team and make a difference in neurodivergent care and education. Explore open positions in education, training, clinical services, and more.",
    type: "website",
    url: "https://divitmindspace.com/careers",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Careers at Divit MindSpace",
      },
    ],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Divit MindSpace",
    description:
      "Join our team and make a difference in neurodivergent care and education. Explore open positions in education, training, clinical services, and more.",
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

const careersJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Careers at Divit MindSpace",
  url: "https://divitmindspace.com/careers",
  description:
    "Open positions at Divit MindSpace in neurodivergent care, special education, clinical services, and training.",
  breadcrumb: {
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
  },
  hiringOrganization: {
    "@type": "Organization",
    name: "Divit MindSpace",
    url: "https://divitmindspace.com",
    logo: {
      "@type": "ImageObject",
      url: "https://divitmindspace.com/divit-mindspace-logo.png",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
  },
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careersJsonLd) }}
      />
      <CareersPage jobs={(jobs as CareersQueryResult) || []} initialFilter={params.type} />
    </>
  );
}
