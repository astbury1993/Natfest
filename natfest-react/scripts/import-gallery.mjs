/**
 * Bulk import script: fetches all images from Cloudinary and creates
 * galleryImage documents in Sanity for each one.
 *
 * Usage:
 *   1. Fill in the credentials below
 *   2. Run: node scripts/import-gallery.mjs
 */

import { createClient } from '@sanity/client';

// ─── CREDENTIALS (fill these in before running) ───────────────────────────────

const CLOUDINARY_CLOUD_NAME = 'dyftspev';
const CLOUDINARY_API_KEY = '528777714642971';       // From Cloudinary Dashboard → Settings → Access Keys
const CLOUDINARY_API_SECRET = 'wT3-bOWcN7wammPTdFuBbW9Rrz8'; // From Cloudinary Dashboard → Settings → Access Keys

const SANITY_PROJECT_ID = 'v3uvil06';
const SANITY_DATASET = 'production';
const SANITY_TOKEN = 'skYADdMLrJUNrloSGG6OVEFuHmcc0GOscJsJTFt4iS85EbpQS3b7GBcdKJoKcKZA5NhUgsCB5wnPtVdyteUcSYCrknSg8bfYxhhVwk7RIGe64fSlGRsyEc3kZ16EZ6I57VTZHf8V7tNYiBJC0JV9KWeegRU4EWIiUQqwzbHTVgb5QgKG2Y9L'; // Generate at sanity.io/manage → API → Tokens (Editor role)

// ─── SETUP ────────────────────────────────────────────────────────────────────

const sanity = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// ─── FETCH IMAGES FROM CLOUDINARY ─────────────────────────────────────────────

async function fetchCloudinaryImages() {
  const allImages = [];
  let nextCursor = null;

  do {
    const url = new URL(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image`
    );
    url.searchParams.set('max_results', '500');
    if (nextCursor) {
      url.searchParams.set('next_cursor', nextCursor);
    }

    const credentials = btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`);
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Cloudinary API error (${response.status}): ${text}`);
    }

    const data = await response.json();
    allImages.push(...data.resources);
    nextCursor = data.next_cursor || null;

    console.log(`Fetched ${allImages.length} images so far...`);
  } while (nextCursor);

  return allImages;
}

// ─── CREATE SANITY DOCUMENTS ──────────────────────────────────────────────────

async function importToSanity(images) {
  console.log(`\nCreating ${images.length} gallery documents in Sanity...\n`);

  // Use a transaction for efficiency
  let transaction = sanity.transaction();
  let batchCount = 0;

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const publicId = img.public_id;

    // Use the filename as a readable title
    const title = publicId.split('/').pop().replace(/[_-]/g, ' ').trim() || `Image ${i + 1}`;

    const doc = {
      _type: 'galleryImage',
      title,
      category: 'Acts', // Default category — you can update these in Sanity Studio later
      cloudinaryPublicId: publicId,
      alt: `Natfest gallery image - ${title}`,
      year: 2025,
      order: i + 1,
    };

    transaction.create(doc);
    batchCount++;

    // Commit in batches of 100 to avoid request size limits
    if (batchCount >= 100) {
      await transaction.commit();
      console.log(`  Committed batch (${i + 1} / ${images.length})`);
      transaction = sanity.transaction();
      batchCount = 0;
    }
  }

  // Commit remaining
  if (batchCount > 0) {
    await transaction.commit();
    console.log(`  Committed final batch (${images.length} / ${images.length})`);
  }

  console.log(`\nDone! ${images.length} gallery images imported to Sanity.`);
  console.log(`\nTip: Open Sanity Studio to update categories (Acts/Crowd) and alt text for individual images.`);
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Fetching images from Cloudinary...\n');

  try {
    const images = await fetchCloudinaryImages();

    if (images.length === 0) {
      console.log('No images found in Cloudinary. Make sure your credentials are correct.');
      return;
    }

    console.log(`\nFound ${images.length} images in Cloudinary.`);
    await importToSanity(images);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
