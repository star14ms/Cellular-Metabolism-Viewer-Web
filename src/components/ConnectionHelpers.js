/**
 * Connection Helpers
 * 
 * Helper functions for creating and managing arrow connections between reactions
 */

/**
 * Calculate arrow coordinates between two nodes
 */
export function calculateArrowCoords(fromNode, toNode, nodeRadius = 30) {
  const dx = toNode.position.x - fromNode.position.x;
  const dy = toNode.position.y - fromNode.position.y;
  const angle = Math.atan2(dy, dx);
  
  let x1 = fromNode.position.x + nodeRadius * Math.cos(angle);
  let y1 = fromNode.position.y + nodeRadius * Math.sin(angle);
  if (dy > 0) {
    y1 = Math.min(y1, fromNode.position.y + 35);
  }
  
  let x2 = toNode.position.x - nodeRadius * Math.cos(angle);
  let y2 = toNode.position.y - nodeRadius * Math.sin(angle);
  if (dy < 0) {
    y2 = Math.max(y2, toNode.position.y - 35);
  }
  
  return { x1, y1, x2, y2 };
}

/**
 * Calculate midpoint of an arrow
 */
export function calculateArrowMidpoint(coords) {
  return {
    x: (coords.x1 + coords.x2) / 2,
    y: (coords.y1 + coords.y2) / 2
  };
}

/**
 * Find arrow data in arrowDataMap by connection ID or node IDs
 */
export function findArrowData(arrowDataMap, connectionId, fromNodeId, toNodeId, reactantId = null, productId = null) {
  // Try molecule-based key first
  if (reactantId && productId) {
    const moleculeKey = `${fromNodeId}-${toNodeId}-${reactantId}-${productId}`;
    const arrowData = arrowDataMap.get(moleculeKey);
    if (arrowData) return arrowData;
  }
  
  // Try simple key
  const simpleKey = `${fromNodeId}-${toNodeId}`;
  const simpleArrowData = arrowDataMap.get(simpleKey);
  if (simpleArrowData) return simpleArrowData;
  
  // Search by connection ID
  if (connectionId) {
    for (const [key, arrowData] of arrowDataMap.entries()) {
      if (arrowData.connectionId === connectionId) {
        return arrowData;
      }
    }
  }
  
  // Search by node IDs
  if (fromNodeId && toNodeId) {
    for (const [key, arrowData] of arrowDataMap.entries()) {
      if (arrowData.fromNodeId === fromNodeId && arrowData.toNodeId === toNodeId) {
        return arrowData;
      }
    }
  }
  
  return null;
}

/**
 * Get reaction node by step number
 */
export function getReactionByStep(reactions, step) {
  return reactions.find(r => r.step === step);
}

/**
 * Get reaction node by index offset from pathway start
 */
export function getReactionByIndex(reactions, pathwayStartIndex, offset) {
  return reactions[pathwayStartIndex + offset];
}

/**
 * Get product node by molecule ID
 */
export function getProductNode(reactions, moleculeId) {
  return reactions.find(r => r.isProductNode && r.substrate?.id === moleculeId);
}

