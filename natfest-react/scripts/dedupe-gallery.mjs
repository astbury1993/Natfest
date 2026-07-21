/**
 * Removes duplicate galleryImage documents from Sanity,
 * keeping only the first document for each cloudinaryPublicId.
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'v3uvil06',
  dataset: 'production',
  token: 'skYADdMLrJUNrloSGG6OVEFuHmcc0GOscJsJTFt4iS85EbpQS3b7GBcdKJoKcKZA5NhUgsCB5wnPtVdyteUcSYCrknSg8bfYxhhVwk7RIGe64fSlGRsyEc3kZ16EZ6I57VTZHf8V7tNYiBJC0JV9KWeegRU4EWIiUQqwzbHTVgb5QgKG2Y9L',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function main() {
  console.log('Fetching all gallery images...');
  const all = await client.fetch('*[_type == "galleryImage"]{ _id, cloudinaryPublicId } | order(_createdAt asc)');
  console.log(`Total documents: ${all.length}`);

  // Group by cloudinaryPublicId, keep the first one
  const seen = new Set();
  const toDelete = [];

  for (const doc of all) {
    if (seen.has(doc.cloudinaryPublicId)) {
      toDelete.push(doc._id);
    } else {
      seen.add(doc.cloudinaryPublicId);
    }
  }

  console.log(`Unique images: ${seen.size}`);
  console.log(`Duplicates to delete: ${toDelete.length}`);

  if (toDelete.length === 0) {
    console.log('No duplicates found.');
    return;
  }

  // Delete in batches of 100
  let transaction = client.transaction();
  let batchCount = 0;

  for (let i = 0; i < toDelete.length; i++) {
    transaction.delete(toDelete[i]);
    batchCount++;

    if (batchCount >= 100) {
      await transaction.commit();
      console.log(`  Deleted batch (${i + 1} / ${toDelete.length})`);
      transaction = client.transaction();
      batchCount = 0;
    }
  }

  if (batchCount > 0) {
    await transaction.commit();
    console.log(`  Deleted final batch (${toDelete.length} / ${toDelete.length})`);
  }

  console.log(`\nDone! Removed ${toDelete.length} duplicate documents.`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
