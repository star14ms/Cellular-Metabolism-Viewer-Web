/**
 * Aromatic Amino Acid Metabolism Pathway - Arrows Data
 */

export const aromaticAminoAcidMetabolismArrows = [
  // Step 1: Phenylalanine <-> Phenylpyruvate (reversible)
  {
    id: 'arrow_aromatic_1',
    from_id: 'phenylalanine',
    to_id: 'phenylpyruvate',
    reaction_id: 'rxn_aromatic_1'
  },
  // Step 2: Phenylpyruvate -> Phenyllactate
  {
    id: 'arrow_aromatic_2',
    from_id: 'phenylpyruvate',
    to_id: 'phenyllactate',
    reaction_id: 'rxn_aromatic_2'
  },
  // Step 3: Phenylpyruvate -> Phenylacetate (multiple steps)
  {
    id: 'arrow_aromatic_3',
    from_id: 'phenylpyruvate',
    to_id: 'phenylacetate',
    reaction_id: 'rxn_aromatic_3',
    dashed: true
  },
  // Step 4: Phenylalanine -> Tyrosine
  {
    id: 'arrow_aromatic_4',
    from_id: 'phenylalanine',
    to_id: 'tyrosine',
    reaction_id: 'rxn_aromatic_4',
    flipped: true
  },
  // Step 6: Tyrosine -> p-Hydroxyphenylpyruvate (transamination)
  {
    id: 'arrow_aromatic_6',
    from_id: 'tyrosine',
    to_id: 'p_hydroxyphenylpyruvate',
    reaction_id: 'rxn_aromatic_6'
  },
  // Step 5: Tyrosine -> T3 (multiple steps)
  {
    id: 'arrow_aromatic_7a',
    from_id: 'tyrosine',
    to_id: 'triiodothyronine',
    reaction_id: 'rxn_aromatic_7',
    dashed: true
  },
  // Step 5: Tyrosine -> T4 (multiple steps)
  {
    id: 'arrow_aromatic_7b',
    from_id: 'tyrosine',
    to_id: 'thyroxine',
    reaction_id: 'rxn_aromatic_7',
    dashed: true
  },
  // Step 6: Tyrosine -> Dopaquinone
  {
    id: 'arrow_aromatic_8',
    from_id: 'tyrosine',
    to_id: 'dopaquinone',
    reaction_id: 'rxn_aromatic_8'
  },
  // Dopaquinone -> Melanin (going right)
  {
    id: 'arrow_aromatic_9',
    from_id: 'dopaquinone',
    to_id: 'melanin',
    reaction_id: 'rxn_aromatic_9',
    dashed: true
  },
  // Tyrosine -> L-DOPA (linear, going right)
  {
    id: 'arrow_aromatic_10',
    from_id: 'tyrosine',
    to_id: 'dihydroxyphenylalanine',
    reaction_id: 'rxn_aromatic_10',
    flipped: true
  },
  // L-DOPA -> Dopamine (linear, going right)
  {
    id: 'arrow_aromatic_12',
    from_id: 'dihydroxyphenylalanine',
    to_id: 'dopamine',
    reaction_id: 'rxn_aromatic_12'
  },
  // Dopamine -> Norepinephrine (linear, going right)
  {
    id: 'arrow_aromatic_13',
    from_id: 'dopamine',
    to_id: 'norepinephrine',
    reaction_id: 'rxn_aromatic_13'
  },
  // Norepinephrine -> Epinephrine (linear, going right)
  {
    id: 'arrow_aromatic_14',
    from_id: 'norepinephrine',
    to_id: 'epinephrine',
    reaction_id: 'rxn_aromatic_14'
  },
  // Dopamine -> Homovanillic Acid (HVA) (breakdown, going down)
  {
    id: 'arrow_aromatic_15',
    from_id: 'dopamine',
    to_id: 'homovanillic_acid',
    reaction_id: 'rxn_aromatic_15',
    dashed: true
  },
  // Norepinephrine -> Vanillylmandelic Acid (VMA) (breakdown, going down)
  {
    id: 'arrow_aromatic_16',
    from_id: 'norepinephrine',
    to_id: 'vanillylmandelic_acid',
    reaction_id: 'rxn_aromatic_16',
    dashed: true
  },
  // Epinephrine -> Vanillylmandelic Acid (VMA) (breakdown, going down)
  {
    id: 'arrow_aromatic_17',
    from_id: 'epinephrine',
    to_id: 'vma_from_epinephrine',
    reaction_id: 'rxn_aromatic_17',
    dashed: true
  },
  // p-Hydroxyphenylpyruvate -> Homogentisate (downward)
  {
    id: 'arrow_aromatic_18',
    from_id: 'p_hydroxyphenylpyruvate',
    to_id: 'homogentisate',
    reaction_id: 'rxn_aromatic_18'
  },
  // Homogentisate -> Alkapton (spontaneous, going left)
  {
    id: 'arrow_aromatic_19',
    from_id: 'homogentisate',
    to_id: 'alkapton',
    reaction_id: 'rxn_aromatic_19'
  },
  // Homogentisate -> Maleylacetoacetate (downward)
  {
    id: 'arrow_aromatic_20',
    from_id: 'homogentisate',
    to_id: 'maleylacetoacetate',
    reaction_id: 'rxn_aromatic_20'
  },
  // Maleylacetoacetate -> Fumarylacetoacetate (downward)
  {
    id: 'arrow_aromatic_21',
    from_id: 'maleylacetoacetate',
    to_id: 'fumarylacetoacetate',
    reaction_id: 'rxn_aromatic_21'
  },
  // Maleylacetoacetate -> Succinylacetoacetate (downward, spontaneous)
  {
    id: 'arrow_aromatic_22',
    from_id: 'maleylacetoacetate',
    to_id: 'succinylacetoacetate',
    reaction_id: 'rxn_aromatic_22'
  },
  // Fumarylacetoacetate -> Succinylacetoacetate (downward, spontaneous)
  {
    id: 'arrow_aromatic_23',
    from_id: 'fumarylacetoacetate',
    to_id: 'succinylacetoacetate',
    reaction_id: 'rxn_aromatic_22'
  },
  // Succinylacetoacetate -> Succinylacetone (downward, spontaneous, releases CO₂)
  {
    id: 'arrow_aromatic_24',
    from_id: 'succinylacetoacetate',
    to_id: 'succinylacetone',
    reaction_id: 'rxn_aromatic_24'
  },
  // Fumarylacetoacetate -> Acetoacetate (left branch, downward)
  {
    id: 'arrow_aromatic_25a',
    from_id: 'arrow_aromatic_25b',
    to_id: 'acetoacetate',
    reaction_id: 'rxn_aromatic_25'
  },
  // Fumarylacetoacetate -> Fumarate (right branch, downward)
  {
    id: 'arrow_aromatic_25b',
    from_id: 'fumarylacetoacetate',
    to_id: 'fumarate_aromatic',
    reaction_id: 'rxn_aromatic_25'
  },
  // Acetoacetate -> TCA Cycle (downward)
  {
    id: 'arrow_aromatic_26',
    from_id: 'acetoacetate',
    to_id: 'tca_cycle',
    reaction_id: 'rxn_aromatic_26',
    dashed: true
  },
  // Fumarate -> TCA Cycle (downward)
  {
    id: 'arrow_aromatic_27',
    from_id: 'fumarate_aromatic',
    to_id: 'tca_cycle',
    reaction_id: 'rxn_aromatic_27',
    dashed: true
  },
  // Tryptophan -> 5-Hydroxytryptophan
  {
    id: 'arrow_aromatic_28',
    from_id: 'tryptophan',
    to_id: '5_hydroxytryptophan',
    reaction_id: 'rxn_aromatic_28',
    flipped: true
  },
  // 5-Hydroxytryptophan -> Serotonin
  {
    id: 'arrow_aromatic_30',
    from_id: '5_hydroxytryptophan',
    to_id: 'serotonin',
    reaction_id: 'rxn_aromatic_30'
  },
  // Serotonin -> 5-Hydroxyindoleacetic Acid (degradation, comes first)
  {
    id: 'arrow_aromatic_31',
    from_id: 'serotonin',
    to_id: '5_hydroxyindoleacetic_acid',
    reaction_id: 'rxn_aromatic_31'
  },
  // Serotonin -> N-Acetyl-5-HT (synthesis pathway)
  {
    id: 'arrow_aromatic_32',
    from_id: 'serotonin',
    to_id: 'n_acetyl_5_ht',
    reaction_id: 'rxn_aromatic_32'
  },
  // N-Acetyl-5-HT -> Melatonin
  {
    id: 'arrow_aromatic_33',
    from_id: 'n_acetyl_5_ht',
    to_id: 'melatonin',
    reaction_id: 'rxn_aromatic_33'
  },
  // Tryptophan -> Niacin (multiple steps, downward)
  {
    id: 'arrow_aromatic_34',
    from_id: 'tryptophan',
    to_id: 'niacin',
    reaction_id: 'rxn_aromatic_34',
    dashed: true
  },
  // BH2 -> BH4 Regeneration (Set 1)
  {
    id: 'arrow_aromatic_11_set1',
    from_id: 'bh2_set1',
    to_id: 'bh4_set1',
    reaction_id: 'rxn_aromatic_11'
  },
  // BH2 -> BH4 Regeneration (Set 2)
  {
    id: 'arrow_aromatic_11_set2',
    from_id: 'bh2_set2',
    to_id: 'bh4_set2',
    reaction_id: 'rxn_aromatic_11'
  },
  // BH2 -> BH4 Regeneration (Set 3)
  {
    id: 'arrow_aromatic_11_set3',
    from_id: 'bh2_set3',
    to_id: 'bh4_set3',
    reaction_id: 'rxn_aromatic_11'
  },
  // GTP -> Dihydroneopterin Triphosphate
  {
    id: 'arrow_aromatic_35',
    from_id: 'gtp_aromatic',
    to_id: 'dihydroneopterin_triphosphate',
    reaction_id: 'rxn_aromatic_35'
  },
  // Dihydroneopterin Triphosphate -> BH4 (Set 1)
  {
    id: 'arrow_aromatic_36',
    from_id: 'dihydroneopterin_triphosphate',
    to_id: 'bh4_set1',
    reaction_id: 'rxn_aromatic_36',
    dashed: true
  }
];

