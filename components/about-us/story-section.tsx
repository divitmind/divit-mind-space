"use client";

import { motion } from "motion/react";

interface AboutUsStoryData {
  title?: string;
  paragraphs?: string[];
}

const defaultParagraphs = [
  "Divit MindSpace was born from a deeply personal journey. Firsthand experience raising a neurodivergent child revealed the gaps in accessible, compassionate care.",
  "What started as a search for answers became a mission: to create a space where every individual is seen for their potential, not their diagnosis.",
  "Today, we combine clinical expertise with genuine understanding—because we&apos;ve walked this path ourselves. Every family that comes to us is treated like our own."
];

export function StorySection({ data }: { data?: AboutUsStoryData }) {
  const title = data?.title || "Our Journey";
  const paragraphs = data?.paragraphs || defaultParagraphs;

  return (
    <section className="pb-8 lg:pb-6 bg-[#FAF9F5]">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <h2
              className="text-4xl lg:text-5xl font-serif text-black leading-tight"
            >
              {title}
            </h2>
            <p className="text-[#7A9A7D] font-bold uppercase tracking-widest text-[10px]">
              Rooted in Compassion, Built on Expertise
            </p>
          </div>

          <div className="space-y-6 text-lg text-black/70 font-medium leading-relaxed text-left">
            {paragraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>

          {/* Unified Mission & Location Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Mission Card - Sage Green Accent */}
            <div className="group p-8 lg:p-10 bg-[#7A9A7D] rounded-[2rem] text-white text-left flex flex-col justify-center shadow-xl shadow-[#7A9A7D]/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#7A9A7D]/20 hover:bg-[#6B8B6E]">
              <span className="text-[10px] font-bold uppercase tracking-widest mb-3 opacity-80 group-hover:opacity-100 transition-opacity">Our Core Mission</span>
              <p className="text-2xl lg:text-3xl font-serif italic leading-tight">
                Empowering minds across the lifespan through compassionate, evidence-based care.
              </p>
            </div>

            {/* Location Card - Matches Philosophy style */}
            <div className="group p-8 lg:p-10 bg-white rounded-[2rem] border border-black/5 text-left flex flex-col justify-center shadow-xl shadow-black/[0.02] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/5 hover:border-[#7A9A7D]/20">
              <p className="text-black font-serif italic text-xl mb-3 group-hover:text-[#7A9A7D] transition-colors">Local Care for Bangalore Families</p>
              <p className="text-base text-black/60 font-medium leading-relaxed">
                Located off <span className="text-[#7A9A7D] font-bold">Sarjapur Road</span>, we provide trusted care for families across <span className="text-black font-bold">Kasavanahalli, HSR Layout, Bellandur, and surrounding areas</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


