"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturesShowcaseSectionProps {
  isHomepage?: boolean;
}

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

const homepageFeatures = [
  {
    id: "child-autism-assessment",
    title: "Child Autism Assessment",
    subtitle: "Early & Comprehensive Autism Assessment",
    description:
      "We provide structured and compassionate autism assessments designed to understand your child's unique strengths and challenges. Our evidence-based screening and developmental evaluations help identify early signs and guide families toward the right support plan.",
    imageUrl: "/features-service-card/child-autism-assessment.png",
  },
  {
    id: "therapy-services",
    title: "Therapy Services",
    subtitle: "Personalized Therapy for Every Child",
    description:
      "Our therapy programs are tailored to each child's developmental needs. We focus on building communication, behavior regulation, emotional strength, and daily life skills in a supportive environment.",
    imageUrl: "/features-service-card/therapy-services.png",
  },
  {
    id: "parent-education",
    title: "Parent Education & Training",
    subtitle: "Empowering Parents Through Psychoeducation",
    description:
      "Parents are the most important part of a child's progress. We provide structured psychoeducation and practical training sessions to help parents confidently support their child at home and in daily life.",
    imageUrl: "/features-service-card/parent-education.png",
  },
  {
    id: "adult-counseling",
    title: "Adolescent & Adult Counseling",
    subtitle: "Counseling for Teenagers & Adults",
    description:
      "Mental health support is essential at every stage of life. We offer safe, confidential, and compassionate counseling services for teenagers and adults dealing with stress, anxiety, emotional struggles, or life transitions.",
    imageUrl: "/features-service-card/adult-counseling.png",
  },
];

type Feature = (typeof features)[number] & { subtitle?: string };
type HomepageFeature = (typeof homepageFeatures)[number];
type FeatureCardFeature = Feature | HomepageFeature;

function FeatureCard({
  feature,
  className,
  imageSizes,
}: {
  feature: FeatureCardFeature;
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
        {"subtitle" in feature && feature.subtitle && (
          <p className="text-sm text-green/80 font-medium">{feature.subtitle}</p>
        )}
        <p className="text-sm text-green leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
}

export function FeaturesShowcaseSection({ isHomepage = false }: FeaturesShowcaseSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const list = isHomepage ? homepageFeatures : features;

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth;
    el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  return (
    <section className="py-16 lg:py-24 bg-cream relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center space-y-3 mb-12 lg:mb-16">
          <p className="text-sm font-bold tracking-widest uppercase text-purple">
            What makes us different
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-green tracking-tight">
            One place to support your whole family
          </h2>
        </div>

        {/* Carousel: small devices only */}
        <div className="lg:hidden space-y-6">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth overscroll-x-contain [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
            style={{ scrollBehavior: "smooth" }}
          >
            {list.map((feature) => (
              <div
                key={feature.id}
                className="shrink-0 w-[85vw] sm:w-[45vw] snap-center"
              >
                <FeatureCard
                  feature={feature}
                  className="group bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100 flex flex-col h-full"
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
        <div className="hidden lg:grid grid-cols-4 gap-4">
          {list.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              className="group bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
