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
  // Duplicate for marquee volume
  const marqueeItems = [...cards, ...cards];

  return (
    <section className="py-20 lg:py-28 bg-[#FDFBF7] overflow-hidden">
      <div className="container mb-16 text-center">
        <div className="inline-flex items-center justify-center text-purple text-sm font-semibold tracking-wide uppercase mb-4">
          Parent Stories
        </div>
        <h2 className="text-3xl lg:text-5xl font-semibold text-green mb-4">
          Why Families Trust Us
        </h2>
      </div>

      <div className="relative w-full">
        <Marquee pauseOnHover className="pb-8">
          {marqueeItems.map((t, i) => (
            <TestimonialCard key={`t1-${i}`} {...t} />
          ))}
        </Marquee>
      </div>

      <div className="container mt-10 text-center">
        <Link
          href="/reviews"
          className="inline-flex items-center justify-center rounded-lg bg-green text-white px-6 py-3 text-sm font-semibold hover:bg-green/90 transition-colors"
        >
          See all reviews
        </Link>
      </div>
    </section>
  );
}
