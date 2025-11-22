/**
 * Script to update localStorage cache based on node files
 * Detects when pubchemSid or pubchemImageVersion changed and updates the cache
 * 
 * This is a browser console script - copy and paste into browser console
 * 
 * Usage: Copy the entire script into browser console and run it
 */

const updateCacheScript = `
// Update PubChem cache based on node files
(async function() {
  try {
    // Import the node files (this would need to be done differently in browser)
    // For now, we'll provide a manual way to update specific molecules
    
    console.log('Cache Update Utility');
    console.log('===================');
    console.log('');
    console.log('To update a molecule cache:');
    console.log('1. Call updateMoleculeCache(moleculeName, pubchemSid, pubchemImageVersion)');
    console.log('2. Or use removeMoleculeFromCache(moleculeName) to remove it');
    console.log('');
    
    // Function to remove a molecule from cache
    window.removeMoleculeFromCache = function(moleculeName) {
      try {
        const cacheKey = 'pubchem_data_cache';
        const cached = localStorage.getItem(cacheKey);
        if (!cached) {
          console.log('No cache found');
          return false;
        }
        
        const parsed = JSON.parse(cached);
        const cacheMap = new Map(parsed.data || []);
        
        if (cacheMap.has(moleculeName)) {
          cacheMap.delete(moleculeName);
          
          const updated = {
            version: parsed.version,
            data: Array.from(cacheMap.entries()),
            lastUpdated: new Date().toISOString()
          };
          
          localStorage.setItem(cacheKey, JSON.stringify(updated));
          console.log(\`✓ Removed \${moleculeName} from cache\`);
          return true;
        } else {
          console.log(\`✗ \${moleculeName} not found in cache\`);
          return false;
        }
      } catch (error) {
        console.error('Error removing from cache:', error);
        return false;
      }
    };
    
    // Function to update a molecule cache with new SID/version
    window.updateMoleculeCache = async function(moleculeName, pubchemSid, pubchemImageVersion = null) {
      try {
        // First remove old cache entry
        removeMoleculeFromCache(moleculeName);
        
        // Generate new SID-based URLs
        const version = pubchemImageVersion || 8; // Default version
        const image2DUrl = \`https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?sid=\${pubchemSid}&deposited=t&version=\${version}&t=l\`;
        const image2DUrlSmall = \`https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?sid=\${pubchemSid}&deposited=t&version=\${version}&t=s\`;
        
        // Create new cache entry
        const newData = {
          cid: null,
          sid: pubchemSid.toString(),
          name: moleculeName,
          description: null,
          molecularFormula: null,
          molecularWeight: null,
          canonicalSmiles: null,
          isomericSmiles: null,
          inchi: null,
          inchiKey: null,
          iupacName: null,
          pubchemUrl: \`https://pubchem.ncbi.nlm.nih.gov/substance/\${pubchemSid}\`,
          image2DUrl: image2DUrl,
          image2DUrlSmall: image2DUrlSmall,
          image3DUrl: null,
          image3DUrlSmall: null,
          imageVersion: version
        };
        
        // Save to cache
        const cacheKey = 'pubchem_data_cache';
        const cached = localStorage.getItem(cacheKey);
        const parsed = cached ? JSON.parse(cached) : { version: '1.0.0', data: [] };
        const cacheMap = new Map(parsed.data || []);
        
        cacheMap.set(moleculeName, newData);
        
        const updated = {
          version: parsed.version || '1.0.0',
          data: Array.from(cacheMap.entries()),
          lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem(cacheKey, JSON.stringify(updated));
        console.log(\`✓ Updated cache for \${moleculeName} with SID \${pubchemSid}, version \${version}\`);
        console.log('Note: You may need to refresh the page to see the updated image');
        return true;
      } catch (error) {
        console.error('Error updating cache:', error);
        return false;
      }
    };
    
    // Function to list all cached molecules
    window.listCachedMolecules = function() {
      try {
        const cacheKey = 'pubchem_data_cache';
        const cached = localStorage.getItem(cacheKey);
        if (!cached) {
          console.log('No cache found');
          return [];
        }
        
        const parsed = JSON.parse(cached);
        const cacheMap = new Map(parsed.data || []);
        
        console.log(\`Found \${cacheMap.size} cached molecules:\`);
        const molecules = Array.from(cacheMap.keys()).sort();
        molecules.forEach((name, i) => {
          const data = cacheMap.get(name);
          const sid = data.sid ? \`SID: \${data.sid}\` : \`CID: \${data.cid}\`;
          const version = data.imageVersion ? \`v\${data.imageVersion}\` : 'default';
          console.log(\`  \${i + 1}. \${name} (\${sid}, \${version})\`);
        });
        
        return molecules;
      } catch (error) {
        console.error('Error listing cache:', error);
        return [];
      }
    };
    
    console.log('Functions available:');
    console.log('  - removeMoleculeFromCache(moleculeName)');
    console.log('  - updateMoleculeCache(moleculeName, pubchemSid, pubchemImageVersion)');
    console.log('  - listCachedMolecules()');
    console.log('');
    console.log('Example:');
    console.log('  updateMoleculeCache("Glycogenin", "4842", 8)');
    
  } catch (error) {
    console.error('Error setting up cache update utility:', error);
  }
})();
`;

// Save to file
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const browserScriptFile = path.join(projectRoot, 'scripts', 'updateCache-browser.js');
fs.writeFileSync(browserScriptFile, updateCacheScript);

console.log('Browser console script created at: scripts/updateCache-browser.js');
console.log('\nCopy and paste the contents into your browser console to use.');

