"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/lib/types";

interface FaqSectionProps {
    faqs: FAQ[];
    title?: string;
    subtitle?: string;
}

export function FaqSection({ faqs, title = "Frequently Asked Questions", subtitle = "Common Queries" }: FaqSectionProps) {
    const [openId, setOpenId] = useState<number | null>(0);

    return (
        <section className="pt-4 lg:pt-6 pb-4 lg:pb-6 bg-[#FDFBF7] relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-8">

                    <div className="inline-flex items-center justify-center text-black/40 text-[10px] font-bold tracking-widest uppercase mb-4">
                        {subtitle}
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold text-black mb-6 tracking-tight font-[family-name:var(--font-cormorant)] italic">
                        {title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqs.map((faq, index) => {
                        const isOpen = openId === index;

                        return (
                            <div
                                key={index}
                                onClick={() => setOpenId(isOpen ? null : index)}
                                className={cn(
                                    "group rounded-[2rem] border transition-all duration-500 cursor-pointer overflow-hidden",
                                    isOpen
                                        ? "bg-white border-black/10 shadow-xl shadow-black/5"
                                        : "bg-white/50 border-black/5 hover:bg-white hover:border-black/10"
                                )}
                            >
                                <div className="p-8 flex items-center justify-between gap-4">
                                    <h3 className={cn(
                                        "text-lg font-bold transition-colors duration-300 font-[family-name:var(--font-cormorant)] italic leading-tight",
                                        isOpen ? "text-black" : "text-black/70"
                                    )}>
                                        {faq.question}
                                    </h3>
                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                                        isOpen ? "bg-[#7A9A7D] text-white" : "bg-black/5 text-black group-hover:bg-[#7A9A7D] group-hover:text-white"
                                    )}>
                                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                    </div>
                                </div>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-8 pb-8 pt-0 text-black/60 font-medium leading-relaxed">
                                                <p>{faq.answer}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
