import { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { REVIEWS_FIRST_PAGE_QUERY } from "@/sanity/lib/queries";
import type { ReviewListItem } from "@/sanity/types";
import { ReviewsPage } from "@/components/reviews/reviews-page";

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

export default async function ReviewsRoute() {
  const { data } = await sanityFetch({
    query: REVIEWS_FIRST_PAGE_QUERY,
    params: { pageSize: PAGE_SIZE },
  });

  const list = (data as ReviewListItem[] | null) ?? [];
  const hasMore = list.length >= PAGE_SIZE;

  return (
    <>
      <ReviewsPage initialReviews={list} initialHasMore={hasMore} />
    </>
  );
}
