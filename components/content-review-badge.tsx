import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Calendar } from "lucide-react";

// Visible "Last reviewed" + author/reviewer card. The structured-data equivalent
// is already in each page's JSON-LD (`lastReviewed` + `reviewedBy`) — this surfaces
// the same info for humans. Google's quality raters scan for it; LLMs cite it.

export type ReviewerInfo = {
  name: string;
  title: string;
  slug?: string;
  photoUrl?: string;
};

export function ContentReviewBadge({
  lastReviewedDate,
  reviewer,
  compact = false,
}: {
  lastReviewedDate: string;
  reviewer: ReviewerInfo;
  compact?: boolean;
}) {
  const prettyDate = new Date(lastReviewedDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 text-xs text-black/60 font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-[#7A9A7D]" />
        Reviewed by{" "}
        {reviewer.slug ? (
          <Link href={`/specialists/${reviewer.slug}`} className="text-[#7A9A7D] hover:underline underline-offset-2">
            {reviewer.name}
          </Link>
        ) : (
          <span className="text-black/80">{reviewer.name}</span>
        )}{" "}
        · {prettyDate}
      </div>
    );
  }

  return (
    <aside
      aria-label="Content review information"
      className="flex items-start gap-4 bg-[#FAF9F5] rounded-2xl border border-black/5 p-5 my-6"
    >
      {reviewer.photoUrl ? (
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
          <Image src={reviewer.photoUrl} alt={reviewer.name} fill sizes="56px" className="object-cover" />
        </div>
      ) : (
        <div className="w-14 h-14 rounded-full bg-[#7A9A7D]/10 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-6 h-6 text-[#7A9A7D]" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest mb-1">
          <ShieldCheck className="w-3 h-3" />
          Clinically reviewed
        </div>
        <div className="font-semibold text-black">
          Reviewed by{" "}
          {reviewer.slug ? (
            <Link href={`/specialists/${reviewer.slug}`} className="hover:text-[#7A9A7D] transition-colors">
              {reviewer.name}
            </Link>
          ) : (
            reviewer.name
          )}
        </div>
        <p className="text-sm text-black/60 mt-0.5">{reviewer.title}</p>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-black/50">
          <Calendar className="w-3 h-3" />
          Last reviewed: {prettyDate}
        </div>
      </div>
    </aside>
  );
}
