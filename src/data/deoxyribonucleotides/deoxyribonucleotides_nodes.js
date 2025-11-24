/**
 * Deoxyribonucleotides Synthesis Pathway - Nodes Data
 * 
 * Positions are relative to the first node using unit_space notation.
 * unit_space = 200 (standard spacing between nodes)
 * Pathway flows vertically from top to bottom in 4 columns (A, G, C, U)
 */

const unit_space = 200;
const base_x = 2900; // Positioned to the right of other pathways
const base_y = 3200; // Start below top to avoid overlap
const column_spacing = 250; // Horizontal spacing between columns
export const circle_center_x = base_x + column_spacing * 4.0;
export const circle_center_y = base_y + unit_space * 4.75;

export const deoxyribonucleotidesNodes = [
  // Column 1: Adenine pathway (ATP → ADP → dADP → dATP)
  {
    id: 'atp_deoxy',
    type: 'molecule',
    name: 'Adenosine triphosphate (ATP)',
    formula: 'C₁₀H₁₆N₅O₁₃P₃',
    smiles: 'C1=NC2=C(C(=O)N1)N(C=N2)C3C(C(C(O3)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Adenosine triphosphate, the starting ribonucleotide triphosphate for deoxyribonucleotide synthesis',
    position: { x: base_x, y: base_y }
  },
  {
    id: 'adp_deoxy',
    type: 'molecule',
    name: 'Adenosine diphosphate (ADP)',
    formula: 'C₁₀H₁₅N₅O₁₀P₂',
    smiles: 'C1=NC2=C(C(=O)N1)N(C=N2)C3C(C(C(O3)COP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Adenosine diphosphate, formed by dephosphorylation of ATP',
    position: { x: base_x, y: base_y + unit_space * 1 }
  },
  {
    id: 'dadp',
    type: 'molecule',
    name: 'Deoxyadenosine diphosphate (dADP)',
    formula: 'C₁₀H₁₅N₅O₉P₂',
    smiles: 'C1=NC2=C(C(=O)N1)N(C=N2)C3C(C(C(O3)COP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Deoxyadenosine diphosphate, formed by reduction of ADP',
    position: { x: base_x, y: base_y + unit_space * 2 }
  },
  {
    id: 'datp',
    type: 'molecule',
    name: 'Deoxyadenosine triphosphate (dATP)',
    formula: 'C₁₀H₁₆N₅O₁₂P₃',
    smiles: 'C1=NC2=C(C(=O)N1)N(C=N2)C3C(C(C(O3)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Deoxyadenosine triphosphate, the final product of adenine deoxyribonucleotide synthesis',
    position: { x: base_x, y: base_y + unit_space * 3 }
  },

  // Column 2: Guanine pathway (GTP → GDP → dGDP → dGTP)
  {
    id: 'gtp_deoxy',
    type: 'molecule',
    name: 'Guanosine triphosphate (GTP)',
    formula: 'C₁₀H₁₆N₅O₁₄P₃',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=N2)NC3C(C(C(O3)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Guanosine triphosphate, the starting ribonucleotide triphosphate for guanine deoxyribonucleotide synthesis',
    position: { x: base_x + column_spacing * 1, y: base_y }
  },
  {
    id: 'gdp_deoxy',
    type: 'molecule',
    name: 'Guanosine diphosphate (GDP)',
    formula: 'C₁₀H₁₅N₅O₁₁P₂',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=N2)NC3C(C(C(O3)COP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Guanosine diphosphate, formed by dephosphorylation of GTP',
    position: { x: base_x + column_spacing * 1, y: base_y + unit_space * 1 }
  },
  {
    id: 'dgdp',
    type: 'molecule',
    name: 'Deoxyguanosine diphosphate (dGDP)',
    formula: 'C₁₀H₁₅N₅O₁₀P₂',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=N2)NC3C(C(C(O3)COP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Deoxyguanosine diphosphate, formed by reduction of GDP',
    position: { x: base_x + column_spacing * 1, y: base_y + unit_space * 2 }
  },
  {
    id: 'dgtp',
    type: 'molecule',
    name: 'Deoxyguanosine triphosphate (dGTP)',
    formula: 'C₁₀H₁₆N₅O₁₃P₃',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=N2)NC3C(C(C(O3)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Deoxyguanosine triphosphate, the final product of guanine deoxyribonucleotide synthesis',
    position: { x: base_x + column_spacing * 1, y: base_y + unit_space * 3 }
  },

  // Column 3: Cytosine pathway (CTP → CDP → dCDP → dCTP)
  {
    id: 'ctp_deoxy',
    type: 'molecule',
    name: 'Cytidine triphosphate (CTP)',
    formula: 'C₉H₁₆N₃O₁₄P₃',
    smiles: 'C1=NC(=O)N(C=C1)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Cytidine triphosphate, the starting ribonucleotide triphosphate for cytosine deoxyribonucleotide synthesis',
    position: { x: base_x + column_spacing * 2, y: base_y }
  },
  {
    id: 'cdp_deoxy',
    type: 'molecule',
    name: 'Cytidine diphosphate (CDP)',
    formula: 'C₉H₁₅N₃O₁₁P₂',
    smiles: 'C1=NC(=O)N(C=C1)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Cytidine diphosphate, formed by dephosphorylation of CTP',
    position: { x: base_x + column_spacing * 2, y: base_y + unit_space * 1 }
  },
  {
    id: 'dcdp',
    type: 'molecule',
    name: 'Deoxycytidine diphosphate (dCDP)',
    formula: 'C₉H₁₅N₃O₁₀P₂',
    smiles: 'C1=NC(=O)N(C=C1)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Deoxycytidine diphosphate, formed by reduction of CDP',
    position: { x: base_x + column_spacing * 2, y: base_y + unit_space * 2 }
  },
  {
    id: 'dctp',
    type: 'molecule',
    name: 'Deoxycytidine triphosphate (dCTP)',
    formula: 'C₉H₁₆N₃O₁₃P₃',
    smiles: 'C1=NC(=O)N(C=C1)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Deoxycytidine triphosphate, the final product of cytosine deoxyribonucleotide synthesis',
    position: { x: base_x + column_spacing * 2, y: base_y + unit_space * 3 }
  },

  // Column 4: Uracil pathway (UTP → UDP → dUDP → dUTP)
  {
    id: 'utp_deoxy',
    type: 'molecule',
    name: 'Uridine triphosphate (UTP)',
    formula: 'C₉H₁₅N₂O₁₅P₃',
    smiles: 'C1=NC(=O)NC(=C1)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Uridine triphosphate, the starting ribonucleotide triphosphate for uracil deoxyribonucleotide synthesis',
    position: { x: base_x + column_spacing * 3, y: base_y }
  },
  {
    id: 'udp_deoxy',
    type: 'molecule',
    name: 'Uridine diphosphate (UDP)',
    formula: 'C₉H₁₄N₂O₁₂P₂',
    smiles: 'C1=NC(=O)NC(=C1)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Uridine diphosphate, formed by dephosphorylation of UTP',
    position: { x: base_x + column_spacing * 3, y: base_y + unit_space * 1 }
  },
  {
    id: 'dudp',
    type: 'molecule',
    name: 'Deoxyuridine diphosphate (dUDP)',
    formula: 'C₉H₁₄N₂O₁₁P₂',
    smiles: 'C1=NC(=O)NC(=C1)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Deoxyuridine diphosphate, formed by reduction of UDP',
    position: { x: base_x + column_spacing * 3, y: base_y + unit_space * 2 }
  },
  {
    id: 'dutp',
    type: 'molecule',
    name: 'Deoxyuridine triphosphate (dUTP)',
    formula: 'C₉H₁₅N₂O₁₄P₃',
    smiles: 'C1=NC(=O)NC(=C1)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Deoxyuridine triphosphate, the final product of uracil deoxyribonucleotide synthesis',
    position: { x: base_x + column_spacing * 3, y: base_y + unit_space * 3 }
  },

  // Thymidine synthesis pathway (dCTP → dCMP → dUMP → dTMP → dTDP → dTTP)
  {
    id: 'dcmp_deoxy',
    type: 'molecule',
    name: 'Deoxycytidine monophosphate (dCMP)',
    formula: 'C₉H₁₅N₃O₇P',
    smiles: 'C1=NC(=O)N(C=C1)C2C(C(C(O2)COP(=O)(O)O)O)O',
    description: 'Deoxycytidine monophosphate, formed by dephosphorylation of dCTP',
    position: { x: base_x + column_spacing * 1.5, y: base_y + unit_space * 4 }
  },
  {
    id: 'dump_deoxy',
    type: 'molecule',
    name: 'Deoxyuridine monophosphate (dUMP)',
    formula: 'C₉H₁₄N₂O₇P',
    smiles: 'C1=NC(=O)NC(=C1)C2C(C(C(O2)COP(=O)(O)O)O)O',
    description: 'Deoxyuridine monophosphate, a key intermediate in thymidine synthesis',
    position: { x: base_x + column_spacing * 3, y: base_y + unit_space * 4 }
  },
  {
    id: 'dtmp_deoxy',
    type: 'molecule',
    name: 'Deoxythymidine monophosphate (dTMP)',
    formula: 'C₁₀H₁₆N₂O₈P',
    smiles: 'CC1=CN(C(=O)NC1=O)C2C(C(C(O2)COP(=O)(O)O)O)O',
    description: 'Deoxythymidine monophosphate, formed by methylation of dUMP via thymidylate synthase',
    position: { x: base_x + column_spacing * 5, y: base_y + unit_space * 4 }
  },
  {
    id: 'dtdp_deoxy',
    type: 'molecule',
    name: 'Deoxythymidine diphosphate (dTDP)',
    formula: 'C₁₀H₁₇N₂O₁₁P₂',
    smiles: 'CC1=CN(C(=O)NC1=O)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Deoxythymidine diphosphate, formed by phosphorylation of dTMP',
    position: { x: base_x + column_spacing * 6, y: base_y + unit_space * 4 }
  },
  {
    id: 'dttp_deoxy',
    type: 'molecule',
    name: 'Deoxythymidine triphosphate (dTTP)',
    formula: 'C₁₀H₁₈N₂O₁₄P₃',
    smiles: 'CC1=CN(C(=O)NC1=O)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Deoxythymidine triphosphate, the final product of thymidine synthesis',
    position: { x: base_x + column_spacing * 6, y: base_y + unit_space * 5 }
  },

  // Folate cycle nodes (involved in thymidine synthesis)
  // Positioned in a perfect circle: center at (base_x + column_spacing * 3.75, base_y + unit_space * 5.0), radius = 150
  // Rotated one position clockwise: thf_deoxy (top, 90°), n5n10_methylene_thf (bottom-left, 210°), dihydrofolate (bottom-right, 330°)
  // Center: (3837.5, 4200), Radius: 150
  // thf_deoxy: (3837.5, 4350) - top (90°)
  // n5n10_methylene_thf: (3707.6, 4125) - bottom-left (210°)
  // dihydrofolate: (3967.4, 4125) - bottom-right (330°)
  {
    id: 'n5n10_methylene_thf',
    type: 'molecule',
    name: 'N⁵,N¹⁰-methylene-THF',
    formula: 'C₂₀H₂₃N₇O₆',
    smiles: 'C1=CC(=CC=C1C(=O)N[C@@H](CCC(=O)O)C(=O)O)NCC2=CN=C3C(=N2)C(=O)NC(=N3)N',
    description: 'N⁵,N¹⁰-methylene-tetrahydrofolate, a cofactor that donates a methyl group in the conversion of dUMP to dTMP',
    position: { 
      x: circle_center_x - 150 * 0.8660254, 
      y: circle_center_y - 150 * 0.5 
    }
  },
  {
    id: 'dihydrofolate',
    type: 'molecule',
    name: 'Dihydrofolate',
    formula: 'C₁₉H₂₁N₇O₆',
    smiles: 'C1=CC(=CC=C1C(=O)N[C@@H](CCC(=O)O)C(=O)O)NCC2=CN=C3C(=N2)C(=O)NC(=N3)N',
    description: 'Dihydrofolate, produced from N⁵,N¹⁰-methylene-THF during dTMP synthesis and regenerated to THF by dihydrofolate reductase',
    position: { 
      x: circle_center_x + 150 * 0.8660254, 
      y: circle_center_y - 150 * 0.5 
    }
  },
  {
    id: 'thf_deoxy',
    type: 'molecule',
    name: 'THF',
    formula: 'C₁₉H₂₃N₇O₆',
    smiles: 'C1=CC(=CC=C1C(=O)N[C@@H](CCC(=O)O)C(=O)O)NCC2=CN=C3C(=N2)C(=O)NC(=N3)N',
    description: 'Tetrahydrofolate, regenerated from dihydrofolate and converted back to N⁵,N¹⁰-methylene-THF to complete the folate cycle',
    position: { 
      x: circle_center_x, 
      y: circle_center_y + 150 
    }
  },
  // Byreactant/Byproduct nodes for reaction 19 (THF Methylation to N⁵,N¹⁰-methylene-THF)
  {
    id: 'serine_deoxy',
    type: 'molecule',
    name: 'Serine',
    pathwayType: 'amino_acids',
    formula: 'C₃H₇NO₃',
    smiles: 'C(C(C(=O)O)N)O',
    description: 'Amino acid used as methylene group donor in THF methylation',
    position: { 
      x: circle_center_x - unit_space * 0.9, 
      y: circle_center_y + 150 * 1.25
    }
  },
  {
    id: 'glycine_deoxy',
    type: 'molecule',
    name: 'Glycine',
    pathwayType: 'amino_acids',
    formula: 'C₂H₅NO₂',
    smiles: 'C(C(=O)O)N',
    description: 'Amino acid produced from serine in THF methylation',
    position: { 
      x: circle_center_x - unit_space * 1.25, 
      y: circle_center_y + 150 * 0.45 
    }
  }
];

