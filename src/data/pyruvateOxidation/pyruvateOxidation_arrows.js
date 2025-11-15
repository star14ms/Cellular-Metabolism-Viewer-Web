/**
 * Pyruvate Oxidation Pathway - Arrows Data
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
 *   For curved arrows, you need either from_id OR to_id (not both):
 *   - If from_id is provided: arrow draws to the right from the from_id position
 *   - If to_id is provided: arrow draws from the left to the to_id position
 * - flipped: Boolean - If true, the by-molecule arrow starting position is flipped.
 *   When flipped: true, 0 degrees starts from top instead of bottom.
 *   The endpoint remains the same (right). If byMoleculeAngle rotates the arrow, the flipped value flips the rotation.
 */

export const pyruvateOxidationArrows = [
  // Main pathway arrows
  {
    id: 'arrow_pyruvate_2',
    from_id: 'lipoamide',
    to_id: 'acetyl-lipoamide',
    reaction_id: 'rxn_pyruvate_2',
    x_scale: 1.5,
  },
  {
    id: 'arrow_pyruvate_3',
    from_id: 'acetyl-lipoamide',
    to_id: 'dihydrolipoamide',
    reaction_id: 'rxn_pyruvate_3',
    hideByproductLabels: true,
  },
  {
    id: 'arrow_pyruvate_4',
    from_id: 'dihydrolipoamide',
    to_id: 'lipoamide',
    reaction_id: 'rxn_pyruvate_4',
  },

  // Curved arrows
  {
    id: 'arrow_pyruvate_1-1',
    from_id: 'pyruvate',
    to_id: 'hydroxyethyl-tpp',
    reaction_id: 'rxn_pyruvate_1',
    curved: true,
    flipped: true,
    byproduct: ['CO₂'],
    x_scale: 1.5,
    y_scale: 0.66,
  },
  {
    id: 'arrow_pyruvate_1-2',
    from_id: 'thiamine-pyrophosphate',
    to_id: 'hydroxyethyl-tpp',
    reaction_id: 'rxn_pyruvate_1',
    curved: true,
    x_scale: 1.5,
    y_scale: 0.66,
  }
  
  // Cycle connection: Lipoamide regeneration feeds back into step 2
  // This is already handled by arrow_lipoamide_to_step2 above
];

