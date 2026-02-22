import { Quote } from "lucide-react";
import Image from "next/image";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Text Content */}
          <div className="flex-1 space-y-6 text-center lg:text-left animate-in slide-in-from-bottom duration-700 fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-green leading-[1.10]">
              Understanding unique minds, supporting<br />
              <span className="text-purple">
                brighter futures.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto lg:mx-0 text-lg text-green leading-relaxed">
              At Divit MindSpace, we bridge the gap between healthcare and education.
              Our team provides diagnostic assessments and personalized training
              to help adults and families thrive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Button
                asChild
                className="h-12 rounded-xl bg-green px-8 text-base font-medium text-white shadow-lg shadow-[#2F3E33]/10 hover:bg-[#2F3E33]/90 hover:shadow-[#7C9082]/20 transition-all duration-300"
              >
                <WhatsAppConsultationLink>
                  Book a Consultation
                </WhatsAppConsultationLink>
              </Button>
              <Link href="/about-us">
                <Button variant="outline" className="h-12 rounded-xl border-green bg-transparent px-8 text-base font-medium text-[#2F3E33] hover:bg-[#2F3E33]/5">
                  Learn about our approach
                </Button>
              </Link>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#FDFBF7] bg-gray-200 overflow-hidden relative">
                    <Image
                      src={`https://i.pravatar.cc/100?img=${i + 20}`}
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 pl-2 border-[#FDFBF7] bg-[#E8ECE9] flex items-center justify-center text-[#2F3E33] text-xs font-semibold">50k+</div>
              </div>
              <p>Families trust us for <span className="font-semibold text-[#2F3E33]">comprehensive care.</span></p>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none relative animate-in slide-in-from-right duration-1000 fade-in delay-200">
            {/* Main Image Frame - Clean, less rotation */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/hero_background.png"
                alt="Inclusive therapy session"
                className="object-cover w-full aspect-4/3"
                width={800}
                height={600}
                priority
              />
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/50 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <Quote className="h-6 w-6 text-[#E8ECE9] mb-2 fill-current opacity-90" />
                <p className="font-medium text-base leading-snug">&quot;We finally found a place that listens and understands.&quot;</p>
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
