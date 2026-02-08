import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

const footerLinks = [
    {
        title: "Services",
        links: [
            { label: "Assessments", href: "/services/assessments" },
            { label: "Therapy", href: "/services/therapy" },
            { label: "Parent Guidance", href: "/services/parent-guidance" },
            { label: "School Support", href: "/services/school-support" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
            { label: "Privacy Policy", href: "/privacy" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Blog", href: "/blog" },
            { label: "Community", href: "/community" },
            { label: "FAQs", href: "/#faq" },
        ],
    },
];

export function SiteFooter() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
            <div className="container max-w-7xl mx-auto px-6">

                {/* Top Section: CTA & Newsletter */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
                    <p className="text-xl md:text-2xl font-bold text-[#222222] max-w-lg leading-tight">
                        Empowering neurodivergent individuals and their families through expert care and education.
                    </p>

                    {/* Simple Email Capture */}
                    <div className="w-full max-w-sm">
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="Join our newsletter"
                                className="w-full h-14 pl-6 pr-14 rounded-full bg-[#f5f5f5] text-[#222222] border-none outline-none focus:ring-2 focus:ring-[#2F3E33]/20 transition-all placeholder:text-gray-400"
                            />
                            <button type="submit" className="absolute right-2 top-2 h-10 w-10 rounded-full bg-[#2F3E33] text-white flex items-center justify-center hover:bg-[#3f5244] transition-colors">
                                <ArrowUpRight className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Big Brand Text */}
                <div className="relative mb-16 w-full flex flex-col items-center md:items-start">
                    <div className="mb-8 w-24 h-24 md:w-32 md:h-32 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/divit-mindspace-logo.png"
                            alt="Divit MindSpace Logo"
                            className="w-full h-full object-contain opacity-90"
                        />
                    </div>
                    <div className="relative select-none pointer-events-none w-full">
                        <h2 className="text-[12vw] sm:text-[13vw] leading-[0.8] font-bold text-[#E8ECE9] tracking-tighter text-center md:text-left">
                            DIVIT
                        </h2>
                        <h2 className="text-[12vw] sm:text-[13vw] leading-[0.8] font-bold text-[#202020] tracking-tighter text-center md:text-left -mt-2 md:-mt-4 lg:-mt-8">
                            MINDSPACE
                        </h2>
                    </div>

                    {/* Middle Section: Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 border-t border-gray-100 pt-16">
                        {footerLinks.map((group) => (
                            <div key={group.title}>
                                <h4 className="font-bold text-[#222222] mb-6">{group.title}</h4>
                                <ul className="space-y-4">
                                    {group.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-gray-500 hover:text-[#2F3E33] transition-colors font-medium text-sm"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Socials Column */}
                        <div className="col-span-2 md:col-span-1">
                            <h4 className="font-bold text-[#222222] mb-6">Connect</h4>
                            <div className="flex gap-4">
                                <Link href="#" className="h-10 w-10 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#222222] hover:bg-[#2F3E33] hover:text-white transition-all">
                                    <Instagram className="h-5 w-5" />
                                </Link>
                                <Link href="#" className="h-10 w-10 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#222222] hover:bg-[#2F3E33] hover:text-white transition-all">
                                    <Linkedin className="h-5 w-5" />
                                </Link>
                                <Link href="#" className="h-10 w-10 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#222222] hover:bg-[#2F3E33] hover:text-white transition-all">
                                    <Twitter className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Copyright & Status */}
                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 text-sm text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Divit MindSpace. All rights reserved.</p>
                        <div className="flex gap-8 mt-4 md:mt-0">
                            <Link href="/terms" className="hover:text-[#2F3E33] transition-colors">Terms</Link>
                            <Link href="/privacy" className="hover:text-[#2F3E33] transition-colors">Privacy</Link>
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-[#2F3E33] font-medium">All Systems Operational</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
