/**
 * Shared utilities for PubChem data fetching and display
 * Used across MoleculeView, ReactionDetail, and other components
 */

import { fetchCompoundWithFallback } from '../services/pubchemService.js';
import { getAlternativeNames } from './moleculeAlternatives.js';

/**
 * Normalize molecule name for PubChem search
 * Handles CO₂/CO2 conversion and other special cases
 */
export function normalizeMoleculeName(moleculeName) {
  if (moleculeName === 'CO₂' || moleculeName === 'CO2') {
    return 'Carbon dioxide';
  }
  return moleculeName;
}

/**
 * Fetch PubChem data for a molecule with caching
 * @param {string} moleculeName - Name of the molecule
 * @param {Map} cache - Cache map to store results
 * @returns {Promise<Object>} PubChem data
 */
export async function fetchPubChemData(moleculeName, cache) {
  // Check cache first
  if (cache && cache.has(moleculeName)) {
    return cache.get(moleculeName);
  }
  
  // Normalize name for search
  const searchName = normalizeMoleculeName(moleculeName);
  
  // Try alternative names
  const alternativeNames = getAlternativeNames(moleculeName);
  const pubchemData = await fetchCompoundWithFallback(searchName, alternativeNames);
  
  // Cache the result
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
 * Fetch and display PubChem data with error handling
 * @param {string} moleculeName - Name of the molecule
 * @param {string} containerId - ID of container element
 * @param {Map} cache - Cache map
 */
export async function fetchAndDisplayPubChem(moleculeName, containerId, cache) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const loadingElement = container.querySelector('.pubchem-loading');
  if (!loadingElement) return;
  
  try {
    const pubchemData = await fetchPubChemData(moleculeName, cache);
    displayPubChemData(container, pubchemData, loadingElement);
  } catch (error) {
    console.error(`Error fetching PubChem data for ${moleculeName}:`, error);
    loadingElement.innerHTML = `
      <div class="pubchem-error">
        <small>PubChem data unavailable. <a href="https://pubchem.ncbi.nlm.nih.gov/#query=${encodeURIComponent(moleculeName)}" target="_blank">Search on PubChem</a></small>
      </div>
    `;
  }
}

