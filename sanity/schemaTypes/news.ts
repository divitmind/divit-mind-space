import { defineField, defineType } from "sanity";
import { ImageWithPreview } from "../components/ImageWithPreview";

export const newsType = defineType({
  name: "news",
  title: "News / Announcements",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "[REQUIRED] News Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "[AUTO] Slug",
      type: "slug",
      options: {
        source: "title",
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "[REQUIRED] Published Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "postFormat",
      title: "[REQUIRED] News Format",
      type: "string",
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
      title: "[REQUIRED] Brief Summary",
      type: "text",
      rows: 3,
      description: "A short hook for the news card",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      description:
        "📐 RECOMMENDED: 1200×630px (1.91:1 ratio) for best display. Use hotspot on faces/key areas.",
      options: { hotspot: true },
      components: {
        input: ImageWithPreview,
      },
    }),
    defineField({
      name: "externalUrl",
      title: "[LINK] External URL",
      type: "url",
      description: "The full link to the press article or event page",
      hidden: ({ document }) => document?.postFormat === "standard",
    }),
    defineField({
      name: "sourceName",
      title: "Source Name",
      type: "string",
      description: "e.g., Indian Express, School Name",
      hidden: ({ document }) => document?.postFormat === "standard",
    }),
    defineField({
      name: "featured",
      title: "Featured News",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "publishedAt",
      media: "mainImage",
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : "No date",
        media,
      };
    },
  },
});
