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
