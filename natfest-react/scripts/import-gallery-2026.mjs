/**
 * Import 2026 gallery images from Cloudinary into Sanity.
 * Fetches from 2026/Acts and 2026/Crowd folders, setting categories accordingly.
 *
 * Usage: node scripts/import-gallery-2026.mjs
 */

import { createClient } from '@sanity/client';

const CLOUDINARY_CLOUD_NAME = 'dyftspev';
const CLOUDINARY_API_KEY = '528777714642971';
const CLOUDINARY_API_SECRET = 'wT3-bOWcN7wammPTdFuBbW9Rrz8';

const sanity = createClient({
  projectId: 'v3uvil06',
  dataset: 'production',
  token: 'skYADdMLrJUNrloSGG6OVEFuHmcc0GOscJsJTFt4iS85EbpQS3b7GBcdKJoKcKZA5NhUgsCB5wnPtVdyteUcSYCrknSg8bfYxhhVwk7RIGe64fSlGRsyEc3kZ16EZ6I57VTZHf8V7tNYiBJC0JV9KWeegRU4EWIiUQqwzbHTVgb5QgKG2Y9L',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function fetchCloudinaryFolder(folder) {
  const allImages = [];
  let nextCursor = null;

  do {
    const url = new URL(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/search`
    );

    const credentials = btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`);

    const body = {
      expression: `folder:"${folder}"`,
      max_results: 500,
    };
    if (nextCursor) {
      body.next_cursor = nextCursor;
    }

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Cloudinary API error (${response.status}): ${text}`);
    }

    const data = await response.json();
    allImages.push(...data.resources);
    nextCursor = data.next_cursor || null;

    console.log(`  ${folder}: fetched ${allImages.length} images so far...`);
  } while (nextCursor);

  return allImages;
}

async function main() {
  // Check for existing 2026 gallery images
  const existing = await sanity.fetch('*[_type == "galleryImage" && year == 2026]{ _id }');
  if (existing.length > 0) {
    console.log(`Found ${existing.length} existing 2026 gallery images. Skipping to avoid duplicates.`);
    console.log('Delete existing 2026 gallery images first if you want to re-import.');
    return;
  }

  console.log('Fetching 2026 gallery images from Cloudinary...\n');

  const actsImages = await fetchCloudinaryFolder('2026/Acts');
  const crowdImages = await fetchCloudinaryFolder('2026/Crowd');

  const allImages = [
    ...actsImages.map(img => ({ ...img, category: 'Acts' })),
    ...crowdImages.map(img => ({ ...img, category: 'Crowd' })),
  ];

  if (allImages.length === 0) {
    console.log('No images found. Check your Cloudinary folder structure (expected 2026/Acts and 2026/Crowd).');
    return;
  }

  console.log(`\nFound ${allImages.length} images (${actsImages.length} Acts, ${crowdImages.length} Crowd).`);
  console.log('Creating gallery documents in Sanity...\n');

  let transaction = sanity.transaction();
  let batchCount = 0;

  for (let i = 0; i < allImages.length; i++) {
    const img = allImages[i];
    const publicId = img.public_id;
    const title = publicId.split('/').pop().replace(/[_-]/g, ' ').trim() || `Image ${i + 1}`;

    transaction.create({
      _type: 'galleryImage',
      title,
      category: img.category,
      cloudinaryPublicId: publicId,
      alt: `Natfest 2026 gallery image - ${title}`,
      year: 2026,
      order: i + 1,
    });

    batchCount++;

    if (batchCount >= 100) {
      await transaction.commit();
      console.log(`  Committed batch (${i + 1} / ${allImages.length})`);
      transaction = sanity.transaction();
      batchCount = 0;
    }
  }

  if (batchCount > 0) {
    await transaction.commit();
    console.log(`  Committed final batch (${allImages.length} / ${allImages.length})`);
  }

  console.log(`\nDone! ${allImages.length} gallery images imported for 2026.`);
  console.log(`  Acts: ${actsImages.length}`);
  console.log(`  Crowd: ${crowdImages.length}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
