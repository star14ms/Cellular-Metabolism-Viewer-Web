/**
 * Fatty Acid and Lipid Synthesis Pathway - Arrows Data
 * 
 * Arrows represent connections between nodes
 * Order: Right to left
 */

export const fattyAcidAndLipidSynthesisArrows = [
  // Step 1: Citrate -> acetyl-CoA
  {
    id: 'arrow_fas_1',
    from_id: 'citrate_fas',
    to_id: 'acetyl_coa_fas',
    reaction_id: 'rxn_fas_1'
  },

  // Step 2: acetyl-CoA -> malonyl-CoA
  {
    id: 'arrow_fas_2',
    from_id: 'acetyl_coa_fas',
    to_id: 'malonyl_coa_fas',
    reaction_id: 'rxn_fas_2',
    flipped: true,
  },

  // Step 3: malonyl-CoA -> acetyl-CoA (reverse reaction)
  {
    id: 'arrow_fas_3',
    from_id: 'malonyl_coa_fas',
    to_id: 'acetyl_coa_fas',
    reaction_id: 'rxn_fas_3',
    flipped: true
  },

  // Step 4: malonyl-CoA -> malonyl-ACP
  {
    id: 'arrow_fas_4',
    from_id: 'malonyl_coa_fas',
    to_id: 'malonyl_acp',
    reaction_id: 'rxn_fas_4'
  },

  // Step 5: acetyl-CoA -> acetyl-ACP
  {
    id: 'arrow_fas_5',
    from_id: 'acetyl_coa_fas',
    to_id: 'acetyl_acp',
    reaction_id: 'rxn_fas_5'
  },

  // Step 6: acetyl-ACP -> β-ketoacyl-ACP (first cycle)
  {
    id: 'arrow_fas_6',
    from_id: 'acetyl_acp',
    to_id: 'beta_ketoacyl_acp',
    reaction_id: 'rxn_fas_6',
    flipped: true,
    y_scale: 3,
  },

  // Step 7: fatty acyl-ACP -> β-ketoacyl-ACP (subsequent cycles)
  {
    id: 'arrow_fas_7',
    from_id: 'fatty_acyl_acp',
    to_id: 'beta_ketoacyl_acp',
    reaction_id: 'rxn_fas_7',
    y_scale: 3,
  },

  // Step 8: β-ketoacyl-ACP -> β-hydroxyacyl-ACP (vertical)
  {
    id: 'arrow_fas_8',
    from_id: 'beta_ketoacyl_acp',
    to_id: 'beta_hydroxyacyl_acp',
    reaction_id: 'rxn_fas_8'
  },

  // Step 9: β-hydroxyacyl-ACP -> trans-enoyl-ACP (vertical)
  {
    id: 'arrow_fas_9',
    from_id: 'beta_hydroxyacyl_acp',
    to_id: 'trans_enoyl_acp',
    reaction_id: 'rxn_fas_9'
  },

  // Step 10: trans-enoyl-ACP -> (n+2) fatty acyl-ACP (vertical)
  {
    id: 'arrow_fas_10',
    from_id: 'trans_enoyl_acp',
    to_id: 'n_plus_2_fatty_acyl_acp',
    reaction_id: 'rxn_fas_10'
  },

  // Step 11: (n+2) fatty acyl-ACP -> fatty acyl-ACP (cycle back, vertical)
  {
    id: 'arrow_fas_11',
    from_id: 'n_plus_2_fatty_acyl_acp',
    reaction_id: 'rxn_fas_11',
    curved: true,
    flipped: true,
    x_scale: 6,
    y_scale: 1.5,
    byMoleculeAngle: 90,
  },

  // Step 12: (n+2) fatty acyl-ACP -> palmitate (C16)
  {
    id: 'arrow_fas_12',
    from_id: 'n_plus_2_fatty_acyl_acp',
    to_id: 'palmitate',
    reaction_id: 'rxn_fas_12'
  },

  // Step 13: palmitate (C16) -> palmitoyl-CoA
  {
    id: 'arrow_fas_13',
    from_id: 'palmitate',
    to_id: 'palmitoyl_coa',
    reaction_id: 'rxn_fas_13'
  },

  // Step 14: palmitoyl-CoA -> sphingosine
  {
    id: 'arrow_fas_14',
    from_id: 'palmitoyl_coa',
    to_id: 'sphingosine',
    reaction_id: 'rxn_fas_14'
  },

  // Step 15: sphingosine -> sphingolipids
  {
    id: 'arrow_fas_15',
    from_id: 'sphingosine',
    to_id: 'sphingolipids',
    reaction_id: 'rxn_fas_15'
  },

  // Step 16: glycerol-3-phosphate -> phosphatidic acid
  {
    id: 'arrow_fas_16',
    from_id: 'glycerol_3_phosphate_fas',
    to_id: 'phosphatidic_acid',
    reaction_id: 'rxn_fas_16',
    y_scale: 2.25,
  },

  // Step 17: phosphatidic acid -> phospholipids
  {
    id: 'arrow_fas_17',
    from_id: 'phosphatidic_acid',
    to_id: 'phospholipids',
    reaction_id: 'rxn_fas_17'
  },

  // Step 18: phosphatidic acid -> 1,2-diacylglycerol
  {
    id: 'arrow_fas_18',
    from_id: 'phosphatidic_acid',
    to_id: 'diacylglycerol',
    reaction_id: 'rxn_fas_18'
  },

  // Step 19: 1,2-diacylglycerol -> triacylglycerol
  {
    id: 'arrow_fas_19',
    from_id: 'diacylglycerol',
    to_id: 'triacylglycerol',
    reaction_id: 'rxn_fas_19'
  },

  // Fatty Acid Oxidation Entry & Transport Arrows

  // Step 20: Triacylglycerol -> Lipoproteins
  {
    id: 'arrow_fas_transport_1',
    from_id: 'triacylglycerol',
    to_id: 'lipoproteins',
    reaction_id: 'rxn_fas_transport_1',
    dashStyle: 'dashed' // Representing transport/packaging
  },

  // Step 21: Lipoproteins -> Free Fatty Acids (intercellular)
  {
    id: 'arrow_fas_transport_2',
    from_id: 'lipoproteins',
    to_id: 'free_fatty_acids_intercellular',
    reaction_id: 'rxn_fas_transport_2',
    dashStyle: 'dashed' // Hydrolysis and release
  },

  // Step 22: Free Fatty Acids (intercellular) -> Free Fatty Acids (plasma)
  {
    id: 'arrow_fas_transport_3',
    from_id: 'free_fatty_acids_intercellular',
    to_id: 'free_fatty_acids_plasma',
    reaction_id: 'rxn_fas_transport_3'
  },

  // Step 23a: Free Fatty Acids (plasma) -> Fatty acids > C24
  {
    id: 'arrow_fas_transport_4a',
    from_id: 'free_fatty_acids_plasma',
    to_id: 'fatty_acids_peroxisomes',
    reaction_id: 'rxn_fas_transport_4'
  },

  // Step 23b: Free Fatty Acids (plasma) -> Fatty acids <= C12
  {
    id: 'arrow_fas_transport_4b',
    from_id: 'free_fatty_acids_plasma',
    to_id: 'fatty_acids_short',
    reaction_id: 'rxn_fas_transport_4'
  },

  // Step 23c: Free Fatty Acids (plasma) -> Fatty acids > C14 < C22
  {
    id: 'arrow_fas_transport_4c',
    from_id: 'free_fatty_acids_plasma',
    to_id: 'fatty_acids_medium_long',
    reaction_id: 'rxn_fas_transport_4'
  },

  // Step 24: Fatty acids > C14 and < C22 to mitochondria
  {
    id: 'arrow_fas_transport_5',
    from_id: 'fatty_acids_short',
    to_id: 'fatty_acids_short_mitochondria',
    reaction_id: 'rxn_fas_transport_5'
  },

  // Step 25: Diet -> Carnitine
  {
    id: 'arrow_fas_transport_6',
    from_id: 'diet_fas',
    to_id: 'carnitine',
    reaction_id: 'rxn_fas_transport_6'
  },

  // Step 26: Carnitine -> Carnitine Transporter
  {
    id: 'arrow_fas_transport_7',
    from_id: 'carnitine',
    to_id: 'carnitine_transporter',
    reaction_id: 'rxn_fas_transport_7'
  },

  // Step 27: Ethanol -> Acetaldehyde
  {
    id: 'arrow_ethanol_acetaldehyde',
    from_id: 'ethanol_fas',
    to_id: 'acetaldehyde_fas',
    reaction_id: 'rxn_alcohol_dehydrogenase'
  }
];
