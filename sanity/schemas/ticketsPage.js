export default {
  name: 'ticketsPage',
  title: 'Tickets Page',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Page Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'announcement',
      title: 'Announcement Text',
      type: 'string',
    },
    {
      name: 'eventDate',
      title: 'Event Date',
      type: 'string',
    },
    {
      name: 'eventTime',
      title: 'Event Time',
      type: 'string',
    },
    {
      name: 'eventLocation',
      title: 'Event Location',
      type: 'string',
    },
    {
      name: 'includes',
      title: "What's Included",
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'pricing',
      title: 'Pricing',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'price', title: 'Price', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    },
    {
      name: 'notice',
      title: 'Notice Text',
      type: 'string',
    },
  ],
}
