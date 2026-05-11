import Link from "next/link";
import { Heart, MapPin, Stethoscope, ArrowRight, HelpCircle } from "lucide-react";
import { CONDITION_PIVOTS, LOCATION_PIVOTS } from "@/lib/seo-pivots";

// 3 teaser questions sampled from our condition-pivot FAQs — clicking any sends
// users to the /faq aggregator where they can see everything in one place.
const POPULAR_QUESTIONS = [
  {
    q: "Where is the best autism and ADHD assessment center near Sarjapur Road?",
    href: "/conditions/autism",
  },
  {
    q: "Is there a physiotherapy clinic near Kasavanahalli for pain management?",
    href: "/conditions/pain-management",
  },
  {
    q: "Where can adults find counseling for stress, anxiety, and depression in Bangalore?",
    href: "/conditions/stress-anxiety-depression",
  },
];

// Internal-linking surface on the homepage — the highest-authority page on the site.
// Boosts indexing of /conditions, /near-me, /specialists and their sub-routes.
export function ExplorePivotsSection() {
  // Top 6 conditions + top 6 locations for the homepage grid (keeps it tight).
  const topConditions = CONDITION_PIVOTS.slice(0, 6);
  const topLocations = LOCATION_PIVOTS.slice(0, 6);

  return (
    <section className="py-6 lg:py-8 bg-[#FDFBF7]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10 lg:mb-12">
          <div className="inline-flex items-center justify-center text-black/40 text-[10px] font-bold tracking-widest uppercase mb-4">
            Find What You Need
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-black mb-4 tracking-tight font-[family-name:var(--font-cormorant)] italic">
            Explore by Condition, Location, or Specialist
          </h2>
          <p className="text-black/60 font-medium max-w-2xl mx-auto">
            Jump straight to what matters — dedicated pages for each condition we support,
            each Bangalore neighborhood we serve, and each member of our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Conditions block */}
          <div className="bg-white rounded-[2rem] border border-black/5 shadow-xl shadow-black/[0.02] p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#7A9A7D]/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#7A9A7D]" />
              </div>
              <h3 className="text-xl lg:text-2xl font-serif italic text-black">
                Browse by Condition
              </h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
              {topConditions.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/conditions/${c.slug}`}
                    className="group flex items-center justify-between gap-2 px-4 py-3 rounded-2xl bg-[#FAF9F5] border border-black/5 hover:border-[#7A9A7D]/30 hover:bg-white transition-all"
                  >
                    <span className="text-sm font-semibold text-black/80 group-hover:text-[#7A9A7D] transition-colors">
                      {c.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-black/30 group-hover:text-[#7A9A7D] group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/conditions"
              className="inline-flex items-center gap-2 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest hover:gap-3 transition-all"
            >
              All Conditions <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Locations block */}
          <div className="bg-white rounded-[2rem] border border-black/5 shadow-xl shadow-black/[0.02] p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#7A9A7D]/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#7A9A7D]" />
              </div>
              <h3 className="text-xl lg:text-2xl font-serif italic text-black">
                Find Us Near You
              </h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
              {topLocations.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/near-me/${l.slug}`}
                    className="group flex items-center justify-between gap-2 px-4 py-3 rounded-2xl bg-[#FAF9F5] border border-black/5 hover:border-[#7A9A7D]/30 hover:bg-white transition-all"
                  >
                    <span className="text-sm font-semibold text-black/80 group-hover:text-[#7A9A7D] transition-colors">
                      {l.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-black/30 group-hover:text-[#7A9A7D] group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/near-me"
              className="inline-flex items-center gap-2 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest hover:gap-3 transition-all"
            >
              All Locations <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>



        {/* Specialists CTA strip */}
        <div className="mt-6 lg:mt-8 max-w-6xl mx-auto">
          <Link
            href="/specialists"
            className="group flex items-center justify-between gap-4 p-6 lg:p-8 rounded-[2rem] bg-white border border-black/5 shadow-xl shadow-black/[0.02] hover:shadow-2xl hover:border-[#7A9A7D]/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#7A9A7D]/10 flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5 text-[#7A9A7D]" />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-serif italic text-black mb-0.5 group-hover:text-[#7A9A7D] transition-colors">
                  Meet Our Specialists
                </h3>
                <p className="text-sm text-black/60">
                  Licensed clinical psychologists, OTs, speech pathologists, behavioral therapists, and physiotherapists.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-black/40 group-hover:text-[#7A9A7D] group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
