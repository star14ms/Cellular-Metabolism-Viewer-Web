/**
 * Electron Transport Chain - Index
 */

import { electronTransportChainNodes } from './electronTransportChain_nodes.js';
import { electronTransportChainReactions } from './electronTransportChain_reactions.js';
import { electronTransportChainArrows } from './electronTransportChain_arrows.js';

export const electronTransportChainData = {
  nodes: electronTransportChainNodes,
  reactions: electronTransportChainReactions,
  arrows: electronTransportChainArrows,
  summary: {
    name: 'Electron Transport Chain / Oxidative Phosphorylation',
    pathwayType: 'oxidative-metabolism',
    description: 'Uses NADH and FADH₂ to create a proton gradient that drives ATP synthesis. The final step in aerobic energy production.',
    location: 'Inner mitochondrial membrane',
    netProducts: {
      'ATP': { produced: 30, consumed: 0, net: 30 },
      'H₂O': { produced: 6, consumed: 0, net: 6 },
      'NADH': { consumed: 10, produced: 0, net: -10 },
      'FADH₂': { consumed: 2, produced: 0, net: -2 }
    },
    keyRegulatorySteps: [
      { id: 'nadh', text: 'Complex I: Entry point for NADH from glycolysis, pyruvate oxidation, and citric acid cycle' },
      { id: 'fadh2', text: 'Complex II: Entry point for FADH₂ from citric acid cycle' },
      { id: 'complex_v', text: 'ATP Synthase: Final step producing ATP from proton gradient' }
    ]
  },
};

export { electronTransportChainNodes, electronTransportChainReactions, electronTransportChainArrows };

