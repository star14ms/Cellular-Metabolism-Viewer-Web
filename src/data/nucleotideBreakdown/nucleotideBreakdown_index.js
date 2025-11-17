/**
 * Nucleotide Breakdown Pathway - Index
 */

import { nucleotideBreakdownNodes } from './nucleotideBreakdown_nodes.js';
import { nucleotideBreakdownReactions } from './nucleotideBreakdown_reactions.js';
import { nucleotideBreakdownArrows } from './nucleotideBreakdown_arrows.js';

export const nucleotideBreakdownData = {
  nodes: nucleotideBreakdownNodes,
  reactions: nucleotideBreakdownReactions,
  arrows: nucleotideBreakdownArrows,
  summary: {
    name: 'Nucleotide Breakdown',
    pathwayType: 'nucleotides',
    description: 'The metabolic pathway that breaks down nucleotides derived from RNA and DNA. The pathway is organized into six columns: purine nucleotide breakdown (GMP, AMP, IMP) leading to uric acid, and pyrimidine nucleotide breakdown (CMP, UMP, dTMP) leading to β-alanine and β-aminoisobutyric acid.',
    location: 'Cytoplasm',
    netProducts: {
      'H₂O': { produced: 0, consumed: 3, net: -3 },
      'O₂': { produced: 0, consumed: 1, net: -1 },
      'H₂O₂': { produced: 1, consumed: 0, net: 1 },
      'NH₄⁺': { produced: 1, consumed: 0, net: 1 },
      'Ribose-1-phosphate': { produced: 1, consumed: 0, net: 1 },
      'Uric acid': { produced: 1, consumed: 0, net: 1 },
      'β-alanine': { produced: 1, consumed: 0, net: 1 },
      'β-aminoisobutyric acid': { produced: 1, consumed: 0, net: 1 }
    },
    keyRegulatorySteps: [
      { id: 'xanthine_gmp', text: 'Xanthine oxidase - Catalyzes the final oxidation steps in purine breakdown, producing uric acid' },
      { id: 'dihydrouracil_cmp', text: 'Dihydropyrimidine dehydrogenase (DPD) - Rate-limiting step in pyrimidine breakdown, requires NADPH' }
    ]
  },
};

export { nucleotideBreakdownNodes, nucleotideBreakdownReactions, nucleotideBreakdownArrows };

