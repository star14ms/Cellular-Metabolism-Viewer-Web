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
  // Sub-pathways definition - 2 sub-pathways: lactate and ethanol fermentation
  subPathways: [
    {
      id: 'lactate-fermentation',
      name: 'Lactate Fermentation',
      description: 'Anaerobic pathway that converts pyruvate to lactate, regenerating NAD⁺ for continued glycolysis. Catalyzed by lactate dehydrogenase.',
      reactionIndices: [0], // rxn_fermentation_1
      nodeIds: ['pyruvate', 'lactate']
    },
    {
      id: 'ethanol-fermentation',
      name: 'Ethanol Fermentation',
      description: 'Anaerobic pathway that converts pyruvate to ethanol via acetaldehyde, regenerating NAD⁺ for continued glycolysis. Includes pyruvate decarboxylation to acetaldehyde and acetaldehyde reduction to ethanol.',
      reactionIndices: [1, 2], // rxn_fermentation_2, rxn_fermentation_3
      nodeIds: ['pyruvate', 'acetaldehyde', 'ethanol']
    }
  ]
};

// Export individual components for convenience
export { fermentationNodes, fermentationReactions, fermentationArrows };

