/**
 * Node Data Cache using localStorage
 * Persists node data with PubChem information across page reloads
 * This unified cache replaces the previous separate PubChem cache
 */

const NODE_CACHE_KEY = 'metabolism_nodes_cache';
const NODE_CACHE_VERSION = '1.0.0'; // Increment to invalidate old node cache

// Singleton in-memory cache to avoid reloading from localStorage on every access
let inMemoryNodeCache = null;
let nodeCacheLoaded = false;

// ============================================================================
// Node Cache Functions (for caching node data with PubChem information)
// ============================================================================

/**
 * Get all cached node data from localStorage
 * Uses singleton pattern to load only once
 * @returns {Map<string, Object>} Map of node IDs to node data with PubChem info
 */
export function loadNodeCacheFromStorage() {
  // Return cached instance if already loaded
  if (nodeCacheLoaded && inMemoryNodeCache !== null) {
    return inMemoryNodeCache;
  }
  
  try {
    const cached = localStorage.getItem(NODE_CACHE_KEY);
    if (!cached) {
      inMemoryNodeCache = new Map();
      nodeCacheLoaded = true;
      return inMemoryNodeCache;
    }
    
    const parsed = JSON.parse(cached);
    
    // Check cache version
    if (parsed.version !== NODE_CACHE_VERSION) {
      console.log('Node cache version mismatch, clearing cache');
      clearNodeCache();
      inMemoryNodeCache = new Map();
      nodeCacheLoaded = true;
      return inMemoryNodeCache;
    }
    
    // Convert array of [key, value] pairs back to Map
    inMemoryNodeCache = new Map(parsed.data || []);
    console.log(`Loaded ${inMemoryNodeCache.size} node entries from localStorage`);
    nodeCacheLoaded = true;
    return inMemoryNodeCache;
  } catch (error) {
    console.warn('Error loading node cache from localStorage:', error);
    inMemoryNodeCache = new Map();
    nodeCacheLoaded = true;
    return inMemoryNodeCache;
  }
}

/**
 * Save node data with PubChem information to localStorage
 * @param {string} nodeId - ID of the node
 * @param {Object} nodeData - Node data with PubChem information
 */
export function saveNodeToStorage(nodeId, nodeData) {
  try {
    const cache = loadNodeCacheFromStorage();
    cache.set(nodeId, nodeData);
    
    // Convert Map to array of [key, value] pairs for JSON serialization
    const dataToStore = {
      version: NODE_CACHE_VERSION,
      data: Array.from(cache.entries()),
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(NODE_CACHE_KEY, JSON.stringify(dataToStore));
  } catch (error) {
    console.warn(`Error saving node data for ${nodeId} to localStorage:`, error);
    // If storage is full, try to clear some space
    if (error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded, clearing old node cache');
      clearNodeCache();
    }
  }
}

/**
 * Save multiple nodes to cache at once
 * @param {Array<Object>} nodes - Array of node objects with PubChem data
 */
export function saveNodesToStorage(nodes) {
  try {
    const cache = loadNodeCacheFromStorage();
    
    nodes.forEach(node => {
      if (node && node.id) {
        cache.set(node.id, node);
      }
    });
    
    // Convert Map to array of [key, value] pairs for JSON serialization
    const dataToStore = {
      version: NODE_CACHE_VERSION,
      data: Array.from(cache.entries()),
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(NODE_CACHE_KEY, JSON.stringify(dataToStore));
    console.log(`Saved ${nodes.length} nodes to cache`);
  } catch (error) {
    console.warn('Error saving nodes to localStorage:', error);
    // If storage is full, try to clear some space
    if (error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded, clearing old node cache');
      clearNodeCache();
    }
  }
}

/**
 * Get cached node data from localStorage
 * @param {string} nodeId - ID of the node
 * @returns {Object|null} Cached node data or null if not found
 */
export function getNodeFromStorage(nodeId) {
  try {
    const cache = loadNodeCacheFromStorage();
    return cache.get(nodeId) || null;
  } catch (error) {
    console.warn(`Error getting node data for ${nodeId} from localStorage:`, error);
    return null;
  }
}

/**
 * Get all cached nodes from storage
 * @returns {Map<string, Object>} Map of all cached nodes
 */
export function getAllNodesFromStorage() {
  return loadNodeCacheFromStorage();
}

/**
 * Get node data by molecule name (searches all cached nodes)
 * @param {string} moleculeName - Name of the molecule
 * @returns {Object|null} Cached node data or null if not found
 */
export function getNodeByNameFromStorage(moleculeName) {
  try {
    const cache = loadNodeCacheFromStorage();
    // Search through all nodes to find one matching the molecule name
    for (const [nodeId, nodeData] of cache.entries()) {
      if (nodeData.name === moleculeName || 
          nodeData.name?.toLowerCase() === moleculeName?.toLowerCase()) {
        return nodeData;
      }
    }
    return null;
  } catch (error) {
    console.warn(`Error getting node data for ${moleculeName} from localStorage:`, error);
    return null;
  }
}

/**
 * Check if cached node data needs to be invalidated based on molecule node data
 * @param {Object} cachedNodeData - Cached node data (with pubchemData property)
 * @param {Object} molecule - Molecule node object with pubchemSid and pubchemImageVersion
 * @returns {boolean} True if cache should be invalidated
 */
export function shouldInvalidateNodeCache(cachedNodeData, molecule) {
  if (!cachedNodeData || !molecule) return false;
  
  const cachedPubchemData = cachedNodeData.pubchemData;
  if (!cachedPubchemData) return false;
  
  const cachedSid = cachedPubchemData.sid?.toString();
  const nodeSid = molecule.pubchemSid?.toString();
  const cachedVersion = cachedPubchemData.imageVersion;
  const nodeVersion = molecule.pubchemImageVersion;
  
  // Invalidate if SID changed
  if (nodeSid && cachedSid !== nodeSid) {
    return true;
  }
  
  // Invalidate if CID changed
  const cachedCid = cachedPubchemData.cid?.toString();
  const nodeCid = molecule.pubchemCid?.toString();
  if (nodeCid && cachedCid !== nodeCid) {
    return true;
  }

  // Invalidate if version changed
  if (nodeVersion !== null && nodeVersion !== undefined && cachedVersion !== nodeVersion) {
    return true;
  }
  
  // Invalidate if cached has SID but node doesn't (or vice versa)
  if ((cachedSid && !nodeSid) || (!cachedSid && nodeSid)) {
    return true;
  }
  
  return false;
}

/**
 * Save PubChem data for a molecule by creating/updating a node entry
 * This is a convenience function that maintains backward compatibility
 * @param {string} moleculeName - Name of the molecule
 * @param {Object} pubchemData - PubChem data to cache
 * @param {string} nodeId - Optional node ID (defaults to molecule name if not provided)
 */
export function savePubChemDataToNodeCache(moleculeName, pubchemData, nodeId = null) {
  const targetNodeId = nodeId || moleculeName;
  
  // Try to get existing node data
  const existingNode = getNodeFromStorage(targetNodeId);
  
  // Create or update node data
  const nodeData = existingNode || {
    id: targetNodeId,
    name: moleculeName
  };
  
  // Update PubChem data
  nodeData.pubchemData = pubchemData;
  nodeData.cachedAt = new Date().toISOString();
  
  // Save to cache
  saveNodeToStorage(targetNodeId, nodeData);
}

/**
 * Get PubChem data by molecule name (from node cache)
 * @param {string} moleculeName - Name of the molecule
 * @returns {Object|null} Cached PubChem data or null if not found
 */
export function getPubChemDataByName(moleculeName) {
  const nodeData = getNodeByNameFromStorage(moleculeName);
  return nodeData?.pubchemData || null;
}

/**
 * Clear all node data from localStorage
 */
export function clearNodeCache() {
  try {
    localStorage.removeItem(NODE_CACHE_KEY);
    // Reset in-memory cache
    inMemoryNodeCache = new Map();
    nodeCacheLoaded = true;
    console.log('Node cache cleared from localStorage');
  } catch (error) {
    console.warn('Error clearing node cache from localStorage:', error);
  }
}

/**
 * Remove a specific node from cache
 * @param {string} nodeId - ID of the node to remove
 */
export function removeNodeFromStorage(nodeId) {
  try {
    const cache = loadNodeCacheFromStorage();
    if (cache.has(nodeId)) {
      cache.delete(nodeId);
      
      // Convert Map to array of [key, value] pairs for JSON serialization
      const dataToStore = {
        version: NODE_CACHE_VERSION,
        data: Array.from(cache.entries()),
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(NODE_CACHE_KEY, JSON.stringify(dataToStore));
      console.log(`Removed ${nodeId} from node cache`);
      return true;
    }
    return false;
  } catch (error) {
    console.warn(`Error removing ${nodeId} from cache:`, error);
    return false;
  }
}

/**
 * Get node cache statistics
 * @returns {Object} Cache statistics
 */
export function getNodeCacheStats() {
  try {
    const cache = loadNodeCacheFromStorage();
    const cached = localStorage.getItem(NODE_CACHE_KEY);
    const parsed = cached ? JSON.parse(cached) : null;
    
    return {
      size: cache.size,
      lastUpdated: parsed?.lastUpdated || null,
      version: parsed?.version || null
    };
  } catch (error) {
    console.warn('Error getting node cache stats:', error);
    return {
      size: 0,
      lastUpdated: null,
      version: null
    };
  }
}

