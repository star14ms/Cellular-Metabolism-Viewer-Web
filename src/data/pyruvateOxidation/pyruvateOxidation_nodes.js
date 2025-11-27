/**
 * Pyruvate Oxidation Pathway - Nodes Data
 * 
 * Nodes represent molecules, carriers, and protein complexes
 * Each node has a unique ID and position
 * 
 * Positions are relative to the first node (pyruvate) using unit_space notation.
 * unit_space = 150 (standard spacing between nodes)
 * 
 * Optional fields:
 * - hideNodeVisual: Boolean - If true, the node visual will not be drawn,
 *   but by-molecule arrows (byreactant/byproduct) will still be drawn if they exist.
 *   This is different from 'hidden' which completely removes the node and all connections.
 */

const unit_space = 150;
const height_arrow = 74;
const base_x = 100;
const base_y = 2035; // Continuation from glycolysis pyruvate

export const pyruvateOxidationNodes = [
  // Molecules
  {
    id: 'pyruvate',
    type: 'molecule',
    name: 'Pyruvate (Mitochondrial)',
    formula: 'C₃H₃O₃⁻',
    description: 'A three-carbon compound produced by glycolysis',
    smiles: 'CC(=O)C(=O)[O-]',
    position: { x: base_x, y: base_y },
  },
  {
    id: 'thiamine-pyrophosphate',
    type: 'molecule',
    name: 'Thiamine pyrophosphate',
    formula: 'C₁₂H₂₀N₄O₁₀P₂',
    description: 'Thiamine pyrophosphate',
    smiles: 'C1=CC(=C(C(=C1O)N)N)N(C(=O)O)C(=O)O',
    position: { x: base_x, y: base_y + height_arrow * 2 }
  },
  {
    id: 'hydroxyethyl-tpp',
    type: 'molecule',
    name: 'Hydroxyethyl-TPP',
    formula: 'C₆H₁₀O₂',
    description: 'Intermediate formed by pyruvate decarboxylation',
    smiles: 'CC(O)C',
    position: { x: base_x - unit_space * 1, y: base_y + height_arrow * 2 }
  },
  {
    id: 'lipoamide',
    type: 'molecule',
    name: 'Lipoamide',
    formula: 'C₈H₁₅NOS₂',
    description: 'Oxidized form of lipoic acid',
    smiles: 'CCCCCSCCS',
    position: { x: base_x - unit_space * 1, y: base_y + height_arrow * 2 + unit_space }
  },
  {
    id: 'acetyl-lipoamide',
    type: 'molecule',
    name: 'Acetyl-lipoamide',
    formula: 'C₈H₁₅NOS₂',
    description: 'Acetyl group attached to lipoic acid',
    smiles: 'CC(=O)SCCCCCS',
    position: { x: base_x, y: base_y + height_arrow * 2 + unit_space }
  },
  {
    id: 'dihydrolipoamide',
    type: 'molecule',
    name: 'Dihydrolipoamide',
    formula: 'C₈H₁₇NOS₂',
    description: 'Reduced form of lipoic acid',
    smiles: 'CCCCCSCCS',
    position: { x: base_x - unit_space * 0.5, y: base_y + height_arrow * 2 + unit_space * 2 }
  },
  {
    id: 'acetyl-coa',
    type: 'molecule',
    name: 'Acetyl-CoA',
    formula: 'C₂₃H₃₈N₇O₁₇P₃S',
    description: 'Acetyl coenzyme A, the entry point to the citric acid cycle',
    smiles: 'CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x + unit_space * 0.4, y: base_y + height_arrow * 2.5 + unit_space * 2 },
  }
];

