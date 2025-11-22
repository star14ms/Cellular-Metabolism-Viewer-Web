/**
 * Cholesterol Synthesis Pathway - Nodes Data
 * 
 * Positions are relative to a base position.
 * unit_space = 150 (standard spacing between nodes)
 * Positioned on the leftmost side of the map (base_x = -1200)
 * Vertical flow layout from top to bottom
 */

const unit_space = 150;
const base_x = -2100; // Leftmost position on the map
const base_y = -750; // Starting y position

export const cholesterolSynthesisNodes = [
  // Main pathway nodes (sequential flow)
  {
    id: 'acetyl_coa_chol',
    type: 'molecule',
    name: '2 Acetyl-CoA',
    formula: 'C₂₃H₃₈N₇O₁₇P₃S',
    smiles: 'CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    description: 'Acetyl coenzyme A, starting molecule for cholesterol synthesis (x2)',
    position: { x: base_x, y: base_y }
  },
  {
    id: 'acetoacetyl_coa_chol',
    type: 'molecule',
    name: 'Acetoacetyl-CoA',
    formula: 'C₂₅H₄₀N₇O₁₈P₃S',
    smiles: 'CC(=O)CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    description: 'Four-carbon thioester intermediate (C4)',
    position: { x: base_x, y: base_y + unit_space * 1 }
  },
  {
    id: 'hmg_coa_chol',
    type: 'molecule',
    name: 'β-Hydroxy-β-methylglutaryl-CoA (HMG-CoA)',
    formula: 'C₂₇H₄₄N₇O₂₀P₃S',
    smiles: 'CC(C)(CC(=O)O)C(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    description: 'Six-carbon intermediate, substrate for HMG-CoA reductase',
    position: { x: base_x, y: base_y + unit_space * 2 }
  },
  {
    id: 'mevalonate_chol',
    type: 'molecule',
    name: 'Mevalonate',
    formula: 'C₆H₁₂O₄',
    smiles: 'CC(C)(CC(=O)O)C(=O)O',
    description: 'Six-carbon hydroxy acid, product of HMG-CoA reductase',
    position: { x: base_x, y: base_y + unit_space * 3 }
  },
  {
    id: 'ipp_chol',
    type: 'molecule',
    name: 'Isopentenyl pyrophosphate (IPP)',
    formula: 'C₅H₁₂O₇P₂',
    smiles: 'CC(=C)CCOP(=O)(O)OP(=O)(O)O',
    description: 'Five-carbon isoprenoid unit (C5), used x3 to form FPP',
    position: { x: base_x, y: base_y + unit_space * 4 }
  },
  {
    id: 'fpp_chol',
    type: 'molecule',
    name: 'Farnesyl pyrophosphate (FPP)',
    formula: 'C₁₅H₂₈O₇P₂',
    smiles: 'CC(=CCCC(=CCCC(=CCOP(=O)(O)OP(=O)(O)O)C)C)C',
    description: 'Fifteen-carbon isoprenoid (C15), used x2 to form squalene, or for protein farnesylation',
    position: { x: base_x, y: base_y + unit_space * 5 }
  },
  {
    id: 'squalene_chol',
    type: 'molecule',
    name: 'Squalene',
    formula: 'C₃₀H₅₀',
    smiles: 'CC(=CCCC(=CCCC(=CCCC(=CCCC(=CCCC(=C)C)C)C)C)C)C',
    description: 'Thirty-carbon linear isoprenoid (C30), precursor to sterols',
    position: { x: base_x, y: base_y + unit_space * 6 }
  },
  {
    id: 'lanosterol_chol',
    type: 'molecule',
    name: 'Lanosterol',
    formula: 'C₃₀H₅₀O',
    smiles: 'CC(C)C1CCC2(C1CC=C3C2CCC4C3(CCC(C4(C)C)O)C)C',
    description: 'First sterol intermediate formed from squalene cyclization',
    position: { x: base_x, y: base_y + unit_space * 7 }
  },
  {
    id: '7_dehydrocholesterol_chol',
    type: 'molecule',
    name: '7-Dehydrocholesterol',
    formula: 'C₂₇H₄₄O',
    smiles: 'CC(C)C1CCC2(C1CC=C3C2CCC4C3(CCC(C4(C)C)O)C)C',
    description: 'Precursor to cholesterol, also precursor to vitamin D',
    position: { x: base_x, y: base_y + unit_space * 8 }
  },
  {
    id: 'cholesterol_chol',
    type: 'molecule',
    name: 'Cholesterol',
    formula: 'C₂₇H₄₆O',
    smiles: 'CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C',
    description: 'Final product of cholesterol synthesis pathway, essential component of cell membranes',
    position: { x: base_x, y: base_y + unit_space * 9 }
  },
  // Branching nodes
  {
    id: 'protein_modification_chol',
    type: 'molecule',
    name: 'Protein Modification',
    formula: 'Variable',
    smiles: '',
    imageUrl: 'https://www.protpi.ch/blog/wp-content/uploads/2020/06/Farnesylation.png',
    description: 'Farnesylated proteins - FPP is used to modify proteins via farnesylation, important for membrane localization',
    position: { x: base_x - unit_space * 1.5, y: base_y + unit_space * 5 }
  },
  {
    id: 'vitamin_d_chol',
    type: 'molecule',
    name: 'Vitamin D',
    formula: 'C₂₇H₄₄O',
    smiles: 'CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C',
    description: 'Vitamin D synthesized from 7-dehydrocholesterol in the skin upon UV exposure',
    position: { x: base_x - unit_space * 1.5, y: base_y + unit_space * 8 }
  },
  {
    id: 'bile_salts_chol',
    type: 'molecule',
    name: 'Bile Salts',
    formula: 'Variable',
    smiles: '',
    description: 'Bile salts synthesized from cholesterol in the liver for fat digestion',
    position: { x: base_x - unit_space * 1.5, y: base_y + unit_space * 9 }
  },
  {
    id: 'cell_membranes_chol',
    type: 'molecule',
    name: 'Cell Membranes',
    formula: 'Variable',
    smiles: '',
    description: 'Cholesterol incorporated into cell membranes to maintain fluidity and structure',
    position: { x: base_x + unit_space * 1.5, y: base_y + unit_space * 9 }
  },
  {
    id: 'lipoproteins_chol',
    type: 'molecule',
    name: 'Lipoproteins',
    formula: 'Variable',
    smiles: '',
    description: 'Cholesterol transported in the body as part of lipoproteins (LDL, HDL, etc.)',
    position: { x: base_x + unit_space * 1.5, y: base_y + unit_space * 8 }
  }
];

