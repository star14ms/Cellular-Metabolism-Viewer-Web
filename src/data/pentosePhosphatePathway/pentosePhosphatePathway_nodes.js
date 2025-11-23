/**
 * Pentose Phosphate Pathway - Nodes Data
 * 
 * Positions are relative to glucose-6-phosphate from glycolysis using unit_space notation.
 * unit_space = 150 (standard spacing between nodes)
 * 
 * Reference position from glycolysis:
 * - glucose_6_phosphate: { x: 100, y: 150 } = (0, 0) in unit space
 */

const unit_space = 150;
// Use glucose-6-phosphate position as (0, 0) reference
// glucose-6-phosphate is at: { x: 100, y: 150 } in glycolysis
const base_x = 400; // x position of glucose-6-phosphate
const base_y = -150; // y position of glucose-6-phosphate

export const pentosePhosphatePathwayNodes = [
  // (1,0) 6-phosphogluconolactone
  {
    id: '6_phosphogluconolactone',
    type: 'molecule',
    name: '6-Phosphogluconolactone',
    formula: 'C₆H₁₁O₉P',
    smiles: 'C1C(C(C(C(C1=O)O)O)O)OP(=O)(O)O',
    description: 'Lactone intermediate in the oxidative phase of pentose phosphate pathway',
    position: { x: base_x + unit_space * 1, y: base_y + unit_space * 0 }
  },
  
  // (2,0) 6-phosphogluconate
  {
    id: '6_phosphogluconate',
    type: 'molecule',
    name: '6-Phosphogluconate',
    formula: 'C₆H₁₃O₁₀P',
    smiles: 'C(C(C(C(C(C(=O)O)O)O)O)O)OP(=O)(O)O',
    description: '6-Phosphogluconate, intermediate in oxidative phase',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 0 }
  },
  
  // (3,1) ribulose-5-phosphate
  {
    id: 'ribulose_5_phosphate',
    type: 'molecule',
    name: 'Ribulose-5-phosphate',
    formula: 'C₅H₁₁O₈P',
    smiles: 'C(C(C(C(C(=O)CO)O)O)O)OP(=O)(O)O',
    description: 'Ribulose-5-phosphate, product of oxidative phase',
    position: { x: base_x + unit_space * 3, y: base_y }
  },
  
  // (3,2) ribose-5-phosphate
  {
    id: 'ribose_5_phosphate',
    type: 'molecule',
    name: 'Ribose-5-phosphate',
    formula: 'C₅H₁₁O₈P',
    smiles: 'C(C(C(C(C(=O)CO)O)O)O)OP(=O)(O)O',
    description: 'Ribose-5-phosphate, isomer of ribulose-5-phosphate',
    position: { x: base_x + unit_space * 3, y: base_y + unit_space * 1 }
  },
  
  // (3,3) xylulose-5-phosphate
  {
    id: 'xylulose_5_phosphate',
    type: 'molecule',
    name: 'Xylulose-5-phosphate',
    formula: 'C₅H₁₁O₈P',
    smiles: 'C(C(C(C(C(=O)CO)O)O)O)OP(=O)(O)O',
    description: 'Xylulose-5-phosphate, epimer of ribulose-5-phosphate',
    position: { x: base_x + unit_space * 3, y: base_y + unit_space * 2 }
  },
  
  // (2,2) sedoheptulose-7-phosphate
  {
    id: 'sedoheptulose_7_phosphate',
    type: 'molecule',
    name: 'Sedoheptulose-7-phosphate',
    formula: 'C₇H₁₅O₁₀P',
    smiles: 'C(C(C(C(C(C(C(=O)CO)O)O)O)O)O)OP(=O)(O)O',
    description: 'Sedoheptulose-7-phosphate, 7-carbon sugar intermediate',
    position: { x: base_x + unit_space * 1.5, y: base_y + unit_space * 1 }
  },
  
  // (2,3) G3P - using different ID
  {
    id: 'glyceraldehyde_3_phosphate_pentose',
    type: 'molecule',
    name: 'Glyceraldehyde-3-phosphate',
    formula: 'C₃H₇O₆P',
    smiles: 'C([C@H](C(=O)O)OP(=O)(O)O)O',
    description: 'Glyceraldehyde-3-phosphate, triose phosphate (below Sedoheptulose-7-phosphate)',
    position: { x: base_x + unit_space * 1.5, y: base_y + unit_space * 2 }
  },
  
  // (2,1) PRPP
  {
    id: 'prpp_pentose',
    type: 'molecule',
    name: '5-Phosphoribosyl-1-pyrophosphate (PRPP)',
    pathwayType: 'carbohydrates',
    formula: 'C₅H₁₃O₁₄P₃',
    smiles: 'C1C(C(C(O1)COP(=O)(O)OP(=O)(O)O)O)O',
    description: '5-Phosphoribosyl pyrophosphate, precursor for nucleotide synthesis',
    position: { x: base_x + unit_space * 4.5, y: base_y + unit_space * 1 }
  },
  
  // (1,1) nucleotides
  {
    id: 'nucleotides_pentose',
    type: 'molecule',
    name: 'Nucleotides',
    pathwayType: 'nucleotides',
    imageUrl: 'https://media.gettyimages.com/id/1393171730/photo/nitrogenous-bases-of-dna.jpg?s=612x612&w=gi&k=20&c=XP6gXowh3NwM5gm_ZlsZ-GGuzPdNLWnukczugUFRQDA=',
    formula: 'N/A',
    smiles: '',
    description: 'Nucleotides (AMP, GMP, CMP, UMP, etc.), end products of nucleotide synthesis',
    position: { x: base_x + unit_space * 6, y: base_y + unit_space * 1 }
  },

  // (3,0) fructose-6-phosphate
  {
    id: 'fructose_6_phosphate_pentose',
    type: 'molecule',
    name: 'Fructose-6-phosphate',
    formula: 'C₆H₁₂O₆P',
    smiles: 'C(C(C(C(C(C(=O)CO)O)O)O)O)OP(=O)(O)O',
    description: 'Fructose-6-phosphate, 6-carbon sugar intermediate',
    position: { x: base_x, y: base_y + unit_space * 1 }
  },
  
  // (3,1) erythrose-4-phosphate - Note: same position as ribulose-5-phosphate, may need adjustment
  {
    id: 'erythrose_4_phosphate',
    type: 'molecule',
    name: 'Erythrose-4-phosphate',
    formula: 'C₄H₉O₇P',
    smiles: 'C(C(C(C(=O)CO)O)O)OP(=O)(O)O',
    description: 'Erythrose-4-phosphate, 4-carbon sugar intermediate',
    position: { x: base_x, y: base_y + unit_space * 2 }
  },
  {
    id: 'xylulose_5_phosphate_pentose_2',
    type: 'molecule',
    name: 'Xylulose-5-phosphate',
    formula: 'C₅H₁₁O₈P',
    smiles: 'C(C(C(C(C(=O)CO)O)O)O)OP(=O)(O)O',
    description: 'Xylulose-5-phosphate, 5-carbon sugar intermediate',
    position: { x: base_x, y: base_y + unit_space * 4 }
  },
  
  // Glutathione (oxidized) - GSSG (position not specified, placing near other nodes)
  {
    id: 'glutathione_oxidized',
    type: 'molecule',
    name: 'Glutathione (oxidized)',
    formula: 'C₂₀H₃₂N₆O₁₂S₂',
    smiles: 'C(CC(=O)NC(C(=O)NCC(=O)NC(CC(=O)O)CSSCC(C(=O)NCC(=O)NC(CC(=O)O)C(=O)NCC(=O)O)N)C(=O)NCC(=O)O)N',
    description: 'Oxidized glutathione (GSSG), disulfide form',
    position: { x: base_x + unit_space * 0, y: base_y + unit_space * -2 }
  },
  
  // Glutathione (reduced) - GSH (position not specified, placing near other nodes)
  {
    id: 'glutathione_reduced',
    type: 'molecule',
    name: 'Glutathione (reduced)',
    formula: 'C₁₀H₁₇N₃O₆S',
    smiles: 'C(CC(=O)NC(C(=O)NCC(=O)O)CS)N',
    description: 'Reduced glutathione (GSH), thiol form',
    position: { x: base_x + unit_space * -1, y: base_y + unit_space * -2 }
  },
  
  // H2O2 (position not specified, placing near other nodes)
  {
    id: 'h2o2',
    type: 'molecule',
    name: 'Hydrogen peroxide',
    formula: 'H₂O₂',
    smiles: 'OO',
    description: 'Hydrogen peroxide, reactive oxygen species involved in glutathione cycle',
    position: { x: base_x + unit_space * -1, y: base_y + unit_space * -3 }
  },
  
  // NADP+ (below glutathione oxidized)
  {
    id: 'nadp_plus',
    type: 'molecule',
    name: 'NADP⁺',
    formula: 'C₂₁H₂₈N₇O₁₇P₂',
    smiles: 'C1=CC(=C[N+](=C1)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)OCC3C(C(C(O3)N4C=NC5=C4N=CN=C5N)O)O)O)O)C(=O)N',
    description: 'Nicotinamide adenine dinucleotide phosphate (oxidized form), electron acceptor',
    position: { x: base_x + unit_space * -1, y: base_y + unit_space * -1 }
  },
  
  // NADPH (below glutathione reduced)
  {
    id: 'nadph',
    type: 'molecule',
    name: 'NADPH',
    formula: 'C₂₁H₂₉N₇O₁₇P₂',
    smiles: 'C1=CC(=C[N+](=C1)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)OCC3C(C(C(O3)N4C=NC5=C4N=CN=C5N)O)O)O)O)C(=O)N',
    description: 'Nicotinamide adenine dinucleotide phosphate (reduced form), electron donor',
    position: { x: base_x + unit_space * 0, y: base_y + unit_space * -1 }
  },
];

