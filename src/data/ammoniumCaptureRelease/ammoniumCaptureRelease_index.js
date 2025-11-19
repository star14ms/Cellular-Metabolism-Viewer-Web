/**
 * Ammonium Capture and Release Pathway - Index
 */

import { ammoniumCaptureReleaseNodes } from './ammoniumCaptureRelease_nodes.js';
import { ammoniumCaptureReleaseReactions } from './ammoniumCaptureRelease_reactions.js';
import { ammoniumCaptureReleaseArrows } from './ammoniumCaptureRelease_arrows.js';

export const ammoniumCaptureReleaseData = {
  nodes: ammoniumCaptureReleaseNodes,
  reactions: ammoniumCaptureReleaseReactions,
  arrows: ammoniumCaptureReleaseArrows,
  cycles: [],
  summary: {
    name: 'Ammonium Capture and Release',
    pathwayType: 'amino_acids',
    description: 'The ammonium capture and release pathway is central to nitrogen metabolism. It involves the interconversion of α-ketoglutarate, glutamate, and glutamine, which serve as key intermediates for ammonium storage and transport. Glutamate dehydrogenase reversibly converts α-ketoglutarate to glutamate, consuming or releasing NH₄⁺. Glutamine synthetase captures ammonium by converting glutamate to glutamine (consuming ATP), while glutaminase releases ammonium by hydrolyzing glutamine back to glutamate. Glutamate also participates in transamination reactions with various amino acids and α-ketoacids. The pathway includes the GABA shunt (glutamate → GABA → succinic semialdehyde → succinate), which connects to the TCA cycle. N-acetylglutamate, synthesized from glutamate and acetyl-CoA, serves as an allosteric activator of carbamoyl phosphate synthetase I in the urea cycle.',
    location: 'Mitochondrial matrix, Cytosol',
    netProducts: {
      'Glutamine': { produced: 1, consumed: 0, net: 1 },
      'NH₄⁺': { produced: 0, consumed: 1, net: -1 }
    },
    keyRegulatorySteps: [
      { id: 'glutamate', text: 'Glutamate Dehydrogenase - Reversible reaction linking TCA cycle to amino acid metabolism, consumes/releases NH₄⁺' },
      { id: 'glutamine', text: 'Glutamine Synthetase - ATP-dependent ammonium capture, key for nitrogen storage and transport' },
      { id: 'gaba', text: 'GABA Shunt - Alternative pathway from glutamate to succinate, bypassing part of TCA cycle' },
      { id: 'n_acetylglutamate', text: 'N-Acetylglutamate Synthase - Produces allosteric activator for urea cycle regulation' }
    ]
  },
  // Sub-pathways definition - 4 sub-pathways, one for each branch from glutamate
  // Note: All sub-pathways start from glutamate and branch into different directions
  // α-ketoglutarate and succinate nodes are extended from the Citric acid cycle
  subPathways: [
    {
      id: 'glutamate-dehydrogenase-transamination-pathway',
      name: 'Glutamate Dehydrogenase & Transamination Pathway',
      description: 'Pathway connecting the TCA cycle to amino acid metabolism. Glutamate dehydrogenase reversibly converts α-ketoglutarate (from TCA cycle) to glutamate, consuming or releasing NH₄⁺. Glutamate also participates in transamination reactions with various amino acids and α-ketoacids, serving as the amino group donor/acceptor. This pathway links central carbon metabolism to nitrogen metabolism.',
      reactionIndices: [0, 1], // Glutamate dehydrogenase (α-ketoglutarate ↔ glutamate, rxn_acr_1) and transamination (glutamate ↔ many amino acids/α-ketoacids, rxn_acr_4)
      nodeIds: ['alpha_ketoglutarate', 'glutamate', 'many_amino_acids', 'many_alpha_ketoacids']
    },
    {
      id: 'gaba-shunt-pathway',
      name: 'GABA Shunt Pathway',
      description: 'Alternative pathway from glutamate to succinate, bypassing part of the TCA cycle. Glutamate is decarboxylated to γ-aminobutyric acid (GABA), a neurotransmitter. GABA is transaminated with α-ketoglutarate to form succinic semialdehyde and glutamate. Succinic semialdehyde is oxidized to succinate, which enters the TCA cycle.',
      reactionIndices: [6, 7, 8], // GABA synthesis (glutamate → GABA, rxn_acr_7), GABA transamination (GABA → succinic semialdehyde, rxn_acr_8), and succinic semialdehyde oxidation (succinic semialdehyde → succinate, rxn_acr_9)
      nodeIds: ['glutamate', 'gaba', 'succinic_semialdehyde', 'succinate']
    },
    {
      id: 'glutamine-pathway',
      name: 'Glutamine Pathway',
      description: 'Ammonium capture and release pathway. Glutamate is converted to glutamine via glutamine synthetase (consuming ATP and NH₄⁺), storing ammonium. Glutamine can be hydrolyzed back to glutamate via glutaminase, releasing NH₄⁺. This pathway is central to nitrogen metabolism and ammonium storage/transport.',
      reactionIndices: [2, 3], // Glutamine synthesis (glutamate → glutamine, rxn_acr_2) and glutamine hydrolysis (glutamine → glutamate, rxn_acr_3)
      nodeIds: ['glutamate', 'glutamine']
    },
    {
      id: 'n-acetylglutamate-pathway',
      name: 'N-Acetylglutamate Pathway',
      description: 'Pathway for N-acetylglutamate synthesis and hydrolysis. Glutamate is acetylated to form N-acetylglutamate using acetyl-CoA. N-acetylglutamate serves as an allosteric activator of carbamoyl phosphate synthetase I in the urea cycle. N-acetylglutamate can be hydrolyzed back to glutamate and acetate.',
      reactionIndices: [4, 5], // N-Acetylglutamate synthase (glutamate → N-acetylglutamate, rxn_acr_5) and N-acetylglutamate hydrolysis (N-acetylglutamate → glutamate, rxn_acr_6)
      nodeIds: ['glutamate', 'n_acetylglutamate']
    }
  ]
};

export { ammoniumCaptureReleaseNodes, ammoniumCaptureReleaseReactions, ammoniumCaptureReleaseArrows };

