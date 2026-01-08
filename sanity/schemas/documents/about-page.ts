import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'
import { isUniqueSlugPerLanguage } from '../utils/isUniqueSlugPerLanguage'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: UsersIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'values', title: 'Values' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'cta', title: 'CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Language field (managed by document-internationalization plugin)
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'URL path (e.g., "over-ons" for NL, "about-us" for EN)',
      options: { source: 'title', isUnique: isUniqueSlugPerLanguage },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO & Metadata',
      group: 'seo',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'badge', type: 'string', title: 'Badge Text' },
        { name: 'title', type: 'string', title: 'Hero Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'image', type: 'image', title: 'Hero Image', options: { hotspot: true } },
        { name: 'imageAlt', type: 'string', title: 'Image Alt Text' },
      ],
    }),
    defineField({
      name: 'story',
      title: 'Our Story Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        {
          name: 'paragraphs',
          type: 'array',
          title: 'Story Paragraphs',
          of: [{ type: 'text', rows: 3 }],
        },
        { name: 'image', type: 'image', title: 'Story Image', options: { hotspot: true } },
        { name: 'imageAlt', type: 'string', title: 'Image Alt Text' },
        { name: 'ctaText', type: 'string', title: 'CTA Button Text' },
        { name: 'ctaLink', type: 'string', title: 'CTA Link' },
      ],
    }),
    defineField({
      name: 'values',
      title: 'Our Values Section',
      type: 'object',
      group: 'values',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        {
          name: 'items',
          type: 'array',
          title: 'Values',
          of: [
            {
              type: 'object',
              fields: [
                { 
                  name: 'icon', 
                  type: 'string', 
                  title: 'Icon Name',
                  options: {
                    list: [
                      { title: 'Heart', value: 'heart' },
                      { title: 'Home', value: 'home' },
                      { title: 'Users', value: 'users' },
                      { title: 'Star', value: 'star' },
                    ],
                  },
                },
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'description', type: 'text', title: 'Description', rows: 2 },
              ],
              preview: {
                select: { title: 'title', subtitle: 'icon' },
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      group: 'testimonials',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        {
          name: 'items',
          type: 'array',
          title: 'Testimonials',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', type: 'string', title: 'Guest Name' },
                { name: 'date', type: 'string', title: 'Date' },
                { name: 'rating', type: 'number', title: 'Rating', validation: (Rule) => Rule.min(1).max(5) },
                { name: 'text', type: 'text', title: 'Testimonial Text', rows: 3 },
              ],
              preview: {
                select: { title: 'name', subtitle: 'date' },
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Section',
      type: 'object',
      group: 'cta',
      fields: [
        { name: 'title', type: 'string', title: 'CTA Title' },
        { name: 'description', type: 'text', title: 'CTA Description', rows: 2 },
        {
          name: 'buttons',
          type: 'array',
          title: 'Buttons',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string', title: 'Button Label' },
                { name: 'href', type: 'string', title: 'Button Link' },
                { 
                  name: 'variant', 
                  type: 'string', 
                  title: 'Button Variant',
                  options: {
                    list: [
                      { title: 'Primary', value: 'primary' },
                      { title: 'Secondary', value: 'secondary' },
                      { title: 'Outline', value: 'outline' },
                    ],
                  },
                },
              ],
              preview: {
                select: { title: 'label', subtitle: 'href' },
              },
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare({ title, language }) {
      return {
        title: title || 'About Page',
        subtitle: `${language?.toUpperCase() || 'NL'}`,
      }
    },
  },
})
