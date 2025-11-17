/**
 * Nucleotide Breakdown Pathway - Reactions Data
 */

export const nucleotideBreakdownReactions = [
  // Root reaction: RNA/DNA breakdown by nucleases
  {
    id: 'rxn_breakdown_rna_nucleases',
    name: 'RNA/DNA Hydrolysis',
    byproduct: [],
    enzyme: {
      name: 'Nucleases',
      ecNumber: 'EC 3.1.x.x',
      cofactors: ['None'],
      description: 'Catalyzes the hydrolysis of RNA and DNA into individual nucleotides (GMP, AMP, CMP, UMP, dTMP)'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Initial step in nucleotide breakdown pathway',
      isReversible: false
    }
  },
  
  // Column 1: GMP breakdown reactions
  {
    id: 'rxn_breakdown_1',
    name: 'GMP Dephosphorylation',
    byreactant: ['H₂O'],
    byproduct: ['Pi'],
    enzyme: {
      name: 'Nucleotidase',
      ecNumber: 'EC 3.1.3.x',
      cofactors: ['None'],
      description: 'Catalyzes the dephosphorylation of GMP to guanosine, consuming water and releasing inorganic phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First step in GMP breakdown',
      isReversible: false
    }
  },
  {
    id: 'rxn_breakdown_2',
    name: 'Guanosine Phosphorolysis',
    byreactant: ['Pi'],
    byproduct: ['(deoxy) ribose-1-P'],
    enzyme: {
      name: '(deoxy) Purine nucleoside phosphorylase',
      ecNumber: 'EC 2.4.2.1',
      cofactors: ['None'],
      description: 'Catalyzes the phosphorolysis of (deoxy) guanosine to guanine, releasing (deoxy) ribose-1-P'
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
    id: 'rxn_breakdown_3',
    name: 'Guanine Deamination',
    byreactant: ['H₂O'],
    byproduct: ['NH₄⁺'],
    enzyme: {
      name: 'Guanine deaminase',
      ecNumber: 'EC 3.5.4.3',
      cofactors: ['None'],
      description: 'Catalyzes the deamination of guanine to xanthine, consuming water and releasing ammonium ion'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Converts guanine to xanthine',
      isReversible: false
    }
  },
  {
    id: 'rxn_breakdown_4',
    name: 'Xanthine Oxidation to Uric Acid',
    byreactant: ['H₂O', 'O₂'],
    byproduct: ['H₂O₂'],
    enzyme: {
      name: 'Xanthine oxidase',
      ecNumber: 'EC 1.17.3.2',
      cofactors: ['Molybdenum', 'FAD', 'Iron-sulfur clusters'],
      description: 'Catalyzes the oxidation of xanthine to uric acid, consuming water and oxygen, producing hydrogen peroxide'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Final step in purine breakdown',
      isReversible: false
    }
  },

  // Column 2: AMP breakdown reactions
  {
    id: 'rxn_breakdown_5',
    name: 'AMP Dephosphorylation',
    byreactant: ['H₂O'],
    byproduct: ['Pi'],
    enzyme: {
      name: 'Nucleotidase',
      ecNumber: 'EC 3.1.3.x',
      cofactors: ['None'],
      description: 'Catalyzes the dephosphorylation of AMP to adenosine, consuming water and releasing inorganic phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First step in AMP breakdown',
      isReversible: false
    }
  },
  {
    id: 'rxn_breakdown_6',
    name: 'Adenosine Deamination',
    byreactant: ['H₂O'],
    byproduct: ['NH₄⁺'],
    enzyme: {
      name: 'Adenosine deaminase',
      ecNumber: 'EC 3.5.4.4',
      cofactors: ['None'],
      description: 'Catalyzes the deamination of adenosine to inosine, consuming water and releasing ammonium ion'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Converts adenosine to inosine',
      isReversible: false
    }
  },
  {
    id: 'rxn_breakdown_7',
    name: 'Inosine Phosphorolysis',
    byreactant: ['Pi'],
    byproduct: ['(deoxy) ribose-1-P'],
    enzyme: {
      name: '(deoxy) Purine nucleoside phosphorylase',
      ecNumber: 'EC 2.4.2.1',
      cofactors: ['None'],
      description: 'Catalyzes the phosphorolysis of (deoxy) inosine to hypoxanthine, releasing (deoxy) ribose-1-P'
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
    id: 'rxn_breakdown_8',
    name: 'Hypoxanthine Oxidation to Xanthine',
    byreactant: ['H₂O', 'O₂'],
    byproduct: ['H₂O₂'],
    enzyme: {
      name: 'Xanthine oxidase',
      ecNumber: 'EC 1.17.3.2',
      cofactors: ['Molybdenum', 'FAD', 'Iron-sulfur clusters'],
      description: 'Catalyzes the oxidation of hypoxanthine to xanthine, consuming water and oxygen, producing hydrogen peroxide'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Oxidation step in purine breakdown',
      isReversible: false
    }
  },

  // Column 3: IMP breakdown reactions
  {
    id: 'rxn_breakdown_10',
    name: 'AMP Deamination to IMP',
    byreactant: ['H₂O'],
    byproduct: ['NH₄⁺'],
    enzyme: {
      name: 'AMP deaminase',
      ecNumber: 'EC 3.5.4.6',
      cofactors: ['None'],
      description: 'Catalyzes the deamination of AMP to IMP, consuming water and releasing ammonium ion'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Alternative pathway for AMP breakdown',
      isReversible: false
    }
  },
  {
    id: 'rxn_breakdown_11',
    name: 'IMP Dephosphorylation',
    byreactant: ['H₂O'],
    byproduct: ['Pi'],
    enzyme: {
      name: 'Nucleotidase',
      ecNumber: 'EC 3.1.3.x',
      cofactors: ['None'],
      description: 'Catalyzes the dephosphorylation of IMP to inosine, consuming water and releasing inorganic phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Dephosphorylation step in IMP breakdown',
      isReversible: false
    }
  },

  // Column 4: CMP breakdown reactions
  {
    id: 'rxn_breakdown_15',
    name: 'CMP Dephosphorylation',
    byreactant: ['H₂O'],
    byproduct: ['Pi'],
    enzyme: {
      name: 'Nucleotidase',
      ecNumber: 'EC 3.1.3.x',
      cofactors: ['None'],
      description: 'Catalyzes the dephosphorylation of CMP to cytidine, consuming water and releasing inorganic phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First step in CMP breakdown',
      isReversible: false
    }
  },
  {
    id: 'rxn_breakdown_16',
    name: 'Cytidine Deamination',
    byreactant: ['H₂O'],
    byproduct: ['NH₄⁺'],
    enzyme: {
      name: 'Pyrimidine nucleoside deaminase',
      ecNumber: 'EC 3.5.4.5',
      cofactors: ['None'],
      description: 'Catalyzes the deamination of cytidine to uridine, consuming water and releasing ammonium ion'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Converts cytidine to uridine',
      isReversible: false
    }
  },

  // Column 5: UMP breakdown reactions
  {
    id: 'rxn_breakdown_21',
    name: 'UMP Dephosphorylation',
    byreactant: ['H₂O'],
    byproduct: ['Pi'],
    enzyme: {
      name: 'Nucleotidase',
      ecNumber: 'EC 3.1.3.x',
      cofactors: ['None'],
      description: 'Catalyzes the dephosphorylation of UMP to uridine, consuming water and releasing inorganic phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First step in UMP breakdown',
      isReversible: false
    }
  },
  {
    id: 'rxn_breakdown_22',
    name: 'Uridine Phosphorolysis',
    byreactant: ['Pi'],
    byproduct: ['(deoxy) ribose-1-P'],
    enzyme: {
      name: '(deoxy) Uridine phosphorylase',
      ecNumber: 'EC 2.4.2.3',
      cofactors: ['None'],
      description: 'Catalyzes the phosphorolysis of (deoxy) uridine to uracil, releasing (deoxy) ribose-1-P'
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
    id: 'rxn_breakdown_23',
    name: 'Uracil Reduction',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'Dihydropyrimidine dehydrogenase (DPD)',
      ecNumber: 'EC 1.3.1.2',
      cofactors: ['NADPH', 'FAD', 'FMN'],
      description: 'Catalyzes the reduction of uracil to dihydrouracil, consuming NADPH and producing NADP⁺'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Rate-limiting step in pyrimidine breakdown',
      isReversible: false
    }
  },
  {
    id: 'rxn_breakdown_24',
    name: 'Dihydrouracil Ring Opening',
    enzyme: {
      name: 'Dihydropyrimidinase',
      ecNumber: 'EC 3.5.2.2',
      cofactors: ['None'],
      description: 'Catalyzes the ring opening of dihydrouracil to β-ureidopropionate, consuming water'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Ring opening step in pyrimidine breakdown',
      isReversible: false
    }
  },
  {
    id: 'rxn_breakdown_25',
    name: 'β-ureidopropionate Hydrolysis',
    byreactant: ['H₂O'],
    byproduct: ['CO₂', 'NH₄⁺'],
    enzyme: {
      name: 'Ureidopropionase',
      ecNumber: 'EC 3.5.1.6',
      cofactors: ['None'],
      description: 'Catalyzes the hydrolysis of β-ureidopropionate to β-alanine, consuming water and releasing carbon dioxide and ammonium ion'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Final step in uracil breakdown',
      isReversible: false
    }
  },

  // Column 6: dTMP breakdown reactions
  {
    id: 'rxn_breakdown_26',
    name: 'dTMP Dephosphorylation',
    byreactant: ['H₂O'],
    byproduct: ['Pi'],
    enzyme: {
      name: 'Nucleotidase',
      ecNumber: 'EC 3.1.3.x',
      cofactors: ['None'],
      description: 'Catalyzes the dephosphorylation of dTMP to thymidine, consuming water and releasing inorganic phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First step in dTMP breakdown',
      isReversible: false
    }
  },
  {
    id: 'rxn_breakdown_27',
    name: 'Thymidine Phosphorolysis',
    byreactant: ['Pi'],
    byproduct: ['deoxyribose-1-P'],
    enzyme: {
      name: 'Thymidine phosphorylase',
      ecNumber: 'EC 2.4.2.4',
      cofactors: ['None'],
      description: 'Catalyzes the phosphorolysis of thymidine to thymine, releasing deoxyribose-1-phosphate'
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
    id: 'rxn_breakdown_28',
    name: 'Thymine Reduction',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'Dihydropyrimidine dehydrogenase (DPD)',
      ecNumber: 'EC 1.3.1.2',
      cofactors: ['NADPH', 'FAD', 'FMN'],
      description: 'Catalyzes the reduction of thymine to dihydrothymine, consuming NADPH and producing NADP⁺'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Rate-limiting step in thymine breakdown',
      isReversible: false
    }
  },
  {
    id: 'rxn_breakdown_29',
    name: 'Dihydrothymine Ring Opening',
    enzyme: {
      name: 'Dihydropyrimidinase',
      ecNumber: 'EC 3.5.2.2',
      cofactors: ['None'],
      description: 'Catalyzes the ring opening of dihydrothymine to β-ureidoisobutyrate, consuming water'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Ring opening step in thymine breakdown',
      isReversible: false
    }
  },
  {
    id: 'rxn_breakdown_30',
    name: 'β-ureidoisobutyrate Hydrolysis',
    byreactant: ['H₂O'],
    byproduct: ['CO₂', 'NH₄⁺'],
    enzyme: {
      name: 'Ureidopropionase',
      ecNumber: 'EC 3.5.1.6',
      cofactors: ['None'],
      description: 'Catalyzes the hydrolysis of β-ureidoisobutyrate to β-aminoisobutyric acid, consuming water and releasing carbon dioxide and ammonium ion'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Final step in thymine breakdown',
      isReversible: false
    }
  }
];

