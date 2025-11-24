/**
 * Deoxyribonucleotides Synthesis Pathway - Reactions Data
 */

export const deoxyribonucleotidesReactions = [
  // Column 1: Adenine pathway reactions
  {
    id: 'rxn_deoxy_1',
    name: 'ATP Dephosphorylation',
    byreactant: ['H₂O'],
    byproduct: ['Pi'],
    enzyme: {
      name: 'Phosphatase',
      ecNumber: 'EC 3.1.3.x',
      cofactors: ['None'],
      description: 'Catalyzes the dephosphorylation of ATP to ADP, consuming water and releasing inorganic phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First step in deoxyribonucleotide synthesis',
      isReversible: false
    }
  },
  {
    id: 'rxn_deoxy_2',
    name: 'ADP Reduction to dADP',
    enzyme: {
      name: 'Ribonucleotide reductase',
      ecNumber: 'EC 1.17.4.1',
      cofactors: ['Thioredoxin', 'NADPH'],
      description: 'Catalyzes the reduction of ADP to dADP, converting the 2\'-OH group to 2\'-H. Regulated by feedback from dATP.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Allosterically regulated by dATP (feedback inhibition)',
      isReversible: false
    }
  },
  {
    id: 'rxn_deoxy_3',
    name: 'dADP Phosphorylation to dATP',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Kinase',
      ecNumber: 'EC 2.7.4.x',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of dADP to dATP using ATP as the phosphate donor'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Final step in dATP synthesis',
      isReversible: true
    }
  },

  // Column 2: Guanine pathway reactions
  {
    id: 'rxn_deoxy_4',
    name: 'GTP Dephosphorylation',
    byreactant: ['H₂O'],
    byproduct: ['Pi'],
    enzyme: {
      name: 'Phosphatase',
      ecNumber: 'EC 3.1.3.x',
      cofactors: ['None'],
      description: 'Catalyzes the dephosphorylation of GTP to GDP, consuming water and releasing inorganic phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First step in guanine deoxyribonucleotide synthesis',
      isReversible: false
    }
  },
  {
    id: 'rxn_deoxy_5',
    name: 'GDP Reduction to dGDP',
    enzyme: {
      name: 'Ribonucleotide reductase',
      ecNumber: 'EC 1.17.4.1',
      cofactors: ['Thioredoxin', 'NADPH'],
      description: 'Catalyzes the reduction of GDP to dGDP, converting the 2\'-OH group to 2\'-H'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of deoxyribonucleotide synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_deoxy_6',
    name: 'dGDP Phosphorylation to dGTP',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Kinase',
      ecNumber: 'EC 2.7.4.x',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of dGDP to dGTP using ATP as the phosphate donor'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Final step in dGTP synthesis',
      isReversible: true
    }
  },

  // Column 3: Cytosine pathway reactions
  {
    id: 'rxn_deoxy_7',
    name: 'CTP Dephosphorylation',
    byreactant: ['H₂O'],
    byproduct: ['Pi'],
    enzyme: {
      name: 'Phosphatase',
      ecNumber: 'EC 3.1.3.x',
      cofactors: ['None'],
      description: 'Catalyzes the dephosphorylation of CTP to CDP, consuming water and releasing inorganic phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First step in cytosine deoxyribonucleotide synthesis',
      isReversible: false
    }
  },
  {
    id: 'rxn_deoxy_8',
    name: 'CDP Reduction to dCDP',
    enzyme: {
      name: 'Ribonucleotide reductase',
      ecNumber: 'EC 1.17.4.1',
      cofactors: ['Thioredoxin', 'NADPH'],
      description: 'Catalyzes the reduction of CDP to dCDP, converting the 2\'-OH group to 2\'-H'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of deoxyribonucleotide synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_deoxy_9',
    name: 'dCDP Phosphorylation to dCTP',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Kinase',
      ecNumber: 'EC 2.7.4.x',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of dCDP to dCTP using ATP as the phosphate donor'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Final step in dCTP synthesis',
      isReversible: true
    }
  },

  // Column 4: Uracil pathway reactions
  {
    id: 'rxn_deoxy_10',
    name: 'UTP Dephosphorylation',
    byreactant: ['H₂O'],
    byproduct: ['Pi'],
    enzyme: {
      name: 'Phosphatase',
      ecNumber: 'EC 3.1.3.x',
      cofactors: ['None'],
      description: 'Catalyzes the dephosphorylation of UTP to UDP, consuming water and releasing inorganic phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First step in uracil deoxyribonucleotide synthesis',
      isReversible: false
    }
  },
  {
    id: 'rxn_deoxy_11',
    name: 'UDP Reduction to dUDP',
    enzyme: {
      name: 'Ribonucleotide reductase',
      ecNumber: 'EC 1.17.4.1',
      cofactors: ['Thioredoxin', 'NADPH'],
      description: 'Catalyzes the reduction of UDP to dUDP, converting the 2\'-OH group to 2\'-H'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of deoxyribonucleotide synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_deoxy_12',
    name: 'dUDP Phosphorylation to dUTP',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Kinase',
      ecNumber: 'EC 2.7.4.x',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of dUDP to dUTP using ATP as the phosphate donor'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Final step in dUTP synthesis',
      isReversible: true
    }
  },

  // Spontaneous interconversion
  {
    id: 'rxn_deoxy_13',
    name: 'dCTP to dUTP Conversion',
    byproduct: ['NH₄⁺'],
    enzyme: {
      name: 'Spontaneous deamination',
      ecNumber: 'None',
      cofactors: ['None'],
      description: 'Spontaneous deamination of dCTP to dUTP, releasing ammonium ion'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Spontaneous reaction, not enzyme-catalyzed',
      isReversible: false
    }
  },

  // Thymidine synthesis pathway reactions
  {
    id: 'rxn_deoxy_14',
    name: 'dCDP Dephosphorylation to dCMP',
    byreactant: ['H₂O'],
    byproduct: ['Pi'],
    enzyme: {
      name: 'Phosphatase',
      ecNumber: 'EC 3.1.3.x',
      cofactors: ['None'],
      description: 'Catalyzes the dephosphorylation of dCDP to dCMP, consuming water and releasing inorganic phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First step in thymidine synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_deoxy_15',
    name: 'dCMP Deamination to dUMP',
    byproduct: ['NH₄⁺'],
    enzyme: {
      name: 'Deoxynucleotide deaminase',
      ecNumber: 'EC 3.5.4.x',
      cofactors: ['None'],
      description: 'Catalyzes the deamination of dCMP to dUMP, releasing ammonium ion'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Converts dCMP to dUMP for thymidine synthesis',
      isReversible: false
    }
  },
  {
    id: 'rxn_deoxy_16',
    name: 'dUTP Dephosphorylation to dUMP',
    byproduct: ['PPi'],
    enzyme: {
      name: 'dUTP pyrophosphatase',
      ecNumber: 'EC 3.6.1.23',
      cofactors: ['None'],
      description: 'Catalyzes the hydrolysis of dUTP to dUMP, releasing pyrophosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Prevents dUTP incorporation into DNA by converting it to dUMP',
      isReversible: false
    }
  },
  {
    id: 'rxn_deoxy_17',
    name: 'dUMP Methylation to dTMP',
    displayByreactant: ['n5n10_methylene_thf'],
    displayByproduct: ['dihydrofolate'],
    enzyme: {
      name: 'Thymidylate synthase (TS)',
      ecNumber: 'EC 2.1.1.45',
      cofactors: ['N⁵,N¹⁰-methylene-THF'],
      description: 'Catalyzes the methylation of dUMP to dTMP using N⁵,N¹⁰-methylene-THF as the methyl donor, producing dihydrofolate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Rate-limiting step in thymidine synthesis, coupled to folate cycle',
      isReversible: false
    }
  },
  // Folate cycle reactions
  {
    id: 'rxn_deoxy_18',
    name: 'Dihydrofolate Reduction to THF',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'Dihydrofolate reductase (DHFR)',
      ecNumber: 'EC 1.5.1.3',
      cofactors: ['NADPH'],
      description: 'Catalyzes the reduction of dihydrofolate to tetrahydrofolate using NADPH as the reducing agent, regenerating THF for the folate cycle'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Critical step in folate cycle regeneration, target of methotrexate and other antifolate drugs',
      isReversible: false
    }
  },
  {
    id: 'rxn_deoxy_19',
    name: 'THF Methylation to N⁵,N¹⁰-methylene-THF',
    byreactant: ['serine_deoxy'],
    byproduct: ['glycine_deoxy'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: 'Serine hydroxymethyltransferase (SHMT)',
      ecNumber: 'EC 2.1.2.1',
      cofactors: ['Pyridoxal phosphate'],
      description: 'Catalyzes the transfer of a methylene group from serine to THF, forming N⁵,N¹⁰-methylene-THF and glycine, completing the folate cycle'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Regenerates N⁵,N¹⁰-methylene-THF for thymidine synthesis',
      isReversible: true
    }
  },
  {
    id: 'rxn_deoxy_20',
    name: 'dTMP Phosphorylation to dTDP',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Kinase',
      ecNumber: 'EC 2.7.4.x',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of dTMP to dTDP using ATP as the phosphate donor'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First phosphorylation step in dTTP synthesis',
      isReversible: true
    }
  },
  {
    id: 'rxn_deoxy_21',
    name: 'dTDP Phosphorylation to dTTP',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Kinase',
      ecNumber: 'EC 2.7.4.x',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of dTDP to dTTP using ATP as the phosphate donor'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Final step in dTTP synthesis',
      isReversible: true
    }
  }
];

