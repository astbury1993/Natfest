export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fieldsets: [
    {
      name: 'siteBanner',
      title: 'Site Banner',
      description:
        'Announcement strip above the header on every page, plus an optional promo card on the homepage below the countdown (e.g. Black Friday tickets). "Show banner" and "Show until" control both.',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    {
      name: 'bannerEnabled',
      title: 'Show banner',
      type: 'boolean',
      fieldset: 'siteBanner',
      initialValue: false,
      description: 'Turn off to hide the banner straight away.',
    },
    {
      name: 'bannerText',
      title: 'Banner text',
      type: 'string',
      fieldset: 'siteBanner',
      validation: (Rule) =>
        Rule.max(150).custom((text, context) =>
          context.document?.bannerEnabled && !text ? 'Add banner text or turn the banner off' : true
        ),
    },
    {
      name: 'bannerEndDate',
      title: 'Show until',
      type: 'datetime',
      fieldset: 'siteBanner',
      description: 'The banner and promo card disappear automatically at this time (UK time). Leave empty to show them until you turn the banner off.',
    },
    {
      name: 'promoEyebrow',
      title: 'Promo card: small heading',
      type: 'string',
      fieldset: 'siteBanner',
      description: 'Small gold text at the top of the homepage card (e.g. "Black Friday Special").',
      validation: (Rule) => Rule.max(60),
    },
    {
      name: 'promoHeading',
      title: 'Promo card: heading',
      type: 'string',
      fieldset: 'siteBanner',
      description: 'Main heading on the homepage card. Leave empty to hide the card and only show the strip.',
      validation: (Rule) => Rule.max(80),
    },
    {
      name: 'promoText',
      title: 'Promo card: text',
      type: 'string',
      fieldset: 'siteBanner',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'promoButtonLabel',
      title: 'Promo card: button text',
      type: 'string',
      fieldset: 'siteBanner',
      description: 'Defaults to "Get my tickets".',
      validation: (Rule) => Rule.max(40),
    },
    {
      name: 'promoButtonLink',
      title: 'Promo card: button link',
      type: 'string',
      fieldset: 'siteBanner',
      description: 'A site page such as /tickets, or a full https:// link to an external ticket shop. Defaults to /tickets.',
      validation: (Rule) =>
        Rule.custom((value) =>
          !value || value.startsWith('/') || /^https:\/\//.test(value)
            ? true
            : 'Use a site path starting with / or a full https:// link'
        ),
    },
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
