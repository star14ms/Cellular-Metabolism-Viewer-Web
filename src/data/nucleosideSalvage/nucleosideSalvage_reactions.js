/**
 * Nucleoside Salvage Pathway - Reactions Data
 */

export const nucleosideSalvageReactions = [
  {
    id: 'rxn_nucleoside_salvage_1',
    name: 'Adenosine Phosphorylation',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Adenosine kinase',
      ecNumber: 'EC 2.7.1.20',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of adenosine to adenosine-5\'-monophosphate (AMP) using ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the nucleoside salvage pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_nucleoside_salvage_2',
    name: 'Cytidine Phosphorylation',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Uridine-cytidine kinase',
      ecNumber: 'EC 2.7.1.48',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of cytidine to cytidine-5\'-monophosphate (CMP) using ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the nucleoside salvage pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_nucleoside_salvage_3',
    name: 'Uridine Phosphorylation',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Uridine-cytidine kinase',
      ecNumber: 'EC 2.7.1.48',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of uridine to uridine-5\'-monophosphate (UMP) using ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the nucleoside salvage pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_nucleoside_salvage_4',
    name: 'Deoxycytidine Phosphorylation',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Deoxycytidine kinase',
      ecNumber: 'EC 2.7.1.74',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of deoxycytidine to deoxycytidine-5\'-monophosphate (dCMP) using ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the nucleoside salvage pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_nucleoside_salvage_5',
    name: 'Thymidine Phosphorylation',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Thymidine kinase',
      ecNumber: 'EC 2.7.1.21',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of thymidine to deoxythymidine-5\'-monophosphate (dTMP) using ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the nucleoside salvage pathway',
      isReversible: false
    }
  },
  {
    id: 'rxn_nucleoside_salvage_6',
    name: 'Deoxyuridine Phosphorylation',
    byreactant: ['ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Thymidine kinase',
      ecNumber: 'EC 2.7.1.21',
      cofactors: ['Mg²⁺'],
      description: 'Catalyzes the phosphorylation of deoxyuridine to deoxyuridine-5\'-monophosphate (dUMP) using ATP'
    },
    conditions: {
      location: 'Cytoplasm',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Part of the nucleoside salvage pathway',
      isReversible: false
    }
  }
];

