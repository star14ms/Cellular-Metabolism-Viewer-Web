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
const base_x = 2400; // Starting x position for the cycle center
const base_y = 2500; // Starting y position for the cycle center

// Circle parameters for 6 nodes arranged in a perfect circle
// Rotated backward by 2 positions (120° counterclockwise)
const cycle_radius = unit_space * 1.2; // Radius for the cycle (240 pixels)
const node_angles = [
  5 * Math.PI / 6,   // ornithine_mito: 150° (bottom-left)
  7 * Math.PI / 6,    // citrulline_mito: 210° (top-left)
  -Math.PI / 2,      // citrulline_cyto: -90° (top)
  -Math.PI / 6,      // argininosuccinate: -30° (top-right)
  Math.PI / 6,       // arginine: 30° (bottom-right)
  Math.PI / 2        // ornithine_cyto: 90° (bottom)
];

export const ureaCycleNodes = [
  // Central Urea Cycle Nodes (arranged in a perfect circle)
  // Cycle center: (base_x, base_y)
  // Nodes arranged clockwise: Ornithine_mito → Citrulline_mito → Citrulline_cyto → Argininosuccinate → Arginine → Ornithine_cyto → (back to) Ornithine_mito
  // Mitochondrial nodes
  {
    id: 'ornithine_mito',
    type: 'molecule',
    name: 'Ornithine (Mitochondrial)',
    pathwayType: 'amino_acids',
    formula: 'C₅H₁₂N₂O₂',
    smiles: 'C(CCN)CC(C(=O)O)N',
    description: 'Ornithine in the mitochondrial matrix, used for citrulline synthesis',
    position: { 
      x: base_x + cycle_radius * Math.cos(node_angles[0]), 
      y: base_y + cycle_radius * Math.sin(node_angles[0]) 
    }
  },
  {
    id: 'citrulline_mito',
    type: 'molecule',
    name: 'Citrulline (Mitochondrial)',
    pathwayType: 'amino_acids',
    formula: 'C₆H₁₃N₃O₃',
    smiles: 'C(CCN)CC(C(=O)O)NC(=O)N',
    description: 'Citrulline in the mitochondrial matrix, formed from ornithine and carbamoyl phosphate, transported to cytosol',
    position: { 
      x: base_x + cycle_radius * Math.cos(node_angles[1]), 
      y: base_y + cycle_radius * Math.sin(node_angles[1]) 
    }
  },
  // Cytosolic nodes
  {
    id: 'citrulline_cyto',
    type: 'molecule',
    name: 'Citrulline (Cytosolic)',
    pathwayType: 'amino_acids',
    formula: 'C₆H₁₃N₃O₃',
    smiles: 'C(CCN)CC(C(=O)O)NC(=O)N',
    description: 'Citrulline in the cytosol, transported from mitochondria, used for argininosuccinate synthesis',
    position: { 
      x: base_x + cycle_radius * Math.cos(node_angles[2]), 
      y: base_y + cycle_radius * Math.sin(node_angles[2]) 
    }
  },
  {
    id: 'argininosuccinate',
    type: 'molecule',
    name: 'Argininosuccinate',
    formula: 'C₁₀H₁₈N₄O₆',
    smiles: 'C(CCN)CC(C(=O)O)NC(=O)NC(CC(=O)O)C(=O)O',
    description: 'Argininosuccinate, intermediate in the urea cycle, formed from citrulline and aspartate',
    position: { 
      x: base_x + cycle_radius * Math.cos(node_angles[3]), 
      y: base_y + cycle_radius * Math.sin(node_angles[3]) 
    }
  },
  {
    id: 'arginine',
    type: 'molecule',
    name: 'Arginine',
    pathwayType: 'amino_acids',
    formula: 'C₆H₁₄N₄O₂',
    smiles: 'C(CCN)CC(C(=O)O)NC(=N)N',
    description: 'Arginine, amino acid in the urea cycle, formed from argininosuccinate, hydrolyzed to urea and ornithine',
    position: { 
      x: base_x + cycle_radius * Math.cos(node_angles[4]), 
      y: base_y + cycle_radius * Math.sin(node_angles[4]) 
    }
  },
  {
    id: 'ornithine_cyto',
    type: 'molecule',
    name: 'Ornithine (Cytosolic)',
    pathwayType: 'amino_acids',
    formula: 'C₅H₁₂N₂O₂',
    smiles: 'C(CCN)CC(C(=O)O)N',
    description: 'Ornithine in the cytosol, regenerated from arginine, transported back to mitochondria',
    position: { 
      x: base_x + cycle_radius * Math.cos(node_angles[5]), 
      y: base_y + cycle_radius * Math.sin(node_angles[5]) 
    }
  },

  // Left Branch: Oxaloacetate → Aspartate (byreactant for citrulline → argininosuccinate)
  {
    id: 'oxaloacetate_urea',
    type: 'molecule',
    name: 'Oxaloacetate',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₄H₄O₅',
    smiles: 'C(C(=O)C(=O)O)C(=O)O',
    description: 'Oxaloacetate, converted to aspartate for the urea cycle',
    position: { x: base_x + unit_space * 0.6, y: base_y - unit_space * 3.16 }
  },
  // Bymolecule nodes for Oxaloacetate Transamination (rxn_urea_6)
  {
    id: 'glutamate_trans',
    type: 'molecule',
    name: 'Glutamate',
    pathwayType: 'amino_acids',
    formula: 'C₅H₉NO₄',
    smiles: 'C(CC(=O)O)CC(C(=O)O)N',
    description: 'Glutamate, amino group donor for oxaloacetate transamination',
    position: { x: base_x + unit_space * 0, y: base_y + unit_space * -2.76 }
  },
  {
    id: 'alpha_ketoglutarate_trans',
    type: 'molecule',
    name: 'α-Ketoglutarate',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₅H₆O₅',
    smiles: 'C(CC(=O)O)CC(=O)C(=O)O',
    description: 'α-Ketoglutarate, produced from glutamate in oxaloacetate transamination',
    position: { x: base_x + unit_space * 0, y: base_y + unit_space * -2.06 }
  },

  {
    id: 'aspartate_urea',
    type: 'molecule',
    name: 'Aspartate',
    pathwayType: 'amino_acids',
    formula: 'C₄H₇NO₄',
    smiles: 'C(C(C(=O)O)N)C(=O)O',
    description: 'Aspartate, amino acid that combines with citrulline to form argininosuccinate in the urea cycle',
    position: { x: base_x + unit_space * 0.6, y: base_y - unit_space * 1.66 }
  },

  // Bidirectional: Asparagine (connected to aspartate)
  {
    id: 'asparagine_urea',
    type: 'molecule',
    name: 'Asparagine',
    pathwayType: 'amino_acids',
    formula: 'C₄H₈N₂O₃',
    smiles: 'C(C(C(=O)O)N)C(=O)N',
    description: 'Asparagine, amino acid that can be converted to aspartate',
    position: { x: base_x + unit_space * 2.6, y: base_y - unit_space * 1.66 }
  },
  // Bymolecule nodes for Asparagine Synthesis (rxn_urea_7)
  {
    id: 'glutamine_asn',
    type: 'molecule',
    name: 'Glutamine',
    pathwayType: 'amino_acids',
    formula: 'C₅H₁₀N₂O₃',
    smiles: 'C(CC(=O)N)CC(C(=O)O)N',
    description: 'Glutamine, amino group donor for asparagine synthesis',
    position: { x: base_x + unit_space * 1.3, y: base_y - unit_space * 2.45 }
  },
  {
    id: 'glutamate_asn',
    type: 'molecule',
    name: 'Glutamate',
    pathwayType: 'amino_acids',
    formula: 'C₅H₉NO₄',
    smiles: 'C(CC(=O)O)CC(C(=O)O)N',
    description: 'Glutamate, produced from glutamine in asparagine synthesis',
    position: { x: base_x + unit_space * 1.9, y: base_y - unit_space * 2.45 }
  },

  // Left Bottom Branch: Ornithine (mitochondrial) → Glutamic semialdehyde → (two sub-branches)
  {
    id: 'glutamic_semialdehyde',
    type: 'molecule',
    name: 'Glutamic Semialdehyde',
    formula: 'C₅H₉NO₃',
    smiles: 'C(CC=O)CC(C(=O)O)N',
    description: 'Glutamic semialdehyde, intermediate formed from ornithine, can be converted to glutamate or proline',
    position: { x: base_x + unit_space * -1.75, y: base_y + unit_space * 1.5 }
  },
  // Bymolecule nodes for Ornithine Transamination (rxn_urea_10)
  {
    id: 'oxaloacetate_orn',
    type: 'molecule',
    name: 'Oxaloacetate',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₄H₄O₅',
    smiles: 'C(C(=O)C(=O)O)C(=O)O',
    description: 'Oxaloacetate, amino group acceptor for ornithine transamination',
    position: { x: base_x + unit_space * -0.66, y: base_y + unit_space * 1.15 }
  },
  {
    id: 'aspartate_orn',
    type: 'molecule',
    name: 'Aspartate',
    pathwayType: 'amino_acids',
    formula: 'C₄H₇NO₄',
    smiles: 'C(C(C(=O)O)N)C(=O)O',
    description: 'Aspartate, produced from oxaloacetate in ornithine transamination',
    position: { x: base_x + unit_space * -1.1, y: base_y + unit_space * 1.75 }
  },

  // Left Sub-branch: Glutamic semialdehyde → Glutamate
  {
    id: 'glutamate_urea',
    type: 'molecule',
    name: 'Glutamate',
    pathwayType: 'amino_acids',
    formula: 'C₅H₉NO₄',
    smiles: 'C(CC(=O)O)CC(C(=O)O)N',
    description: 'Glutamate, amino acid formed from glutamic semialdehyde',
    position: { x: base_x + unit_space * -2.75, y: base_y + unit_space * 1.5 }
  },

  // Bottom Right Sub-branch: Glutamic semialdehyde → Pyrroline-5-carboxylate → Proline
  {
    id: 'pyrroline_5_carboxylate_mito',
    type: 'molecule',
    name: 'Pyrroline-5-carboxylate (Mitochondrial)',
    formula: 'C₅H₇NO₃',
    smiles: 'C1C[C@@H](NC1=O)C(=O)O',
    description: 'Pyrroline-5-carboxylate in the mitochondrial matrix, formed from glutamic semialdehyde, transported to cytosol',
    position: { x: base_x + unit_space * -1.75, y: base_y + unit_space * 2.5 }
  },
  {
    id: 'pyrroline_5_carboxylate_cyto',
    type: 'molecule',
    name: 'Pyrroline-5-carboxylate (Cytosolic)',
    formula: 'C₅H₇NO₃',
    smiles: 'C1C[C@@H](NC1=O)C(=O)O',
    description: 'Pyrroline-5-carboxylate in the cytosol, transported from mitochondria, converted to proline',
    position: { x: base_x + unit_space * 0, y: base_y + unit_space * 2.5 }
  },
  {
    id: 'proline_urea',
    type: 'molecule',
    name: 'Proline',
    pathwayType: 'amino_acids',
    formula: 'C₅H₉NO₂',
    smiles: 'C1CC[C@H](N1)C(=O)O',
    description: 'Proline, cyclic amino acid formed from pyrroline-5-carboxylate',
    position: { x: base_x + unit_space * 1.0, y: base_y + unit_space * 2.5 }
  },

  // Additional cycle intermediates
  {
    id: 'bicarbonate_urea',
    type: 'molecule',
    name: 'Bicarbonate',
    formula: 'HCO₃⁻',
    smiles: 'OC(=O)[O-]',
    description: 'Bicarbonate ion, substrate for carbamoyl phosphate synthesis',
    position: { x: base_x + unit_space * -2.75, y: base_y + unit_space * 0.25 }
  },
  {
    id: 'carbamoyl_phosphate_urea',
    type: 'molecule',
    name: 'Carbamoyl Phosphate',
    formula: 'CH₆N₂O₅P',
    smiles: 'C(=O)(N)OP(=O)(O)O',
    description: 'Carbamoyl phosphate, formed from ammonia and bicarbonate, combines with ornithine to form citrulline',
    position: { x: base_x + unit_space * -1.75, y: base_y + unit_space * 0.25 }
  },
  {
    id: 'fumarate_urea',
    type: 'molecule',
    name: 'Fumarate',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₄H₄O₄',
    smiles: 'C(=CC(=O)O)C(=O)O',
    description: 'Fumarate, byproduct of argininosuccinate cleavage, connects to TCA cycle',
    position: { x: base_x + unit_space * 1.8, y: base_y + unit_space * 0.3 }
  },
  {
    id: 'urea',
    type: 'molecule',
    name: 'Urea',
    formula: 'CH₄N₂O',
    smiles: 'C(=O)(N)N',
    description: 'Urea, final product of the urea cycle, excreted in urine',
    position: { x: base_x + unit_space * 0.60, y: base_y + unit_space * 1.66 }
  }
];

export { base_x, base_y };


