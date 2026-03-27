import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_QUERY } from "@/sanity/lib/queries";
import type { ContactQueryResult } from "@/sanity/types";

export const metadata: Metadata = {
// ... rest of metadata
  title: "Contact Us | Divit MindSpace",
  description:
    "Get in touch with Divit MindSpace. Whether you're curious about our services, ready to book an assessment, or need guidance — our experts in Bangalore are here to help for all age groups.",
  keywords: [
    "contact Divit MindSpace",
    "book assessment Bangalore",
    "neurodivergent support contact",
    "special education consultation",
    "autism assessment appointment",
    "adult neurodivergent support",
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
    "Contact page for Divit MindSpace — neurodivergent care and special education in Bangalore for children, teens, and adults.",
  mainEntity: {
    "@type": "MedicalBusiness",
    name: "Divit MindSpace",
    url: "https://divitmindspace.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["English", "Hindi", "Kannada"],
    },
  },
};

export default async function ContactUsPage() {
  const { data } = await sanityFetch({ 
    query: CONTACT_QUERY, 
    tags: ["contact"] 
  });
  
  const contactData = data as ContactQueryResult;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          ...contactJsonLd,
          description: contactData?.description || contactJsonLd.description,
          mainEntity: {
            ...contactJsonLd.mainEntity,
            address: {
              ...contactJsonLd.mainEntity.address,
              addressLocality: contactData?.address || contactJsonLd.mainEntity.address.addressLocality,
            }
          }
        }) }}
      />
      <ContactPage data={contactData} />
    </>
  );
}
