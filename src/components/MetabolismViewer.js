/**
 * Metabolism Viewer Component
 * 
 * Interactive zoomable/panable visualization of metabolic pathways
 */

import * as d3 from 'd3';
import { glycolysisReactions, glycolysisSummary } from '../data/glycolysis.js';
import { pyruvateOxidationReactions, pyruvateOxidationSummary } from '../data/pyruvateOxidation.js';
import { citricAcidCycleReactions, citricAcidCycleSummary } from '../data/citricAcidCycle.js';
import { fetchCompoundWithFallback } from '../services/pubchemService.js';

export class MetabolismViewer {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      width: options.width || 1400,
      height: options.height || 800,
      ...options
    };
    
    // Combine all pathway reactions
    this.reactions = [
      ...glycolysisReactions,
      ...pyruvateOxidationReactions,
      ...citricAcidCycleReactions
    ];
    
    // Adjust step numbers for continuity
    let stepCounter = glycolysisReactions.length + 1;
    pyruvateOxidationReactions.forEach(reaction => {
      reaction.step = stepCounter++;
    });
    stepCounter = 1; // Reset for citric acid cycle (it's a cycle, so steps are independent)
    citricAcidCycleReactions.forEach(reaction => {
      reaction.step = stepCounter++;
    });
    
    // Define pathway groups
    this.pathways = [
      {
        id: 'glycolysis',
        name: 'Glycolysis',
        reactions: glycolysisReactions,
        summary: glycolysisSummary,
        startIndex: 0,
        endIndex: glycolysisReactions.length
      },
      {
        id: 'pyruvate-oxidation',
        name: 'Pyruvate Oxidation',
        reactions: pyruvateOxidationReactions,
        summary: pyruvateOxidationSummary,
        startIndex: glycolysisReactions.length,
        endIndex: glycolysisReactions.length + pyruvateOxidationReactions.length
      },
      {
        id: 'citric-acid-cycle',
        name: 'Citric Acid Cycle',
        reactions: citricAcidCycleReactions,
        summary: citricAcidCycleSummary,
        startIndex: glycolysisReactions.length + pyruvateOxidationReactions.length,
        endIndex: glycolysisReactions.length + pyruvateOxidationReactions.length + citricAcidCycleReactions.length
      }
    ];
    
    this.selectedNode = null;
    this.selectedMolecule = null;
    this.selectedReaction = null;
    this.selectedPathway = null;
    this.currentZoom = 1;
    this.moleculeImages = new Map(); // Cache for molecule 2D images
    
    console.log('MetabolismViewer initialized with', this.reactions.length, 'reactions')
    
    this.init();
  }
  
  init() {
    if (!this.container) {
      console.error('Container is null or undefined')
      return
    }
    
    // Ensure container has dimensions
    const containerElement = this.container
    if (containerElement) {
      containerElement.style.width = this.options.width + 'px'
      containerElement.style.height = this.options.height + 'px'
    }
    
    // Clear container first
    d3.select(this.container).selectAll('*').remove()
    
    // Calculate required dimensions based on all pathways
    const maxX = Math.max(...this.reactions.map(r => r.position.x)) + 100;
    const maxY = Math.max(...this.reactions.map(r => r.position.y)) + 100;
    const minX = Math.min(...this.reactions.map(r => r.position.x)) - 100;
    const minY = Math.min(...this.reactions.map(r => r.position.y)) - 100;
    
    // Create SVG container
    // Width and height attributes use container dimensions (window-based)
    // No viewBox - SVG will scale naturally with container
    this.svg = d3.select(this.container)
      .append('svg')
      .attr('width', this.options.width)
      .attr('height', this.options.height)
      .style('background', '#fafafa')
      .style('cursor', 'grab')
      .style('display', 'block');
    
    console.log('SVG created with dimensions:', this.options.width, this.options.height)
    
    // Create zoom behavior (for dragging/panning)
    this.zoom = d3.zoom()
      .scaleExtent([0.1, 5])
      .on('zoom', (event) => this.handleZoom(event));
    
    // Filter zoom events: allow all except wheel without modifier keys
    this.zoom.filter(function(event) {
      // Allow zoom on drag, touch, and wheel with Ctrl/Cmd
      // Block wheel without modifiers (we'll handle that as pan)
      if (event.type === 'wheel') {
        return event.ctrlKey || event.metaKey;
      }
      return true; // Allow all other event types
    });
    
    this.svg.call(this.zoom);
    
    // Store current transform for scroll panning
    this.currentTransform = d3.zoomIdentity;
    
    // Add custom scroll behavior
    this.svg.on('wheel', (event) => {
      // If Ctrl/Cmd is held, allow zoom (don't prevent default, let D3 handle it)
      if (event.ctrlKey || event.metaKey) {
        // Let D3 zoom handle it - we'll update currentTransform in handleZoom
        return;
      }
      // Otherwise, pan vertically
      event.preventDefault();
      this.handleScroll(event);
    });
    
    // Create main group for zoomable content
    this.g = this.svg.append('g');
    
    // Create fixed overlay group for UI elements that shouldn't zoom/pan
    this.overlay = this.svg.append('g')
      .attr('class', 'fixed-overlay');
    
    // Create reaction groups
    this.reactionGroups = this.g.selectAll('.reaction-group')
      .data(this.reactions)
      .enter()
      .append('g')
      .attr('class', 'reaction-group')
      .attr('transform', d => `translate(${d.position.x}, ${d.position.y})`)
      .style('cursor', 'pointer');
    
    // Draw connections between reactions
    this.drawConnections();
    
    // Draw reaction nodes
    this.drawReactions();
    
    // Draw pathway buttons (in zoomable group)
    this.drawPathwayButtons();
    
    // Add help button in upper right (in fixed overlay)
    this.drawHelpButton();
    
    console.log('Reaction groups created:', this.reactionGroups.size())
    
    // Add click handlers
    this.setupInteractions();
    
    // Add background click handler AFTER all elements are created
    // This ensures it's behind all other elements and catches clicks on empty space
    // Use a large invisible rectangle that covers the entire map area
    const backgroundRect = this.g.insert('rect', ':first-child') // Insert at the beginning so it's behind everything
      .attr('class', 'background-click-area')
      .attr('x', -10000)
      .attr('y', -10000)
      .attr('width', 20000)
      .attr('height', 20000)
      .attr('fill', 'transparent')
      .style('pointer-events', 'all')
      .style('cursor', 'grab'); // Match the cursor for consistency
    
    backgroundRect.on('click', (event) => {
      // Always clear selections when clicking background (empty space)
      // This prevents detail windows from showing when clicking background
      event.stopPropagation();
      this.clearAllSelections();
    });
    
    // Set initial camera view to show all reactions (same as "Show All" button)
    this.setInitialView();
    
    // Add window resize handler to update SVG dimensions dynamically
    let resizeTimeout;
    this.handleResize = () => {
      // Debounce resize events
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const containerRect = this.container.getBoundingClientRect();
        const newWidth = containerRect.width || window.innerWidth;
        const newHeight = containerRect.height || window.innerHeight;
        
        if (newWidth > 0 && newHeight > 0 && 
            (newWidth !== this.options.width || newHeight !== this.options.height)) {
          this.options.width = newWidth;
          this.options.height = newHeight;
          
          // Update SVG width and height attributes to match container size (window-based)
          if (this.svg) {
            this.svg
              .attr('width', newWidth)
              .attr('height', newHeight);
          }
          
          // Update help button position (it's in overlay, positioned relative to viewport)
          // The button should be positioned relative to the current container width (which shrinks when detail panel appears)
          if (this.overlay) {
            const helpButton = this.overlay.select('.help-button');
            if (!helpButton.empty()) {
              // Position button at right edge of current container (not full viewport)
              const buttonX = newWidth - 60; // 60px from right edge of current container
              helpButton.attr('transform', `translate(${buttonX}, 50)`);
              
              // Also update tooltip position to avoid going off right edge
              const tooltipGroup = helpButton.select('.help-tooltip');
              if (!tooltipGroup.empty()) {
                const tooltipWidth = 450;
                const tooltipX = -tooltipWidth / 2;
                const maxRight = newWidth - 20;
                const tooltipRightEdge = buttonX + tooltipX + tooltipWidth;
                const adjustedX = tooltipRightEdge > maxRight ? tooltipX - (tooltipRightEdge - maxRight) : tooltipX;
                tooltipGroup.attr('transform', `translate(${adjustedX}, 25)`);
              }
            }
          }
        }
      }, 100); // 100ms debounce
    };
    
    window.addEventListener('resize', this.handleResize);
    
    // Also watch for container size changes (e.g., when detail panel appears/disappears)
    // Use ResizeObserver if available, otherwise fall back to periodic checks
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.handleResize();
      });
      this.resizeObserver.observe(this.container);
    }
  }
  
  destroy() {
    // Clean up resize listener
    if (this.handleResize) {
      window.removeEventListener('resize', this.handleResize);
    }
    // Clean up ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
  
  setInitialView() {
    // Use the same logic as zoomToAllReactions but without transition
    if (this.reactions.length === 0) return;
    
    // Get current container dimensions (accounts for detail panel if visible)
    const containerRect = this.container.getBoundingClientRect();
    const containerWidth = containerRect.width || this.options.width;
    const containerHeight = containerRect.height || this.options.height;
    
    // Calculate bounding box for all reactions
    const positions = this.reactions.map(r => r.position);
    const minX = Math.min(...positions.map(p => p.x));
    const maxX = Math.max(...positions.map(p => p.x));
    const minY = Math.min(...positions.map(p => p.y));
    const maxY = Math.max(...positions.map(p => p.y));
    
    // Add padding around all reactions
    const padding = 150;
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    
    // Calculate scale to fit all reactions in view using current container size
    const scaleX = containerWidth / width;
    const scaleY = containerHeight / height;
    const scale = Math.min(scaleX, scaleY, 1) * 0.95; // Use 95% of available space, max zoom 1x (fit to view)
    
    // Calculate translation to center all reactions using current container size
    const translateX = containerWidth / 2 - centerX * scale;
    const translateY = containerHeight / 2 - centerY * scale;
    
    // Apply zoom transform (without transition for initial view)
    const transform = d3.zoomIdentity
      .translate(translateX, translateY)
      .scale(scale);
    
    this.svg.call(this.zoom.transform, transform);
    
    // Update current zoom level and transform
    this.currentZoom = scale;
    this.currentTransform = transform;
    this.updateNodeDisplay(scale);
  }
  
  drawHelpButton() {
    // Position button relative to viewport (not SVG content)
    // Use container width instead of SVG width
    const containerWidth = this.options.width;
    const buttonX = containerWidth - 60; // Position from right edge of viewport
    const buttonY = 50; // Same row as pathway buttons
    
    const helpGroup = this.overlay.append('g')
      .attr('class', 'help-button btn')
      .attr('transform', `translate(${buttonX}, ${buttonY})`)
      .style('cursor', 'pointer');
    
    // Button circle
    const circle = helpGroup.append('circle')
      .attr('r', 15)
      .attr('fill', '#667eea')
      .attr('stroke', '#5568d3')
      .attr('stroke-width', 2);
    
    // Question mark text
    helpGroup.append('text')
      .attr('x', 0)
      .attr('y', 5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '20px')
      .attr('font-weight', 'bold')
      .text('?');
    
    // Tooltip text (hidden by default, positioned below button to avoid cropping)
    // Calculate tooltip width and position to avoid right edge cropping
    // Use wider tooltip and split text into more lines to prevent overflow
    const tooltipWidth = 450; // Wider to accommodate text
    const tooltipX = -tooltipWidth / 2; // Center on button
    // Adjust if tooltip would go off right edge
    const maxRight = containerWidth - 20; // 20px margin from right edge
    const tooltipRightEdge = buttonX + tooltipX + tooltipWidth;
    const adjustedX = tooltipRightEdge > maxRight ? tooltipX - (tooltipRightEdge - maxRight) : tooltipX;
    
    const tooltipGroup = helpGroup.append('g')
      .attr('class', 'help-tooltip btn')
      .attr('transform', `translate(${adjustedX}, 25)`) // Position below button, adjusted for right edge
      .style('opacity', 0)
      .style('pointer-events', 'none');
    
    const tooltipRect = tooltipGroup.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', tooltipWidth)
      .attr('height', 75) // Increased height for more lines
      .attr('rx', 6)
      .attr('fill', '#2c5f7c')
      .attr('opacity', 0.95);
    
    // Split text into multiple lines to prevent overflow
    tooltipGroup.append('text')
      .attr('x', tooltipWidth / 2)
      .attr('y', 18)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .text('🖱️ Click arrow for reaction details');
    
    tooltipGroup.append('text')
      .attr('x', tooltipWidth / 2)
      .attr('y', 32)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .text('Click node for molecule details');
    
    tooltipGroup.append('text')
      .attr('x', tooltipWidth / 2)
      .attr('y', 46)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .text('Double-click to zoom | Scroll to pan');
    
    tooltipGroup.append('text')
      .attr('x', tooltipWidth / 2)
      .attr('y', 60)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .text('Ctrl/Cmd+Scroll to zoom | Drag to pan');
    
    // Hover effects
    helpGroup.on('mouseenter', function() {
      d3.select(this).select('circle')
        .transition().duration(200)
        .attr('fill', '#5568d3')
        .attr('stroke-width', 3);
      
      tooltipGroup.transition().duration(200).style('opacity', 1);
    })
    .on('mouseleave', function() {
      d3.select(this).select('circle')
        .transition().duration(200)
        .attr('fill', '#667eea')
        .attr('stroke-width', 2);
      
      tooltipGroup.transition().duration(200).style('opacity', 0);
    });
  }
  
  drawPathwayButtons() {
    // Create a group for pathway buttons
    const buttonGroup = this.svg.append('g')
      .attr('class', 'pathway-buttons');
    
    // Position buttons at the top-left of the map
    const buttonY = 50; // Same row as help button
    const baseButtonWidth = 140; // Increased base width to accommodate longer text
    const buttonSpacing = 160; // Increased spacing to accommodate wider buttons
    
    // Helper function to calculate button width based on text length
    const calculateButtonWidth = (text) => {
      // Estimate: ~8px per character for font-size 14px
      const textWidth = text.length * 8;
      // Add padding: 8px on each side
      return Math.max(baseButtonWidth, textWidth + 16);
    };
    
    // Add "Show All" button first (replaces reset zoom)
    const showAllButton = buttonGroup.append('g')
      .attr('class', 'pathway-button btn')
      .attr('transform', `translate(${50}, ${buttonY})`)
      .style('cursor', 'pointer');
    
    const showAllText = 'Show All';
    const showAllWidth = calculateButtonWidth(showAllText);
    
    showAllButton.append('rect')
      .attr('width', showAllWidth)
      .attr('height', 35)
      .attr('rx', 6)
      .attr('fill', '#667eea')
      .attr('stroke', '#5568d3')
      .attr('stroke-width', 2);
    
    showAllButton.append('text')
      .attr('x', showAllWidth / 2)
      .attr('y', 22)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '14px')
      .attr('font-weight', '600')
      .text(showAllText);
    
    const viewer = this;
    showAllButton.on('mouseenter', function() {
      d3.select(this).select('rect')
        .attr('fill', '#5568d3')
        .attr('stroke-width', 3);
    })
    .on('mouseleave', function() {
      d3.select(this).select('rect')
        .attr('fill', '#667eea')
        .attr('stroke-width', 2);
    })
    .on('click', (event) => {
      event.stopPropagation();
      viewer.zoomToAllReactions();
    });
    
    // Add pathway buttons (shifted by one position)
    let currentX = 50 + showAllWidth + 20; // Start after "Show All" button with 20px gap
    this.pathways.forEach((pathway, index) => {
      const buttonWidth = calculateButtonWidth(pathway.name);
      
      const button = buttonGroup.append('g')
        .attr('class', 'pathway-button btn')
        .attr('transform', `translate(${currentX}, ${buttonY})`)
        .style('cursor', 'pointer');
      
      // Button background
      button.append('rect')
        .attr('width', buttonWidth)
        .attr('height', 35)
        .attr('rx', 6)
        .attr('fill', '#667eea')
        .attr('stroke', '#5568d3')
        .attr('stroke-width', 2);
      
      // Button text
      button.append('text')
        .attr('x', buttonWidth / 2)
        .attr('y', 22)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .text(pathway.name);
      
      // Update currentX for next button
      currentX += buttonWidth + 20; // 20px gap between buttons
      
      // Hover effects
      button.on('mouseenter', function() {
        d3.select(this).select('rect')
          .attr('fill', '#5568d3')
          .attr('stroke-width', 3);
      })
      .on('mouseleave', function() {
        if (viewer.selectedPathway !== pathway.id) {
          d3.select(this).select('rect')
            .attr('fill', '#667eea')
            .attr('stroke-width', 2);
        }
      })
      .on('click', (event) => {
        event.stopPropagation();
        viewer.selectPathway(pathway);
      });
      
      // Store button reference
      pathway.button = button;
    });
  }
  
  selectPathway(pathway) {
    // Clear previous pathway selection
    if (this.selectedPathway) {
      const prevPathway = this.pathways.find(p => p.id === this.selectedPathway);
      if (prevPathway && prevPathway.button) {
        prevPathway.button.select('rect')
          .attr('fill', '#667eea')
          .attr('stroke-width', 2);
      }
    }
    
    // Highlight selected pathway button
    if (pathway.button) {
      pathway.button.select('rect')
        .attr('fill', '#4a5fb8')
        .attr('stroke-width', 3);
    }
    
    // Reset all node highlighting
    this.reactionGroups.selectAll('.reaction-circle')
      .attr('stroke-width', 2)
      .attr('stroke', '#2c5f7c')
      .attr('fill', '#5fa8d3');
    
    this.reactionGroups.selectAll('.molecule-image-bg')
      .attr('stroke', '#dee2e6')
      .attr('stroke-width', 2)
      .attr('fill', 'white');
    
    // Highlight all nodes in this pathway
    const pathwayReactions = this.reactions.slice(pathway.startIndex, pathway.endIndex);
    pathwayReactions.forEach(reaction => {
      const reactionGroup = this.reactionGroups.filter(d => d === reaction);
      
      // Highlight circle (if visible)
      reactionGroup.select('.reaction-circle')
        .attr('stroke-width', 4)
        .attr('stroke', '#ff6b6b')
        .attr('fill', '#ff8787');
      
      // Highlight image background (if visible)
      reactionGroup.select('.molecule-image-bg')
        .attr('stroke', '#ff6b6b')
        .attr('stroke-width', 4)
        .attr('fill', '#fff5f5');
    });
    
    this.selectedPathway = pathway.id;
    this.selectedReaction = null;
    this.selectedMolecule = null;
    this.selectedNode = null;
    
    // Dispatch custom event for pathway detail view (this will show the detail panel)
    const detailEvent = new CustomEvent('pathway-selected', {
      detail: {
        summary: pathway.summary,
        reactions: pathway.reactions,
        pathway: pathway // Include pathway object for zoom callback
      }
    });
    this.container.dispatchEvent(detailEvent);
    
    // Zoom and pan to show the pathway group AFTER detail panel appears and container resizes
    // Use requestAnimationFrame and setTimeout to ensure layout has settled
    // First, force a resize check to update container dimensions
    if (this.handleResize) {
      this.handleResize();
    }
    
    // Then wait for layout to settle before zooming
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          // Force another resize check before zooming to ensure dimensions are current
          if (this.handleResize) {
            this.handleResize();
          }
          // Small delay to ensure resize handler has updated dimensions
          setTimeout(() => {
            this.zoomToPathway(pathway);
          }, 50);
        }, 100); // Delay to allow detail panel to appear and container to resize
      });
    });
  }
  
  zoomToPathway(pathway) {
    const pathwayReactions = this.reactions.slice(pathway.startIndex, pathway.endIndex);
    
    if (pathwayReactions.length === 0) return;
    
    // Get current container dimensions (accounts for detail panel if visible)
    const containerRect = this.container.getBoundingClientRect();
    const containerWidth = containerRect.width || this.options.width;
    const containerHeight = containerRect.height || this.options.height;
    
    // Calculate bounding box for the pathway
    const positions = pathwayReactions.map(r => r.position);
    const minX = Math.min(...positions.map(p => p.x));
    const maxX = Math.max(...positions.map(p => p.x));
    const minY = Math.min(...positions.map(p => p.y));
    const maxY = Math.max(...positions.map(p => p.y));
    
    // Add padding around the pathway
    const padding = 100;
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    
    // Calculate scale to fit pathway in view using current container size
    const scaleX = containerWidth / width;
    const scaleY = containerHeight / height;
    const scale = Math.min(scaleX, scaleY, 2) * 0.9; // Use 90% of available space, max zoom 2x
    
    // Calculate translation to center the pathway using current container size
    const translateX = containerWidth / 2 - centerX * scale;
    const translateY = containerHeight / 2 - centerY * scale;
    
    // Apply zoom transform
    const transform = d3.zoomIdentity
      .translate(translateX, translateY)
      .scale(scale);
    
    this.svg
      .transition()
      .duration(750)
      .call(this.zoom.transform, transform);
    
    // Update current zoom level
    this.currentZoom = scale;
    this.updateNodeDisplay(scale);
  }
  
  zoomToAllReactions() {
    if (this.reactions.length === 0) return;
    
    // Get current container dimensions (accounts for detail panel if visible)
    const containerRect = this.container.getBoundingClientRect();
    const containerWidth = containerRect.width || this.options.width;
    const containerHeight = containerRect.height || this.options.height;
    
    // Calculate bounding box for all reactions
    const positions = this.reactions.map(r => r.position);
    const minX = Math.min(...positions.map(p => p.x));
    const maxX = Math.max(...positions.map(p => p.x));
    const minY = Math.min(...positions.map(p => p.y));
    const maxY = Math.max(...positions.map(p => p.y));
    
    // Add padding around all reactions
    const padding = 150;
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    
    // Calculate scale to fit all reactions in view using current container size
    const scaleX = containerWidth / width;
    const scaleY = containerHeight / height;
    const scale = Math.min(scaleX, scaleY, 1) * 0.95; // Use 95% of available space, max zoom 1x (fit to view)
    
    // Calculate translation to center all reactions using current container size
    const translateX = containerWidth / 2 - centerX * scale;
    const translateY = containerHeight / 2 - centerY * scale;
    
    // Apply zoom transform
    const transform = d3.zoomIdentity
      .translate(translateX, translateY)
      .scale(scale);
    
    this.svg
      .transition()
      .duration(750)
      .call(this.zoom.transform, transform);
    
    // Clear any pathway selection
    if (this.selectedPathway) {
      const prevPathway = this.pathways.find(p => p.id === this.selectedPathway);
      if (prevPathway && prevPathway.button) {
        prevPathway.button.select('rect')
          .attr('fill', '#667eea')
          .attr('stroke-width', 2);
      }
      this.selectedPathway = null;
    }
    
    // Reset all node highlighting
    this.reactionGroups.selectAll('.reaction-circle')
      .attr('stroke-width', 2)
      .attr('stroke', '#2c5f7c')
      .attr('fill', '#5fa8d3');
    
    this.reactionGroups.selectAll('.molecule-image-bg')
      .attr('stroke', '#dee2e6')
      .attr('stroke-width', 2)
      .attr('fill', 'white');
    
    // Update current zoom level
    this.currentZoom = scale;
    this.updateNodeDisplay(scale);
  }
  
  drawConnections() {
    // Add arrow marker definition
    this.svg.append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 8)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#2c5f7c');
    
    // Draw arrows between reactions
    // Filter out special cases:
    // - Glycolysis step 4 (aldolase) has special connections
    // - Pyruvate oxidation connects glycolysis to citric acid cycle
    // - Citric acid cycle is circular (last step connects back to first)
    const glycolysisLength = glycolysisReactions.length;
    const pyruvateOxidationLength = pyruvateOxidationReactions.length;
    const citricAcidCycleLength = citricAcidCycleReactions.length;
    
    const connectionsData = this.reactions
      .slice(0, -1)
      .map((d, i) => ({ current: d, next: this.reactions[i + 1], index: i }))
      .filter(({ index }) => {
        // Skip glycolysis step 4→5 and step 5→6 (special connections)
        if (index === 3 || index === 4) return false;
        // Skip connection from glycolysis end to pyruvate oxidation (handled separately)
        if (index === glycolysisLength - 1) return false;
        // Skip connection from pyruvate oxidation last step to citric acid cycle (handled separately)
        if (index === glycolysisLength + pyruvateOxidationLength - 1) return false;
        // Skip citric acid cycle last step (it connects back to first, handled separately)
        if (index === glycolysisLength + pyruvateOxidationLength + citricAcidCycleLength - 1) return false;
        return true;
      });
    
    // Helper function to calculate arrow coordinates
    const getArrowCoords = (d) => {
      const dx = d.next.position.x - d.current.position.x;
      const dy = d.next.position.y - d.current.position.y;
      const angle = Math.atan2(dy, dx);
      
      let x1 = d.current.position.x + 30 * Math.cos(angle);
      let y1 = d.current.position.y + 30 * Math.sin(angle);
      if (dy > 0) {
        y1 = Math.min(y1, d.current.position.y + 35);
      }
      
      let x2 = d.next.position.x - 30 * Math.cos(angle);
      let y2 = d.next.position.y - 30 * Math.sin(angle);
      if (dy < 0) {
        y2 = Math.max(y2, d.next.position.y - 35);
      }
      
      return { x1, y1, x2, y2 };
    };
    
    // Create visible arrows first (narrower, visible)
    const connections = this.g.selectAll('.connection')
      .data(connectionsData)
      .enter()
      .append('line')
      .attr('class', 'connection')
      .attr('x1', (d) => getArrowCoords(d).x1)
      .attr('y1', (d) => getArrowCoords(d).y1)
      .attr('x2', (d) => getArrowCoords(d).x2)
      .attr('y2', (d) => getArrowCoords(d).y2)
      .attr('stroke', '#2c5f7c')
      .attr('stroke-width', 4)
      .attr('stroke-opacity', 0.7)
      .attr('marker-end', 'url(#arrowhead)')
      .style('pointer-events', 'none'); // Let hit area handle events
    
    // Create invisible hit areas (wider, transparent) - must be after visible arrows
    const hitAreas = this.g.selectAll('.connection-hit')
      .data(connectionsData)
      .enter()
      .append('line')
      .attr('class', 'connection-hit')
      .attr('x1', (d) => getArrowCoords(d).x1)
      .attr('y1', (d) => getArrowCoords(d).y1)
      .attr('x2', (d) => getArrowCoords(d).x2)
      .attr('y2', (d) => getArrowCoords(d).y2)
      .attr('stroke', 'transparent')
      .attr('stroke-width', 20) // Wide invisible hit area
      .attr('stroke-opacity', 0)
      .style('cursor', 'pointer')
      .style('pointer-events', 'all')
      .on('mouseenter', function(event, d) {
        // Find and highlight the corresponding visible arrow by matching data
        const visibleArrow = this.g.selectAll('.connection').filter((_, arrowData) => 
          arrowData && arrowData.current === d.current && arrowData.next === d.next
        );
        if (!visibleArrow.empty()) {
          visibleArrow.attr('stroke-width', 6).attr('stroke-opacity', 1);
        }
      }.bind(this))
      .on('mouseleave', function(event, d) {
        const visibleArrow = this.g.selectAll('.connection').filter((_, arrowData) => 
          arrowData && arrowData.current === d.current && arrowData.next === d.next
        );
        if (!visibleArrow.empty()) {
          visibleArrow.attr('stroke-width', 4).attr('stroke-opacity', 0.7);
        }
      }.bind(this))
      .on('click', (event, d) => {
        event.stopPropagation();
        this.selectReaction(d.next);
      });
    
    // Special connections for glycolysis step 4 (Aldolase) which produces two products
    // Connection from step 4 to step 5 (vertical - dihydroxyacetone phosphate path)
    // Create hit area first
    const step4To5Hit = this.g.append('line')
      .attr('class', 'connection-hit connection-hit-special')
      .attr('data-connection-type', 'step4-to-5')
      .attr('x1', 550)
      .attr('y1', 100 + 30)
      .attr('x2', 550)
      .attr('y2', 250 - 30)
      .attr('stroke', 'transparent')
      .attr('stroke-width', 20)
      .attr('stroke-opacity', 0)
      .style('cursor', 'pointer')
      .style('pointer-events', 'all')
      .on('mouseenter', () => {
        step4To5.attr('stroke-width', 6).attr('stroke-opacity', 1);
      })
      .on('mouseleave', () => {
        step4To5.attr('stroke-width', 4).attr('stroke-opacity', 0.7);
      })
      .on('click', (event) => {
        event.stopPropagation();
        this.selectReaction(this.reactions[4]); // Step 5
      });
    
    const step4To5 = this.g.append('line')
      .attr('class', 'connection connection-special')
      .attr('data-connection-type', 'step4-to-5')
      .attr('x1', 550)
      .attr('y1', 100 + 30) // Start from bottom of step 4 circle
      .attr('x2', 550)
      .attr('y2', 250 - 30) // End at top of step 5 circle (different row) - updated for increased distance
      .attr('stroke', '#2c5f7c')
      .attr('stroke-width', 4)
      .attr('stroke-opacity', 0.7)
      .attr('marker-end', 'url(#arrowhead)')
      .style('pointer-events', 'none'); // Let hit area handle events
    
    // Connection from step 5 to step 6 (diagonal - converted glyceraldehyde-3-phosphate)
    const step5To6Hit = this.g.append('line')
      .attr('class', 'connection-hit connection-hit-special')
      .attr('data-connection-type', 'step5-to-6')
      .attr('x1', 550 + 30)
      .attr('y1', 250)
      .attr('x2', 700 - 30)
      .attr('y2', 100)
      .attr('stroke', 'transparent')
      .attr('stroke-width', 20)
      .attr('stroke-opacity', 0)
      .style('cursor', 'pointer')
      .style('pointer-events', 'all')
      .on('mouseenter', () => {
        step5To6.attr('stroke-width', 6).attr('stroke-opacity', 1);
      })
      .on('mouseleave', () => {
        step5To6.attr('stroke-width', 4).attr('stroke-opacity', 0.7);
      })
      .on('click', (event) => {
        event.stopPropagation();
        this.selectReaction(this.reactions[5]); // Step 6
      });
    
    const step5To6 = this.g.append('line')
      .attr('class', 'connection connection-special')
      .attr('data-connection-type', 'step5-to-6')
      .attr('x1', 550 + 30) // Start from right edge of step 5
      .attr('y1', 250) // Updated for increased distance from node 4
      .attr('x2', 700 - 30) // End at left edge of step 6 (back to main row)
      .attr('y2', 100)
      .attr('stroke', '#2c5f7c')
      .attr('stroke-width', 4)
      .attr('stroke-opacity', 0.7)
      .attr('marker-end', 'url(#arrowhead)')
      .style('pointer-events', 'none'); // Let hit area handle events
    
    // Connection from step 4 to step 6 (diagonal - direct glyceraldehyde-3-phosphate path)
    // This represents the glyceraldehyde-3-phosphate that goes directly to step 6
    const step4To6Hit = this.g.append('line')
      .attr('class', 'connection-hit connection-hit-special')
      .attr('data-connection-type', 'step4-to-6')
      .attr('x1', 550 + 30)
      .attr('y1', 100)
      .attr('x2', 700 - 30)
      .attr('y2', 100)
      .attr('stroke', 'transparent')
      .attr('stroke-width', 20)
      .attr('stroke-opacity', 0)
      .style('cursor', 'pointer')
      .style('pointer-events', 'all')
      .on('mouseenter', () => {
        step4To6.attr('stroke-width', 6).attr('stroke-opacity', 1);
      })
      .on('mouseleave', () => {
        step4To6.attr('stroke-width', 4).attr('stroke-opacity', 0.7);
      })
      .on('click', (event) => {
        event.stopPropagation();
        // This arrow connects step 4 to step 6, so highlight nodes 4 and 6
        const reaction6 = this.reactions[5]; // Step 6 (0-indexed: step 1 = index 0, step 6 = index 5)
        const reaction4 = this.reactions[3]; // Step 4 (0-indexed: step 4 = index 3)
        
        // Reset all highlights first
        this.reactionGroups.selectAll('.reaction-circle')
          .attr('stroke-width', 2)
          .attr('stroke', '#2c5f7c')
          .attr('fill', '#5fa8d3');
        
        this.reactionGroups.selectAll('.molecule-image-bg')
          .attr('stroke', '#dee2e6')
          .attr('stroke-width', 2)
          .attr('fill', 'white');
        
        // Highlight node 4 (substrate source)
        const reaction4Group = this.reactionGroups.filter(d => d === reaction4);
        reaction4Group.select('.reaction-circle')
          .attr('stroke-width', 4)
          .attr('stroke', '#ff6b6b')
          .attr('fill', '#ff8787');
        reaction4Group.select('.molecule-image-bg')
          .attr('stroke', '#ff6b6b')
          .attr('stroke-width', 4)
          .attr('fill', '#fff5f5');
        
        // Highlight node 6 (target)
        const reaction6Group = this.reactionGroups.filter(d => d === reaction6);
        reaction6Group.select('.reaction-circle')
          .attr('stroke-width', 4)
          .attr('stroke', '#ff6b6b')
          .attr('fill', '#ff8787');
        reaction6Group.select('.molecule-image-bg')
          .attr('stroke', '#ff6b6b')
          .attr('stroke-width', 4)
          .attr('fill', '#fff5f5');
        
        // Update selection state
        this.selectedReaction = reaction6;
        this.selectedMolecule = null;
        this.selectedNode = null;
        this.selectedPathway = null;
        
        // Dispatch reaction selected event
        const detailEvent = new CustomEvent('reaction-selected', {
          detail: reaction6
        });
        this.container.dispatchEvent(detailEvent);
      });
    
    const step4To6 = this.g.append('line')
      .attr('class', 'connection connection-special')
      .attr('data-connection-type', 'step4-to-6')
      .attr('x1', 550 + 30) // Start from right edge of step 4
      .attr('y1', 100)
      .attr('x2', 700 - 30) // End at left edge of step 6 (same row)
      .attr('y2', 100)
      .attr('stroke', '#2c5f7c')
      .attr('stroke-width', 4)
      .attr('stroke-opacity', 0.7)
      // Solid line (removed stroke-dasharray)
      .attr('marker-end', 'url(#arrowhead)')
      .style('pointer-events', 'none'); // Let hit area handle events
    
    // Connection from glycolysis end (pyruvate) to pyruvate oxidation (first step)
    const glycolysisToPyruvateOxHit = this.g.append('line')
      .attr('class', 'connection-hit connection-hit-special')
      .attr('data-connection-type', 'glycolysis-to-pyruvate')
      .attr('x1', 1300 + 30)
      .attr('y1', 100)
      .attr('x2', 1450 - 30)
      .attr('y2', 100)
      .attr('stroke', 'transparent')
      .attr('stroke-width', 20)
      .attr('stroke-opacity', 0)
      .style('cursor', 'pointer')
      .style('pointer-events', 'all')
      .on('mouseenter', () => {
        glycolysisToPyruvateOx.attr('stroke-width', 6).attr('stroke-opacity', 1);
      })
      .on('mouseleave', () => {
        glycolysisToPyruvateOx.attr('stroke-width', 4).attr('stroke-opacity', 0.7);
      })
      .on('click', (event) => {
        event.stopPropagation();
        this.selectReaction(this.reactions[glycolysisLength]); // Pyruvate oxidation step 1
      });
    
    const glycolysisToPyruvateOx = this.g.append('line')
      .attr('class', 'connection connection-special')
      .attr('data-connection-type', 'glycolysis-to-pyruvate')
      .attr('x1', 1300 + 30) // End of glycolysis
      .attr('y1', 100)
      .attr('x2', 1450 - 30) // Start of pyruvate oxidation (step 1)
      .attr('y2', 100)
      .attr('stroke', '#2c5f7c')
      .attr('stroke-width', 4)
      .attr('stroke-opacity', 0.7)
      .attr('marker-end', 'url(#arrowhead)')
      .style('pointer-events', 'none'); // Let hit area handle events
    
    // Connection from pyruvate oxidation end (step 4) to citric acid cycle (citrate formation)
    // Calculate angle from last pyruvate oxidation step to citrate (top of octagon)
    const pyruvateOxEndX = 1900;
    const pyruvateOxEndY = 100;
    const citrateX = 2050;
    const citrateY = 200; // Updated to scaled 1.5x position
    const angle = Math.atan2(citrateY - pyruvateOxEndY, citrateX - pyruvateOxEndX);
    
    const pyruvateOxToCACHit = this.g.append('line')
      .attr('class', 'connection-hit connection-hit-special')
      .attr('data-connection-type', 'pyruvate-to-cac')
      .attr('x1', pyruvateOxEndX + 30 * Math.cos(angle))
      .attr('y1', pyruvateOxEndY + 30 * Math.sin(angle))
      .attr('x2', citrateX - 30 * Math.cos(angle))
      .attr('y2', citrateY - 30 * Math.sin(angle))
      .attr('stroke', 'transparent')
      .attr('stroke-width', 20)
      .attr('stroke-opacity', 0)
      .style('cursor', 'pointer')
      .style('pointer-events', 'all')
      .on('mouseenter', () => {
        pyruvateOxToCAC.attr('stroke-width', 6).attr('stroke-opacity', 1);
      })
      .on('mouseleave', () => {
        pyruvateOxToCAC.attr('stroke-width', 4).attr('stroke-opacity', 0.7);
      })
      .on('click', (event) => {
        event.stopPropagation();
        this.selectReaction(this.reactions[glycolysisLength + pyruvateOxidationLength]); // First CAC step
      });
    
    const pyruvateOxToCAC = this.g.append('line')
      .attr('class', 'connection connection-special')
      .attr('data-connection-type', 'pyruvate-to-cac')
      .attr('x1', pyruvateOxEndX + 30 * Math.cos(angle)) // End of pyruvate oxidation (step 4)
      .attr('y1', pyruvateOxEndY + 30 * Math.sin(angle))
      .attr('x2', citrateX - 30 * Math.cos(angle)) // Start of citric acid cycle (citrate formation)
      .attr('y2', citrateY - 30 * Math.sin(angle))
      .attr('stroke', '#2c5f7c')
      .attr('stroke-width', 4)
      .attr('stroke-opacity', 0.7)
      .attr('marker-end', 'url(#arrowhead)')
      .style('pointer-events', 'none'); // Let hit area handle events
    
    // Connection from citric acid cycle end (malate, step 8) back to start (citrate, step 1)
    // This completes the cycle - malate is at top-left, citrate is at top
    const malateX = 1891; // Updated to scaled 1.5x position
    const malateY = 266; // Updated to scaled 1.5x position
    const cycleAngle = Math.atan2(citrateY - malateY, citrateX - malateX);
    
    const cacCycleHit = this.g.append('line')
      .attr('class', 'connection-hit connection-hit-special')
      .attr('data-connection-type', 'cac-cycle')
      .attr('x1', malateX + 30 * Math.cos(cycleAngle))
      .attr('y1', malateY + 30 * Math.sin(cycleAngle))
      .attr('x2', citrateX - 30 * Math.cos(cycleAngle))
      .attr('y2', citrateY - 30 * Math.sin(cycleAngle))
      .attr('stroke', 'transparent')
      .attr('stroke-width', 20)
      .attr('stroke-opacity', 0)
      .style('cursor', 'pointer')
      .style('pointer-events', 'all')
      .on('mouseenter', () => {
        cacCycle.attr('stroke-width', 6).attr('stroke-opacity', 1);
      })
      .on('mouseleave', () => {
        cacCycle.attr('stroke-width', 4).attr('stroke-opacity', 0.7);
      })
      .on('click', (event) => {
        event.stopPropagation();
        this.selectReaction(this.reactions[glycolysisLength + pyruvateOxidationLength]); // First CAC step (cycle back)
      });
    
    const cacCycle = this.g.append('line')
      .attr('class', 'connection connection-special')
      .attr('data-connection-type', 'cac-cycle')
      .attr('x1', malateX + 30 * Math.cos(cycleAngle)) // End of citric acid cycle (malate)
      .attr('y1', malateY + 30 * Math.sin(cycleAngle))
      .attr('x2', citrateX - 30 * Math.cos(cycleAngle)) // Start of citric acid cycle (citrate)
      .attr('y2', citrateY - 30 * Math.sin(cycleAngle))
      .attr('stroke', '#2c5f7c')
      .attr('stroke-width', 4)
      .attr('stroke-opacity', 0.7)
      .attr('marker-end', 'url(#arrowhead)')
      .style('pointer-events', 'none'); // Let hit area handle events
  }
  
  drawReactions() {
    // Draw reaction nodes
    const nodes = this.reactionGroups
      .append('g')
      .attr('class', 'reaction-node');
    
    // Draw circle for each reaction
    const circles = nodes.append('circle')
      .attr('r', 30)
      .attr('fill', '#5fa8d3')
      .attr('stroke', '#2c5f7c')
      .attr('stroke-width', 2)
      .attr('class', 'reaction-circle');
    
    // Add step number (centered in circle)
    nodes.append('text')
      .attr('class', 'step-number')
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .attr('fill', 'white')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .text(d => d.step);
    
    // Create image group for 2D structure (initially hidden)
    const imageGroups = nodes.append('g')
      .attr('class', 'molecule-image-group')
      .style('display', 'none');
    
    // Create image placeholder that will be updated when PubChem data is fetched
    // Add background rectangle for better visibility
    imageGroups.append('rect')
      .attr('class', 'molecule-image-bg')
      .attr('x', -55)
      .attr('y', -55)
      .attr('width', 110)
      .attr('height', 110)
      .attr('fill', 'white')
      .attr('stroke', '#dee2e6')
      .attr('stroke-width', 2)
      .attr('rx', 4);
    
    imageGroups.append('image')
      .attr('class', 'molecule-structure-image')
      .attr('x', -50)
      .attr('y', -50)
      .attr('width', 100)
      .attr('height', 100)
      .attr('preserveAspectRatio', 'xMidYMid meet');
    
    // Fetch PubChem image URLs for all molecules
    this.fetchMoleculeImages();
    
    // Helper function to split compound names at hyphens for better line breaks
    const splitCompoundName = (name) => {
      // Split names that contain hyphens with numbers (e.g., "Glucose-6-phosphate" -> "Glucose-6-" and "phosphate")
      // Pattern: Look for hyphen followed by number(s) and then hyphen (e.g., "-6-", "-1,6-")
      const hyphenNumberPattern = /-(\d+[,\d]*)-/;
      const match = name.match(hyphenNumberPattern);
      if (match) {
        // Split after the hyphen-number-hyphen pattern (e.g., after "-6-")
        // Keep the hyphen with the first part: "Glucose-6-" and "phosphate"
        const splitIndex = match.index + match[0].length; // Split after "-6-"
        const firstPart = name.substring(0, splitIndex); // "Glucose-6-"
        const secondPart = name.substring(splitIndex); // "phosphate"
        // Capitalize first letter of second part if it's lowercase
        const capitalizedSecondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
        return firstPart + ' ' + capitalizedSecondPart;
      }
      // For other hyphenated names, split at the last hyphen
      const lastHyphenIndex = name.lastIndexOf('-');
      if (lastHyphenIndex > 0 && lastHyphenIndex < name.length - 1) {
        return name.substring(0, lastHyphenIndex + 1) + ' ' + name.substring(lastHyphenIndex + 1);
      }
      return name;
    };
    
    // Add compound name label (positioned relative to circle bottom)
    // Circle radius is 30px, so bottom edge is at y = 30 (relative to node center at 0,0)
    // Position text consistently 12px below the bottom edge of circle
    // Total distance from node center: 30 (radius) + 12 (gap) = 42px
    // ALL labels must use y=42 with dominant-baseline='hanging' for consistency
    const labels = nodes.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', 0) // Center horizontally
      .attr('fill', '#2c5f7c')
      .attr('font-size', '16px')
      .attr('font-weight', '500')
      .text(d => {
        // Split compound names at hyphens for better line breaks
        return splitCompoundName(d.substrate.name);
      });
    
    // Apply text wrapping to ALL labels (even single-word ones)
    // This ensures all labels use tspans with consistent y=42 positioning
    labels.each(function() {
      const textEl = d3.select(this);
      const originalText = textEl.text();
      
      // Always call wrapText to ensure consistent tspan creation
      // Limit text width to 120px to force wrapping for long names
      textEl.call(MetabolismViewer.prototype.wrapText, 120);
      
      // Verify first tspan has y=42 and dominant-baseline='hanging'
      // Don't override subsequent lines - they use absolute positioning
      const firstTspan = textEl.select('tspan:first-child');
      if (!firstTspan.empty()) {
        firstTspan.attr('y', 42);
        firstTspan.attr('dominant-baseline', 'hanging');
      }
      
      // Ensure all tspans have dominant-baseline='hanging' for consistency
      textEl.selectAll('tspan').attr('dominant-baseline', 'hanging');
      
      // Remove y attribute from text element (tspans handle all positioning)
      textEl.attr('y', null);
    });
  }
  
  wrapText(text, width) {
    text.each(function() {
      const textEl = d3.select(this);
      // Split by spaces and hyphens to handle compound names better
      // For names like "Dihydroxyacetone phosphate", split at space
      // For names like "Glyceraldehyde-3-phosphate", also consider hyphen breaks
      const originalText = textEl.text();
      // First split by spaces, then handle hyphenated words
      const words = originalText.split(/\s+/);
      let line = [];
      let lineNumber = 0;
      const fontSize = 16; // Font size in pixels
      const lineSpacing = 16; // Tight spacing (16px = font size) to show wrapped lines are part of continuous name
      const x = textEl.attr('x') || '0';
      // Always use y=42 for consistency (30 circle radius + 12px gap)
      const baseY = 42;
      
      // Clear existing text
      textEl.text(null);
      let tspan = null;
      
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        line.push(word);
        
        if (!tspan) {
          // Create first tspan only when we have content
          // ALL labels use y=42 with hanging baseline for consistent positioning
          tspan = textEl.append('tspan')
            .attr('x', x)
            .attr('y', baseY)
            .attr('dominant-baseline', 'hanging');
        }
        
        // Test if current line exceeds width
        tspan.text(line.join(' '));
        if (tspan.node().getComputedTextLength() > width) {
          // If it's the first word and it's too long, keep it on first line
          if (line.length === 1) {
            // Single word is too long - keep it on first line anyway
            continue;
          } else {
            // Remove last word and put it on next line
            line.pop();
            tspan.text(line.join(' '));
            
            // Create new tspan for next line
            lineNumber++;
            const lineY = baseY + (lineNumber * lineSpacing);
            tspan = textEl.append('tspan')
              .attr('x', x)
              .attr('y', lineY)
              .attr('dominant-baseline', 'hanging')
              .text(word);
            
            // Reset line array for next iteration
            line = [word];
          }
        }
      }
      
      // Remove any empty tspans that might have been created
      textEl.selectAll('tspan').each(function() {
        const tspanEl = d3.select(this);
        if (!tspanEl.text() || tspanEl.text().trim() === '') {
          tspanEl.remove();
        }
      });
    });
  }
  
  handleZoom(event) {
    this.g.attr('transform', event.transform);
    this.currentTransform = event.transform;
    this.currentZoom = event.transform.k;
    
    // Update node display based on zoom level
    this.updateNodeDisplay(event.transform.k);
    
    // Update cursor style
    if (event.transform.k === 1) {
      this.svg.style('cursor', 'grab');
    } else {
      this.svg.style('cursor', 'grab');
    }
  }
  
  updateNodeDisplay(zoomLevel) {
    const zoomThreshold = 1.5; // Show images when zoomed in beyond this threshold
    const nodeRadius = zoomLevel >= zoomThreshold ? 55 : 30; // Larger radius when showing images
    
    // Update arrow connections to avoid overlap
    this.updateArrowConnections(zoomLevel, nodeRadius);
    
    this.reactionGroups.each(function(d) {
      const nodeGroup = d3.select(this);
      const circle = nodeGroup.select('.reaction-circle');
      const stepText = nodeGroup.select('.step-number');
      const imageGroup = nodeGroup.select('.molecule-image-group');
      const bgRect = imageGroup.select('.molecule-image-bg');
      
      if (zoomLevel >= zoomThreshold) {
        // Show image, hide circle and step number
        circle.style('display', 'none');
        stepText.style('display', 'none');
        
        // Show image if it exists
        if (!imageGroup.empty()) {
          imageGroup.style('display', 'block');
        }
      } else {
        // Show circle and step number, hide image
        circle.style('display', 'block');
        stepText.style('display', 'block');
        if (!imageGroup.empty()) {
          imageGroup.style('display', 'none');
        }
      }
    });
    
    // Reapply highlighting after view change
    if (this.selectedReaction) {
      this.applyReactionHighlight(this.selectedReaction);
    }
    if (this.selectedMolecule && this.selectedNode) {
      this.applyMoleculeHighlight(this.selectedMolecule, this.selectedNode);
    }
  }
  
  updateArrowConnections(zoomLevel, nodeRadius) {
    const zoomThreshold = 1.5;
    const radius = zoomLevel >= zoomThreshold ? nodeRadius : 30;
    
    // Update regular connections based on zoom level
    this.g.selectAll('.connection').each(function(d) {
      const line = d3.select(this);
      const connectionType = line.attr('data-connection-type');
      
      // Check if this is a regular connection (has current/next data and no special type)
      if (d && d.current && d.next && !connectionType) {
        const currentX = d.current.position.x;
        const currentY = d.current.position.y;
        const nextX = d.next.position.x;
        const nextY = d.next.position.y;
        
        // Calculate angle between nodes
        const dx = nextX - currentX;
        const dy = nextY - currentY;
        const angle = Math.atan2(dy, dx);
        
        // Position arrows at correct angle from node edges
        line.attr('x1', currentX + radius * Math.cos(angle));
        line.attr('y1', currentY + radius * Math.sin(angle));
        line.attr('x2', nextX - radius * Math.cos(angle));
        line.attr('y2', nextY - radius * Math.sin(angle));
      }
      // Handle special connections by type
      else if (connectionType) {
        switch (connectionType) {
          case 'step4-to-5':
            // Vertical connection from step 4 to step 5
            line.attr('x1', 550)
              .attr('y1', 100 + radius)
              .attr('x2', 550)
              .attr('y2', 250 - radius); // Updated for increased distance from node 4
            break;
          
          case 'step5-to-6':
            // Diagonal from step 5 to step 6
            line.attr('x1', 550 + radius)
              .attr('y1', 250) // Updated for increased distance from node 4
              .attr('x2', 700 - radius)
              .attr('y2', 100);
            break;
          
          case 'step4-to-6':
            // Diagonal dashed from step 4 to step 6
            line.attr('x1', 550 + radius)
              .attr('y1', 100)
              .attr('x2', 700 - radius)
              .attr('y2', 100);
            break;
          
          case 'glycolysis-to-pyruvate':
            // Horizontal from glycolysis end to pyruvate oxidation
            line.attr('x1', 1300 + radius)
              .attr('y1', 100)
              .attr('x2', 1450 - radius)
              .attr('y2', 100);
            break;
          
          case 'pyruvate-to-cac':
            // Diagonal from pyruvate oxidation end to citrate
            const pyruvateOxEndX = 1900;
            const pyruvateOxEndY = 100;
            const citrateX = 2050;
            const citrateY = 200; // Updated to scaled 1.5x position
            const angle = Math.atan2(citrateY - pyruvateOxEndY, citrateX - pyruvateOxEndX);
            line.attr('x1', pyruvateOxEndX + radius * Math.cos(angle))
              .attr('y1', pyruvateOxEndY + radius * Math.sin(angle))
              .attr('x2', citrateX - radius * Math.cos(angle))
              .attr('y2', citrateY - radius * Math.sin(angle));
            break;
          
          case 'cac-cycle':
            // Citric Acid Cycle loop (from malate to citrate)
            const malateX = 1891; // Updated to scaled 1.5x position
            const malateY = 266; // Updated to scaled 1.5x position
            const cycleCitrateX = 2050;
            const cycleCitrateY = 200; // Updated to scaled 1.5x position
            const cycleAngle = Math.atan2(cycleCitrateY - malateY, cycleCitrateX - malateX);
            line.attr('x1', malateX + radius * Math.cos(cycleAngle))
              .attr('y1', malateY + radius * Math.sin(cycleAngle))
              .attr('x2', cycleCitrateX - radius * Math.cos(cycleAngle))
              .attr('y2', cycleCitrateY - radius * Math.sin(cycleAngle));
            break;
        }
      }
    });
  }
  
  handleScroll(event) {
    // Get scroll delta (negative for scroll up/left, positive for scroll down/right)
    const deltaY = event.deltaY;
    const deltaX = event.deltaX;
    
    // Pan in both directions: REVERSED - scroll up/left moves view down/right
    // scroll down/right moves view up/left
    const panSpeed = 0.5; // Adjust this to control scroll sensitivity
    const newX = this.currentTransform.x - deltaX * panSpeed; // Reversed: negative deltaX
    const newY = this.currentTransform.y - deltaY * panSpeed; // Reversed: negative deltaY
    
    // Create new transform with same scale, but updated x and y
    const newTransform = d3.zoomIdentity
      .translate(newX, newY)
      .scale(this.currentTransform.k);
    
    // Apply the transform
    this.currentTransform = newTransform;
    this.currentZoom = newTransform.k;
    this.g.attr('transform', newTransform);
    
    // Update node display based on zoom level
    this.updateNodeDisplay(newTransform.k);
    
    // Update the zoom behavior's transform internally
    this.svg.call(this.zoom.transform, newTransform);
  }
  
  setupInteractions() {
    // Click on reaction node - show molecule info
    this.reactionGroups.select('.reaction-node')
      .on('click', (event, d) => {
        event.stopPropagation();
        // Show the substrate molecule when clicking node, and pass the reaction node for highlighting
        this.selectMolecule(d.substrate, d);
      })
      .on('dblclick', (event, d) => {
        event.stopPropagation();
        this.zoomToReaction(d);
      });
    
    // Prevent text selection during drag
    this.svg.on('mousedown', () => {
      this.svg.style('cursor', 'grabbing');
    });
    
    this.svg.on('mouseup', () => {
      this.svg.style('cursor', 'grab');
    });
    
    // Prevent detail window from showing when clicking background (SVG or g element)
    // Add a transparent background rectangle to catch clicks on empty space
    // This must be added AFTER all other elements so it's in the correct z-order
    // We'll add it at the end of init() instead
  }
  
  clearAllSelections() {
    this.selectedReaction = null;
    this.selectedMolecule = null;
    this.selectedNode = null;
    this.selectedPathway = null;
    
    // Reset all highlights
    this.reactionGroups.selectAll('.reaction-circle')
      .attr('stroke-width', 2)
      .attr('stroke', '#2c5f7c')
      .attr('fill', '#5fa8d3');
    
    this.reactionGroups.selectAll('.molecule-image-bg')
      .attr('stroke', '#dee2e6')
      .attr('stroke-width', 2)
      .attr('fill', 'white');
    
    // Reset pathway button highlighting
    this.pathways.forEach(pathway => {
      if (pathway.button) {
        pathway.button.select('rect')
          .attr('fill', '#667eea')
          .attr('stroke-width', 2);
      }
    });
    
    // Dispatch clear event to hide detail views
    const clearEvent = new CustomEvent('clear-selection');
    this.container.dispatchEvent(clearEvent);
  }
  
  selectReaction(reaction) {
    this.selectedReaction = reaction;
    this.selectedMolecule = null;
    this.selectedNode = null;
    this.selectedPathway = null;
    
    // Reset pathway button highlighting
    this.pathways.forEach(pathway => {
      if (pathway.button) {
        pathway.button.select('rect')
          .attr('fill', '#667eea')
          .attr('stroke-width', 2);
      }
    });
    
    this.applyReactionHighlight(reaction);
    
    // Dispatch custom event for reaction detail view
    const detailEvent = new CustomEvent('reaction-selected', {
      detail: reaction
    });
    this.container.dispatchEvent(detailEvent);
  }
  
  applyReactionHighlight(reaction) {
    // Remove previous selection - reset all nodes and arrows to original style
    this.reactionGroups.selectAll('.reaction-circle')
      .attr('stroke-width', 2)
      .attr('stroke', '#2c5f7c')
      .attr('fill', '#5fa8d3');
    
    // Reset image backgrounds
    this.reactionGroups.selectAll('.molecule-image-bg')
      .attr('stroke', '#dee2e6')
      .attr('stroke-width', 2)
      .attr('fill', 'white');
    
    this.g.selectAll('.connection')
      .attr('stroke-width', 4)
      .attr('stroke-opacity', 0.7);
    
    // Highlight nodes involved in this reaction
    const reactionGroup = this.reactionGroups.filter(d => d === reaction);
    
    // Highlight circle (if visible)
    reactionGroup.select('.reaction-circle')
      .attr('stroke-width', 4)
      .attr('stroke', '#ff6b6b')
      .attr('fill', '#ff8787');
    
    // Highlight image background (if visible)
    reactionGroup.select('.molecule-image-bg')
      .attr('stroke', '#ff6b6b')
      .attr('stroke-width', 4)
      .attr('fill', '#fff5f5');
    
    // Also highlight the previous reaction node (substrate source)
    const prevIndex = this.reactions.indexOf(reaction) - 1;
    if (prevIndex >= 0) {
      const prevReaction = this.reactions[prevIndex];
      const prevGroup = this.reactionGroups.filter(d => d === prevReaction);
      
      prevGroup.select('.reaction-circle')
        .attr('stroke-width', 4)
        .attr('stroke', '#ff6b6b')
        .attr('fill', '#ff8787');
      
      prevGroup.select('.molecule-image-bg')
        .attr('stroke', '#ff6b6b')
        .attr('stroke-width', 4)
        .attr('fill', '#fff5f5');
    }
  }
  
  selectMolecule(molecule, reactionNode) {
    this.selectedMolecule = molecule;
    this.selectedNode = reactionNode;
    this.selectedReaction = null;
    this.selectedPathway = null;
    
    // Reset pathway button highlighting
    this.pathways.forEach(pathway => {
      if (pathway.button) {
        pathway.button.select('rect')
          .attr('fill', '#667eea')
          .attr('stroke-width', 2);
      }
    });
    
    this.applyMoleculeHighlight(molecule, reactionNode);
    
    // Dispatch custom event for molecule detail view
    const detailEvent = new CustomEvent('molecule-selected', {
      detail: molecule
    });
    this.container.dispatchEvent(detailEvent);
  }
  
  applyMoleculeHighlight(molecule, reactionNode) {
    // Remove previous selection - reset all nodes to original style
    this.reactionGroups.selectAll('.reaction-circle')
      .attr('stroke-width', 2)
      .attr('stroke', '#2c5f7c')
      .attr('fill', '#5fa8d3');
    
    // Reset image backgrounds
    this.reactionGroups.selectAll('.molecule-image-bg')
      .attr('stroke', '#dee2e6')
      .attr('stroke-width', 2)
      .attr('fill', 'white');
    
    // Highlight only the clicked node in teal/cyan
    const selectedGroup = this.reactionGroups.filter(d => d === reactionNode);
    
    // Highlight circle (if visible)
    selectedGroup.select('.reaction-circle')
      .attr('stroke-width', 4)
      .attr('stroke', '#4ecdc4')
      .attr('fill', '#6ee7e7');
    
    // Highlight image background (if visible)
    selectedGroup.select('.molecule-image-bg')
      .attr('stroke', '#4ecdc4')
      .attr('stroke-width', 4)
      .attr('fill', '#f0fdfa');
  }
  
  zoomToReaction(reaction) {
    const scale = 2;
    const x = this.options.width / 2 - reaction.position.x * scale;
    const y = this.options.height / 2 - reaction.position.y * scale;
    
    const transform = d3.zoomIdentity
      .translate(x, y)
      .scale(scale);
    
    this.svg.transition()
      .duration(750)
      .call(this.zoom.transform, transform);
    
    this.currentTransform = transform;
    this.currentZoom = scale;
    this.updateNodeDisplay(scale);
    this.selectReaction(reaction);
  }
  
  resetZoom() {
    this.svg.transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity);
    this.currentTransform = d3.zoomIdentity;
    this.currentZoom = 1;
    this.updateNodeDisplay(1);
  }
  
  async fetchMoleculeImages() {
    // Fetch PubChem data for all substrates to get image URLs
    const uniqueMolecules = new Map();
    
    this.reactions.forEach(reaction => {
      const molecule = reaction.substrate;
      if (molecule && !uniqueMolecules.has(molecule.id)) {
        uniqueMolecules.set(molecule.id, molecule);
      }
    });
    
    // Fetch images for each unique molecule
    for (const [id, molecule] of uniqueMolecules) {
      try {
        const alternativeNames = this.getAlternativeNames(molecule.name);
        const pubchemData = await fetchCompoundWithFallback(molecule.name, alternativeNames);
        
        if (pubchemData.image2DUrlSmall) {
          this.moleculeImages.set(id, pubchemData.image2DUrlSmall);
          
          // Update all nodes that use this molecule
          this.reactionGroups.filter(d => d.substrate.id === id)
            .select('.molecule-structure-image')
            .attr('href', pubchemData.image2DUrlSmall);
        }
      } catch (error) {
        console.warn(`Failed to fetch image for ${molecule.name}:`, error);
      }
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
      '1,3-Bisphosphoglycerate': ['1,3-Bisphosphoglycerate', '1,3-BPG', '1,3-Diphosphoglycerate'],
      '3-Phosphoglycerate': ['3-Phosphoglycerate', '3PG', 'D-3-Phosphoglycerate'],
      '2-Phosphoglycerate': ['2-Phosphoglycerate', '2PG', 'D-2-Phosphoglycerate'],
      'Phosphoenolpyruvate': ['Phosphoenolpyruvate', 'PEP', 'Phosphoenolpyruvic acid'],
      'Pyruvate': ['Pyruvic acid', 'Pyruvate', '2-Oxopropanoic acid'],
      // Citric Acid Cycle compounds
      'Succinate': ['Succinic acid', 'Succinate', 'Butanedioic acid', 'Ethylene succinic acid'],
      'Oxaloacetate': ['Oxaloacetic acid', 'Oxaloacetate', 'Oxalacetic acid'],
      'Citrate': ['Citric acid', 'Citrate', '2-Hydroxy-1,2,3-propanetricarboxylic acid'],
      'Isocitrate': ['Isocitric acid', 'Isocitrate'],
      'α-Ketoglutarate': ['alpha-Ketoglutarate', 'α-Ketoglutarate', '2-Oxoglutarate', '2-Oxoglutaric acid', 'Alpha-ketoglutarate'],
      'Succinyl-CoA': ['Succinyl coenzyme A', 'Succinyl-CoA', 'Succinyl CoA'],
      'Fumarate': ['Fumaric acid', 'Fumarate', 'trans-Butenedioic acid'],
      'Malate': ['Malic acid', 'Malate', 'Hydroxybutanedioic acid']
    };
    
    return alternatives[moleculeName] || [];
  }
}

