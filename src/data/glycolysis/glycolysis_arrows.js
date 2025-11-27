/**
 * Glycolysis Pathway - Arrows Data
 */

export const glycolysisArrows = [
  // Main pathway arrows
  {
    id: 'arrow_glycolysis_1',
    from_id: 'glucose',
    to_id: 'glucose_6_phosphate',
    reaction_id: 'rxn_glycolysis_1'
  },
  {
    id: 'arrow_glycolysis_2',
    from_id: 'glucose_6_phosphate',
    to_id: 'fructose_6_phosphate',
    reaction_id: 'rxn_glycolysis_2'
  },
  {
    id: 'arrow_glycolysis_3',
    from_id: 'fructose_6_phosphate',
    to_id: 'fructose_1_6_bisphosphate',
    reaction_id: 'rxn_glycolysis_3'
  },
  {
    id: 'arrow_glycolysis_4',
    from_id: 'fructose_1_6_bisphosphate',
    to_id: 'glyceraldehyde_3_phosphate',
    reaction_id: 'rxn_glycolysis_4'
  },
  {
    id: 'arrow_glycolysis_4b',
    from_id: 'fructose_1_6_bisphosphate',
    to_id: 'dihydroxyacetone_phosphate',
    reaction_id: 'rxn_glycolysis_4'
  },
  {
    id: 'arrow_glycolysis_glucose_to_sorbitol',
    from_id: 'glucose',
    to_id: 'sorbitol',
    reaction_id: 'rxn_aldose_reductase'
  },
  {
    id: 'arrow_glycolysis_sorbitol_to_fructose',
    from_id: 'sorbitol',
    to_id: 'fructose_polyol',
    reaction_id: 'rxn_sorbitol_dehydrogenase'
  },
  {
    id: 'arrow_glycolysis_mannose_to_m6p',
    from_id: 'mannose',
    to_id: 'mannose_6_phosphate',
    reaction_id: 'rxn_mannose_kinase'
  },
  {
    id: 'arrow_glycolysis_m6p_to_f6p',
    from_id: 'mannose_6_phosphate',
    to_id: 'fructose_6_phosphate',
    reaction_id: 'rxn_phosphomannose_isomerase'
  },
  {
    id: 'arrow_glycolysis_f6p_to_f26bp',
    from_id: 'fructose_6_phosphate',
    to_id: 'fructose_2_6_bisphosphate',
    reaction_id: 'rxn_phosphofructokinase_2',
    flipped: true
  },
  {
    id: 'arrow_glycolysis_f26bp_to_f6p',
    from_id: 'fructose_2_6_bisphosphate',
    to_id: 'fructose_6_phosphate',
    reaction_id: 'rxn_fructose_bisphosphatase_2',
    flipped: true
  },
  {
    id: 'arrow_glycolysis_f6p_to_glucosamine6p',
    from_id: 'fructose_6_phosphate',
    to_id: 'glucosamine_6_phosphate',
    reaction_id: 'rxn_glutamine_f6p_aminotransferase'
  },
  {
    id: 'arrow_glycolysis_glucosamine6p_to_gags',
    from_id: 'glucosamine_6_phosphate',
    to_id: 'gags',
    reaction_id: 'rxn_gags_synthesis'
  },
  {
    id: 'arrow_glycolysis_glycerol_to_g3p',
    from_id: 'glycerol',
    to_id: 'glycerol_3_phosphate',
    reaction_id: 'rxn_glycerol_kinase',
    flipped: true
  },
  {
    id: 'arrow_glycolysis_g3p_to_dhap',
    from_id: 'glycerol_3_phosphate',
    to_id: 'dihydroxyacetone_phosphate',
    reaction_id: 'rxn_glycerol_3_phosphate_dehydrogenase',
    flipped: true
  },
  {
    id: 'arrow_glycolysis_fructose_to_f1p',
    from_id: 'fructose',
    to_id: 'fructose_1_phosphate',
    reaction_id: 'rxn_fructokinase'
  },
  {
    id: 'arrow_glycolysis_f1p_to_dhap',
    from_id: 'fructose_1_phosphate',
    to_id: 'dihydroxyacetone_phosphate',
    reaction_id: 'rxn_fructose_1p_aldolase'
  },
  {
    id: 'arrow_glycolysis_f1p_to_glyceraldehyde',
    from_id: 'fructose_1_phosphate',
    to_id: 'glyceraldehyde',
    reaction_id: 'rxn_fructose_1p_aldolase'
  },
  {
    id: 'arrow_glycolysis_glyceraldehyde_to_g3p',
    from_id: 'glyceraldehyde',
    to_id: 'glyceraldehyde_3_phosphate',
    reaction_id: 'rxn_triose_kinase'
  },
  {
    id: 'arrow_glycolysis_5',
    from_id: 'dihydroxyacetone_phosphate',
    to_id: 'glyceraldehyde_3_phosphate',
    reaction_id: 'rxn_glycolysis_5'
  },
  {
    id: 'arrow_glycolysis_6',
    from_id: 'glyceraldehyde_3_phosphate',
    to_id: '1_3_bisphosphoglycerate',
    reaction_id: 'rxn_glycolysis_6'
  },
  {
    id: 'arrow_glycolysis_7',
    from_id: '1_3_bisphosphoglycerate',
    to_id: '3_phosphoglycerate',
    reaction_id: 'rxn_glycolysis_7'
  },
  {
    id: 'arrow_glycolysis_8',
    from_id: '3_phosphoglycerate',
    to_id: '2_phosphoglycerate',
    reaction_id: 'rxn_glycolysis_8'
  },
  {
    id: 'arrow_glycolysis_13bpg_to_23bpg',
    from_id: '1_3_bisphosphoglycerate',
    to_id: '2_3_bisphosphoglycerate',
    reaction_id: 'rxn_bisphosphoglycerate_mutase'
  },
  {
    id: 'arrow_glycolysis_23bpg_to_2pg',
    from_id: '2_3_bisphosphoglycerate',
    to_id: '2_phosphoglycerate',
    reaction_id: 'rxn_bisphosphoglycerate_phosphatase'
  },
  {
    id: 'arrow_glycolysis_9',
    from_id: '2_phosphoglycerate',
    to_id: 'phosphoenolpyruvate',
    reaction_id: 'rxn_glycolysis_9'
  },
  {
    id: 'arrow_glycolysis_10',
    from_id: 'phosphoenolpyruvate',
    to_id: 'pyruvate_glycolysis',
    reaction_id: 'rxn_glycolysis_10'
  },
  
  // Mitochondrial Glycerol-3-phosphate Dehydrogenase Pathway - Curved arrows
  // 1. Mitochondrial Glycerol-3-phosphate Dehydrogenase - Curved arrows from glycerol-3-phosphate and FAD
  {
    id: 'arrow_glycolysis_mito_g3p_1',
    from_id: 'glycerol_3_phosphate',
    reaction_id: 'rxn_mitochondrial_glycerol_3_phosphate_dehydrogenase',
    curved: true,
    flipped: true,
    x_scale: 3,
    y_scale: -1,
  },
  {
    id: 'arrow_glycolysis_mito_g3p_2',
    from_id: 'fad_glycolysis',
    reaction_id: 'rxn_mitochondrial_glycerol_3_phosphate_dehydrogenase',
    curved: true,
    x_scale: 1.5,
    y_scale: -0.66,
  },
  
  // 2. FADH₂ to Coenzyme Q Electron Transfer - Curved arrows from FADH2 and Coenzyme Q (oxidized)
  {
    id: 'arrow_glycolysis_fadh2_to_coq_1',
    from_id: 'fadh2_glycolysis',
    reaction_id: 'rxn_fadh2_to_coenzyme_q',
    curved: true,
    byproduct: ['Coenzyme Q (reduced)'],
    x_scale: 1.5,
    y_scale: 0.66,
    byMoleculeAngle: 180,
  },
  {
    id: 'arrow_glycolysis_fadh2_to_coq_2',
    from_id: 'coenzyme_q_oxidized',
    reaction_id: 'rxn_fadh2_to_coenzyme_q',
    curved: true,
    flipped: true,
    byreactant: ['Coenzyme Q (oxidized)'],
    x_scale: 1.5,
    y_scale: -0.66,
    byMoleculeAngle: 180,
  },
  
  // Additional reactions (Gluconeogenesis/Anaplerotic)
  {
    id: 'arrow_glycolysis_oaa_malate',
    from_id: 'oxaloacetate_glycolysis',
    to_id: 'malate_glycolysis',
    reaction_id: 'rxn_malate_dehydrogenase'
  },
  {
    id: 'arrow_glycolysis_oaa_pep',
    from_id: 'oxaloacetate_glycolysis',
    to_id: 'phosphoenolpyruvate',
    reaction_id: 'rxn_pep_carboxykinase'
  },
  {
    id: 'arrow_glycolysis_malate_pyruvate',
    from_id: 'malate_glycolysis',
    to_id: 'pyruvate_glycolysis',
    reaction_id: 'rxn_malic_enzyme'
  },
  // Lactate fermentation pathway
  {
    id: 'arrow_fermentation_1',
    from_id: 'pyruvate_glycolysis',
    to_id: 'lactate',
    reaction_id: 'rxn_fermentation_1',
  },
  // Pyruvate to Alanine transamination
  {
    id: 'arrow_glycolysis_pyruvate_alanine',
    from_id: 'pyruvate_glycolysis',
    to_id: 'alanine_glycolysis',
    reaction_id: 'rxn_pyruvate_transamination',
    flipped: true
  },
  // Malate-Aspartate Shuttle
  // Reaction 1: Mitochondrial AST - Two curved arrows
  {
    id: 'arrow_shuttle_ast_mito_1',
    from_id: 'glutamate_mito_shuttle',
    reaction_id: 'rxn_ast_mito_shuttle',
    curved: true,
    flipped: true,
    x_scale: 1.5,
    y_scale: -0.75,
    byMoleculeAngle: 270
  },
  {
    id: 'arrow_shuttle_ast_mito_2',
    from_id: 'oxaloacetate_glycolysis',
    reaction_id: 'rxn_ast_mito_shuttle',
    curved: true,
    x_scale: 4.5,
    y_scale: -0.75,
    byMoleculeAngle: 90
  },
  // Reaction 2: Transport - Exchange arrows (separate reactions)
  {
    id: 'arrow_shuttle_transport_glutamate',
    from_id: 'glutamate_mito_shuttle',
    reaction_id: 'rxn_shuttle_transport_glutamate',
    curved: true,
    x_scale: 4.5,
    byMoleculeAngle: 90
  },
  {
    id: 'arrow_shuttle_transport_aspartate',
    from_id: 'aspartate_cyto_shuttle',
    to_id: 'aspartate_mito_shuttle',
    reaction_id: 'rxn_shuttle_transport_aspartate'
  },
  {
    id: 'arrow_shuttle_transport_ketoglutarate',
    from_id: 'alpha_ketoglutarate_mito_shuttle',
    to_id: 'alpha_ketoglutarate_cyto_shuttle',
    reaction_id: 'rxn_shuttle_transport_ketoglutarate'
  },
  // Reaction 3: Cytosolic AST - Two curved arrows
  {
    id: 'arrow_shuttle_ast_cyto_1',
    from_id: 'aspartate_cyto_shuttle',
    reaction_id: 'rxn_ast_cyto_shuttle',
    curved: true,
    flipped: true,
    x_scale: 1.5,
    y_scale: 0.68,
    byMoleculeAngle: 270
  },
  {
    id: 'arrow_shuttle_ast_cyto_2',
    from_id: 'alpha_ketoglutarate_cyto_shuttle',
    reaction_id: 'rxn_ast_cyto_shuttle',
    curved: true,
    x_scale: 1.5,
    y_scale: -0.68,
    byMoleculeAngle: 90
  },
  // Citrate Transport
  {
    id: 'arrow_shuttle_transport_citrate',
    from_id: 'citrate_cyto_shuttle',
    to_id: 'citrate_fas',
    reaction_id: 'rxn_shuttle_transport_citrate'
  }
];

