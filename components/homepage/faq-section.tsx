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
                            <span className="text-green shrink-0 font-medium">•</span>
                            <span>{line.slice(2)}</span>
                        </div>
                    );
                }
                if (line.endsWith(":") && line.length < 80) {
                    return (
                        <h4
                            key={i}
                            className="font-semibold text-[#2F3E33] mt-4 mb-1 first:mt-0 text-base"
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
        <section className="pt-6 pb-16 lg:pt-8 lg:pb-24 bg-cream relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center text-purple text-sm font-bold tracking-widest uppercase mb-3">
                        Common Queries
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold text-green mb-4 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq) => {
                        const isOpen = openId === faq.id;

                        return (
                            <div
                                key={faq.id}
                                onClick={() => setOpenId(isOpen ? null : faq.id)}
                                className={cn(
                                    "group rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden",
                                    isOpen
                                        ? "bg-[#FDFBF7] border-[#2F3E33]/20 shadow-sm"
                                        : "bg-white border-transparent hover:bg-gray-50"
                                )}
                            >
                                <div className="p-6 flex items-center justify-between gap-4">
                                    <h3 className={cn(
                                        "text-lg font-bold transition-colors duration-300",
                                        isOpen ? "text-[#2F3E33]" : "text-[#222222]"
                                    )}>
                                        {faq.question}
                                    </h3>
                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                                        isOpen ? "bg-green text-white rotate-180" : "bg-[#E8ECE9] text-green group-hover:bg-[#dce2de]"
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
                                            <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed">
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

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#E8ECE9]/50 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FDFBF7] rounded-full blur-3xl -z-10" />

        </section>
    );
}
