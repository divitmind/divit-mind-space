"use client"

import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { usePathname } from "next/navigation";
import type { SiteSettings } from "@/lib/types";

interface ProviderProps {
    children: React.ReactNode;
    siteSettings: SiteSettings | null;
    announcement?: { text?: string | null } | null;
}

const Provider = ({ children, siteSettings, announcement }: ProviderProps) => {
    const pathname = usePathname();

    if (pathname.startsWith("/studio")) {
        return <>{children}</>;
    } else {
        return (
            <>
                {announcement?.text && (
                    <div className="bg-[#FAF9F5] text-[#7A9A7D] border-b border-[#7A9A7D]/20 text-center py-1.5 md:py-2 px-2 md:px-4 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider md:tracking-widest relative z-[60]">
                        <span className="animate-pulse">{announcement.text}</span>
                    </div>
                )}
                <SiteHeader />
                {children}
                <SiteFooter siteSettings={siteSettings} />
            </>
        )
    }
}

export default Provider