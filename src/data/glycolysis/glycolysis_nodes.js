/**
 * Glycolysis Pathway - Nodes Data
 */

export const glycolysisNodes = [
  {
    id: 'glucose',
    type: 'molecule',
    name: 'D-Glucose',
    formula: 'C₆H₁₂O₆',
    smiles: 'C([C@@H]1[C@H]([C@@H]([C@H](C(O1)O)O)O)O)O',
    description: 'A hexose sugar that serves as the primary energy source',
    position: { x: 100, y: 100 }
  },
  {
    id: 'glucose_6_phosphate',
    type: 'molecule',
    name: 'Glucose-6-phosphate',
    formula: 'C₆H₁₁O₉P',
    smiles: 'C([C@@H]1[C@H]([C@@H]([C@H](C(O1)OP(=O)(O)O)O)O)O)O',
    description: 'Phosphorylated glucose',
    position: { x: 100, y: 250 }
  },
  {
    id: 'fructose_6_phosphate',
    type: 'molecule',
    name: 'Fructose-6-phosphate',
    formula: 'C₆H₁₁O₉P',
    smiles: 'C([C@H](C([C@H](C(=O)CO)O)O)OP(=O)(O)O)O',
    description: 'Isomerized form of glucose-6-phosphate',
    position: { x: 100, y: 400 }
  },
  {
    id: 'fructose_1_6_bisphosphate',
    type: 'molecule',
    name: 'Fructose-1,6-bisphosphate',
    formula: 'C₆H₁₄O₁₂P₂',
    smiles: 'C([C@H](C([C@H](C(=O)CO)OP(=O)(O)O)O)OP(=O)(O)O)O',
    description: 'Bisphosphorylated fructose',
    position: { x: 100, y: 550 }
  },
  {
    id: 'dihydroxyacetone_phosphate',
    type: 'molecule',
    name: 'Dihydroxyacetone phosphate',
    formula: 'C₃H₇O₆P',
    smiles: 'CC(=O)C(OP(=O)(O)O)O',
    description: 'Triose phosphate',
    position: { x: 250, y: 550 }
  },
  {
    id: 'glyceraldehyde_3_phosphate',
    type: 'molecule',
    name: 'Glyceraldehyde-3-phosphate',
    formula: 'C₃H₇O₆P',
    smiles: 'C([C@H](C(=O)O)OP(=O)(O)O)O',
    description: 'Triose phosphate',
    position: { x: 100, y: 700 }
  },
  {
    id: '1_3_bisphosphoglycerate',
    type: 'molecule',
    name: '1,3-Bisphosphoglycerate',
    formula: 'C₃H₈O₁₀P₂',
    smiles: 'C([C@H](C(=O)OP(=O)(O)O)OP(=O)(O)O)O',
    description: 'High-energy intermediate',
    position: { x: 100, y: 850 }
  },
  {
    id: '3_phosphoglycerate',
    type: 'molecule',
    name: '3-Phosphoglycerate',
    formula: 'C₃H₇O₇P',
    smiles: 'C([C@H](C(=O)O)OP(=O)(O)O)O',
    description: 'Phosphorylated glycerate',
    position: { x: 100, y: 1000 }
  },
  {
    id: '2_phosphoglycerate',
    type: 'molecule',
    name: '2-Phosphoglycerate',
    formula: 'C₃H₇O₇P',
    smiles: 'C([C@@H](C(=O)O)O)OP(=O)(O)O',
    description: 'Rearranged phosphoglycerate',
    position: { x: 100, y: 1150 }
  },
  {
    id: 'phosphoenolpyruvate',
    type: 'molecule',
    name: 'Phosphoenolpyruvate (PEP)',
    formula: 'C₃H₅O₆P',
    smiles: 'C(=C(OP(=O)(O)O)C(=O)O)O',
    description: 'High-energy intermediate',
    position: { x: 100, y: 1300 }
  },
  {
    id: 'pyruvate',
    type: 'molecule',
    name: 'Pyruvate',
    formula: 'C₃H₄O₃',
    smiles: 'CC(=O)C(=O)[O-]',
    description: 'A three-carbon compound produced by glycolysis',
    position: { x: 100, y: 1450 }
  }
];

