/**
 * Batch download script for PubChem images
 * 
 * This script reads PubChem data from a JSON file and downloads all images
 * 
 * Usage:
 * 1. Export your localStorage cache to a JSON file (see exportCache.js)
 * 2. Run: node scripts/batchDownloadImages.js cache-export.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { downloadMoleculeImages } from './downloadPubChemImages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get cache file from command line argument
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node scripts/batchDownloadImages.js <cache-export.json> [delay] [--force]');
  console.log('\nOptions:');
  console.log('  delay    - Delay between downloads in ms (default: 2000)');
  console.log('  --force  - Force re-download even if images exist');
  console.log('\nTo export cache from browser:');
  console.log('1. Open browser console');
  console.log('2. Run: localStorage.getItem("pubchem_data_cache")');
  console.log('3. Copy the JSON and save to a file');
  process.exit(1);
}

const cacheFile = args[0];
const force = args.includes('--force') || args.includes('-f');
const delayArg = args.find(arg => !arg.startsWith('--') && !arg.startsWith('-') && arg !== cacheFile);
const delay = delayArg ? parseInt(delayArg) : 2000; // Default 2 second delay between downloads

if (!fs.existsSync(cacheFile)) {
  console.error(`Error: Cache file not found: ${cacheFile}`);
  process.exit(1);
}

console.log(`Reading cache from: ${cacheFile}`);
console.log(`Delay between downloads: ${delay}ms\n`);

try {
  const cacheData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
  
  // Handle different cache formats
  let molecules = [];
  if (Array.isArray(cacheData)) {
    // If it's an array of [name, data] pairs
    molecules = cacheData;
  } else if (cacheData.data && Array.isArray(cacheData.data)) {
    // If it's the localStorage format with version
    molecules = cacheData.data;
  } else if (typeof cacheData === 'object') {
    // If it's a plain object with molecule names as keys
    molecules = Object.entries(cacheData);
  } else {
    throw new Error('Unknown cache format');
  }
  
  console.log(`Found ${molecules.length} molecules\n`);
  
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < molecules.length; i++) {
    const [moleculeName, pubchemData] = molecules[i];
    
    if (!pubchemData || typeof pubchemData !== 'object') {
      console.warn(`\n[${i + 1}/${molecules.length}] Skipping ${moleculeName}: Invalid data`);
      skipCount++;
      continue;
    }
    
    console.log(`\n[${i + 1}/${molecules.length}] Processing: ${moleculeName}`);
    
    try {
      await downloadMoleculeImages(pubchemData, delay, force);
      successCount++;
    } catch (error) {
      console.error(`✗ Error processing ${moleculeName}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n\n=== Download Summary ===`);
  console.log(`Total molecules: ${molecules.length}`);
  console.log(`Successfully processed: ${successCount}`);
  console.log(`Skipped: ${skipCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`\n✓ Batch download complete!`);
  
} catch (error) {
  console.error('Error reading cache file:', error);
  process.exit(1);
}

