/**
 * Glycogen and Galactose Metabolism - Reactions Data
 */

export const glycogenAndGalactoseMetabolismReactions = [
  // Step 1
  {
    id: 'rxn_glycogen_galactose_1',
    name: 'Phosphoglucomutase Reaction',
    enzyme: {
      name: 'Phosphoglucomutase',
      ecNumber: 'EC 5.4.2.2',
      cofactors: ['Mg²⁺'],
      description: 'Interconverts glucose-6-phosphate and glucose-1-phosphate to channel glucose toward glycogen metabolism.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Activated by glucose-1,6-bisphosphate; reversible reaction',
      isReversible: true
    }
  },
  // Step 2
  {
    id: 'rxn_glycogen_galactose_2',
    name: 'UDP-glucose Pyrophosphorylase',
    byreactant: ['UTP'],
    byproduct: ['PPᵢ'],
    enzyme: {
      name: 'UTP:glucose-1-phosphate uridylyltransferase (UDP-glucose pyrophosphorylase)',
      ecNumber: 'EC 2.7.7.9',
      cofactors: ['Mg²⁺'],
      description: 'Activates glucose-1-phosphate using UTP to form UDP-glucose, releasing pyrophosphate.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Pulled forward by rapid hydrolysis of PPᵢ by inorganic pyrophosphatase',
      isReversible: false
    }
  },
  // Step 3
  {
    id: 'rxn_glycogen_galactose_3',
    name: 'Glycogenin Priming',
    byproduct: ['UDP'],
    enzyme: {
      name: 'Glycogenin Glucosyltransferase',
      ecNumber: 'EC 2.4.1.186',
      cofactors: ['Mn²⁺'],
      description: 'Autoglucosylation of glycogenin using UDP-glucose to build a short glucose primer.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Initiates glycogen synthesis when glycogen stores are depleted',
      isReversible: false
    }
  },
  // Step 4
  {
    id: 'rxn_glycogen_galactose_4',
    name: 'Primer Extension to Glycogen (n)',
    enzyme: {
      name: 'Glycogenin Primer Extension',
      ecNumber: 'EC 2.4.1.186',
      cofactors: [],
      description: 'Elongates the glycogenin-linked oligosaccharide (~8 glucose units) to yield the first glycogen chain.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Stops once a nascent glycogen chain is long enough for glycogen synthase to act',
      isReversible: false
    }
  },
  // Step 5
  {
    id: 'rxn_glycogen_galactose_5',
    name: 'Glycogen Synthase Elongation',
    byreactant: ['UDP-glucose'],
    byproduct: ['UDP'],
    enzyme: {
      name: 'Glycogen Synthase',
      ecNumber: 'EC 2.4.1.11',
      cofactors: ['Mg²⁺'],
      description: 'Extends glycogen (n) by transferring glucose from UDP-glucose to form glycogen (n+1).'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Activated by dephosphorylation and glucose-6-phosphate; inhibited by phosphorylation',
      isReversible: false
    }
  },
  // Step 6
  {
    id: 'rxn_glycogen_galactose_6',
    name: 'Glycogen Debranching/Phosphorylase Transition',
    enzyme: {
      name: 'Debranching & Remodeling Enzymes',
      ecNumber: 'EC 3.2.1.33 / EC 2.4.1.25',
      cofactors: ['PLP'],
      description: 'Transfers short branches and prepares glycogen for further elongation or degradation.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Activated during glycogenolysis; coordinates with glycogen phosphorylase',
      isReversible: true
    }
  },
  // Step 7
  {
    id: 'rxn_glycogen_galactose_7',
    name: 'Glycogen Phosphorylase Reaction',
    byreactant: ['Pi'],
    byproduct: ['glycogen_n_2'],
    hideByproductLabels: true,
    enzyme: {
      name: 'Glycogen Phosphorylase',
      ecNumber: 'EC 2.4.1.1',
      cofactors: ['PLP'],
      description: 'Releases glucose-1-phosphate from glycogen (n+1) during glycogenolysis.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Activated by phosphorylation and AMP; inhibited by ATP and glucose-6-phosphate',
      isReversible: false
    }
  },
  // Step 8
  {
    id: 'rxn_glycogen_galactose_8',
    name: 'Alternate Glycogen Synthase Reaction',
    enzyme: {
      name: 'Glycogen Synthase (Secondary Chain, Many Cycles)',
      ecNumber: 'EC 2.4.1.11',
      cofactors: ['Mg²⁺'],
      description: 'Extends a separate glycogen chain (n) to (n+1) through many cycles, often representing a different primer or branch.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Same regulatory controls as the primary glycogen synthase reaction',
      isReversible: false
    }
  },
  // Step 9
  {
    id: 'rxn_glycogen_galactose_9',
    name: 'Glycogen to Free Glucose',
    enzyme: {
      name: 'Debranching Enzyme (α-1,6-glucosidase activity)',
      ecNumber: 'EC 3.2.1.33',
      cofactors: [],
      description: 'Releases free glucose at branch points during glycogenolysis.'
    },
    conditions: {
      location: 'Cytoplasm (and hepatic lysosomes/glucose-6-phosphatase system)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Important in liver for maintaining blood glucose; stimulated by glucagon and epinephrine',
      isReversible: false
    }
  },
  // Step 10
  {
    id: 'rxn_glycogen_galactose_10',
    name: 'UDP-glucose Dehydrogenase Reaction',
    byreactant: ['2 NAD⁺'],
    byproduct: ['2 NADH'],
    enzyme: {
      name: 'UDP-glucose 6-dehydrogenase',
      ecNumber: 'EC 1.1.1.22',
      cofactors: ['NAD⁺'],
      description: 'Oxidizes UDP-glucose to UDP-glucuronate for detoxification and glycosaminoglycan synthesis.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Upregulated when demand for glucuronidation increases',
      isReversible: false
    }
  },
  // Step 11
  {
    id: 'rxn_glycogen_galactose_11',
    name: 'Glucuronidation Reactions',
    byproduct: ['UDP'],
    enzyme: {
      name: 'UDP-glucuronosyltransferases (UGTs)',
      ecNumber: 'EC 2.4.1.17',
      cofactors: [],
      description: 'Transfers glucuronic acid from UDP-glucuronate to bilirubin and other substrates for detoxification.'
    },
    conditions: {
      location: 'Endoplasmic reticulum lumen',
      ph: '7.2',
      temperature: '37°C',
      regulation: 'Induced by xenobiotics and bilirubin load; multiple isoforms with different specificities',
      isReversible: false
    }
  },
  // Step 12
  {
    id: 'rxn_glycogen_galactose_12',
    name: 'Glycosylation to Complex Carbohydrates',
    byreactant: ['Protein/Lipid acceptors'],
    byproduct: ['UDP'],
    enzyme: {
      name: 'Glycosyltransferases (Golgi apparatus)',
      ecNumber: 'Multiple (EC 2.4.-.-)',
      cofactors: [],
      description: 'Transfers glucose from UDP-glucose into growing glycosaminoglycans, glycoproteins, and glycolipids.'
    },
    conditions: {
      location: 'Golgi apparatus',
      ph: '6.5-7.0',
      temperature: '37°C',
      regulation: 'Coordinated with secretory pathway demands',
      isReversible: false
    }
  },
  // Step 13
  {
    id: 'rxn_glycogen_galactose_13',
    name: 'Galactitol Oxidation',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH', 'H⁺'],
    enzyme: {
      name: 'Galactitol Dehydrogenase',
      ecNumber: 'EC 1.1.1.16',
      cofactors: ['NAD⁺'],
      description: 'Oxidizes galactitol back to galactose, preventing osmotic buildup in cells.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Limited in humans; more relevant in microorganisms but useful for diagram completeness',
      isReversible: true
    }
  },
  // Step 14
  {
    id: 'rxn_glycogen_galactose_14',
    name: 'Galactokinase Reaction',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Galactokinase',
      ecNumber: 'EC 2.7.1.6',
      cofactors: ['Mg²⁺'],
      description: 'Phosphorylates galactose to form galactose-1-phosphate, trapping it inside the cell.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Essential step in the Leloir pathway',
      isReversible: false
    }
  },
  // Step 15
  {
    id: 'rxn_glycogen_galactose_15',
    name: 'Galactose-1-phosphate Uridylyltransferase',
    byreactant: ['udp_glucose'],
    byproduct: ['udp_galactose'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: 'Galactose-1-phosphate uridylyltransferase (GALT)',
      ecNumber: 'EC 2.7.7.12',
      cofactors: [],
      description: 'Swaps UDP between galactose-1-phosphate and UDP-glucose, producing glucose-1-phosphate.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Deficiency causes classic galactosemia; reaction is near equilibrium',
      isReversible: true
    }
  },
  // Step 16
  {
    id: 'rxn_glycogen_galactose_16',
    name: 'UDP-hexose 4-epimerase',
    enzyme: {
      name: 'UDP-galactose 4-epimerase (GALE)',
      ecNumber: 'EC 5.1.3.2',
      cofactors: ['NAD⁺ tightly bound'],
      description: 'Reversibly interconverts UDP-galactose and UDP-glucose, balancing the UDP-hexose pool.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Direction depends on cellular demand for each UDP-sugar',
      isReversible: true
    }
  },
  // Step 17
  {
    id: 'rxn_glycogen_galactose_17',
    name: 'Lactose Synthase Reaction',
    byreactant: ['Glucose'],
    byproduct: ['UDP'],
    enzyme: {
      name: 'Lactose Synthase (Galactosyltransferase + α-lactalbumin)',
      ecNumber: 'EC 2.4.1.22',
      cofactors: ['Ca²⁺'],
      description: 'Transfers galactose from UDP-galactose to glucose to produce lactose in mammary gland Golgi.'
    },
    conditions: {
      location: 'Golgi apparatus of mammary epithelial cells',
      ph: '6.5-7.0',
      temperature: '37°C',
      regulation: 'Requires α-lactalbumin (induced by prolactin) to alter specificity of galactosyltransferase',
      isReversible: false
    }
  }
];
