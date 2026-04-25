import Link from "next/link";

// Footer Services — 8 strategic entry points. Chosen for search volume +
// internal link equity. The 6 core therapies (user-strategic) + Counselling
// (umbrella mental-health service) + Clinical Assessments (diagnostic entry).
// Dropped from the previous 10: Sensory Integration (covered by OT page),
// Pain Management (already surfaced in Conditions column). Keeping the list
// at 8 items brings column height close to Conditions (7 items + View all)
// for cleaner visual balance without needing 2-col wrapping tricks.
const serviceLinks = [
    { label: "Speech Therapy", href: "/services/speech-therapy" },
    { label: "Occupational Therapy", href: "/services/occupational-therapy" },
    { label: "Behavioral Therapy", href: "/services/behavioral-therapy" },
    { label: "Cognitive Therapy", href: "/services/cognitive-therapy" },
    { label: "Play Therapy", href: "/services/play-therapy" },
    { label: "Group Therapy Sessions", href: "/services/group-therapy-sessions" },
    { label: "Counselling", href: "/services/counselling" },
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
                    className="text-[13px] text-green font-bold hover:underline underline-offset-4 inline-flex items-center gap-1.5"
                >
                    View all services <span className="text-xs">→</span>
                </Link>
            </li>
        </ul>
    );
}
