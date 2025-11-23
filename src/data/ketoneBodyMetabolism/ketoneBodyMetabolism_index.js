/**
 * Ketone Body Metabolism - Data Index
 */

import { ketoneBodyMetabolismNodes } from './ketoneBodyMetabolism_nodes.js';
import { ketoneBodyMetabolismReactions } from './ketoneBodyMetabolism_reactions.js';
import { ketoneBodyMetabolismArrows } from './ketoneBodyMetabolism_arrows.js';

export { ketoneBodyMetabolismNodes, ketoneBodyMetabolismReactions, ketoneBodyMetabolismArrows };

export const ketoneBodyMetabolismData = {
  id: 'ketone-body-metabolism',
  name: 'Ketone Body Metabolism',
  description: 'Synthesis of ketone bodies in the liver and their breakdown in extrahepatic tissues',
  summary: {
    name: 'Ketone Body Metabolism',
    pathwayType: 'lipids',
    description: 'Ketone bodies (acetoacetate, β-hydroxybutyrate, and acetone) are produced in the liver from acetyl-CoA when glucose is scarce. They are transported to extrahepatic tissues where they are converted back to acetyl-CoA for energy production.',
    location: 'Mitochondrial Matrix (Liver for synthesis, extrahepatic tissues for breakdown)',
    netProducts: {
      'Acetoacetate': { produced: 1, consumed: 0, net: 1 },
      'β-Hydroxybutyrate': { produced: 1, consumed: 0, net: 1 },
      'Acetyl-CoA': { produced: 2, consumed: 2, net: 0 } // Breakdown regenerates 2
    },
    keyRegulatorySteps: [
      { id: 'hmg_coa_kbm', text: 'Step 6: HMG-CoA Synthase (Rate-limiting step of ketone synthesis)' },
      { id: 'acetoacetyl_coa_kbm', text: 'Step 5: Thiolase (Inhibited by high CoA levels)' }
    ]
  },
  subPathways: [
    {
      id: 'preparation',
      name: 'Preparation',
      description: 'Conversion of Acetaldehyde to Acetyl-CoA for entry into the pathway.',
      reactionIndices: [0, 1, 2, 3], // Steps 1-4 (Indices 0-3)
      nodeIds: ['acetaldehyde_kbm', 'acetate_kbm', 'acetyl_coa_kbm_1', 'tca_kbm_1']
    },
    {
      id: 'ketone-synthesis',
      name: 'Ketone Synthesis',
      description: 'Synthesis of ketone bodies (Acetoacetate, β-Hydroxybutyrate, Acetone) from Acetyl-CoA in the liver.',
      reactionIndices: [4, 5, 6, 7, 8], // Steps 5-10 (Indices 4-8; Step 7 implicit/merged or skipped in count, indices are 0-based array positions)
      // Reaction indices in array:
      // 0: Transport (Step 1)
      // 1: Acetaldehyde DH (Step 2)
      // 2: Acetyl-CoA Syn (Step 3)
      // 3: TCA Entry 1 (Step 4)
      // 4: Thiolase (Step 5)
      // 5: HMG-CoA Synthase (Step 6)
      // 6: HMG-CoA Lyase (Step 8 - Main)
      // 7: Acetone Formation (Step 9)
      // 8: Beta-HB DH (Step 10)
      // Checking ketoneBodyMetabolismReactions.js:
      // rxn_kbm_1 (Index 0), rxn_kbm_2 (Index 1), rxn_kbm_3 (Index 2), rxn_kbm_4 (Index 3)
      // rxn_kbm_5 (Index 4), rxn_kbm_6 (Index 5), rxn_kbm_8 (Index 6), rxn_kbm_9 (Index 7), rxn_kbm_10 (Index 8)
      // rxn_kbm_11 (Index 9), rxn_kbm_12 (Index 10), rxn_kbm_13 (Index 11), rxn_kbm_14 (Index 12)
      // Note: The array has 13 elements (0-12).
      reactionIndices: [4, 5, 6, 7, 8],
      nodeIds: ['acetyl_coa_x2_kbm', 'acetoacetyl_coa_kbm', 'hmg_coa_kbm', 'acetoacetate_kbm', 'acetyl_coa_kbm_recycle', 'acetone_kbm', 'beta_hydroxybutyrate_kbm']
    },
    {
      id: 'ketone-breakdown',
      name: 'Ketone Breakdown',
      description: 'Breakdown of ketone bodies back to Acetyl-CoA in extrahepatic tissues for energy production.',
      reactionIndices: [9, 10, 11], // Steps 11-14 (Indices 9-12)
      nodeIds: ['acetoacetate_breakdown_kbm', 'acetoacetyl_coa_breakdown_kbm', 'acetyl_coa_x2_breakdown_kbm', 'tca_kbm_2', 'succinyl_coa_kbm', 'succinate_kbm']
    }
  ]
};
