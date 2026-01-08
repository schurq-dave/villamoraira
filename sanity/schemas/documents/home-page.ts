import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { isUniqueSlugPerLanguage } from '../utils/isUniqueSlugPerLanguage'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero Section', default: true },
    { name: 'featured', title: 'Featured Villas' },
    { name: 'features', title: 'Features' },
    { name: 'moraira', title: 'Moraira Section' },
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
      title: 'Page Title (Internal)',
      type: 'string',
      description: 'Internal title for this page version',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path for this language version (leave empty for root "/")',
      options: { source: 'title', isUnique: isUniqueSlugPerLanguage },
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO & Metadata',
      group: 'seo',
    }),
    // Hero Section
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'image', type: 'image', title: 'Background Image', options: { hotspot: true } },
        { name: 'imageAlt', type: 'string', title: 'Image Alt Text' },
        { name: 'ctaText', type: 'string', title: 'CTA Button Text' },
        { name: 'ctaLink', type: 'string', title: 'CTA Button Link' },
      ],
    }),
    // Featured Villas Section
    defineField({
      name: 'featuredVillas',
      title: 'Featured Villas Section',
      type: 'object',
      group: 'featured',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Section Description', rows: 2 },
        { name: 'viewAllText', type: 'string', title: 'View All Button Text' },
        { name: 'viewAllLink', type: 'string', title: 'View All Link' },
      ],
    }),
    // Features Section
    defineField({
      name: 'features',
      title: 'Features Section',
      type: 'object',
      group: 'features',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Section Description', rows: 2 },
        {
          name: 'items',
          type: 'array',
          title: 'Feature Items',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', type: 'string', title: 'Icon Name' },
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
    // Moraira Section
    defineField({
      name: 'morairaSection',
      title: 'Moraira Section',
      type: 'object',
      group: 'moraira',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        {
          name: 'bulletPoints',
          type: 'array',
          title: 'Bullet Points',
          of: [{ type: 'string' }],
        },
        { name: 'ctaText', type: 'string', title: 'CTA Button Text' },
        { name: 'ctaLink', type: 'string', title: 'CTA Button Link' },
        { name: 'image', type: 'image', title: 'Section Image', options: { hotspot: true } },
        { name: 'imageAlt', type: 'string', title: 'Image Alt Text' },
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
        title: title || 'Home Page',
        subtitle: `${language?.toUpperCase() || 'NL'} - Home Page`,
      }
    },
  },
})
