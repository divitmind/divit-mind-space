"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Info, Volume2, VolumeX } from "lucide-react";
import { PortableText } from "next-sanity";
import { portableTextComponents } from "@/components/portable-text-components";

interface GameInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  science: any; // PortableText or string
  tips: string[];
}

export function GameInfoModal({ isOpen, onClose, title, science, tips }: GameInfoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-black/5 flex justify-between items-center bg-[#FAF9F5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-purple" />
                </div>
                <h2 className="text-xl font-serif text-green" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                  About {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-black/40" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-green mb-4">
                  The Science Behind It
                </h3>
                <div className="text-sm text-black/70 leading-relaxed font-medium">
                  {typeof science === "string" ? (
                    <p>{science}</p>
                  ) : (
                    <PortableText value={science} components={portableTextComponents} />
                  )}
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple mb-4">
                  Quick Tips for Flow
                </h3>
                <ul className="space-y-4">
                  {tips.map((tip, i) => (
                    <li key={i} className="flex gap-4 items-start text-sm text-black/70 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple/30 mt-1.5 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="pt-6 border-t border-black/5">
                <div className="p-6 bg-green/5 rounded-[2rem] border border-green/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-green">Focus Sounds</h4>
                    <p className="text-[10px] text-green/60 font-medium uppercase tracking-widest">Ambient Audio</p>
                  </div>
                  <button className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-black/5 flex items-center justify-center text-green/40 hover:text-green transition-all">
                    <VolumeX className="w-5 h-5" />
                  </button>
                </div>
              </section>
            </div>

            <div className="p-6 bg-[#FAF9F5] border-t border-black/5">
              <button
                onClick={onClose}
                className="dm-pill-button dm-pill-button-primary w-full text-xs py-4"
              >
                Return to Game
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
