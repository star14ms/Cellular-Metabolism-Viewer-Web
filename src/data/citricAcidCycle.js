/**
 * Citric Acid Cycle (Krebs Cycle) Pathway Data
 * 
 * A circular pathway that oxidizes acetyl-CoA to CO₂, producing ATP, NADH, FADH₂, and GTP
 */

export const citricAcidCycleReactions = [
  {
    step: 1,
    name: 'Citrate Formation',
    substrate: {
      id: 'oxaloacetate',
      name: 'Oxaloacetate',
      formula: 'C₄H₄O₅',
      description: 'A four-carbon dicarboxylic acid that accepts acetyl-CoA',
      smiles: 'C(=O)CC(=O)C(=O)O'
    },
    product: {
      id: 'citrate',
      name: 'Citrate',
      formula: 'C₆H₈O₇',
      description: 'A six-carbon tricarboxylic acid',
      smiles: 'C(C(=O)O)C(CC(=O)O)(C(=O)O)O'
    },
    enzyme: {
      name: 'Citrate Synthase',
      ecNumber: '4.2.1.3',
      description: 'Condenses oxaloacetate and acetyl-CoA to form citrate',
      cofactors: ['None']
    },
    coSubstrate: {
      name: 'Acetyl-CoA',
      formula: 'C₂₃H₃₈N₇O₁₇P₃S'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'First step of the cycle, highly regulated'
    },
    position: {
      x: 2050,
      y: 200  // Top (0°) - scaled 1.5x from center (425)
    }
  },
  {
    step: 2,
    name: 'Citrate Isomerization',
    substrate: {
      id: 'citrate',
      name: 'Citrate',
      formula: 'C₆H₈O₇',
      smiles: 'C(C(=O)O)C(CC(=O)O)(C(=O)O)O',
      description: 'A six-carbon tricarboxylic acid'
    },
    product: {
      id: 'isocitrate',
      name: 'Isocitrate',
      formula: 'C₆H₈O₇',
      description: 'An isomer of citrate',
      smiles: 'C(C(C(=O)O)O)(CC(=O)O)C(=O)O'
    },
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
    },
    position: {
      x: 2209,  // Top-right (45°) - scaled 1.5x
      y: 266
    }
  },
  {
    step: 3,
    name: 'Isocitrate Oxidation',
    substrate: {
      id: 'isocitrate',
      name: 'Isocitrate',
      formula: 'C₆H₈O₇',
      smiles: 'C(C(C(=O)O)O)(CC(=O)O)C(=O)O',
      description: 'An isomer of citrate'
    },
    product: {
      id: 'alpha_ketoglutarate',
      name: 'α-Ketoglutarate',
      formula: 'C₅H₆O₅',
      description: 'A five-carbon dicarboxylic acid',
      smiles: 'C(CC(=O)O)C(=O)C(=O)O'
    },
    enzyme: {
      name: 'Isocitrate Dehydrogenase',
      ecNumber: '1.1.1.42',
      description: 'Oxidizes and decarboxylates isocitrate to α-ketoglutarate',
      cofactors: ['NAD⁺', 'Mn²⁺ or Mg²⁺']
    },
    coSubstrate: {
      name: 'NAD⁺'
    },
    byproduct: {
      name: 'NADH',
      formula: 'C₂₁H₂₇N₇O₁₄P₂'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'First oxidative decarboxylation, produces NADH and CO₂'
    },
    position: {
      x: 2275,  // Right (90°) - scaled 1.5x
      y: 425
    }
  },
  {
    step: 4,
    name: 'α-Ketoglutarate Oxidation',
    substrate: {
      id: 'alpha_ketoglutarate',
      name: 'α-Ketoglutarate',
      formula: 'C₅H₆O₅',
      smiles: 'C(CC(=O)O)C(=O)C(=O)O',
      description: 'A five-carbon dicarboxylic acid'
    },
    product: {
      id: 'succinyl_coa',
      name: 'Succinyl-CoA',
      formula: 'C₂₅H₄₀N₇O₁₉P₃S',
      description: 'A four-carbon thioester',
      smiles: 'C(CC(=O)O)CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1'
    },
    enzyme: {
      name: 'α-Ketoglutarate Dehydrogenase Complex',
      ecNumber: '1.2.4.2',
      description: 'Oxidizes and decarboxylates α-ketoglutarate to succinyl-CoA',
      cofactors: ['TPP', 'Lipoic acid', 'FAD', 'NAD⁺', 'CoA']
    },
    coSubstrate: {
      name: 'CoA',
      formula: 'C₂₁H₃₆N₇O₁₆P₃S'
    },
    byproduct: {
      name: 'CO₂',
      formula: 'CO₂'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Second oxidative decarboxylation, similar to pyruvate oxidation'
    },
    position: {
      x: 2209,  // Bottom-right (135°) - scaled 1.5x
      y: 584
    }
  },
  {
    step: 5,
    name: 'Succinyl-CoA Conversion',
    substrate: {
      id: 'succinyl_coa',
      name: 'Succinyl-CoA',
      formula: 'C₂₅H₄₀N₇O₁₉P₃S',
      smiles: 'C(CC(=O)O)CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
      description: 'A four-carbon thioester'
    },
    product: {
      id: 'succinate',
      name: 'Succinate',
      formula: 'C₄H₆O₄',
      description: 'A four-carbon dicarboxylic acid',
      smiles: 'C(CC(=O)O)C(=O)O'
    },
    enzyme: {
      name: 'Succinyl-CoA Synthetase',
      ecNumber: '6.2.1.5',
      description: 'Converts succinyl-CoA to succinate, producing GTP (or ATP)',
      cofactors: ['GDP or ADP', 'Pi']
    },
    coSubstrate: {
      name: 'GDP',
      formula: 'C₁₀H₁₅N₅O₁₁P₂'
    },
    byproduct: {
      name: 'GTP',
      formula: 'C₁₀H₁₆N₅O₁₄P₃'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Substrate-level phosphorylation producing GTP'
    },
    position: {
      x: 2050,  // Bottom (180°) - scaled 1.5x from center (425)
      y: 650
    }
  },
  {
    step: 6,
    name: 'Succinate Oxidation',
    substrate: {
      id: 'succinate',
      name: 'Succinate',
      formula: 'C₄H₆O₄',
      smiles: 'C(CC(=O)O)C(=O)O',
      description: 'A four-carbon dicarboxylic acid'
    },
    product: {
      id: 'fumarate',
      name: 'Fumarate',
      formula: 'C₄H₄O₄',
      description: 'A four-carbon unsaturated dicarboxylic acid',
      smiles: 'C(=CC(=O)O)C(=O)O'
    },
    enzyme: {
      name: 'Succinate Dehydrogenase',
      ecNumber: '1.3.5.1',
      description: 'Oxidizes succinate to fumarate, reducing FAD to FADH₂',
      cofactors: ['FAD', 'Iron-sulfur clusters']
    },
    coSubstrate: {
      name: 'FAD'
    },
    byproduct: {
      name: 'FADH₂',
      formula: 'C₂₇H₃₃N₉O₁₅P₂'
    },
    conditions: {
      location: 'Inner mitochondrial membrane',
      requirement: 'Aerobic conditions',
      notes: 'Only membrane-bound enzyme of the cycle, part of Complex II'
    },
    position: {
      x: 1891,  // Bottom-left (225°) - scaled 1.5x
      y: 584
    }
  },
  {
    step: 7,
    name: 'Fumarate Hydration',
    substrate: {
      id: 'fumarate',
      name: 'Fumarate',
      formula: 'C₄H₄O₄',
      smiles: 'C(=CC(=O)O)C(=O)O',
      description: 'A four-carbon unsaturated dicarboxylic acid'
    },
    product: {
      id: 'malate',
      name: 'Malate',
      formula: 'C₄H₆O₅',
      description: 'A four-carbon hydroxy dicarboxylic acid',
      smiles: 'C(C(C(=O)O)O)C(=O)O'
    },
    enzyme: {
      name: 'Fumarase',
      ecNumber: '4.2.1.2',
      description: 'Adds water to fumarate to form malate',
      cofactors: ['None']
    },
    coSubstrate: {
      name: 'H₂O',
      formula: 'H₂O'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Stereospecific addition of water'
    },
    position: {
      x: 1825,  // Left (270°) - scaled 1.5x
      y: 425
    }
  },
  {
    step: 8,
    name: 'Malate Oxidation',
    substrate: {
      id: 'malate',
      name: 'Malate',
      formula: 'C₄H₆O₅',
      smiles: 'C(C(C(=O)O)O)C(=O)O',
      description: 'A four-carbon hydroxy dicarboxylic acid'
    },
    product: {
      id: 'oxaloacetate',
      name: 'Oxaloacetate',
      formula: 'C₄H₄O₅',
      smiles: 'C(=O)CC(=O)C(=O)O',
      description: 'A four-carbon dicarboxylic acid that regenerates the cycle'
    },
    enzyme: {
      name: 'Malate Dehydrogenase',
      ecNumber: '1.1.1.37',
      description: 'Oxidizes malate to oxaloacetate, reducing NAD⁺ to NADH',
      cofactors: ['NAD⁺']
    },
    coSubstrate: {
      name: 'NAD⁺'
    },
    byproduct: {
      name: 'NADH',
      formula: 'C₂₁H₂₇N₇O₁₄P₂'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Regenerates oxaloacetate to complete the cycle'
    },
    position: {
      x: 1891,  // Top-left (315°) - scaled 1.5x
      y: 266
    }
  }
];

export const citricAcidCycleSummary = {
  name: 'Citric Acid Cycle (Krebs Cycle)',
  description: 'A circular metabolic pathway that oxidizes acetyl-CoA to CO₂, producing energy carriers (ATP, NADH, FADH₂)',
  location: 'Mitochondrial matrix',
  netProducts: {
    atp: { produced: 1, consumed: 0, net: 1 },
    nadh: { produced: 3, consumed: 0, net: 3 },
    fadh2: { produced: 1, consumed: 0, net: 1 },
    co2: { produced: 2, consumed: 0, net: 2 }
  },
  keyRegulatorySteps: [
    'Step 1: Citrate synthase (inhibited by ATP, NADH, succinyl-CoA)',
    'Step 3: Isocitrate dehydrogenase (activated by ADP, Ca²⁺)',
    'Step 4: α-Ketoglutarate dehydrogenase (inhibited by succinyl-CoA, NADH)'
  ]
};

