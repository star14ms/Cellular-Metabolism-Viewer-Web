/**
 * Fermentation Pathway - Index
 * 
 * Exports all data for the pathway in the new format
 */

import { fermentationNodes } from './fermentation_nodes.js';
import { fermentationReactions } from './fermentation_reactions.js';
import { fermentationArrows } from './fermentation_arrows.js';

export const fermentationData = {
  nodes: fermentationNodes,
  reactions: fermentationReactions,
  arrows: fermentationArrows,
  summary: {
    name: 'Fermentation',
    pathwayType: 'carbohydrates',
    description: 'Anaerobic pathways that regenerate NAD⁺ for continued glycolysis. Includes lactate fermentation (pyruvate → lactate) and ethanol fermentation (pyruvate → acetaldehyde → ethanol)',
    netProducts: {
      'Lactate': { produced: 1, consumed: 0, net: 1 },
      'Ethanol': { produced: 1, consumed: 0, net: 1 },
      'CO₂': { produced: 1, consumed: 0, net: 1 },
      'NADH': { produced: 0, consumed: 2, net: -2 },
      'NAD⁺': { produced: 2, consumed: 0, net: 2 }
    }
  },
};

// Export individual components for convenience
export { fermentationNodes, fermentationReactions, fermentationArrows };

