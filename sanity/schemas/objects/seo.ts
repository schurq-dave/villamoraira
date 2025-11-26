import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO & Metadata',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      name: 'metaTitle',
      type: 'string',
      title: 'Meta Title',
      description: 'Custom title for search engines (50-60 characters)',
      validation: (Rule) => Rule.max(60).warning('Meta titles should be 50-60 characters'),
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      description: 'Description for search results (150-160 characters)',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Meta descriptions should be 150-160 characters'),
    }),
    defineField({
      name: 'keywords',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Focus Keywords',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      title: 'Social Share Image',
      description: 'Image for social media sharing (1200x630px recommended)',
      options: { hotspot: true },
    }),
  ],
})
