/**
 * Single-Carbon Metabolism and Sulfur-Containing Amino Acids Pathway - Index
 */

import { singleCarbonMetabolismNodes } from './singleCarbonMetabolism_nodes.js';
import { singleCarbonMetabolismReactions } from './singleCarbonMetabolism_reactions.js';
import { singleCarbonMetabolismArrows } from './singleCarbonMetabolism_arrows.js';

export const singleCarbonMetabolismData = {
  nodes: singleCarbonMetabolismNodes,
  reactions: singleCarbonMetabolismReactions,
  arrows: singleCarbonMetabolismArrows,
  cycles: [
    {
      cyclic_id: 'methionine_homocysteine_cycle',
      name: 'Methionine-Homocysteine Cycle',
      description: 'Cyclic pathway for methionine metabolism and methyl group transfer via SAM',
      nodeOrder: ['methionine', 'sam', 'sah', 'homocysteine'], // Order of nodes in the cycle (clockwise)
      startNode: 'methionine', // Starting node of the cycle
      // Cycle center position (calculated from node positions for by-arrow angle calculation)
      // Methionine: (1660, 500), SAM: (1940, 500), SAH: (1940, 780), Homocysteine: (1660, 780)
      // Center: ((1660+1940+1940+1660)/4, (500+500+780+780)/4) = (1900, 640)
      // Moved up by 0.3 unit_space (60 pixels)
      center: { 
        x: 1900, // Calculated center from node positions
        y: 640 // Calculated center from node positions (moved up by 0.3 unit_space)
      },
      // Default angle for by-arrows (in degrees, pointing outward from cycle center)
      // 180 degrees = π radians, rotates by-arrows 180 degrees from calculated outward direction
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
    name: 'Single-Carbon Metabolism and Sulfur-Containing Amino Acids',
    pathwayType: 'amino_acids',
    description: 'Metabolic pathways for single-carbon metabolism through folate cycle and synthesis of serine and glycine from glycolysis intermediates. Connects amino acid metabolism with nucleotide synthesis through one-carbon unit transfer. Includes methionine-homocysteine cycle for methyl group transfer. Also includes homocysteine catabolism pathway (transsulfuration) extending downward from homocysteine, with branches to taurine biosynthesis, threonine catabolism (connecting to TCA cycle), and cysteine catabolism (connecting to pyruvate).',
    location: 'Cytoplasm, Mitochondrial matrix',
    netProducts: {
      'Serine': { produced: 1, consumed: 0, net: 1 },
      'Glycine': { produced: 1, consumed: 0, net: 1 },
      'N5,N10-methylene-THF': { produced: 1, consumed: 0, net: 1 },
      'Cysteine': { produced: 1, consumed: 0, net: 1 },
      'Taurine': { produced: 1, consumed: 0, net: 1 }
    },
    keyRegulatorySteps: [
      { id: 'thf', text: 'Step 2: Dihydrofolate reductase (DHFR) - Critical for folate cycle, target of methotrexate' },
      { id: 'serine', text: 'Step 9: Serine hydroxymethyltransferase (SHMT) - Key connection between amino acid and single-carbon metabolism' },
      { id: 'methionine', text: 'Methionine-Homocysteine Cycle - Central cycle for methyl group transfer via SAM' },
      { id: 'homocysteine', text: 'Homocysteine Catabolism - Transsulfuration pathway: homocysteine → cystathionine → cysteine, requires vitamin B6' },
      { id: 'cysteine_sulfinate', text: 'Cysteine Sulfinate - Branch point: leads to taurine biosynthesis or pyruvate production' },
      { id: 'alpha_ketobutyrate', text: 'α-Ketobutyrate - Connects threonine and cystathionine catabolism to TCA cycle via succinyl-CoA' }
    ]
  },
};

export { singleCarbonMetabolismNodes, singleCarbonMetabolismReactions, singleCarbonMetabolismArrows };

