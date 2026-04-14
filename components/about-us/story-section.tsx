"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface AboutUsStoryImage {
  asset?: { url?: string };
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

interface AboutUsStoryData {
  title?: string;
  paragraphs?: string[];
  image?: AboutUsStoryImage;
}

const defaultParagraphs = [
  "Divit MindSpace was born from a deeply personal journey. Our founder&apos;s experience raising a neurodivergent child revealed the gaps in accessible, compassionate care.",
  "What started as a search for answers became a mission: to create a space where every child is seen for their potential, not their diagnosis.",
  "Today, we combine clinical expertise with genuine understanding—because we&apos;ve walked this path ourselves. Every family that comes to us is treated like our own."
];

export function StorySection({ data }: { data?: AboutUsStoryData }) {
  const title = data?.title || "Our Journey";
  const paragraphs = data?.paragraphs || defaultParagraphs;

  return (
    <section className="py-8 lg:py-6 bg-[#FAF9F5]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">



          {/* Image - Single Anchor */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[#7A9A7D]/10 rounded-[3rem] transform -rotate-2 translate-x-4 translate-y-4" />
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
              <Image
                src={data?.image?.asset ? urlFor(data.image).width(800).auto('format').url() : "/about_pic4.png"}
                alt={data?.image?.alt || "Our journey at Divit MindSpace"}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="order-1 lg:order-2 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <h2
                className="text-4xl lg:text-5xl font-serif text-black leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                {title}
              </h2>
              <p className="text-[#7A9A7D] font-bold uppercase tracking-widest text-[10px]">
                Rooted in Compassion, Built on Expertise
              </p>
            </div>

            <div className="space-y-6 text-lg text-black/70 font-medium leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
              
              <div className="p-8 bg-white rounded-3xl border border-black/5 shadow-xl shadow-black/[0.02]">
                <p className="text-black font-semibold text-xl mb-3">Local Care for Bangalore Families</p>
                <p className="text-base">
                  Located off <span className="text-[#7A9A7D]">Sarjapur Road</span>, we provide trusted care for families across <span className="font-bold">Kasavanahalli, HSR Layout, Bellandur, and Bengaluru</span>. Our center is a safe haven designed for neurodivergent children and their families.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-black/5">
              <div className="flex items-center gap-6">
                <div className="w-1.5 h-14 bg-[#7A9A7D]/20 rounded-full" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-1">Our Core Mission</span>
                  <span className="text-xl font-serif italic text-black">Empowering potential through compassionate, evidence-based care.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


