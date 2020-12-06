import useUniswapPrice from './useUniswapPrice';
import useKyberPrice from './useKyberPrice';
import use0xPrice from './use0xPrice';

export default function useCheapestPrice(tokenFrom, tokenTo) {
  const [, uniMidprice] = useUniswapPrice(tokenFrom, tokenTo);
  const [, kyberMidprice] = useKyberPrice(tokenFrom, tokenTo);
  const [, zeroXMidprice] = use0xPrice(tokenFrom, tokenTo);

  const prices = [uniMidprice, kyberMidprice, zeroXMidprice];

  return Math.min(...prices);
}
