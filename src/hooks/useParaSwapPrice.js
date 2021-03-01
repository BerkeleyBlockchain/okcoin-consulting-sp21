import { useEffect, useState } from 'react';

/**
 * Gets the execution price for the given token pair from paraSwap exchange
 * @param tokenFrom An input token of type defined in shared/token.js
 * @param tokenTo An output token of type defined in shared/token.js
 * uses the docs from here:
 * https://paraswapv2.docs.apiary.io/#reference/0/tokens-collection/get-rate-for-a-token-pair
 */
export default function useParaPrice(tokenFrom, tokenTo) {
  const [execPrice, setExecPrice] = useState(1);
  useEffect(() => {
    const getPrices = async () => {
      if (!tokenFrom || tokenTo) {
        return;
      }
      try {
        const address1 = tokenFrom.mainnet;
        const address2 = tokenTo.mainnet;
        const { amount } = tokenFrom;

        const ratesRequest = await fetch(
          `https://api.paraswap.io/v2/prices/?from=${address1}&to=${address2}&amount=${amount}`
        );
        const rates = await ratesRequest.json();
        const output = rates.data[0].amount; // can change to .amountWithFee
        setExecPrice(output);
      } catch (e) {
        setExecPrice(0);
        console.log('ERROR CAUSED EXECUTION PRICE SET TO 0');
      }
    };
    getPrices();
  }, [tokenFrom, tokenTo]);

  return ['ParaSwap', execPrice];
}
