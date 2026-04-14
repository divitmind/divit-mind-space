"use client";

import { useState } from "react";
import { JobCard } from "./job-card";
import type { CareerListItem } from "@/sanity/types";

interface CareersPageProps {
  jobs: CareerListItem[];
  initialFilter?: string;
}

export function CareersPage({ jobs, initialFilter }: CareersPageProps) {
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [employmentFilter, setEmploymentFilter] = useState<string>(initialFilter || "all");

  // Get unique values for filters
  const departments = Array.from(new Set(jobs.map(j => j.department)));
  const locations = Array.from(new Set(jobs.flatMap(j => j.location)));
  const employmentTypes = Array.from(new Set(jobs.map(j => j.employmentType)));

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesDept = departmentFilter === "all" || job.department === departmentFilter;
    const matchesLoc = locationFilter === "all" || job.location.includes(locationFilter);
    const matchesEmp = employmentFilter === "all" || job.employmentType === employmentFilter;
    return matchesDept && matchesLoc && matchesEmp;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-cream via-[#FDFBF7] to-green-lite/10 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
              Sarjapur Road, Bengaluru
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green mb-6">
              Join Our Team
            </h1>
            <p className="text-lg md:text-xl text-green/70 mb-8">
              Join Bangalore&apos;s leading center for mental health, neurodevelopment, and physiotherapy.
              Serving families across Kasavanahalli, HSR Layout, Bellandur, and Bengaluru.
            </p>

            {/* Quick Stats */}
            <div className="flex items-center justify-center gap-5 sm:gap-6 text-green">
              <div className="text-center">
                <div className="text-xl font-bold">{jobs.length}</div>
                <div className="text-[9px] text-green/50 font-bold uppercase tracking-widest">Open Roles</div>
              </div>
              <div className="w-px h-8 bg-green/10" />
              <div className="text-center">
                <div className="text-xl font-bold">{departments.length}</div>
                <div className="text-[9px] text-green/50 font-bold uppercase tracking-widest">Departments</div>
              </div>
              <div className="w-px h-8 bg-green/10" />
              <div className="text-center">
                <div className="text-xl font-bold">Onsite</div>
                <div className="text-[9px] text-green/50 font-bold uppercase tracking-widest">Work Model</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs section */}
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-green mb-6">
          Open Positions ({filteredJobs.length})
        </h2>

        {/* Filters */}
        <div className="mb-8">
          <p className="text-sm text-green/60 mb-3">Filters:</p>
          <div className="flex flex-wrap gap-4">
            {/* Department filter */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-green/20 rounded-lg bg-white text-green focus:outline-none focus:border-green"
            >
              <option value="all">Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            {/* Location filter */}
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-2 border border-green/20 rounded-lg bg-white text-green focus:outline-none focus:border-green"
            >
              <option value="all">Location</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>
                  {loc.replace('-', ' ')}
                </option>
              ))}
            </select>

            {/* Employment type filter */}
            <select
              value={employmentFilter}
              onChange={(e) => setEmploymentFilter(e.target.value)}
              className="px-4 py-2 border border-green/20 rounded-lg bg-white text-green focus:outline-none focus:border-green"
            >
              <option value="all">Employment Type</option>
              {employmentTypes.map(type => (
                <option key={type} value={type}>
                  {type.replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Job listings */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map(job => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-green/60">
              No positions match your filters. Try adjusting them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
