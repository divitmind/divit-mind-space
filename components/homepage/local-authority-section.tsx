"use client";

import { motion } from "motion/react";
import { MapPin, Navigation } from "lucide-react";

const locations = [
  {
    name: "Sarjapur Road",
    detail: "Located right off the main hub, near major schools and residences.",
    travel: "2 mins from main road",
  },
  {
    name: "Kasavanahalli",
    detail: "Our primary center at Aadeshwar Chambers is a quiet, sensory-friendly haven.",
    travel: "In the heart of the community",
  },
  {
    name: "HSR Layout",
    detail: "Easily accessible for families seeking specialized pediatric therapy.",
    travel: "5-8 mins away",
  },
  {
    name: "Bellandur",
    detail: "Supporting working parents with flexible clinical assessment slots.",
    travel: "10 mins away",
  },
];

export function LocalAuthoritySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest"
            >
              <MapPin className="w-3 h-3 text-[#7A9A7D]" />
              Local Authority
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-serif italic text-black leading-tight">
              In the Heart of Your Community
            </h2>
            <p className="text-lg text-black/60 font-medium leading-relaxed">
              Based in Kasavanahalli, we are Bangalore&apos;s trusted destination for families across the Sarjapur hub.
            </p>
            <div className="pt-4">
              <a 
                href="https://maps.google.com/?q=Aadeshwar+Chambers+Kasavanahalli+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="dm-pill-button dm-pill-button-primary inline-flex items-center gap-3"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((loc, idx) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[2rem] bg-[#FAF9F5] border border-black/5 hover:border-green/20 transition-all group"
              >
                <h3 className="text-xl font-bold text-black mb-3">{loc.name}</h3>
                <p className="text-sm text-black/60 font-medium mb-4 leading-relaxed">
                  {loc.detail}
                </p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A9A7D] bg-green/5 px-3 py-1 rounded-full">
                  {loc.travel}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
