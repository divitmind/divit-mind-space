import { defineField, defineType } from "sanity";

export const contactType = defineType({
  name: "contact",
  title: "Contact Us Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Hero Title",
      type: "string",
      initialValue: "Get in touch with Divit MindSpace",
    }),
    defineField({
      name: "description",
      title: "Hero Description",
      type: "text",
      rows: 3,
      initialValue: "Whether you're curious about our services, ready to book an assessment, or need guidance — our experts in Bangalore are here to help.",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      initialValue: "Bangalore, Karnataka, India",
    }),
    defineField({
      name: "emails",
      title: "Contact Emails",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "phones",
      title: "Contact Phones",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "workingHours",
      title: "Working Hours",
      type: "string",
      initialValue: "Mon - Sat: 10:00 AM - 6:00 PM",
    }),
  ],
});
