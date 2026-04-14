"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { Users } from "lucide-react";

export function SiteHeader() {
    const router = useRouter();
    const pathname = usePathname();

    const handleSpecialistsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === "/about-us") {
            e.preventDefault();
            const element = document.getElementById("specialists");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-2xl border-b border-black/5">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 flex h-20 items-center justify-between">
                <Link href="/" className="flex items-center gap-3 transition-all hover:opacity-80 active:scale-95 group">
                    <div className="relative w-12 lg:w-14 h-12 lg:h-14 transition-transform duration-700 group-hover:rotate-6">
                        <Image 
                            src="/divit-mindspace-logo.png" 
                            alt="Divit MindSpace Logo" 
                            fill
                            className="object-contain" 
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:block">
                    <MainNav />
                </div>

                <div className="flex items-center gap-4">
                    {/* Desktop CTA */}
                    <Link
                        href="/about-us#specialists"
                        onClick={handleSpecialistsClick}
                        className="hidden md:inline-flex h-12 items-center justify-center gap-3 rounded-full bg-green px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-green/90 transition-all duration-500 shadow-xl shadow-green/20 hover:shadow-2xl hover:shadow-green/30 hover:-translate-y-1 active:scale-95 group"
                    >
                        <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Meet Our Specialists
                    </Link>

                    {/* Mobile CTA - premium outline button */}
                    <Link
                        href="/about-us#specialists"
                        onClick={handleSpecialistsClick}
                        className="md:hidden inline-flex h-8 items-center justify-center rounded-full border-2 border-[#7A9A7D] px-4 text-xs font-medium tracking-wide text-[#7A9A7D] shadow-md shadow-[#7A9A7D]/15 hover:bg-[#7A9A7D] hover:text-white hover:shadow-lg hover:shadow-[#7A9A7D]/25 transition-all"
                    >
                        Get Help
                    </Link>

                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
