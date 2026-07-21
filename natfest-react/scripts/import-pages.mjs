/**
 * Import Homepage, Tickets, and Partners content into Sanity.
 * Uploads images for partners and homepage to Sanity assets.
 *
 * Usage: node scripts/import-pages.mjs
 */

import { createClient } from '@sanity/client';
import { createReadStream } from 'fs';
import path from 'path';

const client = createClient({
  projectId: 'v3uvil06',
  dataset: 'production',
  token: 'skYADdMLrJUNrloSGG6OVEFuHmcc0GOscJsJTFt4iS85EbpQS3b7GBcdKJoKcKZA5NhUgsCB5wnPtVdyteUcSYCrknSg8bfYxhhVwk7RIGe64fSlGRsyEc3kZ16EZ6I57VTZHf8V7tNYiBJC0JV9KWeegRU4EWIiUQqwzbHTVgb5QgKG2Y9L',
  useCdn: false,
  apiVersion: '2024-01-01',
});

const PUBLIC_DIR = path.resolve(import.meta.dirname, '../public');
const IMAGES_DIR = path.resolve(PUBLIC_DIR, 'images');

async function uploadImage(filePath) {
  const stream = createReadStream(filePath);
  const asset = await client.assets.upload('image', stream, {
    filename: path.basename(filePath),
  });
  return asset._id;
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

async function importHomePage() {
  const existing = await client.fetch('*[_type == "homePage"][0]{ _id }');
  if (existing) {
    console.log('Home page already exists. Skipping.');
    return;
  }

  console.log('Importing Home Page...');

  console.log('  Uploading hero image...');
  const heroImageId = await uploadImage(path.join(IMAGES_DIR, 'Natfest-Drone.jpg'));

  console.log('  Uploading history image...');
  const historyImageId = await uploadImage(path.join(IMAGES_DIR, 'Loros-donation.jpg'));

  await client.create({
    _type: 'homePage',
    heroHeading: 'Natfest 2026 is coming!',
    heroSubtext: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Back for its second year, Natfest returns for 2026!' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Join us on Saturday 27th June 2026 for a day of incredible music, food, and fun at Natfest, a charity music festival in memory of Natalie Leader, raising funds for LOROS.' }] },
    ],
    heroImage: { _type: 'image', asset: { _type: 'reference', _ref: heroImageId } },
    heroImageAlt: 'Aerial drone view of the Natfest festival site',
    storyHeading: 'The Reason Behind Natfest, by Kellen',
    storyContent: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "In 2023, our Mum, Natalie, sadly passed away at LOROS after battling lung cancer. The day before her 60th birthday. This was the most horrendous day of mine, my sisters (Gemma & Charlotte) and my dad's life." }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Our only comfort is knowing how well she was cared for in those last few days. The team at LOROS were nothing short of incredible. Completely attentive to her needs and they went above and beyond to care for not only her, but all of us too.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "I think mum would think we've lost our marbles arranging a festival in her honour, but her passion was music, having been to many festivals herself and being a huge lover of bands in general." }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Natfest honours not only mum, but everyone who has been under the care of LOROS and I'm sure many of you will have had friends and family need them." }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'We really hope that by raising money we can make a real difference to families that unfortunately need the help of LOROS in the future.' }] },
    ],
    galleryCta: 'Check out what happened last year!',
    historyHeading: 'Our History',
    historyText: 'Founded in 2024, we successfully delivered our first Natfest in July 2025. With your support we were able to raise a whopping £12,068.34 for LOROS!',
    historyImage: { _type: 'image', asset: { _type: 'reference', _ref: historyImageId } },
    historyImageAlt: 'Natfest team presenting a donation cheque to LOROS charity',
  });

  console.log('  Home page created.');
}

// ─── TICKETS PAGE ─────────────────────────────────────────────────────────────

async function importTicketsPage() {
  const existing = await client.fetch('*[_type == "ticketsPage"][0]{ _id }');
  if (existing) {
    console.log('Tickets page already exists. Skipping.');
    return;
  }

  console.log('Importing Tickets Page...');

  await client.create({
    _type: 'ticketsPage',
    heading: 'Natfest ticket sales announcement! 🎫',
    announcement: 'On sale Saturday 27th September for Natfest 2026',
    eventDate: '27/06/26',
    eventTime: '11:00 – 23:30',
    eventLocation: 'Sileby, Leicestershire',
    includes: [
      'Live music',
      'Food vendors',
      'Licensed bar',
      'Raffle',
      'Face painting',
      'Bouncy castles',
      'Competitions',
    ],
    pricing: [
      { _type: 'object', label: 'Adults', price: '£30' },
      { _type: 'object', label: 'Children (5–16)', price: '£15' },
      { _type: 'object', label: 'Under 5s', price: 'FREE' },
    ],
    socialLinks: [
      { _type: 'object', platform: 'Instagram', url: 'https://www.instagram.com/Natfest2026' },
      { _type: 'object', platform: 'Facebook', url: 'https://www.facebook.com/groups/936096755035843' },
    ],
    notice: 'This is an invite-only event. No tickets available on the gate.',
  });

  console.log('  Tickets page created.');
}

// ─── PARTNERS ─────────────────────────────────────────────────────────────────

async function importPartners() {
  const existing = await client.fetch('*[_type == "partner"]{ _id }');
  if (existing.length > 0) {
    console.log(`Found ${existing.length} existing partners. Skipping.`);
    return;
  }

  console.log('Importing Partners...');

  const partners = [
    {
      name: 'LOROS Hospice',
      description: 'LOROS is a local charity providing compassionate care for over 2,500 people each year living with terminal illness in Leicester, Leicestershire, and Rutland. All proceeds from Natfest go to supporting their incredible work.',
      logoFile: 'LOROS_Event.png',
      logoAlt: 'LOROS Hospice logo',
      websiteUrl: 'https://www.loros.co.uk/',
      linkText: 'Visit LOROS website',
      displayOrder: 1,
    },
    {
      name: 'Alpha Power Cleaners',
      description: 'Alpha Power Cleaners are our proud sponsor and host. They generously provide the land for the festival, making the whole event possible.',
      logoFile: 'Alpha.png',
      logoAlt: 'Alpha Power Cleaners logo',
      websiteUrl: 'https://www.alphapowercleaners.co.uk/',
      linkText: 'Visit Alpha Power Cleaners website',
      displayOrder: 2,
    },
  ];

  for (let i = 0; i < partners.length; i++) {
    const p = partners[i];
    const logoPath = path.join(IMAGES_DIR, p.logoFile);

    console.log(`  [${i + 1}/${partners.length}] ${p.name} — uploading logo...`);
    const logoAssetId = await uploadImage(logoPath);

    await client.create({
      _type: 'partner',
      name: p.name,
      description: p.description,
      logo: { _type: 'image', asset: { _type: 'reference', _ref: logoAssetId } },
      logoAlt: p.logoAlt,
      websiteUrl: p.websiteUrl,
      linkText: p.linkText,
      displayOrder: p.displayOrder,
    });

    console.log(`  [${i + 1}/${partners.length}] ${p.name} — done`);
  }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  await importHomePage();
  await importTicketsPage();
  await importPartners();
  console.log('\nAll pages imported successfully!');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
