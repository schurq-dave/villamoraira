import { defineType, defineField } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: BlockContentIcon,
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
      title: 'Footer Name',
      type: 'string',
      description: 'Internal name for this footer',
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
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
      description: 'Short description shown in footer',
    }),
    defineField({
      name: 'columns',
      title: 'Footer Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Column Title' },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Label' },
                    { name: 'href', type: 'string', title: 'Link' },
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'href' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'contactSection',
      title: 'Contact Section',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'emailLabel', type: 'string', title: 'Email Label' },
        { name: 'phoneLabel', type: 'string', title: 'Phone Label' },
        { name: 'addressLabel', type: 'string', title: 'Address Label' },
      ],
    }),
    defineField({
      name: 'bottomBar',
      title: 'Bottom Bar',
      type: 'object',
      fields: [
        { name: 'copyright', type: 'string', title: 'Copyright Text' },
        {
          name: 'links',
          type: 'array',
          title: 'Legal Links',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string', title: 'Label' },
                { name: 'href', type: 'string', title: 'Link' },
              ],
              preview: {
                select: { title: 'label', subtitle: 'href' },
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'newsletterSection',
      title: 'Newsletter Section (optional)',
      type: 'object',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show Newsletter Signup', initialValue: false },
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        { name: 'placeholder', type: 'string', title: 'Input Placeholder' },
        { name: 'buttonText', type: 'string', title: 'Button Text' },
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
        title: title || 'Footer',
        subtitle: `${language?.toUpperCase() || 'NL'}`,
      }
    },
  },
})
