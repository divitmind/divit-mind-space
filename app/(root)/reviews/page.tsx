import { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import {
  REVIEWS_FIRST_PAGE_QUERY,
  REVIEWS_AGGREGATE_QUERY,
  REVIEWS_FOR_SCHEMA_QUERY,
} from "@/sanity/lib/queries";
import type { ReviewListItem } from "@/sanity/types";
import { ReviewsPage } from "@/components/reviews/reviews-page";
import { ORGANIZATION_REF, SITE_URL } from "@/lib/seo";

// Force dynamic rendering - always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

const PAGE_SIZE = 12;

export const metadata: Metadata = {
  title: "Reviews | Divit MindSpace",
  description:
    "Read what families say about Divit MindSpace — stories from parents and caregivers who trust us for neurodivergent care and education in Bangalore.",
  alternates: {
    canonical: "https://divitmindspace.com/reviews",
  },
  openGraph: {
    title: "Reviews | Divit MindSpace",
    description:
      "Read what families say about Divit MindSpace — stories from parents and caregivers who trust us for neurodivergent care in Bangalore.",
    type: "website",
    url: "https://divitmindspace.com/reviews",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Reviews – Divit MindSpace",
      },
    ],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reviews | Divit MindSpace",
    description:
      "What families say about Divit MindSpace — neurodivergent care and education in Bangalore.",
    images: ["/divit-mindspace-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

type ReviewAggregate = {
  count: number;
  average: number | null;
  best: number | null;
  worst: number | null;
};

export default async function ReviewsRoute() {
  const [{ data }, { data: aggData }, { data: schemaReviews }] = await Promise.all([
    sanityFetch({
      query: REVIEWS_FIRST_PAGE_QUERY,
      params: { pageSize: PAGE_SIZE },
    }),
    sanityFetch({ query: REVIEWS_AGGREGATE_QUERY, tags: ["review"] }),
    sanityFetch({ query: REVIEWS_FOR_SCHEMA_QUERY, tags: ["review"] }),
  ]);

  const list = (data as ReviewListItem[] | null) ?? [];
  const hasMore = list.length >= PAGE_SIZE;
  const agg = (aggData as ReviewAggregate | null) ?? { count: 0, average: null, best: null, worst: null };
  const sampleReviews = (schemaReviews as ReviewListItem[] | null) ?? [];

  // Breadcrumb schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Reviews", item: `${SITE_URL}/reviews` },
    ],
  };

  // AggregateRating attached to the canonical Organization — this is what Google + LLMs
  // cite for "is Divit MindSpace reputable?" queries. Also powers review rich snippets.
  const aggregateRatingJsonLd =
    agg.count > 0 && agg.average !== null
      ? {
          "@context": "https://schema.org",
          "@type": "AggregateRating",
          itemReviewed: ORGANIZATION_REF,
          ratingValue: Number(agg.average.toFixed(2)),
          reviewCount: agg.count,
          bestRating: agg.best ?? 5,
          worstRating: agg.worst ?? 1,
        }
      : null;

  // Individual Review schemas — gives LLMs attributable quotes they can cite.
  const reviewJsonLdArray = sampleReviews
    .filter((r) => r.rating && r.quote && r.name)
    .map((r) => ({
      "@context": "https://schema.org",
      "@type": "Review",
      itemReviewed: ORGANIZATION_REF,
      author: {
        "@type": "Person",
        name: r.name,
        ...(r.role ? { jobTitle: r.role } : {}),
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.quote,
      ...(r.publishedAt ? { datePublished: r.publishedAt } : {}),
      publisher: ORGANIZATION_REF,
    }));

  // Consolidate all schemas into a single @graph — cleaner for crawlers + LLMs.
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbJsonLd, ...(aggregateRatingJsonLd ? [aggregateRatingJsonLd] : []), ...reviewJsonLdArray].map(
      (s) => {
        const clone: Record<string, unknown> = { ...(s as Record<string, unknown>) };
        delete clone["@context"];
        return clone;
      },
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageGraph) }}
      />
      <ReviewsPage initialReviews={list} initialHasMore={hasMore} />
    </>
  );
}
