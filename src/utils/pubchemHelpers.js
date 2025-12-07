/**
 * Shared utilities for PubChem data fetching and display
 * Used across NodeDetail, ArrowDetail, and other components
 */

import { fetchCompoundWithFallback, createSidBasedPubChemData, generateSidImageUrl, PUBCHEM_IMAGE_VERSION, fetchCompoundByCid } from '../services/pubchemService.js';
import { getAlternativeNames } from './moleculeAlternatives.js';
import { getPubChemDataByName, savePubChemDataToNodeCache, getNodeByNameFromStorage, removeNodeFromStorage, shouldInvalidateNodeCache } from './nodeCache.js';
import { useLocalImages } from './localImageHelper.js';

/**
 * Normalize molecule name for PubChem search
 * Handles CO₂/CO2 conversion and other special cases
 * Also removes parenthetical abbreviations like "(PEP)" from names
 * Removes parenthesized prefixes (e.g., "(deoxy)", "(n-2)") from the beginning
 */
export function normalizeMoleculeName(moleculeName) {
  if (moleculeName === 'CO₂' || moleculeName === 'CO2') {
    return 'Carbon dioxide';
  }
  
  let normalized = moleculeName;
  
  // Remove numeric coefficients from the beginning (e.g., "2 Acetyl-CoA" → "Acetyl-CoA")
  // Handles both whole numbers (e.g., "2") and fractions (e.g., "1/2")
  // Pattern: matches numbers or fractions followed by a space at the start
  normalized = normalized.replace(/^(\d+\/\d+|\d+)\s+/, '').trim();
  
  // Remove any parenthesized prefix from the beginning (e.g., "(deoxy)", "(n-2)", etc.)
  // Pattern: matches any content in parentheses at the start, with optional spaces before and after
  normalized = normalized.replace(/^\s*\([^)]+\)\s*/i, '').trim();
  
  // Remove parenthetical abbreviations like "(PEP)", "(ATP)", "(HMG-CoA)", etc. from the end
  // This helps match names like "Phosphoenolpyruvate (PEP)" to "Phosphoenolpyruvate"
  // or "β-Hydroxy-β-methylglutaryl-CoA (HMG-CoA)" to "β-Hydroxy-β-methylglutaryl-CoA"
  // Pattern: matches parentheses with optional spaces, e.g., " (PEP)", "(ATP)", etc.
  normalized = normalized.replace(/\s*\([^)]+\)\s*$/, '').trim();
  
  // Convert superscript plus (⁺) to regular plus (+) for PubChem searches
  // This helps with molecules like NAD⁺, NADP⁺, H⁺, etc.
  normalized = normalized.replace(/⁺/g, '+');
  
  return normalized || moleculeName; // Return original if normalization results in empty string
}

/**
 * Regenerate image URLs with the specified version
 * @param {Object} cachedData - Cached PubChem data
 * @param {number} imageVersion - Desired image version
 * @param {Object} molecule - Optional molecule object with pubchemSid
 * @returns {Object} Updated PubChem data with regenerated URLs
 */
function regenerateImageUrls(cachedData, imageVersion, molecule = null) {
  if (!cachedData) return cachedData;
  
  const updatedData = { ...cachedData };
  
  // Update SID and version fields if provided
  const sid = molecule?.pubchemSid || cachedData.sid;
  if (sid) {
    updatedData.sid = sid.toString();
    updatedData.image2DUrl = generateSidImageUrl(sid, 'l', imageVersion);
    updatedData.image2DUrlSmall = generateSidImageUrl(sid, 's', imageVersion);
  } else if (cachedData.cid) {
    // Regenerate CID-based URLs with the new version
    updatedData.image2DUrl = `https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${cachedData.cid}&t=l&version=${imageVersion}`;
    updatedData.image2DUrlSmall = `https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${cachedData.cid}&t=s&version=${imageVersion}`;
  }
  
  // Update imageVersion field
  if (imageVersion !== null && imageVersion !== undefined) {
    updatedData.imageVersion = imageVersion;
  }
  
  return updatedData;
}

/**
 * Fetch PubChem data for a molecule with caching (localStorage + in-memory)
 * @param {string} moleculeName - Name of the molecule
 * @param {Map} cache - Optional in-memory cache map (for backward compatibility)
 * @param {Object} molecule - Optional molecule object that may contain pubchemSid
 * @returns {Promise<Object>} PubChem data
 */
export async function fetchPubChemData(moleculeName, cache, molecule = null) {
  // Get image version from molecule object if available
  const imageVersion = molecule?.pubchemImageVersion ?? null;
  
  // Check if we need to invalidate cache based on molecule node data
  if (molecule) {
    // Check in-memory cache first
    if (cache && cache.has(moleculeName)) {
      const cachedData = cache.get(moleculeName);
      if (shouldInvalidateNodeCache({ pubchemData: cachedData }, molecule)) {
        console.log(`Cache invalidated for ${moleculeName} (SID or version changed)`);
        cache.delete(moleculeName);
        // Remove from node cache by finding the node
        const nodeData = getNodeByNameFromStorage(moleculeName);
        if (nodeData) {
          removeNodeFromStorage(nodeData.id);
        }
      }
    } else {
      // Check node cache
      const nodeData = getNodeByNameFromStorage(moleculeName);
      if (nodeData && shouldInvalidateNodeCache(nodeData, molecule)) {
        console.log(`Cache invalidated for ${moleculeName} (SID or version changed)`);
        removeNodeFromStorage(nodeData.id);
        // Also remove from in-memory cache if provided
        if (cache) {
          cache.delete(moleculeName);
        }
      }
    }
  }
  
  // Check in-memory cache first (if provided)
  if (cache && cache.has(moleculeName)) {
    const cachedData = cache.get(moleculeName);
    // If imageVersion is specified, regenerate URLs with the correct version
    if (imageVersion !== null && cachedData) {
      const updatedData = regenerateImageUrls(cachedData, imageVersion, molecule);
      return useLocalImages(updatedData);
    }
    return useLocalImages(cachedData);
  }
  
  // Check node cache
  const nodeData = getNodeByNameFromStorage(moleculeName);
  if (nodeData && nodeData.pubchemData) {
    const cachedData = nodeData.pubchemData;
    // If imageVersion or SID is specified, regenerate URLs with the correct version
    const needsUpdate = (imageVersion !== null) || (molecule?.pubchemSid && cachedData.sid !== molecule.pubchemSid?.toString());
    if (needsUpdate) {
      const updatedData = regenerateImageUrls(cachedData, imageVersion, molecule);
      // Save updated data back to node cache
      savePubChemDataToNodeCache(moleculeName, updatedData, nodeData.id);
      // Also update in-memory cache if provided
      if (cache) {
        cache.set(moleculeName, updatedData);
      }
      return useLocalImages(updatedData);
    }
    // Also update in-memory cache if provided
    if (cache) {
      cache.set(moleculeName, cachedData);
    }
    return useLocalImages(cachedData);
  }
  
  // Normalize name for search
  const searchName = normalizeMoleculeName(moleculeName);
  
  // If we have a pubchemCid, use it directly
  if (molecule?.pubchemCid !== undefined && molecule?.pubchemCid !== null) {
    try {
      const cidData = await fetchCompoundByCid(molecule.pubchemCid, imageVersion);
      
      // Override name with our molecule name if different (usually we prefer our display name)
      if (cidData) {
        cidData.name = moleculeName;
      }
      
      savePubChemDataToNodeCache(moleculeName, cidData);
      if (cache) cache.set(moleculeName, cidData);
      return useLocalImages(cidData);
    } catch (error) {
      console.warn(`Failed to fetch by CID ${molecule.pubchemCid}, falling back to name search:`, error);
      // Fall through to name search
    }
  }

  // Try alternative names
  let alternativeNames = getAlternativeNames(moleculeName);
  
  // If the original name starts with "(deoxy)", also try "Deoxy" prefix version
  // For example: "(deoxy) Guanosine monophosphate" -> try "Deoxyguanosine monophosphate"
  if (/^\s*\(deoxy\)/i.test(moleculeName)) {
    const deoxyVersion = searchName.replace(/^([A-Z][a-z]*)/, (match) => {
      // Capitalize first letter and add "Deoxy" prefix
      return 'Deoxy' + match;
    });
    // Add "Deoxy" version to alternatives if it's different from searchName
    if (deoxyVersion !== searchName && !alternativeNames.includes(deoxyVersion)) {
      alternativeNames = [deoxyVersion, ...alternativeNames];
    }
  }
  
  try {
    const pubchemData = await fetchCompoundWithFallback(searchName, alternativeNames, imageVersion);
    
    // Save to node cache (save original with remote URLs)
    savePubChemDataToNodeCache(moleculeName, pubchemData);
    
    // Also update in-memory cache if provided
    if (cache) {
      cache.set(moleculeName, pubchemData);
    }
    
    // Return with local images if available
    return useLocalImages(pubchemData);
  } catch (error) {
    // If fetching fails and we have a pubchemSid, use SID-based image URLs
    const sid = molecule?.pubchemSid;
    if (sid) {
      console.log(`Using SID-based image URLs for ${moleculeName} (SID: ${sid})`);
      const sidData = createSidBasedPubChemData(moleculeName, sid, imageVersion);
      
      // Save to node cache
      savePubChemDataToNodeCache(moleculeName, sidData);
      
      // Also update in-memory cache if provided
      if (cache) {
        cache.set(moleculeName, sidData);
      }
      
      // Return with local images if available
      return useLocalImages(sidData);
    }
    
    // Re-throw if no SID fallback available
    throw error;
  }
}

/**
 * Display PubChem data in a container element
 * @param {HTMLElement} container - Container to display data in
 * @param {Object} pubchemData - PubChem data object
 * @param {HTMLElement} loadingElement - Loading element to replace
 */
export function displayPubChemData(container, pubchemData, loadingElement) {
  const pubchemInfo = document.createElement('div');
  pubchemInfo.className = 'pubchem-data';
  pubchemInfo.innerHTML = `
    <div class="pubchem-header">
      <strong>PubChem Data</strong>
      <a href="${pubchemData.pubchemUrl}" target="_blank" class="pubchem-link">View on PubChem →</a>
    </div>
    ${pubchemData.image2DUrl ? `
      <div class="pubchem-structures">
        <div class="structure-image-container">
          <div class="structure-image-label">2D Structure</div>
          <div class="structure-image-wrapper">
            <img src="${pubchemData.image2DUrl}" 
                 alt="2D structure of ${pubchemData.name}" 
                 class="structure-image"
                 loading="lazy"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div class="structure-image-error" style="display:none;">
              <small>Image failed to load</small>
            </div>
          </div>
        </div>
        ${pubchemData.image3DUrl ? `
          <div class="structure-image-container">
            <div class="structure-image-label">3D Structure</div>
            <div class="structure-image-wrapper">
              <img src="${pubchemData.image3DUrl}" 
                   alt="3D structure of ${pubchemData.name}" 
                   class="structure-image"
                   loading="lazy"
                   onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
              <div class="structure-image-error" style="display:none;">
                <small>Image failed to load</small>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    ` : ''}
    ${pubchemData.description ? `
      <div class="pubchem-description">
        <strong>Description:</strong>
        <div class="description-text">${pubchemData.description}</div>
      </div>
    ` : ''}
    <div class="pubchem-properties">
      ${pubchemData.molecularFormula ? `
        <div class="pubchem-property">
          <strong>Molecular Formula:</strong> ${pubchemData.molecularFormula}
        </div>
      ` : ''}
      ${pubchemData.molecularWeight ? `
        <div class="pubchem-property">
          <strong>Molecular Weight:</strong> ${pubchemData.molecularWeight} g/mol
        </div>
      ` : ''}
      ${pubchemData.canonicalSmiles ? `
        <div class="pubchem-property">
          <strong>Canonical SMILES:</strong> 
          <code class="smiles-code">${pubchemData.canonicalSmiles}</code>
        </div>
      ` : ''}
      ${pubchemData.isomericSmiles ? `
        <div class="pubchem-property">
          <strong>Isomeric SMILES:</strong> 
          <code class="smiles-code">${pubchemData.isomericSmiles}</code>
        </div>
      ` : ''}
      ${pubchemData.inchi ? `
        <div class="pubchem-property">
          <strong>InChI:</strong> 
          <code class="inchi-code">${pubchemData.inchi}</code>
        </div>
      ` : ''}
      ${pubchemData.inchiKey ? `
        <div class="pubchem-property">
          <strong>InChI Key:</strong> 
          <code class="inchikey-code">${pubchemData.inchiKey}</code>
        </div>
      ` : ''}
      ${pubchemData.iupacName ? `
        <div class="pubchem-property">
          <strong>IUPAC Name:</strong> ${pubchemData.iupacName}
        </div>
      ` : ''}
    </div>
  `;
  
  // Replace loading indicator with PubChem data
  if (loadingElement) {
    loadingElement.replaceWith(pubchemInfo);
  } else {
    container.appendChild(pubchemInfo);
  }
}

/**
 * Generate structure image URL from SMILES string
 * Uses a SMILES-to-image service as fallback when PubChem is unavailable
 * @param {string} smiles - SMILES string
 * @returns {string} Image URL
 */
function getSmilesImageUrl(smiles) {
  if (!smiles) return null;
  // Use a SMILES-to-image service
  // Option 1: Use a dedicated SMILES renderer API (e.g., from CDK or similar)
  // Option 2: Use a URL-based service that accepts SMILES
  // For now, we'll use a service that can render SMILES
  // Note: This service may require CORS or may not work for all SMILES
  // Alternative services to consider:
  // - RDKit.js (client-side rendering)
  // - SmilesDrawer (client-side rendering)
  // - A custom backend service
  try {
    // Use a SMILES-to-image URL service
    // This is a placeholder - you may need to implement a custom service or use a library
    const encodedSmiles = encodeURIComponent(smiles);
    // Try using a public SMILES renderer service
    // Note: Many services require POST requests or have CORS restrictions
    // For now, we'll return null and show the SMILES string instead
    // In production, you might want to use a client-side library like SmilesDrawer
    return null; // Return null to show SMILES text instead of trying a potentially broken URL
  } catch (error) {
    console.warn('Error generating SMILES image URL:', error);
    return null;
  }
}

/**
 * Fetch and display PubChem data with error handling
 * @param {string} moleculeName - Name of the molecule
 * @param {string} containerId - ID of container element
 * @param {Map} cache - Cache map
 * @param {Object} molecule - Optional molecule object with SMILES string for fallback
 */
export async function fetchAndDisplayPubChem(moleculeName, containerId, cache, molecule = null) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const loadingElement = container.querySelector('.pubchem-loading');
  if (!loadingElement) return;
  
  try {
    const pubchemData = await fetchPubChemData(moleculeName, cache, molecule);
    displayPubChemData(container, pubchemData, loadingElement);
  } catch (error) {
    console.error(`Error fetching PubChem data for ${moleculeName}:`, error);
    
    // If we have a pubchemSid, try to use SID-based image URLs
    const sid = molecule?.pubchemSid;
    const imageVersion = molecule?.pubchemImageVersion ?? null;
    if (sid) {
      const sidData = createSidBasedPubChemData(moleculeName, sid, imageVersion);
      const sidDataWithLocalImages = await useLocalImages(sidData);
      displayPubChemData(container, sidDataWithLocalImages, loadingElement);
      return;
    }
    
    // If we have a SMILES string, try to generate a structure image
    const smiles = molecule?.smiles;
    if (smiles) {
      const smilesImageUrl = getSmilesImageUrl(smiles);
      loadingElement.innerHTML = `
        <div class="pubchem-error">
          <small>PubChem data unavailable. <a href="https://pubchem.ncbi.nlm.nih.gov/#query=${encodeURIComponent(moleculeName)}" target="_blank">Search on PubChem</a></small>
          ${smilesImageUrl ? `
            <div class="smiles-fallback-structure" style="margin-top: 15px;">
              <div class="structure-image-label">Structure (from SMILES)</div>
              <div class="structure-image-wrapper">
                <img src="${smilesImageUrl}" 
                     alt="Structure of ${moleculeName}" 
                     class="structure-image"
                     loading="lazy"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div class="structure-image-error" style="display:none;">
                  <small>Structure image unavailable</small>
                </div>
              </div>
              <div style="margin-top: 10px; font-size: 0.85em; color: #666;">
                <strong>SMILES:</strong> <code>${smiles}</code>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    } else {
      loadingElement.innerHTML = `
        <div class="pubchem-error">
          <small>PubChem data unavailable. <a href="https://pubchem.ncbi.nlm.nih.gov/#query=${encodeURIComponent(moleculeName)}" target="_blank">Search on PubChem</a></small>
        </div>
      `;
    }
  }
}

