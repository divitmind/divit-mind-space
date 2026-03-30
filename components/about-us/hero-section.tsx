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
  const description = data?.description || "We provide expert assessments, therapy, and family support—helping children build confidence and independence in a nurturing environment.";

  const getImageUrl = (image: AboutUsHeroImage | undefined, fallback: string) => {
    if (image?.asset) {
      return urlFor(image).width(800).auto('format').url();
    }
    return fallback;
  };
  
  return (
    <section className="relative py-12 lg:py-16 bg-[#FAF9F5] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            className="space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 text-green text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green" />
              About Divit MindSpace
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-green leading-[1.1]"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              {title} {data?.italicSubtitle && <span className="italic text-purple">{data.italicSubtitle}</span>}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-green/70 max-w-lg mx-auto lg:mx-0">
              {description}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-green">100+</div>
                <div className="text-xs text-green/60 uppercase tracking-wide">Families Helped</div>
              </div>
              <div className="w-px h-8 bg-green/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl font-bold text-green">10+</div>
                <div className="text-xs text-green/60 uppercase tracking-wide">Expert Therapists</div>
              </div>
              <div className="w-px h-8 bg-green/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl font-bold text-green">4.9/5</div>
                <div className="text-xs text-green/60 uppercase tracking-wide">Parent Rating</div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <WhatsAppConsultationLink className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-green text-white font-semibold hover:bg-green/90 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book a Free Consultation
              </WhatsAppConsultationLink>
            </div>
          </motion.div>

          {/* Right: Photo Grid */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {/* Large image */}
              <div className="col-span-2 relative aspect-[16/9] rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={getImageUrl(data?.images?.[0], "/about_pic1.png")}
                  alt={data?.images?.[0]?.alt || "Child development session at Divit MindSpace"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Two smaller images */}
              <div className="relative aspect-square rounded-xl overflow-hidden border-4 border-white shadow-md">
                <Image
                  src={getImageUrl(data?.images?.[1], "/about_pic2.png")}
                  alt={data?.images?.[1]?.alt || "Therapy session"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden border-4 border-white shadow-md">
                <Image
                  src={getImageUrl(data?.images?.[2], "/about_pic3.png")}
                  alt={data?.images?.[2]?.alt || "Child learning activities"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple/10 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
