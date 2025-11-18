/**
 * Ammonium Capture and Release Pathway - Reactions Data
 */

export const ammoniumCaptureReleaseReactions = [
  // 1. α-Ketoglutarate ↔ Glutamate (Glutamate dehydrogenase-1) - Reversible
  {
    id: 'rxn_acr_1',
    name: 'Glutamate Dehydrogenase Reaction',
    byreactant: ['NH₄⁺', 'NADH'],
    byproduct: ['H₂O', 'NAD⁺'],
    enzyme: {
      name: 'Glutamate Dehydrogenase-1',
      ecNumber: '1.4.1.2',
      description: 'Reversibly converts α-ketoglutarate to glutamate. Forward: consumes NH₄⁺, H₂O, and NADH to produce NAD⁺. Reverse: consumes NAD⁺ to produce NH₄⁺, H₂O, and NADH.',
      cofactors: ['NADH', 'NAD⁺']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Reversible reaction. In the direction of glutamate synthesis, NH₄⁺ and H₂O are consumed, and NADH is oxidized to NAD⁺. In the reverse direction, NH₄⁺ and H₂O are released, and NAD⁺ is reduced to NADH.',
      isReversible: true
    },
  },

  // 2. Glutamate ↔ Many Amino Acids (Transaminases)
  {
    id: 'rxn_acr_4',
    name: 'Transamination',
    byreactant: ['alpha_ketobutyrate_single_carbon'],
    byproduct: ['glutamate'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
    enzyme: {
      name: 'Transaminases',
      ecNumber: '2.6.1.x',
      description: 'Reversibly transfer amino groups between glutamate and various α-ketoacids',
      cofactors: ['B6 (Pyridoxal phosphate)']
    },
    conditions: {
      location: 'Cytosol, Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Reversible transamination reactions. Requires vitamin B6 as cofactor. Glutamate serves as the amino group donor/acceptor.',
      isReversible: true
    },
  },

  // 3. Glutamate → Glutamine (Glutamine synthetase) - Forward
  {
    id: 'rxn_acr_2',
    name: 'Glutamine Synthesis',
    byreactant: ['NH₄⁺', 'ATP'],
    byproduct: ['H₂O', 'ADP', 'Pi'],
    enzyme: {
      name: 'Glutamine Synthetase',
      ecNumber: '6.3.1.2',
      description: 'Catalyzes the ATP-dependent amidation of glutamate to form glutamine, consuming NH₄⁺',
      cofactors: ['ATP', 'Mg²⁺']
    },
    conditions: {
      location: 'Cytosol, Mitochondrial matrix',
      requirement: 'ATP available',
      notes: 'Key reaction for ammonium capture and storage. Consumes ATP, NH₄⁺, and H₂O to produce glutamine.',
      isReversible: false
    },
  },
  
  // 4. Glutamine → Glutamate (Glutaminase) - Reverse
  {
    id: 'rxn_acr_3',
    name: 'Glutamine Hydrolysis',
    byreactant: ['H₂O'],
    byproduct: ['NH₄⁺'],
    enzyme: {
      name: 'Glutaminase',
      ecNumber: '3.5.1.2',
      description: 'Catalyzes the hydrolysis of glutamine to glutamate, releasing NH₄⁺',
      cofactors: ['B6 (Pyridoxal phosphate)']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Key reaction for ammonium release. Requires vitamin B6 as cofactor.',
      isReversible: false
    },
  },
  
  // 5. Glutamate ↔ N-Acetylglutamate (N-acetylglutamate synthase) - Reversible
  {
    id: 'rxn_acr_5',
    name: 'N-Acetylglutamate Synthase Reaction',
    byreactant: ['Acetyl-CoA'],
    byproduct: ['CoA'],
    enzyme: {
      name: 'N-Acetylglutamate Synthase',
      ecNumber: '2.3.1.1',
      description: 'Reversibly catalyzes the acetylation of glutamate to form N-acetylglutamate. Forward: consumes Acetyl-CoA to produce CoA. Reverse: consumes CoA to produce Acetyl-CoA.',
      cofactors: ['Acetyl-CoA', 'CoA']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Reversible reaction. N-acetylglutamate is an allosteric activator of carbamoyl phosphate synthetase I in the urea cycle.',
      isReversible: false
    },
  },
  
  // 6. N-Acetylglutamate → Acetate + H2O (Hydrolase) - Separate reaction
  {
    id: 'rxn_acr_6',
    name: 'N-Acetylglutamate Hydrolysis',
    byreactant: ['H₂O'],
    byproduct: ['Acetate'],
    enzyme: {
      name: 'N-Acetylglutamate Hydrolase',
      ecNumber: '3.5.1.16',
      description: 'Catalyzes the hydrolysis of N-acetylglutamate to acetate and glutamate',
      cofactors: ['None']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Reversible hydrolysis of N-acetylglutamate.',
      isReversible: false
    },
  },
  
  // 7. Glutamate → GABA (Glutamate decarboxylase) - GABA Shunt
  {
    id: 'rxn_acr_7',
    name: 'GABA Synthesis',
    byproduct: ['CO₂'],
    enzyme: {
      name: 'Glutamate Decarboxylase',
      ecNumber: '4.1.1.15',
      description: 'Catalyzes the decarboxylation of glutamate to form γ-aminobutyric acid (GABA)',
      cofactors: ['B6 (Pyridoxal phosphate)']
    },
    conditions: {
      location: 'Cytosol (neurons)',
      requirement: 'Aerobic conditions',
      notes: 'Requires vitamin B6 as cofactor. Releases CO₂.',
      isReversible: false
    },
  },
  
  // 8. GABA → Succinic Semialdehyde (GABA aminotransferase) - GABA Shunt
  {
    id: 'rxn_acr_8',
    name: 'GABA Transamination',
    byreactant: ['α-Ketoglutarate'],
    byproduct: ['Glutamate'],
    enzyme: {
      name: 'GABA Aminotransferase',
      ecNumber: '2.6.1.19',
      description: 'Catalyzes the transamination of GABA with α-ketoglutarate to form succinic semialdehyde and glutamate',
      cofactors: ['B6 (Pyridoxal phosphate)']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Requires vitamin B6 as cofactor. Reversibly interconverts α-ketoglutarate and glutamate.',
      isReversible: true
    },
  },
  
  // 9. Succinic Semialdehyde → Succinate (Succinic semialdehyde dehydrogenase) - GABA Shunt
  {
    id: 'rxn_acr_9',
    name: 'Succinic Semialdehyde Oxidation',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: 'Succinic Semialdehyde Dehydrogenase',
      ecNumber: '1.2.1.24',
      description: 'Catalyzes the oxidation of succinic semialdehyde to succinate, reducing NAD⁺ to NADH',
      cofactors: ['NAD⁺']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Final step of the GABA shunt, connecting to the TCA cycle via succinate.',
      isReversible: false
    },
  },
  
  // Note: α-Ketoglutarate → Succinyl-CoA and Succinyl-CoA → Succinate reactions
  // are already defined in the citric acid cycle (rxn_cac_4 and rxn_cac_5)
];

