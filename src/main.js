import './style.css'
import { MetabolismViewer } from './components/MetabolismViewer.js'
import { ArrowDetail } from './components/ArrowDetail.js'
import { NodeDetail } from './components/NodeDetail.js'
import { PathwayDetail } from './components/PathwayDetail.js'
import { glycolysisReactions, glycolysisSummary } from './data/glycolysis.js'
import { pyruvateOxidationReactions, pyruvateOxidationSummary } from './data/pyruvateOxidation.js'
import { citricAcidCycleReactions, citricAcidCycleSummary } from './data/citricAcidCycle.js'
import { electronTransportChainReactions, electronTransportChainSummary } from './data/electronTransportChain.js'

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
    <div class="app-container">
        <button id="theme-toggle" class="theme-toggle" title="Toggle light/dark mode" aria-label="Toggle theme">
          <span class="theme-icon">🌙</span>
        </button>
        <div class="main-content">
          <div class="viewer-panel">
            <div id="metabolism-viewer" class="metabolism-viewer"></div>
          </div>
          
          <div class="panel-resizer" id="panel-resizer"></div>
          
          <div class="detail-panel">
          <div class="detail-tabs">
            <button class="detail-tab active" data-tab="molecule">Molecule (Node)</button>
            <button class="detail-tab" data-tab="reaction">Reaction (Arrow)</button>
            <button class="detail-tab" data-tab="pathway">Pathway Group</button>
          </div>
          <div class="detail-content">
            <div id="molecule-view" class="detail-view active"></div>
            <div id="reaction-detail" class="detail-view"></div>
            <div id="pathway-detail" class="detail-view"></div>
          </div>
        </div>
      </div>
    </div>
  `
  
  // Update theme icon based on current theme
  const updateThemeIcon = (theme) => {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const icon = themeToggle.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
    }
  };
  
  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  };
  
  // Update icon based on current theme
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateThemeIcon(currentTheme);
  
  // Add theme toggle button event listener
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
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
      nodeDetail.setViewerContainer(viewerContainer)

      // Tab switching
      const tabs = document.querySelectorAll('.detail-tab')
      const views = document.querySelectorAll('.detail-view')
      const detailContent = document.querySelector('.detail-content')
      
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const tabName = tab.dataset.tab
          
          // Update active tab
          tabs.forEach(t => t.classList.remove('active'))
          tab.classList.add('active')
          
          // Update active view
          views.forEach(v => v.classList.remove('active'))
          if (tabName === 'molecule') {
            moleculeContainer.classList.add('active')
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
            // If reaction view has content, trigger the same effect as clicking the reaction arrow
            if (arrowDetail.currentReaction) {
              viewer.selectReaction(arrowDetail.currentReaction, { skipTabSwitch: true })
              viewer.zoomToReactionArrow(arrowDetail.currentReaction)
            }
          } else if (tabName === 'pathway') {
            pathwayContainer.classList.add('active')
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
        if (pathwayId && pathwayStartIndex !== undefined && reactionIndexInPathway !== null) {
          // Find the reaction in the viewer's reactions array using pathway startIndex + reaction index
          const viewerReactionIndex = pathwayStartIndex + reactionIndexInPathway;
          if (viewerReactionIndex >= 0 && viewerReactionIndex < viewer.reactions.length) {
            targetReaction = viewer.reactions[viewerReactionIndex];
            console.log('Found reaction by pathway index:', targetReaction.name);
          }
        }
        
        // Priority 2: If reaction ID is provided, find reaction by product ID
        // Only use this if pathway index didn't work, and prefer reactions from the specified pathway
        if (!targetReaction && reactionId) {
          if (pathwayId && pathwayStartIndex !== undefined) {
            // Try to find within the specified pathway first
            const pathwayEndIndex = pathwayStartIndex + (viewer.getPathwayForReaction ? 
              (viewer.getPathwayForReaction(viewer.reactions[pathwayStartIndex])?.reactions?.length || 0) : 0);
            targetReaction = viewer.reactions.slice(pathwayStartIndex, pathwayEndIndex)
              .find(r => r.product && r.product.id === reactionId);
          }
          // Fall back to searching all reactions if pathway search didn't work
          if (!targetReaction) {
            targetReaction = viewer.reactions.find(r => r.product && r.product.id === reactionId);
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
        if (targetReaction) {
          viewer.selectReaction(targetReaction, { skipTabSwitch: true });
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
          // Hide resizer
          const panelResizer = document.getElementById('panel-resizer')
          if (panelResizer) {
            panelResizer.style.display = 'none'
          }
          // Trigger resize on viewer after a brief delay to allow layout to settle
          setTimeout(() => {
            if (viewer && viewer.handleResize) {
              viewer.handleResize()
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
          // Use flex basis to set width - this ensures it takes space from the layout
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
          
          // Show resizer
          const panelResizer = document.getElementById('panel-resizer')
          if (panelResizer) {
            panelResizer.style.display = 'block'
          }
          
          // Trigger resize on viewer after a brief delay to allow layout to settle
          setTimeout(() => {
            if (viewer && viewer.handleResize) {
              viewer.handleResize()
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
        let startWidth = 0
        
        const startResize = (e) => {
          if (!detailPanel || detailPanel.style.display === 'none') {
            return // Don't allow resizing when panel is hidden
          }
          isResizing = true
          startX = e.clientX
          startWidth = detailPanel.getBoundingClientRect().width
          panelResizer.classList.add('active')
          document.body.style.cursor = 'col-resize'
          document.body.style.userSelect = 'none'
          e.preventDefault()
        }
        
        const doResize = (e) => {
          if (!isResizing) return
          
          const deltaX = e.clientX - startX
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
          
          // Trigger viewer resize after a brief delay
          setTimeout(() => {
            if (viewer && viewer.handleResize) {
              viewer.handleResize()
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
        
        panelResizer.addEventListener('mousedown', startResize)
        document.addEventListener('mousemove', doResize)
        document.addEventListener('mouseup', stopResize)
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
