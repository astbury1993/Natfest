/**
 * Import 2026 lineup acts from old static site into Sanity.
 * Uploads act images to Sanity assets and creates act documents.
 *
 * Usage: node scripts/import-lineup.mjs
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

// Act data extracted from lineup-2026.html
const acts = [
  // ── Main Stage ──
  {
    name: 'Supernova',
    stage: 'Main Stage',
    isHeadliner: true,
    performanceOrder: 1,
    description: "Supernova are the UK's (if not the world's) best sounding and most authentic Oasis tribute band. Hailing from the Midlands but performing across the UK and Europe, Supernova have become renowned for their energetic stage performances and a sound that replicates Oasis at their absolute peak. Playing all the greatest hits alongside iconic fan-favourite album tracks, Supernova deliver both Liam and Noel led classics to a standard surpassing all others.",
    imageFile: 'supernova_head.jpg',
    links: [],
  },
  {
    name: 'Abalicious',
    stage: 'Main Stage',
    isHeadliner: true,
    performanceOrder: 2,
    description: "Dust off your platforms and prepare for a night of pure pop perfection because Abalicious, one of the UK's most popular ABBA tribute bands, is ready to transport you back to the golden age of disco! Featuring stunning costumes, pitch-perfect harmonies, and all of ABBA's greatest hits, Abalicious delivers an electrifying show that will have you singing along to \"Dancing Queen,\" \"Mamma Mia,\" \"Waterloo,\" and many more. Abalicious promises an unforgettable experience that will leave audiences of all ages shouting \"Thank You For The Music!\"",
    imageFile: 'abalicious.png',
    links: ['https://www.abbatribute.info/'],
  },
  {
    name: 'English House Mafia',
    stage: 'Main Stage',
    isHeadliner: false,
    performanceOrder: 3,
    description: 'Returning to close out the Main Stage with an electrifying set guaranteed to get everyone dancing. Expect non-stop hits and festival anthems.',
    imageFile: 'englishhousemafia.jpg',
    links: ['https://www.instagram.com/englishhousemafia/'],
  },
  {
    name: 'Ska Train',
    stage: 'Main Stage',
    isHeadliner: false,
    performanceOrder: 4,
    description: "Ska Train celebrate the UK ska revival of the late 1970s and early 80s, a movement pioneered by Jerry Dammers' iconic 2-Tone record label. This era brought us legendary bands like The Specials, Madness, Bad Manners, and The Selecter. The band's seven-piece line-up features spine-tingling horns (trombone and saxophone) and a rock-solid rhythm section, with guitar, keys, and vocals that transport audiences back to an explosive musical era of punk, politics, and messages of peace.",
    imageFile: 'skatrain2.jpg',
    links: ['https://www.facebook.com/share/1BfnJ7WCLm/'],
  },
  {
    name: 'Ellie-May',
    stage: 'Main Stage',
    isHeadliner: false,
    performanceOrder: 5,
    description: "Ellie-May is making waves on the local scene with her powerhouse vocals and expressive, heartfelt performances. She has love for artists like Fleetwood Mac, Adele, Amy Winehouse, Florence + The Machine, and Radiohead to name just a few! Only 16 years old and currently studying Music Performance & Songwriting at Confetti College in Nottingham. She's achieved a grade 8 in vocals and her passion for music shines through on the stage.",
    imageFile: 'Ellie-may.jpg',
    links: ['https://www.instagram.com/elliemay_2803/'],
  },
  {
    name: 'Liam & Sean',
    stage: 'Main Stage',
    isHeadliner: false,
    performanceOrder: 6,
    description: "Liam and Sean Acoustic duo are a home grown family band from Leicester. We've had a busy year of gigging playing a variety of venues across the midlands!! We had such a great time playing Natfest last year and are really looking forward to coming to see you all again this year!",
    imageFile: 'LiamSean.jpg',
    links: [],
  },
  {
    name: 'Echo Alternative',
    stage: 'Main Stage',
    isHeadliner: false,
    performanceOrder: 7,
    description: "A crowd favourite returning for 2026 with all the best tunes. It was a great 2025 for us with loads of special gigs playing alternative rock bangers like Foo Fighters & Pearl Jam to amazing crowds, and a very special one for us last year was NatFest. What a great day with an amazing crowd and atmosphere, and for such a great cause supporting Loros! We can't wait to be back again this year to support the NatFest team and have another incredible day. See you in the summer!",
    imageFile: 'Echo-Alternative.jpg',
    links: ['https://www.instagram.com/echo.alternative/'],
  },
  {
    name: 'Szyslak',
    stage: 'Main Stage',
    isHeadliner: false,
    performanceOrder: 8,
    description: "Ay up, we're Szyslak from Leicester - a 2-piece grungy garage rock/rock n roll band with punk influences. Writing songs is hard, so instead we cover obscure and classic songs from the 1920s through to the 1960s, ranging from blues, rock n roll, RnB, soul, motown and gospel, but we do them in our own raucous, heavy, silly way. We played Natfest last year and had such a blast! We're very stoked to be playing again this year, we're looking forward to playing a set of new songs for you.",
    imageFile: 'Szyslak.jpg',
    links: ['https://www.instagram.com/szyslak.music/'],
  },
  {
    name: 'Ramaen',
    stage: 'Main Stage',
    isHeadliner: false,
    performanceOrder: 9,
    description: 'Something new for Natfest 2026! Ramaen is a Cambridgeshire-based singer bringing smooth soulful vocals, inspired by classic Soul and Motown. Having shared stages with national and international Award-winning artists, his talent has taken him across Europe and the USA, delivering timeless sounds with a modern sound.',
    imageFile: 'Ramaen.jpg',
    links: ['https://www.instagram.com/itsramaen/'],
  },
  {
    name: 'Copper Beat B2B Andy Sparrow',
    stage: 'Main Stage',
    isHeadliner: false,
    performanceOrder: 10,
    description: 'Copper Beat (Curt Astbury) B2B Andy Sparrow. House music. Good people. No standing still. Super excited to have this duo back for more this year!',
    imageFile: 'acts/_1003267.jpg',
    links: ['https://www.instagram.com/copperbeat_dj/'],
  },
  {
    name: 'Publicity',
    stage: 'Main Stage',
    isHeadliner: false,
    performanceOrder: 11,
    description: "Publicity are a Leicester-local indie four piece, who combine anthemic riffs with soulful songwriting to create an energetic and visceral live show. Having recently headlined at some of Leicester's best indie venues, they're starting to make a move on the underground scene, and are sure to put on a show you won't forget. We're thrilled to be starting the day off right with these guys!",
    imageFile: 'PUBLICITY.jpg',
    links: ['https://www.instagram.com/bandcalledpublicity/'],
  },
  {
    name: 'Dixon Woods',
    stage: 'Main Stage',
    isHeadliner: false,
    performanceOrder: 12,
    description: 'Dixon Woods are an award winning dance school trained by qualified teachers in Oadby Leicestershire. Established in 1983, they teach a number of disciplines including Classical Ballet, Modern, Contemporary, Jazz, Acrobatics, Lyrical, and Commercial street dance. They perform regularly in competitions, annual shows and charity events. We absolutely loved their performance last year and can\'t wait for what they\'ll do this year!',
    imageFile: 'Dixon Woods.jpg',
    links: ['https://www.dixon-woods.co.uk'],
  },
  // ── Marquee Stage ──
  {
    name: 'Chunkie Russell',
    stage: 'Marquee Stage',
    isHeadliner: false,
    performanceOrder: 1,
    description: 'We are delighted to have Chunkie Russell at Natfest 2026, providing the best entertainment for the marquee. He will be doing various performances throughout the day, perfect for the little ones at Natfest!',
    imageFile: 'Chunkie.jpg',
    links: ['https://www.instagram.com/chunkie_russell/'],
  },
];

async function uploadImage(filePath) {
  const stream = createReadStream(filePath);
  const asset = await client.assets.upload('image', stream, {
    filename: path.basename(filePath),
  });
  return asset._id;
}

async function main() {
  // Check for existing acts to avoid duplicates
  const existing = await client.fetch('*[_type == "act" && year == 2026]{ name }');
  if (existing.length > 0) {
    console.log(`Found ${existing.length} existing 2026 act documents. Skipping import to avoid duplicates.`);
    console.log('Delete existing 2026 acts first if you want to re-import.');
    return;
  }

  console.log(`Importing ${acts.length} lineup acts into Sanity...\n`);

  for (let i = 0; i < acts.length; i++) {
    const act = acts[i];
    const imagePath = path.join(IMAGES_DIR, act.imageFile);

    console.log(`  [${i + 1}/${acts.length}] ${act.name} — uploading image...`);
    const imageAssetId = await uploadImage(imagePath);

    await client.create({
      _type: 'act',
      name: act.name,
      description: act.description,
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAssetId },
      },
      stage: act.stage,
      year: 2026,
      performanceOrder: act.performanceOrder,
      isHeadliner: act.isHeadliner,
      links: act.links,
    });

    console.log(`  [${i + 1}/${acts.length}] ${act.name} — done`);
  }

  console.log(`\nDone! ${acts.length} acts imported for 2026 lineup.`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
