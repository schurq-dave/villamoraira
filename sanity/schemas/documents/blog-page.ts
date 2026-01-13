import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { isUniqueSlugPerLanguage } from '../utils/isUniqueSlugPerLanguage'

export default defineType({
  name: 'blogPage',
  title: 'Blog Page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path for this language version (e.g. "blog")',
      options: { source: 'title', isUnique: isUniqueSlugPerLanguage },
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
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'description', type: 'portableText', title: 'Description' },
      ],
    }),
    defineField({
      name: 'featuredSection',
      title: 'Featured Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'string', title: 'Description' },
      ],
    }),
    defineField({
      name: 'latestSection',
      title: 'Latest Posts Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'string', title: 'Description' },
      ],
    }),
    defineField({
      name: 'categoriesSection',
      title: 'Categories Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'string', title: 'Description' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', language: 'language' },
    prepare({ title, language }) {
      return {
        title: title || 'Blog Page',
        subtitle: `${language?.toUpperCase() || 'NL'} - Blog Page`,
      }
    },
  },
})


