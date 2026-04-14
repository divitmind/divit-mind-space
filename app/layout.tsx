import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import Provider from "@/components/provider";
import { ClarityInit } from "@/components/clarity-init";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/lib/types";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://divitmindspace.com"),
  title: {
    default: "Divit MindSpace | Leading Center for Mental Health, Neurodevelopment & Physiotherapy Bangalore",
    template: "%s | Divit MindSpace",
  },
  description:
    "Bangalore’s leading center for Mental Health, Neurodevelopment & Physiotherapy, serving children, teens, and adults. Located off Sarjapur Road (Kasavanahalli), we provide expert Clinical Assessments and therapies including Speech Therapy, Occupational Therapy, ABA, Pediatric & Adult Physiotherapy (Pain Management & Rehab), CBT, and Special Education.",
  keywords: [
    "mental health Bangalore",
    "neurodevelopmental care",
    "physiotherapy Sarjapur Road",
    "clinical assessments Bangalore",
    "adult ADHD counseling Bangalore",
    "autism spectrum support",
    "speech therapy Bangalore",
    "occupational therapy Bangalore",
    "ABA therapy Bangalore",
    "neuro-affirming care",
    "NIOS support Bangalore",
    "school readiness program",
    "pain management physiotherapy",
    "surgical rehab Bangalore",
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
    title: "Divit MindSpace | Leading Center for Mental Health & Neurodevelopment",
    description:
      "Bangalore’s leading center for Mental Health, Neurodevelopment & Physiotherapy. Providing 21+ evidence-based services for children, teens, and adults off Sarjapur Road.",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Divit MindSpace — Mental Health, Neurodevelopment & Physiotherapy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divit MindSpace | Leading Mental Health & Neurodevelopment Center",
    description:
      "Expert clinical assessments, physiotherapy, and specialized education for all ages off Sarjapur Road (Kasavanahalli).",
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
  alternateName: ["Divit Health", "Divit MindSpace Clinic"],
  url: "https://divitmindspace.com",
  logo: {
    "@type": "ImageObject",
    url: "https://divitmindspace.com/divit-mindspace-logo.png",
  },
  description:
    "Bangalore’s leading center for Mental Health, Neurodevelopment & Physiotherapy. Divit MindSpace provides expert-led Clinical Assessments, Professional Counseling, Speech Therapy, and Occupational Therapy for children, teens, and adults off Sarjapur Road (Kasavanahalli).",
  telephone: "+91-99016-66139",
  email: "divitmindspace@gmail.com",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Aadeshwar Chambers, Kasavanahalli",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560035",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "12.9081",
    longitude: "77.6744"
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Bangalore" },
    { "@type": "Place", name: "Sarjapur Road" },
    { "@type": "Place", name: "HSR Layout" },
    { "@type": "Place", name: "Bellandur" },
    { "@type": "Place", name: "Kasavanahalli" },
    { "@type": "Place", name: "Koramangala" },
    { "@type": "Place", name: "Marathahalli" },
    { "@type": "Place", name: "Electronic City" },
    { "@type": "Place", name: "Whitefield" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Clinical & Therapeutic Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Clinical Psychological Assessments" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adult ADHD Counseling & Support" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Autism Spectrum Disorder (ASD) Support" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Speech & Language Therapy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Occupational Therapy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pediatric Physiotherapy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adult Physiotherapy & Pain Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Post-Surgical Rehabilitation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Applied Behavior Analysis (ABA)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cognitive Behavioral Therapy (CBT)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Play Therapy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Early Intervention Program" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Special Education & Remedial Teaching" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "NIOS Support & Academic Guidance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "School Readiness Program" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sensory Integration Therapy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Teen Counseling & Mental Health" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Parent Guidance & Counseling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Family & Couples Therapy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Individual Adult Counseling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Behavioral Therapy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Skills Training Groups" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Teacher Training Workshops" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Mental Wellness Programs" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Developmental Screening Camps" } }
    ]
  },
  medicalSpecialty: [
    "Neurodevelopmental Disorders",
    "Educational Psychology",
    "Physical Therapy",
    "Mental Health",
    "Speech Pathology"
  ],
  knowsAbout: [
    "Autism Spectrum Disorder",
    "ADHD",
    "Learning Disabilities",
    "Neurodivergence",
    "Sensory Processing Disorder",
    "Developmental Delays",
    "Mental Wellness"
  ],
  founder: [
    {
      "@type": "Person",
      name: "Debarati Basak",
      jobTitle: "Founder & Clinical Psychologist",
      description: "Clinical Psychologist specializing in neurodevelopmental assessments and mental health support for children, teens, and adults in Bangalore"
    },
    {
      "@type": "Person",
      name: "Pavithra Lakshmi",
      jobTitle: "Co-Founder & Behavioral Therapist",
      description: "Behavioral Therapist specializing in autism support, ADHD management, and art-based therapy interventions"
    }
  ],
  sameAs: [
    "https://instagram.com/divitmindspace",
    "https://facebook.com/divitmindspace",
    "https://www.linkedin.com/in/divitmindspace/",
    "https://x.com/divitmindspace"
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "50",
    reviewCount: "50"
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-99016-66139",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Kannada"]
    },
    {
      "@type": "ContactPoint",
      url: "https://wa.me/919902351393",
      contactType: "customer service",
      description: "WhatsApp for appointments and inquiries",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Kannada"]
    }
  ],
  availableLanguage: ["English", "Hindi", "Kannada"],
  paymentAccepted: ["Cash", "Credit Card", "Debit Card", "UPI", "Bank Transfer"],
  currenciesAccepted: "INR"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: siteSettings } = await sanityFetch<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} bg-[#FAF9F5] antialiased`}>
        <ClarityInit />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SanityLive />
        <Provider siteSettings={siteSettings}>{children}</Provider>
      </body>
    </html>
  );
}
