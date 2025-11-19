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
      reactionIndices: [0, 1, 2, 3, 4, 5, 23], // Leucine transamination, BCKAD, and leucine-specific steps, plus TCA entry
      nodeIds: ['leucine', 'alpha_ketoisocaproate', 'isovaleryl_coa', 'beta_methylcrotonyl_coa', 'beta_methylglutaconyl_coa', 'hmg_coa', 'acetoacetate_bcaa', 'acetyl_coa_leu', 'tca_cycle_bcaa']
    },
    {
      id: 'isoleucine-breakdown',
      name: 'Isoleucine Breakdown',
      description: 'Catabolic pathway for isoleucine. Isoleucine is transaminated to α-keto-β-methylvalerate, then oxidatively decarboxylated to α-methylbutyryl-CoA. Further catabolism produces propionyl-CoA, which is carboxylated to methylmalonyl-CoA and isomerized to succinyl-CoA. Succinyl-CoA feeds into the TCA cycle.',
      reactionIndices: [6, 7, 8, 9, 10, 23], // Isoleucine transamination, BCKAD, and isoleucine-specific steps, plus TCA entry
      nodeIds: ['isoleucine', 'alpha_keto_beta_methylvalerate', 'alpha_methylbutyryl_coa', 'propionyl_coa_ile', 'methylmalonyl_coa', 'succinyl_coa_bcaa', 'tca_cycle_bcaa']
    },
    {
      id: 'valine-breakdown',
      name: 'Valine Breakdown',
      description: 'Catabolic pathway for valine. Valine is transaminated to α-ketoisovalerate, then oxidatively decarboxylated to isobutyryl-CoA. Further catabolism produces propionyl-CoA, which converges with the isoleucine pathway. Propionyl-CoA is carboxylated to methylmalonyl-CoA and isomerized to succinyl-CoA. Succinyl-CoA feeds into the TCA cycle.',
      reactionIndices: [11, 12, 13, 9, 10, 23], // Valine transamination, BCKAD, valine-specific steps, shared propionyl-CoA steps (9-10), plus TCA entry
      nodeIds: ['valine', 'alpha_ketoisovalerate', 'isobutyryl_coa', 'propionyl_coa_ile', 'methylmalonyl_coa', 'succinyl_coa_bcaa', 'tca_cycle_bcaa']
    },
    {
      id: 'lysine-breakdown',
      name: 'Lysine Breakdown',
      description: 'Catabolic pathway for lysine. Lysine follows a distinct pathway via saccharopine, α-aminoadipic semialdehyde, α-aminoadipate, and α-ketoadipate. Further catabolism produces glutaryl-CoA, crotonyl-CoA, β-hydroxybutyryl-CoA, acetoacetyl-CoA, and finally two molecules of acetyl-CoA. Acetyl-CoA feeds into the TCA cycle.',
      reactionIndices: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23], // All lysine-specific steps, plus TCA entry
      nodeIds: ['lysine', 'saccharopine', 'alpha_aminoadipic_semialdehyde', 'alpha_aminoadipate', 'alpha_ketoadipate', 'glutaryl_coa', 'crotonyl_coa', 'beta_hydroxybutyryl_coa', 'acetoacetyl_coa', 'acetyl_coa_lys', 'tca_cycle_bcaa']
    }
  ]
};

export { branchedChainAminoAcidBreakdownNodes, branchedChainAminoAcidBreakdownReactions, branchedChainAminoAcidBreakdownArrows };

