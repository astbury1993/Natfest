/**
 * Import FAQs from old static site into Sanity.
 * Data is hardcoded from faqs.html since there's no structured source.
 *
 * Usage: node scripts/import-faqs.mjs
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'v3uvil06',
  dataset: 'production',
  token: 'skYADdMLrJUNrloSGG6OVEFuHmcc0GOscJsJTFt4iS85EbpQS3b7GBcdKJoKcKZA5NhUgsCB5wnPtVdyteUcSYCrknSg8bfYxhhVwk7RIGe64fSlGRsyEc3kZ16EZ6I57VTZHf8V7tNYiBJC0JV9KWeegRU4EWIiUQqwzbHTVgb5QgKG2Y9L',
  useCdn: false,
  apiVersion: '2024-01-01',
});

// FAQ data extracted from faqs.html
const faqs = [
  {
    question: 'When and where is Natfest taking place?',
    answer: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Date: Natfest 2026 will take place on Saturday 27th June 2026.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Where: Sileby, Leicestershire' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Note: This may appear on satnav/maps as Alpha Power Cleaners – this is correct.' }] },
    ],
  },
  {
    question: 'What are the parking arrangements?',
    answer: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Parking is limited and reserved for entertainers and vendors.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'We encourage attendees to walk, get a lift, or take a taxi if possible.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'If you must drive, please respect our neighbours by NOT parking on the road outside the Natfest gate. Parking can be found on Hayhill Industrial Estate LE128LD.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'From Natfest head towards Barrow Upon Soar and take the first right turn into Hayhill Industrial Estate. Follow the road around the right-hand bend, drive down to the bottom of the estate until you reach the end. Car parking can be found on the left outside units 54, 52, 50 and 48. Alternatively you can make use of roadside parking throughout the estate, taking care not to block any gateways.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Once parked, head towards the pedestrian exit onto Barrow Road, turn left and Natfest is around a 3-4 minute walk away.' }] },
    ],
  },
  {
    question: 'What are the event timings?',
    answer: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Gates open: 11:00 (Don't forget your tickets – they're required for entry!)" }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Music & Entertainment starts: TBC - Set times will be announced nearer the event.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Event Ends: 23:30 (Please leave promptly and quietly to respect our neighbours)' }] },
    ],
  },
  {
    question: 'What should I bring?',
    answer: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Your ticket! Required for entry and will be exchanged for a wristband.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Cash and payment cards. Some activities may require cash, all bars and food vendors will accept all major credit and debit cards.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Festival attire. Dress to impress! There is a prize for best outfit!' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'A smile and good vibes' }] },
    ],
  },
  {
    question: 'How do the tickets work?',
    answer: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Tickets will be sent to you before the event and will be exchanged for a wristband on the gate.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Go to our ticket page or social media pages (Instagram and Facebook) for details on how to purchase.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Please keep your wristband on for the duration of the festival. This will allow you to leave and re-enter the site.' }] },
    ],
  },
  {
    question: 'Will there be a raffle?',
    answer: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Yes! We will be holding a raffle during the event with some amazing prizes to be won.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Raffle tickets will be available to purchase on the day.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'All proceeds will go to our chosen charity LOROS. Time of the draw will be released nearer the event.' }] },
    ],
  },
  {
    question: 'What items are not allowed?',
    answer: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'No Pets. No Glassware. No outside food or drink (except baby/toddler snacks and drinks).' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'No illegal substances. No weapons or sharp objects.' }] },
    ],
  },
  {
    question: 'What are the smoking rules?',
    answer: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'There will be a designated smoking area for cigarettes. No smoking is allowed outside of this area.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Vaping is allowed throughout the site.' }] },
    ],
  },
  {
    question: 'How can I keep Natfest tidy?',
    answer: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Use the bins provided!' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Stay within the fenced boundaries.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Supervise children at all times.' }] },
    ],
  },
];

async function main() {
  // Check for existing FAQs to avoid duplicates
  const existing = await client.fetch('*[_type == "faq"]{ question }');
  if (existing.length > 0) {
    console.log(`Found ${existing.length} existing FAQ documents. Skipping import to avoid duplicates.`);
    console.log('Delete existing FAQs first if you want to re-import.');
    return;
  }

  console.log(`Importing ${faqs.length} FAQs into Sanity...\n`);

  const transaction = client.transaction();

  faqs.forEach((faq, index) => {
    transaction.create({
      _type: 'faq',
      question: faq.question,
      answer: faq.answer,
      order: index + 1,
    });
  });

  await transaction.commit();
  console.log(`Done! ${faqs.length} FAQs imported successfully.`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
