/**
 * PubChem API Service
 * 
 * Fetches molecule information from PubChem database
 * API documentation: https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest
 */

import { convertGreekToEnglish } from '../utils/greekConverter.js';

/**
 * PubChem image API version
 * Can be adjusted if PubChem updates their image service version
 * @type {number}
 */
export const PUBCHEM_IMAGE_VERSION = 8;

/**
 * Convert superscripts to regular numbers
 * @param {string} text - Text that may contain superscripts
 * @returns {string} Text with superscripts converted to regular numbers
 */
function convertSuperscriptsToNumbers(text) {
  const superscriptMap = {
    '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
    '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
    '⁺': '+', '⁻': '-', '⁼': '=', '⁽': '(', '⁾': ')'
  };
  
  let converted = text;
  for (const [superscript, regular] of Object.entries(superscriptMap)) {
    converted = converted.replace(new RegExp(superscript, 'g'), regular);
  }
  return converted;
}

/**
 * Normalize compound name for PubChem search
 * Converts Greek letters and superscripts to ASCII equivalents
 * @param {string} name - Original compound name
 * @returns {string} Normalized name
 */
function normalizeCompoundName(name) {
  let normalized = name.trim();
  // First convert superscripts (e.g., N⁵,N¹⁰ -> N5,N10)
  normalized = convertSuperscriptsToNumbers(normalized);
  // Then convert Greek letters (e.g., β -> beta)
  normalized = convertGreekToEnglish(normalized);
  return normalized;
}

/**
 * Generate sensible name variations for PubChem search
 * @param {string} name - Normalized compound name
 * @returns {string[]} Array of name variations
 */
function generateNameVariations(name) {
  const variations = [name]; // Start with the normalized name
  
  // Only generate variations that are likely to work
  // Replace hyphens with spaces and vice versa
  if (name.includes('-')) {
    variations.push(name.replace(/-/g, ' '));
  }
  if (name.includes(' ')) {
    variations.push(name.replace(/\s+/g, '-'));
  }
  
  // Handle comma-containing names (e.g., "1,3-Bisphosphoglycerate")
  // Only try variations with proper spacing
  if (name.includes(',')) {
    const withSpace = name.replace(/,\s*/g, ', ');
    const withoutSpace = name.replace(/,\s*/g, ',');
    if (withSpace !== name) variations.push(withSpace);
    if (withoutSpace !== name && withoutSpace !== withSpace) variations.push(withoutSpace);
  }
  
  return [...new Set(variations)]; // Remove duplicates
}

/**
 * Fetch compound information from PubChem by name
 * @param {string} compoundName - Name of the compound (e.g., "Fructose-6-phosphate")
 * @param {number} [imageVersion] - Optional PubChem image API version (defaults to PUBCHEM_IMAGE_VERSION)
 * @returns {Promise<Object>} Compound data from PubChem
 */
export async function fetchCompoundByName(compoundName, imageVersion = null) {
  try {
    // Normalize the name first (convert Greek letters and superscripts)
    const normalizedName = normalizeCompoundName(compoundName);
    
    // Generate variations from the normalized name
    const nameVariations = generateNameVariations(normalizedName);
    
    // Also try the original name if it's different from normalized
    if (compoundName.trim() !== normalizedName) {
      nameVariations.unshift(compoundName.trim()); // Try original first
    }
    
    // Remove duplicates
    const uniqueNames = [...new Set(nameVariations)];
    
    let cid = null;
    let lastError = null;
    
    // Try each name variation
    for (const name of uniqueNames) {
      try {
        const cidUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(name)}/cids/JSON`;
        
        const cidResponse = await fetch(cidUrl);
        
        if (!cidResponse.ok) {
          console.warn(`PubChem API returned ${cidResponse.status} for "${name}"`);
          // Try next variation
          continue;
        }
        
        const cidData = await cidResponse.json();
        
        // Check for error response
        if (cidData.Fault) {
          console.warn(`PubChem API error for "${name}":`, cidData.Fault.Message);
          continue; // Try next variation
        }
        
        // PubChem API returns: { "IdentifierList": { "CID": [12345, 67890, ...] } }
        // Use the first CID from the array (first result, most relevant)
        const cids = cidData?.IdentifierList?.CID;
        
        if (cids && Array.isArray(cids) && cids.length > 0) {
          // Use the first result (index 0) - this is the first/most relevant result from PubChem
          // For "Cytochrome c", this should be CID 16057918
          cid = cids[0];
          console.log(`✓ Found ${cids.length} PubChem result(s) for "${name}", using first result (CID: ${cid})`);
          break; // Found a valid CID
        } else {
          console.warn(`No CIDs found in response for "${name}". Response:`, JSON.stringify(cidData, null, 2));
        }
      } catch (error) {
        console.warn(`Error fetching CID for "${name}":`, error);
        lastError = error;
        continue; // Try next variation
      }
    }
    
    if (!cid) {
      throw new Error(`No CID found for compound: ${compoundName} (tried: ${uniqueNames.join(', ')})`);
    }
    
    // Fetch detailed compound information by CID using property API
    // Using property API which is more reliable than full compound data
    const properties = [
      'MolecularFormula',
      'MolecularWeight',
      'CanonicalSMILES',
      'IsomericSMILES',
      'InChI',
      'InChIKey',
      'IUPACName'
    ].join(',');
    
    const propertyUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/${properties}/JSON`;
    const propertyResponse = await fetch(propertyUrl);
    
    if (!propertyResponse.ok) {
      throw new Error(`Failed to fetch compound properties: ${propertyResponse.statusText}`);
    }
    
    const propertyData = await propertyResponse.json();
    const propertiesList = propertyData.PropertyTable?.Properties?.[0];
    
    if (!propertiesList) {
      throw new Error(`No property data found for CID: ${cid}`);
    }
    
    // Fetch description from PubChem
    let description = null;
    try {
      const descriptionUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/description/JSON`;
      const descriptionResponse = await fetch(descriptionUrl);
      
      if (descriptionResponse.ok) {
        const descriptionData = await descriptionResponse.json();
        // The description is in InformationList.Information array
        // Each item in the array can have a "Description" property
        const informationList = descriptionData?.InformationList?.Information;
        if (informationList && Array.isArray(informationList)) {
          // Find the first entry that has a Description property
          const descriptionEntry = informationList.find(info => 
            info && info.Description
          );
          if (descriptionEntry && descriptionEntry.Description) {
            description = descriptionEntry.Description;
          }
        }
      }
    } catch (error) {
      console.warn(`Failed to fetch description for CID ${cid}:`, error);
      // Don't throw - description is optional
    }
    
    // Safely format molecular weight
    let molecularWeight = null;
    if (propertiesList.MolecularWeight != null) {
      const mw = propertiesList.MolecularWeight;
      if (typeof mw === 'number') {
        molecularWeight = mw.toFixed(2);
      } else if (typeof mw === 'string') {
        molecularWeight = mw;
      }
    }
    
    // Generate image URLs (use provided version or default)
    const version = imageVersion !== null ? imageVersion : PUBCHEM_IMAGE_VERSION;
    const image2DUrl = `https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${cid}&t=l&version=${version}`; // Large 2D structure
    const image2DUrlSmall = `https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${cid}&t=s&version=${version}`; // Small 2D structure
    const image3DUrl = `https://pubchem.ncbi.nlm.nih.gov/image/img3d.cgi?&cid=${cid}&t=l`; // Large 3D structure
    const image3DUrlSmall = `https://pubchem.ncbi.nlm.nih.gov/image/img3d.cgi?&cid=${cid}&t=s`; // Small 3D structure
    
    return {
      cid: cid,
      name: compoundName,
      description: description,
      molecularFormula: propertiesList.MolecularFormula || null,
      molecularWeight: molecularWeight,
      canonicalSmiles: propertiesList.CanonicalSMILES || null,
      isomericSmiles: propertiesList.IsomericSMILES || null,
      inchi: propertiesList.InChI || null,
      inchiKey: propertiesList.InChIKey || null,
      iupacName: propertiesList.IUPACName || null,
      pubchemUrl: `https://pubchem.ncbi.nlm.nih.gov/compound/${cid}`,
      image2DUrl: image2DUrl,
      image2DUrlSmall: image2DUrlSmall,
      image3DUrl: image3DUrl,
      image3DUrlSmall: image3DUrlSmall
    };
  } catch (error) {
    console.error(`Error fetching compound ${compoundName}:`, error);
    throw error;
  }
}


/**
 * Fetch compound information with fallback options
 * @param {string} compoundName - Primary name to search
 * @param {string[]} alternativeNames - Alternative names to try if primary fails
 * @param {number} [imageVersion] - Optional PubChem image API version (defaults to PUBCHEM_IMAGE_VERSION)
 * @returns {Promise<Object>} Compound data from PubChem
 */
export async function fetchCompoundWithFallback(compoundName, alternativeNames = [], imageVersion = null) {
  const namesToTry = [compoundName, ...alternativeNames];
  
  // Add Greek-to-English converted versions to the list
  const greekConverted = convertGreekToEnglish(compoundName);
  if (greekConverted !== compoundName) {
    namesToTry.push(greekConverted);
  }
  
  // Also convert alternative names
  const convertedAlternatives = alternativeNames
    .map(name => convertGreekToEnglish(name))
    .filter(name => name !== compoundName && !alternativeNames.includes(name));
  namesToTry.push(...convertedAlternatives);
  
  for (const name of namesToTry) {
    try {
      const result = await fetchCompoundByName(name, imageVersion);
      return result;
    } catch (error) {
      console.warn(`Failed to fetch ${name}, trying next...`);
      continue;

    }
  }
  
  throw new Error(`Could not fetch compound data for any of: ${namesToTry.join(', ')}`);
}

/**
 * Generate SID-based image URLs using the format from PubChem substance pages
 * @param {string} sid - PubChem Substance ID
 * @param {string} size - Image size: 'l' for large, 's' for small
 * @returns {string} Image URL
 */
export function generateSidImageUrl(sid, size = 'l') {
  if (!sid) return null;
  // Format: https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?sid={sid}&deposited=t&version={version}&t={size}
  return `https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?sid=${sid}&deposited=t&version=${PUBCHEM_IMAGE_VERSION}&t=${size}`;
}

/**
 * Create a minimal PubChem data object with SID-based image URLs when fetching fails
 * @param {string} moleculeName - Name of the molecule
 * @param {string} sid - PubChem Substance ID
 * @returns {Object} Minimal PubChem data object with image URLs
 */
export function createSidBasedPubChemData(moleculeName, sid) {
  if (!sid) return null;
  
  return {
    cid: null,
    name: moleculeName,
    description: null,
    molecularFormula: null,
    molecularWeight: null,
    canonicalSmiles: null,
    isomericSmiles: null,
    inchi: null,
    inchiKey: null,
    iupacName: null,
    pubchemUrl: `https://pubchem.ncbi.nlm.nih.gov/substance/${sid}`,
    image2DUrl: generateSidImageUrl(sid, 'l'),
    image2DUrlSmall: generateSidImageUrl(sid, 's'),
    image3DUrl: null,
    image3DUrlSmall: null
  };
}


