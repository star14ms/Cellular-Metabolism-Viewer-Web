/**
 * Ketone Body Metabolism - Reactions Data
 */

export const ketoneBodyMetabolismReactions = [
  // 1. Transport
  {
    id: 'rxn_kbm_1',
    name: 'Acetaldehyde Transport',
    type: 'transport',
    conditions: {
      location: 'Cytosol to Mitochondria',
      notes: 'Transport of acetaldehyde for metabolism'
    }
  },
  // 2. Preparation
  {
    id: 'rxn_kbm_2',
    name: 'Acetaldehyde Oxidation',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH', 'H⁺'],
    enzyme: {
      name: 'Acetaldehyde Dehydrogenase',
      ecNumber: '1.2.1.3',
      description: 'Oxidizes acetaldehyde to acetate'
    },
    conditions: {
      location: 'Mitochondrial Matrix',
      notes: 'Generates NADH'
    }
  },
  {
    id: 'rxn_kbm_3',
    name: 'Acetate Activation',
    byreactant: ['CoA', 'ATP'],
    byproduct: ['AMP', 'PPi'],
    enzyme: {
      name: 'Acetyl-CoA Synthetase',
      ecNumber: '6.2.1.1',
      description: 'Activates acetate to acetyl-CoA'
    },
    conditions: {
      location: 'Mitochondrial Matrix',
      notes: 'Requires ATP'
    }
  },
  {
    id: 'rxn_kbm_4',
    name: 'TCA Entry',
    type: 'transport',
    conditions: {
      notes: 'Acetyl-CoA enters the Citric Acid Cycle'
    }
  },

  // 3. Synthesis
  {
    id: 'rxn_kbm_5',
    name: 'Acetoacetyl-CoA Synthesis',
    byreactant: [], // 2 Acetyl-CoA is the reactant node
    byproduct: ['CoA'],
    enzyme: {
      name: 'Thiolase (Acetyl-CoA Acetyltransferase)',
      ecNumber: '2.3.1.9',
      description: 'Condenses two acetyl-CoA molecules'
    },
    conditions: {
      location: 'Mitochondrial Matrix (Liver)',
      regulation: 'Inhibited by CoA'
    }
  },
  {
    id: 'rxn_kbm_6',
    name: 'HMG-CoA Synthesis',
    byreactant: ['Acetyl-CoA', 'H₂O'],
    byproduct: ['CoA'],
    enzyme: {
      name: 'HMG-CoA Synthase',
      ecNumber: '2.3.3.10',
      description: 'Condenses acetoacetyl-CoA with acetyl-CoA'
    },
    conditions: {
      location: 'Mitochondrial Matrix',
      notes: 'Rate-limiting step of ketone synthesis'
    }
  },
  // Step 7 is effectively skipped/implicit or part of HMG-CoA logic in this numbering scheme compared to user request? 
  // User said "Step 8: HMG-CoA -> acetoacetate ...". 
  // I'll treat HMG-CoA Lyase as Step 8 to match user instructions.
  // I will leave Step 7 empty or adjust numbering if needed, but user specifically said "Step 8". 
  // I'll skip 7 or maybe the user considers Acetyl-CoA -> HMG-CoA as taking multiple steps?
  // I'll just number it 8.
  {
    id: 'rxn_kbm_8',
    name: 'HMG-CoA Cleavage',
    byproduct: [], // Acetyl-CoA is a product node here
    enzyme: {
      name: 'HMG-CoA Lyase',
      ecNumber: '4.1.3.4',
      description: 'Cleaves HMG-CoA to acetoacetate and acetyl-CoA'
    },
    conditions: {
      location: 'Mitochondrial Matrix',
      notes: 'Releases Acetyl-CoA'
    }
  },
  {
    id: 'rxn_kbm_9',
    name: 'Acetone Formation',
    byproduct: ['CO₂'],
    enzyme: {
      name: 'Non-enzymatic / Acetoacetate Decarboxylase',
      description: 'Spontaneous decarboxylation of acetoacetate'
    },
    conditions: {
      notes: 'Occurs spontaneously or catalyzed by acetoacetate decarboxylase'
    }
  },
  {
    id: 'rxn_kbm_10',
    name: 'β-Hydroxybutyrate Formation',
    byreactant: ['NADH', 'H⁺'],
    byproduct: ['NAD⁺'],
    enzyme: {
      name: 'β-Hydroxybutyrate Dehydrogenase',
      ecNumber: '1.1.1.30',
      description: 'Reduces acetoacetate to β-hydroxybutyrate'
    },
    conditions: {
      location: 'Mitochondrial Matrix',
      notes: 'Major circulating ketone body',
      isReversible: true
    }
  },
  {
    id: 'rxn_kbm_12',
    name: 'Acetoacetate Activation',
    byreactant: ['Succinyl-CoA'], // Represented by nodes/arrows
    byproduct: ['Succinate'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: 'Succinyl-CoA:Acetoacetate Transferase (SCOT)',
      ecNumber: '2.8.3.5',
      description: 'Transfers CoA from succinyl-CoA to acetoacetate'
    },
    conditions: {
      location: 'Mitochondria (Extrahepatic tissues)',
      notes: 'SCOT is absent in liver, preventing futile cycling'
    }
  },
  {
    id: 'rxn_kbm_13',
    name: 'Thiolysis',
    byreactant: ['CoA'],
    enzyme: {
      name: 'Thiolase',
      ecNumber: '2.3.1.9',
      description: 'Cleaves acetoacetyl-CoA into two acetyl-CoA molecules'
    },
    conditions: {
      location: 'Mitochondria'
    }
  },
  {
    id: 'rxn_kbm_14',
    name: 'TCA Entry (Breakdown)',
    type: 'transport',
    conditions: {
      notes: 'Acetyl-CoA enters the Citric Acid Cycle for energy production'
    }
  }
];

