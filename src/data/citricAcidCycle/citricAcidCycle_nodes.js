/**
 * Citric Acid Cycle - Nodes Data
 * 
 * Positions are relative to the first node (oxaloacetate) using unit_space notation.
 * unit_space = 150 (standard spacing between nodes)
 * Note: The cycle forms a circular pattern, so some positions use fractional multipliers.
 */

const unit_space = 150;
const base_x = 200;
const base_y = 2660; // Continuation from pyruvate oxidation acetyl-coa

export const citricAcidCycleNodes = [
  // Main cycle nodes in clockwise order (matching arrow flow: oxaloacetate → citrate → ... → malate → oxaloacetate)
  {
    id: 'oxaloacetate',
    type: 'molecule',
    name: 'Oxaloacetate',
    formula: 'C₄H₄O₅',
    description: 'A four-carbon dicarboxylic acid that accepts acetyl-CoA',
    smiles: 'C(=O)CC(=O)C(=O)O',
    position: { x: base_x, y: base_y }
  },
  {
    id: 'citrate',
    type: 'molecule',
    name: 'Citrate',
    formula: 'C₆H₈O₇',
    description: 'A six-carbon tricarboxylic acid',
    smiles: 'C(C(=O)O)C(CC(=O)O)(C(=O)O)O',
    position: { x: base_x + unit_space * 1.06, y: base_y - unit_space * 0.44 }
  },
  {
    id: 'isocitrate',
    type: 'molecule',
    name: 'Isocitrate',
    formula: 'C₆H₈O₇',
    description: 'An isomer of citrate',
    smiles: 'C(C(C(=O)O)O)(CC(=O)O)C(=O)O',
    position: { x: base_x + unit_space * 2.12, y: base_y }
  },
  {
    id: 'alpha_ketoglutarate',
    type: 'molecule',
    name: 'α-Ketoglutarate',
    formula: 'C₅H₆O₅',
    description: 'A five-carbon dicarboxylic acid',
    smiles: 'C(CC(=O)O)C(=O)C(=O)O',
    position: { x: base_x + unit_space * 2.56, y: base_y + unit_space * 1.06 }
  },
  {
    id: 'succinyl_coa',
    type: 'molecule',
    name: 'Succinyl-CoA',
    formula: 'C₂₅H₄₀N₇O₁₉P₃S',
    description: 'A four-carbon thioester',
    smiles: 'C(CC(=O)O)CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x + unit_space * 2.12, y: base_y + unit_space * 2.12 }
  },
  {
    id: 'succinate',
    type: 'molecule',
    name: 'Succinate',
    formula: 'C₄H₆O₄',
    description: 'A four-carbon dicarboxylic acid',
    smiles: 'C(CC(=O)O)C(=O)O',
    position: { x: base_x + unit_space * 1.06, y: base_y + unit_space * 2.56 }
  },
  {
    id: 'fumarate',
    type: 'molecule',
    name: 'Fumarate',
    formula: 'C₄H₄O₄',
    description: 'A four-carbon unsaturated dicarboxylic acid',
    smiles: 'C(=CC(=O)O)C(=O)O',
    position: { x: base_x, y: base_y + unit_space * 2.12 }
  },
  {
    id: 'malate',
    type: 'molecule',
    name: 'Malate',
    formula: 'C₄H₆O₅',
    description: 'A four-carbon hydroxy dicarboxylic acid',
    smiles: 'C(C(C(=O)O)O)C(=O)O',
    position: { x: base_x - unit_space * 0.44, y: base_y + unit_space * 1.06 }
  }
];

