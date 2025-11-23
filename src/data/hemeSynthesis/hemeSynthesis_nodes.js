/**
 * Heme Synthesis - Nodes Data
 * 
 * Base position: { x: -2000, y: -2000 }
 * Layout strategy:
 * - Start in Mitochondria (Matrix)
 * - Cross to Cytosol
 * - Return to Mitochondria (Matrix)
 */

const unit_space = 150;
const base_x = -1500;
const base_y = 3000;

export const hemeSynthesisNodes = [
  // --- Mitochondrial Matrix (Start) ---
  {
    id: 'glycine_heme_matrix',
    type: 'molecule',
    name: 'Glycine',
    pathwayType: 'amino_acids',
    formula: 'C₂H₅NO₂',
    description: 'Amino acid precursor for heme synthesis',
    smiles: 'C(C(=O)O)N',
    position: { x: base_x + unit_space * 0.66, y: base_y + unit_space * 0.20 }
  },
  {
    id: 'succinyl_coa_heme_matrix',
    type: 'molecule',
    name: 'Succinyl-CoA',
    formula: 'C₂₅H₄₀N₇O₁₉P₃S',
    description: 'TCA cycle intermediate precursor for heme synthesis',
    smiles: 'C(CC(=O)O)CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x, y: base_y }
  },
  {
    id: 'delta_aminolevulinic_acid_matrix',
    type: 'molecule',
    name: 'δ-Aminolevulinic acid (δ-ALA)',
    formula: 'C₅H₉NO₃',
    description: 'First committed intermediate, formed in mitochondria',
    smiles: 'C(CC(=O)CN)C(=O)O',
    position: { x: base_x, y: base_y + unit_space * 1 }
  },

  // --- Transport to Cytosol ---
  {
    id: 'delta_aminolevulinic_acid_cytosol',
    type: 'molecule',
    name: 'δ-Aminolevulinic acid (δ-ALA)',
    formula: 'C₅H₉NO₃',
    description: 'Transported to cytosol for next steps',
    smiles: 'C(CC(=O)CN)C(=O)O',
    position: { x: base_x, y: base_y + unit_space * 3 }
  },

  // --- Cytosol Steps ---
  {
    id: 'porphobilinogen_heme',
    type: 'molecule',
    name: 'Porphobilinogen (PBG)',
    formula: 'C₁₀H₁₄N₂O₄',
    description: 'Pyrrole derivative formed from condensation of two δ-ALA',
    smiles: 'C1=C(C(=C(N1)CN)CC(=O)O)CCC(=O)O',
    position: { x: base_x + unit_space * 1, y: base_y + unit_space * 3 }
  },
  {
    id: 'hydroxymethylbilane_heme',
    type: 'molecule',
    name: 'Hydroxymethylbilane',
    formula: 'C₄₀H₅₄N₄O₁₇',
    description: 'Linear tetrapyrrole intermediate',
    smiles: 'OC1=C(CC2=C(CC3=C(CC4=C(CN)NC(=C4CCC(=O)O)CC(=O)O)NC(=C3CCC(=O)O)CC(=O)O)NC(=C2CCC(=O)O)CC(=O)O)NC(=C1CCC(=O)O)CC(=O)O', // Simplified/approximate
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 3 }
  },
  {
    id: 'uroporphyrinogen_iii_heme',
    type: 'molecule',
    name: 'Uroporphyrinogen III',
    formula: 'C₄₀H₄₄N₄O₁₆',
    description: 'Cyclic tetrapyrrole, first porphyrinogen',
    smiles: 'C12=C(C(C(N1)CC3=C(C(=C(N3)CC4=C(C(=C(N4)CC5=C(C(=C(N5)C2)CC(=O)O)CCC(=O)O)CC(=O)O)CCC(=O)O)CCC(=O)O)CC(=O)O)CCC(=O)O)CC(=O)O',
    position: { x: base_x + unit_space * 3, y: base_y + unit_space * 3 }
  },
  {
    id: 'coproporphyrinogen_iii_heme',
    type: 'molecule',
    name: 'Coproporphyrinogen III',
    formula: 'C₃₆H₄₄N₄O₈',
    description: 'Formed by decarboxylation of acetyl side chains',
    smiles: 'C12=C(C(C(N1)CC3=C(C(=C(N3)CC4=C(C(=C(N4)CC5=C(C(=C(N5)C2)C)CCC(=O)O)C)CCC(=O)O)C)CCC(=O)O)CCC(=O)O)C',
    position: { x: base_x + unit_space * 4, y: base_y + unit_space * 3 }
  },
  {
    id: 'protoporphyrinogen_ix_cytosol',
    type: 'molecule',
    name: 'Protoporphyrinogen IX',
    formula: 'C₃₄H₃₈N₄O₄',
    description: 'Formed by oxidative decarboxylation in cytosol/intermembrane space',
    smiles: 'C12=C(C(C(N1)CC3=C(C(=C(N3)CC4=C(C(=C(N4)CC5=C(C(=C(N5)C2)C)C=C)C)C=C)C)CCC(=O)O)CCC(=O)O)C',
    position: { x: base_x + unit_space * 5, y: base_y + unit_space * 3 }
  },

  // --- Transport back to Matrix ---
  {
    id: 'protoporphyrinogen_ix_matrix',
    type: 'molecule',
    name: 'Protoporphyrinogen IX',
    formula: 'C₃₄H₃₈N₄O₄',
    description: 'Transported back to mitochondrial matrix',
    smiles: 'C12=C(C(C(N1)CC3=C(C(=C(N3)CC4=C(C(=C(N4)CC5=C(C(=C(N5)C2)C)C=C)C)C=C)C)CCC(=O)O)CCC(=O)O)C',
    position: { x: base_x + unit_space * 5, y: base_y + unit_space * 1 }
  },

  // --- Matrix Steps (End) ---
  {
    id: 'protoporphyrin_ix_heme',
    type: 'molecule',
    name: 'Protoporphyrin IX',
    formula: 'C₃₄H₃₄N₄O₄',
    description: 'Oxidized form, ready to accept iron',
    smiles: 'C1=C(C2=CC3=NC(=CC4=C(C(=C(N4)C=C5C(=C(C(=N5)C=C1N2)C)C=C)C)CCC(=O)O)C(=C3C)CCC(=O)O)C',
    position: { x: base_x + unit_space * 6, y: base_y + unit_space * 1 }
  },
  {
    id: 'heme_b_heme',
    type: 'molecule',
    name: 'Heme b',
    formula: 'C₃₄H₃₂FeN₄O₄',
    description: 'Final product, iron-containing porphyrin cofactor',
    smiles: 'CC1=C(C2=CC3=NC(=CC4=C(C(=C([N-]4)C=C5C(=C(C(=N5)C=C1[N-]2)C=C)C)C)CCC(=O)O)C(=C3C)CCC(=O)O)[Fe+2]',
    position: { x: base_x + unit_space * 7, y: base_y + unit_space * 1 }
  }
];

