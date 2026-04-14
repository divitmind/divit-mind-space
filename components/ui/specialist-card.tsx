"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { Specialist } from "@/sanity/types";
import { PortableText } from "next-sanity";

function SpecialistImagePlaceholder() {
  return (
    <div className="w-full aspect-square rounded-[2rem] flex flex-col items-center justify-center text-center px-4 bg-black/5">
      <div className="w-14 h-14 rounded-full bg-black/10 flex items-center justify-center text-black/30 shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      <p className="mt-3 text-[10px] text-black/40 font-bold uppercase tracking-widest">No Image</p>
    </div>
  );
}

interface SpecialistCardProps {
  specialist: Specialist;
  variant?: "full" | "compact";
}

export function SpecialistCard({ specialist, variant = "full" }: SpecialistCardProps) {
  const hasFullBio = specialist.fullBio && specialist.fullBio.length > 0;

  if (variant === "compact") {
    return (
      <article className="group bg-[#FAF9F5] rounded-2xl p-6 border border-green/10 hover:border-green/20 transition-all">
        <div className="flex gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
            {specialist.image?.asset?.url ? (
              <Image
                src={specialist.image.asset.url}
                alt={specialist.image.alt || specialist.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-black/5 flex items-center justify-center">
                <svg className="w-6 h-6 text-black/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-lg text-green leading-tight">{specialist.name}</h3>
            <p className="text-xs text-green/60 font-bold uppercase tracking-wider mb-2">{specialist.title}</p>
            <p className="text-sm text-black/70 line-clamp-2 mb-3">{specialist.teaser}</p>
            <div className="flex items-center gap-3">
              {specialist.experience && (
                <p className="text-[10px] text-green/40 font-bold uppercase tracking-widest">
                  {specialist.experience} Experience
                </p>
              )}
              {hasFullBio && (
                <Dialog>
                  <DialogTrigger
                    className={cn(
                      "inline-flex items-center gap-1",
                      "text-purple/60 font-bold text-[10px] uppercase tracking-widest",
                      "hover:text-purple transition-all"
                    )}
                  >
                    Full Profile
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-[640px] max-h-[85vh] overflow-hidden flex flex-col rounded-[2rem] bg-[#FDFBF7] border-black/10 shadow-3xl"
                    showCloseButton
                  >
                    <DialogHeader className="mb-6">
                      <DialogTitle className="text-3xl font-serif italic text-black pr-8">
                        {specialist.name}
                      </DialogTitle>
                      <p className="text-[10px] text-black/40 uppercase tracking-widest font-bold mt-2">
                        {specialist.title}
                      </p>
                    </DialogHeader>
                    <div className="overflow-y-auto flex-1 -mx-4 px-4 py-2 space-y-6 text-black/70 text-sm leading-relaxed font-medium prose prose-sm prose-green max-w-none scrollbar-thin scrollbar-thumb-black/10">
                      <PortableText value={specialist.fullBio} />
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Full variant (default) - used in about-us page
  return (
    <article className="flex flex-col h-full group">
      {/* Image */}
      <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shrink-0 border border-black/5 shadow-xl group-hover:shadow-2xl transition-all duration-500">
        {specialist.image?.asset?.url ? (
          <Image
            src={specialist.image.asset.url}
            alt={specialist.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <SpecialistImagePlaceholder />
        )}
        {/* Experience Badge */}
        {specialist.experience && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-black/5">
            <span className="text-[10px] font-bold text-green uppercase tracking-widest">{specialist.experience} Exp</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 py-6 px-2">
        <h3 className="text-2xl font-serif italic text-black tracking-tight leading-tight mb-2">
          {specialist.name}
        </h3>
        <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-4">
          {specialist.title}
        </p>

        {/* Specialty Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {specialist.specialties?.slice(0, 3).map((specialty) => (
            <span
              key={specialty}
              className="inline-flex px-2.5 py-1 rounded-full bg-purple/5 text-[9px] font-bold text-purple uppercase tracking-wider border border-purple/10"
            >
              {specialty}
            </span>
          ))}
        </div>

        <p className="text-sm text-black/70 font-medium leading-relaxed line-clamp-3 mb-6">
          {specialist.teaser}
        </p>

        <div className="mt-auto flex items-center gap-4">
          {hasFullBio && (
            <Dialog>
              <DialogTrigger
                className={cn(
                  "inline-flex items-center gap-2",
                  "text-black/40 font-bold text-[10px] uppercase tracking-widest",
                  "underline underline-offset-4 decoration-2 decoration-black/10",
                  "hover:decoration-purple hover:text-purple transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 rounded"
                )}
              >
                Full Profile
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[640px] max-h-[85vh] overflow-hidden flex flex-col rounded-[2rem] bg-[#FDFBF7] border-black/10 shadow-3xl"
                showCloseButton
              >
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-3xl font-serif italic text-black pr-8">
                    {specialist.name}
                  </DialogTitle>
                  <p className="text-[10px] text-black/40 uppercase tracking-widest font-bold mt-2">
                    {specialist.title}
                  </p>
                </DialogHeader>
                <div className="overflow-y-auto flex-1 -mx-4 px-4 py-2 space-y-6 text-black/70 text-sm leading-relaxed font-medium prose prose-sm prose-green max-w-none scrollbar-thin scrollbar-thumb-black/10">
                  <PortableText value={specialist.fullBio} />
                </div>
              </DialogContent>
            </Dialog>
          )}

          <WhatsAppConsultationLink
            className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-green/20 px-4 text-[10px] font-bold text-green uppercase tracking-widest hover:bg-green hover:text-white transition-all duration-300"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contact
          </WhatsAppConsultationLink>
        </div>
      </div>
    </article>
  );
}
