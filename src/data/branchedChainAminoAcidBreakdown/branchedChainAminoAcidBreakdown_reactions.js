/**
 * Branched Chain Amino Acid Breakdown - Reactions Data
 * 
 * Organized by columns (left to right) to match nodes structure:
 * Column 1: Leucine pathway
 * Column 2: Isoleucine pathway
 * Column 3: Valine pathway
 * Column 4: Lysine pathway
 */

export const branchedChainAminoAcidBreakdownReactions = [
  // Column 1: Leucine pathway
  {
    id: 'rxn_bcaa_leu_trans',
    name: 'Leucine Transamination',
    byreactant: ['alpha_ketoglutarate_leu'],
    byproduct: ['glutamate_leu'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: 'Branched-Chain Amino Acid Transaminase',
      ecNumber: '2.6.1.42',
      description: 'Transfers amino group from leucine to α-ketoglutarate',
      cofactors: ['Pyridoxal phosphate (B₆)']
    },
    conditions: {
      location: 'Cytoplasm and mitochondria',
      requirement: 'Reversible reaction',
      notes: 'First step in branched-chain amino acid catabolism'
    }
  },
  {
    id: 'rxn_bcaa_leu_transport',
    name: 'α-Ketoisocaproate Transport',
    enzyme: {
      name: 'Mitochondrial transporter',
      ecNumber: 'N/A',
      description: 'Transports α-ketoisocaproate from cytosol to mitochondria',
      cofactors: []
    },
    conditions: {
      location: 'Mitochondrial inner membrane',
      requirement: 'Reversible transport',
      notes: 'Transports α-ketoisocaproate into mitochondria for BCKAD reaction',
      isReversible: true
    }
  },
  {
    id: 'rxn_bcaa_leu_bckad',
    name: 'α-Ketoisocaproate Oxidative Decarboxylation',
    byreactant: ['CoA', 'NAD⁺'],
    byproduct: ['CO₂', 'NADH'],
    enzyme: {
      name: 'Branched-Chain Ketoacid Dehydrogenase (BCKAD)',
      ecNumber: '1.2.4.4',
      description: 'Oxidatively decarboxylates α-ketoisocaproate to isovaleryl-CoA',
      cofactors: ['Thiamine pyrophosphate (B₁)', 'Lipoic acid', 'FAD', 'NAD⁺', 'CoA']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'Irreversible reaction',
      notes: 'Similar mechanism to pyruvate dehydrogenase'
    }
  },
  {
    id: 'rxn_bcaa_leu_1',
    name: 'Isovaleryl-CoA Dehydrogenation',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: 'Isovaleryl-CoA Dehydrogenase',
      ecNumber: '1.3.8.4',
      description: 'Dehydrogenates isovaleryl-CoA to β-methylcrotonyl-CoA',
      cofactors: ['FAD']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'Aerobic conditions',
      notes: 'First step specific to leucine catabolism'
    }
  },
  {
    id: 'rxn_bcaa_leu_2',
    name: 'β-Methylcrotonyl-CoA Carboxylation',
    byreactant: ['HCO₃⁻', 'ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'β-Methylcrotonyl-CoA Carboxylase',
      ecNumber: '6.4.1.4',
      description: 'Carboxylates β-methylcrotonyl-CoA to β-methylglutaconyl-CoA',
      cofactors: ['Biotin (B₇)']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'ATP-dependent carboxylation',
      notes: 'Requires biotin as cofactor'
    }
  },
  {
    id: 'rxn_bcaa_leu_3',
    name: 'β-Methylglutaconyl-CoA Hydration',
    enzyme: {
      name: 'β-Methylglutaconyl-CoA Hydratase',
      ecNumber: '4.2.1.18',
      description: 'Hydrates β-methylglutaconyl-CoA to HMG-CoA',
      cofactors: ['None']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'Reversible reaction',
      notes: 'Adds water to form HMG-CoA'
    }
  },
  {
    id: 'rxn_bcaa_leu_4',
    name: 'HMG-CoA Cleavage',
    enzyme: {
      name: 'HMG-CoA Lyase',
      ecNumber: '4.1.3.4',
      description: 'Cleaves HMG-CoA to acetoacetate and acetyl-CoA',
      cofactors: ['None']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'Irreversible reaction',
      notes: 'Produces ketone body (acetoacetate) and acetyl-CoA'
    }
  },
  
  // Column 2: Isoleucine pathway
  {
    id: 'rxn_bcaa_ile_trans',
    name: 'Isoleucine Transamination',
    byreactant: ['alpha_ketoglutarate_ile'],
    byproduct: ['glutamate_ile'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: 'Branched-Chain Amino Acid Transaminase',
      ecNumber: '2.6.1.42',
      description: 'Transfers amino group from isoleucine to α-ketoglutarate',
      cofactors: ['Pyridoxal phosphate (B₆)']
    },
    conditions: {
      location: 'Cytoplasm and mitochondria',
      requirement: 'Reversible reaction',
      notes: 'First step in branched-chain amino acid catabolism'
    }
  },
  {
    id: 'rxn_bcaa_ile_transport',
    name: 'α-Keto-β-methylvalerate Transport',
    enzyme: {
      name: 'Mitochondrial transporter',
      ecNumber: 'N/A',
      description: 'Transports α-keto-β-methylvalerate from cytosol to mitochondria',
      cofactors: []
    },
    conditions: {
      location: 'Mitochondrial inner membrane',
      requirement: 'Reversible transport',
      notes: 'Transports α-keto-β-methylvalerate into mitochondria for BCKAD reaction',
      isReversible: true
    }
  },
  {
    id: 'rxn_bcaa_ile_bckad',
    name: 'α-Keto-β-methylvalerate Oxidative Decarboxylation',
    byreactant: ['CoA', 'NAD⁺'],
    byproduct: ['CO₂', 'NADH'],
    enzyme: {
      name: 'Branched-Chain Ketoacid Dehydrogenase (BCKAD)',
      ecNumber: '1.2.4.4',
      description: 'Oxidatively decarboxylates α-keto-β-methylvalerate to α-methylbutyryl-CoA',
      cofactors: ['Thiamine pyrophosphate (B₁)', 'Lipoic acid', 'FAD', 'NAD⁺', 'CoA']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'Irreversible reaction',
      notes: 'Similar mechanism to pyruvate dehydrogenase'
    }
  },
  {
    id: 'rxn_bcaa_ile_1',
    name: 'α-Methylbutyryl-CoA Oxidation',
    enzyme: {
      name: 'Multiple enzymes',
      ecNumber: 'Multiple',
      description: 'Multiple steps converting α-methylbutyryl-CoA to propionyl-CoA and acetyl-CoA',
      cofactors: ['Multiple']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'Multiple enzymatic steps',
      notes: 'Similar to fatty acid β-oxidation'
    }
  },
  {
    id: 'rxn_bcaa_ile_2',
    name: 'Propionyl-CoA Carboxylation',
    byreactant: ['HCO₃⁻', 'ATP'],
    byproduct: ['ADP'],
    enzyme: {
      name: 'Propionyl-CoA Carboxylase',
      ecNumber: '6.4.1.3',
      description: 'Carboxylates propionyl-CoA to methylmalonyl-CoA',
      cofactors: ['Biotin (B₇)']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'ATP-dependent carboxylation',
      notes: 'Requires biotin as cofactor'
    }
  },
  {
    id: 'rxn_bcaa_ile_3',
    name: 'Methylmalonyl-CoA Isomerization',
    enzyme: {
      name: 'Methylmalonyl-CoA Mutase',
      ecNumber: '5.4.99.2',
      description: 'Isomerizes methylmalonyl-CoA to succinyl-CoA',
      cofactors: ['Cobalamin (B₁₂)']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'Requires vitamin B₁₂',
      notes: 'Critical step connecting to TCA cycle'
    }
  },
  
  // Column 3: Valine pathway
  {
    id: 'rxn_bcaa_val_trans',
    name: 'Valine Transamination',
    byreactant: ['alpha_ketoglutarate_val'],
    byproduct: ['glutamate_val'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: 'Branched-Chain Amino Acid Transaminase',
      ecNumber: '2.6.1.42',
      description: 'Transfers amino group from valine to α-ketoglutarate',
      cofactors: ['Pyridoxal phosphate (B₆)']
    },
    conditions: {
      location: 'Cytoplasm and mitochondria',
      requirement: 'Reversible reaction',
      notes: 'First step in branched-chain amino acid catabolism'
    }
  },
  {
    id: 'rxn_bcaa_val_transport',
    name: 'α-Ketoisovalerate Transport',
    enzyme: {
      name: 'Mitochondrial transporter',
      ecNumber: 'N/A',
      description: 'Transports α-ketoisovalerate from cytosol to mitochondria',
      cofactors: []
    },
    conditions: {
      location: 'Mitochondrial inner membrane',
      requirement: 'Reversible transport',
      notes: 'Transports α-ketoisovalerate into mitochondria for BCKAD reaction',
      isReversible: true
    }
  },
  {
    id: 'rxn_bcaa_val_bckad',
    name: 'α-Ketoisovalerate Oxidative Decarboxylation',
    byreactant: ['CoA', 'NAD⁺'],
    byproduct: ['CO₂', 'NADH'],
    enzyme: {
      name: 'Branched-Chain Ketoacid Dehydrogenase (BCKAD)',
      ecNumber: '1.2.4.4',
      description: 'Oxidatively decarboxylates α-ketoisovalerate to isobutyryl-CoA',
      cofactors: ['Thiamine pyrophosphate (B₁)', 'Lipoic acid', 'FAD', 'NAD⁺', 'CoA']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'Irreversible reaction',
      notes: 'Similar mechanism to pyruvate dehydrogenase'
    }
  },
  {
    id: 'rxn_bcaa_val_1',
    name: 'Isobutyryl-CoA Oxidation',
    enzyme: {
      name: 'Multiple enzymes',
      ecNumber: 'Multiple',
      description: 'Multiple steps converting isobutyryl-CoA to propionyl-CoA',
      cofactors: ['Multiple']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'Multiple enzymatic steps',
      notes: 'Similar to fatty acid β-oxidation. Valine pathway converges with isoleucine pathway at propionyl-CoA'
    }
  },
  
  // Column 4: Lysine pathway
  {
    id: 'rxn_bcaa_lys_1',
    name: 'Lysine-α-Ketoglutarate Reductase',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    displayByproduct: ['alpha_ketoglutarate_lys_1'],
    enzyme: {
      name: 'Lysine-α-Ketoglutarate Reductase',
      ecNumber: '1.5.1.8',
      description: 'Reduces lysine and α-ketoglutarate to saccharopine',
      cofactors: ['NADPH']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'NADPH-dependent reduction',
      notes: 'First step in lysine catabolism'
    }
  },
  {
    id: 'rxn_bcaa_lys_2',
    name: 'Saccharopine Dehydrogenation',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    displayByproduct: ['glutamate_lys_2'],
    enzyme: {
      name: 'Saccharopine Dehydrogenase',
      ecNumber: '1.5.1.9',
      description: 'Oxidizes saccharopine to α-aminoadipic semialdehyde and glutamate',
      cofactors: ['NAD⁺']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'NAD⁺-dependent oxidation',
      notes: 'Produces glutamate and α-aminoadipic semialdehyde'
    }
  },
  {
    id: 'rxn_bcaa_lys_3',
    name: 'α-Aminoadipic Semialdehyde Dehydrogenation',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: 'Dehydrogenase',
      ecNumber: '1.2.1.31',
      description: 'Oxidizes α-aminoadipic semialdehyde to α-aminoadipate',
      cofactors: ['NAD⁺']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'NAD⁺-dependent oxidation',
      notes: 'Second oxidation step'
    }
  },
  {
    id: 'rxn_bcaa_lys_4',
    name: 'α-Aminoadipate Transamination',
    byreactant: ['alpha_ketoglutarate_lys_trans'],
    byproduct: ['glutamate_lys_trans'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: 'Transaminase',
      ecNumber: '2.6.1.39',
      description: 'Transaminates α-aminoadipate to α-ketoadipate',
      cofactors: ['Pyridoxal phosphate (B₆)']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'Reversible transamination',
      notes: 'Requires pyridoxal phosphate'
    }
  },
  {
    id: 'rxn_bcaa_lys_transport',
    name: 'α-Ketoadipate Transport',
    enzyme: {
      name: 'Mitochondrial transporter',
      ecNumber: 'N/A',
      description: 'Transports α-ketoadipate from cytosol to mitochondria',
      cofactors: []
    },
    conditions: {
      location: 'Mitochondrial inner membrane',
      requirement: 'Reversible transport',
      notes: 'Transports α-ketoadipate into mitochondria for oxidative decarboxylation',
      isReversible: true
    }
  },
  {
    id: 'rxn_bcaa_lys_5',
    name: 'α-Ketoadipate Oxidative Decarboxylation',
    byreactant: ['CoA', 'NAD⁺'],
    byproduct: ['CO₂', 'NADH'],
    enzyme: {
      name: 'α-Ketoadipate Dehydrogenase',
      ecNumber: '1.2.1.52',
      description: 'Oxidatively decarboxylates α-ketoadipate to glutaryl-CoA',
      cofactors: ['Thiamine pyrophosphate (B₁)', 'Lipoic acid', 'FAD', 'NAD⁺', 'CoA']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'Similar to pyruvate dehydrogenase',
      notes: 'Produces glutaryl-CoA'
    }
  },
  {
    id: 'rxn_bcaa_lys_6',
    name: 'Glutaryl-CoA Dehydrogenation',
    byreactant: ['FAD'],
    byproduct: ['FADH₂'],
    enzyme: {
      name: 'Glutaryl-CoA Dehydrogenase',
      ecNumber: '1.3.8.6',
      description: 'Dehydrogenates glutaryl-CoA to crotonyl-CoA',
      cofactors: ['FAD']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'FAD-dependent dehydrogenation',
      notes: 'Similar to fatty acid β-oxidation'
    }
  },
  {
    id: 'rxn_bcaa_lys_7',
    name: 'Crotonyl-CoA Hydration',
    byreactant: ['H₂O'],
    enzyme: {
      name: 'Hydratase',
      ecNumber: '4.2.1.17',
      description: 'Hydrates crotonyl-CoA to β-hydroxybutyryl-CoA',
      cofactors: ['None']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'Reversible hydration',
      notes: 'Adds water across double bond'
    }
  },
  {
    id: 'rxn_bcaa_lys_8',
    name: 'β-Hydroxybutyryl-CoA Dehydrogenation',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: 'Dehydrogenase',
      ecNumber: '1.1.1.35',
      description: 'Oxidizes β-hydroxybutyryl-CoA to acetoacetyl-CoA',
      cofactors: ['NAD⁺']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'NAD⁺-dependent oxidation',
      notes: 'Produces acetoacetyl-CoA'
    }
  },
  {
    id: 'rxn_bcaa_lys_9',
    name: 'Acetoacetyl-CoA Thiolysis',
    byreactant: ['CoA'],
    enzyme: {
      name: 'Thiolase',
      ecNumber: '2.3.1.9',
      description: 'Cleaves acetoacetyl-CoA to two molecules of acetyl-CoA',
      cofactors: ['CoA']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'Reversible thiolysis',
      notes: 'Final step producing acetyl-CoA for TCA cycle'
    }
  },
  
  // Common reaction: Entry into TCA cycle
  {
    id: 'rxn_bcaa_tca_entry',
    name: 'Entry into TCA Cycle',
    enzyme: {
      name: 'TCA Cycle Entry',
      ecNumber: 'Multiple',
      description: 'Acetyl-CoA and succinyl-CoA from branched-chain amino acid breakdown enter the TCA cycle',
      cofactors: ['Multiple']
    },
    conditions: {
      location: 'Mitochondria',
      requirement: 'Aerobic conditions',
      notes: 'Final products from branched-chain amino acid catabolism feed into the TCA cycle for energy production'
    }
  }
];
