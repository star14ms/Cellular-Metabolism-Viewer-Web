/**
 * De Novo Purine Synthesis Pathway - Reactions Data
 */

export const purineSynthesisReactions = [
  {
    id: 'rxn_purine_synthesis_1',
    name: '5-Phosphoribosylamine Synthesis',
    byreactant: ['Glutamine'],
    byproduct: ['Glutamate', 'PPi'],
    enzyme: {
      name: 'Glutamine PRPP amidotransferase (GPAT)',
      ecNumber: 'EC 2.4.2.14',
      cofactors: ['None'],
      description: 'Catalyzes the transfer of an amino group from glutamine to PRPP, forming 5-phosphoribosylamine. This is the first committed step in purine synthesis.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First committed step; allosterically regulated by purine nucleotides (feedback inhibition)',
      isReversible: false
    }
  },
  {
    id: 'rxn_purine_synthesis_2',
    name: 'Glycinamide Ribonucleotide (GAR) Synthesis',
    byreactant: ['Glycine', 'ATP'],
    byproduct: ['ADP', 'Pi'],
    enzyme: {
      name: 'GAR synthetase',
      ecNumber: 'EC 6.3.4.13',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the addition of glycine to 5-phosphoribosylamine, forming GAR and consuming ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the purine synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_purine_synthesis_3',
    name: 'Formyl-GAR (FGAR) Synthesis',
    byreactant: ['N¹⁰-formyl-THF'],
    byproduct: ['THF'],
    enzyme: {
      name: 'GAR transformylase',
      ecNumber: 'EC 2.1.2.2',
      cofactors: ['None'],
      description: 'Catalyzes the formylation of GAR using N¹⁰-formyl-THF as the formyl donor, forming FGAR'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the purine synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_purine_synthesis_4',
    name: 'Formiminoglycinamidine Ribonucleotide (FGAM) Synthesis',
    byreactant: ['H₂O', 'ATP', 'Glutamine'],
    byproduct: ['ADP', 'Pi', 'Glutamate'],
    enzyme: {
      name: 'FGAM synthetase',
      ecNumber: 'EC 6.3.5.3',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the amidation of FGAR using glutamine as the nitrogen source, forming FGAM. Requires ATP and water.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the purine synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_purine_synthesis_5',
    name: 'Aminoimidazole Ribonucleotide (AIR) Synthesis',
    byreactant: ['ATP'],
    byproduct: ['ADP', 'Pi'],
    enzyme: {
      name: 'AIR synthetase',
      ecNumber: 'EC 6.3.3.1',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the cyclization of FGAM to form AIR, consuming ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the purine synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_purine_synthesis_6',
    name: 'Carboxyaminoimidazole Ribonucleotide (CAIR) Synthesis',
    byreactant: ['CO₂'],
    enzyme: {
      name: 'AIR carboxylase',
      ecNumber: 'EC 4.1.1.21',
      cofactors: ['None'],
      description: 'Catalyzes the carboxylation of AIR using CO₂, forming CAIR'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the purine synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_purine_synthesis_7',
    name: 'Succinylaminoimidazole Carboxamide Ribonucleotide (SAICAR) Synthesis',
    byreactant: ['ATP', 'Aspartate'],
    byproduct: ['ADP', 'Pi'],
    enzyme: {
      name: 'SAICAR synthetase',
      ecNumber: 'EC 6.3.2.6',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the addition of aspartate to CAIR, forming SAICAR and consuming ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the purine synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_purine_synthesis_8',
    name: 'Aminoimidazole Carboxamide Ribonucleotide (AICAR) Synthesis',
    byreactant: ['H₂O'],
    byproduct: ['Fumarate'],
    enzyme: {
      name: 'Adenylosuccinate lyase',
      ecNumber: 'EC 4.3.2.2',
      cofactors: ['None'],
      description: 'Catalyzes the removal of fumarate from SAICAR, forming AICAR and releasing fumarate and water'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the purine synthesis pathway',
      isReversible: true
    }
  },
  {
    id: 'rxn_purine_synthesis_9',
    name: 'Formaminoimidazole Carboxamide Ribonucleotide (FAICAR) Synthesis',
    byreactant: ['N¹⁰-formyl-THF'],
    byproduct: ['THF'],
    enzyme: {
      name: 'AICAR transformylase',
      ecNumber: 'EC 2.1.2.3',
      cofactors: ['None'],
      description: 'Catalyzes the formylation of AICAR using N¹⁰-formyl-THF as the formyl donor, forming FAICAR'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the purine synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_purine_synthesis_10',
    name: 'Inosine Monophosphate (IMP) Synthesis',
    byproduct: ['H₂O'],
    enzyme: {
      name: 'IMP cyclohydrolase',
      ecNumber: 'EC 3.5.4.10',
      cofactors: ['None'],
      description: 'Catalyzes the cyclization of FAICAR to form IMP, the final product of de novo purine synthesis, releasing water'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Final step in de novo purine synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_purine_synthesis_15',
    name: 'IMP Synthesis from Hypoxanthine',
    byreactant: ['PRPP'],
    byproduct: ['PPi'],
    enzyme: {
      name: 'Hypoxanthine-guanine phosphoribosyltransferase (HGPRT)',
      ecNumber: 'EC 2.4.2.8',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the salvage of hypoxanthine to IMP using PRPP, releasing pyrophosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key enzyme in purine base salvage pathway',
      isReversible: false
    }
  },
  
  // Left branch: IMP → AMP pathway
  {
    id: 'rxn_purine_synthesis_11',
    name: 'Adenylosuccinate Synthesis',
    byreactant: ['Aspartate', 'GTP'],
    byproduct: ['GDP', 'Pi'],
    enzyme: {
      name: 'Adenylosuccinate synthetase',
      ecNumber: 'EC 6.3.4.4',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the addition of aspartate to IMP, forming adenylosuccinate. Consumes GTP and produces GDP and Pi.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key step in AMP synthesis from IMP',
      isReversible: false
    }
  },
  {
    id: 'rxn_purine_synthesis_12',
    name: 'AMP Synthesis',
    byproduct: ['Fumarate'],
    enzyme: {
      name: 'Adenylosuccinate lyase',
      ecNumber: 'EC 4.3.2.2',
      cofactors: ['None'],
      description: 'Catalyzes the removal of fumarate from adenylosuccinate, forming AMP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of AMP synthesis pathway',
      isReversible: true
    }
  },
  {
    id: 'rxn_purine_synthesis_25',
    name: 'AMP to IMP Conversion',
    byproduct: ['NH₄⁺'],
    enzyme: {
      name: 'AMP deaminase',
      ecNumber: 'EC 3.5.4.6',
      cofactors: ['None'],
      description: 'Catalyzes the deamination of AMP to IMP, releasing ammonium ion'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction converting AMP back to IMP',
      isReversible: true
    }
  },
  {
    id: 'rxn_purine_synthesis_24',
    name: 'Ribose-1-phosphate Synthesis from Uridine',
    byreactant: ['Pi'],
    byproduct: ['Uracil'],
    enzyme: {
      name: 'Uridine phosphorylase',
      ecNumber: 'EC 2.4.2.3',
      cofactors: ['None'],
      description: 'Catalyzes the conversion of uridine to uracil and ribose-1-phosphate, consuming inorganic phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of pyrimidine nucleoside salvage pathway',
      isReversible: true
    }
  },
  {
    id: 'rxn_purine_synthesis_22',
    name: 'Ribose-1-phosphate and Ribose-5-phosphate Interconversion',
    enzyme: {
      name: 'Phosphopentomutase',
      ecNumber: 'EC 5.4.2.7',
      cofactors: ['None'],
      description: 'Catalyzes the reversible interconversion of ribose-1-phosphate and ribose-5-phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction maintaining ribose phosphate balance',
      isReversible: true
    }
  },
  {
    id: 'rxn_purine_synthesis_23',
    name: 'PRPP Synthesis',
    byreactant: ['ATP'],
    byproduct: ['AMP'],
    enzyme: {
      name: 'PRPP synthetase',
      ecNumber: 'EC 2.7.6.1',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the synthesis of PRPP from ribose-5-phosphate, consuming ATP and producing AMP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key step in nucleotide synthesis, allosterically regulated',
      isReversible: false
    }
  },
  {
    id: 'rxn_purine_synthesis_20',
    name: 'AMP Synthesis from Adenine',
    byreactant: ['prpp_purine2'],
    byproduct: ['PPi'],
    hideByreactantLabels: true,
    enzyme: {
      name: 'Adenine phosphoribosyltransferase',
      ecNumber: 'EC 2.4.2.7',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the salvage of adenine to AMP using PRPP, releasing pyrophosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key enzyme in purine base salvage pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_purine_synthesis_13',
    name: 'ADP Synthesis',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Adenylate kinase',
      ecNumber: 'EC 2.7.4.3',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of AMP to ADP using ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction maintaining ATP/ADP balance',
      isReversible: true
    }
  },
  {
    id: 'rxn_purine_synthesis_14',
    name: 'ATP Synthesis',
    byreactant: ['GTP'],
    byproduct: ['GDP'],
    enzyme: {
      name: 'Nucleoside diphosphate kinase',
      ecNumber: 'EC 2.7.4.6',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of ADP to ATP using GTP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction maintaining nucleotide balance',
      isReversible: true
    }
  },
  
  // Right branch: IMP → GMP pathway
  {
    id: 'rxn_purine_synthesis_16',
    name: 'Xanthosine Monophosphate (XMP) Synthesis',
    byreactant: ['NAD⁺', 'H₂O'],
    byproduct: ['NADH'],
    enzyme: {
      name: 'IMP dehydrogenase',
      ecNumber: 'EC 1.1.1.205',
      cofactors: ['NAD⁺'],
      description: 'Catalyzes the oxidation of IMP to XMP, reducing NAD⁺ to NADH'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key step in GMP synthesis from IMP',
      isReversible: false
    }
  },
  {
    id: 'rxn_purine_synthesis_17',
    name: 'GMP Synthesis',
    byreactant: ['Glutamine', 'ATP'],
    byproduct: ['Glutamate', 'AMP', 'PPi'],
    enzyme: {
      name: 'GMP synthetase',
      ecNumber: 'EC 6.3.5.2',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the amination of XMP to form GMP using glutamine as the nitrogen source. Consumes ATP and produces AMP and PPi.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key step in GMP synthesis',
      isReversible: false
    }
  },
  {
    id: 'rxn_purine_synthesis_26',
    name: 'GMP to IMP Conversion',
    byreactant: ['NADPH'],
    byproduct: ['NH₄⁺', 'NADP⁺'],
    enzyme: {
      name: 'GMP reductase',
      ecNumber: 'EC 1.7.1.7',
      cofactors: ['NADPH'],
      description: 'Catalyzes the reduction of GMP to IMP, consuming NADPH and producing NADP⁺ and ammonium ion'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction converting GMP back to IMP',
      isReversible: true
    }
  },
  {
    id: 'rxn_purine_synthesis_21',
    name: 'GMP Synthesis from Guanine',
    byreactant: ['PRPP'],
    byproduct: ['PPi'],
    enzyme: {
      name: 'Hypoxanthine-guanine phosphoribosyltransferase (HGPRT)',
      ecNumber: 'EC 2.4.2.8',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the salvage of guanine to GMP using PRPP, releasing pyrophosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key enzyme in purine base salvage pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_purine_synthesis_18',
    name: 'GDP Synthesis',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'GMP kinase',
      ecNumber: 'EC 2.7.4.8',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of GMP to GDP using ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of GMP phosphorylation pathway',
      isReversible: true
    }
  },
  {
    id: 'rxn_purine_synthesis_19',
    name: 'GTP Synthesis',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Nucleoside diphosphate kinase',
      ecNumber: 'EC 2.7.4.6',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of GDP to GTP using ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction maintaining nucleotide balance',
      isReversible: true
    }
  },
  
  // Branches from ATP
  // {
  //   id: 'rxn_purine_synthesis_27',
  //   name: 'S-adenosyl methionine Synthesis',
  //   byreactant: ['Methionine'],
  //   byproduct: ['PPi', 'Pi'],
  //   enzyme: {
  //     name: 'S-adenosylmethionine synthetase',
  //     ecNumber: 'EC 2.5.1.6',
  //     cofactors: ['Mg²⁺'],
  //     description: 'Catalyzes the synthesis of S-adenosyl methionine from ATP and methionine'
  //   },
  //   conditions: {
  //     location: 'Cytoplasm',
  //     ph: '7.0-7.4',
  //     temperature: '37°C',
  //     regulation: 'Reversible reaction',
  //     isReversible: true
  //   }
  // },
  // {
  //   id: 'rxn_purine_synthesis_28',
  //   name: 'Coenzyme A Synthesis',
  //   byreactant: ['Pantothenate', 'Cysteine'],
  //   byproduct: ['PPi', 'Pi'],
  //   enzyme: {
  //     name: 'Coenzyme A synthetase',
  //     ecNumber: 'EC 6.2.1.1',
  //     cofactors: ['Mg²⁺'],
  //     description: 'Catalyzes the synthesis of Coenzyme A from ATP, pantothenate, and cysteine'
  //   },
  //   conditions: {
  //     location: 'Cytoplasm',
  //     ph: '7.0-7.4',
  //     temperature: '37°C',
  //     regulation: 'Reversible reaction',
  //     isReversible: true
  //   }
  // },
  // {
  //   id: 'rxn_purine_synthesis_29',
  //   name: 'NADH Synthesis',
  //   byreactant: ['Nicotinamide', 'Ribose-5-phosphate'],
  //   byproduct: ['PPi', 'Pi'],
  //   enzyme: {
  //     name: 'NAD synthetase',
  //     ecNumber: 'EC 6.3.5.1',
  //     cofactors: ['Mg²⁺'],
  //     description: 'Catalyzes the synthesis of NADH from ATP, nicotinamide, and ribose-5-phosphate'
  //   },
  //   conditions: {
  //     location: 'Cytoplasm',
  //     ph: '7.0-7.4',
  //     temperature: '37°C',
  //     regulation: 'Reversible reaction',
  //     isReversible: true
  //   }
  // },
  // {
  //   id: 'rxn_purine_synthesis_30',
  //   name: 'FADH₂ Synthesis',
  //   byreactant: ['Riboflavin', 'Ribose-5-phosphate'],
  //   byproduct: ['PPi', 'Pi'],
  //   enzyme: {
  //     name: 'FAD synthetase',
  //     ecNumber: 'EC 2.7.7.2',
  //     cofactors: ['Mg²⁺'],
  //     description: 'Catalyzes the synthesis of FADH₂ from ATP, riboflavin, and ribose-5-phosphate'
  //   },
  //   conditions: {
  //     location: 'Cytoplasm',
  //     ph: '7.0-7.4',
  //     temperature: '37°C',
  //     regulation: 'Reversible reaction',
  //     isReversible: true
  //   }
  // },
  
  // Branch from GTP
  // {
  //   id: 'rxn_purine_synthesis_31',
  //   name: 'Biopterin Synthesis',
  //   byreactant: ['GTP'],
  //   byproduct: ['H₂O'],
  //   enzyme: {
  //     name: 'GTP cyclohydrolase I',
  //     ecNumber: 'EC 3.5.4.16',
  //     cofactors: ['None'],
  //     description: 'Catalyzes the synthesis of biopterin from GTP'
  //   },
  //   conditions: {
  //     location: 'Cytoplasm',
  //     ph: '7.0-7.4',
  //     temperature: '37°C',
  //     regulation: 'Reversible reaction',
  //     isReversible: true
  //   }
  // }
];

