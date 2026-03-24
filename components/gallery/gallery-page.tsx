"use client";

import { useState, useMemo } from "react";
import { MasonryGrid } from "./masonry-grid";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import type { GalleryItem } from "@/sanity/types";
import { enrichGalleryItem } from "@/lib/gallery-utils";

const GALLERY_CATEGORIES = [
  "Empowering Educators",
  "Nurturing Growth",
  "Real Connections"
];

interface GalleryPageProps {
  initialItems: GalleryItem[];
}

export function GalleryPage({ initialItems }: GalleryPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const enrichedItems = useMemo(() => {
    return initialItems.map(item => enrichGalleryItem(item));
  }, [initialItems]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return enrichedItems;
    return enrichedItems.filter(item => item.categories?.includes(activeCategory));
  }, [activeCategory, enrichedItems]);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section - Storytelling focused */}
      <div className="bg-linear-to-br from-cream via-[#FDFBF7] to-green-lite/10 pt-12 pb-6 md:pt-16 md:pb-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-green mb-4 font-[family-name:var(--font-cormorant)] italic"
            >
              Our Journey in Moments
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-green/70 leading-relaxed"
            >
              Beyond therapy and education, we build stories of resilience, 
              connection, and growth. Every photo is a milestone in a unique journey.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Filter Bar - Emotional Pills */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-nowrap md:flex-wrap items-center md:justify-center gap-3 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 no-scrollbar">
          <button
            onClick={() => setActiveCategory("All")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap",
              activeCategory === "All"
                ? "bg-green text-white shadow-lg shadow-green/20"
                : "bg-white text-green/60 hover:bg-green/5 border border-green/10"
            )}
          >
            All Moments
          </button>
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap",
                activeCategory === category
                  ? "bg-green text-white shadow-lg shadow-green/20"
                  : "bg-white text-green/60 hover:bg-green/5 border border-green/10"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 pb-20 md:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {filteredItems.length > 0 ? (
              <MasonryGrid items={filteredItems} />
            ) : (
              <div className="text-center py-20">
                <p className="text-green/40 italic">More moments being added soon...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
