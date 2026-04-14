"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { urlFor } from "@/sanity/lib/image";

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

export function HeroSection({ data }: { data?: AboutUsHeroData }) {
  const title = data?.title || "Empowering Every Neurodivergent Child to Thrive";
  const description = "Bangalore's leading center for mental health, neurodevelopment, and physiotherapy. Expert clinical assessments, therapies, professional counseling, and specialized education for all ages.";

  return (
    <section className="pt-4 lg:pt-8 pb-8 lg:pb-6 bg-[#FAF9F5]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">


          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
            About Divit MindSpace
          </motion.div>

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

          {/* Quick Stats Bar - Matched to Services Row Style */}
          <motion.div
            className="flex items-center justify-center gap-5 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center group">
              <div className="text-xl font-bold text-black">21+</div>
              <div className="text-[9px] text-black/50 font-bold uppercase tracking-widest">Services</div>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div className="text-center group">
              <div className="text-xl font-bold text-black">12+</div>
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
  );
}



