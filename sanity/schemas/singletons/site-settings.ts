import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'
import { isUniqueSlugPerLanguage } from '../utils/isUniqueSlugPerLanguage'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'social', title: 'Social Media' },
    { name: 'seo', title: 'Default SEO' },
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
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      description: 'URL identifier for this language version',
      options: { source: 'siteName', isUnique: isUniqueSlugPerLanguage },
    }),
    defineField({
      name: 'siteTagline',
      title: 'Site Tagline',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'general',
    }),
    // Contact
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'whatsapp', type: 'string', title: 'WhatsApp' },
        { name: 'address', type: 'text', title: 'Address', rows: 3 },
      ],
    }),
    // Social Media
    defineField({
      name: 'social',
      title: 'Social Media',
      type: 'object',
      group: 'social',
      fields: [
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'twitter', type: 'url', title: 'Twitter/X' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
      ],
    }),
    // Default SEO
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Default Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Default Meta Description', rows: 3 },
        { name: 'keywords', type: 'array', of: [{ type: 'string' }], title: 'Default Keywords', options: { layout: 'tags' } },
        { name: 'ogImage', type: 'image', title: 'Default Social Share Image', options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      language: 'language',
    },
    prepare({ title, language }) {
      return {
        title: title || 'Site Settings',
        subtitle: `${language?.toUpperCase() || 'NL'} - Settings`,
      }
    },
  },
})
