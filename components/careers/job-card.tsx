import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import type { CareerListItem } from "@/sanity/types";

interface JobCardProps {
  job: CareerListItem;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/careers/${job.slug.current}`}
      className="group relative bg-white overflow-hidden rounded-[2rem] border border-black/5 hover:border-black/10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 p-7"
    >
      {/* Department Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A9A7D]/10 text-[#7A9A7D] text-[10px] font-bold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
          {job.department}
        </span>
      </div>

      {/* Job Title - Serif Italic like services */}
      <h3
        className="text-xl font-bold text-black mb-3 font-[family-name:var(--font-cormorant)] italic leading-tight group-hover:text-[#7A9A7D] transition-colors duration-300"
      >
        {job.title}
      </h3>

      {/* Job Details */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-black/60 mb-6">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          Sarjapur Road, Bangalore
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span className="capitalize">{job.employmentType.replace("-", " ")}</span>
        </span>
      </div>

      {/* View Role Link */}
      <div className="pt-4 border-t border-black/5 flex items-center gap-2 text-black/40 group-hover:text-black transition-all duration-300 uppercase text-[9px] font-bold tracking-widest">
        <span>View Role</span>
        <svg
          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </Link>
  );
}
