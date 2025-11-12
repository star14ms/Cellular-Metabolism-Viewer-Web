/**
 * Electron Transport Chain (ETC) / Oxidative Phosphorylation Pathway Data
 * 
 * The ETC uses NADH and FADH2 from previous pathways to create a proton gradient
 * that drives ATP synthesis through ATP synthase.
 * 
 * Protein complexes are marked with isProteinComplex: true for special rendering
 * Mobile carriers (CoQ, Cyt c) are separate nodes
 */

export const electronTransportChainReactions = [
  {
    step: 1,
    name: 'Transporting Electron from NADH to Ubiquinone',
    substrate: {
      id: 'complex_i',
      name: 'Complex I: NADH Dehydrogenase',
      formula: '',
      description: 'Complex I (NADH Dehydrogenase) is the first protein complex in the electron transport chain. It transfers electrons from NADH to ubiquinone (CoQ) and pumps 4 protons across the inner mitochondrial membrane from the matrix to the intermembrane space, contributing to the proton gradient used for ATP synthesis.',
      smiles: '',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/NADH_Dehydrogenase_Mechanism_%28Fixed%29.png/1000px-NADH_Dehydrogenase_Mechanism_%28Fixed%29.png'
    },
    product: {
      id: 'coenzyme_q',
      name: 'Coenzyme Q (Ubiquinone/Ubiquinol)',
      formula: 'C₅₉H₉₂O₄',
      description: 'Coenzyme Q (CoQ), also known as ubiquinone, is a mobile electron carrier embedded in the inner mitochondrial membrane. It exists in oxidized (ubiquinone, Q) and reduced (ubiquinol, QH₂) forms.',
      smiles: 'CC1=C(C(=O)C(=C(C1=O)OC)OC)CC=C(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCC'
    },
    enzyme: {
      name: 'NADH Dehydrogenase (Complex I)',
      ecNumber: 'EC 1.6.5.3',
      description: 'Transfers electrons from NADH to ubiquinone, pumps 4 H⁺ across membrane',
      cofactors: ['FMN', 'Iron-sulfur clusters', 'Ubiquinone (CoQ)']
    },
    byreactant: 'NADH', // For display on map
    byproduct: 'NAD⁺', // For display on map
    // Special subarrows for ETC (only H+ pumping, oxidation is handled by by-molecule arrows)
    etcSubArrows: {
      // H+ pumping arrow (upward, showing H+ pumped to intermembrane space)
      hPlusPump: {
        type: 'proton-pump',
        from: 'H⁺ (matrix)',
        to: 'H⁺ (intermembrane space)',
        direction: 'up',
        count: 4, // 4 H+ per NADH
        offset: { x: 0, y: 0 } // Centered
      }
    },
    conditions: {
      location: 'Inner mitochondrial membrane',
      ph: '~7.0-7.4 (matrix)',
      temperature: '37°C',
      isReversible: false,
      regulation: 'Regulated by NADH/NAD⁺ ratio and ATP/ADP ratio',
      requirement: 'Aerobic conditions',
      notes: 'Pumps 4 protons from matrix to intermembrane space per NADH'
    },
    isProteinComplex: true, // Mark as protein complex for special rendering
    complexNumber: 'I',
    complexSize: { width: 80, height: 60 }, // Larger size for protein complexes
    position: {
      x: -55,
      y: 2673
    }
  },
  {
    step: 2,
    name: 'Transporting Electron from FADH₂ to Ubiquinone',
    substrate: {
      id: 'complex_ii',
      name: 'Complex II: Succinate Dehydrogenase',
      formula: '',
      description: 'Complex II (Succinate Dehydrogenase) is both part of the citric acid cycle and the electron transport chain. It oxidizes succinate to fumarate, transferring electrons to ubiquinone (CoQ) via FADH₂. Unlike Complex I, III, and IV, Complex II does not pump protons across the membrane.',
      smiles: '',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Succinate_Dehydrogenase_1YQ3_and_Membrane.png/500px-Succinate_Dehydrogenase_1YQ3_and_Membrane.png'
    },
    product: {
      id: 'coenzyme_q',
      name: 'Coenzyme Q (Ubiquinone/Ubiquinol)',
      formula: 'C₅₉H₉₂O₄',
      description: 'Coenzyme Q (CoQ), also known as ubiquinone, is a mobile electron carrier embedded in the inner mitochondrial membrane. It exists in oxidized (ubiquinone, Q) and reduced (ubiquinol, QH₂) forms.',
      smiles: 'CC1=C(C(=O)C(=C(C1=O)OC)OC)CC=C(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCC'
    },
    enzyme: {
      name: 'Succinate Dehydrogenase (Complex II)',
      ecNumber: 'EC 1.3.5.1',
      description: 'Oxidizes succinate to fumarate, transfers electrons to ubiquinone, does not pump protons',
      cofactors: ['FAD', 'Iron-sulfur clusters', 'Ubiquinone (CoQ)']
    },
    byreactant: ['FADH₂'], // For display on map
    byproduct: {
      name: 'FAD'
    },
    byMoleculeAngle: -10,
    hideByMoleculeLabels: true, // Hide labels but keep arrows
    // Complex II does not pump protons, so no etcSubArrows needed
    conditions: {
      location: 'Inner mitochondrial membrane',
      ph: '~7.0-7.4 (matrix)',
      temperature: '37°C',
      isReversible: false,
      regulation: 'Part of citric acid cycle, feeds electrons to ETC without proton pumping',
      requirement: 'Aerobic conditions',
      notes: 'Part of citric acid cycle, feeds electrons to ETC without proton pumping'
    },
    isProteinComplex: true,
    complexNumber: 'II',
    complexSize: { width: 80, height: 60 },
    position: {
      x: 95,
      y: 2573
    }
  },
  {
    step: 3,
    name: 'Transporting Electron from Ubiquinol to Complex III',
    substrate: {
      id: 'coenzyme_q',
      name: 'Coenzyme Q (Ubiquinone/Ubiquinol)',
      formula: 'C₅₉H₉₂O₄',
      description: 'Coenzyme Q (CoQ), also known as ubiquinone, is a mobile electron carrier embedded in the inner mitochondrial membrane. It exists in oxidized (ubiquinone, Q) and reduced (ubiquinol, QH₂) forms. CoQ receives electrons from Complex I and Complex II and transfers them to Complex III, shuttling electrons through the membrane.',
      smiles: 'CC1=C(C(=O)C(=C(C1=O)OC)OC)CC=C(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCC'
    },
    product: {
      id: 'complex_iii',
      name: 'Complex III: Cytochrome bc₁ Complex',
      formula: '',
      description: 'Complex III (Cytochrome bc₁ Complex) transfers electrons from ubiquinol (QH₂) to cytochrome c. It uses the Q cycle mechanism to pump 4 protons across the inner mitochondrial membrane per pair of electrons transferred, contributing to the proton gradient.',
      smiles: '',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Cytochrome1ntz.PNG/500px-Cytochrome1ntz.PNG'
    },
    enzyme: {
      name: 'Coenzyme Q (Ubiquinone)',
      ecNumber: '',
      description: 'Mobile electron carrier in the inner mitochondrial membrane',
      cofactors: []
    },
    conditions: {
      location: 'Inner mitochondrial membrane',
      ph: '~7.0-7.4',
      temperature: '37°C',
      isReversible: true,
      regulation: 'Mobile electron carrier',
      requirement: 'Mobile carrier',
      notes: 'Receives electrons from Complex I and II, transfers to Complex III'
    },
    isMobileCarrier: true, // Mark as mobile carrier (smaller, circular)
    position: {
      x: 245,
      y: 2673
    }
  },
  {
    step: 4,
    name: 'Transporting Electron from Complex III to Cytochrome c',
    substrate: {
      id: 'complex_iii',
      name: 'Complex III: Cytochrome bc₁ Complex',
      formula: '',
      description: 'Complex III (Cytochrome bc₁ Complex) transfers electrons from ubiquinol (QH₂) to cytochrome c. It uses the Q cycle mechanism to pump 4 protons across the inner mitochondrial membrane per pair of electrons transferred, contributing to the proton gradient.',
      smiles: '',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Cytochrome1ntz.PNG/500px-Cytochrome1ntz.PNG'
    },
    product: {
      id: 'cytochrome_c',
      name: 'Cytochrome c',
      formula: 'C₄₂H₅₆FeN₈O₆S₂',
      description: 'Cytochrome c',
      smiles: '[Fe+2]'
    },
    enzyme: {
      name: 'Cytochrome bc₁ Complex (Complex III)',
      ecNumber: 'EC 1.10.2.2',
      description: 'Transfers electrons from ubiquinol to cytochrome c, pumps 4 H⁺ across membrane',
      cofactors: ['Cytochrome b', 'Cytochrome c₁', 'Rieske iron-sulfur protein']
    },
    // Special subarrows for ETC
    etcSubArrows: {
      // H+ pumping arrow (upward, showing H+ pumped to intermembrane space)
      hPlusPump: {
        type: 'proton-pump',
        from: 'H⁺ (matrix)',
        to: 'H⁺ (intermembrane space)',
        direction: 'up',
        count: 4, // 4 H+ per QH2
        offset: { x: 0, y: 0 }
      }
    },
    conditions: {
      location: 'Inner mitochondrial membrane',
      ph: '~7.0-7.4 (matrix)',
      temperature: '37°C',
      isReversible: false,
      regulation: 'Regulated by ubiquinol availability and cytochrome c reduction state',
      requirement: 'Aerobic conditions',
      notes: 'Pumps 4 protons per QH₂ oxidized'
    },
    isProteinComplex: true,
    complexNumber: 'III',
    complexSize: { width: 80, height: 60 },
    position: {
      x: 395,
      y: 2673
    }
  },
  {
    step: 5,
    name: 'Transporting Electron from Cytochrome c to Complex IV',
    substrate: {
      id: 'cytochrome_c',
      name: 'Cytochrome c',
      formula: 'C₄₂H₅₆FeN₈O₆S₂',
      description: 'Cytochrome c is a small mobile electron carrier protein located in the intermembrane space of mitochondria. It exists in reduced (Fe²⁺) and oxidized (Fe³⁺) forms. Cytochrome c receives electrons from Complex III and transfers them to Complex IV, completing the electron transport chain.',
      smiles: '[Fe+2]'
    },
    product: {
      id: 'complex_iv',
      name: 'Complex IV: Cytochrome c Oxidase',
      formula: '',
      description: 'Complex IV (Cytochrome c Oxidase) is the final protein complex in the electron transport chain. It receives electrons from cytochrome c and transfers them to molecular oxygen (O₂), reducing it to water (H₂O). Complex IV pumps 2 protons across the membrane per pair of electrons, completing the electron transport process.',
      smiles: '',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Cytochrome_C_Oxidase_1OCC_in_Membrane_2.png/1600px-Cytochrome_C_Oxidase_1OCC_in_Membrane_2.png?20070214103010'
    },
    enzyme: {
      name: 'Cytochrome c',
      ecNumber: '',
      description: 'Mobile electron carrier in the intermembrane space',
      cofactors: []
    },
    conditions: {
      location: 'Intermembrane space',
      ph: '~7.0-7.4',
      temperature: '37°C',
      isReversible: true,
      regulation: 'Mobile electron carrier',
      requirement: 'Mobile carrier',
      notes: 'Receives electrons from Complex III, transfers to Complex IV'
    },
    isMobileCarrier: true,
    position: {
      x: 545,
      y: 2673
    }
  },
  {
    step: 6,
    name: 'Transporting Electron from Cytochrome c to O₂',
    substrate: {
      id: 'complex_iv',
      name: 'Complex IV: Cytochrome c Oxidase',
      formula: '',
      description: 'Complex IV (Cytochrome c Oxidase) is the final protein complex in the electron transport chain. It receives electrons from cytochrome c and transfers them to molecular oxygen (O₂), reducing it to water (H₂O). Complex IV pumps 2 protons across the membrane per pair of electrons, completing the electron transport process.',
      smiles: '',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Cytochrome_C_Oxidase_1OCC_in_Membrane_2.png/1600px-Cytochrome_C_Oxidase_1OCC_in_Membrane_2.png?20070214103010'
    },
    product: {
      id: 'complex_v',
      name: 'Complex V: ATP Synthase',
      formula: '',
      description: 'Complex V (ATP Synthase) is the enzyme complex that synthesizes ATP from ADP and inorganic phosphate (Pi). It uses the proton gradient created by Complexes I, III, and IV to drive ATP synthesis. As protons flow back from the intermembrane space to the matrix through the F₀ subunit, the F₁ subunit catalyzes ATP formation. This process is called oxidative phosphorylation.',
      smiles: '',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Atp_synthase.PNG'
    },
    enzyme: {
      name: 'Cytochrome c Oxidase (Complex IV)',
      ecNumber: 'EC 1.9.3.1',
      description: 'Final electron acceptor, reduces O₂ to H₂O, pumps 2 H⁺ across membrane',
      cofactors: ['Cytochrome a', 'Cytochrome a₃', 'CuA', 'CuB']
    },
    byreactant: ['1/2 O₂', '2 H⁺'],
    byproduct: {
      molecules: ['H₂O']
    },
    // Special subarrows for ETC
    etcSubArrows: {
      // H+ pumping arrow (upward, showing H+ pumped to intermembrane space)
      hPlusPump: {
        type: 'proton-pump',
        from: 'H⁺ (matrix)',
        to: 'H⁺ (intermembrane space)',
        direction: 'up',
        count: 2, // 2 H+ per O2
        offset: { x: 0, y: 0 }
      }
    },
    conditions: {
      location: 'Inner mitochondrial membrane',
      ph: '~7.0-7.4 (matrix)',
      temperature: '37°C',
      isReversible: false,
      regulation: 'Regulated by O₂ availability and cytochrome c reduction state',
      requirement: 'Aerobic conditions',
      notes: 'Final step of electron transport, produces water and pumps 2 protons'
    },
    isProteinComplex: true,
    complexNumber: 'IV',
    complexSize: { width: 80, height: 60 },
    position: {
      x: 695,
      y: 2673
    }
  },
  {
    step: 7,
    name: 'ATP Synthase: Oxidative Phosphorylation',
    substrate: {
      id: 'complex_v',
      name: 'Complex V: ATP Synthase',
      formula: '',
      description: 'Complex V (ATP Synthase) is the enzyme complex that synthesizes ATP from ADP and inorganic phosphate (Pi). It uses the proton gradient created by Complexes I, III, and IV to drive ATP synthesis. As protons flow back from the intermembrane space to the matrix through the F₀ subunit, the F₁ subunit catalyzes ATP formation. This process is called oxidative phosphorylation.',
      smiles: '',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Atp_synthase.PNG'
    },
    product: {
      id: 'atp_etc',
      name: 'ATP',
      formula: 'C₁₀H₁₆N₅O₁₃P₃',
      description: 'Adenosine triphosphate produced by phosphorylation of ADP and inorganic phosphate',
      smiles: 'NC1=NC=NC2=C1N=CN2[C@@H]1[C@H](O)[C@@H](COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O[C@H]1N1C=NC2=C1N=CN=C2N'
    },
    enzyme: {
      name: 'ATP Synthase (Complex V)',
      ecNumber: 'EC 3.6.3.14',
      description: 'Uses proton gradient to synthesize ATP from ADP and Pi',
      cofactors: ['F₀ subunit (proton channel)', 'F₁ subunit (ATP synthesis)']
    },
    byreactant: ['ADP', 'Pi'],
    byproduct: {
      molecules: ['ATP']
    },
    // Special subarrows for ETC
    etcSubArrows: {
      // H+ flow arrow (downward, showing H+ flowing back to matrix)
      hPlusPump: {
        type: 'proton-flow',
        from: 'H⁺ (intermembrane space)',
        to: 'H⁺ (matrix)',
        direction: 'down', // Downward arrow
        count: 3,
        offset: { x: 0, y: 0 }
      }
    },
    conditions: {
      location: 'Inner mitochondrial membrane',
      ph: '~7.0-7.4 (matrix), ~6.8 (intermembrane space)',
      temperature: '37°C',
      isReversible: false,
      regulation: 'Regulated by proton gradient magnitude and ADP/ATP ratio',
      requirement: 'Proton gradient (from Complexes I, III, IV)',
      notes: 'Produces ~2.5 ATP per NADH, ~1.5 ATP per FADH₂. Independent complex using H+ gradient.'
    },
    isProteinComplex: true,
    complexNumber: 'V',
    complexSize: { width: 80, height: 60 },
    isIndependent: true, // ATP Synthase is independent, not directly connected from Complex IV
    position: {
      x: 845,
      y: 2673
    }
  }
];

export const electronTransportChainSummary = {
  name: 'Electron Transport Chain / Oxidative Phosphorylation',
  description: 'Uses NADH and FADH₂ to create a proton gradient that drives ATP synthesis. The final step in aerobic energy production.',
  location: 'Inner mitochondrial membrane',
  netProducts: {
    atp: { produced: 30, consumed: 0, net: 30 },
    h2o: { produced: 6, consumed: 0, net: 6 },
    nadh: { consumed: 10, produced: 0, net: -10 },
    fadh2: { consumed: 2, produced: 0, net: -2 }
  },
  keyRegulatorySteps: [
    { id: 'nadh', text: 'Complex I: Entry point for NADH from glycolysis, pyruvate oxidation, and citric acid cycle' },
    { id: 'fadh2', text: 'Complex II: Entry point for FADH₂ from citric acid cycle' },
    { id: 'atp_etc', text: 'ATP Synthase: Final step producing ATP from proton gradient' }
  ]
};
