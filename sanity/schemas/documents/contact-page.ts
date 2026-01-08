import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'
import { isUniqueSlugPerLanguage } from '../utils/isUniqueSlugPerLanguage'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'form', title: 'Form Settings' },
    { name: 'map', title: 'Map Section' },
    { name: 'faq', title: 'FAQ' },
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
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information Labels',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'phoneLabel', type: 'string', title: 'Phone Label' },
        { name: 'emailLabel', type: 'string', title: 'Email Label' },
        { name: 'locationLabel', type: 'string', title: 'Location Label' },
      ],
    }),
    defineField({
      name: 'mapSection',
      title: 'Map Section',
      type: 'object',
      group: 'map',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        {
          name: 'placeholder',
          type: 'object',
          title: 'Placeholder Content',
          fields: [
            { name: 'title', type: 'string', title: 'Placeholder Title' },
            { name: 'description', type: 'text', title: 'Placeholder Description', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ Section',
      type: 'array',
      group: 'faq',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer', rows: 3 },
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),
    defineField({
      name: 'formLabels',
      title: 'Form Labels & Placeholders',
      type: 'object',
      group: 'form',
      fields: [
        { name: 'nameLabel', type: 'string', title: 'Name Field Label' },
        { name: 'namePlaceholder', type: 'string', title: 'Name Field Placeholder' },
        { name: 'emailLabel', type: 'string', title: 'Email Field Label' },
        { name: 'emailPlaceholder', type: 'string', title: 'Email Field Placeholder' },
        { name: 'phoneLabel', type: 'string', title: 'Phone Field Label' },
        { name: 'phonePlaceholder', type: 'string', title: 'Phone Field Placeholder' },
        { name: 'messageLabel', type: 'string', title: 'Message Field Label' },
        { name: 'messagePlaceholder', type: 'string', title: 'Message Field Placeholder' },
        { name: 'submitButton', type: 'string', title: 'Submit Button Text' },
        { name: 'successMessage', type: 'text', title: 'Success Message', rows: 2 },
        { name: 'errorMessage', type: 'text', title: 'Error Message', rows: 2 },
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
        title: title || 'Contact Page',
        subtitle: `${language?.toUpperCase() || 'NL'}`,
      }
    },
  },
})
