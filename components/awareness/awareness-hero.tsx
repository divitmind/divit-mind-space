"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Awareness } from "@/sanity/types";

interface AwarenessHeroProps {
  data?: Awareness["hero"];
}

const defaultHero = {
  badge: "FREE",
  title: "Awareness is a core pillar of our work!",
  description:
    "At Divit MindSpace, our mission is to support the mental well-being of individuals across all age groups and their families. From the very beginning, we believed that simply opening a mental health clinic is not enough. In a society where ignorance, myths, and stigma around mental health remain widespread, true change can only happen through awareness and education. That is why awareness is a core pillar of our work. Without it, mental health support stays inaccessible and inclusivity remains a distant goal. With this conviction, Divit MindSpace is deeply committed to conducting complimentary awareness sessions that empower teachers, parents, and communities with knowledge about neurodivergence and the importance of early intervention.",
  stats: [
    { label: "Sessions Done", value: "30+" },
    { label: "People Reached", value: "1000+" },
    { label: "Schools Covered", value: "15+" },
  ],
  image: {
    asset: { url: "/awareness-jyoti-nivas.jpeg" },
    alt: "Awareness session at Jyoti Niwas College - educators learning about early intervention",
  },
};

export function AwarenessHero({ data }: AwarenessHeroProps) {
  // Hardcoded override to ensure local changes are visible regardless of Sanity data
  const hero = defaultHero;
  
  // Type-safe image URL extraction
  let imageUrl = defaultHero.image.asset.url;
  if (hero.image) {
    if (typeof hero.image === 'string') {
      imageUrl = hero.image;
    } else if (hero.image.asset) {
      if (typeof hero.image.asset === 'string') {
        imageUrl = hero.image.asset;
      } else if ('url' in hero.image.asset && hero.image.asset.url) {
        imageUrl = hero.image.asset.url;
      }
    }
  }

  return (
    <section className="relative pt-2 pb-6 lg:pt-4 lg:pb-8 bg-[#FAF9F5] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Full-width Title area for maximum impact with a premium staggered reveal */}
        <motion.div
          className="mb-6 lg:mb-10 text-center lg:text-left border-b border-green/10 pb-4 lg:pb-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              },
            },
          }}
        >
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-green leading-none tracking-tight flex flex-wrap justify-center lg:justify-start"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          >
            {hero.title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
          {/* Left: Core Mission & Details */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6">
              {/* Description */}
              <p className="text-lg lg:text-xl text-black/70 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed italic">
                {hero.description}
              </p>

              <motion.p
                className="text-xs lg:text-sm font-bold text-green uppercase tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                All awareness sessions are offered free of charge.
              </motion.p>
            </div>

            {/* Quick Stats — spring-in on load */}
            {hero.stats && hero.stats.length > 0 && (
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 border-t border-green/5 pt-8">
                {hero.stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-8">
                    <motion.div
                      className="text-center group"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.5 + idx * 0.15,
                        type: "spring",
                        stiffness: 180,
                      }}
                    >
                      <motion.div
                        className="text-3xl font-bold text-green group-hover:text-purple transition-colors"
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: idx * 0.4,
                        }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-[10px] text-black/50 font-bold uppercase tracking-widest">
                        {stat.label}
                      </div>
                    </motion.div>
                    {idx < (hero.stats?.length || 0) - 1 && (
                      <div className="w-px h-10 bg-green/20 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Decorative offset */}
            <div className="absolute inset-0 bg-yellow/20 rounded-2xl transform rotate-3 translate-x-3 translate-y-3" />
            <div className="absolute inset-0 bg-purple/10 rounded-2xl transform -rotate-2 translate-x-1 translate-y-4" />

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
              <Image
                src={imageUrl}
                alt={hero.image?.alt || "Awareness session"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
