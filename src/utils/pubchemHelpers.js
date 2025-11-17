/**
 * Shared utilities for PubChem data fetching and display
 * Used across NodeDetail, ArrowDetail, and other components
 */

import { fetchCompoundWithFallback } from '../services/pubchemService.js';
import { getAlternativeNames } from './moleculeAlternatives.js';
import { loadCacheFromStorage, saveToStorage, getFromStorage } from './pubchemCache.js';

/**
 * Normalize molecule name for PubChem search
 * Handles CO₂/CO2 conversion and other special cases
 * Also removes parenthetical abbreviations like "(PEP)" from names
 * Removes "(deoxy)" prefix for PubChem searches
 */
export function normalizeMoleculeName(moleculeName) {
  if (moleculeName === 'CO₂' || moleculeName === 'CO2') {
    return 'Carbon dioxide';
  }
  
  let normalized = moleculeName;
  
  // Remove "(deoxy)" prefix from the beginning (case-insensitive, with optional spaces)
  // Pattern: matches "(deoxy)" at the start, with optional spaces before and after
  normalized = normalized.replace(/^\s*\(deoxy\)\s*/i, '').trim();
  
  // Remove parenthetical abbreviations like "(PEP)", "(ATP)", etc. from the end
  // This helps match names like "Phosphoenolpyruvate (PEP)" to "Phosphoenolpyruvate"
  // Pattern: matches parentheses with optional spaces, e.g., " (PEP)", "(ATP)", etc.
  normalized = normalized.replace(/\s*\([^)]+\)\s*$/, '').trim();
  
  // Convert superscript plus (⁺) to regular plus (+) for PubChem searches
  // This helps with molecules like NAD⁺, NADP⁺, H⁺, etc.
  normalized = normalized.replace(/⁺/g, '+');
  
  return normalized || moleculeName; // Return original if normalization results in empty string
}

/**
 * Fetch PubChem data for a molecule with caching (localStorage + in-memory)
 * @param {string} moleculeName - Name of the molecule
 * @param {Map} cache - Optional in-memory cache map (for backward compatibility)
 * @returns {Promise<Object>} PubChem data
 */
export async function fetchPubChemData(moleculeName, cache) {
  // Check in-memory cache first (if provided)
  if (cache && cache.has(moleculeName)) {
    return cache.get(moleculeName);
  }
  
  // Check localStorage cache
  const cachedData = getFromStorage(moleculeName);
  if (cachedData) {
    // Also update in-memory cache if provided
    if (cache) {
      cache.set(moleculeName, cachedData);
    }
    return cachedData;
  }
  
  // Normalize name for search
  const searchName = normalizeMoleculeName(moleculeName);
  
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
  
  const pubchemData = await fetchCompoundWithFallback(searchName, alternativeNames);
  
  // Save to localStorage
  saveToStorage(moleculeName, pubchemData);
  
  // Also update in-memory cache if provided
  if (cache) {
    cache.set(moleculeName, pubchemData);
  }
  
  return pubchemData;
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
    const pubchemData = await fetchPubChemData(moleculeName, cache);
    displayPubChemData(container, pubchemData, loadingElement);
  } catch (error) {
    console.error(`Error fetching PubChem data for ${moleculeName}:`, error);
    
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

