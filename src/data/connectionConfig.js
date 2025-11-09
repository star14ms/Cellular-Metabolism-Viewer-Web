/**
 * Connection Configuration
 * 
 * Defines special arrow connections that require custom handling
 * beyond the automatic sequential connections.
 */

export const connectionConfig = {
  // Glycolysis special connections
  glycolysis: {
    step4Branching: {
      type: 'branching',
      fromStep: 4,
      toSteps: [
        {
          toStep: 5,
          coords: { x1: 550, y1: 130, x2: 550, y2: 220 },
          reactantId: 'fructose_1_6_bisphosphate',
          productId: 'dihydroxyacetone_phosphate',
          connectionId: 'step4-to-5'
        },
        {
          toStep: 6,
          coords: { x1: 580, y1: 100, x2: 670, y2: 100 },
          reactantId: 'fructose_1_6_bisphosphate',
          productId: 'glyceraldehyde_3_phosphate',
          connectionId: 'step4-to-6'
        }
      ]
    },
    step5ToStep6: {
      type: 'conversion',
      fromStep: 5,
      toStep: 6,
      coords: { x1: 580, y1: 250, x2: 670, y2: 100 },
      reactantId: 'dihydroxyacetone_phosphate',
      productId: 'glyceraldehyde_3_phosphate',
      connectionId: 'step5-to-6'
    }
  },
  
  // Pyruvate oxidation connections
  pyruvateOxidation: {
    glycolysisToPyruvate: {
      type: 'pathway-transition',
      fromPathway: 'glycolysis',
      fromStep: 10,
      toPathway: 'pyruvate-oxidation',
      toStep: 1,
      coords: { x1: 1330, y1: 100, x2: 1420, y2: 100 },
      reactantId: 'phosphoenolpyruvate',
      productId: 'pyruvate',
      connectionId: 'glycolysis-to-pyruvate',
      targetReactionStep: 10 // This arrow represents glycolysis step 10
    },
    step2ToStep3: {
      type: 'explicit',
      fromStep: 2,
      toStep: 3,
      coords: { x1: 1630, y1: 100, x2: 1720, y2: 100 },
      reactantId: 'hydroxyethyl-tpp',
      productId: 'acetyl-lipoamide',
      connectionId: 'step2-to-step3',
      targetReactionStep: 12 // Step 12 (Oxidation and Transfer)
    },
    step3ToAcetylCoa: {
      type: 'product-node',
      fromStep: 3,
      toNode: 'acetyl-coa',
      coords: { x1: 1780, y1: 100, x2: 1870, y2: 100 },
      reactantId: 'acetyl-lipoamide',
      productId: 'acetyl-coa',
      connectionId: 'step3-to-acetyl-coa',
      targetReactionStep: 13 // Step 13 (Acetyl-CoA Formation)
    },
    step3MidpointToStep4: {
      type: 'midpoint-connection',
      fromArrow: 'step3-to-acetyl-coa',
      toStep: 4,
      coords: { x1: 1825, y1: 1825, x2: 1825, y2: 220 }, // Calculated dynamically
      reactantId: 'acetyl-lipoamide',
      productId: 'dihydrolipoamide',
      connectionId: 'step3-acetylCoa-midpoint-to-step4',
      targetReactionStep: 13 // Byproduct of Step 13
    },
    step4ToLipoamide: {
      type: 'product-node',
      fromStep: 4,
      toNode: 'lipoamide',
      coords: { x1: 1795, y1: 250, x2: 1705, y2: 250 },
      reactantId: 'dihydrolipoamide',
      productId: 'lipoamide',
      connectionId: 'step4-to-lipoamide',
      targetReactionStep: 14 // Step 14 (Lipoamide Regeneration)
    },
    lipoamideToStep2Midpoint: {
      type: 'midpoint-connection',
      fromNode: 'lipoamide',
      toArrow: 'step2-to-step3',
      coords: { x1: 1675, y1: 220, x2: 1675, y2: 100 }, // Calculated dynamically
      reactantId: 'lipoamide',
      productId: 'acetyl-lipoamide',
      connectionId: 'lipoamide-to-step2-midpoint',
      targetReactionStep: 12 // Lipoamide is cofactor for Step 12
    }
  },
  
  // Citric acid cycle connections
  citricAcidCycle: {
    acetylCoaToStep1Midpoint: {
      type: 'midpoint-connection',
      fromNode: 'acetyl-coa',
      toArrow: 'cac-step1-to-step2',
      coords: { x1: 1930, y1: 100, x2: 0, y2: 0 }, // Calculated dynamically
      connectionId: 'acetyl-coa-to-cac-step1',
      targetReactionStep: 15 // Step 15 (Citrate Formation)
    },
    cycle: {
      type: 'cycle',
      fromStep: 8,
      toStep: 1,
      coords: { x1: 2005, y1: 425, x2: 2011, y2: 266 }, // Calculated from node positions
      connectionId: 'cac-cycle',
      targetReactionStep: 22 // Step 22 (Malate Oxidation)
    }
  },
  
  // Electron transport chain connections
  electronTransportChain: {
    // NADH from glycolysis (step 6) to ETC Complex I (step 23)
    glycolysisNadhToEtc: {
      type: 'pathway-transition',
      fromPathway: 'glycolysis',
      fromStep: 6,
      toPathway: 'electron-transport-chain',
      toStep: 1,
      coords: { x1: 100, y1: 700, x2: 193, y2: 2621 }, // From glycolysis step 6 to ETC Complex I
      reactantId: 'nadh',
      productId: 'nadh',
      connectionId: 'glycolysis-nadh-to-etc',
      targetReactionStep: 6 // Glycolysis step 6 produces NADH
    },
    // NADH from pyruvate oxidation (step 14) to ETC Complex I
    pyruvateNadhToEtc: {
      type: 'pathway-transition',
      fromPathway: 'pyruvate-oxidation',
      fromStep: 4,
      toPathway: 'electron-transport-chain',
      toStep: 1,
      coords: { x1: 250, y1: 1825, x2: 193, y2: 2621 }, // From pyruvate oxidation step 4 to ETC Complex I
      reactantId: 'nadh',
      productId: 'nadh',
      connectionId: 'pyruvate-nadh-to-etc',
      targetReactionStep: 14 // Pyruvate oxidation step 4 produces NADH
    },
    // NADH from citric acid cycle step 3 (isocitrate oxidation, step 17) to ETC Complex I
    cacNadh1ToEtc: {
      type: 'pathway-transition',
      fromPathway: 'citric-acid-cycle',
      fromStep: 3,
      toPathway: 'electron-transport-chain',
      toStep: 1,
      coords: { x1: 418, y1: 2050, x2: -57, y2: 2671 }, // From CAC step 3 to ETC Complex I
      reactantId: 'nadh',
      productId: 'nadh',
      connectionId: 'cac-nadh1-to-etc',
      targetReactionStep: 17 // CAC step 3 produces NADH
    },
    // NADH from citric acid cycle step 4 (alpha-ketoglutarate oxidation, step 18) to ETC Complex I
    cacNadh2ToEtc: {
      type: 'pathway-transition',
      fromPathway: 'citric-acid-cycle',
      fromStep: 4,
      toPathway: 'electron-transport-chain',
      toStep: 1,
      coords: { x1: 484, y1: 2209, x2: -57, y2: 2671 }, // From CAC step 4 to ETC Complex I
      reactantId: 'nadh',
      productId: 'nadh',
      connectionId: 'cac-nadh2-to-etc',
      targetReactionStep: 18 // CAC step 4 produces NADH
    },
    // NADH from citric acid cycle step 8 (malate oxidation, step 22) to ETC Complex I
    cacNadh3ToEtc: {
      type: 'pathway-transition',
      fromPathway: 'citric-acid-cycle',
      fromStep: 8,
      toPathway: 'electron-transport-chain',
      toStep: 1,
      coords: { x1: 34, y1: 2209, x2: -57, y2: 2671 }, // From CAC step 8 to ETC Complex I
      reactantId: 'nadh',
      productId: 'nadh',
      connectionId: 'cac-nadh3-to-etc',
      targetReactionStep: 22 // CAC step 8 produces NADH
    },
    // FADH2 from citric acid cycle step 6 (succinate oxidation, step 20) to ETC Complex II
    cacFadh2ToEtc: {
      type: 'pathway-transition',
      fromPathway: 'citric-acid-cycle',
      fromStep: 6,
      toPathway: 'electron-transport-chain',
      toStep: 2,
      coords: { x1: 259, y1: 2434, x2: 93, y2: 2571 }, // From CAC step 6 to ETC Complex II
      reactantId: 'fadh2',
      productId: 'fadh2',
      connectionId: 'cac-fadh2-to-etc',
      targetReactionStep: 20 // CAC step 6 produces FADH2
    },
    // Sequential flow through ETC: Complex I → CoQ
    etcComplex1ToCoQ: {
      type: 'explicit',
      fromStep: 1,
      toStep: 3,
      coords: { x1: -17, y1: 2671, x2: 223, y2: 2671 }, // Horizontal flow - ends at CoQ surface (radius 20)
      reactantId: 'ubiquinol',
      productId: 'ubiquinol',
      connectionId: 'etc-complex1-to-coq',
      targetReactionStep: 23 // ETC Complex I
    },
    // Complex II → CoQ
    etcComplex2ToCoQ: {
      type: 'explicit',
      fromStep: 2,
      toStep: 3,
      coords: { x1: 133, y1: 2571, x2: 223, y2: 2671 }, // Flow - ends at CoQ surface (radius 20)
      reactantId: 'ubiquinol',
      productId: 'ubiquinol',
      connectionId: 'etc-complex2-to-coq',
      targetReactionStep: 24 // ETC Complex II
    },
    // CoQ → Complex III
    etcCoQToComplex3: {
      type: 'explicit',
      fromStep: 3,
      toStep: 4,
      coords: { x1: 263, y1: 2671, x2: 393, y2: 2671 }, // Horizontal flow
      reactantId: 'ubiquinol',
      productId: 'ubiquinol',
      connectionId: 'etc-coq-to-complex3',
      targetReactionStep: 25 // CoQ
    },
    // Complex III → Cyt c
    etcComplex3ToCytC: {
      type: 'explicit',
      fromStep: 4,
      toStep: 5,
      coords: { x1: 433, y1: 2671, x2: 543, y2: 2671 }, // Horizontal flow
      reactantId: 'cytochrome_c_reduced',
      productId: 'cytochrome_c_reduced',
      connectionId: 'etc-complex3-to-cyt-c',
      targetReactionStep: 26 // ETC Complex III
    },
    // Cyt c → Complex IV
    etcCytCToComplex4: {
      type: 'explicit',
      fromStep: 5,
      toStep: 6,
      coords: { x1: 563, y1: 2671, x2: 693, y2: 2671 }, // Horizontal flow
      reactantId: 'cytochrome_c_reduced',
      productId: 'cytochrome_c_reduced',
      connectionId: 'etc-cyt-c-to-complex4',
      targetReactionStep: 27 // Cyt c
    },
    // Note: ATP Synthase is independent - no direct connection from Complex IV
    // It uses the H+ gradient created by Complexes I, III, and IV
  }
};

/**
 * Get connection configuration for a specific connection ID
 */
export function getConnectionConfig(connectionId) {
  // Search through all pathway configs
  for (const pathwayConfig of Object.values(connectionConfig)) {
    for (const config of Object.values(pathwayConfig)) {
      if (config.connectionId === connectionId) {
        return config;
      }
      // Also check nested configs (like step4Branching.toSteps)
      if (config.toSteps) {
        for (const stepConfig of config.toSteps) {
          if (stepConfig.connectionId === connectionId) {
            return stepConfig;
          }
        }
      }
    }
  }
  return null;
}

/**
 * Get all connection configs for a specific pathway
 */
export function getPathwayConnections(pathwayId) {
  return connectionConfig[pathwayId] || {};
}

