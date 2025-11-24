/**
 * Branched Chain Amino Acid Breakdown Pathway - Index
 */

import { branchedChainAminoAcidBreakdownNodes } from './branchedChainAminoAcidBreakdown_nodes.js';
import { branchedChainAminoAcidBreakdownReactions } from './branchedChainAminoAcidBreakdown_reactions.js';
import { branchedChainAminoAcidBreakdownArrows } from './branchedChainAminoAcidBreakdown_arrows.js';

export const branchedChainAminoAcidBreakdownData = {
  nodes: branchedChainAminoAcidBreakdownNodes,
  reactions: branchedChainAminoAcidBreakdownReactions,
  arrows: branchedChainAminoAcidBreakdownArrows,
  summary: {
    name: 'Branched Chain Amino Acid Breakdown',
    pathwayType: 'amino_acids',
    description: 'Catabolic pathways for branched-chain amino acids (leucine, isoleucine, valine) and lysine. These pathways convert amino acids into intermediates that feed into the TCA cycle (acetyl-CoA and succinyl-CoA).',
    location: 'Mitochondria',
    netProducts: {
      'Acetyl-CoA': { produced: 2, consumed: 0, net: 2 },
      'Succinyl-CoA': { produced: 2, consumed: 0, net: 2 },
      'NADH': { produced: 8, consumed: 0, net: 8 },
      'FADH₂': { produced: 1, consumed: 0, net: 1 },
      'CO₂': { produced: 4, consumed: 0, net: 4 }
    },
    keyRegulatorySteps: [
      { id: 'leucine', text: 'Step 1: Branched-chain amino acid transaminase - Common first step for Leu, Ile, Val (requires B₆)' },
      { id: 'isoleucine', text: 'Step 2: Branched-chain ketoacid dehydrogenase (BCKAD) - Oxidative decarboxylation (requires B₁)' },
      { id: 'valine', text: 'Step 3: Methylmalonyl-CoA mutase - Critical step for Ile and Val pathways (requires B₁₂)' },
      { id: 'lysine', text: 'Lysine pathway - Distinct pathway via saccharopine, produces acetyl-CoA for TCA cycle' }
    ]
  },
  // Sub-pathways definition - 4 sub-pathways, one for each column
  // Note: There is overlap of reactions and nodes between pathways (especially Valine and Isoleucine at propionyl-CoA)
  subPathways: [
    {
      id: 'leucine-breakdown',
      name: 'Leucine Breakdown',
      description: 'Catabolic pathway for leucine. Leucine is transaminated to α-ketoisocaproate, then oxidatively decarboxylated to isovaleryl-CoA. Further catabolism produces β-methylcrotonyl-CoA, β-methylglutaconyl-CoA, HMG-CoA, and finally acetoacetate and acetyl-CoA. Acetyl-CoA feeds into the TCA cycle.',
      reactionIndices: [0, 1, 2, 3, 4, 5, 6, 27], // Leucine transamination, transport, BCKAD, and leucine-specific steps, plus TCA entry
      nodeIds: ['leucine', 'alpha_ketoisocaproate', 'alpha_ketoisocaproate_mito', 'isovaleryl_coa', 'beta_methylcrotonyl_coa', 'beta_methylglutaconyl_coa', 'hmg_coa', 'acetoacetate_bcaa', 'acetyl_coa_leu', 'tca_cycle_bcaa', 'alpha_ketoglutarate_leu', 'glutamate_leu']
    },
    {
      id: 'isoleucine-breakdown',
      name: 'Isoleucine Breakdown',
      description: 'Catabolic pathway for isoleucine. Isoleucine is transaminated to α-keto-β-methylvalerate, then oxidatively decarboxylated to α-methylbutyryl-CoA. Further catabolism produces propionyl-CoA, which is carboxylated to methylmalonyl-CoA and isomerized to succinyl-CoA. Succinyl-CoA feeds into the TCA cycle.',
      reactionIndices: [7, 8, 9, 10, 11, 12, 27], // Isoleucine transamination, transport, BCKAD, and isoleucine-specific steps, plus TCA entry
      nodeIds: ['isoleucine', 'alpha_keto_beta_methylvalerate', 'alpha_keto_beta_methylvalerate_mito', 'alpha_methylbutyryl_coa', 'propionyl_coa_ile', 'methylmalonyl_coa', 'succinyl_coa_bcaa', 'tca_cycle_bcaa', 'alpha_ketoglutarate_ile', 'glutamate_ile']
    },
    {
      id: 'valine-breakdown',
      name: 'Valine Breakdown',
      description: 'Catabolic pathway for valine. Valine is transaminated to α-ketoisovalerate, then oxidatively decarboxylated to isobutyryl-CoA. Further catabolism produces propionyl-CoA, which converges with the isoleucine pathway. Propionyl-CoA is carboxylated to methylmalonyl-CoA and isomerized to succinyl-CoA. Succinyl-CoA feeds into the TCA cycle.',
      reactionIndices: [13, 14, 15, 16, 11, 27], // Valine transamination, transport, BCKAD, valine-specific steps, shared propionyl-CoA steps (10-11), plus TCA entry
      nodeIds: ['valine', 'alpha_ketoisovalerate', 'alpha_ketoisovalerate_mito', 'isobutyryl_coa', 'propionyl_coa_ile', 'methylmalonyl_coa', 'succinyl_coa_bcaa', 'tca_cycle_bcaa', 'alpha_ketoglutarate_val', 'glutamate_val']
    },
    {
      id: 'lysine-breakdown',
      name: 'Lysine Breakdown',
      description: 'Catabolic pathway for lysine. Lysine follows a distinct pathway via saccharopine, α-aminoadipic semialdehyde, α-aminoadipate, and α-ketoadipate. Further catabolism produces glutaryl-CoA, crotonyl-CoA, β-hydroxybutyryl-CoA, acetoacetyl-CoA, and finally two molecules of acetyl-CoA. Acetyl-CoA feeds into the TCA cycle.',
      reactionIndices: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], // All lysine-specific steps including transport, plus TCA entry
      nodeIds: ['lysine', 'saccharopine', 'alpha_aminoadipic_semialdehyde', 'alpha_aminoadipate', 'alpha_ketoadipate', 'alpha_ketoadipate_mito', 'glutaryl_coa', 'crotonyl_coa', 'beta_hydroxybutyryl_coa', 'acetoacetyl_coa', 'acetyl_coa_lys', 'tca_cycle_bcaa', 'alpha_ketoglutarate_lys_1', 'alpha_ketoglutarate_lys_trans', 'glutamate_lys_2', 'glutamate_lys_trans']
    }
  ]
};

export { branchedChainAminoAcidBreakdownNodes, branchedChainAminoAcidBreakdownReactions, branchedChainAminoAcidBreakdownArrows };

