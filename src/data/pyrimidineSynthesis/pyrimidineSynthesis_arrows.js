/**
 * De Novo Pyrimidine Synthesis Pathway - Arrows Data
 */

export const pyrimidineSynthesisArrows = [
  // Main pathway arrows
  {
    id: 'arrow_pyrimidine_synthesis_1',
    from_id: 'bicarbonate',
    to_id: 'carbamoyl_phosphate',
    reaction_id: 'rxn_pyrimidine_synthesis_1'
  },
  {
    id: 'arrow_pyrimidine_synthesis_2b',
    from_id: 'carbamoyl_phosphate',
    to_id: 'n_carbamoyl_aspartate',
    reaction_id: 'rxn_pyrimidine_synthesis_2'
  },
  {
    id: 'arrow_pyrimidine_synthesis_3',
    from_id: 'n_carbamoyl_aspartate',
    to_id: 'dihydroorotate',
    reaction_id: 'rxn_pyrimidine_synthesis_3'
  },
  {
    id: 'arrow_pyrimidine_synthesis_4',
    from_id: 'dihydroorotate',
    to_id: 'orotate',
    reaction_id: 'rxn_pyrimidine_synthesis_4'
  },
  {
    id: 'arrow_pyrimidine_synthesis_5',
    from_id: 'orotate',
    to_id: 'omp',
    reaction_id: 'rxn_pyrimidine_synthesis_5'
  },
  {
    id: 'arrow_pyrimidine_synthesis_6',
    from_id: 'omp',
    to_id: 'ump_pyrim',
    reaction_id: 'rxn_pyrimidine_synthesis_6'
  },
  {
    id: 'arrow_pyrimidine_synthesis_7',
    from_id: 'ump_pyrim',
    to_id: 'udp',
    reaction_id: 'rxn_pyrimidine_synthesis_7'
  },
  {
    id: 'arrow_pyrimidine_synthesis_8',
    from_id: 'udp',
    to_id: 'utp',
    reaction_id: 'rxn_pyrimidine_synthesis_8'
  },
  {
    id: 'arrow_pyrimidine_synthesis_9',
    from_id: 'utp',
    to_id: 'ctp',
    reaction_id: 'rxn_pyrimidine_synthesis_9'
  },
  // Alternative pathway arrow (spontaneous reaction)
  {
    id: 'arrow_pyrimidine_synthesis_10',
    from_id: 'utp',
    to_id: 'ctp',
    reaction_id: 'rxn_pyrimidine_synthesis_10'
  },
  // Reverse reaction: CTP to UTP (deamination)
  {
    id: 'arrow_pyrimidine_synthesis_11',
    from_id: 'ctp',
    to_id: 'utp',
    reaction_id: 'rxn_pyrimidine_synthesis_11'
  }
];

