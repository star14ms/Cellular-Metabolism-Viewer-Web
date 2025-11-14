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
    'D-Glucose': ['Glucose', 'Dextrose'],
    'Glucose-6-phosphate': [],
    'Fructose-6-phosphate': ['Fructose 6-phosphate', 'F6P'],
    'Fructose-1,6-bisphosphate': ['Fructose 1,6-bisphosphate', 'F1,6BP'],
    'Glyceraldehyde-3-phosphate': ['Glyceraldehyde 3-phosphate', 'GAP'],
    'Dihydroxyacetone phosphate': ['DHAP'],
    '1,3-Bisphosphoglycerate': ['1,3-BPG'],
    '3-Phosphoglycerate': ['3PG'],
    '2-Phosphoglycerate': ['2PG'],
    'Phosphoenolpyruvate (PEP)': ['Phosphoenolpyruvate'], // Reverse mapping for names with parentheses
    'Pyruvate': ['Pyruvic acid'],
    // Citric Acid Cycle compounds
    'Succinate': ['Succinic acid', 'Butanedioic acid', 'Ethylene succinic acid'],
    'Oxaloacetate': ['Oxaloacetic acid', 'Oxalacetic acid'],
    'Citrate': ['Citric acid'],
    'Isocitrate': ['Isocitric acid'],
    'α-Ketoglutarate': ['alpha-Ketoglutarate'],
    'Succinyl-CoA': ['Succinyl CoA'],
    'Fumarate': ['Fumaric acid'],
    'Malate': ['Malic acid'],
    // Pyruvate Oxidation intermediates
    'Hydroxyethyl-TPP': ['2-(1-Hydroxyethyl)thiamine pyrophosphate', '2-(1-Hydroxyethyl)thiamine diphosphate'],
    'Acetyl-lipoamide': ['S-Acetyldihydrolipoamide'],
    // Co-substrates and byproducts
    'ATP': ['Adenosine triphosphate'],
    'ADP': ['Adenosine diphosphate'],
    'NAD⁺': ['NAD+', 'Nicotinamide adenine dinucleotide'],
    'NADH': ['Nicotinamide adenine dinucleotide (reduced)'],
    'FADH₂': ['Flavin adenine dinucleotide (reduced)'],
    'H₂O': ['H2O'],
    'Pi': ['Inorganic phosphate', 'PO4'],
    'CO₂': ['Carbon dioxide', 'CO2'],
    'CO2': ['Carbon dioxide', 'CO₂'],
    // Electron Transport Chain compounds
    'Ubiquinol (QH₂)': ['Ubiquinol', 'QH2'],
    'Ubiquinone': ['Coenzyme Q', 'CoQ'],
    'H⁺': ['H+'],
    'O₂': ['O2', 'Molecular oxygen'],
    'Coenzyme Q (Ubiquinone/Ubiquinol)': ['Coenzyme Q', 'CoQ'],
    'Cytochrome c': ['Cyt c', 'Cytochrome c'],
  };
  
  return alternatives[moleculeName] || [];
}

