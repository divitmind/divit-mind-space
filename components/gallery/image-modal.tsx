"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { type GalleryStory } from "@/lib/gallery-data";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

interface ImageModalProps {
  stories: GalleryStory[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageModal({ stories, currentIndex, onClose, onNavigate }: ImageModalProps) {
  const currentStory = stories[currentIndex];

  const handlePrevious = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    onNavigate((currentIndex - 1 + stories.length) % stories.length);
  }, [currentIndex, stories.length, onNavigate]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    onNavigate((currentIndex + 1) % stories.length);
  }, [currentIndex, stories.length, onNavigate]);

  const handleWhatsAppShare = () => {
    const text = `Check out this moment from Divit MindSpace: "${currentStory.title}" - ${currentStory.story} \n\nSee more at: https://divitmindspace.com/gallery`;
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
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
        className="relative w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Image Side */}
        <div className="relative flex-1 bg-black/5 flex items-center justify-center min-h-[300px] md:min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative w-full h-full p-4"
            >
              <Image
                src={currentStory.src}
                alt={currentStory.title}
                fill
                className="object-contain p-4"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls Overlay */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/20 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/20 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-[400px] bg-[#FDFBF7] p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-8">
              <span className="px-3 py-1 bg-green/10 text-green text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                {currentStory.category}
              </span>
              <button
                onClick={onClose}
                className="p-2 -mt-2 -mr-2 text-green/40 hover:text-green transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h2 className="text-3xl font-bold text-green mb-4 font-[family-name:var(--font-cormorant)] italic leading-tight">
                  {currentStory.title}
                </h2>
                <div className="w-12 h-1 bg-yellow-400 mb-6" />
                <p className="text-green/80 text-lg leading-relaxed font-medium">
                  {currentStory.story}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-green/5 pt-6">
            <span className="text-xs text-green/40 font-semibold tracking-widest">
              DIVIT MINDSPACE
            </span>
            <button 
                onClick={handleWhatsAppShare}
                className="flex items-center gap-2 text-xs font-bold text-green hover:text-[#25D366] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              SHARE VIA WHATSAPP
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
