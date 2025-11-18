/**
 * Branched Chain Amino Acid Breakdown - Arrows Data
 * 
 * Structure:
 * - Column 1: Starting amino acids
 * - Column 2: After transamination and BCKAD
 * - Column 3: Pathway-specific intermediates
 * - Column 4: Final products + TCA cycle node
 */

export const branchedChainAminoAcidBreakdownArrows = [
  // Common transamination steps for branched-chain amino acids
  {
    id: 'arrow_bcaa_leu_trans',
    from_id: 'leucine',
    to_id: 'alpha_ketoisocaproate',
    reaction_id: 'rxn_bcaa_leu_trans'
  },
  {
    id: 'arrow_bcaa_ile_trans',
    from_id: 'isoleucine',
    to_id: 'alpha_keto_beta_methylvalerate',
    reaction_id: 'rxn_bcaa_ile_trans'
  },
  {
    id: 'arrow_bcaa_val_trans',
    from_id: 'valine',
    to_id: 'alpha_ketoisovalerate',
    reaction_id: 'rxn_bcaa_val_trans'
  },
  
  // BCKAD steps (oxidative decarboxylation)
  {
    id: 'arrow_bcaa_leu_bckad',
    from_id: 'alpha_ketoisocaproate',
    to_id: 'isovaleryl_coa',
    reaction_id: 'rxn_bcaa_leu_bckad'
  },
  {
    id: 'arrow_bcaa_ile_bckad',
    from_id: 'alpha_keto_beta_methylvalerate',
    to_id: 'alpha_methylbutyryl_coa',
    reaction_id: 'rxn_bcaa_ile_bckad'
  },
  {
    id: 'arrow_bcaa_val_bckad',
    from_id: 'alpha_ketoisovalerate',
    to_id: 'isobutyryl_coa',
    reaction_id: 'rxn_bcaa_val_bckad'
  },
  
  // Leucine pathway (pathway 1)
  {
    id: 'arrow_bcaa_leu_1',
    from_id: 'isovaleryl_coa',
    to_id: 'beta_methylcrotonyl_coa',
    reaction_id: 'rxn_bcaa_leu_1'
  },
  {
    id: 'arrow_bcaa_leu_2',
    from_id: 'beta_methylcrotonyl_coa',
    to_id: 'beta_methylglutaconyl_coa',
    reaction_id: 'rxn_bcaa_leu_2'
  },
  {
    id: 'arrow_bcaa_leu_3',
    from_id: 'beta_methylglutaconyl_coa',
    to_id: 'hmg_coa',
    reaction_id: 'rxn_bcaa_leu_3'
  },
  {
    id: 'arrow_bcaa_leu_4',
    from_id: 'hmg_coa',
    to_id: 'acetoacetate_bcaa',
    reaction_id: 'rxn_bcaa_leu_4'
  },
  {
    id: 'arrow_bcaa_leu_4b',
    from_id: 'hmg_coa',
    to_id: 'acetyl_coa_leu',
    reaction_id: 'rxn_bcaa_leu_4'
  },
  {
    id: 'arrow_bcaa_leu_tca',
    from_id: 'acetyl_coa_leu',
    to_id: 'tca_cycle_bcaa',
    reaction_id: 'rxn_bcaa_tca_entry'
  },
  
  // Isoleucine pathway (pathway 2)
  {
    id: 'arrow_bcaa_ile_1',
    from_id: 'alpha_methylbutyryl_coa',
    to_id: 'propionyl_coa_ile',
    reaction_id: 'rxn_bcaa_ile_1'
  },
  {
    id: 'arrow_bcaa_ile_2',
    from_id: 'propionyl_coa_ile',
    to_id: 'methylmalonyl_coa',
    reaction_id: 'rxn_bcaa_ile_2'
  },
  {
    id: 'arrow_bcaa_ile_3',
    from_id: 'methylmalonyl_coa',
    to_id: 'succinyl_coa_bcaa',
    reaction_id: 'rxn_bcaa_ile_3'
  },
  {
    id: 'arrow_bcaa_ile_tca',
    from_id: 'succinyl_coa_bcaa',
    to_id: 'tca_cycle_bcaa',
    reaction_id: 'rxn_bcaa_tca_entry'
  },
  
  // Valine pathway (pathway 3) - converges with isoleucine pathway at propionyl-CoA
  {
    id: 'arrow_bcaa_val_1',
    from_id: 'isobutyryl_coa',
    to_id: 'propionyl_coa_ile',
    reaction_id: 'rxn_bcaa_val_1'
  },
  
  // Lysine pathway (pathway 4)
  {
    id: 'arrow_bcaa_lys_1',
    from_id: 'lysine',
    to_id: 'saccharopine',
    reaction_id: 'rxn_bcaa_lys_1'
  },
  {
    id: 'arrow_bcaa_lys_2',
    from_id: 'saccharopine',
    to_id: 'alpha_aminoadipic_semialdehyde',
    reaction_id: 'rxn_bcaa_lys_2'
  },
  {
    id: 'arrow_bcaa_lys_3',
    from_id: 'alpha_aminoadipic_semialdehyde',
    to_id: 'alpha_aminoadipate',
    reaction_id: 'rxn_bcaa_lys_3'
  },
  {
    id: 'arrow_bcaa_lys_4',
    from_id: 'alpha_aminoadipate',
    to_id: 'alpha_ketoadipate',
    reaction_id: 'rxn_bcaa_lys_4'
  },
  {
    id: 'arrow_bcaa_lys_5',
    from_id: 'alpha_ketoadipate',
    to_id: 'glutaryl_coa',
    reaction_id: 'rxn_bcaa_lys_5'
  },
  {
    id: 'arrow_bcaa_lys_6',
    from_id: 'glutaryl_coa',
    to_id: 'crotonyl_coa',
    reaction_id: 'rxn_bcaa_lys_6'
  },
  {
    id: 'arrow_bcaa_lys_7',
    from_id: 'crotonyl_coa',
    to_id: 'beta_hydroxybutyryl_coa',
    reaction_id: 'rxn_bcaa_lys_7'
  },
  {
    id: 'arrow_bcaa_lys_8',
    from_id: 'beta_hydroxybutyryl_coa',
    to_id: 'acetoacetyl_coa',
    reaction_id: 'rxn_bcaa_lys_8'
  },
  {
    id: 'arrow_bcaa_lys_9',
    from_id: 'acetoacetyl_coa',
    to_id: 'acetyl_coa_lys',
    reaction_id: 'rxn_bcaa_lys_9'
  },
  {
    id: 'arrow_bcaa_lys_tca',
    from_id: 'acetyl_coa_lys',
    to_id: 'tca_cycle_bcaa',
    reaction_id: 'rxn_bcaa_tca_entry'
  }
];

