/**
 * Lactate Fermentation Pathway - Nodes Data
 * 
 * Nodes represent molecules, carriers, and protein complexes
 * Each node has a unique ID and position
 */

const unit_space = 300;
const base_x = 100;
const base_y = 1350; // Same y-position as pyruvate in pyruvateOxidation

export const lactateFermentationNodes = [
  // Molecules
  {
    id: 'pyruvate',
    type: 'molecule',
    name: 'Pyruvate',
    formula: 'C₃H₃O₃⁻',
    description: 'A three-carbon compound produced by glycolysis',
    smiles: 'CC(=O)C(=O)[O-]',
    position: { x: base_x, y: base_y },
  },
  {
    id: 'lactate',
    type: 'molecule',
    name: 'Lactate',
    formula: 'C₃H₅O₃⁻',
    description: 'Lactic acid, produced by fermentation from pyruvate',
    smiles: 'CC(C(=O)[O-])O',
    position: { x: base_x + unit_space, y: base_y }, // To the right of pyruvate
  }
];

