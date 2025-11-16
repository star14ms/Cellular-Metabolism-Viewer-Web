/**
 * Ethanol Fermentation Pathway - Reactions Data
 * 
 * Reactions represent enzymatic transformations
 */

export const ethanolFermentationReactions = [
  {
    id: 'rxn_fermentation_2',
    name: 'Pyruvate Decarboxylation',
    byproduct: ['CO₂'],
    enzyme: {
      name: 'Pyruvate Decarboxylase',
      ecNumber: '4.1.1.1',
      description: 'Catalyzes the decarboxylation of pyruvate to acetaldehyde',
      cofactors: ['Thiamine pyrophosphate (TPP)', 'Mg²⁺']
    },
    conditions: {
      location: 'Cytoplasm',
      requirement: 'Anaerobic conditions',
      notes: 'First step of ethanol fermentation: removes CO₂ from pyruvate'
    }
  },
  {
    id: 'rxn_fermentation_3',
    name: 'Acetaldehyde Reduction',
    byreactant: ['NADH'],
    byproduct: ['NAD⁺'],
    enzyme: {
      name: 'Alcohol Dehydrogenase',
      ecNumber: '1.1.1.1',
      description: 'Catalyzes the reduction of acetaldehyde to ethanol, regenerating NAD⁺',
      cofactors: ['NADH', 'NAD⁺', 'Zn²⁺']
    },
    conditions: {
      location: 'Cytoplasm',
      requirement: 'Anaerobic conditions',
      notes: 'Final step of ethanol fermentation: reduces acetaldehyde to ethanol'
    }
  }
];

