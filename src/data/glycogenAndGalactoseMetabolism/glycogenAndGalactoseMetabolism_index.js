/**
 * Glycogen and Galactose Metabolism - Data Index
 */

import { glycogenAndGalactoseMetabolismNodes } from './glycogenAndGalactoseMetabolism_nodes.js';
import { glycogenAndGalactoseMetabolismReactions } from './glycogenAndGalactoseMetabolism_reactions.js';
import { glycogenAndGalactoseMetabolismArrows } from './glycogenAndGalactoseMetabolism_arrows.js';

export const glycogenAndGalactoseMetabolismData = {
  nodes: glycogenAndGalactoseMetabolismNodes,
  reactions: glycogenAndGalactoseMetabolismReactions,
  arrows: glycogenAndGalactoseMetabolismArrows,
  summary: {
    name: 'Glycogen and Galactose Metabolism',
    pathwayType: 'carbohydrates',
    description: 'Glycogen metabolism stores glucose in polymeric form and mobilizes it when needed, while the Leloir pathway funnels dietary galactose into glycolytic intermediates.',
    location: 'Cytoplasm (liver, muscle, and mammary cells)',
    netProducts: {
      'Glycogen': { produced: 1, consumed: 1, net: 0 },
      'Glucose-1-phosphate': { produced: 1, consumed: 1, net: 0 },
      'UDP-hexose pool': { produced: 1, consumed: 1, net: 0 }
    },
    keyRegulatorySteps: [
      { id: 'glycogen_n_plus_1', text: 'Glycogen synthase extends glycogen using UDP-glucose; activated by insulin, inhibited by phosphorylation.' },
      { id: 'glycogen_n', text: 'Glycogen phosphorylase liberates glucose-1-phosphate; activated by phosphorylation and AMP.' },
      { id: 'galactose_1_phosphate', text: 'Galactose-1-phosphate uridylyltransferase (GALT) couples galactose metabolism to the UDP-glucose pool.' }
    ]
  },
  subPathways: [
    {
      id: 'glycogen-synthesis',
      name: 'Glycogen Synthesis',
      description: 'Priming of glycogenin followed by glycogen synthase-driven chain elongation using UDP-glucose.',
      reactionIndices: [0, 1, 2, 3, 4, 7],
      nodeIds: ['glucose_6_phosphate', 'glucose_1_phosphate', 'udp_glucose', 'glycogenin', 'primed_glycogenin', 'glycogen_n', 'glycogen_n_2', 'glycogen_n_plus_1']
    },
    {
      id: 'glycogenolysis',
      name: 'Glycogen Breakdown',
      description: 'Glycogen phosphorylase releases glucose-1-phosphate from glycogen for rapid mobilization.',
      reactionIndices: [5, 6, 8],
      nodeIds: ['glycogen_n_plus_1', 'glycogen_n', 'glucose_1_phosphate', 'glucose']
    },
    {
      id: 'galactose-metabolism',
      name: 'Galactose (Leloir) Pathway',
      description: 'Galactose is phosphorylated, exchanges UDP groups to form UDP-galactose, and is converted to glucose-1-phosphate or lactose.',
      reactionIndices: [12, 13, 14, 15, 16],
      nodeIds: ['galactitol', 'galactose', 'galactose_1_phosphate', 'udp_glucose', 'udp_galactose', 'glucose_1_phosphate', 'lactose']
    }
  ]
};

export {
  glycogenAndGalactoseMetabolismNodes,
  glycogenAndGalactoseMetabolismReactions,
  glycogenAndGalactoseMetabolismArrows
};
