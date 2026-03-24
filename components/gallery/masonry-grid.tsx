"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ImageModal } from "./image-modal";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

interface MasonryGridProps {
  items: GalleryItem[];
}

export function MasonryGrid({ items }: MasonryGridProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {items.map((item, index) => {
          // Logic for aspect ratio variety while staying "Structured"
          // Featured = Wider on desktop
          // Others = 4:3 or 3:2 depending on index
          const isPortrait = index % 3 === 0; // Every 3rd image is slightly taller for masonry interest
          
          return (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group bg-white border border-green/5 shadow-sm hover:shadow-xl transition-all duration-500",
                item.isFeatured && "sm:col-span-2"
              )}
              onClick={() => setSelectedImageIndex(index)}
            >
              <div className="relative w-full overflow-hidden bg-green-lite/5">
                <Image
                  src={urlFor(item.image).width(800).fit('max').auto('format').url()}
                  alt={item.image.alt || item.title || "Gallery Image"}
                  width={800}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Content Overlay - Always visible, now with Location */}
                <div className="absolute inset-0 bg-gradient-to-t from-green/90 via-green/10 to-transparent flex flex-col justify-end p-5 md:p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="inline-block px-2 py-0.5 bg-yellow-400 text-green text-[8px] md:text-[9px] font-bold uppercase tracking-widest rounded-sm">
                        {item.tag || item.categories?.[0] || "Moment"}
                      </span>
                      {item.locationEvent && (
                        <span className="inline-block px-2 py-0.5 bg-white/20 text-white text-[8px] md:text-[9px] font-bold uppercase tracking-widest rounded-sm backdrop-blur-sm">
                          {item.locationEvent}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white text-lg md:text-xl font-bold font-[family-name:var(--font-cormorant)] italic leading-tight group-hover:text-yellow-100 transition-colors">
                      {item.title}
                    </h3>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedImageIndex !== null && (
        <ImageModal
          items={items}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNavigate={(index) => setSelectedImageIndex(index)}
        />
      )}
    </>
  );
}
