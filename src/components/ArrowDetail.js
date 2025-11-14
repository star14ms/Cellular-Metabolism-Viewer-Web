/**
 * Arrow Detail Component
 * 
 * Displays detailed information about a reaction arrow: enzymes, byproducts, conditions
 * Used when clicking on reaction arrows in the metabolism viewer
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

export class ArrowDetail {
  constructor(container) {
    this.container = container;
    this.currentReaction = null;
    this.pubchemCache = new Map();
    this.viewerContainer = null; // Will be set to the metabolism viewer container
  }
  
  setViewerContainer(viewerContainer) {
    this.viewerContainer = viewerContainer;
  }
  
  render(reaction) {
    if (!reaction) {
      this.container.innerHTML = '<div class="detail-placeholder">Click a reaction arrow to view reaction details</div>';
      this.currentReaction = null; // Clear the current reaction
      return;
    }
    
    this.currentReaction = reaction;
    
    // Check if by-molecule arrows start from node (not from midpoint)
    // This happens for enzyme/carrier nodes where arrows attach directly to the node
    // We can detect this by checking if it's a protein complex or mobile carrier
    const arrowsStartFromNode = reaction.isProteinComplex === true || reaction.isMobileCarrier === true;
    const isEnzymeOrCarrierNode = arrowsStartFromNode; // Same check - used for section title
    
    // Check if the Substrate → Product section will have any by-molecules
    // If not, we'll hide the entire section for ETC reactions
    const hasCoSubstrate = reaction.coSubstrate && reaction.coSubstrate.name;
    const hasByreactant = reaction.byreactant && !arrowsStartFromNode;
    const hasByproduct = reaction.byproduct && !arrowsStartFromNode;
    const hasByMolecules = hasCoSubstrate || hasByreactant || hasByproduct;
    
    // Helper function to get formula for a molecule name from PubChem (async)
    // This will be called after rendering to populate formulas in Substrate → Product section
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
      <div class="reaction-detail">
        <div class="detail-header">
          <h2>${reaction.step !== null ? `Step ${reaction.step}: ` : ''}${reaction.name}</h2>
        </div>
        
        ${hasByMolecules || !isEnzymeOrCarrierNode ? `
        <div class="detail-section">
          <h3>${isEnzymeOrCarrierNode ? 'Departure → Destination' : 'Substrate → Product'}</h3>
          <div class="reaction-flow">
            <div class="reaction-reactants">
              <div class="reaction-molecule clickable-molecule" 
                   data-molecule-name="${reaction.substrate.name}" 
                   data-molecule-id="${reaction.substrate.id || ''}"
                   style="cursor: pointer;">
                <strong>${reaction.substrate.name}</strong>
                ${reaction.substrate.formula ? `<div class="molecule-formula">${reaction.substrate.formula}</div>` : ''}
              </div>
              ${reaction.coSubstrate ? `
                <div class="reaction-molecule clickable-molecule co-reactant" 
                     data-molecule-name="${reaction.coSubstrate.name}" 
                     data-molecule-id=""
                     style="cursor: pointer;">
                  <strong>${removeCoefficients(reaction.coSubstrate.name)}</strong>
                </div>
              ` : ''}
              ${reaction.byreactant && !arrowsStartFromNode ? (() => {
                // Handle different byreactant formats: string, array, or object with molecules array
                // Hide byreactants if arrows start from node (ETC complexes)
                // Skip byreactants that have the same name as coSubstrate to avoid duplication
                const coSubstrateName = reaction.coSubstrate ? reaction.coSubstrate.name : null;
                
                if (typeof reaction.byreactant === 'string') {
                  // Skip if this byreactant matches coSubstrate
                  if (coSubstrateName && removeCoefficients(reaction.byreactant) === removeCoefficients(coSubstrateName)) {
                    return '';
                  }
                  const displayName = removeCoefficients(reaction.byreactant);
                  return `
                    <div class="reaction-molecule clickable-molecule co-reactant" 
                         data-molecule-name="${reaction.byreactant}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${displayName}</strong>
                    </div>
                  `;
                } else if (Array.isArray(reaction.byreactant)) {
                  return reaction.byreactant
                    .filter(mol => {
                      // Filter out molecules that match coSubstrate
                      return !coSubstrateName || removeCoefficients(mol) !== removeCoefficients(coSubstrateName);
                    })
                    .map(mol => {
                      const displayName = removeCoefficients(mol);
                      return `
                    <div class="reaction-molecule clickable-molecule co-reactant" 
                         data-molecule-name="${mol}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${displayName}</strong>
                    </div>
                  `;
                    }).join('');
                } else if (reaction.byreactant.molecules && Array.isArray(reaction.byreactant.molecules)) {
                  return reaction.byreactant.molecules
                    .filter(mol => {
                      // Filter out molecules that match coSubstrate
                      return !coSubstrateName || removeCoefficients(mol) !== removeCoefficients(coSubstrateName);
                    })
                    .map(mol => {
                      const displayName = removeCoefficients(mol);
                      return `
                    <div class="reaction-molecule clickable-molecule co-reactant" 
                         data-molecule-name="${mol}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${displayName}</strong>
                    </div>
                  `;
                    }).join('');
                } else if (reaction.byreactant.name) {
                  // Skip if this byreactant matches coSubstrate
                  if (coSubstrateName && removeCoefficients(reaction.byreactant.name) === removeCoefficients(coSubstrateName)) {
                    return '';
                  }
                  const displayName = removeCoefficients(reaction.byreactant.name);
                  return `
                    <div class="reaction-molecule clickable-molecule co-reactant" 
                         data-molecule-name="${reaction.byreactant.name}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${displayName}</strong>
                    </div>
                  `;
                }
                return '';
              })() : ''}
            </div>
            <div class="reaction-arrow">→</div>
            <div class="reaction-products">
              ${reaction.products && Array.isArray(reaction.products) ? `
                ${reaction.products.map(p => `
                  <div class="reaction-molecule clickable-molecule" 
                       data-molecule-name="${p.name}" 
                       data-molecule-id="${p.id || ''}"
                       style="cursor: pointer;">
                    <strong>${p.name}</strong>
                    ${p.formula ? `<div class="molecule-formula">${p.formula}</div>` : ''}
                  </div>
                `).join('')}
              ` : `
                <div class="reaction-molecule clickable-molecule" 
                     data-molecule-name="${reaction.product.name}" 
                     data-molecule-id="${reaction.product.id || ''}"
                     style="cursor: pointer;">
                  <strong>${reaction.product.name}</strong>
                  ${reaction.product.formula ? `<div class="molecule-formula">${reaction.product.formula}</div>` : ''}
                </div>
              `}
              ${reaction.byproduct && !arrowsStartFromNode ? (() => {
                // Handle different byproduct formats: string, array, object with name, or object with molecules array
                // Hide byproducts if arrows start from node (ETC complexes)
                if (typeof reaction.byproduct === 'string') {
                  const displayName = removeCoefficients(reaction.byproduct);
                  return `
                    <div class="reaction-molecule clickable-molecule co-product" 
                         data-molecule-name="${reaction.byproduct}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${displayName}</strong>
                    </div>
                  `;
                } else if (Array.isArray(reaction.byproduct)) {
                  return reaction.byproduct.map(mol => {
                    const displayName = removeCoefficients(mol);
                    return `
                    <div class="reaction-molecule clickable-molecule co-product" 
                         data-molecule-name="${mol}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${displayName}</strong>
                    </div>
                  `;
                  }).join('');
                } else if (reaction.byproduct.name) {
                  const displayName = removeCoefficients(reaction.byproduct.name);
                  return `
                    <div class="reaction-molecule clickable-molecule co-product" 
                         data-molecule-name="${reaction.byproduct.name}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${displayName}</strong>
                    </div>
                  `;
                } else if (reaction.byproduct.molecules && Array.isArray(reaction.byproduct.molecules)) {
                  return reaction.byproduct.molecules.map(mol => {
                    const displayName = removeCoefficients(mol);
                    return `
                    <div class="reaction-molecule clickable-molecule co-product" 
                         data-molecule-name="${mol}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${displayName}</strong>
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
          <h3>Enzyme</h3>
          <div class="enzyme-info">
            <div class="enzyme-name">${reaction.enzyme.name}</div>
            <div class="enzyme-ec">EC Number: ${reaction.enzyme.ecNumber}</div>
            <div class="enzyme-description">${reaction.enzyme.description}</div>
            ${reaction.enzyme.cofactors && reaction.enzyme.cofactors.length > 0 && reaction.enzyme.cofactors[0] !== 'None' ? `
              <div class="enzyme-cofactors">
                <strong>Cofactors:</strong> ${reaction.enzyme.cofactors.join(', ')}
              </div>
            ` : ''}
          </div>
        </div>
        
        ${reaction.coSubstrate ? `
          <div class="detail-section">
            <h3>Co-substrate</h3>
            <div class="cosubstrate-info clickable-molecule" 
                 id="cosubstrate-info"
                 data-molecule-name="${reaction.coSubstrate.name}" 
                 data-molecule-id=""
                 style="cursor: pointer;">
              <div class="molecule-name">${removeCoefficients(reaction.coSubstrate.name)}</div>
              ${reaction.coSubstrate.formula ? `<div class="molecule-formula">${reaction.coSubstrate.formula}</div>` : ''}
              ${reaction.coSubstrate.consumed ? '<div class="consumed-badge">Consumed</div>' : ''}
              ${reaction.coSubstrate.reduced ? '<div class="reduced-badge">Reduced to ' + (typeof reaction.byproduct === 'string' ? reaction.byproduct : (reaction.byproduct?.name || 'product')) + '</div>' : ''}
              <div class="pubchem-loading" data-molecule="${reaction.coSubstrate.name}">
                <div class="loading-indicator">Loading PubChem data...</div>
              </div>
            </div>
          </div>
        ` : ''}
        
        ${reaction.byproduct ? (() => {
          // Handle different byproduct formats for the byproduct section
          if (typeof reaction.byproduct === 'string') {
            const displayName = removeCoefficients(reaction.byproduct);
            return `
              <div class="detail-section">
                <h3>Byproduct</h3>
                <div class="byproduct-info clickable-molecule" 
                     id="byproduct-info"
                     data-molecule-name="${reaction.byproduct}" 
                     data-molecule-id=""
                     style="cursor: pointer;">
                  <div class="molecule-name">${displayName}</div>
                  <div class="pubchem-loading" data-molecule="${reaction.byproduct}">
                    <div class="loading-indicator">Loading PubChem data...</div>
                  </div>
                </div>
              </div>
            `;
          } else if (Array.isArray(reaction.byproduct)) {
            return `
              <div class="detail-section">
                <h3>Byproducts</h3>
                ${reaction.byproduct.map((mol, idx) => {
                  const displayName = removeCoefficients(mol);
                  return `
                  <div class="byproduct-info clickable-molecule" 
                       id="byproduct-info-${idx}"
                       data-molecule-name="${mol}" 
                       data-molecule-id=""
                       style="cursor: pointer; margin-bottom: 10px;">
                    <div class="molecule-name">${displayName}</div>
                    <div class="pubchem-loading" data-molecule="${mol}">
                      <div class="loading-indicator">Loading PubChem data...</div>
                    </div>
                  </div>
                `;
                }).join('')}
              </div>
            `;
          } else if (reaction.byproduct.name) {
            const displayName = removeCoefficients(reaction.byproduct.name);
            return `
              <div class="detail-section">
                <h3>Byproduct</h3>
                <div class="byproduct-info clickable-molecule" 
                     id="byproduct-info"
                     data-molecule-name="${reaction.byproduct.name}" 
                     data-molecule-id=""
                     style="cursor: pointer;">
                  <div class="molecule-name">${displayName}</div>
                  ${reaction.byproduct.formula ? `<div class="molecule-formula">${reaction.byproduct.formula}</div>` : ''}
                  <div class="pubchem-loading" data-molecule="${reaction.byproduct.name}">
                    <div class="loading-indicator">Loading PubChem data...</div>
                  </div>
                </div>
              </div>
            `;
          } else if (reaction.byproduct.molecules && Array.isArray(reaction.byproduct.molecules)) {
            return `
              <div class="detail-section">
                <h3>Byproducts</h3>
                ${reaction.byproduct.molecules.map((mol, idx) => {
                  const displayName = removeCoefficients(mol);
                  return `
                  <div class="byproduct-info clickable-molecule" 
                       id="byproduct-info-${idx}"
                       data-molecule-name="${mol}" 
                       data-molecule-id=""
                       style="cursor: pointer; margin-bottom: 10px;">
                    <div class="molecule-name">${displayName}</div>
                    <div class="pubchem-loading" data-molecule="${mol}">
                      <div class="loading-indicator">Loading PubChem data...</div>
                    </div>
                  </div>
                `;
                }).join('')}
              </div>
            `;
          }
          return '';
        })() : ''}
        
        <div class="detail-section">
          <h3>Reaction Conditions</h3>
          <div class="conditions-info">
            <div class="condition-item">
              <strong>Location:</strong> ${reaction.conditions.location || 'N/A'}
            </div>
            ${reaction.conditions.ph ? `
              <div class="condition-item">
                <strong>pH:</strong> ${reaction.conditions.ph}
              </div>
            ` : ''}
            ${reaction.conditions.temperature ? `
              <div class="condition-item">
                <strong>Temperature:</strong> ${reaction.conditions.temperature}
              </div>
            ` : ''}
            ${reaction.conditions.isReversible !== undefined ? `
              <div class="condition-item">
                <strong>Reversible:</strong> ${reaction.conditions.isReversible ? 'Yes' : 'No'}
              </div>
            ` : ''}
            ${reaction.conditions.regulation ? `
              <div class="condition-item regulation">
                <strong>Regulation:</strong> ${reaction.conditions.regulation}
              </div>
            ` : ''}
            ${reaction.conditions.requirement ? `
              <div class="condition-item">
                <strong>Requirement:</strong> ${reaction.conditions.requirement}
              </div>
            ` : ''}
            ${reaction.conditions.notes ? `
              <div class="condition-item">
                <strong>Notes:</strong> ${reaction.conditions.notes}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
    
    this.container.innerHTML = html;
    
    // Add click handlers to molecule elements
    const moleculeElements = this.container.querySelectorAll('.clickable-molecule');
    moleculeElements.forEach(element => {
      element.addEventListener('click', (e) => {
        const moleculeName = element.dataset.moleculeName;
        const moleculeId = element.dataset.moleculeId;
        
        // Determine if this is a byreactant or byproduct
        let isByreactant = null;
        if (reaction.coSubstrate && reaction.coSubstrate.name === moleculeName) {
          isByreactant = true;
        } else if (reaction.byproduct) {
          // Handle different byproduct formats
          let byproductName = null;
          if (typeof reaction.byproduct === 'string') {
            byproductName = reaction.byproduct;
          } else if (Array.isArray(reaction.byproduct)) {
            byproductName = reaction.byproduct.includes(moleculeName) ? moleculeName : null;
          } else if (reaction.byproduct.name) {
            byproductName = reaction.byproduct.name;
          } else if (reaction.byproduct.molecules && Array.isArray(reaction.byproduct.molecules)) {
            byproductName = reaction.byproduct.molecules.includes(moleculeName) ? moleculeName : null;
          }
          if (byproductName === moleculeName) {
            isByreactant = false;
          }
        } else if (element.classList.contains('co-reactant')) {
          isByreactant = true;
        } else if (element.classList.contains('co-product')) {
          isByreactant = false;
        }
        
        // Check if this is a substrate or product (main molecules, not by-molecules)
        // Substrate and product molecules should find their actual nodes, not be treated as by-molecules
        const isSubstrate = reaction.substrate && (reaction.substrate.name === moleculeName || (moleculeId && reaction.substrate.id === moleculeId));
        const isProduct = (reaction.product && (reaction.product.name === moleculeName || (moleculeId && reaction.product.id === moleculeId))) ||
                         (reaction.products && Array.isArray(reaction.products) && reaction.products.some(p => p.name === moleculeName || (moleculeId && p.id === moleculeId)));
        const isMainMolecule = isSubstrate || isProduct;
        
        // Dispatch event to select molecule in viewer
        // If it's a byreactant or byproduct, skip zoom to prevent frame movement
        // Check if molecule is a byproduct (handle different formats)
        let byproductName = null;
        if (reaction.byproduct) {
          if (typeof reaction.byproduct === 'string') {
            byproductName = reaction.byproduct;
          } else if (Array.isArray(reaction.byproduct)) {
            byproductName = reaction.byproduct.includes(moleculeName) ? moleculeName : null;
          } else if (reaction.byproduct.name) {
            byproductName = reaction.byproduct.name;
          } else if (reaction.byproduct.molecules && Array.isArray(reaction.byproduct.molecules)) {
            byproductName = reaction.byproduct.molecules.includes(moleculeName) ? moleculeName : null;
          }
        }
        const isByMolecule = isByreactant !== null || 
                            (reaction.coSubstrate && reaction.coSubstrate.name === moleculeName) ||
                            (byproductName === moleculeName) ||
                            element.classList.contains('co-reactant') ||
                            element.classList.contains('co-product');
        
        if (this.viewerContainer) {
          const selectEvent = new CustomEvent('select-molecule-by-name', {
            detail: { 
              moleculeName: moleculeName,
              moleculeId: moleculeId,
              // For substrate/product (main molecules), don't pass reaction context so it finds the correct node
              // For by-molecules, pass reaction context
              reaction: isMainMolecule ? null : reaction,
              isByreactant: isMainMolecule ? null : isByreactant,
              skipZoom: isByMolecule // Don't move frame for byreactants/byproducts
            }
          });
          this.viewerContainer.dispatchEvent(selectEvent);
        }
      });
    });
    
    // Fetch PubChem data for co-substrates and byproducts
    this.fetchPubChemData(reaction);
    
    // Fetch formulas for all by-molecules in Substrate → Product section
    // Use setTimeout to ensure DOM is fully rendered
    setTimeout(() => {
      const moleculeNames = new Set();
      
      // Add coSubstrate if it exists (it's displayed in the reaction flow section)
      if (reaction.coSubstrate && reaction.coSubstrate.name && !arrowsStartFromNode) {
        moleculeNames.add(reaction.coSubstrate.name);
      }
      
      // Collect all by-molecule names from the reaction flow section
      if (reaction.byreactant && !arrowsStartFromNode) {
        if (typeof reaction.byreactant === 'string') {
          const coSubstrateName = reaction.coSubstrate ? reaction.coSubstrate.name : null;
          // Skip if this byreactant matches coSubstrate
          if (!coSubstrateName || removeCoefficients(reaction.byreactant) !== removeCoefficients(coSubstrateName)) {
            moleculeNames.add(reaction.byreactant);
          }
        } else if (Array.isArray(reaction.byreactant)) {
          const coSubstrateName = reaction.coSubstrate ? reaction.coSubstrate.name : null;
          reaction.byreactant.forEach(mol => {
            if (!coSubstrateName || removeCoefficients(mol) !== removeCoefficients(coSubstrateName)) {
              moleculeNames.add(mol);
            }
          });
        } else if (reaction.byreactant.molecules && Array.isArray(reaction.byreactant.molecules)) {
          const coSubstrateName = reaction.coSubstrate ? reaction.coSubstrate.name : null;
          reaction.byreactant.molecules.forEach(mol => {
            if (!coSubstrateName || removeCoefficients(mol) !== removeCoefficients(coSubstrateName)) {
              moleculeNames.add(mol);
            }
          });
        } else if (reaction.byreactant.name) {
          const coSubstrateName = reaction.coSubstrate ? reaction.coSubstrate.name : null;
          // Skip if this byreactant matches coSubstrate
          if (!coSubstrateName || removeCoefficients(reaction.byreactant.name) !== removeCoefficients(coSubstrateName)) {
            moleculeNames.add(reaction.byreactant.name);
          }
        }
      }
      
      if (reaction.byproduct && !arrowsStartFromNode) {
        if (typeof reaction.byproduct === 'string') {
          moleculeNames.add(reaction.byproduct);
        } else if (Array.isArray(reaction.byproduct)) {
          reaction.byproduct.forEach(mol => moleculeNames.add(mol));
        } else if (reaction.byproduct.name) {
          moleculeNames.add(reaction.byproduct.name);
        } else if (reaction.byproduct.molecules && Array.isArray(reaction.byproduct.molecules)) {
          reaction.byproduct.molecules.forEach(mol => moleculeNames.add(mol));
        }
      }
      
      // Fetch formulas for all by-molecules
      moleculeNames.forEach(molName => {
        getFormulaForMoleculeAsync(molName, this.container);
      });
    }, 0);
  }
  
  async fetchPubChemData(reaction) {
    // Fetch data for co-substrate (e.g., ATP, NAD⁺)
    // Remove coefficients before searching PubChem
    if (reaction.coSubstrate) {
      const searchName = removeCoefficients(reaction.coSubstrate.name);
      await fetchAndDisplayPubChem(searchName, 'cosubstrate-info', this.pubchemCache);
    }
    
    // Fetch data for byproduct (handle different formats)
    // Remove coefficients before searching PubChem
    if (reaction.byproduct) {
      if (typeof reaction.byproduct === 'string') {
        const searchName = removeCoefficients(reaction.byproduct);
        await fetchAndDisplayPubChem(searchName, 'byproduct-info', this.pubchemCache);
      } else if (Array.isArray(reaction.byproduct)) {
        // Fetch data for each molecule in the array
        for (let idx = 0; idx < reaction.byproduct.length; idx++) {
          const searchName = removeCoefficients(reaction.byproduct[idx]);
          await fetchAndDisplayPubChem(searchName, `byproduct-info-${idx}`, this.pubchemCache);
        }
      } else if (reaction.byproduct.name) {
        const searchName = removeCoefficients(reaction.byproduct.name);
        await fetchAndDisplayPubChem(searchName, 'byproduct-info', this.pubchemCache);
      } else if (reaction.byproduct.molecules && Array.isArray(reaction.byproduct.molecules)) {
        // Fetch data for each molecule in the array
        for (let idx = 0; idx < reaction.byproduct.molecules.length; idx++) {
          const searchName = removeCoefficients(reaction.byproduct.molecules[idx]);
          await fetchAndDisplayPubChem(searchName, `byproduct-info-${idx}`, this.pubchemCache);
        }
      }
    }
  }
  
  renderStructure(molecule) {
    // Placeholder for chemical structure visualization
    // In a production app, this would use a library like SmilesDrawer, RDKit.js, or Ketcher
    // For now, we'll show a simple representation
    return `
      <div class="structure-simple">
        <div class="structure-molecule">
          ${molecule.formula}
        </div>
        <div class="structure-note">
          Note: Full 2D structure visualization would be displayed here using a chemical structure library
        </div>
      </div>
    `;
  }
  
  clear() {
    this.container.innerHTML = '';
    this.currentReaction = null;
  }
}

