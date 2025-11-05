/**
 * Reaction Detail Component
 * 
 * Displays detailed information about a reaction: enzymes, byproducts, conditions
 * Note: This component is for reactions (arrows), not for molecules (nodes)
 */

import { fetchCompoundWithFallback } from '../services/pubchemService.js';

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
                  <strong>${reaction.coSubstrate.name}</strong>
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
              ${reaction.byproduct ? `
                <div class="reaction-molecule clickable-molecule co-product" 
                     data-molecule-name="${reaction.byproduct.name}" 
                     data-molecule-id=""
                     style="cursor: pointer;">
                  <strong>${reaction.byproduct.name}</strong>
                  ${reaction.byproduct.formula ? `<div class="molecule-formula">${reaction.byproduct.formula}</div>` : ''}
                </div>
              ` : ''}
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
            <div class="cosubstrate-info" id="cosubstrate-info">
              <div class="molecule-name">${reaction.coSubstrate.name}</div>
              ${reaction.coSubstrate.formula ? `<div class="molecule-formula">${reaction.coSubstrate.formula}</div>` : ''}
              ${reaction.coSubstrate.consumed ? '<div class="consumed-badge">Consumed</div>' : ''}
              ${reaction.coSubstrate.reduced ? '<div class="reduced-badge">Reduced to ' + reaction.byproduct.name + '</div>' : ''}
              <div class="pubchem-loading" data-molecule="${reaction.coSubstrate.name}">
                <div class="loading-indicator">Loading PubChem data...</div>
              </div>
            </div>
          </div>
        ` : ''}
        
        ${reaction.byproduct ? `
          <div class="detail-section">
            <h3>Byproduct</h3>
            <div class="byproduct-info" id="byproduct-info">
              <div class="molecule-name">${reaction.byproduct.name}</div>
              ${reaction.byproduct.formula ? `<div class="molecule-formula">${reaction.byproduct.formula}</div>` : ''}
              <div class="pubchem-loading" data-molecule="${reaction.byproduct.name}">
                <div class="loading-indicator">Loading PubChem data...</div>
              </div>
            </div>
          </div>
        ` : ''}
        
        <div class="detail-section">
          <h3>Reaction Conditions</h3>
          <div class="conditions-info">
            <div class="condition-item">
              <strong>Location:</strong> ${reaction.conditions.location}
            </div>
            <div class="condition-item">
              <strong>pH:</strong> ${reaction.conditions.ph}
            </div>
            <div class="condition-item">
              <strong>Temperature:</strong> ${reaction.conditions.temperature}
            </div>
            <div class="condition-item">
              <strong>Reversible:</strong> ${reaction.conditions.isReversible ? 'Yes' : 'No'}
            </div>
            <div class="condition-item regulation">
              <strong>Regulation:</strong> ${reaction.conditions.regulation}
            </div>
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
        
        // Dispatch event to select molecule in viewer
        if (this.viewerContainer) {
          const selectEvent = new CustomEvent('select-molecule-by-name', {
            detail: { 
              moleculeName: moleculeName,
              moleculeId: moleculeId,
              reaction: reaction
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
    if (reaction.coSubstrate) {
      await this.fetchAndDisplayPubChem(reaction.coSubstrate.name, 'cosubstrate-info');
    }
    
    // Fetch data for byproduct
    if (reaction.byproduct) {
      await this.fetchAndDisplayPubChem(reaction.byproduct.name, 'byproduct-info');
    }
  }
  
  async fetchAndDisplayPubChem(moleculeName, containerId) {
    const container = document.getElementById(containerId);
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
      
      // Try alternative names for common compounds
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
    // Common alternative names for biochemistry compounds
    const alternatives = {
      'D-Glucose': ['Glucose', 'D-Glucose', 'Dextrose', 'alpha-D-glucose'],
      // Citric Acid Cycle compounds
      'Succinate': ['Succinic acid', 'Succinate', 'Butanedioic acid', 'Ethylene succinic acid'],
      'Oxaloacetate': ['Oxaloacetic acid', 'Oxaloacetate', 'Oxalacetic acid'],
      'Citrate': ['Citric acid', 'Citrate', '2-Hydroxy-1,2,3-propanetricarboxylic acid'],
      'Isocitrate': ['Isocitric acid', 'Isocitrate'],
      'α-Ketoglutarate': ['alpha-Ketoglutarate', 'α-Ketoglutarate', '2-Oxoglutarate', '2-Oxoglutaric acid', 'Alpha-ketoglutarate'],
      'Succinyl-CoA': ['Succinyl coenzyme A', 'Succinyl-CoA', 'Succinyl CoA'],
      'Fumarate': ['Fumaric acid', 'Fumarate', 'trans-Butenedioic acid'],
      'Malate': ['Malic acid', 'Malate', 'Hydroxybutanedioic acid'],
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
      // Co-substrates and byproducts
      'ATP': ['Adenosine triphosphate', 'ATP'],
      'ADP': ['Adenosine diphosphate', 'ADP'],
      'NAD⁺': ['NAD+', 'Nicotinamide adenine dinucleotide', 'NAD'],
      'NADH': ['NADH', 'Nicotinamide adenine dinucleotide (reduced)', 'Reduced NAD'],
      'H₂O': ['Water', 'H2O'],
      'Pi': ['Inorganic phosphate', 'Phosphate', 'PO4'],
      'CO₂': ['Carbon dioxide', 'CO2', 'CO₂'],
      'CO2': ['Carbon dioxide', 'CO2', 'CO₂'],
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
    
    // Replace loading indicator with PubChem data
    loadingElement.replaceWith(pubchemInfo);
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

