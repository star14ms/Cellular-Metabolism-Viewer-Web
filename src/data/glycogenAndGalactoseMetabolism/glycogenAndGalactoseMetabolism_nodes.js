/**
 * Glycogen and Galactose Metabolism - Nodes Data
 * 
 * Positions are relative to glucose-1-phosphate as the base reference (0, 0).
 * unit_space = 150
 */

const unit_space = 150;
const base_x = -600;
const base_y = -150;

export const glycogenAndGalactoseMetabolismNodes = [
  {
    id: 'glucose_1_phosphate',
    type: 'molecule',
    name: 'Glucose-1-phosphate',
    formula: 'C₆H₁₃O₉P',
    smiles: 'C(C1C(C(C(C(O1)OP(=O)(O)O)O)O)O)O',
    description: 'Glucose-1-phosphate, intermediate in glycogen metabolism',
    position: { x: base_x + unit_space * 0, y: base_y + unit_space * 0 }
  },
  {
    id: 'glycogen_n_plus_1',
    type: 'molecule',
    name: 'Glycogen (n+1)',
    formula: '(C₆H₁₀O₅)ₙ₊₁',
    smiles: '',
    description: 'Glycogen polymer extended by one glucose unit',
    position: { x: base_x + unit_space * -2, y: base_y + unit_space * -2 }
  },
  {
    id: 'galactose_1_phosphate',
    type: 'molecule',
    name: 'Galactose-1-phosphate',
    formula: 'C₆H₁₃O₉P',
    smiles: 'C(C1C(C(C(C(O1)O)O)OP(=O)(O)O)O)O',
    description: 'Phosphorylated galactose',
    position: { x: base_x + unit_space * 0, y: base_y + unit_space * 3 }
  },
  {
    id: 'galactose',
    type: 'molecule',
    name: 'Galactose',
    formula: 'C₆H₁₂O₆',
    smiles: 'C([C@@H]1[C@@H]([C@@H]([C@H]([C@@H](O1)O)O)O)O)O',
    description: 'A hexose sugar, epimer of glucose',
    position: { x: base_x + unit_space * 0, y: base_y + unit_space * 4 }
  },
  {
    id: 'galactitol',
    type: 'molecule',
    name: 'Galactitol',
    formula: 'C₆H₁₄O₆',
    smiles: 'C([C@H]([C@H]([C@@H]([C@@H](CO)O)O)O)O)O',
    description: 'Sugar alcohol formed from galactose reduction',
    position: { x: base_x + unit_space * -1, y: base_y + unit_space * 4 }
  },
  {
    id: 'udp_glucose',
    type: 'molecule',
    name: 'UDP-glucose',
    formula: 'C₁₅H₂₄N₂O₁₇P₂',
    smiles: 'C1=CN(C(=O)NC1=O)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)OC3C(C(C(C(O3)CO)O)O)O)O)O',
    description: 'Activated form of glucose for glycogen synthesis',
    position: { x: base_x + unit_space * -1, y: base_y + unit_space * 2 }
  },
  {
    id: 'glycogen_n',
    type: 'molecule',
    name: 'Glycogen (n)',
    formula: '(C₆H₁₀O₅)ₙ',
    smiles: '',
    description: 'Glycogen polymer',
    position: { x: base_x + unit_space * -4, y: base_y + unit_space * 0 }
  },
  {
    id: 'glycogen_n_2',
    type: 'molecule',
    name: 'Glycogen (n)',
    formula: '(C₆H₁₀O₅)ₙ',
    smiles: '',
    description: 'Glycogen polymer produced as a byproduct of Step 7 (Glycogen Phosphorylase Reaction)',
    position: { x: base_x + unit_space * -1.13, y: base_y + unit_space * -0.25 }
  },
  {
    id: 'udp_glucuronate',
    type: 'molecule',
    name: 'UDP-glucuronate',
    formula: 'C₁₅H₂₂N₂O₁₈P₂',
    smiles: 'C1=CN(C(=O)NC1=O)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)OC3C(C(C(C(O3)C(=O)O)O)O)O)O)O',
    description: 'Intermediate in glucuronidation reactions',
    position: { x: base_x + unit_space * -4, y: base_y + unit_space * 2 }
  },
  {
    id: 'primed_glycogenin',
    type: 'molecule',
    name: 'Primed Glycogenin',
    formula: 'Protein-Sugar Complex',
    smiles: '',
    description: 'Glycogenin with a short glucose primer chain',
    pubchemSid: '405234289',
    pubchemImageVersion: 2,
    position: { x: base_x + unit_space * -4, y: base_y + unit_space * 1 }
  },
  {
    id: 'glycogenin',
    type: 'molecule',
    name: 'Glycogenin',
    formula: 'Protein',
    smiles: '',
    description: 'Enzyme that acts as a primer for glycogen synthesis',
    pubchemSid: '4842',
    pubchemImageVersion: 8,
    position: { x: base_x + unit_space * -3, y: base_y + unit_space * 1 }
  },
  {
    id: 'udp_galactose',
    type: 'molecule',
    name: 'UDP-galactose',
    formula: 'C₁₅H₂₄N₂O₁₇P₂',
    smiles: 'C1=CN(C(=O)NC1=O)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)OC3C(C(C(C(O3)CO)O)O)O)O)O',
    description: 'Activated form of galactose',
    position: { x: base_x + unit_space * -1, y: base_y + unit_space * 1 } 
  },
  {
    id: 'lactose',
    type: 'molecule',
    name: 'Lactose',
    formula: 'C₁₂H₂₂O₁₁',
    smiles: 'C(C1C(C(C(C(O1)OC2C(C(C(O2)CO)O)O)O)O)O)O',
    description: 'Disaccharide sugar derived from galactose and glucose',
    position: { x: base_x + unit_space * -2, y: base_y + unit_space * 1 }
  },
  {
    id: 'conjugated_bilirubin',
    type: 'molecule',
    name: 'Conjugated Bilirubin',
    imageUrl: 'https://library.med.utah.edu/NetBiochem/images/diglufor.gif',
    formula: 'C₃₃H₃₆N₄O₆',
    smiles: 'CC1=C(C2=C(C1=O)NC(=C2C(=O)O)CC3=C(C(=C(N3)C(=O)O)C)C)C(=O)NC(=C4C(=C(C(=O)C5=C4NC(=C5C(=O)O)CC6=C(C(=C(N6)C(=O)O)C)C)C)C)C)C',
    description: 'Bilirubin conjugated with glucuronic acid via glucuronidation',
    position: { x: base_x + unit_space * -4, y: base_y + unit_space * 3 }
  },
  {
    id: 'other_glucuronidation_reactions',
    type: 'molecule',
    name: 'Other Glucuronidation Reactions',
    imageUrl: 'https://kmthepatech.com/wp-content/uploads/2020/06/Schematic-overview-of-the-glucuronidation-reaction-catalysed-by-UGT-enzymes.jpg',
    formula: 'Variable',
    smiles: '',
    description: 'Various compounds conjugated with glucuronic acid via UDP-glucuronate',
    position: { x: base_x + unit_space * -3, y: base_y + unit_space * 3 }
  },
  {
    id: 'gags_glycoproteins_glycolipids',
    type: 'molecule',
    name: 'GAGs, Glycoproteins, Glycolipids',
    imageUrl: 'https://cdn1.byjus.com/wp-content/uploads/2021/03/Glycosaminoglycans-700x281.png',
    formula: 'Variable',
    smiles: '',
    description: 'Glycosaminoglycans (GAGs), glycoproteins, and glycolipids - complex carbohydrates and glycoconjugates synthesized from UDP-glucose',
    position: { x: base_x + unit_space * -1, y: base_y + unit_space * 3 }
  }
];

