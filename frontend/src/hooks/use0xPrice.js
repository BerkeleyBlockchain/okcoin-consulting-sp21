import { useEffect, useState } from 'react';

export default function use0xPrice(tokenFrom, tokenTo) {
  const [midPrice, setMidPrice] = useState(null);
  const [inverse, setInverse] = useState(null);

  useEffect(async () => {
    const getPrices = async () => {
      if (!tokenFrom || !tokenTo) {
        return;
      }
      const params = {
        sellToken: tokenFrom.ticker,
        buyToken: tokenTo.ticker,
        buyAmount: 10 ** tokenTo.decimals,
      };

      const u = new URLSearchParams(params);

      const response = await fetch(`https://api.0x.org/swap/v1/quote?${u.toString()}`);
      const responseJson = await response.json();
      const midprice = responseJson.price;

      setMidPrice(midprice);
      setInverse(1 / midprice);
    };
    getPrices();
  }, [tokenFrom, tokenTo]);

  return ['0x', midPrice, inverse];
}
