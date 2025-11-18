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
};

export { branchedChainAminoAcidBreakdownNodes, branchedChainAminoAcidBreakdownReactions, branchedChainAminoAcidBreakdownArrows };

