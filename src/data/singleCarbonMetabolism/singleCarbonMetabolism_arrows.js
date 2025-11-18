/**
 * Single-Carbon Metabolism and Sulfur-Containing Amino Acids Pathway - Arrows Data
 */

export const singleCarbonMetabolismArrows = [
  // Upper Row: Folate Metabolism Pathway
  
  // Step 1: Folate → Dihydrofolate
  {
    id: 'arrow_single_carbon_1',
    from_id: 'folate',
    to_id: 'dihydrofolate_single_carbon',
    reaction_id: 'rxn_single_carbon_1'
  },

  // Step 2: Dihydrofolate → THF
  {
    id: 'arrow_single_carbon_2',
    from_id: 'dihydrofolate_single_carbon',
    to_id: 'thf',
    reaction_id: 'rxn_single_carbon_2'
  },

  // Step 3: THF → N10-formyl-THF
  {
    id: 'arrow_single_carbon_3',
    from_id: 'thf',
    to_id: 'n10_formyl_thf',
    reaction_id: 'rxn_single_carbon_3'
  },

  // Step 4: N10-formyl-THF → N5,N10-methenyl-THF
  {
    id: 'arrow_single_carbon_4',
    from_id: 'n10_formyl_thf',
    to_id: 'n5_n10_methenyl_thf',
    reaction_id: 'rxn_single_carbon_4'
  },

  // Step 5: N5,N10-methenyl-THF → N5,N10-methylene-THF
  {
    id: 'arrow_single_carbon_5',
    from_id: 'n5_n10_methenyl_thf',
    to_id: 'n5_n10_methylene_thf',
    reaction_id: 'rxn_single_carbon_5'
  },

  // Lower Row: Serine/Glycine Pathway

  // Step 6: 3-phosphoglycerate → 3-phosphopyruvate
  // Note: Uses '3_phosphoglycerate' ID from glycolysis pathway
  {
    id: 'arrow_single_carbon_6',
    from_id: '3_phosphoglycerate',
    to_id: '3_phosphopyruvate',
    reaction_id: 'rxn_single_carbon_6'
  },

  // Step 7: 3-phosphopyruvate → 3-phosphoserine
  {
    id: 'arrow_single_carbon_7',
    from_id: '3_phosphopyruvate',
    to_id: '3_phosphoserine',
    reaction_id: 'rxn_single_carbon_7'
  },

  // Step 8: 3-phosphoserine → Serine
  {
    id: 'arrow_single_carbon_8',
    from_id: '3_phosphoserine',
    to_id: 'serine',
    reaction_id: 'rxn_single_carbon_8'
  },

  // Step 9: Serine → Glycine
  {
    id: 'arrow_single_carbon_9',
    from_id: 'serine',
    to_id: 'glycine',
    reaction_id: 'rxn_single_carbon_9',
    x_scale: 5.5,
    y_scale: 2,
  },

  // Creatine Synthesis Pathway Arrows

  // Step 10: N5,N10-methylene-THF → Glycine (downward, vertical connection)
  {
    id: 'arrow_single_carbon_10',
    from_id: 'n5_n10_methylene_thf',
    to_id: 'glycine',
    reaction_id: 'rxn_single_carbon_10'
  },

  // Step 11: Glycine → Guanidinoacetate
  {
    id: 'arrow_single_carbon_11',
    from_id: 'glycine',
    to_id: 'guanidinoacetate',
    reaction_id: 'rxn_single_carbon_11'
  },

  // Step 12: Guanidinoacetate → Creatine
  {
    id: 'arrow_single_carbon_12',
    from_id: 'guanidinoacetate',
    to_id: 'creatine',
    reaction_id: 'rxn_single_carbon_12'
  },

  // Step 13: Creatine → Creatinine (Branch 1, direct path)
  // Using y_scale to offset this arrow slightly above the main path
  {
    id: 'arrow_single_carbon_13',
    from_id: 'creatine',
    to_id: 'creatinine',
    reaction_id: 'rxn_single_carbon_13',
    flipped: true
  },

  // Step 13: Creatine → Phosphocreatine (Branch 2, first reaction)
  {
    id: 'arrow_single_carbon_14',
    from_id: 'creatine',
    to_id: 'phosphocreatine',
    reaction_id: 'rxn_single_carbon_14',
  },

  // Step 14: Phosphocreatine → Creatinine (Branch 2, second reaction)
  {
    id: 'arrow_single_carbon_15',
    from_id: 'phosphocreatine',
    to_id: 'creatinine',
    reaction_id: 'rxn_single_carbon_15',
  },

  // Methionine-Homocysteine Cycle Arrows

  // Step 16: N5,N10-methylene-THF → N5-methyl-THF
  {
    id: 'arrow_single_carbon_16',
    from_id: 'n5_n10_methylene_thf',
    to_id: 'n5_methyl_thf',
    reaction_id: 'rxn_single_carbon_16'
  },

  // Cycle arrows (Methionine → SAM → SAH → Homocysteine → Methionine)
  // All cycle arrows are curved to form a clear circular path
  // Step 17: Methionine → SAM (cycle arrow 1)
  {
    id: 'arrow_single_carbon_18',
    from_id: 'methionine',
    to_id: 'sam',
    reaction_id: 'rxn_single_carbon_18',
    cycleArrow: true, // Mark as cycle arrow for curved rendering
    cyclic_id: 'methionine_homocysteine_cycle' // Reference to cycle metadata
  },

  // Step 18: SAM → SAH (cycle arrow 2)
  {
    id: 'arrow_single_carbon_19',
    from_id: 'sam',
    to_id: 'sah',
    reaction_id: 'rxn_single_carbon_19',
    cycleArrow: true,
    cyclic_id: 'methionine_homocysteine_cycle'
  },

  // Step 19: SAH → Homocysteine (cycle arrow 3)
  {
    id: 'arrow_single_carbon_20',
    from_id: 'sah',
    to_id: 'homocysteine',
    reaction_id: 'rxn_single_carbon_20',
    cycleArrow: true,
    cyclic_id: 'methionine_homocysteine_cycle'
  },

  // Step 20: Homocysteine → Methionine (cycle arrow 4, completes the cycle)
  {
    id: 'arrow_single_carbon_21',
    from_id: 'homocysteine',
    to_id: 'methionine', // CYCLIC: connects back to the first node of the cycle
    reaction_id: 'rxn_single_carbon_17',
    cycleArrow: true, // Mark as cycle arrow for curved rendering
    cyclic_id: 'methionine_homocysteine_cycle', // Reference to cycle metadata
  },

  // Homocysteine Catabolism Pathway Arrows
  // Main pathway (downward): homocysteine → cystathionine → cysteine → cysteine sulfinate → hypotaurine → taurine

  // Step 21: Homocysteine → Cystathionine (with serine)
  {
    id: 'arrow_single_carbon_22',
    from_id: 'homocysteine',
    to_id: 'cystathionine',
    reaction_id: 'rxn_single_carbon_22',
    flipped: true,
  },

  // Step 22: Cystathionine → Cysteine
  {
    id: 'arrow_single_carbon_23',
    from_id: 'cystathionine',
    to_id: 'cysteine',
    reaction_id: 'rxn_single_carbon_23',
  },

  // Step 23: Cysteine → Cysteine Sulfinate
  {
    id: 'arrow_single_carbon_24',
    from_id: 'cysteine',
    to_id: 'cysteine_sulfinate',
    reaction_id: 'rxn_single_carbon_24',
    flipped: true,
  },

  // Step 24: Cysteine Sulfinate → Hypotaurine
  {
    id: 'arrow_single_carbon_25',
    from_id: 'cysteine_sulfinate',
    to_id: 'hypotaurine',
    reaction_id: 'rxn_single_carbon_25',
    flipped: true,
  },

  // Step 26: Hypotaurine → Taurine
  {
    id: 'arrow_single_carbon_27',
    from_id: 'hypotaurine',
    to_id: 'taurine',
    reaction_id: 'rxn_single_carbon_27'
  },

  // Branch 1: Threonine → α-Ketobutyrate → Succinyl-CoA (right, then up)
  // Step 27: Threonine → α-Ketobutyrate
  {
    id: 'arrow_single_carbon_28',
    from_id: 'threonine',
    to_id: 'alpha_ketobutyrate',
    reaction_id: 'rxn_single_carbon_28'
  },

  // Step 28: α-Ketobutyrate → Succinyl-CoA
  {
    id: 'arrow_single_carbon_29',
    from_id: 'alpha_ketobutyrate',
    to_id: 'succinyl_coa_single_carbon', // Unique node ID to avoid conflicts
    reaction_id: 'rxn_single_carbon_29',
    flipped: true,
  },

  // Step 29: Succinyl-CoA → TCA Cycle
  {
    id: 'arrow_single_carbon_33',
    from_id: 'succinyl_coa_single_carbon',
    to_id: 'tca_cycle_single_carbon', // Unique node ID to avoid conflicts
    reaction_id: 'rxn_single_carbon_33'
  },

  // Branch 2: Cysteine Sulfinate → β-Sulfinylpyruvate → Pyruvate (right)
  // Step 30: Cysteine Sulfinate → β-Sulfinylpyruvate
  {
    id: 'arrow_single_carbon_30',
    from_id: 'cysteine_sulfinate',
    to_id: 'beta_sulfinylpyruvate',
    reaction_id: 'rxn_single_carbon_30'
  },

  // Step 32: β-Sulfinylpyruvate → Pyruvate (connects to glycolysis)
  {
    id: 'arrow_single_carbon_31',
    from_id: 'beta_sulfinylpyruvate',
    to_id: 'pyruvate_single_carbon', // Unique node ID to avoid conflicts
    reaction_id: 'rxn_single_carbon_31'
  },

  // Branch 3: Taurine → Bile Salts (right)
  // Step 32: Taurine → Bile Salts
  {
    id: 'arrow_single_carbon_32',
    from_id: 'taurine',
    to_id: 'bile_salts',
    reaction_id: 'rxn_single_carbon_32'
  }
];

