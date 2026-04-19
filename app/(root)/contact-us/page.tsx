import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings, FAQ } from "@/lib/types";
import { ORGANIZATION_REF, SITE_URL, SITE_LANGUAGE, WEBSITE_ID } from "@/lib/seo";

// Force dynamic rendering - always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

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
    "ADHD specialist Bangalore",
    "therapy center with parking Bangalore",
    "clinic with lift access Kasavanahalli",
    "child assessment Hosur",
    "speech therapy Sarjapur Town",
    "occupational therapy Haralur Road",
    "physiotherapy near Carmelaram",
    "mental health Anekal",
    "assessment center Malur",
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
      streetAddress: "NO 877/1/2 & 895/19/20, 1st Cross Rd, near ICICI BANK, IAS Layout, Eastwood Twp, Kasavanahalli",
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
    description: "Bangalore's leading center for mental health, neurodevelopment, and physiotherapy. Located in Aadeshwar Chambers (same building as ICICI Bank), we provide neuro-affirming care with ample basement parking and lift access available. Serving Kasavanahalli, HSR Layout, Haralur Road, Hosur, Anekal, and more.",
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
      { "@type": "Place", name: "Sarjapur Road" },
      { "@type": "Place", name: "HSR Layout" },
      { "@type": "Place", name: "Bellandur" },
      { "@type": "Place", name: "Kasavanahalli" },
      { "@type": "Place", name: "Koramangala" },
      { "@type": "Place", name: "Haralur Road" },
      { "@type": "Place", name: "Carmelaram" },
      { "@type": "Place", name: "Varthur" },
      { "@type": "Place", name: "Hosur" },
      { "@type": "Place", name: "Anekal" },
      { "@type": "Place", name: "Malur" },
      { "@type": "Place", name: "Chandapura" },
      { "@type": "Place", name: "Sarjapur Town" },
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

// Default FAQs for fallback (GEO optimized for Bangalore/Sarjapur Road)
const defaultFaqs: FAQ[] = [
  {
    question: "Is there a center in Bangalore that offers mental health, neurodevelopment, and physiotherapy together?",
    answer: "Yes. Divit MindSpace is one of the few centers in Bangalore offering all three under one roof — mental health (counseling, clinical assessments), neurodevelopment (speech therapy, occupational therapy, ADHD and autism evaluations), and physiotherapy. Located off Sarjapur Road in Kasavanahalli, we provide integrated care for children, teens, and adults.",
  },
  {
    question: "Where can I get an ADHD or autism assessment for my child near Sarjapur Road?",
    answer: "Divit MindSpace offers comprehensive ADHD and autism assessments at our Kasavanahalli center off Sarjapur Road, Bangalore. Our clinical team provides full diagnostic evaluations, therapy recommendations, and ongoing support. Call +91 99016 66139 to book.",
  },
  {
    question: "How do I book an appointment at Divit MindSpace?",
    answer: "Contact us via WhatsApp or call at +91 99016 66139 for a free consultation. We're open Monday to Saturday, 9 AM to 6 PM at Aadeshwar Chambers, Kasavanahalli, off Sarjapur Road, Bangalore.",
  },
  {
    question: "Does Divit MindSpace provide therapy and assessments for adults?",
    answer: "Yes. We support individuals of all ages — children, teens, and adults. Services include mental health counseling, ADHD and autism assessments, speech therapy, occupational therapy, and physiotherapy at our Bangalore center.",
  },
];

// FAQPage JSON-LD with Speakable — voice assistants (Google Assistant / Siri / Alexa)
// use this to read answers aloud. Cross-references canonical Organization + WebSite.
function generateFaqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/contact-us#faq`,
    inLanguage: SITE_LANGUAGE,
    isPartOf: { "@id": WEBSITE_ID },
    about: ORGANIZATION_REF,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h3"],
    },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default async function ContactUsPage() {
  const { data: siteSettings } = await sanityFetch<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
  });

  // Get FAQ data from Sanity with fallback
  const contactFaqs = siteSettings?.contactPage?.faqs?.length ? siteSettings.contactPage.faqs : defaultFaqs;
  const faqTitle = siteSettings?.contactPage?.faqTitle || "Frequently Asked Questions";

  // Generate FAQ Schema dynamically
  const faqJsonLd = generateFaqSchema(contactFaqs);

  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [contactJsonLd, faqJsonLd].map((s) => {
      const clone: Record<string, unknown> = { ...(s as Record<string, unknown>) };
      delete clone["@context"];
      return clone;
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageGraph) }}
      />
      <ContactPage faqs={contactFaqs} faqTitle={faqTitle} settings={siteSettings} />
    </>
  );
}
