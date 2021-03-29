import { useQuery } from 'react-query';
import axios from 'axios';

/**
 * Gets the midprice for the given token pair as well as the inverse midprice.
 * @param tokenFrom An input token of type defined in shared/token.js
 * @param tokenTo An output token of type defined in shared/token.js
 */

const getPrice = async (tokenFrom, tokenTo) => {
  if (!tokenFrom || !tokenTo) {
    return [];
  }
  const params = new URLSearchParams({
    sellToken: tokenFrom.ticker,
    buyToken: tokenTo.ticker,
    buyAmount: 10 ** tokenTo.decimals,
  });
  const { data } = await axios.get(`https://api.0x.org/swap/v1/quote?${params.toString()}`);
  const midprice = 1 / data.price;
  const inverse = data.price;
  return {
    exchange: '0x',
    midprice,
    inverse,
  };
};

export default function use0xPrice(tokenFrom, tokenTo) {
  return useQuery(['price', '0x', tokenFrom, tokenTo], () => getPrice(tokenFrom, tokenTo), {
    enabled: !tokenFrom && !tokenTo,
  });
}
