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
    this.viewer = null; // Will be set to the MetabolismViewer instance
  }
  
  setViewerContainer(viewerContainer) {
    this.viewerContainer = viewerContainer;
  }
  
  setViewer(viewer) {
    this.viewer = viewer;
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
    
    // Note: byproduct and byreactant from arrow data are NOT included in the detail page
    // Arrow data byproduct/byreactant is only used for drawing labels on specific arrows
    // The detail page only shows byproduct/byreactant from reaction data
    const mergedByreactant = reaction.byreactant;
    const mergedByproduct = reaction.byproduct;
    
    // Check if the Substrate → Product section will have any by-molecules
    // If not, we'll hide the entire section for ETC reactions
    // displayByreactant and displayByproduct are display-only (no arrows drawn)
    const hasCoSubstrate = reaction.coSubstrate && reaction.coSubstrate.name;
    const hasByreactant = mergedByreactant && !arrowsStartFromNode;
    const hasByproduct = mergedByproduct && !arrowsStartFromNode;
    const hasDisplayByreactant = reaction.displayByreactant && !arrowsStartFromNode;
    const hasDisplayByproduct = reaction.displayByproduct && !arrowsStartFromNode;
    const hasByMolecules = hasCoSubstrate || hasByreactant || hasByproduct || hasDisplayByreactant || hasDisplayByproduct;
    
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
    
    // Calculate relative step number within the pathway
    let relativeStepNumber = null;
    if (this.viewer) {
      const pathway = this.viewer.getPathwayForReaction(reaction);
      if (pathway && pathway.reactions && Array.isArray(pathway.reactions)) {
        const reactionIndex = pathway.reactions.findIndex(r => r.id === reaction.id);
        if (reactionIndex >= 0) {
          relativeStepNumber = reactionIndex + 1; // 1-based step number
        }
      }
    }
    
    const html = `
      <div class="reaction-detail">
        <div class="detail-header">
          <h2>${relativeStepNumber !== null ? `Step ${relativeStepNumber}: ` : (reaction.step !== null ? `Step ${reaction.step}: ` : '')}${reaction.name}</h2>
        </div>
        
        ${hasByMolecules || !isEnzymeOrCarrierNode ? `
        <div class="detail-section">
          <h3>${isEnzymeOrCarrierNode ? 'Departure → Destination' : 'Substrate → Product'}</h3>
          <div class="reaction-flow">
            <div class="reaction-reactants">
              ${!reaction.hasCurvedArrow ? `
              <div class="reaction-molecule clickable-molecule" 
                   data-molecule-name="${reaction.substrate.name}" 
                   data-molecule-id="${reaction.substrate.id || ''}"
                   style="cursor: pointer;">
                <strong>${reaction.substrate.name}</strong>
                ${reaction.substrate.formula ? `<div class="molecule-formula">${reaction.substrate.formula}</div>` : ''}
              </div>
              ` : ''}
              ${reaction.coSubstrate ? `
                <div class="reaction-molecule clickable-molecule co-reactant" 
                     data-molecule-name="${reaction.coSubstrate.name}" 
                     data-molecule-id=""
                     style="cursor: pointer;">
                  <strong>${removeCoefficients(reaction.coSubstrate.name)}</strong>
                </div>
              ` : ''}
              ${mergedByreactant && !arrowsStartFromNode ? (() => {
                // Handle different byreactant formats: string, array, or object with molecules array
                // Hide byreactants if arrows start from node (ETC complexes)
                // Skip byreactants that have the same name as coSubstrate to avoid duplication
                // Show coefficients in Substrate → Product section
                const coSubstrateName = reaction.coSubstrate ? reaction.coSubstrate.name : null;
                
                // mergedByreactant is always an array (from mergeByMolecules)
                if (Array.isArray(mergedByreactant)) {
                  return mergedByreactant
                    .filter(mol => {
                      // Filter out molecules that match coSubstrate
                      return !coSubstrateName || removeCoefficients(mol) !== removeCoefficients(coSubstrateName);
                    })
                    .map(mol => {
                      return `
                    <div class="reaction-molecule clickable-molecule co-reactant" 
                         data-molecule-name="${mol}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${mol}</strong>
                    </div>
                  `;
                    }).join('');
                }
                return '';
              })() : ''}
              ${reaction.displayByreactant && !arrowsStartFromNode ? (() => {
                // Handle displayByreactant (display-only, no arrows drawn)
                // Same format support as byreactant: string, array, object with name, or object with molecules array
                // Show coefficients in Substrate → Product section
                const coSubstrateName = reaction.coSubstrate ? reaction.coSubstrate.name : null;
                
                if (typeof reaction.displayByreactant === 'string') {
                  // Skip if this displayByreactant matches coSubstrate
                  if (coSubstrateName && removeCoefficients(reaction.displayByreactant) === removeCoefficients(coSubstrateName)) {
                    return '';
                  }
                  return `
                    <div class="reaction-molecule clickable-molecule co-reactant" 
                         data-molecule-name="${reaction.displayByreactant}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${reaction.displayByreactant}</strong>
                    </div>
                  `;
                } else if (Array.isArray(reaction.displayByreactant)) {
                  return reaction.displayByreactant
                    .filter(mol => {
                      // Filter out molecules that match coSubstrate
                      return !coSubstrateName || removeCoefficients(mol) !== removeCoefficients(coSubstrateName);
                    })
                    .map(mol => {
                      return `
                    <div class="reaction-molecule clickable-molecule co-reactant" 
                         data-molecule-name="${mol}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${mol}</strong>
                    </div>
                  `;
                    }).join('');
                } else if (reaction.displayByreactant.molecules && Array.isArray(reaction.displayByreactant.molecules)) {
                  return reaction.displayByreactant.molecules
                    .filter(mol => {
                      // Filter out molecules that match coSubstrate
                      return !coSubstrateName || removeCoefficients(mol) !== removeCoefficients(coSubstrateName);
                    })
                    .map(mol => {
                      return `
                    <div class="reaction-molecule clickable-molecule co-reactant" 
                         data-molecule-name="${mol}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${mol}</strong>
                    </div>
                  `;
                    }).join('');
                } else if (reaction.displayByreactant.name) {
                  // Skip if this displayByreactant matches coSubstrate
                  if (coSubstrateName && removeCoefficients(reaction.displayByreactant.name) === removeCoefficients(coSubstrateName)) {
                    return '';
                  }
                  return `
                    <div class="reaction-molecule clickable-molecule co-reactant" 
                         data-molecule-name="${reaction.displayByreactant.name}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${reaction.displayByreactant.name}</strong>
                    </div>
                  `;
                }
                return '';
              })() : ''}
            </div>
            ${!reaction.hasCurvedArrow ? '<div class="reaction-arrow">→</div>' : ''}
            <div class="reaction-products">
              ${!reaction.hasCurvedArrow ? (
                reaction.products && Array.isArray(reaction.products) ? `
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
              `
              ) : ''}
              ${mergedByproduct && !arrowsStartFromNode ? (() => {
                // mergedByproduct is always an array (from mergeByMolecules)
                // Show coefficients in Substrate → Product section
                if (Array.isArray(mergedByproduct)) {
                  return mergedByproduct.map(mol => {
                    return `
                    <div class="reaction-molecule clickable-molecule co-product" 
                         data-molecule-name="${mol}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${mol}</strong>
                    </div>
                  `;
                  }).join('');
                }
                return '';
              })() : ''}
              ${reaction.displayByproduct && !arrowsStartFromNode ? (() => {
                // Handle displayByproduct (display-only, no arrows drawn)
                // Same format support as byproduct: string, array, object with name, or object with molecules array
                // Show coefficients in Substrate → Product section
                if (typeof reaction.displayByproduct === 'string') {
                  return `
                    <div class="reaction-molecule clickable-molecule co-product" 
                         data-molecule-name="${reaction.displayByproduct}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${reaction.displayByproduct}</strong>
                    </div>
                  `;
                } else if (Array.isArray(reaction.displayByproduct)) {
                  return reaction.displayByproduct.map(mol => {
                    return `
                    <div class="reaction-molecule clickable-molecule co-product" 
                         data-molecule-name="${mol}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${mol}</strong>
                    </div>
                  `;
                  }).join('');
                } else if (reaction.displayByproduct.name) {
                  return `
                    <div class="reaction-molecule clickable-molecule co-product" 
                         data-molecule-name="${reaction.displayByproduct.name}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${reaction.displayByproduct.name}</strong>
                    </div>
                  `;
                } else if (reaction.displayByproduct.molecules && Array.isArray(reaction.displayByproduct.molecules)) {
                  return reaction.displayByproduct.molecules.map(mol => {
                    return `
                    <div class="reaction-molecule clickable-molecule co-product" 
                         data-molecule-name="${mol}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
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
        
        ${reaction.enzyme ? `
        <div class="detail-section">
          <h3>Enzyme</h3>
          <div class="enzyme-info">
            <div class="enzyme-name">${reaction.enzyme.name || 'N/A'}</div>
            <div class="enzyme-ec">EC Number: ${reaction.enzyme.ecNumber || 'N/A'}</div>
            <div class="enzyme-description">${reaction.enzyme.description || ''}</div>
            ${reaction.enzyme.cofactors && reaction.enzyme.cofactors.length > 0 && reaction.enzyme.cofactors[0] !== 'None' ? `
              <div class="enzyme-cofactors">
                <strong>Cofactors:</strong> ${reaction.enzyme.cofactors.join(', ')}
              </div>
            ` : ''}
          </div>
        </div>
        ` : ''}
        
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
              ${reaction.coSubstrate.reduced ? '<div class="reduced-badge">Reduced to ' + (mergedByproduct && Array.isArray(mergedByproduct) && mergedByproduct.length > 0 ? mergedByproduct[0] : 'product') + '</div>' : ''}
              <div class="pubchem-loading" data-molecule="${reaction.coSubstrate.name}">
                <div class="loading-indicator">Loading PubChem data...</div>
              </div>
            </div>
          </div>
        ` : ''}
        
        ${mergedByproduct ? (() => {
          // Handle merged byproduct (from reaction and arrow data) for the byproduct section
          // mergedByproduct is always an array
          if (Array.isArray(mergedByproduct)) {
            if (mergedByproduct.length === 1) {
              // Single byproduct
              const mol = mergedByproduct[0];
              const displayName = removeCoefficients(mol);
              return `
              <div class="detail-section">
                <h3>Byproduct</h3>
                <div class="byproduct-info clickable-molecule" 
                     id="byproduct-info"
                     data-molecule-name="${mol}" 
                     data-molecule-id=""
                     style="cursor: pointer;">
                  <div class="molecule-name">${displayName}</div>
                  <div class="pubchem-loading" data-molecule="${mol}">
                    <div class="loading-indicator">Loading PubChem data...</div>
                  </div>
                </div>
              </div>
            `;
            } else {
              // Multiple byproducts
              return `
              <div class="detail-section">
                <h3>Byproducts</h3>
                ${mergedByproduct.map((mol, idx) => {
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
          }
          return '';
        })() : ''}
        
        ${reaction.conditions ? `
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
        ` : ''}
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
        } else if (mergedByreactant) {
          // Check merged byreactant (from reaction and arrow data)
          if (Array.isArray(mergedByreactant)) {
            if (mergedByreactant.includes(moleculeName)) {
              isByreactant = true;
            }
          }
        } else if (reaction.displayByreactant) {
          // Handle displayByreactant (display-only)
          let displayByreactantName = null;
          if (typeof reaction.displayByreactant === 'string') {
            displayByreactantName = reaction.displayByreactant;
          } else if (Array.isArray(reaction.displayByreactant)) {
            displayByreactantName = reaction.displayByreactant.includes(moleculeName) ? moleculeName : null;
          } else if (reaction.displayByreactant.name) {
            displayByreactantName = reaction.displayByreactant.name;
          } else if (reaction.displayByreactant.molecules && Array.isArray(reaction.displayByreactant.molecules)) {
            displayByreactantName = reaction.displayByreactant.molecules.includes(moleculeName) ? moleculeName : null;
          }
          if (displayByreactantName === moleculeName) {
            isByreactant = true;
          }
        } else if (mergedByproduct) {
          // Check merged byproduct (from reaction and arrow data)
          if (Array.isArray(mergedByproduct)) {
            if (mergedByproduct.includes(moleculeName)) {
              isByreactant = false;
            }
          }
        } else if (reaction.displayByproduct) {
          // Handle displayByproduct (display-only)
          let displayByproductName = null;
          if (typeof reaction.displayByproduct === 'string') {
            displayByproductName = reaction.displayByproduct;
          } else if (Array.isArray(reaction.displayByproduct)) {
            displayByproductName = reaction.displayByproduct.includes(moleculeName) ? moleculeName : null;
          } else if (reaction.displayByproduct.name) {
            displayByproductName = reaction.displayByproduct.name;
          } else if (reaction.displayByproduct.molecules && Array.isArray(reaction.displayByproduct.molecules)) {
            displayByproductName = reaction.displayByproduct.molecules.includes(moleculeName) ? moleculeName : null;
          }
          if (displayByproductName === moleculeName) {
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
        // Check if molecule is a byproduct (handle merged byproduct from reaction and arrow data)
        let byproductName = null;
        if (mergedByproduct) {
          if (Array.isArray(mergedByproduct)) {
            byproductName = mergedByproduct.includes(moleculeName) ? moleculeName : null;
          }
        }
        // Check if molecule is in displayByreactant or displayByproduct
        let displayByreactantName = null;
        if (reaction.displayByreactant) {
          if (typeof reaction.displayByreactant === 'string') {
            displayByreactantName = reaction.displayByreactant;
          } else if (Array.isArray(reaction.displayByreactant)) {
            displayByreactantName = reaction.displayByreactant.includes(moleculeName) ? moleculeName : null;
          } else if (reaction.displayByreactant.name) {
            displayByreactantName = reaction.displayByreactant.name;
          } else if (reaction.displayByreactant.molecules && Array.isArray(reaction.displayByreactant.molecules)) {
            displayByreactantName = reaction.displayByreactant.molecules.includes(moleculeName) ? moleculeName : null;
          }
        }
        let displayByproductName = null;
        if (reaction.displayByproduct) {
          if (typeof reaction.displayByproduct === 'string') {
            displayByproductName = reaction.displayByproduct;
          } else if (Array.isArray(reaction.displayByproduct)) {
            displayByproductName = reaction.displayByproduct.includes(moleculeName) ? moleculeName : null;
          } else if (reaction.displayByproduct.name) {
            displayByproductName = reaction.displayByproduct.name;
          } else if (reaction.displayByproduct.molecules && Array.isArray(reaction.displayByproduct.molecules)) {
            displayByproductName = reaction.displayByproduct.molecules.includes(moleculeName) ? moleculeName : null;
          }
        }
        
        const isByMolecule = isByreactant !== null || 
                            (reaction.coSubstrate && reaction.coSubstrate.name === moleculeName) ||
                            (byproductName === moleculeName) ||
                            (displayByreactantName === moleculeName) ||
                            (displayByproductName === moleculeName) ||
                            element.classList.contains('co-reactant') ||
                            element.classList.contains('co-product');
        
        // Check if this by-molecule has a node (if it does, treat it like a main molecule)
        let hasNode = false;
        if (isByMolecule && this.viewer) {
          // Check if there's a node with this molecule name or id
          if (this.viewer.nodeMap) {
            // Check nodeMap for matching node
            for (const [nodeId, node] of this.viewer.nodeMap.entries()) {
              if (node.name === moleculeName || (moleculeId && node.id === moleculeId)) {
                hasNode = true;
                break;
              }
            }
          }
          // Also check reactions for nodes that match (both product nodes and regular nodes)
          if (!hasNode && this.viewer.reactions) {
            for (const r of this.viewer.reactions) {
              // Check product nodes
              if (r.isProductNode && r.substrate && 
                  (r.substrate.name === moleculeName || (moleculeId && r.substrate.id === moleculeId))) {
                hasNode = true;
                break;
              }
              // Check regular nodes (substrate or product)
              if (r.substrate && (r.substrate.name === moleculeName || (moleculeId && r.substrate.id === moleculeId))) {
                hasNode = true;
                break;
              }
              if (r.product && (r.product.name === moleculeName || (moleculeId && r.product.id === moleculeId))) {
                hasNode = true;
                break;
              }
              if (r.products && Array.isArray(r.products)) {
                if (r.products.some(p => p.name === moleculeName || (moleculeId && p.id === moleculeId))) {
                  hasNode = true;
                  break;
                }
              }
            }
          }
        }
        
        // If by-molecule has a node, treat it like a main molecule (move frame, don't pass reaction context)
        const shouldSkipZoom = isByMolecule && !hasNode;
        const shouldPassReaction = isMainMolecule ? null : (hasNode ? null : reaction);
        
        if (this.viewerContainer) {
          const selectEvent = new CustomEvent('select-molecule-by-name', {
            detail: { 
              moleculeName: moleculeName,
              moleculeId: moleculeId,
              // For substrate/product (main molecules) or by-molecules with nodes, 
              // don't pass reaction context so it finds the correct node
              // For by-molecules without nodes, pass reaction context
              reaction: shouldPassReaction,
              isByreactant: isMainMolecule ? null : (hasNode ? null : isByreactant),
              skipZoom: shouldSkipZoom // Don't move frame only for by-molecules without nodes
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
      if (mergedByreactant && !arrowsStartFromNode) {
        // mergedByreactant is always an array
        if (Array.isArray(mergedByreactant)) {
          const coSubstrateName = reaction.coSubstrate ? reaction.coSubstrate.name : null;
          mergedByreactant.forEach(mol => {
            if (!coSubstrateName || removeCoefficients(mol) !== removeCoefficients(coSubstrateName)) {
              moleculeNames.add(mol);
            }
          });
        }
      }
      
      if (mergedByproduct && !arrowsStartFromNode) {
        // mergedByproduct is always an array
        if (Array.isArray(mergedByproduct)) {
          mergedByproduct.forEach(mol => moleculeNames.add(mol));
        }
      }
      
      // Collect displayByreactant names (display-only, no arrows)
      if (reaction.displayByreactant && !arrowsStartFromNode) {
        if (typeof reaction.displayByreactant === 'string') {
          const coSubstrateName = reaction.coSubstrate ? reaction.coSubstrate.name : null;
          if (!coSubstrateName || removeCoefficients(reaction.displayByreactant) !== removeCoefficients(coSubstrateName)) {
            moleculeNames.add(reaction.displayByreactant);
          }
        } else if (Array.isArray(reaction.displayByreactant)) {
          const coSubstrateName = reaction.coSubstrate ? reaction.coSubstrate.name : null;
          reaction.displayByreactant.forEach(mol => {
            if (!coSubstrateName || removeCoefficients(mol) !== removeCoefficients(coSubstrateName)) {
              moleculeNames.add(mol);
            }
          });
        } else if (reaction.displayByreactant.molecules && Array.isArray(reaction.displayByreactant.molecules)) {
          const coSubstrateName = reaction.coSubstrate ? reaction.coSubstrate.name : null;
          reaction.displayByreactant.molecules.forEach(mol => {
            if (!coSubstrateName || removeCoefficients(mol) !== removeCoefficients(coSubstrateName)) {
              moleculeNames.add(mol);
            }
          });
        } else if (reaction.displayByreactant.name) {
          const coSubstrateName = reaction.coSubstrate ? reaction.coSubstrate.name : null;
          if (!coSubstrateName || removeCoefficients(reaction.displayByreactant.name) !== removeCoefficients(coSubstrateName)) {
            moleculeNames.add(reaction.displayByreactant.name);
          }
        }
      }
      
      // Collect displayByproduct names (display-only, no arrows)
      if (reaction.displayByproduct && !arrowsStartFromNode) {
        if (typeof reaction.displayByproduct === 'string') {
          moleculeNames.add(reaction.displayByproduct);
        } else if (Array.isArray(reaction.displayByproduct)) {
          reaction.displayByproduct.forEach(mol => moleculeNames.add(mol));
        } else if (reaction.displayByproduct.name) {
          moleculeNames.add(reaction.displayByproduct.name);
        } else if (reaction.displayByproduct.molecules && Array.isArray(reaction.displayByproduct.molecules)) {
          reaction.displayByproduct.molecules.forEach(mol => moleculeNames.add(mol));
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
    // Convert byproduct to array format for consistent handling
    let byproductArray = [];
    if (reaction.byproduct) {
      if (Array.isArray(reaction.byproduct)) {
        byproductArray = reaction.byproduct;
      } else if (typeof reaction.byproduct === 'string') {
        byproductArray = [reaction.byproduct];
      }
    }
    
    if (byproductArray.length > 0) {
      if (byproductArray.length === 1) {
        const searchName = removeCoefficients(byproductArray[0]);
        await fetchAndDisplayPubChem(searchName, 'byproduct-info', this.pubchemCache);
      } else {
        // Fetch data for each molecule in the array
        for (let idx = 0; idx < byproductArray.length; idx++) {
          const searchName = removeCoefficients(byproductArray[idx]);
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

