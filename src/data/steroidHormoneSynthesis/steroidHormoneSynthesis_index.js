/**
 * Steroid Hormone Synthesis Pathway - Data Index
 */

import { steroidHormoneSynthesisNodes } from './steroidHormoneSynthesis_nodes.js';
import { steroidHormoneSynthesisReactions } from './steroidHormoneSynthesis_reactions.js';
import { steroidHormoneSynthesisArrows } from './steroidHormoneSynthesis_arrows.js';

export const steroidHormoneSynthesisData = {
  nodes: steroidHormoneSynthesisNodes,
  reactions: steroidHormoneSynthesisReactions,
  arrows: steroidHormoneSynthesisArrows,
  summary: {
    name: 'Steroid Hormone Synthesis',
    pathwayType: 'lipids',
    description: 'Multi-step pathway converting cholesterol into steroid hormones including mineralocorticoids (aldosterone), glucocorticoids (cortisol), androgens (testosterone, DHT), and estrogens (estradiol). The pathway occurs in different zones of the adrenal cortex and peripheral tissues.',
    location: 'Adrenal cortex (zona glomerulosa, zona fasciculata, zona reticularis) and peripheral tissues',
    netProducts: {
      'Aldosterone': { produced: 1, consumed: 0, net: 1 },
      'Cortisol': { produced: 1, consumed: 0, net: 1 },
      'Testosterone': { produced: 1, consumed: 0, net: 1 },
      'Estradiol': { produced: 1, consumed: 0, net: 1 },
      'Cholesterol': { produced: 0, consumed: 1, net: -1 },
      'NADPH': { produced: 0, consumed: 8, net: -8 },
      'NAD⁺': { produced: 0, consumed: 3, net: -3 }
    },
    keyRegulatorySteps: [
      { id: 'cholesterol_st', text: 'Cholesterol desmolase (CYP11A1) is the rate-limiting step for all steroid hormone synthesis, regulated by ACTH.' },
      { id: 'cortisol_st', text: 'Cortisol synthesis is regulated by ACTH and occurs primarily in the zona fasciculata. Cortisol and cortisone are interconverted in peripheral tissues.' },
      { id: 'aldosterone_st', text: 'Aldosterone synthesis occurs only in the zona glomerulosa and is regulated by angiotensin II, potassium, and ACTH.' },
      { id: 'testosterone_st', text: 'Testosterone is the primary androgen, synthesized in the zona reticularis and gonads, and can be converted to DHT or estradiol in peripheral tissues.' }
    ]
  },
  subPathways: [
    {
      id: 'mineralocorticoid-synthesis',
      name: 'Mineralocorticoid Synthesis (Zona Glomerulosa)',
      description: 'Synthesis of aldosterone from cholesterol in the zona glomerulosa of the adrenal cortex. Pathway: Cholesterol → Pregnenolone → Progesterone → 11-deoxycorticosterone → Corticosterone → Aldosterone.',
      reactionIndices: [0, 1, 2, 3, 4], // Steps 1-5
      nodeIds: ['cholesterol_st', 'pregnenolone_st', 'progesterone_st', '11_deoxycorticosterone_st', 'corticosterone_st', 'aldosterone_st']
    },
    {
      id: 'glucocorticoid-synthesis',
      name: 'Glucocorticoid Synthesis (Zona Fasciculata)',
      description: 'Synthesis of cortisol from pregnenolone or progesterone in the zona fasciculata. Pathway: Pregnenolone/Progesterone → 17-hydroxypregnenolone/17-hydroxyprogesterone → 11-deoxycortisol → Cortisol → Cortisone (bidirectional).',
      reactionIndices: [5, 6, 7, 8, 9, 10, 11], // Steps 6-12 (including bidirectional cortisone)
      nodeIds: ['pregnenolone_st', 'progesterone_st', '17_hydroxypregnenolone_st', '17_hydroxyprogesterone_st', '11_deoxycortisol_st', 'cortisol_st', 'cortisone_st']
    },
    {
      id: 'androgen-synthesis',
      name: 'Androgen Synthesis (Zona Reticularis)',
      description: 'Synthesis of androgens from 17-hydroxypregnenolone or 17-hydroxyprogesterone in the zona reticularis. Pathway: 17-hydroxypregnenolone → DHEA → Androstenedione → Testosterone → DHT.',
      reactionIndices: [12, 13, 14, 15, 16, 17], // Steps 13-17
      nodeIds: ['17_hydroxypregnenolone_st', '17_hydroxyprogesterone_st', 'dhea_st', 'androstenedione_st', 'testosterone_st', 'dht_st']
    },
    {
      id: 'peripheral-metabolism',
      name: 'Peripheral Tissue Metabolism',
      description: 'Metabolism of androgens and glucocorticoids in peripheral tissues. Includes aromatization of androgens to estrogens (Androstenedione → Estrone, Testosterone → Estradiol), conversion of Estrone → Estradiol, and interconversion of Cortisol ↔ Cortisone.',
      reactionIndices: [17, 18, 19], // Steps 12 (cortisone→cortisol), 18-20
      nodeIds: ['androstenedione_st', 'testosterone_st', 'estrone_st', 'estradiol_st']
    }
  ]
};

export {
  steroidHormoneSynthesisNodes,
  steroidHormoneSynthesisReactions,
  steroidHormoneSynthesisArrows
};

