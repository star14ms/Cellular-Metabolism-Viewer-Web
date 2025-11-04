/**
 * Pathway Detail Component
 * 
 * Displays detailed information about a pathway group (Glycolysis, Pyruvate Oxidation, Citric Acid Cycle)
 */

export class PathwayDetail {
  constructor(container) {
    this.container = container;
    this.currentPathway = null;
    this.selectedReaction = null;
    this.selectedMolecule = null;
  }
  
  render(pathway) {
    if (!pathway) {
      this.container.innerHTML = '<div class="detail-placeholder">Click a pathway button on the map to view pathway details</div>';
      return;
    }
    
    this.currentPathway = pathway;
    
    // Extract selected reaction and molecule from pathway data if provided
    const selectedReaction = pathway.selectedReaction || this.selectedReaction;
    const selectedMolecule = pathway.selectedMolecule || this.selectedMolecule;
    const selectedType = pathway.selectedType;
    
    // Update internal state
    if (selectedReaction) {
      this.selectedReaction = selectedReaction;
    }
    if (selectedMolecule) {
      this.selectedMolecule = selectedMolecule;
    }
    
    // Determine which reaction step to highlight
    const highlightedStep = selectedReaction ? (selectedReaction.step || null) : null;
    
    const html = `
      <div class="pathway-detail">
        <div class="detail-header">
          <h2>${pathway.summary.name}</h2>
          ${highlightedStep ? `<div class="pathway-selection-indicator">Currently viewing: ${selectedType === 'molecule' ? 'Molecule' : 'Reaction'} from Step ${highlightedStep}</div>` : ''}
        </div>
        
        <div class="detail-section">
          <h3>Overview</h3>
          <div class="pathway-description">
            <p>${pathway.summary.description}</p>
            ${pathway.summary.location ? `<p><strong>Location:</strong> ${pathway.summary.location}</p>` : ''}
          </div>
        </div>
        
        <div class="detail-section">
          <h3>Net Products</h3>
          <div class="pathway-stats-grid">
            ${this.renderNetProducts(pathway.summary.netProducts)}
          </div>
        </div>
        
        ${pathway.summary.keyRegulatorySteps && pathway.summary.keyRegulatorySteps.length > 0 ? `
          <div class="detail-section">
            <h3>Key Regulatory Steps</h3>
            <ul class="regulatory-steps">
              ${pathway.summary.keyRegulatorySteps.map(step => `<li>${step}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        
        <div class="detail-section">
          <h3>Reactions</h3>
          <div class="pathway-reactions">
            <p><strong>Total Steps:</strong> ${pathway.reactions.length}</p>
            <div class="reaction-list">
              ${pathway.reactions.map((reaction, index) => {
                const isSelected = highlightedStep && (reaction.step === highlightedStep || (reaction.step === null && index + 1 === highlightedStep));
                return `
                <div class="reaction-item ${isSelected ? 'reaction-item-selected' : ''}">
                  <div class="reaction-step">Step ${reaction.step || index + 1}</div>
                  <div class="reaction-name">${reaction.name}</div>
                  <div class="reaction-enzyme">${reaction.enzyme.name}</div>
                  ${isSelected && selectedType === 'molecule' ? `<div class="reaction-selection-note">Selected molecule: ${selectedMolecule?.name || reaction.substrate.name}</div>` : ''}
                </div>
              `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.container.innerHTML = html;
  }
  
  renderNetProducts(netProducts) {
    if (!netProducts) return '';
    
    const products = [];
    if (netProducts.atp) products.push({ name: 'ATP', value: netProducts.atp.net, unit: '' });
    if (netProducts.nadh) products.push({ name: 'NADH', value: netProducts.nadh.net, unit: '' });
    if (netProducts.fadh2) products.push({ name: 'FADH₂', value: netProducts.fadh2.net, unit: '' });
    if (netProducts.acetylCoA) products.push({ name: 'Acetyl-CoA', value: netProducts.acetylCoA.net, unit: '' });
    if (netProducts.pyruvate) products.push({ name: 'Pyruvate', value: netProducts.pyruvate.net, unit: '' });
    if (netProducts.co2) products.push({ name: 'CO₂', value: netProducts.co2.net, unit: '' });
    
    return products.map(product => `
      <div class="pathway-stat-item">
        <span class="stat-label">${product.name}:</span>
        <span class="stat-value">${product.value > 0 ? '+' : ''}${product.value}${product.unit}</span>
      </div>
    `).join('');
  }
  
  clear() {
    this.container.innerHTML = '';
    this.currentPathway = null;
  }
}

