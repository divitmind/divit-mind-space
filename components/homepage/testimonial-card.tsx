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
    <div title="Verified Review">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
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
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" />
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
          "relative w-[min(350px,calc(100vw-2rem))] sm:w-[400px] shrink-0 rounded-2xl bg-white/90 backdrop-blur-sm p-8 shadow-premium-sm hover:shadow-premium transition-all duration-500 border border-[#E8ECE9] hover:border-[#D8DCD9] hover:-translate-y-1",
          className
        )}
      >
        {/* Google Verified Badge (SVG) */}
        <div className="absolute top-8 right-8">
          <GoogleBadge />
        </div>

        <StarsRow />

        <div className="mb-4">
          <p
            ref={quoteRef}
            className="text-gray-600 leading-relaxed max-h-[100px] overflow-hidden"
          >
            &quot;{quote}&quot;
          </p>
          {isTruncated && (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className={cn(
                "mt-2 inline-flex gap-2 self-start",
                "text-[#2F3E33] font-medium text-sm",
                "underline underline-offset-4 decoration-2 decoration-[#2F3E33]/40",
                "hover:decoration-[#2F3E33] transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F3E33] focus-visible:ring-offset-2 rounded"
              )}
            >
              Read more
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-[#E8ECE9] text-[#2F3E33] flex items-center justify-center font-bold text-lg">
            {initial}
          </div>
          <div>
            <h4 className="font-bold text-[#222222] text-sm">{name}</h4>
            <p className="text-xs text-gray-500 font-medium">{role}</p>
          </div>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className="max-w-[calc(100vw-2rem)] sm:max-w-[560px] max-h-[85vh] overflow-hidden flex flex-col rounded-3xl bg-[#FDFBF7] border-[#2F3E33]/10"
          showCloseButton
        >
          <div className="flex justify-start items-center gap-2">
            <GoogleBadge />
            <span className="text-sm text-gray-500 font-medium">Verified review</span>
          </div>
          <DialogHeader>
            <DialogTitle className="sr-only">
              Full review from {name}
            </DialogTitle>
          </DialogHeader>
          <StarsRow />
          <div className="overflow-y-auto flex-1 -mx-1 px-1 py-2">
            <p className="text-gray-600 leading-relaxed text-sm">
              &quot;{quote}&quot;
            </p>
          </div>
          <div className="flex items-center gap-4 pt-4 border-t border-[#E8ECE9]">
            <div className="h-10 w-10 rounded-full bg-[#E8ECE9] text-[#2F3E33] flex items-center justify-center font-bold text-lg">
              {initial}
            </div>
            <div>
              <h4 className="font-bold text-[#222222] text-sm">{name}</h4>
              <p className="text-xs text-gray-500 font-medium">{role}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
