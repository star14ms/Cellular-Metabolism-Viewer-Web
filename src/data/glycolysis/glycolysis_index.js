/**
 * Glycolysis Pathway - Index
 */

import { glycolysisNodes } from './glycolysis_nodes.js';
import { glycolysisReactions } from './glycolysis_reactions.js';
import { glycolysisArrows } from './glycolysis_arrows.js';

export const glycolysisData = {
  nodes: glycolysisNodes,
  reactions: glycolysisReactions,
  arrows: glycolysisArrows,
  summary: {
    name: 'Glycolysis',
    description: 'The metabolic pathway that converts glucose into pyruvate, releasing energy and producing ATP and NADH.',
    location: 'Cytoplasm',
    netProducts: {
      'ATP': { produced: 4, consumed: 2, net: 2 },
      'NADH': { produced: 2, consumed: 0, net: 2 },
      'Pyruvate': { produced: 2, consumed: 0, net: 2 }
    },
    keyRegulatorySteps: [
      { id: 'glucose_6_phosphate', text: 'Step 1: Hexokinase (inhibited by glucose-6-phosphate)' },
      { id: 'fructose_1_6_bisphosphate', text: 'Step 3: Phosphofructokinase-1 (key regulatory step)' },
      { id: 'pyruvate', text: 'Step 10: Pyruvate kinase (allosteric regulation)' }
    ]
  },
};

export { glycolysisNodes, glycolysisReactions, glycolysisArrows };

