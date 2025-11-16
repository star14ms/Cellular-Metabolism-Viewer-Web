/**
 * Lactate Fermentation Pathway - Reactions Data
 * 
 * Reactions represent enzymatic transformations
 */

export const lactateFermentationReactions = [
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
  }
];

