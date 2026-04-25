"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { Users, Brain } from "lucide-react";
import { useAccessibility } from "./accessibility-context";

export function SiteHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const { isNeuroFriendly, toggleNeuroFriendly } = useAccessibility();

    const handleSpecialistsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === "/about-us") {
            e.preventDefault();
            const element = document.getElementById("specialists");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-2xl border-b border-black/5">
            <div className="container mx-auto px-4 md:px-6 lg:px-2 flex h-16 md:h-20 items-center justify-between gap-1.5 lg:gap-2">
                <Link href="/" onClick={handleLogoClick} className="flex items-center gap-3 active:scale-95 group">
                    <div className="relative w-12 lg:w-14 h-12 lg:h-14 transition-transform duration-500 ease-in-out group-hover:scale-[1.2]">
                        <Image 
                            src="/divit-mindspace-logo.png" 
                            alt="Divit MindSpace Logo" 
                            fill
                            className="object-contain" 
                            sizes="(max-width: 768px) 48px, 56px"
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden xl:block">
                    <MainNav />
                </div>

                <div className="flex items-center gap-4">
                    {/* Sensory Mode Toggle */}
                    <button
                        onClick={toggleNeuroFriendly}
                        className={`hidden xl:flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-[9px] font-bold uppercase tracking-widest ${
                            isNeuroFriendly 
                                ? "bg-black text-white border-black" 
                                : "bg-transparent text-black/40 border-black/5 hover:border-green/20 hover:text-green"
                        }`}
                        title={isNeuroFriendly ? "Switch to Standard Mode" : "Switch to Sensory-Friendly Mode"}
                    >
                        <Brain className={`w-3.5 h-3.5 ${isNeuroFriendly ? "animate-pulse" : ""}`} />
                        <span>{isNeuroFriendly ? "Sensory Mode On" : "Sensory Mode"}</span>
                    </button>

                    {/* Desktop CTA */}
                    <Link
                        href="/about-us#specialists"
                        onClick={handleSpecialistsClick}
                        className="hidden xl:inline-flex h-12 items-center justify-center gap-3 rounded-full bg-green px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-green/90 transition-all duration-500 shadow-xl shadow-green/20 hover:shadow-2xl hover:shadow-green/30 hover:-translate-y-1 active:scale-95 group"
                    >
                        <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Meet Our Specialists
                    </Link>

                    {/* Mobile CTA - premium outline button */}
                    <Link
                        href="/about-us#specialists"
                        onClick={handleSpecialistsClick}
                        className="xl:hidden inline-flex h-8 items-center justify-center rounded-full border-2 border-[#7A9A7D] px-4 text-xs font-medium tracking-wide text-[#7A9A7D] shadow-md shadow-[#7A9A7D]/15 hover:bg-[#7A9A7D] hover:text-white hover:shadow-lg hover:shadow-[#7A9A7D]/25 transition-all"
                    >
                        Get Help
                    </Link>

                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
