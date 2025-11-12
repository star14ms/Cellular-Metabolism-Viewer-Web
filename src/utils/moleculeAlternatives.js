/**
 * Shared utility for molecule alternative names
 * Used across MetabolismViewer, NodeDetail, and ArrowDetail
 */

/**
 * Get alternative names for a molecule
 * @param {string} moleculeName - The molecule name to get alternatives for
 * @returns {string[]} Array of alternative names
 */
export function getAlternativeNames(moleculeName) {
  // Unified alternatives object - merged from all sources, duplicates removed
  const alternatives = {
    // Glycolysis compounds
    'D-Glucose': ['Glucose', 'Dextrose', 'alpha-D-glucose'],
    'Glucose-6-phosphate': ['Glucose 6-phosphate', 'G6P', 'D-Glucose 6-phosphate'],
    'Fructose-6-phosphate': ['Fructose 6-phosphate', 'F6P', 'D-Fructose 6-phosphate'],
    'Fructose-1,6-bisphosphate': ['Fructose 1,6-bisphosphate', 'F1,6BP', 'Fructose-1,6-diphosphate'],
    'Glyceraldehyde-3-phosphate': ['Glyceraldehyde 3-phosphate', 'GAP', 'D-Glyceraldehyde 3-phosphate'],
    'Dihydroxyacetone phosphate': ['DHAP', 'Dihydroxyacetone-P'],
    '1,3-Bisphosphoglycerate': ['1,3-BPG', '1,3-Diphosphoglycerate', '1,3-diphosphoglycerate', 'glycerate-1,3-bisphosphate', '1,3-bisphosphoglycerate', '1,3-Bisphosphoglyceric acid', 'Glycerate 1,3-bisphosphate'],
    '3-Phosphoglycerate': ['3PG', 'D-3-Phosphoglycerate'],
    '2-Phosphoglycerate': ['2PG', 'D-2-Phosphoglycerate'],
    'Phosphoenolpyruvate': ['PEP', 'Phosphoenolpyruvic acid'],
    'Pyruvate': ['Pyruvic acid', '2-Oxopropanoic acid'],
    // Citric Acid Cycle compounds
    'Succinate': ['Succinic acid', 'Butanedioic acid', 'Ethylene succinic acid'],
    'Oxaloacetate': ['Oxaloacetic acid', 'Oxalacetic acid'],
    'Citrate': ['Citric acid', '2-Hydroxy-1,2,3-propanetricarboxylic acid'],
    'Isocitrate': ['Isocitric acid'],
    'α-Ketoglutarate': ['alpha-Ketoglutarate', '2-Oxoglutarate', '2-Oxoglutaric acid', 'Alpha-ketoglutarate'],
    'Succinyl-CoA': ['Succinyl coenzyme A', 'Succinyl CoA'],
    'Fumarate': ['Fumaric acid', 'trans-Butenedioic acid'],
    'Malate': ['Malic acid', 'Hydroxybutanedioic acid'],
    // Pyruvate Oxidation intermediates
    'Hydroxyethyl-TPP': ['2-(1-Hydroxyethyl)thiamine pyrophosphate', '2-(1-Hydroxyethyl)thiamine diphosphate', '2-(alpha-Hydroxyethyl)thiamine pyrophosphate', 'Hydroxyethyl thiamine pyrophosphate', '2-(1-Hydroxyethyl)TPP'],
    'Acetyl-lipoamide': ['S-Acetyldihydrolipoamide', 'Acetyldihydrolipoamide', 'S-Acetyl dihydrolipoamide', 'Acetyl dihydrolipoamide', 'Acetyl-lipoic acid'],
    // Co-substrates and byproducts
    'ATP': ['Adenosine triphosphate'],
    'ADP': ['Adenosine diphosphate'],
    'NAD⁺': ['NAD+', 'Nicotinamide adenine dinucleotide', 'NAD'],
    'NADH': ['Nicotinamide adenine dinucleotide (reduced)', 'Reduced NAD'],
    'FADH₂': ['Flavin adenine dinucleotide (reduced)', 'Reduced FAD'],
    'H₂O': ['Water', 'H2O'],
    'Pi': ['Inorganic phosphate', 'Phosphate', 'PO4'],
    'CO₂': ['Carbon dioxide', 'CO2'],
    'CO2': ['Carbon dioxide', 'CO₂'],
    // Electron Transport Chain compounds
    'Ubiquinol (QH₂)': ['Ubiquinol', 'QH2', 'Reduced ubiquinone', 'Coenzyme Q (reduced)', 'CoQ (reduced)'],
    'Ubiquinone': ['Coenzyme Q', 'CoQ', 'Q', 'Ubiquinone (oxidized)'],
    'H⁺': ['Proton', 'H+', 'Hydrogen ion'],
    'O₂': ['Oxygen', 'O2', 'Molecular oxygen'],
    'Coenzyme Q (Ubiquinone/Ubiquinol)': ['Coenzyme Q', 'CoQ', 'Ubiquinone', 'Ubiquinol', 'Q'],
    'Cytochrome c': ['Cyt c', 'Cytochrome c'],
  };
  
  return alternatives[moleculeName] || [];
}

