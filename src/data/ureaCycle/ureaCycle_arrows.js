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
  // Cycle: Ornithine → Citrulline → Argininosuccinate → Arginine → Ornithine

  // Step 1: Ornithine → Citrulline (with carbamoyl phosphate as byreactant)
  {
    id: 'arrow_urea_2',
    from_id: 'ornithine',
    to_id: 'citrulline',
    reaction_id: 'rxn_urea_2',
    cycleArrow: true,
    cyclic_id: 'urea_cycle'
  },

  // Step 2: Citrulline → Argininosuccinate (with aspartate as byreactant)
  {
    id: 'arrow_urea_4',
    from_id: 'citrulline',
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

  // Step 4: Arginine → Ornithine + Urea (completes the cycle)
  {
    id: 'arrow_urea_8',
    from_id: 'arginine',
    to_id: 'ornithine', // CYCLIC: connects back to the first node of the cycle
    reaction_id: 'rxn_urea_5',
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

  // Right Branch: Arginine → Citrulline (NO synthesis) → Ornithine
  {
    id: 'arrow_urea_13',
    from_id: 'arginine',
    to_id: 'citrulline',
    reaction_id: 'rxn_urea_9'
  },
  // Note: The citrulline from NO synthesis can feed back into the cycle, but we don't need a separate arrow
  // since citrulline is already part of the cycle. The connection from arginine to ornithine via left bottom branch
  // is handled below.

  // Left Bottom Branch: Ornithine → Glutamic semialdehyde → (two sub-branches)
  {
    id: 'arrow_urea_14',
    from_id: 'ornithine',
    to_id: 'glutamic_semialdehyde',
    reaction_id: 'rxn_urea_10',
    flipped: true
  },

  // Left Sub-branch: Glutamic semialdehyde → Glutamate
  {
    id: 'arrow_urea_15',
    from_id: 'glutamic_semialdehyde',
    to_id: 'glutamate_urea',
    reaction_id: 'rxn_urea_11',
    flipped: true
  },

  // Bottom Right Sub-branch: Glutamic semialdehyde → Pyrroline-5-carboxylate → Proline
  {
    id: 'arrow_urea_16',
    from_id: 'glutamic_semialdehyde',
    to_id: 'pyrroline_5_carboxylate',
    reaction_id: 'rxn_urea_12',
    flipped: true
  },
  {
    id: 'arrow_urea_17',
    from_id: 'pyrroline_5_carboxylate',
    to_id: 'proline_urea',
    reaction_id: 'rxn_urea_13'
  },
];

