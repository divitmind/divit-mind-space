import type { Metadata } from "next";
import { HeroSection } from "@/components/about-us/hero-section";
import { PhilosophySection } from "@/components/about-us/philosophy-section";
import { StorySection } from "@/components/about-us/story-section";
import { FoundersSpecialistsSection } from "@/components/about-us/founders-specialists-section";
import { CtaSection } from "@/components/homepage/cta-section";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_US_QUERY, SPECIALISTS_QUERY } from "@/sanity/lib/queries";
import type { AboutUsQueryResult, SpecialistsQueryResult, Specialist } from "@/sanity/types";

// Generate Person schema for specialists (critical for LLM "who" queries)
function generateSpecialistSchema(specialist: Specialist) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: specialist.name,
    jobTitle: specialist.title,
    description: specialist.teaser,
    image: specialist.image?.asset?.url,
    worksFor: {
      "@type": "MedicalBusiness",
      name: "Divit MindSpace",
      url: "https://divitmindspace.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kasavanahalli, Off Sarjapur Road",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
    knowsAbout: specialist.specialties || [],
    ...(specialist.experience && {
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Experience",
        name: `${specialist.experience} of professional experience`,
      }
    }),
  };
}

// Force dynamic rendering - always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Divit MindSpace - Empowering Neurodivergent Children",
  description: "Divit MindSpace offers clinical assessments, specialized education, and comprehensive training for neurodivergent children and their families. Free awareness sessions across communities to break stigma and nurture potential.",
  keywords: [
    "neurodivergent care",
    "special education",
    "clinical assessments",
    "family support",
    "early intervention",
    "autism support",
    "ADHD support",
    "learning disabilities",
    "parent training",
    "inclusive education"
  ],
  openGraph: {
    type: "website",
    url: "https://divitmindspace.com/about-us",
    title: "About Us | Divit MindSpace - Empowering Neurodivergent Children",
    description: "Empowering neurodivergent children through clinical assessments, specialized education, and comprehensive family support. Breaking stigma through FREE community awareness sessions.",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Divit MindSpace - About Us"
      }
    ],
    siteName: "Divit MindSpace"
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Divit MindSpace - Empowering Neurodivergent Children",
    description: "Clinical assessments, specialized education, and family support for neurodivergent children. Free awareness sessions across communities.",
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
    canonical: "https://divitmindspace.com/about-us"
  }
};

export default async function AboutUsPage() {
  const [aboutUsData, specialistsData] = await Promise.all([
    sanityFetch({ query: ABOUT_US_QUERY, tags: ["aboutUs"] }),
    sanityFetch({ query: SPECIALISTS_QUERY, tags: ["specialist"] }),
  ]);

  const aboutUs = aboutUsData.data as AboutUsQueryResult;
  const specialists = (specialistsData.data as SpecialistsQueryResult) || [];

  // Generate Person schemas for all specialists
  const specialistSchemas = specialists.map(generateSpecialistSchema);

  // Breadcrumb schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://divitmindspace.com" },
      { "@type": "ListItem", position: 2, name: "About Us", item: "https://divitmindspace.com/about-us" },
    ],
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Person Schema for each specialist - critical for LLM "who" queries */}
      {specialistSchemas.map((schema, index) => (
        <script
          key={`specialist-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main className="min-h-screen">
        <HeroSection data={aboutUs?.hero} />
        <PhilosophySection data={aboutUs?.philosophy} />
        <StorySection data={aboutUs?.story} />
        <FoundersSpecialistsSection specialists={specialists} />
        <CtaSection />
      </main>
    </>
  );
}
