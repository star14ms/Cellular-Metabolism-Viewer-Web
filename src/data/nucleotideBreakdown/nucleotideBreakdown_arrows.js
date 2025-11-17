/**
 * Nucleotide Breakdown Pathway - Arrows Data
 */

export const nucleotideBreakdownArrows = [
  // Root connections: RNA/DNA to first-row molecules (except IMP)
  {
    id: 'arrow_breakdown_rna_gmp',
    from_id: 'rna_dna_root',
    to_id: 'gmp_breakdown',
    reaction_id: 'rxn_breakdown_rna_nucleases'
  },
  {
    id: 'arrow_breakdown_rna_amp',
    from_id: 'rna_dna_root',
    to_id: 'amp_breakdown',
    reaction_id: 'rxn_breakdown_rna_nucleases'
  },
  {
    id: 'arrow_breakdown_rna_cmp',
    from_id: 'rna_dna_root',
    to_id: 'cmp_breakdown',
    reaction_id: 'rxn_breakdown_rna_nucleases'
  },
  {
    id: 'arrow_breakdown_rna_ump',
    from_id: 'rna_dna_root',
    to_id: 'ump_breakdown',
    reaction_id: 'rxn_breakdown_rna_nucleases'
  },
  {
    id: 'arrow_breakdown_rna_dtmp',
    from_id: 'rna_dna_root',
    to_id: 'dtmp_breakdown',
    reaction_id: 'rxn_breakdown_rna_nucleases'
  },
  
  // Column 1: GMP breakdown pathway
  {
    id: 'arrow_breakdown_1',
    from_id: 'gmp_breakdown',
    to_id: 'guanosine_breakdown',
    reaction_id: 'rxn_breakdown_1'
  },
  {
    id: 'arrow_breakdown_2',
    from_id: 'guanosine_breakdown',
    to_id: 'guanine_breakdown',
    reaction_id: 'rxn_breakdown_2'
  },
  {
    id: 'arrow_breakdown_3',
    from_id: 'guanine_breakdown',
    to_id: 'xanthine_shared',
    reaction_id: 'rxn_breakdown_3'
  },
  {
    id: 'arrow_breakdown_4',
    from_id: 'xanthine_shared',
    to_id: 'uric_acid_shared',
    reaction_id: 'rxn_breakdown_4'
  },

  // Column 2: AMP breakdown pathway
  {
    id: 'arrow_breakdown_5',
    from_id: 'amp_breakdown',
    to_id: 'adenosine_breakdown',
    reaction_id: 'rxn_breakdown_5'
  },
  {
    id: 'arrow_breakdown_6',
    from_id: 'adenosine_breakdown',
    to_id: 'inosine_shared',
    reaction_id: 'rxn_breakdown_6'
  },
  {
    id: 'arrow_breakdown_7',
    from_id: 'inosine_shared',
    to_id: 'hypoxanthine_shared',
    reaction_id: 'rxn_breakdown_7'
  },
  {
    id: 'arrow_breakdown_8',
    from_id: 'hypoxanthine_shared',
    to_id: 'xanthine_shared',
    reaction_id: 'rxn_breakdown_8',
    flipped: true
  },

  // Column 3: IMP breakdown pathway
  // Arrow from AMP (2-1) to IMP (3-1) as specified
  {
    id: 'arrow_breakdown_10',
    from_id: 'amp_breakdown',
    to_id: 'imp_breakdown',
    reaction_id: 'rxn_breakdown_10',
    flipped: true
  },
  {
    id: 'arrow_breakdown_11',
    from_id: 'imp_breakdown',
    to_id: 'inosine_shared',
    reaction_id: 'rxn_breakdown_11'
  },

  // Column 4: CMP breakdown pathway
  {
    id: 'arrow_breakdown_15',
    from_id: 'cmp_breakdown',
    to_id: 'cytidine_breakdown',
    reaction_id: 'rxn_breakdown_15'
  },
  // Cytidine (4-2) to uridine (5-2) - cross-column connection
  {
    id: 'arrow_breakdown_16',
    from_id: 'cytidine_breakdown',
    to_id: 'uridine_ump',
    reaction_id: 'rxn_breakdown_16'
  },

  // Column 5: UMP breakdown pathway
  {
    id: 'arrow_breakdown_21',
    from_id: 'ump_breakdown',
    to_id: 'uridine_ump',
    reaction_id: 'rxn_breakdown_21'
  },
  {
    id: 'arrow_breakdown_22',
    from_id: 'uridine_ump',
    to_id: 'uracil_ump',
    reaction_id: 'rxn_breakdown_22'
  },
  {
    id: 'arrow_breakdown_23',
    from_id: 'uracil_ump',
    to_id: 'dihydrouracil_ump',
    reaction_id: 'rxn_breakdown_23'
  },
  {
    id: 'arrow_breakdown_24',
    from_id: 'dihydrouracil_ump',
    to_id: 'beta_ureidopropionate_ump',
    reaction_id: 'rxn_breakdown_24'
  },
  {
    id: 'arrow_breakdown_25',
    from_id: 'beta_ureidopropionate_ump',
    to_id: 'beta_alanine_ump',
    reaction_id: 'rxn_breakdown_25'
  },

  // Column 6: dTMP breakdown pathway
  {
    id: 'arrow_breakdown_26',
    from_id: 'dtmp_breakdown',
    to_id: 'thymidine_breakdown',
    reaction_id: 'rxn_breakdown_26'
  },
  {
    id: 'arrow_breakdown_27',
    from_id: 'thymidine_breakdown',
    to_id: 'thymine_breakdown',
    reaction_id: 'rxn_breakdown_27'
  },
  {
    id: 'arrow_breakdown_28',
    from_id: 'thymine_breakdown',
    to_id: 'dihydrothymine_breakdown',
    reaction_id: 'rxn_breakdown_28'
  },
  {
    id: 'arrow_breakdown_29',
    from_id: 'dihydrothymine_breakdown',
    to_id: 'beta_ureidoisobutyrate_breakdown',
    reaction_id: 'rxn_breakdown_29'
  },
  {
    id: 'arrow_breakdown_30',
    from_id: 'beta_ureidoisobutyrate_breakdown',
    to_id: 'beta_aminoisobutyric_acid_breakdown',
    reaction_id: 'rxn_breakdown_30'
  },

  // Shared intermediates are now consolidated:
  // - inosine_shared: used by both AMP (via adenosine) and IMP pathways
  // - hypoxanthine_shared: used by both AMP and IMP pathways
  // - xanthine_shared: convergence point from guanine (GMP) and hypoxanthine (AMP/IMP)
  // - uric_acid_shared: final product of all purine breakdown pathways
];

