/**
 * De Novo Pyrimidine Synthesis Pathway - Nodes Data
 * 
 * Positions are relative to the first node using unit_space notation.
 * unit_space = 150 (standard spacing between nodes)
 * Positioned in upper right side of the canvas
 */

const unit_space = 200;
const base_x = 4000; // Upper right position
const base_y = 0; // Start below top to avoid overlap

export const pyrimidineSynthesisNodes = [
  // Starting precursors (at top)
  {
    id: 'bicarbonate',
    type: 'molecule',
    name: 'Bicarbonate',
    formula: 'HCO₃⁻',
    smiles: 'OC(=O)[O-]',
    description: 'Bicarbonate ion, a source of carbon for pyrimidine synthesis',
    position: { x: base_x, y: base_y }
  },
  {
    id: 'aspartate',
    type: 'molecule',
    name: 'Aspartate',
    formula: 'C₄H₇NO₄⁻',
    smiles: 'C(C(C(=O)O)N)C(=O)[O-]',
    description: 'Amino acid used in the synthesis of N-carbamoyl aspartate',
    position: { x: base_x - unit_space * 0.5, y: base_y + unit_space * 1.15 }
  },
  {
    id: 'prpp',
    type: 'molecule',
    name: '5-Phosphoribosyl-1-pyrophosphate (PRPP)',
    formula: 'C₅H₁₃O₁₄P₃',
    smiles: 'C1C(C(C(O1)COP(=O)(O)OP(=O)(O)O)O)O',
    description: '5-Phosphoribosyl-1-pyrophosphate, a key intermediate in nucleotide synthesis',
    position: { x: base_x - unit_space * 0.5, y: base_y + unit_space * 4.15 }
  },
  
  // Pathway intermediates
  {
    id: 'carbamoyl_phosphate',
    type: 'molecule',
    name: 'Carbamoyl phosphate',
    formula: 'CH₂NO₅P',
    smiles: 'NC(=O)OP(=O)(O)O',
    description: 'Carbamoyl phosphate, the first committed intermediate in pyrimidine synthesis',
    position: { x: base_x, y: base_y + unit_space * 1 }
  },
  {
    id: 'n_carbamoyl_aspartate',
    type: 'molecule',
    name: 'N-carbamoyl aspartate',
    formula: 'C₅H₈N₂O₆',
    smiles: 'NC(=O)NC(CC(=O)O)C(=O)O',
    description: 'N-carbamoyl aspartate, formed from carbamoyl phosphate and aspartate',
    position: { x: base_x, y: base_y + unit_space * 2 }
  },
  {
    id: 'dihydroorotate',
    type: 'molecule',
    name: 'Dihydroorotate',
    formula: 'C₅H₆N₂O₄',
    smiles: 'C1C(=O)NC(=O)NC1C(=O)O',
    description: 'Dihydroorotate, a pyrimidine ring intermediate',
    position: { x: base_x, y: base_y + unit_space * 3 }
  },
  {
    id: 'orotate',
    type: 'molecule',
    name: 'Orotate',
    formula: 'C₅H₄N₂O₄',
    smiles: 'C1C(=O)NC(=O)NC1=O',
    description: 'Orotate, formed by oxidation of dihydroorotate',
    position: { x: base_x, y: base_y + unit_space * 4 }
  },
  {
    id: 'omp',
    type: 'molecule',
    name: 'Orotidine-5\'-monophosphate (OMP)',
    formula: 'C₁₀H₁₃N₂O₁₁P',
    smiles: 'C1C(=O)NC(=O)NC1=OC2C(C(C(O2)COP(=O)(O)O)O)O',
    description: 'Orotidine-5\'-monophosphate, formed from orotate and PRPP',
    position: { x: base_x, y: base_y + unit_space * 5 }
  },
  {
    id: 'ump_pyrim',
    type: 'molecule',
    name: 'Uridine-5\'-monophosphate (UMP)',
    formula: 'C₉H₁₃N₂O₉P',
    smiles: 'C1=NC(=O)NC(=C1)C2C(C(C(O2)COP(=O)(O)O)O)O',
    description: 'Uridine-5\'-monophosphate, the first pyrimidine nucleotide',
    position: { x: base_x, y: base_y + unit_space * 6 }
  },
  {
    id: 'udp',
    type: 'molecule',
    name: 'Uridine diphosphate (UDP)',
    formula: 'C₉H₁₄N₂O₁₂P₂',
    smiles: 'C1=NC(=O)NC(=C1)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Uridine diphosphate, formed by phosphorylation of UMP',
    position: { x: base_x, y: base_y + unit_space * 7 }
  },
  {
    id: 'utp',
    type: 'molecule',
    name: 'Uridine triphosphate (UTP)',
    formula: 'C₉H₁₅N₂O₁₅P₃',
    smiles: 'C1=NC(=O)NC(=C1)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Uridine triphosphate, formed by phosphorylation of UDP',
    position: { x: base_x, y: base_y + unit_space * 8 }
  },
  {
    id: 'ctp',
    type: 'molecule',
    name: 'Cytidine triphosphate (CTP)',
    formula: 'C₉H₁₆N₃O₁₄P₃',
    smiles: 'C1=NC(=O)N(C=C1)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Cytidine triphosphate, the final product of de novo pyrimidine synthesis',
    position: { x: base_x, y: base_y + unit_space * 9 }
  }
];

