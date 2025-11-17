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
      'H₂O': { produced: 0, consumed: 15, net: -15 },
      'Pi': { produced: 6, consumed: 3, net: 3 },
      'NH₄⁺': { produced: 8, consumed: 0, net: 8 },
      'O₂': { produced: 0, consumed: 6, net: -6 },
      'H₂O₂': { produced: 6, consumed: 0, net: 6 },
      'CO₂': { produced: 3, consumed: 0, net: 3 },
      'NADPH': { produced: 0, consumed: 3, net: -3 },
      'NADP⁺': { produced: 3, consumed: 0, net: 3 },
      'Ribose-1-phosphate': { produced: 4, consumed: 0, net: 4 },
      'Deoxyribose-1-phosphate': { produced: 1, consumed: 0, net: 1 },
      'Uric acid': { produced: 3, consumed: 0, net: 3 },
      'β-alanine': { produced: 2, consumed: 0, net: 2 },
      'β-aminoisobutyric acid': { produced: 1, consumed: 0, net: 1 }
    },
    keyRegulatorySteps: [
      { id: 'xanthine_gmp', text: 'Xanthine oxidase - Catalyzes the final oxidation steps in purine breakdown, producing uric acid' },
      { id: 'dihydrouracil_cmp', text: 'Dihydropyrimidine dehydrogenase (DPD) - Rate-limiting step in pyrimidine breakdown, requires NADPH' }
    ]
  },
};

export { nucleotideBreakdownNodes, nucleotideBreakdownReactions, nucleotideBreakdownArrows };

