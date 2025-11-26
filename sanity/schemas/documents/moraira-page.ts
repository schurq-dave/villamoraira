import { defineField, defineType } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'

export default defineType({
  name: 'morairaPage',
  title: 'Moraira Destination Page',
  type: 'document',
  icon: EarthGlobeIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'attractions', title: 'Attractions' },
    { name: 'activities', title: 'Activities' },
    { name: 'dining', title: 'Dining' },
    { name: 'transport', title: 'Transportation' },
    { name: 'cta', title: 'CTA' },
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
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'image', type: 'image', title: 'Hero Image', options: { hotspot: true } },
        { name: 'imageAlt', type: 'string', title: 'Image Alt Text' },
      ],
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        {
          name: 'paragraphs',
          type: 'array',
          title: 'Paragraphs',
          of: [{ type: 'text', rows: 3 }],
        },
        {
          name: 'stats',
          type: 'array',
          title: 'Statistics',
          of: [
            {
              type: 'object',
              fields: [
                { 
                  name: 'icon', 
                  type: 'string', 
                  title: 'Icon',
                  options: {
                    list: [
                      { title: 'Sun', value: 'sun' },
                      { title: 'Users', value: 'users' },
                    ],
                  },
                },
                { name: 'label', type: 'string', title: 'Label' },
              ],
            },
          ],
        },
        { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
        { name: 'imageAlt', type: 'string', title: 'Image Alt Text' },
      ],
    }),
    defineField({
      name: 'attractions',
      title: 'Attractions Section',
      type: 'object',
      group: 'attractions',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        {
          name: 'items',
          type: 'array',
          title: 'Attractions',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'description', type: 'text', title: 'Description', rows: 3 },
                { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
                { name: 'imageAlt', type: 'string', title: 'Image Alt Text' },
                { 
                  name: 'icon', 
                  type: 'string', 
                  title: 'Icon',
                  options: {
                    list: [
                      { title: 'Waves', value: 'waves' },
                      { title: 'Mountain', value: 'mountain' },
                      { title: 'Camera', value: 'camera' },
                    ],
                  },
                },
                { name: 'distance', type: 'string', title: 'Distance' },
                { name: 'badge', type: 'string', title: 'Badge Text (optional)' },
              ],
              preview: {
                select: { title: 'title', subtitle: 'distance', media: 'image' },
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'activities',
      title: 'Activities Section',
      type: 'object',
      group: 'activities',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        {
          name: 'water',
          type: 'object',
          title: 'Water Activities',
          fields: [
            { name: 'title', type: 'string', title: 'Subsection Title' },
            {
              name: 'items',
              type: 'array',
              title: 'Activities',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', type: 'string', title: 'Activity Title' },
                    { name: 'description', type: 'text', title: 'Description', rows: 2 },
                  ],
                  preview: { select: { title: 'title' } },
                },
              ],
            },
          ],
        },
        {
          name: 'land',
          type: 'object',
          title: 'Land Activities',
          fields: [
            { name: 'title', type: 'string', title: 'Subsection Title' },
            {
              name: 'items',
              type: 'array',
              title: 'Activities',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', type: 'string', title: 'Activity Title' },
                    { name: 'description', type: 'text', title: 'Description', rows: 2 },
                  ],
                  preview: { select: { title: 'title' } },
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'dining',
      title: 'Dining Section',
      type: 'object',
      group: 'dining',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        {
          name: 'options',
          type: 'array',
          title: 'Dining Options',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'description', type: 'text', title: 'Description', rows: 2 },
              ],
              preview: { select: { title: 'title' } },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'transportation',
      title: 'Transportation Section',
      type: 'object',
      group: 'transport',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        {
          name: 'flight',
          type: 'object',
          title: 'By Plane',
          fields: [
            { name: 'title', type: 'string', title: 'Subsection Title' },
            {
              name: 'options',
              type: 'array',
              title: 'Options',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', type: 'string', title: 'Title' },
                    { name: 'duration', type: 'string', title: 'Duration' },
                    { name: 'description', type: 'text', title: 'Description', rows: 2 },
                  ],
                  preview: { select: { title: 'title', subtitle: 'duration' } },
                },
              ],
            },
          ],
        },
        {
          name: 'car',
          type: 'object',
          title: 'By Car',
          fields: [
            { name: 'title', type: 'string', title: 'Subsection Title' },
            {
              name: 'options',
              type: 'array',
              title: 'Options',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', type: 'string', title: 'Title' },
                    { name: 'duration', type: 'string', title: 'Duration' },
                    { name: 'description', type: 'text', title: 'Description', rows: 2 },
                  ],
                  preview: { select: { title: 'title', subtitle: 'duration' } },
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Section',
      type: 'object',
      group: 'cta',
      fields: [
        { name: 'title', type: 'string', title: 'CTA Title' },
        { name: 'description', type: 'text', title: 'CTA Description', rows: 2 },
        {
          name: 'buttons',
          type: 'array',
          title: 'Buttons',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string', title: 'Button Label' },
                { name: 'href', type: 'string', title: 'Button Link' },
                { 
                  name: 'variant', 
                  type: 'string', 
                  title: 'Button Variant',
                  options: {
                    list: [
                      { title: 'Primary', value: 'primary' },
                      { title: 'Secondary', value: 'secondary' },
                    ],
                  },
                },
              ],
              preview: { select: { title: 'label', subtitle: 'href' } },
            },
          ],
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
        title: title || 'Moraira Page',
        subtitle: `${language?.toUpperCase() || 'NL'}`,
      }
    },
  },
})
