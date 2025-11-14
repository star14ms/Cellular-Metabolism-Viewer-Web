/**
 * Citric Acid Cycle - Nodes Data
 */

export const citricAcidCycleNodes = [
  // Main cycle nodes in clockwise order (matching arrow flow: oxaloacetate → citrate → ... → malate → oxaloacetate)
  {
    id: 'oxaloacetate',
    type: 'molecule',
    name: 'Oxaloacetate',
    formula: 'C₄H₄O₅',
    description: 'A four-carbon dicarboxylic acid that accepts acetyl-CoA',
    smiles: 'C(=O)CC(=O)C(=O)O',
    position: { x: 100, y: 2050 }
  },
  {
    id: 'citrate',
    type: 'molecule',
    name: 'Citrate',
    formula: 'C₆H₈O₇',
    description: 'A six-carbon tricarboxylic acid',
    smiles: 'C(C(=O)O)C(CC(=O)O)(C(=O)O)O',
    position: { x: 259, y: 1984 }
  },
  {
    id: 'isocitrate',
    type: 'molecule',
    name: 'Isocitrate',
    formula: 'C₆H₈O₇',
    description: 'An isomer of citrate',
    smiles: 'C(C(C(=O)O)O)(CC(=O)O)C(=O)O',
    position: { x: 418, y: 2050 }
  },
  {
    id: 'alpha_ketoglutarate',
    type: 'molecule',
    name: 'α-Ketoglutarate',
    formula: 'C₅H₆O₅',
    description: 'A five-carbon dicarboxylic acid',
    smiles: 'C(CC(=O)O)C(=O)C(=O)O',
    position: { x: 484, y: 2209 }
  },
  {
    id: 'succinyl_coa',
    type: 'molecule',
    name: 'Succinyl-CoA',
    formula: 'C₂₅H₄₀N₇O₁₉P₃S',
    description: 'A four-carbon thioester',
    smiles: 'C(CC(=O)O)CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: 418, y: 2368 }
  },
  {
    id: 'succinate',
    type: 'molecule',
    name: 'Succinate',
    formula: 'C₄H₆O₄',
    description: 'A four-carbon dicarboxylic acid',
    smiles: 'C(CC(=O)O)C(=O)O',
    position: { x: 259, y: 2434 }
  },
  {
    id: 'fumarate',
    type: 'molecule',
    name: 'Fumarate',
    formula: 'C₄H₄O₄',
    description: 'A four-carbon unsaturated dicarboxylic acid',
    smiles: 'C(=CC(=O)O)C(=O)O',
    position: { x: 100, y: 2368 }
  },
  {
    id: 'malate',
    type: 'molecule',
    name: 'Malate',
    formula: 'C₄H₆O₅',
    description: 'A four-carbon hydroxy dicarboxylic acid',
    smiles: 'C(C(C(=O)O)O)C(=O)O',
    position: { x: 34, y: 2209 }
  }
];

