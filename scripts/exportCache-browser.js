// Export PubChem cache from localStorage
// Copy and paste this into your browser console
// Uses the new metabolism_nodes_cache system
(function() {
  try {
    const cacheKey = 'metabolism_nodes_cache';
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) {
      console.log('No cache found in localStorage');
      console.log('Cache key:', cacheKey);
      return;
    }
    
    const parsed = JSON.parse(cached);
    
    // Convert node cache format to export format
    // Node cache: { version, data: [[nodeId, nodeData]], lastUpdated }
    // Export format: { version, data: [[moleculeName, pubchemData]], lastUpdated }
    const exportData = {
      version: parsed.version || '1.0.0',
      data: [],
      lastUpdated: parsed.lastUpdated || new Date().toISOString()
    };
    
    // Extract pubchemData from nodeData
    if (parsed.data && Array.isArray(parsed.data)) {
      parsed.data.forEach(([nodeId, nodeData]) => {
        if (nodeData && nodeData.pubchemData) {
          // New format: nodeData has pubchemData property
          const moleculeName = nodeData.name || nodeId;
          exportData.data.push([moleculeName, nodeData.pubchemData]);
        } else if (nodeData && (nodeData.cid || nodeData.sid)) {
          // Old format: nodeData is pubchemData directly
          const moleculeName = nodeData.name || nodeId;
          exportData.data.push([moleculeName, nodeData]);
        }
      });
    }
    
    // Create a downloadable JSON file
    const dataStr = JSON.stringify(exportData, null, 2);
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
    console.log('Total molecules:', exportData.data.length);
    console.log('Cache version:', exportData.version);
  } catch (error) {
    console.error('Error exporting cache:', error);
  }
})();
