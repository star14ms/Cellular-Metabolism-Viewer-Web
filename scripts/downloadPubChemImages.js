/**
 * Script to download PubChem images and save them locally
 * Run with: node scripts/downloadPubChemImages.js <moleculeName>
 * Or use batchDownloadImages.js to download all cached molecules
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Image directories
const IMAGE_DIRS = {
  '2d': path.join(projectRoot, 'public', 'images', 'molecules', '2d'),
  '2d-small': path.join(projectRoot, 'public', 'images', 'molecules', '2d-small'),
  '3d': path.join(projectRoot, 'public', 'images', 'molecules', '3d'),
  '3d-small': path.join(projectRoot, 'public', 'images', 'molecules', '3d-small')
};

// Create directories if they don't exist
Object.values(IMAGE_DIRS).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Mapping file to store CID/SID -> filename mappings and URL tracking
const MAPPING_FILE = path.join(projectRoot, 'public', 'images', 'molecules', 'imageMapping.json');

// Load existing mapping
let imageMapping = {};
let urlTracking = {}; // Track URLs used for each file to detect changes
if (fs.existsSync(MAPPING_FILE)) {
  try {
    const mappingData = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
    // Support both old format (simple object) and new format (with urlTracking)
    if (mappingData.paths) {
      imageMapping = mappingData.paths;
      urlTracking = mappingData.urlTracking || {};
    } else {
      // Old format - migrate
      imageMapping = mappingData;
      urlTracking = {};
    }
  } catch (e) {
    console.warn('Could not load existing mapping file, starting fresh');
  }
}

/**
 * Download an image from a URL
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Get filename for an image based on CID, SID, and version
 */
function getImageFilename(cid, type, size = 'l', sid = null, version = null) {
  const ext = 'png'; // PubChem images are typically PNG
  
  let prefix;
  if (sid) {
    // Use SID in filename if available (more specific than CID)
    if (cid) {
      prefix = `CID${cid}_SID${sid}`;
    } else {
      prefix = `SID${sid}`;
    }
  } else if (cid) {
    prefix = `CID${cid}`;
  } else {
    prefix = 'UNKNOWN';
  }
  
  // Include version in filename if specified
  if (version !== null && version !== undefined) {
    return `${prefix}_${type}_${size}_v${version}.${ext}`;
  }
  
  return `${prefix}_${type}_${size}.${ext}`;
}

/**
 * Check if URL has changed for an existing file
 */
function hasUrlChanged(filepath, newUrl) {
  const filename = path.basename(filepath);
  const oldUrl = urlTracking[filename];
  return oldUrl && oldUrl !== newUrl;
}

/**
 * Find and delete old files with different URLs for the same molecule
 */
function findAndDeleteOldFiles(cid, type, size, sid, version, newUrl) {
  const dir = IMAGE_DIRS[type + (size === 's' ? '-small' : '')];
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  // Build pattern to match files for this molecule (by CID and/or SID)
  let pattern;
  if (sid) {
    if (cid) {
      // Match files with this CID and SID (or just this SID)
      pattern = new RegExp(`^(CID${cid}_SID${sid}|SID${sid}).*_${type}_${size}(_v\\d+)?\\.png$`);
    } else {
      // Match files with this SID
      pattern = new RegExp(`^SID${sid}.*_${type}_${size}(_v\\d+)?\\.png$`);
    }
  } else if (cid) {
    // Match files with this CID
    pattern = new RegExp(`^CID${cid}.*_${type}_${size}(_v\\d+)?\\.png$`);
  } else {
    return; // No identifier, can't match
  }
  
  files.forEach(file => {
    if (pattern.test(file)) {
      const filepath = path.join(dir, file);
      const trackedUrl = urlTracking[file];
      
      // Delete if URL changed or if it's a different version
      if (trackedUrl && trackedUrl !== newUrl) {
        try {
          fs.unlinkSync(filepath);
          delete urlTracking[file];
          console.log(`🗑️  Deleted old image: ${file} (URL changed)`);
        } catch (err) {
          console.warn(`Could not delete old file ${file}:`, err.message);
        }
      }
    }
  });
}

/**
 * Download images for a molecule
 * @param {Object} pubchemData - PubChem data with image URLs
 * @param {number} delay - Delay between downloads in ms
 * @param {boolean} force - Force re-download even if file exists
 */
export async function downloadMoleculeImages(pubchemData, delay = 1000, force = false) {
  const { cid, sid, image2DUrl, image2DUrlSmall, image3DUrl, image3DUrlSmall } = pubchemData;
  
  // Extract version from URL or use default
  const extractVersion = (url) => {
    if (!url) return null;
    const match = url.match(/version=(\d+)/);
    return match ? parseInt(match[1]) : null;
  };
  
  const version = extractVersion(image2DUrl) || extractVersion(image2DUrlSmall) || null;
  
  // Normalize identifiers for filename generation
  const cidStr = cid ? cid.toString() : null;
  const sidStr = sid ? sid.toString() : null;
  
  // Use SID if available, otherwise CID for identifier
  const identifier = (sidStr ? `SID${sidStr}` : (cidStr ? `CID${cidStr}` : null));
  
  if (!identifier && !cidStr && !sidStr) {
    console.warn('No CID or SID found, skipping image download');
    return;
  }

  const downloads = [];

  // Download 2D large
  if (image2DUrl) {
    const filename = getImageFilename(cidStr, '2d', 'l', sidStr, version);
    const filepath = path.join(IMAGE_DIRS['2d'], filename);
    const urlChanged = hasUrlChanged(filepath, image2DUrl);
    
    // Check if we need to download (force, doesn't exist, or URL changed)
    if (force || !fs.existsSync(filepath) || urlChanged) {
      // Delete old file if URL changed
      if (urlChanged && fs.existsSync(filepath)) {
        findAndDeleteOldFiles(cidStr, '2d', 'l', sidStr, version, image2DUrl);
        try {
          fs.unlinkSync(filepath);
          delete urlTracking[filename];
        } catch (err) {
          // File might have been deleted by findAndDeleteOldFiles
        }
      }
      
      downloads.push({
        url: image2DUrl,
        filepath,
        type: '2d',
        size: 'l',
        filename,
        identifier
      });
    } else {
      console.log(`✓ Already exists: ${filename}`);
      // Still update mapping even if file exists
      const key = `${identifier}_2d_l`;
      imageMapping[key] = `/images/molecules/2d/${filename}`;
      urlTracking[filename] = image2DUrl;
    }
  }

  // Download 2D small
  if (image2DUrlSmall) {
    const filename = getImageFilename(cidStr, '2d', 's', sidStr, version);
    const filepath = path.join(IMAGE_DIRS['2d-small'], filename);
    const urlChanged = hasUrlChanged(filepath, image2DUrlSmall);
    
    if (force || !fs.existsSync(filepath) || urlChanged) {
      if (urlChanged && fs.existsSync(filepath)) {
        findAndDeleteOldFiles(cidStr, '2d', 's', sidStr, version, image2DUrlSmall);
        try {
          fs.unlinkSync(filepath);
          delete urlTracking[filename];
        } catch (err) {}
      }
      
      downloads.push({
        url: image2DUrlSmall,
        filepath,
        type: '2d',
        size: 's',
        filename,
        identifier
      });
    } else {
      console.log(`✓ Already exists: ${filename}`);
      const key = `${identifier}_2d_s`;
      imageMapping[key] = `/images/molecules/2d-small/${filename}`;
      urlTracking[filename] = image2DUrlSmall;
    }
  }

  // Download 3D large
  if (image3DUrl) {
    const filename = getImageFilename(cidStr, '3d', 'l', sidStr, version);
    const filepath = path.join(IMAGE_DIRS['3d'], filename);
    const urlChanged = hasUrlChanged(filepath, image3DUrl);
    
    if (force || !fs.existsSync(filepath) || urlChanged) {
      if (urlChanged && fs.existsSync(filepath)) {
        findAndDeleteOldFiles(cidStr, '3d', 'l', sidStr, version, image3DUrl);
        try {
          fs.unlinkSync(filepath);
          delete urlTracking[filename];
        } catch (err) {}
      }
      
      downloads.push({
        url: image3DUrl,
        filepath,
        type: '3d',
        size: 'l',
        filename,
        identifier
      });
    } else {
      console.log(`✓ Already exists: ${filename}`);
      const key = `${identifier}_3d_l`;
      imageMapping[key] = `/images/molecules/3d/${filename}`;
      urlTracking[filename] = image3DUrl;
    }
  }

  // Download 3D small
  if (image3DUrlSmall) {
    const filename = getImageFilename(cidStr, '3d', 's', sidStr, version);
    const filepath = path.join(IMAGE_DIRS['3d-small'], filename);
    const urlChanged = hasUrlChanged(filepath, image3DUrlSmall);
    
    if (force || !fs.existsSync(filepath) || urlChanged) {
      if (urlChanged && fs.existsSync(filepath)) {
        findAndDeleteOldFiles(cidStr, '3d', 's', sidStr, version, image3DUrlSmall);
        try {
          fs.unlinkSync(filepath);
          delete urlTracking[filename];
        } catch (err) {}
      }
      
      downloads.push({
        url: image3DUrlSmall,
        filepath,
        type: '3d',
        size: 's',
        filename,
        identifier
      });
    } else {
      console.log(`✓ Already exists: ${filename}`);
      const key = `${identifier}_3d_s`;
      imageMapping[key] = `/images/molecules/3d-small/${filename}`;
      urlTracking[filename] = image3DUrlSmall;
    }
  }

  // Download with delay between requests to avoid rate limiting
  for (const download of downloads) {
    try {
      const identifierLabel = download.identifier || identifier;
      console.log(`Downloading ${download.type} ${download.size} for ${identifierLabel}...`);
      await downloadImage(download.url, download.filepath);
      console.log(`✓ Downloaded: ${download.filename}`);
      
      // Update mapping
      const key = `${identifier}_${download.type}_${download.size}`;
      imageMapping[key] = `/images/molecules/${download.type}${download.size === 's' ? '-small' : ''}/${download.filename}`;
      
      // Track URL for this file
      urlTracking[download.filename] = download.url;
      
      // Wait before next download to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, delay));
    } catch (error) {
      console.error(`✗ Failed to download ${download.type} ${download.size}:`, error.message);
    }
  }

  // Save mapping file with both paths and URL tracking
  const mappingData = {
    paths: imageMapping,
    urlTracking: urlTracking,
    version: '2.0' // New format version
  };
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mappingData, null, 2));
}

// If run directly, expect pubchemData JSON as argument
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node scripts/downloadPubChemImages.js <pubchemData.json>');
    console.log('Or import and use downloadMoleculeImages() function');
    process.exit(1);
  }
  
  const pubchemDataPath = args[0];
  const force = args.includes('--force') || args.includes('-f');
  
  try {
    const pubchemData = JSON.parse(fs.readFileSync(pubchemDataPath, 'utf8'));
    downloadMoleculeImages(pubchemData, 2000, force).then(() => {
      console.log('✓ Download complete!');
      process.exit(0);
    }).catch(err => {
      console.error('Error:', err);
      process.exit(1);
    });
  } catch (error) {
    console.error('Error reading pubchemData file:', error);
    process.exit(1);
  }
}

export { getImageFilename, IMAGE_DIRS, MAPPING_FILE };

