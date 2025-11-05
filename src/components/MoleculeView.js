/**
 * Molecule View Component
 * 
 * Displays detailed information about a molecule (from PubChem)
 */

import { fetchCompoundWithFallback } from '../services/pubchemService.js';

export class MoleculeView {
  constructor(container) {
    this.container = container;
    this.currentMolecule = null;
    this.pubchemCache = new Map();
  }
  
  render(molecule) {
    if (!molecule) {
      this.container.innerHTML = '<div class="detail-placeholder">Click a compound node to view molecule details</div>';
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
    const container = document.getElementById('molecule-info');
    if (!container) return;
    
    const loadingElement = container.querySelector('.pubchem-loading');
    if (!loadingElement) return;
    
    try {
      // Check cache first
      if (this.pubchemCache.has(moleculeName)) {
        this.displayPubChemData(container, this.pubchemCache.get(moleculeName), loadingElement);
        return;
      }
      
      // Normalize CO₂/CO2 to "Carbon dioxide" for PubChem search
      let searchName = moleculeName;
      if (moleculeName === 'CO₂' || moleculeName === 'CO2') {
        searchName = 'Carbon dioxide';
      }
      
      // Try alternative names
      const alternativeNames = this.getAlternativeNames(moleculeName);
      const pubchemData = await fetchCompoundWithFallback(searchName, alternativeNames);
      
      // Cache the result
      this.pubchemCache.set(moleculeName, pubchemData);
      
      // Display the data
      this.displayPubChemData(container, pubchemData, loadingElement);
    } catch (error) {
      console.error(`Error fetching PubChem data for ${moleculeName}:`, error);
      loadingElement.innerHTML = `
        <div class="pubchem-error">
          <small>PubChem data unavailable. <a href="https://pubchem.ncbi.nlm.nih.gov/#query=${encodeURIComponent(moleculeName)}" target="_blank">Search on PubChem</a></small>
        </div>
      `;
    }
  }
  
  getAlternativeNames(moleculeName) {
    const alternatives = {
      'D-Glucose': ['Glucose', 'D-Glucose', 'Dextrose', 'alpha-D-glucose'],
      'Glucose-6-phosphate': ['Glucose 6-phosphate', 'G6P', 'D-Glucose 6-phosphate'],
      'Fructose-6-phosphate': ['Fructose 6-phosphate', 'F6P', 'D-Fructose 6-phosphate'],
      'Fructose-1,6-bisphosphate': ['Fructose 1,6-bisphosphate', 'F1,6BP', 'Fructose-1,6-diphosphate'],
      'Glyceraldehyde-3-phosphate': ['Glyceraldehyde 3-phosphate', 'GAP', 'D-Glyceraldehyde 3-phosphate'],
      'Dihydroxyacetone phosphate': ['Dihydroxyacetone phosphate', 'DHAP', 'Dihydroxyacetone-P'],
      '1,3-Bisphosphoglycerate': ['1,3-Bisphosphoglycerate', '1,3-BPG', '1,3-Diphosphoglycerate', '1,3-diphosphoglycerate', 'glycerate-1,3-bisphosphate', '1,3-bisphosphoglycerate', '1,3-Bisphosphoglyceric acid', 'Glycerate 1,3-bisphosphate'],
      '3-Phosphoglycerate': ['3-Phosphoglycerate', '3PG', 'D-3-Phosphoglycerate'],
      '2-Phosphoglycerate': ['2-Phosphoglycerate', '2PG', 'D-2-Phosphoglycerate'],
      'Phosphoenolpyruvate': ['Phosphoenolpyruvate', 'PEP', 'Phosphoenolpyruvic acid'],
      'Pyruvate': ['Pyruvic acid', 'Pyruvate', '2-Oxopropanoic acid'],
      'ATP': ['Adenosine triphosphate', 'ATP'],
      'ADP': ['Adenosine diphosphate', 'ADP'],
      'NAD⁺': ['NAD+', 'Nicotinamide adenine dinucleotide', 'NAD'],
      'NADH': ['NADH', 'Nicotinamide adenine dinucleotide (reduced)', 'Reduced NAD'],
      'H₂O': ['Water', 'H2O'],
      'Pi': ['Inorganic phosphate', 'Phosphate', 'PO4'],
      'CO₂': ['Carbon dioxide', 'CO2', 'CO₂'],
      'CO2': ['Carbon dioxide', 'CO2', 'CO₂'],
      // Citric Acid Cycle compounds
      'Succinate': ['Succinic acid', 'Succinate', 'Butanedioic acid', 'Ethylene succinic acid'],
      'Oxaloacetate': ['Oxaloacetic acid', 'Oxaloacetate', 'Oxalacetic acid'],
      'Citrate': ['Citric acid', 'Citrate', '2-Hydroxy-1,2,3-propanetricarboxylic acid'],
      'Isocitrate': ['Isocitric acid', 'Isocitrate'],
      'α-Ketoglutarate': ['alpha-Ketoglutarate', 'α-Ketoglutarate', '2-Oxoglutarate', '2-Oxoglutaric acid', 'Alpha-ketoglutarate'],
      'Succinyl-CoA': ['Succinyl coenzyme A', 'Succinyl-CoA', 'Succinyl CoA'],
      'Fumarate': ['Fumaric acid', 'Fumarate', 'trans-Butenedioic acid'],
      'Malate': ['Malic acid', 'Malate', 'Hydroxybutanedioic acid'],
      // Pyruvate Oxidation intermediates
      'Hydroxyethyl-TPP': ['2-(1-Hydroxyethyl)thiamine pyrophosphate', '2-(1-Hydroxyethyl)thiamine diphosphate', '2-(alpha-Hydroxyethyl)thiamine pyrophosphate', 'Hydroxyethyl thiamine pyrophosphate', '2-(1-Hydroxyethyl)TPP'],
      'Acetyl-lipoamide': ['S-Acetyldihydrolipoamide', 'Acetyldihydrolipoamide', 'S-Acetyl dihydrolipoamide', 'Acetyl dihydrolipoamide', 'Acetyl-lipoic acid']
    };
    
    return alternatives[moleculeName] || [];
  }
  
  displayPubChemData(container, pubchemData, loadingElement) {
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
    
    loadingElement.replaceWith(pubchemInfo);
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

