/**
 * Pentose Phosphate Pathway - Arrows Data
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
 * - byMoleculeAngle: Number - Custom angle (in degrees) for by-molecule arrows. Allows individual arrows
 *   to have different angles rather than sharing the same angle from the reaction.
 */

export const pentosePhosphatePathwayArrows = [
  // 1. Glutathione Peroxidase - Curved arrows from H2O2 and glutathione (reduced)
  {
    id: 'arrow_ppp_1-1',
    from_id: 'h2o2',
    reaction_id: 'rxn_ppp_1',
    curved: true,
    byproduct: ['H₂O'],
    x_scale: 1.5,
    y_scale: 0.66,
  },
  {
    id: 'arrow_ppp_1-2',
    from_id: 'glutathione_reduced',
    reaction_id: 'rxn_ppp_1',
    curved: true,
    flipped: true,
    x_scale: 1.5,
    y_scale: 0.66,
  },
  
  // 2. Glutathione Reductase - Curved arrows from glutathione (oxidized) and NADPH
  {
    id: 'arrow_ppp_2-1',
    from_id: 'glutathione_oxidized',
    reaction_id: 'rxn_ppp_2',
    curved: true,
    flipped: true,
    byproduct: ['Glutathione (reduced)'],
    x_scale: 1.5,
    y_scale: 0.66,
    byMoleculeAngle: 180, // Custom angle for this arrow
  },
  {
    id: 'arrow_ppp_2-2',
    from_id: 'nadph',
    reaction_id: 'rxn_ppp_2',
    curved: true,
    byproduct: ['NADP⁺'],
    x_scale: 1.5,
    y_scale: 0.66, // Negative y_scale to curve upward (concave up)
    byMoleculeAngle: 180, // Custom angle for this arrow
  },
  
  // 3. Glucose-6-phosphate Dehydrogenase - Main pathway arrow
  {
    id: 'arrow_ppp_3',
    from_id: 'glucose_6_phosphate',
    to_id: '6_phosphogluconolactone',
    reaction_id: 'rxn_ppp_3'
  },
  
  // 4. Lactonase - Main pathway arrow
  {
    id: 'arrow_ppp_4',
    from_id: '6_phosphogluconolactone',
    to_id: '6_phosphogluconate',
    reaction_id: 'rxn_ppp_4'
  },
  
  // 5. 6-Phosphogluconate Dehydrogenase - Main pathway arrow
  {
    id: 'arrow_ppp_5',
    from_id: '6_phosphogluconate',
    to_id: 'ribulose_5_phosphate',
    reaction_id: 'rxn_ppp_5'
  },
  
  // 6. Ribose-5-phosphate Isomerase - Reversible arrow
  {
    id: 'arrow_ppp_6',
    from_id: 'ribulose_5_phosphate',
    to_id: 'ribose_5_phosphate',
    reaction_id: 'rxn_ppp_6'
  },
  
  // 7. PRPP Synthetase - Main pathway arrow
  {
    id: 'arrow_ppp_7',
    from_id: 'ribose_5_phosphate',
    to_id: 'prpp_pentose',
    reaction_id: 'rxn_ppp_7'
  },
  
  // 8. Nucleotide Synthesis - Main pathway arrow
  {
    id: 'arrow_ppp_8',
    from_id: 'prpp_pentose',
    to_id: 'nucleotides_pentose',
    reaction_id: 'rxn_ppp_8'
  },
  
  // 9. Ribulose-5-phosphate Epimerase - Reversible arrow
  {
    id: 'arrow_ppp_9',
    from_id: 'ribulose_5_phosphate',
    reaction_id: 'rxn_ppp_9',
    curved: true,
    flipped: true,
    x_scale: 3,
    y_scale: 1,
    byMoleculeAngle: 270, // Custom angle for this arrow
  },
  
  // 10. Transketolase (first) - Two curved arrows
  {
    id: 'arrow_ppp_10-1',
    from_id: 'ribose_5_phosphate',
    reaction_id: 'rxn_ppp_10',
    curved: true,
    x_scale: 1.5,
    y_scale: 1.25,
    byMoleculeAngle: 90,
  },
  {
    id: 'arrow_ppp_10-2',
    from_id: 'sedoheptulose_7_phosphate',
    reaction_id: 'rxn_ppp_10',
    curved: true,
    flipped: true,
    x_scale: 1.5,
    y_scale: -1.25,
    byMoleculeAngle: 270,
  },
  
  // 11. Transaldolase - Two curved arrows
  {
    id: 'arrow_ppp_11-1',
    from_id: 'sedoheptulose_7_phosphate',
    reaction_id: 'rxn_ppp_11',
    curved: true,
    x_scale: 1.5,
    y_scale: 1.25,
    byMoleculeAngle: 90
  },
  {
    id: 'arrow_ppp_11-2',
    from_id: 'fructose_6_phosphate_pentose',
    reaction_id: 'rxn_ppp_11',
    curved: true,
    flipped: true,
    x_scale: 1.5,
    y_scale: -1.25,
    byMoleculeAngle: 270
  },
  // {
  //   id: 'arrow_ppp_11',
  //   from_id: 'fructose_6_phosphate',
  //   to_id: 'erythrose_4_phosphate',
  //   reaction_id: 'rxn_ppp_11',
  // },
  
  // 12. Transketolase (second) - Two curved arrows
  {
    id: 'arrow_ppp_12-1',
    from_id: 'erythrose_4_phosphate',
    reaction_id: 'rxn_ppp_12',
    curved: true,
    x_scale: 2.25,
    y_scale: -1.8,
    byMoleculeAngle: 90,
  },
  {
    id: 'arrow_ppp_12-2',
    from_id: 'fructose_6_phosphate',
    reaction_id: 'rxn_ppp_12',
    curved: true,
    flipped: true,
    x_scale: 3.8,
    y_scale: -1.8,
    byMoleculeAngle: 270,
  }
  // {
  //   id: 'arrow_ppp_12',
  //   from_id: 'erythrose_4_phosphate',
  //   to_id: 'glyceraldehyde_3_phosphate',
  //   reaction_id: 'rxn_ppp_12',
  // }
];

