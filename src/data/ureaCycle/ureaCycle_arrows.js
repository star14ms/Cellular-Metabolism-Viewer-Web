/**
 * Urea Cycle Pathway - Arrows Data
 * 
 * Structure:
 * - Central cycle: Ornithine → Citrulline → Argininosuccinate → Arginine → Ornithine
 * - Left branch: Oxaloacetate → Aspartate (byreactant for citrulline → argininosuccinate)
 * - Bidirectional: Aspartate ↔ Asparagine (two separate arrows)
 * - Right branch: Arginine → Citrulline (NO synthesis) → Ornithine
 * - Left bottom branch: Ornithine → Glutamic semialdehyde → (two sub-branches)
 *   - Left sub-branch: Glutamic semialdehyde → Glutamate
 *   - Bottom right sub-branch: Glutamic semialdehyde → Pyrroline-5-carboxylate → Proline
 */

export const ureaCycleArrows = [
  // Carbamoyl Phosphate Synthesis: HCO₃⁻ → Carbamoyl Phosphate
  {
    id: 'arrow_urea_1',
    from_id: 'bicarbonate_urea',
    to_id: 'carbamoyl_phosphate_urea',
    reaction_id: 'rxn_urea_1'
  },

  // Central Urea Cycle Arrows
  // Cycle: Ornithine_mito → Citrulline_mito → Citrulline_cyto → Argininosuccinate → Arginine → Ornithine_cyto → Ornithine_mito

  // Step 1: Ornithine (mitochondrial) → Citrulline (mitochondrial) (with carbamoyl phosphate as byreactant)
  {
    id: 'arrow_urea_2',
    from_id: 'ornithine_mito',
    to_id: 'citrulline_mito',
    reaction_id: 'rxn_urea_2',
    cycleArrow: true,
    cyclic_id: 'urea_cycle'
  },

  // Step 1a: Citrulline Transport (Mitochondrial → Cytosolic)
  {
    id: 'arrow_urea_2a',
    from_id: 'citrulline_mito',
    to_id: 'citrulline_cyto',
    reaction_id: 'rxn_urea_2a',
    cycleArrow: true,
    cyclic_id: 'urea_cycle'
  },

  // Step 2: Citrulline (cytosolic) → Argininosuccinate (with aspartate as byreactant)
  {
    id: 'arrow_urea_4',
    from_id: 'citrulline_cyto',
    to_id: 'argininosuccinate',
    reaction_id: 'rxn_urea_3',
    cycleArrow: true,
    cyclic_id: 'urea_cycle'
  },

  // Step 3: Argininosuccinate → Arginine + Fumarate
  {
    id: 'arrow_urea_6',
    from_id: 'argininosuccinate',
    to_id: 'arginine',
    reaction_id: 'rxn_urea_4',
    cycleArrow: true,
    cyclic_id: 'urea_cycle'
  },

  // Step 4: Arginine → Ornithine (cytosolic) + Urea
  {
    id: 'arrow_urea_8',
    from_id: 'arginine',
    to_id: 'ornithine_cyto',
    reaction_id: 'rxn_urea_5',
    cycleArrow: true,
    cyclic_id: 'urea_cycle'
  },

  // Step 4a: Ornithine Transport (Cytosolic → Mitochondrial) (completes the cycle)
  {
    id: 'arrow_urea_8a',
    from_id: 'ornithine_cyto',
    to_id: 'ornithine_mito', // CYCLIC: connects back to the first node of the cycle
    reaction_id: 'rxn_urea_5a',
    cycleArrow: true,
    cyclic_id: 'urea_cycle'
  },

  // Left Branch: Oxaloacetate → Aspartate (byreactant for citrulline → argininosuccinate)
  {
    id: 'arrow_urea_9',
    from_id: 'oxaloacetate_urea',
    to_id: 'aspartate_urea',
    reaction_id: 'rxn_urea_6',
    flipped: true
  },

  // Bidirectional: Aspartate ↔ Asparagine (two separate arrows)
  // Forward: Aspartate → Asparagine
  {
    id: 'arrow_urea_10',
    from_id: 'aspartate_urea',
    to_id: 'asparagine_urea',
    reaction_id: 'rxn_urea_7'
  },
  // Reverse: Asparagine → Aspartate
  {
    id: 'arrow_urea_11',
    from_id: 'asparagine_urea',
    to_id: 'aspartate_urea',
    reaction_id: 'rxn_urea_8'
  },

  // Right Branch: Arginine → Citrulline (cytosolic) (NO synthesis)
  {
    id: 'arrow_urea_13',
    from_id: 'arginine',
    to_id: 'citrulline_cyto',
    reaction_id: 'rxn_urea_9'
  },
  // Note: The citrulline from NO synthesis feeds back into the cycle at citrulline_cyto.

  // Left Bottom Branch: Ornithine (mitochondrial) → Glutamic semialdehyde → (two sub-branches)
  {
    id: 'arrow_urea_14',
    from_id: 'ornithine_mito',
    to_id: 'glutamic_semialdehyde',
    reaction_id: 'rxn_urea_10',
    y_scale: 1.25
  },

  // Left Sub-branch: Glutamic semialdehyde → Glutamate
  {
    id: 'arrow_urea_15',
    from_id: 'glutamic_semialdehyde',
    to_id: 'glutamate_urea',
    reaction_id: 'rxn_urea_11',
    flipped: true
  },

  // Bottom Right Sub-branch: Glutamic semialdehyde → Pyrroline-5-carboxylate (mitochondrial) → Pyrroline-5-carboxylate (cytosolic) → Proline
  {
    id: 'arrow_urea_16',
    from_id: 'glutamic_semialdehyde',
    to_id: 'pyrroline_5_carboxylate_mito',
    reaction_id: 'rxn_urea_12',
    flipped: true
  },
  {
    id: 'arrow_urea_16a',
    from_id: 'pyrroline_5_carboxylate_mito',
    to_id: 'pyrroline_5_carboxylate_cyto',
    reaction_id: 'rxn_urea_12a'
  },
  {
    id: 'arrow_urea_17',
    from_id: 'pyrroline_5_carboxylate_cyto',
    to_id: 'proline_urea',
    reaction_id: 'rxn_urea_13'
  },
];

