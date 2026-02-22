import { Metadata } from "next";
import BlogPage from "@/components/blogs/blog-page";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_POSTS_QUERY } from "@/sanity/lib/queries";
import type { PostsQueryResult } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Blog | Divit MindSpace",
  description:
    "Explore our latest insights on neurodivergent care, special education, diagnostic assessments, and teaching strategies for individuals with unique learning needs.",
  alternates: {
    canonical: "https://divitmindspace.com/blogs",
  },
  openGraph: {
    title: "Blog | Divit MindSpace",
    description:
      "Explore our latest insights on neurodivergent care, special education, diagnostic assessments, and teaching strategies for individuals with unique learning needs.",
    type: "website",
    url: "https://divitmindspace.com/blogs",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Divit MindSpace Blog",
      },
    ],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Divit MindSpace",
    description:
      "Explore our latest insights on neurodivergent care, special education, diagnostic assessments, and teaching strategies for individuals with unique learning needs.",
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

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Divit MindSpace Blog",
  url: "https://divitmindspace.com/blogs",
  description:
    "Insights on neurodivergent care, special education, diagnostic assessments, and teaching strategies.",
  publisher: {
    "@type": "Organization",
    name: "Divit MindSpace",
    url: "https://divitmindspace.com",
    logo: {
      "@type": "ImageObject",
      url: "https://divitmindspace.com/divit-mindspace-logo.png",
    },
  },
};

export default async function BlogsListPage() {
  const { data: posts } = await sanityFetch({
    query: ALL_POSTS_QUERY,
    tags: ["post"],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogPage posts={(posts as PostsQueryResult) || []} />
    </>
  );
}
