const fs = require('fs');
const path = require('path');

// List of amino acids
const aminoAcids = [
  'Alanine', 'Arginine', 'Asparagine', 'Aspartate', 'Aspartic acid', 
  'Cysteine', 'Glutamate', 'Glutamic acid', 'Glutamine', 'Glycine', 
  'Histidine', 'Isoleucine', 'Leucine', 'Lysine', 'Methionine', 
  'Phenylalanine', 'Proline', 'Serine', 'Threonine', 'Tryptophan', 
  'Tyrosine', 'Valine', 'Citrulline', 'Ornithine', 'Homocysteine'
];

// Create a regex to match the name property
// Matches: name: '[(L-)?AminoAcid]',
const aminoAcidPattern = new RegExp(`name:\\s*['"](L-)?(${aminoAcids.join('|')})['"],`, 'g');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

let totalModified = 0;

walkDir('src/data', (filePath) => {
  if (!filePath.endsWith('_nodes.js')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Replace function
  content = content.replace(aminoAcidPattern, (match, prefix, name, offset, string) => {
    // Check if pathwayType is already defined in the next few lines
    // Look ahead for "pathwayType:" before the next "id:" or end of object "}"
    const remaining = string.slice(offset + match.length);
    const nextPropIdx = remaining.search(/(\n\s*[a-zA-Z0-9_]+:|})/);
    const checkRegion = remaining.slice(0, nextPropIdx !== -1 ? nextPropIdx : 100);
    
    if (checkRegion.includes('pathwayType:')) {
      return match; // Already exists
    }
    
    modified = true;
    // Get indentation
    const lastNewLine = string.lastIndexOf('\n', offset);
    // If no newline found (start of file), default to spaces
    const indentationLine = lastNewLine === -1 ? '' : string.slice(lastNewLine + 1, offset);
    const indentation = indentationLine.match(/^\s*/)[0];
    
    return `${match}\n${indentation}pathwayType: 'amino_acids',`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
    totalModified++;
  }
});

console.log(`Total files modified: ${totalModified}`);
