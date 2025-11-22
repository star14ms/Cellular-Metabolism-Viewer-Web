/**
 * Ammonium Capture and Release Pathway - Nodes Data
 * 
 * Positions are relative to the citric acid cycle nodes.
 * Extends α-ketoglutarate and succinate from citric acid cycle.
 * unit_space = 150 (standard spacing between nodes)
 */

const unit_space = 200;
// Reference positions from citric acid cycle
// α-ketoglutarate is at: base_x + unit_space * 2.56, base_y + unit_space * 1.06
// = (200 + 150 * 2.56, 1975 + 150 * 1.06) = (584, 2134)
// succinate is at: base_x + unit_space * 1.06, base_y + unit_space * 2.56
// = (200 + 150 * 1.06, 1975 + 150 * 2.56) = (359, 2359)

const base_x = 1000; // α-ketoglutarate x position
const base_y = 2434; // α-ketoglutarate y position

export const ammoniumCaptureReleaseNodes = [
  // Core pathway nodes
  {
    id: 'glutamate',
    type: 'molecule',
    name: 'Glutamate',
    formula: 'C₅H₉NO₄',
    description: 'Amino acid involved in ammonium metabolism, transamination, and GABA synthesis',
    smiles: 'N[C@@H](CCC(=O)O)C(=O)O',
    position: { x: base_x + unit_space * 1.5, y: base_y }
  },
  {
    id: 'glutamine',
    type: 'molecule',
    name: 'Glutamine',
    formula: 'C₅H₁₀N₂O₃',
    description: 'Amino acid that stores and transports ammonium',
    smiles: 'N[C@@H](CCC(=O)O)C(=O)N',
    position: { x: base_x + unit_space * 3, y: base_y + unit_space * -1.25 }
  },
  {
    id: 'n_acetylglutamate',
    type: 'molecule',
    name: 'N-Acetylglutamate',
    formula: 'C₇H₁₁NO₅',
    description: 'Allosteric activator of carbamoyl phosphate synthetase I in the urea cycle',
    smiles: 'CC(=O)N[C@@H](CCC(=O)O)C(=O)O',
    position: { x: base_x + unit_space * 3, y: base_y + unit_space * 1.25 }
  },
//   {
//     id: 'acetate',
//     type: 'molecule',
//     name: 'Acetate',
//     formula: 'C₂H₃O₂⁻',
//     description: 'Product of N-acetylglutamate hydrolysis',
//     smiles: 'CC(=O)[O-]',
//     position: { x: base_x + unit_space * 3, y: base_y + unit_space * 1 }
//   },
  
  // GABA shunt nodes
  {
    id: 'gaba',
    type: 'molecule',
    name: 'γ-Aminobutyric Acid (GABA)',
    formula: 'C₄H₉NO₂',
    description: 'Neurotransmitter synthesized from glutamate',
    smiles: 'C(CC(=O)O)CN',
    position: { x: base_x + unit_space * 1.5, y: base_y + 225 }
  },
  {
    id: 'succinic_semialdehyde',
    type: 'molecule',
    name: 'Succinic Semialdehyde',
    formula: 'C₄H₆O₃',
    description: 'Intermediate in the GABA shunt pathway',
    smiles: 'C(CC(=O)O)C=O',
    position: { x: base_x, y: base_y + 225 }
  },
  
  // Transamination nodes (placeholder nodes for "many amino acids" and "many α-ketoacids")
  {
    id: 'many_amino_acids',
    type: 'molecule',
    name: 'Many Amino Acids',
    imageUrl: 'https://c8.alamy.com/comp/E7YMP7/amino-acids-chemical-structures-glycine-alanine-valine-leucine-isoleucine-E7YMP7.jpg',
    formula: 'Various',
    description: 'Various amino acids that can undergo transamination with glutamate',
    smiles: '',
    position: { x: base_x + unit_space * -1.25, y: base_y + unit_space * 0.5 }
  },
  {
    id: 'many_alpha_ketoacids',
    type: 'molecule',
    name: 'Many α-Ketoacids',
    formula: 'Various',
    description: 'Various α-ketoacids produced from transamination reactions',
    smiles: '',
    position: { x: base_x + unit_space * 0.75, y: base_y + unit_space * 0.5 }
  },
  
  // Note: α-ketoglutarate and succinate are extended from citric acid cycle
  // They are referenced by their IDs: 'alpha_ketoglutarate' and 'succinate'
];

