import { ChainId, Fetcher, Route, Token } from '@uniswap/sdk';
import { useEffect, useState } from 'react';

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
    inverse: route.midPrice.invert().toSignificant(6),
  };
}

export default function usePrices(tokenFrom, tokenTo) {
  const exchange = 'Uniswap';
  const [midPrice, setMidPrice] = useState(null);
  const [inverse, setInverse] = useState(null);

  useEffect(async () => {
    const res = await getPrices(tokenFrom, tokenTo);
    setMidPrice(res.midprice);
    setInverse(res.inverse);
  }, [tokenFrom, tokenTo]);

  return [exchange, midPrice, inverse];
}
