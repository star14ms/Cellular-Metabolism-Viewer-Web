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
  // Sub-pathways definition - 6 individual sub-pathways, one for each nucleotide breakdown
  // Note: RNA/DNA Hydrolysis (reaction index 0) is excluded from all sub-pathways
  subPathways: [
    {
      id: 'gmp-breakdown',
      name: 'GMP Breakdown',
      description: 'Breakdown of guanosine monophosphate (GMP) to uric acid via guanosine, guanine, and xanthine.',
      reactionIndices: [1, 2, 3, 4], // GMP → Guanosine → Guanine → Xanthine → Uric acid (RNA/DNA Hydrolysis excluded)
      nodeIds: ['gmp_breakdown', 'guanosine_breakdown', 'guanine_breakdown', 'xanthine_shared', 'uric_acid_shared']
    },
    {
      id: 'amp-breakdown',
      name: 'AMP Breakdown',
      description: 'Breakdown of adenosine monophosphate (AMP) to uric acid via adenosine, inosine, hypoxanthine, and xanthine.',
      reactionIndices: [5, 6, 7, 8, 4], // AMP → Adenosine → Inosine → Hypoxanthine → Xanthine → Uric acid (shares xanthine oxidation with GMP, RNA/DNA Hydrolysis excluded)
      nodeIds: ['amp_breakdown', 'adenosine_breakdown', 'inosine_shared', 'hypoxanthine_shared', 'xanthine_shared', 'uric_acid_shared']
    },
    {
      id: 'imp-breakdown',
      name: 'IMP Breakdown',
      description: 'Breakdown of inosine monophosphate (IMP) to uric acid. Shares steps with AMP breakdown pathway (inosine, hypoxanthine, xanthine).',
      reactionIndices: [9, 10, 7, 8, 4], // AMP → IMP → Inosine → Hypoxanthine → Xanthine → Uric acid (shares inosine, hypoxanthine, xanthine, and uric acid with AMP)
      nodeIds: ['amp_breakdown', 'imp_breakdown', 'inosine_shared', 'hypoxanthine_shared', 'xanthine_shared', 'uric_acid_shared']
    },
    {
      id: 'cmp-breakdown',
      name: 'CMP Breakdown',
      description: 'Breakdown of cytidine monophosphate (CMP) to β-alanine. Shares steps with UMP breakdown pathway (uridine onwards).',
      reactionIndices: [11, 12, 14, 15, 16, 17], // CMP → Cytidine → Uridine → Uracil → Dihydrouracil → β-ureidopropionate → β-alanine (shares uridine onwards with UMP, RNA/DNA Hydrolysis and UMP Dephosphorylation excluded)
      nodeIds: ['cmp_breakdown', 'cytidine_breakdown', 'uridine_ump', 'uracil_ump', 'dihydrouracil_ump', 'beta_ureidopropionate_ump', 'beta_alanine_ump']
    },
    {
      id: 'ump-breakdown',
      name: 'UMP Breakdown',
      description: 'Breakdown of uridine monophosphate (UMP) to β-alanine via uridine, uracil, dihydrouracil, and β-ureidopropionate.',
      reactionIndices: [13, 14, 15, 16, 17], // UMP → Uridine → Uracil → Dihydrouracil → β-ureidopropionate → β-alanine (RNA/DNA Hydrolysis excluded)
      nodeIds: ['ump_breakdown', 'uridine_ump', 'uracil_ump', 'dihydrouracil_ump', 'beta_ureidopropionate_ump', 'beta_alanine_ump']
    },
    {
      id: 'dtmp-breakdown',
      name: 'dTMP Breakdown',
      description: 'Breakdown of deoxythymidine monophosphate (dTMP) to β-aminoisobutyric acid via thymidine, thymine, dihydrothymine, and β-ureidoisobutyrate.',
      reactionIndices: [18, 19, 20, 21, 22], // dTMP → Thymidine → Thymine → Dihydrothymine → β-ureidoisobutyrate → β-aminoisobutyric acid (RNA/DNA Hydrolysis excluded)
      nodeIds: ['dtmp_breakdown', 'thymidine_breakdown', 'thymine_breakdown', 'dihydrothymine_breakdown', 'beta_ureidoisobutyrate_breakdown', 'beta_aminoisobutyric_acid_breakdown']
    }
  ]
};

export { nucleotideBreakdownNodes, nucleotideBreakdownReactions, nucleotideBreakdownArrows };

