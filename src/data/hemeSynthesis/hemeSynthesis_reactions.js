/**
 * Heme Synthesis - Reactions Data
 */

export const hemeSynthesisReactions = [
  // --- Mitochondrial Matrix ---
  {
    id: 'rxn_heme_1',
    name: 'δ-Aminolevulinic Acid Synthase',
    byreactant: ['glycine_heme_matrix'],
    byproduct: ['CO₂', 'CoA'],
    hideByreactantLabels: true,
    enzyme: {
      name: 'δ-Aminolevulinic Acid Synthase (ALAS)',
      ecNumber: '2.3.1.37',
      description: 'Condenses Glycine and Succinyl-CoA to form δ-ALA. Rate-limiting step.',
      cofactors: ['Pyridoxal phosphate (Vitamin B6)']
    },
    conditions: {
      location: 'Mitochondrial Matrix',
      requirement: 'Rate-limiting, regulated by heme (feedback inhibition)',
      notes: 'Committed step of heme synthesis'
    }
  },

  // --- Transport ---
  {
    id: 'rxn_heme_transport_1',
    name: 'δ-ALA Transport',
    description: 'Transport of δ-ALA from Mitochondria to Cytosol',
    type: 'transport',
    conditions: {
      location: 'Mitochondrial Inner Membrane',
      notes: 'Moves precursor to cytosol for next steps',
      isReversible: true
    }
  },

  // --- Cytosol ---
  {
    id: 'rxn_heme_2',
    name: 'δ-Aminolevulinic Acid Dehydratase',
    byproduct: ['2 H₂O'],
    enzyme: {
      name: 'δ-Aminolevulinic Acid Dehydratase (Porphobilinogen Synthase)',
      ecNumber: '4.2.1.24',
      description: 'Condenses two molecules of δ-ALA to form Porphobilinogen',
      cofactors: ['Zn²⁺']
    },
    conditions: {
      location: 'Cytosol',
      inhibitors: ['Lead (Pb²⁺)'],
      notes: 'Highly sensitive to heavy metal inhibition (Lead poisoning)',
      isReversible: true
    }
  },
  {
    id: 'rxn_heme_3',
    name: 'Porphobilinogen Deaminase',
    byreactant: ['4 H₂O'],
    byproduct: ['4 NH₄⁺'],
    enzyme: {
      name: 'Porphobilinogen Deaminase (Hydroxymethylbilane Synthase)',
      ecNumber: '2.5.1.61',
      description: 'Polymerizes four PBG molecules into linear Hydroxymethylbilane',
      cofactors: ['Dipyrromethane cofactor']
    },
    conditions: {
      location: 'Cytosol',
      notes: 'Deficiency causes Acute Intermittent Porphyria',
      isReversible: true
    }
  },
  {
    id: 'rxn_heme_4',
    name: 'Uroporphyrinogen III Synthase',
    byproduct: ['H₂O'],
    enzyme: {
      name: 'Uroporphyrinogen III Synthase',
      ecNumber: '4.2.1.75',
      description: 'Cyclizes Hydroxymethylbilane to Uroporphyrinogen III (reverses ring D)',
      cofactors: ['None']
    },
    conditions: {
      location: 'Cytosol',
      notes: 'Deficiency causes Congenital Erythropoietic Porphyria',
      isReversible: true
    }
  },
  {
    id: 'rxn_heme_5',
    name: 'Uroporphyrinogen Decarboxylase',
    byproduct: ['4 CO₂'],
    enzyme: {
      name: 'Uroporphyrinogen Decarboxylase',
      ecNumber: '4.1.1.37',
      description: 'Decarboxylates 4 acetate side chains to methyl groups',
      cofactors: ['None']
    },
    conditions: {
      location: 'Cytosol',
      notes: 'Deficiency causes Porphyria Cutanea Tarda'
    }
  },
  {
    id: 'rxn_heme_6',
    name: 'Coproporphyrinogen Oxidase',
    byreactant: ['O₂'], 
    byproduct: ['2 CO₂', '2 H₂O'],
    enzyme: {
      name: 'Coproporphyrinogen Oxidase',
      ecNumber: '1.3.3.3',
      description: 'Oxidative decarboxylation of 2 propionate side chains to vinyl groups',
      cofactors: ['None']
    },
    conditions: {
      location: 'Intermembrane Space / Cytosol Interface',
      notes: 'Specific for type III isomer'
    }
  },

  // --- Transport ---
  {
    id: 'rxn_heme_transport_2',
    name: 'Protoporphyrinogen IX Transport',
    description: 'Transport of Protoporphyrinogen IX back into Mitochondria',
    type: 'transport',
    conditions: {
      location: 'Mitochondrial Inner Membrane',
      notes: 'Re-entry for final oxidation and ferrochelation',
      isReversible: true
    }
  },

  // --- Mitochondrial Matrix ---
  {
    id: 'rxn_heme_7',
    name: 'Protoporphyrinogen Oxidase',
    byreactant: ['3 O₂'],
    byproduct: ['3 H₂O₂'], // or 3 H₂O depending on acceptor
    enzyme: {
      name: 'Protoporphyrinogen Oxidase',
      ecNumber: '1.3.3.4',
      description: 'Oxidizes methylene bridges to methine bridges (aromatization)',
      cofactors: ['FAD']
    },
    conditions: {
      location: 'Inner Mitochondrial Membrane',
      notes: 'Deficiency causes Variegate Porphyria'
    }
  },
  {
    id: 'rxn_heme_8',
    name: 'Ferrochelatase',
    byreactant: ['Fe²⁺'],
    byproduct: ['2 H⁺'],
    enzyme: {
      name: 'Ferrochelatase',
      ecNumber: '4.99.1.1',
      description: 'Inserts Ferrous Iron (Fe²⁺) into Protoporphyrin IX ring',
      cofactors: ['Iron-sulfur cluster']
    },
    conditions: {
      location: 'Inner Mitochondrial Membrane',
      inhibitors: ['Lead (Pb²⁺)'],
      notes: 'Final step of heme synthesis'
    }
  }
];

