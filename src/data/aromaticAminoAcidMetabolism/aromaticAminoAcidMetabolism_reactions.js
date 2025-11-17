/**
 * Aromatic Amino Acid Metabolism Pathway - Reactions Data
 */

export const aromaticAminoAcidMetabolismReactions = [
  {
    id: 'rxn_aromatic_1',
    name: 'Phenylalanine Transamination',
    byreactant: ['α-Ketoglutarate'],
    byproduct: ['Glutamate'],
    enzyme: {
      name: 'Transaminase',
      ecNumber: 'EC 2.6.1.x',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)'],
      description: 'Transfers amino group from phenylalanine to α-ketoglutarate, forming phenylpyruvate and glutamate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction',
      isReversible: true
    }
  },
  {
    id: 'rxn_aromatic_3',
    name: 'Phenylpyruvate to Phenylacetate',
    enzyme: {
      name: 'Multiple enzymes',
      ecNumber: 'Multiple steps',
      cofactors: ['Multiple cofactors'],
      description: 'Conversion of phenylpyruvate to phenylacetate through multiple enzymatic steps'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Multi-step pathway',
      isReversible: false,
      notes: 'Multiple steps involved'
    }
  },
  {
    id: 'rxn_aromatic_2',
    name: 'Phenylpyruvate Reduction',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'Dehydrogenase',
      ecNumber: 'EC 1.1.1.x',
      cofactors: ['NADPH'],
      description: 'Reduces phenylpyruvate to phenyllactate using NADPH'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'NADPH-dependent reduction',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_4',
    name: 'Phenylalanine Hydroxylation',
    byreactant: ['Tetrahydrobiopterin (BH₄)'],
    byproduct: ['Dihydrobiopterin (BH₂)'],
    displayByreactant: ['O₂'],
    displayByproduct: ['H₂O'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: 'Phenylalanine hydroxylase',
      ecNumber: 'EC 1.14.16.1',
      cofactors: ['Tetrahydrobiopterin (BH₄)', 'O₂'],
      description: 'Hydroxylates phenylalanine to form tyrosine, requiring O₂ and tetrahydrobiopterin'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key regulatory step in phenylalanine metabolism',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_7',
    name: 'Tyrosine to Thyroid Hormones',
    enzyme: {
      name: 'Multiple enzymes',
      ecNumber: 'Multiple steps',
      cofactors: ['Iodine', 'Multiple cofactors'],
      description: 'Conversion of tyrosine to triiodothyronine (T3) and thyroxine (T4) through multiple enzymatic steps involving iodination'
    },
    conditions: {
      location: 'Thyroid gland',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Multi-step pathway requiring iodine',
      isReversible: false,
      notes: 'Multiple steps involved'
    }
  },
  {
    id: 'rxn_aromatic_8',
    name: 'Tyrosine Oxidation to Dopaquinone',
    enzyme: {
      name: 'Tyrosinase',
      ecNumber: 'EC 1.14.18.1',
      cofactors: ['Copper', 'O₂'],
      description: 'Oxidizes tyrosine to dopaquinone, a key step in melanin synthesis'
    },
    conditions: {
      location: 'Melanocytes',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key enzyme in melanin biosynthesis',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_9',
    name: 'Dopaquinone to Melanin',
    enzyme: {
      name: 'Multiple enzymes',
      ecNumber: 'Multiple steps',
      cofactors: ['Multiple cofactors'],
      description: 'Conversion of dopaquinone to melanin through multiple enzymatic steps'
    },
    conditions: {
      location: 'Melanocytes',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Multi-step pathway',
      isReversible: false,
      notes: 'Multiple steps involved'
    }
  },
  {
    id: 'rxn_aromatic_10',
    name: 'Tyrosine Hydroxylation',
    byreactant: ['Tetrahydrobiopterin (BH₄)'],
    byproduct: ['Dihydrobiopterin (BH₂)'],
    displayByreactant: ['O₂'],
    displayByproduct: ['H₂O'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: 'Tyrosine hydroxylase',
      ecNumber: 'EC 1.14.16.2',
      cofactors: ['Tetrahydrobiopterin (BH₄)', 'O₂'],
      description: 'Hydroxylates tyrosine to form dihydroxyphenylalanine (L-DOPA), requiring O₂ and tetrahydrobiopterin'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Rate-limiting step in catecholamine synthesis',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_11',
    name: 'BH₂ to BH₄ Regeneration (Catecholamine)',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'Dihydrobiopterin reductase',
      ecNumber: 'EC 1.5.1.33',
      cofactors: ['NADPH'],
      description: 'Regenerates tetrahydrobiopterin (BH₄) from dihydrobiopterin (BH₂) using NADPH for catecholamine synthesis'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Required for continuous tyrosine hydroxylation',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_12',
    name: 'L-DOPA Decarboxylation',
    byproduct: ['CO₂'],
    enzyme: {
      name: 'Aromatic amino acid decarboxylase (DOPA decarboxylase)',
      ecNumber: 'EC 4.1.1.28',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)'],
      description: 'Decarboxylates L-DOPA to form dopamine, releasing CO₂'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Requires vitamin B₆ as cofactor',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_15',
    name: 'Dopamine to Homovanillic Acid',
    enzyme: {
      name: 'Multiple enzymes',
      ecNumber: 'Multiple steps',
      cofactors: ['Multiple cofactors'],
      description: 'Conversion of dopamine to homovanillic acid (HVA) through multiple enzymatic steps including methylation and oxidation'
    },
    conditions: {
      location: 'Liver, Brain',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Multi-step degradation pathway',
      isReversible: false,
      notes: 'Multiple steps involved'
    }
  },
  {
    id: 'rxn_aromatic_13',
    name: 'Dopamine Hydroxylation',
    byreactant: ['O₂', 'H₂O'],
    enzyme: {
      name: 'Dopamine β-hydroxylase',
      ecNumber: 'EC 1.14.17.1',
      cofactors: ['O₂', 'Ascorbate', 'Copper'],
      description: 'Hydroxylates dopamine to form norepinephrine, requiring O₂ and H₂O'
    },
    conditions: {
      location: 'Vesicles',
      ph: '5.0-6.0',
      temperature: '37°C',
      regulation: 'Requires ascorbate and copper as cofactors',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_16',
    name: 'Norepinephrine to Vanillylmandelic Acid',
    enzyme: {
      name: 'Multiple enzymes',
      ecNumber: 'Multiple steps',
      cofactors: ['Multiple cofactors'],
      description: 'Conversion of norepinephrine to vanillylmandelic acid (VMA) through multiple enzymatic steps including deamination and oxidation'
    },
    conditions: {
      location: 'Liver, Brain',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Multi-step degradation pathway',
      isReversible: false,
      notes: 'Multiple steps involved'
    }
  },
  {
    id: 'rxn_aromatic_14',
    name: 'Norepinephrine Methylation',
    byreactant: ['SAM (S-adenosylmethionine)'],
    byproduct: ['SAH (S-adenosylhomocysteine)'],
    enzyme: {
      name: 'Phenylethanolamine N-methyltransferase',
      ecNumber: 'EC 2.1.1.28',
      cofactors: ['SAM'],
      description: 'Methylates norepinephrine to form epinephrine, consuming SAM and producing SAH'
    },
    conditions: {
      location: 'Adrenal medulla',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'SAM-dependent methylation',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_17',
    name: 'Epinephrine to Vanillylmandelic Acid',
    enzyme: {
      name: 'Multiple enzymes',
      ecNumber: 'Multiple steps',
      cofactors: ['Multiple cofactors'],
      description: 'Conversion of epinephrine to vanillylmandelic acid (VMA) through multiple enzymatic steps including deamination and oxidation'
    },
    conditions: {
      location: 'Liver, Brain',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Multi-step degradation pathway',
      isReversible: false,
      notes: 'Multiple steps involved'
    }
  },
  {
    id: 'rxn_aromatic_6',
    name: 'Tyrosine Transamination',
    byreactant: ['α-Ketoglutarate'],
    byproduct: ['Glutamate'],
    enzyme: {
      name: 'Transaminase',
      ecNumber: 'EC 2.6.1.x',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)'],
      description: 'Transfers amino group from tyrosine to α-ketoglutarate, forming p-hydroxyphenylpyruvate and glutamate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction',
      isReversible: true
    }
  },
  {
    id: 'rxn_aromatic_18',
    name: 'p-Hydroxyphenylpyruvate to Homogentisate',
    byreactant: ['O₂'],
    byproduct: ['CO₂'],
    enzyme: {
      name: 'p-Hydroxyphenylpyruvate dioxygenase',
      ecNumber: 'EC 1.13.11.27',
      cofactors: ['O₂', 'Ascorbate'],
      description: 'Converts p-hydroxyphenylpyruvate to homogentisate, consuming O₂ and producing CO₂'
    },
    conditions: {
      location: 'Liver',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Requires ascorbate as cofactor',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_19',
    name: 'Homogentisate to Alkapton',
    enzyme: {
      name: 'Spontaneous',
      ecNumber: 'Non-enzymatic',
      cofactors: ['None'],
      description: 'Spontaneous oxidation of homogentisate to form alkapton'
    },
    conditions: {
      location: 'Extracellular',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Spontaneous reaction',
      isReversible: false,
      notes: 'Spontaneous reaction'
    }
  },
  {
    id: 'rxn_aromatic_20',
    name: 'Homogentisate to Maleylacetoacetate',
    byreactant: ['O₂'],
    enzyme: {
      name: 'Homogentisate dioxygenase',
      ecNumber: 'EC 1.13.11.5',
      cofactors: ['O₂', 'Fe²⁺'],
      description: 'Converts homogentisate to maleylacetoacetate, consuming O₂'
    },
    conditions: {
      location: 'Liver',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Requires Fe²⁺ as cofactor',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_21',
    name: 'Maleylacetoacetate to Fumarylacetoacetate',
    enzyme: {
      name: 'Maleylacetoacetate isomerase',
      ecNumber: 'EC 5.2.1.2',
      cofactors: ['Glutathione'],
      description: 'Isomerizes maleylacetoacetate to fumarylacetoacetate'
    },
    conditions: {
      location: 'Liver',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Requires glutathione as cofactor',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_22',
    name: 'Maleylacetoacetate to Succinylacetoacetate',
    displayByreactant: ['Fumarylacetoacetate'],
    enzyme: {
      name: 'Spontaneous',
      ecNumber: 'Non-enzymatic',
      cofactors: ['None'],
      description: 'Spontaneous conversion of maleylacetoacetate to succinylacetoacetate'
    },
    conditions: {
      location: 'Extracellular',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Spontaneous reaction',
      isReversible: false,
      notes: 'Spontaneous reaction'
    }
  },
  {
    id: 'rxn_aromatic_24',
    name: 'Succinylacetoacetate to Succinylacetone',
    byproduct: ['CO₂'],
    enzyme: {
      name: 'Spontaneous',
      ecNumber: 'Non-enzymatic',
      cofactors: ['None'],
      description: 'Spontaneous decarboxylation of succinylacetoacetate to succinylacetone, releasing CO₂'
    },
    conditions: {
      location: 'Extracellular',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Spontaneous reaction',
      isReversible: false,
      notes: 'Spontaneous reaction'
    }
  },
  {
    id: 'rxn_aromatic_25',
    name: 'Fumarylacetoacetate Hydrolysis',
    byreactant: ['H₂O'],
    displayByproduct: ['Acetoacetate', 'Fumarate'],
    enzyme: {
      name: 'Fumarylacetoacetate hydrolase',
      ecNumber: 'EC 3.7.1.2',
      cofactors: ['H₂O'],
      description: 'Hydrolyzes fumarylacetoacetate to produce acetoacetate and fumarate, both of which enter the TCA cycle'
    },
    conditions: {
      location: 'Liver',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key step in tyrosine catabolism',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_26',
    name: 'Acetoacetate to TCA Cycle',
    enzyme: {
      name: 'Multiple enzymes',
      ecNumber: 'Multiple steps',
      cofactors: ['Multiple cofactors'],
      description: 'Acetoacetate enters the TCA cycle through multiple enzymatic steps'
    },
    conditions: {
      location: 'Mitochondria',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Entry into central metabolism',
      isReversible: false,
      notes: 'Multiple steps involved'
    }
  },
  {
    id: 'rxn_aromatic_27',
    name: 'Fumarate to TCA Cycle',
    enzyme: {
      name: 'TCA cycle enzymes',
      ecNumber: 'Multiple steps',
      cofactors: ['Multiple cofactors'],
      description: 'Fumarate directly enters the TCA cycle as an intermediate'
    },
    conditions: {
      location: 'Mitochondria',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Direct entry into TCA cycle',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_28',
    name: 'Tryptophan Hydroxylation',
    byreactant: ['Tetrahydrobiopterin (BH₄)'],
    byproduct: ['Dihydrobiopterin (BH₂)'],
    displayByreactant: ['O₂'],
    displayByproduct: ['H₂O'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: 'Tryptophan hydroxylase',
      ecNumber: 'EC 1.14.16.4',
      cofactors: ['Tetrahydrobiopterin (BH₄)', 'O₂'],
      description: 'Hydroxylates tryptophan to form 5-hydroxytryptophan, requiring O₂ and tetrahydrobiopterin'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Rate-limiting step in serotonin synthesis',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_29',
    name: 'BH₂ to BH₄ Regeneration (Serotonin)',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'Dihydrobiopterin reductase',
      ecNumber: 'EC 1.5.1.33',
      cofactors: ['NADPH'],
      description: 'Regenerates tetrahydrobiopterin (BH₄) from dihydrobiopterin (BH₂) using NADPH for serotonin synthesis'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Required for continuous tryptophan hydroxylation',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_30',
    name: '5-Hydroxytryptophan Decarboxylation',
    byproduct: ['CO₂'],
    enzyme: {
      name: 'Aromatic amino acid decarboxylase (DOPA decarboxylase)',
      ecNumber: 'EC 4.1.1.28',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)'],
      description: 'Decarboxylates 5-hydroxytryptophan to form serotonin, releasing CO₂'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Requires vitamin B₆ as cofactor',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_31',
    name: 'Serotonin to 5-Hydroxyindoleacetic Acid',
    enzyme: {
      name: 'Monoamine oxidase (MAO)',
      ecNumber: 'EC 1.4.3.4',
      cofactors: ['FAD'],
      description: 'Oxidizes serotonin to 5-hydroxyindoleacetic acid via deamination and oxidation'
    },
    conditions: {
      location: 'Mitochondria',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key enzyme in serotonin degradation',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_32',
    name: 'Serotonin N-Acetylation',
    byreactant: ['Acetyl-CoA'],
    byproduct: ['CoA'],
    enzyme: {
      name: 'Serotonin N-acetyltransferase',
      ecNumber: 'EC 2.3.1.87',
      cofactors: ['Acetyl-CoA'],
      description: 'Acetylates serotonin to form N-acetyl-5-HT, consuming acetyl-CoA and producing CoA'
    },
    conditions: {
      location: 'Pineal gland',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key step in melatonin synthesis',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_33',
    name: 'N-Acetyl-5-HT to Melatonin',
    byreactant: ['SAM (S-adenosylmethionine)'],
    byproduct: ['SAH (S-adenosylhomocysteine)'],
    enzyme: {
      name: 'Hydroxyindole O-methyltransferase',
      ecNumber: 'EC 2.1.1.4',
      cofactors: ['SAM'],
      description: 'Methylates N-acetyl-5-HT to form melatonin, consuming SAM and producing SAH'
    },
    conditions: {
      location: 'Pineal gland',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Final step in melatonin synthesis',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_34',
    name: 'Tryptophan to Niacin',
    enzyme: {
      name: 'Multiple enzymes',
      ecNumber: 'Multiple steps',
      cofactors: ['Multiple cofactors'],
      description: 'Conversion of tryptophan to niacin through multiple enzymatic steps'
    },
    conditions: {
      location: 'Liver',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Multi-step pathway',
      isReversible: false,
      notes: 'Multiple steps involved'
    }
  },
  {
    id: 'rxn_aromatic_35',
    name: 'GTP to Dihydroneopterin Triphosphate',
    byreactant: ['H₂O'],
    byproduct: ['Formate'],
    enzyme: {
      name: 'GTP cyclohydrolase I',
      ecNumber: 'EC 3.5.4.16',
      cofactors: ['H₂O'],
      description: 'Converts GTP to dihydroneopterin triphosphate, consuming H₂O and producing formate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Rate-limiting step in tetrahydrobiopterin synthesis',
      isReversible: false
    }
  },
  {
    id: 'rxn_aromatic_36',
    name: 'Dihydroneopterin Triphosphate to Tetrahydrobiopterin',
    enzyme: {
      name: 'Multiple enzymes',
      ecNumber: 'Multiple steps',
      cofactors: ['Multiple cofactors'],
      description: 'Conversion of dihydroneopterin triphosphate to tetrahydrobiopterin (BH₄) through multiple enzymatic steps'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Multi-step pathway',
      isReversible: false,
      notes: 'Multiple steps involved'
    }
  }
];

