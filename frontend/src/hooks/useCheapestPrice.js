import use0xPrice from './use0xPrice';
import useKyberPrice from './useKyberPrice';
import useUniswapPrice from './useUniswapPrice';

export default function useCheapestPrice(tokenFrom, tokenTo) {
  const [uniswap, uniMidprice] = useUniswapPrice(tokenFrom, tokenTo);
  const [kyber, kyberMidprice] = useKyberPrice(tokenFrom, tokenTo);
  const [zeroX, zeroXMidprice] = use0xPrice(tokenFrom, tokenTo);

  const prices = [parseFloat(uniMidprice), parseFloat(kyberMidprice), parseFloat(zeroXMidprice)];
  const exchange = [uniswap, kyber, zeroX];
  const i = prices.indexOf(Math.max(...prices));

  return { price: prices[i], exchange: exchange[i] };
}
