import { Star } from "lucide-react";
import Image from "next/image";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import Link from "next/link";

export function HeroSection() {
  return (
      <section className="relative overflow-hidden pt-1 pb-8 lg:pt-2 lg:pb-10 min-h-[auto] lg:min-h-[calc(100vh-140px)] flex items-center">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4">

          {/* Text Content */}
          <div className="flex-[1.2] text-center lg:text-left animate-in slide-in-from-bottom duration-700 fade-in">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/50 text-purple text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple"></span>
              </span>
              ☀️ Limited Seats: Summer Explorers Camp Registration Open
            </div>

            <div className="flex flex-col w-full max-w-[580px] mx-auto lg:mx-0 mt-7">
              <h1 className="flex flex-col tracking-tight text-green leading-none">
                {/* Line 1: EMPOWERING EVERY CHILD'S with overlapping yellow strokes */}
                <span className="relative flex justify-between items-baseline w-[336px] text-[14.4px] font-bold uppercase tracking-[0.12em] mb-3 py-1 px-2">
                  {/* Multiple overlapping highlight strokes */}
                  <span className="absolute inset-0 bg-[#FFE175]/35 -z-10 rounded-sm transform -rotate-[1.5deg] scale-x-[1.08] -translate-x-0.5" />
                  <span className="absolute inset-0 bg-[#FFE175]/40 -z-10 rounded-sm transform rotate-[0.8deg] scale-x-[1.04] translate-y-px" />
                  <span className="absolute inset-0 bg-[#FFE175]/25 -z-20 rounded-sm transform -rotate-[0.5deg] scale-x-[1.06] scale-y-[1.15] -translate-y-px" />
                  <span>E</span><span>M</span><span>P</span><span>O</span><span>W</span><span>E</span><span>R</span><span>I</span><span>N</span><span>G</span>
                  <span className="ml-1.5">E</span><span>V</span><span>E</span><span>R</span><span>Y</span>
                  <span className="crossfade-word-container">
                    <span className="crossfade-words">
                      <span>CHILD'S</span>
                      <span>TEEN'S</span>
                      <span>ADULT'S</span>
                    </span>
                  </span>
                </span>
                {/* Line 2: Different (crossed out) Unique Journey */}
                <span className="flex items-baseline w-[336px] gap-3 text-[32px] font-serif italic text-purple leading-[0.9] -mt-1 font-medium">
                  <span className="relative text-[0.7em] text-gray-400/60">
                    Different
                    <span className="absolute left-[-4%] right-[-4%] top-1/2 h-[3px] bg-gray-400/70 -rotate-[3deg]" />
                  </span>
                  <span>Unique</span>
                  <span>Journey.</span>
                </span>
              </h1>
            </div>

            <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-base lg:text-lg text-green/90 leading-relaxed font-medium">
              Professional therapy and developmental support for neurodivergent children,
              teens, adults, and their families. Building confidence, focus, and essential
              life skills in a warm, expert-led environment.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <WhatsAppConsultationLink className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-green text-sm font-semibold text-white shadow-lg shadow-[#2F3E33]/15 hover:bg-[#003835] transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book a Free Consultation
              </WhatsAppConsultationLink>
              <Link
                href="/awareness-program"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-green hover:underline hover:underline-offset-4 transition-all duration-300"
              >
                Host a Free Workshop
                <span className="text-base">→</span>
              </Link>
            </div>

            {/* Rolling Proof Line */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 text-sm text-green/70 font-medium">
              <span>Conducting awareness programs at</span>
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
            <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3">
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
                  6+
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

          {/* Right Visual - Triptych Story */}
          <div className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-xl relative animate-in slide-in-from-right duration-1000 fade-in delay-200">
            {/* Offset shadow layer */}
            <div className="absolute inset-0 bg-[#E8DFD0] rounded-2xl transform rotate-2 translate-x-2 translate-y-2 opacity-60" />
            <div className="absolute inset-0 bg-[#D4C9B8] rounded-2xl transform -rotate-1 translate-x-1 translate-y-3 opacity-40" />

            <div className="relative rounded-2xl overflow-hidden shadow-lg mx-auto lg:mr-0 aspect-[5/4] max-w-[480px] lg:max-w-none border-4 border-white">
              <Image
                src="/hero-triptych.png"
                alt="Mother says 'He is finally smiling again', child playing joyfully, therapist says 'He's always had it in him'"
                className="object-cover object-[center_8%] w-full h-full scale-[1.12]"
                fill
                priority
              />
            </div>

            {/* Subtle Decorative Circle */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-green-lite/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
