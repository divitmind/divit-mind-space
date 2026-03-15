import Link from "next/link";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full bg-[#FAF9F5]/80 backdrop-blur-lg border-b border-[#2F3E33]/5">
            <div className="container flex h-18 max-w-screen-2xl items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-90">
                    <Image src="/divit-mindspace-logo.png" alt="Logo" width={100} height={100} className="w-14 h-auto" />
                </Link>

                {/* Desktop Nav */}
                <MainNav />

                <div className="flex items-center gap-3">
                    <Button
                        asChild
                        className="hidden md:inline-flex h-10 items-center justify-center rounded-xl bg-green px-5 text-sm font-bold text-white shadow-lg shadow-[#2F3E33]/10 hover:bg-[#2F3E33]/90 hover:shadow-[#7C9082]/20 transition-all duration-300"
                    >
                        <WhatsAppConsultationLink>
                            Book a Free Consultation
                        </WhatsAppConsultationLink>
                    </Button>

                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
