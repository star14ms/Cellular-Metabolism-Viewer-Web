/**
 * Ketone Body Metabolism - Arrows Data
 */

export const ketoneBodyMetabolismArrows = [
  // 1. Transport from FAS
  {
    id: 'arrow_kbm_1',
    from_id: 'acetaldehyde_fas', // From separate file
    to_id: 'acetaldehyde_kbm',
    reaction_id: 'rxn_kbm_1'
  },
  
  // 2. Preparation
  {
    id: 'arrow_kbm_2',
    from_id: 'acetaldehyde_kbm',
    to_id: 'acetate_kbm',
    reaction_id: 'rxn_kbm_2'
  },
  {
    id: 'arrow_kbm_3',
    from_id: 'acetate_kbm',
    to_id: 'acetyl_coa_kbm_1',
    reaction_id: 'rxn_kbm_3'
  },
  {
    id: 'arrow_kbm_4',
    from_id: 'acetyl_coa_kbm_1',
    to_id: 'tca_kbm_1',
    reaction_id: 'rxn_kbm_4'
  },
  {
    id: 'arrow_kbm_4-1',
    from_id: 'acetyl_coa_kbm_1',
    to_id: 'acetyl_coa_x2_kbm',
    reaction_id: null
  },

  // 3. Synthesis
  {
    id: 'arrow_kbm_5',
    from_id: 'acetyl_coa_x2_kbm',
    to_id: 'acetoacetyl_coa_kbm',
    reaction_id: 'rxn_kbm_5'
  },
  {
    id: 'arrow_kbm_6',
    from_id: 'acetoacetyl_coa_kbm',
    to_id: 'hmg_coa_kbm',
    reaction_id: 'rxn_kbm_6'
  },
  
  // Step 8: Branching
  // Main arrow: HMG-CoA -> Acetoacetate
  {
    id: 'arrow_kbm_8_main',
    from_id: 'hmg_coa_kbm',
    to_id: 'acetoacetate_kbm',
    reaction_id: 'rxn_kbm_8'
  },
  // Side arrow: From middle of main arrow -> Acetyl-CoA
  {
    id: 'arrow_kbm_8_side',
    from_id: 'arrow_kbm_8_main', // Starts from main arrow
    to_id: 'acetyl_coa_kbm_1',
    reaction_id: 'rxn_kbm_8', // Same reaction ID as requested
    type: 'branch' // Optional marker
  },
  
  // Step 9: Acetone
  {
    id: 'arrow_kbm_9',
    from_id: 'acetoacetate_kbm',
    to_id: 'acetone_kbm',
    reaction_id: 'rxn_kbm_9'
  },
  
  // Step 10: Beta-Hydroxybutyrate
  {
    id: 'arrow_kbm_10',
    from_id: 'acetoacetate_kbm',
    to_id: 'beta_hydroxybutyrate_kbm',
    reaction_id: 'rxn_kbm_10',
    flipped: true
  },

  // 4. Breakdown
  // Connect Beta-Hydroxybutyrate to Acetoacetate (Step 11)
  // Since we used new nodes for breakdown, we need to connect beta_hydroxybutyrate_kbm to...
  // Wait, step 11 is reverse of 10. In the diagram, does it flow to a new acetoacetate?
  // Visualizing breakdown:
  // beta_hydroxybutyrate_kbm -> (new acetoacetate?) -> ...
  // The nodes defined are: `acetoacetyl_coa_breakdown_kbm`.
  // I should probably add `acetoacetate_breakdown_kbm` node or just reuse `acetoacetate_kbm` if it's a loop.
  // But typically breakdown happens in other tissues. 
  // I'll assume a flow: beta_hydroxybutyrate_kbm -> [Reaction] -> acetoacetate_kbm (conceptually back, but usually visualized as a separate path or cycle).
  // Given the node set I created, I missed `acetoacetate_breakdown_kbm`.
  // I'll connect `beta_hydroxybutyrate_kbm` directly to `acetoacetyl_coa_breakdown_kbm` via SCOT if I missed the intermediate node?
  // No, SCOT uses acetoacetate.
  // I will add `acetoacetate_breakdown_kbm` to nodes (I'll do a quick edit to nodes file next) or assume we use `acetoacetate_kbm` again.
  // Using `acetoacetate_kbm` again would create a cycle visual which might be messy if it's "Synthesis" vs "Breakdown" columns.
  // I'll assume for now I should connect to `acetoacetyl_coa_breakdown_kbm` but I need the intermediate step.
  // Let's update the nodes file to include `acetoacetate_breakdown_kbm` for clarity, OR just connect `beta_hydroxybutyrate_kbm` to `acetoacetyl_coa_breakdown_kbm` with a multi-step arrow? No, steps are distinct.
  
  // **Decision**: I'll append `acetoacetate_breakdown_kbm` to the nodes file in a subsequent edit to ensure correctness.
  // For now I will write arrows assuming it exists: `acetoacetate_breakdown_kbm`.
  
  {
    id: 'arrow_kbm_12',
    from_id: 'acetoacetate_kbm', // Need to add this node
    to_id: 'acetoacetyl_coa_breakdown_kbm',
    reaction_id: 'rxn_kbm_12',
    flipped: true
  },
  {
    id: 'arrow_kbm_13',
    from_id: 'acetoacetyl_coa_breakdown_kbm',
    to_id: 'acetyl_coa_x2_breakdown_kbm',
    reaction_id: 'rxn_kbm_13'
  },
  {
    id: 'arrow_kbm_14',
    from_id: 'acetyl_coa_x2_breakdown_kbm',
    to_id: 'tca_kbm_2',
    reaction_id: 'rxn_kbm_14'
  }
];

