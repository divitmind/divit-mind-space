"use client";

import * as React from "react";
import Link from "next/link";
import { Marquee } from "@/components/ui/marquee";
import { TestimonialCard } from "@/components/homepage/testimonial-card";
import type { ReviewListItem } from "@/sanity/types";

const FALLBACK_TESTIMONIALS: Array<{ name: string; role: string; quote: string; initial: string }> = [
  {
    name: "Priya M.",
    role: "Parent of 8-year-old with ADHD",
    quote:
      "For the first time, someone truly understood my son. The team at Divit MindSpace didn't try to 'fix' him—they helped us see his strengths. Now he's thriving.",
    initial: "P",
  },
  {
    name: "Rahul & Sneha K.",
    role: "Parents of 6-year-old with Autism",
    quote:
      "We were so lost before finding Divit MindSpace. The assessment gave us clarity, and the ongoing support has been life-changing for our whole family.",
    initial: "R",
  },
  {
    name: "Anita S.",
    role: "Parent of 10-year-old with learning differences",
    quote:
      "The parent guidance sessions helped me stop feeling guilty and start feeling empowered. I now have real strategies that work for our daily life.",
    initial: "A",
  },
];

function reviewToCard(review: ReviewListItem) {
  const initial = review.name.trim() ? review.name.trim().charAt(0).toUpperCase() : "?";
  return {
    name: review.name,
    role: review.role ?? "",
    quote: review.quote,
    initial,
  };
}

interface TestimonialsSectionProps {
  reviews: ReviewListItem[];
}

export function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
  const top10 = reviews.slice(0, 10);
  const cards = top10.length > 0 ? top10.map(reviewToCard) : FALLBACK_TESTIMONIALS;

  // For desktop marquee
  const marqueeItems = [...cards, ...cards];

  // For mobile infinite loop - Triple the array for buffer
  const mobileCards = [...cards, ...cards, ...cards];
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Initialize scroll position to the middle set
  React.useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.8; // 80vw for peeking
      scrollRef.current.scrollLeft = cards.length * (cardWidth + 16);
    }
  }, [cards.length]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth, scrollWidth } = scrollRef.current;
    const cardWidth = offsetWidth * 0.8 + 16;

    // Calculate active dot index (0 to cards.length - 1)
    const totalItems = cards.length;
    const currentAbsoluteIndex = Math.round(scrollLeft / cardWidth);
    const normalizedIndex = currentAbsoluteIndex % totalItems;
    setActiveIndex(normalizedIndex);

    // Infinite Loop Logic
    if (scrollLeft <= 0) {
      scrollRef.current.scrollLeft = totalItems * cardWidth;
    } else if (scrollLeft + offsetWidth >= scrollWidth) {
      scrollRef.current.scrollLeft = totalItems * cardWidth;
    }
  };

  return (
    <section className="pt-6 lg:pt-10 pb-10 lg:pb-16 bg-[#FDFBF7] overflow-hidden">
      <div className="container mb-8 text-center">
        {/* Original Text Wording */}
        <div className="inline-flex items-center justify-center text-black/40 text-[10px] font-bold tracking-widest uppercase mb-4">
          Parent Stories
        </div>
        <h2 className="text-3xl lg:text-5xl font-bold text-black mb-6 tracking-tight font-[family-name:var(--font-cormorant)] italic">   
          Why Families Trust Us
        </h2>
        <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                </svg>
                <span className="text-2xl font-serif italic text-green leading-none" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>4.9 / 5</span>
            </div>
            <span className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em]">Top Rated on Google</span>
        </div>      </div>

      <div className="relative w-full">
        {/* Desktop Marquee */}
        <div className="hidden md:block">
          <Marquee pauseOnHover className="pb-2">
            {marqueeItems.map((t, i) => (
              <TestimonialCard key={`t1-${i}`} {...t} />
            ))}
          </Marquee>
        </div>

        {/* Mobile Infinite Snap Carousel */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-10 gap-4 pb-8"
          >
            {mobileCards.map((t, i) => (
              <div key={`m-${i}`} className="w-[80vw] flex-shrink-0 snap-center">
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>

          {/* Mobile Pagination Info */}
          <div className="flex flex-col items-center gap-3 -mt-2">
            <div className="flex justify-center gap-2">
              {cards.map((_, i) => (
                <div
                  key={`dot-${i}`}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-green w-4" : "bg-black/10"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-6 text-center">
        <Link
          href="/reviews"
          className="inline-flex items-center justify-center rounded-full border border-black/10 text-black/60 px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#7A9A7D] hover:text-white hover:border-[#7A9A7D] transition-all duration-300"
        >
          See all reviews
        </Link>
      </div>
    </section>
  );
}
