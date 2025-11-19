/**
 * Nucleoside Salvage Pathway - Index
 */

import { nucleosideSalvageNodes } from './nucleosideSalvage_nodes.js';
import { nucleosideSalvageReactions } from './nucleosideSalvage_reactions.js';
import { nucleosideSalvageArrows } from './nucleosideSalvage_arrows.js';

export const nucleosideSalvageData = {
  nodes: nucleosideSalvageNodes,
  reactions: nucleosideSalvageReactions,
  arrows: nucleosideSalvageArrows,
  summary: {
    name: 'Nucleoside Salvage',
    pathwayType: 'nucleotides',
    description: 'The metabolic pathway that phosphorylates nucleosides into their corresponding 5\'-monophosphate forms using ATP. This pathway allows cells to recycle nucleosides from degraded nucleic acids or dietary sources.',
    location: 'Cytoplasm',
    netProducts: {
      'ATP': { produced: 0, consumed: 1, net: -1 },
      'ADP': { produced: 1, consumed: 0, net: 1 },
      'Nucleotides': { produced: 1, consumed: 0, net: 1 }
    },
    keyRegulatorySteps: [
      { id: 'amp', text: 'Adenosine kinase: Phosphorylates adenosine to AMP' },
      { id: 'cmp', text: 'Uridine-cytidine kinase: Phosphorylates cytidine and uridine' },
      { id: 'dtmp', text: 'Thymidine kinase: Phosphorylates thymidine and deoxyuridine' }
    ]
  },
  // Sub-pathways definition - 6 individual sub-pathways, one for each reaction
  subPathways: [
    {
      id: 'adenosine-phosphorylation',
      name: 'Adenosine Phosphorylation',
      description: 'Phosphorylation of adenosine to adenosine-5\'-monophosphate (AMP) using ATP, catalyzed by adenosine kinase.',
      reactionIndices: [0], // Adenosine → AMP
      nodeIds: ['adenosine', 'amp']
    },
    {
      id: 'cytidine-phosphorylation',
      name: 'Cytidine Phosphorylation',
      description: 'Phosphorylation of cytidine to cytidine-5\'-monophosphate (CMP) using ATP, catalyzed by uridine-cytidine kinase.',
      reactionIndices: [1], // Cytidine → CMP
      nodeIds: ['cytidine', 'cmp']
    },
    {
      id: 'uridine-phosphorylation',
      name: 'Uridine Phosphorylation',
      description: 'Phosphorylation of uridine to uridine-5\'-monophosphate (UMP) using ATP, catalyzed by uridine-cytidine kinase.',
      reactionIndices: [2], // Uridine → UMP
      nodeIds: ['uridine', 'ump']
    },
    {
      id: 'deoxycytidine-phosphorylation',
      name: 'Deoxycytidine Phosphorylation',
      description: 'Phosphorylation of deoxycytidine to deoxycytidine-5\'-monophosphate (dCMP) using ATP, catalyzed by deoxycytidine kinase.',
      reactionIndices: [3], // Deoxycytidine → dCMP
      nodeIds: ['deoxycytidine', 'dcmp']
    },
    {
      id: 'thymidine-phosphorylation',
      name: 'Thymidine Phosphorylation',
      description: 'Phosphorylation of thymidine to deoxythymidine-5\'-monophosphate (dTMP) using ATP, catalyzed by thymidine kinase.',
      reactionIndices: [4], // Thymidine → dTMP
      nodeIds: ['thymidine', 'dtmp']
    },
    {
      id: 'deoxyuridine-phosphorylation',
      name: 'Deoxyuridine Phosphorylation',
      description: 'Phosphorylation of deoxyuridine to deoxyuridine-5\'-monophosphate (dUMP) using ATP, catalyzed by thymidine kinase.',
      reactionIndices: [5], // Deoxyuridine → dUMP
      nodeIds: ['deoxyuridine', 'dump']
    }
  ]
};

export { nucleosideSalvageNodes, nucleosideSalvageReactions, nucleosideSalvageArrows };

