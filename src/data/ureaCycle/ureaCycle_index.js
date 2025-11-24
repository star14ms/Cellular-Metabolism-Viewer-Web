/**
 * Urea Cycle Pathway - Index
 */

import { ureaCycleNodes, base_x, base_y } from './ureaCycle_nodes.js';
import { ureaCycleReactions } from './ureaCycle_reactions.js';
import { ureaCycleArrows } from './ureaCycle_arrows.js';

export const ureaCycleData = {
  nodes: ureaCycleNodes,
  reactions: ureaCycleReactions,
  arrows: ureaCycleArrows,
  cycles: [
    {
      cyclic_id: 'urea_cycle',
      name: 'Urea Cycle',
      description: 'Cyclic pathway for ammonia detoxification and urea synthesis',
      nodeOrder: ['ornithine_mito', 'citrulline_mito', 'citrulline_cyto', 'argininosuccinate', 'arginine', 'ornithine_cyto'], // Order of nodes in the cycle (clockwise)
      startNode: 'ornithine_mito', // Starting node of the cycle
      // Cycle center position (calculated from node positions)
      // Ornithine: (1860, 860), Citrulline: (2140, 860), Argininosuccinate: (2140, 1140), Arginine: (1860, 1140)
      // Center: ((1860+2140+2140+1860)/4, (860+860+1140+1140)/4) = (2000, 1000)
      center: { 
        x: base_x, // Calculated center from node positions
        y: base_y // Calculated center from node positions
      },
      // Default angle for by-arrows (in degrees, pointing outward from cycle center)
      defaultByArrowAngle: 0,
      // Arrow curvature settings for the cycle completion arrow
      arrowCurvature: {
        // The cycle completion arrow should be curved
        useCurved: true,
        // Control point offset for the curve (relative to center)
        controlPointOffset: { x: 0, y: -100 } // Curve upward
      }
    }
  ],
  summary: {
    name: 'Urea Cycle',
    pathwayType: 'amino_acids',
    description: 'The urea cycle is a cyclic pathway that converts toxic ammonia into urea for excretion. It occurs primarily in the liver and involves both mitochondrial and cytosolic compartments. The cycle begins with ornithine and carbamoyl phosphate (formed from ammonia and bicarbonate) to produce citrulline in mitochondria. Citrulline is transported to the cytosol where it combines with aspartate to form argininosuccinate, which is then cleaved to arginine and fumarate. Arginine is hydrolyzed to regenerate ornithine and produce urea. The cycle has several branches: (1) Aspartate generation from oxaloacetate feeds into the cycle, (2) Arginine can be used for nitric oxide synthesis, producing citrulline, (3) Ornithine can be converted to glutamic semialdehyde, which branches to glutamate or proline synthesis.',
    location: 'Mitochondrial matrix, Cytosol',
    netProducts: {
      'Urea': { produced: 1, consumed: 0, net: 1 },
      'Fumarate': { produced: 1, consumed: 0, net: 1 }
    },
    keyRegulatorySteps: [
      { id: 'carbamoyl_phosphate_urea', text: 'Step 1: Carbamoyl phosphate synthetase I (CPS1) - Rate-limiting step, allosterically activated by N-acetylglutamate' },
      { id: 'citrulline_mito', text: 'Step 2: Ornithine transcarbamoylase (OTC) - Mitochondrial step, citrulline transported to cytosol' },
      { id: 'argininosuccinate', text: 'Step 3: Argininosuccinate synthetase - Requires aspartate and ATP, connects to TCA cycle via fumarate' },
      { id: 'arginine', text: 'Step 4: Arginase - Final step producing urea, regenerates ornithine for cycle continuation' },
      { id: 'aspartate_urea', text: 'Aspartate Generation - Transamination of oxaloacetate provides aspartate for the cycle' },
      { id: 'nitric_oxide', text: 'Nitric Oxide Synthesis - Branch from arginine for cell signaling, produces citrulline' },
      { id: 'glutamic_semialdehyde', text: 'Ornithine Catabolism - Branch to glutamic semialdehyde, leads to glutamate or proline synthesis' }
    ]
  },
  // Sub-pathways definition - 4 sub-pathways: main cycle and 3 branches
  subPathways: [
    {
      id: 'urea-cycle-main',
      name: 'Main Urea Cycle',
      description: 'The central cyclic pathway for ammonia detoxification and urea synthesis. Includes nitric oxide synthesis (arginine → citrulline), ornithine transcarbamoylation to citrulline, argininosuccinate synthesis, and asparagine metabolism (aspartate ↔ asparagine).',
      reactionIndices: [1, 2, 3, 7, 8, 9, 10], // Step 9 (NO Synthesis), Step 2 (Ornithine → Citrulline), Step 3 (Citrulline → Argininosuccinate), Step 7 (Asparagine Synthesis), Step 8 (Asparagine Hydrolysis) - Excludes Step 5 and 6
      nodeIds: ['arginine', 'citrulline_mito', 'citrulline_cyto', 'ornithine_mito', 'ornithine_cyto', 'argininosuccinate', 'carbamoyl_phosphate_urea', 'aspartate_urea', 'fumarate_urea', 'urea']
    },
    {
      id: 'carbamoyl-phosphate-branch',
      name: 'Carbamoyl Phosphate Synthesis Branch',
      description: 'Branch pathway for carbamoyl phosphate synthesis from bicarbonate, ammonia, and ATP. This is the first committed step of the urea cycle, producing carbamoyl phosphate which is used in ornithine transcarbamoylation.',
      reactionIndices: [0], // Step 1: Carbamoyl Phosphate Synthesis
      nodeIds: ['bicarbonate_urea', 'carbamoyl_phosphate_urea']
    },
    {
      id: 'arginine-breakdown-branch',
      name: 'Arginine Breakdown Branch',
      description: 'Branch pathway for arginine breakdown. Includes argininosuccinate cleavage to arginine and fumarate, arginine hydrolysis to ornithine and urea, and oxaloacetate transamination to aspartate.',
      reactionIndices: [3, 4, 5], // Step 4: Argininosuccinate Cleavage, Step 5: Arginine Hydrolysis, Step 6: Oxaloacetate Transamination
      nodeIds: ['oxaloacetate_urea', 'aspartate_urea', 'asparagine_urea', 'glutamine_asn', 'glutamate_asn', 'glutamate_trans', 'alpha_ketoglutarate_trans']
    },
    {
      id: 'ornithine-catabolism-branch',
      name: 'Ornithine Catabolism Branch',
      description: 'Branch pathway from ornithine for amino acid synthesis. Ornithine is transaminated to glutamic semialdehyde, which can be oxidized to glutamate or cyclized to pyrroline-5-carboxylate and reduced to proline.',
      reactionIndices: [11, 12, 13, 14, 15], // Step 10: Ornithine Transamination, Step 11: Glutamic Semialdehyde Oxidation, Step 12: Pyrroline-5-carboxylate Formation, Step 12a: Transport, Step 13: Proline Synthesis
      nodeIds: ['ornithine_mito', 'glutamic_semialdehyde', 'glutamate_urea', 'pyrroline_5_carboxylate_mito', 'pyrroline_5_carboxylate_cyto', 'proline_urea', 'aspartate_orn', 'oxaloacetate_orn']
    }
  ]
};

export { ureaCycleNodes, ureaCycleReactions, ureaCycleArrows };

