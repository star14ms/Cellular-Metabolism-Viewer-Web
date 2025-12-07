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
      'PRPP': { produced: 0, consumed: 1, net: -1 },
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
  // Sub-pathways definition - 2 sub-pathways: ATP and GTP synthesis
  // Both include IMP synthesis from Hypoxanthine and de novo IMP synthesis before branching
  // Reaction order: After AMP Synthesis, includes AMP→IMP, ribose/PRPP synthesis, AMP from Adenine, then ADP→ATP
  // After GMP Synthesis, includes GMP→IMP, GMP from Guanine, then GDP→GTP
  subPathways: [
    {
      id: 'atp-synthesis',
      name: 'ATP Synthesis',
      description: 'Synthesis of adenosine triphosphate (ATP) from PRPP or hypoxanthine. Includes IMP synthesis from hypoxanthine (salvage pathway) and de novo IMP synthesis, then continues through adenylosuccinate, AMP, AMP→IMP conversion, ribose/PRPP synthesis, AMP from adenine, ADP, and ATP.',
      reactionIndices: [10, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], // IMP from Hypoxanthine (10) + de novo IMP (0-9) + IMP→AMP (11-12) + AMP→IMP (13) + ribose/PRPP (14-16) + AMP from Adenine (17) + ADP→ATP (18-19)
      nodeIds: ['hypoxanthine', 'prpp_purine', 'phosphoribosylamine', 'gar', 'fgar', 'fgam', 'air', 'cair', 'saicar', 'aicar', 'faicar', 'imp', 'adenylosuccinate', 'amp_purine', 'uridine_purine', 'ribose_1_p', 'ribose_5_p', 'prpp_purine2', 'adenine', 'adp', 'atp', 'glutamine_purine_1', 'glutamate_purine_1', 'glycine_purine', 'n10_formyl_thf_purine_1', 'thf_purine_1', 'glutamine_purine_4', 'glutamate_purine_4', 'aspartate_purine', 'fumarate_purine', 'n10_formyl_thf_purine_9', 'thf_purine_9', 'arrow_purine_synthesis_16', 'prpp_purine_hypoxanthine', 'aspartate_purine_amp', 'fumarate_purine_amp']
    },
    {
      id: 'gtp-synthesis',
      name: 'GTP Synthesis',
      description: 'Synthesis of guanosine triphosphate (GTP) from PRPP or hypoxanthine. Includes IMP synthesis from hypoxanthine (salvage pathway) and de novo IMP synthesis, then continues through XMP, GMP, GMP→IMP conversion, GMP from guanine, GDP, and GTP.',
      reactionIndices: [10, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 21, 22, 23, 24, 25, 26, 27], // IMP from Hypoxanthine (10) + de novo IMP (0-9) + IMP→GMP (20-21) + GMP→IMP (22) + GMP from Guanine (23) + GDP→GTP (24-25)
      nodeIds: ['hypoxanthine', 'prpp_purine', 'phosphoribosylamine', 'gar', 'fgar', 'fgam', 'air', 'cair', 'saicar', 'aicar', 'faicar', 'imp', 'xmp', 'gmp', 'guanine', 'gdp', 'gtp', 'glutamine_purine_1', 'glutamate_purine_1', 'glycine_purine', 'n10_formyl_thf_purine_1', 'thf_purine_1', 'glutamine_purine_4', 'glutamate_purine_4', 'aspartate_purine', 'fumarate_purine', 'n10_formyl_thf_purine_9', 'thf_purine_9', 'arrow_purine_synthesis_16', 'prpp_purine_hypoxanthine', 'glutamine_purine_gmp', 'glutamate_purine_gmp', 'prpp_purine_guanine']
    }
  ]
};

export { purineSynthesisNodes, purineSynthesisReactions, purineSynthesisArrows };

