/**
 * Cholesterol Synthesis Pathway - Arrows Data
 * 
 * Arrows represent connections between nodes
 * Each arrow has: id, from_id, to_id, reaction_id
 * 
 * Special cases:
 * - If from_id or to_id is an arrow ID (not a node ID), the arrow starts/ends at the midpoint of that arrow
 * - This allows for byproducts and cofactors to connect to midpoints
 */

export const cholesterolSynthesisArrows = [
  // Step 1: 2 Acetyl-CoA → Acetoacetyl-CoA
  // Main arrow from one Acetyl-CoA
  {
    id: 'arrow_cholesterol_1_main',
    from_id: 'acetyl_coa_chol',
    to_id: 'acetoacetyl_coa_chol',
    reaction_id: 'rxn_cholesterol_1'
  },
  
  // Step 2: Acetoacetyl-CoA + Acetyl-CoA → HMG-CoA
  {
    id: 'arrow_cholesterol_2_main',
    from_id: 'acetoacetyl_coa_chol',
    to_id: 'hmg_coa_chol',
    reaction_id: 'rxn_cholesterol_2'
  },
  
  // Step 3: HMG-CoA → Mevalonate
  {
    id: 'arrow_cholesterol_3',
    from_id: 'hmg_coa_chol',
    to_id: 'mevalonate_chol',
    reaction_id: 'rxn_cholesterol_3'
  },
  
  // Step 4: Mevalonate → IPP
  {
    id: 'arrow_cholesterol_4',
    from_id: 'mevalonate_chol',
    to_id: 'ipp_chol',
    reaction_id: 'rxn_cholesterol_4',
    dashed: true
  },
  
  // Step 5: 3 IPP → FPP
  // Main arrow (representing the conversion)
  {
    id: 'arrow_cholesterol_5',
    from_id: 'ipp_chol',
    to_id: 'fpp_chol',
    reaction_id: 'rxn_cholesterol_5',
    dashed: true
  },
  
  // Step 6: FPP → Protein Modification (BRANCHING - occurs before step 7)
  {
    id: 'arrow_cholesterol_6',
    from_id: 'fpp_chol',
    to_id: 'protein_modification_chol',
    reaction_id: 'rxn_cholesterol_6'
  },
  
  // Step 7: 2 FPP → Squalene
  // Main arrow from one FPP
  {
    id: 'arrow_cholesterol_7_main',
    from_id: 'fpp_chol',
    to_id: 'squalene_chol',
    reaction_id: 'rxn_cholesterol_7'
  },
  
  // Step 8: Squalene → Lanosterol
  {
    id: 'arrow_cholesterol_8',
    from_id: 'squalene_chol',
    to_id: 'lanosterol_chol',
    reaction_id: 'rxn_cholesterol_8',
    dashed: true
  },
  
  // Step 9: Lanosterol → 7-dehydrocholesterol
  {
    id: 'arrow_cholesterol_9',
    from_id: 'lanosterol_chol',
    to_id: '7_dehydrocholesterol_chol',
    reaction_id: 'rxn_cholesterol_9',
    dashed: true
  },
  
  // Step 10: 7-dehydrocholesterol → Cholesterol
  {
    id: 'arrow_cholesterol_10',
    from_id: '7_dehydrocholesterol_chol',
    to_id: 'cholesterol_chol',
    reaction_id: 'rxn_cholesterol_10'
  },
  
  // Branching reactions
  // Step 11: 7-Dehydrocholesterol → Vitamin D
  {
    id: 'arrow_cholesterol_11',
    from_id: '7_dehydrocholesterol_chol',
    to_id: 'vitamin_d_chol',
    reaction_id: 'rxn_cholesterol_11',
    dashed: true
  },
  
  // Step 12: Cholesterol → Bile Salts
  {
    id: 'arrow_cholesterol_12',
    from_id: 'cholesterol_chol',
    to_id: 'bile_salts_chol',
    reaction_id: 'rxn_cholesterol_12',
    dashed: true
  },
  
  // Step 13: Cholesterol → Cell Membranes
  {
    id: 'arrow_cholesterol_13',
    from_id: 'cholesterol_chol',
    to_id: 'cell_membranes_chol',
    reaction_id: 'rxn_cholesterol_13',
    dashed: true
  },
  
  // Step 14: Cholesterol → Lipoproteins
  {
    id: 'arrow_cholesterol_14',
    from_id: 'cholesterol_chol',
    to_id: 'lipoproteins_chol',
    reaction_id: 'rxn_cholesterol_14',
    dashed: true
  }
];

