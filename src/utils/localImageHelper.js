/**
 * Helper to get local image paths instead of remote PubChem URLs
 */

// Cache for image mapping
let imageMapping = null;
let mappingLoadPromise = null;

/**
 * Load image mapping from JSON file
 */
async function loadImageMapping() {
  if (imageMapping !== null) return imageMapping;
  
  // If already loading, return the same promise
  if (mappingLoadPromise) return mappingLoadPromise;
  
  mappingLoadPromise = (async () => {
    try {
      const response = await fetch('/images/molecules/imageMapping.json');
      if (response.ok) {
        const data = await response.json();
        // Support both old format (simple object) and new format (with paths)
        if (data.paths) {
          imageMapping = data.paths;
        } else {
          imageMapping = data; // Old format
        }
        return imageMapping;
      } else {
        console.warn('Image mapping file not found, using remote URLs');
        imageMapping = {};
        return imageMapping;
      }
    } catch (error) {
      console.warn('Could not load image mapping, using remote URLs:', error);
      imageMapping = {};
      return imageMapping;
    }
  })();
  
  return mappingLoadPromise;
}

/**
 * Get local image path for a PubChem data object
 * @param {Object} pubchemData - PubChem data with cid and image URLs
 * @param {string} imageType - '2d', '2d-small', '3d', '3d-small'
 * @returns {string|null} Local image path or null if not found
 */
export async function getLocalImagePath(pubchemData, imageType = '2d') {
  if (!pubchemData) {
    return null;
  }

  // Need either CID or SID to look up images
  if (!pubchemData.cid && !pubchemData.sid) {
    return null;
  }

  const mapping = await loadImageMapping();
  
  // Format identifier to match download script format: CID903, SID1234, or CID903_SID1234
  let identifier;
  if (pubchemData.sid && pubchemData.cid) {
    identifier = `CID${pubchemData.cid}_SID${pubchemData.sid}`;
  } else if (pubchemData.sid) {
    identifier = `SID${pubchemData.sid}`;
  } else {
    identifier = `CID${pubchemData.cid}`;
  }
  
  const size = imageType.includes('small') ? 's' : 'l';
  const type = imageType.includes('3d') ? '3d' : '2d';
  
  const key = `${identifier}_${type}_${size}`;
  return mapping[key] || null;
}

/**
 * Update PubChem data object to use local image paths
 * @param {Object} pubchemData - PubChem data object
 * @returns {Promise<Object>} Updated PubChem data with local image paths
 */
export async function useLocalImages(pubchemData) {
  if (!pubchemData) return pubchemData;
  
  const updated = { ...pubchemData };
  
  // Get local paths (async)
  const local2D = await getLocalImagePath(pubchemData, '2d');
  const local2DSmall = await getLocalImagePath(pubchemData, '2d-small');
  const local3D = await getLocalImagePath(pubchemData, '3d');
  const local3DSmall = await getLocalImagePath(pubchemData, '3d-small');
  
  // Use local paths if available, otherwise fallback to remote URLs
  updated.image2DUrl = local2D || updated.image2DUrl;
  updated.image2DUrlSmall = local2DSmall || updated.image2DUrlSmall;
  updated.image3DUrl = local3D || updated.image3DUrl;
  updated.image3DUrlSmall = local3DSmall || updated.image3DUrlSmall;
  
  return updated;
}

/**
 * Synchronous version that uses cached mapping (for immediate use)
 * @param {Object} pubchemData - PubChem data object
 * @returns {Object} Updated PubChem data with local image paths (if mapping is loaded)
 */
export function useLocalImagesSync(pubchemData) {
  if (!pubchemData || imageMapping === null) {
    return pubchemData;
  }
  
  // Need either CID or SID to look up images
  if (!pubchemData.cid && !pubchemData.sid) {
    return pubchemData;
  }
  
  const updated = { ...pubchemData };
  
  // Format identifier to match download script format: CID903, SID1234, or CID903_SID1234
  let identifier;
  if (updated.sid && updated.cid) {
    identifier = `CID${updated.cid}_SID${updated.sid}`;
  } else if (updated.sid) {
    identifier = `SID${updated.sid}`;
  } else {
    identifier = `CID${updated.cid}`;
  }
  
  // Try to get local paths from cached mapping
  const local2D = imageMapping[`${identifier}_2d_l`];
  const local2DSmall = imageMapping[`${identifier}_2d_s`];
  const local3D = imageMapping[`${identifier}_3d_l`];
  const local3DSmall = imageMapping[`${identifier}_3d_s`];
  
  if (local2D) updated.image2DUrl = local2D;
  if (local2DSmall) updated.image2DUrlSmall = local2DSmall;
  if (local3D) updated.image3DUrl = local3D;
  if (local3DSmall) updated.image3DUrlSmall = local3DSmall;
  
  return updated;
}

