/**
 * Heme Degradation - Reactions Data
 */

export const hemeDegradationReactions = [
  {
    id: 'rxn_heme_deg_1',
    name: 'Heme Oxygenase',
    byreactant: ['3 NADPH', '3 O₂'], // Simplified inputs/outputs combined
    byproduct: ['3 NADP⁺', 'Fe³⁺', 'CO'],
    hideByreactantLabels: false, // User said "Draw bymolecule nodes only for third reaction" -> implying hide for others? No, "Draw bymolecule nodes only for third reaction" means explicitly *draw nodes* for the 3rd, others just text? Or "Draw bymolecule nodes only for third reaction" means draw the *nodes* in the diagram vs just labels. The standard behavior is labels. I will stick to standard unless specified. But for the 3rd reaction I must use node references.
    // Correction: "Draw bymolecule nodes only for third reaction" -> implies 1, 2, 4 don't have extra nodes drawn.
    enzyme: {
      name: 'Heme Oxygenase',
      ecNumber: '1.14.99.3',
      description: 'Oxidative cleavage of heme to biliverdin, releasing Iron and CO',
      cofactors: ['NADPH', 'O₂']
    },
    conditions: {
      location: 'Macrophage (Reticuloendothelial System)',
      notes: 'Rate-limiting step of heme degradation. Releases CO as signaling molecule.'
    }
  },
  {
    id: 'rxn_heme_deg_2',
    name: 'Biliverdin Reductase',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: 'Biliverdin Reductase',
      ecNumber: '1.3.1.24',
      description: 'Reduces biliverdin to bilirubin',
      cofactors: ['NADPH']
    },
    conditions: {
      location: 'Cytosol (Macrophage)',
      notes: 'Produces antioxidant bilirubin'
    }
  },
  {
    id: 'rxn_heme_deg_3',
    name: 'UDP-Glucuronosyltransferase',
    // "Draw bymolecule nodes only for third reaction, and putting node_id on byreactant, byproduct part, and hide the label"
    byreactant: ['udp_glucuronate_degradation'], // Using node ID here
    byproduct: ['2 UDP'],
    hideByreactantLabels: true, // Hiding the text label because we are drawing the node
    enzyme: {
      name: 'UDP-Glucuronosyltransferase (UGT1A1)',
      ecNumber: '2.4.1.17',
      description: 'Conjugates bilirubin with glucuronic acid to increase solubility',
      cofactors: ['None']
    },
    conditions: {
      location: 'Liver (Endoplasmic Reticulum)',
      notes: 'Deficiency causes Crigler-Najjar or Gilbert syndrome'
    }
  },
  {
    id: 'rxn_heme_deg_4',
    name: 'Excretion',
    description: 'Transport of conjugated bilirubin to bile, then intestine/kidney',
    type: 'transport', // It's a branching flow
    conditions: {
      location: 'Liver -> Bile -> Intestine/Kidney',
      notes: 'Bacterial flora convert to urobilinogen'
    }
  }
];

