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
  }
];

