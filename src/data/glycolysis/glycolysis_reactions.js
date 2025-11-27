/**
 * Glycolysis Pathway - Reactions Data
 */

export const glycolysisReactions = [
  {
    id: 'rxn_glycolysis_1',
    name: 'Glucose Phosphorylation',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Hexokinase',
      ecNumber: 'EC 2.7.1.1',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of glucose to glucose-6-phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Inhibited by glucose-6-phosphate (product inhibition)',
      isReversible: false
    }
  },
  {
    id: 'rxn_glycolysis_2',
    name: 'Glucose-6-phosphate Isomerization',
    enzyme: {
      name: 'Phosphoglucose Isomerase',
      ecNumber: 'EC 5.3.1.9',
      cofactors: ['None'],
      description: 'Converts glucose-6-phosphate to fructose-6-phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Near equilibrium reaction',
      isReversible: true
    }
  },
  {
    id: 'rxn_glycolysis_3',
    name: 'Fructose-6-phosphate Phosphorylation',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Phosphofructokinase-1 (PFK-1)',
      ecNumber: 'EC 2.7.1.11',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of fructose-6-phosphate to fructose-1,6-bisphosphate. This is a key regulatory step.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Allosterically inhibited by ATP and citrate; activated by AMP and fructose-2,6-bisphosphate',
      isReversible: false
    }
  },
  {
    id: 'rxn_glycolysis_4',
    name: 'Fructose-1,6-bisphosphate Cleavage',
    enzyme: {
      name: 'Aldolase',
      ecNumber: 'EC 4.1.2.13',
      cofactors: ['None'],
      description: 'Cleaves fructose-1,6-bisphosphate into two triose phosphates'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Near equilibrium reaction',
      isReversible: true
    }
  },
  {
    id: 'rxn_glycolysis_5',
    name: 'Triose Phosphate Isomerization',
    enzyme: {
      name: 'Triose Phosphate Isomerase',
      ecNumber: 'EC 5.3.1.1',
      cofactors: ['None'],
      description: 'Converts dihydroxyacetone phosphate to glyceraldehyde-3-phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Near equilibrium, very fast reaction',
      isReversible: true
    }
  },
  {
    id: 'rxn_glycolysis_6',
    name: 'Glyceraldehyde-3-phosphate Oxidation',
    byreactant: ['NAD⁺', 'Pi'],
    byproduct: ['NADH'],
    enzyme: {
      name: 'Glyceraldehyde-3-phosphate Dehydrogenase',
      ecNumber: 'EC 1.2.1.12',
      cofactors: ['NAD⁺', 'Pi (inorganic phosphate)'],
      description: 'Oxidizes glyceraldehyde-3-phosphate and reduces NAD⁺ to NADH'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Requires NAD⁺ and inorganic phosphate',
      isReversible: true
    }
  },
  {
    id: 'rxn_glycolysis_7',
    name: '1,3-Bisphosphoglycerate Dephosphorylation',
    byreactant: ['ADP'],
    byproduct: ['ATP'],
    enzyme: {
      name: 'Phosphoglycerate Kinase',
      ecNumber: 'EC 2.7.2.3',
      cofactors: ['Mg²⁺'],
      description: 'Transfers phosphate from 1,3-bisphosphoglycerate to ADP, producing ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Substrate-level phosphorylation',
      isReversible: true
    }
  },
  {
    id: 'rxn_glycolysis_8',
    name: '3-Phosphoglycerate Rearrangement',
    enzyme: {
      name: 'Phosphoglycerate Mutase',
      ecNumber: 'EC 5.4.2.11',
      cofactors: ['2,3-Bisphosphoglycerate (cofactor)'],
      description: 'Converts 3-phosphoglycerate to 2-phosphoglycerate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Near equilibrium reaction',
      isReversible: true
    }
  },
  {
    id: 'rxn_glycolysis_9',
    name: '2-Phosphoglycerate Dehydration',
    byproduct: ['H₂O'],
    enzyme: {
      name: 'Enolase',
      ecNumber: 'EC 4.2.1.11',
      cofactors: ['Mg²⁺'],
      description: 'Dehydrates 2-phosphoglycerate to form phosphoenolpyruvate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Inhibited by fluoride',
      isReversible: true
    }
  },
  {
    id: 'rxn_glycolysis_10',
    name: 'Phosphoenolpyruvate Dephosphorylation',
    byreactant: ['ADP'],
    byproduct: ['ATP'],
    enzyme: {
      name: 'Pyruvate Kinase',
      ecNumber: 'EC 2.7.1.40',
      cofactors: ['K⁺', 'Mg²⁺'],
      description: 'Transfers phosphate from PEP to ADP, producing ATP and pyruvate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Allosterically activated by fructose-1,6-bisphosphate; inhibited by ATP and alanine',
      isReversible: false
    }
  },

  // Polyol Pathway
  {
    id: 'rxn_aldose_reductase',
    name: 'Glucose to Sorbitol Reduction',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'Aldose Reductase',
      ecNumber: 'EC 1.1.1.21',
      cofactors: ['NADPH'],
      description: 'Catalyzes the reduction of glucose to sorbitol using NADPH as a cofactor'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the polyol pathway, important in diabetes and hyperglycemia',
      isReversible: false
    }
  },
  {
    id: 'rxn_sorbitol_dehydrogenase',
    name: 'Sorbitol to Fructose Oxidation',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: 'Sorbitol Dehydrogenase',
      ecNumber: 'EC 1.1.1.14',
      cofactors: ['NAD⁺'],
      description: 'Catalyzes the oxidation of sorbitol to fructose using NAD⁺ as a cofactor'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the polyol pathway, converts sorbitol to fructose',
      isReversible: true
    }
  },

  // Mannose Pathway
  {
    id: 'rxn_mannose_kinase',
    name: 'Mannose Phosphorylation',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Hexokinase',
      ecNumber: 'EC 2.7.1.1',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of mannose to mannose-6-phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Same enzyme as glucose phosphorylation',
      isReversible: false
    }
  },
  {
    id: 'rxn_phosphomannose_isomerase',
    name: 'Mannose-6-phosphate Isomerization',
    enzyme: {
      name: 'Phosphomannose Isomerase',
      ecNumber: 'EC 5.3.1.8',
      cofactors: ['None'],
      description: 'Converts mannose-6-phosphate to fructose-6-phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Near equilibrium reaction',
      isReversible: true
    }
  },
  {
    id: 'rxn_phosphofructokinase_2',
    name: 'Fructose-6-phosphate to Fructose-2,6-bisphosphate',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Phosphofructokinase-2 (PFK-2)',
      ecNumber: 'EC 2.7.1.105',
      cofactors: ['Mg²⁺'],
      description: 'Bifunctional enzyme that phosphorylates fructose-6-phosphate to fructose-2,6-bisphosphate. Part of the PFK-2/FBPase-2 bifunctional enzyme complex.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Regulated by hormonal signals; fructose-2,6-bisphosphate is a key allosteric regulator of PFK-1',
      isReversible: false
    }
  },
  {
    id: 'rxn_fructose_bisphosphatase_2',
    name: 'Fructose-2,6-bisphosphate to Fructose-6-phosphate',
    byreactant: ['ADP'],
    byproduct: ['ATP'],
    enzyme: {
      name: 'Fructose Bisphosphatase-2 (FBPase-2)',
      ecNumber: 'EC 3.1.3.46',
      cofactors: ['None'],
      description: 'Bifunctional enzyme that dephosphorylates fructose-2,6-bisphosphate to fructose-6-phosphate. Part of the PFK-2/FBPase-2 bifunctional enzyme complex.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Regulated by hormonal signals; opposite activity of PFK-2',
      isReversible: false
    }
  },
  {
    id: 'rxn_glutamine_f6p_aminotransferase',
    name: 'Glucosamine-6-phosphate Synthesis',
    byreactant: ['Glutamine'],
    byproduct: ['Glutamate'],
    enzyme: {
      name: 'Glutamine:F6P Aminotransferase',
      ecNumber: 'EC 2.6.1.16',
      cofactors: ['B₆ (Pyridoxal phosphate)'],
      description: 'Catalyzes the conversion of fructose-6-phosphate to glucosamine-6-phosphate using glutamine as the amino donor'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First committed step in hexosamine biosynthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_gags_synthesis',
    name: 'Glycosaminoglycan Synthesis',
    enzyme: {
      name: 'Multiple enzymes',
      ecNumber: 'N/A',
      cofactors: ['UDP-sugars'],
      description: 'Complex pathway leading from glucosamine-6-phosphate to glycosaminoglycans (GAGs)'
    },
    conditions: {
      location: 'Cytoplasm and Golgi',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Involves multiple enzymatic steps',
      isReversible: false
    }
  },

  // Glycerol Pathway
  {
    id: 'rxn_glycerol_kinase',
    name: 'Glycerol Phosphorylation',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Glycerol Kinase',
      ecNumber: 'EC 2.7.1.30',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of glycerol to glycerol-3-phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Regulated by glycerol availability',
      isReversible: false
    }
  },
  {
    id: 'rxn_glycerol_3_phosphate_dehydrogenase',
    name: 'Glycerol-3-phosphate Oxidation',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: 'Glycerol-3-phosphate Dehydrogenase',
      ecNumber: 'EC 1.1.1.8',
      cofactors: ['NAD⁺'],
      description: 'Oxidizes glycerol-3-phosphate to dihydroxyacetone phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Near equilibrium reaction',
      isReversible: true
    }
  },
  {
    id: 'rxn_mitochondrial_glycerol_3_phosphate_dehydrogenase',
    name: 'Mitochondrial Glycerol-3-phosphate Oxidation',
    byproduct: ['dihydroxyacetone_phosphate', 'fadh2_glycolysis'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: 'Mitochondrial Glycerol-3-phosphate Dehydrogenase (Flavoprotein)',
      ecNumber: 'EC 1.1.5.3',
      cofactors: ['FAD'],
      description: 'Oxidizes glycerol-3-phosphate to dihydroxyacetone phosphate in the mitochondrial matrix, reducing FAD to FADH₂'
    },
    conditions: {
      location: 'Mitochondrial Matrix',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Links cytoplasmic glycerol metabolism to electron transport chain',
      isReversible: false
    }
  },
  {
    id: 'rxn_fadh2_to_coenzyme_q',
    name: 'FADH₂ to Coenzyme Q Electron Transfer',
    byproduct: ['coenzyme_q_reduced', 'fad_glycolysis'],
    hideByproductLabels: true,
    enzyme: {
      name: 'Electron Transfer System',
      ecNumber: 'N/A',
      cofactors: ['None'],
      description: 'Transfers electrons from FADH₂ to Coenzyme Q, reducing it'
    },
    conditions: {
      location: 'Mitochondrial Matrix',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of electron transport chain',
      isReversible: false
    }
  },
  {
    id: 'rxn_fructokinase',
    name: 'Fructose Phosphorylation',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Fructokinase',
      ecNumber: 'EC 2.7.1.4',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of fructose to fructose-1-phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Regulated by fructose availability',
      isReversible: false
    }
  },
  {
    id: 'rxn_fructose_1p_aldolase',
    name: 'Fructose-1-phosphate Cleavage',
    enzyme: {
      name: 'Fructose-1-P Aldolase (Aldolase B)',
      ecNumber: 'EC 4.1.2.13',
      cofactors: ['None'],
      description: 'Cleaves fructose-1-phosphate into dihydroxyacetone phosphate and glyceraldehyde'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Near equilibrium reaction',
      isReversible: true
    }
  },
  {
    id: 'rxn_triose_kinase',
    name: 'Glyceraldehyde Phosphorylation',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Triose Kinase',
      ecNumber: 'EC 2.7.1.28',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of glyceraldehyde to glyceraldehyde-3-phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Regulated by glyceraldehyde availability',
      isReversible: false
    }
  },
  {
    id: 'rxn_bisphosphoglycerate_mutase',
    name: '1,3-Bisphosphoglycerate to 2,3-Bisphosphoglycerate',
    enzyme: {
      name: 'Bisphosphoglycerate Mutase',
      ecNumber: 'EC 5.4.2.4',
      cofactors: ['None'],
      description: 'Converts 1,3-bisphosphoglycerate to 2,3-bisphosphoglycerate by transferring the phosphate from position 1 to position 2'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Alternative pathway for phosphoglycerate mutase',
      isReversible: true
    }
  },
  {
    id: 'rxn_bisphosphoglycerate_phosphatase',
    name: '2,3-Bisphosphoglycerate Dephosphorylation',
    byproduct: ['Pi'],
    enzyme: {
      name: 'Bisphosphoglycerate Phosphatase',
      ecNumber: 'EC 3.1.3.13',
      cofactors: ['None'],
      description: 'Converts 2,3-bisphosphoglycerate to 2-phosphoglycerate, releasing inorganic phosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Alternative pathway for phosphoglycerate mutase',
      isReversible: false
    }
  },
  {
    id: 'rxn_malate_dehydrogenase',
    name: 'Malate Dehydrogenase',
    byreactant: ['NADH'],
    byproduct: ['NAD⁺'],
    enzyme: {
      name: 'Malate Dehydrogenase (Cytosolic)',
      ecNumber: 'EC 1.1.1.37',
      cofactors: ['NAD⁺/NADH'],
      description: 'Interconverts oxaloacetate and malate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of malate-aspartate shuttle',
      isReversible: true
    }
  },
  {
    id: 'rxn_pep_carboxykinase',
    name: 'Phosphoenolpyruvate Carboxykinase',
    byreactant: ['GTP'],
    byproduct: ['GDP', 'CO₂'],
    enzyme: {
      name: 'Phosphoenolpyruvate Carboxykinase (PEPCK)',
      ecNumber: 'EC 4.1.1.32',
      cofactors: ['Mn²⁺', 'Mg²⁺'],
      description: 'Converts oxaloacetate to phosphoenolpyruvate, a rate-limiting step in gluconeogenesis'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Regulated by gene expression',
      isReversible: false
    }
  },
  {
    id: 'rxn_malic_enzyme',
    name: 'Malic Enzyme',
    byreactant: ['NADP⁺'],
    byproduct: ['NADPH', 'CO₂'],
    enzyme: {
      name: 'Malic Enzyme',
      ecNumber: 'EC 1.1.1.40',
      cofactors: ['Mn²⁺', 'Mg²⁺'],
      description: 'Decarboxylates malate to pyruvate, generating NADPH'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Source of cytosolic NADPH',
      isReversible: false
    }
  },
  {
    id: 'rxn_fermentation_1',
    name: 'Lactate Fermentation',
    byreactant: ['NADH'],
    byproduct: ['NAD⁺'],
    enzyme: {
      name: 'Lactate Dehydrogenase',
      ecNumber: '1.1.1.27',
      description: 'Catalyzes the reduction of pyruvate to lactate, regenerating NAD⁺',
      cofactors: ['NADH', 'NAD⁺']
    },
    conditions: {
      location: 'Cytoplasm',
      requirement: 'Anaerobic conditions',
      notes: 'Regenerates NAD⁺ for continued glycolysis under anaerobic conditions'
    }
  },
  {
    id: 'rxn_pyruvate_transamination',
    name: 'Pyruvate Transamination',
    byreactant: ['glutamine_glycolysis'],
    byproduct: ['alpha_ketoglutarate_glycolysis'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: 'Alanine Transaminase (ALT)',
      ecNumber: '2.6.1.2',
      description: 'Catalyzes the transamination of pyruvate to alanine, using glutamine as amino group donor and producing α-ketoglutarate',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)']
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      requirement: 'Reversible transamination reaction',
      notes: 'Converts pyruvate to alanine via transamination, connecting amino acid metabolism with glycolysis',
      isReversible: true
    }
  },
  {
    id: 'rxn_ast_mito_shuttle',
    name: 'Aspartate Aminotransferase (Mitochondrial)',
    byproduct: ['alpha_ketoglutarate_mito_shuttle', 'aspartate_mito_shuttle'],
    hideByproductLabels: true,
    enzyme: {
      name: 'Aspartate Aminotransferase (AST)',
      ecNumber: '2.6.1.1',
      description: 'Catalyzes the reversible transamination between glutamate and oxaloacetate to form α-ketoglutarate and aspartate in the mitochondrial matrix',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      ph: '7.0-7.4',
      temperature: '37°C',
      requirement: 'Reversible transamination reaction',
      notes: 'Part of the malate-aspartate shuttle, transfers reducing equivalents across mitochondrial membrane',
      isReversible: true
    }
  },
  {
    id: 'rxn_shuttle_transport_glutamate',
    name: 'Glutamate Transport (Mitochondrial)',
    byproduct: ['glutamate_cyto_shuttle'],
    hideByproductLabels: true,
    enzyme: {
      name: 'Glutamate/Aspartate Transporter',
      ecNumber: 'N/A',
      description: 'Transports glutamate from mitochondrial matrix to cytosol',
      cofactors: []
    },
    conditions: {
      location: 'Mitochondrial membrane',
      ph: '7.0-7.4',
      temperature: '37°C',
      requirement: 'Active transport',
      notes: 'Part of the malate-aspartate shuttle, exchanges glutamate across the mitochondrial membrane',
      isReversible: true
    }
  },
  {
    id: 'rxn_shuttle_transport_aspartate',
    name: 'Aspartate Transport (Mitochondrial)',
    enzyme: {
      name: 'Glutamate/Aspartate Transporter',
      ecNumber: 'N/A',
      description: 'Transports aspartate from cytosol to mitochondrial matrix',
      cofactors: []
    },
    conditions: {
      location: 'Mitochondrial membrane',
      ph: '7.0-7.4',
      temperature: '37°C',
      requirement: 'Active transport',
      notes: 'Part of the malate-aspartate shuttle, exchanges aspartate across the mitochondrial membrane',
    }
  },
  {
    id: 'rxn_shuttle_transport_ketoglutarate',
    name: 'α-Ketoglutarate Transport (Mitochondrial)',
    enzyme: {
      name: 'Dicarboxylate Transporter',
      ecNumber: 'N/A',
      description: 'Transports α-ketoglutarate from mitochondrial matrix to cytosol',
      cofactors: []
    },
    conditions: {
      location: 'Mitochondrial membrane',
      ph: '7.0-7.4',
      temperature: '37°C',
      requirement: 'Active transport',
      notes: 'Part of the malate-aspartate shuttle, exchanges α-ketoglutarate across the mitochondrial membrane',
      isReversible: true
    }
  },
  {
    id: 'rxn_ast_cyto_shuttle',
    name: 'Aspartate Aminotransferase (Cytosolic)',
    byproduct: ['oxaloacetate_cyto_shuttle', 'glutamate_cyto_shuttle'],
    hideByproductLabels: true,
    enzyme: {
      name: 'Aspartate Aminotransferase (AST)',
      ecNumber: '2.6.1.1',
      description: 'Catalyzes the reversible transamination between aspartate and α-ketoglutarate to form oxaloacetate and glutamate in the cytosol',
      cofactors: ['Vitamin B₆ (Pyridoxal phosphate)']
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      requirement: 'Reversible transamination reaction',
      notes: 'Part of the malate-aspartate shuttle, transfers reducing equivalents across mitochondrial membrane',
      isReversible: true
    }
  },
  {
    id: 'rxn_shuttle_transport_citrate',
    name: 'Citrate Transport (Mitochondrial)',
    enzyme: {
      name: 'Tricarboxylate Transporter',
      ecNumber: 'N/A',
      description: 'Transports citrate from mitochondrial matrix to cytosol',
      cofactors: []
    },
    conditions: {
      location: 'Mitochondrial membrane',
      ph: '7.0-7.4',
      temperature: '37°C',
      requirement: 'Active transport',
      notes: 'Transports citrate from mitochondria to cytosol for fatty acid synthesis and other cytosolic processes',
      isReversible: true
    }
  }
];

