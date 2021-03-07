import { useEffect, useState } from 'react';

/**
 * Gets the midprice for the given token pair as well as the inverse midprice.
 * @param tokenFrom An input token of type defined in shared/token.js
 * @param tokenTo An output token of type defined in shared/token.js
 */
export default function useKyberPrice(tokenFrom, tokenTo) {
  const [midprice, setMidprice] = useState(1);
  const [inverse, setInverse] = useState(1);

  useEffect(() => {
    const getPrices = async () => {
      if (!tokenFrom || !tokenTo) {
        return;
      }
      const address1 = tokenFrom.mainnet;
      const address2 = tokenTo.mainnet;
      try {
        const ratesRequest = await fetch(
          `https://api.kyber.network/sell_rate?id=${address1}&qty=1`
        );
        const rates = await ratesRequest.json();
        const inputInEth = rates.data[0].dst_qty;

        const ratesRequest2 = await fetch(
          `https://api.kyber.network/buy_rate?id=${address2}&qty=1`
        );
        // Parsing the output
        const rates2 = await ratesRequest2.json();
        const outputInEth = rates2.data[0].src_qty;
        setMidprice(parseFloat(inputInEth / outputInEth));
        setInverse(parseFloat(outputInEth / inputInEth));
      } catch (err) {
        setMidprice(0);
        setInverse(0);
        console.error('KYBER PRICE NOT FOUND!!!');
      }
    };
    getPrices();
  }, [tokenFrom, tokenTo]);

  return ['Kyber', midprice, inverse];
}
