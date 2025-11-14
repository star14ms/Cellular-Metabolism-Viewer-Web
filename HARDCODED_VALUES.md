# Hardcoded Values in MetabolismViewer.js

This document highlights all hardcoded values, magic numbers, and hardcoded strings found in `MetabolismViewer.js`.

## 1. Dimensions & Layout Constants

### Default Sizes
- **Line 41-42**: `width: 1400`, `height: 800` (default container dimensions)
- **Line 342-343**: Fallback dimensions `800`, `600`
- **Line 360-361**: Fallback dimensions `maxX = 1400`, `maxY = 800`

### Padding Values
- **Line 365-368**: `+ 100` / `- 100` (bounding box padding)
- **Line 696**: `padding = 150` (initial view padding)
- **Line 1087**: `padding = 100` (pathway zoom padding)
- **Line 1133**: `padding = 150` (show all reactions padding)
- **Line 840-841**: `horizontalPadding = 16`, `verticalPadding = 16` (button padding)
- **Line 2082**: `offset = 70` (byreactant/byproduct arrow offset)

### Button Dimensions
- **Line 587, 732**: `helpButtonRadius = 15`
- **Line 588, 733**: `spacing = 15` (button spacing)
- **Line 580, 586, 730**: `themeToggleRight = 20`, `themeToggleWidth = 50`, `themeToggleHeight = 50`
- **Line 747**: `r: 15` (help button circle radius)
- **Line 842**: `buttonHeight = 28`
- **Line 765, 598**: `tooltipWidth = 450`
- **Line 780**: `height: 75` (tooltip height)
- **Line 903**: `20 + showAllWidth + 15` (button positioning)
- **Line 931**: `buttonWidth + 15` (gap between buttons)

### Node/Shape Dimensions
- **Line 1272**: `return 40` (ETC complex radius)
- **Line 1279**: `return 20` (mobile carrier radius)
- **Line 1283**: `return 30` (standard node radius)
- **Line 2730-2731**: `{ width: 80, height: 60 }` (default complex size)
- **Line 2762**: `r: 20` (mobile carrier circle)
- **Line 2770**: `r: 30` (regular reaction circle)
- **Line 2786-2789**: `x: -55, y: -55, width: 110, height: 110` (image background)
- **Line 2800-2803**: `x: -50, y: -50, width: 100, height: 100` (molecule image)
- **Line 2889**: `size.height / 2 + 8` (label position for complexes)
- **Line 2891**: `20 + 8` (label position for mobile carriers)
- **Line 2893**: `38` (label position for regular reactions, 30 + 8)
- **Line 2898**: `120` (text width limit for wrapping)

### Arrow Dimensions
- **Line 1185-1186**: `markerWidth: 6`, `markerHeight: 6` (normal arrowhead)
- **Line 1198-1199**: `markerWidth: 10`, `markerHeight: 10` (hover arrowhead)
- **Line 1211-1212**: `markerWidth: 8`, `markerHeight: 8` (highlighted arrowhead)
- **Line 1224-1225**: `markerWidth: 6`, `markerHeight: 6` (ETC H+ arrowhead)
- **Line 1311**: `- 10` (midpoint connection offset)
- **Line 1357**: `stroke-width: 40` (hit area width)
- **Line 1362**: `stroke-width: 6` (hover state)
- **Line 1368**: `stroke-width: 4` (normal state)
- **Line 1603, 1743**: `stroke-width: 30` (midpoint hit area)
- **Line 2212**: `byArrowLength = 66` (byreactant/byproduct arrow length)
- **Line 2229-2231**: `'#8b9dc3'`, `arrowStrokeWidth = 3`, `arrowOpacity = 0.8`
- **Line 2345**: `baseLabelOffset = 10` (label offset from arrow)
- **Line 2513**: `arrowheadSize = 12` (triangle arrowhead size)
- **Line 2548**: `stroke-width: 20` (U-arrow hit area)
- **Line 2939**: `arrowLength = 100` (ETC H+ arrow length)
- **Line 3012-3013, 3016-3017**: `+ 20`, `- 12` (H+ label positions)

## 2. Colors (Hardcoded Hex Values)

### Button Colors
- **Line 748-749, 873-874, 916-917**: `'#667eea'` (primary button fill), `'#5568d3'` (stroke)
- **Line 822, 889, 936**: `'#5568d3'` (hover state)
- **Line 970**: `'#4a5fb8'` (selected pathway button)

### Arrow Colors
- **Line 1190, 1203, 1216, 1229, 1343, 1830**: `'#2c5f7c'` (main arrow color)
- **Line 1216**: `'#ff6b6b'` (highlighted arrow)
- **Line 2229**: `'#8b9dc3'` (byreactant/byproduct arrow)
- **Line 2972**: `'#ff6b6b'` (ETC H+ arrow)

### Node Colors
- **Line 2742**: `'#d4a574'` (protein complex fill - tan)
- **Line 2743**: `'#8b6f47'` (protein complex stroke)
- **Line 2764**: `'#d4a574'` (mobile carrier fill)
- **Line 2765**: `'#8b6f47'` (mobile carrier stroke)
- **Line 2772**: `'#5fa8d3'` (regular reaction fill - blue)
- **Line 2773**: `'#2c5f7c'` (regular reaction stroke)

### Highlight Colors
- **Line 3676-3677**: `'#4ecdc4'` (stroke), `'#6ee7e7'` (fill) - default/reactant
- **Line 3688-3689**: `'#ff6b6b'` (stroke), `'#ff8787'` (fill) - product
- **Line 3577**: `'#ff6b6b'` (highlighted arrow stroke)

### Background Colors
- **Line 377, 392**: `'#fafafa'` (fallback background)
- **Line 402**: `'#000000'` (dark mode stroke), `'#dee2e6'` (light mode stroke)
- **Line 416-418**: Color exclusions: `'#667eea'`, `'#2c5f7c'`, `'#5568d3'`
- **Line 422**: `'#000000'` (dark mode rect fill)
- **Line 426**: `'#000000'` (dark mode molecule image background)
- **Line 430**: `'#ffffff'` (light mode molecule image background)

### Tooltip Colors
- **Line 782**: `'#2c5f7c'` (help tooltip fill)

## 3. Hardcoded Positions (X/Y Coordinates)

### Connection Positions (Lines 3177-3230)
- **Line 3177-3180**: `x1: 550`, `y1: 100 + radius`, `x2: 550`, `y2: 250 - radius` (step4-to-5)
- **Line 3185-3188**: `x1: 550 + radius`, `y1: 250`, `x2: 700 - radius`, `y2: 100` (step5-to-6)
- **Line 3193-3196**: `x1: 550 + radius`, `y1: 100`, `x2: 700 - radius`, `y2: 100` (step4-to-6)
- **Line 3201-3204**: `x1: 1300 + radius`, `y1: 100`, `x2: 1450 - radius`, `y2: 100` (glycolysis-to-pyruvate)
- **Line 3209-3217**: `pyruvateOxEndX = 1900`, `pyruvateOxEndY = 100`, `citrateX = 2050`, `citrateY = 200` (pyruvate-to-cac)
- **Line 3222-3230**: `malateX = 1891`, `malateY = 266`, `cycleCitrateX = 2050`, `cycleCitrateY = 200` (cac-cycle)

### Background Click Area
- **Line 532-535**: `x: -10000`, `y: -10000`, `width: 20000`, `height: 20000`

## 4. Hardcoded IDs and Names

### Reaction/Molecule IDs
- **Line 1759**: `'rxn_pyruvate_3'` (reaction ID)
- **Line 1760**: `'step3-to-acetyl-coa'` (arrow connection ID)
- **Line 1762**: `'dihydrolipoamide'` (node ID)
- **Line 1763**: `'step3-acetylCoa-midpoint-to-step4'` (connection ID)
- **Line 1764-1765**: `'acetyl-lipoamide'`, `'dihydrolipoamide'` (molecule IDs)
- **Line 1766**: `'rxn_pyruvate_3'` (target reaction ID)
- **Line 3885**: `'acetyl-coa'` (molecule ID check)

### Pathway Names (String Matching)
- **Line 1889-1896**: 
  - `'Glycolysis'` → `'glycolysis'`
  - `'Pyruvate Oxidation'` → `'pyruvate-oxidation'`
  - `'Citric Acid Cycle (Krebs Cycle)'` → `'citric-acid-cycle'`
  - `'Electron Transport Chain / Oxidative Phosphorylation'` or `'Electron Transport Chain'` → `'electron-transport-chain'`

### Button Text
- **Line 866**: `'Show All'` (button text)

### Help Tooltip Text (Lines 792-816)
- **Line 792**: `'🖱️ Click arrow for reaction details'`
- **Line 800**: `'Click node for molecule details'`
- **Line 808**: `'Double-click to zoom | Scroll to pan'`
- **Line 816**: `'Ctrl/Cmd+Scroll to zoom | Drag to pan'`

### H+ Molecule Definition (Lines 2997-3001)
- **Line 2997**: `name: 'H⁺'`
- **Line 2998**: `formula: 'H⁺'`
- **Line 2999**: `id: 'h-plus'`
- **Line 3000**: Description string (hardcoded)
- **Line 3008**: `'${subArrow.count || ''} H⁺'` (label text)

### Common By-Molecules List (Lines 4128, 4468)
- `['ATP', 'ADP', 'NAD⁺', 'NADH', 'FAD', 'FADH₂', 'CO₂', 'CoA', 'Pi', 'H₂O', 'GDP', 'GTP']`

## 5. Scale Factors & Thresholds

### Zoom Settings
- **Line 450**: `.scaleExtent([0.1, 5])` (zoom limits)
- **Line 705**: `0.95` (initial view scale factor, 95% of space)
- **Line 1096**: `0.9` (pathway zoom scale, 90% of space), `2` (max zoom)
- **Line 1142**: `0.95` (show all scale), `1` (max zoom)
- **Line 3107**: `zoomThreshold = 0.5` (image display threshold)
- **Line 3108**: `nodeRadius = zoomLevel >= zoomThreshold ? 55 : 30`
- **Line 3146**: `zoomThreshold = 0.5`
- **Line 3147**: `radius = zoomLevel >= zoomThreshold ? nodeRadius : 30`
- **Line 4592, 4614, 4656**: `scale = 2` (zoom to reaction/node scale)

### Animation Durations
- **Line 821, 827**: `duration(200)` (button hover transitions)
- **Line 1109, 1155, 4600, 4622, 4654, 4674**: `duration(750)` (zoom transitions)
- **Line 609, 643**: `100` (debounce timeout in ms)
- **Line 1045**: `100` (delay for detail panel)
- **Line 654**: `500` (resize check interval in ms)

### Pan Speed
- **Line 3244**: `panSpeed = 0.5` (scroll panning speed)

## 6. Font Sizes & Text Styling

- **Line 850, 882, 926**: `font-size: '10px'`, `font-weight: '600'` (button text)
- **Line 758**: `font-size: '20px'` (help button "?")
- **Line 791, 799, 807, 815**: `font-size: '12px'` (tooltip text)
- **Line 2349, 2584**: `fontSize = 12` (by-molecule labels)
- **Line 2350**: `charWidth = 7` (character width estimation)
- **Line 2754**: `font-size: '24px'` (complex number label)
- **Line 2841**: `font-size: '16px'` (node label)
- **Line 3036**: `fontSize = 16` (text wrapping)
- **Line 3037**: `lineSpacing = 16` (line spacing)

## 7. Stroke Widths

- **Line 750, 875, 918, 2744, 2766, 2774, 2792, 2973**: `stroke-width: 2` or `3` (various elements)
- **Line 823, 890, 937, 970, 1362, 2571, 2574**: `stroke-width: 3` or `4` (hover/selected states)
- **Line 979, 1344, 1368, 1831, 3601, 3602, 4539, 4540**: `stroke-width: 4` (arrows)
- **Line 3575, 3607, 3700, 3704, 3709, 3715**: `stroke-width: 6` (highlighted arrows)

## 8. Special Step Numbers & Indices

- **Line 3877**: `reaction.step === 15` (CAC Step 1 check)
- **Line 3896**: `glycolysisLength_local + 4` (pyruvate oxidation step 4 index)
- **Line 3897**: `reaction.step === 14` (pyruvate oxidation step 4 check)

## 9. Pathway-Specific Logic

### Hardcoded Pathway Checks
- **Line 2025**: `pathway === 'glycolysis' || pathway === 'electron-transport-chain'` (180° flip check)
- **Line 2088-2092**: Pathway-specific offset direction logic
- **Line 2216**: `isGlycolysis` check for arrow styling

### CAC-Specific Calculations
- Multiple instances of `cacStartIndex` calculations using hardcoded pathway lengths
- **Line 2857, 3275, 3876, 3949, 4685**: Various `cacStartIndex` calculations

## 10. Multi-Product Configuration (Lines 1756-1770)

Hardcoded configuration object for reactions with multiple products:
```javascript
{
  reactionId: 'rxn_pyruvate_3',
  primaryArrowConnectionId: 'step3-to-acetyl-coa',
  secondaryProducts: [{
    toNodeId: 'dihydrolipoamide',
    connectionId: 'step3-acetylCoa-midpoint-to-step4',
    reactantId: 'acetyl-lipoamide',
    productId: 'dihydrolipoamide',
    targetReactionId: 'rxn_pyruvate_3',
  }]
}
```

## 11. Arrow Calculation Constants

- **Line 2182**: `curveSpacing = arrowLength / 2.5` (curve spacing factor)
- **Line 2254**: `-byArrowLength * 0.75` (byreactant x offset)
- **Line 2255**: `byArrowLength * 1.0` (byreactant y offset)
- **Line 2310**: `byArrowLength * 0.75` (byproduct x offset)
- **Line 2311**: `byArrowLength * 1.0` (byproduct y offset)
- **Line 2432**: `arrowheadSize * 0.25` (arrowhead shift distance)
- **Line 2442**: `arrowheadSize * 0.6` (arrowhead base width)

## 12. Miscellaneous Constants

- **Line 2583**: `textBgPadding = 0` (label background padding)
- **Line 2351**: `' + '` (plus separator text)
- **Line 879, 923**: `+ 3` (text vertical centering offset)
- **Line 532-535**: Background click area dimensions (`-10000` to `+10000`)

## Recommendations

1. **Extract constants**: Create a `CONSTANTS.js` file for all magic numbers
2. **Use CSS variables**: Move colors to CSS custom properties
3. **Configuration objects**: Move hardcoded IDs and names to configuration files
4. **Calculate positions**: Replace hardcoded coordinates with dynamic calculations
5. **Pathway abstraction**: Create a pathway configuration system instead of hardcoded checks
6. **Theme system**: Use CSS variables for all colors instead of hardcoded hex values

