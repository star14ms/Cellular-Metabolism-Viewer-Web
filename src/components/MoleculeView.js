/**
 * Molecule View Component
 * 
 * Displays detailed information about a molecule (from PubChem)
 */

import { fetchAndDisplayPubChem } from '../utils/pubchemHelpers.js';

/**
 * Remove coefficients from molecule names (e.g., "1/2 O₂" → "O₂", "2 H⁺" → "H⁺")
 * @param {string} moleculeName - The molecule name that may contain coefficients
 * @returns {string} - The molecule name without coefficients
 */
function removeCoefficients(moleculeName) {
  if (!moleculeName || typeof moleculeName !== 'string') return moleculeName;
  
  // Remove patterns like "1/2 ", "2 ", "3 ", etc. at the start
  // Also handle fractional coefficients like "1/2", "3/2", etc.
  return moleculeName.replace(/^(\d+\/\d+|\d+)\s+/, '').trim();
}

export class MoleculeView {
  constructor(container) {
    this.container = container;
    this.currentMolecule = null;
    this.pubchemCache = new Map();
    this.viewerContainer = null; // Will be set to the metabolism viewer container
  }
  
  setViewerContainer(viewerContainer) {
    this.viewerContainer = viewerContainer;
  }
  
  render(molecule, reactionNode = null, isDirectNodeClick = true) {
    if (!molecule) {
      this.container.innerHTML = '<div class="detail-placeholder">Click a compound node to view molecule details</div>';
      this.currentMolecule = null; // Clear the current molecule
      return;
    }
    
    this.currentMolecule = molecule;
    
    // Remove coefficients for display
    const displayName = removeCoefficients(molecule.name);
    
    // Check if this is an enzyme/carrier node (protein complex or mobile carrier)
    // These nodes represent enzymes/carriers, not substrates/products
    // Only show "Substrate → Product" section for direct node clicks, not for by-molecule clicks
    const isEnzymeOrCarrierNode = isDirectNodeClick && reactionNode && (reactionNode.isProteinComplex === true || reactionNode.isMobileCarrier === true);
    
    const html = `
      <div class="molecule-detail">
        <div class="detail-header">
          <h2>${displayName}</h2>
        </div>
        
        ${isEnzymeOrCarrierNode ? `
          <div class="detail-section">
            <h3>Substrate → Product</h3>
            <div class="reaction-flow">
              <div class="reaction-reactants">
                ${reactionNode.byreactant ? (() => {
                  // Handle different byreactant formats: string, array, or object with molecules array
                  // Show coefficients in Substrate → Product section
                  if (typeof reactionNode.byreactant === 'string') {
                    return `
                      <div class="reaction-molecule clickable-molecule co-reactant" 
                           data-molecule-name="${reactionNode.byreactant}" 
                           data-molecule-id="">
                        <strong>${reactionNode.byreactant}</strong>
                      </div>
                    `;
                  } else if (Array.isArray(reactionNode.byreactant)) {
                    return reactionNode.byreactant.map(mol => {
                      return `
                      <div class="reaction-molecule clickable-molecule co-reactant" 
                           data-molecule-name="${mol}" 
                           data-molecule-id="">
                        <strong>${mol}</strong>
                      </div>
                    `;
                    }).join('');
                  } else if (reactionNode.byreactant.molecules && Array.isArray(reactionNode.byreactant.molecules)) {
                    return reactionNode.byreactant.molecules.map(mol => {
                      return `
                      <div class="reaction-molecule clickable-molecule co-reactant" 
                           data-molecule-name="${mol}" 
                           data-molecule-id="">
                        <strong>${mol}</strong>
                      </div>
                    `;
                    }).join('');
                  } else if (reactionNode.byreactant.name) {
                    return `
                      <div class="reaction-molecule clickable-molecule co-reactant" 
                           data-molecule-name="${reactionNode.byreactant.name}" 
                           data-molecule-id="">
                        <strong>${reactionNode.byreactant.name}</strong>
                        ${reactionNode.byreactant.formula ? `<div class="molecule-formula">${reactionNode.byreactant.formula}</div>` : ''}
                      </div>
                    `;
                  }
                  return '';
                })() : '<div class="reaction-molecule">-</div>'}
              </div>
              <div class="reaction-arrow">→</div>
              <div class="reaction-products">
                ${reactionNode.byproduct ? (() => {
                  // Handle different byproduct formats: string, object with name, or object with molecules array
                  // Show coefficients in Substrate → Product section
                  if (typeof reactionNode.byproduct === 'string') {
                    return `
                      <div class="reaction-molecule clickable-molecule co-product" 
                           data-molecule-name="${reactionNode.byproduct}" 
                           data-molecule-id="">
                        <strong>${reactionNode.byproduct}</strong>
                      </div>
                    `;
                  } else if (reactionNode.byproduct.name) {
                    return `
                      <div class="reaction-molecule clickable-molecule co-product" 
                           data-molecule-name="${reactionNode.byproduct.name}" 
                           data-molecule-id="">
                        <strong>${reactionNode.byproduct.name}</strong>
                        ${reactionNode.byproduct.formula ? `<div class="molecule-formula">${reactionNode.byproduct.formula}</div>` : ''}
                      </div>
                    `;
                  } else if (reactionNode.byproduct.molecules && Array.isArray(reactionNode.byproduct.molecules)) {
                    return reactionNode.byproduct.molecules.map(mol => {
                      return `
                      <div class="reaction-molecule clickable-molecule co-product" 
                           data-molecule-name="${mol}" 
                           data-molecule-id="">
                        <strong>${mol}</strong>
                      </div>
                    `;
                    }).join('');
                  }
                  return '';
                })() : '<div class="reaction-molecule">-</div>'}
              </div>
            </div>
          </div>
        ` : ''}
        
        <div class="detail-section">
          <div class="molecule-info" id="molecule-info">
            <div class="molecule-name">${displayName}</div>
            ${molecule.formula ? `<div class="molecule-formula">${molecule.formula}</div>` : ''}
            ${molecule.description ? `<div class="molecule-description">${molecule.description}</div>` : ''}
            ${molecule.smiles ? `
              <div class="structure-placeholder">
                <div class="structure-label">Structure (SMILES: ${molecule.smiles})</div>
                <div class="structure-representation">
                  ${this.renderStructure(molecule)}
                </div>
              </div>
            ` : ''}
            <div class="pubchem-loading" data-molecule="${molecule.name}">
              <div class="loading-indicator">Loading PubChem data...</div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.container.innerHTML = html;
    
    // Add click handlers for reaction flow molecules if this is an enzyme/carrier node
    if (isEnzymeOrCarrierNode) {
      const moleculeElements = this.container.querySelectorAll('.clickable-molecule');
      moleculeElements.forEach(element => {
        element.addEventListener('click', (e) => {
          const moleculeName = element.dataset.moleculeName;
          const moleculeId = element.dataset.moleculeId;
          
          // Determine if this is a byreactant or byproduct
          // Since we only show by-molecules in complex nodes, all clicks are for by-molecules
          let isByreactant = null;
          if (element.classList.contains('co-reactant')) {
            isByreactant = true;
          } else if (element.classList.contains('co-product')) {
            isByreactant = false;
          }
          
          // Dispatch event to select molecule in viewer
          // All molecules shown are by-molecules, so always pass reaction context and skip zoom
          if (this.viewerContainer) {
            const selectEvent = new CustomEvent('select-molecule-by-name', {
              detail: { 
                moleculeName: moleculeName,
                moleculeId: moleculeId,
                reaction: reactionNode, // Always pass reaction context for by-molecules
                isByreactant: isByreactant,
                skipZoom: true // Don't move frame for byreactants/byproducts
              }
            });
            this.viewerContainer.dispatchEvent(selectEvent);
          }
        });
      });
    }
    
    // Fetch PubChem data
    this.fetchPubChemData(molecule.name);
  }
  
  async fetchPubChemData(moleculeName) {
    // Remove coefficients before searching PubChem
    const searchName = removeCoefficients(moleculeName);
    await fetchAndDisplayPubChem(searchName, 'molecule-info', this.pubchemCache);
  }
  
  renderStructure(molecule) {
    return `
      <div class="structure-simple">
        <div class="structure-molecule">
          ${molecule.formula || ''}
        </div>
        <div class="structure-note">
          Note: Full 2D structure visualization would be displayed here using a chemical structure library
        </div>
      </div>
    `;
  }
  
  clear() {
    this.container.innerHTML = '';
    this.currentMolecule = null;
  }
}

