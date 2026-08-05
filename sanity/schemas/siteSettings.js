export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
      description: 'The countdown timer target date. Leave empty to show the fallback message instead.',
    },
    {
      name: 'countdownLabel',
      title: 'Countdown Label',
      type: 'string',
      description: 'Text shown above the countdown (e.g. "Natfest 2027"). Also used as the fallback message if no event date is set.',
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
