"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { TrustMetrics } from "@/lib/types";

interface AboutUsHeroImage {
  asset?: { url?: string };
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

interface AboutUsHeroData {
  title?: string;
  italicSubtitle?: string;
  description?: string;
  images?: AboutUsHeroImage[];
}

const DEFAULT_METRICS: TrustMetrics = {
  familiesCount: "100+",
  specialistsCount: "6+",
  servicesCount: "21+",
  googleRating: "4.9 / 5",
  googleReviewsUrl: "",
};

const SERVICE_CHIPS = [
  // Clinical Assessments
  "Autism",
  "ADHD",
  "Learning Disabilities",
  "Adult Autism",
  "Adult ADHD",
  // Mental Health
  "Stress",
  "Anxiety",
  "Depression",
  "Counseling for Teenagers & Adults",
  // Education & Training
  "NIOS Support",
  "Teacher & Parent Training",
  // Physiotherapy
  "Pain Management",
  "Pain Modalities",
  "Post-Surgical Rehab",
  "Gym & Sports Injury Sessions",
  "Assistive Devices",
  "Wheelchair Training",
  // Workshops
  "Customized Workshops",
];

export function HeroSection({
  data,
  metrics: sanityMetrics,
  serviceSlugByChipLabel,
}: {
  data?: AboutUsHeroData;
  metrics?: TrustMetrics;
  serviceSlugByChipLabel?: Record<string, string>;
}) {
  const metrics = {
    familiesCount: sanityMetrics?.familiesCount || DEFAULT_METRICS.familiesCount,
    specialistsCount: sanityMetrics?.specialistsCount || DEFAULT_METRICS.specialistsCount,
    servicesCount: sanityMetrics?.servicesCount || DEFAULT_METRICS.servicesCount,
    googleRating: sanityMetrics?.googleRating || DEFAULT_METRICS.googleRating,
  };
  // SEO Ranking Hack Strategy
  const seoTitle = "Leading Mental Health, Neurodevelopment & Physiotherapy Center in Bangalore";
  const seoLead = "Expert Clinical Assessments, Therapies, Professional Counseling, Special Education, NIOS Support, Training Programs for Teachers and Parents, Physiotherapy, and Customized Workshops — for all ages.";
  const seoLocation = "Located off Sarjapur Road, we provide trusted care for families in Kasavanahalli, HSR Layout, Bellandur, and Bengaluru.";


  // If Sanity has the old default or is empty, use the new SEO version
  const title = !data?.title || data.title.includes("Empowering Every")
    ? seoTitle
    : data.title;

  const description = !data?.description || data.description.includes("Bangalore's leading center") || data.description.includes("We provide expert") || data.description.includes("clinical assessments, therapies, professional counseling, and specialized education for all ages")
    ? seoLead
    : data.description;

  return (


    <section className="pt-2 pb-8 lg:pt-4 lg:pb-6 bg-[#FAF9F5]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title - Matched to Services Scale */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight italic"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h1>

          {/* Description - Matched to Services Scale */}
          <motion.p
            className="text-lg text-black/70 mb-6 max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>

          {/* Service Chips - Entity-rich, scannable keyword list for SEO + LLM */}
          <motion.ul
            aria-label="Specialized services and conditions we support"
            className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            {SERVICE_CHIPS.map((chip) => {
              const slug = serviceSlugByChipLabel?.[chip.toLowerCase()];
              const chipClasses =
                "px-3 py-1.5 rounded-full bg-white border border-black/5 text-[11px] font-semibold text-black/70 shadow-sm shadow-black/[0.02] tracking-wide transition-colors hover:bg-[#7A9A7D]/10 hover:border-[#7A9A7D]/30";
              return (
                <li key={chip}>
                  {slug ? (
                    <Link
                      href={`/services/${slug}`}
                      className={`${chipClasses} inline-block`}
                      title={`Learn more about ${chip}`}
                    >
                      {chip}
                    </Link>
                  ) : (
                    <span className={`${chipClasses} inline-block`}>{chip}</span>
                  )}
                </li>
              );
            })}
          </motion.ul>

          {/* Location Line - Hyperlocal SEO */}
          <motion.p
            className="text-base text-black/60 mb-8 max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
          >
            {seoLocation}
          </motion.p>

          {/* Quick Stats Bar - Matched to Services Row Style */}
          <motion.div
            className="flex items-center justify-center gap-5 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center group">
              <div className="text-xl font-bold text-black">{metrics.servicesCount}</div>
              <div className="text-[9px] text-black/50 font-bold uppercase tracking-widest">Services</div>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div className="text-center group">
              <div className="text-xl font-bold text-black">{metrics.specialistsCount}</div>
              <div className="text-[9px] text-black/50 font-bold uppercase tracking-widest">Specialists</div>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div className="text-center group">
              <div className="text-xl font-bold text-black">{metrics.familiesCount}</div>
              <div className="text-[9px] text-black/50 font-bold uppercase tracking-widest">Families</div>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div className="flex items-center gap-2 group">
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-xl font-serif italic text-green leading-none" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>{metrics.googleRating}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



