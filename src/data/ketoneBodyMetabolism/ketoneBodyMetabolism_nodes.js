/**
 * Ketone Body Metabolism - Nodes Data
 * 
 * Positioned relative to Fatty Acid Synthesis pathway.
 * acetaldehyde_fas is at x: -1450, y: 2025 (approx)
 */

const unit_space = 150;
const base_x = -1450; // Align with acetaldehyde_fas column
const base_y = 2200;  // Start below acetaldehyde_fas

export const ketoneBodyMetabolismNodes = [
  // 1. Preparation Column (Left)
  {
    id: 'acetaldehyde_kbm',
    type: 'molecule',
    name: 'Acetaldehyde',
    formula: 'C₂H₄O',
    smiles: 'CC=O',
    description: 'Acetaldehyde, transported from cytosol/other pathways',
    position: { x: base_x, y: base_y }
  },
  {
    id: 'acetate_kbm',
    type: 'molecule',
    name: 'Acetate',
    formula: 'C₂H₃O₂⁻',
    smiles: 'CC(=O)[O-]',
    description: 'Acetate, formed from acetaldehyde oxidation',
    position: { x: base_x, y: base_y + unit_space * 1 }
  },
  {
    id: 'acetyl_coa_kbm_1',
    type: 'molecule',
    name: 'Acetyl-CoA',
    formula: 'C₂₃H₃₈N₇O₁₇P₃S',
    smiles: 'CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    description: 'Acetyl-CoA, generated from acetate',
    position: { x: base_x, y: base_y + unit_space * 2 }
  },
  {
    id: 'tca_kbm_1',
    type: 'pathway_node',
    name: 'TCA Cycle',
    pathwayType: 'oxidative-metabolism',
    imageUrl: 'https://praxilabs.com/en/blog/wp-content/uploads/2024/04/istockphoto-1034141326-612x612-1-1.jpg',
    description: 'Entry to Citric Acid Cycle',
    position: { x: base_x, y: base_y + unit_space * 3 }
  },

  // 2. Ketone Synthesis (Middle/Right)
  // Shifted right by ~2-3 units
  {
    id: 'acetyl_coa_x2_kbm',
    type: 'molecule',
    name: '2 Acetyl-CoA',
    formula: 'C₂₃H₃₈N₇O₁₇P₃S',
    description: 'Two molecules of Acetyl-CoA condensing',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 0 } // Start higher up
  },
  {
    id: 'acetoacetyl_coa_kbm',
    type: 'molecule',
    name: 'Acetoacetyl-CoA',
    formula: 'C₂₅H₄₀N₇O₁₈P₃S',
    description: 'Acetoacetyl-CoA, formed from two Acetyl-CoA molecules',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 1 }
  },
  {
    id: 'hmg_coa_kbm',
    type: 'molecule',
    name: 'β-Hydroxy-β-methyl-glutaryl-CoA (HMG-CoA)',
    pubchemCid: 445127,
    formula: 'C₂₇H₄₄N₇O₁₉P₃S',
    description: 'HMG-CoA, intermediate in ketone body synthesis',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 2 }
  },
  {
    id: 'acetoacetate_kbm',
    type: 'molecule',
    name: 'Acetoacetate',
    formula: 'C₄H₆O₃',
    smiles: 'CC(=O)CC(=O)O',
    description: 'Acetoacetate, the primary ketone body',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 3 }
  },
  // Products of Acetoacetate
  {
    id: 'acetone_kbm',
    type: 'molecule',
    name: 'Acetone',
    formula: 'C₃H₆O',
    smiles: 'CC(=O)C',
    description: 'Acetone, formed by spontaneous decarboxylation',
    position: { x: base_x + unit_space * 3.5, y: base_y + unit_space * 2 } // Branch right
  },
  {
    id: 'beta_hydroxybutyrate_kbm',
    type: 'molecule',
    name: 'β-Hydroxybutyrate',
    formula: 'C₄H₈O₃',
    smiles: 'CC(O)CC(=O)[O-]',
    description: 'β-Hydroxybutyrate, the most abundant circulating ketone body',
    position: { x: base_x + unit_space * 3.5, y: base_y + unit_space * 3 } // Continue down
  },

  // 3. Ketone Breakdown (Extrahepatic)
  // This logically follows β-Hydroxybutyrate but represents the reverse process in tissues
  // We can position it continuing down or looping back. 
  // Given "Step 10 ... Step 14", it seems to continue.
  
  // Note: In tissues, β-HB -> Acetoacetate -> Acetoacetyl-CoA -> 2 Acetyl-CoA
  // We can reuse acetoacetate_kbm node if we want a loop, or create new ones for the breakdown path to show flow.
  // The user plan implies a sequence. I will create new nodes for the breakdown phase to make the flow linear/visualizable.
  // Or I can loop back to `acetoacetate_kbm`.
  // "Step 9: acetoacetate -> acetone", "Step 10: acetoacetate -> β-hydroxybutyrate"
  // Then "Step 14: acetyl-CoA x2 -> TCA" implies we eventually get back to acetyl-CoA x2.
  // I'll create separate nodes for the breakdown path to avoid visual confusion with the synthesis path.

  {
    id: 'acetoacetyl_coa_breakdown_kbm',
    type: 'molecule',
    name: 'Acetoacetyl-CoA',
    formula: 'C₂₅H₄₀N₇O₁₈P₃S',
    description: 'Acetoacetyl-CoA reformed in extrahepatic tissues',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 4 } // Shift right for breakdown
  },
  {
    id: 'acetyl_coa_x2_breakdown_kbm',
    type: 'molecule',
    name: '2 Acetyl-CoA',
    formula: 'C₂₃H₃₈N₇O₁₇P₃S',
    description: 'Two Acetyl-CoA molecules produced from ketone breakdown',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 5 }
  },
  {
    id: 'tca_kbm_2',
    type: 'pathway_node',
    name: 'TCA Cycle',
    pathwayType: 'oxidative-metabolism',
    imageUrl: 'https://praxilabs.com/en/blog/wp-content/uploads/2024/04/istockphoto-1034141326-612x612-1-1.jpg',
    description: 'Entry to Citric Acid Cycle in extrahepatic tissues',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 6 } // Up towards TCA
  },
  
  // Cofactors for SCOT reaction (Step 12)
  {
    id: 'succinyl_coa_kbm',
    type: 'molecule',
    name: 'Succinyl-CoA',
    description: 'CoA donor for acetoacetate activation',
    position: { x: base_x + unit_space * 1.25, y: base_y + unit_space * 3.1 }
  },
  {
    id: 'succinate_kbm',
    type: 'molecule',
    name: 'Succinate',
    description: 'Product of succinyl-CoA after CoA transfer',
    position: { x: base_x + unit_space * 1.25, y: base_y + unit_space * 3.9 }
  }
];

