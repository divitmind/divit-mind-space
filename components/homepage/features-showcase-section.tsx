"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const features = [
  {
    id: "assessments",
    title: "Scholarship Programs",
    description:
      "We believe in making education accessible to all. Our scholarship programs provide financial assistance to deserving candidates.",
    route: "/services",
    imageUrl:
      "https://images.pexels.com/photos/9829311/pexels-photo-9829311.jpeg",
    overlayType: "testimonial" as const,
    overlayContent: {
      quote:
        "The assessment gave us clarity we'd been missing. We finally understand how to support our child.",
      rating: 5,
    },
  },
  {
    id: "therapy",
    title: "Group Discounts",
    description:
      "Learning together is impactful! We offer special discounts for groups, making it easier for teams to upskill collectively.",
    route: "/services",
    imageUrl:
      "https://images.pexels.com/photos/33008585/pexels-photo-33008585.jpeg",
    overlayType: "question" as const,
    overlayContent: {
      question: "Did they feel supported throughout the process?",
      options: ["Yes", "No"],
    },
  },
  {
    id: "parent-guidance",
    title: "Flexibility",
    description:
      "Our training programs are designed to fit into your schedule, offering both online and offline learning options.",
    route: "/services",
    imageUrl:
      "https://images.pexels.com/photos/6676154/pexels-photo-6676154.jpeg",
    overlayType: "feature" as const,
    overlayContent: {
      title: "Personalized strategies for your family",
      subtitle: "Evidence-based guidance, one step at a time",
    },
  },
  {
    id: "learning",
    title: "Worksheets & Resources",
    description:
      "Gain access to well-structured worksheets and resource materials that reinforce learning and support real-world application.",
    route: "/services",
    imageUrl:
      "https://images.pexels.com/photos/5538357/pexels-photo-5538357.jpeg",
    overlayType: "cta" as const,
    overlayContent: {
      title: "Plan tailored to your child",
      placeholder: "Describe your goals...",
    },
  },
];

type Feature = (typeof features)[number];

function FeatureCard({
  feature,
  className,
  imageSizes,
}: {
  feature: Feature;
  className?: string;
  imageSizes?: string;
}) {
  return (
    <div className={className}>
      <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={feature.imageUrl}
          alt=""
          fill
          className="object-cover"
          sizes={imageSizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"
          aria-hidden
        />
      </div>

      <div className="mt-5 space-y-3">
        <h3 className="font-bold text-xl text-green">{feature.title}</h3>
        <p className="text-sm text-green leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
}

export function FeaturesShowcaseSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth;
    el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  return (
    <section className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-semibold tracking-wide uppercase text-purple">
            What makes us different
          </p>
          <h2 className="text-3xl lg:text-5xl font-semibold text-green">
            One place to support your whole family
          </h2>
        </div>

        {/* Carousel: small devices only */}
        <div className="lg:hidden space-y-6">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth overscroll-x-contain [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
            style={{ scrollBehavior: "smooth" }}
          >
            {features.map((feature) => (
              <div
                key={feature.id}
                className="shrink-0 w-[85vw] sm:w-[45vw] snap-center"
              >
                <FeatureCard
                  feature={feature}
                  className="group bg-white rounded-3xl p-4 flex flex-col h-full"
                  imageSizes="(max-width: 640px) 85vw, 45vw"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="size-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-green hover:bg-cream hover:border-green/30 transition-colors"
              aria-label="Previous card"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="size-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-green hover:bg-cream hover:border-green/30 transition-colors"
              aria-label="Next card"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Grid: lg and above */}
        <div className="hidden lg:grid grid-cols-4 gap-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              className="group bg-white rounded-3xl p-4 flex flex-col"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
