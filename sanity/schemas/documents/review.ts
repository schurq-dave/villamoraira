import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Guest Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Guest Location',
      type: 'string',
      description: 'e.g., "London, UK"',
    }),
    defineField({
      name: 'date',
      title: 'Review Date',
      type: 'string',
      description: 'e.g., "August 2024"',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Guest Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'villa',
      title: 'Villa',
      type: 'reference',
      to: [{ type: 'villa' }],
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
      description: 'Only approved reviews are shown on the website',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'rating',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `Rating: ${subtitle}/5`,
        media,
      }
    },
  },
})
