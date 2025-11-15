/**
 * Metabolism Viewer Component
 * 
 * Interactive zoomable/panable visualization of metabolic pathways
 */

import * as d3 from 'd3';
// New data format: separate nodes, reactions, and arrows
import { glycolysisNodes, glycolysisReactions, glycolysisArrows, glycolysisData } from '../data/glycolysis/glycolysis_index.js';
import { pyruvateOxidationNodes, pyruvateOxidationReactions, pyruvateOxidationArrows, pyruvateOxidationData } from '../data/pyruvateOxidation/pyruvateOxidation_index.js';
import { citricAcidCycleNodes, citricAcidCycleReactions, citricAcidCycleArrows, citricAcidCycleData } from '../data/citricAcidCycle/citricAcidCycle_index.js';
import { electronTransportChainNodes, electronTransportChainReactions, electronTransportChainArrows, electronTransportChainData } from '../data/electronTransportChain/electronTransportChain_index.js';
import { fetchPubChemData } from '../utils/pubchemHelpers.js';
import {
  calculateArrowCoords,
  calculateArrowMidpoint,
  findArrowData,
  getReactionByStep,
  getReactionByIndex,
  getProductNode
} from './ConnectionHelpers.js';
import {
  findMultiProductReactions,
  findPrimaryArrow,
  createSecondaryArrowFromMidpoint
} from './MultiProductHandler.js';

// Helper function to remove coefficients from molecule names
function removeCoefficients(moleculeName) {
  if (!moleculeName || typeof moleculeName !== 'string') return moleculeName;
  
  // Remove patterns like "1/2 ", "2 ", "3 ", etc. at the start
  // Also handle fractional coefficients like "1/2", "3/2", etc.
  return moleculeName.replace(/^(\d+\/\d+|\d+)\s+/, '').trim();
}

// Configuration object for pathway-specific and general settings
const PATHWAY_CONFIG = {
  // Pathway ID to display name mapping
  pathwayNames: {
    'glycolysis': 'Glycolysis',
    'pyruvate-oxidation': 'Pyruvate Oxidation',
    'citric-acid-cycle': 'Citric Acid Cycle (Krebs Cycle)',
    'electron-transport-chain': 'Electron Transport Chain'
  },
  
  // Pathway-specific behavior for by-molecule arrows
  pathwayBehavior: {
    'glycolysis': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (negative)
      useStandardShape: true
    },
    'pyruvate-oxidation': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: 1, // Below (after 180 flip)
      useStandardShape: false
    },
    'citric-acid-cycle': {
      rotationAngle: 0, // No base rotation (handled dynamically)
      offsetDirection: 1, // Below/outward (after 180 flip)
      useStandardShape: false,
      calculateOutwardDirection: true // Special handling for cycle
    },
    'electron-transport-chain': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    }
  },
  
  // Common by-molecules that don't have dedicated nodes
  commonByMolecules: ['ATP', 'ADP', 'NAD⁺', 'NADH', 'FAD', 'FADH₂', 'CO₂', 'CoA', 'Pi', 'H₂O', 'GDP', 'GTP'],
  
  // Node ID patterns for special node types
  nodeIdPatterns: {
    etcComplex: /^complex_/,
    etcCarriers: ['coenzyme_q', 'cytochrome_c']
  },
  
  // Special reaction/node handling
  specialReactions: {
    // Format: { reactionId, step, specialHandling }
    'rxn_pyruvate_3': { step: 14, type: 'multi-product' },
    'rxn_cac_1': { step: 15, type: 'cycle-start' }
  },
  
  // UI Colors
  colors: {
    primary: '#667eea',
    primaryHover: '#5568d3',
    primaryDark: '#4a5fb8',
    secondary: '#2c5f7c',
    highlight: '#ff6b6b',
    highlightHover: '#ff8787',
    reactant: '#4ecdc4',
    reactantFill: '#6ee7e7',
    product: '#ff6b6b',
    productFill: '#ff8787',
    byMoleculeArrow: '#8b9dc3',
    etcProtonArrow: '#ff6b6b',
    proteinComplex: '#d4a574',
    proteinComplexStroke: '#8b6f47',
    reactionCircle: '#5fa8d3',
    reactionCircleStroke: '#2c5f7c'
  },
  
  // Node sizes
  nodeSizes: {
    regular: { radius: 30, width: 60, height: 60 },
    mobileCarrier: { radius: 20, width: 40, height: 40 },
    proteinComplex: { radius: 40, width: 80, height: 60 }
  },
  
  // Arrow settings
  arrowSettings: {
    byMoleculeOffset: 70, // Distance from main arrow
    byMoleculeLength: 66, // Length of by-molecule arrows
    hitAreaWidth: 40, // Invisible hit area width
    midpointHitAreaWidth: 30, // Hit area for midpoint connections
    arrowheadSize: 12,
    strokeWidth: 4,
    strokeWidthHover: 6,
    strokeOpacity: 0.7,
    strokeOpacityHover: 1
  }
};

export class MetabolismViewer {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      width: options.width || 1400,
      height: options.height || 800,
      ...options
    };
    
    // Load nodes, reactions, and arrows from new data format
    // Combine all nodes (filter out hidden nodes for drawing, but keep all for nodeMap)
    const allNodesRaw = [
      ...glycolysisNodes,
      ...pyruvateOxidationNodes,
      ...citricAcidCycleNodes,
      ...electronTransportChainNodes
    ];
    
    // Filter out hidden nodes for drawing (but keep all in nodeMap for arrow lookups)
    this.nodes = allNodesRaw.filter(n => !n.hidden);
    
    // Combine all raw reactions (before processing)
    const rawReactions = [
      ...glycolysisReactions,
      ...pyruvateOxidationReactions,
      ...citricAcidCycleReactions,
      ...electronTransportChainReactions
    ];
    
    // Combine all arrows
    const allArrows = [
      ...glycolysisArrows,
      ...pyruvateOxidationArrows,
      ...citricAcidCycleArrows,
      ...electronTransportChainArrows
    ];
    
    // Create node ID to node mapping for quick lookup
    // Include ALL nodes (even hidden ones) for arrow lookups
    // This ensures arrows can find their source/target nodes even if they're hidden
    this.nodeMap = new Map();
    allNodesRaw.forEach(node => {
      this.nodeMap.set(node.id, node);
    });
    
    // Create reaction ID to reaction mapping (from raw reactions)
    this.reactionMap = new Map();
    rawReactions.forEach(reaction => {
      this.reactionMap.set(reaction.id, reaction);
      // Initialize arrowIds array for each reaction
      if (!reaction.arrowIds) {
        reaction.arrowIds = [];
      }
    });
    
    // Populate arrowMap with arrow data (keyed by arrow.id)
    this.arrowMap = new Map();
    allArrows.forEach(arrow => {
      this.arrowMap.set(arrow.id, arrow);
    });
    
    // NEW APPROACH: Draw ALL nodes from data files, then draw arrows separately
    // This is simpler and more direct - nodes and arrows are independent
    
    // Create reactions for ALL nodes from data files
    const allNodeReactions = this.nodes.map(node => {
      // Find arrows that involve this node to get reaction info
      const arrowsFromNode = allArrows.filter(a => a.from_id === node.id);
      const arrowsToNode = allArrows.filter(a => a.to_id === node.id);
      
      // Try to find a reaction associated with this node
      let reaction = null;
      if (node.reaction_id) {
        // Node has a reaction_id (like complexes)
        reaction = this.reactionMap.get(node.reaction_id);
      } else if (arrowsFromNode.length > 0) {
        // Node is a source - use the first arrow's reaction
        reaction = this.reactionMap.get(arrowsFromNode[0].reaction_id);
      } else if (arrowsToNode.length > 0) {
        // Node is a target - use the first arrow's reaction
        reaction = this.reactionMap.get(arrowsToNode[0].reaction_id);
      }
      
      // Determine substrate and product based on arrows
      let substrate = null;
      let product = null;
      
      if (arrowsFromNode.length > 0) {
        // Node is a source - it's the substrate
        const targetNode = arrowsFromNode[0].to_id ? this.nodeMap.get(arrowsFromNode[0].to_id) : null;
        substrate = { id: node.id, name: node.name, formula: node.formula, description: node.description, smiles: node.smiles };
        product = targetNode ? { id: targetNode.id, name: targetNode.name, formula: targetNode.formula, description: targetNode.description, smiles: targetNode.smiles } : null;
      } else if (arrowsToNode.length > 0) {
        // Node is a target - it's the product
        const sourceNode = arrowsToNode[0].from_id ? this.nodeMap.get(arrowsToNode[0].from_id) : null;
        substrate = sourceNode ? { id: sourceNode.id, name: sourceNode.name, formula: sourceNode.formula, description: sourceNode.description, smiles: sourceNode.smiles } : null;
        product = { id: node.id, name: node.name, formula: node.formula, description: node.description, smiles: node.smiles };
      } else {
        // No arrows - node is both substrate and product (for display)
        substrate = { id: node.id, name: node.name, formula: node.formula, description: node.description, smiles: node.smiles };
        product = { id: node.id, name: node.name, formula: node.formula, description: node.description, smiles: node.smiles };
      }
      
      // Collect arrow IDs for this node
      const arrowIds = [];
      arrowsFromNode.forEach(arrow => {
        if (!arrowIds.includes(arrow.id)) arrowIds.push(arrow.id);
      });
      arrowsToNode.forEach(arrow => {
        if (!arrowIds.includes(arrow.id)) arrowIds.push(arrow.id);
      });
      
      // Determine the reaction ID - prefer reaction.id from arrow's reaction_id
      // This ensures step numbers are assigned correctly
      let reactionId = `node_${node.id}`; // Default fallback
      if (node.reaction_id) {
        // Node has a reaction_id (like complexes)
        reactionId = node.reaction_id;
      } else if (reaction) {
        // Use the reaction.id from the arrow
        reactionId = reaction.id;
      } else if (arrowsFromNode.length > 0) {
        // Node is a source - use the first arrow's reaction_id
        reactionId = arrowsFromNode[0].reaction_id;
      } else if (arrowsToNode.length > 0) {
        // Node is a target - use the first arrow's reaction_id
        reactionId = arrowsToNode[0].reaction_id;
      }

      return {
        id: reactionId,
        name: reaction ? reaction.name : node.name,
        nodeId: node.id,
        position: node.position,
        node: node, // Preserve reference to node object (source of truth for node data)
        // Set node type flags from node data
        isProteinComplex: node.type === 'complex',
        isMobileCarrier: node.type === 'carrier',
        complexNumber: node.complexNumber,
        complexSize: node.complexSize,
        substrate: substrate,
        product: product,
        enzyme: reaction ? reaction.enzyme : null,
        conditions: reaction ? reaction.conditions : null,
        // Preserve by-molecule data from node (source of truth for by-molecule arrows)
        // Node data takes precedence over reaction data
        byreactant: node.byreactant !== undefined ? node.byreactant : (reaction ? reaction.byreactant : undefined),
        byproduct: node.byproduct !== undefined ? node.byproduct : (reaction ? reaction.byproduct : undefined),
        // Display-only by-molecules (shown in Substrate → Product section but no arrows drawn)
        // These come only from reaction data, not node data
        displayByreactant: reaction ? reaction.displayByreactant : undefined,
        displayByproduct: reaction ? reaction.displayByproduct : undefined,
        // Preserve by-molecule display properties from node or reaction
        byMoleculeAngle: node.byMoleculeAngle !== undefined ? node.byMoleculeAngle : (reaction ? reaction.byMoleculeAngle : undefined),
        hideByMoleculeLabels: node.hideByMoleculeLabels !== undefined ? node.hideByMoleculeLabels : (reaction ? reaction.hideByMoleculeLabels : undefined),
        hideByreactantLabels: node.hideByreactantLabels !== undefined ? node.hideByreactantLabels : (reaction ? reaction.hideByreactantLabels : undefined),
        hideByproductLabels: node.hideByproductLabels !== undefined ? node.hideByproductLabels : (reaction ? reaction.hideByproductLabels : undefined),
        // Preserve etcSubArrows for ETC complexes (needed for drawing H+ arrows)
        etcSubArrows: reaction ? reaction.etcSubArrows : undefined,
        arrowIds: arrowIds,
        // Flag for source-only nodes (nodes that are sources but not targets)
        isSourceNode: arrowsFromNode.length > 0 && arrowsToNode.length === 0 && !node.reaction_id
      };
    });
    
    // Create a map for easy lookup (deduplicate by nodeId)
    const reactionMap = new Map();
    allNodeReactions.forEach(r => {
      if (r.nodeId) {
        reactionMap.set(r.nodeId, r);
      }
    });

    this.reactions = Array.from(reactionMap.values());
    
    // Sort reactions by position (y-coordinate, then x-coordinate) to ensure correct visual order
    // This ensures reactions are displayed in the correct sequence matching the pathway flow
    this.reactions.sort((a, b) => {
      if (!a.position || !b.position) return 0;
      // Sort by y-coordinate first (vertical position)
      if (a.position.y !== b.position.y) {
        return a.position.y - b.position.y;
      }
      // If y is the same, sort by x-coordinate (horizontal position)
      return a.position.x - b.position.x;
    });
    
    // Add step numbers for continuity
    // Use a Map to track step numbers by reaction_id to avoid duplicates
    // When a reaction has multiple products, all entries share the same step number
    const stepMap = new Map();
    let stepCounter = 1;
    
    // First, assign step numbers based on reaction_id order from raw reactions
    // This ensures each unique reaction_id gets a unique step number
    rawReactions.forEach(rawReaction => {
      if (!rawReaction.step) { // Only assign if not already set
        stepMap.set(rawReaction.id, stepCounter++);
      } else {
        stepMap.set(rawReaction.id, rawReaction.step);
      }
    });
    
    // Now assign step numbers to all reactions based on their reaction_id
    this.reactions.forEach(reaction => {
      // Skip product nodes, but include source nodes (they should have step numbers too)
      if (!reaction.isProductNode) {
        const stepNumber = stepMap.get(reaction.id);
        if (stepNumber) {
          reaction.step = stepNumber;
        } else {
          // Fallback: assign sequential number if reaction_id not found
          // This handles nodes that don't have a corresponding raw reaction
          reaction.step = stepCounter++;
        }
      }
    });
    
    // Product node offset (for pyruvate oxidation - Acetyl-CoA and Lipoamide are hidden)
    this.productNodeOffset = 0; // No longer needed with new format
    
    // Create arrow data dictionary: key = "fromNodeId-toNodeId", value = arrow data
    this.arrowDataMap = new Map();
    
    // Define pathway groups using new data format
    const glycolysisReactionCount = glycolysisReactions.length;
    const pyruvateOxidationReactionCount = pyruvateOxidationReactions.length;
    const citricAcidCycleReactionCount = citricAcidCycleReactions.length;
    const electronTransportChainReactionCount = electronTransportChainReactions.length;
    
    this.pathways = [
      {
        id: 'glycolysis',
        name: 'Glycolysis',
        reactions: glycolysisReactions,
        nodes: glycolysisNodes,
        summary: glycolysisData.summary,
        startIndex: 0,
        endIndex: glycolysisReactionCount
      },
      {
        id: 'pyruvate-oxidation',
        name: 'Pyruvate Oxidation',
        reactions: pyruvateOxidationReactions,
        nodes: pyruvateOxidationNodes,
        summary: pyruvateOxidationData.summary,
        startIndex: glycolysisReactionCount,
        endIndex: glycolysisReactionCount + pyruvateOxidationReactionCount
      },
      {
        id: 'citric-acid-cycle',
        name: 'Citric Acid Cycle',
        reactions: citricAcidCycleReactions,
        nodes: citricAcidCycleNodes,
        summary: citricAcidCycleData.summary,
        startIndex: glycolysisReactionCount + pyruvateOxidationReactionCount,
        endIndex: glycolysisReactionCount + pyruvateOxidationReactionCount + citricAcidCycleReactionCount
      },
      {
        id: 'electron-transport-chain',
        name: 'Electron Transport Chain',
        reactions: electronTransportChainReactions,
        nodes: electronTransportChainNodes,
        summary: electronTransportChainData.summary,
        startIndex: glycolysisReactionCount + pyruvateOxidationReactionCount + citricAcidCycleReactionCount,
        endIndex: glycolysisReactionCount + pyruvateOxidationReactionCount + citricAcidCycleReactionCount + electronTransportChainReactionCount
      }
    ];
    
    this.selectedNode = null;
    this.selectedMolecule = null;
    this.selectedReaction = null;
    this.selectedPathway = null;
    this.currentZoom = 1;
    this.moleculeImages = new Map(); // Cache for molecule 2D images (id -> imageUrl)
    this.pubchemDataCache = new Map(); // Cache for PubChem data (moleculeName -> pubchemData)
    
    // Helper to get computed style (cached for performance)
    this.getComputedStyle = () => window.getComputedStyle(document.documentElement);
    
    // Helper to get image background color based on theme
    this.getImageBgColor = () => {
      const computedStyle = this.getComputedStyle();
      return computedStyle.getPropertyValue('--bg-image').trim() || 
             computedStyle.getPropertyValue('--bg-panel').trim() || 
             'white';
    };
    
    // Helper to get highlighted image background color based on theme
    this.getHighlightImageBgColor = () => {
      const computedStyle = this.getComputedStyle();
      return computedStyle.getPropertyValue('--highlight-image-bg').trim() || 
             this.getImageBgColor();
    };
    
    this.init();
  }
  
  init() {
    if (!this.container) {
      console.error('Container is null or undefined')
      return
    }
    
    // Get actual container dimensions (container uses CSS flexbox sizing)
    const containerRect = this.container.getBoundingClientRect();
    const containerWidth = containerRect.width || this.options.width || 800;
    const containerHeight = containerRect.height || this.options.height || 600;
    
    // Update options with actual container dimensions
    this.options.width = containerWidth;
    this.options.height = containerHeight;
    
    // Clear container first
    d3.select(this.container).selectAll('*').remove()
    
    // Calculate required dimensions based on all pathways
    // Filter out reactions with null positions
    const reactionsWithPositions = this.reactions.filter(r => r.position && r.position.x != null && r.position.y != null);
    
    let maxX, maxY, minX, minY;
    if (reactionsWithPositions.length === 0) {
      console.warn('No reactions with valid positions found');
      // Fallback to default dimensions
      maxX = 1400;
      maxY = 800;
      minX = 0;
      minY = 0;
    } else {
      maxX = Math.max(...reactionsWithPositions.map(r => r.position.x)) + 100;
      maxY = Math.max(...reactionsWithPositions.map(r => r.position.y)) + 100;
      minX = Math.min(...reactionsWithPositions.map(r => r.position.x)) - 100;
      minY = Math.min(...reactionsWithPositions.map(r => r.position.y)) - 100;
    }
    
    // Create SVG container
    // Width and height attributes use container dimensions (window-based)
    // No viewBox - SVG will scale naturally with container
    // Get initial background color from CSS variable
    const getInitialBgColor = () => {
      const computedStyle = window.getComputedStyle(document.documentElement);
      return computedStyle.getPropertyValue('--bg-tertiary').trim() || '#fafafa';
    };
    
    const bgColor = getInitialBgColor();
    
    this.svg = d3.select(this.container)
      .append('svg')
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .attr('class', 'metabolism-viewer')
      .style('background', bgColor); // Keep dynamic background color in JS
    
    // Update SVG background and image backgrounds when theme changes
    const updateSVGBackground = () => {
      const computedStyle = window.getComputedStyle(document.documentElement);
      const newBgColor = computedStyle.getPropertyValue('--bg-tertiary').trim() || '#fafafa';
      if (this.svg) {
        this.svg.style('background', newBgColor);
      }
      // Update all molecule image backgrounds
      const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
      if (this.reactionGroups) {
        const imageBgColor = this.getImageBgColor();
        this.reactionGroups.selectAll('.molecule-image-bg')
          .attr('fill', imageBgColor)
          .attr('stroke', isDarkMode ? '#000000' : '#dee2e6');
        
        // Filter is now handled by CSS based on data-theme attribute
      }
      
      // Update all rect elements that should be black in dark mode
      if (this.svg && isDarkMode) {
        // Update all rects except buttons, tooltips, and transparent ones
        this.svg.selectAll('rect')
          .filter(function() {
            const fill = d3.select(this).attr('fill');
            const className = d3.select(this).attr('class') || '';
            // Keep buttons, tooltips, and transparent rects as they are
            return fill !== 'transparent' && 
                   fill !== '#667eea' && 
                   fill !== '#2c5f7c' && 
                   fill !== '#5568d3' &&
                   !className.includes('button') &&
                   !className.includes('tooltip');
          })
          .attr('fill', '#000000');
        
        // Ensure molecule-image-group backgrounds are black
        this.svg.selectAll('g.molecule-image-group')
          .style('background-color', '#000000');
      } else if (this.svg && !isDarkMode) {
        // Reset to white in light mode
        this.svg.selectAll('g.molecule-image-group')
          .style('background-color', '#ffffff');
      }
      
      // Label colors are now handled by CSS variables, no need to update here
    };
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      updateSVGBackground();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    // Store observer for cleanup if needed
    this.themeObserver = observer;
    
    // Create zoom behavior (for dragging/panning)
    this.zoom = d3.zoom()
      .scaleExtent([0.1, 5])
      .on('zoom', (event) => this.handleZoom(event));
    
    // Filter zoom events: allow drag, touch, and wheel with Ctrl/Cmd
    // Block double-click and prevent clicks from triggering zoom
    this.zoom.filter(function(event) {
      // Block double-click zoom
      if (event.type === 'dblclick') {
        return false;
      }
      // Block wheel without modifiers (we'll handle that as pan)
      if (event.type === 'wheel') {
        return event.ctrlKey || event.metaKey;
      }
      // Allow all other events (mousedown, mousemove, touch) for dragging/panning
      return true;
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
    // Use the reactionsWithPositions we already filtered earlier
    this.reactionGroups = this.g.selectAll('.reaction-group')
      .data(reactionsWithPositions)
      .enter()
      .append('g')
      .attr('class', 'reaction-group')
      .attr('transform', d => `translate(${d.position.x}, ${d.position.y})`);
    
    // Store filtered reactions for use in other methods
    this.reactionsWithPositions = reactionsWithPositions;
    
    // Draw connections between reactions
    this.drawConnections();
    
    // Draw H+ arrows first (behind complexes) - will be moved behind nodes after drawing
    this.drawETCSubArrows();
    
    // Draw reaction nodes
    this.drawReactions();
    
    // Move H+ arrows behind reaction nodes
    if (this.g.select('.etc-sub-arrows').node()) {
      this.g.select('.etc-sub-arrows').lower();
    }
    
    // Draw pathway buttons (in zoomable group)
    this.drawPathwayButtons();
    
    // Add help button in upper right (in fixed overlay)
    this.drawHelpButton();
    
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
      .attr('fill', 'transparent');
    
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
        
        // Store old dimensions before updating
        const oldWidth = this.options.width;
        const oldHeight = this.options.height;

        if (newWidth > 0 && newHeight > 0 && 
          (newWidth !== oldWidth || newHeight !== oldHeight)) {
          this.options.width = newWidth;
          this.options.height = newHeight;
          
          // Update SVG width and height attributes to match container size (window-based)
          if (this.svg) {
            this.svg
              .attr('width', newWidth)
              .attr('height', newHeight);
            
            // Keep the same zoom transform - no need to adjust it
            // The zoom transform is relative to the SVG, so it will work correctly
            // with the new dimensions without any adjustment
          }
          
          // Update help button position relative to theme toggle button
          // Theme toggle: right: 20px, top: 20px, width: 50px, height: 50px (fixed to viewport)
          if (this.overlay) {
            const helpButton = this.overlay.select('.help-button');
            if (!helpButton.empty()) {
              // Calculate position relative to theme toggle using viewport width (not container width)
              const viewportWidth = window.innerWidth;
              const themeToggleRight = 20; // Theme toggle right margin
              const themeToggleWidth = 50; // Theme toggle width
              const helpButtonRadius = 15; // Help button radius
              const spacing = 15; // Spacing between buttons
              
              // Position help button to the left of theme toggle with spacing
              const buttonX = viewportWidth - themeToggleRight - themeToggleWidth - spacing - helpButtonRadius;
              const buttonY = 20 + 25; // Align with center of theme toggle button
              helpButton.attr('transform', `translate(${buttonX}, ${buttonY})`);
              
              // Also update tooltip position to avoid going off right edge
              const tooltipGroup = helpButton.select('.help-tooltip');
              if (!tooltipGroup.empty()) {
                const tooltipWidth = 450;
                const tooltipX = -tooltipWidth / 2;
                // Use viewport width since button is positioned relative to viewport
                const maxRight = viewportWidth - 20;
                const tooltipRightEdge = buttonX + tooltipX + tooltipWidth;
                const adjustedX = tooltipRightEdge > maxRight ? tooltipX - (tooltipRightEdge - maxRight) : tooltipX;
                tooltipGroup.attr('transform', `translate(${adjustedX}, 25)`);
              }
            }
          }
        }
      }, 100); // 100ms debounce
    };
    
    // Listen to window resize events
    window.addEventListener('resize', this.handleResize);
    
    // Also listen to visualViewport changes (better for DevTools detection)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', this.handleResize);
      window.visualViewport.addEventListener('scroll', this.handleResize);
    }
    
    // Also watch for container size changes (e.g., when detail panel appears/disappears)
    // Use ResizeObserver if available, otherwise fall back to periodic checks
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.handleResize();
      });
      this.resizeObserver.observe(this.container);
      
      // Also observe the parent element and document body for better DevTools detection
      const parentElement = this.container.parentElement;
      if (parentElement) {
        this.resizeObserver.observe(parentElement);
      }
      if (document.body) {
        this.resizeObserver.observe(document.body);
      }
    }
    
    // Trigger initial resize check to ensure correct dimensions
    // This handles cases where the container size changes after initialization
    setTimeout(() => {
      this.handleResize();
    }, 100);
    
    // Also add a periodic check as a fallback (especially useful for DevTools)
    this.resizeCheckInterval = setInterval(() => {
      const containerRect = this.container.getBoundingClientRect();
      const currentWidth = containerRect.width || window.innerWidth;
      const currentHeight = containerRect.height || window.innerHeight;
      
      if (currentWidth !== this.options.width || currentHeight !== this.options.height) {
        this.handleResize();
      }
    }, 500); // Check every 500ms as fallback
  }
  
  destroy() {
    // Clean up resize listener
    if (this.handleResize) {
      window.removeEventListener('resize', this.handleResize);
    }
    // Clean up visualViewport listeners
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', this.handleResize);
      window.visualViewport.removeEventListener('scroll', this.handleResize);
    }
    // Clean up ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    // Clean up periodic resize check interval
    if (this.resizeCheckInterval) {
      clearInterval(this.resizeCheckInterval);
      this.resizeCheckInterval = null;
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
    // Position button relative to theme toggle button
    // Theme toggle: right: 20px, top: 20px, width: 50px, height: 50px (fixed to viewport)
    // Help button: radius 15px (30px total width)
    // Calculate position relative to theme toggle using viewport width (not container width)
    const viewportWidth = window.innerWidth;
    const themeToggleRight = 20; // Theme toggle right margin
    const themeToggleWidth = 50; // Theme toggle width
    const helpButtonRadius = 15; // Help button radius
    const spacing = 15; // Spacing between buttons
    
    // Position help button to the left of theme toggle with spacing
    // X: viewport width - theme toggle right - theme toggle width - spacing - help button radius
    const buttonX = viewportWidth - themeToggleRight - themeToggleWidth - spacing - helpButtonRadius;
    // Y: Align vertically with theme toggle (top: 20px + half height: 25px = 45px)
    const buttonY = 20 + 25; // Align with center of theme toggle button
    
    const helpGroup = this.overlay.append('g')
      .attr('class', 'help-button btn')
      .attr('transform', `translate(${buttonX}, ${buttonY})`);
    
    // Button circle
    const circle = helpGroup.append('circle')
      .attr('r', 15)
      .attr('fill', PATHWAY_CONFIG.colors.primary)
      .attr('stroke', PATHWAY_CONFIG.colors.primaryHover)
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
    // Adjust if tooltip would go off right edge (use viewport width since button is positioned relative to viewport)
    const maxRight = viewportWidth - 20; // 20px margin from right edge
    const tooltipRightEdge = buttonX + tooltipX + tooltipWidth;
    const adjustedX = tooltipRightEdge > maxRight ? tooltipX - (tooltipRightEdge - maxRight) : tooltipX;
    
    const tooltipGroup = helpGroup.append('g')
      .attr('class', 'help-tooltip btn')
      .attr('transform', `translate(${adjustedX}, 25)`); // Position below button, adjusted for right edge
    
    const tooltipRect = tooltipGroup.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', tooltipWidth)
      .attr('height', 75) // Increased height for more lines
      .attr('rx', 6)
      .attr('fill', PATHWAY_CONFIG.colors.secondary)
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
        .attr('fill', PATHWAY_CONFIG.colors.primaryHover)
        .attr('stroke-width', 3);
    })
    .on('mouseleave', function() {
      d3.select(this).select('circle')
        .transition().duration(200)
        .attr('fill', PATHWAY_CONFIG.colors.primary)
        .attr('stroke-width', 2);
    });
  }
  
  drawPathwayButtons() {
    // Create a group for pathway buttons
    const buttonGroup = this.svg.append('g')
      .attr('class', 'pathway-buttons');
    
    // Position buttons at the top-left of the map
    const buttonY = 20; // Match top margin of theme toggle button
    const horizontalPadding = 16; // Consistent padding: 8px on each side
    const verticalPadding = 16; // Consistent padding: 8px on top and bottom
    const buttonHeight = 28; // Height accounting for vertical padding (8px top + text ~10px + 8px bottom)
    
    // Helper function to calculate button width based on text length
    // Uses a temporary text element to measure actual text width for accuracy
    const calculateButtonWidth = (text) => {
      // Create a temporary text element to measure actual width
      const tempText = this.svg.append('text')
        .attr('font-size', '10px')
        .attr('font-weight', '600')
        .text(text)
        .style('visibility', 'hidden');
      
      const textWidth = tempText.node().getBBox().width;
      tempText.remove();
      
      // Add consistent horizontal padding (8px on each side)
      return textWidth + horizontalPadding;
    };
    
    // Add "Show All" button first (replaces reset zoom)
    const showAllButton = buttonGroup.append('g')
      .attr('class', 'pathway-button btn')
      .attr('transform', `translate(${20}, ${buttonY})`);
    
    const showAllText = 'Show All';
    const showAllWidth = calculateButtonWidth(showAllText);
    
    showAllButton.append('rect')
      .attr('width', showAllWidth)
      .attr('height', buttonHeight)
      .attr('rx', 6)
      .attr('fill', PATHWAY_CONFIG.colors.primary)
      .attr('stroke', PATHWAY_CONFIG.colors.primaryHover)
      .attr('stroke-width', 2);
    
    showAllButton.append('text')
      .attr('x', showAllWidth / 2)
      .attr('y', buttonHeight / 2 + 3) // Vertically centered: half height + small baseline offset
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '10px')
      .attr('font-weight', '600')
      .text(showAllText);
    
    const viewer = this;
    showAllButton.on('mouseenter', function() {
      d3.select(this).select('rect')
        .attr('fill', PATHWAY_CONFIG.colors.primaryHover)
        .attr('stroke-width', 3);
    })
    .on('mouseleave', function() {
      d3.select(this).select('rect')
        .attr('fill', PATHWAY_CONFIG.colors.primary)
        .attr('stroke-width', 2);
    })
    .on('click', (event) => {
      event.stopPropagation();
      viewer.zoomToAllReactions();
    });
    
    // Add pathway buttons (shifted by one position)
    let currentX = 20 + showAllWidth + 15; // Start after "Show All" button with 15px gap
    this.pathways.forEach((pathway, index) => {
      const buttonWidth = calculateButtonWidth(pathway.name);
      
      const button = buttonGroup.append('g')
        .attr('class', 'pathway-button btn')
        .attr('transform', `translate(${currentX}, ${buttonY})`);
      
      // Button background
      button.append('rect')
        .attr('width', buttonWidth)
        .attr('height', buttonHeight)
        .attr('rx', 6)
        .attr('fill', PATHWAY_CONFIG.colors.primary)
        .attr('stroke', PATHWAY_CONFIG.colors.primaryHover)
        .attr('stroke-width', 2);
      
      // Button text
      button.append('text')
        .attr('x', buttonWidth / 2)
        .attr('y', buttonHeight / 2 + 3) // Vertically centered: half height + small baseline offset
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .attr('font-size', '10px')
        .attr('font-weight', '600')
        .text(pathway.name);
      
      // Update currentX for next button
      currentX += buttonWidth + 15; // 15px gap between buttons
      
      // Hover effects
      button.on('mouseenter', function() {
        d3.select(this).select('rect')
          .attr('fill', PATHWAY_CONFIG.colors.primaryHover)
          .attr('stroke-width', 3);
      })
      .on('mouseleave', function() {
        if (viewer.selectedPathway !== pathway.id) {
          d3.select(this).select('rect')
            .attr('fill', PATHWAY_CONFIG.colors.primary)
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
          .attr('fill', PATHWAY_CONFIG.colors.primary)
          .attr('stroke-width', 2);
      }
    }
    
    // Highlight selected pathway button
    if (pathway.button) {
      pathway.button.select('rect')
        .attr('fill', PATHWAY_CONFIG.colors.primaryDark)
        .attr('stroke-width', 3);
    }
    
    // Reset all node highlighting using unified function
    this.resetAllNodeHighlights();
    
    // Reset all arrow highlighting
    this.g.selectAll('.connection')
      .attr('stroke-width', 4)
      .attr('stroke-opacity', 0.7)
      .attr('stroke', '#2c5f7c');
    
    // Highlight all nodes from the pathway's data file
    // This ensures ALL nodes are highlighted, including final products like pyruvate and carriers
    const pathwayNodeIds = new Set();
    if (pathway.nodes) {
      // Use nodes from pathway data file - highlight ALL nodes, even if hidden
      // (we'll filter out hidden nodes when finding reactions, but include all in the set)
      pathway.nodes.forEach(n => pathwayNodeIds.add(n.id));
    } else {
      // Fallback: use reactions array indices (old method)
      const pathwayReactions = this.reactions.slice(pathway.startIndex, pathway.endIndex);
      pathwayReactions.forEach(reaction => {
        if (reaction.nodeId) {
          pathwayNodeIds.add(reaction.nodeId);
        }
      });
    }
    
    // Highlight all reactions that correspond to nodes from the pathway's data file
    // This includes all nodes from the pathway data file, even if they don't have reactions
    pathwayNodeIds.forEach(nodeId => {
      // Find the reaction that corresponds to this node ID
      const reaction = this.reactions.find(r => r.nodeId === nodeId);
      if (reaction) {
        // Filter reactionGroups to find the group for this reaction
        // Compare by nodeId to ensure we find the correct reaction
        const reactionGroup = this.reactionGroups.filter(d => d && d.nodeId === nodeId);
        if (!reactionGroup.empty()) {
          // Use 'product' color type for pathway highlighting (red color)
          this.applyNodeHighlightStyle(reactionGroup, 'product');
        }
      }
      // Note: If a node from the pathway data file doesn't have a reaction,
      // it means it's not being drawn (e.g., hidden node), so we skip it
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
    // Get all nodes from the pathway data file (same as highlighting logic)
    const pathwayNodeIds = new Set();
    if (pathway.nodes) {
      // Use nodes from pathway data file - include ALL nodes
      pathway.nodes.forEach(n => pathwayNodeIds.add(n.id));
    } else {
      // Fallback: use reactions array indices (old method)
      const pathwayReactions = this.reactions.slice(pathway.startIndex, pathway.endIndex);
      pathwayReactions.forEach(reaction => {
        if (reaction.nodeId) {
          pathwayNodeIds.add(reaction.nodeId);
        }
      });
    }
    
    // Find all reactions that correspond to nodes from the pathway's data file
    const pathwayReactions = [];
    pathwayNodeIds.forEach(nodeId => {
      const reaction = this.reactions.find(r => r.nodeId === nodeId);
      if (reaction && reaction.position) {
        pathwayReactions.push(reaction);
      }
    });
    
    if (pathwayReactions.length === 0) return;
    
    // Get current container dimensions (accounts for detail panel if visible)
    const containerRect = this.container.getBoundingClientRect();
    const containerWidth = containerRect.width || this.options.width;
    const containerHeight = containerRect.height || this.options.height;
    
    // Calculate bounding box for the pathway using all nodes from the pathway data file
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
          .attr('fill', PATHWAY_CONFIG.colors.primary)
          .attr('stroke-width', 2);
      }
      this.selectedPathway = null;
    }
    
    // Reset all node highlighting using unified function
    this.resetAllNodeHighlights();
    
    // Update current zoom level
    this.currentZoom = scale;
    this.updateNodeDisplay(scale);
  }
  
  drawConnections() {
    // Add arrow marker definition (normal size)
    const defs = this.svg.append('defs');
    defs.append('marker')
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
    
    // Add larger arrow marker for hover state
    defs.append('marker')
      .attr('id', 'arrowhead-hover')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 8)
      .attr('refY', 0)
      .attr('markerWidth', 10)
      .attr('markerHeight', 10)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#2c5f7c');
    
    // Add highlighted arrow marker (for selected reactions)
    defs.append('marker')
      .attr('id', 'arrowhead-highlighted')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 8)
      .attr('refY', 0)
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#ff6b6b');
    
    // Add arrow marker for ETC H+ arrows (normal size, red color)
    defs.append('marker')
      .attr('id', 'arrowhead-normal')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 8)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#ff6b6b');
    
    // Draw arrows from arrow data (new format)
    // Get all arrows from the combined arrow arrays
    const allArrows = [
      ...glycolysisArrows,
      ...pyruvateOxidationArrows,
      ...citricAcidCycleArrows,
      ...electronTransportChainArrows
    ];
    
    // Define pathway lengths for legacy code compatibility (if needed)
    const glycolysisLength = glycolysisReactions.length;
    const pyruvateOxidationLength = pyruvateOxidationReactions.length;
    const citricAcidCycleLength = citricAcidCycleReactions.length;
    const cacStartIndex = glycolysisLength + pyruvateOxidationLength;
    const etcStartIndex = glycolysisLength + pyruvateOxidationLength + citricAcidCycleLength;
    
    // Helper function to check if from_id or to_id refers to an arrow (midpoint connection)
    const getIdType = (id) => {
      if (!id) return null; // Return null if id is undefined or null
      if (id.startsWith('arrow_')) return 'arrow';
      return 'node';
    };
    
    // Separate arrows into node-to-node and midpoint connections
    const nodeToNodeArrows = allArrows.filter(arrow => {
      const fromType = getIdType(arrow.from_id);
      const toType = getIdType(arrow.to_id);
      // Both must be nodes (not null, not arrows)
      return fromType === 'node' && toType === 'node';
    });
    const midpointArrows = allArrows.filter(arrow => {
      const fromType = getIdType(arrow.from_id);
      const toType = getIdType(arrow.to_id);
      // At least one must be an arrow (midpoint connection)
      return fromType === 'arrow' || toType === 'arrow';
    });
    
    // Store arrow information for midpoint connections
    // Maps arrow connection IDs to their coordinates and target reactions
    const arrowInfoMap = new Map();
    
    // Helper function to get node radius based on type and pathway
    const getNodeRadius = (node, nodeId) => {
      if (!node) return 30;
      if (node.isProteinComplex) {
        // Check if it's ETC
        const etcNodes = electronTransportChainNodes.filter(n => !n.hidden);
        if (etcNodes.some(n => n.id === nodeId)) {
          return 40; // Right/left edge of complex
        }
        return 40;
      }
      if (node.isMobileCarrier) {
        const etcNodes = electronTransportChainNodes.filter(n => !n.hidden);
        if (etcNodes.some(n => n.id === nodeId)) {
          return 20; // Mobile carrier radius
        }
        return 20;
      }
      return 30; // Standard radius
    };
    
    // Helper function to get midpoint of an arrow
    const getArrowMidpoint = (arrowId) => {
      const arrowInfo = arrowInfoMap.get(arrowId);
      if (!arrowInfo) return null;
      return {
        x: (arrowInfo.x1 + arrowInfo.x2) / 2,
        y: (arrowInfo.y1 + arrowInfo.y2) / 2
      };
    };
    
    // Helper function to create an arrow that connects to the midpoint of another arrow
    // This is a generalized feature: any arrow drawn into the middle of another arrow
    // will, when clicked, select the reaction that the target arrow represents
    const createArrowToMidpoint = (startX, startY, targetArrowId, connectionId, className, targetReaction) => {
      const midpoint = getArrowMidpoint(targetArrowId);
      if (!midpoint) {
        console.warn(`Arrow ${targetArrowId} not found for midpoint connection`);
        return null;
      }
      
      const dx = midpoint.x - startX;
      const dy = midpoint.y - startY;
      const angle = Math.atan2(dy, dx);
      
      // End the arrow slightly before the midpoint to avoid overlap
      const endX = midpoint.x - 10 * Math.cos(angle);
      const endY = midpoint.y - 10 * Math.sin(angle);
      
      // Create the arrow with special handling for midpoint connections
      const arrowResult = createArrow(
        { x1: startX, y1: startY, x2: endX, y2: endY },
        connectionId,
        className || 'connection-midpoint',
        () => {
          // When clicked, select the target reaction (the reaction the target arrow represents)
          this.selectReaction(targetReaction);
        }
      );
      
      // Make the hit area wider at the endpoint for easier clicking
        if (arrowResult && arrowResult.hitArea) {
          arrowResult.hitArea.attr('stroke-width', PATHWAY_CONFIG.arrowSettings.midpointHitAreaWidth);
        }
      
      return arrowResult;
    };
    
    // Generalized function to create an arrow with visible line and hit area
    const createArrow = (coords, connectionId, className, onClick) => {
      // Create visible arrow line
      const visibleArrow = this.g.append('line')
        .attr('class', `connection ${className || ''}`)
        .attr('data-connection-id', connectionId)
        .attr('x1', coords.x1)
        .attr('y1', coords.y1)
        .attr('x2', coords.x2)
        .attr('y2', coords.y2)
        .attr('stroke', '#2c5f7c')
        .attr('stroke-width', PATHWAY_CONFIG.arrowSettings.strokeWidth)
        .attr('stroke-opacity', PATHWAY_CONFIG.arrowSettings.strokeOpacity)
        .attr('marker-end', 'url(#arrowhead)');
      
      // Create invisible hit area (wider, transparent) - larger for easier interaction
      const hitArea = this.g.append('line')
        .attr('class', `connection-hit ${className ? 'connection-hit-special' : ''}`)
        .attr('data-connection-id', connectionId)
        .attr('x1', coords.x1)
        .attr('y1', coords.y1)
        .attr('x2', coords.x2)
        .attr('y2', coords.y2)
        .attr('stroke', 'transparent')
        .attr('stroke-width', PATHWAY_CONFIG.arrowSettings.hitAreaWidth)
        .attr('stroke-opacity', 0)
        .on('mouseenter', () => {
          // Make arrow bigger on hover (visual only, hit area stays the same)
          visibleArrow
            .attr('stroke-width', PATHWAY_CONFIG.arrowSettings.strokeWidthHover)
            .attr('stroke-opacity', PATHWAY_CONFIG.arrowSettings.strokeOpacityHover);
        })
        .on('mouseleave', () => {
          // Reset to normal size
          visibleArrow
            .attr('stroke-width', PATHWAY_CONFIG.arrowSettings.strokeWidth)
            .attr('stroke-opacity', PATHWAY_CONFIG.arrowSettings.strokeOpacity);
        })
        .on('click', (event) => {
          event.stopPropagation();
          if (onClick) {
            onClick(event);
          }
        });
      
      return { visibleArrow, hitArea };
    };
    
    // Helper function to create arrow key from node IDs
    const getArrowKey = (fromNodeId, toNodeId) => `${fromNodeId}-${toNodeId}`;
    
    // Unified function to create arrow(s) and store in arrowDataMap
    // Supports both single arrow and array of arrows for batch processing
    // Auto-calculates coordinates if not provided
    const createArrowWithData = (fromNode, toNodeOrArray, coordsOrConfig, connectionId, className, targetReaction, fromNodeId = null, toNodeId = null) => {
      // Handle array of arrows (batch mode)
      if (Array.isArray(toNodeOrArray)) {
        toNodeOrArray.forEach((arrowConfig, index) => {
          const fromNodeObj = typeof fromNode === 'string' ? this.nodeMap.get(fromNode) : fromNode;
          const toNodeObj = arrowConfig.toNode || this.nodeMap.get(arrowConfig.toNodeId);
          const coords = arrowConfig.customCoords || calculateArrowCoords(fromNodeObj, toNodeObj);
          createArrowWithData(
            fromNodeObj,
            toNodeObj,
            coords,
            arrowConfig.connectionId,
            arrowConfig.className || className || 'connection-special',
            arrowConfig.targetReaction || targetReaction,
            arrowConfig.reactantId || fromNodeId,
            arrowConfig.productId || toNodeId
          );
        });
        return;
      }
      
      // Single arrow mode
      const fromNodeObj = typeof fromNode === 'string' ? this.nodeMap.get(fromNode) : fromNode;
      const toNodeObj = typeof toNodeOrArray === 'string' ? this.nodeMap.get(toNodeOrArray) : toNodeOrArray;
      
      // Auto-calculate coordinates if not provided
      const coords = coordsOrConfig || calculateArrowCoords(fromNodeObj, toNodeObj);
      
      // Nodes from nodeMap have 'id' property, not 'nodeId'
      // Use different variable names to avoid conflict with function parameters
      const fromNodeIdValue = fromNodeObj.id || fromNodeObj.nodeId;
      const toNodeIdValue = toNodeObj.id || toNodeObj.nodeId;
      
      const arrowKey = getArrowKey(fromNodeIdValue, toNodeIdValue);
      const fromNodeData = this.nodeMap.get(fromNodeIdValue);
      const toNodeData = this.nodeMap.get(toNodeIdValue);
      
      // Determine reactant and product molecules from the target reaction
      // Use function parameters if provided, otherwise use node IDs or reaction data
      const reactantId = fromNodeId || fromNodeIdValue || (targetReaction.substrate ? targetReaction.substrate.id : null);
      const productId = toNodeId || toNodeIdValue || (targetReaction.product ? targetReaction.product.id : null);
      
      // Store arrow data
      const moleculeKey = reactantId && productId ? `${arrowKey}-${reactantId}-${productId}` : arrowKey;
      const arrowData = {
        fromNodeId: fromNodeIdValue,
        toNodeId: toNodeIdValue,
        fromReaction: fromNodeData,
        toReaction: toNodeData,
        targetReaction: targetReaction,
        reactantMoleculeId: reactantId,
        productMoleculeId: productId,
        coords: coords,
        connectionId: connectionId
      };
      this.arrowDataMap.set(moleculeKey, arrowData);
      
      // Add connection ID to target reaction's arrowIds array
      if (targetReaction && !targetReaction.arrowIds.includes(connectionId)) {
        targetReaction.arrowIds.push(connectionId);
      }
      
      // Create visual arrow
      return createArrow(coords, connectionId, className, () => {
        this.selectReaction(targetReaction);
      });
    };
    
    // Draw ALL arrows from arrow data files (node-to-node arrows)
    // Simplified: just draw all arrows, find reactions by target node
    nodeToNodeArrows.forEach((arrowData) => {
      const fromNode = arrowData.from_id ? this.nodeMap.get(arrowData.from_id) : null;
      const toNode = arrowData.to_id ? this.nodeMap.get(arrowData.to_id) : null;
      
      // Check if this is a curved arrow (which can have only from_id or only to_id)
      const isCurved = arrowData.curved === true;
      
      if (!isCurved) {
        // For non-curved arrows, both nodes are required
        if (!fromNode || !toNode) {
          console.warn(`Arrow ${arrowData.id}: Missing node(s) - from: ${arrowData.from_id}, to: ${arrowData.to_id}`);
          return;
        }
        
        // Skip if nodes are hidden
        if (fromNode.hidden || toNode.hidden) return;
      } else {
        // For curved arrows, at least one node is required
        if (!fromNode && !toNode) {
          console.warn(`Arrow ${arrowData.id}: Curved arrow requires either from_id or to_id`);
          return;
        }
        
        // Skip if the provided node is hidden
        if ((fromNode && fromNode.hidden) || (toNode && toNode.hidden)) return;
      }
      
      // Find the reaction that this arrow represents (by reaction_id from arrow data)
      // The arrow's reaction_id tells us which reaction this arrow represents
      const rawReaction = this.reactionMap.get(arrowData.reaction_id);
      
      // Find the processed reaction that matches this reaction_id
      // Since multiple reactions can have the same reaction_id (one per product node),
      // we prefer the one where the product matches the target node of the arrow
      let processedReaction = this.reactions.find(r => 
        r.id === arrowData.reaction_id && 
        r.product && 
        r.product.id === arrowData.to_id
      );
      
      // If not found by product match, try to find by substrate matching source node
      if (!processedReaction) {
        processedReaction = this.reactions.find(r => 
          r.id === arrowData.reaction_id && 
          r.substrate && 
          r.substrate.id === arrowData.from_id
        );
      }
      
      // If still not found, just find any reaction with matching reaction_id
      if (!processedReaction) {
        processedReaction = this.reactions.find(r => r.id === arrowData.reaction_id);
      }
      
      // Use processed reaction if found (it has node data), otherwise use raw reaction
      const targetReaction = processedReaction || rawReaction;
      
      if (!targetReaction) {
        console.warn(`Arrow ${arrowData.id}: No reaction found for reaction_id ${arrowData.reaction_id}`);
        // Still draw the arrow even if no reaction found
      }
      
      // Calculate coordinates from node positions
      // For curved arrows with only one node, calculate proper coords for by-molecule arrows
      let coords;
      if (isCurved && (!fromNode || !toNode)) {
        // For curved arrows with only one node, calculate proper coords
        // This ensures by-molecule arrows can be drawn correctly
        const node = fromNode || toNode;
        if (node) {
          const getNodeRadius = (node) => {
            if (!node) return 30;
            if (node.isProteinComplex) return 40;
            if (node.isMobileCarrier) return 20;
            return 30;
          };
          const nodeRadius = getNodeRadius(node);
          const arrowLength = PATHWAY_CONFIG.arrowSettings.byMoleculeLength * 1.5;
          
          if (fromNode && !toNode) {
            // Only from_id: arrow goes to the right from from_id
            const startX = node.position.x + nodeRadius;
            const startY = node.position.y;
            coords = {
              x1: startX,
              y1: startY,
              x2: startX + arrowLength,
              y2: startY
            };
          } else if (toNode && !fromNode) {
            // Only to_id: arrow comes from the left to to_id
            const endX = node.position.x - nodeRadius;
            const endY = node.position.y;
            coords = {
              x1: endX - arrowLength,
              y1: endY,
              x2: endX,
              y2: endY
            };
          } else {
            // Fallback: use placeholder
            coords = {
              x1: node.position.x,
              y1: node.position.y,
              x2: node.position.x,
              y2: node.position.y
            };
          }
        } else {
          // No node at all - try to use reaction position if available
          const rawReaction = this.reactionMap.get(arrowData.reaction_id);
          const processedReactionForCoords = this.reactions.find(r => r.id === arrowData.reaction_id);
          const reactionForCoords = processedReactionForCoords || rawReaction;
          
          if (reactionForCoords && reactionForCoords.position) {
            const nodeRadius = 30;
            const arrowLength = PATHWAY_CONFIG.arrowSettings.byMoleculeLength * 1.5;
            coords = {
              x1: reactionForCoords.position.x - nodeRadius,
              y1: reactionForCoords.position.y,
              x2: reactionForCoords.position.x + nodeRadius + arrowLength,
              y2: reactionForCoords.position.y
            };
          } else {
            // Fallback: use placeholder
            coords = { 
              x1: 0, 
              y1: 0, 
              x2: 0, 
              y2: 0 
            };
          }
        }
      } else {
        // Normal coordinate calculation for non-curved arrows or curved arrows with both nodes
        const fromRadius = getNodeRadius(fromNode, arrowData.from_id);
        const toRadius = getNodeRadius(toNode, arrowData.to_id);
        const dx = toNode.position.x - fromNode.position.x;
        const dy = toNode.position.y - fromNode.position.y;
        const angle = Math.atan2(dy, dx);
        
        let x1 = fromNode.position.x + fromRadius * Math.cos(angle);
        let y1 = fromNode.position.y + fromRadius * Math.sin(angle);
        if (dy > 0) {
          y1 = Math.min(y1, fromNode.position.y + 35);
        }
        
        let x2 = toNode.position.x - toRadius * Math.cos(angle);
        let y2 = toNode.position.y - toRadius * Math.sin(angle);
        if (dy < 0) {
          y2 = Math.max(y2, toNode.position.y - 35);
        }
        
        coords = { x1, y1, x2, y2 };
      }
      
      // Store arrow information for midpoint connections (if needed)
      // Always use processed reaction if available (it has all the necessary data)
      const reactionForArrowInfo = processedReaction || targetReaction;
      arrowInfoMap.set(arrowData.id, {
        ...coords,
        targetReaction: reactionForArrowInfo,
        arrowKey: getArrowKey(arrowData.from_id || '', arrowData.to_id || '')
      });
      
      // For curved arrows, check if we have from_id or to_id (or both)
      if (isCurved) {
        // For curved arrows, we always draw by-arrows even if from_id or to_id doesn't exist
        // The main arrow is skipped, but by-arrows will still be drawn
        
        // Get reaction for curved arrow
        const finalReaction = targetReaction ? (processedReaction || targetReaction) : null;
        if (targetReaction) {
          const reactionInArray = processedReaction || this.reactions.find(r => r.id === arrowData.reaction_id);
          if (reactionInArray && !reactionInArray.arrowIds.includes(arrowData.id)) {
            reactionInArray.arrowIds.push(arrowData.id);
          }
        }
        
        // Draw curved arrow (handles both from_id and to_id cases, or neither)
        // This will skip the main arrow but still set up data for by-arrows
        this.createCurvedArrow(fromNode, toNode, coords, arrowData.id, finalReaction, arrowData);
        return;
      }
      
      // Create the arrow with the target reaction (or null if not found)
      if (targetReaction) {
        // Ensure the reaction in this.reactions has the arrowId added
        // Use the processed reaction we found, or find it again
        const reactionInArray = processedReaction || this.reactions.find(r => r.id === arrowData.reaction_id);
        if (reactionInArray && !reactionInArray.arrowIds.includes(arrowData.id)) {
          reactionInArray.arrowIds.push(arrowData.id);
        }
        
        // Always use processed reaction if available (it has node data and all properties)
        // Only fall back to raw reaction if processed reaction not found
        const finalReaction = processedReaction || targetReaction;
        
        // Draw straight arrow (normal behavior)
        createArrowWithData(
          fromNode,
          toNode,
          coords,
          arrowData.id,
          '',
          finalReaction
        );
      } else {
        // Draw arrow even if no reaction found (for visual completeness)
        createArrow(coords, arrowData.id, '', () => {
          // No action on click if no reaction
        });
      }
    });
    
    // Handle midpoint arrows (arrows that connect to the midpoint of other arrows)
    midpointArrows.forEach((arrowData) => {
      let fromNode = null;
      let toArrowId = null;
      let fromArrowId = null;
      
      // Determine source (node or arrow)
      const fromType = getIdType(arrowData.from_id);
      if (fromType === 'node') {
        fromNode = this.nodeMap.get(arrowData.from_id);
      } else if (fromType === 'arrow') {
        fromArrowId = arrowData.from_id;
      }
      // If fromType is null (undefined from_id), both fromNode and fromArrowId remain null
      
      // Determine target (node or arrow)
      const toType = getIdType(arrowData.to_id);
      if (toType === 'arrow') {
        toArrowId = arrowData.to_id;
      }
      
      // Get raw reaction data
      const rawReaction = this.reactionMap.get(arrowData.reaction_id);
      
      // Find the processed reaction - simplified approach
      let processedReaction = null;
      if (toArrowId) {
        // For arrows that connect to other arrows, find by reaction_id
        processedReaction = this.reactions.find(r => r.id === arrowData.reaction_id);
      } else if (toType === 'node' && arrowData.to_id) {
        // For arrows that connect to nodes, find by target nodeId
        const toNode = this.nodeMap.get(arrowData.to_id);
        if (toNode) {
          processedReaction = this.reactions.find(r => r.nodeId === arrowData.to_id);
        }
      }
      
      // Use processed reaction if found, otherwise use raw reaction
      const targetReaction = processedReaction || rawReaction;
      
      if (!targetReaction) {
        console.warn(`Arrow ${arrowData.id}: No reaction found for ${arrowData.reaction_id}`);
        // Still draw the arrow even if no reaction found
      }
      
      // For arrows connecting to midpoint of another arrow (from node to arrow midpoint)
      if (toArrowId && fromNode) {
        const targetArrowInfo = arrowInfoMap.get(toArrowId);
        if (!targetArrowInfo) {
          console.warn(`Arrow ${arrowData.id}: Target arrow ${toArrowId} not found in arrowInfoMap`);
          return;
        }
        
        const midpoint = calculateArrowMidpoint(targetArrowInfo);
        const dx = midpoint.x - fromNode.position.x;
        const dy = midpoint.y - fromNode.position.y;
        const angle = Math.atan2(dy, dx);
        const fromRadius = getNodeRadius(fromNode, arrowData.from_id);
        
        const startX = fromNode.position.x + fromRadius * Math.cos(angle);
        const startY = fromNode.position.y + fromRadius * Math.sin(angle);
        const endX = midpoint.x - 10 * Math.cos(angle);
        const endY = midpoint.y - 10 * Math.sin(angle);
        
        const coords = { x1: startX, y1: startY, x2: endX, y2: endY };
        
        // Use the target arrow's reaction if available, otherwise use this arrow's reaction
        const finalTargetReaction = targetArrowInfo.targetReaction || targetReaction;
        
        const arrowResult = createArrow(
          coords,
          arrowData.id,
          'connection-midpoint',
          () => {
            if (finalTargetReaction) {
              this.selectReaction(finalTargetReaction);
            }
          }
        );
        
        if (arrowResult && arrowResult.hitArea) {
          arrowResult.hitArea.attr('stroke-width', 30);
        }
        
        // Store arrow data
        this.arrowDataMap.set(arrowData.id, {
          fromNodeId: arrowData.from_id,
          toNodeId: toArrowId,
          targetReaction: finalTargetReaction,
          coords: coords,
          connectionId: arrowData.id,
          isMidpointConnection: true
        });
      }
      
      // For arrows starting from midpoint of another arrow and going to a node
      if (fromArrowId && !toArrowId) {
        const sourceArrowInfo = arrowInfoMap.get(fromArrowId);
        if (!sourceArrowInfo) {
          console.warn(`Arrow ${arrowData.id}: Source arrow ${fromArrowId} not found in arrowInfoMap`);
          return;
        }
        
        const toNode = this.nodeMap.get(arrowData.to_id);
        if (!toNode) {
          console.warn(`Arrow ${arrowData.id}: Target node ${arrowData.to_id} not found`);
          return;
        }
        
        const midpoint = calculateArrowMidpoint(sourceArrowInfo);
        const dx = toNode.position.x - midpoint.x;
        const dy = toNode.position.y - midpoint.y;
        const angle = Math.atan2(dy, dx);
        const toRadius = getNodeRadius(toNode, arrowData.to_id);
        
        // Start from midpoint (offset slightly to avoid overlap)
        const startX = midpoint.x + 10 * Math.cos(angle);
        const startY = midpoint.y + 10 * Math.sin(angle);
        const endX = toNode.position.x - toRadius * Math.cos(angle);
        const endY = toNode.position.y - toRadius * Math.sin(angle);
        
        const coords = { x1: startX, y1: startY, x2: endX, y2: endY };
        
        // Use the source arrow's reaction if available, otherwise use this arrow's reaction
        const finalTargetReaction = sourceArrowInfo.targetReaction || targetReaction;
        
        const arrowResult = createArrow(
          coords,
          arrowData.id,
          'connection-midpoint',
          () => {
            if (finalTargetReaction) {
              this.selectReaction(finalTargetReaction);
            }
          }
        );
        
        if (arrowResult && arrowResult.hitArea) {
          arrowResult.hitArea.attr('stroke-width', 30);
        }
        
        // Store arrow data
        this.arrowDataMap.set(arrowData.id, {
          fromNodeId: fromArrowId,
          toNodeId: toNode.id,
          targetReaction: finalTargetReaction,
          coords: coords,
          connectionId: arrowData.id,
          isMidpointConnection: true
        });
      }
    });
    
    // Draw U-shaped arrows for byreactants/byproducts
    // This must be called after all primary arrows are created
    this.drawByreactantByproductArrows();
  }
  
  /**
   * Helper method to create a connection from a node to the midpoint of an arrow
   */
  createMidpointConnection(fromNode, toArrowConnectionId, connectionId, targetReaction, reactantId, productId, toNodePosition = null) {
    const arrowData = findArrowData(
      this.arrowDataMap,
      toArrowConnectionId,
      null,
      null,
      null,
      null
    );
    
    let midpoint;
    if (arrowData && arrowData.coords) {
      midpoint = calculateArrowMidpoint(arrowData.coords);
    } else if (toNodePosition) {
      // Fallback: calculate from node positions
      const fromPos = fromNode.position;
      const angle = Math.atan2(toNodePosition.y - fromPos.y, toNodePosition.x - fromPos.x);
      const startX = fromPos.x + 30 * Math.cos(angle);
      const startY = fromPos.y + 30 * Math.sin(angle);
      const endX = toNodePosition.x - 30 * Math.cos(angle);
      const endY = toNodePosition.y - 30 * Math.sin(angle);
      midpoint = { x: (startX + endX) / 2, y: (startY + endY) / 2 };
    } else {
      console.warn(`Cannot find midpoint for connection ${connectionId}`);
      return null;
    }
    
    const fromPos = fromNode.position;
    const dx = midpoint.x - (fromPos.x + 30);
    const dy = midpoint.y - fromPos.y;
    const angle = Math.atan2(dy, dx);
    const endX = midpoint.x - 10 * Math.cos(angle);
    const endY = midpoint.y - 10 * Math.sin(angle);
    
    const coords = { x1: fromPos.x + 30, y1: fromPos.y, x2: endX, y2: endY };
    
    // Store arrow data
    const midpointKey = `${fromNode.nodeId}-midpoint-${connectionId}`;
    const arrowDataEntry = {
      fromNodeId: fromNode.nodeId,
      toNodeId: targetReaction?.nodeId || 'midpoint',
      fromReaction: fromNode,
      toReaction: targetReaction,
      targetReaction: targetReaction,
      reactantMoleculeId: reactantId,
      productMoleculeId: productId,
      coords: coords,
      connectionId: connectionId,
      isMidpointConnection: true
    };
    this.arrowDataMap.set(midpointKey, arrowDataEntry);
    
    // Add to reaction's arrowIds
    if (targetReaction && !targetReaction.arrowIds.includes(connectionId)) {
      targetReaction.arrowIds.push(connectionId);
    }
    
    // Create visual arrow with wider hit area for midpoint connections
    const arrowResult = this.createArrowVisual(coords, connectionId, 'connection-midpoint', () => {
      this.selectReaction(targetReaction);
    });
    if (arrowResult && arrowResult.hitArea) {
      arrowResult.hitArea.attr('stroke-width', 30);
    }
    
    return arrowResult;
  }

  /**
   * Helper method to create visual arrow elements
   */
  createArrowVisual(coords, connectionId, className, onClick) {
    // Create visible arrow line
    const visibleArrow = this.g.append('line')
      .attr('class', `connection ${className || ''}`)
      .attr('data-connection-id', connectionId)
      .attr('x1', coords.x1)
      .attr('y1', coords.y1)
      .attr('x2', coords.x2)
      .attr('y2', coords.y2)
            .attr('stroke', PATHWAY_CONFIG.colors.secondary)
            .attr('stroke-width', PATHWAY_CONFIG.arrowSettings.strokeWidth)
            .attr('stroke-opacity', PATHWAY_CONFIG.arrowSettings.strokeOpacity)
      .attr('marker-end', 'url(#arrowhead)');
    
    // Create invisible hit area
    const hitArea = this.g.append('line')
      .attr('class', `connection-hit ${className ? 'connection-hit-special' : ''}`)
      .attr('data-connection-id', connectionId)
      .attr('x1', coords.x1)
      .attr('y1', coords.y1)
      .attr('x2', coords.x2)
      .attr('y2', coords.y2)
        .attr('stroke', 'transparent')
        .attr('stroke-width', PATHWAY_CONFIG.arrowSettings.hitAreaWidth)
        .attr('stroke-opacity', 0)
      .on('mouseenter', () => {
        visibleArrow
          .attr('stroke-width', PATHWAY_CONFIG.arrowSettings.strokeWidthHover)
          .attr('stroke-opacity', PATHWAY_CONFIG.arrowSettings.strokeOpacityHover);
      })
      .on('mouseleave', () => {
        visibleArrow
          .attr('stroke-width', PATHWAY_CONFIG.arrowSettings.strokeWidth)
          .attr('stroke-opacity', PATHWAY_CONFIG.arrowSettings.strokeOpacity);
      })
      .on('click', (event) => {
        event.stopPropagation();
        if (onClick) {
          onClick(event);
        }
      });
    
    return { visibleArrow, hitArea };
  }
  
  /**
   * Check if a reaction node represents an enzyme/carrier (not a substrate/product)
   * This includes protein complexes and mobile carriers
   * @param {Object} reaction - The reaction node to check
   * @returns {boolean} - True if the node represents an enzyme/carrier
   */
  isEnzymeOrCarrierNode(reaction) {
    if (!reaction) return false;
    // Check if it's a protein complex or mobile carrier
    return reaction.isProteinComplex === true || reaction.isMobileCarrier === true;
  }
  
  /**
   * Draw U-shaped arrows for byreactants and byproducts
   * These arrows are attached to the main reaction arrows
   */
  /**
   * Create a curved arrow (same style as by-molecule arrows)
   * If from_id is provided: draw arrow to the right from from_id
   * If to_id is provided (and no from_id): draw arrow from the left to to_id
   */
  createCurvedArrow(fromNode, toNode, coords, connectionId, targetReaction, arrowData) {
    const arrowLength = PATHWAY_CONFIG.arrowSettings.byMoleculeLength * 1.5; // Length of the arrow
    let startX, startY, endX, endY;
    
    // Helper to get node radius
    const getNodeRadius = (node) => {
      if (!node) return 30;
      if (node.isProteinComplex) return 40;
      if (node.isMobileCarrier) return 20;
      return 30;
    };
    
    if (fromNode && arrowData.from_id) {
      // Case 1: from_id is provided - draw arrow to the right from from_id
      const fromRadius = getNodeRadius(fromNode);
      const arrowAngle = 0; // Always pointing right
      
      // Start at from_id position with proper offset (same as regular arrows)
      startX = fromNode.position.x + fromRadius * Math.cos(arrowAngle);
      startY = fromNode.position.y + fromRadius * Math.sin(arrowAngle);
      
      // Apply the same y-axis constraint as regular arrows
      if (0 > 0) { // dy = 0 for horizontal, but keep logic
        startY = Math.min(startY, fromNode.position.y + 35);
      }
      
      // Calculate end point: always to the right from the starting point
      endX = startX + arrowLength;
      endY = startY;
    } else if (toNode && arrowData.to_id) {
      // Case 2: only to_id is provided - draw arrow from the left to to_id
      const toRadius = getNodeRadius(toNode);
      const arrowAngle = Math.PI; // Pointing left (180 degrees)
      
      // End at to_id position with proper offset (same as regular arrows)
      endX = toNode.position.x + toRadius * Math.cos(arrowAngle); // Negative offset (left side)
      endY = toNode.position.y + toRadius * Math.sin(arrowAngle);
      
      // Apply the same y-axis constraint as regular arrows
      if (0 < 0) { // dy = 0 for horizontal, but keep logic
        endY = Math.max(endY, toNode.position.y - 35);
      }
      
      // Calculate start point: always to the left from the ending point
      startX = endX - arrowLength;
      startY = endY;
    } else {
      // For curved arrows, even if from_id or to_id doesn't exist, 
      // we still need to calculate coords for by-arrows
      // Use placeholder coordinates based on reaction position if available
      if (targetReaction && targetReaction.position) {
        const nodeRadius = 30;
        startX = targetReaction.position.x - nodeRadius;
        startY = targetReaction.position.y;
        endX = targetReaction.position.x + nodeRadius;
        endY = targetReaction.position.y;
      } else {
        // Fallback: use placeholder coordinates
        startX = 0;
        startY = 0;
        endX = arrowLength;
        endY = 0;
      }
    }
    
    // For curved arrows, skip drawing the main arrow - only by-arrows will be drawn
    // The main arrow line is not drawn when curved: true
    const curvedArrow = null;
    const hitArea = null;
    
    // Store arrow data in arrowDataMap
    // Use the actual drawn coordinates
    const fromNodeId = fromNode ? fromNode.id : null;
    const toNodeId = toNode ? toNode.id : null;
    const arrowKey = fromNodeId && toNodeId ? `${fromNodeId}-${toNodeId}` : (fromNodeId || toNodeId || 'curved');
    const reactantId = fromNodeId || null;
    const productId = toNodeId || null;
    const moleculeKey = `${arrowKey}-${reactantId || 'none'}-${productId || 'none'}`;
    
    const storedArrowData = {
      fromNodeId: fromNodeId,
      toNodeId: toNodeId,
      fromReaction: fromNode,
      toReaction: toNode,
      targetReaction: targetReaction,
      reactantMoleculeId: reactantId,
      productMoleculeId: productId,
      coords: { x1: startX, y1: startY, x2: endX, y2: endY }, // Store actual drawn coordinates
      connectionId: connectionId,
      isCurved: true
    };
    this.arrowDataMap.set(moleculeKey, storedArrowData);
    
    // Add connection ID to target reaction's arrowIds array
    if (targetReaction && !targetReaction.arrowIds.includes(connectionId)) {
      targetReaction.arrowIds.push(connectionId);
    }
    
    return { curvedArrow, hitArea };
  }
  
  drawByreactantByproductArrows() {
    // Helper function to determine pathway for a reaction
    const getPathwayName = (reaction) => {
      const pathway = this.getPathwayForReaction(reaction);
      if (!pathway) return null;
      
      // Map pathway summary names to config pathway names using PATHWAY_CONFIG
      const summaryName = pathway.summary.name;
      for (const [pathwayId, displayName] of Object.entries(PATHWAY_CONFIG.pathwayNames)) {
        if (summaryName === displayName || 
            (pathwayId === 'electron-transport-chain' && 
             (summaryName === 'Electron Transport Chain / Oxidative Phosphorylation' || 
              summaryName === 'Electron Transport Chain'))) {
          return pathwayId;
        }
      }
      return null;
    };
    
    // Helper function to find the main arrow for a reaction
    // The main arrow is the node-to-node arrow (not a midpoint connection)
    // where both from_id and to_id are nodes (not arrows)
    // If there are multiple arrows for the same reaction, only return the node-to-node one
    const findMainArrow = (reaction) => {
      if (!reaction || !reaction.arrowIds || reaction.arrowIds.length === 0) {
        return null;
      }
      
      // Helper to check if an ID is a node (not an arrow)
      const isNodeId = (id) => {
        return id && !id.startsWith('arrow_');
      };
      
      // Collect all candidate arrows first
      const candidateArrows = [];
      
      // Find all arrows that match this reaction
      for (const connectionId of reaction.arrowIds) {
        for (const [key, arrowData] of this.arrowDataMap.entries()) {
          if (arrowData.connectionId === connectionId && 
              arrowData.targetReaction && 
              arrowData.targetReaction.id === reaction.id) {
            candidateArrows.push(arrowData);
          }
        }
      }
      
      // Prioritize: find the FIRST node-to-node arrow (not a midpoint connection)
      // This ensures we only draw by-molecule arrows on the main node-to-node arrow
      for (const arrowData of candidateArrows) {
        if (!arrowData.isMidpointConnection &&
            isNodeId(arrowData.fromNodeId) &&
            isNodeId(arrowData.toNodeId)) {
          return arrowData; // Return immediately - this is the main arrow
        }
      }
      
      // Also check for curved arrows (which may not have toNodeId or fromNodeId)
      // For curved arrows, we can draw by-arrows even if there's no from_id or to_id
      for (const arrowData of candidateArrows) {
        if (arrowData.isCurved === true && 
            !arrowData.isMidpointConnection) {
          return arrowData; // Return curved arrow even if no fromNodeId or toNodeId
        }
      }
      
      // If no node-to-node arrow found, return null (don't draw by-molecule arrows on midpoint connections)
      return null;
    };
    
    // Process each reaction that has byreactant or byproduct fields
    this.reactions.forEach((reaction) => {
      // Skip product nodes
      if (reaction.isProductNode) return;
      
      // Get by-molecules from node data (source of truth) or reaction data (fallback)
      // For curved arrows, also check arrow data for byproduct/byreactant
      const nodeByreactant = reaction.node?.byreactant;
      const nodeByproduct = reaction.node?.byproduct;
      
      // Determine if data comes from node or reaction
      const dataFromNode = (nodeByreactant !== undefined) || (nodeByproduct !== undefined);
      
      // Check if any arrow for this reaction has curved: true
      let hasCurvedArrow = false;
      if (reaction.arrowIds && reaction.arrowIds.length > 0) {
        // Check raw arrow data to see if any arrow has curved: true
        for (const arrowId of reaction.arrowIds) {
          const rawArrow = this.arrowMap.get(arrowId);
          if (rawArrow && rawArrow.curved === true) {
            hasCurvedArrow = true;
            break;
          }
        }
      }
      
      // Find the main arrow for this reaction (needed for positioning by-molecule arrows)
      // Only needed if data comes from reaction (for arrow midpoint attachment)
      // If data comes from node, we'll attach directly to the node
      const mainArrow = dataFromNode ? null : findMainArrow(reaction);
      
      // Check if the main arrow has byproduct/byreactant
      // For curved arrows: if arrow doesn't have byproduct/byreactant, don't fall back to reaction data
      // For non-curved arrows: fall back to reaction data if arrow doesn't have byproduct/byreactant
      let arrowByreactant = undefined;
      let arrowByproduct = undefined;
      let arrowDataChecked = false; // Track if we successfully checked arrow data
      let isArrowCurved = false; // Track if the arrow is curved
      let arrowXScale = 1.0; // Default x scale
      let arrowYScale = 1.0; // Default y scale
      let arrowHideByreactantLabels = undefined; // Hide byreactant labels from arrow data
      let arrowHideByproductLabels = undefined; // Hide byproduct labels from arrow data
      if (mainArrow) {
        // Get the arrow ID from the main arrow
        const mainArrowId = mainArrow.connectionId;
        if (mainArrowId) {
          const rawArrow = this.arrowMap.get(mainArrowId);
          if (rawArrow) {
            arrowDataChecked = true; // We successfully checked the arrow
            isArrowCurved = rawArrow.curved === true; // Check if arrow is curved
            arrowByreactant = rawArrow.byreactant;
            arrowByproduct = rawArrow.byproduct;
            // Get x_scale and y_scale from arrow data (default to 1.0 if not provided)
            arrowXScale = rawArrow.x_scale !== undefined ? rawArrow.x_scale : 1.0;
            arrowYScale = rawArrow.y_scale !== undefined ? rawArrow.y_scale : 1.0;
            // Get hideByreactantLabels and hideByproductLabels from arrow data
            arrowHideByreactantLabels = rawArrow.hideByreactantLabels;
            arrowHideByproductLabels = rawArrow.hideByproductLabels;
          }
        }
      } else if (hasCurvedArrow && reaction.arrowIds && reaction.arrowIds.length > 0) {
        // For curved arrows without mainArrow, get arrow data from the first curved arrow
        for (const arrowId of reaction.arrowIds) {
          const rawArrow = this.arrowMap.get(arrowId);
          if (rawArrow && rawArrow.curved === true) {
            arrowDataChecked = true;
            isArrowCurved = true;
            arrowByreactant = rawArrow.byreactant;
            arrowByproduct = rawArrow.byproduct;
            // Get x_scale and y_scale from arrow data (default to 1.0 if not provided)
            arrowXScale = rawArrow.x_scale !== undefined ? rawArrow.x_scale : 1.0;
            arrowYScale = rawArrow.y_scale !== undefined ? rawArrow.y_scale : 1.0;
            // Get hideByreactantLabels and hideByproductLabels from arrow data
            arrowHideByreactantLabels = rawArrow.hideByreactantLabels;
            arrowHideByproductLabels = rawArrow.hideByproductLabels;
            break; // Use the first curved arrow found
          }
        }
      }
      
      // Priority: node data > arrow data > reaction data
      // For curved arrows: if arrow was checked but doesn't have byproduct/byreactant, use undefined (don't show anything)
      // For non-curved arrows: if arrow doesn't have byproduct/byreactant, fall back to reaction data
      // Only fall back to reaction data if we couldn't check the arrow data OR if arrow is not curved
      const byreactant = nodeByreactant !== undefined ? nodeByreactant : 
                        (arrowDataChecked && isArrowCurved ? arrowByreactant : 
                         (arrowByreactant !== undefined ? arrowByreactant : reaction.byreactant));
      const byproduct = nodeByproduct !== undefined ? nodeByproduct : 
                       (arrowDataChecked && isArrowCurved ? arrowByproduct : 
                        (arrowByproduct !== undefined ? arrowByproduct : reaction.byproduct));
      
      // Check if node/reaction has byreactant or byproduct fields for display
      const hasByreactantField = byreactant !== undefined;
      const hasByproductField = byproduct !== undefined;
      
      // Note: displayByreactant and displayByproduct are NOT used for drawing arrows or labels
      // They are only for the detail page
      
      // Draw by-molecule arrows if there are by-molecules OR if there's a curved arrow
      // (curved arrows should always draw by-molecule arrows, even without explicit by-molecule data)
      if (!hasByreactantField && !hasByproductField && !hasCurvedArrow) {
        return; // Skip reactions without by-molecule fields and without curved arrows
      }
      
      // Get pathway name
      // For ETC complexes, try to find pathway by nodeId first (more reliable than index-based)
      let pathway = null;
      if (reaction.nodeId) {
        const isETCComplex = PATHWAY_CONFIG.nodeIdPatterns.etcComplex.test(reaction.nodeId);
        const isETCCarrier = PATHWAY_CONFIG.nodeIdPatterns.etcCarriers.includes(reaction.nodeId);
        if (isETCComplex || isETCCarrier) {
          // ETC pathway - find by checking if nodeId is in ETC nodes
          const etcPathway = this.pathways.find(p => p.id === 'electron-transport-chain');
          if (etcPathway && etcPathway.nodes.some(n => n.id === reaction.nodeId)) {
            pathway = 'electron-transport-chain';
          }
        }
      }
      
      // Fallback to index-based pathway detection
      if (!pathway) {
        pathway = getPathwayName(reaction);
      }
      
      if (!pathway) {
        console.warn(`Could not determine pathway for reaction:`, reaction.name, 'nodeId:', reaction.nodeId);
        return;
      }
      
      let coords, dx, dy, arrowLength, arrowAngle, midX, midY;
      
      // Check if this is an enzyme/carrier node (generalized check)
      const isEnzymeOrCarrier = this.isEnzymeOrCarrierNode(reaction);
      let attachmentPointX, attachmentPointY;
      
      // If data comes from node, always attach to the node (not the arrow midpoint)
      // If data comes from reaction, attach to arrow midpoint (for regular reactions)
      if (dataFromNode) {
        // Data from node: always attach to the node surface
        // This applies to all nodes with by-molecule data in node files (like ETC complexes)
        attachmentPointX = reaction.position.x;
        attachmentPointY = reaction.position.y;
        
        // Create a virtual horizontal arrow for calculations
        // Use appropriate size based on node type
        let nodeWidth, nodeHeight;
        if (reaction.isProteinComplex) {
          const size = reaction.complexSize || { width: 80, height: 60 };
          nodeWidth = size.width;
          nodeHeight = size.height;
        } else if (reaction.isMobileCarrier) {
          nodeWidth = 40;
          nodeHeight = 40;
        } else {
          nodeWidth = 60;
          nodeHeight = 60;
        }
        
        coords = {
          x1: reaction.position.x - nodeWidth / 2,
          y1: reaction.position.y,
          x2: reaction.position.x + nodeWidth / 2,
          y2: reaction.position.y
        };
      } else if (!mainArrow || !mainArrow.coords) {
        // Data from reaction: attach to arrow midpoint (existing behavior)
        // For enzyme/carrier nodes, if no main arrow found, attach directly to node
        if (isEnzymeOrCarrier) {
          attachmentPointX = reaction.position.x;
          attachmentPointY = reaction.position.y;
          const nodeWidth = reaction.isProteinComplex ? 
                           (reaction.complexSize?.width || PATHWAY_CONFIG.nodeSizes.proteinComplex.width) : 
                           (reaction.isMobileCarrier ? PATHWAY_CONFIG.nodeSizes.mobileCarrier.width : 
                            PATHWAY_CONFIG.nodeSizes.regular.width);
          coords = {
            x1: reaction.position.x - nodeWidth / 2,
            y1: reaction.position.y,
            x2: reaction.position.x + nodeWidth / 2,
            y2: reaction.position.y
          };
        } else {
          console.warn(`Main arrow not found for reaction:`, reaction.name, 'ArrowIds:', reaction.arrowIds);
          return;
        }
      } else {
        // Normal path: use the found main arrow
        coords = mainArrow.coords;
        // For enzyme/carrier nodes, use node position as attachment point even if main arrow exists
        if (isEnzymeOrCarrier) {
          attachmentPointX = reaction.position.x;
          attachmentPointY = reaction.position.y;
        } else {
          attachmentPointX = null; // Will use midpoint for regular reactions
          attachmentPointY = null;
        }
      }
      
      // Check if main arrow is curved - if so, use from_id position as midpoint
      const isMainArrowCurved = mainArrow && mainArrow.isCurved === true;
      
      // For curved arrows, recalculate coords if needed
      if (isMainArrowCurved && !dataFromNode && attachmentPointX === null) {
        // For curved arrows, use from_id position if available, otherwise use reaction position
        let fromNode = mainArrow.fromReaction;
        if (!fromNode && mainArrow.targetReaction) {
          // If no fromNode, use the reaction position as the base
          fromNode = mainArrow.targetReaction;
        }
        
        const getNodeRadius = (node) => {
          if (!node) return 30;
          if (node.isProteinComplex) return 40;
          if (node.isMobileCarrier) return 20;
          return 30;
        };
        
        if (fromNode && fromNode.position) {
          const fromRadius = getNodeRadius(fromNode);
          // Calculate position at the edge of the from_id node (going right)
          const fromEdgeX = fromNode.position.x + fromRadius;
          const fromEdgeY = fromNode.position.y;
          
          // Create virtual coords for calculations (horizontal arrow going right)
          coords = {
            x1: fromEdgeX,
            y1: fromEdgeY,
            x2: fromEdgeX + 100, // Arbitrary length for calculations
            y2: fromEdgeY
          };
        } else if (mainArrow.coords) {
          // Use stored coords from the curved arrow if available
          coords = mainArrow.coords;
        } else if (reaction.position) {
          // Fallback: use reaction position
          const nodeRadius = 30;
          coords = {
            x1: reaction.position.x - nodeRadius,
            y1: reaction.position.y,
            x2: reaction.position.x + nodeRadius + 100,
            y2: reaction.position.y
          };
        }
      }
      
      // Calculate arrow properties
      dx = coords.x2 - coords.x1;
      dy = coords.y2 - coords.y1;
      arrowLength = Math.sqrt(dx * dx + dy * dy);
      arrowAngle = Math.atan2(dy, dx);
      
      // Get rotation angle from reaction data (in degrees, defaults to 0)
      // Angle rotates the perpendicular direction: 0 = perpendicular, 90 = along arrow, -90 = opposite
      // Positive = counterclockwise, negative = clockwise
      let baseRotationAngle = 0;
      
      // Get rotation angle from pathway configuration
      if (pathway && PATHWAY_CONFIG.pathwayBehavior[pathway]) {
        baseRotationAngle = PATHWAY_CONFIG.pathwayBehavior[pathway].rotationAngle || 0;
      }
      
      // Calculate base perpendicular direction (90 degrees counterclockwise from arrow)
      const basePerpAngle = arrowAngle + Math.PI / 2;
      
      // Apply rotation to get the final perpendicular angle
      let perpAngle = basePerpAngle + baseRotationAngle;
      
      // Calculate attachment point for by-molecule arrows
      // If data comes from node, attach to node surface
      // If data comes from reaction, attach to arrow midpoint
      if (dataFromNode) {
        // Data from node: start arrows from the surface of the node, not the center
        // attachmentPointX should always be set when dataFromNode is true
        if (attachmentPointX !== null && attachmentPointY !== null) {
          // Calculate the direction the arrow will curve (perpendicular to main arrow)
          let nodeSize;
          if (reaction.isProteinComplex) {
            const complexSize = PATHWAY_CONFIG.nodeSizes.proteinComplex;
            nodeSize = reaction.complexSize || { width: complexSize.width, height: complexSize.height };
          } else if (reaction.isMobileCarrier) {
            const carrierSize = PATHWAY_CONFIG.nodeSizes.mobileCarrier;
            nodeSize = { width: carrierSize.width, height: carrierSize.height };
          } else {
            const regularSize = PATHWAY_CONFIG.nodeSizes.regular;
            nodeSize = { width: regularSize.width, height: regularSize.height };
          }
          // Calculate distance from center to edge in the perpendicular direction
          // For a rounded rectangle, use half the width/height depending on angle
          const angleToX = Math.abs(Math.cos(perpAngle));
          const angleToY = Math.abs(Math.sin(perpAngle));
          const halfWidth = nodeSize.width / 2;
          const halfHeight = nodeSize.height / 2;
          // Approximate distance to edge (ellipse approximation)
          const edgeDistance = Math.sqrt((halfWidth * angleToX) ** 2 + (halfHeight * angleToY) ** 2);
          // Start from node surface in the direction the arrow will curve
          midX = attachmentPointX + edgeDistance * Math.cos(perpAngle);
          midY = attachmentPointY + edgeDistance * Math.sin(perpAngle);
        } else {
          // Fallback: use node position directly if attachmentPoint wasn't set
          console.warn(`Attachment point not set for node-based data. Reaction: ${reaction.name}, nodeId: ${reaction.nodeId}`);
          midX = reaction.position.x;
          midY = reaction.position.y;
        }
      } else if (attachmentPointX !== null) {
        // Enzyme/carrier node with reaction data: use node position
        midX = attachmentPointX;
        midY = attachmentPointY;
      } else if (isMainArrowCurved && mainArrow.fromReaction) {
        // For curved arrows with from_id, use from_id position as midpoint
        // This works even if to_id doesn't exist - by-arrows should still be drawn
        const fromNode = mainArrow.fromReaction;
        const getNodeRadius = (node) => {
          if (!node) return 30;
          if (node.isProteinComplex) return 40;
          if (node.isMobileCarrier) return 20;
          return 30;
        };
        const fromRadius = getNodeRadius(fromNode);
        // Calculate position at the edge of the from_id node (going right)
        const fromEdgeX = fromNode.position.x + fromRadius;
        const fromEdgeY = fromNode.position.y;
        
        // Use from_id edge position as the midpoint
        midX = fromEdgeX;
        midY = fromEdgeY;
      } else {
        // Regular reaction: use arrow midpoint
        midX = (coords.x1 + coords.x2) / 2;
        midY = (coords.y1 + coords.y2) / 2;
      }
      
      // Store byMoleculeAngle for later use (will rotate the whole arrow, not change shape)
      const byMoleculeRotationAngle = reaction.byMoleculeAngle !== undefined 
        ? reaction.byMoleculeAngle * Math.PI / 180 
        : 0;
      
      // Helper function to rotate a point around a center
      const rotatePoint = (x, y, centerX, centerY, angle) => {
        const dx = x - centerX;
        const dy = y - centerY;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return {
          x: centerX + dx * cos - dy * sin,
          y: centerY + dx * sin + dy * cos
        };
      };
      
      // Distance from arrow to byreactant/byproduct arrow (always use absolute distance)
      const offset = PATHWAY_CONFIG.arrowSettings.byMoleculeOffset;
      
      // Determine offset direction based on pathway configuration
      let offsetDirection = 1; // 1 = positive direction, -1 = negative direction
      if (pathway && PATHWAY_CONFIG.pathwayBehavior[pathway]) {
        const behavior = PATHWAY_CONFIG.pathwayBehavior[pathway];
        offsetDirection = behavior.offsetDirection || 1;
        
        // Special handling for citric acid cycle (calculate outward direction)
        if (behavior.calculateOutwardDirection && pathway === 'citric-acid-cycle') {
          // For citric acid cycle, arrows should face outward (away from cycle center)
          const cacReactions = this.reactions.filter(r => {
            const rPathway = this.getPathwayForReaction(r);
            return rPathway && rPathway.summary.name === PATHWAY_CONFIG.pathwayNames['citric-acid-cycle'];
          });
          if (cacReactions.length > 0) {
            const centerX = cacReactions.reduce((sum, r) => sum + r.position.x, 0) / cacReactions.length;
            const centerY = cacReactions.reduce((sum, r) => sum + r.position.y, 0) / cacReactions.length;
            
            // Calculate direction from center to arrow midpoint
            const centerToMidX = midX - centerX;
            const centerToMidY = midY - centerY;
            const centerToMidAngle = Math.atan2(centerToMidY, centerToMidX);
            
            // Choose the perpendicular direction that points outward (after 180 flip)
            const perpAngle1 = basePerpAngle + Math.PI;
            const perpAngle2 = basePerpAngle;
            
            const diff1 = Math.abs(centerToMidAngle - perpAngle1);
            const diff2 = Math.abs(centerToMidAngle - perpAngle2);
            const wrappedDiff1 = Math.min(diff1, 2 * Math.PI - diff1);
            const wrappedDiff2 = Math.min(diff2, 2 * Math.PI - diff2);
            
            perpAngle = wrappedDiff1 < wrappedDiff2 ? perpAngle1 : perpAngle2;
          }
        }
      }
      
      const finalOffset = offset * offsetDirection;
      
      // Normalize byreactant and byproduct to arrays
      // By-molecule data comes from node data (source of truth) or reaction data (fallback)
      let byreactants = [];
      if (byreactant) {
        if (typeof byreactant === 'string') {
          byreactants = byreactant.trim() !== '' ? [byreactant] : [];
        } else if (Array.isArray(byreactant)) {
          byreactants = byreactant.filter(m => m && (typeof m === 'string' ? m.trim() !== '' : m));
        } else if (byreactant.molecules) {
          // Object format: { molecules: string|array, angle?: number }
          const molecules = Array.isArray(byreactant.molecules) 
            ? byreactant.molecules 
            : [byreactant.molecules];
          byreactants = molecules.filter(m => m && (typeof m === 'string' ? m.trim() !== '' : m));
        }
      }
      
      let byproducts = [];
      if (byproduct) {
        if (typeof byproduct === 'string') {
          byproducts = byproduct.trim() !== '' ? [byproduct] : [];
        } else if (Array.isArray(byproduct)) {
          byproducts = byproduct.filter(m => m && (typeof m === 'string' ? m.trim() !== '' : m));
        } else if (byproduct.name) {
          // Object format with name property
          byproducts = [byproduct.name];
        } else if (byproduct.molecules) {
          // Object format: { molecules: string|array, angle?: number }
          const molecules = Array.isArray(byproduct.molecules) 
            ? byproduct.molecules 
            : [byproduct.molecules];
          byproducts = molecules.filter(m => m && (typeof m === 'string' ? m.trim() !== '' : m));
        }
      }
      
      // Note: displayByreactant and displayByproduct are NOT included in labels
      // They are only for the detail page, not for drawing on the map
      
      const hasByreactant = byreactants.length > 0;
      const hasByproduct = byproducts.length > 0;
      
      // If main arrow is curved, always draw the full arrow (both sides) even without data
      // hasCurvedArrow is already calculated earlier in the function
      const shouldDrawFullArrow = isMainArrowCurved || hasCurvedArrow;
      
      if (!hasByreactant && !hasByproduct && !shouldDrawFullArrow) {
        return; // Skip if neither is provided and not a curved arrow
      }
      
      // For curved arrows, treat as if both sides exist for drawing purposes
      const drawByreactant = hasByreactant || shouldDrawFullArrow;
      const drawByproduct = hasByproduct || shouldDrawFullArrow;
      
      // Generalized approach: 
      // 1. Define curve path with turning point at midpoint of main arrow
      // 2. Position by-molecules at start and end of the curve path
      
      // Distance along the main arrow for start/end points (spacing from midpoint)
      const curveSpacing = arrowLength / 2.5;
      
      // Calculate start and end points of the curve along the rotated perpendicular direction
      // These points are offset from the midpoint along the main arrow direction and perpendicular direction
      let curveStartX, curveStartY, curveEndX, curveEndY;
      
      if (drawByreactant && drawByproduct) {
        // Both exist (or curved arrow): curve goes from start point to end point, touching midpoint
        curveStartX = midX - curveSpacing * Math.cos(arrowAngle) + finalOffset * Math.cos(perpAngle);
        curveStartY = midY - curveSpacing * Math.sin(arrowAngle) + finalOffset * Math.sin(perpAngle);
        curveEndX = midX + curveSpacing * Math.cos(arrowAngle) + finalOffset * Math.cos(perpAngle);
        curveEndY = midY + curveSpacing * Math.sin(arrowAngle) + finalOffset * Math.sin(perpAngle);
      } else if (drawByreactant) {
        // Only byreactant: curve from start point to midpoint
        curveStartX = midX - curveSpacing * Math.cos(arrowAngle) + finalOffset * Math.cos(perpAngle);
        curveStartY = midY - curveSpacing * Math.sin(arrowAngle) + finalOffset * Math.sin(perpAngle);
        curveEndX = midX;
        curveEndY = midY;
      } else {
        // Only byproduct: curve from midpoint to end point
        curveStartX = midX;
        curveStartY = midY;
        curveEndX = midX + curveSpacing * Math.cos(arrowAngle) + finalOffset * Math.cos(perpAngle);
        curveEndY = midY + curveSpacing * Math.sin(arrowAngle) + finalOffset * Math.sin(perpAngle);
      }
      
      // Step 1: Draw arrows from midpoint
      // Byreactant arrow: half parabola starting at turning point (midpoint)
      // Byproduct arrow: straight line in same direction as main arrow
      
      const byArrowLength = PATHWAY_CONFIG.arrowSettings.byMoleculeLength;
      
      // Determine pathway for this reaction
      const reactionPathway = this.getPathwayForReaction(reaction);
      const isGlycolysis = reactionPathway && reactionPathway.summary && 
                          reactionPathway.summary.name === PATHWAY_CONFIG.pathwayNames['glycolysis'];
      
      // Endpoint positions will be calculated when drawing the arrows
      let byreactantEndX, byreactantEndY, byproductEndX, byproductEndY;
      let byreactantControlX, byreactantControlY;
      let byreactantStartX, byreactantStartY; // Declare outside if block for scope
      
      // Check if the specific main arrow has flipped: true (applies to all arrows)
      // Check this early so we can apply flip before rotation
      let isFlipped = false;
      if (mainArrow && mainArrow.connectionId) {
        const rawArrow = this.arrowMap.get(mainArrow.connectionId);
        if (rawArrow && rawArrow.flipped === true) {
          isFlipped = true;
        }
      }
      
      // Create the arrow group
      const uArrowGroup = this.g.append('g')
        .attr('class', 'byreactant-byproduct-arrow')
        .attr('data-reaction-step', reaction.step);
      
      // Draw arrows from midpoint
      const arrowColor = PATHWAY_CONFIG.colors.byMoleculeArrow;
      const arrowStrokeWidth = PATHWAY_CONFIG.arrowSettings.strokeWidth - 1; // Slightly thinner for by-molecules
      const arrowOpacity = PATHWAY_CONFIG.arrowSettings.strokeOpacity + 0.1; // Slightly more opaque
      
      // Draw byreactant arrow: half of x^2 parabola
      // Simple, basic parabola y = x^2
      let byreactantArrow = null;
      let byreactantPath = null;
      if (drawByreactant) {
        // Draw basic parabola y = x^2
        // Turning point at (0, 0) with horizontal tangent
        // We'll draw the right half: from (0, 0) to (x, x^2) where x > 0
        
        // For a quadratic Bezier Q(P0, P1, P2) to approximate y = x^2:
        // P0 = (0, 0) - turning point
        // P2 = (x, x^2) - endpoint
        // P1 = (x/2, 0) - control point to ensure horizontal tangent at P0
        
        // Simple coordinate system: 
        // - x-axis: opposite to main arrow direction (flipped horizontally)
        // - y-axis: perpendicular direction based on perpAngle (like citric acid cycle)
        const perpDirX = Math.cos(perpAngle);
        const perpDirY = Math.sin(perpAngle);
        
        // Byreactant arrow: start at midpoint, curve away (opposite to main arrow direction)
        // Direction should follow main arrow: byreactant always goes opposite to main arrow direction
        // Use the arrow angle directly: byreactant goes in -arrowAngle direction
        const xBase = -byArrowLength * 0.75; // Base distance (will be projected along opposite of main arrow)
        const x = xBase * arrowXScale; // Apply x_scale from arrow data (default 1.0)
        // If flipped: true and curved is false, negate y to flip relative to main arrow direction
        const yBase = (isFlipped && !isMainArrowCurved) ? -byArrowLength * 1.0 : byArrowLength * 1.0; // Height (y = x^2, scaled)
        const y = yBase * arrowYScale; // Apply y_scale from arrow data (default 1.0)
        
        // Start is at midpoint
        byreactantStartX = midX;
        byreactantStartY = midY;
        
        // Control point at (x/2, 0) - ensures horizontal tangent at start
        // x is negative, so we project it along the opposite of main arrow direction
        byreactantControlX = midX + (x / 2) * Math.cos(arrowAngle);
        byreactantControlY = midY + (x / 2) * Math.sin(arrowAngle);
        
        // Endpoint at (x, y) - follows parabola y = x^2, direction follows perpAngle
        // x is negative, so when multiplied by cos/sin of arrowAngle, it goes opposite to main arrow
        // When flipped, y is negative, which flips the perpendicular component relative to main arrow
        byreactantEndX = midX + x * Math.cos(arrowAngle) + y * perpDirX;
        byreactantEndY = midY + x * Math.sin(arrowAngle) + y * perpDirY;
        
        // Apply rotation to byreactant arrow points if byMoleculeRotationAngle is set
        if (byMoleculeRotationAngle !== 0) {
          const rotatedControl = rotatePoint(byreactantControlX, byreactantControlY, midX, midY, byMoleculeRotationAngle);
          const rotatedEnd = rotatePoint(byreactantEndX, byreactantEndY, midX, midY, byMoleculeRotationAngle);
          byreactantControlX = rotatedControl.x;
          byreactantControlY = rotatedControl.y;
          byreactantEndX = rotatedEnd.x;
          byreactantEndY = rotatedEnd.y;
        }
        
        // Create quadratic Bezier path representing half of x^2
        byreactantPath = `M ${midX} ${midY} Q ${byreactantControlX} ${byreactantControlY}, ${byreactantEndX} ${byreactantEndY}`;
        
        byreactantArrow = uArrowGroup.append('path')
          .attr('d', byreactantPath)
          .attr('fill', 'none')
          .attr('stroke', arrowColor)
          .attr('stroke-width', arrowStrokeWidth)
          .attr('stroke-opacity', arrowOpacity);
      }
      
      // Draw byproduct arrow: half parabola starting at turning point (midpoint)
      // Similar to byreactant but curving in forward direction
      let byproductArrow = null;
      let byproductPath = null;
      let byproductControlX, byproductControlY;
      if (drawByproduct) {
        // Draw basic parabola y = x^2
        // Turning point at (0, 0) with horizontal tangent
        // We'll draw the right half: from (0, 0) to (x, x^2) where x > 0
        
        // For a quadratic Bezier Q(P0, P1, P2) to approximate y = x^2:
        // P0 = (0, 0) - turning point
        // P2 = (x, x^2) - endpoint
        // P1 = (x/2, 0) - control point to ensure horizontal tangent at P0
        
        // Simple coordinate system: 
        // - x-axis: same as main arrow direction (forward)
        // - y-axis: perpendicular direction based on perpAngle (like citric acid cycle)
        const perpDirX = Math.cos(perpAngle);
        const perpDirY = Math.sin(perpAngle);
        // Byproduct arrow: follows main arrow direction (same direction as main arrow)
        // Use the arrow angle directly: byproduct goes in the same direction as main arrow
        const xBase = byArrowLength * 0.75; // Base distance (will be projected along same direction as main arrow)
        const x = xBase * arrowXScale; // Apply x_scale from arrow data (default 1.0)
        // If flipped: true and curved is false, negate y to flip relative to main arrow direction
        const yBase = (isFlipped && !isMainArrowCurved) ? -byArrowLength * 1.0 : byArrowLength * 1.0; // Height (y = x^2, scaled)
        const y = yBase * arrowYScale; // Apply y_scale from arrow data (default 1.0)
        
        // Control point at (x/2, 0) - ensures horizontal tangent at start
        // x is positive, so we project it along the same direction as main arrow
        byproductControlX = midX + (x / 2) * Math.cos(arrowAngle);
        byproductControlY = midY + (x / 2) * Math.sin(arrowAngle);
        
        // Endpoint at (x, y) - follows parabola y = x^2, direction follows perpAngle
        // x is positive, so when multiplied by cos/sin of arrowAngle, it goes same direction as main arrow
        // When flipped, y is negative, which flips the perpendicular component relative to main arrow
        byproductEndX = midX + x * Math.cos(arrowAngle) + y * perpDirX;
        byproductEndY = midY + x * Math.sin(arrowAngle) + y * perpDirY;
        
        // Apply rotation to byproduct arrow points if byMoleculeRotationAngle is set
        if (byMoleculeRotationAngle !== 0) {
          const rotatedControl = rotatePoint(byproductControlX, byproductControlY, midX, midY, byMoleculeRotationAngle);
          const rotatedEnd = rotatePoint(byproductEndX, byproductEndY, midX, midY, byMoleculeRotationAngle);
          byproductControlX = rotatedControl.x;
          byproductControlY = rotatedControl.y;
          byproductEndX = rotatedEnd.x;
          byproductEndY = rotatedEnd.y;
        }
        
        // Create quadratic Bezier path representing half of x^2
        byproductPath = `M ${midX} ${midY} Q ${byproductControlX} ${byproductControlY}, ${byproductEndX} ${byproductEndY}`;
        
        byproductArrow = uArrowGroup.append('path')
          .attr('d', byproductPath)
          .attr('fill', 'none')
          .attr('stroke', arrowColor)
          .attr('stroke-width', arrowStrokeWidth)
          .attr('stroke-opacity', arrowOpacity);
      }
      
      // For curved arrows, translate the entire by-arrow so byreactant end is at bottom of node
      if (isMainArrowCurved && mainArrow.fromReaction && drawByreactant) {
        const fromNode = mainArrow.fromReaction;
        const getNodeRadius = (node) => {
          if (!node) return 30;
          if (node.isProteinComplex) return 40;
          if (node.isMobileCarrier) return 20;
          return 30;
        };
        const nodeRadius = getNodeRadius(fromNode);
        
        // Check if the specific main arrow has flipped: true
        let isFlipped = false;
        if (mainArrow && mainArrow.connectionId) {
          const rawArrow = this.arrowMap.get(mainArrow.connectionId);
          if (rawArrow && rawArrow.flipped === true) {
            isFlipped = true;
          }
        }
        
        // If flipped: true, flip the whole by-arrow vertically (mirror across horizontal line through midpoint)
        if (isFlipped) {
          // Flip byreactant arrow points vertically
          byreactantControlY = 2 * midY - byreactantControlY;
          byreactantEndY = 2 * midY - byreactantEndY;
          
          // Flip byproduct arrow points vertically (if exists)
          if (drawByproduct) {
            byproductControlY = 2 * midY - byproductControlY;
            byproductEndY = 2 * midY - byproductEndY;
          }
          
          // Update paths with flipped points
          if (drawByreactant && byreactantPath) {
            byreactantPath = `M ${midX} ${midY} Q ${byreactantControlX} ${byreactantControlY}, ${byreactantEndX} ${byreactantEndY}`;
            byreactantArrow.attr('d', byreactantPath);
          }
          
          if (drawByproduct && byproductPath) {
            byproductPath = `M ${midX} ${midY} Q ${byproductControlX} ${byproductControlY}, ${byproductEndX} ${byproductEndY}`;
            byproductArrow.attr('d', byproductPath);
          }
        }
        
        // Calculate offset direction based on byMoleculeAngle
        // When NOT flipped:
        //   0 degrees = bottom (-90 degrees in standard math)
        //   90 degrees = left (180 degrees in standard math)
        //   180 degrees = top (90 degrees in standard math)
        //   270 degrees = right (0 degrees in standard math)
        // When flipped:
        //   0 degrees = top (90 degrees in standard math)
        //   90 degrees = right (0 degrees in standard math)
        //   180 degrees = bottom (-90 degrees in standard math)
        //   270 degrees = left (180 degrees in standard math)
        let offsetAngle = -Math.PI / 2; // Default: bottom (0 degrees = -90 degrees)
        if (reaction.byMoleculeAngle !== undefined) {
          // Normalize angle to 0-360 range
          let normalizedAngle = reaction.byMoleculeAngle % 360;
          if (normalizedAngle < 0) normalizedAngle += 360;
          
          if (isFlipped) {
            // When flipped: 0° → top (90°), 90° → right (0°), 180° → bottom (-90°), 270° → left (180°)
            // Formula: offsetAngle = (270 - normalizedAngle) * PI / 180
            // When normalizedAngle = 0: offsetAngle = 270 * PI/180 = 3*PI/2 = -PI/2 (bottom) ✓
            // When normalizedAngle = 90: offsetAngle = 180 * PI/180 = PI (left) ✓
            // When normalizedAngle = 180: offsetAngle = 90 * PI/180 = PI/2 (top) ✓
            // When normalizedAngle = 270: offsetAngle = 0 * PI/180 = 0 (right) ✓
            offsetAngle = (270 - normalizedAngle) * Math.PI / 180;
          } else {
            // When NOT flipped: 0° → bottom (-90°), 90° → left (180°), 180° → top (90°), 270° → right (0°)
            // Formula: offsetAngle = (90 - normalizedAngle) * PI / 180
            // When normalizedAngle = 0: offsetAngle = 90 * PI/180 = PI/2 (top) ✓
            // When normalizedAngle = 90: offsetAngle = 0 * PI/180 = 0 (right) ✓
            // When normalizedAngle = 180: offsetAngle = -90 * PI/180 = -PI/2 (bottom) ✓
            // When normalizedAngle = 270: offsetAngle = -180 * PI/180 = -PI = PI (left) ✓
            offsetAngle = (90 - normalizedAngle) * Math.PI / 180;
          }
        }
        
        // Calculate direction vector
        const offsetDirX = Math.cos(offsetAngle);
        const offsetDirY = Math.sin(offsetAngle);
        
        // Calculate node surface point in the offset direction
        const nodeSurfaceX = fromNode.position.x + nodeRadius * offsetDirX;
        const nodeSurfaceY = fromNode.position.y + nodeRadius * offsetDirY;
        
        // Calculate translation offset: move the byreactant end point to the node surface
        const translateX = nodeSurfaceX - byreactantEndX;
        const translateY = nodeSurfaceY - byreactantEndY;
        
        // Apply translation to all points to preserve the shape
        // Translate midpoint (start point for both arrows)
        midX += translateX;
        midY += translateY;
        
        // Translate byreactant arrow points
        byreactantControlX += translateX;
        byreactantControlY += translateY;
        byreactantEndX += translateX;
        byreactantEndY += translateY;
        
        // Translate byproduct arrow points (if byproduct exists)
        if (drawByproduct) {
          byproductControlX += translateX;
          byproductControlY += translateY;
          byproductEndX += translateX;
          byproductEndY += translateY;
        }
        
        // Update paths with translated points
        if (drawByreactant && byreactantPath) {
          byreactantPath = `M ${midX} ${midY} Q ${byreactantControlX} ${byreactantControlY}, ${byreactantEndX} ${byreactantEndY}`;
          byreactantArrow.attr('d', byreactantPath);
        }
        
        if (drawByproduct && byproductPath) {
          byproductPath = `M ${midX} ${midY} Q ${byproductControlX} ${byproductControlY}, ${byproductEndX} ${byproductEndY}`;
          byproductArrow.attr('d', byproductPath);
        }
      }
      
      // Calculate label positions based on arrow endpoints and tangent angles
      const baseLabelOffset = 10; // Base distance from arrow end to label
      
      // Helper function to estimate label width from molecules
      const estimateLabelWidth = (molecules) => {
        const fontSize = 12;
        const charWidth = 7;
        const plusText = ' + ';
        const plusTextWidth = plusText.length * charWidth;
        
        let totalWidth = 0;
        molecules.forEach((mol, idx) => {
          totalWidth += mol.length * charWidth;
          if (idx < molecules.length - 1) {
            totalWidth += plusTextWidth;
          }
        });
        
        return totalWidth;
      };
      
      // Helper function to calculate label offset with extra spacing for horizontal arrows
      const calculateLabelOffset = (tangentAngle, molecules) => {
        // Convert angle from radians to degrees
        const angleDegrees = tangentAngle * (180 / Math.PI);
        // Normalize to 0-360 range
        const normalizedAngle = ((angleDegrees % 360) + 360) % 360;
        
        // Check if arrow is facing horizontal-ish directions
        // -20 to 20 degrees (around 0 degrees, rightward)
        // 160 to 200 degrees (around 180 degrees, leftward)
        const isHorizontal = (normalizedAngle >= 0 && normalizedAngle <= 20) || 
                            (normalizedAngle >= 160 && normalizedAngle <= 200) ||
                            (normalizedAngle >= 340 && normalizedAngle <= 360); // Also handle -20 to 0 range
        
        // For horizontal arrows, add half of text length as extra offset
        const newOffset = isHorizontal ? estimateLabelWidth(molecules) / 2 + 2 : baseLabelOffset;
        
        return newOffset;
      };
      
      let byreactantLabelX, byreactantLabelY, byproductLabelX, byproductLabelY;
      
      // Calculate effective end positions for labels (accounting for stroke width)
      // For arrows with stroke, the visible end is offset by stroke width along the tangent
      // Note: Tangent angles are calculated after rotation is applied (if any)
      let byreactantTipX = byreactantEndX;
      let byreactantTipY = byreactantEndY;
      let byreactantTangentAngle = 0;
      if (drawByreactant) {
        // Standard: tangent from control to end (after rotation)
        byreactantTangentAngle = Math.atan2(byreactantEndY - byreactantControlY, byreactantEndX - byreactantControlX);
        const strokeOffset = arrowStrokeWidth;
        // Extend tip away from start
        byreactantTipX = byreactantEndX + strokeOffset * Math.cos(byreactantTangentAngle);
        byreactantTipY = byreactantEndY + strokeOffset * Math.sin(byreactantTangentAngle);
      }
      
      let byproductTipX = byproductEndX;
      let byproductTipY = byproductEndY;
      let byproductTangentAngle = 0;
      if (drawByproduct) {
        // Calculate tangent angle at endpoint (after rotation)
        // For quadratic Bezier Q(P0, P1, P2), tangent at P2 is in direction P1->P2
        // Use the same calculation for all pathways including ETC
        byproductTangentAngle = Math.atan2(byproductEndY - byproductControlY, byproductEndX - byproductControlX);
        const strokeOffset = arrowStrokeWidth;
        // Extend tip outward along tangent direction
        byproductTipX = byproductEndX + strokeOffset * Math.cos(byproductTangentAngle);
        byproductTipY = byproductEndY + strokeOffset * Math.sin(byproductTangentAngle);
      }
      
      // Generalized function to draw triangle arrowhead at the end of a line
      // Parameters:
      //   - endX, endY: End point of the arrow path
      //   - directionAngle: Direction the arrow is heading at the end (in radians)
      //   - arrowheadSize: Size of the arrowhead
      //   - rotationAngle: Optional rotation angle (if byMoleculeAngle is set)
      //   - rotationCenterX, rotationCenterY: Center point for rotation (not used when byMoleculeAngle is set)
      //   - isByproduct: Whether this is a byproduct arrowhead (needs to be mirrored when rotationAngle is set)
      // Returns: SVG polygon element
      const drawTriangleArrowhead = (endX, endY, directionAngle, arrowheadSize, rotationAngle = 0, rotationCenterX = null, rotationCenterY = null, isByproduct = false) => {
        // When byMoleculeAngle is set, the directionAngle is already calculated from the transformed (rotated) arrow
        // So it already has the correct heading angle. We should use this transformed direction directly
        // without additional rotation of the triangle shape.
        
        // Shift the triangle forward along the direction so the line doesn't pass through it
        // Move the tip forward by approximately the base distance to ensure the line ends before the triangle
        const shiftDistance = arrowheadSize * 0.25; // Shift forward along the direction
        const tipX = endX + shiftDistance * Math.cos(directionAngle);
        const tipY = endY + shiftDistance * Math.sin(directionAngle);
        
        // Use the transformed direction angle directly (it already accounts for rotation)
        const adjustedDirectionAngle = directionAngle;
        
        // Base points are positioned behind the tip, perpendicular to the arrow direction
        // The base forms a triangle with the tip pointing in the direction the arrow is heading
        const baseDistance = arrowheadSize;
        const baseWidth = arrowheadSize * 0.6; // Width of the base
        
        // Calculate perpendicular direction for base width
        const perpAngle = adjustedDirectionAngle + Math.PI / 2;
        
        // Base center point (behind the tip)
        const baseCenterX = tipX - baseDistance * Math.cos(adjustedDirectionAngle);
        const baseCenterY = tipY - baseDistance * Math.sin(adjustedDirectionAngle);
        
        // Base points (left and right of base center)
        // For byproduct arrows when rotationAngle is set, swap left/right to create mirror image
        let baseLeftX = baseCenterX - baseWidth * Math.cos(perpAngle);
        let baseLeftY = baseCenterY - baseWidth * Math.sin(perpAngle);
        let baseRightX = baseCenterX + baseWidth * Math.cos(perpAngle);
        let baseRightY = baseCenterY + baseWidth * Math.sin(perpAngle);
        
        // When byMoleculeAngle is set and this is a byproduct arrowhead, swap left/right to create mirror image
        if (rotationAngle !== 0 && isByproduct) {
          // Swap left and right base points to create mirror image
          [baseLeftX, baseRightX] = [baseRightX, baseLeftX];
          [baseLeftY, baseRightY] = [baseRightY, baseLeftY];
        }
        
        // Calculate arrowhead points
        // The triangle is positioned based on the transformed arrow's direction (directionAngle)
        // which already accounts for byMoleculeRotationAngle, so no additional rotation needed
        const arrowheadPoints = [
          [tipX, tipY], // Tip shifted forward along the transformed direction
          [baseLeftX, baseLeftY], // Left base point
          [baseRightX, baseRightY] // Right base point
        ];
        
        return uArrowGroup.append('polygon')
          .attr('points', arrowheadPoints.map(p => p.join(',')).join(' '))
          .attr('fill', arrowColor)
          .attr('fill-opacity', 1);
      };
      
      // Calculate label offsets for each arrow
      // Use hasByreactant/hasByproduct for offset calculation (needs array for width estimation)
      // But use drawByreactant/drawByproduct for positioning (based on whether arrows are drawn)
      const byreactantLabelOffset = hasByreactant ? calculateLabelOffset(byreactantTangentAngle, byreactants) : baseLabelOffset;
      const byproductLabelOffset = hasByproduct ? calculateLabelOffset(byproductTangentAngle, byproducts) : baseLabelOffset;
      
      // Calculate label positions from the rotated end points
      // When byMoleculeRotationAngle is set, the end points are already rotated,
      // so labels calculated from them are already in the correct position
      // Use drawByreactant/drawByproduct for positioning (not hasByreactant/hasByproduct)
      // This ensures labels are positioned at arrow endpoints even when arrays are empty
      if (drawByreactant && drawByproduct) {
        // Both arrows drawn: position labels at the effective end of each arrow along tangent direction
        byreactantLabelX = byreactantTipX + byreactantLabelOffset * Math.cos(byreactantTangentAngle);
        byreactantLabelY = byreactantTipY + byreactantLabelOffset * Math.sin(byreactantTangentAngle);
        byproductLabelX = byproductTipX + byproductLabelOffset * Math.cos(byproductTangentAngle);
        byproductLabelY = byproductTipY + byproductLabelOffset * Math.sin(byproductTangentAngle);
      } else if (drawByreactant) {
        // Only byreactant arrow drawn
        byreactantLabelX = byreactantTipX + byreactantLabelOffset * Math.cos(byreactantTangentAngle);
        byreactantLabelY = byreactantTipY + byreactantLabelOffset * Math.sin(byreactantTangentAngle);
        byproductLabelX = midX;
        byproductLabelY = midY;
      } else if (drawByproduct) {
        // Only byproduct arrow drawn
        byreactantLabelX = midX;
        byreactantLabelY = midY;
        byproductLabelX = byproductTipX + byproductLabelOffset * Math.cos(byproductTangentAngle);
        byproductLabelY = byproductTipY + byproductLabelOffset * Math.sin(byproductTangentAngle);
      } else {
        // Neither arrow drawn (shouldn't happen, but handle gracefully)
        byreactantLabelX = midX;
        byreactantLabelY = midY;
        byproductLabelX = midX;
        byproductLabelY = midY;
      }
      
      // Note: When byMoleculeRotationAngle is set, the arrow end points (byproductEndX/Y, byreactantEndX/Y)
      // are already rotated around midX, midY. The labels are calculated from these rotated end points,
      // so they are already in the correct position. No additional rotation needed.
      
      // Add triangle arrowhead only at the end of the byproduct arrow
      let byproductArrowhead = null;
      const arrowheadSize = PATHWAY_CONFIG.arrowSettings.arrowheadSize;
      
      // Add triangle arrowhead at the end of the byproduct arrow (only on byproduct side)
      if (drawByproduct) {
        // Use the already-calculated byproductTangentAngle which accounts for:
        // - Rotation (byMoleculeRotationAngle) if set
        // - Bezier curve tangent (control to end)
        // Draw at the actual end of the path (byproductEndX/Y), not the extended tip
        // Pass isByproduct=true to create mirror image when byMoleculeAngle is set
        byproductArrowhead = drawTriangleArrowhead(
          byproductEndX,
          byproductEndY,
          byproductTangentAngle,
          arrowheadSize,
          byMoleculeRotationAngle,
          midX,
          midY,
          true // isByproduct: true to create mirror image
        );
      }
      
      // Create invisible hit area for clicking
      const hitAreaPaths = [];
      if (hasByreactant && byreactantPath) {
        hitAreaPaths.push(byreactantPath);
      }
      if (hasByproduct && byproductPath) {
        hitAreaPaths.push(byproductPath);
      }
      
      // For curved arrows, create a hit area even if there are no by-arrows
      // This ensures curved arrows are clickable even without labels
      if (isMainArrowCurved && hitAreaPaths.length === 0) {
        // Create a simple line hit area along the arrow direction from midpoint
        const hitAreaLength = arrowLength * 0.5; // Half the arrow length for hit area
        const hitAreaStartX = midX - hitAreaLength * 0.5 * Math.cos(arrowAngle);
        const hitAreaStartY = midY - hitAreaLength * 0.5 * Math.sin(arrowAngle);
        const hitAreaEndX = midX + hitAreaLength * 0.5 * Math.cos(arrowAngle);
        const hitAreaEndY = midY + hitAreaLength * 0.5 * Math.sin(arrowAngle);
        hitAreaPaths.push(`M ${hitAreaStartX} ${hitAreaStartY} L ${hitAreaEndX} ${hitAreaEndY}`);
      }
      
      if (hitAreaPaths.length > 0) {
        const hitArea = uArrowGroup.append('path')
          .attr('d', hitAreaPaths.join(' '))
          .attr('fill', 'none')
          .attr('stroke', 'transparent')
          .attr('stroke-width', 20)
          .attr('stroke-opacity', 0)
          .attr('class', 'hit-area')
          .lower() // Put hit area behind labels so labels can be clicked
          .on('click', (event) => {
            event.stopPropagation();
            // If arrow starts from a node (not from midpoint), highlight the node instead of the reaction
            // Check if arrow starts from node: attachmentPointX is set (means we're using node position, not midpoint)
            // This happens for enzyme/carrier nodes
            const startsFromNode = attachmentPointX !== null;
            if (startsFromNode) {
              // Select the molecule/node when clicking arrow that starts from node
              const targetMolecule = reaction.substrate;
              if (targetMolecule) {
                this.selectMolecule(targetMolecule, reaction, { skipTabSwitch: false });
              }
            } else {
              // Select the reaction when clicking arrow that starts from midpoint
              this.selectReaction(reaction);
            }
          })
          .on('mouseenter', () => {
            if (byreactantArrow) byreactantArrow.attr('stroke-width', 4).attr('stroke-opacity', 1);
            if (byproductArrow) byproductArrow.attr('stroke-width', 4).attr('stroke-opacity', 1);
          })
          .on('mouseleave', () => {
            if (byreactantArrow) byreactantArrow.attr('stroke-width', arrowStrokeWidth).attr('stroke-opacity', arrowOpacity);
            if (byproductArrow) byproductArrow.attr('stroke-width', arrowStrokeWidth).attr('stroke-opacity', arrowOpacity);
          });
      }
      
      // Helper function to create clickable multi-molecule label
      const createMultiMoleculeLabel = (molecules, labelX, labelY, isByreactant) => {
        if (molecules.length === 0) return;
        
        const textBgPadding = 0; // Minimal padding for tight fit
        const fontSize = 12;
        const plusText = ' + '; // Plus sign with spaces
        
        // Create label group first (temporarily positioned to measure text)
        const labelGroup = uArrowGroup.append('g')
          .attr('class', isByreactant ? 'byreactant-label-group' : 'byproduct-label-group')
          .attr('transform', `translate(${labelX}, ${labelY})`);
        
        // Create text elements first to measure actual dimensions
        const textElements = [];
        let currentX = 0;
        const textY = 0;
        
        molecules.forEach((molecule, idx) => {
          // Add molecule text (clickable)
          const moleculeText = labelGroup.append('text')
            .attr('x', currentX)
            .attr('y', textY)
            .attr('font-size', `${fontSize}px`)
            .attr('font-weight', 'bold')
            .attr('class', 'by-molecule-label')
            .attr('text-anchor', 'start')
            .attr('dominant-baseline', 'central')
            .text(molecule)
            .on('click', (event) => {
              event.stopPropagation();
              // Always select the by-molecule when clicking its label, regardless of where arrow starts
              // If arrow starts from node, skip zoom but still show by-molecule details
              const startsFromNode = attachmentPointX !== null;
              this.selectMoleculeByName(molecule, null, { 
                skipTabSwitch: false,
                skipZoom: startsFromNode, // Don't move frame if arrow starts from node
                sourceReaction: reaction, // Pass the specific reaction where this molecule is used
                isByreactant: isByreactant // Indicate if this is a byreactant or byproduct
              });
            });
          
          textElements.push(moleculeText);
          
          // Get actual text width
          const moleculeBBox = moleculeText.node().getBBox();
          const moleculeWidth = moleculeBBox.width;
          currentX += moleculeWidth;
          
          // Add "+" separator if not last molecule
          if (idx < molecules.length - 1) {
            const plusTextElement = labelGroup.append('text')
              .attr('x', currentX)
              .attr('y', textY)
              .attr('font-size', `${fontSize}px`)
              .attr('font-weight', 'bold')
              .attr('class', 'by-molecule-label by-molecule-label-separator')
              .attr('text-anchor', 'start')
              .attr('dominant-baseline', 'central')
              .text(plusText);
            
            textElements.push(plusTextElement);
            const plusBBox = plusTextElement.node().getBBox();
            currentX += plusBBox.width;
          }
        });
        
        // Get bounding box of the entire label group to measure all text
        const groupBBox = labelGroup.node().getBBox();
        const centerX = groupBBox.x + groupBBox.width / 2;
        const centerY = groupBBox.y + groupBBox.height / 2;
        
        // Reposition all text elements to be centered
        textElements.forEach(textEl => {
          const currentX = parseFloat(textEl.attr('x'));
          const currentY = parseFloat(textEl.attr('y'));
          textEl.attr('x', currentX - centerX);
          textEl.attr('y', currentY - centerY);
        });
        
        // Remeasure bounding box from individual text elements after repositioning
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        textElements.forEach(textEl => {
          const bbox = textEl.node().getBBox();
          minX = Math.min(minX, bbox.x);
          maxX = Math.max(maxX, bbox.x + bbox.width);
          minY = Math.min(minY, bbox.y);
          maxY = Math.max(maxY, bbox.y + bbox.height);
        });
        
        const actualWidth = maxX - minX;
        const actualHeight = maxY - minY;
        
        // Create background rectangle based on actual text dimensions
        const bgRect = labelGroup.insert('rect', ':first-child') // Insert before text elements
          .attr('x', minX - textBgPadding)
          .attr('y', minY - textBgPadding)
          .attr('width', actualWidth + textBgPadding * 2)
          .attr('height', actualHeight + textBgPadding * 2)
          .attr('fill', this.getImageBgColor())
          .attr('fill-opacity', 0) // Transparent background for by-molecules
          .attr('rx', 3);
        
        // Add hover effects to text elements - background opacity only (colors handled by CSS)
        textElements.forEach(textEl => {
          if (!textEl.classed('by-molecule-label-separator')) {
            textEl
              .on('mouseenter', function() {
                const currentIsDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
                bgRect.attr('fill-opacity', currentIsDarkMode ? 0.3 : 0.1); // Slight background on hover
              })
              .on('mouseleave', function() {
                bgRect.attr('fill-opacity', 0); // Transparent background
              });
          }
        });
      };
      
      // Add byreactant label(s) if they exist and labels are not hidden
      // For curved arrows, exclude displayByreactant and displayByproduct from labels
      // Priority: arrow data > reaction data
      // Check specific hideByreactantLabels first, then fall back to hideByMoleculeLabels
      const shouldHideByreactantLabels = arrowHideByreactantLabels !== undefined
        ? arrowHideByreactantLabels
        : (reaction.hideByreactantLabels !== undefined 
          ? reaction.hideByreactantLabels 
          : (reaction.hideByMoleculeLabels || false));
      if (hasByreactant && !shouldHideByreactantLabels) {
        let labelByreactants = byreactants;
        if (isMainArrowCurved && reaction.displayByreactant) {
          // Filter out displayByreactant molecules from labels when curved
          const displayByreactantList = Array.isArray(reaction.displayByreactant) 
            ? reaction.displayByreactant 
            : (typeof reaction.displayByreactant === 'string' 
              ? [reaction.displayByreactant] 
              : (reaction.displayByreactant.molecules 
                ? (Array.isArray(reaction.displayByreactant.molecules) 
                  ? reaction.displayByreactant.molecules 
                  : [reaction.displayByreactant.molecules])
                : (reaction.displayByreactant.name ? [reaction.displayByreactant.name] : [])));
          labelByreactants = byreactants.filter(mol => !displayByreactantList.includes(mol));
        }
        if (labelByreactants.length > 0) {
          createMultiMoleculeLabel(labelByreactants, byreactantLabelX, byreactantLabelY, true);
        }
      }
      
      // Add byproduct label(s) if they exist and labels are not hidden
      // For curved arrows, exclude displayByreactant and displayByproduct from labels
      // Priority: arrow data > reaction data
      // Check specific hideByproductLabels first, then fall back to hideByMoleculeLabels
      const shouldHideByproductLabels = arrowHideByproductLabels !== undefined
        ? arrowHideByproductLabels
        : (reaction.hideByproductLabels !== undefined 
          ? reaction.hideByproductLabels 
          : (reaction.hideByMoleculeLabels || false));
      if (hasByproduct && !shouldHideByproductLabels) {
        let labelByproducts = byproducts;
        if (isMainArrowCurved && reaction.displayByproduct) {
          // Filter out displayByproduct molecules from labels when curved
          const displayByproductList = Array.isArray(reaction.displayByproduct) 
            ? reaction.displayByproduct 
            : (typeof reaction.displayByproduct === 'string' 
              ? [reaction.displayByproduct] 
              : (reaction.displayByproduct.molecules 
                ? (Array.isArray(reaction.displayByproduct.molecules) 
                  ? reaction.displayByproduct.molecules 
                  : [reaction.displayByproduct.molecules])
                : (reaction.displayByproduct.name ? [reaction.displayByproduct.name] : [])));
          labelByproducts = byproducts.filter(mol => !displayByproductList.includes(mol));
        }
        if (labelByproducts.length > 0) {
          createMultiMoleculeLabel(labelByproducts, byproductLabelX, byproductLabelY, false);
        }
      }
      
      // Raise arrows above labels so arrows appear in front
      if (byreactantArrow) byreactantArrow.raise();
      if (byproductArrow) byproductArrow.raise();
      if (byproductArrowhead) byproductArrowhead.raise();
    });
  }
  
  drawReactions() {
    // Draw reaction nodes
    const nodes = this.reactionGroups
      .append('g')
      .attr('class', 'reaction-node');
    
    // Draw shapes based on node type
    // Protein complexes: rectangles/ovals
    // Mobile carriers: smaller circles
    // Regular reactions: circles
    
    const proteinComplexes = nodes.filter(d => d.isProteinComplex);
    const mobileCarriers = nodes.filter(d => d.isMobileCarrier);
    const regularReactions = nodes.filter(d => !d.isProteinComplex && !d.isMobileCarrier);
    
      // Draw protein complexes as rounded rectangles
      proteinComplexes.each(function(d) {
        const defaultSize = PATHWAY_CONFIG.nodeSizes.proteinComplex;
        const size = d.complexSize || { width: defaultSize.width, height: defaultSize.height };
        const g = d3.select(this);
        
        // Draw rounded rectangle (oval-like shape)
        g.append('rect')
          .attr('x', -size.width / 2)
          .attr('y', -size.height / 2)
          .attr('width', size.width)
          .attr('height', size.height)
          .attr('rx', size.height / 2) // Make it oval-shaped
          .attr('ry', size.height / 2)
          .attr('fill', PATHWAY_CONFIG.colors.proteinComplex)
          .attr('stroke', PATHWAY_CONFIG.colors.proteinComplexStroke)
          .attr('stroke-width', 3)
          .attr('class', 'protein-complex');
      
      // Add complex number label
      if (d.complexNumber) {
        g.append('text')
          .attr('text-anchor', 'middle')
          .attr('x', 0)
          .attr('y', 0)
          .attr('dy', '0.35em')
          .attr('font-size', '24px')
          .attr('font-weight', 'bold')
          .attr('fill', '#000')
          .text(d.complexNumber);
      }
    });
    
    // Draw mobile carriers as smaller circles
    mobileCarriers.append('circle')
      .attr('r', PATHWAY_CONFIG.nodeSizes.mobileCarrier.radius)
      .attr('fill', PATHWAY_CONFIG.colors.proteinComplex)
      .attr('stroke', PATHWAY_CONFIG.colors.proteinComplexStroke)
      .attr('stroke-width', 2)
      .attr('class', 'mobile-carrier');
    
    // Draw regular reactions as circles
    regularReactions.append('circle')
      .attr('r', PATHWAY_CONFIG.nodeSizes.regular.radius)
      .attr('fill', PATHWAY_CONFIG.colors.reactionCircle)
      .attr('stroke', PATHWAY_CONFIG.colors.reactionCircleStroke)
      .attr('stroke-width', 2)
      .attr('class', 'reaction-circle');
    
    // Create image group for 2D structure (initially hidden)
    const imageGroups = nodes.append('g')
      .attr('class', 'molecule-image-group');
    
    // Create image placeholder that will be updated when PubChem data is fetched
    // Add background rectangle for better visibility
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    imageGroups.append('rect')
      .attr('class', 'molecule-image-bg')
      .attr('x', -55)
      .attr('y', -55)
      .attr('width', 110)
      .attr('height', 110)
      .attr('fill', this.getImageBgColor())
      .attr('stroke', isDarkMode ? '#000000' : '#dee2e6')
      .attr('stroke-width', 2)
      .attr('rx', 4);
    
    // Apply initial filter based on current theme
    const imageFilter = isDarkMode ? 'invert(1) hue-rotate(180deg)' : 'none';
    
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
    
    // Add compound name label (positioned relative to shape bottom)
    // For protein complexes: use complexSize.height/2 + 8
    // For mobile carriers: use 20 (radius) + 8 = 28
    // For regular reactions: use 30 (radius) + 8 = 38
    const labels = nodes.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', 0) // Center horizontally
      .attr('class', 'node-label')
      .attr('font-size', '16px')
      .attr('font-weight', '500')
      .text(d => {
        // For ETC protein complexes and mobile carriers, show the complex/carrier name
        if (d.isProteinComplex || d.isMobileCarrier) {
          return d.substrate?.name || d.name || 'Unknown';
        }
        
        // For source-only nodes (starting nodes like glucose), show the node name
        if (d.isSourceNode) {
          return d.substrate?.name || d.name || 'Unknown';
        }
        
        // Use node data directly from data files (source of truth)
        // The node object contains all the molecule information for this position
        let moleculeName;
        if (d.node) {
          // Use node data directly (most reliable - comes from data files)
          moleculeName = d.node.name || 'Unknown';
        } else if (d.product) {
          // Fallback to product if node not available
          moleculeName = d.product.name || 'Unknown';
        } else if (d.substrate) {
          // Fallback to substrate if neither node nor product available
          moleculeName = d.substrate.name || 'Unknown';
        } else {
          // Last fallback
          moleculeName = d.name || 'Unknown';
        }
        return splitCompoundName(moleculeName);
      });
    
    // Apply text wrapping to ALL labels (even single-word ones)
    // Position labels based on node type
    labels.each(function(d) {
      const textEl = d3.select(this);
      const originalText = textEl.text();
      
      // Calculate label y position based on node type
      let labelY;
      if (d.isProteinComplex) {
        const size = d.complexSize || { width: 80, height: 60 };
        labelY = size.height / 2 + 8; // Below the complex
      } else if (d.isMobileCarrier) {
        labelY = 20 + 8; // Below the circle (radius 20 + gap 8)
      } else {
        labelY = 38; // Regular reactions (radius 30 + gap 8)
      }
      
      // Always call wrapText to ensure consistent tspan creation
      // Limit text width to 120px to force wrapping for long names
      textEl.call(MetabolismViewer.prototype.wrapText, 120);
      
      // Set first tspan y position and dominant-baseline
      const firstTspan = textEl.select('tspan:first-child');
      if (!firstTspan.empty()) {
        firstTspan.attr('y', labelY);
        firstTspan.attr('dominant-baseline', 'hanging');
      }
      
      // Ensure all tspans have dominant-baseline='hanging' for consistency
      textEl.selectAll('tspan').attr('dominant-baseline', 'hanging');
      
      // Remove y attribute from text element (tspans handle all positioning)
      textEl.attr('y', null);
    });
  }
  
  drawETCSubArrows() {
    // Draw special subarrows for ETC complexes: H+ pumping arrows only
    // Oxidation arrows (NADH, FADH2) are now handled by the by-molecule arrow system
    const etcReactions = this.reactions.filter(r => r.etcSubArrows);
    
    if (etcReactions.length === 0) return;
    
    // Create a group for ETC subarrows - must be in the transform group (this.g) not this.svg
    // This ensures arrows move with zoom/pan
    const etcSubArrowGroup = this.g.append('g')
      .attr('class', 'etc-sub-arrows');
    
    etcReactions.forEach(reaction => {
      if (!reaction.etcSubArrows || !reaction.position) return;
      
      const complexX = reaction.position.x;
      const complexY = reaction.position.y; // This is the center Y
      const complexSize = reaction.complexSize || { width: 80, height: 60 };
      const complexHeight = complexSize.height;
      const complexWidth = complexSize.width;
      
      // Draw each subarrow defined in etcSubArrows
      Object.values(reaction.etcSubArrows).forEach(subArrow => {
        const offsetX = subArrow.offset?.x || 0;
        const arrowLength = 100; // Increased arrow length for better visibility
        
        if (subArrow.type === 'proton-pump' || subArrow.type === 'proton-flow') {
          // Blue straight arrow for H+ - passes through the CENTER of the complex
          // Always centered, not influenced by offsetX (which is for oxidation arrows)
          // Direction determined by subArrow.direction ('up' or 'down')
          const centerX = complexX; // Always use complex center, ignore offsetX
          const centerY = complexY; // Center of complex
          
          // Determine arrow direction based on data
          const isUp = subArrow.direction === 'up';
          
          // Start and end points based on direction
          // Note: In SVG, Y increases downward
          // Arrow points in the direction of H+ flow
          // For 'up' direction: H+ flows from matrix (below, higher Y) to intermembrane space (above, lower Y)
          // For 'down' direction: H+ flows from intermembrane space (above, lower Y) to matrix (below, higher Y)
          let startX, startY, endX, endY;
          if (isUp) {
            // Upward: H+ flows from matrix (below) to intermembrane space (above)
            // Arrow starts at matrix (below) and points to intermembrane space (above)
            startX = centerX;
            startY = complexY + complexHeight / 2 + arrowLength; // Start below (matrix)
            endX = centerX;
            endY = complexY - complexHeight / 2 - arrowLength; // End above (intermembrane space)
          } else {
            // Downward: H+ flows from intermembrane space (above) to matrix (below)
            // Arrow starts at intermembrane space (above) and points to matrix (below)
            startX = centerX;
            startY = complexY - complexHeight / 2 - arrowLength; // Start above (intermembrane space)
            endX = centerX;
            endY = complexY + complexHeight / 2 + arrowLength; // End below (matrix)
          }
          
          // Reverse the arrow direction (swap start and end)
          // The arrowhead marker is at the end, so we need to ensure it points in the correct direction
          const tempStartX = startX;
          const tempStartY = startY;
          startX = endX;
          startY = endY;
          endX = tempStartX;
          endY = tempStartY;
          
          // Draw straight arrow passing through the center of the complex
          const arrowPath = `M ${startX} ${startY} L ${endX} ${endY}`;
          const arrow = etcSubArrowGroup.append('path')
            .attr('d', arrowPath)
            .attr('fill', 'none')
            .attr('stroke', PATHWAY_CONFIG.colors.etcProtonArrow)
            .attr('stroke-width', 3)
            .attr('marker-end', 'url(#arrowhead-normal)')
            .attr('class', 'etc-sub-arrow etc-proton-pump')
            .on('click', (event) => {
              event.stopPropagation();
              // Highlight the node when clicking H+ arrow
              const targetMolecule = reaction.substrate;
              if (targetMolecule) {
                this.selectMolecule(targetMolecule, reaction, { skipTabSwitch: false });
              }
            });
          
          // Helper function to create clickable H+ label
          const createHPlusLabel = (x, y, text) => {
            const label = etcSubArrowGroup.append('text')
              .attr('x', x)
              .attr('y', y)
              .attr('text-anchor', 'middle')
              .attr('class', 'h-plus-label')
              .text(text)
              .on('click', (event) => {
                event.stopPropagation();
                // Select H+ molecule to show detail
                const hPlusMolecule = {
                  name: 'H⁺',
                  formula: 'H⁺',
                  id: 'h-plus',
                  description: 'Hydrogen ion (proton). In the electron transport chain, protons are pumped across the inner mitochondrial membrane to create a proton gradient that drives ATP synthesis.'
                };
                this.selectMolecule(hPlusMolecule, reaction, { skipTabSwitch: false });
              });
            return label;
          };
          
          // Add label on both sides - use count from data file
          const labelText = `${subArrow.count || ''} H⁺`;
          // Label positions based on direction
          // After reversing arrow, labels should still be at matrix (below) and intermembrane space (above)
          if (isUp) {
            // Upward: H+ flows from matrix to intermembrane space
            // Label at matrix (below, higher Y) and intermembrane space (above, lower Y)
            const matrixY = complexY + complexHeight / 2 + arrowLength;
            const intermembraneY = complexY - complexHeight / 2 - arrowLength;
            createHPlusLabel(centerX, matrixY + 20, labelText);
            createHPlusLabel(centerX, intermembraneY - 12, labelText);
          } else {
            // Downward: H+ flows from intermembrane space to matrix
            // Label at intermembrane space (above, lower Y) and matrix (below, higher Y)
            const intermembraneY = complexY - complexHeight / 2 - arrowLength;
            const matrixY = complexY + complexHeight / 2 + arrowLength;
            createHPlusLabel(centerX, intermembraneY - 12, labelText);
            createHPlusLabel(centerX, matrixY + 20, labelText);
          }
        }
      });
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
      // Always use y=38 for consistency (30 circle radius + 10px gap)
      const baseY = 38;
      
      // Clear existing text
      textEl.text(null);
      let tspan = null;
      
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        line.push(word);
        
        if (!tspan) {
          // Create first tspan only when we have content
          // ALL labels use y=38 with hanging baseline for consistent positioning
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
    
    // Cursor style is now handled by CSS
  }
  
  updateNodeDisplay(zoomLevel) {
    const zoomThreshold = 0.5; // Show images when zoomed in beyond this threshold (decreased from 1.5)
    const nodeRadius = zoomLevel >= zoomThreshold ? 55 : 30; // Larger radius when showing images
    
    // Update arrow connections to avoid overlap
    this.updateArrowConnections(zoomLevel, nodeRadius);
    
    this.reactionGroups.each(function(d) {
      const nodeGroup = d3.select(this);
      const circle = nodeGroup.select('.reaction-circle');
      const imageGroup = nodeGroup.select('.molecule-image-group');
      const bgRect = imageGroup.select('.molecule-image-bg');
      
      if (zoomLevel >= zoomThreshold) {
        // Show image, hide circle
        circle.classed('hidden', true);
        
        // Show image if it exists
        if (!imageGroup.empty()) {
          imageGroup.classed('visible', true);
        }
      } else {
        // Show circle, hide image
        circle.classed('hidden', false);
        if (!imageGroup.empty()) {
          imageGroup.classed('visible', false);
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
    const zoomThreshold = 0.5; // Decreased from 1.5 to change view mode earlier
    const radius = zoomLevel >= zoomThreshold ? nodeRadius : PATHWAY_CONFIG.nodeSizes.regular.radius;
    
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
        event.preventDefault();
        // Use node data directly from data files (source of truth)
        // The node object contains all the molecule information for this position
        // Check if reaction is an enzyme/carrier node (protein complex or mobile carrier)
        const isEnzymeOrCarrier = this.isEnzymeOrCarrierNode(d);
        
        let molecule;
        if (d.node) {
          // Use node data directly (most reliable - comes from data files)
          molecule = { id: d.node.id, name: d.node.name, formula: d.node.formula, description: d.node.description, smiles: d.node.smiles };
        } else if (isEnzymeOrCarrier) {
          // For enzyme/carrier nodes, always use the substrate from that specific reaction
          // This ensures we get the correct molecule object from the reaction, not from another pathway
          // Make sure we have a valid molecule object with all required fields
          if (d.substrate && typeof d.substrate === 'object') {
            molecule = {
              ...d.substrate,
              // Ensure we have the molecule from this specific reaction
              // This prevents lookup issues where a molecule with the same name from another pathway might be found
            };
          } else {
            molecule = d.substrate;
          }
        } else if (d.isSourceNode) {
          // For source-only nodes (like glucose), use the substrate (which is the node itself)
          molecule = d.substrate;
        } else {
          // For regular reactions positioned at product nodes, use the product (what's displayed on the node)
          // Fallback to substrate if product is not available
          molecule = d.product || d.substrate;
        }
        
        // Ensure molecule is valid before selecting
        if (molecule) {
          this.selectMolecule(molecule, d);
        } else {
          console.warn('No molecule found for reaction:', d.name, d);
        }
      })
      .on('dblclick', (event, d) => {
        event.stopPropagation();
        this.zoomToReaction(d);
      });
    
    // Cursor style is now handled by CSS (:active pseudo-class)
    
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
    
    // Reset all arrow highlighting
    this.g.selectAll('.connection')
      .attr('stroke-width', PATHWAY_CONFIG.arrowSettings.strokeWidth)
      .attr('stroke-opacity', PATHWAY_CONFIG.arrowSettings.strokeOpacity)
      .attr('stroke', PATHWAY_CONFIG.colors.secondary)
      .attr('marker-end', 'url(#arrowhead)'); // Reset marker to default
    
    // Reset all node highlights using unified function
    this.resetAllNodeHighlights();
    
    // Reset pathway button highlighting
    this.pathways.forEach(pathway => {
      if (pathway.button) {
        pathway.button.select('rect')
          .attr('fill', PATHWAY_CONFIG.colors.primary)
          .attr('stroke-width', 2);
      }
    });
    
    // Dispatch clear event to hide detail views
    const clearEvent = new CustomEvent('clear-selection');
    this.container.dispatchEvent(clearEvent);
  }
  
  getPathwayForReaction(reaction) {
    // Find which pathway this reaction belongs to
    const reactionIndex = this.reactions.indexOf(reaction);
    if (reactionIndex === -1) return null;
    
    // Find the pathway that contains this reaction
    for (const pathway of this.pathways) {
      if (reactionIndex >= pathway.startIndex && reactionIndex < pathway.endIndex) {
        return pathway;
      }
    }
    return null;
  }
  
  /**
   * Select a reaction by step number
   * Finds the reaction in the reactions array and calls selectReaction
   */
  selectReactionByStep(step, options = {}) {
    const reaction = this.reactions.find(r => r.step === step);
    if (reaction) {
      this.selectReaction(reaction, { skipTabSwitch: true });
      // Only zoom to the arrow if skipZoom is not set (for pathway tab links, skip zoom)
      if (!options.skipZoom) {
        this.zoomToReactionArrow(reaction);
      }
    } else {
      console.warn(`Reaction with step ${step} not found`);
    }
  }
  
  /**
   * Find the reaction node that visually displays a given molecule
   * @param {string} moleculeName - Name of the molecule
   * @param {string} moleculeId - ID of the molecule (optional)
   * @returns {Object|null} The reaction node that displays this molecule, or null if not found
   */
  /**
   * Check if a reaction is related to a molecule
   * @param {Object} reaction - The reaction to check
   * @param {string} moleculeName - Name of the molecule
   * @param {string} moleculeId - ID of the molecule (optional)
   * @returns {boolean} True if the reaction involves this molecule
   */
  isReactionRelatedToMolecule(reaction, moleculeName, moleculeId = null) {
    if (!reaction || !moleculeName) return false;
    
    // Check substrate
    if (reaction.substrate && 
        (reaction.substrate.name === moleculeName || 
         (moleculeId && reaction.substrate.id === moleculeId))) {
      return true;
    }
    
    // Check product
    if (reaction.product && 
        (reaction.product.name === moleculeName || 
         (moleculeId && reaction.product.id === moleculeId))) {
      return true;
    }
    
    // Check products array
    if (reaction.products && Array.isArray(reaction.products)) {
      if (reaction.products.some(p => 
          p.name === moleculeName || 
          (moleculeId && p.id === moleculeId))) {
        return true;
      }
    }
    
    // Check coSubstrate
    if (reaction.coSubstrate && 
        (reaction.coSubstrate.name === moleculeName || 
         (moleculeId && reaction.coSubstrate.id === moleculeId))) {
      return true;
    }
    
    // Check byproduct - handle string, array, object with name, and object with molecules array formats
    if (reaction.byproduct) {
      // Handle string format
      if (typeof reaction.byproduct === 'string' && reaction.byproduct.trim() !== '' && reaction.byproduct === moleculeName) {
        return true;
      }
      // Handle array format
      if (Array.isArray(reaction.byproduct)) {
        if (reaction.byproduct.some(m => 
          m === moleculeName || 
          (typeof m === 'string' && m.trim() === moleculeName) ||
          (typeof m === 'object' && m.name === moleculeName) ||
          (moleculeId && typeof m === 'object' && m.id === moleculeId)
        )) {
          return true;
        }
      }
      // Handle object with name property
      if (reaction.byproduct.name === moleculeName || 
          (moleculeId && reaction.byproduct.id === moleculeId)) {
        return true;
      }
      // Handle object with molecules array format
      if (reaction.byproduct.molecules) {
        const molecules = Array.isArray(reaction.byproduct.molecules) 
          ? reaction.byproduct.molecules 
          : [reaction.byproduct.molecules];
        if (molecules.some(m => 
          m === moleculeName || 
          (typeof m === 'string' && m.trim() === moleculeName) ||
          (typeof m === 'object' && m.name === moleculeName) ||
          (moleculeId && typeof m === 'object' && m.id === moleculeId)
        )) {
          return true;
        }
      }
    }
    
    // Check byreactant - handle string, array, and object with molecules array formats
    if (reaction.byreactant) {
      // Handle string format
      if (typeof reaction.byreactant === 'string' && reaction.byreactant.trim() !== '' && reaction.byreactant === moleculeName) {
        return true;
      }
      // Handle array format
      if (Array.isArray(reaction.byreactant)) {
        if (reaction.byreactant.some(m => 
          m === moleculeName || 
          (typeof m === 'string' && m.trim() === moleculeName) ||
          (typeof m === 'object' && m.name === moleculeName) ||
          (moleculeId && typeof m === 'object' && m.id === moleculeId)
        )) {
          return true;
        }
      }
      // Handle object with molecules array format
      if (reaction.byreactant.molecules) {
        const molecules = Array.isArray(reaction.byreactant.molecules) 
          ? reaction.byreactant.molecules 
          : [reaction.byreactant.molecules];
        if (molecules.some(m => 
          m === moleculeName || 
          (typeof m === 'string' && m.trim() === moleculeName) ||
          (typeof m === 'object' && m.name === moleculeName) ||
          (moleculeId && typeof m === 'object' && m.id === moleculeId)
        )) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  findReactionNodeForMolecule(moleculeName, moleculeId = null) {
    // First check product nodes (like Acetyl-CoA, Lipoamide) - these have their own nodes
    for (const reaction of this.reactions) {
      if (reaction.isProductNode && reaction.substrate &&
          (reaction.substrate.name === moleculeName || 
           (moleculeId && reaction.substrate.id === moleculeId))) {
        return reaction;
      }
    }
    
    // If not found in product nodes, find where the molecule is visually displayed
    const cacStartIndex = glycolysisReactions.length + pyruvateOxidationReactions.length + this.productNodeOffset;
    
    for (let i = 0; i < this.reactions.length; i++) {
      const reaction = this.reactions[i];
      
      // Skip product nodes - already checked
      if (reaction.isProductNode) continue;
      
      // Use node data directly from data files (source of truth)
      // The node object contains all the molecule information for this position
      let displayedMolecule = null;
      if (reaction.node) {
        // Use node data directly (most reliable - comes from data files)
        displayedMolecule = { id: reaction.node.id, name: reaction.node.name, formula: reaction.node.formula, description: reaction.node.description, smiles: reaction.node.smiles };
      } else if (reaction.product) {
        // Fallback to product if node not available
        displayedMolecule = reaction.product;
      } else {
        // Fallback to substrate
        displayedMolecule = reaction.substrate;
      }
      
      // Check if this is the molecule we're looking for
      if (displayedMolecule && 
          (displayedMolecule.name === moleculeName || 
           (moleculeId && displayedMolecule.id === moleculeId))) {
        return reaction;
      }
    }
    
    return null;
  }
  
  /**
   * Highlight all arrows representing a reaction
   * @param {string} reactionId - The id of the reaction (reaction_id)
   * @param {number} strokeWidth - The stroke width for the arrows (default: 4)
   */
  highlightReactionArrows(reactionId, strokeWidth = 4) {
    for (const [arrowKey, arrowData] of this.arrowDataMap.entries()) {
      const targetReactionId = arrowData.targetReaction?.id;
      if (targetReactionId === reactionId) {
        const arrowElement = this.g.select(`.connection[data-connection-id="${arrowData.connectionId}"]`);
        if (!arrowElement.empty()) {
          arrowElement
            .attr('stroke-width', strokeWidth)
            .attr('stroke-opacity', 1)
            .attr('stroke', '#ff6b6b')
            .attr('marker-end', 'url(#arrowhead-highlighted)');
        }
      }
    }
  }
  
  selectReaction(reaction, options = {}) {
    this.selectedReaction = reaction;
    this.selectedMolecule = null;
    this.selectedNode = null;
    this.selectedPathway = null;
    
    // Reset pathway button highlighting
    this.pathways.forEach(pathway => {
      if (pathway.button) {
        pathway.button.select('rect')
          .attr('fill', PATHWAY_CONFIG.colors.primary)
          .attr('stroke-width', 2);
      }
    });
    
    // Reset all arrow highlighting first
    this.g.selectAll('.connection')
      .attr('stroke-width', PATHWAY_CONFIG.arrowSettings.strokeWidth)
      .attr('stroke-opacity', PATHWAY_CONFIG.arrowSettings.strokeOpacity)
      .attr('stroke', PATHWAY_CONFIG.colors.secondary)
      .attr('marker-end', 'url(#arrowhead)'); // Reset marker to default
    
    // Highlight all arrows representing this reaction (by reaction_id, not nodeId)
    this.highlightReactionArrows(reaction.id, PATHWAY_CONFIG.arrowSettings.strokeWidthHover);
    
    this.applyReactionHighlight(reaction);
    
    // Check if this reaction has any curved arrows
    let hasCurvedArrow = false;
    if (reaction.arrowIds && reaction.arrowIds.length > 0) {
      for (const arrowId of reaction.arrowIds) {
        const rawArrow = this.arrowMap.get(arrowId);
        if (rawArrow && rawArrow.curved === true) {
          hasCurvedArrow = true;
          break;
        }
      }
    }
    // Add hasCurvedArrow property to reaction for ArrowDetail to use
    reaction.hasCurvedArrow = hasCurvedArrow;
    
    // Dispatch custom event for reaction detail view
    const detailEvent = new CustomEvent('reaction-selected', {
      detail: {
        reaction: reaction,
        skipTabSwitch: options.skipTabSwitch || false
      }
    });
    this.container.dispatchEvent(detailEvent);
    
    // Also update pathway detail panel with the pathway this reaction belongs to
    const pathway = this.getPathwayForReaction(reaction);
    if (pathway) {
      const pathwayEvent = new CustomEvent('pathway-updated', {
        detail: {
          summary: pathway.summary,
          reactions: pathway.reactions,
          pathway: pathway,
          selectedReaction: reaction, // Include the selected reaction
          selectedType: 'reaction' // Indicate this is a reaction selection
        }
      });
      this.container.dispatchEvent(pathwayEvent);
    }
  }
  
  /**
   * Reset all nodes to their default unhighlighted state
   * Works for all node types: reaction circles, protein complexes, mobile carriers, and image backgrounds
   */
  resetAllNodeHighlights() {
      // Reset regular reaction circles
      this.reactionGroups.selectAll('.reaction-circle')
        .attr('stroke-width', 2)
        .attr('stroke', PATHWAY_CONFIG.colors.reactionCircleStroke)
        .attr('fill', PATHWAY_CONFIG.colors.reactionCircle);
    
      // Reset protein complex rectangles (ETC complexes)
      this.reactionGroups.selectAll('.protein-complex')
        .attr('stroke-width', 3)
        .attr('stroke', PATHWAY_CONFIG.colors.proteinComplexStroke)
        .attr('fill', PATHWAY_CONFIG.colors.proteinComplex);
    
      // Reset mobile carrier circles (ETC mobile carriers)
      this.reactionGroups.selectAll('.mobile-carrier')
        .attr('stroke-width', 2)
        .attr('stroke', PATHWAY_CONFIG.colors.proteinComplexStroke)
        .attr('fill', PATHWAY_CONFIG.colors.proteinComplex);
    
    // Reset image backgrounds
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    this.reactionGroups.selectAll('.molecule-image-bg')
      .attr('stroke', isDarkMode ? '#000000' : '#dee2e6')
      .attr('stroke-width', 2)
      .attr('fill', this.getImageBgColor());
  }
  
  /**
   * Apply highlighting styles to a node group based on color type
   * @param {d3.Selection} nodeGroup - D3 selection of the node group to highlight
   * @param {string} colorType - 'default' (selection), 'reactant', or 'product'
   */
  applyNodeHighlightStyle(nodeGroup, colorType = 'default') {
    // Color schemes for different highlight types
    const colors = {
      default: {
        stroke: PATHWAY_CONFIG.colors.reactant,
        fill: PATHWAY_CONFIG.colors.reactantFill,
        bgStroke: PATHWAY_CONFIG.colors.reactant,
        bgFill: '#f0fdfa'
      },
      reactant: {
        stroke: PATHWAY_CONFIG.colors.reactant,
        fill: PATHWAY_CONFIG.colors.reactantFill,
        bgStroke: PATHWAY_CONFIG.colors.reactant,
        bgFill: '#f0fdfa'
      },
      product: {
        stroke: PATHWAY_CONFIG.colors.product,
        fill: PATHWAY_CONFIG.colors.productFill,
        bgStroke: PATHWAY_CONFIG.colors.product,
        bgFill: this.getHighlightImageBgColor()
      }
    };
    
    const color = colors[colorType] || colors.default;
    
    // Apply highlighting to all node types (works for ETC and other pathways)
    nodeGroup.select('.reaction-circle')
      .attr('stroke-width', 4)
      .attr('stroke', color.stroke)
      .attr('fill', color.fill);
    
    nodeGroup.select('.protein-complex')
      .attr('stroke-width', 4)
      .attr('stroke', color.stroke)
      .attr('fill', color.fill);
    
    nodeGroup.select('.mobile-carrier')
      .attr('stroke-width', 4)
      .attr('stroke', color.stroke)
      .attr('fill', color.fill);
    
    nodeGroup.select('.molecule-image-bg')
      .attr('stroke', color.bgStroke)
      .attr('stroke-width', 4)
      .attr('fill', color.bgFill);
  }
  
  /**
   * Highlight a node by nodeId with specified color type
   * Works for all pathways (ETC and others) and all node types
   * @param {string} nodeId - The nodeId to highlight
   * @param {string} colorType - 'default' (selection), 'reactant', or 'product'
   */
  highlightNode(nodeId, colorType = 'product') {
    const node = this.nodeMap.get(nodeId);
    if (!node) return;
    
    const nodeGroup = this.reactionGroups.filter(d => d === node);
    this.applyNodeHighlightStyle(nodeGroup, colorType);
  }
  
  applyReactionHighlight(reaction) {
    // Reset all node highlights using unified function
    this.resetAllNodeHighlights();
    
    // Reset arrow connections
    this.g.selectAll('.connection')
      .attr('stroke-width', 4)
      .attr('stroke-opacity', 0.7);
    
    // Find ALL arrows that represent this reaction (to handle multiple products)
    // Collect all unique reactant and product nodes
    const reactantNodeIds = new Set();
    const productNodeIds = new Set();
    
    // Define excluded molecules for specific reactions (molecules that should not be highlighted as reactants)
    const excludedReactants = new Map();
    
    // Search for all arrows with this target reaction
    // Compare by nodeId to handle cases where reaction objects are different references
    const reactionNodeId = reaction.nodeId;
    for (const [arrowKey, data] of this.arrowDataMap.entries()) {
      const targetReactionNodeId = data.targetReaction?.nodeId;
      if (targetReactionNodeId === reactionNodeId) {
        // Check if the reactant node should be highlighted
        // The reactant can be displayed on either fromNode (the reaction node) or toNode (next node)
        // Check both to find where the reactant molecule is actually displayed
        const fromNode = this.nodeMap.get(data.fromNodeId);
        const toNode = this.nodeMap.get(data.toNodeId);
        const reactantMoleculeId = data.reactantMoleculeId;
        
        if (reactantMoleculeId) {
          // Check if reactant is displayed on fromNode (as substrate or byreactant)
          if (fromNode) {
            const fromNodeSubstrateId = fromNode.substrate?.id;
            const fromNodeByreactant = fromNode.byreactant;
            
            // For ETC complexes: if reactantMoleculeId matches the complex substrate ID, highlight the complex node
            // This handles cases where the arrow's reactant is the complex itself (e.g., 'complex_i', 'complex_ii')
            if (fromNodeSubstrateId === reactantMoleculeId) {
              if (!excludedReactants.has(fromNodeSubstrateId)) {
                reactantNodeIds.add(data.fromNodeId);
              }
            }
            // Check if reactant matches byreactant (for cases where NADH/FADH₂ are the reactants)
            // Handle case-insensitive comparison and normalize molecule names
            else if (fromNodeByreactant) {
              const byreactantArray = Array.isArray(fromNodeByreactant) ? fromNodeByreactant : [fromNodeByreactant];
              const normalizedReactantId = reactantMoleculeId.toLowerCase();
              const matchesByreactant = byreactantArray.some(br => {
                const normalizedBr = typeof br === 'string' ? br.toLowerCase() : br;
                return normalizedBr === normalizedReactantId || 
                       normalizedBr === reactantMoleculeId ||
                       br === reactantMoleculeId;
              });
              if (matchesByreactant) {
                if (!excludedReactants.has(reactantMoleculeId)) {
                  reactantNodeIds.add(data.fromNodeId);
                }
              }
            }
            // Fallback: for ETC complexes, if this is the fromNode and no other match, highlight it
            else if (fromNode.isProteinComplex && fromNode.nodeId === data.fromNodeId) {
              reactantNodeIds.add(data.fromNodeId);
            }
          }
          
          // Check if reactant is displayed on toNode (as substrate or byreactant)
          if (toNode) {
            const toNodeSubstrateId = toNode.substrate?.id;
            const toNodeByreactant = toNode.byreactant;
            // Check if reactant matches substrate
            if (toNodeSubstrateId === reactantMoleculeId) {
              if (!excludedReactants.has(toNodeSubstrateId)) {
                reactantNodeIds.add(data.toNodeId);
              }
            }
            // Check if reactant matches byreactant
            // Handle case-insensitive comparison and normalize molecule names
            else if (toNodeByreactant) {
              const byreactantArray = Array.isArray(toNodeByreactant) ? toNodeByreactant : [toNodeByreactant];
              const normalizedReactantId = reactantMoleculeId.toLowerCase();
              const matchesByreactant = byreactantArray.some(br => {
                const normalizedBr = typeof br === 'string' ? br.toLowerCase() : br;
                return normalizedBr === normalizedReactantId || 
                       normalizedBr === reactantMoleculeId ||
                       br === reactantMoleculeId;
              });
              if (matchesByreactant) {
                if (!excludedReactants.has(reactantMoleculeId)) {
                  reactantNodeIds.add(data.toNodeId);
                }
              }
            }
          }
        } else {
          // No specific reactant molecule ID, fallback to fromNode (legacy behavior)
          if (fromNode) {
            const nodeSubstrateId = fromNode.substrate?.id;
            if (!excludedReactants.has(nodeSubstrateId)) {
              reactantNodeIds.add(data.fromNodeId);
            }
          } else {
            reactantNodeIds.add(data.fromNodeId);
          }
        }
        
        // For product node, find where the product molecule is actually displayed
        // In pyruvate oxidation and glycolysis, nodes show substrates, so the product
        // is displayed on the next node (where it becomes the substrate)
        if (data.productMoleculeId) {
          // Find the next reaction after this one that uses the product as substrate
          const reactionIndex = this.reactions.indexOf(reaction);
          const nextNode = this.reactions.slice(reactionIndex + 1).find(r => 
            r.substrate?.id === data.productMoleculeId
          );
          if (nextNode) {
            productNodeIds.add(nextNode.nodeId);
          } else {
            // Fallback to toNodeId if we can't find where product is displayed
            productNodeIds.add(data.toNodeId);
          }
        } else {
          // Fallback to toNodeId if no product molecule ID
          productNodeIds.add(data.toNodeId);
        }
      }
    }
    
    // If no arrows found, try fallback logic
    if (reactantNodeIds.size === 0 && productNodeIds.size === 0) {
      const reactionIndex = this.reactions.indexOf(reaction);
      if (reactionIndex >= 0 && reactionIndex < this.reactions.length - 1) {
        const nextNode = this.reactions[reactionIndex + 1];
        if (!nextNode.isProductNode) {
          reactantNodeIds.add(reaction.nodeId);
          productNodeIds.add(nextNode.nodeId);
        }
      }
    }
    
    // Special handling for CAC Step 1 (Citrate Formation) - Step 15
    // For CAC reactions, nodes display the previous reaction's product, not the substrate
    // So we need to ensure Step 15 node (displaying Oxaloacetate) is highlighted as reactant
    const cacStartIndex = glycolysisReactions.length + pyruvateOxidationReactions.length + this.productNodeOffset;
    const cacStep1Config = PATHWAY_CONFIG.specialReactions['rxn_cac_1'];
    const isCACStep1 = cacStep1Config && reaction.step === cacStep1Config.step && this.reactions.indexOf(reaction) === cacStartIndex;
    
    if (isCACStep1) {
      // Ensure Step 1 node (Oxaloacetate) is in reactant list, not product list
      productNodeIds.delete(reaction.nodeId);
      reactantNodeIds.add(reaction.nodeId);
      
      // Also ensure Acetyl-CoA node is in reactant list if not already there
      const acetylCoaNode = this.reactions.find(r => r.isProductNode && r.substrate?.id === 'acetyl-coa');
      if (acetylCoaNode) {
        reactantNodeIds.add(acetylCoaNode.nodeId);
        productNodeIds.delete(acetylCoaNode.nodeId);
      }
    }
    
    // Special handling for Pyruvate Oxidation Step 4 (Lipoamide Regeneration) - Step 14
    // The reactant (Dihydrolipoamide) is displayed on Step 4's own node, but the arrow from
    // Acetyl-CoA doesn't match it, so we need to ensure Step 4's node is highlighted as reactant
    const glycolysisLength_local = glycolysisReactions.length;
    const pyruvateOxStep4Index = glycolysisLength_local + 4; // Step 4 is at index glycolysisLength + 4
    const pyruvateStep3Config = PATHWAY_CONFIG.specialReactions['rxn_pyruvate_3'];
    const isPyruvateOxStep4 = pyruvateStep3Config && reaction.step === pyruvateStep3Config.step && this.reactions.indexOf(reaction) === pyruvateOxStep4Index;
    
    if (isPyruvateOxStep4) {
      // Ensure Step 4 node (displaying Dihydrolipoamide as substrate) is in reactant list
      productNodeIds.delete(reaction.nodeId);
      reactantNodeIds.add(reaction.nodeId);
    }
    
    // Highlight all reactant nodes in blue
    reactantNodeIds.forEach(nodeId => {
      this.highlightNode(nodeId, 'reactant');
    });
    
    // Highlight all product nodes in red
    productNodeIds.forEach(nodeId => {
      this.highlightNode(nodeId, 'product');
    });
  }
  
  /**
   * Select a molecule by name/id
   * Finds the reaction node that visually displays this molecule and calls selectMolecule
   * For CAC reactions, nodes display the previous reaction's product, not the substrate
   */
  selectMoleculeByName(moleculeName, moleculeId, options = {}) {
    // If sourceReaction is provided, prioritize that reaction
    const sourceReaction = options.sourceReaction;
    const isByreactant = options.isByreactant;
    // For by-molecules, always skip zoom unless explicitly overridden
    const skipZoomForByMolecules = options.skipZoom !== undefined ? options.skipZoom : true;
    
    // Note: Removed special handling for byreactants/coSubstrates/byproducts
    // All molecules now use the unified detail page with PubChem data
    // The sourceReaction is still passed but won't create special detail views
    
    // First check product nodes (like Acetyl-CoA, Lipoamide) - these have their own nodes
    let targetReaction = null;
    let targetMolecule = null;
    
    for (const reaction of this.reactions) {
      if (reaction.isProductNode && reaction.substrate &&
          (reaction.substrate.name === moleculeName || 
           (moleculeId && reaction.substrate.id === moleculeId))) {
        targetReaction = reaction;
        targetMolecule = reaction.substrate;
        break;
      }
    }
    
    // If not found in product nodes, find where the molecule is visually displayed
    if (!targetReaction) {
      // Calculate CAC start index and ETC start index
      const cacStartIndex = glycolysisReactions.length + pyruvateOxidationReactions.length + this.productNodeOffset;
      const etcStartIndex = cacStartIndex + citricAcidCycleReactions.length;
      const etcEndIndex = etcStartIndex + electronTransportChainReactions.length;
      
      for (let i = 0; i < this.reactions.length; i++) {
        const reaction = this.reactions[i];
        
        // Skip product nodes - already checked
        if (reaction.isProductNode) continue;
        
        const isCACReaction = i >= cacStartIndex && i < etcStartIndex;
        const isETCReaction = i >= etcStartIndex && i < etcEndIndex;
        let displayedMolecule = null;
        
        // Use node data directly from data files (source of truth)
        // The node object contains all the molecule information for this position
        if (reaction.node) {
          // Use node data directly (most reliable - comes from data files)
          displayedMolecule = { id: reaction.node.id, name: reaction.node.name, formula: reaction.node.formula, description: reaction.node.description, smiles: reaction.node.smiles };
        } else if (reaction.product) {
          // Fallback to product if node not available
          displayedMolecule = reaction.product;
        } else {
          // Fallback to substrate
          displayedMolecule = reaction.substrate;
        }
        
        // Check if this is the molecule we're looking for
        if (displayedMolecule && 
            (displayedMolecule.name === moleculeName || 
             (moleculeId && displayedMolecule.id === moleculeId))) {
          targetReaction = reaction;
          targetMolecule = displayedMolecule;
          break;
        }
        
        // Also check if molecule is a product of this reaction and find where it's displayed next
        if (reaction.product && 
            (reaction.product.name === moleculeName || 
             (moleculeId && reaction.product.id === moleculeId))) {
          // Product is displayed on the next reaction node that uses it as substrate
          const productId = reaction.product.id || moleculeId;
          
          // Find the next reaction that uses this product as substrate
          const nextReaction = this.reactions.slice(i + 1).find(r => {
            if (r.isProductNode) return false;
            
            // Use node data directly from data files (source of truth)
            let nextDisplayedMolecule = null;
            if (r.node) {
              // Use node data directly (most reliable - comes from data files)
              nextDisplayedMolecule = { id: r.node.id, name: r.node.name, formula: r.node.formula, description: r.node.description, smiles: r.node.smiles };
            } else if (r.product) {
              // Fallback to product if node not available
              nextDisplayedMolecule = r.product;
            } else {
              // Fallback to substrate
              nextDisplayedMolecule = r.substrate;
            }
            
            return nextDisplayedMolecule && (nextDisplayedMolecule.id === productId || nextDisplayedMolecule.name === moleculeName);
          });
          
          if (nextReaction) {
            // Use node data directly from data files (source of truth)
            targetReaction = nextReaction;
            if (nextReaction.node) {
              // Use node data directly (most reliable - comes from data files)
              targetMolecule = { id: nextReaction.node.id, name: nextReaction.node.name, formula: nextReaction.node.formula, description: nextReaction.node.description, smiles: nextReaction.node.smiles };
            } else if (nextReaction.product) {
              // Fallback to product if node not available
              targetMolecule = nextReaction.product;
            } else {
              // Fallback to substrate
              targetMolecule = nextReaction.substrate;
            }
          } else {
            // Fallback: check product nodes
            const productNode = this.reactions.find(r => 
              r.isProductNode && r.substrate && 
              (r.substrate.id === productId || r.substrate.name === moleculeName)
            );
            if (productNode) {
              targetReaction = productNode;
              targetMolecule = productNode.substrate;
            } else {
              // Last resort: use the reaction that produces it
              targetReaction = reaction;
              targetMolecule = reaction.product;
            }
          }
          break;
        }
        
        // Check if molecule is in products array
        if (reaction.products && Array.isArray(reaction.products)) {
          const product = reaction.products.find(p => 
            p.name === moleculeName || (moleculeId && p.id === moleculeId)
          );
          if (product) {
            // Similar logic as above for single product
            const productId = product.id || moleculeId;
            const nextReaction = this.reactions.slice(i + 1).find(r => {
              if (r.isProductNode) return false;
              
              // Use node data directly from data files (source of truth)
              let nextDisplayedMolecule = null;
              if (r.node) {
                // Use node data directly (most reliable - comes from data files)
                nextDisplayedMolecule = { id: r.node.id, name: r.node.name, formula: r.node.formula, description: r.node.description, smiles: r.node.smiles };
              } else if (r.product) {
                // Fallback to product if node not available
                nextDisplayedMolecule = r.product;
              } else {
                // Fallback to substrate
                nextDisplayedMolecule = r.substrate;
              }
              
              return nextDisplayedMolecule && (nextDisplayedMolecule.id === productId || nextDisplayedMolecule.name === moleculeName);
            });
            
            if (nextReaction) {
              // Use node data directly from data files (source of truth)
              targetReaction = nextReaction;
              if (nextReaction.node) {
                // Use node data directly (most reliable - comes from data files)
                targetMolecule = { id: nextReaction.node.id, name: nextReaction.node.name, formula: nextReaction.node.formula, description: nextReaction.node.description, smiles: nextReaction.node.smiles };
              } else if (nextReaction.product) {
                // Fallback to product if node not available
                targetMolecule = nextReaction.product;
              } else {
                // Fallback to substrate
                targetMolecule = nextReaction.substrate;
              }
            } else {
              const productNode = this.reactions.find(r => 
                r.isProductNode && r.substrate && 
                (r.substrate.id === productId || r.substrate.name === moleculeName)
              );
              if (productNode) {
                targetReaction = productNode;
                targetMolecule = productNode.substrate;
              } else {
                targetReaction = reaction;
                targetMolecule = product;
              }
            }
            break;
          }
        }
      }
    }
    
    // If not found in main molecules, search in coSubstrates and byproducts
    // If sourceReaction is provided, check it first
    // For by-molecules without a sourceReaction, we should find all reactions where they appear
    // rather than zooming to a specific node (since they don't have dedicated nodes)
    if (!targetReaction || !targetMolecule) {
      // List of common by-molecules that don't have dedicated nodes
      const commonByMolecules = PATHWAY_CONFIG.commonByMolecules;
      const isCommonByMolecule = commonByMolecules.includes(moleculeName);
      
      // If this is a common by-molecule, always find all reactions where it appears 
      // and highlight them instead of zooming to a node (regardless of sourceReaction)
      // Common by-molecules don't have dedicated nodes, so we should never zoom to a specific node
      if (isCommonByMolecule) {
        // Force skipZoom for common by-molecules to prevent any zoom behavior
        options.skipZoom = true;
        
        const reactionsWithMolecule = [];
        let moleculeInfo = null;
        
        for (const reaction of this.reactions) {
          // Check coSubstrate
          if (reaction.coSubstrate && 
              (reaction.coSubstrate.name === moleculeName || 
               (moleculeId && reaction.coSubstrate.id === moleculeId))) {
            reactionsWithMolecule.push(reaction);
            if (!moleculeInfo) {
              moleculeInfo = {
                name: reaction.coSubstrate.name,
                formula: reaction.coSubstrate.formula || '',
                id: reaction.coSubstrate.id || moleculeName.toLowerCase().replace(/\s+/g, '-').replace(/⁺/g, '+'),
                description: '' // Let PubChem provide the description
              };
            } else {
              // Merge: use formula/id from this reaction if current one is missing
              if (!moleculeInfo.formula && reaction.coSubstrate.formula) {
                moleculeInfo.formula = reaction.coSubstrate.formula;
              }
              if (!moleculeInfo.id && reaction.coSubstrate.id) {
                moleculeInfo.id = reaction.coSubstrate.id;
              }
            }
          }
          // Check byproduct
          else if (reaction.byproduct) {
            let matches = false;
            let byproductFormula = '';
            let byproductId = null;
            
            if (typeof reaction.byproduct === 'string' && reaction.byproduct === moleculeName) {
              matches = true;
            } else if (Array.isArray(reaction.byproduct) && reaction.byproduct.includes(moleculeName)) {
              matches = true;
            } else if (reaction.byproduct.molecules) {
              const molecules = Array.isArray(reaction.byproduct.molecules) 
                ? reaction.byproduct.molecules 
                : [reaction.byproduct.molecules];
              if (molecules.includes(moleculeName)) {
                matches = true;
              }
            } else if (reaction.byproduct.name === moleculeName || 
                      (moleculeId && reaction.byproduct.id === moleculeId)) {
              matches = true;
              byproductFormula = reaction.byproduct.formula || '';
              byproductId = reaction.byproduct.id;
            }
            
            if (matches) {
              reactionsWithMolecule.push(reaction);
              if (!moleculeInfo) {
                moleculeInfo = {
                  name: moleculeName,
                  formula: byproductFormula,
                  id: byproductId || moleculeId || moleculeName.toLowerCase().replace(/\s+/g, '-').replace(/⁺/g, '+'),
                  description: '' // Let PubChem provide the description
                };
              } else {
                // Merge: use formula/id from this reaction if current one is missing
                if (!moleculeInfo.formula && byproductFormula) {
                  moleculeInfo.formula = byproductFormula;
                }
                if (!moleculeInfo.id && byproductId) {
                  moleculeInfo.id = byproductId;
                }
              }
            }
          }
          // Check byreactant
          else if (reaction.byreactant) {
            let matches = false;
            let byreactantFormula = '';
            let byreactantId = null;
            
            if (typeof reaction.byreactant === 'string' && reaction.byreactant === moleculeName) {
              matches = true;
            } else if (Array.isArray(reaction.byreactant) && reaction.byreactant.includes(moleculeName)) {
              matches = true;
            } else if (reaction.byreactant.molecules) {
              const molecules = Array.isArray(reaction.byreactant.molecules) 
                ? reaction.byreactant.molecules 
                : [reaction.byreactant.molecules];
              if (molecules.includes(moleculeName)) {
                matches = true;
              }
            } else if (reaction.byreactant.name === moleculeName) {
              matches = true;
              byreactantFormula = reaction.byreactant.formula || '';
              byreactantId = reaction.byreactant.id;
            }
            
            if (matches) {
              reactionsWithMolecule.push(reaction);
              // Try to get formula from coSubstrate if byreactant matches coSubstrate
              if (!byreactantFormula && reaction.coSubstrate && reaction.coSubstrate.name === moleculeName) {
                byreactantFormula = reaction.coSubstrate.formula || '';
                byreactantId = reaction.coSubstrate.id;
              }
              
              if (!moleculeInfo) {
                moleculeInfo = {
                  name: moleculeName,
                  formula: byreactantFormula,
                  id: byreactantId || moleculeId || moleculeName.toLowerCase().replace(/\s+/g, '-').replace(/⁺/g, '+'),
                  description: '' // Let PubChem provide the description
                };
              } else {
                // Merge: use formula/id from this reaction if current one is missing
                if (!moleculeInfo.formula && byreactantFormula) {
                  moleculeInfo.formula = byreactantFormula;
                }
                if (!moleculeInfo.id && byreactantId) {
                  moleculeInfo.id = byreactantId;
                }
              }
            }
          }
        }
        
        // Also check arrow data for byproducts/byreactants (for curved arrows)
        // This is needed because curved arrows can have byproducts in arrow data, not reaction data
        if (this.arrowMap && (reactionsWithMolecule.length === 0 || !moleculeInfo)) {
          for (const [arrowId, rawArrow] of this.arrowMap.entries()) {
            if (!rawArrow.reaction_id) continue;
            
            // Find the reaction for this arrow
            const reaction = this.reactions.find(r => r.id === rawArrow.reaction_id);
            if (!reaction || reactionsWithMolecule.includes(reaction)) continue;
            
            // Check byproduct in arrow data
            if (rawArrow.byproduct) {
              let matches = false;
              if (typeof rawArrow.byproduct === 'string' && rawArrow.byproduct === moleculeName) {
                matches = true;
              } else if (Array.isArray(rawArrow.byproduct) && rawArrow.byproduct.includes(moleculeName)) {
                matches = true;
              } else if (rawArrow.byproduct.molecules) {
                const molecules = Array.isArray(rawArrow.byproduct.molecules) 
                  ? rawArrow.byproduct.molecules 
                  : [rawArrow.byproduct.molecules];
                if (molecules.includes(moleculeName)) {
                  matches = true;
                }
              } else if (rawArrow.byproduct.name === moleculeName) {
                matches = true;
              }
              
              if (matches) {
                reactionsWithMolecule.push(reaction);
                if (!moleculeInfo) {
                  moleculeInfo = {
                    name: moleculeName,
                    formula: rawArrow.byproduct.formula || '',
                    id: rawArrow.byproduct.id || moleculeId || moleculeName.toLowerCase().replace(/\s+/g, '-').replace(/⁺/g, '+'),
                    description: ''
                  };
                }
              }
            }
            
            // Check byreactant in arrow data
            if (rawArrow.byreactant) {
              let matches = false;
              if (typeof rawArrow.byreactant === 'string' && rawArrow.byreactant === moleculeName) {
                matches = true;
              } else if (Array.isArray(rawArrow.byreactant) && rawArrow.byreactant.includes(moleculeName)) {
                matches = true;
              } else if (rawArrow.byreactant.molecules) {
                const molecules = Array.isArray(rawArrow.byreactant.molecules) 
                  ? rawArrow.byreactant.molecules 
                  : [rawArrow.byreactant.molecules];
                if (molecules.includes(moleculeName)) {
                  matches = true;
                }
              } else if (rawArrow.byreactant.name === moleculeName) {
                matches = true;
              }
              
              if (matches && !reactionsWithMolecule.includes(reaction)) {
                reactionsWithMolecule.push(reaction);
                if (!moleculeInfo) {
                  moleculeInfo = {
                    name: moleculeName,
                    formula: rawArrow.byreactant.formula || '',
                    id: rawArrow.byreactant.id || moleculeId || moleculeName.toLowerCase().replace(/\s+/g, '-').replace(/⁺/g, '+'),
                    description: ''
                  };
                }
              }
            }
          }
        }
        
        // If we found reactions with this by-molecule, highlight them and show molecule info
        if (reactionsWithMolecule.length > 0 && moleculeInfo) {
          // Highlight all reactions where this molecule appears (highlight arrows, not nodes)
          reactionsWithMolecule.forEach(reaction => {
            this.applyReactionHighlight(reaction);
          });
          
          // Set selected molecule without highlighting any node (since by-molecules don't have dedicated nodes)
          this.selectedMolecule = moleculeInfo;
          this.selectedNode = null; // Don't select any node
          this.selectedReaction = null;
          
          // Check if molecule belongs to currently selected pathway (if any)
          // If so, preserve it instead of clearing
          const currentPathwayId = this.selectedPathway;
          if (currentPathwayId) {
            const currentPathway = this.pathways.find(p => p.id === currentPathwayId);
            if (currentPathway && currentPathway.reactions) {
              const isMoleculeInCurrentPathway = currentPathway.reactions.some(reaction => 
                this.isReactionRelatedToMolecule(
                  reaction,
                  moleculeInfo.name,
                  moleculeInfo.id
                )
              );
              
              // If molecule doesn't belong to current pathway, clear it
              if (!isMoleculeInCurrentPathway) {
                this.selectedPathway = null;
              }
              // Otherwise, keep selectedPathway as is
            } else {
              this.selectedPathway = null;
            }
          }
          
          // Reset all node highlighting to avoid highlighting unrelated molecules
          this.resetAllNodeHighlights();
          
          // Dispatch custom event for molecule detail view
          const detailEvent = new CustomEvent('molecule-selected', {
            detail: {
              molecule: moleculeInfo,
              skipTabSwitch: options.skipTabSwitch || false
            }
          });
          this.container.dispatchEvent(detailEvent);
          
          // Update pathway detail panel if needed
          // Check if molecule belongs to currently selected pathway first
          let pathwayToShow = null;
          
          if (currentPathwayId) {
            const currentPathway = this.pathways.find(p => p.id === currentPathwayId);
            if (currentPathway && currentPathway.reactions) {
              const isMoleculeInCurrentPathway = currentPathway.reactions.some(reaction => 
                this.isReactionRelatedToMolecule(
                  reaction,
                  moleculeInfo.name,
                  moleculeInfo.id
                )
              );
              
              // If molecule belongs to current pathway, use it
              if (isMoleculeInCurrentPathway) {
                pathwayToShow = currentPathway;
              }
            }
          }
          
          // If not in current pathway, use the first pathway where it appears
          if (!pathwayToShow && reactionsWithMolecule.length > 0) {
            pathwayToShow = this.getPathwayForReaction(reactionsWithMolecule[0]);
          }
          
          if (pathwayToShow) {
            const pathwayEvent = new CustomEvent('pathway-updated', {
              detail: {
                summary: pathwayToShow.summary,
                reactions: pathwayToShow.reactions,
                pathway: pathwayToShow,
                selectedReaction: null,
                selectedMolecule: moleculeInfo,
                selectedType: 'molecule'
              }
            });
            this.container.dispatchEvent(pathwayEvent);
          }
          
          return;
        }
      }
      
      const reactionsToCheck = sourceReaction ? [sourceReaction, ...this.reactions.filter(r => r !== sourceReaction)] : this.reactions;
      
      for (const reaction of reactionsToCheck) {
        // Check coSubstrate
        if (reaction.coSubstrate && 
            (reaction.coSubstrate.name === moleculeName || 
             (moleculeId && reaction.coSubstrate.id === moleculeId))) {
          // Create a molecule object from coSubstrate data
          targetMolecule = {
            name: reaction.coSubstrate.name,
            formula: reaction.coSubstrate.formula || '',
            id: reaction.coSubstrate.id || moleculeName.toLowerCase().replace(/\s+/g, '-').replace(/⁺/g, '+'),
            description: '' // Let PubChem provide the description
          };
          targetReaction = reaction;
          break;
        }
        
        // Check byreactant - handle both string, array, and object with molecules array formats
        if (reaction.byreactant) {
          let byreactantMatches = false;
          let byreactantName = null;
          
          // Handle string format
          if (typeof reaction.byreactant === 'string' && reaction.byreactant.trim() !== '') {
            if (reaction.byreactant === moleculeName) {
              byreactantMatches = true;
              byreactantName = reaction.byreactant;
            }
          }
          // Handle array format
          else if (Array.isArray(reaction.byreactant)) {
            const matchingMolecule = reaction.byreactant.find(m => 
              m === moleculeName || (typeof m === 'string' && m.trim() === moleculeName)
            );
            if (matchingMolecule) {
              byreactantMatches = true;
              byreactantName = typeof matchingMolecule === 'string' ? matchingMolecule : moleculeName;
            }
          }
          // Handle object with molecules array format
          else if (reaction.byreactant.molecules) {
            const molecules = Array.isArray(reaction.byreactant.molecules) 
              ? reaction.byreactant.molecules 
              : [reaction.byreactant.molecules];
            const matchingMolecule = molecules.find(m => 
              m === moleculeName || (typeof m === 'string' && m.trim() === moleculeName)
            );
            if (matchingMolecule) {
              byreactantMatches = true;
              byreactantName = typeof matchingMolecule === 'string' ? matchingMolecule : moleculeName;
            }
          }
          
          if (byreactantMatches) {
            // Try to find molecule info from coSubstrate if available
            let byreactantFormula = '';
            let byreactantId = null;
            if (reaction.coSubstrate && reaction.coSubstrate.name === byreactantName) {
              byreactantFormula = reaction.coSubstrate.formula || '';
              byreactantId = reaction.coSubstrate.id;
            }
            
            // Create a molecule object from byreactant data
            targetMolecule = {
              name: byreactantName,
              formula: byreactantFormula,
              id: byreactantId || moleculeName.toLowerCase().replace(/\s+/g, '-').replace(/⁺/g, '+'),
              description: '' // Let PubChem provide the description
            };
            targetReaction = reaction;
            break;
          }
        }
        
        // Check byproduct - handle both name and molecules array formats
        if (reaction.byproduct) {
          let byproductMatches = false;
          let byproductName = null;
          let byproductFormula = '';
          let byproductId = null;
          
          // Check if byproduct has molecules array
          if (reaction.byproduct.molecules) {
            const molecules = Array.isArray(reaction.byproduct.molecules) 
              ? reaction.byproduct.molecules 
              : [reaction.byproduct.molecules];
            const matchingMolecule = molecules.find(m => 
              m === moleculeName || (typeof m === 'string' && m.trim() === moleculeName)
            );
            if (matchingMolecule) {
              byproductMatches = true;
              byproductName = typeof matchingMolecule === 'string' ? matchingMolecule : moleculeName;
            }
          } else if (reaction.byproduct.name === moleculeName || 
                     (moleculeId && reaction.byproduct.id === moleculeId)) {
            byproductMatches = true;
            byproductName = reaction.byproduct.name;
            byproductFormula = reaction.byproduct.formula || '';
            byproductId = reaction.byproduct.id;
          }
          
          if (byproductMatches) {
            // Create a molecule object from byproduct data
            targetMolecule = {
              name: byproductName,
              formula: byproductFormula,
              id: byproductId || moleculeName.toLowerCase().replace(/\s+/g, '-').replace(/⁺/g, '+'),
              description: '' // Let PubChem provide the description
            };
            targetReaction = reaction;
            break;
          }
        }
        
        // Check cofactors for Pi (inorganic phosphate)
        // Pi is mentioned in cofactors but not always as coSubstrate
        if (moleculeName === 'Pi' && reaction.enzyme && reaction.enzyme.cofactors) {
          const hasPi = reaction.enzyme.cofactors.some(cf => 
            cf && (cf.includes('Pi') || cf.includes('inorganic phosphate') || cf === 'Pi')
          );
          if (hasPi) {
            // Create a molecule object for Pi
            targetMolecule = {
              name: 'Pi',
              formula: 'H₃PO₄',
              id: 'pi',
              description: '' // Let PubChem provide the description
            };
            targetReaction = reaction;
            break;
          }
        }
      }
    }
    
    if (targetReaction && targetMolecule) {
      // Check again if this is a common by-molecule - if so, never zoom
      const commonByMolecules = PATHWAY_CONFIG.commonByMolecules;
      const isCommonByMolecule = commonByMolecules.includes(moleculeName);
      if (isCommonByMolecule) {
        options.skipZoom = true;
      }
      
      this.selectMolecule(targetMolecule, targetReaction, options);
      // Zoom to the molecule node only if skipZoom is not set (for by-molecules, skip zoom)
      if (!options.skipZoom) {
        this.zoomToNode(targetReaction);
      }
    } else {
      console.warn(`Molecule "${moleculeName}" not found in reactions, coSubstrates, or byproducts`);
    }
  }
  
  selectMolecule(molecule, reactionNode, options = {}) {
    this.selectedMolecule = molecule;
    this.selectedNode = reactionNode;
    this.selectedReaction = null;
    
    // Determine if this is a direct node click (not a by-molecule click)
    // Only show "Substrate → Product" section for direct node clicks
    const isDirectNodeClick = options.isDirectNodeClick !== false; // Default to true unless explicitly set to false
    
    // Get the pathway for this reaction node
    const pathway = reactionNode ? this.getPathwayForReaction(reactionNode) : null;
    
    // Check if molecule belongs to the currently selected pathway (if any)
    // If so, preserve the current pathway instead of clearing it
    const currentPathwayId = this.selectedPathway;
    let pathwayToPreserve = null;
    
    if (currentPathwayId && pathway) {
      const currentPathway = this.pathways.find(p => p.id === currentPathwayId);
      if (currentPathway && currentPathway.reactions) {
        const isMoleculeInCurrentPathway = currentPathway.reactions.some(reaction => 
          this.isReactionRelatedToMolecule(
            reaction,
            molecule.name,
            molecule.id
          )
        );
        
        // If molecule belongs to current pathway, preserve it
        if (isMoleculeInCurrentPathway) {
          pathwayToPreserve = currentPathway;
          // Don't clear selectedPathway - keep it
        } else {
          // Molecule doesn't belong to current pathway, clear it
          this.selectedPathway = null;
        }
      } else {
        // No current pathway found, clear it
        this.selectedPathway = null;
      }
    } else {
      // No current pathway or no reaction node, clear it
      this.selectedPathway = null;
    }
    
    // Reset pathway button highlighting
    this.pathways.forEach(pathway => {
      if (pathway.button) {
        pathway.button.select('rect')
          .attr('fill', PATHWAY_CONFIG.colors.primary)
          .attr('stroke-width', 2);
      }
    });
    
    // Reset all arrow highlighting
    this.g.selectAll('.connection')
      .attr('stroke-width', PATHWAY_CONFIG.arrowSettings.strokeWidth)
      .attr('stroke-opacity', PATHWAY_CONFIG.arrowSettings.strokeOpacity)
      .attr('stroke', PATHWAY_CONFIG.colors.secondary)
      .attr('marker-end', 'url(#arrowhead)'); // Reset marker to default
    
    this.applyMoleculeHighlight(molecule, reactionNode);
    
    // Dispatch custom event for molecule detail view
    const detailEvent = new CustomEvent('molecule-selected', {
      detail: {
        molecule: molecule,
        reactionNode: reactionNode, // Pass reaction node for complex nodes
        skipTabSwitch: options.skipTabSwitch || false,
        isDirectNodeClick: isDirectNodeClick // Flag to indicate if this is a direct node click
      }
    });
    this.container.dispatchEvent(detailEvent);
    
    // Also update pathway detail panel
    // Use preserved pathway if molecule belongs to it, otherwise use pathway from reaction node
    const pathwayToShow = pathwayToPreserve || pathway;
    if (pathwayToShow) {
      const pathwayEvent = new CustomEvent('pathway-updated', {
        detail: {
          summary: pathwayToShow.summary,
          reactions: pathwayToShow.reactions,
          pathway: pathwayToShow,
          selectedReaction: reactionNode, // Include the selected reaction node
          selectedMolecule: molecule, // Include the selected molecule
          selectedType: 'molecule' // Indicate this is a molecule/node selection
        }
      });
      this.container.dispatchEvent(pathwayEvent);
    }
  }
  
  /**
   * Apply molecule highlight - highlights only the selected node
   * Works for all pathways (ETC and others) and all node types
   * @param {Object} molecule - The molecule object (not used for highlighting, but kept for API consistency)
   * @param {Object} reactionNode - The reaction node to highlight
   */
  applyMoleculeHighlight(molecule, reactionNode) {
    // Reset all nodes to default state (clears any previous product/reactant highlights)
    this.resetAllNodeHighlights();
    
    // Highlight only the selected node using unified function
    const selectedGroup = this.reactionGroups.filter(d => d === reactionNode);
    this.applyNodeHighlightStyle(selectedGroup, 'default');
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
  
  /**
   * Zoom to a node without selecting the reaction (for molecule selection)
   */
  zoomToNode(reactionNode) {
    const scale = 2;
    const x = this.options.width / 2 - reactionNode.position.x * scale;
    const y = this.options.height / 2 - reactionNode.position.y * scale;
    
    const transform = d3.zoomIdentity
      .translate(x, y)
      .scale(scale);
    
    this.svg.transition()
      .duration(750)
      .call(this.zoom.transform, transform);
    
    this.currentTransform = transform;
    this.currentZoom = scale;
    this.updateNodeDisplay(scale);
    // Don't call selectReaction - we're selecting a molecule, not a reaction
  }
  
  /**
   * Zoom to the arrow representing a reaction, not the node
   * Finds the first arrow representing this reaction and zooms to its midpoint
   */
  zoomToReactionArrow(reaction) {
    const reactionNodeId = reaction.nodeId;
    let targetCoords = null;
    
    // Find the first arrow representing this reaction
    for (const [arrowKey, arrowData] of this.arrowDataMap.entries()) {
      const targetReactionNodeId = arrowData.targetReaction?.nodeId;
      if (targetReactionNodeId === reactionNodeId && arrowData.coords) {
        // Calculate midpoint of the arrow
        const midpoint = calculateArrowMidpoint(arrowData.coords);
        targetCoords = midpoint;
        break; // Use the first arrow found
      }
    }
    
    // If no arrow found, fall back to node position
    if (!targetCoords) {
      targetCoords = reaction.position;
    }
    
    const scale = 2;
    const x = this.options.width / 2 - targetCoords.x * scale;
    const y = this.options.height / 2 - targetCoords.y * scale;
    
    const transform = d3.zoomIdentity
      .translate(x, y)
      .scale(scale);
    
    this.svg.transition()
      .duration(750)
      .call(this.zoom.transform, transform);
    
    this.currentTransform = transform;
    this.currentZoom = scale;
    this.updateNodeDisplay(scale);
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
    // Fetch PubChem data for all molecules to get image URLs
    const uniqueMolecules = new Map();
    const cacStartIndex = glycolysisReactions.length + pyruvateOxidationReactions.length + this.productNodeOffset;
    const cacLength = citricAcidCycleReactions.length;
    
    this.reactions.forEach((reaction, index) => {
      let molecule;
      // Use node data directly from data files (source of truth)
      if (reaction.node) {
        // Use node data directly (most reliable - comes from data files)
        // Include imageUrl if present (e.g., for ETC complexes with Wikipedia images)
        molecule = { 
          id: reaction.node.id, 
          name: reaction.node.name, 
          formula: reaction.node.formula, 
          description: reaction.node.description, 
          smiles: reaction.node.smiles,
          imageUrl: reaction.node.imageUrl // Include imageUrl from node data
        };
      } else if (reaction.product) {
        // Fallback to product if node not available
        molecule = reaction.product;
      } else if (reaction.substrate) {
        // Fallback to substrate
        molecule = reaction.substrate;
      } else {
        // Last fallback
        molecule = null;
      }
      
      if (molecule && !uniqueMolecules.has(molecule.id)) {
        uniqueMolecules.set(molecule.id, molecule);
      }
    });
    
    // Fetch images for each unique molecule
    for (const [id, molecule] of uniqueMolecules) {
      try {
        let imageUrl = null;
        
        // Check if molecule already has an imageUrl (e.g., from Wikipedia for complexes)
        if (molecule.imageUrl) {
          imageUrl = molecule.imageUrl;
        } else {
          // Use shared utility that handles normalization and alternatives
          const pubchemData = await fetchPubChemData(molecule.name, this.pubchemDataCache);
          
          if (pubchemData && pubchemData.image2DUrlSmall) {
            imageUrl = pubchemData.image2DUrlSmall;
          }
        }
        
        if (imageUrl) {
          this.moleculeImages.set(id, imageUrl);
          
          // Update all nodes on the map that use this molecule
          // Use node data directly from data files (source of truth)
          const reactions = this.reactions;
          this.reactionGroups.each(function(d) {
            let displayMolecule;
            if (d.node) {
              // Use node data directly (most reliable - comes from data files)
              // Include imageUrl if present (e.g., for ETC complexes with Wikipedia images)
              displayMolecule = { 
                id: d.node.id, 
                name: d.node.name, 
                formula: d.node.formula, 
                description: d.node.description, 
                smiles: d.node.smiles,
                imageUrl: d.node.imageUrl // Include imageUrl from node data
              };
            } else if (d.product) {
              // Fallback to product if node not available
              displayMolecule = d.product;
            } else if (d.substrate) {
              // Fallback to substrate
              displayMolecule = d.substrate;
            } else {
              // Last fallback
              displayMolecule = null;
            }
            
            // Update the image on the map node if this molecule matches
            if (displayMolecule && displayMolecule.id === id) {
              d3.select(this).select('.molecule-structure-image')
                .attr('href', imageUrl);
            }
          });
        }
      } catch (error) {
        console.warn(`Failed to fetch image for ${molecule.name}:`, error);
      }
    }
  }
  
}


