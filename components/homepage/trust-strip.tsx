"use client";

import { motion } from "motion/react";

export function TrustStrip() {
  return (
    <section className="bg-white border-y border-gray-100 py-6 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-shrink-0 text-center md:text-left">
            <h3 className="text-sm font-bold text-green tracking-tight">
              Empowering educators to build<br className="hidden md:block" />
              <span className="text-purple">truly inclusive classrooms.</span>
            </h3>
          </div>
          
          <div className="flex-1 w-full overflow-hidden relative">
            {/* Gradient masks for smooth fading on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 hidden md:block"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 hidden md:block"></div>
            
            <div className="flex items-center gap-8 md:gap-12 animate-marquee whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Trusted By:</span>
              <span className="text-base font-bold text-green/80">TISB</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green/20"></span>
              <span className="text-base font-bold text-green/80">Jyoti Nivas College</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green/20"></span>
              <span className="text-base font-bold text-green/80">Pre-Schools</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green/20"></span>
              <span className="text-base font-bold text-green/80">Community Centers</span>
              
              {/* Duplicate for infinite marquee effect if needed, or just static list */}
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest ml-8 hidden lg:inline">Trusted By:</span>
              <span className="text-base font-bold text-green/80 hidden lg:inline">TISB</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green/20 hidden lg:inline"></span>
              <span className="text-base font-bold text-green/80 hidden lg:inline">Jyoti Nivas College</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        }
      `}</style>
    </section>
  );
}
