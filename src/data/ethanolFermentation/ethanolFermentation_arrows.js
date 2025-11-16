/**
 * Ethanol Fermentation Pathway - Arrows Data
 * 
 * Arrows represent connections between nodes
 */

export const ethanolFermentationArrows = [
  {
    id: 'arrow_fermentation_2',
    from_id: 'pyruvate',
    to_id: 'acetaldehyde',
    reaction_id: 'rxn_fermentation_2',
    flipped: true,
  },
  {
    id: 'arrow_fermentation_3',
    from_id: 'acetaldehyde',
    to_id: 'ethanol',
    reaction_id: 'rxn_fermentation_3',
  }
];

