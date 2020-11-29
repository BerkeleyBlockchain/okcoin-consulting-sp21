import useUniswapPrice from './useUniswapPrice';

export default function useCheapestPrice(tokenFrom, tokenTo) {
  const [, uniMidprice] = useUniswapPrice(tokenFrom, tokenTo);

  const prices = [uniMidprice];

  return Math.min(prices);
}
