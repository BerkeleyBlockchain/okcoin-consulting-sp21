const iconDirectory = '../../node_modules/cryptocurrency-icons';

/**
 * Gets path string for a token icon in SVG format
 * @param token An input token of type defined in constants/tokens.json
 * @param iconType Can be one of the following: 'color', 'icon', 'black', or 'white'
 */
export function getTokenIconSVG(token, iconType) {
  const symbol = token.symbol.toLowerCase();
  return `${iconDirectory}/svg/${iconType}/${symbol}.svg`;
}

/**
 * Gets path string for a 32x32 token icon in PNG format
 * @param token An input token of type defined in constants/tokens.json
 * @param iconType Can be one of the following: 'color', 'icon', 'black', or 'white'
 */
export function getTokenIconPNG32(token, iconType) {
  const symbol = token.symbol.toLowerCase();
  return `${iconDirectory}/32/${iconType}/${symbol}.png`;
}

/**
 * Gets path string for a 64x64 token icon in PNG format
 * @param token An input token of type defined in constants/tokens.json
 * @param iconType Can be one of the following: 'color', 'icon', 'black', or 'white'
 */
export function getTokenIconPNG64(token, iconType) {
  const symbol = token.symbol.toLowerCase();
  return `${iconDirectory}/32@2x/${iconType}/${symbol}.png`;
}

/**
 * Gets path string for a 128x128 token icon in PNG format
 * @param token An input token of type defined in constants/tokens.json
 * @param iconType Can be one of the following: 'color', 'icon', 'black', or 'white'
 */
export function getTokenIconPNG128(token, iconType) {
  const symbol = token.symbol.toLowerCase();
  return `${iconDirectory}/128/${iconType}/${symbol}.png`;
}
