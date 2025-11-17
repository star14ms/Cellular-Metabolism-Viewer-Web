/**
 * De Novo Purine Synthesis Pathway - Nodes Data
 * 
 * Positions are relative to the first node using unit_space notation.
 * unit_space = 150 (standard spacing between nodes)
 * Pathway flows vertically from top to bottom
 */

const unit_space = 200;
const base_x = 3000; // Positioned to the right of pyrimidine synthesis
const base_y = 0; // Start below top to avoid overlap

export const purineSynthesisNodes = [
  // Starting substrate
  {
    id: 'prpp_purine',
    type: 'molecule',
    name: '5-Phosphoribosyl-1-pyrophosphate (PRPP)',
    formula: 'C₅H₁₃O₁₄P₃',
    smiles: 'C1C(C(C(O1)COP(=O)(O)OP(=O)(O)O)O)O',
    description: '5-Phosphoribosyl pyrophosphate, the starting substrate for purine synthesis',
    position: { x: base_x, y: base_y }
  },
  
  // Pathway intermediates
  {
    id: 'phosphoribosylamine',
    type: 'molecule',
    name: '5-Phosphoribosylamine',
    formula: 'C₅H₁₂NO₈P',
    smiles: 'C1C(C(C(O1)COP(=O)(O)O)O)O',
    description: '5-Phosphoribosylamine, formed from PRPP and glutamine',
    position: { x: base_x, y: base_y + unit_space * 1 }
  },
  {
    id: 'gar',
    type: 'molecule',
    name: 'Glycinamide ribonucleotide (GAR)',
    formula: 'C₇H₁₄N₂O₈P',
    smiles: 'C(C(=O)NC1C(C(C(O1)COP(=O)(O)O)O)O)N',
    description: 'Glycinamide ribonucleotide, formed by addition of glycine to 5-phosphoribosylamine',
    position: { x: base_x, y: base_y + unit_space * 2 }
  },
  {
    id: 'fgar',
    type: 'molecule',
    name: 'Formyl-GAR (FGAR)',
    formula: 'C₈H₁₄N₂O₉P',
    smiles: 'C(=O)NC(C(=O)NC1C(C(C(O1)COP(=O)(O)O)O)O)N',
    description: 'Formyl-GAR, formed by formylation of GAR using N¹⁰-formyl-THF',
    position: { x: base_x, y: base_y + unit_space * 3 }
  },
  {
    id: 'fgam',
    type: 'molecule',
    name: 'Formiminoglycinamidine ribonucleotide (FGAM)',
    formula: 'C₈H₁₅N₃O₈P',
    smiles: 'C(=N)NC(C(=O)NC1C(C(C(O1)COP(=O)(O)O)O)O)N',
    description: 'Formiminoglycinamidine ribonucleotide, formed from FGAR using glutamine',
    position: { x: base_x, y: base_y + unit_space * 4 }
  },
  {
    id: 'air',
    type: 'molecule',
    name: 'Aminoimidazole ribonucleotide (AIR)',
    formula: 'C₈H₁₃N₃O₇P',
    smiles: 'C1=C(NC(=N1)NC2C(C(C(O2)COP(=O)(O)O)O)O)N',
    description: 'Aminoimidazole ribonucleotide, formed by cyclization of FGAM',
    position: { x: base_x, y: base_y + unit_space * 5 }
  },
  {
    id: 'cair',
    type: 'molecule',
    name: 'Carboxyaminoimidazole ribonucleotide (CAIR)',
    formula: 'C₉H₁₃N₃O₉P',
    smiles: 'C1=C(NC(=N1)NC2C(C(C(O2)COP(=O)(O)O)O)O)NC(=O)O',
    description: 'Carboxyaminoimidazole ribonucleotide, formed by carboxylation of AIR',
    position: { x: base_x, y: base_y + unit_space * 6 }
  },
  {
    id: 'saicar',
    type: 'molecule',
    name: 'Succinylaminoimidazole carboxamide ribonucleotide (SAICAR)',
    formula: 'C₁₂H₁₈N₄O₁₀P',
    smiles: 'C(CC(=O)O)C(=O)NC1=C(NC(=N1)NC2C(C(C(O2)COP(=O)(O)O)O)O)NC(=O)N',
    description: 'Succinylaminoimidazole carboxamide ribonucleotide, formed from CAIR and aspartate',
    position: { x: base_x, y: base_y + unit_space * 7 }
  },
  {
    id: 'aicar',
    type: 'molecule',
    name: 'Aminoimidazole carboxamide ribonucleotide (AICAR)',
    formula: 'C₁₀H₁₅N₄O₈P',
    smiles: 'C1=C(NC(=N1)NC2C(C(C(O2)COP(=O)(O)O)O)O)NC(=O)N',
    description: 'Aminoimidazole carboxamide ribonucleotide, formed from SAICAR by removal of fumarate',
    position: { x: base_x, y: base_y + unit_space * 8 }
  },
  {
    id: 'faicar',
    type: 'molecule',
    name: 'Formaminoimidazole carboxamide ribonucleotide (FAICAR)',
    formula: 'C₁₁H₁₅N₄O₉P',
    smiles: 'C(=O)NC1=C(NC(=N1)NC2C(C(C(O2)COP(=O)(O)O)O)O)NC(=O)N',
    description: 'Formaminoimidazole carboxamide ribonucleotide, formed by formylation of AICAR',
    position: { x: base_x, y: base_y + unit_space * 9 }
  },
  {
    id: 'imp',
    type: 'molecule',
    name: 'Inosine monophosphate (IMP)',
    formula: 'C₁₀H₁₃N₄O₈P',
    smiles: 'C1=NC(=O)C2=C(N1)N(C=N2)C3C(C(C(O3)COP(=O)(O)O)O)O',
    description: 'Inosine monophosphate, the final product of de novo purine synthesis',
    position: { x: base_x, y: base_y + unit_space * 10 }
  },
  
  // Left branch: IMP → AMP pathway
  {
    id: 'adenylosuccinate',
    type: 'molecule',
    name: 'Adenylosuccinate',
    formula: 'C₁₄H₁₈N₅O₁₁P',
    smiles: 'C(CC(=O)O)C(=O)NC1=C2N(C=N1)C(=O)NC(=N2)C3C(C(C(O3)COP(=O)(O)O)O)O',
    description: 'Adenylosuccinate, intermediate in AMP synthesis from IMP',
    position: { x: base_x - unit_space * 2, y: base_y + unit_space * 11 }
  },
  {
    id: 'amp_purine',
    type: 'molecule',
    name: 'Adenosine monophosphate (AMP)',
    formula: 'C₁₀H₁₄N₅O₇P',
    smiles: 'C1=NC2=C(C(=O)N1)N(C=N2)C3C(C(C(O3)COP(=O)(O)O)O)O',
    description: 'Adenosine monophosphate, formed from adenylosuccinate',
    position: { x: base_x - unit_space * 2, y: base_y + unit_space * 12 }
  },
  {
    id: 'adp',
    type: 'molecule',
    name: 'Adenosine diphosphate (ADP)',
    formula: 'C₁₀H₁₅N₅O₁₀P₂',
    smiles: 'C1=NC2=C(C(=O)N1)N(C=N2)C3C(C(C(O3)COP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Adenosine diphosphate, formed by phosphorylation of AMP',
    position: { x: base_x - unit_space * 2, y: base_y + unit_space * 13 }
  },
  {
    id: 'atp',
    type: 'molecule',
    name: 'Adenosine triphosphate (ATP)',
    formula: 'C₁₀H₁₆N₅O₁₃P₃',
    smiles: 'C1=NC2=C(C(=O)N1)N(C=N2)C3C(C(C(O3)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Adenosine triphosphate, the primary energy currency of the cell',
    position: { x: base_x - unit_space * 2, y: base_y + unit_space * 14 }
  },
  
  // Base salvage pathway nodes
  {
    id: 'hypoxanthine',
    type: 'molecule',
    name: 'Hypoxanthine',
    formula: 'C₅H₄N₄O',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=N2)O',
    description: 'Hypoxanthine, a purine base that can be salvaged back to IMP',
    position: { x: base_x, y: base_y + unit_space * 11 }
  },
  {
    id: 'adenine',
    type: 'molecule',
    name: 'Adenine',
    formula: 'C₅H₅N₅',
    smiles: 'C1=NC2=NC=NC(=C2N1)N',
    description: 'Adenine, a purine base that can be salvaged to AMP',
    position: { x: base_x - unit_space * 1, y: base_y + unit_space * 12 }
  },
  {
    id: 'guanine',
    type: 'molecule',
    name: 'Guanine',
    formula: 'C₅H₅N₅O',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=N2)N',
    description: 'Guanine, a purine base that can be salvaged to GMP',
    position: { x: base_x + unit_space * 1, y: base_y + unit_space * 12 }
  },
  
  // Right branch: IMP → GMP pathway
  {
    id: 'xmp',
    type: 'molecule',
    name: 'Xanthosine monophosphate (XMP)',
    formula: 'C₁₀H₁₃N₄O₉P',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=N2)C3C(C(C(O3)COP(=O)(O)O)O)O',
    description: 'Xanthosine monophosphate, intermediate in GMP synthesis from IMP',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 11 }
  },
  {
    id: 'gmp',
    type: 'molecule',
    name: 'Guanosine monophosphate (GMP)',
    formula: 'C₁₀H₁₄N₅O₈P',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=N2)NC3C(C(C(O3)COP(=O)(O)O)O)O',
    description: 'Guanosine monophosphate, formed from XMP',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 12 }
  },
  {
    id: 'gdp',
    type: 'molecule',
    name: 'Guanosine diphosphate (GDP)',
    formula: 'C₁₀H₁₅N₅O₁₁P₂',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=N2)NC3C(C(C(O3)COP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Guanosine diphosphate, formed by phosphorylation of GMP',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 13 }
  },
  {
    id: 'gtp',
    type: 'molecule',
    name: 'Guanosine triphosphate (GTP)',
    formula: 'C₁₀H₁₆N₅O₁₄P₃',
    smiles: 'C1=NC2=C(N1)C(=O)NC(=N2)NC3C(C(C(O3)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)O',
    description: 'Guanosine triphosphate, an important energy carrier and signaling molecule',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 14 }
  },

  {
    id: 'prpp_purine2',
    type: 'molecule',
    name: '5-Phosphoribosyl-1-pyrophosphate (PRPP)',
    formula: 'C₅H₁₃O₁₄P₃',
    smiles: 'C1C(C(C(O1)COP(=O)(O)OP(=O)(O)O)O)O',
    description: '5-Phosphoribosyl-1-pyrophosphate, a key intermediate in nucleotide synthesis',
    position: { x: base_x - unit_space * 1.25, y: base_y + unit_space * 12.6 }
  },
  
  // PRPP synthesis and pyrimidine salvage pathway
  {
    id: 'ribose_5_p',
    type: 'molecule',
    name: 'Ribose-5-phosphate',
    formula: 'C₅H₁₁O₈P',
    smiles: 'C(C(C(C(COP(=O)(O)O)O)O)O)O',
    description: 'Ribose-5-phosphate, a key intermediate in nucleotide metabolism',
    position: { x: base_x - unit_space * 1.25, y: base_y + unit_space * 13.6 }
  },
  {
    id: 'ribose_1_p',
    type: 'molecule',
    name: 'Ribose-1-phosphate',
    formula: 'C₅H₁₁O₈P',
    smiles: 'C(C(C(C(C(OP(=O)(O)O)O)O)O)O)O',
    description: 'Ribose-1-phosphate, interconverted with ribose-5-phosphate',
    position: { x: base_x - unit_space * 0.25, y: base_y + unit_space * 13.6 }
  },
  {
    id: 'uridine_purine',
    type: 'molecule',
    name: 'Uridine',
    formula: 'C₉H₁₂N₂O₆',
    smiles: 'C1=NC(=O)NC(=C1)C2C(C(C(O2)CO)O)O',
    description: 'Uridine, a pyrimidine nucleoside that can be converted to ribose-1-phosphate',
    position: { x: base_x - unit_space * -0.75, y: base_y + unit_space * 13.6 }
  },
  
  // Branches to ATP
  // {
  //   id: 's_adenosyl_methionine',
  //   type: 'molecule',
  //   name: 'S-adenosyl methionine',
  //   formula: 'C₁₅H₂₂N₆O₅S⁺',
  //   smiles: 'C[S+](CC[C@@H](C(=O)O)N)C[C@H]1O[C@H]([C@H](O)[C@@H]1O)n2cnc3c2ncnc3N',
  //   description: 'S-adenosyl methionine, a methyl group donor derived from ATP',
  //   position: { x: base_x - unit_space * 3.5, y: base_y + unit_space * 15 }
  // },
  // {
  //   id: 'coenzyme_a',
  //   type: 'molecule',
  //   name: 'Coenzyme A',
  //   formula: 'C₂₁H₃₆N₇O₁₆P₃S',
  //   smiles: 'CC(C)(COP(=O)(O)OP(=O)(O)OCC1C(C(C(O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)C(C(=O)NCCC(=O)NCCS)O',
  //   description: 'Coenzyme A, a cofactor derived from ATP',
  //   position: { x: base_x - unit_space * 2.5, y: base_y + unit_space * 15 }
  // },
  // {
  //   id: 'nadh',
  //   type: 'molecule',
  //   name: 'NADH',
  //   formula: 'C₂₁H₂₇N₇O₁₄P₂',
  //   smiles: 'C1=CC(=C[N+](=C1)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)OCC3C(C(C(O3)N4C=NC5=C4N=CN=C5N)O)O)O)O)C(=O)N',
  //   description: 'Nicotinamide adenine dinucleotide (reduced), derived from ATP',
  //   position: { x: base_x - unit_space * 1.5, y: base_y + unit_space * 15 }
  // },
  // {
  //   id: 'fadh2',
  //   type: 'molecule',
  //   name: 'FADH₂',
  //   formula: 'C₂₇H₃₃N₉O₁₅P₂',
  //   smiles: 'CC1=CC2=C(C=C1C)N(C3=NC(=O)NC(=O)C3=N2)C4C(C(C(O4)COP(=O)(O)OP(=O)(O)OCC5C(C(C(O5)N6C=NC7=C6N=CN=C7N)O)O)O)O',
  //   description: 'Flavin adenine dinucleotide (reduced), derived from ATP',
  //   position: { x: base_x - unit_space * 0.5, y: base_y + unit_space * 15 }
  // },
  
  // Branch to GTP
  // {
  //   id: 'biopterin',
  //   type: 'molecule',
  //   name: 'Biopterin',
  //   formula: 'C₉H₁₁N₅O₃',
  //   smiles: 'C1=NC(=O)NC2=C1N=C3C(=N2)NC(=NC3=O)N',
  //   description: 'Biopterin, a cofactor derived from GTP',
  //   position: { x: base_x + unit_space * 2, y: base_y + unit_space * 15 }
  // }
];

