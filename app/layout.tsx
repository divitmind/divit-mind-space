import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";
import Provider from "@/components/provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://divitmindspace.com"),
  title: {
    default: "Divit MindSpace | Neurodivergent Care & Education in Bangalore",
    template: "%s | Divit MindSpace",
  },
  description:
    "Divit MindSpace operates at the intersection of healthcare and special education, offering diagnostic assessments, customized teaching, and training for neurodivergent individuals and families in Bangalore.",
  keywords: [
    "neurodivergent care",
    "special education",
    "diagnostic assessments",
    "autism support",
    "ADHD support",
    "early intervention",
    "learning disabilities",
    "special needs education",
    "Bangalore",
    "India",
  ],
  authors: [{ name: "Divit MindSpace", url: "https://divitmindspace.com" }],
  creator: "Divit MindSpace",
  publisher: "Divit MindSpace",
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
  openGraph: {
    type: "website",
    siteName: "Divit MindSpace",
    title: "Divit MindSpace | Neurodivergent Care & Education in Bangalore",
    description:
      "Diagnostic assessments, customized teaching, and training for neurodivergent individuals and families in Bangalore.",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Divit MindSpace — Neurodivergent Care & Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divit MindSpace | Neurodivergent Care & Education",
    description:
      "Diagnostic assessments, customized teaching, and training for neurodivergent individuals and families in Bangalore.",
    images: ["/divit-mindspace-logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/divit-mindspace-logo.png",
  },
  manifest: "/manifest.webmanifest",
  // Add your Google Search Console verification token here when available:
  // verification: { google: "YOUR_GOOGLE_VERIFICATION_TOKEN" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "EducationalOrganization"],
  name: "Divit MindSpace",
  alternateName: "Divit Health",
  url: "https://divitmindspace.com",
  logo: {
    "@type": "ImageObject",
    url: "https://divitmindspace.com/divit-mindspace-logo.png",
  },
  description:
    "Divit MindSpace operates at the intersection of healthcare and special education, offering diagnostic assessments, customized teaching, and training for neurodivergent individuals in Bangalore.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "City",
    name: "Bangalore",
  },
  medicalSpecialty: [
    "Neurodevelopmental Disorders",
    "Educational Psychology",
    "Special Education",
  ],
  knowsAbout: [
    "Autism Spectrum Disorder",
    "ADHD",
    "Learning Disabilities",
    "Neurodivergence",
    "Special Education",
    "Early Intervention",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-[##FAF9F5] antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SanityLive />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
