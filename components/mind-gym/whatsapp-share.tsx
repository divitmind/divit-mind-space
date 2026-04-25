"use client";

import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppShareProps {
  gameName: string;
  result: string;
  slug: string;
  className?: string;
}

export function WhatsAppShare({ gameName, result, slug, className }: WhatsAppShareProps) {
  const handleShare = () => {
    const url = `https://divitmindspace.com/mind-gym/${slug}`;
    const text = `I just achieved a result of ${result} in the ${gameName} at Divit Mind Gym! 🧠✨\n\nTry to beat my score here: ${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleShare}
      className={cn(
        "flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-green/20 text-green font-bold text-xs uppercase tracking-widest hover:bg-green hover:text-white transition-all duration-300",
        className
      )}
    >
      <Share2 className="w-4 h-4" />
      Share on WhatsApp
    </button>
  );
}
