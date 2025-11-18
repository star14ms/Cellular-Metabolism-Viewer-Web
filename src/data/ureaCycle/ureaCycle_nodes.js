/**
 * Urea Cycle Pathway - Nodes Data
 * 
 * Positions are relative to a base position.
 * unit_space = 200 (standard spacing between nodes)
 * 
 * Structure:
 * - Central cycle: Ornithine → Citrulline → Argininosuccinate → Arginine → Ornithine
 * - Left branch: Oxaloacetate → Aspartate (byreactant for citrulline → argininosuccinate)
 * - Bidirectional: Aspartate ↔ Asparagine
 * - Right branch: Arginine → Citrulline (NO synthesis) → Ornithine
 * - Left bottom branch: Ornithine → Glutamic semialdehyde → (two sub-branches)
 *   - Left sub-branch: Glutamic semialdehyde → Glutamate
 *   - Bottom right sub-branch: Glutamic semialdehyde → Pyrroline-5-carboxylate → Proline
 */

const unit_space = 200;
const base_x = 3200; // Starting x position for the cycle center
const base_y = 2000; // Starting y position for the cycle center

export const ureaCycleNodes = [
  // Central Urea Cycle Nodes (arranged in a cycle)
  // Cycle center: (base_x, base_y)
  // Nodes arranged clockwise: Ornithine → Citrulline → Argininosuccinate → Arginine → (back to) Ornithine
  {
    id: 'ornithine',
    type: 'molecule',
    name: 'Ornithine',
    formula: 'C₅H₁₂N₂O₂',
    smiles: 'C(CCN)CC(C(=O)O)N',
    description: 'Ornithine, amino acid in the urea cycle, regenerated from arginine',
    position: { x: base_x - unit_space * 0.7, y: base_y + unit_space * 0.7 }
  },
  {
    id: 'citrulline',
    type: 'molecule',
    name: 'Citrulline',
    formula: 'C₆H₁₃N₃O₃',
    smiles: 'C(CCN)CC(C(=O)O)NC(=O)N',
    description: 'Citrulline, intermediate in the urea cycle, formed from ornithine and carbamoyl phosphate',
    position: { x: base_x - unit_space * 0.7, y: base_y - unit_space * 0.7 }
  },
  {
    id: 'argininosuccinate',
    type: 'molecule',
    name: 'Argininosuccinate',
    formula: 'C₁₀H₁₈N₄O₆',
    smiles: 'C(CCN)CC(C(=O)O)NC(=O)NC(CC(=O)O)C(=O)O',
    description: 'Argininosuccinate, intermediate in the urea cycle, formed from citrulline and aspartate',
    position: { x: base_x + unit_space * 0.7, y: base_y - unit_space * 0.7 }
  },
  {
    id: 'arginine',
    type: 'molecule',
    name: 'Arginine',
    formula: 'C₆H₁₄N₄O₂',
    smiles: 'C(CCN)CC(C(=O)O)NC(=N)N',
    description: 'Arginine, amino acid in the urea cycle, formed from argininosuccinate, hydrolyzed to urea and ornithine',
    position: { x: base_x + unit_space * 0.7, y: base_y + unit_space * 0.7 }
  },

  // Left Branch: Oxaloacetate → Aspartate (byreactant for citrulline → argininosuccinate)
  {
    id: 'oxaloacetate_urea',
    type: 'molecule',
    name: 'Oxaloacetate',
    formula: 'C₄H₄O₅',
    smiles: 'C(C(=O)C(=O)O)C(=O)O',
    description: 'Oxaloacetate, converted to aspartate for the urea cycle',
    position: { x: base_x + unit_space * -1.5, y: base_y - unit_space * 1.5 }
  },
  {
    id: 'aspartate_urea',
    type: 'molecule',
    name: 'Aspartate',
    formula: 'C₄H₇NO₄',
    smiles: 'C(C(C(=O)O)N)C(=O)O',
    description: 'Aspartate, amino acid that combines with citrulline to form argininosuccinate in the urea cycle',
    position: { x: base_x + unit_space * -0.25, y: base_y - unit_space * 1.5 }
  },

  // Bidirectional: Asparagine (connected to aspartate)
  {
    id: 'asparagine_urea',
    type: 'molecule',
    name: 'Asparagine',
    formula: 'C₄H₈N₂O₃',
    smiles: 'C(C(C(=O)O)N)C(=O)N',
    description: 'Asparagine, amino acid that can be converted to aspartate',
    position: { x: base_x + unit_space * -0.25, y: base_y - unit_space * 3 }
  },

//   // Right Branch: Arginine → Citrulline (NO synthesis) → Ornithine
//   {
//     id: 'nitric_oxide',
//     type: 'molecule',
//     name: 'Nitric Oxide',
//     formula: 'NO',
//     smiles: '[N]=O',
//     description: 'Nitric oxide, signaling molecule produced from arginine by nitric oxide synthase',
//     position: { x: base_x + unit_space * 2.5, y: base_y + unit_space * 0.7 }
//   },

  // Left Bottom Branch: Ornithine → Glutamic semialdehyde → (two sub-branches)
  {
    id: 'glutamic_semialdehyde',
    type: 'molecule',
    name: 'Glutamic Semialdehyde',
    formula: 'C₅H₉NO₃',
    smiles: 'C(CC=O)CC(C(=O)O)N',
    description: 'Glutamic semialdehyde, intermediate formed from ornithine, can be converted to glutamate or proline',
    position: { x: base_x - unit_space * 1.5, y: base_y + unit_space * 1.5 }
  },

  // Left Sub-branch: Glutamic semialdehyde → Glutamate
  {
    id: 'glutamate_urea',
    type: 'molecule',
    name: 'Glutamate',
    formula: 'C₅H₉NO₄',
    smiles: 'C(CC(=O)O)CC(C(=O)O)N',
    description: 'Glutamate, amino acid formed from glutamic semialdehyde',
    position: { x: base_x - unit_space * 2.5, y: base_y + unit_space * 1.5 }
  },

  // Bottom Right Sub-branch: Glutamic semialdehyde → Pyrroline-5-carboxylate → Proline
  {
    id: 'pyrroline_5_carboxylate',
    type: 'molecule',
    name: 'Pyrroline-5-carboxylate',
    formula: 'C₅H₇NO₃',
    smiles: 'C1C[C@@H](NC1=O)C(=O)O',
    description: 'Pyrroline-5-carboxylate, cyclic intermediate formed from glutamic semialdehyde, converted to proline',
    position: { x: base_x - unit_space * 0.5, y: base_y + unit_space * 2.5 }
  },
  {
    id: 'proline_urea',
    type: 'molecule',
    name: 'Proline',
    formula: 'C₅H₉NO₂',
    smiles: 'C1CC[C@H](N1)C(=O)O',
    description: 'Proline, cyclic amino acid formed from pyrroline-5-carboxylate',
    position: { x: base_x + unit_space * 0.5, y: base_y + unit_space * 2.5 }
  },

  // Additional cycle intermediates
  {
    id: 'bicarbonate_urea',
    type: 'molecule',
    name: 'Bicarbonate',
    formula: 'HCO₃⁻',
    smiles: 'OC(=O)[O-]',
    description: 'Bicarbonate ion, substrate for carbamoyl phosphate synthesis',
    position: { x: base_x + unit_space * -2.5, y: base_y + unit_space * 0.25 }
  },
  {
    id: 'carbamoyl_phosphate_urea',
    type: 'molecule',
    name: 'Carbamoyl Phosphate',
    formula: 'CH₆N₂O₅P',
    smiles: 'C(=O)(N)OP(=O)(O)O',
    description: 'Carbamoyl phosphate, formed from ammonia and bicarbonate, combines with ornithine to form citrulline',
    position: { x: base_x + unit_space * -1.5, y: base_y + unit_space * 0.25 }
  },
  {
    id: 'fumarate_urea',
    type: 'molecule',
    name: 'Fumarate',
    formula: 'C₄H₄O₄',
    smiles: 'C(=CC(=O)O)C(=O)O',
    description: 'Fumarate, byproduct of argininosuccinate cleavage, connects to TCA cycle',
    position: { x: base_x + unit_space * 1.5, y: base_y + unit_space * 0.25 }
  },
  {
    id: 'urea',
    type: 'molecule',
    name: 'Urea',
    formula: 'CH₄N₂O',
    smiles: 'C(=O)(N)N',
    description: 'Urea, final product of the urea cycle, excreted in urine',
    position: { x: base_x + unit_space * -0.25, y: base_y + unit_space * 1.5 }
  }
];

export { base_x, base_y };

