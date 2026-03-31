import Link from "next/link";
import { Star } from "lucide-react";
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
  const marqueeItems = [...cards, ...cards];

  return (
    <section className="py-2 lg:py-4 bg-[#FDFBF7] overflow-hidden">
      <div className="container mb-8 text-center">
        {/* Original Text Wording */}
        <div className="inline-flex items-center justify-center text-black/40 text-[10px] font-bold tracking-widest uppercase mb-4">
          Parent Stories
        </div>
        <h2 className="text-3xl lg:text-5xl font-bold text-black mb-6 tracking-tight font-[family-name:var(--font-cormorant)] italic">
          Why Families Trust Us
        </h2>
        <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
            ))}
            <span className="ml-2 text-sm font-bold text-black/60">4.9 Parent Rating</span>
        </div>
      </div>

      <div className="relative w-full">
        <Marquee pauseOnHover className="pb-2">
          {marqueeItems.map((t, i) => (
            <TestimonialCard key={`t1-${i}`} {...t} />
          ))}
        </Marquee>
      </div>

      <div className="container mt-4 text-center">
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
