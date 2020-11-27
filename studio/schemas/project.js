import { baseLanguage } from '../contentTypes/localeText';

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'active',
      title: 'Active (Do you wanna display this project on your website?)',
      type: 'boolean',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'client',
      title: 'Client',
      type: 'localeString',
    },
    {
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeBlock',
    },
  ],

  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
