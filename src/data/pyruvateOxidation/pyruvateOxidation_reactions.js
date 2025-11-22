/**
 * Pyruvate Oxidation Pathway - Reactions Data
 * 
 * Reactions represent enzymatic transformations
 * Each reaction has a unique ID and references node IDs for substrates/products
 * 
 * Optional fields:
 * - hideMainArrow: Boolean - If true, the main arrow for this reaction will not be drawn,
 *   but by-molecule arrows (byreactant/byproduct) will still be drawn if they exist
 */

export const pyruvateOxidationReactions = [
  {
    id: 'rxn_pyruvate_0',
    name: 'Pyruvate Transport into Mitochondrial Matrix',
    enzyme: {
      name: 'Pyruvate Translocator (Mitochondrial Pyruvate Carrier, MPC)',
      description: 'Transports pyruvate from the cytosol into the mitochondrial matrix across the inner mitochondrial membrane',
      notes: 'Transport occurs via facilitated diffusion using the mitochondrial pyruvate carrier (MPC) complex.'
    },
    conditions: {
      location: 'Mitochondrial inner membrane',
      requirement: 'Presence of mitochondrial pyruvate carrier (MPC)',
      notes: 'Electrogenic transport, coupled to proton gradient or symport with H⁺'
    }
  },
  {
    id: 'rxn_pyruvate_1',
    name: 'Pyruvate Decarboxylation & Activation of TPP',
    byproduct: ['CO₂'],
    displayByproduct: ['Hydroxyethyl-TPP'],
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
    byreactant: ['hydroxyethyl-tpp'],
    byproduct: ['thiamine-pyrophosphate'],
    hideByreactantLabels: true,
    hideByproductLabels: true,
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
    byproduct: ['Acetyl-CoA'],
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

