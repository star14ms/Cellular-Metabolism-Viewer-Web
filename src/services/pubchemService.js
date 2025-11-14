/**
 * PubChem API Service
 * 
 * Fetches molecule information from PubChem database
 * API documentation: https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest
 */

import { convertGreekToEnglish } from '../utils/greekConverter.js';

/**
 * Fetch compound information from PubChem by name
 * @param {string} compoundName - Name of the compound (e.g., "Fructose-6-phosphate")
 * @returns {Promise<Object>} Compound data from PubChem
 */
export async function fetchCompoundByName(compoundName) {
  try {
    // Try multiple name variations
    const nameVariations = [
      compoundName.trim(),
      compoundName.trim().replace(/\s+/g, '-'),
      compoundName.trim().replace(/\s+/g, ' '),
      compoundName.trim().replace(/-/g, ' '),
    ];
    
    // Handle comma-containing names (e.g., "1,3-Bisphosphoglycerate")
    // Try variations with and without spaces after commas
    if (compoundName.includes(',')) {
      nameVariations.push(
        compoundName.trim().replace(/,\s*/g, ','),  // Remove spaces after commas
        compoundName.trim().replace(/,\s*/g, ', '),  // Ensure space after comma
        compoundName.trim().replace(/,\s*/g, ' '),   // Replace comma with space
        compoundName.trim().replace(/,/g, '')        // Remove commas entirely
      );
    }
    
    // Add Greek-to-English converted versions
    const greekConverted = convertGreekToEnglish(compoundName.trim());
    if (greekConverted !== compoundName.trim()) {
      nameVariations.push(
        greekConverted,
        greekConverted.replace(/\s+/g, '-'),
        greekConverted.replace(/\s+/g, ' '),
        greekConverted.replace(/-/g, ' ')
      );
      
      // Also handle commas in Greek-converted names
      if (greekConverted.includes(',')) {
        nameVariations.push(
          greekConverted.replace(/,\s*/g, ','),
          greekConverted.replace(/,\s*/g, ', '),
          greekConverted.replace(/,\s*/g, ' '),
          greekConverted.replace(/,/g, '')
        );
      }
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
    
    // Generate image URLs
    const image2DUrl = `https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${cid}&t=l`; // Large 2D structure
    const image2DUrlSmall = `https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${cid}&t=s`; // Small 2D structure
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
 * @returns {Promise<Object>} Compound data from PubChem
 */
export async function fetchCompoundWithFallback(compoundName, alternativeNames = []) {
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
      const result = await fetchCompoundByName(name);
      return result;
    } catch (error) {
      console.warn(`Failed to fetch ${name}, trying next...`);
      continue;

    }
  }
  
  throw new Error(`Could not fetch compound data for any of: ${namesToTry.join(', ')}`);
}


