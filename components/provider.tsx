"use client"

import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { usePathname } from "next/navigation";
import type { SiteSettings } from "@/lib/types";

interface ProviderProps {
    children: React.ReactNode;
    siteSettings: SiteSettings | null;
}

const Provider = ({ children, siteSettings }: ProviderProps) => {
    const pathname = usePathname();

    if (pathname.startsWith("/studio")) {
        return <>{children}</>;
    } else {
        return (
            <>
                <SiteHeader />
                {children}
                <SiteFooter siteSettings={siteSettings} />
            </>
        )
    }
}

export default Provider