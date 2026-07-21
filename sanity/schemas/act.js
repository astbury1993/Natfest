export default {
  name: 'act',
  title: 'Lineup Act',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.max(1000),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'stage',
      title: 'Stage',
      type: 'string',
      options: {
        list: ['Main Stage', 'Marquee Stage'],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'performanceOrder',
      title: 'Performance Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'isHeadliner',
      title: 'Is Headliner',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'url' }],
      validation: (Rule) => Rule.max(5),
    },
  ],
}
