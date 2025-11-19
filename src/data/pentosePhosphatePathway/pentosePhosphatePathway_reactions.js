/**
 * Pentose Phosphate Pathway - Reactions Data
 * 
 * Reactions represent enzymatic transformations
 * Each reaction has a unique ID and references node IDs for substrates/products
 * 
 * Optional fields:
 * - hideMainArrow: Boolean - If true, the main arrow for this reaction will not be drawn,
 *   but by-molecule arrows (byreactant/byproduct) will still be drawn if they exist
 * - displayByproduct: Array for curved arrow display (similar to pyruvate oxidation)
 */

export const pentosePhosphatePathwayReactions = [
  // 1. Glutathione Peroxidase: H2O2 + 2 GSH → 2 H2O + GSSG
  {
    id: 'rxn_ppp_1',
    name: 'Glutathione Peroxidase Reaction',
    byproduct: ['H₂O', 'glutathione_oxidized'],
    enzyme: {
      name: 'Glutathione Peroxidase',
      ecNumber: 'EC 1.11.1.9',
      description: 'Catalyzes the reduction of hydrogen peroxide to water using reduced glutathione (GSH), producing oxidized glutathione (GSSG)',
      cofactors: ['Selenium (Se)']
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Protects cells from oxidative damage by reducing H2O2',
      isReversible: false
    }
  },
  
  // 2. Glutathione Reductase: GSSG + NADPH → 2 GSH + NADP+
  {
    id: 'rxn_ppp_2',
    name: 'Glutathione Reductase Reaction',
    byproduct: ['nadp_plus', 'glutathione_reduced'],
    enzyme: {
      name: 'Glutathione Reductase',
      ecNumber: 'EC 1.8.1.7',
      description: 'Catalyzes the reduction of oxidized glutathione (GSSG) to reduced glutathione (GSH) using NADPH',
      cofactors: ['FAD', 'NADPH']
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Regenerates reduced glutathione for continued antioxidant function',
      isReversible: false
    }
  },
  
  // 3. Glucose-6-phosphate Dehydrogenase: glucose-6-phosphate → 6-phosphogluconolactone
  {
    id: 'rxn_ppp_3',
    name: 'Glucose-6-phosphate Dehydrogenation',
    byreactant: ['nadp_plus'],
    byproduct: ['nadph'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: 'Glucose-6-phosphate Dehydrogenase (G6PD)',
      ecNumber: 'EC 1.1.1.49',
      description: 'Catalyzes the oxidation of glucose-6-phosphate to 6-phosphogluconolactone, producing NADPH. This is the rate-limiting step of the pentose phosphate pathway.',
      cofactors: ['NADP⁺', 'Mg²⁺']
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key regulatory step; inhibited by NADPH (product inhibition) and activated by NADP+',
      isReversible: false
    }
  },
  
  // 4. Lactonase: 6-phosphogluconolactone → 6-phosphogluconate
  {
    id: 'rxn_ppp_4',
    name: '6-Phosphogluconolactone Hydrolysis',
    byreactant: ['H₂O'],
    byproduct: ['H⁺'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: '6-Phosphogluconolactonase',
      ecNumber: 'EC 3.1.1.31',
      description: 'Catalyzes the hydrolysis of 6-phosphogluconolactone to 6-phosphogluconate, releasing a proton',
      cofactors: []
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Spontaneous hydrolysis, enzyme-catalyzed for efficiency',
      isReversible: false
    }
  },
  
  // 5. 6-Phosphogluconate Dehydrogenase: 6-phosphogluconate → ribulose-5-phosphate
  {
    id: 'rxn_ppp_5',
    name: '6-Phosphogluconate Dehydrogenation and Decarboxylation',
    byreactant: ['NADP⁺'],
    byproduct: ['NADPH', 'CO₂'],
    enzyme: {
      name: '6-Phosphogluconate Dehydrogenase',
      ecNumber: 'EC 1.1.1.44',
      description: 'Catalyzes the oxidative decarboxylation of 6-phosphogluconate to ribulose-5-phosphate, producing NADPH and CO₂',
      cofactors: ['NADP⁺', 'Mg²⁺']
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Second NADPH-producing step of the oxidative phase',
      isReversible: false
    }
  },
  
  // 6. Ribose-5-phosphate Isomerase: ribulose-5-phosphate ↔ ribose-5-phosphate
  {
    id: 'rxn_ppp_6',
    name: 'Ribose-5-phosphate Isomerization',
    enzyme: {
      name: 'Ribose-5-phosphate Isomerase',
      ecNumber: 'EC 5.3.1.6',
      description: 'Catalyzes the reversible isomerization of ribulose-5-phosphate to ribose-5-phosphate',
      cofactors: []
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Equilibrium reaction, direction depends on substrate/product concentrations',
      isReversible: true
    }
  },
  
  // 7. PRPP Synthetase: ribose-5-phosphate → PRPP
  {
    id: 'rxn_ppp_7',
    name: 'PRPP Synthesis',
    byreactant: ['ATP'],
    byproduct: ['AMP', 'PPᵢ'],
    enzyme: {
      name: 'PRPP Synthetase (Ribose-phosphate pyrophosphokinase)',
      ecNumber: 'EC 2.7.6.1',
      description: 'Catalyzes the transfer of pyrophosphate from ATP to ribose-5-phosphate, forming PRPP (5-phosphoribosyl pyrophosphate)',
      cofactors: ['ATP', 'Mg²⁺']
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Key step in nucleotide synthesis; regulated by purine nucleotides',
      isReversible: false
    }
  },
  
  // 8. Nucleotide Synthesis: PRPP → nucleotides
  {
    id: 'rxn_ppp_8',
    name: 'Nucleotide Synthesis',
    byreactant: ['Amino acids', 'Formate', 'ATP'],
    enzyme: {
      name: 'Various Nucleotide Synthetases',
      ecNumber: 'Multiple EC numbers',
      description: 'PRPP serves as the precursor for synthesis of purine and pyrimidine nucleotides. Requires amino acids (glycine, aspartate, glutamine), formate, and ATP as building blocks.',
      cofactors: ['PRPP', 'Amino acids', 'Formate', 'ATP']
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Complex regulation involving multiple enzymes and feedback inhibition',
      isReversible: false
    }
  },
  
  // 9. Ribulose-5-phosphate Epimerase: ribulose-5-phosphate ↔ xylulose-5-phosphate
  {
    id: 'rxn_ppp_9',
    name: 'Ribulose-5-phosphate Epimerization',
    byproduct: ['xylulose_5_phosphate'],
    enzyme: {
      name: 'Ribulose-5-phosphate Epimerase',
      ecNumber: 'EC 5.1.3.1',
      description: 'Catalyzes the reversible epimerization of ribulose-5-phosphate to xylulose-5-phosphate at C-3',
      cofactors: []
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Equilibrium reaction, direction depends on substrate/product concentrations',
      isReversible: true
    }
  },
  
  // 10. Transketolase (first): xylulose-5-phosphate + ribose-5-phosphate → sedoheptulose-7-phosphate + glyceraldehyde-3-phosphate
  {
    id: 'rxn_ppp_10',
    name: 'Transketolase Reaction (First)',
    byproduct: ['glyceraldehyde_3_phosphate_pentose', 'xylulose_5_phosphate'],
    enzyme: {
      name: 'Transketolase',
      ecNumber: 'EC 2.2.1.1',
      description: 'Catalyzes the transfer of a two-carbon ketol group from xylulose-5-phosphate to ribose-5-phosphate, producing sedoheptulose-7-phosphate and glyceraldehyde-3-phosphate. Requires thiamine pyrophosphate (TPP) as cofactor.',
      cofactors: ['Thiamine pyrophosphate (TPP)', 'Mg²⁺']
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction, part of the non-oxidative phase',
      isReversible: true
    }
  },
  
  // 11. Transaldolase: sedoheptulose-7-phosphate + glyceraldehyde-3-phosphate → erythrose-4-phosphate + fructose-6-phosphate
  {
    id: 'rxn_ppp_11',
    name: 'Transaldolase Reaction',
    // byreactant: ['sedoheptulose_7_phosphate'],
    // byproduct: ['glyceraldehyde_3_phosphate_pentose'],
    byproduct: ['erythrose_4_phosphate', 'glyceraldehyde_3_phosphate_pentose'],
    enzyme: {
      name: 'Transaldolase',
      ecNumber: 'EC 2.2.1.2',
      description: 'Catalyzes the transfer of a three-carbon dihydroxyacetone group from sedoheptulose-7-phosphate to glyceraldehyde-3-phosphate, producing erythrose-4-phosphate and fructose-6-phosphate',
      cofactors: []
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction, part of the non-oxidative phase',
      isReversible: true
    }
  },
  
  // 12. Transketolase (second): xylulose-5-phosphate + erythrose-4-phosphate → fructose-6-phosphate + glyceraldehyde-3-phosphate
  {
    id: 'rxn_ppp_12',
    name: 'Transketolase Reaction (Second)',
    byproduct: ['xylulose_5_phosphate_pentose_2', 'glyceraldehyde_3_phosphate'],
    enzyme: {
      name: 'Transketolase',
      ecNumber: 'EC 2.2.1.1',
      description: 'Catalyzes the transfer of a two-carbon ketol group from xylulose-5-phosphate to erythrose-4-phosphate, producing fructose-6-phosphate and glyceraldehyde-3-phosphate. Requires thiamine pyrophosphate (TPP) as cofactor.',
      cofactors: ['Thiamine pyrophosphate (TPP)', 'Mg²⁺']
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Reversible reaction, part of the non-oxidative phase',
      isReversible: true
    }
  }
];

