/**
 * Pyruvate Oxidation Pathway - Nodes Data
 * 
 * Nodes represent molecules, carriers, and protein complexes
 * Each node has a unique ID and position
 */

export const pyruvateOxidationNodes = [
  // Molecules
  {
    id: 'pyruvate',
    type: 'molecule',
    name: 'Pyruvate',
    formula: 'C₃H₃O₃⁻',
    description: 'A three-carbon compound produced by glycolysis',
    smiles: 'CC(=O)C(=O)[O-]',
    position: { x: 100, y: 1450 },
    // hidden: true
  },
  {
    id: 'hydroxyethyl-tpp',
    type: 'molecule',
    name: 'Hydroxyethyl-TPP',
    formula: 'C₆H₁₀O₂',
    description: 'Intermediate formed by pyruvate decarboxylation',
    smiles: 'CC(O)C',
    position: { x: 100, y: 1600 }
  },
  {
    id: 'acetyl-lipoamide',
    type: 'molecule',
    name: 'Acetyl-lipoamide',
    formula: 'C₈H₁₅NOS₂',
    description: 'Acetyl group attached to lipoic acid',
    smiles: 'CC(=O)SCCCCCS',
    position: { x: 100, y: 1750 }
  },
  {
    id: 'acetyl-coa',
    type: 'molecule',
    name: 'Acetyl-CoA',
    formula: 'C₂₃H₃₈N₇O₁₇P₃S',
    description: 'Acetyl coenzyme A, the entry point to the citric acid cycle',
    smiles: 'CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: 100, y: 1900 },
  },
  {
    id: 'dihydrolipoamide',
    type: 'molecule',
    name: 'Dihydrolipoamide',
    formula: 'C₈H₁₇NOS₂',
    description: 'Reduced form of lipoic acid',
    smiles: 'CCCCCSCCS',
    position: { x: 250, y: 1825 }
  },
  {
    id: 'lipoamide',
    type: 'molecule',
    name: 'Lipoamide',
    formula: 'C₈H₁₅NOS₂',
    description: 'Oxidized form of lipoic acid',
    smiles: 'CCCCCSCCS',
    position: { x: 250, y: 1675 }
  }
];

