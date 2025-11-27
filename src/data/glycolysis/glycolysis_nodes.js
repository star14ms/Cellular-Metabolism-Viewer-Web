/**
 * Glycolysis Pathway - Nodes Data
 * 
 * Positions are relative to the first node (glucose) using unit_space notation.
 * unit_space = 150 (standard spacing between nodes)
 */

const unit_space = 150;
const base_x = 100;
const base_y = 0;

export const glycolysisNodes = [
  {
    id: 'glucose',
    type: 'molecule',
    name: 'D-Glucose',
    formula: 'C₆H₁₂O₆',
    smiles: 'C([C@@H]1[C@H]([C@@H]([C@H](C(O1)O)O)O)O)O',
    description: 'A hexose sugar that serves as the primary energy source',
    position: { x: base_x, y: base_y + unit_space * -3 }
  },
  {
    id: 'sorbitol',
    type: 'molecule',
    name: 'Sorbitol',
    formula: 'C₆H₁₄O₆',
    smiles: 'C([C@H]([C@H]([C@H]([C@H](CO)O)O)O)O)O',
    description: 'A sugar alcohol, intermediate in the polyol pathway',
    position: { x: base_x + unit_space * -1, y: base_y + unit_space * -2 }
  },
  {
    id: 'fructose_polyol',
    type: 'molecule',
    name: 'D-Fructose (from polyol pathway)',
    formula: 'C₆H₁₂O₆',
    smiles: 'C([C@H](C([C@H](C(=O)CO)O)O)O)O',
    description: 'A hexose sugar produced from sorbitol via the polyol pathway',
    position: { x: base_x + unit_space * -2, y: base_y + unit_space * -2 }
  },
  {
    id: 'glucose_6_phosphate',
    type: 'molecule',
    name: 'Glucose-6-phosphate',
    formula: 'C₆H₁₁O₉P',
    smiles: 'C([C@@H]1[C@H]([C@@H]([C@H](C(O1)OP(=O)(O)O)O)O)O)O',
    description: 'Phosphorylated glucose',
    position: { x: base_x, y: base_y + unit_space * -1 }
  },
  {
    id: 'fructose_6_phosphate',
    type: 'molecule',
    name: 'Fructose-6-phosphate',
    formula: 'C₆H₁₁O₉P',
    smiles: 'C([C@H](C([C@H](C(=O)CO)O)O)OP(=O)(O)O)O',
    description: 'Isomerized form of glucose-6-phosphate',
    position: { x: base_x, y: base_y + unit_space * 0 }
  },
  {
    id: 'fructose_2_6_bisphosphate',
    type: 'molecule',
    name: 'Fructose-2,6-bisphosphate',
    formula: 'C₆H₁₄O₁₂P₂',
    smiles: 'C([C@H](C([C@H](C(=O)CO)OP(=O)(O)O)O)OP(=O)(O)O)O',
    description: 'Regulatory molecule that controls glycolysis and gluconeogenesis',
    position: { x: base_x + unit_space * -3, y: base_y + unit_space * 0 }
  },
  {
    id: 'mannose',
    type: 'molecule',
    name: 'D-Mannose',
    formula: 'C₆H₁₂O₆',
    smiles: 'C([C@H]([C@H]([C@H](C(=O)CO)O)O)O)O',
    description: 'A hexose sugar epimer of glucose',
    position: { x: base_x + unit_space * -3, y: base_y + unit_space * 1 }
  },
  {
    id: 'mannose_6_phosphate',
    type: 'molecule',
    name: 'Mannose-6-phosphate',
    formula: 'C₆H₁₁O₉P',
    smiles: 'C([C@H]([C@H]([C@H](C(=O)CO)O)O)OP(=O)(O)O)O',
    description: 'Phosphorylated mannose',
    position: { x: base_x + unit_space * -2, y: base_y + unit_space * 1 }
  },
  {
    id: 'glucosamine_6_phosphate',
    type: 'molecule',
    name: 'Glucosamine-6-phosphate',
    formula: 'C₆H₁₄NO₈P',
    smiles: 'C([C@H]([C@H]([C@H](C(=O)CO)O)O)OP(=O)(O)O)NC',
    description: 'Amino sugar phosphate, precursor to glycosaminoglycans',
    position: { x: base_x + unit_space * -1, y: base_y + unit_space * 1 }
  },
  {
    id: 'gags',
    type: 'molecule',
    name: 'GAGs (Glycosaminoglycans)',
    formula: 'Variable',
    smiles: '',
    imageUrl: 'https://cdn1.byjus.com/wp-content/uploads/2021/03/Glycosaminoglycans-700x281.png',
    description: 'Glycosaminoglycans, long unbranched polysaccharides containing repeating disaccharide units',
    position: { x: base_x + unit_space * -1, y: base_y + unit_space * 2 }
  },
  {
    id: 'fructose_1_6_bisphosphate',
    type: 'molecule',
    name: 'Fructose-1,6-bisphosphate',
    formula: 'C₆H₁₄O₁₂P₂',
    smiles: 'C([C@H](C([C@H](C(=O)CO)OP(=O)(O)O)O)OP(=O)(O)O)O',
    description: 'Bisphosphorylated fructose',
    position: { x: base_x, y: base_y + unit_space * 3 - unit_space * 0.5 }
  },
  {
    id: 'glycerol_3_phosphate',
    type: 'molecule',
    name: 'Glycerol-3-phosphate',
    formula: 'C₃H₉O₆P',
    smiles: 'C(C(CO)OP(=O)(O)O)O',
    description: 'Phosphorylated glycerol',
    position: { x: base_x + unit_space * -4, y: base_y + unit_space * 4 }
  },
  {
    id: 'glycerol',
    type: 'molecule',
    name: 'Glycerol',
    formula: 'C₃H₈O₃',
    smiles: 'C(C(CO)O)O',
    description: 'A three-carbon alcohol',
    position: { x: base_x + unit_space * -5, y: base_y + unit_space * 4 }
  },
  {
    id: 'fad_glycolysis',
    type: 'molecule',
    name: 'FAD',
    formula: 'C₂₇H₃₃N₉O₁₅P₂',
    smiles: 'CC1=CC2=C(C=C1C)N(C3=C(N2)C(=O)NC(=O)N3)C4=CC(=C(C=C4)N)CC(C(C(C(=O)O)OP(=O)(O)OP(=O)(O)OCC5C(C(C(C(O5)N6C=NC7=C6N=CN=C7N)O)O)O)O)O',
    description: 'Flavin adenine dinucleotide (oxidized form)',
    position: { x: base_x + unit_space * -3.5, y: base_y + unit_space * 1.87 + unit_space * 1 }
  },
  {
    id: 'fadh2_glycolysis',
    type: 'molecule',
    name: 'FADH₂',
    formula: 'C₂₇H₃₅N₉O₁₅P₂',
    smiles: 'CC1=CC2=C(C=C1C)N(C3=C(N2)C(=O)NC(=O)N3)C4=CC(=C(C=C4)N)CC(C(C(C(=O)O)OP(=O)(O)OP(=O)(O)OCC5C(C(C(C(O5)N6C=NC7=C6N=CN=C7N)O)O)O)O)O',
    description: 'Flavin adenine dinucleotide (reduced form)',
    position: { x: base_x + unit_space * -2.5, y: base_y + unit_space * 1.87 + unit_space * 1 }
  },
  {
    id: 'coenzyme_q_reduced',
    type: 'carrier',
    name: 'Coenzyme Q (reduced)',
    formula: 'C₅₉H₉₂O₄',
    smiles: 'CC1=C(C(=O)C(=C(C1=O)OC)OC)CC=C(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCC',
    description: 'Coenzyme Q in reduced form (ubiquinol, QH₂), located in mitochondrial matrix',
    position: { x: base_x + unit_space * -3.5, y: base_y + unit_space * 0.87 + unit_space * 1 }
  },
  {
    id: 'coenzyme_q_oxidized',
    type: 'carrier',
    name: 'Coenzyme Q (oxidized)',
    formula: 'C₅₉H₉₀O₄',
    smiles: 'CC1=C(C(=O)C(=C(C1=O)OC)OC)CC=C(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCC',
    description: 'Coenzyme Q in oxidized form (ubiquinone, Q), located in mitochondrial matrix',
    position: { x: base_x + unit_space * -2.5, y: base_y + unit_space * 0.87 + unit_space * 1 }
  },
  {
    id: 'dihydroxyacetone_phosphate',
    type: 'molecule',
    name: 'Dihydroxyacetone phosphate',
    formula: 'C₃H₇O₆P',
    smiles: 'CC(=O)C(OP(=O)(O)O)O',
    description: 'Triose phosphate',
    position: { x: base_x + unit_space * -2, y: base_y + unit_space * 4 }
  },
  {
    id: 'glyceraldehyde',
    type: 'molecule',
    name: 'Glyceraldehyde',
    formula: 'C₃H₆O₃',
    smiles: 'C([C@H](C=O)O)O',
    description: 'A triose sugar',
    position: { x: base_x + unit_space * -1, y: base_y + unit_space * 5.5 }
  },
  {
    id: 'fructose_1_phosphate',
    type: 'molecule',
    name: 'Fructose-1-phosphate',
    formula: 'C₆H₁₃O₉P',
    smiles: 'C([C@H](C([C@H](C(=O)CO)O)O)OP(=O)(O)O)O',
    description: 'Phosphorylated fructose',
    position: { x: base_x + unit_space * -3, y: base_y + unit_space * 5.5 }
  },
  {
    id: 'fructose',
    type: 'molecule',
    name: 'D-Fructose',
    formula: 'C₆H₁₂O₆',
    smiles: 'C([C@H](C([C@H](C(=O)CO)O)O)O)O',
    description: 'A hexose sugar',
    position: { x: base_x + unit_space * -4, y: base_y + unit_space * 5.5 }
  },
  {
    id: 'glyceraldehyde_3_phosphate',
    type: 'molecule',
    name: 'Glyceraldehyde-3-phosphate',
    formula: 'C₃H₇O₆P',
    smiles: 'C([C@H](C(=O)O)OP(=O)(O)O)O',
    description: 'Triose phosphate',
    position: { x: base_x, y: base_y + unit_space * 4 }
  },
  {
    id: '1_3_bisphosphoglycerate',
    type: 'molecule',
    name: '1,3-Bisphosphoglycerate',
    formula: 'C₃H₈O₁₀P₂',
    smiles: 'C([C@H](C(=O)OP(=O)(O)O)OP(=O)(O)O)O',
    description: 'High-energy intermediate',
    position: { x: base_x, y: base_y + unit_space * 5 }
  },
  {
    id: '3_phosphoglycerate',
    type: 'molecule',
    name: '3-Phosphoglycerate',
    formula: 'C₃H₇O₇P',
    smiles: 'C([C@H](C(=O)O)OP(=O)(O)O)O',
    description: 'Phosphorylated glycerate',
    position: { x: base_x, y: base_y + unit_space * 6 }
  },
  {
    id: '2_3_bisphosphoglycerate',
    type: 'molecule',
    name: '2,3-Bisphosphoglycerate',
    formula: 'C₃H₈O₁₀P₂',
    smiles: 'C([C@H](C(=O)O)OP(=O)(O)O)OP(=O)(O)O',
    description: 'Intermediate in phosphoglycerate mutase reaction',
    position: { x: base_x + unit_space * -1.5, y: base_y + unit_space * 7 }
  },
  {
    id: '2_phosphoglycerate',
    type: 'molecule',
    name: '2-Phosphoglycerate',
    formula: 'C₃H₇O₇P',
    smiles: 'C([C@@H](C(=O)O)O)OP(=O)(O)O',
    description: 'Rearranged phosphoglycerate',
    position: { x: base_x, y: base_y + unit_space * 7 }
  },
  {
    id: 'phosphoenolpyruvate',
    type: 'molecule',
    name: 'Phosphoenolpyruvate (PEP)',
    formula: 'C₃H₅O₆P',
    smiles: 'C(=C(OP(=O)(O)O)C(=O)O)O',
    description: 'High-energy intermediate',
    position: { x: base_x, y: base_y + unit_space * 8 }
  },
  {
    id: 'pyruvate_glycolysis',
    type: 'molecule',
    name: 'Pyruvate (Cytosolic)',
    formula: 'C₃H₄O₃⁻',
    smiles: 'CC(=O)C(=O)[O-]',
    description: 'A three-carbon compound produced by glycolysis',
    position: { x: base_x, y: base_y + unit_space * 9 }
  },
  {
    id: 'lactate',
    type: 'molecule',
    name: 'Lactate',
    formula: 'C₃H₅O₃⁻',
    description: 'Lactic acid, produced by fermentation from pyruvate',
    smiles: 'CC(C(=O)[O-])O',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 9 } // To the right of pyruvate
  },
  {
    id: 'oxaloacetate_glycolysis',
    type: 'molecule',
    name: 'Oxaloacetate',
    formula: 'C₄H₄O₅',
    smiles: 'OC(=O)CC(=O)C(=O)O',
    description: 'Intermediate in the citric acid cycle and gluconeogenesis',
    position: { x: base_x + unit_space * -1.5, y: base_y + unit_space * 8 }
  },
  {
    id: 'malate_glycolysis',
    type: 'molecule',
    name: 'Malate',
    formula: 'C₄H₆O₅',
    smiles: 'OC(=O)C[C@H](O)C(=O)O',
    description: 'Intermediate in the citric acid cycle',
    position: { x: base_x + unit_space * -1.5, y: base_y + unit_space * 9 }
  },
  {
    id: 'alanine_glycolysis',
    type: 'molecule',
    name: 'Alanine',
    formula: 'C₃H₇NO₂',
    description: 'Amino acid produced from pyruvate via transamination',
    smiles: 'CC(C(=O)O)N',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 10 } // Below pyruvate
  },
  // By-molecule nodes for Pyruvate Transamination
  {
    id: 'glutamine_glycolysis',
    type: 'molecule',
    name: 'Glutamine',
    pathwayType: 'amino_acids',
    formula: 'C₅H₁₀N₂O₃',
    smiles: 'N[C@@H](CCC(=O)O)C(=O)N',
    description: 'Glutamine, amino group donor for pyruvate transamination',
    position: { x: base_x + unit_space * 0.33, y: base_y + unit_space * 10.0 } // Left of pyruvate->alanine arrow
  },
  {
    id: 'alpha_ketoglutarate_glycolysis',
    type: 'molecule',
    name: 'α-Ketoglutarate',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₅H₆O₅',
    smiles: 'C(CC(=O)O)CC(=O)C(=O)O',
    description: 'α-Ketoglutarate, produced from glutamine in pyruvate transamination',
    position: { x: base_x + unit_space * 1.05, y: base_y + unit_space * 10.33 } // Below glutamine
  },
  // Malate-Aspartate Shuttle nodes
  // Left column: Glutamate (mito), Aspartate (mito), Aspartate (cyto), Glutamate (cyto)
  {
    id: 'glutamate_mito_shuttle',
    type: 'molecule',
    name: 'Glutamate',
    pathwayType: 'amino_acids',
    formula: 'C₅H₉NO₄',
    smiles: 'C(CC(=O)O)CC(C(=O)O)N',
    description: 'Glutamate in mitochondrial matrix, part of malate-aspartate shuttle',
    position: { x: base_x + unit_space * -2.5, y: base_y + unit_space * 9.66 } // Top left
  },
  {
    id: 'aspartate_mito_shuttle',
    type: 'molecule',
    name: 'Aspartate',
    pathwayType: 'amino_acids',
    formula: 'C₄H₇NO₄',
    smiles: 'C(C(C(=O)O)N)C(=O)O',
    description: 'Aspartate in mitochondrial matrix, part of malate-aspartate shuttle',
    position: { x: base_x + unit_space * -2.5, y: base_y + unit_space * 10.66 } // Second from top left
  },
  {
    id: 'aspartate_cyto_shuttle',
    type: 'molecule',
    name: 'Aspartate',
    pathwayType: 'amino_acids',
    formula: 'C₄H₇NO₄',
    smiles: 'C(C(C(=O)O)N)C(=O)O',
    description: 'Aspartate in cytosol, part of malate-aspartate shuttle',
    position: { x: base_x + unit_space * -2.5, y: base_y + unit_space * 11.66 } // Third from top left
  },
  {
    id: 'glutamate_cyto_shuttle',
    type: 'molecule',
    name: 'Glutamate',
    pathwayType: 'amino_acids',
    formula: 'C₅H₉NO₄',
    smiles: 'C(CC(=O)O)CC(C(=O)O)N',
    description: 'Glutamate in cytosol, part of malate-aspartate shuttle',
    position: { x: base_x + unit_space * -2.5, y: base_y + unit_space * 12.66 } // Bottom left
  },
  // Right column: α-ketoglutarate (mito), α-ketoglutarate (cyto), oxaloacetate (cyto)
  {
    id: 'alpha_ketoglutarate_mito_shuttle',
    type: 'molecule',
    name: 'α-Ketoglutarate',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₅H₆O₅',
    smiles: 'C(CC(=O)O)CC(=O)C(=O)O',
    description: 'α-Ketoglutarate in mitochondrial matrix, part of malate-aspartate shuttle',
    position: { x: base_x + unit_space * -1.5, y: base_y + unit_space * 10.66 } // Same height as first Aspartate
  },
  {
    id: 'alpha_ketoglutarate_cyto_shuttle',
    type: 'molecule',
    name: 'α-Ketoglutarate',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₅H₆O₅',
    smiles: 'C(CC(=O)O)CC(=O)C(=O)O',
    description: 'α-Ketoglutarate in cytosol, part of malate-aspartate shuttle',
    position: { x: base_x + unit_space * -1.5, y: base_y + unit_space * 11.66 } // Second from top right
  },
  {
    id: 'oxaloacetate_cyto_shuttle',
    type: 'molecule',
    name: 'Oxaloacetate',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₄H₄O₅',
    smiles: 'OC(=O)CC(=O)C(=O)O',
    description: 'Oxaloacetate in cytosol, part of malate-aspartate shuttle',
    position: { x: base_x + unit_space * -1.5, y: base_y + unit_space * 12.66 } // Bottom right
  },
  {
    id: 'citrate_cyto_shuttle',
    type: 'molecule',
    name: 'Citrate',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₆H₈O₇',
    smiles: 'C(C(=O)O)C(CC(=O)O)(C(=O)O)O',
    description: 'Citrate in cytosol, transported from mitochondria for fatty acid synthesis',
    position: { x: base_x - 500, y: base_y + unit_space * 12.66 } // Same height as lower Glutamate
  }
];

