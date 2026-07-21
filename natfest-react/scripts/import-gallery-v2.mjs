/**
 * Re-import gallery images from Cloudinary using the new folder structure.
 * Images in the "2025/Acts" folder get category "Acts".
 * Images in the "2025/Crowd" folder get category "Crowd".
 *
 * Usage: node scripts/import-gallery-v2.mjs
 */

import { createClient } from '@sanity/client';

const CLOUDINARY_CLOUD_NAME = 'dyftspev';
const CLOUDINARY_API_KEY = '528777714642971';
const CLOUDINARY_API_SECRET = 'wT3-bOWcN7wammPTdFuBbW9Rrz8';

const SANITY_PROJECT_ID = 'v3uvil06';
const SANITY_DATASET = 'production';
const SANITY_TOKEN = 'skYADdMLrJUNrloSGG6OVEFuHmcc0GOscJsJTFt4iS85EbpQS3b7GBcdKJoKcKZA5NhUgsCB5wnPtVdyteUcSYCrknSg8bfYxhhVwk7RIGe64fSlGRsyEc3kZ16EZ6I57VTZHf8V7tNYiBJC0JV9KWeegRU4EWIiUQqwzbHTVgb5QgKG2Y9L';

const sanity = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

/**
 * Fetch images from a specific Cloudinary folder.
 */
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

/**
 * Determine category from the Cloudinary folder path.
 */
function getCategory(publicId) {
  const lower = publicId.toLowerCase();
  if (lower.includes('/crowd/') || lower.startsWith('2025/crowd')) return 'Crowd';
  if (lower.includes('/acts/') || lower.startsWith('2025/acts')) return 'Acts';
  return 'Acts'; // Default fallback
}

async function main() {
  // Check for existing gallery images
  const existing = await sanity.fetch('*[_type == "galleryImage"]{ _id }');
  if (existing.length > 0) {
    console.log(`Found ${existing.length} existing gallery images. Skipping to avoid duplicates.`);
    console.log('Delete existing gallery images first if you want to re-import.');
    return;
  }

  console.log('Fetching gallery images from Cloudinary folders...\n');

  // Fetch from both gallery folders
  const actsImages = await fetchCloudinaryFolder('2025/Acts');
  const crowdImages = await fetchCloudinaryFolder('2025/Crowd');

  const allImages = [
    ...actsImages.map(img => ({ ...img, category: 'Acts' })),
    ...crowdImages.map(img => ({ ...img, category: 'Crowd' })),
  ];

  if (allImages.length === 0) {
    console.log('No images found. Check your Cloudinary folder structure (expected 2025/Acts and 2025/Crowd).');
    return;
  }

  console.log(`\nFound ${allImages.length} images (${actsImages.length} Acts, ${crowdImages.length} Crowd).`);
  console.log(`Creating gallery documents in Sanity...\n`);

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
      alt: `Natfest gallery image - ${title}`,
      year: 2025,
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

  console.log(`\nDone! ${allImages.length} gallery images imported with correct categories.`);
  console.log(`  Acts: ${actsImages.length}`);
  console.log(`  Crowd: ${crowdImages.length}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
