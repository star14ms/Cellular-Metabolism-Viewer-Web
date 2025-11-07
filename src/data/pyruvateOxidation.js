/**
 * Pyruvate Oxidation Pathway Data
 * 
 * Pyruvate → Acetyl-CoA
 * This is the bridge between glycolysis and the citric acid cycle
 * The pyruvate dehydrogenase complex consists of multiple enzymatic steps
 */

export const pyruvateOxidationReactions = [
  {
    step: 1,
    name: 'Pyruvate Decarboxylation',
    substrate: {
      id: 'pyruvate',
      name: 'Pyruvate',
      formula: 'C₃H₃O₃⁻',
      description: 'A three-carbon compound produced by glycolysis',
      smiles: 'CC(=O)C(=O)[O-]'
    },
    product: {
      id: 'hydroxyethyl-tpp',
      name: 'Hydroxyethyl-TPP',
      formula: 'C₆H₁₀O₂',
      description: 'Intermediate formed by pyruvate decarboxylation',
      smiles: 'CC(O)C'
    },
    enzyme: {
      name: 'Pyruvate Dehydrogenase (E1)',
      ecNumber: '1.2.4.1',
      description: 'Decarboxylates pyruvate and attaches it to thiamine pyrophosphate (TPP)',
      cofactors: ['Thiamine pyrophosphate (TPP)', 'Mg²⁺']
    },
    byreactant: '', // Empty - only byproduct shown
    byproduct: {
      name: 'CO₂',
      formula: 'CO₂',
      description: 'Carbon dioxide released as a byproduct'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'First step of pyruvate dehydrogenase complex'
    },
    position: {
      x: 1450,
      y: 100
    }
  },
  {
    step: 2,
    name: 'Oxidation and Transfer',
    substrate: {
      id: 'hydroxyethyl-tpp',
      name: 'Hydroxyethyl-TPP',
      formula: 'C₆H₁₀O₂',
      description: 'Intermediate formed by pyruvate decarboxylation',
      smiles: 'CC(O)C'
    },
    product: {
      id: 'acetyl-lipoamide',
      name: 'Acetyl-lipoamide',
      formula: 'C₈H₁₅NOS₂',
      description: 'Acetyl group attached to lipoic acid',
      smiles: 'CC(=O)SCCCCCS'
    },
    enzyme: {
      name: 'Dihydrolipoyl Transacetylase (E2)',
      ecNumber: '2.3.1.12',
      description: 'Transfers acetyl group from TPP to lipoic acid',
      cofactors: ['Lipoic acid', 'TPP']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Second step: oxidation and transfer to lipoamide'
    },
    position: {
      x: 1600,
      y: 100
    }
  },
  {
    step: 3,
    name: 'Acetyl-CoA Formation',
    substrate: {
      id: 'acetyl-lipoamide',
      name: 'Acetyl-lipoamide',
      formula: 'C₈H₁₅NOS₂',
      description: 'Acetyl group attached to lipoic acid',
      smiles: 'CC(=O)SCCCCCS'
    },
    product: {
      id: 'acetyl-coa',
      name: 'Acetyl-CoA',
      formula: 'C₂₃H₃₈N₇O₁₇P₃S',
      description: 'Acetyl coenzyme A, the entry point to the citric acid cycle',
      smiles: 'CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1'
    },
    enzyme: {
      name: 'Dihydrolipoyl Transacetylase (E2)',
      ecNumber: '2.3.1.12',
      description: 'Transfers acetyl group from lipoic acid to CoA, forming acetyl-CoA',
      cofactors: ['Coenzyme A', 'Lipoic acid']
    },
    coSubstrate: {
      name: 'CoA',
      formula: 'C₂₁H₃₆N₇O₁₆P₃S'
    },
    byreactant: 'CoA', // For display on map
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Third step: formation of acetyl-CoA and reduced lipoamide'
    },
    position: {
      x: 1750,
      y: 100
    }
  },
  {
    step: 4,
    name: 'Lipoamide Regeneration',
    substrate: {
      id: 'dihydrolipoamide',
      name: 'Dihydrolipoamide',
      formula: 'C₈H₁₇NOS₂',
      description: 'Reduced form of lipoic acid',
      smiles: 'CCCCCSCCS'
    },
    product: {
      id: 'lipoamide',
      name: 'Lipoamide',
      formula: 'C₈H₁₅NOS₂',
      description: 'Oxidized form of lipoic acid',
      smiles: 'CCCCCSCCS'
    },
    enzyme: {
      name: 'Dihydrolipoyl Dehydrogenase (E3)',
      ecNumber: '1.8.1.4',
      description: 'Regenerates oxidized lipoamide by reducing FAD to FADH₂',
      cofactors: ['FAD', 'NAD⁺']
    },
    coSubstrate: {
      name: 'NAD⁺'
    },
    byreactant: 'NAD⁺', // For display on map
    byproduct: {
      name: 'NADH',
      formula: 'C₂₁H₂₇N₇O₁₄P₂'
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Final step: regenerates lipoamide and produces NADH'
    },
    position: {
      x: 1825, // Aligned with midpoint of Step 3 → Acetyl-CoA arrow ((1750 + 1900) / 2 = 1825) for vertical connection
      y: 250 // Same y as Lipoamide, forming bottom row of square
    }
  }
];

export const pyruvateOxidationSummary = {
  name: 'Pyruvate Oxidation',
  description: 'The conversion of pyruvate to acetyl-CoA, linking glycolysis to the citric acid cycle',
  netProducts: {
    acetylCoA: { produced: 2, consumed: 0, net: 2 },
    co2: { produced: 2, consumed: 0, net: 2 },
    nadh: { produced: 2, consumed: 0, net: 2 }
  }
};

