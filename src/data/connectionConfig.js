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

