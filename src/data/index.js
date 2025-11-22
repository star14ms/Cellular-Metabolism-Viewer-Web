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
import { fermentationNodes, fermentationReactions, fermentationArrows, fermentationData } from './fermentation/fermentation_index.js';
import { purineSynthesisNodes, purineSynthesisReactions, purineSynthesisArrows, purineSynthesisData } from './purineSynthesis/purineSynthesis_index.js';
import { pyrimidineSynthesisNodes, pyrimidineSynthesisReactions, pyrimidineSynthesisArrows, pyrimidineSynthesisData } from './pyrimidineSynthesis/pyrimidineSynthesis_index.js';
import { nucleotideBreakdownNodes, nucleotideBreakdownReactions, nucleotideBreakdownArrows, nucleotideBreakdownData } from './nucleotideBreakdown/nucleotideBreakdown_index.js';
import { deoxyribonucleotidesNodes, deoxyribonucleotidesReactions, deoxyribonucleotidesArrows, deoxyribonucleotidesData } from './deoxyribonucleotides/deoxyribonucleotides_index.js';
import { nucleosideSalvageNodes, nucleosideSalvageReactions, nucleosideSalvageArrows, nucleosideSalvageData } from './nucleosideSalvage/nucleosideSalvage_index.js';
import { aromaticAminoAcidMetabolismNodes, aromaticAminoAcidMetabolismReactions, aromaticAminoAcidMetabolismArrows, aromaticAminoAcidMetabolismData } from './aromaticAminoAcidMetabolism/aromaticAminoAcidMetabolism_index.js';
import { singleCarbonMetabolismNodes, singleCarbonMetabolismReactions, singleCarbonMetabolismArrows, singleCarbonMetabolismData } from './singleCarbonMetabolism/singleCarbonMetabolism_index.js';
import { ammoniumCaptureReleaseNodes, ammoniumCaptureReleaseReactions, ammoniumCaptureReleaseArrows, ammoniumCaptureReleaseData } from './ammoniumCaptureRelease/ammoniumCaptureRelease_index.js';
import { branchedChainAminoAcidBreakdownNodes, branchedChainAminoAcidBreakdownReactions, branchedChainAminoAcidBreakdownArrows, branchedChainAminoAcidBreakdownData } from './branchedChainAminoAcidBreakdown/branchedChainAminoAcidBreakdown_index.js';
import { ureaCycleNodes, ureaCycleReactions, ureaCycleArrows, ureaCycleData } from './ureaCycle/ureaCycle_index.js';
import { pentosePhosphatePathwayNodes, pentosePhosphatePathwayReactions, pentosePhosphatePathwayArrows, pentosePhosphatePathwayData } from './pentosePhosphatePathway/pentosePhosphatePathway_index.js';
import { glycogenAndGalactoseMetabolismNodes, glycogenAndGalactoseMetabolismReactions, glycogenAndGalactoseMetabolismArrows, glycogenAndGalactoseMetabolismData } from './glycogenAndGalactoseMetabolism/glycogenAndGalactoseMetabolism_index.js';
import { cholesterolSynthesisNodes, cholesterolSynthesisReactions, cholesterolSynthesisArrows, cholesterolSynthesisData } from './cholesterolSynthesis/cholesterolSynthesis_index.js';
import { steroidHormoneSynthesisNodes, steroidHormoneSynthesisReactions, steroidHormoneSynthesisArrows, steroidHormoneSynthesisData } from './steroidHormoneSynthesis/steroidHormoneSynthesis_index.js';
import { fattyAcidAndLipidSynthesisNodes, fattyAcidAndLipidSynthesisReactions, fattyAcidAndLipidSynthesisArrows, fattyAcidAndLipidSynthesisData } from './fattyAcidAndLipidSynthesis/fattyAcidAndLipidSynthesis_index.js';

// Combine all nodes
export const allNodes = [
  ...glycolysisNodes,
  ...pyruvateOxidationNodes,
  ...citricAcidCycleNodes,
  ...electronTransportChainNodes,
  ...fermentationNodes,
  ...purineSynthesisNodes,
  ...pyrimidineSynthesisNodes,
  ...nucleotideBreakdownNodes,
  ...deoxyribonucleotidesNodes,
  ...nucleosideSalvageNodes,
  ...aromaticAminoAcidMetabolismNodes,
  ...singleCarbonMetabolismNodes,
  ...ammoniumCaptureReleaseNodes,
  ...branchedChainAminoAcidBreakdownNodes,
  ...ureaCycleNodes,
  ...pentosePhosphatePathwayNodes,
  ...glycogenAndGalactoseMetabolismNodes,
  ...cholesterolSynthesisNodes,
  ...steroidHormoneSynthesisNodes,
  ...fattyAcidAndLipidSynthesisNodes
];

// Combine all reactions
export const allReactions = [
  ...glycolysisReactions,
  ...pyruvateOxidationReactions,
  ...citricAcidCycleReactions,
  ...electronTransportChainReactions,
  ...fermentationReactions,
  ...purineSynthesisReactions,
  ...pyrimidineSynthesisReactions,
  ...nucleotideBreakdownReactions,
  ...deoxyribonucleotidesReactions,
  ...nucleosideSalvageReactions,
  ...aromaticAminoAcidMetabolismReactions,
  ...singleCarbonMetabolismReactions,
  ...ammoniumCaptureReleaseReactions,
  ...branchedChainAminoAcidBreakdownReactions,
  ...ureaCycleReactions,
  ...pentosePhosphatePathwayReactions,
  ...glycogenAndGalactoseMetabolismReactions,
  ...cholesterolSynthesisReactions,
  ...steroidHormoneSynthesisReactions,
  ...fattyAcidAndLipidSynthesisReactions
];

// Combine all arrows
export const allArrows = [
  ...glycolysisArrows,
  ...pyruvateOxidationArrows,
  ...citricAcidCycleArrows,
  ...electronTransportChainArrows,
  ...fermentationArrows,
  ...purineSynthesisArrows,
  ...pyrimidineSynthesisArrows,
  ...nucleotideBreakdownArrows,
  ...deoxyribonucleotidesArrows,
  ...nucleosideSalvageArrows,
  ...aromaticAminoAcidMetabolismArrows,
  ...singleCarbonMetabolismArrows,
  ...ammoniumCaptureReleaseArrows,
  ...branchedChainAminoAcidBreakdownArrows,
  ...ureaCycleArrows,
  ...pentosePhosphatePathwayArrows,
  ...glycogenAndGalactoseMetabolismArrows,
  ...cholesterolSynthesisArrows,
  ...steroidHormoneSynthesisArrows,
  ...fattyAcidAndLipidSynthesisArrows
];

// Pathway configuration - update this when adding a new pathway
export const PATHWAY_CONFIG = {
  // Pathway ID to display name mapping
  pathwayNames: {
    'glycolysis': 'Glycolysis and Gluconeogenesis',
    'pyruvate-oxidation': 'Pyruvate Oxidation',
    'citric-acid-cycle': 'Citric Acid Cycle (Krebs Cycle)',
    'electron-transport-chain': 'Electron Transport Chain',
    'fermentation': 'Fermentation',
    
    'purine-synthesis': 'Purine Synthesis',
    'pyrimidine-synthesis': 'Pyrimidine Synthesis',
    'nucleotide-breakdown': 'Nucleotide Breakdown',
    'deoxyribonucleotides': 'Deoxyribonucleotides Synthesis',
    'nucleoside-salvage': 'Nucleoside Salvage',
    
    'aromatic-amino-acid-metabolism': 'Aromatic Amino Acid Metabolism',
    'single-carbon-metabolism': 'Single-Carbon Metabolism and Sulfur-Containing Amino Acids',
    'ammonium-capture-release': 'Ammonium Capture and Release',
    'branched-chain-amino-acid-breakdown': 'Branched Chain Amino Acid Breakdown',
    'urea-cycle': 'Urea Cycle',
    'pentose-phosphate-pathway': 'Pentose Phosphate Pathway',
    'glycogen-and-galactose-metabolism': 'Glycogen and Galactose Metabolism',
    'cholesterol-synthesis': 'Cholesterol Synthesis',
    'steroid-hormone-synthesis': 'Steroid Hormone Synthesis',
    'fatty-acid-and-lipid-synthesis': 'Fatty Acid and Lipid Synthesis'
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
      offsetDirection: 1, // Below/outward (after 180 flip) //// TODO: it doesn't work
      useStandardShape: false,
      calculateOutwardDirection: true // Special handling for cycle
    },
    'electron-transport-chain': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'fermentation': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'purine-synthesis': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'pyrimidine-synthesis': {
      rotationAngle: Math.PI * 2, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'nucleotide-breakdown': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'deoxyribonucleotides': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'nucleoside-salvage': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'aromatic-amino-acid-metabolism': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'single-carbon-metabolism': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'ammonium-capture-release': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'branched-chain-amino-acid-breakdown': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'urea-cycle': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'pentose-phosphate-pathway': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'glycogen-and-galactose-metabolism': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'cholesterol-synthesis': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'steroid-hormone-synthesis': {
      rotationAngle: Math.PI, // 180 degrees
      offsetDirection: -1, // Above (like glycolysis)
      useStandardShape: true
    },
    'fatty-acid-and-lipid-synthesis': {
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
    name: 'Glycolysis and Gluconeogenesis',
    nodes: glycolysisNodes,
    reactions: glycolysisReactions,
    arrows: glycolysisArrows,
    data: glycolysisData,
    subPathways: glycolysisData.subPathways // Include sub-pathways
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
    id: 'fermentation',
    name: 'Fermentation',
    nodes: fermentationNodes,
    reactions: fermentationReactions,
    arrows: fermentationArrows,
    data: fermentationData,
    subPathways: fermentationData.subPathways // Include sub-pathways
  },
  {
    id: 'purine-synthesis',
    name: 'Purine Synthesis',
    nodes: purineSynthesisNodes,
    reactions: purineSynthesisReactions,
    arrows: purineSynthesisArrows,
    data: purineSynthesisData,
    subPathways: purineSynthesisData.subPathways // Include sub-pathways
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
    id: 'nucleotide-breakdown',
    name: 'Nucleotide Breakdown',
    nodes: nucleotideBreakdownNodes,
    reactions: nucleotideBreakdownReactions,
    arrows: nucleotideBreakdownArrows,
    data: nucleotideBreakdownData,
    subPathways: nucleotideBreakdownData.subPathways // Include sub-pathways
  },
  {
    id: 'deoxyribonucleotides',
    name: 'Deoxyribonucleotides Synthesis',
    nodes: deoxyribonucleotidesNodes,
    reactions: deoxyribonucleotidesReactions,
    arrows: deoxyribonucleotidesArrows,
    data: deoxyribonucleotidesData,
    subPathways: deoxyribonucleotidesData.subPathways // Include sub-pathways
  },
  {
    id: 'nucleoside-salvage',
    name: 'Nucleoside Salvage',
    nodes: nucleosideSalvageNodes,
    reactions: nucleosideSalvageReactions,
    arrows: nucleosideSalvageArrows,
    data: nucleosideSalvageData,
    subPathways: nucleosideSalvageData.subPathways // Include sub-pathways
  },
  {
    id: 'aromatic-amino-acid-metabolism',
    name: 'Aromatic Amino Acid Metabolism',
    nodes: aromaticAminoAcidMetabolismNodes,
    reactions: aromaticAminoAcidMetabolismReactions,
    arrows: aromaticAminoAcidMetabolismArrows,
    data: aromaticAminoAcidMetabolismData,
    subPathways: aromaticAminoAcidMetabolismData.subPathways // Include sub-pathways
  },
  {
    id: 'single-carbon-metabolism',
    name: 'Single-Carbon Metabolism and Sulfur-Containing Amino Acids',
    nodes: singleCarbonMetabolismNodes,
    reactions: singleCarbonMetabolismReactions,
    arrows: singleCarbonMetabolismArrows,
    data: singleCarbonMetabolismData,
    subPathways: singleCarbonMetabolismData.subPathways // Include sub-pathways
  },
  {
    id: 'ammonium-capture-release',
    name: 'Ammonium Capture and Release',
    nodes: ammoniumCaptureReleaseNodes,
    reactions: ammoniumCaptureReleaseReactions,
    arrows: ammoniumCaptureReleaseArrows,
    data: ammoniumCaptureReleaseData,
    subPathways: ammoniumCaptureReleaseData.subPathways // Include sub-pathways
  },
  {
    id: 'branched-chain-amino-acid-breakdown',
    name: 'Branched Chain Amino Acid Breakdown',
    nodes: branchedChainAminoAcidBreakdownNodes,
    reactions: branchedChainAminoAcidBreakdownReactions,
    arrows: branchedChainAminoAcidBreakdownArrows,
    data: branchedChainAminoAcidBreakdownData,
    subPathways: branchedChainAminoAcidBreakdownData.subPathways // Include sub-pathways
  },
  {
    id: 'urea-cycle',
    name: 'Urea Cycle',
    nodes: ureaCycleNodes,
    reactions: ureaCycleReactions,
    arrows: ureaCycleArrows,
    data: ureaCycleData,
    subPathways: ureaCycleData.subPathways // Include sub-pathways
  },
  {
    id: 'pentose-phosphate-pathway',
    name: 'Pentose Phosphate Pathway',
    nodes: pentosePhosphatePathwayNodes,
    reactions: pentosePhosphatePathwayReactions,
    arrows: pentosePhosphatePathwayArrows,
    data: pentosePhosphatePathwayData
  },
  {
    id: 'glycogen-and-galactose-metabolism',
    name: 'Glycogen and Galactose Metabolism',
    nodes: glycogenAndGalactoseMetabolismNodes,
    reactions: glycogenAndGalactoseMetabolismReactions,
    arrows: glycogenAndGalactoseMetabolismArrows,
    data: glycogenAndGalactoseMetabolismData,
    subPathways: glycogenAndGalactoseMetabolismData.subPathways
  },
  {
    id: 'cholesterol-synthesis',
    name: 'Cholesterol Synthesis',
    nodes: cholesterolSynthesisNodes,
    reactions: cholesterolSynthesisReactions,
    arrows: cholesterolSynthesisArrows,
    data: cholesterolSynthesisData,
    subPathways: cholesterolSynthesisData.subPathways
  },
  {
    id: 'steroid-hormone-synthesis',
    name: 'Steroid Hormone Synthesis',
    nodes: steroidHormoneSynthesisNodes,
    reactions: steroidHormoneSynthesisReactions,
    arrows: steroidHormoneSynthesisArrows,
    data: steroidHormoneSynthesisData,
    subPathways: steroidHormoneSynthesisData.subPathways
  },
  {
    id: 'fatty-acid-and-lipid-synthesis',
    name: 'Fatty Acid and Lipid Synthesis',
    nodes: fattyAcidAndLipidSynthesisNodes,
    reactions: fattyAcidAndLipidSynthesisReactions,
    arrows: fattyAcidAndLipidSynthesisArrows,
    data: fattyAcidAndLipidSynthesisData,
    subPathways: fattyAcidAndLipidSynthesisData.subPathways || null
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
      arrows: pathway.arrows, // Include arrows for node highlighting
      summary: pathway.data.summary,
      startIndex,
      endIndex,
      subPathways: pathway.subPathways || null // Include sub-pathways if they exist
    };
  });
}

export { pathwayDefinitions };
