/**
 * Deoxyribonucleotides Synthesis Pathway - Arrows Data
 */

export const deoxyribonucleotidesArrows = [
  // Column 1: Adenine pathway (ATP → ADP → dADP → dATP)
  {
    id: 'arrow_deoxy_1',
    from_id: 'atp_deoxy',
    to_id: 'adp_deoxy',
    reaction_id: 'rxn_deoxy_1'
  },
  {
    id: 'arrow_deoxy_2',
    from_id: 'adp_deoxy',
    to_id: 'dadp',
    reaction_id: 'rxn_deoxy_2'
  },
  {
    id: 'arrow_deoxy_3',
    from_id: 'dadp',
    to_id: 'datp',
    reaction_id: 'rxn_deoxy_3'
  },

  // Column 2: Guanine pathway (GTP → GDP → dGDP → dGTP)
  {
    id: 'arrow_deoxy_4',
    from_id: 'gtp_deoxy',
    to_id: 'gdp_deoxy',
    reaction_id: 'rxn_deoxy_4'
  },
  {
    id: 'arrow_deoxy_5',
    from_id: 'gdp_deoxy',
    to_id: 'dgdp',
    reaction_id: 'rxn_deoxy_5'
  },
  {
    id: 'arrow_deoxy_6',
    from_id: 'dgdp',
    to_id: 'dgtp',
    reaction_id: 'rxn_deoxy_6'
  },

  // Column 3: Cytosine pathway (CTP → CDP → dCDP → dCTP)
  {
    id: 'arrow_deoxy_7',
    from_id: 'ctp_deoxy',
    to_id: 'cdp_deoxy',
    reaction_id: 'rxn_deoxy_7'
  },
  {
    id: 'arrow_deoxy_8',
    from_id: 'cdp_deoxy',
    to_id: 'dcdp',
    reaction_id: 'rxn_deoxy_8'
  },
  {
    id: 'arrow_deoxy_9',
    from_id: 'dcdp',
    to_id: 'dctp',
    reaction_id: 'rxn_deoxy_9'
  },

  // Column 4: Uracil pathway (UTP → UDP → dUDP → dUTP)
  {
    id: 'arrow_deoxy_10',
    from_id: 'utp_deoxy',
    to_id: 'udp_deoxy',
    reaction_id: 'rxn_deoxy_10'
  },
  {
    id: 'arrow_deoxy_11',
    from_id: 'udp_deoxy',
    to_id: 'dudp',
    reaction_id: 'rxn_deoxy_11'
  },
  {
    id: 'arrow_deoxy_12',
    from_id: 'dudp',
    to_id: 'dutp',
    reaction_id: 'rxn_deoxy_12'
  },

  // Spontaneous interconversion: dCTP → dUTP
  {
    id: 'arrow_deoxy_13',
    from_id: 'dctp',
    to_id: 'dutp',
    reaction_id: 'rxn_deoxy_13'
  },

  // Thymidine synthesis pathway arrows
  {
    id: 'arrow_deoxy_14',
    from_id: 'dcdp',
    to_id: 'dcmp_deoxy',
    reaction_id: 'rxn_deoxy_14',
    flipped: true,
  },
  {
    id: 'arrow_deoxy_15',
    from_id: 'dcmp_deoxy',
    to_id: 'dump_deoxy',
    reaction_id: 'rxn_deoxy_15'
  },
  {
    id: 'arrow_deoxy_16',
    from_id: 'dutp',
    to_id: 'dump_deoxy',
    reaction_id: 'rxn_deoxy_16'
  },
  {
    id: 'arrow_deoxy_17',
    from_id: 'dump_deoxy',
    to_id: 'dtmp_deoxy',
    reaction_id: 'rxn_deoxy_17',
    flipped: true,
  },
  // Folate cycle arrows
  // Cycle: N⁵,N¹⁰-methylene-THF → Dihydrofolate → THF → N⁵,N¹⁰-methylene-THF
  {
    id: 'arrow_deoxy_17_cycle',
    from_id: 'n5n10_methylene_thf',
    to_id: 'dihydrofolate',
    reaction_id: 'rxn_deoxy_17',
    cycleArrow: true,
    cyclic_id: 'folate_cycle'
  },
  {
    id: 'arrow_deoxy_18',
    from_id: 'dihydrofolate',
    to_id: 'thf_deoxy',
    reaction_id: 'rxn_deoxy_18',
    cycleArrow: true,
    cyclic_id: 'folate_cycle'
  },
  {
    id: 'arrow_deoxy_19',
    from_id: 'thf_deoxy',
    to_id: 'n5n10_methylene_thf',
    reaction_id: 'rxn_deoxy_19',
    cycleArrow: true,
    cyclic_id: 'folate_cycle'
  },
  {
    id: 'arrow_deoxy_20',
    from_id: 'dtmp_deoxy',
    to_id: 'dtdp_deoxy',
    reaction_id: 'rxn_deoxy_20'
  },
  {
    id: 'arrow_deoxy_21',
    from_id: 'dtdp_deoxy',
    to_id: 'dttp_deoxy',
    reaction_id: 'rxn_deoxy_21'
  }
];

