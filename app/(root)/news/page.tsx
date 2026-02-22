import { Metadata } from "next";
import BlogPage from "@/components/blogs/blog-page";
import { sanityFetch } from "@/sanity/lib/live";
import { NEWS_POSTS_QUERY } from "@/sanity/lib/queries";
import type { PostsQueryResult } from "@/sanity/types";

export const metadata: Metadata = {
  title: "News | Divit MindSpace",
  description:
    "Stay updated with the latest news and announcements from Divit MindSpace about neurodivergent care, special education, and community developments.",
  alternates: {
    canonical: "https://divitmindspace.com/news",
  },
  openGraph: {
    title: "News | Divit MindSpace",
    description:
      "Stay updated with the latest news and announcements from Divit MindSpace about neurodivergent care, special education, and community developments.",
    type: "website",
    url: "https://divitmindspace.com/news",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Divit MindSpace News",
      },
    ],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "News | Divit MindSpace",
    description:
      "Stay updated with the latest news and announcements from Divit MindSpace.",
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

const newsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Divit MindSpace — Latest News",
  url: "https://divitmindspace.com/news",
  description:
    "Latest news and announcements from Divit MindSpace on neurodivergent care, special education, and community developments.",
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

export default async function NewsListPage() {
  const { data: posts } = await sanityFetch({
    query: NEWS_POSTS_QUERY,
    tags: ["post"],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsJsonLd) }}
      />
      <BlogPage posts={(posts as PostsQueryResult) || []} title="Latest News" />
    </>
  );
}
