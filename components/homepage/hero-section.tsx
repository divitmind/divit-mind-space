import { Quote, Star } from "lucide-react";
import Image from "next/image";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-6 pb-8 lg:pt-10 lg:pb-10 min-h-[auto] lg:min-h-[calc(100vh-140px)] flex items-center">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* Text Content */}
          <div className="flex-1 space-y-4 text-center lg:text-left animate-in slide-in-from-bottom duration-700 fade-in">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/50 text-purple text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple"></span>
              </span>
              ☀️ Limited Seats: Summer Explorers Camp Registration Open
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-green leading-[1.05]">
              Understanding exceptional minds, supporting<br />
              <span className="text-purple">
                brighter futures.
              </span>
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-base lg:text-lg text-green/90 leading-relaxed font-medium">
              At Divit MindSpace, we bridge the gap between healthcare and education.
              Our team provides diagnostic assessments and personalized training
              to help adults and families thrive.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-1">
              <Button
                asChild
                className="h-11 rounded-xl bg-green px-6 text-sm font-medium text-white shadow-lg shadow-[#2F3E33]/10 hover:bg-[#2F3E33]/90 hover:shadow-[#7C9082]/20 transition-all duration-300"
              >
                <WhatsAppConsultationLink>
                  Book a Free Consultation
                </WhatsAppConsultationLink>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-xl px-6 text-sm font-bold text-green border-green/20 bg-white hover:bg-green/5 hover:border-green/30 transition-all duration-300 shadow-sm"
              >
                <Link href="/awareness-program">
                  Host a Free Workshop
                </Link>
              </Button>
            </div>

            {/* Rolling Proof Line */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 text-sm text-green/70 font-medium">
              <span>Conducting awareness workshops at</span>
              <div className="h-6 overflow-hidden relative w-48 text-center sm:text-left">
                <div className="animate-rolling-text flex flex-col text-purple font-bold">
                  <span className="h-6">TISB</span>
                  <span className="h-6">Jyoti Nivas College</span>
                  <span className="h-6">Leading Pre-Schools</span>
                  <span className="h-6">Community Centers</span>
                  <span className="h-6">TISB</span> {/* Duplicate for loop */}
                </div>
              </div>
            </div>

            {/* Trust Metrics */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xl lg:text-2xl font-bold text-green">
                  100+
                </span>
                <span className="text-[10px] font-bold text-green/60 uppercase tracking-widest">
                  Families Served
                </span>
              </div>
              <div className="w-px h-6 bg-green/10 hidden sm:block" />
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xl lg:text-2xl font-bold text-green">
                  15+
                </span>
                <span className="text-[10px] font-bold text-green/60 uppercase tracking-widest">
                  Expert Therapists
                </span>
              </div>
              <div className="w-px h-6 bg-green/10 hidden sm:block" />
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1">
                  <span className="text-xl lg:text-2xl font-bold text-green">
                    4.9/5
                  </span>
                  <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <span className="text-[10px] font-bold text-green/60 uppercase tracking-widest">
                  Parent Rating
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative animate-in slide-in-from-right duration-1000 fade-in delay-200">
            {/* Main Image Frame - Clean, less rotation */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-white max-w-lg mx-auto lg:ml-auto">
              <Image
                src="/hero_background.png"
                alt="Inclusive therapy session"
                className="object-cover w-full aspect-4/3"
                width={700}
                height={525}
                priority
              />
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/50 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <Quote className="h-6 w-6 text-[#E8ECE9] mb-2 fill-current opacity-90" />
                <p className="font-medium text-base leading-snug">
                  &quot;We finally found a place that listens and
                  understands.&quot;
                </p>
              </div>
            </div>

            {/* Subtle Decorative Circle */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-green-lite/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
