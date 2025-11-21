/**
 * Steroid Hormone Synthesis Pathway - Reactions Data
 */

export const steroidHormoneSynthesisReactions = [
  // Column 1: Zona Glomerulosa (Mineralocorticoid Synthesis) - Vertical reactions
  // Step 1: Cholesterol → Pregnenolone
  {
    id: 'rxn_st_1',
    name: 'Cholesterol Desmolase',
    enzyme: {
      name: 'Cholesterol desmolase (CYP11A1)',
      ecNumber: 'EC 1.14.15.6',
      cofactors: ['NADPH', 'O₂', 'Cytochrome P450'],
      description: 'Cleaves the side chain of cholesterol to form pregnenolone, the first committed step in steroid hormone synthesis.'
    },
    conditions: {
      location: 'Mitochondria (adrenal cortex, gonads)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Rate-limiting step for all steroid hormone synthesis; regulated by ACTH',
      isReversible: false
    }
  },
  // Step 2: Pregnenolone → Progesterone
  {
    id: 'rxn_st_2',
    name: '3β-Hydroxysteroid Dehydrogenase',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: '3β-Hydroxysteroid dehydrogenase/Δ⁵-Δ⁴ isomerase (3β-HSD)',
      ecNumber: 'EC 1.1.1.145',
      cofactors: ['NAD⁺'],
      description: 'Converts pregnenolone to progesterone by oxidizing the 3β-hydroxyl group and isomerizing the double bond.'
    },
    conditions: {
      location: 'Endoplasmic reticulum (adrenal cortex, gonads)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Required for both mineralocorticoid and glucocorticoid synthesis',
      isReversible: false
    }
  },
  // Step 3: Progesterone → 11-deoxycorticosterone
  {
    id: 'rxn_st_3',
    name: '21-Hydroxylase',
    enzyme: {
      name: '21-Hydroxylase (CYP21A2)',
      ecNumber: 'EC 1.14.14.16',
      cofactors: ['NADPH', 'O₂', 'Cytochrome P450'],
      description: 'Hydroxylates progesterone at C21 to form 11-deoxycorticosterone. Not expressed in gonads.'
    },
    conditions: {
      location: 'Endoplasmic reticulum (adrenal cortex, not in gonad)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Deficiency causes congenital adrenal hyperplasia',
      isReversible: false
    }
  },
  // Step 4: 11-deoxycorticosterone → Corticosterone
  {
    id: 'rxn_st_4',
    name: '11β-Hydroxylase',
    enzyme: {
      name: '11β-Hydroxylase (CYP11B1)',
      ecNumber: 'EC 1.14.15.4',
      cofactors: ['NADPH', 'O₂', 'Cytochrome P450'],
      description: 'Hydroxylates 11-deoxycorticosterone at C11 to form corticosterone.'
    },
    conditions: {
      location: 'Mitochondria (adrenal cortex)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Required for glucocorticoid and mineralocorticoid synthesis',
      isReversible: false
    }
  },
  // Step 5: Corticosterone → Aldosterone
  {
    id: 'rxn_st_5',
    name: 'Aldosterone Synthase',
    enzyme: {
      name: 'Aldosterone synthase (CYP11B2)',
      ecNumber: 'EC 1.14.15.5',
      cofactors: ['NADPH', 'O₂', 'Cytochrome P450'],
      description: 'Converts corticosterone to aldosterone via 18-hydroxylation and 18-oxidation. Only expressed in zona glomerulosa.'
    },
    conditions: {
      location: 'Mitochondria (zona glomerulosa of adrenal cortex)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Regulated by angiotensin II, potassium, and ACTH',
      isReversible: false
    }
  },

  // Column 1→2: Horizontal reactions
  // Step 6: Pregnenolone → 17-hydroxypregnenolone
  {
    id: 'rxn_st_6',
    name: '17α-Hydroxylase',
    enzyme: {
      name: '17α-Hydroxylase/17,20-lyase (CYP17A1)',
      ecNumber: 'EC 1.14.14.19',
      cofactors: ['NADPH', 'O₂', 'Cytochrome P450'],
      description: 'Hydroxylates pregnenolone at C17 to form 17-hydroxypregnenolone. First step in glucocorticoid and androgen synthesis.'
    },
    conditions: {
      location: 'Endoplasmic reticulum (zona fasciculata, zona reticularis, gonads)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Required for glucocorticoid and androgen synthesis; not expressed in zona glomerulosa',
      isReversible: false
    }
  },
  // Step 7: Progesterone → 17-hydroxyprogesterone
  {
    id: 'rxn_st_7',
    name: '17α-Hydroxylase',
    enzyme: {
      name: '17α-Hydroxylase/17,20-lyase (CYP17A1)',
      ecNumber: 'EC 1.14.14.19',
      cofactors: ['NADPH', 'O₂', 'Cytochrome P450'],
      description: 'Hydroxylates progesterone at C17 to form 17-hydroxyprogesterone.'
    },
    conditions: {
      location: 'Endoplasmic reticulum (zona fasciculata, zona reticularis, gonads)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Alternative pathway to 17-hydroxypregnenolone for glucocorticoid synthesis',
      isReversible: false
    }
  },

  // Column 2: Zona Fasciculata/Reticularis (Glucocorticoid Synthesis) - Vertical reactions
  // Step 8: 17-hydroxypregnenolone → 17-hydroxyprogesterone
  {
    id: 'rxn_st_8',
    name: '3β-Hydroxysteroid Dehydrogenase',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: '3β-Hydroxysteroid dehydrogenase/Δ⁵-Δ⁴ isomerase (3β-HSD)',
      ecNumber: 'EC 1.1.1.145',
      cofactors: ['NAD⁺'],
      description: 'Converts 17-hydroxypregnenolone to 17-hydroxyprogesterone by oxidizing the 3β-hydroxyl group and isomerizing the double bond.'
    },
    conditions: {
      location: 'Endoplasmic reticulum (adrenal cortex, gonads)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Required for glucocorticoid synthesis',
      isReversible: false
    }
  },
  // Step 9: 17-hydroxyprogesterone → 11-deoxycortisol
  {
    id: 'rxn_st_9',
    name: '21-Hydroxylase',
    enzyme: {
      name: '21-Hydroxylase (CYP21A2)',
      ecNumber: 'EC 1.14.14.16',
      cofactors: ['NADPH', 'O₂', 'Cytochrome P450'],
      description: 'Hydroxylates 17-hydroxyprogesterone at C21 to form 11-deoxycortisol. Not expressed in gonads.'
    },
    conditions: {
      location: 'Endoplasmic reticulum (adrenal cortex, not in gonad)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Deficiency causes congenital adrenal hyperplasia',
      isReversible: false
    }
  },
  // Step 10: 11-deoxycortisol → Cortisol
  {
    id: 'rxn_st_10',
    name: '11β-Hydroxylase',
    enzyme: {
      name: '11β-Hydroxylase (CYP11B1)',
      ecNumber: 'EC 1.14.15.4',
      cofactors: ['NADPH', 'O₂', 'Cytochrome P450'],
      description: 'Hydroxylates 11-deoxycortisol at C11 to form cortisol, the primary glucocorticoid.'
    },
    conditions: {
      location: 'Mitochondria (zona fasciculata of adrenal cortex)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Regulated by ACTH; deficiency causes congenital adrenal hyperplasia',
      isReversible: false
    }
  },
  // Step 11: Cortisol → Cortisone (part of Column 2 verticals, but Cortisone positioned in Column 4)
  {
    id: 'rxn_st_11',
    name: '11β-Hydroxysteroid Dehydrogenase 2',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: '11β-Hydroxysteroid dehydrogenase 2 (11β-HSD2)',
      ecNumber: 'EC 1.1.1.146',
      cofactors: ['NAD⁺'],
      description: 'Converts cortisol to cortisone in peripheral tissues (kidney, colon). Protects mineralocorticoid receptor from cortisol.'
    },
    conditions: {
      location: 'Peripheral tissues (kidney, colon, placenta)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Protects mineralocorticoid receptor from cortisol; deficiency causes apparent mineralocorticoid excess',
      isReversible: false
    }
  },

  // Column 2: Horizontal reactions (bidirectional)
  // Step 12: Cortisone → Cortisol (immediately after step 11)
  {
    id: 'rxn_st_12',
    name: '11β-Hydroxysteroid Dehydrogenase 1',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: '11β-Hydroxysteroid dehydrogenase 1 (11β-HSD1)',
      ecNumber: 'EC 1.1.1.146',
      cofactors: ['NADPH'],
      description: 'Converts cortisone back to cortisol in peripheral tissues (liver, adipose tissue). Regenerates active cortisol.'
    },
    conditions: {
      location: 'Peripheral tissues (liver, adipose tissue, brain)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Regenerates active cortisol from cortisone; bidirectional with 11β-HSD2',
      isReversible: true
    }
  },

  // Column 2→3: Horizontal reactions
  // Step 13: 17-hydroxypregnenolone → DHEA
  {
    id: 'rxn_st_13',
    name: '17,20-Lyase',
    enzyme: {
      name: '17α-Hydroxylase/17,20-lyase (CYP17A1)',
      ecNumber: 'EC 1.14.14.19',
      cofactors: ['NADPH', 'O₂', 'Cytochrome P450'],
      description: 'Cleaves the C17-C20 bond of 17-hydroxypregnenolone to form DHEA. First step in androgen synthesis.'
    },
    conditions: {
      location: 'Endoplasmic reticulum (zona reticularis, gonads)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Regulated by ACTH and androgens; not expressed in zona glomerulosa or zona fasciculata',
      isReversible: false
    }
  },
  // Step 14: 17-hydroxyprogesterone → Androstenedione
  {
    id: 'rxn_st_14',
    name: '17,20-Lyase',
    enzyme: {
      name: '17α-Hydroxylase/17,20-lyase (CYP17A1)',
      ecNumber: 'EC 1.14.14.19',
      cofactors: ['NADPH', 'O₂', 'Cytochrome P450'],
      description: 'Cleaves the C17-C20 bond of 17-hydroxyprogesterone to form androstenedione.'
    },
    conditions: {
      location: 'Endoplasmic reticulum (zona reticularis, gonads)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Alternative pathway to DHEA for androgen synthesis',
      isReversible: false
    }
  },

  // Column 3: Zona Fasciculata/Reticularis (Androgen Synthesis) - Vertical reactions
  // Step 15: DHEA → Androstenedione
  {
    id: 'rxn_st_15',
    name: '3β-Hydroxysteroid Dehydrogenase',
    byreactant: ['NAD⁺'],
    byproduct: ['NADH'],
    enzyme: {
      name: '3β-Hydroxysteroid dehydrogenase/Δ⁵-Δ⁴ isomerase (3β-HSD)',
      ecNumber: 'EC 1.1.1.145',
      cofactors: ['NAD⁺'],
      description: 'Converts DHEA to androstenedione by oxidizing the 3β-hydroxyl group and isomerizing the double bond.'
    },
    conditions: {
      location: 'Endoplasmic reticulum (adrenal cortex, gonads)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Required for androgen synthesis',
      isReversible: false
    }
  },
  // Step 16: Androstenedione → Testosterone
  {
    id: 'rxn_st_16',
    name: '17β-Hydroxysteroid Dehydrogenase',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: '17β-Hydroxysteroid dehydrogenase (17β-HSD)',
      ecNumber: 'EC 1.1.1.64',
      cofactors: ['NADPH'],
      description: 'Reduces the C17 ketone of androstenedione to form testosterone, the primary androgen.'
    },
    conditions: {
      location: 'Endoplasmic reticulum (adrenal cortex, gonads, peripheral tissues)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Multiple isoforms with different tissue expression and directionality',
      isReversible: true
    }
  },
  // Step 17: Testosterone → DHT
  {
    id: 'rxn_st_17',
    name: '5α-Reductase',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: '5α-Reductase (SRD5A1, SRD5A2)',
      ecNumber: 'EC 1.3.1.22',
      cofactors: ['NADPH'],
      description: 'Reduces the Δ⁴ double bond of testosterone to form dihydrotestosterone (DHT), a more potent androgen.'
    },
    conditions: {
      location: 'Peripheral tissues (prostate, skin, liver)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Two isoforms: SRD5A1 (liver, skin) and SRD5A2 (prostate, genitalia); deficiency causes 5α-reductase deficiency',
      isReversible: false
    }
  },

  // Column 3→4: Horizontal reactions
  // Step 18: Androstenedione → Estrone
  {
    id: 'rxn_st_18',
    name: 'Aromatase',
    enzyme: {
      name: 'Aromatase (CYP19A1)',
      ecNumber: 'EC 1.14.14.14',
      cofactors: ['NADPH', 'O₂', 'Cytochrome P450'],
      description: 'Aromatizes the A ring of androstenedione to form estrone, the first step in estrogen synthesis.'
    },
    conditions: {
      location: 'Peripheral tissues (adipose tissue, liver, brain, placenta)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Expressed in peripheral tissues; converts androgens to estrogens',
      isReversible: false
    }
  },
  // Step 19: Testosterone → Estradiol
  {
    id: 'rxn_st_19',
    name: 'Aromatase',
    enzyme: {
      name: 'Aromatase (CYP19A1)',
      ecNumber: 'EC 1.14.14.14',
      cofactors: ['NADPH', 'O₂', 'Cytochrome P450'],
      description: 'Aromatizes the A ring of testosterone to form estradiol, the primary estrogen.'
    },
    conditions: {
      location: 'Peripheral tissues (adipose tissue, liver, brain, placenta)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Direct conversion of testosterone to estradiol; important in both males and females',
      isReversible: false
    }
  },

  // Column 4: Peripheral Tissue Metabolism - Vertical reactions
  // Step 20: Estrone → Estradiol
  {
    id: 'rxn_st_20',
    name: '17β-Hydroxysteroid Dehydrogenase',
    byreactant: ['NADPH'],
    byproduct: ['NADP⁺'],
    enzyme: {
      name: '17β-Hydroxysteroid dehydrogenase (17β-HSD)',
      ecNumber: 'EC 1.1.1.64',
      cofactors: ['NADPH'],
      description: 'Reduces the C17 ketone of estrone to form estradiol, the primary estrogen.'
    },
    conditions: {
      location: 'Peripheral tissues (adipose tissue, liver, brain)',
      ph: '7.0-7.4',
      temperature: '37°C',
      regulation: 'Converts estrone to estradiol; multiple isoforms with different directionality',
      isReversible: true
    }
  }
];

