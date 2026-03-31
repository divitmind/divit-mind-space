"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
    id: string;
    question: string;
    answer: string | string[];
}

const faqs: FaqItem[] = [
    {
        id: "item-1",
        question: "Do I need a diagnosis or referral before booking?",
        answer: "No referral or prior diagnosis is needed. You can book directly with us. If you have any existing reports from schools or doctors, bring them along—but they're not required to get started.",
    },
    {
        id: "item-2",
        question: "My child is very young. Is it too early to seek help?",
        answer: "Early intervention is one of the most effective ways to support development. If you have concerns, it's never too early to consult. We work with children as young as 18 months.",
    },
    {
        id: "item-3",
        question: "How soon will I see progress with therapy?",
        answer: "Every child is different. Some families notice changes within weeks, while others see gradual progress over months. We set realistic milestones together and keep you informed throughout the journey.",
    },
    {
        id: "item-4",
        question: "What if my child doesn't cooperate during sessions?",
        answer: "This is completely normal and expected. Our therapists are trained to work with children at their own pace. We use play-based and child-led approaches to build trust before diving into structured activities.",
    },
];

function renderAnswer(answer: FaqItem["answer"]) {
    if (typeof answer === "string") {
        return <p>{answer}</p>;
    }
    return (
        <div className="space-y-2">
            {answer.map((line, i) => {
                if (line === "") {
                    return <div key={i} className="h-2" aria-hidden />;
                }
                if (line.startsWith("• ")) {
                    return (
                        <div key={i} className="flex gap-2">
                            <span className="text-black shrink-0 font-medium">•</span>
                            <span>{line.slice(2)}</span>
                        </div>
                    );
                }
                if (line.endsWith(":") && line.length < 80) {
                    return (
                        <h4
                            key={i}
                            className="font-bold text-black mt-4 mb-1 first:mt-0 text-base font-[family-name:var(--font-cormorant)] italic"
                        >
                            {line}
                        </h4>
                    );
                }
                return <p key={i}>{line}</p>;
            })}
        </div>
    );
}

export function FaqSection() {
    const [openId, setOpenId] = useState<string | null>("item-1");

    return (
        <section className="py-6 lg:py-12 bg-[#FDFBF7] relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-8">
                    {/* Original Text Wording */}
                    <div className="inline-flex items-center justify-center text-black/40 text-[10px] font-bold tracking-widest uppercase mb-4">
                        Common Queries
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold text-black mb-6 tracking-tight font-[family-name:var(--font-cormorant)] italic">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqs.map((faq) => {
                        const isOpen = openId === faq.id;

                        return (
                            <div
                                key={faq.id}
                                onClick={() => setOpenId(isOpen ? null : faq.id)}
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
                                                {renderAnswer(faq.answer)}
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
