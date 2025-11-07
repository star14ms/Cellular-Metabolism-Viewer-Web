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
    this.viewerContainer = null; // Will be set to the metabolism viewer container
  }
  
  setViewerContainer(viewerContainer) {
    this.viewerContainer = viewerContainer;
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
              ${pathway.summary.keyRegulatorySteps.map(step => {
                // Extract step number from string like "Step 1: ..." or "Step 3: ..."
                const stepMatch = step.match(/Step\s+(\d+)/i);
                const stepNumber = stepMatch ? parseInt(stepMatch[1]) : null;
                if (stepNumber) {
                  // Make step number clickable (no special styling)
                  const stepText = step.replace(/Step\s+\d+/i, (match) => {
                    return `<span class="clickable-step" data-step="${stepNumber}">${match}</span>`;
                  });
                  return `<li>${stepText}</li>`;
                }
                return `<li>${step}</li>`;
              }).join('')}
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
                const stepNumber = reaction.step || index + 1;
                return `
                <div class="reaction-item ${isSelected ? 'reaction-item-selected' : ''}" 
                     data-step="${stepNumber}" 
                     data-reaction-index="${index}"
                     style="cursor: pointer;">
                  <div class="reaction-step">Step ${stepNumber}</div>
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
    
    // Add click handlers to reaction items
    const reactionItems = this.container.querySelectorAll('.reaction-item');
    reactionItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const stepNumber = parseInt(item.dataset.step);
        const reactionIndex = parseInt(item.dataset.reactionIndex);
        
        // Dispatch event to select reaction in viewer
        if (this.viewerContainer) {
          const selectEvent = new CustomEvent('select-reaction-by-step', {
            detail: { step: stepNumber, reactionIndex: reactionIndex, pathway: pathway }
          });
          this.viewerContainer.dispatchEvent(selectEvent);
        }
      });
    });
    
    // Add click handlers to clickable step numbers in Key Regulatory Steps
    // Make the entire list item clickable
    const regulatoryStepItems = this.container.querySelectorAll('.regulatory-steps li');
    regulatoryStepItems.forEach(liElement => {
      const clickableStep = liElement.querySelector('.clickable-step');
      if (clickableStep) {
        // Make entire list item clickable
        liElement.style.cursor = 'pointer';
        liElement.addEventListener('click', (e) => {
          e.stopPropagation();
          const stepNumber = parseInt(clickableStep.dataset.step);
          
          // Find the reaction index for this step
          const reactionIndex = pathway.reactions.findIndex(r => r.step === stepNumber);
          
          // Dispatch event to select reaction in viewer (switch to reaction tab, zoom to reaction)
          if (this.viewerContainer) {
            const selectEvent = new CustomEvent('select-reaction-by-step', {
              detail: { 
                step: stepNumber, 
                reactionIndex: reactionIndex >= 0 ? reactionIndex : null, 
                pathway: pathway,
                skipZoom: false, // Move/zoom to reaction (same as clicking in Reactions tab)
                switchToReactionTab: true // Switch to reaction tab
              }
            });
            this.viewerContainer.dispatchEvent(selectEvent);
          }
        });
      }
    });
    
    // Add click handlers to clickable molecule names in Net Products
    // Make the entire stat item clickable
    const statItems = this.container.querySelectorAll('.pathway-stat-item');
    statItems.forEach(statItem => {
      const clickableMolecule = statItem.querySelector('.clickable-molecule-name');
      if (clickableMolecule) {
        // Make entire stat item clickable
        statItem.style.cursor = 'pointer';
        statItem.addEventListener('click', (e) => {
          e.stopPropagation();
          const moleculeName = clickableMolecule.dataset.moleculeName;
          const moleculeId = clickableMolecule.dataset.moleculeId;
          
          // Dispatch event to select molecule in viewer (switch to molecule tab, zoom to molecule)
          if (this.viewerContainer) {
            const selectEvent = new CustomEvent('select-molecule-by-name', {
              detail: { 
                moleculeName: moleculeName,
                moleculeId: moleculeId,
                reaction: null, // No specific reaction context - this means it's NOT a by-molecule
                isByreactant: null,
                skipTabSwitch: false, // Switch to molecule tab
                skipZoom: false // Move/zoom to molecule (only skip zoom for by-molecules)
              }
            });
            this.viewerContainer.dispatchEvent(selectEvent);
          }
        });
      }
    });
  }
  
  renderNetProducts(netProducts) {
    if (!netProducts) return '';
    
    // Map molecule names to their IDs for selection
    const moleculeIdMap = {
      'ATP': 'atp',
      'NADH': 'nadh',
      'FADH₂': 'fadh2',
      'Acetyl-CoA': 'acetyl-coa',
      'Pyruvate': 'pyruvate',
      'CO₂': 'co2'
    };
    
    const products = [];
    if (netProducts.atp) products.push({ name: 'ATP', value: netProducts.atp.net, unit: '', id: moleculeIdMap['ATP'] });
    if (netProducts.nadh) products.push({ name: 'NADH', value: netProducts.nadh.net, unit: '', id: moleculeIdMap['NADH'] });
    if (netProducts.fadh2) products.push({ name: 'FADH₂', value: netProducts.fadh2.net, unit: '', id: moleculeIdMap['FADH₂'] });
    if (netProducts.acetylCoA) products.push({ name: 'Acetyl-CoA', value: netProducts.acetylCoA.net, unit: '', id: moleculeIdMap['Acetyl-CoA'] });
    if (netProducts.pyruvate) products.push({ name: 'Pyruvate', value: netProducts.pyruvate.net, unit: '', id: moleculeIdMap['Pyruvate'] });
    if (netProducts.co2) products.push({ name: 'CO₂', value: netProducts.co2.net, unit: '', id: moleculeIdMap['CO₂'] });
    
    return products.map(product => `
      <div class="pathway-stat-item" style="cursor: pointer;">
        <span class="stat-label">
          <span class="clickable-molecule-name" 
                data-molecule-name="${product.name}" 
                data-molecule-id="${product.id || ''}">
            ${product.name}
          </span>:
        </span>
        <span class="stat-value">${product.value > 0 ? '+' : ''}${product.value}${product.unit}</span>
      </div>
    `).join('');
  }
  
  clear() {
    this.container.innerHTML = '';
    this.currentPathway = null;
  }
}

