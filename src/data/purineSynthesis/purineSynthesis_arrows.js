/**
 * De Novo Purine Synthesis Pathway - Arrows Data
 */

export const purineSynthesisArrows = [
  // Main pathway arrows
  {
    id: 'arrow_purine_synthesis_1',
    from_id: 'prpp_purine',
    to_id: 'phosphoribosylamine',
    reaction_id: 'rxn_purine_synthesis_1',
    flipped: true
  },
  {
    id: 'arrow_purine_synthesis_2',
    from_id: 'phosphoribosylamine',
    to_id: 'gar',
    reaction_id: 'rxn_purine_synthesis_2'
  },
  {
    id: 'arrow_purine_synthesis_3',
    from_id: 'gar',
    to_id: 'fgar',
    reaction_id: 'rxn_purine_synthesis_3'
  },
  {
    id: 'arrow_purine_synthesis_4',
    from_id: 'fgar',
    to_id: 'fgam',
    reaction_id: 'rxn_purine_synthesis_4',
    flipped: true
  },
  {
    id: 'arrow_purine_synthesis_5',
    from_id: 'fgam',
    to_id: 'air',
    reaction_id: 'rxn_purine_synthesis_5',
    x_scale: 0.8
  },
  {
    id: 'arrow_purine_synthesis_6',
    from_id: 'air',
    to_id: 'cair',
    reaction_id: 'rxn_purine_synthesis_6'
  },
  {
    id: 'arrow_purine_synthesis_7',
    from_id: 'cair',
    to_id: 'saicar',
    reaction_id: 'rxn_purine_synthesis_7',
    x_scale: 0.8,
    flipped: true
  },
  {
    id: 'arrow_purine_synthesis_8',
    from_id: 'saicar',
    to_id: 'aicar',
    reaction_id: 'rxn_purine_synthesis_8',
    x_scale: 0.8,
    flipped: true
  },
  {
    id: 'arrow_purine_synthesis_9',
    from_id: 'aicar',
    to_id: 'faicar',
    reaction_id: 'rxn_purine_synthesis_9'
  },
  {
    id: 'arrow_purine_synthesis_10',
    from_id: 'faicar',
    to_id: 'imp',
    reaction_id: 'rxn_purine_synthesis_10'
  },
  
  // Left branch: IMP → AMP pathway
  {
    id: 'arrow_purine_synthesis_11',
    from_id: 'imp',
    to_id: 'adenylosuccinate',
    reaction_id: 'rxn_purine_synthesis_11',
    flipped: true
  },
  {
    id: 'arrow_purine_synthesis_12',
    from_id: 'adenylosuccinate',
    to_id: 'amp_purine',
    reaction_id: 'rxn_purine_synthesis_12',
    flipped: true
  },
  {
    id: 'arrow_purine_synthesis_13',
    from_id: 'amp_purine',
    to_id: 'adp',
    reaction_id: 'rxn_purine_synthesis_13',
    flipped: true
  },
  {
    id: 'arrow_purine_synthesis_14',
    from_id: 'adp',
    to_id: 'atp',
    reaction_id: 'rxn_purine_synthesis_14',
    flipped: true
  },
  // Branches from ATP
  {
    id: 'arrow_purine_synthesis_27',
    from_id: 'atp',
    to_id: 's_adenosyl_methionine',
    reaction_id: 'rxn_purine_synthesis_27',
    flipped: true,
    dashed: true
  },
  {
    id: 'arrow_purine_synthesis_28',
    from_id: 'atp',
    to_id: 'coenzyme_a',
    reaction_id: 'rxn_purine_synthesis_27',
    flipped: true,
    dashed: true
  },
  {
    id: 'arrow_purine_synthesis_29',
    from_id: 'atp',
    to_id: 'nadh_purine',
    reaction_id: 'rxn_purine_synthesis_27',
    dashed: true
  },
  {
    id: 'arrow_purine_synthesis_30',
    from_id: 'atp',
    to_id: 'fadh2_purine',
    reaction_id: 'rxn_purine_synthesis_27',
    dashed: true
  },
  
  // Base salvage pathway arrows
  {
    id: 'arrow_purine_synthesis_15',
    from_id: 'hypoxanthine',
    to_id: 'imp',
    reaction_id: 'rxn_purine_synthesis_15'
  },
  {
    id: 'arrow_purine_synthesis_20',
    from_id: 'adenine',
    to_id: 'amp_purine',
    reaction_id: 'rxn_purine_synthesis_20'
  },
  {
    id: 'arrow_purine_synthesis_21',
    from_id: 'guanine',
    to_id: 'gmp',
    reaction_id: 'rxn_purine_synthesis_21',
    flipped: true
  },
  
  // PRPP synthesis and pyrimidine salvage pathway
  {
    id: 'arrow_purine_synthesis_22',
    from_id: 'ribose_1_p',
    to_id: 'ribose_5_p',
    reaction_id: 'rxn_purine_synthesis_22'
  },
  {
    id: 'arrow_purine_synthesis_23',
    from_id: 'ribose_5_p',
    to_id: 'prpp_purine2',
    reaction_id: 'rxn_purine_synthesis_23',
    flipped: true
  },
  {
    id: 'arrow_purine_synthesis_24',
    from_id: 'uridine_purine',
    to_id: 'ribose_1_p',
    reaction_id: 'rxn_purine_synthesis_24'
  },
  
  // Right branch: IMP → GMP pathway
  {
    id: 'arrow_purine_synthesis_16',
    from_id: 'imp',
    to_id: 'xmp',
    reaction_id: 'rxn_purine_synthesis_16'
  },
  {
    id: 'arrow_purine_synthesis_17',
    from_id: 'xmp',
    to_id: 'gmp',
    reaction_id: 'rxn_purine_synthesis_17'
  },
  {
    id: 'arrow_purine_synthesis_18',
    from_id: 'gmp',
    to_id: 'gdp',
    reaction_id: 'rxn_purine_synthesis_18'
  },
  {
    id: 'arrow_purine_synthesis_19',
    from_id: 'gdp',
    to_id: 'gtp',
    reaction_id: 'rxn_purine_synthesis_19'
  },
  // Branch from GTP
  {
    id: 'arrow_purine_synthesis_31',
    from_id: 'gtp',
    to_id: 'biopterin',
    reaction_id: 'rxn_purine_synthesis_31',
    dashed: true
  },
  
  // Reverse arrows: AMP and GMP to IMP
  {
    id: 'arrow_purine_synthesis_25',
    from_id: 'amp_purine',
    to_id: 'imp',
    reaction_id: 'rxn_purine_synthesis_25',
  },
  {
    id: 'arrow_purine_synthesis_26',
    from_id: 'gmp',
    to_id: 'imp',
    reaction_id: 'rxn_purine_synthesis_26'
  },
];

