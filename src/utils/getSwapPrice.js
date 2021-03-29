import axios from 'axios';
import BD from 'js-big-decimal';
import Exchanges from '../constants/exchanges';
import Tokens from '../constants/tokens';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Gets the estimated price for a swap from a given exchange as a decimal string
 * @param tokenInSymbol Symbol for the input token
 * @param tokenOutSymbol Symbol for the output token
 * @param amountIn An integer string denoting the amount of `tokenIn` in its smallest unit
 * @param exchangeName The name of the exchange to get a price quote from
 */
export async function estimateSwapPrice(tokenInSymbol, tokenOutSymbol, amountIn, exchangeName) {
  const conversionRate = new BD(`1.0e${Tokens.data[tokenInSymbol].decimals}`);
  const converted = new BD(amountIn).multiply(conversionRate);

  const params = new URLSearchParams({
    sellToken: tokenInSymbol,
    buyToken: tokenOutSymbol,
    sellAmount: converted.getValue(),
    excludedSources: Exchanges.exchanges.filter((item) => item !== exchangeName).join(),
  });

  try {
    const { data } = await axios.get(`https://api.0x.org/swap/v1/price?${params.toString()}`);
    return data.price;
  } catch {
    return null;
  }
}

/**
 * Returns a list of [exchange name, quoted price] pairs
 * @param tokenInSymbol Symbol for the input token
 * @param tokenOutSymbol Symbol for the output token
 * @param amountIn An integer string denoting the amount of `tokenIn` in its smallest unit
 */
export async function estimateAllSwapPrices(tokenInSymbol, tokenOutSymbol, amountIn) {
  const prices = [];

  for (let i = 0; i < Exchanges.exchanges.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await sleep(300);
    const exchange = Exchanges.exchanges[i];
    prices.push(estimateSwapPrice(tokenInSymbol, tokenOutSymbol, amountIn, exchange));
  }

  return Promise.all(prices).then((vals) => {
    const results = {};

    let exchange;
    for (let i = 0; i < Exchanges.exchanges.length; i += 1) {
      exchange = Exchanges.exchanges[i];
      results[exchange] = vals[i];
    }

    return results;
  });
}
