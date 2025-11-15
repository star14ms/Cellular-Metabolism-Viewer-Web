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
    position: { x: base_x, y: base_y }
  },
  {
    id: 'glucose_6_phosphate',
    type: 'molecule',
    name: 'Glucose-6-phosphate',
    formula: 'C₆H₁₁O₉P',
    smiles: 'C([C@@H]1[C@H]([C@@H]([C@H](C(O1)OP(=O)(O)O)O)O)O)O',
    description: 'Phosphorylated glucose',
    position: { x: base_x, y: base_y + unit_space * 1 }
  },
  {
    id: 'fructose_6_phosphate',
    type: 'molecule',
    name: 'Fructose-6-phosphate',
    formula: 'C₆H₁₁O₉P',
    smiles: 'C([C@H](C([C@H](C(=O)CO)O)O)OP(=O)(O)O)O',
    description: 'Isomerized form of glucose-6-phosphate',
    position: { x: base_x, y: base_y + unit_space * 2 }
  },
  {
    id: 'fructose_1_6_bisphosphate',
    type: 'molecule',
    name: 'Fructose-1,6-bisphosphate',
    formula: 'C₆H₁₄O₁₂P₂',
    smiles: 'C([C@H](C([C@H](C(=O)CO)OP(=O)(O)O)O)OP(=O)(O)O)O',
    description: 'Bisphosphorylated fructose',
    position: { x: base_x, y: base_y + unit_space * 3 }
  },
  {
    id: 'dihydroxyacetone_phosphate',
    type: 'molecule',
    name: 'Dihydroxyacetone phosphate',
    formula: 'C₃H₇O₆P',
    smiles: 'CC(=O)C(OP(=O)(O)O)O',
    description: 'Triose phosphate',
    position: { x: base_x + unit_space * 1, y: base_y + unit_space * 3 }
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
    id: 'pyruvate',
    type: 'molecule',
    name: 'Pyruvate',
    formula: 'C₃H₄O₃',
    smiles: 'CC(=O)C(=O)[O-]',
    description: 'A three-carbon compound produced by glycolysis',
    position: { x: base_x, y: base_y + unit_space * 9 }
  }
];

