/**
 * Aromatic Amino Acid Metabolism Pathway - Nodes Data
 * 
 * Positions are relative to Tyrosine (base position) using unit_space notation.
 * unit_space = 200 (standard spacing between nodes)
 */

const unit_space = 200;
const base_x = 2800; // Tyrosine position
const base_y = 200;

export const aromaticAminoAcidMetabolismNodes = [
  {
    id: 'phenylalanine',
    type: 'molecule',
    name: 'Phenylalanine',
    pathwayType: 'amino_acids',
    formula: 'C₉H₁₁NO₂',
    smiles: 'NC(Cc1ccccc1)C(=O)O',
    description: 'An essential aromatic amino acid',
    position: { x: base_x - unit_space * 2, y: base_y }
  },
  {
    id: 'phenylpyruvate',
    type: 'molecule',
    name: 'Phenylpyruvate',
    formula: 'C₉H₈O₃',
    smiles: 'CC(=O)C(=O)O',
    description: 'Keto acid derivative of phenylalanine',
    position: { x: base_x - unit_space * 3, y: base_y }
  },
  {
    id: 'phenyllactate',
    type: 'molecule',
    name: 'Phenyllactate',
    formula: 'C₉H₁₀O₃',
    smiles: 'CC(C(=O)O)c1ccccc1',
    description: 'Reduced form of phenylpyruvate',
    position: { x: base_x - unit_space * 4, y: base_y }
  },
  {
    id: 'phenylacetate',
    type: 'molecule',
    name: 'Phenylacetate',
    formula: 'C₈H₈O₂',
    smiles: 'CC(=O)Oc1ccccc1',
    description: 'Oxidized form of phenylpyruvate (via multiple steps)',
    position: { x: base_x - unit_space * 3, y: base_y - unit_space }
  },
  {
    id: 'tyrosine',
    type: 'molecule',
    name: 'Tyrosine',
    pathwayType: 'amino_acids',
    formula: 'C₉H₁₁NO₃',
    smiles: 'NC(Cc1ccc(O)cc1)C(=O)O',
    description: 'Aromatic amino acid, hydroxylated form of phenylalanine',
    position: { x: base_x, y: base_y }
  },
  {
    id: 'p_hydroxyphenylpyruvate',
    type: 'molecule',
    name: 'p-Hydroxyphenylpyruvate',
    formula: 'C₉H₈O₄',
    smiles: 'CC(=O)C(=O)Oc1ccc(O)cc1',
    description: 'Keto acid derivative of tyrosine',
    position: { x: base_x, y: base_y + unit_space }
  },
  {
    id: 'triiodothyronine',
    type: 'molecule',
    name: 'Triiodothyronine (T3)',
    formula: 'C₁₅H₁₂I₃NO₄',
    smiles: 'NC(Cc1cc(O)c(I)c(O)c1)C(=O)O',
    description: 'Active thyroid hormone (via multiple steps from tyrosine)',
    position: { x: base_x - unit_space - 66, y: base_y - unit_space }
  },
  {
    id: 'thyroxine',
    type: 'molecule',
    name: 'Thyroxine (T4)',
    formula: 'C₁₅H₁₁I₄NO₄',
    smiles: 'NC(Cc1cc(O)c(I)c(O)c1I)C(=O)O',
    description: 'Thyroid hormone (via multiple steps from tyrosine)',
    position: { x: base_x - unit_space + 66, y: base_y - unit_space }
  },
  {
    id: 'dopaquinone',
    type: 'molecule',
    name: 'Dopaquinone',
    formula: 'C₉H₇NO₄',
    smiles: 'OC(=O)C(N)Cc1ccc(O)c(O)c1',
    description: 'Oxidized form of tyrosine, precursor to melanin',
    position: { x: base_x, y: base_y - unit_space }
  },
  {
    id: 'melanin',
    type: 'molecule',
    name: 'Melanin',
    formula: 'Complex polymer',
    description: 'Pigment formed from dopaquinone through multiple steps',
    position: { x: base_x + unit_space, y: base_y - unit_space }
  },
  {
    id: 'dihydroxyphenylalanine',
    type: 'molecule',
    name: 'Dihydroxyphenylalanine (L-DOPA)',
    formula: 'C₉H₁₁NO₄',
    smiles: 'NC(Cc1cc(O)c(O)cc1)C(=O)O',
    description: 'Hydroxylated form of tyrosine, precursor to catecholamines',
    position: { x: base_x + unit_space * 2, y: base_y }
  },
  {
    id: 'dopamine',
    type: 'molecule',
    name: 'Dopamine',
    formula: 'C₈H₁₁NO₂',
    smiles: 'NC(Cc1cc(O)c(O)cc1)C',
    description: 'Neurotransmitter and precursor to norepinephrine',
    position: { x: base_x + unit_space * 3, y: base_y }
  },
  {
    id: 'norepinephrine',
    type: 'molecule',
    name: 'Norepinephrine',
    formula: 'C₈H₁₁NO₃',
    smiles: 'NC(Cc1cc(O)c(O)cc1)CO',
    description: 'Neurotransmitter and hormone, precursor to epinephrine',
    position: { x: base_x + unit_space * 4, y: base_y }
  },
  {
    id: 'epinephrine',
    type: 'molecule',
    name: 'Epinephrine',
    formula: 'C₉H₁₃NO₃',
    smiles: 'CNC(Cc1cc(O)c(O)cc1)CO',
    description: 'Hormone and neurotransmitter, also known as adrenaline',
    position: { x: base_x + unit_space * 5, y: base_y }
  },
  {
    id: 'homovanillic_acid',
    type: 'molecule',
    name: 'Homovanillic Acid (HVA)',
    formula: 'C₉H₁₀O₅',
    smiles: 'COc1cc(CC(=O)O)ccc1O',
    description: 'Breakdown product of dopamine through multiple steps',
    position: { x: base_x + unit_space * 3, y: base_y + unit_space }
  },
  {
    id: 'vanillylmandelic_acid',
    type: 'molecule',
    name: 'Vanillylmandelic Acid (VMA)',
    formula: 'C₉H₁₀O₆',
    smiles: 'COc1cc(CC(=O)C(=O)O)ccc1O',
    description: 'Breakdown product of norepinephrine through multiple steps',
    position: { x: base_x + unit_space * 4, y: base_y + unit_space }
  },
  {
    id: 'vma_from_epinephrine',
    type: 'molecule',
    name: 'Vanillylmandelic Acid (VMA)',
    formula: 'C₉H₁₀O₆',
    smiles: 'COc1cc(CC(=O)C(=O)O)ccc1O',
    description: 'Breakdown product of epinephrine through multiple steps',
    position: { x: base_x + unit_space * 5, y: base_y + unit_space }
  },
  {
    id: 'homogentisate',
    type: 'molecule',
    name: 'Homogentisate',
    formula: 'C₈H₈O₄',
    smiles: 'OC(=O)CC1=CC(=C(C=C1)O)O',
    description: 'Intermediate in tyrosine catabolism',
    position: { x: base_x, y: base_y + unit_space * 2 }
  },
  {
    id: 'alkapton',
    type: 'molecule',
    name: 'Alkapton',
    formula: 'C₈H₈O₄',
    smiles: 'OC(=O)CC1=CC(=C(C=C1)O)O',
    description: 'Oxidized form of homogentisate (spontaneous reaction)',
    position: { x: base_x - unit_space * 0.66, y: base_y + unit_space * 2 }
  },
  {
    id: 'maleylacetoacetate',
    type: 'molecule',
    name: 'Maleylacetoacetate',
    formula: 'C₈H₈O₆',
    smiles: 'OC(=O)CC(=O)C(=O)CC1=CC(=C(C=C1)O)O',
    description: 'Intermediate in tyrosine catabolism',
    position: { x: base_x, y: base_y + unit_space * 3 }
  },
  {
    id: 'fumarylacetoacetate',
    type: 'molecule',
    name: 'Fumarylacetoacetate',
    formula: 'C₈H₈O₆',
    smiles: 'OC(=O)CC(=O)C(=O)CC1=CC(=C(C=C1)O)O',
    description: 'Intermediate in tyrosine catabolism',
    position: { x: base_x, y: base_y + unit_space * 4 }
  },
  {
    id: 'succinylacetoacetate',
    type: 'molecule',
    name: 'Succinylacetoacetate',
    formula: 'C₈H₁₀O₆',
    smiles: 'OC(=O)CCC(=O)CC(=O)C(=O)O',
    description: 'Intermediate formed spontaneously from maleylacetoacetate or fumarylacetoacetate',
    position: { x: base_x - unit_space, y: base_y + unit_space * 3.5 }
  },
  {
    id: 'succinylacetone',
    type: 'molecule',
    name: 'Succinylacetone',
    formula: 'C₈H₁₂O₅',
    smiles: 'OC(=O)CCC(=O)CC(=O)C',
    description: 'Product of spontaneous decarboxylation of succinylacetoacetate',
    position: { x: base_x - unit_space * 2, y: base_y + unit_space * 3.5 }
  },
  {
    id: 'acetoacetate',
    type: 'molecule',
    name: 'Acetoacetate',
    formula: 'C₄H₅O₃⁻',
    smiles: 'CC(=O)CC(=O)[O-]',
    description: 'Ketone body, enters TCA cycle',
    position: { x: base_x - unit_space, y: base_y + unit_space * 5 }
  },
  {
    id: 'fumarate_aromatic',
    type: 'molecule',
    name: 'Fumarate',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₄H₄O₄²⁻',
    smiles: 'OC(=O)C=CC(=O)[O-]',
    description: 'TCA cycle intermediate from tyrosine catabolism',
    position: { x: base_x, y: base_y + unit_space * 5 }
  },
  {
    id: 'tca_cycle',
    type: 'molecule',
    name: 'TCA Cycle',
    pathwayType: 'oxidative-metabolism',
    formula: 'Multiple',
    imageUrl: 'https://praxilabs.com/en/blog/wp-content/uploads/2024/04/istockphoto-1034141326-612x612-1-1.jpg',
    description: 'Tricarboxylic acid cycle (Krebs cycle)',
    pathwayIdToRoute: 'citric-acid-cycle', // Route to citric acid cycle pathway when clicked
    position: { x: base_x, y: base_y + unit_space * 6 }
  },
  {
    id: 'tryptophan',
    type: 'molecule',
    name: 'Tryptophan',
    pathwayType: 'amino_acids',
    formula: 'C₁₁H₁₂N₂O₂',
    smiles: 'NC(Cc1c[nH]c2ccccc12)C(=O)O',
    description: 'Essential aromatic amino acid, precursor to serotonin and melatonin',
    position: { x: base_x + unit_space, y: base_y + unit_space * 2 }
  },
  {
    id: '5_hydroxytryptophan',
    type: 'molecule',
    name: '5-Hydroxytryptophan',
    formula: 'C₁₁H₁₂N₂O₃',
    smiles: 'NC(Cc1cc(O)c2ccccc2[nH]1)C(=O)O',
    description: 'Hydroxylated form of tryptophan, precursor to serotonin',
    position: { x: base_x + unit_space * 3, y: base_y + unit_space * 2 }
  },
  {
    id: 'serotonin',
    type: 'molecule',
    name: 'Serotonin (5-HT)',
    formula: 'C₁₀H₁₂N₂O',
    smiles: 'NC(Cc1cc(O)c2ccccc2[nH]1)C',
    description: 'Neurotransmitter and hormone, also known as 5-hydroxytryptamine (5-HT)',
    position: { x: base_x + unit_space * 4, y: base_y + unit_space * 2 }
  },
  {
    id: '5_hydroxyindoleacetic_acid',
    type: 'molecule',
    name: '5-Hydroxyindoleacetic Acid',
    formula: 'C₁₀H₉NO₃',
    smiles: 'OC(=O)Cc1cc(O)c2ccccc2[nH]1',
    description: 'Degradation product of serotonin via monoamine oxidase',
    position: { x: base_x + unit_space * 4, y: base_y + unit_space * 3 }
  },
  {
    id: 'n_acetyl_5_ht',
    type: 'molecule',
    name: 'N-Acetyl-5-HT',
    formula: 'C₁₂H₁₄N₂O₂',
    smiles: 'CC(=O)NC(Cc1cc(O)c2ccccc2[nH]1)C',
    description: 'N-acetylated form of serotonin, intermediate in melatonin synthesis',
    position: { x: base_x + unit_space * 5, y: base_y + unit_space * 2 }
  },
  {
    id: 'melatonin',
    type: 'molecule',
    name: 'Melatonin',
    formula: 'C₁₃H₁₆N₂O₂',
    smiles: 'CC(=O)NC(Cc1cc(OC)c2ccccc2[nH]1)C',
    description: 'Hormone involved in sleep-wake cycle regulation',
    position: { x: base_x + unit_space * 6, y: base_y + unit_space * 2 }
  },
  {
    id: 'niacin',
    type: 'molecule',
    name: 'Niacin',
    formula: 'C₆H₅NO₂',
    smiles: 'OC(=O)c1cccnc1',
    description: 'Vitamin B3, synthesized from tryptophan through multiple steps',
    position: { x: base_x + unit_space, y: base_y + unit_space * 3 }
  },
  {
    id: 'gtp_aromatic',
    type: 'molecule',
    name: 'Guanosine triphosphate (GTP)',
    formula: 'C₁₀H₁₆N₅O₁₄P₃',
    smiles: 'NC1=NC2=C(N1)C(=O)N(C(=O)N2)[C@H]3[C@@H]([C@H]([C@@H](O3)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Guanosine triphosphate, precursor to tetrahydrobiopterin',
    position: { x: base_x - unit_space * 1.33, y: base_y + unit_space * 2 }
  },
  {
    id: 'dihydroneopterin_triphosphate',
    type: 'molecule',
    name: 'Dihydroneopterin Triphosphate',
    formula: 'C₉H₁₇N₅O₁₀P₃',
    description: 'Intermediate in tetrahydrobiopterin synthesis',
    position: { x: base_x - unit_space * 1.33, y: base_y + unit_space * 1.33 }
  },
  {
    id: 'bh4_set1',
    type: 'molecule',
    name: 'Tetrahydrobiopterin (BH₄)',
    formula: 'C₉H₁₅N₅O₃',
    description: 'Cofactor for phenylalanine hydroxylase (set 1)',
    position: { x: base_x - unit_space * 1.33, y: base_y + unit_space * 0.66 }
  },
  {
    id: 'bh2_set1',
    type: 'molecule',
    name: 'Dihydrobiopterin (BH₂)',
    formula: 'C₉H₁₃N₅O₃',
    description: 'Oxidized form of tetrahydrobiopterin (set 1)',
    position: { x: base_x - unit_space * 0.66, y: base_y + unit_space * 0.66 }
  },
  {
    id: 'bh4_set2',
    type: 'molecule',
    name: 'Tetrahydrobiopterin (BH₄)',
    formula: 'C₉H₁₅N₅O₃',
    description: 'Cofactor for tyrosine hydroxylase (set 2)',
    position: { x: base_x + unit_space * 0.66, y: base_y + unit_space * 0.66 }
  },
  {
    id: 'bh2_set2',
    type: 'molecule',
    name: 'Dihydrobiopterin (BH₂)',
    formula: 'C₉H₁₃N₅O₃',
    description: 'Oxidized form of tetrahydrobiopterin (set 2)',
    position: { x: base_x + unit_space * 1.33, y: base_y + unit_space * 0.66 }
  },
  {
    id: 'bh4_set3',
    type: 'molecule',
    name: 'Tetrahydrobiopterin (BH₄)',
    formula: 'C₉H₁₅N₅O₃',
    description: 'Cofactor for tryptophan hydroxylase (set 3)',
    position: { x: base_x + unit_space * 1.66, y: base_y + unit_space * 2.66 }
  },
  {
    id: 'bh2_set3',
    type: 'molecule',
    name: 'Dihydrobiopterin (BH₂)',
    formula: 'C₉H₁₃N₅O₃',
    description: 'Oxidized form of tetrahydrobiopterin (set 3)',
    position: { x: base_x + unit_space * 2.33, y: base_y + unit_space * 2.66 }
  }
];

