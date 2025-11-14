/**
 * Electron Transport Chain - Reactions Data
 */

export const electronTransportChainReactions = [
  {
    id: 'rxn_etc_1',
    name: 'Transporting Electron from NADH to Ubiquinone',
    enzyme: {
      name: 'NADH Dehydrogenase (Complex I)',
      ecNumber: 'EC 1.6.5.3',
      description: 'Transfers electrons from NADH to ubiquinone, pumps 4 H⁺ across membrane',
      cofactors: ['FMN', 'Iron-sulfur clusters', 'Ubiquinone (CoQ)']
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
    etcSubArrows: {
      hPlusPump: {
        type: 'proton-pump',
        from: 'H⁺ (matrix)',
        to: 'H⁺ (intermembrane space)',
        direction: 'up',
        count: 4
      }
    }
  },
  {
    id: 'rxn_etc_2',
    name: 'Transporting Electron from FADH₂ to Ubiquinone',
    enzyme: {
      name: 'Succinate Dehydrogenase (Complex II)',
      ecNumber: 'EC 1.3.5.1',
      description: 'Oxidizes succinate to fumarate, transfers electrons to ubiquinone, does not pump protons',
      cofactors: ['FAD', 'Iron-sulfur clusters', 'Ubiquinone (CoQ)']
    },
    conditions: {
      location: 'Inner mitochondrial membrane',
      ph: '~7.0-7.4 (matrix)',
      temperature: '37°C',
      isReversible: false,
      regulation: 'Part of citric acid cycle, feeds electrons to ETC without proton pumping',
      requirement: 'Aerobic conditions',
      notes: 'Part of citric acid cycle, feeds electrons to ETC without proton pumping'
    }
  },
  {
    id: 'rxn_etc_3',
    name: 'Transporting Electron from Ubiquinol to Complex III',
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
    }
  },
  {
    id: 'rxn_etc_4',
    name: 'Transporting Electron from Complex III to Cytochrome c',
    enzyme: {
      name: 'Cytochrome bc₁ Complex (Complex III)',
      ecNumber: 'EC 1.10.2.2',
      description: 'Transfers electrons from ubiquinol to cytochrome c, pumps 4 H⁺ across membrane',
      cofactors: ['Cytochrome b', 'Cytochrome c₁', 'Rieske iron-sulfur protein']
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
    etcSubArrows: {
      hPlusPump: {
        type: 'proton-pump',
        from: 'H⁺ (matrix)',
        to: 'H⁺ (intermembrane space)',
        direction: 'up',
        count: 4
      }
    }
  },
  {
    id: 'rxn_etc_5',
    name: 'Transporting Electron from Cytochrome c to Complex IV',
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
    }
  },
  {
    id: 'rxn_etc_6',
    name: 'Transporting Electron from Cytochrome c to O₂',
    enzyme: {
      name: 'Cytochrome c Oxidase (Complex IV)',
      ecNumber: 'EC 1.9.3.1',
      description: 'Final electron acceptor, reduces O₂ to H₂O, pumps 2 H⁺ across membrane',
      cofactors: ['Cytochrome a', 'Cytochrome a₃', 'CuA', 'CuB']
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
    etcSubArrows: {
      hPlusPump: {
        type: 'proton-pump',
        from: 'H⁺ (matrix)',
        to: 'H⁺ (intermembrane space)',
        direction: 'up',
        count: 2
      }
    }
  },
  {
    id: 'rxn_etc_7',
    name: 'ATP Synthase: Oxidative Phosphorylation',
    enzyme: {
      name: 'ATP Synthase (Complex V)',
      ecNumber: 'EC 3.6.3.14',
      description: 'Uses proton gradient to synthesize ATP from ADP and Pi',
      cofactors: ['F₀ subunit (proton channel)', 'F₁ subunit (ATP synthesis)']
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
    etcSubArrows: {
      hPlusPump: {
        type: 'proton-flow',
        from: 'H⁺ (intermembrane space)',
        to: 'H⁺ (matrix)',
        direction: 'down',
        count: 3
      }
    }
  }
];

