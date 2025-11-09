/**
 * Reaction Detail Component
 * 
 * Displays detailed information about a reaction: enzymes, byproducts, conditions
 * Note: This component is for reactions (arrows), not for molecules (nodes)
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

export class ReactionDetail {
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
    
    const html = `
      <div class="reaction-detail">
        <div class="detail-header">
          <h2>${reaction.step !== null ? `Step ${reaction.step}: ` : ''}${reaction.name}</h2>
        </div>
        
        <div class="detail-section">
          <h3>Substrate → Product</h3>
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
                  ${reaction.coSubstrate.formula ? `<div class="molecule-formula">${reaction.coSubstrate.formula}</div>` : ''}
                </div>
              ` : ''}
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
              ${reaction.byproduct ? (() => {
                // Handle different byproduct formats: string, object with name, or object with molecules array
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
                } else if (reaction.byproduct.name) {
                  const displayName = removeCoefficients(reaction.byproduct.name);
                  return `
                    <div class="reaction-molecule clickable-molecule co-product" 
                         data-molecule-name="${reaction.byproduct.name}" 
                         data-molecule-id=""
                         style="cursor: pointer;">
                      <strong>${displayName}</strong>
                      ${reaction.byproduct.formula ? `<div class="molecule-formula">${reaction.byproduct.formula}</div>` : ''}
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
          const byproductName = typeof reaction.byproduct === 'string' 
            ? reaction.byproduct 
            : (reaction.byproduct.name || (reaction.byproduct.molecules && reaction.byproduct.molecules.includes(moleculeName) ? moleculeName : null));
          if (byproductName === moleculeName) {
            isByreactant = false;
          }
        } else if (element.classList.contains('co-reactant')) {
          isByreactant = true;
        } else if (element.classList.contains('co-product')) {
          isByreactant = false;
        }
        
        // Dispatch event to select molecule in viewer
        // If it's a byreactant or byproduct, skip zoom to prevent frame movement
        // Check if molecule is a byproduct (handle different formats)
        const byproductName = reaction.byproduct 
          ? (typeof reaction.byproduct === 'string' 
              ? reaction.byproduct 
              : (reaction.byproduct.name || (reaction.byproduct.molecules && reaction.byproduct.molecules.includes(moleculeName) ? moleculeName : null)))
          : null;
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
              reaction: reaction,
              isByreactant: isByreactant,
              skipZoom: isByMolecule // Don't move frame for byreactants/byproducts
            }
          });
          this.viewerContainer.dispatchEvent(selectEvent);
        }
      });
    });
    
    // Fetch PubChem data for co-substrates and byproducts
    this.fetchPubChemData(reaction);
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

