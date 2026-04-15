"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { ClipboardCheck, Heart, Users, GraduationCap } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { SiteSettings, TrustMetrics } from "@/lib/types";

interface SanityService {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  popular: boolean;
  isTherapy: boolean;
  category: string;
  image?: {
    asset?: { _ref: string };
    hotspot?: { x: number; y: number; height: number; width: number };
    crop?: { top: number; bottom: number; left: number; right: number };
    alt?: string;
  };
}

const DEFAULT_METRICS: TrustMetrics = {
  familiesCount: "100+",
  specialistsCount: "12+",
  servicesCount: "21+",
  googleRating: "4.9 / 5",
  googleReviewsUrl: "",
};

const categories = [
  { id: "all", label: "All Services", icon: null },
  { id: "assessments", label: "Assessments", icon: ClipboardCheck },
  { id: "therapy", label: "Therapy", icon: Heart },
  { id: "guidance", label: "Guidance", icon: Users },
  { id: "programs", label: "Programs", icon: GraduationCap },
];

const categoryDescriptions: Record<string, string> = {
  all: "Mental health, neurodevelopment, and physiotherapy for children, teens, and adults - all under one roof. Serving families across HSR Layout, Bellandur, Kasavanahalli, and Bengaluru.",
  assessments: "ADHD, autism, learning disability, and psychoeducational assessments for children, teens, and adults. Comprehensive clinical evaluations at our Sarjapur Road center in Bangalore.",
  therapy: "Speech therapy, occupational therapy, ABA, sensory integration, and play therapy for all ages. Expert neurodevelopmental care at our Kasavanahalli center, Bangalore.",
  guidance: "Child, adolescent, and adult counseling plus parent guidance programs. Professional mental health support for families in HSR Layout, Bellandur, and Bangalore.",
  programs: "Early intervention, special education, school readiness, and NIOS support programs. Structured developmental programs at our center off Sarjapur Road, Bangalore.",
};

interface ServicesPageProps {
  title?: string;
  services: SanityService[];
  siteSettings?: SiteSettings | null;
}

export default function ServicesPage({ title: propTitle = "Our Services", services, siteSettings }: ServicesPageProps) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const metrics = siteSettings?.metrics || DEFAULT_METRICS;

  // Dynamic title based on category
  const dynamicTitle = useMemo(() => {
    if (activeCategory === "all") return propTitle;
    const cat = categories.find(c => c.id === activeCategory);
    return cat ? cat.label : propTitle;
  }, [activeCategory, propTitle]);

  // Read category from URL on mount and scroll to top
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && categories.some((c) => c.id === categoryParam)) {
      setActiveCategory(categoryParam);
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchParams]);

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return services;
    return services.filter((s) => s.category === activeCategory);
  }, [activeCategory, services]);

  // Count services per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: services.length };
    services.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, [services]);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section - Matched to About Us rhythm */}
      <section className="relative pt-4 lg:pt-8 pb-6 lg:pb-10 bg-[#FDFBF7]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
              Sarjapur Road, Bengaluru
            </motion.div>

            {/* Title - Dynamic and Elegant */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight italic"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {dynamicTitle}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg text-black/70 mb-6 max-w-2xl mx-auto font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {categoryDescriptions[activeCategory]}
            </motion.p>

            {/* Quick Stats Bar - Matching About Us style */}
            <motion.div
              className="flex items-center justify-center gap-5 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center group">
                <div className="text-xl font-bold text-black">{services.length}+</div>
                <div className="text-[9px] text-black/50 font-bold uppercase tracking-widest">Services</div>
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div className="text-center group">
                <div className="text-xl font-bold text-black">6+</div>
                <div className="text-[9px] text-black/50 font-bold uppercase tracking-widest">Specialists</div>
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div className="text-center group">
                <div className="text-xl font-bold text-black">100+</div>
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
                <span className="text-xl font-serif italic text-green leading-none" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>4.9 / 5</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section id="category-tabs" className="py-4 bg-[#FDFBF7] sticky top-20 z-40 border-y border-black/5">
        <div className="container mx-auto px-4 relative">
          {/* Mobile Scroll Indicator (Fade) */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent z-10 pointer-events-none md:hidden" />

          <div className="flex overflow-x-auto no-scrollbar md:flex-wrap items-center md:justify-center gap-3 pb-2 md:pb-0 pr-8 md:pr-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap shrink-0
                    ${isActive
                      ? "bg-[#7A9A7D] text-white shadow-lg shadow-[#7A9A7D]/20"
                      : "bg-white text-black/60 hover:bg-[#7A9A7D]/10 border border-black/5"
                    }
                  `}
                >
                  {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
                  {cat.label}
                  {count > 0 && (
                    <span className={`
                      text-[9px] px-1.5 py-0.5 rounded-full
                      ${isActive ? "bg-white/20" : "bg-black/10"}
                    `}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pt-4 lg:pt-6 pb-4 lg:pb-6 bg-[#FDFBF7]">
        <div className="container mx-auto px-4">
          {filteredServices.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-6 bg-black/5 rounded-full flex items-center justify-center">
                  <ClipboardCheck className="w-8 h-8 text-black/20" />
                </div>
                <h3 className="text-xl font-serif italic text-black mb-2">
                  No services in this category yet
                </h3>
                <p className="text-black/50 text-sm">
                  Check other categories or contact us to learn about upcoming services.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA - matching homepage style */}
      <section className="pt-2 lg:pt-6 pb-6 lg:pb-10 bg-[#FDFBF7] px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-black/5 p-5 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10 shadow-2xl shadow-black/5"
          >
            <div className="flex flex-row md:flex-row items-center gap-4 md:gap-8">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#7A9A7D] flex items-center justify-center shrink-0 shadow-lg">
                <svg className="w-7 h-7 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="text-left">
                <h2 className="text-xl md:text-4xl font-bold text-black font-[family-name:var(--font-cormorant)] italic mb-1 md:mb-2">
                  We&apos;re Here When You&apos;re Ready
                </h2>
                <p className="text-sm md:text-lg text-black/60 font-medium">
                  Message us on WhatsApp to book a free consultation.
                </p>
              </div>
            </div>
            <WhatsAppConsultationLink className="dm-pill-button dm-pill-button-primary w-full md:w-auto md:scale-125 whitespace-nowrap">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Book a Free Consultation
            </WhatsAppConsultationLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Inline Service Card Component
function ServiceCard({ service }: { service: SanityService }) {
  const imageUrl = service.image
    ? urlFor(service.image).width(800).height(600).fit('crop').auto('format').url()
    : '/placeholder-service.png';

  return (
    <Link
      href={`/services/${service.slug.current}`}
      className="group relative bg-white overflow-hidden rounded-[2rem] border border-black/5 hover:border-black/10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5"
    >
      <div className="relative h-64 w-full overflow-hidden bg-black/5">
        <Image
          src={imageUrl}
          alt={service.image?.alt || service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-8 space-y-4">
        <h3 className="text-2xl font-serif italic text-black leading-tight line-clamp-2 group-hover:text-purple transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-black/60 line-clamp-3 leading-relaxed font-medium">
          {service.description}
        </p>

        <div className="pt-4 flex items-center gap-2 text-black/40 group-hover:text-black transition-all duration-300 uppercase text-[10px] font-bold tracking-widest">
          <span>Explore Service</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
