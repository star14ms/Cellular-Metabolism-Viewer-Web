/**
 * Fermentation Pathway - Nodes Data
 * 
 * Nodes represent molecules, carriers, and protein complexes
 * Each node has a unique ID and position
 * 
 * Positions are relative to pyruvate using unit_space notation.
 * unit_space = 150 (standard spacing between nodes)
 * 
 * Optional fields:
 * - hideNodeVisual: Boolean - If true, the node visual will not be drawn,
 *   but by-molecule arrows (byreactant/byproduct) will still be drawn if they exist.
 *   This is different from 'hidden' which completely removes the node and all connections.
 */

const unit_space = 300;
const base_x = 100;
const base_y = 1350; // Same y-position as pyruvate in pyruvateOxidation

export const fermentationNodes = [
  // Molecules
  {
    id: 'lactate',
    type: 'molecule',
    name: 'Lactate',
    formula: 'C₃H₅O₃⁻',
    description: 'Lactic acid, produced by fermentation from pyruvate',
    smiles: 'CC(C(=O)[O-])O',
    position: { x: base_x + unit_space, y: base_y }, // To the right of pyruvate
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

