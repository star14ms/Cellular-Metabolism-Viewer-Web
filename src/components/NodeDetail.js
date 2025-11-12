/**
 * Node Detail Component
 * 
 * Displays detailed information about a molecule node (from PubChem)
 * Used when clicking on molecule nodes in the metabolism viewer
 */

import { fetchAndDisplayPubChem, fetchPubChemData } from '../utils/pubchemHelpers.js';

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

export class NodeDetail {
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
    
    // Check if there are any by-molecules to display in the Substrate → Product section
    // For ETC reactions, only show the section if there are by-molecules
    const hasCoSubstrate = !!(reactionNode && reactionNode.coSubstrate && reactionNode.coSubstrate.name);
    const hasByreactant = !!(reactionNode && reactionNode.byreactant);
    const hasByproduct = !!(reactionNode && reactionNode.byproduct);
    const hasByMolecules = hasCoSubstrate || hasByreactant || hasByproduct;
    const shouldShowSection = isEnzymeOrCarrierNode && hasByMolecules;
    
    // Helper function to get formula for a molecule name from PubChem (async)
    // This will be called after rendering to populate formulas
    const getFormulaForMoleculeAsync = async (moleculeName, container) => {
      if (!moleculeName || !container) return;
      
      try {
        // Remove coefficients before searching PubChem
        const searchName = removeCoefficients(moleculeName);
        const pubchemData = await fetchPubChemData(searchName, this.pubchemCache);
        if (pubchemData && pubchemData.molecularFormula) {
          // Find the molecule element(s) - there might be multiple with the same name
          // Use CSS.escape to handle special characters in molecule names
          const escapedName = CSS.escape(moleculeName);
          const moleculeElements = container.querySelectorAll(`[data-molecule-name="${escapedName}"]`);
          
          if (moleculeElements.length === 0) {
            console.warn(`No elements found for molecule: ${moleculeName}`);
            return;
          }
          
          moleculeElements.forEach(moleculeElement => {
            // Only add formula if it doesn't already exist
            if (moleculeElement && !moleculeElement.querySelector('.molecule-formula')) {
              const formulaDiv = document.createElement('div');
              formulaDiv.className = 'molecule-formula';
              formulaDiv.textContent = pubchemData.molecularFormula;
              moleculeElement.appendChild(formulaDiv);
            }
          });
        } else {
          console.warn(`No formula found in PubChem data for: ${moleculeName}`);
        }
      } catch (error) {
        console.warn(`Failed to fetch formula for ${moleculeName}:`, error);
      }
    };
    
    const html = `
      <div class="molecule-detail">
        <div class="detail-header">
          <h2>${displayName}</h2>
        </div>
        
        ${shouldShowSection ? `
          <div class="detail-section">
            <h3>Substrate → Product</h3>
            <div class="reaction-flow">
              <div class="reaction-reactants">
                ${reactionNode.coSubstrate ? `
                  <div class="reaction-molecule clickable-molecule co-reactant" 
                       data-molecule-name="${reactionNode.coSubstrate.name}" 
                       data-molecule-id="">
                    <strong>${removeCoefficients(reactionNode.coSubstrate.name)}</strong>
                  </div>
                ` : ''}
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
                      </div>
                    `;
                  }
                  return '';
                })() : ''}
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
                })() : ''}
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
    
    // Add click handlers for reaction flow molecules if the section is shown
    if (shouldShowSection) {
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
    
    // Fetch PubChem data for main molecule
    this.fetchPubChemData(molecule.name);
    
    // Fetch formulas for all by-molecules in Substrate → Product section
    if (shouldShowSection) {
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        const moleculeNames = new Set();
        
        // Collect all by-molecule names
        if (reactionNode.byreactant) {
          if (typeof reactionNode.byreactant === 'string') {
            moleculeNames.add(reactionNode.byreactant);
          } else if (Array.isArray(reactionNode.byreactant)) {
            reactionNode.byreactant.forEach(mol => moleculeNames.add(mol));
          } else if (reactionNode.byreactant.molecules && Array.isArray(reactionNode.byreactant.molecules)) {
            reactionNode.byreactant.molecules.forEach(mol => moleculeNames.add(mol));
          } else if (reactionNode.byreactant.name) {
            moleculeNames.add(reactionNode.byreactant.name);
          }
        }
        
        // Also check coSubstrate (it might be displayed as byreactant)
        if (reactionNode.coSubstrate && reactionNode.coSubstrate.name) {
          moleculeNames.add(reactionNode.coSubstrate.name);
        }
        
        if (reactionNode.byproduct) {
          if (typeof reactionNode.byproduct === 'string') {
            moleculeNames.add(reactionNode.byproduct);
          } else if (reactionNode.byproduct.name) {
            moleculeNames.add(reactionNode.byproduct.name);
          } else if (reactionNode.byproduct.molecules && Array.isArray(reactionNode.byproduct.molecules)) {
            reactionNode.byproduct.molecules.forEach(mol => moleculeNames.add(mol));
          }
        }
        
        // Fetch formulas for all by-molecules
        moleculeNames.forEach(molName => {
          getFormulaForMoleculeAsync(molName, this.container);
        });
      }, 0);
    }
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

