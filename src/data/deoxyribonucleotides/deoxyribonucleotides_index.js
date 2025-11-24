/**
 * Deoxyribonucleotides Synthesis Pathway - Index
 */

import { deoxyribonucleotidesNodes, circle_center_x, circle_center_y } from './deoxyribonucleotides_nodes.js';
import { deoxyribonucleotidesReactions } from './deoxyribonucleotides_reactions.js';
import { deoxyribonucleotidesArrows } from './deoxyribonucleotides_arrows.js';

export const deoxyribonucleotidesData = {
  nodes: deoxyribonucleotidesNodes,
  reactions: deoxyribonucleotidesReactions,
  arrows: deoxyribonucleotidesArrows,
  cycles: [
    {
      cyclic_id: 'folate_cycle',
      name: 'Folate Cycle',
      description: 'Cyclic pathway for folate regeneration in thymidine synthesis',
      nodeOrder: ['n5n10_methylene_thf', 'dihydrofolate', 'thf_deoxy'], // Order of nodes in the cycle
      startNode: 'n5n10_methylene_thf', // Starting node of the cycle
      // Cycle center position (calculated from node positions)
      // Perfect circle: center at (base_x + column_spacing * 3.75, base_y + unit_space * 5.0)
      // n5n10_methylene_thf: (3837.5, 4350) - top, dihydrofolate: (3707.6, 4125) - bottom-left, thf_deoxy: (3967.4, 4125) - bottom-right
      // Center: (3837.5, 4200)
      center: { 
        x: circle_center_x, // base_x + column_spacing * 3.75
        y: circle_center_y // base_y + unit_space * 5.0
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
    name: 'Deoxyribonucleotides Synthesis',
    pathwayType: 'nucleotides',
    description: 'The metabolic pathway that synthesizes deoxyribonucleotide triphosphates (dATP, dGTP, dCTP, dUTP) from their corresponding ribonucleotide triphosphate precursors (ATP, GTP, CTP, UTP). Each pathway involves three steps: dephosphorylation, reduction, and re-phosphorylation. The pathway is organized in four parallel columns, one for each nucleotide base.',
    location: 'Cytoplasm',
    netProducts: {
      'ATP': { produced: 0, consumed: 1, net: -1 },
      'ADP': { produced: 1, consumed: 0, net: 1 },
      'H₂O': { produced: 0, consumed: 1, net: -1 },
      'Pi': { produced: 1, consumed: 0, net: 1 },
      'dNTP': { produced: 1, consumed: 0, net: 1 }
    },
    keyRegulatorySteps: [
      { id: 'dadp', text: 'Ribonucleotide reductase - Allosterically regulated by dATP (feedback inhibition), controlling the rate of deoxyribonucleotide synthesis' },
      { id: 'dctp', text: 'Spontaneous deamination - dCTP can spontaneously convert to dUTP, releasing NH₄⁺' }
    ]
  },
  // Sub-pathways definition
  subPathways: [
    {
      id: 'datp-synthesis',
      name: 'dATP Synthesis',
      description: 'Synthesis of deoxyadenosine triphosphate (dATP) from ATP via dephosphorylation, reduction, and re-phosphorylation.',
      reactionIndices: [0, 1, 2], // ATP → ADP → dADP → dATP
      nodeIds: ['atp_deoxy', 'adp_deoxy', 'dadp', 'datp']
    },
    {
      id: 'dgtp-synthesis',
      name: 'dGTP Synthesis',
      description: 'Synthesis of deoxyguanosine triphosphate (dGTP) from GTP via dephosphorylation, reduction, and re-phosphorylation.',
      reactionIndices: [3, 4, 5], // GTP → GDP → dGDP → dGTP
      nodeIds: ['gtp_deoxy', 'gdp_deoxy', 'dgdp', 'dgtp']
    },
    {
      id: 'dctp-synthesis',
      name: 'dCTP Synthesis',
      description: 'Synthesis of deoxycytidine triphosphate (dCTP) from CTP via dephosphorylation, reduction, and re-phosphorylation.',
      reactionIndices: [6, 7, 8], // CTP → CDP → dCDP → dCTP
      nodeIds: ['ctp_deoxy', 'cdp_deoxy', 'dcdp', 'dctp']
    },
    {
      id: 'dttp-synthesis',
      name: 'dTTP Synthesis',
      description: 'Synthesis of deoxythymidine triphosphate (dTTP). Shares the first three steps with dCTP synthesis (CTP → CDP → dCDP), then continues through dCMP, dUMP, dTMP, dTDP to dTTP. Includes UTP → dUTP pathway and dCTP → dUTP conversion as alternative routes to dUMP. Includes folate cycle reactions for methyl group donation.',
      reactionIndices: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], // CTP → CDP → dCDP → dCMP → dUMP → dTMP → dTDP → dTTP (includes shared first 3 steps, UTP→UDP→dUDP→dUTP pathway, dCTP→dUTP conversion, alternative dUTP→dUMP route, and folate cycle)
      nodeIds: ['ctp_deoxy', 'cdp_deoxy', 'dcdp', 'utp_deoxy', 'udp_deoxy', 'dudp', 'dutp', 'dcmp_deoxy', 'dump_deoxy', 'dtmp_deoxy', 'dtdp_deoxy', 'dttp_deoxy', 'n5n10_methylene_thf', 'dihydrofolate', 'thf_deoxy'] // Includes UTP pathway nodes and dutp for alternative routes
    }
  ]
};

export { deoxyribonucleotidesNodes, deoxyribonucleotidesReactions, deoxyribonucleotidesArrows };

