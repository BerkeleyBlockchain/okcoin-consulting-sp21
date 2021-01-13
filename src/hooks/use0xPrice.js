import { useEffect, useState } from 'react';

/**
 * Gets the midprice for the given token pair as well as the inverse midprice.
 * @param tokenFrom An input token of type defined in shared/token.js
 * @param tokenTo An output token of type defined in shared/token.js
 */

export default function use0xPrice(tokenFrom, tokenTo) {
  const [midprice, setMidprice] = useState(1);
  const [inverse, setInverse] = useState(1);

  useEffect(() => {
    const getPrices = async () => {
      if (!tokenFrom || !tokenTo) {
        return;
      }
      try {
        const params = {
          sellToken: tokenFrom.ticker,
          buyToken: tokenTo.ticker,
          buyAmount: 10 ** tokenTo.decimals,
        };

        const u = new URLSearchParams(params);
        const response = await fetch(`https://api.0x.org/swap/v1/quote?${u.toString()}`);
        const responseJson = await response.json();

        setMidprice(1 / responseJson.price);
        setInverse(responseJson.price);
      } catch (e) {
        setMidprice(0);
        setInverse(0);
      }
    };
    getPrices();
  }, [tokenFrom, tokenTo]);

  return ['0x', midprice, inverse];
}
