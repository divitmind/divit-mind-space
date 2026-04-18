import Link from "next/link";

// Top 10 services surfaced in footer — chosen for search volume + internal
// link equity. Every link points to a real /services/[slug] page generated
// from Sanity, so footer internal links flow ranking authority into the
// money pages. Keep this list under 12 to avoid visual overload.
const serviceLinks = [
    { label: "Speech Therapy", href: "/services/speech-therapy" },
    { label: "Occupational Therapy", href: "/services/occupational-therapy" },
    { label: "Behavioral Therapy", href: "/services/behavioral-therapy" },
    { label: "Cognitive Therapy", href: "/services/cognitive-therapy" },
    { label: "Play Therapy", href: "/services/play-therapy" },
    { label: "Group Therapy Sessions", href: "/services/group-therapy-sessions" },
    { label: "Counselling", href: "/services/counselling" },
    { label: "Sensory Integration", href: "/services/sensory-integration-program" },
    { label: "Pain Management", href: "/services/pain-management" },
    { label: "Clinical Assessments", href: "/services/psychometric-assessments" },
];

export function FooterServiceLinks() {
    return (
        <ul className="space-y-3">
            {serviceLinks.map((link) => (
                <li key={link.label}>
                    <Link
                        href={link.href}
                        className="text-[13px] text-black/60 font-medium hover:text-green transition-colors"
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
            <li className="pt-1">
                <Link
                    href="/services"
                    className="text-[13px] text-green font-bold hover:underline underline-offset-4 flex items-center gap-1.5"
                >
                    View all services <span className="text-xs">→</span>
                </Link>
            </li>
        </ul>
    );
}
