const unit_space = 150;
const base_x = -600;
const base_y = 1875;

export const fattyAcidOxidationNodes = [
  // Top part
  {
    id: 'fatty_acyl_coa_cytosol_fao',
    type: 'molecule',
    name: 'Fatty Acyl-CoA',
    description: 'Fatty acid activated with Coenzyme A in the cytosol, ready for transport into mitochondria.',
    position: { x: base_x, y: base_y }
  },
  {
    id: 'acyl_coa_synthetase_fao',
    type: 'complex',
    name: 'Acyl-CoA Synthetase',
    description: 'Enzyme complex that activates fatty acids by attaching CoA, consuming ATP.',
    complexSize: { width: 80, height: 60 },
    position: { x: base_x + unit_space * -0.25, y: base_y + unit_space * 0.75 }
  },
  {
    id: 'cpt1_fao',
    type: 'complex',
    name: 'CPT1',
    description: 'Carnitine Palmitoyltransferase 1: Converts fatty acyl-CoA to fatty acyl-carnitine for transport across the outer mitochondrial membrane.',
    complexSize: { width: 80, height: 60 },
    position: { x: base_x + unit_space * 0.5, y: base_y + unit_space * 0.75 }
  },
  {
    id: 'carnitine_fao',
    type: 'molecule',
    name: 'Carnitine',
    description: 'Carrier molecule essential for transporting long-chain fatty acids into the mitochondrial matrix.',
    position: { x: base_x, y: base_y + unit_space * 1.5 }
  },
  {
    id: 'fatty_acyl_carnitine_fao',
    type: 'molecule',
    name: 'Fatty Acyl-Carnitine',
    description: 'Fatty acid attached to carnitine, capable of crossing the inner mitochondrial membrane.',
    position: { x: base_x + unit_space, y: base_y + unit_space * 1.5 }
  },
  {
    id: 'cpt2_fao',
    type: 'complex',
    name: 'CPT2',
    description: 'Carnitine Palmitoyltransferase 2: Reconverts fatty acyl-carnitine back to fatty acyl-CoA inside the mitochondrial matrix.',
    complexSize: { width: 80, height: 60 },
    position: { x: base_x + unit_space * 0.5, y: base_y + unit_space * 2.25 }
  },
  {
    id: 'translocase_fao',
    type: 'complex',
    name: 'Translocase',
    description: 'Carnitine-acylcarnitine translocase: Transports fatty acyl-carnitine into the matrix in exchange for carnitine.',
    complexSize: { width: 80, height: 60 },
    position: { x: base_x + unit_space * 1.25, y: base_y + unit_space * 2.25 }
  },
  {
    id: 'fatty_acyl_coa_mito_fao',
    type: 'molecule',
    name: 'Fatty Acyl-CoA',
    description: 'Activated fatty acid inside the mitochondrial matrix, ready for beta-oxidation.',
    position: { x: base_x, y: base_y + unit_space * 3 }
  },

  // Bottom part - Column 1
  {
    id: 'trans_enoyl_coa_fao',
    type: 'molecule',
    name: 'trans-enoyl-CoA',
    description: 'Intermediate with a double bond formed by Acyl-CoA Dehydrogenase.',
    position: { x: base_x, y: base_y + unit_space * 4 }
  },
  {
    id: 'beta_hydroxyacyl_coa_fao',
    type: 'molecule',
    name: 'β-hydroxyacyl-CoA',
    description: 'Intermediate formed by hydration of the double bond.',
    position: { x: base_x, y: base_y + unit_space * 5 }
  },
  {
    id: 'beta_ketoacyl_coa_fao',
    type: 'molecule',
    name: 'β-ketoacyl-CoA',
    description: 'Oxidized intermediate ready for cleavage by thiolase.',
    position: { x: base_x, y: base_y + unit_space * 6 }
  },
  {
    id: 'fatty_acyl_coa_shortened_fao',
    type: 'molecule',
    name: '(n-2) fatty acyl-CoA',
    description: 'Shortened fatty acyl-CoA chain that re-enters the beta-oxidation cycle.',
    position: { x: base_x - unit_space * 1, y: base_y + unit_space * 7 }
  },
  {
    id: 'acetyl_coa_fao',
    type: 'molecule',
    name: 'acetyl-CoA',
    description: 'Two-carbon unit released from beta-oxidation, entering the TCA cycle.',
    position: { x: base_x, y: base_y + unit_space * 7 }
  },

  // Bottom part - Column 2
  // (2, n) where n starts from 2
  {
    id: 'tca_entry_fao',
    type: 'molecule',
    name: 'TCA',
    description: 'Tricarboxylic Acid (Krebs) Cycle, where Acetyl-CoA is further oxidized.',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 4 }
  },
  {
    id: 'succinyl_coa_fao',
    type: 'molecule',
    name: 'succinyl-CoA',
    description: 'Intermediate in the breakdown of odd-chain fatty acids, enters the TCA cycle.',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 5 }
  },
  {
    id: 'methylmalonyl_coa_fao',
    type: 'molecule',
    name: 'methylmalonyl-CoA',
    description: 'Isomerized from propionyl-CoA, precursor to succinyl-CoA.',
    position: { x: base_x + unit_space * 2, y: base_y + unit_space * 6 }
  },
  {
    id: 'propionyl_coa_fao',
    type: 'molecule',
    name: 'propionyl-CoA',
    description: 'Three-carbon product from the oxidation of odd-chain fatty acids.',
    position: { x: base_x + unit_space * 1, y: base_y + unit_space * 6.9 }
  }
];
