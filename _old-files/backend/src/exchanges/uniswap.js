const {
  ChainId,
  TradeType,
  WETH,
  Fetcher,
  Percent,
  Route,
  Token,
  TokenAmount,
  Trade,
} = require('@uniswap/sdk');

/**
 * Gets the midprice for the given token pair as well as the inverse midprice.
 * @param tokenFrom An input token of type defined in shared/token.js
 * @param tokenTo An output token of type defined in shared/token.js
 */
async function getPrices(tokenFrom, tokenTo, quantityIn) {
  const input = new Token(ChainId.MAINNET, tokenFrom.mainnet, tokenFrom.decimals);
  const output = new Token(ChainId.MAINNET, tokenTo.mainnet, tokenTo.decimals);
  const pair = await Fetcher.fetchPairData(output, input);
  const route = new Route([pair], input);

  const trade = new Trade(
    route,
    new TokenAmount(input, quantityIn * 10 ** tokenFrom.decimals),
    TradeType.EXACT_INPUT
  );

  const midprice = trade.executionPrice.toSignificant(6);
  const inverse = trade.executionPrice.invert().toSignificant(6);

  return {
    exchange: 'Uniswap',
    midprice: midprice,
    inverse: inverse,
    quantityIn: quantityIn,
    quantityOut: quantityIn * midprice,
  };
}

/**
 * Gets the data necessary to execute the given trade.
 */
async function getData() {
  // TODO
}

module.exports = { getData, getPrices };
