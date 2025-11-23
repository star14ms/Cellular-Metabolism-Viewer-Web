/**
 * Heme Synthesis - Arrows Data
 */

export const hemeSynthesisArrows = [
  // --- Matrix Steps ---
  {
    id: 'arrow_heme_1b',
    from_id: 'succinyl_coa_heme_matrix',
    to_id: 'delta_aminolevulinic_acid_matrix',
    reaction_id: 'rxn_heme_1'
  },

  // --- Transport to Cytosol ---
  {
    id: 'arrow_heme_transport_1',
    from_id: 'delta_aminolevulinic_acid_matrix',
    to_id: 'delta_aminolevulinic_acid_cytosol',
    reaction_id: 'rxn_heme_transport_1'
  },

  // --- Cytosol Steps ---
  {
    id: 'arrow_heme_2',
    from_id: 'delta_aminolevulinic_acid_cytosol',
    to_id: 'porphobilinogen_heme',
    reaction_id: 'rxn_heme_2'
  },
  {
    id: 'arrow_heme_3',
    from_id: 'porphobilinogen_heme',
    to_id: 'hydroxymethylbilane_heme',
    reaction_id: 'rxn_heme_3'
  },
  {
    id: 'arrow_heme_4',
    from_id: 'hydroxymethylbilane_heme',
    to_id: 'uroporphyrinogen_iii_heme',
    reaction_id: 'rxn_heme_4'
  },
  {
    id: 'arrow_heme_5',
    from_id: 'uroporphyrinogen_iii_heme',
    to_id: 'coproporphyrinogen_iii_heme',
    reaction_id: 'rxn_heme_5'
  },
  {
    id: 'arrow_heme_6',
    from_id: 'coproporphyrinogen_iii_heme',
    to_id: 'protoporphyrinogen_ix_cytosol',
    reaction_id: 'rxn_heme_6'
  },

  // --- Transport to Matrix ---
  {
    id: 'arrow_heme_transport_2',
    from_id: 'protoporphyrinogen_ix_cytosol',
    to_id: 'protoporphyrinogen_ix_matrix',
    reaction_id: 'rxn_heme_transport_2'
  },

  // --- Matrix Steps (End) ---
  {
    id: 'arrow_heme_7',
    from_id: 'protoporphyrinogen_ix_matrix',
    to_id: 'protoporphyrin_ix_heme',
    reaction_id: 'rxn_heme_7'
  },
  {
    id: 'arrow_heme_8a',
    from_id: 'protoporphyrin_ix_heme',
    to_id: 'heme_b_heme',
    reaction_id: 'rxn_heme_8'
  },
];
