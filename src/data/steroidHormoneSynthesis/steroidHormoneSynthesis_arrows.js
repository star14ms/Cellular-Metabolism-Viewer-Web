/**
 * Steroid Hormone Synthesis Pathway - Arrows Data
 * 
 * Arrows represent connections between nodes
 * Each arrow has: id, from_id, to_id, reaction_id
 * 
 * Processing order:
 * 1. Column 1 verticals
 * 2. Column 1→2 horizontals
 * 3. Column 2 verticals (including Cortisol → Cortisone)
 * 4. Column 2 horizontals (Cortisone → Cortisol)
 * 5. Column 2→3 horizontals
 * 6. Column 3 verticals
 * 7. Column 3→4 horizontals
 * 8. Column 4 verticals
 */

export const steroidHormoneSynthesisArrows = [
  // Column 1: Zona Glomerulosa (Mineralocorticoid Synthesis) - Vertical reactions
  // Step 1: Cholesterol → Pregnenolone
  {
    id: 'arrow_st_1',
    from_id: 'cholesterol_chol',
    to_id: 'pregnenolone_st',
    reaction_id: 'rxn_st_1'
  },
  // Step 2: Pregnenolone → Progesterone
  {
    id: 'arrow_st_2',
    from_id: 'pregnenolone_st',
    to_id: 'progesterone_st',
    reaction_id: 'rxn_st_2'
  },
  // Step 3: Progesterone → 11-deoxycorticosterone
  {
    id: 'arrow_st_3',
    from_id: 'progesterone_st',
    to_id: '11_deoxycorticosterone_st',
    reaction_id: 'rxn_st_3'
  },
  // Step 4: 11-deoxycorticosterone → Corticosterone
  {
    id: 'arrow_st_4',
    from_id: '11_deoxycorticosterone_st',
    to_id: 'corticosterone_st',
    reaction_id: 'rxn_st_4'
  },
  // Step 5: Corticosterone → Aldosterone
  {
    id: 'arrow_st_5',
    from_id: 'corticosterone_st',
    to_id: 'aldosterone_st',
    reaction_id: 'rxn_st_5'
  },

  // Column 1→2: Horizontal reactions
  // Step 6: Pregnenolone → 17-hydroxypregnenolone
  {
    id: 'arrow_st_6',
    from_id: 'pregnenolone_st',
    to_id: '17_hydroxypregnenolone_st',
    reaction_id: 'rxn_st_6'
  },
  // Step 7: Progesterone → 17-hydroxyprogesterone
  {
    id: 'arrow_st_7',
    from_id: 'progesterone_st',
    to_id: '17_hydroxyprogesterone_st',
    reaction_id: 'rxn_st_7'
  },

  // Column 2: Zona Fasciculata/Reticularis (Glucocorticoid Synthesis) - Vertical reactions
  // Step 8: 17-hydroxypregnenolone → 17-hydroxyprogesterone
  {
    id: 'arrow_st_8',
    from_id: '17_hydroxypregnenolone_st',
    to_id: '17_hydroxyprogesterone_st',
    reaction_id: 'rxn_st_8'
  },
  // Step 9: 17-hydroxyprogesterone → 11-deoxycortisol
  {
    id: 'arrow_st_9',
    from_id: '17_hydroxyprogesterone_st',
    to_id: '11_deoxycortisol_st',
    reaction_id: 'rxn_st_9'
  },
  // Step 10: 11-deoxycortisol → Cortisol
  {
    id: 'arrow_st_10',
    from_id: '11_deoxycortisol_st',
    to_id: 'cortisol_st',
    reaction_id: 'rxn_st_10'
  },
  // Step 11: Cortisol → Cortisone (part of Column 2 verticals, but Cortisone positioned in Column 4)
  {
    id: 'arrow_st_11',
    from_id: 'cortisol_st',
    to_id: 'cortisone_st',
    reaction_id: 'rxn_st_11',
    flipped: true
  },

  // Column 2: Horizontal reactions (bidirectional)
  // Step 12: Cortisone → Cortisol (immediately after step 11)
  {
    id: 'arrow_st_12',
    from_id: 'cortisone_st',
    to_id: 'cortisol_st',
    reaction_id: 'rxn_st_12',
    flipped: true
  },

  // Column 2→3: Horizontal reactions
  // Step 13: 17-hydroxypregnenolone → DHEA
  {
    id: 'arrow_st_13',
    from_id: '17_hydroxypregnenolone_st',
    to_id: 'dhea_st',
    reaction_id: 'rxn_st_13'
  },
  // Step 14: 17-hydroxyprogesterone → Androstenedione
  {
    id: 'arrow_st_14',
    from_id: '17_hydroxyprogesterone_st',
    to_id: 'androstenedione_st',
    reaction_id: 'rxn_st_14'
  },

  // Column 3: Zona Fasciculata/Reticularis (Androgen Synthesis) - Vertical reactions
  // Step 15: DHEA → Androstenedione
  {
    id: 'arrow_st_15',
    from_id: 'dhea_st',
    to_id: 'androstenedione_st',
    reaction_id: 'rxn_st_15'
  },
  // Step 16: Androstenedione → Testosterone
  {
    id: 'arrow_st_16',
    from_id: 'androstenedione_st',
    to_id: 'testosterone_st',
    reaction_id: 'rxn_st_16'
  },
  // Step 17: Testosterone → DHT
  {
    id: 'arrow_st_17',
    from_id: 'testosterone_st',
    to_id: 'dht_st',
    reaction_id: 'rxn_st_17'
  },

  // Column 3→4: Horizontal reactions
  // Step 18: Androstenedione → Estrone
  {
    id: 'arrow_st_18',
    from_id: 'androstenedione_st',
    to_id: 'estrone_st',
    reaction_id: 'rxn_st_18'
  },
  // Step 19: Testosterone → Estradiol
  {
    id: 'arrow_st_19',
    from_id: 'testosterone_st',
    to_id: 'estradiol_st',
    reaction_id: 'rxn_st_19'
  },

  // Column 4: Peripheral Tissue Metabolism - Vertical reactions
  // Step 20: Estrone → Estradiol
  {
    id: 'arrow_st_20',
    from_id: 'estrone_st',
    to_id: 'estradiol_st',
    reaction_id: 'rxn_st_20'
  }
];

