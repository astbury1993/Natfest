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
      name: 'announcementRich',
      title: 'Announcement Text',
      type: 'array',
      description:
        'Press Enter for a new line. To add a link, highlight the text and click the link icon in the toolbar.',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    description: 'A full link (https://…), a site page (/tickets), mailto: or tel:',
                    validation: (Rule) =>
                      Rule.required().uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      // Replaced by announcementRich (supports links). Kept so the site can fall back to it,
      // and hidden once the new field has content.
      name: 'announcement',
      title: 'Announcement Text (old, plain text)',
      type: 'text',
      rows: 3,
      description: 'Replaced by "Announcement Text" above. Only used if that field is empty.',
      hidden: ({ document }) => Boolean(document?.announcementRich?.length),
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
