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
  // Sub-pathways definition - 7 sub-pathways
  subPathways: [
    {
      id: 'folate-metabolism',
      name: 'Folate Metabolism',
      description: 'Folate activation and single-carbon unit metabolism. Includes reduction of folate to dihydrofolate and THF, formylation to N10-formyl-THF, cyclization to N5,N10-methenyl-THF, and reduction to N5,N10-methylene-THF.',
      reactionIndices: [0, 1, 2, 3, 4, 5, 6, 7], // Steps 1, 2, 3, 3a, 4, 4a, 5, 5a
      nodeIds: ['folate', 'dihydrofolate_single_carbon', 'thf', 'n10_formyl_thf', 'purine_synthesis_single_carbon', 'n5_n10_methenyl_thf', 'histidine_catabolism_single_carbon', 'n5_n10_methylene_thf', 'pyrimidine_synthesis_single_carbon']
    },
    {
      id: 'serine-glycine-synthesis',
      name: 'Serine and Glycine Synthesis',
      description: 'Synthesis of serine and glycine from glycolysis intermediates. Includes 3-phosphoglycerate dehydrogenation, transamination to 3-phosphoserine, dephosphorylation to serine, and conversion of serine to glycine with transfer of methylene group to THF.',
      reactionIndices: [8, 9, 10, 11, 12, 13], // Steps 6, 7, 8, 8a, 9, 9a
      nodeIds: ['3_phosphoglycerate', '3_phosphopyruvate', 'alpha_ketoglutarate_serine', '3_phosphoserine', 'serine', 'phosphatidylserine_single_carbon', 'ceramide_single_carbon', 'sphingosine_single_carbon', 'glycine', 'glutathione_glycine', 'nucleotides_glycine', 'porphyrins_glycine', 'thf', 'n5_n10_methylene_thf']
    },
    {
      id: 'creatine-synthesis',
      name: 'Creatine Synthesis and Degradation',
      description: 'Creatine synthesis pathway from N5,N10-methylene-THF and glycine. Includes conversion to guanidinoacetate, methylation to creatine, and degradation pathways to creatinine (direct or via phosphocreatine).',
      reactionIndices: [14, 15, 16, 17, 18, 19], // Steps 10, 11, 12, 13, 14, 15
      nodeIds: ['n5_n10_methylene_thf', 'glycine', 'guanidinoacetate', 'creatine', 'creatinine', 'phosphocreatine']
    },
    {
      id: 'methionine-homocysteine-cycle',
      name: 'Methionine-Homocysteine Cycle',
      description: 'Methionine-homocysteine cycle for methyl group transfer. Includes reduction of N5,N10-methylene-THF to N5-methyl-THF, remethylation of homocysteine to methionine, activation of methionine to SAM, SAM methylation to SAH, and hydrolysis of SAH to homocysteine.',
      reactionIndices: [21, 22, 23, 24, 25, 26], // Steps 16, 17, 18, 19, 20, 20a
      nodeIds: ['n5_n10_methylene_thf', 'n5_methyl_thf', 'methionine', 'sam', 'sah', 'adenosine_single_carbon', 'nucleotide_salvage', 'homocysteine']
    },
    {
      id: 'homocysteine-catabolism-threonine',
      name: 'Homocysteine Catabolism and Threonine Catabolism',
      description: 'Homocysteine catabolism through transsulfuration pathway and threonine catabolism. Includes homocysteine to cystathionine, cystathionine to cysteine, cysteine to cysteine sulfinate, cysteine sulfinate to hypotaurine, and threonine to α-ketobutyrate.',
      reactionIndices: [26, 27, 29, 30, 31], // Steps 21, 22, 22a, 23, 24, 28 (Step 28 = Threonine → α-Ketobutyrate)
      nodeIds: ['homocysteine', 'cystathionine', 'cysteine', 'glutathione_glycine', 'coenzyme_a_single_carbon', 'cysteine_sulfinate', 'hypotaurine', 'threonine', 'alpha_ketobutyrate']
    },
    {
      id: 'cysteine-catabolism-pyruvate',
      name: 'Cysteine Catabolism to Pyruvate',
      description: 'Cysteine catabolism pathway to pyruvate via transsulfuration. Includes homocysteine to cystathionine, cystathionine to cysteine, hypotaurine to taurine, threonine to α-ketobutyrate, and α-ketobutyrate to succinyl-CoA.',
      reactionIndices: [26, 27, 28, 32, 33, 34], // Steps 21, 22, 27, 28, 29 (Step 27 = Hypotaurine → Taurine, Step 28 = Threonine → α-Ketobutyrate, Step 29 = α-Ketobutyrate → Succinyl-CoA)
    },
    {
      id: 'taurine-biosynthesis',
      name: 'Taurine Biosynthesis',
      description: 'Taurine biosynthesis pathway from cysteine via transsulfuration. Includes homocysteine to cystathionine, cystathionine to cysteine, cysteine to cysteine sulfinate, cysteine sulfinate to hypotaurine, hypotaurine to taurine, and taurine to bile salts.',
      reactionIndices: [26, 27, 35, 36, 37], // Steps 21, 22, 24, 27, 30, 32 (Step 24 = Cysteine Sulfinate → Hypotaurine, Step 27 = Hypotaurine → Taurine, Step 32 = Taurine → Bile Salts)
    }
  ]
};

export { singleCarbonMetabolismNodes, singleCarbonMetabolismReactions, singleCarbonMetabolismArrows };

