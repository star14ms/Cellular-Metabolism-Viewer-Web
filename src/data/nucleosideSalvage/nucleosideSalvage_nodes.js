/**
 * Nucleoside Salvage Pathway - Nodes Data
 * 
 * Positions are relative to the first node using unit_space notation.
 * unit_space = 150 (standard spacing between nodes)
 * Positioned in lower right, to the right of Electron Transport Chain
 * 
 * Layout: All substrates on left (same x), all products on right (same x)
 */

const unit_space = 150;
const base_x = 4500; // Substrates x position
const base_y = 3200; // Same y-level as ETC
const product_x_offset = 200; // Products are to the right of substrates

export const nucleosideSalvageNodes = [
  // Substrates (left column, same x)
  {
    id: 'adenosine',
    type: 'molecule',
    name: 'Adenosine',
    formula: 'C₁₀H₁₃N₅O₄',
    smiles: 'C1=NC2=C(C(=N1)N)N=CN2C3C(C(C(O3)CO)O)O',
    description: 'A purine nucleoside composed of adenine and ribose',
    position: { x: base_x, y: base_y }
  },
  {
    id: 'cytidine',
    type: 'molecule',
    name: 'Cytidine',
    formula: 'C₉H₁₃N₃O₅',
    smiles: 'C1=NC(=O)N(=C1)C2C(C(C(O2)CO)O)O',
    description: 'A pyrimidine nucleoside composed of cytosine and ribose',
    position: { x: base_x, y: base_y + unit_space * 1 }
  },
  {
    id: 'uridine',
    type: 'molecule',
    name: 'Uridine',
    formula: 'C₉H₁₂N₂O₆',
    smiles: 'C1=NC(=O)NC(=C1)C2C(C(C(O2)CO)O)O',
    description: 'A pyrimidine nucleoside composed of uracil and ribose',
    position: { x: base_x, y: base_y + unit_space * 2 }
  },
  {
    id: 'deoxycytidine',
    type: 'molecule',
    name: 'Deoxycytidine',
    formula: 'C₉H₁₃N₃O₄',
    smiles: 'C1=NC(=O)N(=C1)C2C(C(C(O2)CO)O)O',
    description: 'A pyrimidine deoxynucleoside composed of cytosine and deoxyribose',
    position: { x: base_x, y: base_y + unit_space * 3 }
  },
  {
    id: 'thymidine',
    type: 'molecule',
    name: 'Thymidine',
    formula: 'C₁₀H₁₄N₂O₅',
    smiles: 'CC1=CN(C(=O)NC1=O)C2C(C(C(O2)CO)O)O',
    description: 'A pyrimidine deoxynucleoside composed of thymine and deoxyribose',
    position: { x: base_x, y: base_y + unit_space * 4 }
  },
  {
    id: 'deoxyuridine',
    type: 'molecule',
    name: 'Deoxyuridine',
    formula: 'C₉H₁₂N₂O₅',
    smiles: 'C1=NC(=O)NC(=C1)C2C(C(C(O2)CO)O)O',
    description: 'A pyrimidine deoxynucleoside composed of uracil and deoxyribose',
    position: { x: base_x, y: base_y + unit_space * 5 }
  },
  
  // Products (right column, same x)
  {
    id: 'amp',
    type: 'molecule',
    name: 'Adenosine monophosphate (AMP)',
    formula: 'C₁₀H₁₄N₅O₇P',
    smiles: 'C1=NC2=C(C(=N1)N)N=CN2C3C(C(C(O3)COP(=O)(O)O)O)O',
    description: 'Adenosine monophosphate, a nucleotide',
    position: { x: base_x + product_x_offset, y: base_y }
  },
  {
    id: 'cmp',
    type: 'molecule',
    name: 'Cytidine monophosphate (CMP)',
    formula: 'C₉H₁₄N₃O₈P',
    smiles: 'C1=NC(=O)N(=C1)C2C(C(C(O2)COP(=O)(O)O)O)O',
    description: 'Cytidine monophosphate, a nucleotide',
    position: { x: base_x + product_x_offset, y: base_y + unit_space * 1 }
  },
  {
    id: 'ump',
    type: 'molecule',
    name: 'Uridine monophosphate (UMP)',
    formula: 'C₉H₁₃N₂O₉P',
    smiles: 'C1=NC(=O)NC(=C1)C2C(C(C(O2)COP(=O)(O)O)O)O',
    description: 'Uridine monophosphate, a nucleotide',
    position: { x: base_x + product_x_offset, y: base_y + unit_space * 2 }
  },
  {
    id: 'dcmp',
    type: 'molecule',
    name: 'Deoxycytidine monophosphate (dCMP)',
    formula: 'C₉H₁₄N₃O₇P',
    smiles: 'C1=NC(=O)N(=C1)C2C(C(C(O2)COP(=O)(O)O)O)O',
    description: 'Deoxycytidine monophosphate, a deoxynucleotide',
    position: { x: base_x + product_x_offset, y: base_y + unit_space * 3 }
  },
  {
    id: 'dtmp',
    type: 'molecule',
    name: 'Deoxythymidine monophosphate (dTMP)',
    formula: 'C₁₀H₁₅N₂O₈P',
    smiles: 'CC1=CN(C(=O)NC1=O)C2C(C(C(O2)COP(=O)(O)O)O)O',
    description: 'Deoxythymidine monophosphate, a deoxynucleotide',
    position: { x: base_x + product_x_offset, y: base_y + unit_space * 4 }
  },
  {
    id: 'dump',
    type: 'molecule',
    name: 'Deoxyuridine monophosphate (dUMP)',
    formula: 'C₉H₁₃N₂O₈P',
    smiles: 'C1=NC(=O)NC(=C1)C2C(C(C(O2)COP(=O)(O)O)O)O',
    description: 'Deoxyuridine monophosphate, a deoxynucleotide',
    position: { x: base_x + product_x_offset, y: base_y + unit_space * 5 }
  }
];
