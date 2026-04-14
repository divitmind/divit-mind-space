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
    { name: "homepage", title: "5. Homepage" },
    { name: "services", title: "6. Services Page" },
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
      name: "social",
      title: "Social Media Links",
      type: "object",
      group: "social",
      description: "Social media profile URLs",
      fields: [
        defineField({
          name: "instagram",
          title: "📸 [EDIT] Instagram URL",
          type: "url",
          description: "e.g., https://instagram.com/divitmindspace",
        }),
        defineField({
          name: "facebook",
          title: "📘 [EDIT] Facebook URL",
          type: "url",
          description: "e.g., https://facebook.com/divitmindspace",
        }),
        defineField({
          name: "linkedin",
          title: "💼 [EDIT] LinkedIn URL",
          type: "url",
          description: "e.g., https://linkedin.com/in/divitmindspace",
        }),
        defineField({
          name: "twitter",
          title: "🐦 [EDIT] X (Twitter) URL",
          type: "url",
          description: "e.g., https://x.com/divitmindspace",
        }),
        defineField({
          name: "youtube",
          title: "📺 [OPTIONAL] YouTube URL",
          type: "url",
          description: "YouTube channel URL (if any)",
        }),
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
          name: "therapistsCount",
          title: "👩‍⚕️ [EDIT] Therapists/Specialists",
          type: "string",
          description: "e.g., '6+' - number of team members",
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
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Contact, Social, Metrics & Content",
      };
    },
  },
});
