/**
 * Glycogen and Galactose Metabolism - Arrows Data
 */

export const glycogenAndGalactoseMetabolismArrows = [
  // Step 1: Glucose-6-phosphate -> Glucose-1-phosphate
  {
    id: 'arrow_glycogen_galactose_1',
    from_id: 'glucose_6_phosphate',
    to_id: 'glucose_1_phosphate',
    reaction_id: 'rxn_glycogen_galactose_1'
  },
  // Step 2: Glucose-1-phosphate -> UDP-glucose
  {
    id: 'arrow_glycogen_galactose_2',
    from_id: 'glucose_1_phosphate',
    to_id: 'udp_glucose',
    reaction_id: 'rxn_glycogen_galactose_2'
  },
  // Step 3: UDP-glucose + Glycogenin -> Primed Glycogenin
  {
    id: 'arrow_glycogen_galactose_3a',
    from_id: 'udp_glucose',
    to_id: 'primed_glycogenin',
    reaction_id: 'rxn_glycogen_galactose_3'
  },
  {
    id: 'arrow_glycogen_galactose_3b',
    from_id: 'glycogenin',
    to_id: 'primed_glycogenin',
    reaction_id: 'rxn_glycogen_galactose_3',
    flipped: true
  },
  // Step 4: Primed Glycogenin -> Glycogen (n)
  {
    id: 'arrow_glycogen_galactose_4',
    from_id: 'primed_glycogenin',
    to_id: 'glycogen_n',
    reaction_id: 'rxn_glycogen_galactose_4',
    dashed: true
  },
  // Step 5: Glycogen (n) -> Glycogen (n+1)
  {
    id: 'arrow_glycogen_galactose_5',
    from_id: 'glycogen_n',
    to_id: 'glycogen_n_plus_1',
    reaction_id: 'rxn_glycogen_galactose_5',
    flipped: true
  },
  // Step 6: Glycogen (n+1) -> Glycogen (n)
  {
    id: 'arrow_glycogen_galactose_6',
    from_id: 'glycogen_n_plus_1',
    to_id: 'glycogen_n',
    reaction_id: 'rxn_glycogen_galactose_6'
  },
  // Step 7: Glycogen (n+1) -> Glucose-1-phosphate
  {
    id: 'arrow_glycogen_galactose_7',
    from_id: 'glycogen_n_plus_1',
    to_id: 'glucose_1_phosphate',
    reaction_id: 'rxn_glycogen_galactose_7',
    flipped: true
  },
  // Step 8: Glycogen (n)_2 -> Glycogen (n+1)
  {
    id: 'arrow_glycogen_galactose_8',
    from_id: 'glycogen_n_2',
    reaction_id: 'rxn_glycogen_galactose_8',
    curved: true,
    flipped: true,
    x_scale: 2.5,
    byMoleculeAngle: 81
  },
  // Step 9: Glycogen (n+1) -> Glucose
  {
    id: 'arrow_glycogen_galactose_9',
    from_id: 'glycogen_n_plus_1',
    to_id: 'glucose',
    reaction_id: 'rxn_glycogen_galactose_9'
  },
  // Step 10: UDP-glucose -> UDP-glucuronate
  {
    id: 'arrow_glycogen_galactose_10',
    from_id: 'udp_glucose',
    to_id: 'udp_glucuronate',
    reaction_id: 'rxn_glycogen_galactose_10'
  },
  // Step 11: UDP-glucuronate -> Conjugated Bilirubin (main arrow)
  {
    id: 'arrow_glycogen_galactose_11_main',
    from_id: 'udp_glucuronate',
    to_id: 'conjugated_bilirubin',
    reaction_id: 'rxn_glycogen_galactose_11',
    dashed: true
  },
  // Step 11 branch: from midpoint of main arrow -> Other glucuronidation reactions
  {
    id: 'arrow_glycogen_galactose_11_branch',
    from_id: 'arrow_glycogen_galactose_11_main',
    to_id: 'other_glucuronidation_reactions',
    reaction_id: 'rxn_glycogen_galactose_11',
    dashed: true
  },
  // Step 12: UDP-glucose -> GAGs/Glycoproteins/Glycolipids
  {
    id: 'arrow_glycogen_galactose_12',
    from_id: 'udp_glucose',
    to_id: 'gags_glycoproteins_glycolipids',
    reaction_id: 'rxn_glycogen_galactose_12',
    dashed: true
  },
  // Step 13: Galactitol -> Galactose
  {
    id: 'arrow_glycogen_galactose_13',
    from_id: 'galactitol',
    to_id: 'galactose',
    reaction_id: 'rxn_glycogen_galactose_13',
    flipped: true
  },
  // Step 14: Galactose -> Galactose-1-phosphate
  {
    id: 'arrow_glycogen_galactose_14',
    from_id: 'galactose',
    to_id: 'galactose_1_phosphate',
    reaction_id: 'rxn_glycogen_galactose_14'
  },
  // Step 15: Galactose-1-phosphate -> Glucose-1-phosphate
  {
    id: 'arrow_glycogen_galactose_15',
    from_id: 'galactose_1_phosphate',
    to_id: 'glucose_1_phosphate',
    reaction_id: 'rxn_glycogen_galactose_15',
    y_scale: 1.5,
  },
  // Step 16: UDP-galactose -> UDP-glucose
  {
    id: 'arrow_glycogen_galactose_16',
    from_id: 'udp_galactose',
    to_id: 'udp_glucose',
    reaction_id: 'rxn_glycogen_galactose_16',
    flipped: true
  },
  // Step 17: UDP-galactose -> Lactose
  {
    id: 'arrow_glycogen_galactose_17',
    from_id: 'udp_galactose',
    to_id: 'lactose',
    reaction_id: 'rxn_glycogen_galactose_17'
  }
];
