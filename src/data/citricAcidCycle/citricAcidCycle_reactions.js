/**
 * Citric Acid Cycle - Reactions Data
 */

export const citricAcidCycleReactions = [
  {
    id: 'rxn_cac_1',
    name: 'Citrate Formation',
    byproduct: ['CoA'],
    displayByreactant: ['Acetyl-CoA'],
    enzyme: {
      name: 'Citrate Synthase',
      ecNumber: '4.2.1.3',
      description: 'Condenses oxaloacetate and acetyl-CoA to form citrate',
      cofactors: ['None']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'First step of the cycle, highly regulated. Releases CoA when citrate is formed.'
    }
  },
  {
    id: 'rxn_cac_2',
    name: 'Citrate Isomerization',
    enzyme: {
      name: 'Aconitase',
      ecNumber: '4.2.1.3',
      description: 'Isomerizes citrate to isocitrate via cis-aconitate intermediate',
      cofactors: ['Fe²⁺']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Reversible reaction'
    }
  },
  {
    id: 'rxn_cac_3',
    name: 'Isocitrate Oxidation',
    byreactant: ['NAD⁺'],
    byproduct: ['CO₂', 'NADH'],
    enzyme: {
      name: 'Isocitrate Dehydrogenase',
      ecNumber: '1.1.1.42',
      description: 'Oxidizes and decarboxylates isocitrate to α-ketoglutarate',
      cofactors: ['NAD⁺', 'Mn²⁺ or Mg²⁺']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'First oxidative decarboxylation, produces NADH and CO₂'
    }
  },
  {
    id: 'rxn_cac_4',
    name: 'α-Ketoglutarate Oxidation',
    byreactant: ['CoA'],
    byproduct: ['CO₂', 'NADH'],
    enzyme: {
      name: 'α-Ketoglutarate Dehydrogenase Complex',
      ecNumber: '1.2.4.2',
      description: 'Oxidizes and decarboxylates α-ketoglutarate to succinyl-CoA',
      cofactors: ['TPP', 'Lipoic acid', 'FAD', 'NAD⁺', 'CoA']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Second oxidative decarboxylation, similar to pyruvate oxidation'
    }
  },
  {
    id: 'rxn_cac_5',
    name: 'Succinyl-CoA Conversion',
    byreactant: ['GDP'],
    byproduct: ['GTP'],
    enzyme: {
      name: 'Succinyl-CoA Synthetase',
      ecNumber: '6.2.1.5',
      description: 'Converts succinyl-CoA to succinate, producing GTP (or ATP)',
      cofactors: ['GDP or ADP', 'Pi']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Substrate-level phosphorylation producing GTP and releasing CoA'
    }
  },
  {
    id: 'rxn_cac_6',
    name: 'Succinate Oxidation',
    byreactant: ['FAD'],
    byproduct: ['FADH₂'],
    enzyme: {
      name: 'Succinate Dehydrogenase',
      ecNumber: '1.3.5.1',
      description: 'Oxidizes succinate to fumarate, reducing FAD to FADH₂',
      cofactors: ['FAD', 'Iron-sulfur clusters']
    },
    conditions: {
      location: 'Inner mitochondrial membrane',
      requirement: 'Aerobic conditions',
      notes: 'Only membrane-bound enzyme of the cycle, part of Complex II'
    }
  },
  {
    id: 'rxn_cac_7',
    name: 'Fumarate Hydration',
    byreactant: ['H₂O'],
    enzyme: {
      name: 'Fumarase',
      ecNumber: '4.2.1.2',
      description: 'Adds water to fumarate to form malate',
      cofactors: ['None']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Stereospecific addition of water'
    }
  },
  {
    id: 'rxn_cac_8',
    name: 'Malate Oxidation',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: 'Malate Dehydrogenase',
      ecNumber: '1.1.1.37',
      description: 'Oxidizes malate to oxaloacetate, reducing NAD⁺ to NADH',
      cofactors: ['NAD⁺']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Regenerates oxaloacetate to complete the cycle'
    }
  }
];

