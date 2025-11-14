/**
 * Electron Transport Chain - Arrows Data
 */

export const electronTransportChainArrows = [
  // Main pathway arrows
  {
    id: 'arrow_etc_1',
    from_id: 'complex_i',
    to_id: 'coenzyme_q',
    reaction_id: 'rxn_etc_1'
  },
  {
    id: 'arrow_etc_2',
    from_id: 'complex_ii',
    to_id: 'coenzyme_q',
    reaction_id: 'rxn_etc_2'
  },
  {
    id: 'arrow_etc_3',
    from_id: 'coenzyme_q',
    to_id: 'complex_iii',
    reaction_id: 'rxn_etc_3'
  },
  {
    id: 'arrow_etc_4',
    from_id: 'complex_iii',
    to_id: 'cytochrome_c',
    reaction_id: 'rxn_etc_4'
  },
  {
    id: 'arrow_etc_5',
    from_id: 'cytochrome_c',
    to_id: 'complex_iv',
    reaction_id: 'rxn_etc_5'
  },
  {
    id: 'arrow_etc_6',
    from_id: 'complex_iv',
    to_id: 'complex_v', // Note: Complex V is independent but shown connected
    reaction_id: 'rxn_etc_6'
  },
  {
    id: 'arrow_etc_7',
    from_id: 'complex_v',
    to_id: 'atp_etc',
    reaction_id: 'rxn_etc_7'
  }
];

