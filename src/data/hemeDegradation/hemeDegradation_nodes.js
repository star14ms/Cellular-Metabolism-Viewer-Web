/**
 * Heme Degradation - Nodes Data
 * 
 * Base position: Relative to Heme Synthesis (right side)
 * Heme Synthesis ends around x: -2000 + 4.5*150 = -1325
 * So we start this pathway around x: -1000
 */

const unit_space = 150;
const base_x = -450;
const base_y = 3450; // Align with heme synthesis output generally

export const hemeDegradationNodes = [
  {
    id: 'heme_b_degradation',
    type: 'molecule',
    name: 'Heme b',
    formula: 'C₃₄H₃₂FeN₄O₄',
    description: 'Iron-containing porphyrin, starting point of degradation',
    smiles: 'CC1=C(C2=CC3=NC(=CC4=C(C(=C([N-]4)C=C5C(=C(C(=N5)C=C1[N-]2)C=C)C)C)CCC(=O)O)C(=C3C)CCC(=O)O)[Fe+2]',
    position: { x: base_x, y: base_y }
  },
  {
    id: 'biliverdin',
    type: 'molecule',
    name: 'Biliverdin',
    formula: 'C₃₃H₃₄N₄O₆',
    description: 'Green tetrapyrrole bile pigment',
    smiles: 'C1=C(C(=C(N1)CC2=C(C(=C(N2)C=C3C(=C(C(=N3)C=C4C(=C(C(=O)N4)C=C)C)C)CCC(=O)O)CCC(=O)O)C)C)C=C',
    position: { x: base_x + unit_space * 2, y: base_y }
  },
  {
    id: 'bilirubin',
    type: 'molecule',
    name: 'Bilirubin',
    formula: 'C₃₃H₃₆N₄O₆',
    description: 'Yellow tetrapyrrole bile pigment',
    smiles: 'CC1=C(NC(=O)C1CCC(=O)O)CC2=C(C(=C(N2)CC3=C(C(=C(N3)CC4=C(C(=C(N4)C)C=C)C)CCC(=O)O)C)C)C=C',
    position: { x: base_x + unit_space * 4, y: base_y }
  },
  {
    id: 'udp_glucuronate_degradation',
    type: 'molecule',
    name: '2 UDP-glucuronate',
    formula: 'C₁₅H₂₂N₂O₁₈P₂',
    description: 'Donor of glucuronic acid for conjugation',
    smiles: 'C1=CN(C(=O)NC1=O)C2C(C(C(O2)COP(=O)(O)OP(=O)(O)OC3C(C(C(C(O3)C(=O)O)O)O)O)O)O',
    position: { x: base_x + unit_space * 4.66, y: base_y - unit_space * 0.66 } // Positioned above for byreactant visual
  },
  {
    id: 'conjugated_bilirubin_heme_degradation',
    type: 'molecule',
    name: 'Conjugated Bilirubin',
    imageUrl: 'https://library.med.utah.edu/NetBiochem/images/diglufor.gif',
    formula: 'C₃₉H₄₄N₄O₁₂', // Approx mono-glucuronide
    description: 'Water-soluble bilirubin diglucuronide',
    smiles: '...',
    position: { x: base_x + unit_space * 6, y: base_y }
  },
  
  // Excretion endpoints
  {
    id: 'feces_excretion_degradation',
    type: 'molecule',
    name: 'Feces (Stercobilin)',
    imageUrl: 'https://askthescientists.com/wp-content/uploads/2021/04/AdobeStock_240042551-scaled.jpeg',
    description: 'Excreted via bile and intestine',
    position: { x: base_x + unit_space * 8, y: base_y +unit_space * -1 }
  },
  {
    id: 'urine_excretion_degradation',
    type: 'molecule',
    name: 'Urine (Urobilin)',
    imageUrl: 'https://cdn.vectorstock.com/i/1000v/20/43/cute-happy-healthy-smiling-and-sad-unhealthy-urine-vector-26452043.jpg',
    description: 'Excreted via kidney',
    position: { x: base_x + unit_space * 8, y: base_y }
  },
  {
    id: 'bile_excretion_degradation',
    type: 'molecule',
    name: 'Bile',
    description: 'Secreted into gallbladder/intestine',
    position: { x: base_x + unit_space * 8, y: base_y + unit_space * 1 }
  }
];

