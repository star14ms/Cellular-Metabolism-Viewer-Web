/**
 * Urea Cycle Pathway - Index
 */

import { ureaCycleNodes } from './ureaCycle_nodes.js';
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
      nodeOrder: ['ornithine', 'citrulline', 'argininosuccinate', 'arginine'], // Order of nodes in the cycle (clockwise)
      startNode: 'ornithine', // Starting node of the cycle
      // Cycle center position (calculated from node positions)
      // Ornithine: (1860, 860), Citrulline: (2140, 860), Argininosuccinate: (2140, 1140), Arginine: (1860, 1140)
      // Center: ((1860+2140+2140+1860)/4, (860+860+1140+1140)/4) = (2000, 1000)
      center: { 
        x: 2800, // Calculated center from node positions
        y: 2200 // Calculated center from node positions
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
      { id: 'citrulline', text: 'Step 2: Ornithine transcarbamoylase (OTC) - Mitochondrial step, citrulline transported to cytosol' },
      { id: 'argininosuccinate', text: 'Step 3: Argininosuccinate synthetase - Requires aspartate and ATP, connects to TCA cycle via fumarate' },
      { id: 'arginine', text: 'Step 4: Arginase - Final step producing urea, regenerates ornithine for cycle continuation' },
      { id: 'aspartate_urea', text: 'Aspartate Generation - Transamination of oxaloacetate provides aspartate for the cycle' },
      { id: 'nitric_oxide', text: 'Nitric Oxide Synthesis - Branch from arginine for cell signaling, produces citrulline' },
      { id: 'glutamic_semialdehyde', text: 'Ornithine Catabolism - Branch to glutamic semialdehyde, leads to glutamate or proline synthesis' }
    ]
  },
};

export { ureaCycleNodes, ureaCycleReactions, ureaCycleArrows };

