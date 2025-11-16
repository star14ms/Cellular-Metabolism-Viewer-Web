/**
 * De Novo Purine Synthesis Pathway - Index
 */

import { purineSynthesisNodes } from './purineSynthesis_nodes.js';
import { purineSynthesisReactions } from './purineSynthesis_reactions.js';
import { purineSynthesisArrows } from './purineSynthesis_arrows.js';

export const purineSynthesisData = {
  nodes: purineSynthesisNodes,
  reactions: purineSynthesisReactions,
  arrows: purineSynthesisArrows,
  summary: {
    name: 'Purine Synthesis',
    pathwayType: 'nucleotides',
    description: 'The metabolic pathway that synthesizes purine nucleotides from simple precursors. This 10-step pathway converts PRPP to inosine monophosphate (IMP), the first purine nucleotide. IMP serves as a precursor for both AMP and GMP synthesis.',
    location: 'Cytoplasm',
    netProducts: {
      'ATP': { produced: 0, consumed: 4, net: -4 },
      'ADP': { produced: 4, consumed: 0, net: 4 },
      'Pi': { produced: 4, consumed: 0, net: 4 },
      'PPi': { produced: 1, consumed: 0, net: 1 },
      'Glutamine': { produced: 0, consumed: 2, net: -2 },
      'Glutamate': { produced: 2, consumed: 0, net: 2 },
      'Glycine': { produced: 0, consumed: 1, net: -1 },
      'N¹⁰-formyl-THF': { produced: 0, consumed: 2, net: -2 },
      'THF': { produced: 2, consumed: 0, net: 2 },
      'CO₂': { produced: 0, consumed: 1, net: -1 },
      'Aspartate': { produced: 0, consumed: 1, net: -1 },
      'Fumarate': { produced: 1, consumed: 0, net: 1 },
      'H₂O': { produced: 2, consumed: 1, net: 1 },
      'IMP': { produced: 1, consumed: 0, net: 1 }
    },
    keyRegulatorySteps: [
      { id: 'phosphoribosylamine', text: 'Step 1: Glutamine PRPP amidotransferase (GPAT) - First committed step, allosterically regulated by purine nucleotides' },
      { id: 'imp', text: 'Step 10: IMP cyclohydrolase - Final step producing IMP, the precursor for AMP and GMP' }
    ]
  },
};

export { purineSynthesisNodes, purineSynthesisReactions, purineSynthesisArrows };

