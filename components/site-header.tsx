"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { Users } from "lucide-react";

export function SiteHeader() {
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

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-2xl border-b border-black/5">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 flex h-14 md:h-16 items-center justify-between">
                <Link href="/" onClick={handleLogoClick} className="flex items-center gap-3 transition-all hover:opacity-80 active:scale-95 group">
                    <div className="relative w-10 lg:w-12 h-10 lg:h-12 transition-transform duration-700 group-hover:rotate-6">
                        <Image
                            src="/divit-mindspace-logo.png"
                            alt="Divit MindSpace Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden xl:block">
                    <MainNav />
                </div>

                <div className="flex items-center gap-4">
                    {/* Unified CTA - premium outline button */}
                    <Link
                        href="/about-us#specialists"
                        onClick={handleSpecialistsClick}
                        className="inline-flex h-8 md:h-11 items-center justify-center md:gap-2 rounded-full border-2 border-[#7A9A7D] px-4 md:px-6 text-xs md:text-[10px] font-medium md:font-bold tracking-wide md:tracking-[0.15em] text-[#7A9A7D] shadow-md shadow-[#7A9A7D]/10 hover:bg-[#7A9A7D] hover:text-white hover:shadow-lg hover:shadow-[#7A9A7D]/20 transition-all duration-300 group active:scale-95"
                    >
                        <Users className="hidden xl:block w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="hidden xl:inline uppercase">Meet Our Specialists</span>
                        <span className="xl:hidden">Get Help</span>
                    </Link>

                    <div className="xl:hidden">
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    );
}
