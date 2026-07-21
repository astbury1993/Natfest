/**
 * Import vendors from old static site into Sanity.
 * Uploads vendor images to Sanity assets and creates vendor documents.
 *
 * Usage: node scripts/import-vendors.mjs
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

// Vendor data extracted from vendors.html
const vendors = [
  {
    name: 'Boston and Hawthorne',
    category: 'Bar',
    description: "Returning for the second year is the amazing Boston and Hawthorne. These guys are by far one of our favourite companies to work with. Keeping everybody hydrated, whilst also contributing to the final amount raised for LOROS.",
    imageFile: 'Bar.jpg',
  },
  {
    name: 'SPUDS of Shepshed',
    category: 'Food',
    description: 'SPUDS of Shepshed will be at Natfest 2026. They have a great menu with various options so perfect for any potato lover!',
    imageFile: 'Shep-spuds.jpg',
  },
  {
    name: 'Hearty Hotdogs',
    category: 'Food',
    description: "A fav from last year, Hearty Hotdogs will be back bringing you the classic taste of America to Natfest. Their flavours include the New York chilli dog, the Chicago 'America's finest', a spicy Currywurst and a premium Vegetarian hotdog. Not forgetting the classic hotdog with cooked onions, ketchup and American mustard.",
    imageFile: 'Hearty.jpg',
  },
  {
    name: 'That Filthy Food',
    category: 'Food',
    description: 'Back again with the most insane loaded fries! Voted Leicestershire best food vendor 2025 and voted Natfest most popular food vendor 2025.',
    imageFile: 'dirtyfries.jpg',
  },
  {
    name: 'Syston Deli',
    category: 'Food',
    description: 'We are very happy to be having Syston Deli coming to Natfest. They have an amazing menu including loaded rice bowls/naans, Indian savouries and various pizzas!',
    imageFile: 'Curry.jpg',
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
  // Check for existing vendors to avoid duplicates
  const existing = await client.fetch('*[_type == "vendor"]{ name }');
  if (existing.length > 0) {
    console.log(`Found ${existing.length} existing vendor documents. Skipping import to avoid duplicates.`);
    console.log('Delete existing vendors first if you want to re-import.');
    return;
  }

  console.log(`Importing ${vendors.length} vendors into Sanity...\n`);

  for (let i = 0; i < vendors.length; i++) {
    const vendor = vendors[i];
    const imagePath = path.join(IMAGES_DIR, vendor.imageFile);

    console.log(`  [${i + 1}/${vendors.length}] ${vendor.name} — uploading image...`);
    const imageAssetId = await uploadImage(imagePath);

    await client.create({
      _type: 'vendor',
      name: vendor.name,
      description: vendor.description,
      category: vendor.category,
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAssetId },
      },
    });

    console.log(`  [${i + 1}/${vendors.length}] ${vendor.name} — done`);
  }

  console.log(`\nDone! ${vendors.length} vendors imported successfully.`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
