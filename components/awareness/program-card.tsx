"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "motion/react";

interface ProgramCardProps {
  title: string;
  content: string[];
  image: string;
  imageAlt: string;
  index: number;
}

export function ProgramCard({ title, content, image, imageAlt, index }: ProgramCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
        isEven ? "" : "lg:grid-flow-dense"
      }`}
    >
      {/* Image Section with Parallax */}
      <motion.div
        ref={imageRef}
        className={`relative lg:col-span-5 ${isEven ? "" : "lg:col-start-8"} group`}
        style={{ y }}
      >
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
          {/* Grain texture overlay */}
          <div className="absolute inset-0 z-10 opacity-[0.015] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
          
          {/* Image with hover scale */}
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-[#004540]/20 via-transparent to-transparent" />
        </div>

        {/* Decorative element */}
        <motion.div
          className={`absolute -z-10 w-full h-full rounded-2xl ${
            isEven ? "bg-yellow" : "bg-purple"
          }`}
          style={{
            top: "1.5rem",
            left: isEven ? "1.5rem" : "-1.5rem",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 0.15, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </motion.div>

      {/* Content Section */}
      <div className={`lg:col-span-7 ${isEven ? "" : "lg:col-start-1 lg:row-start-1"} space-y-6`}>
        {/* Title with staggered reveal */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-serif text-green leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {title}
        </motion.h2>

        {/* Content paragraphs with staggered animation */}
        <div className="space-y-4">
          {content.map((paragraph, idx) => (
            <motion.p
              key={idx}
              className="text-base md:text-lg text-green/80 leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Accent bar */}
        <motion.div
          className={`h-1 w-24 ${isEven ? "bg-yellow" : "bg-purple"} rounded-full`}
          initial={{ width: 0 }}
          animate={isInView ? { width: 96 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>
    </motion.article>
  );
}
