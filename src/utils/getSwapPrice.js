import { axios } from 'axios';
import Exchanges from '../constants/exchanges';

/**
 * Gets the estimated price for a swap from a given exchange as a decimal string
 * @param tokenIn An input token of type defined in constants/tokens.json
 * @param tokenOut An output token of type defined in constants/tokens.json
 * @param amountIn An integer string denoting the amount of `tokenIn` in its smallest unit
 * @param exchangeName The name of the exchange to get a price quote from
 */
export async function estimateSwapPrice(tokenIn, tokenOut, amountIn, exchangeName) {
  const exchangeId = exchangeName === '0x' ? 'Native' : exchangeName;
  const params = new URLSearchParams({
    sellToken: tokenIn.symbol,
    buyToken: tokenOut.symbol,
    sellAmount: amountIn,
    excludedSources: Exchanges.filter((item) => item !== exchangeId).join(),
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
 * @param tokenIn An input token of type defined in constants/tokens.json
 * @param tokenOut An output token of type defined in constants/tokens.json
 * @param amountIn An integer string denoting the amount of `tokenIn` in its smallest unit
 */
export async function estimateAllSwapPrices(tokenIn, tokenOut, amountIn) {
  return Exchanges.map((exchange) => [
    exchange === 'Native' ? '0x' : exchange,
    estimateSwapPrice(tokenIn, tokenOut, amountIn, exchange),
  ]);
}
