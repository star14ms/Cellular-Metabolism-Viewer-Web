/**
 * Single-Carbon Metabolism and Sulfur-Containing Amino Acids Pathway - Nodes Data
 * 
 * Positions are relative to 3-phosphoglycerate from glycolysis.
 * 3-phosphoglycerate position: { x: 100, y: 900 } (from glycolysis pathway)
 * unit_space = 200 (standard spacing between nodes)
 * 
 * Two rows:
 * - Upper row (y: 700): Folate metabolism pathway
 * - Lower row (y: 900): Serine/glycine synthesis pathway
 */

const unit_space = 200;
const base_x = 200; // Starting x position (same as 3-phosphoglycerate in glycolysis)
const upper_base_x = base_x + unit_space; // Upper row starts one unit space to the right
const upper_y = 700; // Upper row y position
const lower_y = 900; // Lower row y position (same as 3-phosphoglycerate)

export const singleCarbonMetabolismNodes = [
  // Upper Row: Folate Metabolism Pathway (6 nodes)
  // Shifted one unit space to the right
  {
    id: 'folate',
    type: 'molecule',
    name: 'Folate',
    formula: 'C₁₉H₁₉N₇O₆',
    smiles: 'C1=CC(=CC=C1C(=O)N[C@@H](CCC(=O)O)C(=O)O)NCC2=CN=C3C(=N2)C(=O)NC(=N3)N',
    description: 'Vitamin B9 (folate), essential for single-carbon metabolism',
    position: { x: upper_base_x, y: upper_y }
  },
  {
    id: 'dihydrofolate_single_carbon',
    type: 'molecule',
    name: 'Dihydrofolate',
    formula: 'C₁₉H₂₁N₇O₆',
    smiles: 'C1=CC(=CC=C1C(=O)N[C@@H](CCC(=O)O)C(=O)O)NCC2=CN=C3C(=N2)C(=O)NC(=N3)N',
    description: 'Dihydrofolate, reduced form of folate',
    position: { x: upper_base_x + unit_space * 1, y: upper_y }
  },
  {
    id: 'thf',
    type: 'molecule',
    name: 'Tetrahydrofolate (THF)',
    formula: 'C₁₉H₂₃N₇O₆',
    smiles: 'C1=CC(=CC=C1C(=O)N[C@@H](CCC(=O)O)C(=O)O)NCC2=CN=C3C(=N2)C(=O)NC(=N3)N',
    description: 'Tetrahydrofolate, active form of folate that carries single-carbon units',
    position: { x: upper_base_x + unit_space * 2, y: upper_y }
  },
  {
    id: 'n10_formyl_thf',
    type: 'molecule',
    name: 'N¹⁰-formyl-THF',
    formula: 'C₂₀H₂₃N₇O₇',
    smiles: 'C1=CC(=CC=C1C(=O)N[C@@H](CCC(=O)O)C(=O)O)NCC2=CN=C3C(=N2)C(=O)NC(=N3)N',
    description: 'N10-formyl-tetrahydrofolate, formyl group carrier for purine synthesis',
    position: { x: upper_base_x + unit_space * 3, y: upper_y }
  },
  {
    id: 'n5_n10_methenyl_thf',
    type: 'molecule',
    name: 'N⁵,N¹⁰-methenyl-THF',
    formula: 'C₂₀H₂₁N₇O₇',
    smiles: 'C1=CC(=CC=C1C(=O)N[C@@H](CCC(=O)O)C(=O)O)NCC2=CN=C3C(=N2)C(=O)NC(=N3)N',
    description: 'N5,N10-methenyl-tetrahydrofolate, intermediate in single-carbon metabolism',
    position: { x: upper_base_x + unit_space * 4, y: upper_y }
  },
  {
    id: 'n5_n10_methylene_thf',
    type: 'molecule',
    name: 'N⁵,N¹⁰-methylene-THF',
    formula: 'C₂₀H₂₃N₇O₇',
    smiles: 'C1=CC(=CC=C1C(=O)N[C@@H](CCC(=O)O)C(=O)O)NCC2=CN=C3C(=N2)C(=O)NC(=N3)N',
    description: 'N5,N10-methylene-tetrahydrofolate, methylene group carrier for pyrimidine synthesis and serine-glycine interconversion',
    position: { x: upper_base_x + unit_space * 5, y: upper_y }
  },
  {
    id: 'n5_methyl_thf',
    type: 'molecule',
    name: 'N⁵-methyl-THF',
    formula: 'C₂₀H₂₅N₇O₇',
    smiles: 'C1=CC(=CC=C1C(=O)N[C@@H](CCC(=O)O)C(=O)O)NCC2=CN=C3C(=N2)C(=O)NC(=N3)N',
    description: 'N5-methyl-tetrahydrofolate, methyl donor for homocysteine remethylation to methionine',
    position: { x: upper_base_x + unit_space * 6, y: upper_y }
  },

  // Methionine-Homocysteine Cycle (circular arrangement)
  // Cycle center: x = upper_base_x + unit_space * 7.5, y = upper_y - unit_space * 0.3
  // Nodes arranged clockwise: Methionine → SAM → SAH → Homocysteine → (back to) Methionine
  {
    id: 'methionine',
    type: 'molecule',
    name: 'Methionine',
    pathwayType: 'amino_acids',
    formula: 'C₅H₁₁NO₂S',
    smiles: 'CSCCC(C(=O)O)N',
    description: 'Methionine, essential amino acid, starting point of methionine-homocysteine cycle',
    position: { x: upper_base_x + unit_space * 7.5 - unit_space * 0.7, y: upper_y - unit_space * 0.7 - unit_space * 0.3 }
  },
  {
    id: 'sam',
    type: 'molecule',
    name: 'S-Adenosylmethionine (SAM)',
    formula: 'C₁₅H₂₂N₆O₅S',
    smiles: 'CSCCC(C(=O)O)N[C@@H](CC1=CN=CN1)C(=O)N[C@@H](CC(C)C)C(=O)O',
    description: 'S-adenosylmethionine, universal methyl donor, activated form of methionine',
    position: { x: upper_base_x + unit_space * 7.5 + unit_space * 0.7, y: upper_y - unit_space * 0.7 - unit_space * 0.3 }
  },
  {
    id: 'sah',
    type: 'molecule',
    name: 'S-Adenosylhomocysteine (SAH)',
    formula: 'C₁₄H₂₀N₆O₅S',
    smiles: 'CSCCC(C(=O)O)N[C@@H](CC1=CN=CN1)C(=O)N[C@@H](CC(C)C)C(=O)O',
    description: 'S-adenosylhomocysteine, product of SAM methylation reactions',
    position: { x: upper_base_x + unit_space * 7.5 + unit_space * 0.7, y: upper_y + unit_space * 0.7 - unit_space * 0.3 }
  },
  {
    id: 'homocysteine',
    type: 'molecule',
    name: 'Homocysteine',
    pathwayType: 'amino_acids',
    formula: 'C₄H₉NO₂S',
    smiles: 'CSCCC(C(=O)O)N',
    description: 'Homocysteine, intermediate in methionine cycle, remethylated to methionine using N5-methyl-THF',
    position: { x: upper_base_x + unit_space * 7.5 - unit_space * 0.7, y: upper_y + unit_space * 0.7 - unit_space * 0.3 }
  },

  // Lower Row: Serine/Glycine Pathway (5 nodes)
  // Note: 3-phosphoglycerate uses the same node ID as glycolysis ('3_phosphoglycerate')
  // so it's shared between pathways. The position matches glycolysis: { x: 100, y: 900 }
  {
    id: '3_phosphopyruvate',
    type: 'molecule',
    name: '3-Phosphopyruvate',
    formula: 'C₃H₅O₇P',
    smiles: 'C(=C(OP(=O)(O)O)C(=O)O)O',
    description: '3-phosphopyruvate, oxidized form of 3-phosphoglycerate',
    position: { x: base_x + unit_space * 1, y: lower_y }
  },
  {
    id: '3_phosphoserine',
    type: 'molecule',
    name: '3-Phosphoserine',
    formula: 'C₃H₈NO₇P',
    smiles: 'NC(C(OP(=O)(O)O)C(=O)O)O',
    description: '3-phosphoserine, phosphorylated serine intermediate',
    position: { x: base_x + unit_space * 2, y: lower_y }
  },
  {
    id: 'serine',
    type: 'molecule',
    name: 'Serine',
    pathwayType: 'amino_acids',
    formula: 'C₃H₇NO₃',
    smiles: 'NC(C(C(=O)O)O)O',
    description: 'Serine, non-essential amino acid synthesized from 3-phosphoglycerate',
    position: { x: base_x + unit_space * 3, y: lower_y }
  },
  {
    id: 'glycine',
    type: 'molecule',
    name: 'Glycine',
    pathwayType: 'amino_acids',
    formula: 'C₂H₅NO₂',
    smiles: 'NCC(=O)O',
    description: 'Glycine, simplest amino acid, formed from serine with transfer of one-carbon unit to THF',
    position: { x: base_x + unit_space * 6, y: lower_y } // One unit space right from serine
  },

  // Creatine Synthesis Pathway (extending rightward)
  {
    id: 'guanidinoacetate',
    type: 'molecule',
    name: 'Guanidinoacetate',
    formula: 'C₃H₇N₃O₂',
    smiles: 'NC(=N)NCC(=O)O',
    description: 'Guanidinoacetate, intermediate in creatine synthesis, formed from glycine and arginine',
    position: { x: base_x + unit_space * 6, y: lower_y + unit_space * 1 }
  },
  {
    id: 'creatine',
    type: 'molecule',
    name: 'Creatine',
    formula: 'C₄H₉N₃O₂',
    smiles: 'CN(CC(=O)O)C(=N)N',
    description: 'Creatine, important for energy buffering in muscle tissue',
    position: { x: base_x + unit_space * 6, y: lower_y + unit_space * 2 }
  },
  {
    id: 'phosphocreatine',
    type: 'molecule',
    name: 'Phosphocreatine',
    formula: 'C₄H₁₀N₃O₅P',
    smiles: 'CN(CC(=O)O)C(=N)NP(=O)(O)O',
    description: 'Phosphocreatine, high-energy phosphate storage molecule',
    position: { x: base_x + unit_space * 5, y: lower_y + unit_space * 2.5 }
  },
  {
    id: 'creatinine',
    type: 'molecule',
    name: 'Creatinine',
    formula: 'C₄H₇N₃O',
    smiles: 'CN1CC(=O)NC1=O',
    description: 'Creatinine, waste product excreted in urine',
    position: { x: base_x + unit_space * 4, y: lower_y + unit_space * 2 }
  },

  // Homocysteine Catabolism Pathway (extending downward from homocysteine)
  // Main pathway: homocysteine → cystathionine → cysteine → cysteine sulfinate → hypotaurine → taurine
  // Homocysteine position: { x: 1660, y: 780 } (moved up by 0.3 unit_space)
  {
    id: 'cystathionine',
    type: 'molecule',
    name: 'Cystathionine',
    formula: 'C₇H₁₄N₂O₄S',
    smiles: 'CSCCC(C(=O)O)NC(C(=O)O)CC(=O)O',
    description: 'Cystathionine, intermediate in transsulfuration pathway, formed from homocysteine and serine',
    position: { x: upper_base_x + unit_space * 7.5 - unit_space * 0.7, y: upper_y + unit_space * 0.7 - unit_space * 0.3 + unit_space * 1 }
  },
  {
    id: 'cysteine',
    type: 'molecule',
    name: 'Cysteine',
    pathwayType: 'amino_acids',
    formula: 'C₃H₇NO₂S',
    smiles: 'C(C(C(=O)O)N)S',
    description: 'Cysteine, sulfur-containing amino acid, formed from cystathionine',
    position: { x: upper_base_x + unit_space * 7.5 - unit_space * 0.7, y: upper_y + unit_space * 0.7 - unit_space * 0.3 + unit_space * 2 }
  },
  {
    id: 'cysteine_sulfinate',
    type: 'molecule',
    name: 'Cysteine Sulfinate',
    formula: 'C₃H₇NO₄S',
    smiles: 'C(C(C(=O)O)N)S(=O)(=O)O',
    description: 'Cysteine sulfinate, oxidized form of cysteine, formed by cysteine dioxygenase',
    position: { x: upper_base_x + unit_space * 7.5 - unit_space * 0.7, y: upper_y + unit_space * 0.7 - unit_space * 0.3 + unit_space * 3 }
  },
  {
    id: 'hypotaurine',
    type: 'molecule',
    name: 'Hypotaurine',
    formula: 'C₂H₇NO₂S',
    smiles: 'NCCS(=O)O',
    description: 'Hypotaurine, intermediate in taurine synthesis, formed from cysteine sulfinate',
    position: { x: upper_base_x + unit_space * 7.5 - unit_space * 0.7, y: upper_y + unit_space * 0.7 - unit_space * 0.3 + unit_space * 4 }
  },
  {
    id: 'taurine',
    type: 'molecule',
    name: 'Taurine',
    formula: 'C₂H₇NO₃S',
    smiles: 'NCCS(=O)(=O)O',
    description: 'Taurine, amino sulfonic acid, important for bile salt conjugation',
    position: { x: upper_base_x + unit_space * 8.5 - unit_space * 0.7, y: upper_y + unit_space * 0.7 - unit_space * 0.3 + unit_space * 4 }
  },
  {
    id: 'bile_salts',
    type: 'molecule',
    name: 'Bile Salts',
    formula: 'Variable',
    smiles: '',
    description: 'Bile salts, conjugated with taurine or glycine, important for lipid digestion',
    position: { x: upper_base_x + unit_space * 9.5 - unit_space * 0.7, y: upper_y + unit_space * 0.7 - unit_space * 0.3 + unit_space * 4 }
  },

  // Branch 1: Threonine → α-Ketobutyrate (going right)
  {
    id: 'threonine',
    type: 'molecule',
    name: 'Threonine',
    pathwayType: 'amino_acids',
    formula: 'C₄H₉NO₃',
    smiles: 'CC(C(C(=O)O)N)O',
    description: 'Threonine, essential amino acid, catabolized to α-ketobutyrate',
    position: { x: upper_base_x + unit_space * 7.5, y: upper_y + unit_space * 0.5 - unit_space * 0.3 + unit_space * 1.25 }
  },
  {
    id: 'alpha_ketobutyrate',
    type: 'molecule',
    name: 'α-Ketobutyrate',
    formula: 'C₄H₆O₃',
    smiles: 'CCC(=O)C(=O)O',
    description: 'α-Ketobutyrate, keto acid formed from threonine or cystathionine, converted to succinyl-CoA',
    position: { x: upper_base_x + unit_space * 7.5, y: upper_y + unit_space * 0.5 - unit_space * 0.3 + unit_space * 2 }
  },
  {
    id: 'succinyl_coa_single_carbon',
    type: 'molecule',
    name: 'Succinyl-CoA',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₂₅H₄₀N₇O₁₉P₃S',
    smiles: 'C(CC(=O)O)CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    description: 'Succinyl-CoA, four-carbon thioester produced from α-ketobutyrate, connects to TCA cycle',
    position: { x: upper_base_x + unit_space * 8.5, y: upper_y + unit_space * 0.5 - unit_space * 0.3 + unit_space * 2 }
  },
  {
    id: 'tca_cycle_single_carbon',
    type: 'molecule',
    name: 'TCA Cycle',
    pathwayType: 'oxidative-metabolism',
    formula: 'Multiple',
    imageUrl: 'https://praxilabs.com/en/blog/wp-content/uploads/2024/04/istockphoto-1034141326-612x612-1-1.jpg',
    description: 'Tricarboxylic acid cycle (Krebs cycle)',
    pathwayIdToRoute: 'citric-acid-cycle', // Route to citric acid cycle pathway when clicked
    position: { x: upper_base_x + unit_space * 9.5, y: upper_y + unit_space * 0.5 - unit_space * 0.3 + unit_space * 2 }
  },

  // Branch 2: Cysteine Sulfinate → β-Sulfinylpyruvate (going right)
  {
    id: 'beta_sulfinylpyruvate',
    type: 'molecule',
    name: 'β-Sulfinylpyruvate',
    formula: 'C₃H₄O₅S',
    smiles: 'C(=C(C(=O)O)S(=O)O)C(=O)O',
    description: 'β-Sulfinylpyruvate, transamination product of cysteine sulfinate, converted to pyruvate',
    position: { x: upper_base_x + unit_space * 8.5 - unit_space * 0.7, y: upper_y + unit_space * 0.7 - unit_space * 0.3 + unit_space * 3 }
  },
  {
    id: 'pyruvate_single_carbon',
    type: 'molecule',
    name: 'Pyruvate',
    pathwayType: 'carbohydrates',
    formula: 'C₃H₄O₃',
    smiles: 'CC(=O)C(=O)[O-]',
    description: 'Pyruvate, three-carbon compound produced from β-sulfinylpyruvate, connects to glycolysis',
    position: { x: upper_base_x + unit_space * 9.5 - unit_space * 0.7, y: upper_y + unit_space * 0.7 - unit_space * 0.3 + unit_space * 3 }
  }
];

