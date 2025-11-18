/**
 * De Novo Pyrimidine Synthesis Pathway - Index
 */

import { pyrimidineSynthesisNodes } from './pyrimidineSynthesis_nodes.js';
import { pyrimidineSynthesisReactions } from './pyrimidineSynthesis_reactions.js';
import { pyrimidineSynthesisArrows } from './pyrimidineSynthesis_arrows.js';

export const pyrimidineSynthesisData = {
  nodes: pyrimidineSynthesisNodes,
  reactions: pyrimidineSynthesisReactions,
  arrows: pyrimidineSynthesisArrows,
  summary: {
    name: 'Pyrimidine Synthesis',
    pathwayType: 'nucleotides',
    description: 'The metabolic pathway that synthesizes pyrimidine nucleotides (CTP) from simple precursors including bicarbonate, glutamine, aspartate, and PRPP. This pathway is essential for DNA and RNA synthesis.',
    location: 'Cytoplasm (with dihydroorotate dehydrogenase in mitochondria)',
    netProducts: {
      'ATP': { produced: 0, consumed: 5, net: -5 },
      'ADP': { produced: 5, consumed: 0, net: 5 },
      'NAD⁺': { produced: 0, consumed: 1, net: -1 },
      'NADH': { produced: 1, consumed: 0, net: 1 },
      'Glutamine': { produced: 0, consumed: 1, net: -1 },
      'Glutamate': { produced: 1, consumed: 0, net: 1 },
      'Aspartate': { produced: 0, consumed: 1, net: -1 },
      'Pi': { produced: 2, consumed: 0, net: 2 },
      'PRPP': { produced: 0, consumed: 1, net: -1 },
      'PPi': { produced: 1, consumed: 0, net: 1 },
      'CO₂': { produced: 0, consumed: 1, net: -1 },
      'H₂O': { produced: 1, consumed: 0, net: 1 },
    },
    keyRegulatorySteps: [
      { id: 'carbamoyl_phosphate_pyrimidine', text: 'Step 1: Carbamoyl phosphate synthetase II (CPSII) - First committed step' },
      { id: 'orotate', text: 'Step 4: Dihydroorotate dehydrogenase - Occurs in mitochondria' },
      { id: 'ctp', text: 'Step 9: CTP synthetase - Allosterically regulated by CTP (feedback inhibition)' }
    ]
  },
};

export { pyrimidineSynthesisNodes, pyrimidineSynthesisReactions, pyrimidineSynthesisArrows };

