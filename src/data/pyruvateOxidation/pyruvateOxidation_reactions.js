/**
 * Pyruvate Oxidation Pathway - Reactions Data
 * 
 * Reactions represent enzymatic transformations
 * Each reaction has a unique ID and references node IDs for substrates/products
 */

export const pyruvateOxidationReactions = [
  {
    id: 'rxn_pyruvate_1',
    name: 'Pyruvate Decarboxylation',
    byproduct: ['CO₂'],
    enzyme: {
      name: 'Pyruvate Dehydrogenase (E1)',
      ecNumber: '1.2.4.1',
      description: 'Decarboxylates pyruvate and attaches it to thiamine pyrophosphate (TPP)',
      cofactors: ['Thiamine pyrophosphate (TPP)', 'Mg²⁺']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'First step of pyruvate dehydrogenase complex'
    }
  },
  {
    id: 'rxn_pyruvate_2',
    name: 'Oxidation and Transfer',
    enzyme: {
      name: 'Dihydrolipoyl Transacetylase (E2)',
      ecNumber: '2.3.1.12',
      description: 'Transfers acetyl group from TPP to lipoic acid',
      cofactors: ['Lipoic acid', 'TPP']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Second step: oxidation and transfer to lipoamide'
    }
  },
  {
    id: 'rxn_pyruvate_3',
    name: 'Acetyl-CoA Formation',
    byreactant: ['CoA'],
    enzyme: {
      name: 'Dihydrolipoyl Transacetylase (E2)',
      ecNumber: '2.3.1.12',
      description: 'Transfers acetyl group from lipoic acid to CoA, forming acetyl-CoA',
      cofactors: ['Coenzyme A', 'Lipoic acid']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Third step: formation of acetyl-CoA and reduced lipoamide'
    }
  },
  {
    id: 'rxn_pyruvate_4',
    name: 'Lipoamide Regeneration',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: 'Dihydrolipoyl Dehydrogenase (E3)',
      ecNumber: '1.8.1.4',
      description: 'Regenerates oxidized lipoamide by reducing FAD to FADH₂',
      cofactors: ['FAD', 'NAD⁺']
    },
    conditions: {
      location: 'Mitochondrial matrix',
      requirement: 'Aerobic conditions',
      notes: 'Final step: regenerates lipoamide and produces NADH'
    }
  }
];

