
var fetch = require("node-fetch");
var qs = require('querystring');

/**
 * Gets the midprice for the given token pair as well as the inverse midprice.
 * @param tokenFrom An input token of type defined in shared/token.js
 * @param tokenTo An output token of type defined in shared/token.js
 */

async function getPrices(tokenFrom, tokenTo) {

  // TODO
  const params = {
    sellToken: tokenFrom.ticker,
    buyToken: tokenTo.ticker,
    buyAmount: 10**(tokenTo.decimals),
  }

  const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
  );
  const response_json = await response.json()
  const midprice = response_json.price
  const inverse = 1/response_json.price

  // price does not include slippage
  return {
    exchange: '0x',
    midprice: midprice,
    inverse: inverse
  };

}




/**
 * Gets the data necessary to execute the given trade.
 */
async function getData() {

  // TODO

}

module.exports = { getData, getPrices };
