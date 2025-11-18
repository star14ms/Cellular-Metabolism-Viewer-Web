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
};

export { ammoniumCaptureReleaseNodes, ammoniumCaptureReleaseReactions, ammoniumCaptureReleaseArrows };

