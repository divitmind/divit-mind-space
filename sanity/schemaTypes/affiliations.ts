import { defineField, defineType } from "sanity";

export const affiliationsType = defineType({
  name: "affiliations",
  title: "Affiliations Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Strategic Partnerships",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      initialValue: "Divit Health x GD Goenka Healthcare Academy",
    }),
    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Partner Name", type: "string" },
            { name: "logo", title: "Partner Logo", type: "image", options: { hotspot: true } },
            { name: "description", title: "Description", type: "text", rows: 3 },
            { name: "link", title: "Website Link", type: "url" },
          ],
        },
      ],
    }),
  ],
});
