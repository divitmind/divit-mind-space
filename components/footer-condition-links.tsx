import Link from "next/link";

// Condition landing pages — distinct from Services column. These are the
// /conditions/[slug] pivot pages that target "[condition] Bangalore" and
// "[condition] in [location]" long-tail queries. Surfacing them in the
// footer pumps internal-link authority into each pivot page site-wide.
const conditionLinks = [
    { label: "Autism", href: "/conditions/autism" },
    { label: "ADHD", href: "/conditions/adhd" },
    { label: "Learning Disabilities", href: "/conditions/learning-disabilities" },
    { label: "Stress, Anxiety & Depression", href: "/conditions/stress-anxiety-depression" },
    { label: "Sensory Processing", href: "/conditions/sensory-processing" },
    { label: "Developmental Delays", href: "/conditions/developmental-delays" },
    { label: "Pain Management", href: "/conditions/pain-management" },
];

export function FooterConditionLinks() {
    return (
        <ul className="space-y-3">
            {conditionLinks.map((link) => (
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
                    href="/conditions"
                    className="text-[13px] text-green font-bold hover:underline underline-offset-4 flex items-center gap-1.5"
                >
                    View all conditions <span className="text-xs">→</span>
                </Link>
            </li>
        </ul>
    );
}
