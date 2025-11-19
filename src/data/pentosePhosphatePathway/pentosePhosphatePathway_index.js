/**
 * Pentose Phosphate Pathway - Index
 */

import { pentosePhosphatePathwayNodes } from './pentosePhosphatePathway_nodes.js';
import { pentosePhosphatePathwayReactions } from './pentosePhosphatePathway_reactions.js';
import { pentosePhosphatePathwayArrows } from './pentosePhosphatePathway_arrows.js';

export const pentosePhosphatePathwayData = {
  nodes: pentosePhosphatePathwayNodes,
  reactions: pentosePhosphatePathwayReactions,
  arrows: pentosePhosphatePathwayArrows,
  summary: {
    name: 'Pentose Phosphate Pathway',
    pathwayType: 'carbohydrates',
    description: 'The metabolic pathway that generates NADPH and pentose sugars (ribose-5-phosphate) from glucose-6-phosphate. It consists of an oxidative phase that produces NADPH and a non-oxidative phase that interconverts various sugar phosphates.',
    location: 'Cytoplasm',
    netProducts: {
      'NADPH': { produced: 2, consumed: 0, net: 2 },
      'Ribose-5-phosphate': { produced: 1, consumed: 0, net: 1 },
      'CO2': { produced: 1, consumed: 0, net: 1 }
    },
    keyRegulatorySteps: [
      { id: '6_phosphogluconolactone', text: 'Step 1: Glucose-6-phosphate dehydrogenase (G6PD) - Rate-limiting step, regulated by NADP+/NADPH ratio' },
      { id: 'ribose_5_phosphate', text: 'Ribose-5-phosphate is used for nucleotide synthesis via PRPP' }
    ]
  },
};

export { pentosePhosphatePathwayNodes, pentosePhosphatePathwayReactions, pentosePhosphatePathwayArrows };

