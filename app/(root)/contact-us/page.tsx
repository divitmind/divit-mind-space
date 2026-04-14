import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact Divit MindSpace | Mental Health & Therapy Center Sarjapur Road, Bangalore",
  description:
    "Contact Divit MindSpace at Kasavanahalli, Off Sarjapur Road, Bangalore. Call +91 99016 66139 for mental health assessments, speech therapy, occupational therapy, and counseling. Serving HSR Layout, Bellandur, and all of Bengaluru.",
  keywords: [
    "Divit MindSpace contact",
    "Divit MindSpace Bangalore",
    "therapy center Sarjapur Road",
    "mental health clinic HSR Layout",
    "child assessment Bellandur",
    "speech therapy near me Bangalore",
    "occupational therapy Kasavanahalli",
    "counseling center Bangalore",
    "autism assessment Bangalore",
    "ADHD specialist Bangalore",
  ],
  alternates: {
    canonical: "https://divitmindspace.com/contact-us",
  },
  openGraph: {
    type: "website",
    url: "https://divitmindspace.com/contact-us",
    title: "Contact Us | Divit MindSpace",
    description:
      "Reach out to our team in Bangalore. We're here to help you navigate neurodivergent care, assessments, and education for children, teens, and adults.",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Contact Divit MindSpace",
      },
    ],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Divit MindSpace",
    description:
      "Get in touch with our neurodivergent care experts in Bangalore for all age groups.",
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

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Divit MindSpace",
  url: "https://divitmindspace.com/contact-us",
  description:
    "Contact Divit MindSpace for mental health, neurodevelopment, and physiotherapy services in Bangalore. Located off Sarjapur Road, serving HSR Layout, Bellandur, Kasavanahalli, and all of Bengaluru.",
  mainEntity: {
    "@type": "MedicalBusiness",
    name: "Divit MindSpace",
    url: "https://divitmindspace.com",
    telephone: "+91-99016-66139",
    email: "divitmindspace@gmail.com",
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
      longitude: "77.6744",
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
    ],
    priceRange: "₹₹",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-99016-66139",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Kannada"],
    },
  },
};

// FAQ Schema for voice search and featured snippets
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is there a center in Bangalore that offers mental health, neurodevelopment, and physiotherapy together?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Divit MindSpace is one of the few centers in Bangalore offering all three under one roof — mental health (counseling, clinical assessments), neurodevelopment (speech therapy, occupational therapy, ADHD and autism evaluations), and physiotherapy. Located off Sarjapur Road in Kasavanahalli, we provide integrated care for children, teens, and adults.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I get an ADHD or autism assessment for my child near Sarjapur Road?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Divit MindSpace offers comprehensive ADHD and autism assessments at our Kasavanahalli center off Sarjapur Road, Bangalore. Our clinical team provides full diagnostic evaluations, therapy recommendations, and ongoing support. Call +91 99016 66139 to book.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book an appointment at Divit MindSpace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Contact us via WhatsApp or call at +91 99016 66139 for a free consultation. We're open Monday to Saturday, 10 AM to 7 PM at Aadeshwar Chambers, Kasavanahalli, off Sarjapur Road, Bangalore.",
      },
    },
    {
      "@type": "Question",
      name: "Does Divit MindSpace provide therapy and assessments for adults?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We support individuals of all ages — children, teens, and adults. Services include mental health counseling, ADHD and autism assessments, speech therapy, occupational therapy, and physiotherapy at our Bangalore center.",
      },
    },
  ],
};

export default function ContactUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ContactPage />
    </>
  );
}
