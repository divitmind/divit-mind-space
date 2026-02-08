"use client";

import { useRef, MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

export function CtaSection() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section className="py-20 lg:py-32 bg-white px-4">
            <div className="max-w-6xl mx-auto">
                <div
                    className="group relative rounded-[3rem] bg-[#212925] overflow-hidden px-6 py-10 lg:px-16 lg:py-16 text-center shadow-2xl isolate"
                    onMouseMove={handleMouseMove}
                >
                    {/* subtle spotlight effect */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 transition duration-300 group-hover:opacity-100"
                        style={{
                            background: useMotionTemplate`
                radial-gradient(
                  650px circle at ${mouseX}px ${mouseY}px,
                  rgba(255, 255, 255, 0.1),
                  transparent 80%
                )
              `,
                        }}
                    />

                    {/* Static Ambient Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[800px] bg-[#2F3E33] blur-[120px] opacity-40 -z-10 pointer-events-none mix-blend-screen" />

                    <div className="relative z-10 flex flex-col items-center">

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#d8e0db] text-sm font-medium mb-4 backdrop-blur-md"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Accepting New Families
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4 tracking-tight leading-[1.1] font-serif">
                            Begin your journey <br />
                            <span className="text-white/30 italic">to clarity.</span>
                        </h2>

                        <p className="text-lg md:text-xl text-[#9CA3AF] max-w-xl mb-8 leading-relaxed font-light">
                            We are here to support your family with valid assessments and personalized therapy plans.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                            <Link
                                href="/book"
                                className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-white text-[#1a201c] font-semibold text-lg transition-opacity hover:opacity-90"
                            >
                                Book Consultation
                            </Link>

                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-14 px-8 rounded-full text-white font-medium text-lg hover:text-white/80 transition-colors"
                            >
                                Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
