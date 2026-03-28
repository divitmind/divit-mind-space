import { defineField, defineType } from "sanity";

export const newsType = defineType({
  name: "news",
  title: "News / Announcements",
  type: "document",
  groups: [
    { name: "content", title: "1. Content", default: true },
    { name: "media", title: "2. Media" },
    { name: "settings", title: "3. Settings" },
  ],
  fields: [
    // ============================================================
    // CONTENT - Main news content
    // ============================================================
    defineField({
      name: "title",
      title: "📝 [EDIT] News Title",
      type: "string",
      group: "content",
      description: "Headline for this news item",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "🔗 [AUTO] URL Slug",
      type: "slug",
      group: "content",
      description: "Auto-generated from title. Click 'Generate'.",
      options: {
        source: "title",
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "postFormat",
      title: "📂 [SELECT] News Type",
      type: "string",
      group: "content",
      description: "Choose the type of news item",
      options: {
        list: [
          { title: "Announcement (Internal)", value: "standard" },
          { title: "Press Coverage (External Link)", value: "external" },
          { title: "Event / Orientation", value: "event" },
        ],
        layout: "radio",
      },
      initialValue: "standard",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "📝 [EDIT] Brief Summary",
      type: "text",
      group: "content",
      rows: 3,
      description: "Short description for news cards (max 200 chars)",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "externalUrl",
      title: "🔗 [LINK] External URL",
      type: "url",
      group: "content",
      description: "Link to press article or event page (for external/event types)",
      hidden: ({ document }) => document?.postFormat === "standard",
    }),
    defineField({
      name: "sourceName",
      title: "📝 [EDIT] Source Name",
      type: "string",
      group: "content",
      description: "e.g., Indian Express, Times of India, School Name",
      hidden: ({ document }) => document?.postFormat === "standard",
    }),

    // ============================================================
    // MEDIA - Images
    // ============================================================
    defineField({
      name: "mainImage",
      title: "🖼️ [EDIT] Main Image",
      type: "image",
      group: "media",
      description: "📐 RECOMMENDED: 1200×630px (1.91:1 ratio). MIN: 800×420px. IMPORTANT: Click image → set HOTSPOT on faces so cropping looks good on cards.",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt Text", description: "Describe the image for accessibility" },
      ],
    }),

    // ============================================================
    // SETTINGS - Publishing options
    // ============================================================
    defineField({
      name: "publishedAt",
      title: "📅 [EDIT] Published Date",
      type: "datetime",
      group: "settings",
      description: "When this news was published",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "⭐ [TOGGLE] Featured News",
      type: "boolean",
      group: "settings",
      description: "Show at top of news page",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "publishedAt",
      media: "mainImage",
      featured: "featured",
    },
    prepare({ title, date, media, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: date ? new Date(date).toLocaleDateString() : "No date",
        media,
      };
    },
  },
});
