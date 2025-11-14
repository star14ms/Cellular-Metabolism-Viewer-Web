/**
 * Glycolysis Pathway - Arrows Data
 */

export const glycolysisArrows = [
  // Main pathway arrows
  {
    id: 'arrow_glycolysis_1',
    from_id: 'glucose',
    to_id: 'glucose_6_phosphate',
    reaction_id: 'rxn_glycolysis_1'
  },
  {
    id: 'arrow_glycolysis_2',
    from_id: 'glucose_6_phosphate',
    to_id: 'fructose_6_phosphate',
    reaction_id: 'rxn_glycolysis_2'
  },
  {
    id: 'arrow_glycolysis_3',
    from_id: 'fructose_6_phosphate',
    to_id: 'fructose_1_6_bisphosphate',
    reaction_id: 'rxn_glycolysis_3'
  },
  {
    id: 'arrow_glycolysis_4',
    from_id: 'fructose_1_6_bisphosphate',
    to_id: 'glyceraldehyde_3_phosphate',
    reaction_id: 'rxn_glycolysis_4'
  },
  {
    id: 'arrow_glycolysis_4b',
    from_id: 'fructose_1_6_bisphosphate',
    to_id: 'dihydroxyacetone_phosphate',
    reaction_id: 'rxn_glycolysis_4'
  },
  {
    id: 'arrow_glycolysis_5',
    from_id: 'dihydroxyacetone_phosphate',
    to_id: 'glyceraldehyde_3_phosphate',
    reaction_id: 'rxn_glycolysis_5'
  },
  {
    id: 'arrow_glycolysis_6',
    from_id: 'glyceraldehyde_3_phosphate',
    to_id: '1_3_bisphosphoglycerate',
    reaction_id: 'rxn_glycolysis_6'
  },
  {
    id: 'arrow_glycolysis_7',
    from_id: '1_3_bisphosphoglycerate',
    to_id: '3_phosphoglycerate',
    reaction_id: 'rxn_glycolysis_7'
  },
  {
    id: 'arrow_glycolysis_8',
    from_id: '3_phosphoglycerate',
    to_id: '2_phosphoglycerate',
    reaction_id: 'rxn_glycolysis_8'
  },
  {
    id: 'arrow_glycolysis_9',
    from_id: '2_phosphoglycerate',
    to_id: 'phosphoenolpyruvate',
    reaction_id: 'rxn_glycolysis_9'
  },
  {
    id: 'arrow_glycolysis_10',
    from_id: 'phosphoenolpyruvate',
    to_id: 'pyruvate',
    reaction_id: 'rxn_glycolysis_10'
  }
];

