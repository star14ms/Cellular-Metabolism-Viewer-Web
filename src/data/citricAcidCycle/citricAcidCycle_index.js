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
  summary: {
    name: 'Citric Acid Cycle (Krebs Cycle)',
    pathwayType: 'carbohydrates',
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

