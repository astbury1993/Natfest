export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'heroImageAlt',
      title: 'Hero Image Alt Text',
      type: 'string',
    },
    {
      name: 'storyHeading',
      title: 'Story Section Heading',
      type: 'string',
    },
    {
      name: 'storyContent',
      title: 'Story Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'galleryCta',
      title: 'Gallery CTA Text',
      type: 'string',
    },
    {
      name: 'historyHeading',
      title: 'History Heading',
      type: 'string',
    },
    {
      name: 'historyText',
      title: 'History Text',
      type: 'text',
    },
    {
      name: 'historyImage',
      title: 'History Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'historyImageAlt',
      title: 'History Image Alt Text',
      type: 'string',
    },
  ],
}
