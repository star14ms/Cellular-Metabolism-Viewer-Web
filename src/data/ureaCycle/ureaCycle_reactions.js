/**
 * Urea Cycle Pathway - Reactions Data
 */

export const ureaCycleReactions = [
  // Central Urea Cycle Reactions

  // Reaction 1: Carbamoyl Phosphate Synthesis (Mitochondrial)
  {
    id: 'rxn_urea_1',
    name: 'Carbamoyl Phosphate Synthesis',
    byreactant: ['2 ATP', 'NH₄⁺'],
    byproduct: ['2 ADP', 'Pi'],
    enzyme: {
      name: 'Carbamoyl phosphate synthetase I (CPS1)',
      ecNumber: 'EC 6.3.4.16',
      cofactors: ['N-Acetylglutamate', 'Mg²⁺'],
      description: 'Catalyzes the formation of carbamoyl phosphate from ammonia, bicarbonate, and 2 ATP molecules. This is the first committed step of the urea cycle and occurs in the mitochondrial matrix.'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Allosterically activated by N-acetylglutamate, rate-limiting step of urea cycle',
      isReversible: false
    }
  },

  // Reaction 2: Ornithine → Citrulline (Mitochondrial)
  {
    id: 'rxn_urea_2',
    name: 'Ornithine Transcarbamoylation',
    byreactant: ['carbamoyl_phosphate_urea'],
    byproduct: ['Pi'],
    hideByreactantLabels: true,
    enzyme: {
      name: 'Ornithine transcarbamoylase (OTC)',
      ecNumber: 'EC 2.1.3.3',
      cofactors: [],
      description: 'Catalyzes the transfer of the carbamoyl group from carbamoyl phosphate to ornithine, forming citrulline. Occurs in the mitochondrial matrix.'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Citrulline is transported to cytosol via ornithine/citrulline transporter',
      isReversible: false
    }
  },

  // Reaction 3: Citrulline → Argininosuccinate (Cytosolic)
  {
    id: 'rxn_urea_3',
    name: 'Argininosuccinate Synthesis',
    byreactant: ['aspartate_urea', 'ATP'],
    byproduct: ['AMP', 'PPi'],
    hideByreactantLabels: true,
    enzyme: {
      name: 'Argininosuccinate synthetase',
      ecNumber: 'EC 6.3.4.5',
      cofactors: ['ATP', 'Mg²⁺'],
      description: 'Catalyzes the condensation of citrulline with aspartate to form argininosuccinate, consuming ATP and producing AMP and pyrophosphate. Occurs in the cytosol.'
    },
    conditions: {
      location: 'Cytosol',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Aspartate is generated from oxaloacetate via transamination',
      isReversible: false
    }
  },

  // Left Branch Reactions

  // Reaction 4: Oxaloacetate → Aspartate
  {
    id: 'rxn_urea_6',
    name: 'Oxaloacetate Transamination',
    byreactant: ['Glutamate'],
    byproduct: ['α-Ketoglutarate'],
    enzyme: {
      name: 'Transaminase (Aspartate aminotransferase)',
      ecNumber: 'EC 2.6.1.1',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)'],
      description: 'Catalyzes the transamination of oxaloacetate to aspartate, using glutamate as the amino group donor and producing α-ketoglutarate. Requires vitamin B6 as cofactor.'
    },
    conditions: {
      location: 'Cytosol',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction, provides aspartate for argininosuccinate synthesis',
      isReversible: true
    }
  },

  // Bidirectional Reactions: Aspartate ↔ Asparagine

  // Reaction 5: Aspartate → Asparagine
  {
    id: 'rxn_urea_7',
    name: 'Asparagine Synthesis',
    byreactant: ['Glutamine', 'ATP'],
    byproduct: ['Glutamate', 'AMP', 'PPi'],
    enzyme: {
      name: 'Asparagine synthetase',
      ecNumber: 'EC 6.3.5.4',
      cofactors: ['ATP', 'Mg²⁺'],
      description: 'Catalyzes the amidation of aspartate to asparagine using glutamine as the amino group donor and ATP, producing glutamate, AMP, and pyrophosphate.'
    },
    conditions: {
      location: 'Cytosol',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Important for asparagine biosynthesis',
      isReversible: false
    }
  },

  // Reaction 6: Asparagine → Aspartate
  {
    id: 'rxn_urea_8',
    name: 'Asparagine Hydrolysis',
    byreactant: ['H₂O'],
    byproduct: ['NH₄⁺'],
    enzyme: {
      name: 'Asparaginase',
      ecNumber: 'EC 3.5.1.1',
      cofactors: [],
      description: 'Catalyzes the hydrolysis of asparagine to aspartate and ammonium ion, releasing water.'
    },
    conditions: {
      location: 'Cytosol',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Important for asparagine catabolism',
      isReversible: false
    }
  },

  // Back to Central Urea Cycle Arrows

  // Reaction 7: Argininosuccinate → Arginine + Fumarate (Cytosolic)
  {
    id: 'rxn_urea_4',
    name: 'Argininosuccinate Cleavage',
    byproduct: ['fumarate_urea'],
    hideByproductLabels: true,
    enzyme: {
      name: 'Argininosuccinate lyase',
      ecNumber: 'EC 4.3.2.1',
      cofactors: [],
      description: 'Catalyzes the cleavage of argininosuccinate to arginine and fumarate. Fumarate can enter the TCA cycle.'
    },
    conditions: {
      location: 'Cytosol',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Fumarate connects urea cycle to TCA cycle',
      isReversible: false
    }
  },

  // Reaction 8: Arginine → Citrulline (NO Synthesis)
  {
    id: 'rxn_urea_9',
    name: 'Nitric Oxide Synthesis',
    byreactant: ['O₂', 'NADPH'],
    byproduct: ['NO', 'H₂O', 'NADP⁺'],
    enzyme: {
      name: 'Nitric oxide synthase (NOS)',
      ecNumber: 'EC 1.14.13.39',
      cofactors: ['NADPH', 'FAD', 'FMN', 'Heme', 'Tetrahydrobiopterin'],
      description: 'Catalyzes the oxidation of arginine to citrulline and nitric oxide, consuming O₂ and NADPH, and producing H₂O and NADP⁺. This is a branch from the urea cycle for NO signaling.'
    },
    conditions: {
      location: 'Cytosol, Various tissues',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Important for vasodilation and cell signaling, not part of urea cycle proper',
      isReversible: false
    }
  },

  // Reaction 9: Arginine → Ornithine + Urea (Cytosolic)
  {
    id: 'rxn_urea_5',
    name: 'Arginine Hydrolysis',
    byreactant: ['H₂O'],
    byproduct: ['Urea'],
    hideByproductLabels: true,
    enzyme: {
      name: 'Arginase',
      ecNumber: 'EC 3.5.3.1',
      cofactors: ['Mn²⁺'],
      description: 'Catalyzes the hydrolysis of arginine to ornithine and urea. This completes the urea cycle and regenerates ornithine.'
    },
    conditions: {
      location: 'Cytosol',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Ornithine is transported back to mitochondria to continue the cycle',
      isReversible: false
    }
  },

  // Right Branch Reactions

  // Left Bottom Branch Reactions

  // Reaction 10: Ornithine → Glutamic Semialdehyde
  {
    id: 'rxn_urea_10',
    name: 'Ornithine Transamination',
    byreactant: ['Oxaloacetate'],
    byproduct: ['Aspartate'],
    enzyme: {
      name: 'Ornithine aminotransferase',
      ecNumber: 'EC 2.6.1.13',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)'],
      description: 'Catalyzes the transamination of ornithine to glutamic semialdehyde, using oxaloacetate as the amino group acceptor to form aspartate. Requires vitamin B6 as cofactor. Occurs in mitochondria.'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction, branch from urea cycle',
      isReversible: true
    }
  },

  // Left Sub-branch: Glutamic Semialdehyde → Glutamate

  // Reaction 11: Glutamic Semialdehyde → Glutamate
  {
    id: 'rxn_urea_11',
    name: 'Glutamic Semialdehyde Oxidation',
    byreactant: ['ATP', 'NADPH'],
    byproduct: ['ADP', 'Pi', 'NADP⁺'],
    enzyme: {
      name: 'Pyrroline-5-carboxylate synthetase / Glutamate-5-semialdehyde dehydrogenase',
      ecNumber: 'EC 1.2.1.41',
      cofactors: ['ATP', 'NADPH'],
      description: 'Catalyzes the oxidation of glutamic semialdehyde to glutamate via pyrroline-5-carboxylate intermediate, consuming ATP and NADPH, and producing ADP, Pi, and NADP⁺. Occurs in mitochondria.'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Connects ornithine metabolism to glutamate production',
      isReversible: false
    }
  },

  // Bottom Right Sub-branch: Glutamic Semialdehyde → Pyrroline-5-carboxylate → Proline

  // Reaction 12: Glutamic Semialdehyde → Pyrroline-5-carboxylate (spontaneous)
  {
    id: 'rxn_urea_12',
    name: 'Pyrroline-5-carboxylate Formation',
    byproduct: ['H₂O'],
    enzyme: {
      name: 'Spontaneous cyclization',
      ecNumber: 'N/A',
      cofactors: [],
      description: 'Spontaneous cyclization of glutamic semialdehyde to form pyrroline-5-carboxylate, releasing water.'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Spontaneous reaction, pyrroline-5-carboxylate is transported to cytosol',
      isReversible: false,
      notes: 'Spontaneous cyclization'
    }
  },

  // Reaction 13: Pyrroline-5-carboxylate → Proline
  {
    id: 'rxn_urea_13',
    name: 'Proline Synthesis',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'Pyrroline-5-carboxylate reductase',
      ecNumber: 'EC 1.5.1.2',
      cofactors: ['NADPH'],
      description: 'Catalyzes the reduction of pyrroline-5-carboxylate to proline, consuming NADPH and producing NADP⁺. This reaction is reversible. Occurs in cytosol.'
    },
    conditions: {
      location: 'Cytosol',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction, proline can be converted back to pyrroline-5-carboxylate',
      isReversible: true
    }
  },
];

