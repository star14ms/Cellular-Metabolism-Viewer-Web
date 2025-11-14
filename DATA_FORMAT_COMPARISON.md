# Data Format Comparison: Legacy vs New Format

## Overview
This document compares the legacy data format (glycolysis.js, pyruvateOxidation.js, etc.) with the new data format (nodes.js, reactions.js, arrows.js) to identify missing data that cannot be conveyed.

## Data Structure Comparison

### Legacy Format Structure
Each pathway file (e.g., `glycolysis.js`) contains:
- `glycolysisReactions`: Array of reaction objects with embedded data
- `glycolysisSummary`: Summary object

**Reaction Object in Legacy Format:**
```javascript
{
  step: 1,                              // Step number
  name: "Glucose Phosphorylation",
  substrate: {                          // Full molecule object
    id: "glucose",
    name: "D-Glucose",
    formula: "C₆H₁₂O₆",
    smiles: "...",
    structure: "linear",                 // Structure type
    description: "..."
  },
  product: {                            // Full molecule object
    id: "glucose_6_phosphate",
    name: "Glucose-6-phosphate",
    formula: "C₆H₁₁O₉P",
    smiles: "...",
    structure: "linear",
    description: "..."
  },
  enzyme: {
    name: "Hexokinase",
    ecNumber: "EC 2.7.1.1",
    cofactors: ["Mg²⁺"],
    description: "..."
  },
  coSubstrate: {                        // Co-substrate object
    name: "ATP",
    consumed: true
  },
  byreactant: "ATP",                    // For display on map
  byproduct: {
    name: "ADP"
  },
  conditions: {
    location: "Cytoplasm",
    ph: "7.0-7.4",
    temperature: "37°C",
    regulation: "...",
    isReversible: false
  },
  position: { x: 100, y: 100 }         // Reaction position
}
```

### New Format Structure
Each pathway has three separate files:
- `*_nodes.js`: Molecule/complex/carrier nodes
- `*_reactions.js`: Reaction data (enzyme, conditions)
- `*_arrows.js`: Arrow connections (from_id, to_id, reaction_id, byreactants, byproducts)
- `*_index.js`: Combines all three + summary

**Node Object:**
```javascript
{
  id: 'glucose',
  type: 'molecule',
  name: 'D-Glucose',
  formula: 'C₆H₁₂O₆',
  smiles: '...',
  description: '...',
  position: { x: 100, y: 100 }
}
```

**Reaction Object:**
```javascript
{
  id: 'rxn_glycolysis_1',
  name: 'Glucose Phosphorylation',
  enzyme: {
    name: 'Hexokinase',
    ecNumber: 'EC 2.7.1.1',
    cofactors: ['Mg²⁺'],
    description: '...'
  },
  conditions: {
    location: 'Cytoplasm',
    ph: '7.0-7.4',
    temperature: '37°C',
    regulation: '...',
    isReversible: false
  }
}
```

**Arrow Object:**
```javascript
{
  id: 'arrow_glycolysis_1',
  from_id: 'glucose',
  to_id: 'glucose_6_phosphate',
  reaction_id: 'rxn_glycolysis_1',
  byreactants: ['ATP'],
  byproducts: ['ADP']
}
```

## Missing Data Analysis

### ❌ **CRITICAL: Missing Data That Affects Functionality**

#### 1. **`coSubstrate` Object**
- **Status**: ❌ **MISSING** - Not in new format
- **Usage**: Used in UI components (`NodeDetail.js`, `ArrowDetail.js`) to display co-substrates
- **Impact**: Co-substrates (like ATP, ADP) won't be displayed in reaction detail panels
- **Location in Legacy**: `reaction.coSubstrate = { name: "ATP", consumed: true }`
- **Solution**: Add `coSubstrate` field to `*_reactions.js` files

**Example from Legacy:**
```javascript
// glycolysis.js
coSubstrate: {
  name: "ATP",
  consumed: true
}
```

**Should be added to:**
```javascript
// glycolysis_reactions.js
{
  id: 'rxn_glycolysis_1',
  name: 'Glucose Phosphorylation',
  coSubstrate: {                    // ADD THIS
    name: 'ATP',
    consumed: true
  },
  enzyme: { ... },
  conditions: { ... }
}
```

### ⚠️ **NON-CRITICAL: Missing Data (Metadata Only)**

#### 2. **`step` Number**
- **Status**: ⚠️ Missing but not critical
- **Usage**: Not used in UI, only metadata
- **Impact**: None for visualization, but useful for documentation
- **Location in Legacy**: `reaction.step = 1`
- **Solution**: Optional - can be added to `*_reactions.js` if needed for ordering

#### 3. **`structure` Field**
- **Status**: ⚠️ Missing but not used
- **Usage**: Not used in UI components
- **Impact**: None
- **Location in Legacy**: `substrate.structure = "linear"`
- **Solution**: Not needed - can be ignored

### ✅ **Data Successfully Migrated**

#### 4. **Substrate/Product Data**
- **Status**: ✅ Migrated to `*_nodes.js`
- **Migration**: Molecule data moved from embedded `substrate`/`product` to separate node definitions
- **Linkage**: Connected via arrows (`from_id`, `to_id`)

#### 5. **By-molecules (byreactants/byproducts)**
- **Status**: ✅ Migrated to `*_arrows.js`
- **Migration**: Moved from `reaction.byreactant`/`reaction.byproduct` to `arrow.byreactants`/`arrow.byproducts` arrays

#### 6. **Reaction Position**
- **Status**: ✅ Migrated to `*_nodes.js`
- **Migration**: Position moved from `reaction.position` to `node.position`
- **Note**: This is actually better - positions are now on the actual nodes

#### 7. **Summary Data**
- **Status**: ✅ Preserved in `*_index.js`
- **Migration**: `glycolysisSummary` → `glycolysisData.summary`

#### 8. **ETC Special Fields**
- **Status**: ✅ Preserved
- **Fields**: `etcSubArrows`, `isProteinComplex`, `complexNumber`, `complexSize`
- **Location**: In `*_reactions.js` (for `etcSubArrows`) and `*_nodes.js` (for complex properties)

## Required Actions

### High Priority
1. **Add `coSubstrate` to all `*_reactions.js` files**
   - Check legacy files for `coSubstrate` entries
   - Add corresponding `coSubstrate` objects to new reaction files
   - Affected files:
     - `glycolysis_reactions.js` (steps 1, 3, 10)
     - `pyruvateOxidation_reactions.js` (steps 3, 4)
     - Others as needed

### Low Priority (Optional)
2. **Add `step` numbers to `*_reactions.js`** (if ordering metadata is needed)
3. **Document that `structure` field is intentionally omitted** (not used in UI)

## Example Migration

### Legacy Format:
```javascript
// glycolysis.js
{
  step: 1,
  name: "Glucose Phosphorylation",
  substrate: { id: "glucose", name: "D-Glucose", ... },
  product: { id: "glucose_6_phosphate", name: "Glucose-6-phosphate", ... },
  coSubstrate: { name: "ATP", consumed: true },
  byreactant: "ATP",
  byproduct: { name: "ADP" },
  position: { x: 100, y: 100 }
}
```

### New Format (Current):
```javascript
// glycolysis_nodes.js
{ id: 'glucose', name: 'D-Glucose', position: { x: 100, y: 100 }, ... }
{ id: 'glucose_6_phosphate', name: 'Glucose-6-phosphate', position: { x: 100, y: 250 }, ... }

// glycolysis_reactions.js
{
  id: 'rxn_glycolysis_1',
  name: 'Glucose Phosphorylation',
  // MISSING: coSubstrate: { name: 'ATP', consumed: true }
  enzyme: { ... },
  conditions: { ... }
}

// glycolysis_arrows.js
{
  id: 'arrow_glycolysis_1',
  from_id: 'glucose',
  to_id: 'glucose_6_phosphate',
  reaction_id: 'rxn_glycolysis_1',
  byreactants: ['ATP'],
  byproducts: ['ADP']
}
```

### New Format (After Fix):
```javascript
// glycolysis_reactions.js
{
  id: 'rxn_glycolysis_1',
  name: 'Glucose Phosphorylation',
  coSubstrate: { name: 'ATP', consumed: true },  // ADDED
  enzyme: { ... },
  conditions: { ... }
}
```

## Summary

**Critical Missing Data:**
- ✅ `coSubstrate` - **MUST BE ADDED** (used in UI)

**Non-Critical Missing Data:**
- ⚠️ `step` - Optional metadata
- ⚠️ `structure` - Not used, can be ignored

**Successfully Migrated:**
- ✅ Substrate/product data → nodes.js
- ✅ By-molecules → arrows.js
- ✅ Positions → nodes.js
- ✅ Summary data → index.js
- ✅ ETC special fields → reactions.js & nodes.js


