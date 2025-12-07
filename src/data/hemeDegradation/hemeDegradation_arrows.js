/**
 * Heme Degradation - Arrows Data
 */

export const hemeDegradationArrows = [
  // 1. Heme -> Biliverdin
  {
    id: 'arrow_heme_deg_1',
    from_id: 'heme_b_degradation',
    to_id: 'biliverdin',
    reaction_id: 'rxn_heme_deg_1'
  },
  
  // 2. Biliverdin -> Bilirubin
  {
    id: 'arrow_heme_deg_2',
    from_id: 'biliverdin',
    to_id: 'bilirubin',
    reaction_id: 'rxn_heme_deg_2'
  },
  
  // 3. Bilirubin -> Conjugated Bilirubin (with by-molecule node)
  {
    id: 'arrow_heme_deg_3',
    from_id: 'bilirubin',
    to_id: 'conjugated_bilirubin_heme_degradation',
    reaction_id: 'rxn_heme_deg_3'
  },
  
  // 4. Excretion (Branching)
  {
    id: 'arrow_heme_deg_4a',
    from_id: 'conjugated_bilirubin_heme_degradation',
    to_id: 'feces_excretion_degradation',
    reaction_id: 'rxn_heme_deg_4',
    dashed: true
  },
  {
    id: 'arrow_heme_deg_4b',
    from_id: 'conjugated_bilirubin_heme_degradation',
    to_id: 'urine_excretion_degradation',
    reaction_id: 'rxn_heme_deg_4',
    dashed: true
  },
  {
    id: 'arrow_heme_deg_4c',
    from_id: 'conjugated_bilirubin_heme_degradation',
    to_id: 'bile_excretion_degradation',
    reaction_id: 'rxn_heme_deg_4',
    dashed: true
  }
];

