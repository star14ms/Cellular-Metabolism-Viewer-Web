/**
 * Centralized Pathway Data Index
 * 
 * This file imports all pathway data and configuration.
 * When adding a new pathway, update this file instead of MetabolismViewer.js
 */

// Import all pathway data
import { glycolysisNodes, glycolysisReactions, glycolysisArrows, glycolysisData } from './glycolysis/glycolysis_index.js';
import { pyruvateOxidationNodes, pyruvateOxidationReactions, pyruvateOxidationArrows, pyruvateOxidationData } from './pyruvateOxidation/pyruvateOxidation_index.js';
import { citricAcidCycleNodes, citricAcidCycleReactions, citricAcidCycleArrows, citricAcidCycleData } from './citricAcidCycle/citricAcidCycle_index.js';
import { electronTransportChainNodes, electronTransportChainReactions, electronTransportChainArrows, electronTransportChainData } from './electronTransportChain/electronTransportChain_index.js';
import { lactateFermentationNodes, lactateFermentationReactions, lactateFermentationArrows, lactateFermentationData } from './lactateFermentation/lactateFermentation_index.js';
import { ethanolFermentationNodes, ethanolFermentationReactions, ethanolFermentationArrows, ethanolFermentationData } from './ethanolFermentation/ethanolFermentation_index.js';
import { nucleosideSalvageNodes, nucleosideSalvageReactions, nucleosideSalvageArrows, nucleosideSalvageData } from './nucleosideSalvage/nucleosideSalvage_index.js';
import { pyrimidineSynthesisNodes, pyrimidineSynthesisReactions, pyrimidineSynthesisArrows, pyrimidineSynthesisData } from './pyrimidineSynthesis/pyrimidineSynthesis_index.js';
import { purineSynthesisNodes, purineSynthesisReactions, purineSynthesisArrows, purineSynthesisData } from './purineSynthesis/purineSynthesis_index.js';
import { deoxyribonucleotidesNodes, deoxyribonucleotidesReactions, deoxyribonucleotidesArrows, deoxyribonucleotidesData } from './deoxyribonucleotides/deoxyribonucleotides_index.js';
import { nucleotideBreakdownNodes, nucleotideBreakdownReactions, nucleotideBreakdownArrows, nucleotideBreakdownData } from './nucleotideBreakdown/nucleotideBreakdown_index.js';
import { aromaticAminoAcidMetabolismNodes, aromaticAminoAcidMetabolismReactions, aromaticAminoAcidMetabolismArrows, aromaticAminoAcidMetabolismData } from './aromaticAminoAcidMetabolism/aromaticAminoAcidMetabolism_index.js';

// Combine all nodes
export const allNodes = [
  ...glycolysisNodes,
  ...pyruvateOxidationNodes,
  ...citricAcidCycleNodes,
  ...electronTransportChainNodes,
  ...lactateFermentationNodes,
  ...ethanolFermentationNodes,
  ...nucleosideSalvageNodes,
  ...pyrimidineSynthesisNodes,
  ...purineSynthesisNodes,
  ...deoxyribonucleotidesNodes,
  ...nucleotideBreakdownNodes,
  ...aromaticAminoAcidMetabolismNodes
];

// Combine all reactions
export const allReactions = [
  ...glycolysisReactions,
  ...pyruvateOxidationReactions,
  ...citricAcidCycleReactions,
  ...electronTransportChainReactions,
  ...lactateFermentationReactions,
  ...ethanolFermentationReactions,
  ...nucleosideSalvageReactions,
  ...pyrimidineSynthesisReactions,
  ...purineSynthesisReactions,
  ...deoxyribonucleotidesReactions,
  ...nucleotideBreakdownReactions,
  ...aromaticAminoAcidMetabolismReactions
];

// Combine all arrows
export const allArrows = [
  ...glycolysisArrows,
  ...pyruvateOxidationArrows,
  ...citricAcidCycleArrows,
  ...electronTransportChainArrows,
  ...lactateFermentationArrows,
  ...ethanolFermentationArrows,
  ...nucleosideSalvageArrows,
  ...pyrimidineSynthesisArrows,
  ...purineSynthesisArrows,
  ...deoxyribonucleotidesArrows,
  ...nucleotideBreakdownArrows,
  ...aromaticAminoAcidMetabolismArrows
];

// Pathway configuration - update this when adding a new pathway
export const PATHWAY_CONFIG = {
  // Pathway ID to display name mapping
  pathwayNames: {
    'glycolysis': 'Glycolysis',
    'pyruvate-oxidation': 'Pyruvate Oxidation',
    'citric-acid-cycle': 'Citric Acid Cycle (Krebs Cycle)',
    'electron-transport-chain': 'Electron Transport Chain',
    'lactate-fermentation': 'Lactate Fermentation',
    'ethanol-fermentation': 'Ethanol Fermentation',
    'nucleoside-salvage': 'Nucleoside Salvage',
    'pyrimidine-synthesis': 'Pyrimidine Synthesis',
    'purine-synthesis': 'Purine Synthesis',
    'deoxyribonucleotides': 'Deoxyribonucleotides Synthesis',
    'nucleotide-breakdown': 'Nucleotide Breakdown',
    'aromatic-amino-acid-metabolism': 'Aromatic Amino Acid Metabolism'
  },
  
  // Pathway-specific behavior for by-molecule arrows
  pathwayBehavior: {
    'glycolysis': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (negative)
      useStandardShape: true
    },
    'pyruvate-oxidation': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: 1, // Below (after 180 flip)
      useStandardShape: false
    },
    'citric-acid-cycle': {
      rotationAngle: 0, // No base rotation (handled dynamically)
      offsetDirection: 1, // Below/outward (after 180 flip)
      useStandardShape: false,
      calculateOutwardDirection: true // Special handling for cycle
    },
    'electron-transport-chain': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'lactate-fermentation': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'ethanol-fermentation': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'nucleoside-salvage': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'pyrimidine-synthesis': {
      rotationAngle: Math.PI * 2, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'purine-synthesis': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'deoxyribonucleotides': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'nucleotide-breakdown': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'aromatic-amino-acid-metabolism': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    }
  }
};

// Pathway definitions array - automatically generated from imported data
// This array defines the order and structure of pathways
const pathwayDefinitions = [
  {
    id: 'glycolysis',
    name: 'Glycolysis',
    nodes: glycolysisNodes,
    reactions: glycolysisReactions,
    arrows: glycolysisArrows,
    data: glycolysisData
  },
  {
    id: 'pyruvate-oxidation',
    name: 'Pyruvate Oxidation',
    nodes: pyruvateOxidationNodes,
    reactions: pyruvateOxidationReactions,
    arrows: pyruvateOxidationArrows,
    data: pyruvateOxidationData
  },
  {
    id: 'citric-acid-cycle',
    name: 'Citric Acid Cycle',
    nodes: citricAcidCycleNodes,
    reactions: citricAcidCycleReactions,
    arrows: citricAcidCycleArrows,
    data: citricAcidCycleData
  },
  {
    id: 'electron-transport-chain',
    name: 'Electron Transport Chain',
    nodes: electronTransportChainNodes,
    reactions: electronTransportChainReactions,
    arrows: electronTransportChainArrows,
    data: electronTransportChainData
  },
  {
    id: 'lactate-fermentation',
    name: 'Lactate Fermentation',
    nodes: lactateFermentationNodes,
    reactions: lactateFermentationReactions,
    arrows: lactateFermentationArrows,
    data: lactateFermentationData
  },
  {
    id: 'ethanol-fermentation',
    name: 'Ethanol Fermentation',
    nodes: ethanolFermentationNodes,
    reactions: ethanolFermentationReactions,
    arrows: ethanolFermentationArrows,
    data: ethanolFermentationData
  },
  {
    id: 'nucleoside-salvage',
    name: 'Nucleoside Salvage',
    nodes: nucleosideSalvageNodes,
    reactions: nucleosideSalvageReactions,
    arrows: nucleosideSalvageArrows,
    data: nucleosideSalvageData
  },
  {
    id: 'pyrimidine-synthesis',
    name: 'Pyrimidine Synthesis',
    nodes: pyrimidineSynthesisNodes,
    reactions: pyrimidineSynthesisReactions,
    arrows: pyrimidineSynthesisArrows,
    data: pyrimidineSynthesisData
  },
  {
    id: 'purine-synthesis',
    name: 'Purine Synthesis',
    nodes: purineSynthesisNodes,
    reactions: purineSynthesisReactions,
    arrows: purineSynthesisArrows,
    data: purineSynthesisData
  },
  {
    id: 'deoxyribonucleotides',
    name: 'Deoxyribonucleotides Synthesis',
    nodes: deoxyribonucleotidesNodes,
    reactions: deoxyribonucleotidesReactions,
    arrows: deoxyribonucleotidesArrows,
    data: deoxyribonucleotidesData
  },
  {
    id: 'nucleotide-breakdown',
    name: 'Nucleotide Breakdown',
    nodes: nucleotideBreakdownNodes,
    reactions: nucleotideBreakdownReactions,
    arrows: nucleotideBreakdownArrows,
    data: nucleotideBreakdownData
  },
  {
    id: 'aromatic-amino-acid-metabolism',
    name: 'Aromatic Amino Acid Metabolism',
    nodes: aromaticAminoAcidMetabolismNodes,
    reactions: aromaticAminoAcidMetabolismReactions,
    arrows: aromaticAminoAcidMetabolismArrows,
    data: aromaticAminoAcidMetabolismData
  }
];

// Generate pathways array with startIndex and endIndex
// This is used by MetabolismViewer to organize pathways
export function generatePathwaysArray() {
  let currentIndex = 0;
  return pathwayDefinitions.map(pathway => {
    const reactionCount = pathway.reactions.length;
    const startIndex = currentIndex;
    const endIndex = currentIndex + reactionCount;
    currentIndex = endIndex;
    
    return {
      id: pathway.id,
      name: pathway.name,
      reactions: pathway.reactions,
      nodes: pathway.nodes,
      summary: pathway.data.summary,
      startIndex,
      endIndex
    };
  });
}

export { pathwayDefinitions };

