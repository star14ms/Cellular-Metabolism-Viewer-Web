/**
 * Multi-Product Handler
 * 
 * Automatically handles reactions that produce multiple products by:
 * 1. Detecting reactions with multiple products
 * 2. Creating primary arrows (main product)
 * 3. Creating secondary arrows from midpoints (byproducts/secondary products)
 */

/**
 * Find reactions that produce multiple products
 * A reaction has multiple products if:
 * - It has a byproduct field
 * - Multiple arrows point from it (different products)
 * - It's explicitly marked as having multiple products
 */
export function findMultiProductReactions(reactions, arrowDataMap) {
  const multiProductReactions = [];
  
  reactions.forEach((reaction, index) => {
    // Skip product nodes
    if (reaction.isProductNode) return;
    
    // Check if reaction has byproduct
    const hasByproduct = reaction.byproduct && reaction.byproduct.name;
    
    // Check how many arrows originate from this reaction
    const arrowsFromThis = Array.from(arrowDataMap.values()).filter(
      arrow => arrow.fromNodeId === reaction.nodeId
    );
    
    // Check if multiple different products are produced
    const uniqueProducts = new Set(
      arrowsFromThis.map(arrow => arrow.productMoleculeId).filter(Boolean)
    );
    
    if (hasByproduct || uniqueProducts.size > 1) {
      // Determine primary and secondary products
      const primaryProduct = reaction.product?.id;
      const secondaryProducts = [];
      
      // Add byproduct if exists
      if (hasByproduct) {
        // Find the molecule ID for byproduct (need to match by name or infer)
        // This is a simplified approach - might need refinement
        secondaryProducts.push({
          moleculeId: reaction.byproduct.name.toLowerCase().replace(/\s+/g, '-'),
          name: reaction.byproduct.name,
          type: 'byproduct'
        });
      }
      
      // Add other products from arrows
      uniqueProducts.forEach(productId => {
        if (productId !== primaryProduct) {
          secondaryProducts.push({
            moleculeId: productId,
            type: 'secondary'
          });
        }
      });
      
      if (secondaryProducts.length > 0) {
        multiProductReactions.push({
          reaction,
          reactionIndex: index,
          primaryProduct,
          secondaryProducts,
          primaryArrowConnectionId: null // Will be set when primary arrow is created
        });
      }
    }
  });
  
  return multiProductReactions;
}

/**
 * Find the primary arrow for a reaction (the main product arrow)
 */
export function findPrimaryArrow(arrowDataMap, reaction, primaryProductId) {
  // Find arrow that represents this reaction producing the primary product
  for (const [key, arrowData] of arrowDataMap.entries()) {
    if (arrowData.fromNodeId === reaction.nodeId &&
        arrowData.targetReaction?.nodeId === reaction.nodeId &&
        arrowData.productMoleculeId === primaryProductId) {
      return arrowData;
    }
  }
  
  // Fallback: find any arrow from this reaction
  for (const [key, arrowData] of arrowDataMap.entries()) {
    if (arrowData.fromNodeId === reaction.nodeId &&
        arrowData.targetReaction?.nodeId === reaction.nodeId) {
      return arrowData;
    }
  }
  
  return null;
}

/**
 * Create secondary arrow from midpoint of primary arrow
 */
export function createSecondaryArrowFromMidpoint(
  viewer,
  primaryArrow,
  fromReaction,
  toNode,
  connectionId,
  targetReaction,
  reactantId,
  productId,
  toNodePosition = null
) {
  if (!primaryArrow || !primaryArrow.coords) {
    console.warn(`Cannot create secondary arrow: primary arrow not found for ${connectionId}`);
    return null;
  }
  
  const midpoint = {
    x: (primaryArrow.coords.x1 + primaryArrow.coords.x2) / 2,
    y: (primaryArrow.coords.y1 + primaryArrow.coords.y2) / 2
  };
  
  // Calculate arrow coordinates from midpoint to target node
  const toPos = toNodePosition || toNode.position;
  const dx = toPos.x - midpoint.x;
  const dy = toPos.y - midpoint.y;
  const angle = Math.atan2(dy, dx);
  
  // Start from midpoint (offset slightly to avoid overlap)
  const startX = midpoint.x + 10 * Math.cos(angle);
  const startY = midpoint.y + 10 * Math.sin(angle);
  
  // End at target node (offset from node edge)
  const nodeRadius = 30;
  const endX = toPos.x - nodeRadius * Math.cos(angle);
  const endY = toPos.y - nodeRadius * Math.sin(angle);
  
  const coords = { x1: startX, y1: startY, x2: endX, y2: endY };
  
  // Store arrow data
  const arrowKey = `${fromReaction.nodeId}-midpoint-${toNode.nodeId}`;
  const arrowData = {
    fromNodeId: fromReaction.nodeId,
    toNodeId: toNode.nodeId,
    fromReaction: fromReaction,
    toReaction: toNode,
    targetReaction: targetReaction,
    reactantMoleculeId: reactantId,
    productMoleculeId: productId,
    coords: coords,
    connectionId: connectionId,
    isMidpointConnection: true,
    primaryArrowConnectionId: primaryArrow.connectionId
  };
  
  viewer.arrowDataMap.set(arrowKey, arrowData);
  
  // Add to reaction's arrowIds
  if (targetReaction && !targetReaction.arrowIds.includes(connectionId)) {
    targetReaction.arrowIds.push(connectionId);
  }
  
  // Create visual arrow
  const arrowResult = viewer.createArrowVisual(coords, connectionId, 'connection-midpoint', () => {
    viewer.selectReaction(targetReaction);
  });
  
  if (arrowResult && arrowResult.hitArea) {
    arrowResult.hitArea.attr('stroke-width', 30);
  }
  
  return arrowResult;
}

