import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { isUniqueSlugPerLanguage } from '../utils/isUniqueSlugPerLanguage'

export default defineType({
  name: 'villa',
  title: 'Villa',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'details', title: 'Details' },
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
    // SEO
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO & Metadata',
      group: 'seo',
    }),
    // Content
    defineField({
      name: 'name',
      title: 'Villa Name',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'URL-friendly identifier. The language prefix will be added automatically.',
      options: { source: 'name', isUnique: isUniqueSlugPerLanguage },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Brief description for cards and previews',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'portableText',
      group: 'content',
      description: 'Detailed description with rich text',
    }),
    // Media
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
      ],
    }),
    // Details
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      group: 'details',
      fields: [
        { name: 'address', type: 'string', title: 'Address/Area' },
        { name: 'city', type: 'string', title: 'City' },
        {
          name: 'coordinates',
          type: 'object',
          title: 'Coordinates',
          fields: [
            { name: 'lat', type: 'number', title: 'Latitude' },
            { name: 'lng', type: 'number', title: 'Longitude' },
          ],
        },
      ],
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      group: 'details',
      fields: [
        { name: 'perWeek', type: 'number', title: 'Price per Week' },
        { name: 'perNight', type: 'number', title: 'Price per Night' },
        {
          name: 'currency',
          type: 'string',
          title: 'Currency',
          options: { list: ['EUR', 'USD', 'GBP'] },
          initialValue: 'EUR',
        },
        { name: 'cleaningFee', type: 'number', title: 'Cleaning Fee' },
        { name: 'securityDeposit', type: 'number', title: 'Security Deposit' },
      ],
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'object',
      group: 'details',
      fields: [
        { name: 'guests', type: 'number', title: 'Max Guests' },
        { name: 'bedrooms', type: 'number', title: 'Bedrooms' },
        { name: 'bathrooms', type: 'number', title: 'Bathrooms' },
      ],
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'object',
      group: 'details',
      fields: [
        { name: 'average', type: 'number', title: 'Average Rating' },
        { name: 'count', type: 'number', title: 'Number of Reviews' },
      ],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      group: 'details',
      of: [{ type: 'reference', to: [{ type: 'amenity' }] }],
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string', title: 'Icon Name' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'icon' },
          },
        },
      ],
    }),
    defineField({
      name: 'houseRules',
      title: 'House Rules',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'details',
      initialValue: false,
    }),
    defineField({
      name: 'availability',
      title: 'Availability Status',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Booked', value: 'booked' },
          { title: 'Maintenance', value: 'maintenance' },
        ],
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'details',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location.city',
      media: 'mainImage',
      language: 'language',
    },
    prepare({ title, subtitle, media, language }) {
      return {
        title,
        subtitle: `${language?.toUpperCase() || 'NL'} - ${subtitle || ''}`,
        media,
      }
    },
  },
})
