/**
 * Ethanol Fermentation Pathway - Nodes Data
 * 
 * Nodes represent molecules, carriers, and protein complexes
 * Each node has a unique ID and position
 */

const unit_space = 300;
const base_x = 100;
const base_y = 1350; // Same y-position as pyruvate in pyruvateOxidation

export const ethanolFermentationNodes = [
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
    id: 'acetaldehyde',
    type: 'molecule',
    name: 'Acetaldehyde',
    formula: 'C₂H₄O',
    description: 'Two-carbon aldehyde, intermediate in ethanol fermentation',
    smiles: 'CC=O',
    position: { x: base_x + unit_space * 0.5, y: base_y + unit_space * 0.5 }, // Lower right of pyruvate
  },
  {
    id: 'ethanol',
    type: 'molecule',
    name: 'Ethanol',
    formula: 'C₂H₆O',
    description: 'Ethyl alcohol, final product of ethanol fermentation',
    smiles: 'CCO',
    position: { x: base_x + unit_space * 1, y: base_y + unit_space * 0.5 }, // Next to acetaldehyde
  }
];

