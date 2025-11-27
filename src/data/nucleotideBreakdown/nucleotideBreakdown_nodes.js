/**
 * Nucleotide Breakdown Pathway - Nodes Data
 * 
 * Positions are relative to the first node using unit_space notation.
 * unit_space = 200 (standard spacing between nodes)
 * Pathway flows vertically from top to bottom in 6 columns
 */

const unit_space = 200;
const base_x = 4200;
const base_y = 2500;
const column_spacing = 300; // Horizontal spacing between columns

export const nucleotideBreakdownNodes = [
  // Root node: RNA/DNA (connects to all first-row molecules except IMP)
  {
    id: 'rna_dna_root',
    type: 'molecule',
    name: 'RNA/DNA',
    formula: 'N/A',
    smiles: '',
    imageUrl: 'https://media.sciencephoto.com/g1/10/10/01/g1101001-800px-wm.jpg',
    description: 'Ribonucleic acid and deoxyribonucleic acid, the source of all nucleotides',
    position: { x: base_x + column_spacing * 2.5, y: base_y - unit_space * 1 } // Centered above first row
  },
  
  // Column 1: GMP breakdown pathway
  {
    id: 'gmp_breakdown',
    type: 'molecule',
    name: '(deoxy) Guanosine monophosphate (GMP)',
    formula: 'C₁₀H₁₄N₅O₈P',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=N2)NC3C(C(C(O3)COP(=O)(O)O)O)O',
    description: 'Guanosine monophosphate or Deoxyguanosine monophosphate, starting point for guanine nucleotide breakdown',
    position: { x: base_x, y: base_y }
  },
  {
    id: 'guanosine_breakdown',
    type: 'molecule',
    name: '(deoxy) Guanosine',
    formula: 'C₁₀H₁₃N₅O₅',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=N2)NC3C(C(C(O3)CO)O)O',
    description: 'Guanosine or Deoxyguanosine, formed by dephosphorylation of (deoxy) GMP',
    position: { x: base_x, y: base_y + unit_space * 1 }
  },
  {
    id: 'guanine_breakdown',
    type: 'molecule',
    name: 'Guanine',
    formula: 'C₅H₅N₅O',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=N2)N',
    description: 'Guanine base, formed by removal of ribose from guanosine',
    position: { x: base_x, y: base_y + unit_space * 2 }
  },

  // Column 2: AMP breakdown pathway
  {
    id: 'amp_breakdown',
    type: 'molecule',
    name: '(deoxy) Adenosine monophosphate (AMP)',
    formula: 'C₁₀H₁₄N₅O₇P',
    smiles: 'C1=NC2=C(C(=O)N1)N(C=N2)C3C(C(C(O3)COP(=O)(O)O)O)O',
    description: 'Adenosine monophosphate or Deoxyadenosine monophosphate, starting point for adenine nucleotide breakdown',
    position: { x: base_x + column_spacing * 1, y: base_y }
  },
  {
    id: 'adenosine_breakdown',
    type: 'molecule',
    name: '(deoxy) Adenosine',
    formula: 'C₁₀H₁₃N₅O₄',
    smiles: 'C1=NC2=C(C(=O)N1)N(C=N2)C3C(C(C(O3)CO)O)O',
    description: 'Adenosine or Deoxyadenosine, formed by dephosphorylation of (deoxy) AMP',
    position: { x: base_x + column_spacing * 1, y: base_y + unit_space * 1 }
  },
  // Shared intermediate: Xanthine (convergence point from guanine and hypoxanthine)
  {
    id: 'xanthine_shared',
    type: 'molecule',
    name: 'Xanthine',
    formula: 'C₅H₄N₄O₂',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=O)N2',
    description: 'Xanthine, formed by deamination of guanine or oxidation of hypoxanthine',
    position: { x: base_x + column_spacing * 1, y: base_y + unit_space * 3 }
  },
  // Shared intermediate: Uric acid (final product of all purine breakdown)
  {
    id: 'uric_acid_shared',
    type: 'molecule',
    name: 'Uric acid',
    formula: 'C₅H₄N₄O₃',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=O)NC2=O',
    description: 'Uric acid, final product of purine nucleotide breakdown',
    position: { x: base_x + column_spacing * 1, y: base_y + unit_space * 4 }
  },

  // Column 3: IMP breakdown pathway (starts from AMP)
  {
    id: 'imp_breakdown',
    type: 'molecule',
    name: '(deoxy) Inosine monophosphate (IMP)',
    formula: 'C₁₀H₁₃N₄O₈P',
    smiles: 'C1=NC2=C(C(=O)N1)N(C=N2)C3C(C(C(O3)COP(=O)(O)O)O)O',
    description: 'Inosine monophosphate or Deoxyinosine monophosphate, formed by deamination of (deoxy) AMP',
    position: { x: base_x + column_spacing * 2, y: base_y }
  },
  // Shared intermediate: Inosine (used by both AMP and IMP pathways)
  {
    id: 'inosine_shared',
    type: 'molecule',
    name: '(deoxy) Inosine',
    formula: 'C₁₀H₁₂N₄O₅',
    smiles: 'C1=NC2=C(C(=O)N1)N(C=N2)C3C(C(C(O3)CO)O)O',
    description: 'Inosine or Deoxyinosine, formed by deamination of (deoxy) adenosine or dephosphorylation of (deoxy) IMP',
    position: { x: base_x + column_spacing * 2, y: base_y + unit_space * 1 }
  },
  // Shared intermediate: Hypoxanthine (used by both AMP and IMP pathways)
  {
    id: 'hypoxanthine_shared',
    type: 'molecule',
    name: 'Hypoxanthine',
    formula: 'C₅H₄N₄O',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=N2)N',
    description: 'Hypoxanthine, formed by removal of ribose from inosine',
    position: { x: base_x + column_spacing * 2, y: base_y + unit_space * 2 }
  },

  // Column 4: CMP breakdown pathway
  {
    id: 'cmp_breakdown',
    type: 'molecule',
    name: '(deoxy) Cytidine monophosphate (CMP)',
    formula: 'C₉H₁₄N₃O₈P',
    smiles: 'C1=NC(=O)N(C=C1)C2C(C(C(O2)COP(=O)(O)O)O)O',
    description: 'Cytidine monophosphate or Deoxycytidine monophosphate, starting point for cytosine nucleotide breakdown',
    position: { x: base_x + column_spacing * 3, y: base_y }
  },
  {
    id: 'cytidine_breakdown',
    type: 'molecule',
    name: '(deoxy) Cytidine',
    formula: 'C₉H₁₃N₃O₅',
    smiles: 'C1=NC(=O)N(C=C1)C2C(C(C(O2)CO)O)O',
    description: 'Cytidine or Deoxycytidine, formed by dephosphorylation of (deoxy) CMP',
    position: { x: base_x + column_spacing * 3, y: base_y + unit_space * 1 }
  },
  // Column 4 ends at cytidine (4-2) - subsequent nodes removed (using column 5 pathway)

  // Column 5: UMP breakdown pathway
  {
    id: 'ump_breakdown',
    type: 'molecule',
    name: 'Uridine monophosphate (UMP)',
    formula: 'C₉H₁₃N₂O₉P',
    smiles: 'C1=NC(=O)NC(=C1)C2C(C(C(O2)COP(=O)(O)O)O)O',
    description: 'Uridine monophosphate, starting point for uracil nucleotide breakdown',
    position: { x: base_x + column_spacing * 4, y: base_y }
  },
  {
    id: 'uridine_ump',
    type: 'molecule',
    name: '(deoxy) Uridine',
    formula: 'C₉H₁₂N₂O₆',
    smiles: 'C1=NC(=O)NC(=C1)C2C(C(C(O2)CO)O)O',
    description: 'Uridine or Deoxyuridine, formed by dephosphorylation of (deoxy) UMP',
    position: { x: base_x + column_spacing * 4, y: base_y + unit_space * 1 }
  },
  {
    id: 'uracil_ump',
    type: 'molecule',
    name: 'Uracil',
    formula: 'C₄H₄N₂O₂',
    smiles: 'C1=NC(=O)NC(=C1)O',
    description: 'Uracil, formed by removal of ribose from uridine',
    position: { x: base_x + column_spacing * 4, y: base_y + unit_space * 2 }
  },
  {
    id: 'dihydrouracil_ump',
    type: 'molecule',
    name: 'Dihydrouracil',
    formula: 'C₄H₆N₂O₂',
    smiles: 'C1C(=O)NC(=O)NC1',
    description: 'Dihydrouracil, formed by reduction of uracil',
    position: { x: base_x + column_spacing * 4, y: base_y + unit_space * 3 }
  },
  {
    id: 'beta_ureidopropionate_ump',
    type: 'molecule',
    name: 'β-ureidopropionate',
    formula: 'C₄H₈N₂O₃',
    smiles: 'C(CC(=O)O)NC(=O)N',
    description: 'β-ureidopropionate, formed by ring opening of dihydrouracil',
    position: { x: base_x + column_spacing * 4, y: base_y + unit_space * 4 }
  },
  {
    id: 'beta_alanine_ump',
    type: 'molecule',
    name: 'β-alanine',
    formula: 'C₃H₇NO₂',
    smiles: 'C(CN)C(=O)O',
    description: 'β-alanine, final product of uracil breakdown',
    position: { x: base_x + column_spacing * 4, y: base_y + unit_space * 5 }
  },

  // Column 6: dTMP breakdown pathway (using same naming as dNTPs)
  {
    id: 'dtmp_breakdown',
    type: 'molecule',
    name: 'Deoxythymidine monophosphate (dTMP)',
    formula: 'C₁₀H₁₅N₂O₈P',
    smiles: 'CC1=CN(C(=O)NC1=O)C2C(C(C(O2)COP(=O)(O)O)O)O',
    description: 'Deoxythymidine monophosphate, starting point for thymine nucleotide breakdown',
    position: { x: base_x + column_spacing * 5, y: base_y }
  },
  {
    id: 'thymidine_breakdown',
    type: 'molecule',
    name: 'Thymidine',
    formula: 'C₁₀H₁₄N₂O₅',
    smiles: 'CC1=CN(C(=O)NC1=O)C2C(C(C(O2)CO)O)O',
    description: 'Thymidine, formed by dephosphorylation of dTMP',
    position: { x: base_x + column_spacing * 5, y: base_y + unit_space * 1 }
  },
  {
    id: 'thymine_breakdown',
    type: 'molecule',
    name: 'Thymine',
    formula: 'C₅H₆N₂O₂',
    smiles: 'CC1=CN(C(=O)NC1=O)O',
    description: 'Thymine, formed by removal of deoxyribose from thymidine',
    position: { x: base_x + column_spacing * 5, y: base_y + unit_space * 2 }
  },
  {
    id: 'dihydrothymine_breakdown',
    type: 'molecule',
    name: 'Dihydrothymine',
    formula: 'C₅H₈N₂O₂',
    smiles: 'CC1C(=O)NC(=O)NC1',
    description: 'Dihydrothymine, formed by reduction of thymine',
    position: { x: base_x + column_spacing * 5, y: base_y + unit_space * 3 }
  },
  {
    id: 'beta_ureidoisobutyrate_breakdown',
    type: 'molecule',
    name: 'β-ureidoisobutyrate',
    formula: 'C₅H₁₀N₂O₃',
    smiles: 'CC(C)CC(=O)NC(=O)N',
    description: 'β-ureidoisobutyrate, formed by ring opening of dihydrothymine',
    position: { x: base_x + column_spacing * 5, y: base_y + unit_space * 4 }
  },
  {
    id: 'beta_aminoisobutyric_acid_breakdown',
    type: 'molecule',
    name: 'β-aminoisobutyric acid',
    formula: 'C₄H₉NO₂',
    smiles: 'CC(C)CNC(=O)O',
    description: 'β-aminoisobutyric acid, final product of thymine breakdown',
    position: { x: base_x + column_spacing * 5, y: base_y + unit_space * 5 }
  }
];

