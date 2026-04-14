import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Twitter, MapPin, Phone, Mail, Facebook, Briefcase } from "lucide-react";
import { FooterServiceLinks } from "@/components/footer-service-links";

const quickLinks = [
    { label: "About Us", href: "/about-us" },
    { label: "Blog", href: "/blogs" },
    { label: "Gallery", href: "/gallery" },
    { label: "Workshops", href: "/awareness-program" },
    { label: "Contact", href: "/contact-us" },
];

const contact = {
    address: "Aadeshwar Chambers, Kasavanahalli, Off Sarjapur Road, Bengaluru",
    phone: { label: "+91 9901666139", href: "tel:+919901666139" },
    email: { label: "divitmindspace@gmail.com", href: "mailto:divitmindspace@gmail.com" },
};

const socialLinks = [
    { href: "https://instagram.com/divitmindspace", icon: Instagram, label: "Instagram" },
    { href: "https://facebook.com/divitmindspace", icon: Facebook, label: "Facebook" },
    { href: "https://www.linkedin.com/in/divitmindspace/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://x.com/divitmindspace", icon: Twitter, label: "X (Twitter)" },
];

export function SiteFooter() {
    return (
        <footer className="bg-[#FDFBF7] border-t border-black/5 pt-10 lg:pt-16 pb-6 lg:pb-10">
            <div className="container">
                {/* Top Grid: 2 columns on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-x-8 gap-y-8 lg:gap-y-12">
                    {/* Brand Column: Full width on mobile */}
                    <div className="col-span-2 lg:col-span-1">
                        <div className="w-16 h-16 mb-6 relative">
                            <Image
                                src="/divit-mindspace-logo.png"
                                alt="Divit MindSpace Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h3 className="font-serif italic text-xl lg:text-2xl text-green mb-4 leading-tight" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                            Bangalore’s Leading Center for Mental Health, Neurodevelopment & Physiotherapy
                        </h3>
                        <p className="text-[13px] text-black/50 font-medium leading-relaxed max-w-[360px]">
                            Expert clinical assessments, professional counseling, and specialized education for all ages. Located off Sarjapur Road, we provide trusted care for families in Kasavanahalli, HSR Layout, Bellandur, and Bengaluru.
                        </p>
                    </div>

                    {/* Services Column */}
                    <div className="col-span-1">
                        <h4 className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] mb-8">
                            Our Services
                        </h4>
                        <FooterServiceLinks />
                    </div>

                    {/* Quick Links Column */}
                    <div className="col-span-1">
                        <h4 className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] mb-8">
                            Explore
                        </h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
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
                        <h4 className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] mb-6 lg:mb-8">
                            Get in Touch
                        </h4>
                        <address className="not-italic space-y-4 text-[13px] text-black/60 font-medium">
                            <p className="flex items-start gap-4">
                                <MapPin className="h-5 w-5 shrink-0 text-green/40" />
                                <span className="leading-relaxed">{contact.address}</span>
                            </p>
                            <div className="flex flex-wrap gap-x-6 gap-y-3">
                                <a
                                    href={contact.phone.href}
                                    className="flex items-center gap-2 hover:text-green transition-colors group"
                                >
                                    <Phone className="h-4 w-4 shrink-0 text-green/40 group-hover:text-green transition-colors" />
                                    {contact.phone.label}
                                </a>
                                <a
                                    href={contact.email.href}
                                    className="flex items-center gap-2 hover:text-green transition-colors group"
                                >
                                    <Mail className="h-4 w-4 shrink-0 text-green/40 group-hover:text-green transition-colors" />
                                    {contact.email.label}
                                </a>
                            </div>
                        </address>
                        <div className="flex gap-3 mt-5">
                            {socialLinks.map(({ href, icon: Icon, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="h-9 w-9 rounded-full bg-white border border-black/5 flex items-center justify-center text-black/40 hover:bg-green hover:text-white hover:border-green transition-all duration-500 shadow-sm"
                                >
                                    <Icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4 pt-4 lg:pt-8 mt-4 lg:mt-0 border-t border-black/5">
                    <Link
                        href="/careers"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-green hover:bg-green hover:text-white transition-all duration-500 group border border-green/10"
                    >
                        <Briefcase className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                        Join Our Team
                    </Link>
                    <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-6">
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
                    </div>
                </div>
            </div>
        </footer>
    );
}

