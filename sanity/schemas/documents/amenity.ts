import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export default defineType({
  name: 'amenity',
  title: 'Amenity',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name from Lucide icons (e.g., wifi, car, waves)',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Kitchen', value: 'kitchen' },
          { title: 'Bathroom', value: 'bathroom' },
          { title: 'Bedroom', value: 'bedroom' },
          { title: 'Outdoor', value: 'outdoor' },
          { title: 'Entertainment', value: 'entertainment' },
          { title: 'Safety', value: 'safety' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
  },
})
