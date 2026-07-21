/**
 * Import team members and site settings (LOROS letter) from old static site into Sanity.
 * Uploads team member photos to Sanity assets.
 *
 * Usage: node scripts/import-about.mjs
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

const IMAGES_DIR = path.resolve(import.meta.dirname, '../../my-website/src/images');

// ─── TEAM MEMBERS (from about.html) ──────────────────────────────────────────

const teamMembers = [
  {
    name: 'Dave Leader',
    bio: "Festivals were always a passion of Natalie's and mine, and the thought of doing my own is the ultimate bucket list goal! Mind you, Nat would be saying I'm mad! However I've assembled a team of what I believe to be the best in the business to give you the ultimate experience whilst raising money for the charity closest to mine and many other's hearts, LOROS. You won't want to miss this, if you haven't got your ticket yet what are you waiting for? For those of you who don't know who I am, I'll be the one running round everywhere like a madman, making sure everything is running smoothly, so you can have the best festival experience, and go home feeling like you've had the best time.",
    photoFile: 'Dave-leader.jpg',
    displayOrder: 1,
  },
  {
    name: 'Kellen Sanderson',
    bio: "Hi everyone! I'm your point of contact for all things tickets and information! I'm also looking after the social media side of things with my sidekick Amelie! I'll be bringing the festival right to your front door whether that be sending out the physical tickets to choosing the acts we announce in the background for social media broadcast. So for all questions Natfest related please holla! I'm trying my hardest to bring a pets corner to the festival, if not you'll see me sliding down the bouncy castle after a few espresso martinis. Natfest 2026 can't come soon enough!!",
    photoFile: 'Kellen-sanderson.jpg',
    displayOrder: 2,
  },
  {
    name: 'Andy Sanderson',
    bio: "Music director. Looking at bringing you the best possible line up with a variety of brilliant acts throughout the day! Whether you like a sing along to Coldplay, a mosh to Rage Against the Machine, or being wowed by some original music… we will have you covered! Acoustic guitar, electric guitar, DJs and a couple of surprise announcements are in the works! I hope Natfest will leave you wanting more, you'll certainly want to stay til the end.",
    photoFile: 'Andy-sanderson.jpg',
    displayOrder: 3,
  },
  {
    name: 'Charlotte Leader',
    bio: "Full time book lover, part time Pom Pom maker! I want to bring Natfest to life with colour, personality and fun. We want everyone to feel welcome and there are plenty of exciting designs being created with a sprinkle of help from family/friends! I can't wait for the doors to open and bring you and the family to a world of magic and fun.",
    photoFile: 'Charlotte-leader.jpg',
    displayOrder: 4,
  },
  {
    name: 'Gemma Leader',
    bio: "Hey! I'm here to make sure that the raffle prizes we have to offer are the best of the best! Raising money for LOROS through raffle tickets is the game, big prizes are the name! I'm already so excited to share some of the prizes with you so watch this space!! Also for those feeling peckish I've helped source some vendors, anyone for pizza?",
    photoFile: 'Gemma-leader.jpg',
    displayOrder: 5,
  },
  {
    name: 'Gilly Stafford',
    bio: "Hey you lovely festival goers! What would a festival be without a logo and a line up poster?!? Once I found out we were doing a festival I mocked up some designs and before we knew it we had our first poster! I want to give you that festival vibe through visuals on social media and the tickets you'll all receive, with the aim to give that excitement feeling for a great time in the fields of Sileby! My iPad and stylus has been my best friend creating and designing. You will find me by the bar at Natfest with gin in hand (make it a double) see you there!!",
    photoFile: 'gilly-stafford.jpg',
    displayOrder: 6,
  },
  {
    name: 'Chris Blastock',
    bio: "Jackpot!! As newbies to the festival scene I wanted to help the team get the right information so I reached out to some contacts… A phone call with Rob da Bank! Renowned DJ and owner of Camp Bestival, he has helped us shape parts of our festival which has also resulted in some exciting news we can share with you in 2025! I work in construction so I also hope to bring my knowledge and experience to the finer detail of some of the designs and help everyone enjoy their festival safely! Anyhow that can wait, anyone for a Kit Kat and a cuppa?",
    photoFile: 'chris-blastock.jpg',
    displayOrder: 7,
  },
];

// ─── SITE SETTINGS (LOROS letter from about.html) ─────────────────────────────

const lorosLetterIntro = 'Good afternoon David, I wanted to thank you on behalf of the entire team here at LOROS for the recent donation of £12,068.34 which I understand was raised by yourself as well as your family and friends at this year\'s Natfest, an event created in memory of your wife Natalie. What an incredible tribute to her and what an astonishing amount of money. You must all be thrilled and feel rightfully proud.';

const lorosLetterFull = [
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Good afternoon David,' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I wanted to thank you on behalf of the entire team here at LOROS for the recent donation of £12,068.34 which I understand was raised by yourself as well as your family and friends at this year\'s Natfest, an event created in memory of your wife Natalie. What an incredible tribute to her and what an astonishing amount of money. You must all be thrilled and feel rightfully proud.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You may be aware that it now costs £11.5 million each year to be able to deliver our unique care services. The NHS does give us some money, but we still need to raise at least £9 million each year from our local community. We simply couldn\'t do what we do without the support of people like you and all of those people who helped to make Natfest such a huge success.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'It is difficult to express in an email the difference donations like this one make, but we\'d like to put into context just how valuable donations like yours are. Each week our Counselling team deliver over 50 sessions. This could be through one-to-one appointments with bereaved family members or with our specialist children and young people\'s counsellor, visits to patients on the Ward to support them to come to terms with their diagnosis, or through attending a group session led by our highly trained volunteers. It costs £15,544.00 to fund this service for one whole month. Your generous donation could cover more than 400 counselling sessions. It is these types of services, that perhaps many people don\'t realise we offer, that make LOROS special and unique, but it is only through donations like yours that we are able to continue delivering this exceptional level of care to all our patients and their family members.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Increasing costs are affecting all areas of our organisation and, right across the organisation we are trying to save money where possible. But caring for vulnerable patients means many costs, such as medication and utility bills, cannot be reduced. In fact, we know from many of our patients how the costs of being ill mount up. We are more than ever reliant on kind donations like yours to help us continue to support patients, families and carers. At such a testing time your generosity in thinking about others is much appreciated.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'On behalf of the patients, staff and volunteers at LOROS I\'d like to send our sincere thanks for your support which will enable us to weather this storm and continue our work caring for patients and their families.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Once again, from everyone here at LOROS; thank you.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Kind regards,\nLaura' }],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

async function uploadImage(filePath) {
  const stream = createReadStream(filePath);
  const asset = await client.assets.upload('image', stream, {
    filename: path.basename(filePath),
  });
  return asset._id;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  // ── Import Site Settings ──
  console.log('Checking for existing site settings...');
  const existingSettings = await client.fetch('*[_type == "siteSettings"][0]{ _id }');

  if (existingSettings) {
    console.log('Site settings already exist. Updating LOROS letter content...');
    await client.patch(existingSettings._id)
      .set({
        lorosLetterIntro,
        lorosLetterFull,
      })
      .commit();
    console.log('Site settings updated.\n');
  } else {
    console.log('Creating site settings with LOROS letter...');
    await client.create({
      _type: 'siteSettings',
      lorosLetterIntro,
      lorosLetterFull,
      eventDate: '2026-06-27T11:00:00.000Z',
    });
    console.log('Site settings created.\n');
  }

  // ── Import Team Members ──
  const existingMembers = await client.fetch('*[_type == "teamMember"]{ name }');
  if (existingMembers.length > 0) {
    console.log(`Found ${existingMembers.length} existing team member documents. Skipping team import to avoid duplicates.`);
    console.log('Delete existing team members first if you want to re-import.');
    return;
  }

  console.log(`Importing ${teamMembers.length} team members into Sanity...\n`);

  for (let i = 0; i < teamMembers.length; i++) {
    const member = teamMembers[i];
    const imagePath = path.join(IMAGES_DIR, member.photoFile);

    console.log(`  [${i + 1}/${teamMembers.length}] ${member.name} — uploading photo...`);
    const imageAssetId = await uploadImage(imagePath);

    await client.create({
      _type: 'teamMember',
      name: member.name,
      bio: member.bio,
      photo: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAssetId },
      },
      displayOrder: member.displayOrder,
    });

    console.log(`  [${i + 1}/${teamMembers.length}] ${member.name} — done`);
  }

  console.log(`\nDone! ${teamMembers.length} team members and site settings imported.`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
