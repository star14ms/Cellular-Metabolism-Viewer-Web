// Export PubChem cache from localStorage
// Copy and paste this into your browser console
(function() {
  try {
    const cacheKey = 'pubchem_data_cache';
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) {
      console.log('No cache found in localStorage');
      return;
    }
    
    const parsed = JSON.parse(cached);
    
    // Create a downloadable JSON file
    const dataStr = JSON.stringify(parsed, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pubchem-cache-export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('✓ Cache exported! File downloaded as pubchem-cache-export.json');
    console.log('Total molecules:', parsed.data ? parsed.data.length : 0);
  } catch (error) {
    console.error('Error exporting cache:', error);
  }
})();

