/**
 * Ammonium Capture and Release Pathway - Arrows Data
 * 
 * Structure:
 * - Core pathway: α-ketoglutarate ↔ glutamate ↔ glutamine
 * - Transamination: glutamate ↔ many amino acids
 * - N-acetylglutamate pathway: glutamate ↔ N-acetylglutamate
 * - GABA shunt: glutamate → GABA → succinic semialdehyde → succinate
 * - TCA cycle connections: α-ketoglutarate → succinyl-CoA → succinate (from CAC)
 * 
 * Note: α-ketoglutarate and succinate nodes are extended from citric acid cycle
 * Bidirectional reactions: glutamate ↔ glutamine (two arrows), glutamate ↔ N-acetylglutamate (two arrows)
 */

export const ammoniumCaptureReleaseArrows = [
  // 1. α-Ketoglutarate ↔ Glutamate (reversible, single arrow)
  {
    id: 'arrow_acr_1',
    from_id: 'alpha_ketoglutarate', // Extended from CAC
    to_id: 'glutamate',
    reaction_id: 'rxn_acr_1',
    reversible: true
  },

  // 2. Glutamate ↔ Many Amino Acids (transamination, reversible, two arrows)
  // Forward: glutamate + many α-ketoacids → many amino acids
  {
    id: 'arrow_acr_4',
    from_id: 'many_amino_acids',
    to_id: 'many_alpha_ketoacids',
    reaction_id: 'rxn_acr_4',
    x_scale: 6.5,
    y_scale: 1.4,
  },

  // 3,Glutamate ↔ Glutamine (bidirectional, two separate arrows)
  // Forward: glutamate → glutamine
  {
    id: 'arrow_acr_2',
    from_id: 'glutamate',
    to_id: 'glutamine',
    reaction_id: 'rxn_acr_2',
    flipped: true
  },
  // 4. Glutamine → Glutamate (reverse, single arrow)
  {
    id: 'arrow_acr_3',
    from_id: 'glutamine',
    to_id: 'glutamate',
    reaction_id: 'rxn_acr_3',
    flipped: true
  },

  // 5. Glutamate ↔ N-Acetylglutamate (bidirectional, two separate arrows)
  // Forward: glutamate → N-acetylglutamate
  {
    id: 'arrow_acr_5',
    from_id: 'glutamate',
    to_id: 'n_acetylglutamate',
    reaction_id: 'rxn_acr_5',
    flipped: true
  },
  // 6. N-acetylglutamate → glutamate (direct reverse of synthase)
  {
    id: 'arrow_acr_5_reverse',
    from_id: 'n_acetylglutamate',
    to_id: 'glutamate',
    reaction_id: 'rxn_acr_6',
    flipped: true
  },
  
  // 7, 8, 9. GABA Shunt: Glutamate → GABA → Succinic Semialdehyde → Succinate
  {
    id: 'arrow_acr_7',
    from_id: 'glutamate',
    to_id: 'gaba',
    reaction_id: 'rxn_acr_7',
    flipped: true
  },
  {
    id: 'arrow_acr_8',
    from_id: 'gaba',
    to_id: 'succinic_semialdehyde',
    reaction_id: 'rxn_acr_8'
  },
  {
    id: 'arrow_acr_9',
    from_id: 'succinic_semialdehyde',
    to_id: 'succinate', // Extended from CAC
    reaction_id: 'rxn_acr_9'
  },
  
  // Note: TCA cycle connections (α-ketoglutarate → succinyl-CoA → succinate)
  // are already defined in citric acid cycle arrows (arrow_cac_4 and arrow_cac_5)
];

