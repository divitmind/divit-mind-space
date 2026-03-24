import { Metadata } from "next";
import { GalleryPage } from "@/components/gallery/gallery-page";
import { sanityFetch } from "@/sanity/lib/live";
import { GALLERY_QUERY, GALLERY_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import type { GalleryQueryResult } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Gallery | Divit MindSpace",
  description:
    "Explore our gallery of events and activities celebrating neurodivergent learners, special education sessions, and community achievements.",
  alternates: {
    canonical: "https://divitmindspace.com/gallery",
  },
  openGraph: {
    title: "Gallery | Divit MindSpace",
    description:
      "Explore our gallery of events and activities celebrating neurodivergent learners, special education sessions, and community achievements.",
    type: "website",
    url: "https://divitmindspace.com/gallery",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Divit MindSpace Gallery",
      },
    ],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Divit MindSpace",
    description:
      "Explore our gallery of events and activities celebrating neurodivergent learners, special education sessions, and community achievements.",
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

const galleryJsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Divit MindSpace Gallery",
  url: "https://divitmindspace.com/gallery",
  description:
    "Photos from Divit MindSpace events, special education sessions, awareness programs, and community activities.",
  author: {
    "@type": "Organization",
    name: "Divit MindSpace",
    url: "https://divitmindspace.com",
  },
};

export default async function GalleryRoute() {
  const [galleryItemsData, categoriesData] = await Promise.all([
    sanityFetch({ query: GALLERY_QUERY, tags: ["gallery"] }),
    sanityFetch({ query: GALLERY_CATEGORIES_QUERY, tags: ["galleryCategory"] }),
  ]);

  const galleryItems = galleryItemsData.data as GalleryQueryResult;
  const categories = categoriesData.data as any[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />
      <GalleryPage 
        initialItems={galleryItems || []} 
        categories={categories || []}
      />
    </>
  );
}
