import { ChainId, Fetcher, Route, Token } from '@uniswap/sdk';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function useUniswapPrice(tokenFrom, tokenTo) {
  const [midprice, setMidprice] = useState(1);
  const [inverse, setInverse] = useState(1);

  useEffect(async () => {
    const getPrices = async () => {
      if (!tokenFrom || !tokenTo) {
        return;
      }
      console.log('Getting Uniswap price');
      try {
        const provider = new ethers.providers.InfuraProvider('mainnet', {
          projectId: process.env.REACT_APP_INFURA_PROJECT_ID,
        });

        const input = new Token(ChainId.MAINNET, tokenFrom.mainnet, tokenFrom.decimals);
        const output = new Token(ChainId.MAINNET, tokenTo.mainnet, tokenTo.decimals);
        const pair = await Fetcher.fetchPairData(input, output, provider);
        const route = new Route([pair], input);

        setMidprice(route.midPrice.toSignificant(6));
        setInverse(route.midPrice.invert().toSignificant(6));
      } catch (e) {
        setMidprice(0);
        setInverse(0);
      }
    };
    getPrices();
  }, [tokenFrom, tokenTo]);

  return ['Uniswap', midprice, inverse];
}
