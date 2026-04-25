import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { Home, Search, ArrowRight } from "lucide-react";

// Custom 404 page — soft-404 protection. Google treats a 200-with-empty content as a
// "soft 404" and downgrades it; we want a real 404 with helpful navigation so users
// (and crawlers) can reroute to our canonical pages.
export const metadata: Metadata = {
  title: "Page Not Found | Divit MindSpace",
  description:
    "The page you're looking for isn't here — but here's what to try next. Divit MindSpace, off Sarjapur Road (Kasavanahalli), Bangalore.",
  robots: { index: false, follow: true },
};

const topSections: { label: string; href: string; hint: string }[] = [
  { label: "Our Services", href: "/services", hint: "28+ services for all ages" },
  { label: "Conditions We Support", href: "/conditions", hint: "Autism, ADHD, LD, pain & more" },
  { label: "Our Specialists", href: "/specialists", hint: "Meet the team" },
  { label: "Near Me", href: "/near-me", hint: "Locations across Bangalore" },
  { label: "All FAQs", href: "/faq", hint: "Every question answered" },
  { label: "How-To Guides", href: "/howto", hint: "Step-by-step preparation" },
  { label: "Glossary", href: "/glossary", hint: "Clinical terms explained" },
  { label: "Reviews", href: "/reviews", hint: "What families say" },
  { label: "Contact", href: "/contact-us", hint: "Phone, WhatsApp, directions" },
];

export default function NotFound() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col">
      <section className="flex-1 pt-12 pb-8 lg:pt-16 lg:pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <Image src="/divit-mindspace-logo.png" alt="Divit MindSpace" fill className="object-contain" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
              404 · Page Not Found
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-black mb-6 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              This page wandered off.
            </h1>
            <p className="text-lg text-black/70 font-medium max-w-2xl mx-auto mb-8">
              No worries — here&rsquo;s where most people were trying to get.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#7A9A7D] text-white text-sm font-semibold hover:bg-[#6b8a6e] transition-colors"
              >
                <Home className="w-4 h-4" /> Go Home
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white border border-black/10 text-sm font-semibold text-black/70 hover:border-[#7A9A7D]/40 hover:text-[#7A9A7D] transition-all"
              >
                <Search className="w-4 h-4" /> Browse Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10 lg:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-full text-black/40 text-[10px] font-bold tracking-widest uppercase mb-6">
              Popular Destinations
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topSections.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group block p-5 bg-white rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-black group-hover:text-[#7A9A7D] transition-colors">
                        {s.label}
                      </div>
                      <p className="text-sm text-black/60 mt-1">{s.hint}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-black/40 group-hover:text-[#7A9A7D] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-2 pb-12 lg:pt-6 lg:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-white rounded-[2rem] border border-black/5 shadow-xl shadow-black/[0.02] p-8 lg:p-10">
            <h2
              className="text-2xl lg:text-3xl font-serif italic text-black mb-4"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Still can&rsquo;t find what you&rsquo;re looking for?
            </h2>
            <p className="text-black/60 font-medium mb-6">
              Message us on WhatsApp — we&rsquo;re here to help.
            </p>
            <WhatsAppConsultationLink className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-[#7A9A7D] text-white font-semibold hover:bg-[#6b8a6e] transition-colors">
              Chat With Us
            </WhatsAppConsultationLink>
          </div>
        </div>
      </section>
    </div>
  );
}
