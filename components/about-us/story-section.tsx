"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { SanityImage } from "@/sanity/types";

interface AboutUsStoryData {
  title?: string;
  paragraphs?: string[];
  image?: SanityImage;
}

const defaultParagraphs = [
  "Divit MindSpace was born from a deeply personal journey. Our founder&apos;s experience raising a neurodivergent child revealed the gaps in accessible, compassionate care.",
  "What started as a search for answers became a mission: to create a space where every child is seen for their potential, not their diagnosis.",
  "Today, we combine clinical expertise with genuine understanding—because we&apos;ve walked this path ourselves. Every family that comes to us is treated like our own."
];

export function StorySection({ data }: { data?: AboutUsStoryData }) {
  const title = data?.title || "Our Story";
  const paragraphs = data?.paragraphs || defaultParagraphs;

  return (
    <section className="py-12 lg:py-16 bg-[#FAF9F5]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-purple/10 rounded-2xl transform -rotate-2 translate-x-2 translate-y-2" />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={data?.image?.asset?.url || "/about_pic4.png"}
                alt="Our journey at Divit MindSpace"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl lg:text-4xl font-serif text-green mb-6"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              {title}
            </h2>

            <div className="space-y-4 text-green/80">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-green/10">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-green">Our Mission</span>
                  <span className="text-sm text-green/70">Help every child achieve success using strength-based strategies.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
