export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
    },
    {
      name: 'lorosLetterIntro',
      title: 'LOROS Letter Intro',
      type: 'text',
    },
    {
      name: 'lorosLetterFull',
      title: 'LOROS Letter Full',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'vendorCategories',
      title: 'Vendor Categories',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
}
