/**
 * Script to download images based on node files (reads pubchemSid and pubchemImageVersion)
 * This script reads all node files and downloads images for molecules with pubchemSid
 * 
 * Usage: node scripts/downloadFromNodeFiles.js [--force]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { downloadMoleculeImages } from './downloadPubChemImages.js';
import { generateSidImageUrl, PUBCHEM_IMAGE_VERSION } from '../src/services/pubchemService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Find all node files
function findNodeFiles(dir) {
  const nodeFiles = [];
  
  function walkDir(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('_nodes.js')) {
        nodeFiles.push(fullPath);
      }
    }
  }
  
  walkDir(dir);
  return nodeFiles;
}

// Extract molecules with pubchemSid from a node file
async function extractMoleculesWithSid(nodeFilePath) {
  try {
    // Convert to relative path for import
    const relativePath = path.relative(path.join(projectRoot, 'src'), nodeFilePath)
      .replace(/\\/g, '/')
      .replace(/\.js$/, '');
    
    const importPath = `../src/${relativePath}`;
    
    // Use dynamic import
    const module = await import(importPath);
    
    // Find the nodes array (usually ends with 'Nodes')
    const nodesArrayName = Object.keys(module).find(key => key.endsWith('Nodes'));
    
    if (!nodesArrayName) {
      return [];
    }
    
    const nodes = module[nodesArrayName];
    if (!Array.isArray(nodes)) {
      return [];
    }
    
    // Filter nodes that have pubchemSid
    const moleculesWithSid = nodes
      .filter(node => node.pubchemSid || node.pubchemImageVersion)
      .map(node => {
        const sid = node.pubchemSid;
        const version = node.pubchemImageVersion || PUBCHEM_IMAGE_VERSION;
        
        if (!sid) {
          return null;
        }
        
        // Create PubChem data object
        return {
          cid: null,
          sid: sid.toString(),
          name: node.name,
          image2DUrl: generateSidImageUrl(sid, 'l', version),
          image2DUrlSmall: generateSidImageUrl(sid, 's', version),
          image3DUrl: null,
          image3DUrlSmall: null,
          imageVersion: version
        };
      })
      .filter(Boolean);
    
    return moleculesWithSid;
  } catch (error) {
    console.warn(`Error reading ${nodeFilePath}:`, error.message);
    return [];
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force') || args.includes('-f');
  
  const dataDir = path.join(projectRoot, 'src', 'data');
  const nodeFiles = findNodeFiles(dataDir);
  
  console.log(`Found ${nodeFiles.length} node files\n`);
  
  let allMolecules = [];
  
  for (const nodeFile of nodeFiles) {
    const molecules = await extractMoleculesWithSid(nodeFile);
    allMolecules.push(...molecules);
    if (molecules.length > 0) {
      console.log(`Found ${molecules.length} molecule(s) with pubchemSid in ${path.basename(nodeFile)}`);
    }
  }
  
  console.log(`\nTotal molecules with pubchemSid: ${allMolecules.length}\n`);
  
  if (allMolecules.length === 0) {
    console.log('No molecules with pubchemSid found. Exiting.');
    process.exit(0);
  }
  
  let successCount = 0;
  let errorCount = 0;
  const delay = 2000; // 2 second delay
  
  for (let i = 0; i < allMolecules.length; i++) {
    const molecule = allMolecules[i];
    console.log(`\n[${i + 1}/${allMolecules.length}] Processing: ${molecule.name} (SID: ${molecule.sid}, Version: ${molecule.imageVersion})`);
    
    try {
      await downloadMoleculeImages(molecule, delay, force);
      successCount++;
    } catch (error) {
      console.error(`✗ Error processing ${molecule.name}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n\n=== Download Summary ===`);
  console.log(`Total molecules: ${allMolecules.length}`);
  console.log(`Successfully processed: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`\n✓ Download complete!`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

