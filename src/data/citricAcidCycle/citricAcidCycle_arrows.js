/**
 * Citric Acid Cycle - Arrows Data
 * 
 * Demonstrates cyclic pathway: the last step connects back to the first
 */

export const citricAcidCycleArrows = [
  // Main cycle arrows (sequential)
  {
    id: 'arrow_cac_1',
    from_id: 'oxaloacetate',
    to_id: 'citrate',
    reaction_id: 'rxn_cac_1',
    flipped: true
  },
  {
    id: 'arrow_cac_2',
    from_id: 'citrate',
    to_id: 'isocitrate',
    reaction_id: 'rxn_cac_2'
  },
  {
    id: 'arrow_cac_3',
    from_id: 'isocitrate',
    to_id: 'alpha_ketoglutarate',
    reaction_id: 'rxn_cac_3'
  },
  {
    id: 'arrow_cac_4',
    from_id: 'alpha_ketoglutarate',
    to_id: 'succinyl_coa',
    reaction_id: 'rxn_cac_4'
  },
  {
    id: 'arrow_cac_5',
    from_id: 'succinyl_coa',
    to_id: 'succinate',
    reaction_id: 'rxn_cac_5'
  },
  {
    id: 'arrow_cac_6',
    from_id: 'succinate',
    to_id: 'fumarate',
    reaction_id: 'rxn_cac_6'
  },
  {
    id: 'arrow_cac_7',
    from_id: 'fumarate',
    to_id: 'malate',
    reaction_id: 'rxn_cac_7'
  },
  {
    id: 'arrow_cac_8',
    from_id: 'malate',
    to_id: 'oxaloacetate', // CYCLIC: connects back to the first node
    reaction_id: 'rxn_cac_8'
  }
];

