import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'villasPage',
  title: 'Villas Listing Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'filters', title: 'Filters & Labels' },
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
      description: 'URL path for this page',
      options: { source: 'title' },
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
        { name: 'title', type: 'string', title: 'Hero Title' },
        { name: 'subtitle', type: 'text', title: 'Subtitle', rows: 2 },
        { name: 'image', type: 'image', title: 'Hero Image', options: { hotspot: true } },
        { name: 'imageAlt', type: 'string', title: 'Image Alt Text' },
      ],
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'filterLabels',
      title: 'Filter Labels',
      type: 'object',
      group: 'filters',
      fields: [
        { name: 'allVillas', type: 'string', title: '"All Villas" Label' },
        { name: 'bedrooms', type: 'string', title: 'Bedrooms Filter Label' },
        { name: 'guests', type: 'string', title: 'Guests Filter Label' },
        { name: 'priceRange', type: 'string', title: 'Price Range Label' },
        { name: 'amenities', type: 'string', title: 'Amenities Filter Label' },
        { name: 'sortBy', type: 'string', title: 'Sort By Label' },
        { name: 'noResults', type: 'string', title: 'No Results Message' },
      ],
    }),
    defineField({
      name: 'sortOptions',
      title: 'Sort Options',
      type: 'array',
      group: 'filters',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'label', type: 'string', title: 'Label' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
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
        title: title || 'Villas Page',
        subtitle: `${language?.toUpperCase() || 'NL'}`,
      }
    },
  },
})
