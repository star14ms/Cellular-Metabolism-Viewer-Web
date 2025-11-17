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
};

export { aromaticAminoAcidMetabolismNodes, aromaticAminoAcidMetabolismReactions, aromaticAminoAcidMetabolismArrows };

