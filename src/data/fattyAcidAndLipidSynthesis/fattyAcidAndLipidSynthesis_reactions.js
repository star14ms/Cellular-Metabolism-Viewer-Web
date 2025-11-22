/**
 * Fatty Acid and Lipid Synthesis Pathway - Reactions Data
 */

export const fattyAcidAndLipidSynthesisReactions = [
  // Step 1: Citrate -> acetyl-CoA
  {
    id: 'rxn_fas_1',
    name: 'Citrate to Acetyl-CoA',
    byreactant: ['ATP', 'CoA'],
    byproduct: ['ADP', 'Pi'],
    displayByproduct: ['oxaloacetate_glycolysis'],
    enzyme: {
      name: 'Citrate lyase',
      ecNumber: 'EC 4.1.3.6',
      cofactors: ['ATP', 'CoA'],
      description: 'Cleaves citrate to form acetyl-CoA and oxaloacetate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key step in transporting acetyl units from mitochondria to cytoplasm',
      isReversible: false
    }
  },

  // Step 2: acetyl-CoA -> malonyl-CoA
  {
    id: 'rxn_fas_2',
    name: 'Acetyl-CoA to Malonyl-CoA',
    byreactant: ['ATP', 'HCO₃⁻'],
    byproduct: ['ADP', 'Pi'],
    enzyme: {
      name: 'Acetyl-CoA carboxylase',
      ecNumber: 'EC 6.4.1.2',
      cofactors: ['ATP', 'Biotin', 'HCO₃⁻'],
      description: 'Carboxylates acetyl-CoA to form malonyl-CoA, the committed step in fatty acid synthesis'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Highly regulated by citrate (activator) and palmitoyl-CoA (inhibitor)',
      isReversible: false
    }
  },

  // Step 3: malonyl-CoA -> acetyl-CoA (reverse reaction)
  {
    id: 'rxn_fas_3',
    name: 'Malonyl-CoA to Acetyl-CoA',
    byproduct: ['CO₂'],
    enzyme: {
      name: 'Malonyl-CoA decarboxylase',
      ecNumber: 'EC 4.1.1.9',
      cofactors: [],
      description: 'Decarboxylates malonyl-CoA back to acetyl-CoA'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reverse of carboxylation step',
      isReversible: false
    }
  },

  // Step 4: malonyl-CoA -> malonyl-ACP
  {
    id: 'rxn_fas_4',
    name: 'Malonyl-CoA to Malonyl-ACP',
    byreactant: ['ACP'],
    byproduct: ['CoA'],
    enzyme: {
      name: 'Malonyl-CoA:ACP transacylase',
      ecNumber: 'EC 2.3.1.39',
      cofactors: ['ACP'],
      description: 'Transfers malonyl group from CoA to ACP for fatty acid synthase'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Prepares malonyl group for elongation cycle',
      isReversible: true
    }
  },

  // Step 5: acetyl-CoA -> acetyl-ACP
  {
    id: 'rxn_fas_5',
    name: 'Acetyl-CoA to Acetyl-ACP',
    byreactant: ['ACP'],
    byproduct: ['CoA'],
    enzyme: {
      name: 'Acetyl-CoA:ACP transacylase',
      ecNumber: 'EC 2.3.1.38',
      cofactors: ['ACP'],
      description: 'Transfers acetyl group from CoA to ACP for fatty acid synthase initiation'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Initiates fatty acid synthesis cycle',
      isReversible: true
    }
  },

  // Step 6: acetyl-ACP -> β-ketoacyl-ACP
  {
    id: 'rxn_fas_6',
    name: 'Acetyl-ACP to β-Ketoacyl-ACP',
    byreactant: ['malonyl_acp'],
    byproduct: ['ACP', 'CO₂'],
    hideByreactantLabels: true,
    enzyme: {
      name: 'β-Ketoacyl-ACP synthase',
      ecNumber: 'EC 2.3.1.41',
      cofactors: ['ACP'],
      description: 'Condenses acetyl-ACP with malonyl-ACP to form β-ketoacyl-ACP (first cycle only)'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Condensation step in fatty acid synthase cycle - first cycle',
      isReversible: false
    }
  },

  // Step 7: fatty acyl-ACP -> β-ketoacyl-ACP
  {
    id: 'rxn_fas_7',
    name: 'Fatty acyl-ACP to β-Ketoacyl-ACP',
    byreactant: ['malonyl_acp'],
    byproduct: ['ACP', 'CO₂'],
    hideByreactantLabels: true,
    enzyme: {
      name: 'β-Ketoacyl-ACP synthase',
      ecNumber: 'EC 2.3.1.41',
      cofactors: ['ACP'],
      description: 'Condenses fatty acyl-ACP with malonyl-ACP to form β-ketoacyl-ACP (subsequent cycles)'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Condensation step in fatty acid synthase cycle - subsequent cycles',
      isReversible: false
    }
  },

  // Step 8: β-ketoacyl-ACP -> β-hydroxyacyl-ACP
  {
    id: 'rxn_fas_8',
    name: 'β-Ketoacyl-ACP to β-Hydroxyacyl-ACP',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'β-Ketoacyl-ACP reductase',
      ecNumber: 'EC 1.1.1.100',
      cofactors: ['NADPH'],
      description: 'Reduces β-ketoacyl-ACP to β-hydroxyacyl-ACP using NADPH'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First reduction step in fatty acid synthase cycle',
      isReversible: true
    }
  },

  // Step 9: β-hydroxyacyl-ACP -> trans-enoyl-ACP
  {
    id: 'rxn_fas_9',
    name: 'β-Hydroxyacyl-ACP to trans-Enoyl-ACP',
    byproduct: ['H₂O'],
    enzyme: {
      name: 'β-Hydroxyacyl-ACP dehydratase',
      ecNumber: 'EC 4.2.1.59',
      cofactors: [],
      description: 'Dehydrates β-hydroxyacyl-ACP to form trans-enoyl-ACP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Dehydration step in fatty acid synthase cycle',
      isReversible: true
    }
  },

  // Step 10: trans-enoyl-ACP -> (n+2) fatty acyl-ACP
  {
    id: 'rxn_fas_10',
    name: 'trans-Enoyl-ACP to Fatty acyl-ACP',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'Enoyl-ACP reductase',
      ecNumber: 'EC 1.3.1.9',
      cofactors: ['NADPH'],
      description: 'Reduces trans-enoyl-ACP to form elongated fatty acyl-ACP using NADPH'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Second reduction step in fatty acid synthase cycle',
      isReversible: true
    }
  },

  // Step 11: (n+2) fatty acyl-ACP -> fatty acyl-ACP (cycle back)
  {
    id: 'rxn_fas_11',
    name: 'Fatty acyl-ACP Cycle',
    enzyme: {
      name: 'Fatty acid synthase cycle',
      ecNumber: 'N/A',
      cofactors: [],
      description: 'Cycles elongated fatty acyl-ACP back for another round of elongation (7 cycles total to produce palmitate)'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Repeats 7 times to produce palmitate (C16)',
      isReversible: false
    }
  },

  // Step 12: (n+2) fatty acyl-ACP -> palmitate (C16)
  {
    id: 'rxn_fas_12',
    name: 'Fatty acyl-ACP to Palmitate',
    byproduct: ['ACP'],
    enzyme: {
      name: 'Thioesterase',
      ecNumber: 'EC 3.1.2.14',
      cofactors: [],
      description: 'Releases palmitate (C16) from ACP after 7 cycles of elongation'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Final step releasing free palmitate',
      isReversible: false
    }
  },

  // Step 13: palmitate (C16) -> palmitoyl-CoA
  {
    id: 'rxn_fas_13',
    name: 'Palmitate to Palmitoyl-CoA',
    byreactant: ['ATP', 'CoA'],
    byproduct: ['AMP', 'PPi'],
    enzyme: {
      name: 'Long-chain fatty acyl-CoA synthetase',
      ecNumber: 'EC 6.2.1.3',
      cofactors: ['ATP', 'CoA'],
      description: 'Activates palmitate by forming palmitoyl-CoA'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Activates fatty acid for further metabolism',
      isReversible: false
    }
  },

  // Step 14: palmitoyl-CoA -> sphingosine
  {
    id: 'rxn_fas_14',
    name: 'Palmitoyl-CoA to Sphingosine',
    byreactant: ['serine_fas'],
    byproduct: ['CoA', 'CO₂'],
    hideByreactantLabels: true,
    enzyme: {
      name: 'Serine palmitoyltransferase and multiple enzymes',
      ecNumber: 'EC 2.3.1.50',
      cofactors: ['Serine', 'Pyridoxal phosphate'],
      description: 'Multiple step conversion of palmitoyl-CoA and serine to sphingosine'
    },
    conditions: {
      location: 'Endoplasmic reticulum',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First committed step in sphingolipid synthesis',
      isReversible: false
    }
  },

  // Step 15: sphingosine -> sphingolipids
  {
    id: 'rxn_fas_15',
    name: 'Sphingosine to Sphingolipids',
    enzyme: {
      name: 'Multiple enzymes',
      ecNumber: 'N/A',
      cofactors: [],
      description: 'Multiple step conversion of sphingosine to various sphingolipids'
    },
    conditions: {
      location: 'Endoplasmic reticulum and Golgi',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Complex pathway producing ceramides, sphingomyelins, and glycosphingolipids',
      isReversible: false
    }
  },

  // Step 16: glycerol-3-phosphate -> phosphatidic acid
  {
    id: 'rxn_fas_16',
    name: 'Glycerol-3-phosphate to Phosphatidic acid',
    byreactant: ['palmitoyl_coa'],
    byproduct: ['2 CoA'],
    hideByreactantLabels: true,
    enzyme: {
      name: 'Glycerol-3-phosphate acyltransferase (GPAT)',
      ecNumber: 'EC 2.3.1.15',
      cofactors: ['Fatty acyl-CoA'],
      description: 'Acylates glycerol-3-phosphate with two fatty acids to form phosphatidic acid'
    },
    conditions: {
      location: 'Endoplasmic reticulum',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First step in triacylglycerol and phospholipid synthesis',
      isReversible: false
    }
  },

  // Step 17: phosphatidic acid -> phospholipids
  {
    id: 'rxn_fas_17',
    name: 'Phosphatidic acid to Phospholipids',
    byproduct: ['H₂O', 'Pi'],
    enzyme: {
      name: 'CDP-diacylglycerol synthase and phospholipid synthases',
      ecNumber: 'EC 2.7.7.41',
      cofactors: ['CTP'],
      description: 'Converts phosphatidic acid to various phospholipids via CDP-diacylglycerol intermediate'
    },
    conditions: {
      location: 'Endoplasmic reticulum',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Branch point for phospholipid synthesis',
      isReversible: false
    }
  },

  // Step 18: phosphatidic acid -> 1,2-diacylglycerol
  {
    id: 'rxn_fas_18',
    name: 'Phosphatidic acid to 1,2-Diacylglycerol',
    byreactant: ['H₂O'],
    byproduct: ['Pi'],
    enzyme: {
      name: 'Phosphatidate phosphatase',
      ecNumber: 'EC 3.1.3.4',
      cofactors: [],
      description: 'Dephosphorylates phosphatidic acid to form 1,2-diacylglycerol'
    },
    conditions: {
      location: 'Endoplasmic reticulum',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Branch point for triacylglycerol synthesis',
      isReversible: false
    }
  },

  // Step 19: 1,2-diacylglycerol -> triacylglycerol
  {
    id: 'rxn_fas_19',
    name: '1,2-Diacylglycerol to Triacylglycerol',
    byreactant: ['Fatty acyl-CoA'],
    byproduct: ['CoA'],
    enzyme: {
      name: 'Diacylglycerol O-acyltransferase (DGAT)',
      ecNumber: 'EC 2.3.1.20',
      cofactors: ['Fatty acyl-CoA'],
      description: 'Adds third fatty acid to 1,2-diacylglycerol to form triacylglycerol'
    },
    conditions: {
      location: 'Endoplasmic reticulum',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Final step in triacylglycerol synthesis',
      isReversible: false
    }
  },

  // Fatty Acid Oxidation Entry & Transport Reactions

  // Step 20: Triacylglycerol transport to Lipoproteins
  {
    id: 'rxn_fas_transport_1',
    name: 'Triacylglycerol Packaging into Lipoproteins',
    enzyme: {
      name: 'Microsomal triglyceride transfer protein (MTP)',
      ecNumber: 'N/A',
      description: 'Packages triacylglycerols into VLDL (liver) or chylomicrons (intestine) for secretion'
    },
    conditions: {
      location: 'Endoplasmic reticulum / Golgi',
      ph: '7.0-7.4',
      temperature: '37°C',
      isReversible: false
    }
  },

  // Step 21: Lipoprotein hydrolysis to Free Fatty Acids
  {
    id: 'rxn_fas_transport_2',
    name: 'Lipoprotein Lipase Hydrolysis',
    byproduct: ['Glycerol'],
    enzyme: {
      name: 'Lipoprotein Lipase (LPL)',
      ecNumber: 'EC 3.1.1.34',
      description: 'Hydrolyzes triacylglycerols in lipoproteins to free fatty acids and glycerol'
    },
    conditions: {
      location: 'Capillary endothelium',
      ph: '7.4',
      temperature: '37°C',
      isReversible: false
    }
  },

  // Step 22: Free Fatty Acid Uptake
  {
    id: 'rxn_fas_transport_3',
    name: 'Free Fatty Acid Uptake',
    enzyme: {
      name: 'Fatty Acid Transporters (CD36/FAT, FATP)',
      ecNumber: 'N/A',
      description: 'Transports free fatty acids across the plasma membrane'
    },
    conditions: {
      location: 'Plasma membrane',
      ph: '7.0-7.4',
      temperature: '37°C',
      isReversible: true
    }
  },

  // Step 23: Fatty Acid Sorting/Distribution
  {
    id: 'rxn_fas_transport_4',
    name: 'Intracellular Fatty Acid Distribution',
    enzyme: {
      name: 'Fatty Acid Binding Proteins (FABP)',
      ecNumber: 'N/A',
      description: 'Distributes fatty acids to different organelles based on chain length and needs'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      isReversible: true
    }
  },

  // Step 24: Fatty acids ≤ C12 to mitochondria
  {
    id: 'rxn_fas_transport_5',
    name: 'Fatty acids ≤ C12 to mitochondria',
    enzyme: {
      name: 'Fatty Acid Binding Proteins (FABP)',
      ecNumber: 'N/A',
      description: 'Distributes fatty acids to mitochondria'
    },
    conditions: {
      location: 'Mitochondrial membrane',
      ph: '7.0-7.4',
      temperature: '37°C',
      isReversible: true
    }
  },

  // Step 24: Carnitine Uptake/Synthesis
  {
    id: 'rxn_fas_transport_6',
    name: 'Carnitine Absorption',
    enzyme: {
      name: 'Carnitine Transporter (OCTN2)',
      ecNumber: 'N/A',
      description: 'Absorbs carnitine from diet or synthesis'
    },
    conditions: {
      location: 'Plasma membrane',
      ph: '7.0-7.4',
      temperature: '37°C',
      isReversible: false
    }
  },

  // Step 25: Carnitine Transport
  {
    id: 'rxn_fas_transport_7',
    name: 'Carnitine Transport',
    enzyme: {
      name: 'Carnitine Transporter',
      ecNumber: 'N/A',
      description: 'Transports carnitine to sites of fatty acid oxidation'
    },
    conditions: {
      location: 'Mitochondrial membrane',
      ph: '7.0-7.4',
      temperature: '37°C',
      isReversible: true
    }
  },

  // Step 27: Ethanol to Acetaldehyde
  {
    id: 'rxn_alcohol_dehydrogenase',
    name: 'Ethanol Oxidation',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: 'Alcohol Dehydrogenase (ADH)',
      ecNumber: 'EC 1.1.1.1',
      cofactors: ['Zinc'],
      description: 'Oxidizes ethanol to acetaldehyde, reducing NAD⁺ to NADH'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      isReversible: true
    }
  }
];
