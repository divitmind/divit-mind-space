"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import type { GalleryItem } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

interface ImageModalProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageModal({ items, currentIndex, onClose, onNavigate }: ImageModalProps) {
  const currentItem = items[currentIndex];

  const handlePrevious = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleWhatsAppShare = () => {
    const text = `Check out this moment from Divit MindSpace: "${currentItem.title}" - ${currentItem.story} \n\nSee more at: https://divitmindspace.com/gallery`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handlePrevious, handleNext]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-green/95 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[92vh] md:max-h-[85vh] isolate"
      >
        {/* Close Button - High Contrast for visibility */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[130] p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all border border-white/20 shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Side */}
        <div className="relative h-[45%] md:h-auto md:flex-1 bg-black/5 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative w-full h-full p-4"
            >
              <Image
                src={urlFor(currentItem.image).width(1600).auto('format').url()}
                alt={currentItem.image.alt || currentItem.title || "Gallery Image"}
                fill
                className="object-contain p-2 md:p-4"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls Overlay */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/20 z-10"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/20 z-10"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Content Side */}
        <div className="flex-1 md:w-[400px] md:flex-none bg-[#FDFBF7] flex flex-col h-[55%] md:h-auto overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
            <div className="flex flex-wrap gap-2 mb-4 md:mb-8">
              <span className="px-3 py-1 bg-green/10 text-green text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                {currentItem.categories?.[0]}
              </span>
              {currentItem.locationEvent && (
                <span className="px-3 py-1 bg-green/5 text-green/60 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-green/10">
                  {currentItem.locationEvent}
                </span>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-green mb-3 md:mb-4 font-[family-name:var(--font-cormorant)] italic leading-tight">
                  {currentItem.title}
                </h2>
                <div className="w-10 h-1 bg-yellow-400 mb-4 md:mb-6" />
                <p className="text-green/80 text-base md:text-lg leading-relaxed font-medium">
                  {currentItem.story}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Optimized Footer - Centered and Clean */}
          <div className="shrink-0 p-5 md:p-8 bg-[#FDFBF7] border-t border-green/5">
            <button 
                onClick={handleWhatsAppShare}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-full bg-[#7A9A7D] text-white text-sm font-bold shadow-lg shadow-[#7A9A7D]/20 hover:bg-[#6a8a6d] transition-all group"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              SHARE VIA WHATSAPP
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
