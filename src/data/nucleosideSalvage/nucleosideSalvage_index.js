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
      'ATP': { produced: 0, consumed: 6, net: -6 },
      'ADP': { produced: 6, consumed: 0, net: 6 },
      'Nucleotides': { produced: 6, consumed: 0, net: 6 }
    },
    keyRegulatorySteps: [
      { id: 'amp', text: 'Adenosine kinase: Phosphorylates adenosine to AMP' },
      { id: 'cmp', text: 'Uridine-cytidine kinase: Phosphorylates cytidine and uridine' },
      { id: 'dtmp', text: 'Thymidine kinase: Phosphorylates thymidine and deoxyuridine' }
    ]
  },
};

export { nucleosideSalvageNodes, nucleosideSalvageReactions, nucleosideSalvageArrows };

