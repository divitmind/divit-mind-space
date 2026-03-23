import type { Metadata } from "next";
import { HeroSection } from "@/components/about-us/hero-section";
import { PhilosophySection } from "@/components/about-us/philosophy-section";
import { StorySection } from "@/components/about-us/story-section";
import { FoundersSpecialistsSection } from "@/components/about-us/founders-specialists-section";
import { CtaSection } from "@/components/homepage/cta-section";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_US_QUERY, SPECIALISTS_QUERY } from "@/sanity/lib/queries";
import type { AboutUsQueryResult, SpecialistsQueryResult } from "@/sanity/types";

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
  const specialists = specialistsData.data as SpecialistsQueryResult;

  return (
    <main className="min-h-screen">
      <HeroSection data={aboutUs?.hero} />
      <PhilosophySection data={aboutUs?.philosophy} />
      <StorySection data={aboutUs?.story} />
      <FoundersSpecialistsSection specialists={specialists || []} />
      <CtaSection />
    </main>
  );
}
