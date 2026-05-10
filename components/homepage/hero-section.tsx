"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

interface HeroSectionProps {
  siteSettings?: SiteSettings | null;
}

// Fallback values
const DEFAULT_ROLLING_AUDIENCES = ["CHILD'S", "TEEN'S", "ADULT'S", "FAMILY'S"];
const DEFAULT_ROLLING_SCHOOLS = ["TISB", "Jyoti Nivas College", "Leading Pre-Schools", "Community Centers"];
const DEFAULT_HERO_DESCRIPTION = "Bangalore's leading center for mental health, neurodevelopment, and physiotherapy. Expert clinical assessments, professional counseling, and specialized education for all ages.";
const DEFAULT_CTA_PRIMARY = "Book a Free Consultation";
const DEFAULT_CTA_SECONDARY = "Host a Free Workshop";
const DEFAULT_METRICS = {
  familiesCount: "100+",
  specialistsCount: "6+",
  googleRating: "4.9 / 5",
};

export function HeroSection({ siteSettings }: HeroSectionProps) {
  // Use Sanity data with fallbacks
  const rollingAudiences = siteSettings?.homepage?.rollingAudiences?.length ? siteSettings.homepage.rollingAudiences : DEFAULT_ROLLING_AUDIENCES;
  const rollingSchools = siteSettings?.homepage?.rollingSchools?.length ? siteSettings.homepage.rollingSchools : DEFAULT_ROLLING_SCHOOLS;
  const heroDescription = siteSettings?.homepage?.heroDescription || DEFAULT_HERO_DESCRIPTION;
  const ctaPrimary = siteSettings?.homepage?.ctaPrimary || DEFAULT_CTA_PRIMARY;
  const ctaSecondary = siteSettings?.homepage?.ctaSecondary || DEFAULT_CTA_SECONDARY;
  const metrics = {
    familiesCount: siteSettings?.metrics?.familiesCount || DEFAULT_METRICS.familiesCount,
    specialistsCount: siteSettings?.metrics?.specialistsCount || DEFAULT_METRICS.specialistsCount,
    googleRating: siteSettings?.metrics?.googleRating || DEFAULT_METRICS.googleRating,
  };
  const heroImage = siteSettings?.homepage?.heroImage?.asset?.url || "/welcome_to_neuroempower.png";
  const heroImageAlt = siteSettings?.homepage?.heroImageAlt || "Child confidently playing with blocks, teen journaling with self-assurance, parents feeling connected and hopeful";

  return (
    <section className="relative overflow-hidden pt-0 pb-4 lg:pt-2 lg:pb-10 min-h-[auto] md:min-h-[450px] lg:min-h-[500px] flex items-start">
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-4">

          {/* Text Content */}
          <div className="flex-[1.2] text-center md:text-left animate-in slide-in-from-bottom duration-700 fade-in">
            <div className="flex flex-col w-full max-w-[580px] mx-auto md:mx-0">
              <div className="text-sm md:text-base font-bold text-[#7A9A7D] uppercase tracking-[0.2em] mb-4 md:mb-5 px-1 drop-shadow-sm">
                Nurtured Minds, Independent Lives.
              </div>
              <h1 className="flex flex-col tracking-tight text-black leading-none">
                {/* Line 1: EMPOWERING EVERY CHILD'S with overlapping yellow strokes */}
                <span className="relative flex justify-between items-baseline w-full text-[clamp(0.9rem,2.2vw,1.6rem)] font-bold uppercase tracking-[0.12em] mb-3 py-1 px-2">
                  {/* Multiple overlapping highlight strokes - Light Gold */}
                  <span className="absolute inset-0 bg-[#E8D5B7]/50 -z-10 rounded-sm transform -rotate-[1.5deg] scale-x-[1.08] -translate-x-0.5" />
                  <span className="absolute inset-0 bg-[#E8D5B7]/60 -z-10 rounded-sm transform rotate-[0.8deg] scale-x-[1.04] translate-y-px" />
                  <span className="absolute inset-0 bg-[#E8D5B7]/40 -z-20 rounded-sm transform -rotate-[0.5deg] scale-x-[1.06] scale-y-[1.15] -translate-y-px" />
                  <span>E</span><span>M</span><span>P</span><span>O</span><span>W</span><span>E</span><span>R</span><span>I</span><span>N</span><span>G</span>
                  <span className="ml-1.5">E</span><span>V</span><span>E</span><span>R</span><span>Y</span>
                  {/* Rolling audience: CHILD'S → TEEN'S → ADULT'S → FAMILY'S */}
                  <span className="ml-1.5 relative inline-flex translate-y-[1px] md:translate-y-[2px]">
                   <span className="animate-hero-crossfade" style={{ animationDelay: '0s' }}>CHILD&apos;S</span>
                   <span className="absolute left-0 animate-hero-crossfade" style={{ animationDelay: '2s' }}>TEEN&apos;S</span>
                   <span className="absolute left-0 animate-hero-crossfade" style={{ animationDelay: '4s' }}>ADULT&apos;S</span>
                   <span className="absolute left-0 animate-hero-crossfade" style={{ animationDelay: '6s' }}>FAMILY&apos;S</span>
                  </span>
                </span>
                {/* Line 2: Different (crossed out) Unique Journey */}
                <span className="flex items-baseline justify-center md:justify-start gap-[1.125rem] sm:gap-4 text-[clamp(2rem,6vw,4rem)] font-[family-name:var(--font-cormorant)] italic text-[#7A9A7D] leading-[0.9] -mt-1 font-medium">
                  <span className="relative text-[#999] opacity-50">
                   Different
                   <span className="absolute left-[-4%] right-[-4%] top-1/2 h-[3px] bg-[#999] -rotate-[3deg]" />
                  </span>
                  <span className="font-bold">Unique</span>
                  <span>Journey.</span>
                </span>
              </h1>
            </div>

            <p className="mt-6 lg:mt-8 max-w-xl mx-auto md:mx-0 text-base lg:text-lg text-black/80 leading-relaxed font-medium text-balance text-center md:text-left">
              {heroDescription}
            </p>
            <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-center gap-5 justify-center md:justify-start">
              <WhatsAppConsultationLink className="dm-pill-button dm-pill-button-primary">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {ctaPrimary}
              </WhatsAppConsultationLink>
              <Link
                href="/awareness-program"
                className="dm-pill-button dm-pill-button-secondary"
              >
                {ctaSecondary}
              </Link>
            </div>

            {/* Rolling Proof Line */}
            <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 text-sm text-black/70 font-medium">
              <span>Conducting awareness programs at</span>
              <div className="h-6 overflow-hidden relative w-48 text-center sm:text-left">
                <div className="animate-rolling-text flex flex-col text-[#7A9A7D] font-bold">
                  {rollingSchools.map((school, index) => (
                    <span key={index} className="h-6">{school}</span>
                  ))}
                  <span className="h-6">{rollingSchools[0]}</span> {/* Duplicate for loop */}
                </div>
              </div>
            </div>

            {/* Trust Metrics - Premium Style */}
            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
              {/* Families Served */}
              <div className="flex flex-col">
                <span className="text-lg font-bold text-black leading-tight">{metrics.familiesCount}</span>
                <span className="text-[9px] font-semibold text-black/50 uppercase tracking-wider">Families</span>
              </div>

              <div className="hidden sm:block w-px h-8 bg-black/10" />

              {/* Expert Specialists */}
              <div className="flex flex-col">
                <span className="text-lg font-bold text-black leading-tight">{metrics.specialistsCount}</span>
                <span className="text-[9px] font-semibold text-black/50 uppercase tracking-wider">Specialists</span>
              </div>

              <div className="hidden sm:block w-px h-8 bg-black/10" />

              {/* Google Rating */}
              <div className="flex items-center gap-2">
                {/* Google G Icon - Official Colors */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-xl font-serif italic text-green leading-none" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>{metrics.googleRating}</span>
              </div>

              <div className="hidden sm:block w-px h-8 bg-black/10" />

              {/* Holistic Approach */}
              <div className="flex flex-col">
                <span className="text-lg font-bold text-black leading-tight">Holistic</span>
                <span className="text-[9px] font-semibold text-black/50 uppercase tracking-wider">Family Approach</span>
              </div>
            </div>
          </div>

          {/* Right Visual - Triptych Story */}
          <div className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-xl relative animate-in slide-in-from-right duration-1000 fade-in delay-200">
            {/* Offset shadow layers - Sage Green & Light Gold palette */}
            <div className="absolute inset-0 bg-[#7A9A7D] rounded-2xl transform rotate-2 translate-x-2 translate-y-2 opacity-40" />
            <div className="absolute inset-0 bg-[#E8D5B7] rounded-2xl transform -rotate-1 translate-x-1 translate-y-3 opacity-50" />

            <div className="relative rounded-2xl overflow-hidden shadow-lg mx-auto lg:mr-0 aspect-[5/4] max-w-[480px] lg:max-w-none border-4 border-[#FAF7F2]">
              <Image
                src={heroImage}
                alt={heroImageAlt}
                className="object-cover object-[center_8%] w-full h-full scale-[1.12]"
                fill
                priority
              />
            </div>

            {/* Subtle Decorative Circle - Sage Green */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#7A9A7D]/15 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
