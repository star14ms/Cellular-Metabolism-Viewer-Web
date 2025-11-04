import './style.css'
import { MetabolismViewer } from './components/MetabolismViewer.js'
import { ReactionDetail } from './components/MoleculeDetail.js'
import { MoleculeView } from './components/MoleculeView.js'
import { PathwayDetail } from './components/PathwayDetail.js'
import { glycolysisReactions, glycolysisSummary } from './data/glycolysis.js'
import { pyruvateOxidationReactions, pyruvateOxidationSummary } from './data/pyruvateOxidation.js'
import { citricAcidCycleReactions, citricAcidCycleSummary } from './data/citricAcidCycle.js'

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
        // Clear molecule and reaction views when pathway is selected
        moleculeView.render(null)
        reactionView.render(null)
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
        reactionView.render(event.detail)
        // Clear molecule view when reaction is selected
        moleculeView.render(null)
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
      
      // Listen for pathway updates (when node or arrow is selected)
      // This updates the pathway detail panel without switching tabs
      viewerContainer.addEventListener('pathway-updated', (event) => {
        pathwayView.render(event.detail)
        // Don't switch tabs - keep the current tab active
        // The pathway detail panel will be updated in the background
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
