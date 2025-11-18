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
    'Fructose-6-phosphate': ['F6P'],
    'Fructose-1,6-bisphosphate': ['F1,6BP'],
    'Glyceraldehyde-3-phosphate': ['GAP'],
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
    'Succinyl-CoA': ['Succinyl CoA'],
    'Fumarate': ['Fumaric acid'],
    'Malate': ['Malic acid'],
    // Pyruvate Oxidation intermediates
    'Hydroxyethyl-TPP': ['2-(1-Hydroxyethyl)thiamine pyrophosphate', '2-(1-Hydroxyethyl)thiamine diphosphate'],
    'Acetyl-lipoamide': ['S-Acetyldihydrolipoamide'],
    // Co-substrates and byproducts
    'ATP': ['Adenosine triphosphate'],
    'ADP': ['Adenosine diphosphate'],
    'NAD⁺': ['Nicotinamide adenine dinucleotide'],
    'NADH': ['Nicotinamide adenine dinucleotide (reduced)'],
    'NADP⁺': ['Nicotinamide adenine dinucleotide phosphate'],
    'NADPH': ['Nicotinamide adenine dinucleotide phosphate (reduced)'],
    'FADH₂': ['Flavin adenine dinucleotide (reduced)'],
    'H₂O': ['H2O'],
    'Pi': ['Inorganic phosphate'],
    'CO₂': ['Carbon dioxide'],
    'CO2': ['Carbon dioxide'],
    // Electron Transport Chain compounds
    'Ubiquinol (QH₂)': ['Ubiquinol'],
    'Ubiquinone': ['Coenzyme Q', 'CoQ'],
    'H⁺': [],
    'O₂': ['Molecular oxygen'],
    'Coenzyme Q (Ubiquinone/Ubiquinol)': ['Coenzyme Q', 'CoQ'],
    'Cytochrome c': ['Cyt c'],
    // Nucleoside salvage pathway compounds
    
    // Deoxyribonucleotides pathway compounds
    'Deoxythymidine diphosphate (dTDP)': ['dTDP', 'Thymidine diphosphate'],
    'Deoxythymidine triphosphate (dTTP)': ['dTTP', 'Thymidine triphosphate'],
    'Deoxycytidine monophosphate (dCMP)': ['dCMP', 'Deoxycytidine monophosphate'],
    'Deoxyuridine monophosphate (dUMP)': ['dUMP', 'Deoxyuridine monophosphate'],
    'Deoxythymidine monophosphate (dTMP)': ['dTMP', 'Thymidine monophosphate'],
    // Folate cycle compounds
    'N⁵,N¹⁰-methylene-THF': ['5,10-Methylene-THF', '5,10-CH2-THF'],
    'N⁵,N¹⁰-methenyl-THF': ['5,10-Methenyl-THF', '5,10-Methenyltetrahydrofolic acid', '5,10-CH+-THF'],
    // Single-carbon metabolism compounds
    'N⁵-methyl-THF': ['5-Methyl-THF'],
    '3-Phosphopyruvate': ['3-phosphonatopyruvate'],
    'Bile Salts': ['Bile salt'],
    // Pyrimidine synthesis compounds
    'N-carbamoyl aspartate': ['N-carbamoylaspartate', 'Ureidosuccinic acid', 'N-carbamoyl-L-aspartate'],
    // Purine synthesis intermediates
    'Formyl-GAR (FGAR)': ['FGAR', 'N-Formylglycinamide ribonucleotide'],
    'Formiminoglycinamidine ribonucleotide (FGAM)': ['FGAM', 'N-Formimidoylglycinamidine ribonucleotide'],
    'Succinylaminoimidazole carboxamide ribonucleotide (SAICAR)': ['SAICAR', 'N-Succinyl-5-aminoimidazole-4-carboxamide ribonucleotide'],
    'Formaminoimidazole carboxamide ribonucleotide (FAICAR)': ['FAICAR', 'N-Formamidoimidazole-4-carboxamide ribonucleotide'],
    'Aminoimidazole carboxamide ribonucleotide (AICAR)': ['AICAR', '5-Aminoimidazole-4-carboxamide ribonucleotide'],
    'Glycinamide ribonucleotide (GAR)': ['GAR', 'Glycinamide ribotide'],
    'Aminoimidazole ribonucleotide (AIR)': ['AIR', '5-Aminoimidazole ribonucleotide'],
    'Carboxyaminoimidazole ribonucleotide (CAIR)': ['CAIR', '5-Carboxyaminoimidazole ribonucleotide'],
    'PPi': ['pyrophosphate'],
    // Common ions and small molecules
    'NH₄⁺': ['Ammonium ion', 'Ammonium', 'Ammonium cation'],
    'NH4+': ['Ammonium ion', 'Ammonium', 'Ammonium cation'],
    // Nucleotide breakdown compounds
    'deoxyribose-1-P': ['Deoxyribose-1-phosphate'],
    '(deoxy) ribose-1-P': ['Ribose-1-phosphate'],
    'H2O2': ['Hydrogen peroxide'],
    'H₂O₂': ['Hydrogen peroxide'],
    // Aromatic amino acid metabolism compounds
    'N-Acetyl-5-HT': ['N-Acetylserotonin', 'N-Acetyl-5-hydroxytryptamine', 'N-Acetylserotonin (NAS)'],
    'Phenyllactate': ['Phenyllactic acid', '2-Hydroxy-3-phenylpropanoic acid', 'Phenyl lactic acid', '3-Phenyllactic acid'],
    'Alkapton': ['Homogentisic acid', 'Homogentisate', '2,5-Dihydroxyphenylacetic acid'],
    'Homogentisate': ['Homogentisic acid', '2,5-Dihydroxyphenylacetic acid'],
    // Branched-chain amino acid breakdown compounds
    'β-Methylcrotonyl-CoA': ['beta-Methylcrotonyl-CoA', 'beta-Methylcrotonyl coenzyme A', '3-Methylcrotonyl-CoA', '3-Methylcrotonyl coenzyme A', 'Methylcrotonyl-CoA', '3-Methylbut-2-enoyl-CoA', '3-Methylbut-2-enoyl coenzyme A'],
    'β-Methylglutaconyl-CoA': ['beta-Methylglutaconyl-CoA', 'beta-Methylglutaconyl coenzyme A', '3-Methylglutaconyl-CoA', '3-Methylglutaconyl coenzyme A', 'Methylglutaconyl-CoA', '3-Methylglutaconyl coenzyme A'],
    'β-Hydroxy-β-methylglutaryl-CoA (HMG-CoA)': ['3-Hydroxy-3-methylglutaryl-CoA', 'beta-Hydroxy-beta-methylglutaryl-CoA', 'HMG-CoA', '3-Hydroxy-3-methylglutaryl coenzyme A', 'beta-Hydroxy-beta-methylglutaryl coenzyme A', '3-Hydroxy-3-methylglutaryl-CoA', 'Hydroxymethylglutaryl-CoA'],
  };
  
  return alternatives[moleculeName] || [];
}

