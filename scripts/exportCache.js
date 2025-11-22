/**
 * Browser console script to export PubChem cache
 * 
 * Copy and paste this into your browser console to export the cache
 * Then save the output to a JSON file for batchDownloadImages.js
 */

const exportCacheScript = `
// Export PubChem cache from localStorage
(function() {
  try {
    const cacheKey = 'pubchem_data_cache';
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) {
      console.log('No cache found in localStorage');
      return;
    }
    
    const parsed = JSON.parse(cached);
    
    // Create a downloadable JSON file
    const dataStr = JSON.stringify(parsed, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pubchem-cache-export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('✓ Cache exported! File downloaded as pubchem-cache-export.json');
    console.log('Total molecules:', parsed.data ? parsed.data.length : 0);
  } catch (error) {
    console.error('Error exporting cache:', error);
  }
})();
`;

console.log('Copy and paste this into your browser console:');
console.log(exportCacheScript);

// Also save to a file for reference
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const exportFile = path.join(__dirname, 'exportCache-browser.js');

fs.writeFileSync(exportFile, exportCacheScript);
console.log(`\nAlso saved to: ${exportFile}`);

