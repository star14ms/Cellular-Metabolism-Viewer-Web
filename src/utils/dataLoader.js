/**
 * Data Loader for New Data Format
 * 
 * Loads and processes the new data format:
 * - nodes: molecules, carriers, complexes
 * - reactions: enzymatic transformations
 * - arrows: connections between nodes (can reference arrow IDs for midpoints)
 */

/**
 * Load pathway data from the new format
 * @param {Object} pathwayData - Object with nodes, reactions, arrows arrays
 * @returns {Object} Processed data ready for MetabolismViewer
 */
export function loadPathwayData(pathwayData) {
  const { nodes, reactions, arrows } = pathwayData;
  
  // Create lookup maps for fast access
  const nodeMap = new Map();
  const reactionMap = new Map();
  const arrowMap = new Map();
  
  // Index nodes by ID
  nodes.forEach(node => {
    nodeMap.set(node.id, node);
  });
  
  // Index reactions by ID
  reactions.forEach(reaction => {
    reactionMap.set(reaction.id, reaction);
  });
  
  // Index arrows by ID
  arrows.forEach(arrow => {
    arrowMap.set(arrow.id, arrow);
  });
  
  // Validate arrows: check that from_id and to_id exist (either as nodes or arrows)
  arrows.forEach(arrow => {
    const fromExists = nodeMap.has(arrow.from_id) || arrowMap.has(arrow.from_id);
    const toExists = nodeMap.has(arrow.to_id) || arrowMap.has(arrow.to_id);
    
    if (!fromExists) {
      console.warn(`Arrow ${arrow.id}: from_id "${arrow.from_id}" not found in nodes or arrows`);
    }
    if (!toExists) {
      console.warn(`Arrow ${arrow.id}: to_id "${arrow.to_id}" not found in nodes or arrows`);
    }
    if (!reactionMap.has(arrow.reaction_id)) {
      console.warn(`Arrow ${arrow.id}: reaction_id "${arrow.reaction_id}" not found in reactions`);
    }
  });
  
  // Add helper methods to the returned object
  const loadedData = {
    nodes,
    reactions,
    arrows,
    nodeMap,
    reactionMap,
    arrowMap,
    getIdType: (id) => getIdType({ nodeMap, arrowMap }, id),
    getNodeById: (nodeId) => nodeMap.get(nodeId),
    getReactionById: (reactionId) => reactionMap.get(reactionId),
    getArrowById: (arrowId) => arrowMap.get(arrowId)
  };
  
  return loadedData;
}

/**
 * Get node by ID
 */
export function getNodeById(loadedData, nodeId) {
  return loadedData.nodeMap.get(nodeId);
}

/**
 * Get reaction by ID
 */
export function getReactionById(loadedData, reactionId) {
  return loadedData.reactionMap.get(reactionId);
}

/**
 * Get arrow by ID
 */
export function getArrowById(loadedData, arrowId) {
  return loadedData.arrowMap.get(arrowId);
}

/**
 * Check if an ID refers to a node or an arrow
 * @returns 'node' | 'arrow' | null
 */
export function getIdType(loadedData, id) {
  if (loadedData.nodeMap.has(id)) return 'node';
  if (loadedData.arrowMap.has(id)) return 'arrow';
  return null;
}

/**
 * Resolve arrow endpoint: if it's an arrow ID, return the midpoint coordinates
 * @param {Object} loadedData - Loaded pathway data
 * @param {string} id - Node ID or arrow ID
 * @param {Map} arrowCoordinates - Map of arrow IDs to their coordinates
 * @returns {Object} { type: 'node' | 'midpoint', node: Node | null, midpoint: {x, y} | null, arrowId: string | null }
 */
export function resolveArrowEndpoint(loadedData, id, arrowCoordinates) {
  const idType = getIdType(loadedData, id);
  
  if (idType === 'node') {
    const node = getNodeById(loadedData, id);
    return {
      type: 'node',
      node: node,
      midpoint: null,
      arrowId: null
    };
  } else if (idType === 'arrow') {
    const arrow = getArrowById(loadedData, id);
    const coords = arrowCoordinates.get(id);
    
    if (!coords) {
      console.warn(`Arrow coordinates not found for arrow ID: ${id}`);
      return {
        type: 'midpoint',
        node: null,
        midpoint: null,
        arrowId: id
      };
    }
    
    // Calculate midpoint
    const midpoint = {
      x: (coords.x1 + coords.x2) / 2,
      y: (coords.y1 + coords.y2) / 2
    };
    
    return {
      type: 'midpoint',
      node: null,
      midpoint: midpoint,
      arrowId: id
    };
  }
  
  return {
    type: null,
    node: null,
    midpoint: null,
    arrowId: null
  };
}

/**
 * Merge multiple pathway datasets
 * @param {...Object} pathwayDatas - Multiple pathway data objects
 * @returns {Object} Merged pathway data
 */
export function mergePathwayData(...pathwayDatas) {
  const merged = {
    nodes: [],
    reactions: [],
    arrows: []
  };
  
  pathwayDatas.forEach(pathwayData => {
    merged.nodes.push(...pathwayData.nodes);
    merged.reactions.push(...pathwayData.reactions);
    merged.arrows.push(...pathwayData.arrows);
  });
  
  return loadPathwayData(merged);
}

