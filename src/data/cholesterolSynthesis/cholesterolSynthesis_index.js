/**
 * Cholesterol Synthesis Pathway - Data Index
 */

import { cholesterolSynthesisNodes } from './cholesterolSynthesis_nodes.js';
import { cholesterolSynthesisReactions } from './cholesterolSynthesis_reactions.js';
import { cholesterolSynthesisArrows } from './cholesterolSynthesis_arrows.js';

export const cholesterolSynthesisData = {
  nodes: cholesterolSynthesisNodes,
  reactions: cholesterolSynthesisReactions,
  arrows: cholesterolSynthesisArrows,
  summary: {
    name: 'Cholesterol Synthesis',
    pathwayType: 'lipids',
    description: 'Multi-step pathway converting acetyl-CoA to cholesterol through isoprenoid intermediates. Cholesterol serves as a precursor for steroid hormones, bile acids, and is an essential component of cell membranes.',
    location: 'Cytoplasm and Endoplasmic Reticulum (liver, intestine, and other tissues)',
    netProducts: {
      'Cholesterol': { produced: 1, consumed: 0, net: 1 },
      'Acetyl-CoA': { produced: 0, consumed: 3, net: -3 },
      'NADPH': { produced: 0, consumed: 14, net: -14 },
      'ATP': { produced: 0, consumed: 3, net: -3 }
    },
    keyRegulatorySteps: [
      { id: 'hmg_coa_chol', text: 'HMG-CoA reductase is the rate-limiting step, highly regulated by cholesterol levels, statins, and SREBP transcription factors.' },
      { id: 'fpp_chol', text: 'Farnesyl pyrophosphate (FPP) is a key branch point: can be used for protein farnesylation or continue to squalene for cholesterol synthesis.' },
      { id: 'cholesterol_chol', text: 'Cholesterol synthesis is feedback-inhibited by cholesterol itself and regulated by dietary intake and cellular demand.' }
    ]
  },
  subPathways: [
    {
      id: 'isoprenoid-synthesis',
      name: 'Isoprenoid Synthesis',
      description: 'Conversion of acetyl-CoA through HMG-CoA and mevalonate to isoprenoid units (IPP, FPP).',
      reactionIndices: [0, 1, 2, 3, 4],
      nodeIds: ['acetyl_coa_chol', 'acetoacetyl_coa_chol', 'hmg_coa_chol', 'mevalonate_chol', 'ipp_chol', 'fpp_chol']
    },
    {
      id: 'sterol-synthesis',
      name: 'Sterol Synthesis',
      description: 'Conversion of FPP through squalene and lanosterol to cholesterol.',
      reactionIndices: [6, 7, 8, 9],
      nodeIds: ['fpp_chol', 'squalene_chol', 'lanosterol_chol', '7_dehydrocholesterol_chol', 'cholesterol_chol']
    },
    {
      id: 'cholesterol-utilization',
      name: 'Cholesterol Utilization',
      description: 'Branching pathways: vitamin D synthesis from 7-dehydrocholesterol, bile salt production from cholesterol, membrane incorporation, and lipoprotein packaging.',
      reactionIndices: [10, 11, 12, 13],
      nodeIds: ['7_dehydrocholesterol_chol', 'cholesterol_chol', 'vitamin_d_chol', 'bile_salts_chol', 'cell_membranes_chol', 'lipoproteins_chol']
    }
  ]
};

export {
  cholesterolSynthesisNodes,
  cholesterolSynthesisReactions,
  cholesterolSynthesisArrows
};

