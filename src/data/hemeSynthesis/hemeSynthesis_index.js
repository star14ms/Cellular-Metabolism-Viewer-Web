/**
 * Heme Synthesis - Index
 */

import { hemeSynthesisNodes } from './hemeSynthesis_nodes.js';
import { hemeSynthesisReactions } from './hemeSynthesis_reactions.js';
import { hemeSynthesisArrows } from './hemeSynthesis_arrows.js';

export const hemeSynthesisData = {
  nodes: hemeSynthesisNodes,
  reactions: hemeSynthesisReactions,
  arrows: hemeSynthesisArrows,
  summary: {
    id: 'heme-metabolism',
    name: 'Heme Synthesis',
    pathwayType: 'heme-metabolism',
    description: 'Biosynthesis of heme from glycine and succinyl-CoA, involving mitochondrial and cytosolic steps.',
    location: 'Mitochondria and Cytosol',
    netProducts: {
      'Heme b': { produced: 1, consumed: 0, net: 1 },
      'CO₂': { produced: 2, consumed: 0, net: 2 }, // Approx
      'CoA': { produced: 1, consumed: 0, net: 1 }
    },
    keyRegulatorySteps: [
      { id: 'delta_aminolevulinic_acid_matrix', text: 'Step 1: δ-ALA Synthase (rate-limiting, inhibited by heme)' },
      { id: 'heme_b_heme', text: 'Final Step: Ferrochelatase (inhibited by lead)' }
    ]
  },
  subPathways: null
};

export {
  hemeSynthesisNodes,
  hemeSynthesisReactions,
  hemeSynthesisArrows
};
