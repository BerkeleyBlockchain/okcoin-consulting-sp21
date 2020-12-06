import { useEffect, useState } from 'react';

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
    buyAmount: 10 ** tokenTo.decimals,
  };

  const u = new URLSearchParams(params);

  const response = await fetch(`https://api.0x.org/swap/v1/quote?${u.toString()}`);
  const responseJson = await response.json();
  const midprice = responseJson.price;
  const inverse = 1 / responseJson.price;

  // price does not include slippage
  return {
    exchange: '0x',
    midprice,
    inverse,
  };
}

export default function use0xPrice(tokenFrom, tokenTo) {
  const [exchange, setExchange] = useState(null);
  const [midPrice, setMidPrice] = useState(null);
  const [inverse, setInverse] = useState(null);

  useEffect(async () => {
    const res = await getPrices(tokenFrom, tokenTo);
    setExchange(res.exchange);
    setMidPrice(res.midprice);
    setInverse(res.inverse);
  }, [tokenFrom, tokenTo]);

  return [exchange, midPrice, inverse];
}
