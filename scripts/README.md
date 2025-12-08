# PubChem Image Download Scripts

These scripts help you download PubChem molecule images locally to avoid 503 errors from too many requests.

## Setup

The image directories are already created:
- `public/images/molecules/2d/` - Large 2D structure images
- `public/images/molecules/2d-small/` - Small 2D structure images  
- `public/images/molecules/3d/` - Large 3D structure images
- `public/images/molecules/3d-small/` - Small 3D structure images

## Usage

### Step 1: Export Your Cache

The application uses the new `metabolism_nodes_cache` system (not the old `pubchem_data_cache`).

1. Open your metabolism viewer in the browser
2. Open the browser console (F12)
3. Copy and paste the contents of `exportCache-browser.js` into the console
4. This will download a file called `pubchem-cache-export.json`

The export script automatically converts the node cache format (which stores `{id, name, pubchemData}`) to the export format (which stores `[moleculeName, pubchemData]` pairs).

Alternatively, you can manually export:
```javascript
// In browser console:
localStorage.getItem('metabolism_nodes_cache')
// Copy the output and save to a JSON file
```

Or use the NodeCache utility:
```javascript
// In browser console:
NodeCache.load()  // Returns the cache Map
// Or export using:
JSON.stringify({ version: '1.0.0', data: Array.from(NodeCache.load().entries()) })
```

### Step 2: Download Images

**Option A: Download from cache export**

Run the batch download script:

```bash
node scripts/batchDownloadImages.js pubchem-cache-export.json
```

You can also specify a custom delay (in milliseconds) and force re-download:

```bash
node scripts/batchDownloadImages.js pubchem-cache-export.json 3000 --force
```

**Option B: Download from node files (recommended for updates)**

This script reads `pubchemSid` and `pubchemImageVersion` directly from your node files:

```bash
node scripts/downloadFromNodeFiles.js
```

Use `--force` to force re-download all images:

```bash
node scripts/downloadFromNodeFiles.js --force
```

This is especially useful when you update `pubchemSid` or `pubchemImageVersion` in your node files - it will automatically detect the changes and download new images.

This will:
- Download all images for molecules in your cache
- Save them to the appropriate directories
- Create/update `public/images/molecules/imageMapping.json` with the mappings
- Skip images that already exist

### Step 3: Use Local Images

The application will automatically use local images when available. The `localImageHelper.js` utility:
- Checks for local images first
- Falls back to remote PubChem URLs if local images aren't found
- No code changes needed - it's already integrated!

## Downloading Individual Molecules

You can also download images for a single molecule:

```bash
# Create a JSON file with PubChem data:
echo '{"cid": 12345, "image2DUrl": "https://...", "image2DUrlSmall": "https://..."}' > molecule.json

# Download:
node scripts/downloadPubChemImages.js molecule.json
```

## How It Works

1. **Image Mapping**: The `imageMapping.json` file maps molecule CIDs/SIDs to local file paths and tracks URLs
2. **Automatic Fallback**: If a local image isn't found, the app uses the remote PubChem URL
3. **Change Detection**: The system automatically detects when `pubchemSid` or `pubchemImageVersion` changes in your node files and re-downloads images
4. **Incremental Downloads**: Already downloaded images are skipped unless the URL changed
5. **Version Tracking**: Filenames include SID and version when specified, ensuring different versions are stored separately

## File Structure

```
public/
  images/
    molecules/
      2d/              # Large 2D images (CID12345_2d_l.png)
      2d-small/        # Small 2D images (CID12345_2d_s.png)
      3d/              # Large 3D images (CID12345_3d_l.png)
      3d-small/        # Small 3D images (CID12345_3d_s.png)
      imageMapping.json # Maps CIDs to local paths
```

## Updating Images When Data Changes

When you update `pubchemSid` or `pubchemImageVersion` in your node files:

1. **Automatic Detection**: The download script compares the URL in the node file with the URL used for existing images
2. **Automatic Re-download**: If the URL changed, it deletes the old image and downloads the new one
3. **Version in Filename**: Different versions are stored as separate files (e.g., `SID4842_2d_l_v8.png` vs `SID4842_2d_l_v9.png`)

**To update images after changing node files:**

```bash
# This will detect changes and re-download automatically
node scripts/downloadFromNodeFiles.js
```

## Updating Cache for Individual Molecules

If you update `pubchemSid` or `pubchemImageVersion` in a node file and want to update the localStorage cache without clearing everything:

**Option 1: Browser Console (Recommended)**

1. Open browser console (F12)
2. Copy and paste the contents of `scripts/updateCache-browser.js`
3. Use the functions:
   ```javascript
   // Remove a molecule from cache (uses new metabolism_nodes_cache)
   removeMoleculeFromCache("Molecule Name");
   
   // Update a molecule cache with new SID/version
   updateMoleculeCache("Molecule Name", "4842", 8);
   
   // List all cached molecules
   listCachedMolecules();
   ```

**Or use the built-in NodeCache utility:**
```javascript
// Remove by name
NodeCache.removeByName("Molecule Name");

// Clear all cache
NodeCache.clear();

// Get cache stats
NodeCache.stats();
```

**Option 2: Automatic Detection**

The application automatically detects when `pubchemSid` or `pubchemImageVersion` changes and invalidates the cache for that specific molecule. The next time the molecule is accessed, it will fetch fresh data.

**Option 3: Manual Cache Update Script**

You can also create a script that reads node files and updates the cache export file, then re-import it.

## Troubleshooting

- **503 Errors**: Increase the delay between downloads (default is 2000ms)
- **Missing Images**: Check that the imageMapping.json file is being served correctly
- **Cache Issues**: Clear browser cache if images don't update
- **Images Not Updating**: Use `--force` flag to force re-download: `node scripts/downloadFromNodeFiles.js --force`

