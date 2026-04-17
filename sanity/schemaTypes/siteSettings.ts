import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "contact", title: "1. Contact Info", default: true },
    { name: "social", title: "2. Social Links" },
    { name: "metrics", title: "3. Trust Metrics" },
    { name: "footer", title: "4. Footer Content" },
    { name: "navigation", title: "5. Navigation Links" },
    { name: "homepage", title: "6. Homepage" },
    { name: "services", title: "7. Services Page" },
    { name: "contactPage", title: "8. Contact Page" },
    { name: "aboutPage", title: "9. About Us Page" },
    { name: "careersPage", title: "10. Careers Page" },
  ],
  fields: [
    // ============================================================
    // CONTACT INFO - Used in footer, contact page, schema.org
    // ============================================================
    defineField({
      name: "contact",
      title: "Contact Information",
      type: "object",
      group: "contact",
      description: "Contact details shown in footer and contact page",
      fields: [
        defineField({
          name: "phone",
          title: "📞 [EDIT] Phone Number",
          type: "string",
          description: "Display format: +91 99016 66139",
        }),
        defineField({
          name: "phoneLink",
          title: "📞 [EDIT] Phone Link",
          type: "string",
          description: "Link format: tel:+919901666139 (no spaces)",
        }),
        defineField({
          name: "whatsapp",
          title: "💬 [EDIT] WhatsApp Number",
          type: "string",
          description: "Link format: https://wa.me/919901666139",
        }),
        defineField({
          name: "email",
          title: "📧 [EDIT] Email Address",
          type: "string",
          description: "e.g., divitmindspace@gmail.com",
        }),
        defineField({
          name: "address",
          title: "📍 [EDIT] Full Address",
          type: "text",
          rows: 2,
          description: "Full address for footer and contact page",
        }),
        defineField({
          name: "addressShort",
          title: "📍 [EDIT] Short Address",
          type: "string",
          description: "Short version for badges: e.g., 'Sarjapur Road, Bengaluru'",
        }),
        defineField({
          name: "mapLink",
          title: "🗺️ [EDIT] Google Maps Link",
          type: "url",
          description: "Full Google Maps URL for 'Get Directions'",
        }),
        defineField({
          name: "workingHours",
          title: "🕐 [EDIT] Working Hours",
          type: "string",
          description: "e.g., 'Monday - Saturday, 10:00 AM - 7:00 PM'",
        }),
      ],
    }),

    // ============================================================
    // SOCIAL LINKS - Footer and contact page
    // ============================================================
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      group: "social",
      description: "Social media links with icons. Drag to reorder. Upload colorful brand icons (SVG or PNG).",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "📝 Platform Name",
              type: "string",
              description: "e.g., Instagram, Facebook, LinkedIn, X (Twitter)",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "🔗 Profile URL",
              type: "url",
              description: "Full URL to your social profile",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "icon",
              title: "🎨 Icon (Color)",
              type: "image",
              description: "Upload colorful brand icon (SVG preferred, or PNG with transparent background). Recommended: 64x64px",
              options: { hotspot: false },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
              media: "icon",
            },
          },
        },
      ],
    }),

    // ============================================================
    // TRUST METRICS - Homepage and services page stats
    // ============================================================
    defineField({
      name: "metrics",
      title: "Trust Metrics",
      type: "object",
      group: "metrics",
      description: "Numbers shown on homepage and services page (100+ Families, 6+ Therapists, etc.)",
      fields: [
        defineField({
          name: "familiesCount",
          title: "👨‍👩‍👧 [EDIT] Families Served",
          type: "string",
          description: "e.g., '100+' - shown as trust metric",
        }),
        defineField({
          name: "specialistsCount",
          title: "👩‍⚕️ [EDIT] Specialists Count",
          type: "string",
          description: "e.g., '12+' - number of team members/specialists",
        }),
        defineField({
          name: "servicesCount",
          title: "🛠️ [EDIT] Services Count",
          type: "string",
          description: "e.g., '21+' - number of services offered",
        }),
        defineField({
          name: "googleRating",
          title: "⭐ [EDIT] Google Rating",
          type: "string",
          description: "e.g., '4.9 / 5' - Google review rating",
        }),
        defineField({
          name: "googleReviewsUrl",
          title: "🔗 [OPTIONAL] Google Reviews URL",
          type: "url",
          description: "Link to Google reviews page",
        }),
      ],
    }),

    // ============================================================
    // FOOTER CONTENT - Tagline and description
    // ============================================================
    defineField({
      name: "footer",
      title: "Footer Content",
      type: "object",
      group: "footer",
      description: "Content shown in the website footer",
      fields: [
        defineField({
          name: "tagline",
          title: "📝 [EDIT] Footer Tagline",
          type: "string",
          description: "Main tagline in footer, e.g., 'Bangalore's Leading Center for Mental Health, Neurodevelopment & Physiotherapy'",
        }),
        defineField({
          name: "description",
          title: "📝 [EDIT] Footer Description",
          type: "text",
          rows: 3,
          description: "Short paragraph below tagline describing Divit MindSpace",
        }),
      ],
    }),

    // ============================================================
    // NAVIGATION LINKS - Quick links in footer and header
    // ============================================================
    defineField({
      name: "navigation",
      title: "Navigation Links",
      type: "object",
      group: "navigation",
      description: "Quick links shown in footer and navigation menus",
      fields: [
        defineField({
          name: "quickLinks",
          title: "📑 [EDIT] Footer Quick Links",
          type: "array",
          description: "Links shown in footer under 'Explore' section",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", type: "string", title: "Link Label" },
                { name: "href", type: "string", title: "Link URL (e.g., /about-us)" },
              ],
              preview: {
                select: { title: "label", subtitle: "href" },
              },
            },
          ],
        }),
        defineField({
          name: "headerCtaText",
          title: "🔘 [EDIT] Header CTA Text (Desktop)",
          type: "string",
          description: "Button text in header, e.g., 'Meet Our Specialists'",
        }),
        defineField({
          name: "headerCtaMobileText",
          title: "🔘 [EDIT] Header CTA Text (Mobile)",
          type: "string",
          description: "Shorter button text for mobile, e.g., 'Get Help'",
        }),
        defineField({
          name: "headerCtaLink",
          title: "🔗 [EDIT] Header CTA Link",
          type: "string",
          description: "Link for header CTA button, e.g., '/about-us#specialists'",
        }),
        defineField({
          name: "joinTeamText",
          title: "💼 [EDIT] Join Team Button Text",
          type: "string",
          description: "Footer careers button text, e.g., 'Join Our Team'",
        }),
      ],
    }),

    // ============================================================
    // HOMEPAGE CONTENT - Hero section dynamic content
    // ============================================================
    defineField({
      name: "homepage",
      title: "Homepage Content",
      type: "object",
      group: "homepage",
      description: "Dynamic content on the homepage",
      fields: [
        defineField({
          name: "heroDescription",
          title: "📝 [EDIT] Hero Description",
          type: "text",
          rows: 3,
          description: "Main description below the hero headline",
        }),
        defineField({
          name: "rollingAudiences",
          title: "🔄 [EDIT] Rolling Audiences",
          type: "array",
          of: [{ type: "string" }],
          description: "Words that rotate: CHILD'S, TEEN'S, ADULT'S, FAMILY'S",
        }),
        defineField({
          name: "rollingSchools",
          title: "🏫 [EDIT] Rolling Schools/Venues",
          type: "array",
          of: [{ type: "string" }],
          description: "Schools/venues shown in 'Conducting awareness programs at': TISB, Jyoti Nivas College, etc.",
        }),
        defineField({
          name: "ctaPrimary",
          title: "🔘 [EDIT] Primary CTA Text",
          type: "string",
          description: "Main button text, e.g., 'Book a Free Consultation'",
        }),
        defineField({
          name: "ctaSecondary",
          title: "🔘 [EDIT] Secondary CTA Text",
          type: "string",
          description: "Secondary button text, e.g., 'Host a Free Workshop'",
        }),
        defineField({
          name: "faqTitle",
          title: "📝 [EDIT] FAQ Section Title",
          type: "string",
          description: "e.g., 'Frequently Asked Questions'",
        }),
        defineField({
          name: "faqSubtitle",
          title: "📝 [EDIT] FAQ Section Subtitle",
          type: "string",
          description: "Badge text above title, e.g., 'Common Queries'",
        }),
        defineField({
          name: "faqs",
          title: "❓ [SEO/GEO] Homepage FAQs",
          type: "array",
          description: "FAQs shown on homepage - optimized for SEO/GEO with location signals",
          of: [
            {
              type: "object",
              fields: [
                { name: "question", type: "string", title: "Question" },
                { name: "answer", type: "text", title: "Answer", rows: 3 },
              ],
              preview: {
                select: { title: "question" },
              },
            },
          ],
        }),
        defineField({
          name: "heroImage",
          title: "🖼️ [EDIT] Hero Image",
          type: "image",
          description: "Main hero image on homepage (recommended: 1200x960px)",
          options: { hotspot: true },
        }),
        defineField({
          name: "heroImageAlt",
          title: "🖼️ [EDIT] Hero Image Alt Text",
          type: "string",
          description: "Accessibility text describing the hero image",
        }),
        defineField({
          name: "missionStatement",
          title: "🎯 [EDIT] Mission Statement",
          type: "string",
          description: "e.g., 'Empowering potential through compassionate, evidence-based care.'",
        }),
        defineField({
          name: "serviceCategories",
          title: "🏷️ [EDIT] Service Category Cards",
          type: "array",
          description: "4 service category cards shown on homepage with outcomes",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string", title: "Category Title", description: "e.g., Assessments, Therapy, Guidance, Programs" },
                { name: "outcome", type: "text", title: "Outcome Text", rows: 2, description: "e.g., 'Stop guessing. Get answers...'" },
                { name: "href", type: "string", title: "Link", description: "e.g., /services?category=assessments" },
                {
                  name: "icon",
                  type: "string",
                  title: "Icon Name",
                  description: "Icon identifier: clipboard, heart, compass, graduation",
                  options: {
                    list: [
                      { title: "Clipboard (Assessments)", value: "clipboard" },
                      { title: "Heart (Therapy)", value: "heart" },
                      { title: "Compass (Guidance)", value: "compass" },
                      { title: "Graduation (Programs)", value: "graduation" },
                    ],
                  },
                },
              ],
              preview: {
                select: { title: "title", subtitle: "outcome" },
              },
            },
          ],
          validation: (rule) => rule.max(4),
        }),
        defineField({
          name: "whoNeedsItTitle",
          title: "👥 [EDIT] 'Who Needs It' Section Title",
          type: "string",
          description: "e.g., 'Here's who we're here for'",
        }),
        defineField({
          name: "whoNeedsIt",
          title: "👥 [EDIT] 'Who Needs It' Cards",
          type: "array",
          description: "Audience cards: Families, Schools, Professionals",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string", title: "Audience Title", description: "e.g., Families, Schools, Professionals" },
                { name: "description", type: "text", title: "Description", rows: 2 },
                {
                  name: "icon",
                  type: "string",
                  title: "Icon Name",
                  options: {
                    list: [
                      { title: "Users (Families)", value: "users" },
                      { title: "Building (Schools)", value: "building" },
                      { title: "Briefcase (Professionals)", value: "briefcase" },
                    ],
                  },
                },
              ],
              preview: {
                select: { title: "title", subtitle: "description" },
              },
            },
          ],
          validation: (rule) => rule.max(3),
        }),
      ],
    }),

    // ============================================================
    // SERVICES PAGE - Category descriptions for SEO
    // ============================================================
    defineField({
      name: "servicesPage",
      title: "Services Page Content",
      type: "object",
      group: "services",
      description: "Category descriptions shown on services page (SEO optimized)",
      fields: [
        defineField({
          name: "allServicesDescription",
          title: "📝 [SEO] All Services Description",
          type: "text",
          rows: 2,
          description: "Description when 'All Services' is selected",
        }),
        defineField({
          name: "assessmentsDescription",
          title: "📝 [SEO] Assessments Description",
          type: "text",
          rows: 2,
          description: "Description when 'Assessments' category is selected",
        }),
        defineField({
          name: "therapyDescription",
          title: "📝 [SEO] Therapy Description",
          type: "text",
          rows: 2,
          description: "Description when 'Therapy' category is selected",
        }),
        defineField({
          name: "guidanceDescription",
          title: "📝 [SEO] Guidance Description",
          type: "text",
          rows: 2,
          description: "Description when 'Guidance' category is selected",
        }),
        defineField({
          name: "programsDescription",
          title: "📝 [SEO] Programs Description",
          type: "text",
          rows: 2,
          description: "Description when 'Programs' category is selected",
        }),
      ],
    }),

    // ============================================================
    // CONTACT PAGE - Hero, process steps, and FAQs
    // ============================================================
    defineField({
      name: "contactPage",
      title: "Contact Page Content",
      type: "object",
      group: "contactPage",
      description: "Content shown on the Contact Us page",
      fields: [
        defineField({
          name: "heroTitle",
          title: "📝 [EDIT] Hero Title",
          type: "string",
          description: "Main headline, e.g., 'Let's Build Your'",
        }),
        defineField({
          name: "heroTitleHighlight",
          title: "📝 [EDIT] Hero Title Highlight",
          type: "string",
          description: "Italic highlighted text, e.g., 'Unique Journey'",
        }),
        defineField({
          name: "heroSubtitle",
          title: "📝 [EDIT] Hero Subtitle",
          type: "text",
          rows: 2,
          description: "Description below headline",
        }),
        defineField({
          name: "processTitle",
          title: "📝 [EDIT] Process Section Title",
          type: "string",
          description: "e.g., 'How We Support You From Day 1'",
        }),
        defineField({
          name: "processSubtitle",
          title: "📝 [EDIT] Process Section Subtitle",
          type: "text",
          rows: 2,
          description: "Description for process section",
        }),
        defineField({
          name: "processSteps",
          title: "📋 [EDIT] Process Steps",
          type: "array",
          description: "3 steps shown in the 'How We Support You' section",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string", title: "Step Title" },
                { name: "description", type: "text", title: "Step Description", rows: 2 },
              ],
              preview: {
                select: { title: "title" },
              },
            },
          ],
          validation: (rule) => rule.max(3),
        }),
        defineField({
          name: "faqTitle",
          title: "📝 [EDIT] FAQ Section Title",
          type: "string",
          description: "e.g., 'Common Questions'",
        }),
        defineField({
          name: "faqs",
          title: "❓ [SEO] Frequently Asked Questions",
          type: "array",
          description: "FAQs shown on contact page - important for SEO/GEO",
          of: [
            {
              type: "object",
              fields: [
                { name: "question", type: "string", title: "Question" },
                { name: "answer", type: "text", title: "Answer", rows: 3 },
              ],
              preview: {
                select: { title: "question" },
              },
            },
          ],
        }),
      ],
    }),

    // ============================================================
    // ABOUT US PAGE - FAQs for LLM/SEO visibility
    // ============================================================
    defineField({
      name: "aboutPage",
      title: "About Us Page Content",
      type: "object",
      group: "aboutPage",
      description: "FAQs and content shown on the About Us page",
      fields: [
        defineField({
          name: "faqs",
          title: "❓ [SEO/GEO] About Us FAQs",
          type: "array",
          description: "FAQs about Divit MindSpace, team, and approach - optimized for LLM/SEO visibility",
          of: [
            {
              type: "object",
              fields: [
                { name: "question", type: "string", title: "Question" },
                { name: "answer", type: "text", title: "Answer", rows: 3 },
              ],
              preview: {
                select: { title: "question" },
              },
            },
          ],
        }),
      ],
    }),

    // ============================================================
    // CAREERS PAGE - FAQs for job seekers
    // ============================================================
    defineField({
      name: "careersPage",
      title: "Careers Page Content",
      type: "object",
      group: "careersPage",
      description: "FAQs and content shown on the Careers page",
      fields: [
        defineField({
          name: "faqs",
          title: "❓ [SEO] Careers FAQs",
          type: "array",
          description: "FAQs for job seekers about working at Divit MindSpace",
          of: [
            {
              type: "object",
              fields: [
                { name: "question", type: "string", title: "Question" },
                { name: "answer", type: "text", title: "Answer", rows: 3 },
              ],
              preview: {
                select: { title: "question" },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Contact, Social, Metrics, Navigation & Page Content",
      };
    },
  },
});
