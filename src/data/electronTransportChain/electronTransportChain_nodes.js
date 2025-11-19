/**
 * Electron Transport Chain - Nodes Data
 * 
 * Positions are relative to the first node (complex_i) using unit_space notation.
 * unit_space = 150 (standard spacing between nodes)
 * Note: The ETC is arranged horizontally, with complex_ii slightly offset vertically.
 */

const unit_space = 150;
const base_x = 65;
const base_y = 2615; // Continuation from citric acid cycle

export const electronTransportChainNodes = [
  // Protein complexes
  {
    id: 'complex_i',
    type: 'complex',
    name: 'Complex I: NADH Dehydrogenase',
    description: 'Complex I (NADH Dehydrogenase) is the first protein complex in the electron transport chain. It transfers electrons from NADH to ubiquinone (CoQ) and pumps 4 protons across the inner mitochondrial membrane from the matrix to the intermembrane space, contributing to the proton gradient used for ATP synthesis.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/NADH_Dehydrogenase_Mechanism_%28Fixed%29.png/1000px-NADH_Dehydrogenase_Mechanism_%28Fixed%29.png',
    reaction_id: 'rxn_etc_1', // Reaction happens in this complex
    complexNumber: 'I',
    complexSize: { width: 80, height: 60 },
    byreactant: ['NADH'],
    byproduct: ['NAD⁺'],
    etcSubArrows: {
      hPlusPump: {
        type: 'proton-pump',
        from: 'H⁺ (matrix)',
        to: 'H⁺ (intermembrane space)',
        direction: 'up',
        count: 4
      }
    },
    position: { x: base_x, y: base_y }
  },
  {
    id: 'complex_ii',
    type: 'complex',
    name: 'Complex II: Succinate Dehydrogenase',
    description: 'Complex II (Succinate Dehydrogenase) is both part of the citric acid cycle and the electron transport chain. It oxidizes succinate to fumarate, transferring electrons to ubiquinone (CoQ) via FADH₂. Unlike Complex I, III, and IV, Complex II does not pump protons across the membrane.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Succinate_Dehydrogenase_1YQ3_and_Membrane.png/500px-Succinate_Dehydrogenase_1YQ3_and_Membrane.png',
    reaction_id: 'rxn_etc_2',
    complexNumber: 'II',
    complexSize: { width: 80, height: 60 },
    byreactant: ['FADH₂'],
    byproduct: ['FAD'],
    byMoleculeAngle: 25,
    hideByreactantLabels: true, // Hide byreactant labels but keep arrows
    hideByproductLabels: true, // Hide byproduct labels but keep arrows
    position: { x: base_x + unit_space * 1, y: base_y - unit_space * 0.67 }
  },
  {
    id: 'complex_iii',
    type: 'complex',
    name: 'Complex III: Cytochrome bc₁ Complex',
    description: 'Complex III (Cytochrome bc₁ Complex) transfers electrons from ubiquinol (QH₂) to cytochrome c. It uses the Q cycle mechanism to pump 4 protons across the inner mitochondrial membrane per pair of electrons transferred, contributing to the proton gradient.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Cytochrome1ntz.PNG/500px-Cytochrome1ntz.PNG',
    reaction_id: 'rxn_etc_4',
    complexNumber: 'III',
    complexSize: { width: 80, height: 60 },
    etcSubArrows: {
      hPlusPump: {
        type: 'proton-pump',
        from: 'H⁺ (matrix)',
        to: 'H⁺ (intermembrane space)',
        direction: 'up',
        count: 4
      }
    },
    position: { x: base_x + unit_space * 3, y: base_y }
  },
  {
    id: 'complex_iv',
    type: 'complex',
    name: 'Complex IV: Cytochrome c Oxidase',
    description: 'Complex IV (Cytochrome c Oxidase) is the final protein complex in the electron transport chain. It receives electrons from cytochrome c and transfers them to molecular oxygen (O₂), reducing it to water (H₂O). Complex IV pumps 2 protons across the membrane per pair of electrons, completing the electron transport process.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Cytochrome_C_Oxidase_1OCC_in_Membrane_2.png/1600px-Cytochrome_C_Oxidase_1OCC_in_Membrane_2.png?20070214103010',
    reaction_id: 'rxn_etc_6',
    complexNumber: 'IV',
    complexSize: { width: 80, height: 60 },
    byreactant: ['1/2 O₂', '2 H+'],
    byproduct: ['H₂O'],
    etcSubArrows: {
      hPlusPump: {
        type: 'proton-pump',
        from: 'H⁺ (matrix)',
        to: 'H⁺ (intermembrane space)',
        direction: 'up',
        count: 2
      }
    },
    position: { x: base_x + unit_space * 5, y: base_y }
  },
  {
    id: 'complex_v',
    type: 'complex',
    name: 'Complex V: ATP Synthase',
    description: 'Complex V (ATP Synthase) is the enzyme complex that synthesizes ATP from ADP and inorganic phosphate (Pi). It uses the proton gradient created by Complexes I, III, and IV to drive ATP synthesis. As protons flow back from the intermembrane space to the matrix through the F₀ subunit, the F₁ subunit catalyzes ATP formation. This process is called oxidative phosphorylation.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Atp_synthase.PNG',
    reaction_id: 'rxn_etc_7',
    complexNumber: 'V',
    complexSize: { width: 80, height: 60 },
    isIndependent: true, // ATP Synthase is independent, not directly connected from Complex IV
    byreactant: ['ADP', 'Pi'],
    byproduct: ['ATP'],
    etcSubArrows: {
      hPlusPump: {
        type: 'proton-flow',
        from: 'H⁺ (intermembrane space)',
        to: 'H⁺ (matrix)',
        direction: 'down',
        count: 3
      }
    },
    position: { x: base_x + unit_space * 6, y: base_y }
  },
  // Mobile carriers
  {
    id: 'coenzyme_q',
    type: 'carrier',
    name: 'Coenzyme Q (Ubiquinone/Ubiquinol)',
    formula: 'C₅₉H₉₂O₄',
    description: 'Coenzyme Q (CoQ), also known as ubiquinone, is a mobile electron carrier embedded in the inner mitochondrial membrane. It exists in oxidized (ubiquinone, Q) and reduced (ubiquinol, QH₂) forms.',
    smiles: 'CC1=C(C(=O)C(=C(C1=O)OC)OC)CC=C(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCCC(C)CCC',
    position: { x: base_x + unit_space * 2, y: base_y }
  },
  {
    id: 'cytochrome_c',
    type: 'carrier',
    name: 'Cytochrome c',
    formula: 'C₄₂H₅₆FeN₈O₆S₂',
    description: 'Cytochrome c is a small mobile electron carrier protein located in the intermembrane space of mitochondria. It exists in reduced (Fe²⁺) and oxidized (Fe³⁺) forms. Cytochrome c receives electrons from Complex III and transfers them to Complex IV, completing the electron transport chain.',
    smiles: '[Fe+2]',
    position: { x: base_x + unit_space * 4, y: base_y }
  },
];

