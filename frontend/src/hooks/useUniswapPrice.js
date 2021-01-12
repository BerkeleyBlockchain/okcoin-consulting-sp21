import { ChainId, Fetcher, Route, Token } from '@uniswap/sdk';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function useUniswapPrice(tokenFrom, tokenTo) {
  const [midprice, setMidPrice] = useState(1);
  const [inverse, setInverse] = useState(1);

  useEffect(async () => {
    const getPrices = async () => {
      if (!tokenFrom || !tokenTo) {
        return;
      }
      const provider = new ethers.providers.InfuraProvider('mainnet', {
        projectId: process.env.REACT_APP_INFURA_PROJECT_ID,
      });

      const input = new Token(ChainId.MAINNET, tokenFrom.mainnet, tokenFrom.decimals);
      const output = new Token(ChainId.MAINNET, tokenTo.mainnet, tokenTo.decimals);
      const pair = await Fetcher.fetchPairData(input, output, provider);
      const route = new Route([pair], input);

      setMidPrice(route.midprice.toSignificant(6));
      setInverse(route.midprice.invert().toSignificant(6));
    };
    getPrices();
  }, [tokenFrom, tokenTo]);

  return ['Uniswap', midprice, inverse];
}
