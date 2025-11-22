/**
 * Fatty Acid and Lipid Synthesis Pathway - Nodes Data
 * 
 * Positions are relative to acetyl-CoA (0, 0) using unit_space notation.
 * unit_space = 200 (standard spacing between nodes)
 */

const unit_space = 150;
const base_x = -400;
const base_y = 1200;

export const fattyAcidAndLipidSynthesisNodes = [
  // Left Side - Glycerol-3-phosphate Pathway
  {
    id: 'glycerol_3_phosphate_fas',
    type: 'molecule',
    name: 'Glycerol-3-phosphate',
    formula: 'C₃H₉O₆P',
    smiles: 'C(C(CO)OP(=O)(O)O)O',
    description: 'Phosphorylated glycerol, starting point for triacylglycerol and phospholipid synthesis',
    position: { x: base_x + unit_space * -6, y: base_y + unit_space * -1.5 }
  },
  {
    id: 'phosphatidic_acid',
    type: 'molecule',
    name: 'Phosphatidic acid',
    formula: 'C₃H₇O₈P',
    smiles: 'C(COP(=O)(O)O)OC(=O)CCCCCCCCCCCCCCCC(=O)O',
    description: 'Phosphatidic acid, formed by acylation of glycerol-3-phosphate',
    position: { x: base_x + unit_space * -6, y: base_y + unit_space * 0.25 }
  },
  {
    id: 'diacylglycerol',
    type: 'molecule',
    name: '1,2-Diacylglycerol',
    formula: 'C₃H₈O₅',
    smiles: 'C(COC(=O)CCCCCCCCCCCCCCCC(=O)O)OC(=O)CCCCCCCCCCCCCCCC(=O)O',
    pubchemCid: 6026790,
    description: '1,2-Diacylglycerol, intermediate in triacylglycerol and phospholipid synthesis',
    position: { x: base_x + unit_space * -6, y: base_y + unit_space * 1.25 }
  },
  {
    id: 'triacylglycerol',
    type: 'molecule',
    name: 'Triacylglycerol',
    formula: 'C₅₅H₁₀₄O₆',
    smiles: 'C(COC(=O)CCCCCCCCCCCCCCCC(=O)O)(OC(=O)CCCCCCCCCCCCCCCC(=O)O)OC(=O)CCCCCCCCCCCCCCCC(=O)O',
    description: 'Triacylglycerol (triglyceride), storage form of fatty acids',
    position: { x: base_x + unit_space * -6, y: base_y + unit_space * 2.25 }
  },
  {
    id: 'phospholipids',
    type: 'molecule',
    name: 'Phospholipids',
    formula: 'Variable',
    smiles: '',
    pubchemSid: 85392791,
    pubchemImageVersion: 3,
    description: 'Phospholipids, major components of cell membranes',
    position: { x: base_x + unit_space * -7, y: base_y + unit_space * 0.25 }
  },

  // Middle-Left - Palmitoyl-CoA and Sphingolipid Synthesis
  {
    id: 'serine_fas',
    type: 'molecule',
    name: 'L-Serine',
    formula: 'C₃H₇NO₃',
    smiles: 'C([C@@H](C(=O)O)O)N',
    description: 'L-Serine, amino acid precursor for sphingolipid synthesis',
    position: { x: base_x + unit_space * -4.8, y: base_y + unit_space * -1.75 }
  },
  {
    id: 'palmitoyl_coa',
    type: 'molecule',
    name: 'Palmitoyl-CoA',
    formula: 'C₃₇H₆₆N₇O₁₇P₃S',
    smiles: 'CCCCCCCCCCCCCCCC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    description: 'Palmitoyl coenzyme A, activated form of palmitate',
    position: { x: base_x + unit_space * -5, y: base_y + unit_space * -1 }
  },
  {
    id: 'palmitate',
    type: 'molecule',
    name: 'Palmitate (C16)',
    formula: 'C₁₆H₃₂O₂',
    smiles: 'CCCCCCCCCCCCCCCC(=O)O',
    description: 'Palmitic acid (C16:0), final product of fatty acid synthesis',
    position: { x: base_x + unit_space * -5, y: base_y + unit_space * 1 }
  },
  {
    id: 'sphingosine',
    type: 'molecule',
    name: 'Sphingosine',
    formula: 'C₁₈H₃₇NO₂',
    smiles: 'CCCCCCCCCCCCCCCC(C(C(CO)O)N)O',
    description: 'Sphingosine, long-chain amino alcohol, intermediate in sphingolipid synthesis',
    position: { x: base_x + unit_space * -4, y: base_y + unit_space * -1 }
  },
  {
    id: 'sphingolipids',
    type: 'molecule',
    name: 'Sphingolipids',
    formula: 'Variable',
    smiles: '',
    pubchemSid: 223447526,
    pubchemImageVersion: 2,
    description: 'Sphingolipids, complex lipids containing sphingosine backbone',
    position: { x: base_x + unit_space * -4, y: base_y + unit_space * -2 }
  },

  // Right Side - Fatty Acid Synthesis Pathway (Column at x=1)
  {
    id: 'fatty_acyl_acp',
    type: 'molecule',
    name: 'Fatty acyl-ACP',
    formula: 'Variable',
    smiles: '',
    pubchemSid: 497620218,
    pubchemImageVersion: 1,
    description: 'Fatty acyl-ACP, intermediate in fatty acid synthase cycle',
    position: { x: base_x + unit_space * -3, y: base_y + unit_space * -2 }
  },
  {
    id: 'beta_ketoacyl_acp',
    type: 'molecule',
    name: 'β-Ketoacyl-ACP',
    formula: 'Variable',
    smiles: '',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG3yKfDiQxpOHD27pnnKjo2AQFc4ef3ARJ6w&s',
    description: 'β-Ketoacyl-ACP, condensation product in fatty acid synthase cycle',
    position: { x: base_x + unit_space * -3, y: base_y + unit_space * 0 }
  },
  {
    id: 'beta_hydroxyacyl_acp',
    type: 'molecule',
    name: 'β-Hydroxyacyl-ACP',
    formula: 'Variable',
    smiles: '',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS95AWbUi3N5kUatu_04BEviHSdXhl3sydWig&s',
    description: 'β-Hydroxyacyl-ACP, reduction product in fatty acid synthase cycle',
    position: { x: base_x + unit_space * -3, y: base_y + unit_space * 1 }
  },
  {
    id: 'trans_enoyl_acp',
    type: 'molecule',
    name: 'trans-Enoyl-ACP',
    formula: 'Variable',
    smiles: '',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLa3eCExFmd51UJzAmb7a19RCc3DJ_TxiqqA&s',
    description: 'trans-Enoyl-ACP, dehydration product in fatty acid synthase cycle',
    position: { x: base_x + unit_space * -3, y: base_y + unit_space * 2 }
  },
  {
    id: 'n_plus_2_fatty_acyl_acp',
    type: 'molecule',
    name: '(n+2) Fatty acyl-ACP',
    formula: 'Variable',
    smiles: '',
    pubchemSid: 497620218,
    pubchemImageVersion: 1,
    description: '(n+2) Fatty acyl-ACP, elongated chain that cycles back in fatty acid synthase',
    position: { x: base_x + unit_space * -3, y: base_y + unit_space * 3 }
  },

  // Right Side - Fatty Acid Synthesis Pathway (Other positions)
  {
    id: 'malonyl_acp',
    type: 'molecule',
    name: 'Malonyl-ACP',
    formula: 'Variable',
    smiles: '',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Malonyl-ACP.svg/2560px-Malonyl-ACP.svg.png',
    description: 'Malonyl-ACP, transferred from malonyl-CoA for fatty acid synthesis',
    position: { x: base_x + unit_space * -1.66, y: base_y + unit_space * -1.35 }
  },
  {
    id: 'acetyl_acp',
    type: 'molecule',
    name: 'Acetyl-ACP',
    formula: 'Variable',
    smiles: '',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Acetyl-ACP.svg',
    description: 'Acetyl-ACP, transferred from acetyl-CoA for fatty acid synthesis initiation',
    position: { x: base_x + unit_space * -1, y: base_y + unit_space * 0 }
  },
  {
    id: 'malonyl_coa_fas',
    type: 'molecule',
    name: 'Malonyl-CoA',
    formula: 'C₂₄H₃₈N₇O₁₉P₃S',
    smiles: 'CC(=O)CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    description: 'Malonyl coenzyme A, two-carbon donor for fatty acid elongation',
    position: { x: base_x + unit_space * 0, y: base_y + unit_space * -1.35 }
  },
  {
    id: 'acetyl_coa_fas',
    type: 'molecule',
    name: 'Acetyl-CoA',
    formula: 'C₂₃H₃₈N₇O₁₇P₃S',
    smiles: 'CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    description: 'Acetyl coenzyme A, starting molecule for fatty acid synthesis',
    position: { x: base_x + unit_space * 0, y: base_y + unit_space * 0 }
  },
  {
    id: 'citrate_fas',
    type: 'molecule',
    name: 'Citrate',
    formula: 'C₆H₈O₇',
    smiles: 'C(C(=O)O)C(CC(=O)O)(C(=O)O)O',
    description: 'Citrate, key precursor for fatty acid synthesis via tricarboxylate transporter',
    position: { x: base_x + unit_space * 0, y: base_y + unit_space * 1 }
  },

  // Fatty Acid Oxidation Entry & Transport
  {
    id: 'lipoproteins',
    type: 'molecule',
    name: 'Lipoproteins (extrahepatic metabolism)',
    imageUrl: 'https://c8.alamy.com/comp/CXRRJ8/lipoproteins-of-the-blood-ldl-and-hdl-structure-CXRRJ8.jpg',
    description: 'Lipoproteins transporting lipids in the blood',
    position: { x: base_x + unit_space * -10, y: base_y + unit_space * 3.5 }
  },
  {
    id: 'free_fatty_acids_intercellular',
    type: 'molecule',
    name: 'Free fatty acids (intercellular space)',
    pubchemCid: 985, // Palmitic Acid as representative
    description: 'Free fatty acids in the intercellular space',
    position: { x: base_x + unit_space * -8, y: base_y + unit_space * 3.5 }
  },
  {
    id: 'free_fatty_acids_plasma',
    type: 'molecule',
    name: 'Free fatty acids (in plasma membrane)',
    pubchemCid: 985, // Palmitic Acid as representative
    description: 'Free fatty acids crossing the plasma membrane',
    position: { x: base_x + unit_space * -4, y: base_y + unit_space * 3.5 }
  },
  {
    id: 'fatty_acids_peroxisomes',
    type: 'molecule',
    name: 'Fatty acids > C24 to peroxisomes',
    pubchemCid: 10469,
    description: 'Very long chain fatty acids (>C24) destined for peroxisomes',
    position: { x: base_x + unit_space * -5, y: base_y + unit_space * 4.5 }
  },
  {
    id: 'fatty_acids_short',
    type: 'molecule',
    name: 'Fatty acids ≤ C12',
    pubchemCid: 379,
    description: 'Short and medium chain fatty acids (≤C12) that can diffuse into mitochondria',
    position: { x: base_x + unit_space * -4, y: base_y + unit_space * 4.5 }
  },
  {
    id: 'fatty_acids_medium_long',
    type: 'molecule',
    name: 'Fatty acids > C14 and < C22',
    pubchemCid: 985,
    description: 'Long chain fatty acids (>C14 and <C22) requiring carnitine shuttle',
    position: { x: base_x + unit_space * -3, y: base_y + unit_space * 4.5 }
  },
  {
    id: 'fatty_acids_short_mitochondria',
    type: 'molecule',
    name: 'Fatty acids ≤ C12 to mitochondria',
    pubchemCid: 379,
    description: 'Short and medium chain fatty acids (≤C12) that can diffuse into mitochondria',
    position: { x: base_x + unit_space * -4, y: base_y + unit_space * 6.5 }
  },
  {
    id: 'diet_fas',
    type: 'molecule',
    name: 'Diet',
    pubchemCid: null, // No specific CID for "Diet"
    description: 'Dietary source of carnitine',
    position: { x: base_x + unit_space * -10, y: base_y + unit_space * 5 }
  },
  {
    id: 'carnitine',
    type: 'molecule',
    name: 'Carnitine',
    formula: 'C₇H₁₅NO₃',
    smiles: 'C[N+](C)(C)CC(CC(=O)[O-])O',
    description: 'Carnitine, essential for transport of long-chain fatty acids into mitochondria',
    position: { x: base_x + unit_space * -9, y: base_y + unit_space * 5 }
  },
  {
    id: 'carnitine_transporter',
    type: 'complex',
    name: 'Carnitine Transporter',
    description: 'Protein complex transporting carnitine across the cell membrane',
    complexSize: { width: 80, height: 60 },
    position: { x: base_x + unit_space * -8, y: base_y + unit_space * 5 }
  },
  // Ethanol Metabolism
  {
    id: 'ethanol_fas',
    type: 'molecule',
    name: 'Ethanol',
    formula: 'C₂H₅OH',
    smiles: 'CCO',
    description: 'Alcohol that can be metabolized to acetaldehyde',
    position: { x: base_x + unit_space * -6, y: base_y + unit_space * 4.5 }
  },
  {
    id: 'acetaldehyde_fas',
    type: 'molecule',
    name: 'Acetaldehyde',
    formula: 'C₂H₄O',
    smiles: 'CC=O',
    description: 'Toxic intermediate in alcohol metabolism',
    position: { x: base_x + unit_space * -6, y: base_y + unit_space * 5.5 }
  }
];

