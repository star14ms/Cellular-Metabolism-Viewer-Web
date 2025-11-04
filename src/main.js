import './style.css'
import { MetabolismViewer } from './components/MetabolismViewer.js'
import { ReactionDetail } from './components/MoleculeDetail.js'
import { MoleculeView } from './components/MoleculeView.js'
import { PathwayDetail } from './components/PathwayDetail.js'
import { glycolysisReactions, glycolysisSummary } from './data/glycolysis.js'
import { pyruvateOxidationReactions, pyruvateOxidationSummary } from './data/pyruvateOxidation.js'
import { citricAcidCycleReactions, citricAcidCycleSummary } from './data/citricAcidCycle.js'

const app = document.querySelector('#app')

if (!app) {
  console.error('App container not found')
} else {
  app.innerHTML = `
    <div class="app-container">
      <div class="main-content">
        <div class="viewer-panel">
          <div id="metabolism-viewer" class="metabolism-viewer"></div>
        </div>
        
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
      viewerPanel.style.flex = '1 1 100%'
      viewerPanel.style.width = '100%'
      viewerPanel.style.borderRight = 'none'
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
      
      const moleculeView = new MoleculeView(moleculeContainer)
      const reactionView = new ReactionDetail(reactionContainer)
      const pathwayView = new PathwayDetail(pathwayContainer)

      // Tab switching
      const tabs = document.querySelectorAll('.detail-tab')
      const views = document.querySelectorAll('.detail-view')
      
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
          } else if (tabName === 'reaction') {
            reactionContainer.classList.add('active')
          } else if (tabName === 'pathway') {
            pathwayContainer.classList.add('active')
          }
        })
      })
      
      // Listen for pathway selection
      viewerContainer.addEventListener('pathway-selected', (event) => {
        pathwayView.render(event.detail)
        // Switch to pathway tab
        tabs.forEach(t => t.classList.remove('active'))
        tabs[2].classList.add('active')
        views.forEach(v => v.classList.remove('active'))
        pathwayContainer.classList.add('active')
      })

      // Listen for reaction selection (from arrows)
      viewerContainer.addEventListener('reaction-selected', (event) => {
        reactionView.render(event.detail)
        // Switch to reaction tab
        tabs.forEach(t => t.classList.remove('active'))
        tabs[1].classList.add('active')
        views.forEach(v => v.classList.remove('active'))
        reactionContainer.classList.add('active')
      })
      
      // Listen for molecule selection (from nodes)
      viewerContainer.addEventListener('molecule-selected', (event) => {
        moleculeView.render(event.detail)
        // Switch to molecule tab
        tabs.forEach(t => t.classList.remove('active'))
        tabs[0].classList.add('active')
        views.forEach(v => v.classList.remove('active'))
        moleculeContainer.classList.add('active')
      })
      
      // Listen for clear selection (when clicking background)
      // detailPanel already defined above
      viewerContainer.addEventListener('clear-selection', () => {
        // Clear all detail views
        moleculeView.render(null)
        reactionView.render(null)
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
            viewerPanel.style.flex = '1 1 100%'
            viewerPanel.style.width = '100%'
            viewerPanel.style.borderRight = 'none' // Remove border when detail panel is hidden
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
          detailPanel.style.width = ''
          detailPanel.style.minWidth = ''
          detailPanel.style.flex = ''
          detailPanel.style.visibility = ''
          detailPanel.style.opacity = ''
          // Restore viewer panel to normal size (will shrink to accommodate detail panel)
          const viewerPanel = document.querySelector('.viewer-panel')
          if (viewerPanel) {
            viewerPanel.style.flex = '1'
            viewerPanel.style.width = ''
            viewerPanel.style.borderRight = '1px solid #e9ecef' // Restore border
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
