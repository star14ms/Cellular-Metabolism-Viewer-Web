/**
 * Glycolysis Pathway Data
 * 
 * This file contains structured data about the glycolysis pathway,
 * including molecules, enzymes, reaction conditions, and byproducts.
 */

export const glycolysisReactions = [
  {
    step: 1,
    name: "Glucose Phosphorylation",
    substrate: {
      id: "glucose",
      name: "D-Glucose",
      formula: "C₆H₁₂O₆",
      smiles: "C([C@@H]1[C@H]([C@@H]([C@H](C(O1)O)O)O)O)O",
      structure: "linear", // Simplified representation
      description: "A hexose sugar that serves as the primary energy source"
    },
    enzyme: {
      name: "Hexokinase",
      ecNumber: "EC 2.7.1.1",
      cofactors: ["Mg²⁺"],
      description: "Catalyzes the phosphorylation of glucose to glucose-6-phosphate"
    },
    product: {
      id: "glucose_6_phosphate",
      name: "Glucose-6-phosphate",
      formula: "C₆H₁₁O₉P",
      smiles: "C([C@@H]1[C@H]([C@@H]([C@H](C(O1)OP(=O)(O)O)O)O)O)O",
      structure: "linear"
    },
    coSubstrate: {
      name: "ATP",
      consumed: true,
      formula: "C₁₀H₁₆N₅O₁₃P₃"
    },
    byreactant: "ATP", // For display on map
    byproduct: {
      name: "ADP",
      formula: "C₁₀H₁₅N₅O₁₀P₂"
    },
    conditions: {
      location: "Cytoplasm",
      ph: "7.0-7.4",
      temperature: "37°C",
      regulation: "Inhibited by glucose-6-phosphate (product inhibition)",
      isReversible: false
    },
    position: { x: 100, y: 100 }
  },
  {
    step: 2,
    name: "Glucose-6-phosphate Isomerization",
    substrate: {
      id: "glucose_6_phosphate",
      name: "Glucose-6-phosphate",
      formula: "C₆H₁₁O₉P",
      smiles: "C([C@@H]1[C@H]([C@@H]([C@H](C(O1)OP(=O)(O)O)O)O)O)O",
      structure: "linear"
    },
    enzyme: {
      name: "Phosphoglucose Isomerase",
      ecNumber: "EC 5.3.1.9",
      cofactors: ["None"],
      description: "Converts glucose-6-phosphate to fructose-6-phosphate"
    },
    product: {
      id: "fructose_6_phosphate",
      name: "Fructose-6-phosphate",
      formula: "C₆H₁₁O₉P",
      smiles: "C([C@H](C([C@H](C(=O)CO)O)O)OP(=O)(O)O)O",
      structure: "linear"
    },
    conditions: {
      location: "Cytoplasm",
      ph: "7.0-7.4",
      temperature: "37°C",
      regulation: "Near equilibrium reaction",
      isReversible: true
    },
    position: { x: 250, y: 100 }
  },
  {
    step: 3,
    name: "Fructose-6-phosphate Phosphorylation",
    substrate: {
      id: "fructose_6_phosphate",
      name: "Fructose-6-phosphate",
      formula: "C₆H₁₁O₉P",
      smiles: "C([C@H](C([C@H](C(=O)CO)O)O)OP(=O)(O)O)O",
      structure: "linear"
    },
    enzyme: {
      name: "Phosphofructokinase-1 (PFK-1)",
      ecNumber: "EC 2.7.1.11",
      cofactors: ["Mg²⁺"],
      description: "Catalyzes the phosphorylation of fructose-6-phosphate to fructose-1,6-bisphosphate. This is a key regulatory step."
    },
    product: {
      id: "fructose_1_6_bisphosphate",
      name: "Fructose-1,6-bisphosphate",
      formula: "C₆H₁₄O₁₂P₂",
      smiles: "C([C@H](C([C@H](C(=O)CO)OP(=O)(O)O)O)OP(=O)(O)O)O",
      structure: "linear"
    },
    coSubstrate: {
      name: "ATP",
      consumed: true,
      formula: "C₁₀H₁₆N₅O₁₃P₃"
    },
    byreactant: "ATP", // For display on map
    byproduct: {
      name: "ADP",
      formula: "C₁₀H₁₅N₅O₁₀P₂"
    },
    conditions: {
      location: "Cytoplasm",
      ph: "7.0-7.4",
      temperature: "37°C",
      regulation: "Allosterically inhibited by ATP and citrate; activated by AMP and fructose-2,6-bisphosphate",
      isReversible: false
    },
    position: { x: 400, y: 100 }
  },
  {
    step: 4,
    name: "Fructose-1,6-bisphosphate Cleavage",
    substrate: {
      id: "fructose_1_6_bisphosphate",
      name: "Fructose-1,6-bisphosphate",
      formula: "C₆H₁₄O₁₂P₂",
      smiles: "C([C@H](C([C@H](C(=O)CO)OP(=O)(O)O)O)OP(=O)(O)O)O",
      structure: "linear"
    },
    enzyme: {
      name: "Aldolase",
      ecNumber: "EC 4.1.2.13",
      cofactors: ["None"],
      description: "Cleaves fructose-1,6-bisphosphate into two triose phosphates"
    },
    products: [
      {
        id: "glyceraldehyde_3_phosphate",
        name: "Glyceraldehyde-3-phosphate",
        formula: "C₃H₇O₆P",
        smiles: "C([C@H](C(=O)O)OP(=O)(O)O)O",
        structure: "linear"
      },
      {
        id: "dihydroxyacetone_phosphate",
        name: "Dihydroxyacetone phosphate",
        formula: "C₃H₇O₆P",
        smiles: "CC(=O)C(OP(=O)(O)O)O",
        structure: "linear"
      }
    ],
    conditions: {
      location: "Cytoplasm",
      ph: "7.0-7.4",
      temperature: "37°C",
      regulation: "Near equilibrium reaction",
      isReversible: true
    },
    position: { x: 550, y: 100 }
  },
  {
    step: 5,
    name: "Triose Phosphate Isomerization",
    substrate: {
      id: "dihydroxyacetone_phosphate",
      name: "Dihydroxyacetone phosphate",
      formula: "C₃H₇O₆P",
      smiles: "CC(=O)C(OP(=O)(O)O)O",
      structure: "linear"
    },
    enzyme: {
      name: "Triose Phosphate Isomerase",
      ecNumber: "EC 5.3.1.1",
      cofactors: ["None"],
      description: "Converts dihydroxyacetone phosphate to glyceraldehyde-3-phosphate"
    },
    product: {
      id: "glyceraldehyde_3_phosphate",
      name: "Glyceraldehyde-3-phosphate",
      formula: "C₃H₇O₆P",
      smiles: "C([C@H](C(=O)O)OP(=O)(O)O)O",
      structure: "linear"
    },
    conditions: {
      location: "Cytoplasm",
      ph: "7.0-7.4",
      temperature: "37°C",
      regulation: "Near equilibrium, very fast reaction",
      isReversible: true
    },
    position: { x: 550, y: 250 } // Increased distance from node 4 to match 4-6 distance (150px)
  },
  {
    step: 6,
    name: "Glyceraldehyde-3-phosphate Oxidation",
    substrate: {
      id: "glyceraldehyde_3_phosphate",
      name: "Glyceraldehyde-3-phosphate",
      formula: "C₃H₇O₆P",
      smiles: "C([C@H](C(=O)O)OP(=O)(O)O)O",
      structure: "linear"
    },
    enzyme: {
      name: "Glyceraldehyde-3-phosphate Dehydrogenase",
      ecNumber: "EC 1.2.1.12",
      cofactors: ["NAD⁺", "Pi (inorganic phosphate)"],
      description: "Oxidizes glyceraldehyde-3-phosphate and reduces NAD⁺ to NADH"
    },
    product: {
      id: "1_3_bisphosphoglycerate",
      name: "1,3-Bisphosphoglycerate",
      formula: "C₃H₈O₁₀P₂",
      smiles: "C([C@H](C(=O)OP(=O)(O)O)OP(=O)(O)O)O",
      structure: "linear"
    },
    coSubstrate: {
      name: "NAD⁺",
      consumed: true,
      reduced: true
    },
    byreactant: ["NAD⁺", "Pi"], // For display on map
    byproduct: {
      name: "NADH",
      formula: "C₂₁H₂₇N₇O₁₄P₂"
    },
    conditions: {
      location: "Cytoplasm",
      ph: "7.0-7.4",
      temperature: "37°C",
      regulation: "Requires NAD⁺ and inorganic phosphate",
      isReversible: true
    },
    position: { x: 700, y: 100 }
  },
  {
    step: 7,
    name: "1,3-Bisphosphoglycerate Dephosphorylation",
    substrate: {
      id: "1_3_bisphosphoglycerate",
      name: "1,3-Bisphosphoglycerate",
      formula: "C₃H₈O₁₀P₂",
      smiles: "C([C@H](C(=O)OP(=O)(O)O)OP(=O)(O)O)O",
      structure: "linear"
    },
    enzyme: {
      name: "Phosphoglycerate Kinase",
      ecNumber: "EC 2.7.2.3",
      cofactors: ["Mg²⁺"],
      description: "Transfers phosphate from 1,3-bisphosphoglycerate to ADP, producing ATP"
    },
    product: {
      id: "3_phosphoglycerate",
      name: "3-Phosphoglycerate",
      formula: "C₃H₇O₇P",
      smiles: "C([C@H](C(=O)O)OP(=O)(O)O)O",
      structure: "linear"
    },
    coSubstrate: {
      name: "ADP",
      consumed: true
    },
    byreactant: "ADP", // For display on map
    byproduct: {
      name: "ATP",
      formula: "C₁₀H₁₆N₅O₁₃P₃"
    },
    conditions: {
      location: "Cytoplasm",
      ph: "7.0-7.4",
      temperature: "37°C",
      regulation: "Substrate-level phosphorylation",
      isReversible: true
    },
    position: { x: 850, y: 100 }
  },
  {
    step: 8,
    name: "3-Phosphoglycerate Rearrangement",
    substrate: {
      id: "3_phosphoglycerate",
      name: "3-Phosphoglycerate",
      formula: "C₃H₇O₇P",
      smiles: "C([C@H](C(=O)O)OP(=O)(O)O)O",
      structure: "linear"
    },
    enzyme: {
      name: "Phosphoglycerate Mutase",
      ecNumber: "EC 5.4.2.11",
      cofactors: ["2,3-Bisphosphoglycerate (cofactor)"],
      description: "Converts 3-phosphoglycerate to 2-phosphoglycerate"
    },
    product: {
      id: "2_phosphoglycerate",
      name: "2-Phosphoglycerate",
      formula: "C₃H₇O₇P",
      smiles: "C([C@@H](C(=O)O)O)OP(=O)(O)O",
      structure: "linear"
    },
    conditions: {
      location: "Cytoplasm",
      ph: "7.0-7.4",
      temperature: "37°C",
      regulation: "Near equilibrium reaction",
      isReversible: true
    },
    position: { x: 1000, y: 100 }
  },
  {
    step: 9,
    name: "2-Phosphoglycerate Dehydration",
    substrate: {
      id: "2_phosphoglycerate",
      name: "2-Phosphoglycerate",
      formula: "C₃H₇O₇P",
      smiles: "C([C@@H](C(=O)O)O)OP(=O)(O)O",
      structure: "linear"
    },
    enzyme: {
      name: "Enolase",
      ecNumber: "EC 4.2.1.11",
      cofactors: ["Mg²⁺"],
      description: "Dehydrates 2-phosphoglycerate to form phosphoenolpyruvate"
    },
    product: {
      id: "phosphoenolpyruvate",
      name: "Phosphoenolpyruvate (PEP)",
      formula: "C₃H₅O₆P",
      smiles: "C(=C(OP(=O)(O)O)C(=O)O)O",
      structure: "linear"
    },
    byreactant: "", // Empty - only byproduct shown
    byproduct: {
      name: "H₂O",
      formula: "H₂O"
    },
    conditions: {
      location: "Cytoplasm",
      ph: "7.0-7.4",
      temperature: "37°C",
      regulation: "Inhibited by fluoride",
      isReversible: true
    },
    position: { x: 1150, y: 100 }
  },
  {
    step: 10,
    name: "Phosphoenolpyruvate Dephosphorylation",
    substrate: {
      id: "phosphoenolpyruvate",
      name: "Phosphoenolpyruvate",
      formula: "C₃H₅O₆P",
      smiles: "C(=C(OP(=O)(O)O)C(=O)O)O",
      structure: "linear"
    },
    enzyme: {
      name: "Pyruvate Kinase",
      ecNumber: "EC 2.7.1.40",
      cofactors: ["K⁺", "Mg²⁺"],
      description: "Transfers phosphate from PEP to ADP, producing ATP and pyruvate"
    },
    product: {
      id: "pyruvate",
      name: "Pyruvate",
      formula: "C₃H₄O₃",
      smiles: "CC(=O)C(=O)O",
      structure: "linear"
    },
    coSubstrate: {
      name: "ADP",
      consumed: true
    },
    byreactant: "ADP", // For display on map
    byproduct: {
      name: "ATP",
      formula: "C₁₀H₁₆N₅O₁₃P₃"
    },
    conditions: {
      location: "Cytoplasm",
      ph: "7.0-7.4",
      temperature: "37°C",
      regulation: "Allosterically activated by fructose-1,6-bisphosphate; inhibited by ATP and alanine",
      isReversible: false
    },
    position: { x: 1300, y: 100 }
  }
];

// Summary data for the entire pathway
export const glycolysisSummary = {
  name: "Glycolysis",
  description: "The metabolic pathway that converts glucose into pyruvate, releasing energy and producing ATP and NADH.",
  location: "Cytoplasm",
  netProducts: {
    atp: { produced: 2, consumed: 2, net: 0 },
    nadh: { produced: 2, consumed: 0, net: 2 },
    pyruvate: { produced: 2, consumed: 0, net: 2 }
  },
  keyRegulatorySteps: [
    "Step 1: Hexokinase (inhibited by glucose-6-phosphate)",
    "Step 3: Phosphofructokinase-1 (key regulatory step)",
    "Step 10: Pyruvate kinase (allosteric regulation)"
  ]
};

