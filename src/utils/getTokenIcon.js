const iconDirectory = '/static/token-icons';

/**
 * Gets path string for a 32x32 token icon in PNG format
 * @param tokenSymbol The symbol for the desired token
 */
export function getTokenIconPNG32(tokenSymbol) {
  const symbol = tokenSymbol?.toLowerCase();
  return `${iconDirectory}/32/${symbol}.png`;
}

/**
 * Gets path string for a 128x128 token icon in PNG format
 * @param tokenSymbol The symbol for the desired token
 */
export function getTokenIconPNG128(tokenSymbol) {
  const symbol = tokenSymbol.toLowerCase();
  return `${iconDirectory}/128/${symbol}.png`;
}
