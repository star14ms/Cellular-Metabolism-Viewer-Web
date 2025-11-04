# Cellular Metabolism Viewer

An interactive web application for visualizing and exploring cellular metabolic pathways with detailed molecular information.

## Features

- **Interactive Pathway Visualization**: Zoom and pan through metabolic pathways using D3.js
- **Detailed Molecule Information**: Click on any reaction to see:
  - Molecule structures (with SMILES notation)
  - Enzyme information (EC numbers, cofactors, descriptions)
  - Reaction conditions (pH, temperature, location, regulation)
  - Byproducts and co-substrates
- **Glycolysis Pathway**: Complete data for all 10 steps of glycolysis

## Project Structure

```
src/
├── data/
│   └── glycolysis.js          # Glycolysis pathway data (molecules, enzymes, conditions)
├── components/
│   ├── MetabolismViewer.js   # Interactive D3.js visualization component
│   └── MoleculeDetail.js     # Detail view component for reactions
├── main.js                    # Main application entry point
└── style.css                  # Application styles
```

## Data Structure

The glycolysis data (`src/data/glycolysis.js`) contains structured information for each reaction step:

- **Substrate**: Starting molecule with formula and SMILES notation
- **Enzyme**: Enzyme name, EC number, cofactors, and description
- **Product(s)**: Resulting molecule(s)
- **Co-substrate**: Additional molecules required (e.g., ATP, NAD⁺)
- **Byproduct**: Molecules produced during the reaction
- **Conditions**: Reaction environment (location, pH, temperature, regulation)

## Getting Started

### Prerequisites

- Node.js (v20.19.0 or v22.12.0+)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown by Vite).

### Build

```bash
npm run build
```

## Usage

1. **Navigate the Pathway**: 
   - Scroll to zoom in/out
   - Click and drag to pan
   - Double-click a reaction node to zoom directly to it

2. **View Details**:
   - Click on any reaction node (numbered circle) to see detailed information
   - The detail panel on the right shows:
     - Substrate and product molecules
     - Enzyme information
     - Reaction conditions and regulation
     - Co-substrates and byproducts

3. **Reset View**: 
   - Click the "Reset Zoom" button to return to the default view

## Future Enhancements

- Integration with chemical structure rendering libraries (SmilesDrawer, RDKit.js, or Ketcher)
- Additional metabolic pathways (Krebs cycle, electron transport chain, etc.)
- Search functionality for molecules and enzymes
- Export functionality for pathway data
- 3D molecular structure visualization

## Image Credit

"Metabolism diagram," by Zlir'a (public domain).

## License

This project is open source and available for educational and research purposes.

