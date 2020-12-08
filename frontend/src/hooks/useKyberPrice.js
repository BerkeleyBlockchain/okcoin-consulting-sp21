import { useEffect, useState } from 'react';

/**
 * Gets the midprice for the given token pair as well as the inverse midprice.
 * @param tokenFrom An input token of type defined in shared/token.js
 * @param tokenTo An output token of type defined in shared/token.js
 */
// async function getPrices(tokenFrom, tokenTo) {
//   if (!tokenFrom || !tokenTo) {
//     return {
//       exchange: 'Kyber',
//       midprice: 1,
//       inverse: 1,
//     };
//   }
//   const address1 = tokenFrom.mainnet;
//   const address2 = tokenTo.mainnet;

//   const ratesRequest = await fetch(`https://api.kyber.network/sell_rate?id=${address1}&qty=1`);
//   const rates = await ratesRequest.json();
//   const inputInEth = rates.data[0].dst_qty;

//   const ratesRequest2 = await fetch(`https://api.kyber.network/buy_rate?id=${address2}&qty=1`);
//   // Parsing the output
//   const rates2 = await ratesRequest2.json();
//   const outputInEth = rates2.data[0].src_qty;

//   const midprice = outputInEth / inputInEth;
//   const inverse = inputInEth / outputInEth;

//   return {
//     exchange: 'Kyber',
//     midprice,
//     inverse,
//   };
// }

export default function useKyberPrice(tokenFrom, tokenTo) {
  const [exchange, setExchange] = useState('Kyber');
  const [midPrice, setMidPrice] = useState(1);
  const [inverse, setInverse] = useState(1);

  useEffect(() => {
    const getPrices = async () => {
      console.log('TRYNA GET PRICES');
      if (!tokenFrom || !tokenTo) {
        return;
      }
      const address1 = tokenFrom.mainnet;
      const address2 = tokenTo.mainnet;

      const ratesRequest = await fetch(`https://api.kyber.network/sell_rate?id=${address1}&qty=1`);
      const rates = await ratesRequest.json();
      const inputInEth = rates.data[0].dst_qty;

      const ratesRequest2 = await fetch(`https://api.kyber.network/buy_rate?id=${address2}&qty=1`);
      // Parsing the output
      const rates2 = await ratesRequest2.json();
      const outputInEth = rates2.data[0].src_qty;

      const midprice = outputInEth / inputInEth;
      const inverse2 = inputInEth / outputInEth;

      setExchange('Kyber');
      setMidPrice(midprice);
      setInverse(inverse2);
    };
    getPrices();
  }, [tokenFrom, tokenTo]);

  // useEffect(async () => {
  //   console.log('GET KYBER PRICE');
  //   const res = await getPrices(tokenFrom, tokenTo);
  //   setExchange(res.exchange);
  //   setMidPrice(res.midprice);
  //   setInverse(res.inverse);
  // }, [tokenFrom, tokenTo]);

  return [exchange, midPrice, inverse];
}
