"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ApplicationFormProps {
  jobTitle: string;
  jobId: string;
}

export function ApplicationForm({ jobTitle, jobId }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
    linkedinUrl: "",
    motivation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement actual submission logic (e.g., send to API, email, etc.)
    console.log("Application submitted:", { ...formData, jobId, jobTitle });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert("Application submitted successfully!");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-green mb-2">
          Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Type here..."
          className="w-full px-4 py-3 border border-green/20 rounded-lg focus:outline-none focus:border-green"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-green mb-2">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="hello@example.com..."
          className="w-full px-4 py-3 border border-green/20 rounded-lg focus:outline-none focus:border-green"
        />
      </div>

      {/* Resume */}
      <div>
        <label htmlFor="resume" className="block text-sm font-medium text-green mb-2">
          Resume<span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-green/20 rounded-lg p-8 text-center">
          <input
            type="file"
            id="resume"
            required
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFormData({...formData, resume: e.target.files?.[0] || null})}
            className="hidden"
          />
          <label htmlFor="resume" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <Button type="button" variant="outline" className="mb-2 border-green text-green hover:bg-green hover:text-white">
                Upload File
              </Button>
              <span className="text-sm text-green/60">or drag and drop here</span>
            </div>
          </label>
          {formData.resume && (
            <p className="mt-2 text-sm text-green">{formData.resume.name}</p>
          )}
        </div>
      </div>

      {/* LinkedIn */}
      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-green mb-2">
          LinkedIn Profile URL<span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          id="linkedin"
          required
          value={formData.linkedinUrl}
          onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
          placeholder="Type here..."
          className="w-full px-4 py-3 border border-green/20 rounded-lg focus:outline-none focus:border-green"
        />
      </div>

      {/* Motivation */}
      <div>
        <label htmlFor="motivation" className="block text-sm font-medium text-green mb-2">
          What interested you in applying to this role?
        </label>
        <textarea
          id="motivation"
          rows={5}
          value={formData.motivation}
          onChange={(e) => setFormData({...formData, motivation: e.target.value})}
          placeholder="Type here..."
          className="w-full px-4 py-3 border border-green/20 rounded-lg focus:outline-none focus:border-green resize-none"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green hover:bg-green/90 text-white px-8 py-6 text-lg rounded-lg"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
