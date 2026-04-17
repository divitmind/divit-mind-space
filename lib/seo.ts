// Canonical identifiers for cross-page JSON-LD references. Keep these stable —
// changing a URL after it has been indexed can invalidate entity links.

export const SITE_URL = "https://divitmindspace.com";

// Canonical @id for the root Organization/MedicalBusiness schema injected in app/layout.tsx.
// Other pages reference this via { "@id": ORGANIZATION_ID } so crawlers + LLMs see one entity.
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const ORGANIZATION_REF = { "@id": ORGANIZATION_ID };

// Canonical WebSite @id — WebSite schema on homepage; other pages' `isPartOf`
// should reference this so Google sees one site entity across all pages.
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const WEBSITE_REF = { "@id": WEBSITE_ID };

// Consistent language identifier for all content. Matches the <html lang> tag.
export const SITE_LANGUAGE = "en-IN";

// YMYL (Your Money or Your Life) medical-content review metadata.
// Google explicitly rewards healthcare content that shows who reviewed it and when.
// Update MEDICAL_CONTENT_LAST_REVIEWED each time a major content refresh ships;
// MEDICAL_CONTENT_REVIEWER is the default attribution for condition/service/HowTo
// pages. Individual pages can override by passing their own `reviewedBy`.
export const MEDICAL_CONTENT_LAST_REVIEWED = "2026-04-18";

export const MEDICAL_CONTENT_REVIEWER = {
  "@type": "Person" as const,
  name: "Dr. Pavithra Lakshmi Narasimhan",
  // Credentials first — E-E-A-T signal for YMYL content. Matches exactly what's
  // on her specialist profile page so Google can reconcile entities.
  jobTitle:
    "PhD · Clinical Psychologist · Child & Adolescent Behaviour Intervention Specialist · Certified Art Therapist · SEN (UK certified)",
  url: `${SITE_URL}/specialists/pavithra-lakshmi-narasimhan`,
  // Explicit credentials array — Google's YMYL healthcare signal prefers this
  // over free-text jobTitle alone.
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "Degree", name: "PhD in Clinical Psychology" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "Certification", name: "Certified Art Therapist" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "Certification", name: "Special Educational Needs (SEN) — UK Certified" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "Specialization", name: "Child & Adolescent Behaviour Intervention" },
  ],
};

export const MEDICAL_CONTENT_REVIEW_BLOCK = {
  lastReviewed: MEDICAL_CONTENT_LAST_REVIEWED,
  reviewedBy: MEDICAL_CONTENT_REVIEWER,
};

// Plain object used by the visible UI badge + author card. Kept separate from the
// schema block above so we can include the photo + slug (schema just needs name/url).
export const MEDICAL_CONTENT_REVIEWER_UI = {
  name: "Dr. Pavithra Lakshmi Narasimhan",
  title: "PhD · Clinical Psychologist · Certified Art Therapist · SEN (UK Certified)",
  slug: "pavithra-lakshmi-narasimhan",
};
