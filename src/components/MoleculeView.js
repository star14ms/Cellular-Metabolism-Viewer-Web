/**
 * Molecule View Component
 * 
 * Displays detailed information about a molecule (from PubChem)
 */

import { fetchAndDisplayPubChem } from '../utils/pubchemHelpers.js';

export class MoleculeView {
  constructor(container) {
    this.container = container;
    this.currentMolecule = null;
    this.pubchemCache = new Map();
  }
  
  render(molecule) {
    if (!molecule) {
      this.container.innerHTML = '<div class="detail-placeholder">Click a compound node to view molecule details</div>';
      this.currentMolecule = null; // Clear the current molecule
      return;
    }
    
    this.currentMolecule = molecule;
    
    const html = `
      <div class="molecule-detail">
        <div class="detail-header">
          <h2>${molecule.name}</h2>
        </div>
        
        <div class="detail-section">
          <div class="molecule-info" id="molecule-info">
            <div class="molecule-name">${molecule.name}</div>
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
    
    // Fetch PubChem data
    this.fetchPubChemData(molecule.name);
  }
  
  async fetchPubChemData(moleculeName) {
    await fetchAndDisplayPubChem(moleculeName, 'molecule-info', this.pubchemCache);
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

