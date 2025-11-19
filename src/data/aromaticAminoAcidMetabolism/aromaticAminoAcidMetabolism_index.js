/**
 * Aromatic Amino Acid Metabolism Pathway - Index
 */

import { aromaticAminoAcidMetabolismNodes } from './aromaticAminoAcidMetabolism_nodes.js';
import { aromaticAminoAcidMetabolismReactions } from './aromaticAminoAcidMetabolism_reactions.js';
import { aromaticAminoAcidMetabolismArrows } from './aromaticAminoAcidMetabolism_arrows.js';

export const aromaticAminoAcidMetabolismData = {
  nodes: aromaticAminoAcidMetabolismNodes,
  reactions: aromaticAminoAcidMetabolismReactions,
  arrows: aromaticAminoAcidMetabolismArrows,
  summary: {
    name: 'Aromatic Amino Acid Metabolism',
    pathwayType: 'amino_acids',
    description: 'Metabolic pathways for the interconversion and catabolism of phenylalanine and tyrosine, including synthesis of thyroid hormones and melanin precursors.',
    location: 'Cytoplasm, Thyroid gland, Melanocytes',
    netProducts: {
      'Tyrosine': { produced: 1, consumed: 0, net: 1 },
      'Glutamate': { produced: 2, consumed: 0, net: 2 }
    },
    keyRegulatorySteps: [
      { id: 'phenylalanine', text: 'Step 4: Phenylalanine hydroxylase (converts phenylalanine to tyrosine, requires BH₄ and O₂)' },
      { id: 'tyrosine', text: 'Step 6: Tyrosinase (oxidizes tyrosine to dopaquinone for melanin synthesis)' }
    ]
  },
  // Sub-pathways definition - 5 sub-pathways
  subPathways: [
    {
      id: 'phenylalanine-metabolism',
      name: 'Phenylalanine Metabolism',
      description: 'Phenylalanine catabolism and conversion to tyrosine. Includes transamination to phenylpyruvate, reduction to phenyllactate, oxidation to phenylacetate, and hydroxylation to tyrosine.',
      reactionIndices: [0, 2, 1, 5, 17], // Steps 1, 2, 3, 4, 6, 7 (rxn_aromatic_1, rxn_aromatic_2, rxn_aromatic_3, rxn_aromatic_4, rxn_aromatic_6, rxn_aromatic_8)
      nodeIds: ['phenylalanine', 'phenylpyruvate', 'phenyllactate', 'phenylacetate', 'tyrosine', 'p_hydroxyphenylpyruvate']
    },
    {
      id: 'thyroid-hormones-melanin',
      name: 'Thyroid Hormones and Melanin Synthesis',
      description: 'Tyrosine pathways for thyroid hormone and melanin synthesis. Includes conversion of tyrosine to thyroid hormones (T3 and T4), and tyrosine oxidation to dopaquinone and conversion to melanin.',
      reactionIndices: [7, 8, 9], // Steps 8, 9, 10 (rxn_aromatic_7 = Tyrosine to Thyroid Hormones, rxn_aromatic_8, rxn_aromatic_9)
      nodeIds: ['tyrosine', 'triiodothyronine', 'thyroxine', 'dopaquinone', 'melanin']
    },
    {
      id: 'catecholamine-synthesis',
      name: 'Catecholamine Synthesis and Degradation',
      description: 'Catecholamine biosynthesis and degradation pathway. Includes tyrosine hydroxylation to L-DOPA, decarboxylation to dopamine, hydroxylation to norepinephrine, methylation to epinephrine, and degradation to homovanillic acid and vanillylmandelic acid.',
      reactionIndices: [10, 11, 12, 13, 14, 15, 16], // Steps 11, 12, 13, 14, 15, 16, 17 (rxn_aromatic_11, rxn_aromatic_12, rxn_aromatic_13, rxn_aromatic_14, rxn_aromatic_15, rxn_aromatic_16, rxn_aromatic_17)
      nodeIds: ['tyrosine', 'dihydroxyphenylalanine', 'dopamine', 'norepinephrine', 'epinephrine', 'homovanillic_acid', 'vanillylmandelic_acid', 'vma_from_epinephrine', 'bh4_set2', 'bh2_set2']
    },
    {
      id: 'tyrosine-catabolism',
      name: 'Tyrosine Catabolism to TCA Cycle',
      description: 'Tyrosine catabolism pathway connecting to TCA cycle. Includes transamination to p-hydroxyphenylpyruvate, conversion to homogentisate, oxidation to maleylacetoacetate, isomerization to fumarylacetoacetate, hydrolysis to acetoacetate and fumarate, and entry into TCA cycle.',
      reactionIndices: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26], // Steps 18, 19, 20, 21, 22, 23, 24, 25, 26, 27 (rxn_aromatic_6, rxn_aromatic_18, rxn_aromatic_19, rxn_aromatic_20, rxn_aromatic_21, rxn_aromatic_22, rxn_aromatic_24, rxn_aromatic_25, rxn_aromatic_26, rxn_aromatic_27)
      nodeIds: ['tyrosine', 'p_hydroxyphenylpyruvate', 'homogentisate', 'alkapton', 'maleylacetoacetate', 'fumarylacetoacetate', 'succinylacetoacetate', 'succinylacetone', 'acetoacetate', 'fumarate_aromatic', 'tca_cycle']
    },
    {
      id: 'tryptophan-serotonin-pathway',
      name: 'Tryptophan to Serotonin and Melatonin',
      description: 'Tryptophan metabolism to serotonin and melatonin. Includes hydroxylation to 5-hydroxytryptophan, decarboxylation to serotonin, degradation to 5-hydroxyindoleacetic acid, N-acetylation to N-acetyl-5-HT, and methylation to melatonin.',
      reactionIndices: [27, 28, 29, 30, 31, 32], // Steps 28, 29, 30, 31, 32, 33 (rxn_aromatic_28, rxn_aromatic_30, rxn_aromatic_31, rxn_aromatic_32, rxn_aromatic_33)
      nodeIds: ['tryptophan', '5_hydroxytryptophan', 'serotonin', '5_hydroxyindoleacetic_acid', 'n_acetyl_5_ht', 'melatonin', 'bh4_set3', 'bh2_set3']
    }
  ]
};

export { aromaticAminoAcidMetabolismNodes, aromaticAminoAcidMetabolismReactions, aromaticAminoAcidMetabolismArrows };

