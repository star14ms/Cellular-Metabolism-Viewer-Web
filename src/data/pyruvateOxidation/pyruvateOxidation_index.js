/**
 * Pyruvate Oxidation Pathway - Index
 * 
 * Exports all data for the pathway in the new format
 */

import { pyruvateOxidationNodes } from './pyruvateOxidation_nodes.js';
import { pyruvateOxidationReactions } from './pyruvateOxidation_reactions.js';
import { pyruvateOxidationArrows } from './pyruvateOxidation_arrows.js';

export const pyruvateOxidationData = {
  nodes: pyruvateOxidationNodes,
  reactions: pyruvateOxidationReactions,
  arrows: pyruvateOxidationArrows,
  summary: {
    name: 'Pyruvate Oxidation',
    pathwayType: 'carbohydrates',
    description: 'The conversion of pyruvate to acetyl-CoA, linking glycolysis to the citric acid cycle',
    netProducts: {
      'Acetyl-CoA': { produced: 1, consumed: 0, net: 1 },
      'CO₂': { produced: 1, consumed: 0, net: 1 },
      'NADH': { produced: 1, consumed: 0, net: 1 }
    }
  },
};

// Export individual components for convenience
export { pyruvateOxidationNodes, pyruvateOxidationReactions, pyruvateOxidationArrows };

