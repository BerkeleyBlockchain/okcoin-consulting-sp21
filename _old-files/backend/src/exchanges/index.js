const kyber = require('./kyber');
const uniswap = require('./uniswap');
const ox = require('./ox');

/**
 * Gets midprice data in parallel from all exchanges.
 * @param tokenFrom should be of type defined in shared/tokens.js
 * @param tokenTo should be of type defined in shared/tokens.js
 */
async function getAllPrices(tokenFrom, tokenTo) {
  let [kyberPrice, oxPrice, uniswapPrice] = await Promise.all([
    kyber.getPrices(tokenFrom, tokenTo),
    ox.getPrices(tokenFrom, tokenTo),
    uniswap.getPrices(tokenFrom, tokenTo),
  ]);

  return {
    kyber: kyberPrice,
    ox: oxPrice,
    uniswap: uniswapPrice,
  };
}

/**
 * Gets the lowest midprice from all exchanges.
 * @param tokenFrom should be of type defined in shared/tokens.js
 * @param tokenTo should be of type defined in shared/tokens.js
 */
async function getLowestPrice(tokenFrom, tokenTo) {
  var prices = await getAllPrices(tokenFrom, tokenTo);
  var result = Object.values(prices)[0];
  var lowest = parseFloat(result.midprice);
  var curr;

  for (var priceData in Object.values(prices)) {
    curr = parseFloat(priceData.midprice);
    if (lowest > curr) {
      result = priceData;
      lowest = curr;
    }
  }

  return result;
}

module.exports = {
  /* Functions */
  getAllPrices,
  getLowestPrice,

  /* APIs for Exchanges */
  KYBER: kyber,
  OX: ox,
  UNISWAP: uniswap,
};
