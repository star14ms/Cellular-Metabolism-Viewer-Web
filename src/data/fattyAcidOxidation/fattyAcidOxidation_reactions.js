import { fattyAcidAndLipidSynthesisNodes } from '../fattyAcidAndLipidSynthesis/fattyAcidAndLipidSynthesis_nodes.js';
import { citricAcidCycleNodes } from '../citricAcidCycle/citricAcidCycle_nodes.js';

export const fattyAcidOxidationReactions = [
  // 1. Activation of Long-Chain Fatty Acids
  {
    id: 'rxn_fao_1',
    name: 'Long-chain fatty acyl-CoA synthetase',
    byreactant: ['ATP', 'CoA'],
    byproduct: ['AMP', 'PPi'],
    enzyme: {
      name: 'Acyl-CoA Synthetase',
      ecNumber: '6.2.1.3',
      description: 'Activates long-chain fatty acids by attaching CoA, consuming ATP',
      cofactors: ['ATP', 'CoA']
    },
    conditions: {
      location: 'Outer mitochondrial membrane',
      isReversible: false
    }
  },
  // 2. Carnitine Transport
  {
    id: 'rxn_fao_2',
    name: 'Carnitine Transport',
    enzyme: {
      name: 'Carnitine Transporter',
      description: 'Transports carnitine into the cell',
    },
    conditions: {
      location: 'Plasma membrane'
    }
  },
  // 3. Carnitine Synthesis from Lysine
  {
    id: 'rxn_fao_2b',
    name: 'Carnitine Synthesis from Lysine',
    enzyme: {
      name: 'Carnitine Biosynthesis Enzymes',
      description: 'Synthesizes carnitine from lysine through multiple enzymatic steps',
    },
    conditions: {
      location: 'Liver and kidney'
    }
  },
  // 4. CPT1
  {
    id: 'rxn_fao_cpt1',
    name: 'Carnitine Palmitoyltransferase 1 (CPT1)',
    byproduct: ['CoA'],
    displayByproduct: ['fatty_acyl_carnitine_fao'],
    enzyme: {
      name: 'CPT1',
      ecNumber: '2.3.1.21',
      description: 'Converts fatty acyl-CoA to fatty acyl-carnitine for transport',
      cofactors: ['Carnitine']
    },
    conditions: {
      location: 'Outer mitochondrial membrane',
      regulation: 'Inhibited by Malonyl-CoA'
    }
  },
  // 5. CPT2 / Translocase
  {
    id: 'rxn_fao_cpt2',
    name: 'Carnitine Palmitoyltransferase 2 (CPT2)',
    displayByproduct: ['carnitine_fao'],
    enzyme: {
      name: 'CPT2',
      ecNumber: '2.3.1.21',
      description: 'Reconverts fatty acyl-carnitine to fatty acyl-CoA inside mitochondria',
      cofactors: ['CoA']
    },
    conditions: {
      location: 'Inner mitochondrial membrane'
    }
  },
  // 6. Activation of Short/Medium-Chain Fatty Acids
  {
    id: 'rxn_fao_3',
    name: 'Fatty acyl-CoA synthetase (Mitochondrial)',
    byreactant: ['ATP', 'CoA'],
    byproduct: ['AMP', 'PPi'],
    enzyme: {
      name: 'Acyl-CoA Synthetase',
      description: 'Activates short/medium-chain fatty acids inside mitochondria',
      cofactors: ['ATP', 'CoA']
    },
    conditions: {
      location: 'Mitochondrial matrix'
    }
  },
  // 7. Acyl-CoA Dehydrogenase
  {
    id: 'rxn_fao_6',
    name: 'Acyl-CoA Dehydrogenase',
    byproduct: ['FADH₂'],
    enzyme: {
      name: 'Acyl-CoA Dehydrogenase',
      ecNumber: '1.3.8.7',
      description: 'Oxidizes fatty acyl-CoA, creating a double bond',
      cofactors: ['FAD']
    },
    conditions: {
      location: 'Mitochondrial matrix'
    }
  },
  // 8. Enoyl-CoA Hydratase
  {
    id: 'rxn_fao_7',
    name: 'Enoyl-CoA Hydratase',
    enzyme: {
      name: 'Enoyl-CoA Hydratase',
      ecNumber: '4.2.1.17',
      description: 'Hydrates the double bond',
      cofactors: ['H₂O']
    },
    conditions: {
      location: 'Mitochondrial matrix'
    }
  },
  // 9. Hydroxyacyl-CoA Dehydrogenase
  {
    id: 'rxn_fao_8',
    name: 'β-hydroxyacyl-CoA Dehydrogenase',
    byproduct: ['NADH', 'H⁺'],
    enzyme: {
      name: 'β-hydroxyacyl-CoA Dehydrogenase',
      ecNumber: '1.1.1.35',
      description: 'Oxidizes the hydroxyl group to a keto group',
      cofactors: ['NAD⁺']
    },
    conditions: {
      location: 'Mitochondrial matrix'
    }
  },
  // 10. Thiolase
  {
    id: 'rxn_fao_9',
    name: 'Thiolase',
    byreactant: ['CoA'],
    byproduct: ['propionyl_coa_fao'],
    hideByproductLabels: true,
    enzyme: {
      name: 'Thiolase',
      ecNumber: '2.3.1.16',
      description: 'Cleaves β-ketoacyl-CoA to Acetyl-CoA and shortened Acyl-CoA, odd chain fatty acids become Propionyl-CoA',
      cofactors: ['CoA']
    },
    conditions: {
      location: 'Mitochondrial matrix'
    }
  },
  // 11. Recycling
  {
    id: 'rxn_fao_recycle',
    name: 'Chain Shortening Recycling',
    byproduct: ['fatty_acyl_coa_mito_fao'],
    hideByproductLabels: true,
    description: 'Shortened fatty acyl-CoA re-enters the beta-oxidation cycle'
  },
  // 12. Propionyl-CoA Carboxylase
  {
    id: 'rxn_fao_11',
    name: 'Propionyl-CoA Carboxylase',
    byreactant: ['ATP', 'HCO₃⁻'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Propionyl-CoA Carboxylase',
      ecNumber: '6.4.1.3',
      description: 'Carboxylates propionyl-CoA to methylmalonyl-CoA',
      cofactors: ['ATP', 'CO₂', 'Biotin']
    },
    conditions: {
      location: 'Mitochondrial matrix'
    }
  },
  // 13. Methylmalonyl-CoA Mutase
  {
    id: 'rxn_fao_12',
    name: 'Methylmalonyl-CoA Mutase',
    enzyme: {
      name: 'Methylmalonyl-CoA Mutase',
      ecNumber: '5.4.99.2',
      description: 'Isomerizes methylmalonyl-CoA to succinyl-CoA',
      cofactors: ['Vitamin B12 (Cobalamin)']
    },
    conditions: {
      location: 'Mitochondrial matrix'
    }
  },
  // 14. TCA Entry
  {
    id: 'rxn_fao_tca',
    name: 'TCA Cycle Entry',
    description: 'Succinyl-CoA enters the Citric Acid Cycle'
  }
];
