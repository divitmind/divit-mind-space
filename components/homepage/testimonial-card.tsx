"use client";

import { useState, useRef, useEffect } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  initial: string;
  className?: string;
}

function GoogleBadge() {
  return (
    <div title="Verified Review" className="opacity-40 group-hover:opacity-100 transition-opacity">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        <path fill="none" d="M0 0h48v48H0z" />
      </svg>
    </div>
  );
}

function StarsRow() {
  return (
    <div className="flex gap-0.5 mb-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="h-3 w-3 fill-[#FFB800] text-[#FFB800]" />
      ))}
    </div>
  );
}

export function TestimonialCard({ name, role, quote, initial, className }: TestimonialCardProps) {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    setIsTruncated(el.scrollHeight > el.clientHeight);
  }, [quote]);

  return (
    <>
      <div
        className={cn(
          "relative w-[min(300px,calc(100vw-2rem))] sm:w-[380px] shrink-0 rounded-[1.5rem] lg:rounded-[2rem] bg-white p-6 lg:p-8 shadow-sm hover:shadow-xl hover:shadow-green/5 transition-all duration-500 border border-black/5 group",
          className
        )}
      >
        {/* Google Verified Badge (SVG) */}
        <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
          <GoogleBadge />
        </div>

        <StarsRow />

        <div className="mb-6">
          <p
            ref={quoteRef}
            className="text-black/60 leading-relaxed max-h-[100px] overflow-hidden font-medium text-sm italic"
          >
            {quote.replace(/^["'“”‘’\s]+|["'“”‘’\s]+$/g, '')}
          </p>
          {isTruncated && (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className={cn(
                "mt-4 inline-flex items-center gap-2",
                "text-green font-bold text-[10px] uppercase tracking-[0.2em]",
                "hover:gap-3 transition-all cursor-pointer"
              )}
            >
              Read Full Story
              <span className="text-lg leading-none">→</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-black/5">
          <div className="h-12 w-12 rounded-full bg-green/5 text-green flex items-center justify-center font-serif italic text-xl border border-green/10">
            {initial}
          </div>
          <div>
            <h4 className="font-bold text-black text-[10px] lg:text-xs uppercase tracking-widest">{name}</h4>
            <p className="text-[9px] lg:text-[10px] text-black/40 font-bold uppercase tracking-widest mt-0.5">{role}</p>
          </div>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className="max-w-[calc(100vw-2rem)] sm:max-w-[560px] max-h-[85vh] overflow-hidden flex flex-col rounded-[3rem] bg-[#FDFBF7] border-black/5 p-12 shadow-2xl"
          showCloseButton
        >
          <div className="flex justify-start items-center gap-3 mb-6">
            <GoogleBadge />
            <span className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em]">Verified Parent Story</span>
          </div>
          <DialogHeader>
            <DialogTitle className="sr-only">
              Full story from {name}
            </DialogTitle>
          </DialogHeader>
          <StarsRow />
          <div className="overflow-y-auto flex-1 -mx-2 px-2 py-4">
            <p className="text-black/60 leading-relaxed text-base italic font-medium">
              {quote.replace(/^["'“”‘’\s]+|["'“”‘’\s]+$/g, '')}
            </p>
          </div>
          <div className="flex items-center gap-5 pt-8 mt-4 border-t border-black/5">
            <div className="h-14 w-14 rounded-full bg-green/5 text-green flex items-center justify-center font-serif italic text-2xl border border-green/10">
              {initial}
            </div>
            <div>
              <h4 className="font-bold text-black text-sm uppercase tracking-[0.2em]">{name}</h4>
              <p className="text-[10px] text-black/40 font-bold uppercase tracking-[0.3em] mt-1">{role}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
