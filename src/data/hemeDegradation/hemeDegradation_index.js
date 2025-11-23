/**
 * Heme Degradation - Index
 */

import { hemeDegradationNodes } from './hemeDegradation_nodes.js';
import { hemeDegradationReactions } from './hemeDegradation_reactions.js';
import { hemeDegradationArrows } from './hemeDegradation_arrows.js';

export const hemeDegradationData = {
  nodes: hemeDegradationNodes,
  reactions: hemeDegradationReactions,
  arrows: hemeDegradationArrows,
  summary: {
    id: 'heme-degradation',
    name: 'Heme Degradation',
    pathwayType: 'heme-metabolism',
    description: 'Breakdown of heme into biliverdin and bilirubin, followed by conjugation and excretion.',
    location: 'Macrophage (Spleen) and Liver',
    netProducts: {
      'Bilirubin': { produced: 1, consumed: 0, net: 1 },
      'CO': { produced: 1, consumed: 0, net: 1 },
      'Iron': { produced: 1, consumed: 0, net: 1 }
    },
    keyRegulatorySteps: [
      { id: 'heme_b_degradation', text: 'Step 1: Heme Oxygenase (rate-limiting)' },
      { id: 'conjugated_bilirubin', text: 'Step 3: UGT1A1 (conjugation for excretion)' }
    ]
  },
  subPathways: null
};

export {
  hemeDegradationNodes,
  hemeDegradationReactions,
  hemeDegradationArrows
};

