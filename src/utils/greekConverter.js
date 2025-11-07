/**
 * Greek letter conversion utility
 * Converts Greek letters to English equivalents for API searches
 */

const GREEK_MAP = {
  'α': 'alpha', 'β': 'beta', 'γ': 'gamma', 'δ': 'delta', 'ε': 'epsilon',
  'ζ': 'zeta', 'η': 'eta', 'θ': 'theta', 'ι': 'iota', 'κ': 'kappa',
  'λ': 'lambda', 'μ': 'mu', 'ν': 'nu', 'ξ': 'xi', 'ο': 'omicron',
  'π': 'pi', 'ρ': 'rho', 'σ': 'sigma', 'τ': 'tau', 'υ': 'upsilon',
  'φ': 'phi', 'χ': 'chi', 'ψ': 'psi', 'ω': 'omega',
  'Α': 'Alpha', 'Β': 'Beta', 'Γ': 'Gamma', 'Δ': 'Delta', 'Ε': 'Epsilon',
  'Ζ': 'Zeta', 'Η': 'Eta', 'Θ': 'Theta', 'Ι': 'Iota', 'Κ': 'Kappa',
  'Λ': 'Lambda', 'Μ': 'Mu', 'Ν': 'Nu', 'Ξ': 'Xi', 'Ο': 'Omicron',
  'Π': 'Pi', 'Ρ': 'Rho', 'Σ': 'Sigma', 'Τ': 'Tau', 'Υ': 'Upsilon',
  'Φ': 'Phi', 'Χ': 'Chi', 'Ψ': 'Psi', 'Ω': 'Omega'
};

/**
 * Convert Greek letters to English equivalents
 * @param {string} text - Text that may contain Greek letters
 * @returns {string} Text with Greek letters converted to English
 */
export function convertGreekToEnglish(text) {
  let converted = text;
  for (const [greek, english] of Object.entries(GREEK_MAP)) {
    converted = converted.replace(new RegExp(greek, 'g'), english);
  }
  return converted;
}

