/**
 * Single-Carbon Metabolism and Sulfur-Containing Amino Acids Pathway - Reactions Data
 */

export const singleCarbonMetabolismReactions = [
  // Upper Row: Folate Metabolism Reactions
  
  // Reaction 1: Folate → Dihydrofolate
  {
    id: 'rxn_single_carbon_1',
    name: 'Folate Reduction to Dihydrofolate',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'Dihydrofolate reductase (DHFR)',
      ecNumber: 'EC 1.5.1.3',
      cofactors: ['NADPH'],
      description: 'Catalyzes the reduction of folate to dihydrofolate using NADPH as the reducing agent'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction, first step in folate activation',
      isReversible: true
    }
  },

  // Reaction 2: Dihydrofolate → THF
  {
    id: 'rxn_single_carbon_2',
    name: 'Dihydrofolate Reduction to THF',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'Dihydrofolate reductase (DHFR)',
      ecNumber: 'EC 1.5.1.3',
      cofactors: ['NADPH'],
      description: 'Catalyzes the reduction of dihydrofolate to tetrahydrofolate using NADPH as the reducing agent'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction, critical step in folate cycle regeneration, target of methotrexate',
      isReversible: true
    }
  },

  // Reaction 3: THF → N10-formyl-THF
  {
    id: 'rxn_single_carbon_3',
    name: 'THF Formylation to N10-formyl-THF',
    byreactant: ['Formate', 'ATP'],
    byproduct: ['ADP', 'Pi'],
    enzyme: {
      name: 'C1-THF synthase',
      ecNumber: 'EC 6.3.4.3',
      cofactors: ['ATP', 'Formate'],
      description: 'Catalyzes the formylation of THF to N10-formyl-THF using ATP and formate as substrates'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Formate can feed into this step, provides formyl groups for purine synthesis',
      isReversible: false
    }
  },

  // Reaction 3a: N10-formyl-THF → Purine Synthesis
  {
    id: 'rxn_single_carbon_3a',
    name: 'N10-formyl-THF to Purine Synthesis',
    enzyme: {
      name: 'Various purine synthesis enzymes',
      ecNumber: 'Multiple',
      cofactors: [],
      description: 'N10-formyl-THF provides formyl groups for purine nucleotide synthesis'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Connects single-carbon metabolism to purine synthesis',
      isReversible: false
    }
  },

  // Reaction 4: N10-formyl-THF → N5,N10-methenyl-THF
  {
    id: 'rxn_single_carbon_4',
    name: 'N10-formyl-THF to N5,N10-methenyl-THF',
    byproduct: ['H₂O'],
    enzyme: {
      name: 'Methenyl-THF cyclohydrolase',
      ecNumber: 'EC 3.5.4.9',
      cofactors: [],
      description: 'Catalyzes the cyclization of N10-formyl-THF to N5,N10-methenyl-THF, releasing water'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction, interconverts formyl and methenyl forms',
      isReversible: true
    }
  },

  // Reaction 4a: Histidine Catabolism → N5,N10-methenyl-THF
  {
    id: 'rxn_single_carbon_4a',
    name: 'Histidine Catabolism to N5,N10-methenyl-THF',
    enzyme: {
      name: 'Histidine catabolism enzymes',
      ecNumber: 'Multiple',
      cofactors: [],
      description: 'Histidine catabolism produces N5,N10-methenyl-THF as a product'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Connects histidine catabolism to single-carbon metabolism',
      isReversible: false
    }
  },

  // Reaction 5: N5,N10-methenyl-THF → N5,N10-methylene-THF
  {
    id: 'rxn_single_carbon_5',
    name: 'N5,N10-methenyl-THF Reduction to N5,N10-methylene-THF',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'Methenyl-THF reductase',
      ecNumber: 'EC 1.5.1.20',
      cofactors: ['NADPH'],
      description: 'Catalyzes the reduction of N5,N10-methenyl-THF to N5,N10-methylene-THF using NADPH'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction, can also be formed from histidine catabolism',
      isReversible: true
    }
  },

  // Reaction 5a: N5,N10-methylene-THF → Pyrimidine Synthesis
  {
    id: 'rxn_single_carbon_5a',
    name: 'N5,N10-methylene-THF to Pyrimidine Synthesis',
    enzyme: {
      name: 'Various pyrimidine synthesis enzymes',
      ecNumber: 'Multiple',
      cofactors: [],
      description: 'N5,N10-methylene-THF provides methylene groups for pyrimidine nucleotide synthesis'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Connects single-carbon metabolism to pyrimidine synthesis',
      isReversible: false
    }
  },

  // Lower Row: Serine/Glycine Pathway Reactions

  // Reaction 6: 3-phosphoglycerate → 3-phosphopyruvate
  {
    id: 'rxn_single_carbon_6',
    name: '3-Phosphoglycerate Dehydrogenation',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: 'Phosphoglycerate dehydrogenase',
      ecNumber: 'EC 1.1.1.95',
      cofactors: ['NAD⁺'],
      description: 'Catalyzes the oxidation of 3-phosphoglycerate to 3-phosphopyruvate, producing NADH'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First committed step in serine synthesis from glycolysis',
      isReversible: false
    }
  },

  // Reaction 7: 3-phosphopyruvate → 3-phosphoserine
  {
    id: 'rxn_single_carbon_7',
    name: '3-Phosphopyruvate Transamination',
    byreactant: ['Glutamate'],
    byproduct: ['alpha_ketoglutarate_serine'],
    hideByproductLabels: true,
    enzyme: {
      name: 'Phosphoserine transaminase',
      ecNumber: 'EC 2.6.1.52',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)'],
      description: 'Catalyzes the transamination of 3-phosphopyruvate to 3-phosphoserine, using glutamate as amino donor and producing α-ketoglutarate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Requires vitamin B6 as cofactor, reversible transamination reaction',
      isReversible: true
    }
  },

  // Reaction 8: 3-phosphoserine → Serine
  {
    id: 'rxn_single_carbon_8',
    name: '3-Phosphoserine Dephosphorylation',
    byreactant: ['H₂O'],
    byproduct: ['Pi'],
    enzyme: {
      name: 'Phosphoserine phosphatase',
      ecNumber: 'EC 3.1.3.3',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the dephosphorylation of 3-phosphoserine to serine, releasing water and inorganic phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Final step in serine synthesis, irreversible dephosphorylation',
      isReversible: false
    }
  },

  // Reaction 8a: Serine → Phosphatidylserine, Ceramide, Sphingosine
  {
    id: 'rxn_single_carbon_8a',
    name: 'Serine to Lipid Derivatives',
    enzyme: {
      name: 'Phosphatidylserine synthase, Serine palmitoyltransferase, and related enzymes',
      ecNumber: 'Multiple',
      cofactors: [],
      description: 'Serine serves as a precursor for multiple lipid derivatives: phosphatidylserine (via phosphatidylserine synthase), ceramide and sphingosine (via serine palmitoyltransferase and sphingolipid synthesis pathways)'
    },
    conditions: {
      location: 'Endoplasmic reticulum',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Important for membrane phospholipid and sphingolipid biosynthesis',
      isReversible: false
    }
  },

  // Reaction 9: Serine → Glycine
  {
    id: 'rxn_single_carbon_9',
    name: 'Serine to Glycine Conversion',
    byreactant: ['thf'],
    byproduct: ['n5_n10_methylene_thf'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: 'Serine hydroxymethyltransferase (SHMT)',
      ecNumber: 'EC 2.1.2.1',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)'],
      description: 'Catalyzes the conversion of serine to glycine, transferring a methylene group to THF to form N5,N10-methylene-THF'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction, key connection between amino acid metabolism and single-carbon metabolism',
      isReversible: true
    }
  },

  // Reaction 9a: Glycine → Glutathione, Nucleotides, Porphyrins
  {
    id: 'rxn_single_carbon_9a',
    name: 'Glycine to Multiple Products',
    enzyme: {
      name: 'Multiple enzymes',
      ecNumber: 'Multiple',
      cofactors: [],
      description: 'Glycine serves as a precursor for multiple biosynthetic pathways: glutathione synthesis (with glutamate and cysteine), nucleotide synthesis (purine ring formation), and porphyrin synthesis (heme and chlorophyll biosynthesis)'
    },
    conditions: {
      location: 'Cytoplasm, Mitochondria',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Glycine is a versatile precursor for multiple essential biomolecules',
      isReversible: false
    }
  },

  // Creatine Synthesis Pathway Reactions

  // Reaction 10: N5,N10-methylene-THF → Glycine (downward connection)
  {
    id: 'rxn_single_carbon_10',
    name: 'N5,N10-methylene-THF to Glycine',
    byreactant: ['NADH', 'NH₃', 'CO₂'],
    byproduct: ['NAD⁺', 'THF'],
    enzyme: {
      name: 'Glycine cleavage complex (reverse)',
      ecNumber: 'EC 1.4.4.2',
      cofactors: ['NAD⁺', 'THF'],
      description: 'Reverse reaction of glycine cleavage complex, converts N5,N10-methylene-THF to glycine and THF'
    },
    conditions: {
      location: 'Mitochondria',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction, connects folate cycle to glycine metabolism',
      isReversible: true
    }
  },

  // Reaction 11: Glycine → Guanidinoacetate
  {
    id: 'rxn_single_carbon_11',
    name: 'Glycine to Guanidinoacetate',
    byreactant: ['Arginine'],
    byproduct: ['Ornithine'],
    enzyme: {
      name: 'Amidinotransferase (AGAT)',
      ecNumber: 'EC 2.1.4.1',
      cofactors: [],
      description: 'Catalyzes the transfer of the amidino group from arginine to glycine, forming guanidinoacetate and ornithine'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First step in creatine synthesis, occurs in kidney',
      isReversible: false
    }
  },

  // Reaction 12: Guanidinoacetate → Creatine
  {
    id: 'rxn_single_carbon_12',
    name: 'Guanidinoacetate Methylation to Creatine',
    byreactant: ['SAM'],
    byproduct: ['SAH'],
    enzyme: {
      name: 'Guanidinoacetate methyltransferase (GAMT)',
      ecNumber: 'EC 2.1.1.2',
      cofactors: ['S-adenosylmethionine (SAM)'],
      description: 'Catalyzes the methylation of guanidinoacetate to creatine using SAM as methyl donor, producing SAH'
    },
    conditions: {
      location: 'Liver',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Second step in creatine synthesis, occurs in liver',
      isReversible: false
    }
  },

  // Reaction 13: Creatine → Creatinine (spontaneous, direct)
  {
    id: 'rxn_single_carbon_13',
    name: 'Creatine Degradation to Creatinine',
    byproduct: ['H₂O'],
    enzyme: {
      name: 'Spontaneous',
      ecNumber: 'N/A',
      cofactors: [],
      description: 'Non-enzymatic spontaneous degradation of creatine to creatinine, releasing water'
    },
    conditions: {
      location: 'Extracellular',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Spontaneous reaction, creatinine is excreted in urine',
      isReversible: false,
      notes: 'Spontaneous degradation, direct path'
    }
  },

  // Reaction 14: Creatine → Phosphocreatine
  {
    id: 'rxn_single_carbon_14',
    name: 'Creatine Phosphorylation',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Creatine kinase',
      ecNumber: 'EC 2.7.3.2',
      cofactors: ['ATP', 'Mg²⁺'],
      description: 'Catalyzes the reversible phosphorylation of creatine to phosphocreatine using ATP, important for energy buffering'
    },
    conditions: {
      location: 'Muscle, Brain',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction, critical for rapid ATP regeneration in muscle',
      isReversible: true
    }
  },

  // Reaction 15: Phosphocreatine → Creatinine (spontaneous)
  {
    id: 'rxn_single_carbon_15',
    name: 'Phosphocreatine Degradation to Creatinine',
    byproduct: ['Pi'],
    enzyme: {
      name: 'Spontaneous',
      ecNumber: 'N/A',
      cofactors: [],
      description: 'Non-enzymatic spontaneous degradation of phosphocreatine to creatinine, releasing inorganic phosphate'
    },
    conditions: {
      location: 'Extracellular',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Spontaneous reaction, creatinine is excreted in urine',
      isReversible: false,
      notes: 'Spontaneous degradation'
    }
  },

  // Methionine-Homocysteine Cycle Reactions

  // Reaction 16: N5,N10-methylene-THF → N5-methyl-THF
  {
    id: 'rxn_single_carbon_16',
    name: 'N5,N10-methylene-THF Reduction to N5-methyl-THF',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'Methylene-THF reductase (MTHFR)',
      ecNumber: 'EC 1.5.1.20',
      cofactors: ['NADPH', 'FAD'],
      description: 'Catalyzes the irreversible reduction of N5,N10-methylene-THF to N5-methyl-THF using NADPH'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Irreversible reaction, commits one-carbon units to methionine synthesis',
      isReversible: false
    }
  },

  // Reaction 17: N5-methyl-THF + Homocysteine → Methionine + THF
  {
    id: 'rxn_single_carbon_17',
    name: 'Homocysteine Remethylation to Methionine',
    byreactant: ['n5_methyl_thf'],
    byproduct: ['THF'],
    hideByreactantLabels: true,
    enzyme: {
      name: 'Homocysteine methyltransferase (Methionine synthase)',
      ecNumber: 'EC 2.1.1.13',
      cofactors: ['Vitamin B₁₂ (Cobalamin)'],
      description: 'Catalyzes the remethylation of homocysteine to methionine using N5-methyl-THF as methyl donor, regenerating THF'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Requires vitamin B12, regenerates THF for folate cycle',
      isReversible: false
    }
  },

  // Reaction 18: Methionine → SAM
  {
    id: 'rxn_single_carbon_18',
    name: 'Methionine to S-Adenosylmethionine',
    byreactant: ['ATP'],
    byproduct: ['PPi', 'Pi'],
    enzyme: {
      name: 'Methionine adenosyltransferase',
      ecNumber: 'EC 2.5.1.6',
      cofactors: ['ATP', 'Mg²⁺'],
      description: 'Catalyzes the activation of methionine to S-adenosylmethionine (SAM) using ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Rate-limiting step in SAM synthesis, highly regulated',
      isReversible: false
    }
  },

  // Reaction 19: SAM → SAH (via methylation)
  {
    id: 'rxn_single_carbon_19',
    name: 'SAM Methylation to SAH',
    byproduct: ['CH₃'],
    enzyme: {
      name: 'Various methyltransferases',
      ecNumber: 'Multiple EC numbers',
      cofactors: [],
      description: 'SAM serves as universal methyl donor for numerous methylation reactions, producing SAH and methylated substrates'
    },
    conditions: {
      location: 'Various',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Generic reaction representing SAM as methyl donor',
      isReversible: false,
      notes: 'Represents multiple methylation reactions using SAM'
    }
  },

  // Reaction 20: SAH → Homocysteine
  {
    id: 'rxn_single_carbon_20',
    name: 'S-Adenosylhomocysteine Hydrolysis',
    byproduct: ['adenosine_single_carbon'],
    hideByproductLabels: true,
    enzyme: {
      name: 'S-adenosylhomocysteine hydrolase',
      ecNumber: 'EC 3.3.1.1',
      cofactors: ['NAD⁺'],
      description: 'Catalyzes the reversible hydrolysis of SAH to homocysteine and adenosine'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction, product inhibition by adenosine',
      isReversible: true
    }
  },

  // Reaction 20a: Adenosine → Nucleotide Salvage
  {
    id: 'rxn_single_carbon_20a',
    name: 'Adenosine to Nucleotide Salvage',
    enzyme: {
      name: 'Adenosine kinase and other salvage pathway enzymes',
      ecNumber: 'Multiple',
      cofactors: ['ATP'],
      description: 'Adenosine is recycled through the nucleotide salvage pathway to regenerate nucleotides'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Important for nucleotide recycling and energy conservation',
      isReversible: false
    }
  },

  // Homocysteine Catabolism Pathway Reactions

  // Reaction 21: Homocysteine + Serine → Cystathionine
  {
    id: 'rxn_single_carbon_22',
    name: 'Cystathionine β-Synthase Reaction',
    byreactant: ['Serine'],
    enzyme: {
      name: 'Cystathionine β-synthase (CBS)',
      ecNumber: 'EC 4.2.1.22',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)', 'Heme'],
      description: 'Catalyzes the condensation of homocysteine with serine to form cystathionine, requires vitamin B6 as cofactor'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key step in transsulfuration pathway, regulated by SAM',
      isReversible: false
    }
  },

  // Reaction 22: Cystathionine → Cysteine + α-Ketobutyrate
  {
    id: 'rxn_single_carbon_23',
    name: 'Cystathionine γ-Lyase Reaction',
    byproduct: ['alpha_ketobutyrate'],
    hideByproductLabels: true,
    enzyme: {
      name: 'Cystathionine γ-lyase (CGL)',
      ecNumber: 'EC 4.4.1.1',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)'],
      description: 'Catalyzes the cleavage of cystathionine to cysteine and α-ketobutyrate, releasing ammonium ion, requires vitamin B6 as cofactor'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Second step in transsulfuration pathway, irreversible',
      isReversible: false
    }
  },

  // Reaction 22a: Cysteine → Glutathione, Coenzyme A
  {
    id: 'rxn_single_carbon_23a',
    name: 'Cysteine to Glutathione and Coenzyme A',
    enzyme: {
      name: 'Glutathione synthetase, γ-glutamylcysteine synthetase, and Coenzyme A synthetase',
      ecNumber: 'EC 6.3.2.2, EC 6.3.2.3, EC 2.7.1.33',
      cofactors: ['ATP'],
      description: 'Cysteine serves as a precursor for both glutathione (combining with glutamate and glycine to form a key antioxidant tripeptide) and coenzyme A (essential cofactor derived from cysteine, pantothenate, and ATP)'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Important for cellular antioxidant defense and cofactor biosynthesis',
      isReversible: false
    }
  },

  // Branch 1 Reactions

  // Reaction 23: Threonine → α-Ketobutyrate
  {
    id: 'rxn_single_carbon_28',
    name: 'Threonine Dehydration',
    byproduct: ['NH₄⁺'],
    enzyme: {
      name: 'Threonine dehydratase',
      ecNumber: 'EC 4.3.1.19',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)'],
      description: 'Catalyzes the dehydration of threonine to α-ketobutyrate, releasing ammonium ion and water, requires vitamin B6 as cofactor'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key step in threonine catabolism, irreversible',
      isReversible: false
    }
  },

  // Reaction 24: α-Ketobutyrate → Succinyl-CoA
  {
    id: 'rxn_single_carbon_29',
    name: 'α-Ketobutyrate Oxidation to Succinyl-CoA',
    byreactant: ['CoA', 'NAD⁺'],
    byproduct: ['NADH', 'CO₂'],
    enzyme: {
      name: 'α-Ketobutyrate dehydrogenase complex',
      ecNumber: 'EC 1.2.4.4',
      cofactors: ['Thiamine pyrophosphate', 'Lipoic acid', 'FAD', 'NAD⁺', 'CoA'],
      description: 'Catalyzes the oxidative decarboxylation of α-ketobutyrate to propionyl-CoA, which is then converted to succinyl-CoA via propionate metabolism in mitochondrial matrix'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Connects amino acid catabolism to TCA cycle',
      isReversible: false,
      notes: 'α-Ketobutyrate is converted to propionyl-CoA, then to succinyl-CoA via methylmalonyl-CoA'
    }
  },

  // Reaction 25: Succinyl-CoA → TCA Cycle
  {
    id: 'rxn_single_carbon_33',
    name: 'Succinyl-CoA Entry into TCA Cycle',
    enzyme: {
      name: 'Succinyl-CoA synthetase / TCA cycle',
      ecNumber: 'EC 6.2.1.4',
      cofactors: ['GDP/ADP', 'Pi'],
      description: 'Succinyl-CoA enters the TCA cycle and is converted to succinate, producing GTP (or ATP). This connects amino acid catabolism (threonine and cystathionine) to the citric acid cycle'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Connects threonine and cystathionine catabolism to central energy metabolism',
      isReversible: false,
      notes: 'Represents connection to citric acid cycle pathway'
    }
  },

  // Branch 2 Reactions

  // Reaction 26: Cysteine → Cysteine Sulfinate
  {
    id: 'rxn_single_carbon_24',
    name: 'Cysteine Sulfinate Formation',
    byreactant: ['O₂'],
    enzyme: {
      name: 'Cysteine sulfinate synthase',
      ecNumber: 'EC 4.1.1.29',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)'],
      description: 'Catalyzes the formation of cysteine sulfinate from cysteine, requires vitamin B6 as cofactor'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key step in cysteine catabolism, irreversible',
      isReversible: false
    }
  },

  // Reaction 27: Cysteine Sulfinate → β-Sulfinylpyruvate
  {
    id: 'rxn_single_carbon_30',
    name: 'Cysteine Sulfinate Transamination',
    byreactant: ['α-Ketoglutarate'],
    byproduct: ['Glutamate'],
    enzyme: {
      name: 'Aspartate aminotransferase / Transaminase',
      ecNumber: 'EC 2.6.1.1',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)'],
      description: 'Catalyzes the transamination of cysteine sulfinate to β-sulfinylpyruvate, using α-ketoglutarate as amino group acceptor to form glutamate, requires vitamin B6 as cofactor'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible transamination reaction',
      isReversible: true
    }
  },

  // Reaction 28: β-Sulfinylpyruvate → Pyruvate
  {
    id: 'rxn_single_carbon_31',
    name: 'β-Sulfinylpyruvate Desulfination',
    byproduct: ['SO₃²⁻'],
    enzyme: {
      name: 'Spontaneous / Sulfite release',
      ecNumber: 'N/A',
      cofactors: [],
      description: 'Spontaneous desulfination of β-sulfinylpyruvate to pyruvate, releasing sulfite (SO₃²⁻)'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Spontaneous reaction, sulfite is further oxidized to sulfate',
      isReversible: false,
      notes: 'Sulfite (SO₃²⁻) is oxidized to sulfate (SO₄²⁻) by sulfite oxidase'
    }
  },

  // Reaction 29: Cysteine Sulfinate → Hypotaurine
  {
    id: 'rxn_single_carbon_25',
    name: 'Cysteine Sulfinate Decarboxylation',
    byproduct: ['CO₂'],
    enzyme: {
      name: 'Cysteine sulfinate decarboxylase (CSAD)',
      ecNumber: 'EC 4.1.1.29',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)'],
      description: 'Catalyzes the decarboxylation of cysteine sulfinate to hypotaurine, releasing carbon dioxide, requires vitamin B6 as cofactor'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key step in taurine biosynthesis',
      isReversible: false
    }
  },

  // Reaction 30: Hypotaurine → Taurine
  {
    id: 'rxn_single_carbon_27',
    name: 'Hypotaurine Oxidation',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: 'Hypotaurine dehydrogenase',
      ecNumber: 'EC 1.8.1.3',
      cofactors: ['NAD⁺'],
      description: 'Catalyzes the oxidation of hypotaurine to taurine, using NAD⁺ as electron acceptor to produce NADH'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Final step in taurine biosynthesis',
      isReversible: false
    }
  },

  // Reaction 31: Taurine → Bile Salts
  {
    id: 'rxn_single_carbon_32',
    name: 'Taurine Conjugation to Bile Salts',
    byreactant: ['Bile acids'],
    enzyme: {
      name: 'Bile acid-CoA:amino acid N-acyltransferase (BAAT)',
      ecNumber: 'EC 2.3.1.65',
      cofactors: ['CoA'],
      description: 'Catalyzes the conjugation of taurine with bile acids to form taurine-conjugated bile salts (taurocholate, taurochenodeoxycholate, etc.)'
    },
    conditions: {
      location: 'Liver',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Important for bile salt formation and lipid digestion',
      isReversible: false,
      notes: 'Taurine can also conjugate with glycine to form glycocholate'
    }
  },
];

