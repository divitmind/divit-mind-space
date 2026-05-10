import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import Provider from "@/components/provider";
import { ClarityInit } from "@/components/clarity-init";
import { SITE_SETTINGS_QUERY, ANNOUNCEMENT_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/lib/types";
import type { AnnouncementQueryResult } from "@/sanity/types";

// GA4 — set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local to activate.
// The component renders nothing if the ID is missing, so this is safe to ship today.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
    default: "Divit MindSpace | Nurtured Minds, Independent Lives",
    template: "%s | Divit MindSpace | Nurtured Minds, Independent Lives",
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
  // Search engine ownership verification — drop real tokens here once claimed.
  // Google: https://search.google.com/search-console  (copy the content value from the HTML tag method)
  // Bing:   https://www.bing.com/webmasters           (powers Copilot + ChatGPT search)
  // Yandex: https://webmaster.yandex.com              (optional — minor for Indian audience)
  verification: {
    google: "GYO7QvbO-n_dTolT72KQywtEY5apBRoN4GVYMlz9gj4",
    // other: { "msvalidate.01": "paste-your-bing-webmaster-token-here" },
    // yandex: "paste-your-yandex-token-here",
  },
};

// Canonical organization entity — referenced by other pages via @id
const ORG_ID = "https://divitmindspace.com/#organization";

const organizationJsonLd = {
  "@context": "https://schema.org",
  // MedicalClinic is a subtype of MedicalBusiness and the most specific
  // schema.org type for a multi-specialty clinic. Google's healthcare SERP
  // widgets and AEO crawlers weight more specific types over general ones.
  "@type": ["MedicalClinic", "EducationalOrganization"],
  "@id": ORG_ID,
  name: "Divit MindSpace",
  alternateName: ["Divit Health", "Divit MindSpace Clinic"],
  url: "https://divitmindspace.com",
  logo: {
    "@type": "ImageObject",
    url: "https://divitmindspace.com/divit-mindspace-logo.png",
  },
  image: "https://divitmindspace.com/divit-mindspace-logo.png",
  slogan: "Mental Health, Neurodevelopment & Physiotherapy for All Ages — off Sarjapur Road, Bangalore",
  description:
    "Bangalore's leading center for Mental Health, Neurodevelopment & Physiotherapy. Expert Clinical Assessments, Therapies, Professional Counseling for Teenagers and Adults, Special Education, NIOS Support, Teacher & Parent Training, Physiotherapy (Pain Management, Pain Modalities, Post-Surgical Rehab, Gym & Sports Injury Sessions, Assistive Devices, Wheelchair Training) and Customized Workshops off Sarjapur Road (Kasavanahalli).",
  telephone: "+91-99016-66139",
  email: "divitmindspace@gmail.com",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Aadeshwar Chambers, Kasavanahalli, Off Sarjapur Road",
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
  hasMap: "https://maps.google.com/?q=Aadeshwar+Chambers+Kasavanahalli+Bengaluru",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Bangalore" },
    { "@type": "City", name: "Bengaluru" },
    { "@type": "Place", name: "Sarjapur Road" },
    { "@type": "Place", name: "Kasavanahalli" },
    { "@type": "Place", name: "HSR Layout" },
    { "@type": "Place", name: "Bellandur" },
    { "@type": "Place", name: "Koramangala" },
    { "@type": "Place", name: "Marathahalli" },
    { "@type": "Place", name: "Whitefield" },
    { "@type": "Place", name: "Electronic City" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Clinical, Therapeutic, Educational & Physiotherapy Services",
    // Every entry below is backed by a real document in Sanity — no orphan claims.
    itemListElement: [
      // Assessments (2)
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Psychometric Assessments", url: "https://divitmindspace.com/services/psychometric-assessments" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Psychoeducational Assessments", url: "https://divitmindspace.com/services/psychoeducational-assessments" } },
      // Therapy (8)
      { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Speech Therapy", url: "https://divitmindspace.com/services/speech-therapy" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Occupational Therapy", url: "https://divitmindspace.com/services/occupational-therapy" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Behavioral Therapy", url: "https://divitmindspace.com/services/behavioral-therapy" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Cognitive Therapy", url: "https://divitmindspace.com/services/cognitive-therapy" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Play Therapy", url: "https://divitmindspace.com/services/play-therapy" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Sensory Integration Therapy", url: "https://divitmindspace.com/services/sensory-integration-program" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Group Therapy Sessions", url: "https://divitmindspace.com/services/group-therapy-sessions" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Brain Gym", url: "https://divitmindspace.com/services/brain-gym" } },
      // Guidance (3)
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Counselling (Child, Adolescent, Adult & Parent)", url: "https://divitmindspace.com/services/counselling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Parental Training Program", url: "https://divitmindspace.com/services/parental-training-program" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Customized Workshops", url: "https://divitmindspace.com/services/customized-workshops" } },
      // Programs (9)
      { "@type": "Offer", itemOffered: { "@type": "EducationalOccupationalProgram", name: "Early Intervention Program", url: "https://divitmindspace.com/services/early-intervention-program" } },
      { "@type": "Offer", itemOffered: { "@type": "EducationalOccupationalProgram", name: "School Readiness Program", url: "https://divitmindspace.com/services/school-readiness-program" } },
      { "@type": "Offer", itemOffered: { "@type": "EducationalOccupationalProgram", name: "ECCE (Early Childhood Care and Education)", url: "https://divitmindspace.com/services/ecce-early-childhood-care-and-education" } },
      { "@type": "Offer", itemOffered: { "@type": "EducationalOccupationalProgram", name: "Special Education & Remedial Sessions", url: "https://divitmindspace.com/services/special-education--remedial-sessions" } },
      { "@type": "Offer", itemOffered: { "@type": "EducationalOccupationalProgram", name: "NIOS Support Program", url: "https://divitmindspace.com/services/nios-support-program" } },
      { "@type": "Offer", itemOffered: { "@type": "EducationalOccupationalProgram", name: "Training Program (Shadow Teacher Training)", url: "https://divitmindspace.com/services/training-program-shadow-teacher-training-program" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Certificate in Special Education", url: "https://divitmindspace.com/services/certificate-in-special-education" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Diploma in Special Education", url: "https://divitmindspace.com/services/diploma-in-special-education" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Summer Camp", url: "https://divitmindspace.com/services/summer-camp" } },
      // Physiotherapy (6)
      { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Physiotherapy — Pain Management", url: "https://divitmindspace.com/services/pain-management" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Physiotherapy — Pain Modalities", url: "https://divitmindspace.com/services/pain-modalities" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Post-Surgical Rehabilitation", url: "https://divitmindspace.com/services/post-surgical-rehabilitation" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Gym & Sports Injury Sessions", url: "https://divitmindspace.com/services/gym--sports-injury-sessions" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Assistive Devices", url: "https://divitmindspace.com/services/assistive-devices" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Wheelchair Training", url: "https://divitmindspace.com/services/wheelchair-training" } },
    ]
  },
  medicalSpecialty: [
    "Neurodevelopmental Disorders",
    "Educational Psychology",
    "Physical Therapy",
    "Mental Health",
    "Speech Pathology",
    "Occupational Therapy",
    "Rehabilitation"
  ],
  knowsAbout: [
    "Autism Spectrum Disorder",
    "Adult Autism",
    "ADHD",
    "Adult ADHD",
    "Learning Disabilities",
    "Neurodivergence",
    "Sensory Processing Disorder",
    "Developmental Delays",
    "Stress",
    "Anxiety",
    "Depression",
    "Pain Management",
    "Post-Surgical Rehabilitation",
    "Sports and Gym Injuries",
    "Assistive Devices",
    "Wheelchair Training",
    "Mental Wellness"
  ],
  // We list active clinical leads under `employee` (schema.org recommended for
  // practicing staff). `founder` is intentionally omitted — not a required
  // field for MedicalBusiness, and listing it wrongly weakens E-E-A-T.
  employee: [
    {
      "@type": "Person",
      name: "Dr. Pavithra Lakshmi Narasimhan",
      jobTitle:
        "PhD · Clinical Psychologist · Child & Adolescent Behaviour Intervention Specialist · Certified Art Therapist · SEN (UK certified)",
      description:
        "PhD clinical psychologist using CBT, DBT, and expressive art therapy to help children and adolescents with ADHD, emotional regulation, and behavioural support.",
      url: "https://divitmindspace.com/specialists/pavithra-lakshmi-narasimhan",
      hasCredential: [
        { "@type": "EducationalOccupationalCredential", credentialCategory: "Degree", name: "PhD in Clinical Psychology" },
        { "@type": "EducationalOccupationalCredential", credentialCategory: "Certification", name: "Certified Art Therapist" },
        { "@type": "EducationalOccupationalCredential", credentialCategory: "Certification", name: "Special Educational Needs (SEN) — UK Certified" },
        { "@type": "EducationalOccupationalCredential", credentialCategory: "Specialization", name: "Child & Adolescent Behaviour Intervention" },
      ],
    },
    {
      "@type": "Person",
      name: "Dr. S. Mohamed Nowful",
      jobTitle:
        "B.O.Th. · Licensed Occupational Therapist · IOTR, NCAHP, AIOTA Life Member · USA certified BLS, ACLS & OPT-1, CLASI Sensory Integration, oromotor stimulation",
      description:
        "Licensed occupational therapist specializing in sensory integration, play therapy, and daily living skills for children and adults with ASD, ADHD, Cerebral Palsy, and developmental delays.",
      url: "https://divitmindspace.com/specialists/mohamed-nowful",
      hasCredential: [
        { "@type": "EducationalOccupationalCredential", credentialCategory: "Degree", name: "Bachelor of Occupational Therapy (B.O.Th.)" },
        { "@type": "EducationalOccupationalCredential", credentialCategory: "License", name: "Indian Occupational Therapy Registration (IOTR)" },
        { "@type": "EducationalOccupationalCredential", credentialCategory: "License", name: "National Commission for Allied and Healthcare Professions (NCAHP)" },
        { "@type": "EducationalOccupationalCredential", credentialCategory: "Membership", name: "AIOTA Life Member" },
        { "@type": "EducationalOccupationalCredential", credentialCategory: "Certification", name: "CLASI Sensory Integration" },
        { "@type": "EducationalOccupationalCredential", credentialCategory: "Certification", name: "USA BLS, ACLS & OPT-1" },
      ],
    },
  ],
  // sameAs URLs should be the canonical, 200-OK URLs (not redirects). Instagram
  // + Facebook confirmed live 2026-04-18. LinkedIn + X awaiting manual confirmation
  // because both platforms block automated HEAD requests; if either is absent,
  // remove it to avoid an "entity broken link" downgrade from Google/LLMs.
  sameAs: [
    "https://www.instagram.com/divitmindspace/",
    "https://www.facebook.com/DivitMindspace/",
    "https://www.linkedin.com/in/divitmindspace/",
    "https://x.com/divitmindspace",
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
      url: "https://wa.me/919901666139",
      contactType: "customer service",
      description: "WhatsApp for appointments and inquiries",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Kannada"]
    }
  ],
  availableLanguage: ["English", "Hindi", "Kannada"],
  paymentAccepted: ["Cash", "Credit Card", "Debit Card", "UPI", "Bank Transfer"],
  currenciesAccepted: "INR",
  // Bookable action — Google shows "Book" buttons in local packs when this is declared.
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://wa.me/919901666139",
      inLanguage: "en-IN",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "Reservation",
      name: "Free initial consultation at Divit MindSpace",
    },
  },
  // Explicit free-consultation offer — answers "how much does a consultation cost" queries.
  makesOffer: {
    "@type": "Offer",
    name: "Free initial consultation",
    description:
      "A free call or chat with Divit MindSpace to understand your needs and guide you on the right path.",
    price: "0",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: "https://wa.me/919901666139",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ data: siteSettings }, { data: announcement }] = await Promise.all([
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: ANNOUNCEMENT_QUERY, tags: ["promowebsite"] }),
  ]);
  const announcementData = announcement as AnnouncementQueryResult;

  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* DNS prefetch + preconnect for CDN hosts used by every page.
            Saves ~100-300ms on first paint of above-the-fold images. */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Feed + LLM discovery files linked in <head> so browsers, readers, and AI clients find them. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Divit MindSpace — Blog"
          href="/feed.xml"
        />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} bg-[#FAF9F5] antialiased`}>
        <ClarityInit />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SanityLive />
        <Provider siteSettings={siteSettings} announcement={announcementData}>{children}</Provider>
        {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
      </body>
    </html>
  );
}
