"use client";

import { useState } from "react";
import { MasonryGrid } from "./masonry-grid";
import { GALLERY_STORIES, GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/gallery-data";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "All">("All");

  const filteredStories = activeCategory === "All" 
    ? GALLERY_STORIES 
    : GALLERY_STORIES.filter(story => story.category === activeCategory);

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
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveCategory("All")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
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
                "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
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
            {filteredStories.length > 0 ? (
              <MasonryGrid stories={filteredStories} />
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
