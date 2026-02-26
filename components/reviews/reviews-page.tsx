"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { TestimonialCard } from "@/components/homepage/testimonial-card";
import type { ReviewListItem } from "@/sanity/types";

function reviewToCard(review: ReviewListItem) {
  const initial = review.name.trim() ? review.name.trim().charAt(0).toUpperCase() : "?";
  return {
    name: review.name,
    role: review.role ?? "",
    quote: review.quote,
    initial,
  };
}

interface ReviewsPageProps {
  initialReviews: ReviewListItem[];
  initialHasMore: boolean;
}

const PAGE_SIZE = 12;

export function ReviewsPage({ initialReviews, initialHasMore }: ReviewsPageProps) {
  const [reviews, setReviews] = useState<ReviewListItem[]>(initialReviews);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || reviews.length === 0) return;
    const last = reviews[reviews.length - 1];
    if (!last?._id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?lastId=${encodeURIComponent(last._id)}&pageSize=${PAGE_SIZE}`);
      if (!res.ok) {
        setHasMore(false);
        return;
      }
      const data = await res.json();
      setReviews((prev) => [...prev, ...(data.reviews ?? [])]);
      setHasMore(data.hasMore ?? false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, reviews]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="bg-gradient-to-br from-cream via-[#FDFBF7] to-green-lite/10 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green mb-6">
              What Families Say
            </h1>
            <p className="text-lg md:text-xl text-green/70">
              Real stories from parents and caregivers who trust Divit MindSpace.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
          {reviews.map((review) => (
            <TestimonialCard key={review._id} {...reviewToCard(review)} className="w-full max-w-full shrink-0" />
          ))}
        </div>

        {hasMore && (
          <div ref={sentinelRef} className="flex justify-center py-12">
            {loading && (
              <div className="text-green/70 text-sm font-medium">Loading more reviews…</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
