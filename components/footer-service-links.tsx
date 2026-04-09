import Link from "next/link";

const serviceLinks = [
    { label: "Assessments", href: "/services/psychometric-assessments" },
    { label: "Therapy", href: "/services" },
    { label: "Guidance", href: "/services" },
    { label: "Programs", href: "/services" },
];

export function FooterServiceLinks() {
    return (
        <ul className="space-y-3.5">
            {serviceLinks.map((link) => (
                <li key={link.label}>
                    <Link
                        href={link.href}
                        className="text-sm text-black/70 font-medium hover:text-green transition-colors"
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
            <li className="pt-1">
                <Link
                    href="/services"
                    className="text-sm text-green font-bold hover:underline underline-offset-4 flex items-center gap-1.5"
                >
                    View all services <span className="text-xs">→</span>
                </Link>
            </li>
        </ul>
    );
}

