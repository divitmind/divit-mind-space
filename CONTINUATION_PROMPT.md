# Divit MindSpace - Continuation Prompt

Use this prompt to continue working on the Divit MindSpace website with full context.

---

## Project Overview

**Divit MindSpace** is a child development therapy center website built with:
- **Next.js 14** (App Router)
- **Sanity CMS** (partially - being migrated to hardcoded data)
- **Tailwind CSS** with custom color palette
- **Framer Motion** for animations
- **TypeScript**

### Design System: "Linen & Ink"
- Premium, editorial aesthetic
- Primary colors: `green` (#2F3E33), `cream` (#FAF9F5), `purple`, `yellow`
- Font: Cormorant Garamond for headings
- Consistent spacing rhythm using `mt-4` (16px)

---

## Recent Work Completed

### 1. Services Page - Fully Independent from Sanity
- **File:** `lib/services-data.ts` - Single source of truth for 11 services
- **Categories:** Assessments (2), Therapy (4), Guidance (2), Programs (3)
- **Structure:** Each service has WIIFM content:
  - `overview` - paragraph description
  - `benefits` - 5 bullet points (What You'll Gain)
  - `whatToExpect` - 5 numbered steps
  - `whoIsItFor` - 5 bullet points (Is This Right for Your Child?)
  - `duration` and `format` info

**Services List:**
1. Psychometric Assessments
2. Psychoeducational Assessments
3. Speech Therapy
4. Occupational Therapy
5. Behavioral Therapy
6. Group Therapy Sessions
7. Counselling (Teenagers & Adults)
8. Training Program (Shadow Teacher Training)
9. Early Intervention Program
10. Special Education & Remedial Sessions
11. School Readiness Program

### 2. Navigation Updates
- **Top-right button:** Changed from "Free Support" (WhatsApp) → "Meet Our Specialists" (links to `/about-us#specialists`)
- **Services dropdown:** Now uses hardcoded data, shows first 6 services
- **Nav font size:** Increased from 13px → 14px (`text-sm`)

### 3. About Us Page
- Renamed "Consultants" → "Our Specialists"
- Section ID: `#specialists` for anchor linking

### 4. WIIFM Framework Applied
Pages redesigned with "What's In It For Me" approach:
- Hero with real photos, stats, CTA
- Benefit-focused sections
- Clear calls to action (WhatsApp consultation)

---

## Key Files

| File | Purpose |
|------|---------|
| `lib/services-data.ts` | Hardcoded services data (11 services) |
| `components/services/services-page.tsx` | Services listing with category tabs |
| `app/(root)/services/[slug]/page.tsx` | Service detail page |
| `components/main-nav.tsx` | Navigation with services dropdown |
| `components/site-header.tsx` | Header with "Meet Our Specialists" button |
| `components/about-us/founders-specialists-section.tsx` | Specialists section |

---

## Current State

- **Branch:** `rikk_march`
- **Services:** Fully independent from Sanity (hardcoded in `lib/services-data.ts`)
- **Images:** Using existing images from `/features-service-card/` and `/about_pic*.png`
- **Nav dropdown:** Working with hardcoded services

---

## Pending/Future Work

1. **Service images:** Currently reusing existing images - could add dedicated service images
2. **Mobile nav:** May need similar update to use hardcoded services
3. **Other pages using Sanity:** Blog, News, Careers, Gallery still use Sanity
4. **SEO:** Service pages have basic meta, could enhance structured data

---

## How to Continue

Start your prompt with:

```
I'm continuing work on the Divit MindSpace website.

Context:
- Next.js 14 + Tailwind + Sanity (partially migrated)
- Services are now hardcoded in lib/services-data.ts (11 services)
- Using WIIFM framework and "Linen & Ink" premium aesthetic
- Branch: rikk_march

Recent changes:
- Services listing/detail pages independent from Sanity
- Nav dropdown uses hardcoded services
- "Meet Our Specialists" replaces "Free Support" in header

[YOUR REQUEST HERE]
```

---

## Git Author
- **Name:** rikk-awal
- **Email:** rikk.haq@gmail.com
- **Co-author:** Claude Opus 4.5 <noreply@anthropic.com>
