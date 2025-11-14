/**
 * Pyruvate Oxidation Pathway - Arrows Data
 * 
 * Arrows represent connections between nodes
 * Each arrow has: id, from_id, to_id, reaction_id
 * 
 * Special cases:
 * - If from_id or to_id is an arrow ID (not a node ID), the arrow starts/ends at the midpoint of that arrow
 * - This allows for byproducts and cofactors to connect to midpoints
 */

export const pyruvateOxidationArrows = [
  // Main pathway arrows
  {
    id: 'arrow_pyruvate_1',
    from_id: 'pyruvate',
    to_id: 'hydroxyethyl-tpp',
    reaction_id: 'rxn_pyruvate_1'
  },
  {
    id: 'arrow_pyruvate_2',
    from_id: 'hydroxyethyl-tpp',
    to_id: 'acetyl-lipoamide',
    reaction_id: 'rxn_pyruvate_2'
  },
  {
    id: 'arrow_pyruvate_3',
    from_id: 'acetyl-lipoamide',
    to_id: 'acetyl-coa',
    reaction_id: 'rxn_pyruvate_3'
  },
  {
    id: 'arrow_pyruvate_4',
    from_id: 'dihydrolipoamide',
    to_id: 'lipoamide',
    reaction_id: 'rxn_pyruvate_4'
  },
  
  // Cofactor/reactant arrows (to midpoints)
  {
    id: 'arrow_lipoamide_to_step2',
    from_id: 'lipoamide',
    to_id: 'arrow_pyruvate_2', // End at midpoint of arrow_pyruvate_2
    reaction_id: 'rxn_pyruvate_2'
  },
  {
    id: 'arrow_coa_to_step3',
    from_id: 'coa',
    to_id: 'arrow_pyruvate_3', // End at midpoint of arrow_pyruvate_3
    reaction_id: 'rxn_pyruvate_3'
  },
  {
    id: 'arrow_step3_to_dihydrolipoamide',
    from_id: 'arrow_pyruvate_3', // Start from midpoint of arrow_pyruvate_3
    to_id: 'dihydrolipoamide',
    reaction_id: 'rxn_pyruvate_3'
  },
  
  // Cycle connection: Lipoamide regeneration feeds back into step 2
  // This is already handled by arrow_lipoamide_to_step2 above
];

