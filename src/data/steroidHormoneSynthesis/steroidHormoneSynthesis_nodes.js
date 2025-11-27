/**
 * Steroid Hormone Synthesis Pathway - Nodes Data
 * 
 * Positions are relative to a base position.
 * unit_space = 150 (standard spacing between nodes)
 * Organized in 4 columns:
 * Column 1: Zona Glomerulosa (Mineralocorticoid Synthesis)
 * Column 2: Zona Fasciculata/Reticularis (Glucocorticoid Synthesis)
 * Column 3: Zona Fasciculata/Reticularis (Androgen Synthesis)
 * Column 4: Peripheral Tissue Metabolism
 */

const unit_space = 150;
const base_x = -2100; // Column 1 position
const base_y = 700; // Starting y position

export const steroidHormoneSynthesisNodes = [
  // Column 1: Zona Glomerulosa (Mineralocorticoid Synthesis)
//   {
//     id: 'cholesterol_st',
//     type: 'molecule',
//     name: 'Cholesterol',
//     formula: 'C₂₇H₄₆O',
//     smiles: 'CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C',
//     description: 'Starting molecule for steroid hormone synthesis, precursor to all steroid hormones',
//     position: { x: base_x, y: base_y }
//   },
  {
    id: 'pregnenolone_st',
    type: 'molecule',
    name: 'Pregnenolone',
    formula: 'C₂₁H₃₂O₂',
    smiles: 'CC(=O)C1CCC2C3CCC4CC(CCC4(C)C3CCC2(C1)O)C',
    description: 'First steroid hormone intermediate, precursor to all steroid hormones',
    position: { x: base_x, y: base_y + unit_space * 1 }
  },
  {
    id: 'progesterone_st',
    type: 'molecule',
    name: 'Progesterone',
    formula: 'C₂₁H₃₀O₂',
    smiles: 'CC(=O)C1CCC2C3CCC4CC(CCC4(C)C3CCC2(C1)O)C',
    description: 'Progestogen hormone, precursor to mineralocorticoids and glucocorticoids',
    position: { x: base_x, y: base_y + unit_space * 2 }
  },
  {
    id: '11_deoxycorticosterone_st',
    type: 'molecule',
    name: '11-Deoxycorticosterone (11-DOC)',
    formula: 'C₂₁H₃₀O₃',
    smiles: 'CC(=O)C1CCC2C3CCC4CC(CCC4(C)C3CCC2(C1)O)CC(=O)O',
    description: 'Intermediate in mineralocorticoid synthesis, precursor to corticosterone',
    position: { x: base_x, y: base_y + unit_space * 3 }
  },
  {
    id: 'corticosterone_st',
    type: 'molecule',
    name: 'Corticosterone',
    formula: 'C₂₁H₃₀O₄',
    smiles: 'CC(=O)C1CCC2C3CCC4CC(CCC4(C)C3CCC2(C1)O)CC(=O)O',
    description: 'Glucocorticoid hormone, precursor to aldosterone',
    position: { x: base_x, y: base_y + unit_space * 4 }
  },
  {
    id: 'aldosterone_st',
    type: 'molecule',
    name: 'Aldosterone',
    formula: 'C₂₁H₂₈O₅',
    smiles: 'CC(=O)C1CCC2C3CCC4CC(CCC4(C)C3CCC2(C1)O)CC(=O)O',
    description: 'Primary mineralocorticoid hormone, regulates sodium and water balance',
    position: { x: base_x, y: base_y + unit_space * 5 }
  },

  // Column 2: Zona Fasciculata/Reticularis (Glucocorticoid Synthesis)
  {
    id: '17_hydroxypregnenolone_st',
    type: 'molecule',
    name: '17-Hydroxypregnenolone',
    formula: 'C₂₁H₃₂O₃',
    smiles: 'CC(=O)C1CCC2C3CCC4CC(CCC4(C)C3CCC2(C1)O)O',
    description: '17-hydroxylated pregnenolone, precursor to glucocorticoids and androgens',
    position: { x: base_x + unit_space * 1, y: base_y + unit_space * 1 }
  },
  {
    id: '17_hydroxyprogesterone_st',
    type: 'molecule',
    name: '17-Hydroxyprogesterone',
    formula: 'C₂₁H₃₀O₃',
    smiles: 'CC(=O)C1CCC2C3CCC4CC(CCC4(C)C3CCC2(C1)O)O',
    description: '17-hydroxylated progesterone, precursor to cortisol and androgens',
    position: { x: base_x + unit_space * 1, y: base_y + unit_space * 2 }
  },
  {
    id: '11_deoxycortisol_st',
    type: 'molecule',
    name: '11-Deoxycortisol',
    formula: 'C₂₁H₃₀O₄',
    smiles: 'CC(=O)C1CCC2C3CCC4CC(CCC4(C)C3CCC2(C1)O)CC(=O)O',
    description: 'Intermediate in cortisol synthesis, precursor to cortisol',
    position: { x: base_x + unit_space * 1, y: base_y + unit_space * 3 }
  },
  {
    id: 'cortisol_st',
    type: 'molecule',
    name: 'Cortisol',
    formula: 'C₂₁H₃₀O₅',
    smiles: 'CC(=O)C1CCC2C3CCC4CC(CCC4(C)C3CCC2(C1)O)CC(=O)O',
    description: 'Primary glucocorticoid hormone, regulates metabolism and stress response',
    position: { x: base_x + unit_space * 1, y: base_y + unit_space * 5 }
  },

  // Column 3: Zona Fasciculata/Reticularis (Androgen Synthesis)
  {
    id: 'dhea_st',
    type: 'molecule',
    name: 'Dehydroepiandrosterone (DHEA)',
    formula: 'C₁₉H₂₈O₂',
    smiles: 'CC(=O)C1CCC2C3CCC4CC(CCC4(C)C3CCC2(C1)O)C',
    description: 'Weak androgen, precursor to androstenedione and testosterone',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 1 }
  },
  {
    id: 'androstenedione_st',
    type: 'molecule',
    name: 'Androstenedione',
    formula: 'C₁₉H₂₆O₂',
    smiles: 'CC(=O)C1CCC2C3CCC4CC(CCC4(C)C3CCC2(C1)O)C',
    description: 'Androgen precursor, converted to testosterone or estrone',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 2 }
  },
  {
    id: 'testosterone_st',
    type: 'molecule',
    name: 'Testosterone',
    formula: 'C₁₉H₂₈O₂',
    smiles: 'CC(=O)C1CCC2C3CCC4CC(CCC4(C)C3CCC2(C1)O)C',
    description: 'Primary androgen hormone, converted to DHT or estradiol',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 3 }
  },

  // Column 4: Peripheral Tissue Metabolism
  {
    id: 'estrone_st',
    type: 'molecule',
    name: 'Estrone',
    formula: 'C₁₈H₂₂O₂',
    smiles: 'CC1=CC(=O)C2C3CCC4CC(CCC4(C)C3CCC2(C1)O)O',
    description: 'Estrogen hormone, formed from androstenedione by aromatase',
    position: { x: base_x + unit_space * 3, y: base_y + unit_space * 2 }
  },
  {
    id: 'estradiol_st',
    type: 'molecule',
    name: 'Estradiol',
    formula: 'C₁₈H₂₄O₂',
    smiles: 'CC1=CC(=O)C2C3CCC4CC(CCC4(C)C3CCC2(C1)O)O',
    description: 'Primary estrogen hormone, formed from estrone or testosterone',
    position: { x: base_x + unit_space * 3, y: base_y + unit_space * 3 }
  },
  {
    id: 'dht_st',
    type: 'molecule',
    name: 'Dihydrotestosterone (DHT)',
    formula: 'C₁₉H₃₀O₂',
    smiles: 'CC(=O)C1CCC2C3CCC4CC(CCC4(C)C3CCC2(C1)O)C',
    description: 'Potent androgen, formed from testosterone by 5α-reductase',
    position: { x: base_x + unit_space * 3, y: base_y + unit_space * 4 }
  },
  {
    id: 'cortisone_st',
    type: 'molecule',
    name: 'Cortisone',
    formula: 'C₂₁H₂₈O₅',
    smiles: 'CC(=O)C1CCC2C3CCC4CC(CCC4(C)C3CCC2(C1)O)CC(=O)O',
    description: 'Inactive glucocorticoid, interconverted with cortisol in peripheral tissues',
    position: { x: base_x + unit_space * 3, y: base_y + unit_space * 5 }
  }
];

