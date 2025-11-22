import { fattyAcidOxidationNodes } from './fattyAcidOxidation_nodes.js';
import { fattyAcidOxidationReactions } from './fattyAcidOxidation_reactions.js';
import { fattyAcidOxidationArrows } from './fattyAcidOxidation_arrows.js';

export const fattyAcidOxidationData = {
  id: 'fatty-acid-oxidation',
  name: 'Fatty Acid Oxidation',
  nodes: fattyAcidOxidationNodes,
  reactions: fattyAcidOxidationReactions,
  arrows: fattyAcidOxidationArrows,
  summary: {
    name: 'Fatty Acid Oxidation',
    pathwayType: 'lipids',
    description: 'The catabolic process by which fatty acid molecules are broken down in the mitochondria to generate Acetyl-CoA, which enters the Citric Acid Cycle, and NADH and FADH2, which are used in the Electron Transport Chain.',
    location: 'Mitochondrial matrix',
    netProducts: {
      'Acetyl-CoA': { produced: 1, consumed: 0, net: 1, note: 'Per cycle' },
      'NADH': { produced: 1, consumed: 0, net: 1, note: 'Per cycle' },
      'FADH₂': { produced: 1, consumed: 0, net: 1, note: 'Per cycle' },
      'ATP': { produced: 0, consumed: 2, net: -2, note: 'Activation step (equivalent)' }
    },
    keyRegulatorySteps: [
      { id: 'cpt1_fao', text: 'CPT1: The rate-limiting step for long-chain fatty acid oxidation, inhibited by Malonyl-CoA (an intermediate of fatty acid synthesis) to prevent futile cycling.' },
      { id: 'beta_hydroxyacyl_coa_fao', text: 'β-hydroxyacyl-CoA Dehydrogenase: Regulated by the NADH/NAD+ ratio.' },
      { id: 'acetyl_coa_fao', text: 'Thiolase: Inhibited by high concentrations of Acetyl-CoA.' }
    ]
  },
  subPathways: null
};

export {
  fattyAcidOxidationNodes,
  fattyAcidOxidationReactions,
  fattyAcidOxidationArrows
};
