"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

export function CtaSection() {
    return (
        <section className="py-20 bg-[#FDFBF7] md:px-0 px-4">
            <div className="max-w-6xl mx-auto">
                <div
                    className="relative rounded-[3rem] overflow-hidden px-6 py-10 lg:px-16 lg:py-16 text-left bg-green"
                >
                    <div className="absolute top-0 right-0 z-0 w-[90%] h-full">
                        <Image
                            src="/banner-png.png"
                            alt=""
                            fill
                            priority
                            className="object-cover object-right"
                            draggable={false}
                        />
                    </div>
                    <div className="relative z-10 flex flex-col items-start">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight"
                        >
                            Ready for <br />
                            what&apos;s next?
                        </motion.h2>

                        <Link
                            href="https://wa.me/919902351393"
                            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#e8e4db] text-[#1a201c] font-semibold text-lg transition-opacity hover:opacity-90"
                        >
                            Let&apos;s talk
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}