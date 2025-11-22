export const fattyAcidOxidationArrows = [
  // Step 1: Fatty acids > C14 -> Fatty Acyl-CoA (cytosol)
  {
    id: 'arrow_fao_1',
    from_id: 'fatty_acids_medium_long', // From FAS
    to_id: 'fatty_acyl_coa_cytosol_fao',
    reaction_id: 'rxn_fao_1'
  },

  // Step 2: Carnitine Transporter -> Carnitine
  {
    id: 'arrow_fao_2',
    from_id: 'carnitine', // From FAS
    to_id: 'carnitine_fao',
    reaction_id: 'rxn_fao_2'
  },

  // Step 3: Fatty acids <= C12 -> Fatty Acyl-CoA (mito)
  {
    id: 'arrow_fao_3',
    from_id: 'fatty_acids_short_mitochondria', // From FAS
    to_id: 'fatty_acyl_coa_mito_fao',
    reaction_id: 'rxn_fao_3'
  },

  // Step 4: CPT1 (Fatty Acyl-CoA + Carnitine -> Fatty Acyl-Carnitine + CoA)
  {
    id: 'arrow_fao_cpt1_1',
    from_id: 'fatty_acyl_coa_cytosol_fao',
    reaction_id: 'rxn_fao_cpt1',
    curved: true,
    x_scale: 1.5,
    y_scale: 1.25,
    byproduct: ['CoA'],
  },
  {
    id: 'arrow_fao_cpt1_2',
    from_id: 'carnitine_fao',
    reaction_id: 'rxn_fao_cpt1',
    curved: true,
    flipped: true,
    x_scale: 1.5,
    y_scale: 1.25,
  },

  // Step 5: CPT2/Translocase (Fatty Acyl-Carnitine + CoA -> Fatty Acyl-CoA + Carnitine)
  // Using Translocase/CPT2 complex nodes. 
  // Flow: Fatty Acyl-Carnitine -> Translocase -> CPT2 -> Fatty Acyl-CoA
  // Simplified: Fatty Acyl-Carnitine -> CPT2 (Reaction) -> Fatty Acyl-CoA
  {
    id: 'arrow_fao_cpt2_1',
    from_id: 'fatty_acyl_carnitine_fao',
    reaction_id: 'rxn_fao_cpt2',
    curved: true,
    flipped: true,
    byMoleculeAngle: 180,
    x_scale: 1.5,
    y_scale: -1.25,
  },
  {
    id: 'arrow_fao_cpt2_out_1',
    to_id: 'fatty_acyl_coa_mito_fao',
    reaction_id: 'rxn_fao_cpt2',
    flipped: true,
    curved: true,
    x_scale: 1.5,
    y_scale: -1.25,
    byreactant: ['CoA'],
    byMoleculeAngle: 180,
  },

  // Step 6: Acyl-CoA Dehydrogenase
  {
    id: 'arrow_fao_6',
    from_id: 'fatty_acyl_coa_mito_fao',
    to_id: 'trans_enoyl_coa_fao',
    reaction_id: 'rxn_fao_6'
  },

  // Step 7: Enoyl-CoA Hydratase
  {
    id: 'arrow_fao_7',
    from_id: 'trans_enoyl_coa_fao',
    to_id: 'beta_hydroxyacyl_coa_fao',
    reaction_id: 'rxn_fao_7'
  },

  // Step 8: β-hydroxyacyl-CoA Dehydrogenase
  {
    id: 'arrow_fao_8',
    from_id: 'beta_hydroxyacyl_coa_fao',
    to_id: 'beta_ketoacyl_coa_fao',
    reaction_id: 'rxn_fao_8'
  },

  // Step 9: Thiolase (β-ketoacyl-CoA -> Acetyl-CoA + (n-2)Acyl-CoA)
  // "two straight arrows, second arrow from at the middle of first arrow to acetyl-CoA"
  {
    id: 'arrow_fao_9_main',
    from_id: 'beta_ketoacyl_coa_fao',
    to_id: 'acetyl_coa_fao',
    reaction_id: 'rxn_fao_9',
    y_scale: 1.5,
  },
  {
    id: 'arrow_fao_9_branch',
    from_id: 'arrow_fao_9_main', // Midpoint connection
    to_id: 'fatty_acyl_coa_shortened_fao',
    reaction_id: 'rxn_fao_9',
  },

  // Step 10: Recycling
  {
    id: 'arrow_fao_recycle',
    from_id: 'fatty_acyl_coa_shortened_fao',
    reaction_id: 'rxn_fao_recycle',
    curved: true,
    flipped: true,
    byMoleculeAngle: 95,
    x_scale: 6,
    y_scale: 1.33,

  },

  // Step 11: Propionyl-CoA -> Methylmalonyl-CoA
  {
    id: 'arrow_fao_11',
    from_id: 'propionyl_coa_fao',
    to_id: 'methylmalonyl_coa_fao',
    reaction_id: 'rxn_fao_11'
  },

  // Step 12: Methylmalonyl-CoA -> Succinyl-CoA
  {
    id: 'arrow_fao_12',
    from_id: 'methylmalonyl_coa_fao',
    to_id: 'succinyl_coa_fao',
    reaction_id: 'rxn_fao_12'
  },

  // Step 13: Succinyl-CoA -> TCA
  {
    id: 'arrow_fao_13',
    from_id: 'succinyl_coa_fao',
    to_id: 'tca_entry_fao', // Using the placeholder node in FAO
    reaction_id: 'rxn_fao_tca'
  }
];
