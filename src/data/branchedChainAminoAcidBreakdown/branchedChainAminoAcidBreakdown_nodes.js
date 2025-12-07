/**
 * Branched Chain Amino Acid Breakdown - Nodes Data
 * 
 * Positions are relative to the first node using unit_space notation.
 * unit_space = 200 (standard spacing between nodes)
 * 
 * Structure: Organized by columns (left to right)
 * Column 0: Common intermediates (α-Ketoglutarate, Glutamate)
 * Column 1: Leucine pathway
 * Column 2: Isoleucine pathway
 * Column 3: Valine pathway
 * Column 4: Lysine pathway
 * Center: TCA cycle node
 */

const unit_space = 150;
const column_spacing = 200;
const base_x = 825; // Positioned to the right of ETC (which ends around x=965)
const base_y = 1450; // Starting from top, flowing downward

export const branchedChainAminoAcidBreakdownNodes = [
  // Column 1: Leucine pathway (x: base_x - unit_space * 1.5)
  {
    id: 'leucine',
    type: 'molecule',
    name: 'Leucine',
    pathwayType: 'amino_acids',
    formula: 'C₆H₁₃NO₂',
    description: 'Branched-chain essential amino acid',
    smiles: 'CC(C)CC(C(=O)O)N',
    position: { x: base_x - column_spacing * 1.5, y: base_y }
  },
  {
    id: 'alpha_ketoisocaproate',
    type: 'molecule',
    name: 'α-Ketoisocaproate (Cytosolic)',
    formula: 'C₆H₁₀O₃',
    description: 'α-Keto acid derivative of leucine in cytosol',
    smiles: 'CC(C)CC(=O)C(=O)O',
    position: { x: base_x - column_spacing * 1.5, y: base_y + unit_space }
  },
  {
    id: 'alpha_ketoisocaproate_mito',
    type: 'molecule',
    name: 'α-Ketoisocaproate (Mitochondrial)',
    formula: 'C₆H₁₀O₃',
    description: 'α-Keto acid derivative of leucine in mitochondria',
    smiles: 'CC(C)CC(=O)C(=O)O',
    position: { x: base_x - column_spacing * 1.5, y: base_y + unit_space * 2 }
  },
  {
    id: 'isovaleryl_coa',
    type: 'molecule',
    name: 'Isovaleryl-CoA',
    formula: 'C₂₆H₄₄N₇O₁₇P₃S',
    description: 'CoA derivative from leucine catabolism',
    smiles: 'CC(C)CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x - column_spacing * 1.5, y: base_y + unit_space * 3 }
  },
  {
    id: 'beta_methylcrotonyl_coa',
    type: 'molecule',
    name: 'β-Methylcrotonyl-CoA',
    formula: 'C₂₆H₄₂N₇O₁₇P₃S',
    description: 'Intermediate in leucine catabolism',
    smiles: 'CC(=CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1)C',
    position: { x: base_x - column_spacing * 1.5, y: base_y + unit_space * 4 }
  },
  {
    id: 'beta_methylglutaconyl_coa',
    type: 'molecule',
    name: 'β-Methylglutaconyl-CoA',
    formula: 'C₂₇H₄₂N₇O₁₉P₃S',
    description: 'Intermediate in leucine catabolism',
    smiles: 'CC(=CC(=O)O)C(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x - column_spacing * 1.5, y: base_y + unit_space * 5 }
  },
  {
    id: 'hmg_coa',
    type: 'molecule',
    name: 'β-Hydroxy-β-methylglutaryl-CoA (HMG-CoA)',
    formula: 'C₂₇H₄₄N₇O₂₀P₃S',
    description: 'Intermediate in leucine catabolism and cholesterol synthesis',
    smiles: 'CC(C)(CC(=O)O)C(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x - column_spacing * 1.5, y: base_y + unit_space * 6 }
  },
  {
    id: 'acetoacetate_bcaa',
    type: 'molecule',
    name: 'Acetoacetate',
    formula: 'C₄H₆O₄',
    description: 'Ketone body produced from leucine catabolism',
    smiles: 'CC(=O)CC(=O)O',
    position: { x: base_x - column_spacing * 2, y: base_y + unit_space * 7 }
  },
  {
    id: 'acetyl_coa_leu',
    type: 'molecule',
    name: 'Acetyl-CoA',
    formula: 'C₂₃H₃₈N₇O₁₇P₃S',
    description: 'Final product from leucine catabolism, feeds into TCA cycle',
    smiles: 'CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x - column_spacing * 1, y: base_y + unit_space * 7 }
  },
  
  // Column 2: Isoleucine pathway (x: base_x - unit_space * 0.5)
  {
    id: 'isoleucine',
    type: 'molecule',
    name: 'Isoleucine',
    pathwayType: 'amino_acids',
    formula: 'C₆H₁₃NO₂',
    description: 'Branched-chain essential amino acid',
    smiles: 'CC[C@H](C)[C@H](C(=O)O)N',
    position: { x: base_x - column_spacing * 0.5, y: base_y }
  },
  {
    id: 'alpha_keto_beta_methylvalerate',
    type: 'molecule',
    name: 'α-Keto-β-methylvalerate (Cytosolic)',
    formula: 'C₆H₁₀O₃',
    description: 'α-Keto acid derivative of isoleucine in cytosol',
    smiles: 'CC[C@H](C)C(=O)C(=O)O',
    position: { x: base_x - column_spacing * 0.5, y: base_y + unit_space }
  },
  {
    id: 'alpha_keto_beta_methylvalerate_mito',
    type: 'molecule',
    name: 'α-Keto-β-methylvalerate (Mitochondrial)',
    formula: 'C₆H₁₀O₃',
    description: 'α-Keto acid derivative of isoleucine in mitochondria',
    smiles: 'CC[C@H](C)C(=O)C(=O)O',
    position: { x: base_x - column_spacing * 0.5, y: base_y + unit_space * 2 }
  },
  {
    id: 'alpha_methylbutyryl_coa',
    type: 'molecule',
    name: 'α-Methylbutyryl-CoA',
    formula: 'C₂₆H₄₄N₇O₁₇P₃S',
    description: 'CoA derivative from isoleucine catabolism',
    smiles: 'CC[C@H](C)CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x - column_spacing * 0.5, y: base_y + unit_space * 3 }
  },
  {
    id: 'propionyl_coa_ile',
    type: 'molecule',
    name: 'Propionyl-CoA',
    formula: 'C₂₄H₄₀N₇O₁₇P₃S',
    description: 'CoA derivative from isoleucine catabolism',
    smiles: 'CCC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x - column_spacing * 0.5, y: base_y + unit_space * 4 }
  },
  {
    id: 'methylmalonyl_coa',
    type: 'molecule',
    name: 'Methylmalonyl-CoA',
    formula: 'C₂₅H₄₀N₇O₁₉P₃S',
    description: 'Intermediate from propionyl-CoA carboxylation',
    smiles: 'CC(C(=O)O)C(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x - column_spacing * 0.5, y: base_y + unit_space * 5 }
  },
  {
    id: 'succinyl_coa_bcaa',
    type: 'molecule',
    name: 'Succinyl-CoA',
    formula: 'C₂₅H₄₀N₇O₁₉P₃S',
    description: 'Final product from isoleucine catabolism, feeds into TCA cycle',
    smiles: 'C(CC(=O)O)CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x - column_spacing * 0.5, y: base_y + unit_space * 6 }
  },
  
  // Column 3: Valine pathway (x: base_x + unit_space * 0.5)
  {
    id: 'valine',
    type: 'molecule',
    name: 'Valine',
    pathwayType: 'amino_acids',
    formula: 'C₅H₁₁NO₂',
    description: 'Branched-chain essential amino acid',
    smiles: 'CC(C)[C@H](C(=O)O)N',
    position: { x: base_x + column_spacing * 0.5, y: base_y }
  },
  {
    id: 'alpha_ketoisovalerate',
    type: 'molecule',
    name: 'α-Ketoisovalerate (Cytosolic)',
    formula: 'C₅H₈O₃',
    description: 'α-Keto acid derivative of valine in cytosol',
    smiles: 'CC(C)C(=O)C(=O)O',
    position: { x: base_x + column_spacing * 0.5, y: base_y + unit_space }
  },
  {
    id: 'alpha_ketoisovalerate_mito',
    type: 'molecule',
    name: 'α-Ketoisovalerate (Mitochondrial)',
    formula: 'C₅H₈O₃',
    description: 'α-Keto acid derivative of valine in mitochondria',
    smiles: 'CC(C)C(=O)C(=O)O',
    position: { x: base_x + column_spacing * 0.5, y: base_y + unit_space * 2 }
  },
  {
    id: 'isobutyryl_coa',
    type: 'molecule',
    name: 'Isobutyryl-CoA',
    formula: 'C₂₅H₄₂N₇O₁₇P₃S',
    description: 'CoA derivative from valine catabolism',
    smiles: 'CC(C)CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x + column_spacing * 0.5, y: base_y + unit_space * 3 }
  },
  {
    id: 'odd_chain_fatty_acyl_coa_bcaa',
    type: 'molecule',
    name: 'Odd-chain Fatty Acyl-CoA',
    description: 'Odd-chain fatty acyl-CoA from fatty acid oxidation, catabolized to propionyl-CoA',
    pubchemCid: 439855,
    position: { x: base_x + column_spacing * 0.5, y: base_y + unit_space * 4 }
  },
  
  // Column 4: Lysine pathway (x: base_x + unit_space * 1.5)
  {
    id: 'lysine',
    type: 'molecule',
    name: 'Lysine',
    pathwayType: 'amino_acids',
    formula: 'C₆H₁₄N₂O₂',
    description: 'Essential amino acid, catabolized via different pathway',
    smiles: 'NCCCCC(C(=O)O)N',
    position: { x: base_x + column_spacing * 1.5, y: base_y + unit_space * -3 }
  },
  {
    id: 'saccharopine',
    type: 'molecule',
    name: 'Saccharopine',
    formula: 'C₁₁H₂₀N₂O₆',
    description: 'Intermediate in lysine catabolism',
    smiles: 'NC(CCCCN)CC(=O)C(CC(=O)O)C(=O)O',
    position: { x: base_x + column_spacing * 1.5, y: base_y + unit_space * -2 }
  },
  {
    id: 'alpha_aminoadipic_semialdehyde',
    type: 'molecule',
    name: 'α-Aminoadipic Semialdehyde',
    formula: 'C₆H₁₁NO₃',
    description: 'Intermediate in lysine catabolism',
    smiles: 'NC(CCCC(=O)C(=O)O)C(=O)O',
    position: { x: base_x + column_spacing * 1.5, y: base_y + unit_space * -1 }
  },
  {
    id: 'alpha_aminoadipate',
    type: 'molecule',
    name: 'α-Aminoadipate',
    formula: 'C₆H₁₁NO₄',
    description: 'Intermediate in lysine catabolism',
    smiles: 'NC(CCCC(=O)O)C(=O)O',
    position: { x: base_x + column_spacing * 1.5, y: base_y + unit_space * 0 }
  },
  {
    id: 'alpha_ketoadipate',
    type: 'molecule',
    name: 'α-Ketoadipate (Cytosolic)',
    formula: 'C₆H₈O₅',
    description: 'Intermediate in lysine catabolism in cytosol',
    smiles: 'CC(=O)CCCC(=O)C(=O)O',
    position: { x: base_x + column_spacing * 1.5, y: base_y + unit_space }
  },
  {
    id: 'alpha_ketoadipate_mito',
    type: 'molecule',
    name: 'α-Ketoadipate (Mitochondrial)',
    formula: 'C₆H₈O₅',
    description: 'Intermediate in lysine catabolism in mitochondria',
    smiles: 'CC(=O)CCCC(=O)C(=O)O',
    position: { x: base_x + column_spacing * 1.5, y: base_y + unit_space * 2 }
  },
  {
    id: 'glutaryl_coa',
    type: 'molecule',
    name: 'Glutaryl-CoA',
    formula: 'C₂₆H₄₀N₇O₂₀P₃S',
    description: 'CoA derivative in lysine catabolism',
    smiles: 'OC(=O)CCCC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x + column_spacing * 1.5, y: base_y + unit_space * 3 }
  },
  {
    id: 'crotonyl_coa',
    type: 'molecule',
    name: 'Crotonyl-CoA',
    formula: 'C₂₅H₄₀N₇O₁₇P₃S',
    description: 'Intermediate in lysine catabolism',
    smiles: 'CC=CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x + column_spacing * 1.5, y: base_y + unit_space * 4 }
  },
  {
    id: 'beta_hydroxybutyryl_coa',
    type: 'molecule',
    name: 'β-Hydroxybutyryl-CoA',
    formula: 'C₂₅H₄₂N₇O₁₈P₃S',
    description: 'Intermediate in lysine catabolism',
    smiles: 'CC(CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1)O',
    position: { x: base_x + column_spacing * 1.5, y: base_y + unit_space * 5 }
  },
  {
    id: 'acetoacetyl_coa',
    type: 'molecule',
    name: 'Acetoacetyl-CoA',
    formula: 'C₂₅H₄₀N₇O₁₈P₃S',
    description: 'Intermediate in lysine catabolism',
    smiles: 'CC(=O)CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x + column_spacing * 1.5, y: base_y + unit_space * 6 }
  },
  {
    id: 'acetyl_coa_lys',
    type: 'molecule',
    name: '2 Acetyl-CoA',
    formula: 'C₂₃H₃₈N₇O₁₇P₃S',
    description: 'Final product from lysine catabolism, feeds into TCA cycle',
    smiles: 'CC(=O)SCCNC(=O)CCNC(=O)[C@@H](N)Cc1c[nH]cn1',
    position: { x: base_x + column_spacing * 1.5, y: base_y + unit_space * 7 }
  },
  
  // Center: TCA cycle node
  {
    id: 'tca_cycle_bcaa',
    type: 'pathway',
    name: 'TCA Cycle',
    pathwayType: 'oxidative-metabolism',
    formula: 'Multiple',
    imageUrl: 'https://praxilabs.com/en/blog/wp-content/uploads/2024/04/istockphoto-1034141326-612x612-1-1.jpg',
    description: 'Tricarboxylic acid cycle (Krebs cycle)',
    pathwayIdToRoute: 'citric-acid-cycle',
    position: { x: base_x + column_spacing * 0.5, y: base_y + unit_space * 8 }
  },

  // Bymolecule nodes: α-Ketoglutarate for transaminase reactions
  {
    id: 'alpha_ketoglutarate_leu',
    type: 'molecule',
    name: 'α-Ketoglutarate',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₅H₆O₅',
    smiles: 'C(CC(=O)O)CC(=O)C(=O)O',
    description: 'α-Ketoglutarate, amino group acceptor for leucine transamination',
    position: { x: base_x - column_spacing * 1.5 + unit_space * 0.66, y: base_y + unit_space * 0.05 }
  },
  {
    id: 'alpha_ketoglutarate_ile',
    type: 'molecule',
    name: 'α-Ketoglutarate',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₅H₆O₅',
    smiles: 'C(CC(=O)O)CC(=O)C(=O)O',
    description: 'α-Ketoglutarate, amino group acceptor for isoleucine transamination',
    position: { x: base_x - column_spacing * 0.5 + unit_space * 0.66, y: base_y + unit_space * 0.05 }
  },
  {
    id: 'alpha_ketoglutarate_val',
    type: 'molecule',
    name: 'α-Ketoglutarate',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₅H₆O₅',
    smiles: 'C(CC(=O)O)CC(=O)C(=O)O',
    description: 'α-Ketoglutarate, amino group acceptor for valine transamination',
    position: { x: base_x + column_spacing * 0.5 + unit_space * 0.66, y: base_y + unit_space * 0.05 }
  },
  {
    id: 'alpha_ketoglutarate_lys_trans',
    type: 'molecule',
    name: 'α-Ketoglutarate',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₅H₆O₅',
    smiles: 'C(CC(=O)O)CC(=O)C(=O)O',
    description: 'α-Ketoglutarate, amino group acceptor for α-aminoadipate transamination',
    position: { x: base_x + column_spacing * 1.5 + unit_space * 0.66, y: base_y + unit_space * 0.05 }
  },
  {
    id: 'alpha_ketoglutarate_lys_1',
    type: 'molecule',
    name: 'α-Ketoglutarate',
    pathwayType: 'oxidative-metabolism',
    formula: 'C₅H₆O₅',
    smiles: 'C(CC(=O)O)CC(=O)C(=O)O',
    description: 'α-Ketoglutarate, substrate for lysine-α-ketoglutarate reductase',
    position: { x: base_x + column_spacing * 1.5 + unit_space * 0.9, y: base_y + unit_space * -1.8 }
  },

  // Bymolecule nodes: Glutamate for transaminase reactions and saccharopine dehydrogenation
  {
    id: 'glutamate_leu',
    type: 'molecule',
    name: 'Glutamate',
    pathwayType: 'amino_acids',
    formula: 'C₅H₉NO₄',
    smiles: 'C(CC(=O)O)CC(C(=O)O)N',
    description: 'Glutamate, amino group donor produced from leucine transamination',
    position: { x: base_x - column_spacing * 1.5 + unit_space * 0.66, y: base_y + unit_space * 0.95 }
  },
  {
    id: 'glutamate_ile',
    type: 'molecule',
    name: 'Glutamate',
    pathwayType: 'amino_acids',
    formula: 'C₅H₉NO₄',
    smiles: 'C(CC(=O)O)CC(C(=O)O)N',
    description: 'Glutamate, amino group donor produced from isoleucine transamination',
    position: { x: base_x - column_spacing * 0.5 + unit_space * 0.66, y: base_y + unit_space * 0.95 }
  },
  {
    id: 'glutamate_val',
    type: 'molecule',
    name: 'Glutamate',
    pathwayType: 'amino_acids',
    formula: 'C₅H₉NO₄',
    smiles: 'C(CC(=O)O)CC(C(=O)O)N',
    description: 'Glutamate, amino group donor produced from valine transamination',
    position: { x: base_x + column_spacing * 0.5 + unit_space * 0.66, y: base_y + unit_space * 0.95 }
  },
  {
    id: 'glutamate_lys_trans',
    type: 'molecule',
    name: 'Glutamate',
    pathwayType: 'amino_acids',
    formula: 'C₅H₉NO₄',
    smiles: 'C(CC(=O)O)CC(C(=O)O)N',
    description: 'Glutamate, amino group donor produced from α-aminoadipate transamination',
    position: { x: base_x + column_spacing * 1.5 + unit_space * 0.66, y: base_y + unit_space * 0.95 }
  },
  {
    id: 'glutamate_lys_2',
    type: 'molecule',
    name: 'Glutamate',
    pathwayType: 'amino_acids',
    formula: 'C₅H₉NO₄',
    smiles: 'C(CC(=O)O)CC(C(=O)O)N',
    description: 'Glutamate, produced from saccharopine dehydrogenation',
    position: { x: base_x + column_spacing * 1.5 + unit_space * 0.9, y: base_y + unit_space * -1.2 }
  }
];
