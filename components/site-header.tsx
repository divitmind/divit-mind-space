"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
    const router = useRouter();
    const pathname = usePathname();

    const handleSpecialistsClick = (e: React.MouseEvent) => {
        // If already on about-us page, scroll to specialists section
        if (pathname === "/about-us") {
            e.preventDefault();
            const element = document.getElementById("specialists");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
        // Otherwise, let the Link navigate normally
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-[#FDFBF7]/80 backdrop-blur-lg border-b border-black/5">
            <div className="container flex h-20 max-w-screen-2xl items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-90">
                    <Image src="/divit-mindspace-logo.png" alt="Logo" width={100} height={100} className="w-14 h-auto" />
                </Link>

                {/* Desktop Nav */}
                <MainNav />

                <div className="flex items-center gap-3">
                    {/* Desktop CTA - solid black premium style */}
                    <Link
                        href="/about-us#specialists"
                        onClick={handleSpecialistsClick}
                        className="hidden md:inline-flex h-10 items-center justify-center gap-2 rounded-full bg-black px-6 text-xs font-bold uppercase tracking-widest text-white hover:bg-black/80 transition-all duration-300 shadow-lg shadow-black/5"
                    >
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        Meet Our Specialists
                    </Link>

                    {/* Mobile CTA - premium outline button */}
                    <Link
                        href="/about-us#specialists"
                        onClick={handleSpecialistsClick}
                        className="md:hidden inline-flex h-8 items-center justify-center rounded-full border-2 border-[#722F37] px-4 text-xs font-medium tracking-wide text-[#722F37] shadow-md shadow-[#722F37]/15 hover:bg-[#722F37] hover:text-white hover:shadow-lg hover:shadow-[#722F37]/25 transition-all"
                    >
                        Get Help
                    </Link>

                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
