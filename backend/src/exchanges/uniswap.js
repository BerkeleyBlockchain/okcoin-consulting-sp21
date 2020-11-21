const { ChainId, TradeType, WETH, Fetcher, Percent, Route, Token, TokenAmount, Trade } = require('@uniswap/sdk');

/**
 * Gets the midprice for the given token pair as well as the inverse midprice.
 * @param tokenFrom An input token of type defined in shared/token.js
 * @param tokenTo An output token of type defined in shared/token.js
 */
async function getPrices(tokenFrom, tokenTo) {

  const input = new Token(ChainId.MAINNET, tokenFrom.mainnet, tokenFrom.decimals);
  const output = new Token(ChainId.MAINNET, tokenTo.mainnet, tokenTo.decimals);
  const pair = await Fetcher.fetchPairData(input, output);
  const route = new Route([pair], input);

  return {
    exchange: 'Uniswap',
    midprice: route.midPrice.toSignificant(6),
    inverse: route.midPrice.invert().toSignificant(6)
  };
}

/**
 * Gets the data necessary to execute the given trade.
 */
async function getData() {

  // TODO

}

module.exports = { getData, getPrices };
