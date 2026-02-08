import Link from "next/link";
import { BookConsultationModal } from "@/components/book-consultation-modal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#E8ECE9]/60 bg-[#FDFBF7]/80 backdrop-blur-md supports-backdrop-filter:bg-[#FDFBF7]/60">
            <div className="container flex h-20 max-w-screen-2xl items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-[#2F3E33]">
                    <Image src="/divit-mindspace-logo.png" alt="Logo" width={100} height={100} className="w-16 h-auto" />
                </Link>

                {/* Desktop Nav */}
                <MainNav />

                <div className="flex items-center gap-4">
                    <BookConsultationModal>
                        <Button
                            className="hidden sm:inline-flex h-11 items-center justify-center rounded-md bg-[#2F3E33] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#2F3E33]/90 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            Book Consultation
                        </Button>
                    </BookConsultationModal>

                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
