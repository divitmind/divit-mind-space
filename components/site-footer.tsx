import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Twitter, MapPin, Phone, Mail, Facebook, Briefcase } from "lucide-react";
import { FooterServiceLinks } from "@/components/footer-service-links";

const quickLinks = [
    { label: "About Us", href: "/about-us" },
    { label: "Blog", href: "/blogs" },
    { label: "Gallery", href: "/gallery" },
    { label: "Host a Free Workshop", href: "/awareness-program" },
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
        <footer className="bg-white border-t border-black/5 pt-16 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <div className="w-16 h-16 mb-6 relative">
                            <Image
                                src="/divit-mindspace-logo.png"
                                alt="Divit MindSpace Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-sm text-black/70 font-medium leading-relaxed max-w-[280px] mb-6">
                            Bangalore’s comprehensive center for mental health, neurodevelopment, and physiotherapy. Supporting children, teens, and adults through clinical excellence and specialized education.
                        </p>
                        <Link
                            href="/careers"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/5 rounded-xl text-sm font-bold text-green hover:bg-green hover:text-white transition-all group"
                        >
                            <Briefcase className="h-4 w-4 group-hover:scale-110 transition-transform" />
                            We&apos;re Hiring
                        </Link>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-lg font-serif text-green mb-6 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                            Our Services
                        </h4>
                        <FooterServiceLinks />
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h4 className="text-lg font-serif text-green mb-6 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                            Explore
                        </h4>
                        <ul className="space-y-3.5">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-black/70 font-medium hover:text-green transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-lg font-serif text-green mb-6 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                            Get in Touch
                        </h4>
                        <address className="not-italic space-y-4 text-sm text-black/70 font-medium">
                            <p className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-green" />
                                <span>{contact.address}</span>
                            </p>
                            <p>
                                <a
                                    href={contact.phone.href}
                                    className="flex items-center gap-3 hover:text-green transition-colors"
                                >
                                    <Phone className="h-5 w-5 shrink-0 text-green" />
                                    {contact.phone.label}
                                </a>
                            </p>
                            <p>
                                <a
                                    href={contact.email.href}
                                    className="flex items-center gap-3 hover:text-green transition-colors"
                                >
                                    <Mail className="h-5 w-5 shrink-0 text-green" />
                                    {contact.email.label}
                                </a>
                            </p>
                        </address>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-black/5">
                    <p className="text-[13px] text-black/40 font-medium">
                        © {new Date().getFullYear()} Divit MindSpace. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        <Link href="/terms" className="text-[13px] text-black/40 font-medium hover:text-green transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/privacy" className="text-[13px] text-black/40 font-medium hover:text-green transition-colors">
                            Privacy Policy
                        </Link>
                    </div>
                    <div className="flex gap-4">
                        {socialLinks.map(({ href, icon: Icon, label }) => (
                            <Link
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="h-10 w-10 rounded-xl bg-black/5 flex items-center justify-center text-black/60 hover:bg-green hover:text-white transition-all"
                            >
                                <Icon className="h-5 w-5" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

