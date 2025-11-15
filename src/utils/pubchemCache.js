/**
 * PubChem Data Cache using localStorage
 * Persists PubChem data across page reloads
 */

const CACHE_KEY = 'pubchem_data_cache';
const CACHE_VERSION = '1.0.0'; // Increment to invalidate old cache

// Singleton in-memory cache to avoid reloading from localStorage on every access
let inMemoryCache = null;
let cacheLoaded = false;

/**
 * Get all cached PubChem data from localStorage
 * Uses singleton pattern to load only once
 * @returns {Map<string, Object>} Map of molecule names to PubChem data
 */
export function loadCacheFromStorage() {
  // Return cached instance if already loaded
  if (cacheLoaded && inMemoryCache !== null) {
    return inMemoryCache;
  }
  
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) {
      inMemoryCache = new Map();
      cacheLoaded = true;
      return inMemoryCache;
    }
    
    const parsed = JSON.parse(cached);
    
    // Check cache version
    if (parsed.version !== CACHE_VERSION) {
      console.log('PubChem cache version mismatch, clearing cache');
      clearCache();
      inMemoryCache = new Map();
      cacheLoaded = true;
      return inMemoryCache;
    }
    
    // Convert array of [key, value] pairs back to Map
    inMemoryCache = new Map(parsed.data || []);
    console.log(`Loaded ${inMemoryCache.size} PubChem entries from localStorage`);
    cacheLoaded = true;
    return inMemoryCache;
  } catch (error) {
    console.warn('Error loading PubChem cache from localStorage:', error);
    inMemoryCache = new Map();
    cacheLoaded = true;
    return inMemoryCache;
  }
}

/**
 * Save PubChem data to localStorage
 * @param {string} moleculeName - Name of the molecule
 * @param {Object} pubchemData - PubChem data to cache
 */
export function saveToStorage(moleculeName, pubchemData) {
  try {
    const cache = loadCacheFromStorage();
    cache.set(moleculeName, pubchemData);
    
    // Convert Map to array of [key, value] pairs for JSON serialization
    const dataToStore = {
      version: CACHE_VERSION,
      data: Array.from(cache.entries()),
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(dataToStore));
  } catch (error) {
    console.warn(`Error saving PubChem data for ${moleculeName} to localStorage:`, error);
    // If storage is full, try to clear some space
    if (error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded, clearing old cache');
      clearCache();
    }
  }
}

/**
 * Get cached PubChem data from localStorage
 * @param {string} moleculeName - Name of the molecule
 * @returns {Object|null} Cached PubChem data or null if not found
 */
export function getFromStorage(moleculeName) {
  try {
    const cache = loadCacheFromStorage();
    return cache.get(moleculeName) || null;
  } catch (error) {
    console.warn(`Error getting PubChem data for ${moleculeName} from localStorage:`, error);
    return null;
  }
}

/**
 * Clear all PubChem data from localStorage
 */
export function clearCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
    // Reset in-memory cache
    inMemoryCache = new Map();
    cacheLoaded = true;
    console.log('PubChem cache cleared from localStorage');
  } catch (error) {
    console.warn('Error clearing PubChem cache from localStorage:', error);
  }
}

/**
 * Get cache statistics
 * @returns {Object} Cache statistics
 */
export function getCacheStats() {
  try {
    const cache = loadCacheFromStorage();
    const cached = localStorage.getItem(CACHE_KEY);
    const parsed = cached ? JSON.parse(cached) : null;
    
    return {
      size: cache.size,
      lastUpdated: parsed?.lastUpdated || null,
      version: parsed?.version || null
    };
  } catch (error) {
    console.warn('Error getting cache stats:', error);
    return {
      size: 0,
      lastUpdated: null,
      version: null
    };
  }
}

