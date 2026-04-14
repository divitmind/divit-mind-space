"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { User } from "lucide-react";

interface Specialist {
  _id: string;
  name: string;
  slug: { current: string };
  title: string;
  image: {
    asset: { url: string };
    alt?: string;
  };
  experience?: string;
  specialties?: string[];
  teaser: string;
}

interface ServiceExpertsProps {
  specialists: Specialist[];
  onDemand?: boolean;
}

export function ServiceExperts({ specialists, onDemand }: ServiceExpertsProps) {
  const showLeadership = onDemand || specialists.length === 0;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl lg:text-3xl font-serif text-green mb-8"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          >
            {showLeadership ? "Clinical Leadership & Oversight" : "Meet the Specialists"}
          </h2>

          {showLeadership ? (
            <div className="bg-[#FAF9F5] rounded-2xl p-8 border border-green/10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 rounded-full bg-green/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-12 h-12 text-green/40" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-green mb-2">Guided by Professional Excellence</h3>
                  <p className="text-black/70 leading-relaxed font-medium">
                    This service is overseen by our Senior Clinical Team and delivered by specialized consultants on-demand to ensure the highest standards of care and clinical integrity.
                  </p>
                  <Link 
                    href="/about-us" 
                    className="inline-flex items-center gap-2 mt-4 text-sm font-bold uppercase tracking-widest text-green hover:text-green/80 transition-colors"
                  >
                    Meet our leadership team
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specialists.map((specialist, index) => (
                <motion.div
                  key={specialist._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-[#FAF9F5] rounded-2xl p-6 border border-green/10 hover:border-green/20 transition-all"
                >
                  <div className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                      <Image
                        src={specialist.image.asset.url}
                        alt={specialist.image.alt || specialist.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-green leading-tight">{specialist.name}</h3>
                      <p className="text-xs text-green/60 font-bold uppercase tracking-wider mb-2">{specialist.title}</p>
                      <p className="text-sm text-black/70 line-clamp-2 mb-3">{specialist.teaser}</p>
                      {specialist.experience && (
                        <p className="text-[10px] text-green/40 font-bold uppercase tracking-widest">
                          {specialist.experience} Experience
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
