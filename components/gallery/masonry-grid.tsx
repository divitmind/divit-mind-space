"use client";

import { useState } from "react";
import Image from "next/image";
import { type GalleryStory } from "@/lib/gallery-data";
import { ImageModal } from "./image-modal";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MasonryGridProps {
  stories: GalleryStory[];
}

export function MasonryGrid({ stories }: MasonryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  return (
    <>
      {/* Grid with uniform heights (aspect-ratio based) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => {
          return (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "cursor-pointer group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-green/5"
              )}
              onClick={() => openModal(index)}
            >
              {/* Fixed Aspect Ratio for Uniform Height */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={story.src}
                  alt={story.title}
                  fill
                  className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                  priority={story.isFeatured}
                />
                
                {/* Visible Tag Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-green text-[9px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                    {story.tag || "Empowerment"}
                  </span>
                </div>

                {/* Subtle overlay that appears on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-green/90 via-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {story.category}
                  </span>
                  <h3 className="text-white font-semibold text-lg leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    {story.title}
                  </h3>
                  <p className="text-white/80 text-xs mt-2 line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                    {story.story}
                  </p>
                </div>
              </div>

              {/* Mobile-only visible caption (soft and subtle) */}
              <div className="p-4 lg:hidden bg-white border-t border-green/5">
                <span className="text-[9px] font-bold text-green/40 uppercase tracking-widest">
                  {story.category}
                </span>
                <h3 className="text-green font-medium text-sm mt-0.5">
                  {story.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedIndex !== null && (
        <ImageModal
          stories={stories}
          currentIndex={selectedIndex}
          onClose={closeModal}
          onNavigate={setSelectedIndex}
        />
      )}
    </>
  );
}
