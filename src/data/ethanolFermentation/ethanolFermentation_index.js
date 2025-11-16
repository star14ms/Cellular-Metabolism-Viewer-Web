/**
 * Ethanol Fermentation Pathway - Index
 * 
 * Exports all data for the pathway in the new format
 */

import { ethanolFermentationNodes } from './ethanolFermentation_nodes.js';
import { ethanolFermentationReactions } from './ethanolFermentation_reactions.js';
import { ethanolFermentationArrows } from './ethanolFermentation_arrows.js';

export const ethanolFermentationData = {
  nodes: ethanolFermentationNodes,
  reactions: ethanolFermentationReactions,
  arrows: ethanolFermentationArrows,
  summary: {
    name: 'Ethanol Fermentation',
    description: 'Anaerobic pathway that converts pyruvate to ethanol via acetaldehyde, regenerating NAD⁺ for continued glycolysis',
    netProducts: {
      'Ethanol': { produced: 1, consumed: 0, net: 1 },
      'CO₂': { produced: 1, consumed: 0, net: 1 },
      'NADH': { produced: 0, consumed: 1, net: -1 },
      'NAD⁺': { produced: 1, consumed: 0, net: 1 }
    }
  },
};

// Export individual components for convenience
export { ethanolFermentationNodes, ethanolFermentationReactions, ethanolFermentationArrows };

