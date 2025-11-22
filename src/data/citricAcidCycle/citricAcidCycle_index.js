/**
 * Citric Acid Cycle - Index
 */

import { citricAcidCycleNodes } from './citricAcidCycle_nodes.js';
import { citricAcidCycleReactions } from './citricAcidCycle_reactions.js';
import { citricAcidCycleArrows } from './citricAcidCycle_arrows.js';

export const citricAcidCycleData = {
  nodes: citricAcidCycleNodes,
  reactions: citricAcidCycleReactions,
  arrows: citricAcidCycleArrows,
  cycles: [
    {
      cyclic_id: 'citric_acid_cycle',
      name: 'Citric Acid Cycle',
      description: 'A circular metabolic pathway that oxidizes acetyl-CoA to CO₂',
      nodeOrder: ['oxaloacetate', 'citrate', 'isocitrate', 'alpha_ketoglutarate', 'succinyl_coa', 'succinate', 'fumarate', 'malate'], // Order of nodes in the cycle (clockwise)
      startNode: 'oxaloacetate', // Starting node of the cycle
      // Cycle center position (calculated from node positions)
      // Center: (359, 2134) - calculated from all 8 node positions
      center: { 
        x: 359, // Calculated center from node positions
        y: 2434 // Calculated center from node positions
      },
      // Default angle for by-arrows (in radians, pointing outward from cycle center)
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
    name: 'Citric Acid Cycle (Krebs Cycle)',
    pathwayType: 'oxidative-metabolism',
    description: 'A circular metabolic pathway that oxidizes acetyl-CoA to CO₂, producing energy carriers (ATP, NADH, FADH₂)',
    location: 'Mitochondrial matrix',
    netProducts: {
      'ATP': { produced: 1, consumed: 0, net: 1 },
      'NADH': { produced: 3, consumed: 0, net: 3 },
      'FADH₂': { produced: 1, consumed: 0, net: 1 },
      'CO₂': { produced: 2, consumed: 0, net: 2 }
    },
    keyRegulatorySteps: [
      { id: 'citrate', text: 'Step 1: Citrate synthase (inhibited by ATP, NADH, succinyl-CoA)' },
      { id: 'alpha_ketoglutarate', text: 'Step 3: Isocitrate dehydrogenase (activated by ADP, Ca²⁺)' },
      { id: 'succinyl_coa', text: 'Step 4: α-Ketoglutarate dehydrogenase (inhibited by succinyl-CoA, NADH)' }
    ]
  },
};

export { citricAcidCycleNodes, citricAcidCycleReactions, citricAcidCycleArrows };

