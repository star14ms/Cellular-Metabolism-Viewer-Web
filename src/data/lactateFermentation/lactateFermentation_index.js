/**
 * Lactate Fermentation Pathway - Index
 * 
 * Exports all data for the pathway in the new format
 */

import { lactateFermentationNodes } from './lactateFermentation_nodes.js';
import { lactateFermentationReactions } from './lactateFermentation_reactions.js';
import { lactateFermentationArrows } from './lactateFermentation_arrows.js';

export const lactateFermentationData = {
  nodes: lactateFermentationNodes,
  reactions: lactateFermentationReactions,
  arrows: lactateFermentationArrows,
  summary: {
    name: 'Lactate Fermentation',
    pathwayType: 'carbohydrates',
    description: 'Anaerobic pathway that converts pyruvate to lactate, regenerating NAD⁺ for continued glycolysis',
    netProducts: {
      'Lactate': { produced: 1, consumed: 0, net: 1 },
      'NADH': { produced: 0, consumed: 1, net: -1 },
      'NAD⁺': { produced: 1, consumed: 0, net: 1 }
    }
  },
};

// Export individual components for convenience
export { lactateFermentationNodes, lactateFermentationReactions, lactateFermentationArrows };

