/**
 * Cholesterol Synthesis Pathway - Reactions Data
 */

export const cholesterolSynthesisReactions = [
  // Step 1: Thiolase Reaction
  {
    id: 'rxn_cholesterol_1',
    name: 'Thiolase Reaction',
    byproduct: ['CoA'],
    enzyme: {
      name: 'Acetyl-CoA C-acetyltransferase (Thiolase)',
      ecNumber: 'EC 2.3.1.9',
      cofactors: [],
      description: 'Condenses two molecules of acetyl-CoA to form acetoacetyl-CoA, releasing one CoA.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction; first committed step toward isoprenoid synthesis',
      isReversible: true
    }
  },
  // Step 2: HMG-CoA Synthase
  {
    id: 'rxn_cholesterol_2',
    name: 'HMG-CoA Synthase',
    byreactant: ['Acetyl-CoA'],
    byproduct: ['CoA'],
    enzyme: {
      name: 'HMG-CoA Synthase',
      ecNumber: 'EC 2.3.3.10',
      cofactors: [],
      description: 'Condenses acetoacetyl-CoA with another acetyl-CoA to form β-hydroxy-β-methylglutaryl-CoA (HMG-CoA).'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction',
      isReversible: true
    }
  },
  // Step 3: HMG-CoA Reductase
  {
    id: 'rxn_cholesterol_3',
    name: 'HMG-CoA Reductase',
    byreactant: ['2 NADPH'],
    byproduct: ['2 NADP⁺', 'CoA'],
    enzyme: {
      name: 'HMG-CoA Reductase',
      ecNumber: 'EC 1.1.1.34',
      cofactors: ['NADPH'],
      description: 'Rate-limiting step of cholesterol synthesis. Reduces HMG-CoA to mevalonate using 2 NADPH.'
    },
    conditions: {
      location: 'Endoplasmic reticulum membrane',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Highly regulated by cholesterol levels, statins, and SREBP transcription factors',
      isReversible: false
    }
  },
  // Step 4: Mevalonate to IPP
  {
    id: 'rxn_cholesterol_4',
    name: 'Mevalonate to Isopentenyl Pyrophosphate',
    byreactant: ['3 ATP'],
    byproduct: ['3 ADP', 'CO₂'],
    enzyme: {
      name: 'Multiple enzymes (Mevalonate kinase, Phosphomevalonate kinase, Mevalonate-5-pyrophosphate decarboxylase)',
      ecNumber: 'EC 2.7.1.36, EC 2.7.4.2, EC 4.1.1.33',
      cofactors: ['ATP', 'Mg²⁺'],
      description: 'Multi-step conversion of mevalonate to isopentenyl pyrophosphate (IPP, C5) via phosphorylation and decarboxylation.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Requires 3 ATP per mevalonate; irreversible',
      isReversible: false
    }
  },
  // Step 5: IPP to FPP
  {
    id: 'rxn_cholesterol_5',
    name: 'Isopentenyl Pyrophosphate to Farnesyl Pyrophosphate',
    byproduct: ['2 PPᵢ'],
    enzyme: {
      name: 'Multiple enzymes (Isopentenyl pyrophosphate isomerase, Geranyl pyrophosphate synthase, Farnesyl pyrophosphate synthase)',
      ecNumber: 'EC 5.3.3.2, EC 2.5.1.1, EC 2.5.1.10',
      cofactors: ['Mg²⁺'],
      description: 'Multi-step conversion: IPP (C5) → DMAPP → GPP (C10) → FPP (C15). Three IPP molecules are used to form one FPP.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'FPP can branch to protein farnesylation or continue to squalene',
      isReversible: false
    }
  },
  // Step 6: FPP → Protein Modification (BRANCHING - occurs before step 7)
  {
    id: 'rxn_cholesterol_6',
    name: 'Protein Farnesylation',
    enzyme: {
      name: 'Protein farnesyltransferase',
      ecNumber: 'EC 2.5.1.58',
      cofactors: ['Zn²⁺'],
      description: 'Transfers farnesyl group from FPP to cysteine residues in proteins (e.g., Ras, Rho). Important for protein membrane localization.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Competes with squalene synthesis for FPP pool',
      isReversible: false
    }
  },
  // Step 7: Squalene Synthase
  {
    id: 'rxn_cholesterol_7',
    name: 'Squalene Synthase',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺', '2 PPᵢ'],
    enzyme: {
      name: 'Squalene Synthase',
      ecNumber: 'EC 2.5.1.21',
      cofactors: ['NADPH', 'Mg²⁺'],
      description: 'Condenses two molecules of farnesyl pyrophosphate (FPP, C15) to form squalene (C30), using NADPH for reduction.'
    },
    conditions: {
      location: 'Endoplasmic reticulum membrane',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key branch point; regulated by cholesterol levels and SREBP',
      isReversible: false
    }
  },
  // Step 8: Squalene to Lanosterol
  {
    id: 'rxn_cholesterol_8',
    name: 'Squalene to Lanosterol',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'Squalene Monooxygenase and Oxidosqualene Cyclase',
      ecNumber: 'EC 1.14.14.17, EC 5.4.99.7',
      cofactors: ['NADPH', 'FAD', 'O₂'],
      description: 'Multi-step conversion: squalene → squalene epoxide → lanosterol. Involves epoxidation and cyclization to form the first sterol.'
    },
    conditions: {
      location: 'Endoplasmic reticulum membrane',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Requires molecular oxygen and NADPH',
      isReversible: false
    }
  },
  // Step 9: Lanosterol to 7-dehydrocholesterol
  {
    id: 'rxn_cholesterol_9',
    name: 'Lanosterol to 7-Dehydrocholesterol',
    byreactant: ['10 O₂', '4 NAD⁺', '8 NADPH'],
    byproduct: ['4 NADH', '8 NADP⁺', '2 CO₂', 'Formate'],
    enzyme: {
      name: 'Multiple enzymes (Lanosterol 14α-demethylase, Sterol C14-reductase, Sterol C4-demethylase complex, etc.)',
      ecNumber: 'EC 1.14.13.70, EC 1.3.1.70, Multiple',
      cofactors: ['NADPH', 'NAD⁺', 'O₂', 'Cytochrome P450'],
      description: 'Complex multi-step conversion removing three methyl groups and modifying the sterol structure. Requires extensive oxidation and reduction steps.'
    },
    conditions: {
      location: 'Endoplasmic reticulum membrane',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Rate-limiting steps involve cytochrome P450 enzymes; highly regulated',
      isReversible: false
    }
  },
  // Step 10: 7-Dehydrocholesterol Reductase
  {
    id: 'rxn_cholesterol_10',
    name: '7-Dehydrocholesterol Reductase',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: '7-Dehydrocholesterol Reductase (DHCR7)',
      ecNumber: 'EC 1.3.1.21',
      cofactors: ['NADPH'],
      description: 'Final step in cholesterol synthesis. Reduces the double bond at position 7-8 to form cholesterol.'
    },
    conditions: {
      location: 'Endoplasmic reticulum membrane',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Deficiency causes Smith-Lemli-Opitz syndrome',
      isReversible: false
    }
  },
  // Branching reactions
  // Step 11: 7-Dehydrocholesterol → Vitamin D
  {
    id: 'rxn_cholesterol_11',
    name: '7-Dehydrocholesterol to Vitamin D',
    enzyme: {
      name: '7-Dehydrocholesterol → Cholecalciferol (via UV light)',
      ecNumber: 'EC 5.7.1.1 (photochemical)',
      cofactors: ['UV light'],
      description: '7-Dehydrocholesterol in skin is converted to cholecalciferol (vitamin D₃) upon exposure to UV-B radiation.'
    },
    conditions: {
      location: 'Skin (epidermis)',
      ph: '7.0-7.4',
      temperature: 'Body temperature',
      regulation: 'Requires UV-B exposure; limited by sun exposure and skin pigmentation',
      isReversible: false
    }
  },
  // Step 12: Cholesterol → Bile Salts
  {
    id: 'rxn_cholesterol_12',
    name: 'Cholesterol to Bile Salts',
    enzyme: {
      name: 'Cholesterol 7α-hydroxylase and bile acid synthesis enzymes',
      ecNumber: 'EC 1.14.14.23, Multiple',
      cofactors: ['NADPH', 'O₂', 'Cytochrome P450'],
      description: 'Cholesterol is converted to bile acids (cholic acid, chenodeoxycholic acid) in the liver for fat digestion.'
    },
    conditions: {
      location: 'Liver (hepatocytes)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Rate-limiting step is cholesterol 7α-hydroxylase; regulated by bile acid feedback',
      isReversible: false
    }
  },
  // Step 13: Cholesterol → Cell Membranes
  {
    id: 'rxn_cholesterol_13',
    name: 'Cholesterol Incorporation into Cell Membranes',
    enzyme: {
      name: 'Membrane assembly processes',
      ecNumber: 'N/A',
      cofactors: [],
      description: 'Cholesterol is incorporated into cell membranes to maintain membrane fluidity, permeability, and structural integrity.'
    },
    conditions: {
      location: 'All cells (plasma membrane, organelle membranes)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Regulated by cholesterol transport proteins (NPC1, NPC2) and membrane composition',
      isReversible: false
    }
  },
  // Step 14: Cholesterol → Lipoproteins
  {
    id: 'rxn_cholesterol_14',
    name: 'Cholesterol Packaging into Lipoproteins',
    enzyme: {
      name: 'Lipoprotein assembly machinery',
      ecNumber: 'N/A',
      cofactors: [],
      description: 'Cholesterol is packaged into lipoproteins (LDL, HDL, VLDL) for transport in the bloodstream.'
    },
    conditions: {
      location: 'Liver and intestine',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Regulated by apolipoprotein synthesis and lipid availability',
      isReversible: false
    }
  }
];

