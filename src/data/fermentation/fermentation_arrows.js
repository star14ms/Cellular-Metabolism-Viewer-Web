/**
 * Fermentation Pathway - Arrows Data
 * 
 * Arrows represent connections between nodes
 * Each arrow has: id, from_id, to_id, reaction_id
 * 
 * Special cases:
 * - If from_id or to_id is an arrow ID (not a node ID), the arrow starts/ends at the midpoint of that arrow
 * - This allows for byproducts and cofactors to connect to midpoints
 * 
 * Optional fields:
 * - curved: Boolean - If true, the arrow will be drawn as a curved arrow (same style as by-molecule arrows).
 *   For curved arrows, either from_id OR to_id is required (not both):
 *   - If from_id is provided: arrow draws to the right from the from_id position
 *   - If to_id is provided (and no from_id): arrow draws to the to_id position (coming from left)
 * - flipped: Boolean - If true, the by-molecule arrow starting position is flipped.
 *   When flipped: true, 0 degrees starts from top instead of bottom.
 *   The endpoint remains the same (right). If byMoleculeAngle rotates the arrow, the flipped value flips the rotation.
 */

export const fermentationArrows = [
  // Lactate fermentation pathway
  {
    id: 'arrow_fermentation_1',
    from_id: 'pyruvate',
    to_id: 'lactate',
    reaction_id: 'rxn_fermentation_1',
  },
  // Ethanol fermentation pathway
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

