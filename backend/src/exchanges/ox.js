import { ContractWrappers } from '@0x/contract-wrappers';

/**
 * Gets the midprice for the given token pair as well as the inverse midprice.
 * @param tokenFrom An input token of type defined in shared/token.js
 * @param tokenTo An output token of type defined in shared/token.js
 */
async function getPrices(tokenFrom, tokenTo, amtFrom) {

  const url = "https://kovan.api.0x.org/swap/v1/price?sellToken=" + tokenFrom 
    + "&buyToken=" + tokenTo + "&sellAmount=" + amtFrom.toString();

  const prices = await fetch(url);
  const res = await prices.json();
  const price = res.data[0].price;

  // price does not include slippage
  return {
    exchange: '0x',
    midprice: price.toSignificant(6),
    inverse: price.inverse().toSignificant(6)
  };

}

/**
 * Gets the data necessary to execute the given trade.
 */
async function getData() {

  // TODO

}

module.exports = { getData, getPrices };
