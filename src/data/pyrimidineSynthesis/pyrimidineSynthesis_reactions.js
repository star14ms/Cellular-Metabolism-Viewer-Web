/**
 * De Novo Pyrimidine Synthesis Pathway - Reactions Data
 */

export const pyrimidineSynthesisReactions = [
  {
    id: 'rxn_pyrimidine_synthesis_1',
    name: 'Carbamoyl Phosphate Synthesis',
    byreactant: ['2 ATP'],
    byproduct: ['2 ADP', 'Pi'],
    displayByreactant: ['glutamine_pyrimidine_cps'],
    displayByproduct: ['glutamate_pyrimidine_cps'],
    enzyme: {
      name: 'Carbamoyl phosphate synthetase II (CPSII)',
      ecNumber: 'EC 6.3.5.5',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the synthesis of carbamoyl phosphate from bicarbonate, ATP, and glutamine. This is the first committed step in de novo pyrimidine synthesis.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'First committed step; allosterically regulated',
      isReversible: false
    }
  },
  {
    id: 'rxn_pyrimidine_synthesis_2',
    name: 'N-carbamoyl Aspartate Synthesis',
    byreactant: ['aspartate'],
    byproduct: ['Pi'],
    hideByreactantLabels: true,
    enzyme: {
      name: 'Aspartate transcarbamoylase',
      ecNumber: 'EC 2.1.3.2',
      cofactors: ['None'],
      description: 'Catalyzes the transfer of carbamoyl group from carbamoyl phosphate to aspartate, forming N-carbamoyl aspartate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the pyrimidine synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_pyrimidine_synthesis_3',
    name: 'Dihydroorotate Synthesis',
    byproduct: ['H₂O'],
    enzyme: {
      name: 'Dihydroorotase',
      ecNumber: 'EC 3.5.2.3',
      cofactors: ['None'],
      description: 'Catalyzes the cyclization of N-carbamoyl aspartate to form dihydroorotate, releasing water'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the pyrimidine synthesis pathway',
      isReversible: true
    }
  },
  {
    id: 'rxn_pyrimidine_synthesis_4',
    name: 'Orotate Synthesis',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: 'Dihydroorotate dehydrogenase',
      ecNumber: 'EC 1.3.3.1',
      cofactors: ['FAD', 'FMN'],
      description: 'Catalyzes the oxidation of dihydroorotate to orotate, reducing NAD⁺ to NADH. This reaction occurs in the mitochondria.'
    },
    conditions: {
      location: 'Mitochondria',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the pyrimidine synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_pyrimidine_synthesis_5',
    name: 'Orotidine-5\'-monophosphate (OMP) Synthesis',
    byreactant: ['prpp_pyrimidine'],
    byproduct: ['PPi'],
    hideByreactantLabels: true,
    enzyme: {
      name: 'Orotate phosphoribosyltransferase',
      ecNumber: 'EC 2.4.2.10',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the transfer of ribose-5-phosphate from PRPP to orotate, forming OMP and releasing pyrophosphate'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the pyrimidine synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_pyrimidine_synthesis_6',
    name: 'Uridine-5\'-monophosphate (UMP) Synthesis',
    byproduct: ['CO₂'],
    enzyme: {
      name: 'OMP decarboxylase (UMP synthase)',
      ecNumber: 'EC 4.1.1.23',
      cofactors: ['None'],
      description: 'Catalyzes the decarboxylation of OMP to form UMP, releasing carbon dioxide. This is the first pyrimidine nucleotide formed.'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the pyrimidine synthesis pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_pyrimidine_synthesis_7',
    name: 'Uridine Diphosphate (UDP) Synthesis',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'UMP kinase',
      ecNumber: 'EC 2.7.4.22',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of UMP to UDP using ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the pyrimidine synthesis pathway',
      isReversible: true
    }
  },
  {
    id: 'rxn_pyrimidine_synthesis_8',
    name: 'Uridine Triphosphate (UTP) Synthesis',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Nucleoside diphosphate kinase',
      ecNumber: 'EC 2.7.4.6',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of UDP to UTP using ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the pyrimidine synthesis pathway',
      isReversible: true
    }
  },
  {
    id: 'rxn_pyrimidine_synthesis_9',
    name: 'Cytidine Triphosphate (CTP) Synthesis',
    byreactant: ['ATP'],
    byproduct: ['ADP', 'Pi'],
    displayByreactant: ['glutamine_pyrimidine_ctp'],
    displayByproduct: ['glutamate_pyrimidine_ctp'],
    enzyme: {
      name: 'CTP synthetase',
      ecNumber: 'EC 6.3.4.2',
      cofactors: ['Mg²⁺', 'GTP'],
      description: 'Catalyzes the amination of UTP to form CTP using ATP and glutamine as the nitrogen source'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Allosterically regulated by CTP (feedback inhibition)',
      isReversible: false
    }
  },
  {
    id: 'rxn_pyrimidine_synthesis_10',
    name: 'CTP Deamination',
    byproduct: ['NH₄⁺'],
    enzyme: {
      name: 'Spontaneous reaction',
      ecNumber: 'N/A',
      cofactors: ['None'],
      description: 'Spontaneous deamination of CTP to UTP, releasing ammonium ion (NH₄⁺)'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Spontaneous reaction, not enzymatically catalyzed',
      isReversible: false
    }
  }
];

