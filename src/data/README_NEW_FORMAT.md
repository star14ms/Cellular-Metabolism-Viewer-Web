# New Data Format Documentation

## Overview

The data format has been refactored into three separate structures:
1. **Nodes** - Molecules, carriers, and protein complexes
2. **Reactions** - Enzymatic transformations
3. **Arrows** - Connections between nodes

This separation provides:
- Clear separation of concerns
- Easy handling of cyclic pathways
- Support for midpoint connections (byproducts, cofactors)
- Optional reaction data in complex nodes

## Data Structure

### Nodes (`*_nodes.js`)

Nodes represent physical entities in the pathway:
- **Molecules**: Substrates, products, intermediates
- **Carriers**: Mobile electron carriers (e.g., CoQ, cytochrome c)
- **Complexes**: Protein complexes (optionally include reaction data)

```javascript
{
  id: 'pyruvate',              // Unique identifier
  type: 'molecule',            // 'molecule' | 'carrier' | 'complex'
  name: 'Pyruvate',
  formula: 'C₃H₃O₃⁻',
  description: '...',
  smiles: 'CC(=O)C(=O)[O-]',
  position: { x: 100, y: 1300 },
  
  // Optional: for complexes that contain reactions
  reaction_id: 'rxn_complex_1'  // Reference to reaction happening in this complex
}
```

### Reactions (`*_reactions.js`)

Reactions represent enzymatic transformations:

```javascript
{
  id: 'rxn_pyruvate_1',         // Unique identifier
  name: 'Pyruvate Decarboxylation',
  enzyme: {
    name: 'Pyruvate Dehydrogenase (E1)',
    ecNumber: '1.2.4.1',
    description: '...',
    cofactors: ['TPP', 'Mg²⁺']
  },
  conditions: {
    location: 'Mitochondrial matrix',
    requirement: 'Aerobic conditions',
    notes: '...'
  }
}
```

### Arrows (`*_arrows.js`)

Arrows represent connections between nodes:

```javascript
{
  id: 'arrow_pyruvate_1',       // Unique identifier
  from_id: 'pyruvate',          // Node ID or Arrow ID (for midpoint)
  to_id: 'hydroxyethyl-tpp',    // Node ID or Arrow ID (for midpoint)
  reaction_id: 'rxn_pyruvate_1', // Reaction ID
  dashed: true                  // Optional: If true, the main arrow will be drawn with a dashed line style
}
```

**Optional Properties:**
- `dashed`: boolean - If true, the main arrow will be drawn with a dashed line style (5px dash, 5px gap)

## Special Features

### 1. Midpoint Connections

If `from_id` or `to_id` is an **arrow ID** (not a node ID), the arrow starts/ends at the midpoint of that arrow.

**Example: Byproduct from midpoint**
```javascript
{
  id: 'arrow_pyruvate_co2',
  from_id: 'arrow_pyruvate_1',  // Start from midpoint of arrow_pyruvate_1
  to_id: 'co2',                 // End at CO₂ node
  reaction_id: 'rxn_pyruvate_1'
}
```

**Example: Cofactor to midpoint**
```javascript
{
  id: 'arrow_lipoamide_to_step2',
  from_id: 'lipoamide',         // Start from lipoamide node
  to_id: 'arrow_pyruvate_2',    // End at midpoint of arrow_pyruvate_2
  reaction_id: 'rxn_pyruvate_2'
}
```

### 2. Cyclic Pathways

Cyclic pathways are handled naturally by connecting the last node back to the first:

```javascript
{
  id: 'arrow_cac_8',
  from_id: 'malate',
  to_id: 'oxaloacetate',        // Same as first node in cycle
  reaction_id: 'rxn_cac_8'
}
```

### 3. Complex Nodes with Reactions

For protein complexes where reactions occur, you can optionally include reaction data:

```javascript
{
  id: 'complex_i',
  type: 'complex',
  name: 'Complex I',
  position: { x: 500, y: 100 },
  reaction_id: 'rxn_etc_1'      // Reaction happening in this complex
}
```

## File Organization

Each pathway should have three files:
- `*_nodes.js` - Node definitions
- `*_reactions.js` - Reaction definitions
- `*_arrows.js` - Arrow definitions
- `*_index.js` - Exports all data together

Example:
```
pyruvateOxidation_nodes.js
pyruvateOxidation_reactions.js
pyruvateOxidation_arrows.js
pyruvateOxidation_index.js
```

## Usage

```javascript
import { pyruvateOxidationData } from './data/pyruvateOxidation_index.js';
import { loadPathwayData } from './utils/dataLoader.js';

// Load single pathway
const loaded = loadPathwayData(pyruvateOxidationData);

// Or merge multiple pathways
import { glycolysisData } from './data/glycolysis_index.js';
import { citricAcidCycleData } from './data/citricAcidCycle_index.js';

const merged = mergePathwayData(
  glycolysisData,
  pyruvateOxidationData,
  citricAcidCycleData
);
```

## Migration Guide

### Old Format
```javascript
{
  step: 1,
  name: 'Reaction Name',
  substrate: { id: 'substrate_id', ... },
  product: { id: 'product_id', ... },
  enzyme: { ... },
  position: { x: 100, y: 100 }
}
```

### New Format
**Nodes:**
```javascript
{ id: 'substrate_id', type: 'molecule', name: '...', position: { x: 100, y: 100 } }
{ id: 'product_id', type: 'molecule', name: '...', position: { x: 100, y: 200 } }
```

**Reaction:**
```javascript
{ id: 'rxn_1', name: 'Reaction Name', enzyme: { ... } }
```

**Arrow:**
```javascript
{ id: 'arrow_1', from_id: 'substrate_id', to_id: 'product_id', reaction_id: 'rxn_1' }
```

## Benefits

1. **Separation of Concerns**: Nodes, reactions, and connections are clearly separated
2. **Cyclic Support**: Natural handling of cycles (e.g., citric acid cycle)
3. **Midpoint Connections**: Easy specification of byproducts and cofactors
4. **Reusability**: Nodes and reactions can be referenced by multiple arrows
5. **Validation**: Easy to validate that all IDs exist before rendering
6. **Flexibility**: Complex nodes can optionally include reaction data

