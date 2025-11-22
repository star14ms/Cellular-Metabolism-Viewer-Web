/**
 * Fatty Acid and Lipid Synthesis Pathway - Index
 */

import { fattyAcidAndLipidSynthesisNodes } from './fattyAcidAndLipidSynthesis_nodes.js';
import { fattyAcidAndLipidSynthesisReactions } from './fattyAcidAndLipidSynthesis_reactions.js';
import { fattyAcidAndLipidSynthesisArrows } from './fattyAcidAndLipidSynthesis_arrows.js';

export const fattyAcidAndLipidSynthesisData = {
  nodes: fattyAcidAndLipidSynthesisNodes,
  reactions: fattyAcidAndLipidSynthesisReactions,
  arrows: fattyAcidAndLipidSynthesisArrows,
  summary: {
    name: 'Fatty Acid and Lipid Synthesis',
    pathwayType: 'lipids',
    description: 'Pathways for fatty acid synthesis, triacylglycerol synthesis, phospholipid synthesis, and sphingolipid synthesis.',
    location: 'Cytoplasm',
    netProducts: {},
    keyRegulatorySteps: [
      { id: 'malonyl_coa_fas', text: 'Step 2: Acetyl-CoA Carboxylase (Rate-limiting step)' },
      { id: 'palmitoyl_coa', text: 'Inhibition of Acetyl-CoA Carboxylase by Palmitoyl-CoA' }
    ]
  },
  subPathways: [
    {
      id: 'fas-initiation',
      name: 'Fatty Acid Synthesis Initiation',
      description: 'Steps 1-6: Citrate transport, activation to Acetyl-CoA and Malonyl-CoA, and transfer to ACP.',
      reactionIndices: [0, 1, 2, 3, 4, 5],
      nodeIds: ['citrate', 'acetyl_coa_fas', 'malonyl_coa_fas', 'acetyl_acp', 'malonyl_acp', 'beta_ketoacyl_acp']
    },
    {
      id: 'fas-elongation',
      name: 'Fatty Acid Elongation Cycle',
      description: 'Steps 7-11: Condensation, reduction, dehydration, and reduction steps to elongate the fatty acid chain.',
      reactionIndices: [6, 7, 8, 9, 10],
      nodeIds: ['fatty_acyl_acp', 'beta_ketoacyl_acp', 'beta_hydroxyacyl_acp', 'trans_enoyl_acp', 'n_plus_2_fatty_acyl_acp']
    },
    {
      id: 'palmitate-sphingolipid',
      name: 'Palmitate and Sphingolipid Synthesis',
      description: 'Steps 12-15: Release of Palmitate, activation to Palmitoyl-CoA, and synthesis of Sphingolipids.',
      reactionIndices: [11, 12, 13, 14],
      nodeIds: ['n_plus_2_fatty_acyl_acp', 'palmitate', 'palmitoyl_coa', 'sphingosine', 'sphingolipids', 'serine_fas']
    },
    {
      id: 'glycerolipid-synthesis',
      name: 'Glycerolipid Synthesis',
      description: 'Steps 16-19: Synthesis of Phosphatidic acid, Phospholipids, and Triacylglycerols from Glycerol-3-phosphate.',
      reactionIndices: [15, 16, 17, 18],
      nodeIds: ['glycerol_3_phosphate_fas', 'phosphatidic_acid', 'phospholipids', 'diacylglycerol', 'triacylglycerol', 'palmitoyl_coa']
    }
  ]
};

export { fattyAcidAndLipidSynthesisNodes, fattyAcidAndLipidSynthesisReactions, fattyAcidAndLipidSynthesisArrows };

