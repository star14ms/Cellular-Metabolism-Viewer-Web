/**
 * Deoxyribonucleotides Synthesis Pathway - Index
 */

import { deoxyribonucleotidesNodes } from './deoxyribonucleotides_nodes.js';
import { deoxyribonucleotidesReactions } from './deoxyribonucleotides_reactions.js';
import { deoxyribonucleotidesArrows } from './deoxyribonucleotides_arrows.js';

export const deoxyribonucleotidesData = {
  nodes: deoxyribonucleotidesNodes,
  reactions: deoxyribonucleotidesReactions,
  arrows: deoxyribonucleotidesArrows,
  summary: {
    name: 'Deoxyribonucleotides Synthesis',
    pathwayType: 'nucleotides',
    description: 'The metabolic pathway that synthesizes deoxyribonucleotide triphosphates (dATP, dGTP, dCTP, dUTP) from their corresponding ribonucleotide triphosphate precursors (ATP, GTP, CTP, UTP). Each pathway involves three steps: dephosphorylation, reduction, and re-phosphorylation. The pathway is organized in four parallel columns, one for each nucleotide base.',
    location: 'Cytoplasm',
    netProducts: {
      'ATP': { produced: 0, consumed: 4, net: -4 },
      'ADP': { produced: 4, consumed: 0, net: 4 },
      'H₂O': { produced: 0, consumed: 4, net: -4 },
      'Pi': { produced: 4, consumed: 0, net: 4 },
      'NH₄⁺': { produced: 1, consumed: 0, net: 1 },
      'dATP': { produced: 1, consumed: 0, net: 1 },
      'dGTP': { produced: 1, consumed: 0, net: 1 },
      'dCTP': { produced: 0, consumed: 1, net: -1 },
      'dUTP': { produced: 2, consumed: 0, net: 2 }
    },
    keyRegulatorySteps: [
      { id: 'dadp', text: 'Ribonucleotide reductase - Allosterically regulated by dATP (feedback inhibition), controlling the rate of deoxyribonucleotide synthesis' },
      { id: 'dctp', text: 'Spontaneous deamination - dCTP can spontaneously convert to dUTP, releasing NH₄⁺' }
    ]
  },
};

export { deoxyribonucleotidesNodes, deoxyribonucleotidesReactions, deoxyribonucleotidesArrows };

