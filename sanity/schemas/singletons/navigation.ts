import { defineType, defineField } from 'sanity'
import { MenuIcon } from '@sanity/icons'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
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
      title: 'Navigation Name',
      type: 'string',
      description: 'Internal name for this navigation',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL identifier for this language version',
      options: { source: 'title' },
    }),
    defineField({
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'Link', description: 'URL path (e.g., /villas, /contact)' },
            {
              name: 'children',
              type: 'array',
              title: 'Dropdown Items (optional)',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Label' },
                    { name: 'href', type: 'string', title: 'Link' },
                    { name: 'description', type: 'string', title: 'Description (optional)' },
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'href' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button (optional)',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'href', type: 'string', title: 'Link' },
      ],
    }),
    defineField({
      name: 'languageLabels',
      title: 'Language Switcher Labels',
      type: 'object',
      fields: [
        { name: 'nl', type: 'string', title: 'Nederlands Label', initialValue: 'Nederlands' },
        { name: 'en', type: 'string', title: 'English Label', initialValue: 'English' },
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
        title: title || 'Navigation',
        subtitle: `${language?.toUpperCase() || 'NL'}`,
      }
    },
  },
})
