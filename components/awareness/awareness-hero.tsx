"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { Awareness } from "@/sanity/types";

interface AwarenessHeroProps {
  data?: Awareness["hero"];
}

const defaultHero = {
  badge: "Complimentary Sessions",
  title: "Awareness is a core pillar of our work",
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
    <section className="relative pt-8 pb-10 lg:pt-12 lg:pb-14 bg-[#FAF9F5] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Left: Content */}
          <motion.div
            className="space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            {hero.badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 text-purple text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-purple animate-pulse" />
                {hero.badge}
              </div>
            )}

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-green leading-[1.1]"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              {hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-black/70 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              {hero.description}
            </p>

            {/* Quick Stats — spring-in on load, then subtle pulse to feel alive */}
            {hero.stats && hero.stats.length > 0 && (
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-2">
                {hero.stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-8">
                    <motion.div
                      className="text-center group"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3 + idx * 0.15,
                        type: "spring",
                        stiffness: 180,
                      }}
                    >
                      <motion.div
                        className="text-2xl font-bold text-green group-hover:text-purple transition-colors"
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
                      <div className="w-px h-8 bg-green/20 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="pt-4">
              <WhatsAppConsultationLink className="dm-pill-button dm-pill-button-primary">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Schedule a Free Session
              </WhatsAppConsultationLink>
            </div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Decorative offset */}
            <div className="absolute inset-0 bg-yellow/20 rounded-2xl transform rotate-3 translate-x-3 translate-y-3" />
            <div className="absolute inset-0 bg-purple/10 rounded-2xl transform -rotate-2 translate-x-1 translate-y-4" />

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-xl">
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
