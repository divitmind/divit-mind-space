"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ImageModal } from "./image-modal";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/sanity/types";

interface MasonryGridProps {
  items: GalleryItem[];
}

export function MasonryGrid({ items }: MasonryGridProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {items.map((item, index) => (
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
            <div className="relative w-full aspect-auto overflow-hidden">
              <Image
                src={item.image.asset.url}
                alt={item.image.alt || item.title}
                width={600}
                height={800}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-green/80 via-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] mb-2">
                  {item.categories?.[0]}
                </span>
                <h3 className="text-white text-xl font-bold font-[family-name:var(--font-cormorant)] italic leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
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
