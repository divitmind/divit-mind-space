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
  name: "Dr. Debarati Basak",
  jobTitle: "Founder & Clinical Psychologist, Divit MindSpace",
  url: `${SITE_URL}/specialists/debarati-basak`,
};

export const MEDICAL_CONTENT_REVIEW_BLOCK = {
  lastReviewed: MEDICAL_CONTENT_LAST_REVIEWED,
  reviewedBy: MEDICAL_CONTENT_REVIEWER,
};
