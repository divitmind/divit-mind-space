import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Calendar } from "lucide-react";
import { FooterServiceLinks } from "@/components/footer-service-links";
import { FooterConditionLinks } from "@/components/footer-condition-links";
import { ContactClickLink } from "@/components/contact-click-link";
import type { SiteSettings } from "@/lib/types";

const quickLinks = [
    { label: "About Us", href: "/about-us" },
    { label: "Our Specialists", href: "/specialists" },
    { label: "Conditions", href: "/conditions" },
    { label: "Near Me", href: "/near-me" },
    { label: "How-To Guides", href: "/howto" },
    { label: "Glossary", href: "/glossary" },
    { label: "All FAQs", href: "/faq" },
    { label: "Reviews", href: "/reviews" },
    { label: "Blog", href: "/blogs" },
    { label: "Workshops", href: "/awareness-program" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact-us" },
];

// NAP values — must match schema.org PostalAddress in app/layout.tsx exactly.
// Changing any of these silently is a local-SEO red flag; keep them synced.
const contact = {
    address: "Aadeshwar Chambers, Kasavanahalli, Off Sarjapur Road, Bangalore 560035",
    hours: "Mon–Sat · 10:00 AM – 7:00 PM",
    phone: { label: "+91 99016 66139", href: "tel:+919901666139" },
    email: { label: "divitmindspace@gmail.com", href: "mailto:divitmindspace@gmail.com" },
    whatsapp: "https://wa.me/919901666139",
};

// Crisis helplines — India-specific YMYL best practice. Verbatim numbers only,
// do not paraphrase. Labels kept short so the block fits at the footer base.
const crisisHelplines = [
    { label: "iCall (TISS)", number: "+91 91529 87821", tel: "tel:+919152987821" },
    { label: "Vandrevala Foundation", number: "1860-2662-345", tel: "tel:18602662345" },
    { label: "NIMHANS Helpline", number: "080 4611 0007", tel: "tel:08046110007" },
];

const socialLinks = [
    {
        href: "https://www.instagram.com/divitmindspace/",
        label: "Instagram",
        icon: (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <defs>
                    <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFDC80"/>
                        <stop offset="25%" stopColor="#F77737"/>
                        <stop offset="50%" stopColor="#E1306C"/>
                        <stop offset="75%" stopColor="#C13584"/>
                        <stop offset="100%" stopColor="#833AB4"/>
                    </linearGradient>
                </defs>
                <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
        )
    },
    {
        href: "https://www.facebook.com/DivitMindspace/",
        label: "Facebook",
        icon: (
            <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
        )
    },
    {
        href: "https://www.linkedin.com/in/divitmindspace/",
        label: "LinkedIn",
        icon: (
            <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        )
    },
    {
        href: "https://x.com/divitmindspace",
        label: "X (Twitter)",
        icon: (
            <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#000000" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
        )
    },
    {
        href: "https://wa.me/919901666139",
        label: "WhatsApp",
        icon: (
            <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
        )
    },
];

interface SiteFooterProps {
    siteSettings: SiteSettings | null;
}

export function SiteFooter({ siteSettings }: SiteFooterProps) {
    // Use Sanity data with fallbacks
    const socialLinksData = siteSettings?.socialLinks;
    const quickLinksData = siteSettings?.navigation?.quickLinks || quickLinks;
    const footerContent = siteSettings?.footer;

    // Contact info with explicit fallbacks (Sanity has flat strings, fallback has nested objects)
    const displayAddress = siteSettings?.contact?.address || contact.address;
    const displayPhone = siteSettings?.contact?.phone || contact.phone.label;
    const displayPhoneLink = siteSettings?.contact?.phoneLink || contact.phone.href;
    const displayEmail = siteSettings?.contact?.email || contact.email.label;
    const displayEmailLink = siteSettings?.contact?.email ? `mailto:${siteSettings.contact.email}` : contact.email.href;
    return (
        <footer className="bg-[#FDFBF7] border-t border-black/5 pt-8 lg:pt-12 pb-6 lg:pb-8">
            <div className="container">
                {/* Top Grid: mobile stacks to 2 cols; desktop lays out 5 cols */}
                <div className="grid grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1fr_1.2fr] gap-x-8 gap-y-8 lg:gap-y-12">
                    {/* Brand Column: Full width on mobile */}
                    <div className="col-span-2 lg:col-span-1">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 relative shrink-0">
                                <Image
                                    src="/divit-mindspace-logo.png"
                                    alt="Divit MindSpace Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="font-serif italic text-lg lg:text-xl text-green leading-tight pt-1" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                                {footerContent?.tagline || "Bangalore's Leading Center for Mental Health, Neurodevelopment & Physiotherapy"}
                            </h3>
                        </div>
                        <p className="text-[13px] text-black/50 font-medium leading-relaxed max-w-[360px] mb-4">
                            {footerContent?.description || "Neuro-affirming care covering Clinical Assessments, Speech, Occupational, Behavioral, Cognitive and Play Therapy, Group Sessions, Counselling, Special Education and Physiotherapy. Serving children, teens, and adults across Bangalore."}
                        </p>
                        {/* Credential line — Indian YMYL trust signal. RCI regulates clinical
                            psychologists; NCAHP covers speech, OT, and allied-health staff. */}
                        <p className="text-[11px] text-black/40 font-medium leading-relaxed max-w-[360px]">
                            Clinical psychologists registered under the Rehabilitation Council of India (RCI). Allied-health staff practice under the National Commission for Allied and Healthcare Professions (NCAHP).
                        </p>
                    </div>

                    {/* Services Column */}
                    <div className="col-span-1">
                        <h4 className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] mb-5">
                            Our Services
                        </h4>
                        <FooterServiceLinks />
                    </div>

                    {/* Conditions Column — distinct from Services; links to /conditions pivots */}
                    <div className="col-span-1">
                        <h4 className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] mb-5">
                            Conditions
                        </h4>
                        <FooterConditionLinks />
                    </div>

                    {/* Quick Links Column */}
                    <div className="col-span-2 lg:col-span-1">
                        <h4 className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] mb-5">
                            Explore
                        </h4>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                            {quickLinksData.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-[13px] text-black/60 font-medium hover:text-green transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column: Full width on mobile */}
                    <div className="col-span-2 lg:col-span-1 pt-4 lg:pt-0 border-t lg:border-none border-black/5">
                        <h4 className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] mb-5">
                            Get in Touch
                        </h4>
                        <address className="not-italic space-y-3 text-[13px] text-black/60 font-medium">
                            <p className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 shrink-0 text-green/40 mt-0.5" />
                                <span className="leading-relaxed">{displayAddress}</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <Clock className="h-4 w-4 shrink-0 text-green/40 mt-0.5" />
                                <span className="leading-relaxed">{contact.hours}</span>
                            </p>
                            <div className="flex flex-col gap-2">
                                <ContactClickLink
                                    href={displayPhoneLink}
                                    type="phone"
                                    source="footer_cta"
                                    className="flex items-center gap-3 hover:text-green transition-colors group"
                                >
                                    <Phone className="h-4 w-4 shrink-0 text-green/40 group-hover:text-green transition-colors" />
                                    {displayPhone}
                                </ContactClickLink>
                                <ContactClickLink
                                    href={displayEmailLink}
                                    type="email"
                                    source="footer_cta"
                                    className="flex items-center gap-3 hover:text-green transition-colors group"
                                >
                                    <Mail className="h-4 w-4 shrink-0 text-green/40 group-hover:text-green transition-colors" />
                                    {displayEmail}
                                </ContactClickLink>
                            </div>
                        </address>
                        <div className="flex gap-3 mt-5">
                            {socialLinksData && socialLinksData.length > 0 ? (
                                socialLinksData.map((social) => (
                                    <Link
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.platform}
                                        className="h-9 w-9 rounded-full bg-white border border-black/5 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-sm"
                                    >
                                        {social.icon ? (
                                            <Image
                                                src={social.icon}
                                                alt={social.platform}
                                                width={16}
                                                height={16}
                                                className="w-4 h-4"
                                            />
                                        ) : (
                                            <span className="text-xs">{social.platform.charAt(0)}</span>
                                        )}
                                    </Link>
                                ))
                            ) : (
                                socialLinks.map(({ href, icon, label }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="h-9 w-9 rounded-full bg-white border border-black/5 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-sm"
                                    >
                                        {icon}
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Crisis helplines — YMYL safety signal, published on every page */}
                <div className="mt-10 lg:mt-12 pt-6 border-t border-black/5">
                    <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] mb-3">
                        If you or someone you care for is in crisis
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-black/60 font-medium">
                        {crisisHelplines.map((line) => (
                            <a
                                key={line.label}
                                href={line.tel}
                                className="hover:text-green transition-colors"
                            >
                                <span className="text-black/40">{line.label}:</span>{" "}
                                <span className="font-semibold">{line.number}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar: CTAs left, legal links right */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4 pt-6 lg:pt-8 mt-6 border-t border-black/5">
                    <a
                        href={contact.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green rounded-full text-[10px] font-bold uppercase tracking-widest text-white hover:bg-green/90 transition-all duration-500 group"
                    >
                        <Calendar className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                        Book a Free Consultation
                    </a>
                    <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-5">
                        <p className="text-[10px] text-black/30 font-bold uppercase tracking-widest">
                            © {new Date().getFullYear()} Divit MindSpace
                        </p>
                        <span className="text-black/20 hidden lg:inline">·</span>
                        <Link href="/terms" className="text-[10px] text-black/30 font-bold uppercase tracking-widest hover:text-green transition-colors">
                            Terms
                        </Link>
                        <Link href="/privacy" className="text-[10px] text-black/30 font-bold uppercase tracking-widest hover:text-green transition-colors">
                            Privacy
                        </Link>
                        <Link href="/medical-disclaimer" className="text-[10px] text-black/30 font-bold uppercase tracking-widest hover:text-green transition-colors">
                            Medical Disclaimer
                        </Link>
                        <Link href="/sitemap.xml" className="text-[10px] text-black/30 font-bold uppercase tracking-widest hover:text-green transition-colors">
                            Sitemap
                        </Link>
                        <Link href="/llms.txt" className="text-[10px] text-black/30 font-bold uppercase tracking-widest hover:text-green transition-colors">
                            llms.txt
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

