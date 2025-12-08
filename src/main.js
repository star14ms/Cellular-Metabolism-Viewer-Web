import './style.css'
import { MetabolismViewer } from './components/MetabolismViewer.js'
import { ArrowDetail } from './components/ArrowDetail.js'
import { NodeDetail } from './components/NodeDetail.js'
import { PathwayDetail } from './components/PathwayDetail.js'
// New data format imports
import { glycolysisData } from './data/glycolysis/glycolysis_index.js'
import { pyruvateOxidationData } from './data/pyruvateOxidation/pyruvateOxidation_index.js'
import { citricAcidCycleData } from './data/citricAcidCycle/citricAcidCycle_index.js'
import { electronTransportChainData } from './data/electronTransportChain/electronTransportChain_index.js'
import { fermentationData } from './data/fermentation/fermentation_index.js'
import { purineSynthesisData } from './data/purineSynthesis/purineSynthesis_index.js'
import { aromaticAminoAcidMetabolismData } from './data/aromaticAminoAcidMetabolism/aromaticAminoAcidMetabolism_index.js'
import { fattyAcidAndLipidSynthesisData } from './data/fattyAcidAndLipidSynthesis/fattyAcidAndLipidSynthesis_index.js'

// Legacy exports for backward compatibility (if needed)
export const glycolysisReactions = glycolysisData.reactions
export const glycolysisSummary = glycolysisData.summary
export const pyruvateOxidationReactions = pyruvateOxidationData.reactions
export const pyruvateOxidationSummary = pyruvateOxidationData.summary
export const citricAcidCycleReactions = citricAcidCycleData.reactions
export const citricAcidCycleSummary = citricAcidCycleData.summary
export const electronTransportChainReactions = electronTransportChainData.reactions
export const electronTransportChainSummary = electronTransportChainData.summary
export const fermentationReactions = fermentationData.reactions
export const fermentationSummary = fermentationData.summary
export const purineSynthesisReactions = purineSynthesisData.reactions
export const purineSynthesisSummary = purineSynthesisData.summary
export const aromaticAminoAcidMetabolismReactions = aromaticAminoAcidMetabolismData.reactions
export const aromaticAminoAcidMetabolismSummary = aromaticAminoAcidMetabolismData.summary
export const fattyAcidAndLipidSynthesisReactions = fattyAcidAndLipidSynthesisData.reactions
export const fattyAcidAndLipidSynthesisSummary = fattyAcidAndLipidSynthesisData.summary

// Initialize theme IMMEDIATELY before anything else to prevent flash
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark mode
  document.documentElement.setAttribute('data-theme', savedTheme);
};

// Initialize theme right away
initTheme();

const app = document.querySelector('#app')

if (!app) {
  console.error('App container not found')
} else {
  app.innerHTML = `
    <div class="app-container" role="main">
        <div class="main-content">
          <section class="viewer-panel" aria-label="Metabolic pathway visualization">
            <div id="metabolism-viewer" class="metabolism-viewer" role="img" aria-label="Interactive human metabolic pathways map"></div>
          </section>
          
          <div class="panel-resizer" id="panel-resizer" aria-hidden="true"></div>
          
          <aside class="detail-panel" aria-label="Molecule and reaction details">
          <nav class="detail-tabs" role="tablist" aria-label="Detail view tabs">
            <button id="molecule-tab" class="detail-tab active" data-tab="molecule" role="tab" aria-selected="true" aria-controls="molecule-view">Molecule (Node)</button>
            <button id="reaction-tab" class="detail-tab" data-tab="reaction" role="tab" aria-selected="false" aria-controls="reaction-detail">Reaction (Arrow)</button>
            <button id="pathway-tab" class="detail-tab" data-tab="pathway" role="tab" aria-selected="false" aria-controls="pathway-detail">Pathway Group</button>
          </nav>
          <div class="detail-content">
            <div id="molecule-view" class="detail-view active" role="tabpanel" aria-labelledby="molecule-tab" aria-hidden="false"></div>
            <div id="reaction-detail" class="detail-view" role="tabpanel" aria-labelledby="reaction-tab" aria-hidden="true"></div>
            <div id="pathway-detail" class="detail-view" role="tabpanel" aria-labelledby="pathway-tab" aria-hidden="true"></div>
          </div>
        </aside>
      </div>
      
      <!-- References Modal -->
      <div id="references-modal" class="references-modal">
        <div class="references-modal-content">
          <div class="references-modal-header">
            <h2>References</h2>
            <button class="references-modal-close" aria-label="Close references">&times;</button>
          </div>
          <div class="references-modal-body">
            <ul class="references-list">
              <li>
                <a href="https://metabolicpathways.stanford.edu/" target="_blank" rel="noopener noreferrer">
                  Stanford Metabolic Pathways Map
                </a>
                <p>Stanford Pathways of Human Metabolism - A comprehensive overview of human metabolism, forming the basis for Stanford's introductory biochemistry course for first-year medical students.</p>
              </li>
              <li>
                <a href="https://link.springer.com/article/10.1007/s00018-021-03996-3/figures/2" target="_blank" rel="noopener noreferrer">
                  Dihydrolipoamide dehydrogenase, pyruvate oxidation, and acetylation-dependent mechanisms
                </a>
                <p>Figure 2 from Cellular and Molecular Life Sciences - VPA interference with E3 (DLD) and E3-dependent multienzyme systems in mitochondrial metabolic pathways.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Profile Modal -->
      <div id="profile-modal" class="references-modal">
        <div class="references-modal-content">
          <div class="references-modal-header">
            <h2>About</h2>
            <button class="profile-modal-close" aria-label="Close profile">&times;</button>
          </div>
          <div class="references-modal-body">
            <div class="profile-content">
              <div class="profile-header">
                <h3>Minseo Kim</h3>
                <p class="profile-title">Biochemistry Student / Developer</p>
              </div>
              <div class="profile-bio">
                <p>👋 Hi! I'm Minseo, a biochemistry student 🧬 at York University (2025~), as well as a developer (2021~) making useful services (arguably). I'm interested in the intersection of biology and AI 🤖, with a focus on machine learning. My current goal is to understand the mechanism of Alphafold from Google DeepMind.</p>
                <br/>
                <p>This is an interactive visualization of human metabolic pathways, built with D3.js and vibe coding using Cursor IDE. Born out of laziness 😴—I didn't want to memorize all the pathways from my Biochemistry courses!—this project became a fun way to learn 🎓.</p>
                <br/>
                <p>Feel free to reach out if you have any questions, suggestions, or just find it interesting! I'm always happy to chat! 😉</p>
                </div>
              <div class="profile-links">
                <h4>Links</h4>
                <div class="profile-links-list">
                  <a href="https://github.com/star14ms" target="_blank" rel="noopener noreferrer" class="profile-link-icon" aria-label="GitHub">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/in/minseo-kim-a4703929a/" target="_blank" rel="noopener noreferrer" class="profile-link-icon" aria-label="LinkedIn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/star14ms/" target="_blank" rel="noopener noreferrer" class="profile-link-icon" aria-label="Instagram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="2"/>
                      <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
                      <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
  
  // Theme toggle is now handled by the SVG button in MetabolismViewer
  // No need for separate HTML button or event listeners
  
  // References modal functionality
  const referencesModal = document.getElementById('references-modal');
  const referencesModalClose = document.querySelector('.references-modal-close');
  
  if (referencesModalClose) {
    referencesModalClose.addEventListener('click', () => {
      if (referencesModal) {
        referencesModal.style.display = 'none';
      }
    });
  }
  
  // Close modal when clicking outside of it
  if (referencesModal) {
    referencesModal.addEventListener('click', (e) => {
      if (e.target === referencesModal) {
        referencesModal.style.display = 'none';
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && referencesModal && referencesModal.style.display === 'flex') {
      referencesModal.style.display = 'none';
    }
    if (e.key === 'Escape') {
      const profileModal = document.getElementById('profile-modal');
      if (profileModal && profileModal.style.display === 'flex') {
        profileModal.style.display = 'none';
      }
    }
  });
  
  // Profile modal functionality
  const profileModal = document.getElementById('profile-modal');
  const profileModalClose = document.querySelector('.profile-modal-close');
  
  if (profileModalClose) {
    profileModalClose.addEventListener('click', () => {
      if (profileModal) {
        profileModal.style.display = 'none';
      }
    });
  }
  
  // Close profile modal when clicking outside of it
  if (profileModal) {
    profileModal.addEventListener('click', (e) => {
      if (e.target === profileModal) {
        profileModal.style.display = 'none';
      }
    });
  }

  // Hide detail panel by default
  const detailPanel = document.querySelector('.detail-panel')
  if (detailPanel) {
    detailPanel.style.display = 'none'
    detailPanel.style.width = '0'
    detailPanel.style.minWidth = '0'
    detailPanel.style.flex = '0 0 0'
    detailPanel.style.visibility = 'hidden'
    detailPanel.style.opacity = '0'
    // Expand viewer panel to take full width
    const viewerPanel = document.querySelector('.viewer-panel')
    if (viewerPanel) {
      viewerPanel.style.flex = '1 1 0%'
      viewerPanel.style.width = ''
      viewerPanel.style.maxWidth = ''
    }
    // Hide resizer when panel is hidden
    const panelResizer = document.querySelector('.panel-resizer')
    if (panelResizer) {
      panelResizer.style.display = 'none'
    }
  }

  // Initialize after a brief delay to ensure DOM is ready
  setTimeout(() => {
    try {
      const viewerContainer = document.getElementById('metabolism-viewer')
      if (!viewerContainer) {
        console.error('Viewer container not found')
        return
      }

      // Get container dimensions
      const containerRect = viewerContainer.getBoundingClientRect()
      const width = containerRect.width || Math.max(window.innerWidth * 0.6, 800)
      const height = containerRect.height || Math.max(window.innerHeight * 0.7, 600)
      
      console.log('Initializing viewer with dimensions:', width, height)

      const viewer = new MetabolismViewer(viewerContainer, {
        width: width,
        height: height
      })
      
      // Expose viewer instance globally for cache management
      window.metabolismViewer = viewer

      // Initialize detail views
      const moleculeContainer = document.getElementById('molecule-view')
      const reactionContainer = document.getElementById('reaction-detail')
      const pathwayContainer = document.getElementById('pathway-detail')
      if (!moleculeContainer || !reactionContainer || !pathwayContainer) {
        console.error('Detail containers not found')
        return
      }
      
      const nodeDetail = new NodeDetail(moleculeContainer)
      const arrowDetail = new ArrowDetail(reactionContainer)
      const pathwayView = new PathwayDetail(pathwayContainer)
      
      // Set viewer container reference for pathway view, arrow detail, and node detail to enable selection
      pathwayView.setViewerContainer(viewerContainer)
      arrowDetail.setViewerContainer(viewerContainer)
      arrowDetail.setViewer(viewer) // Set viewer instance to access arrowMap
      nodeDetail.setViewer(viewer) // Set viewer instance to access nodeMap for resolving node_ids
      nodeDetail.setViewerContainer(viewerContainer)

      // Tab switching
      const tabs = document.querySelectorAll('.detail-tab')
      const views = document.querySelectorAll('.detail-view')
      const detailContent = document.querySelector('.detail-content')
      
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const tabName = tab.dataset.tab
          
          // Update active tab
          tabs.forEach(t => {
            t.classList.remove('active')
            t.setAttribute('aria-selected', 'false')
          })
          tab.classList.add('active')
          tab.setAttribute('aria-selected', 'true')
          
          // Update active view
          views.forEach(v => {
            v.classList.remove('active')
            v.setAttribute('aria-hidden', 'true')
          })
          if (tabName === 'molecule') {
            moleculeContainer.classList.add('active')
            moleculeContainer.setAttribute('aria-hidden', 'false')
            // If molecule view has content, trigger the same effect as clicking the molecule
            if (nodeDetail.currentMolecule) {
              const molecule = nodeDetail.currentMolecule
              // Find the reaction node that displays this molecule
              const moleculeNode = viewer.findReactionNodeForMolecule(molecule.name, molecule.id)
              if (moleculeNode) {
                // Select the molecule (this handles highlighting)
                viewer.selectMoleculeByName(molecule.name, molecule.id, { skipTabSwitch: true })
                // Zoom to the node
                viewer.zoomToNode(moleculeNode)
              }
            }
          } else if (tabName === 'reaction') {
            reactionContainer.classList.add('active')
            reactionContainer.setAttribute('aria-hidden', 'false')
            // If reaction view has content, trigger the same effect as clicking the reaction arrow
            if (arrowDetail.currentReaction) {
              viewer.selectReaction(arrowDetail.currentReaction, { skipTabSwitch: true })
              viewer.zoomToReactionArrow(arrowDetail.currentReaction)
            }
          } else if (tabName === 'pathway') {
            pathwayContainer.classList.add('active')
            pathwayContainer.setAttribute('aria-hidden', 'false')
            // If pathway view has content, trigger the same effect as clicking a pathway button
            if (pathwayView.currentPathway) {
              // The pathway object may be nested in a pathway property, or be the pathway itself
              const pathwayObj = pathwayView.currentPathway.pathway || pathwayView.currentPathway
              // Find the pathway from viewer's pathways array by matching id or name
              const pathway = viewer.pathways.find(p => 
                p.id === pathwayObj.id || 
                p.name === pathwayObj.name ||
                (pathwayObj.summary && p.summary.name === pathwayObj.summary.name)
              )
              if (pathway) {
                // selectPathway handles highlighting and zooming internally
                viewer.selectPathway(pathway)
              }
            }
          }
          
          // Scroll to top when switching tabs
          if (detailContent) {
            detailContent.scrollTo({ top: 0, behavior: 'smooth' })
          }
        })
      })
      
      // Listen for mitochondria selection
      viewerContainer.addEventListener('mitochondria-selected', (event) => {
        const mitochondriaData = event.detail.mitochondria || event.detail.pathway;
        
        // Clear other detail views
        nodeDetail.render(null)
        arrowDetail.render(null)
        
        // Format as pathway for PathwayDetail component
        pathwayView.render({
          pathway: mitochondriaData,
          summary: mitochondriaData.summary,
          reactions: mitochondriaData.reactions || [],
          nodes: mitochondriaData.nodes || []
        });
        
        // Switch to pathway tab
        tabs.forEach(t => t.classList.remove('active'))
        tabs[2].classList.add('active')
        views.forEach(v => v.classList.remove('active'))
        pathwayContainer.classList.add('active')
        
        // Show detail panel
        showDetailPanel();
      })
      
      // Listen for pathway selection
      viewerContainer.addEventListener('pathway-selected', (event) => {
        pathwayView.render(event.detail)
        const selectedPathway = event.detail.pathway
        
        // Check if current reaction belongs to the selected pathway
        // If so, keep the reaction tab open
        if (arrowDetail.currentReaction) {
          const currentReaction = arrowDetail.currentReaction
          const reactionPathway = viewer.getPathwayForReaction(currentReaction)
          
          // Keep reaction if it belongs to the selected pathway
          if (reactionPathway && selectedPathway && reactionPathway.id === selectedPathway.id) {
            // Keep the reaction tab - don't clear it
          } else {
            // Clear reaction view if it doesn't belong to the selected pathway
            arrowDetail.render(null)
            arrowDetail.currentReaction = null
            viewer.selectedReaction = null
            // Reset reaction arrow highlighting
            viewer.g.selectAll('.connection')
              .attr('stroke-width', 4)
              .attr('stroke-opacity', 0.7)
              .attr('stroke', '#2c5f7c')
              .attr('marker-end', 'url(#arrowhead)')
          }
        } else {
          // No current reaction, so clear it anyway
          arrowDetail.render(null)
        }
        
        // Check if current molecule is involved in the selected pathway
        // If so, keep the molecule tab open
        if (nodeDetail.currentMolecule && selectedPathway) {
          const currentMolecule = nodeDetail.currentMolecule
          const pathwayReactions = selectedPathway.reactions || []
          
          // Check if the molecule is involved in any reaction in the pathway
          const isMoleculeInPathway = pathwayReactions.length > 0 && pathwayReactions.some(reaction => 
            viewer.isReactionRelatedToMolecule(
              reaction,
              currentMolecule.name,
              currentMolecule.id
            )
          )
          
          // Keep molecule if it's involved in the selected pathway
          if (isMoleculeInPathway) {
            // Keep the molecule tab - don't clear it
          } else {
            // Clear molecule view if it's not involved in the selected pathway
            nodeDetail.render(null)
          }
        } else {
          // No current molecule or no selected pathway, so clear it anyway
          nodeDetail.render(null)
        }
        
        // Switch to pathway tab
        tabs.forEach(t => t.classList.remove('active'))
        tabs[2].classList.add('active')
        views.forEach(v => v.classList.remove('active'))
        pathwayContainer.classList.add('active')
        
        // Show detail panel first, then zoom will happen after container resizes
        // (zoom is handled in selectPathway with a delay)
      })

      // Listen for reaction selection (from arrows)
      viewerContainer.addEventListener('reaction-selected', (event) => {
        const reactionData = event.detail;
        const reaction = reactionData.reaction || reactionData; // Handle both old and new format
        const skipTabSwitch = reactionData.skipTabSwitch || false;
        
        arrowDetail.render(reaction)
        
        // Check if current molecule is involved in the selected reaction
        // If so, keep the molecule tab open
        if (nodeDetail.currentMolecule) {
          const currentMolecule = nodeDetail.currentMolecule
          const isRelated = viewer.isReactionRelatedToMolecule(
            reaction,
            currentMolecule.name,
            currentMolecule.id
          )
          
          // Keep molecule if it's involved in the selected reaction
          if (!isRelated) {
            // Clear molecule view if it's not involved in the selected reaction
            nodeDetail.render(null)
          }
        } else {
          // No current molecule, so clear it anyway
          nodeDetail.render(null)
        }
        
        // Only switch to reaction tab if not skipping tab switch (i.e., clicked from pathway card)
        if (!skipTabSwitch) {
          // Switch to reaction tab
          tabs.forEach(t => t.classList.remove('active'))
          tabs[1].classList.add('active')
          views.forEach(v => v.classList.remove('active'))
          reactionContainer.classList.add('active')
        }
      })
      
      // Listen for molecule selection (from nodes)
      viewerContainer.addEventListener('molecule-selected', (event) => {
        const moleculeData = event.detail;
        const molecule = moleculeData.molecule || moleculeData; // Handle both old and new format
        const reactionNode = moleculeData.reactionNode || null; // Get reaction node for complex nodes
        const skipTabSwitch = moleculeData.skipTabSwitch || false;
        const isDirectNodeClick = moleculeData.isDirectNodeClick !== false; // Default to true for backward compatibility
        
        nodeDetail.render(molecule, reactionNode, isDirectNodeClick)
        
        // Clear reaction tab by default when selecting a molecule
        // Only keep it if the molecule is directly related to the current reaction
        if (arrowDetail.currentReaction) {
          const currentReaction = arrowDetail.currentReaction;
          
          // Check if the molecule is related to the current reaction
          const isRelated = viewer.isReactionRelatedToMolecule(
            currentReaction,
            molecule.name,
            molecule.id
          );
          
          // Only keep the reaction if the molecule is directly related to it
          // Otherwise, clear the reaction tab and reset reaction selection in viewer
          if (!isRelated) {
            // Clear the reaction view - use both render(null) and direct container clear
            arrowDetail.render(null)
            // Also directly clear the container to ensure it's emptied
            if (reactionContainer) {
              reactionContainer.innerHTML = '<div class="detail-placeholder">Click a reaction arrow to view reaction details</div>'
            }
            // Ensure currentReaction is cleared
            arrowDetail.currentReaction = null
            // Also clear the reaction selection in the viewer and reset visual highlighting
            viewer.selectedReaction = null
            // Reset reaction arrow highlighting
            viewer.g.selectAll('.connection')
              .attr('stroke-width', 4)
              .attr('stroke-opacity', 0.7)
              .attr('stroke', '#2c5f7c')
              .attr('marker-end', 'url(#arrowhead)')
          }
        }
        
        // Only switch to molecule tab if not skipping tab switch (i.e., clicked from reaction detail)
        if (!skipTabSwitch) {
          // Switch to molecule tab
          tabs.forEach(t => t.classList.remove('active'))
          tabs[0].classList.add('active')
          views.forEach(v => v.classList.remove('active'))
          moleculeContainer.classList.add('active')
        }
      })
      
      // Listen for molecule selection from reaction detail cards
      viewerContainer.addEventListener('select-molecule-by-name', (event) => {
        const { moleculeName, moleculeId, reaction, isByreactant, skipTabSwitch, skipZoom } = event.detail
        // Respect skipTabSwitch and skipZoom options (for pathway tab links, keep tab active and don't zoom)
        viewer.selectMoleculeByName(moleculeName, moleculeId, { 
          skipTabSwitch: skipTabSwitch !== undefined ? skipTabSwitch : false, // Default to switching tabs unless specified
          skipZoom: skipZoom !== undefined ? skipZoom : false, // Default to zooming unless specified
          sourceReaction: reaction, // Pass reaction context for byreactants/byproducts
          isByreactant: isByreactant // Pass whether it's a byreactant or byproduct
        })
      })
      
      // Listen for pathway updates (when node or arrow is selected)
      // This updates the pathway detail panel without switching tabs
      viewerContainer.addEventListener('pathway-updated', (event) => {
        pathwayView.render(event.detail)
        // Don't switch tabs - keep the current tab active
        // The pathway detail panel will be updated in the background
      })
      
      // Listen for reaction selection from pathway detail cards
      viewerContainer.addEventListener('select-reaction-by-step', (event) => {
        const { step, reaction, reactionId, pathwayId, pathwayStartIndex, reactionIndexInPathway, skipZoom, switchToReactionTab } = event.detail
        
        let targetReaction = null;
        
        // Priority 1: If pathway info is provided (from Key Regulatory Steps), find reaction using pathway index
        // This should be checked first to avoid matching wrong reactions with same product ID
        // But verify the reaction ID matches to ensure we have the correct reaction
        if (pathwayId && pathwayStartIndex !== undefined && reactionIndexInPathway !== null) {
          // Find the reaction in the viewer's reactions array using pathway startIndex + reaction index
          const viewerReactionIndex = pathwayStartIndex + reactionIndexInPathway;
          if (viewerReactionIndex >= 0 && viewerReactionIndex < viewer.reactions.length) {
            const candidateReaction = viewer.reactions[viewerReactionIndex];
            // Verify the reaction ID matches (if provided) to ensure we have the correct reaction
            if (!reactionId || candidateReaction.id === reactionId || 
                (candidateReaction.product && candidateReaction.product.id === reactionId)) {
              targetReaction = candidateReaction;
              console.log('Found reaction by pathway index:', targetReaction.name);
            } else {
              console.warn(`Reaction at index ${viewerReactionIndex} doesn't match reactionId ${reactionId}, trying other methods`);
            }
          }
        }
        
        // Priority 2: If reaction ID is provided, find reaction by reaction.id (reaction_id) or product.id
        // Only use this if pathway index didn't work, and prefer reactions from the specified pathway
        if (!targetReaction && reactionId) {
          if (pathwayId && pathwayStartIndex !== undefined) {
            // Try to find within the specified pathway first
            const pathwayEndIndex = pathwayStartIndex + (viewer.getPathwayForReaction ? 
              (viewer.getPathwayForReaction(viewer.reactions[pathwayStartIndex])?.reactions?.length || 0) : 0);
            targetReaction = viewer.reactions.slice(pathwayStartIndex, pathwayEndIndex)
              .find(r => r.id === reactionId || (r.product && r.product.id === reactionId));
          }
          // Fall back to searching all reactions if pathway search didn't work
          if (!targetReaction) {
            targetReaction = viewer.reactions.find(r => r.id === reactionId || (r.product && r.product.id === reactionId));
          }
          if (targetReaction) {
            console.log('Found reaction by ID:', reactionId, targetReaction.name);
          }
        }
        
        // Priority 3: If a reaction object is provided directly, use it
        if (!targetReaction && reaction) {
          targetReaction = reaction;
        }
        
        // Priority 4: Fall back to step number search (for backwards compatibility)
        if (!targetReaction) {
          viewer.selectReactionByStep(step, { skipZoom: skipZoom || false });
          // Switch to reaction tab if requested
          if (switchToReactionTab) {
            tabs.forEach(t => t.classList.remove('active'))
            tabs[1].classList.add('active')
            views.forEach(v => v.classList.remove('active'))
            reactionContainer.classList.add('active')
          }
          return; // Early return for step-based selection
        }
        
        // If we found a target reaction, select it
        // When selecting from pathway detail page, use node_id only (not name-based highlighting)
        if (targetReaction) {
          viewer.selectReaction(targetReaction, { skipTabSwitch: true, useNodeIdOnly: true });
          if (!skipZoom) {
            viewer.zoomToReactionArrow(targetReaction);
          }
        } else {
          console.warn(`Could not find reaction: step=${step}, reactionId=${reactionId}, pathwayId=${pathwayId}, reactionIndexInPathway=${reactionIndexInPathway}`);
        }
        
        // Switch to reaction tab if requested (from pathway tab links)
        if (switchToReactionTab) {
          tabs.forEach(t => t.classList.remove('active'))
          tabs[1].classList.add('active')
          views.forEach(v => v.classList.remove('active'))
          reactionContainer.classList.add('active')
        }
        // Otherwise keep pathway tab active - don't switch tabs
        // Just update the pathway view to highlight the selected reaction
      })
      
      // Listen for clear selection (when clicking background)
      // detailPanel already defined above
      viewerContainer.addEventListener('clear-selection', () => {
        // Clear all detail views
        nodeDetail.render(null)
        arrowDetail.render(null)
        pathwayView.render(null)
        // Completely hide the detail panel to show the full map
        if (detailPanel) {
          detailPanel.style.display = 'none'
          detailPanel.style.visibility = 'hidden'
          detailPanel.style.opacity = '0'
          
          // Helper to detect mobile view
          const isMobileView = () => window.innerWidth <= 1023
          
          if (isMobileView()) {
            // Mobile: hide detail panel and expand viewer to full height
            detailPanel.style.flex = '0 0 0'
            detailPanel.style.width = '0'
            detailPanel.style.minWidth = '0'
            
            const viewerPanel = document.querySelector('.viewer-panel')
            if (viewerPanel) {
              viewerPanel.style.flex = '0 0 100%'
              viewerPanel.style.width = '100%'
            }
          } else {
            // Desktop: hide detail panel and expand viewer to full width
            detailPanel.style.width = '0'
            detailPanel.style.minWidth = '0'
            detailPanel.style.flex = '0 0 0'
            
            const viewerPanel = document.querySelector('.viewer-panel')
            if (viewerPanel) {
              viewerPanel.style.flex = '1 1 0%'
              viewerPanel.style.width = ''
              viewerPanel.style.maxWidth = ''
            }
          }
          
          // Hide resizer
          const panelResizer = document.getElementById('panel-resizer')
          if (panelResizer) {
            panelResizer.style.display = 'none'
          }
          
          // Update button positions to account for detail panel being hidden
          if (viewer && viewer.updateTopRightButtonGroupPosition) {
            viewer.updateTopRightButtonGroupPosition()
          }
          
          // Trigger resize on viewer after a brief delay to allow layout to settle
          setTimeout(() => {
            if (viewer && viewer.handleResize) {
              viewer.handleResize()
            }
            // Also update button positions after layout settles
            if (viewer && viewer.updateTopRightButtonGroupPosition) {
              viewer.updateTopRightButtonGroupPosition()
            }
          }, 50)
        }
      })
      
      // Show detail panel when selecting nodes or arrows
      const showDetailPanel = () => {
        if (detailPanel) {
          detailPanel.style.display = 'flex'
          detailPanel.style.visibility = ''
          detailPanel.style.opacity = ''
          
          // Helper to detect mobile view
          const isMobileView = () => window.innerWidth <= 1023
          
          if (isMobileView()) {
            // Mobile: set initial height (35% of viewport)
            detailPanel.style.flex = '0 0 35%'
            detailPanel.style.width = '100%'
            detailPanel.style.maxWidth = '100%'
            detailPanel.style.minWidth = '100%'
            
            // Ensure viewer panel uses flex to shrink and make room
            const viewerPanel = document.querySelector('.viewer-panel')
            if (viewerPanel) {
              viewerPanel.style.flex = '0 0 65%'
              viewerPanel.style.width = '100%'
            }
          } else {
            // Desktop: set initial width (35% of viewport)
            detailPanel.style.flex = '0 0 35%'
            detailPanel.style.width = ''
            detailPanel.style.minWidth = '200px'
            
            // Ensure viewer panel uses flex to shrink and make room
            const viewerPanel = document.querySelector('.viewer-panel')
            if (viewerPanel) {
              viewerPanel.style.flex = '1 1 0%' // Takes remaining space, can shrink
              viewerPanel.style.width = ''
              viewerPanel.style.maxWidth = ''
            }
          }
          
          // Show resizer
          const panelResizer = document.getElementById('panel-resizer')
          if (panelResizer) {
            panelResizer.style.display = 'block'
          }
          
          // Update button positions to account for detail panel
          if (viewer && viewer.updateTopRightButtonGroupPosition) {
            viewer.updateTopRightButtonGroupPosition()
          }
          
          // Trigger resize on viewer after a brief delay to allow layout to settle
          setTimeout(() => {
            if (viewer && viewer.handleResize) {
              viewer.handleResize()
            }
            // Also update button positions after layout settles
            if (viewer && viewer.updateTopRightButtonGroupPosition) {
              viewer.updateTopRightButtonGroupPosition()
            }
          }, 50)
        }
      }
      
      // Show panel when selecting molecule, reaction, or pathway
      viewerContainer.addEventListener('molecule-selected', showDetailPanel)
      viewerContainer.addEventListener('reaction-selected', showDetailPanel)
      viewerContainer.addEventListener('pathway-selected', showDetailPanel)
      
      // Setup panel resizer
      const panelResizer = document.getElementById('panel-resizer')
      const viewerPanel = document.querySelector('.viewer-panel')
      if (panelResizer && detailPanel && viewerPanel) {
        let isResizing = false
        let startX = 0
        let startY = 0
        let startWidth = 0
        let startHeight = 0
        
        // Helper function to detect mobile view
        const isMobileView = () => {
          return window.innerWidth <= 1023
        }
        
        // Helper to get client position from mouse or touch event
        const getClientPos = (e) => {
          if (e.touches && e.touches.length > 0) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY }
          }
          return { x: e.clientX, y: e.clientY }
        }
        
        const startResize = (e) => {
          if (!detailPanel || detailPanel.style.display === 'none') {
            return // Don't allow resizing when panel is hidden
          }
          isResizing = true
          const pos = getClientPos(e)
          startX = pos.x
          startY = pos.y
          
          if (isMobileView()) {
            // Mobile: resize height
            startHeight = detailPanel.getBoundingClientRect().height
            document.body.style.cursor = 'row-resize'
          } else {
            // Desktop: resize width
            startWidth = detailPanel.getBoundingClientRect().width
            document.body.style.cursor = 'col-resize'
          }
          
          panelResizer.classList.add('active')
          document.body.style.userSelect = 'none'
          e.preventDefault()
        }
        
        const doResize = (e) => {
          if (!isResizing) return
          
          const pos = getClientPos(e)
          
          if (isMobileView()) {
            // Mobile: vertical resizing (height)
            const deltaY = pos.y - startY
            const mainContent = document.querySelector('.main-content')
            const mainContentHeight = mainContent.getBoundingClientRect().height
            
            // Calculate new height as percentage of main content height
            // Dragging down (positive deltaY) should decrease panel height
            // Dragging up (negative deltaY) should increase panel height
            const newHeightPx = startHeight - deltaY
            const newHeightPercent = (newHeightPx / mainContentHeight) * 100
            
            // Clamp between min and max (20% to 80% of viewport height)
            const minPercent = 20
            const maxPercent = 80
            const clampedPercent = Math.max(minPercent, Math.min(maxPercent, newHeightPercent))
            
            // Update detail panel height using flex-basis
            detailPanel.style.flex = `0 0 ${clampedPercent}%`
            detailPanel.style.height = ''
            
            // Update viewer panel to take remaining space
            viewerPanel.style.flex = `0 0 ${100 - clampedPercent}%`
          } else {
            // Desktop: horizontal resizing (width)
            const deltaX = pos.x - startX
            const mainContent = document.querySelector('.main-content')
            const mainContentWidth = mainContent.getBoundingClientRect().width
            
            // Calculate new width as percentage of main content width
            // Reverse the direction: dragging right (positive deltaX) should decrease panel width
            // Dragging left (negative deltaX) should increase panel width
            const newWidthPx = startWidth - deltaX
            const newWidthPercent = (newWidthPx / mainContentWidth) * 100
            
            // Clamp between min and max
            const minPercent = (200 / mainContentWidth) * 100 // 200px minimum
            const maxPercent = 50 // 50% maximum
            const clampedPercent = Math.max(minPercent, Math.min(maxPercent, newWidthPercent))
            
            // Update detail panel width using flex-basis
            detailPanel.style.flex = `0 0 ${clampedPercent}%`
            detailPanel.style.width = ''
            
            // Update viewer panel to take remaining space
            viewerPanel.style.flex = '1 1 0%'
          }
          
          // Trigger viewer resize after a brief delay
          setTimeout(() => {
            if (viewer && viewer.handleResize) {
              viewer.handleResize()
            }
            // Update button positions to account for panel resize
            if (viewer && viewer.updateTopRightButtonGroupPosition) {
              viewer.updateTopRightButtonGroupPosition()
            }
          }, 10)
        }
        
        const stopResize = () => {
          if (!isResizing) return
          isResizing = false
          panelResizer.classList.remove('active')
          document.body.style.cursor = ''
          document.body.style.userSelect = ''
        }
        
        // Mouse events (desktop and mobile with mouse)
        panelResizer.addEventListener('mousedown', startResize)
        document.addEventListener('mousemove', doResize)
        document.addEventListener('mouseup', stopResize)
        
        // Touch events (mobile)
        panelResizer.addEventListener('touchstart', startResize, { passive: false })
        document.addEventListener('touchmove', doResize, { passive: false })
        document.addEventListener('touchend', stopResize)
        document.addEventListener('touchcancel', stopResize)
      }

    } catch (error) {
      console.error('Error initializing viewer:', error)
      app.innerHTML = `<div style="padding: 2rem; color: red;">
        <h2>Error loading application</h2>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
      </div>`
    }
  }, 100)
}

// Expose node cache utilities to global scope for easy access
import { clearNodeCache, getNodeCacheStats, getAllNodesFromStorage, removeNodeFromStorage, removeNodesByNameFromStorage } from './utils/nodeCache.js'
window.NodeCache = {
  clear: clearNodeCache,
  stats: getNodeCacheStats,
  load: getAllNodesFromStorage,
  remove: removeNodeFromStorage,
  removeByName: removeNodesByNameFromStorage,
  clearViewerCache: () => {
    if (window.metabolismViewer) {
      window.metabolismViewer.clearPubChemCache();
      console.log('Cleared MetabolismViewer in-memory cache');
    } else {
      console.warn('MetabolismViewer not available. Refresh the page first.');
    }
  },
  help: () => {
    console.log(`
Node Cache Utilities:
  - NodeCache.clear()        : Clear all cached node data from localStorage
  - NodeCache.stats()        : Get cache statistics (size, last updated, version)
  - NodeCache.load()         : Load and return the cache Map
  - NodeCache.remove(id)     : Remove a node by ID from cache
  - NodeCache.removeByName(name) : Remove all nodes matching a name from cache (also clears in-memory cache)
  - NodeCache.clearViewerCache() : Clear MetabolismViewer in-memory cache
  - NodeCache.help()         : Show this help message
    `)
  }
}
console.log('Node cache utilities available. Type NodeCache.help() for more info.')
