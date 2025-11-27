/**
 * Glycolysis Pathway - Index
 */

import { glycolysisNodes } from './glycolysis_nodes.js';
import { glycolysisReactions } from './glycolysis_reactions.js';
import { glycolysisArrows } from './glycolysis_arrows.js';

export const glycolysisData = {
  nodes: glycolysisNodes,
  reactions: glycolysisReactions,
  arrows: glycolysisArrows,
  summary: {
    name: 'Glycolysis and Gluconeogenesis',
    pathwayType: 'carbohydrates',
    description: 'The metabolic pathway that converts glucose into pyruvate, releasing energy and producing ATP and NADH.',
    location: 'Cytoplasm',
    netProducts: {
      'ATP': { produced: 4, consumed: 2, net: 2 },
      'NADH': { produced: 2, consumed: 0, net: 2 },
      'Pyruvate': { produced: 2, consumed: 0, net: 2 }
    },
    keyRegulatorySteps: [
      { id: 'glucose_6_phosphate', text: 'Step 1: Hexokinase (inhibited by glucose-6-phosphate)' },
      { id: 'fructose_1_6_bisphosphate', text: 'Step 3: Phosphofructokinase-1 (key regulatory step)' },
      { id: 'pyruvate_glycolysis', text: 'Step 10: Pyruvate kinase (allosteric regulation)' }
    ]
  },
  // Sub-pathways definition
  subPathways: [
    {
      id: 'main-glycolysis',
      name: 'Glycolysis',
      description: 'The core ten-step pathway that converts glucose to pyruvate, producing ATP and NADH. Steps 1-10: Glucose → Glucose-6-phosphate → Fructose-6-phosphate → Fructose-1,6-bisphosphate → Glyceraldehyde-3-phosphate → 1,3-Bisphosphoglycerate → 3-Phosphoglycerate → 2-Phosphoglycerate → Phosphoenolpyruvate → Pyruvate.',
      reactionIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // Steps 1-10
      nodeIds: ['glucose', 'glucose_6_phosphate', 'fructose_6_phosphate', 'fructose_1_6_bisphosphate', 'dihydroxyacetone_phosphate', 'glyceraldehyde_3_phosphate', '1_3_bisphosphoglycerate', '3_phosphoglycerate', '2_phosphoglycerate', 'phosphoenolpyruvate', 'pyruvate_glycolysis']
    },
    {
      id: 'polyol-pathway',
      name: 'Polyol Pathway',
      description: 'Alternative pathway for glucose metabolism. Steps 11-12: Glucose is reduced to sorbitol by aldose reductase (using NADPH), and sorbitol is oxidized to fructose by sorbitol dehydrogenase (using NAD⁺).',
      reactionIndices: [10, 11], // Steps 11-12
      nodeIds: ['glucose', 'sorbitol', 'fructose_polyol']
    },
    {
      id: 'mannose-hexosamine-pathway',
      name: 'Mannose, Fructose-2,6-bisphosphate Regulation, and Hexosamine Pathway',
      description: 'Pathways involving mannose metabolism, fructose-2,6-bisphosphate regulation, and hexosamine biosynthesis. Steps 13-18: Mannose → Mannose-6-phosphate → Fructose-6-phosphate; Fructose-6-phosphate ↔ Fructose-2,6-bisphosphate (regulatory cycle); Fructose-6-phosphate → Glucosamine-6-phosphate → GAGs.',
      reactionIndices: [12, 13, 14, 15, 16, 17], // Steps 13-18
      nodeIds: ['mannose', 'mannose_6_phosphate', 'fructose_6_phosphate', 'fructose_2_6_bisphosphate', 'glucosamine_6_phosphate', 'gags']
    },
    {
      id: 'glycerol-fructose-metabolism',
      name: 'Glycerol and Fructose Metabolism',
      description: 'Pathways for glycerol and fructose entry into glycolysis. Steps 19-25: Glycerol → Glycerol-3-phosphate → Dihydroxyacetone phosphate (via cytoplasmic or mitochondrial pathways); Fructose → Fructose-1-phosphate → Dihydroxyacetone phosphate + Glyceraldehyde → Glyceraldehyde-3-phosphate.',
      reactionIndices: [18, 19, 20, 21, 22, 23, 24], // Steps 19-25
      nodeIds: ['glycerol', 'glycerol_3_phosphate', 'dihydroxyacetone_phosphate', 'fad_glycolysis', 'fadh2_glycolysis', 'coenzyme_q_reduced', 'coenzyme_q_oxidized', 'fructose', 'fructose_1_phosphate', 'glyceraldehyde', 'glyceraldehyde_3_phosphate']
    },
    {
      id: 'bisphosphoglycerate-shunt',
      name: '2,3-Bisphosphoglycerate Shunt',
      description: 'Alternative pathway for phosphoglycerate mutase. Steps 26-27: 1,3-Bisphosphoglycerate → 2,3-Bisphosphoglycerate → 2-Phosphoglycerate. This shunt is important in red blood cells for regulating oxygen affinity of hemoglobin.',
      reactionIndices: [25, 26], // Steps 26-27
      nodeIds: ['1_3_bisphosphoglycerate', '2_3_bisphosphoglycerate', '2_phosphoglycerate']
    },
    {
      id: 'gluconeogenesis-anaplerotic',
      name: 'Gluconeogenesis and Anaplerotic Extensions',
      description: 'Reactions connecting Glycolysis to the Citric Acid Cycle and Gluconeogenesis. Includes the conversion between Oxaloacetate and Malate, the bypass of Pyruvate Kinase via Oxaloacetate and Malate, and pyruvate transamination to alanine.',
      reactionIndices: [27, 28, 29, 30],
      nodeIds: ['pyruvate_glycolysis', 'oxaloacetate_glycolysis', 'malate_glycolysis', 'phosphoenolpyruvate', 'alanine_glycolysis', 'glutamine_glycolysis', 'alpha_ketoglutarate_glycolysis']
    },
    {
      id: 'malate-aspartate-shuttle',
      name: 'Malate-Aspartate Shuttle',
      description: 'A system for transferring reducing equivalents (NADH) from the cytosol into the mitochondria. Involves two aspartate aminotransferase (AST) reactions and membrane transporters that exchange glutamate/aspartate and α-ketoglutarate/malate between compartments. Also includes citrate transport from mitochondria to cytosol.',
      reactionIndices: [31, 32, 33, 34, 35, 36], // Mitochondrial AST, Glutamate Transport, Aspartate Transport, α-Ketoglutarate Transport, Cytosolic AST, Citrate Transport
      nodeIds: ['glutamate_mito_shuttle', 'aspartate_mito_shuttle', 'aspartate_cyto_shuttle', 'glutamate_cyto_shuttle', 'alpha_ketoglutarate_mito_shuttle', 'alpha_ketoglutarate_cyto_shuttle', 'oxaloacetate_glycolysis', 'oxaloacetate_cyto_shuttle', 'citrate', 'citrate_fas']
    }
  ]
};

export { glycolysisNodes, glycolysisReactions, glycolysisArrows };

