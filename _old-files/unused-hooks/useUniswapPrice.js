/* eslint-disable no-console */
import { ChainId, Fetcher, Route, Token } from '@uniswap/sdk';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function useUniswapPrice(tokenFrom, tokenTo) {
  const [midprice, setMidprice] = useState(1);
  const [inverse, setInverse] = useState(1);

  useEffect(() => {
    const getPrices = async () => {
      if (!tokenFrom || !tokenTo) {
        return;
      }
      try {
        const provider = new ethers.providers.InfuraProvider('mainnet', {
          projectId: process.env.REACT_APP_INFURA_PROJECT_ID,
        });

        const input = new Token(ChainId.MAINNET, tokenFrom.mainnet, tokenFrom.decimals);
        const output = new Token(ChainId.MAINNET, tokenTo.mainnet, tokenTo.decimals);
        const pair = await Fetcher.fetchPairData(input, output, provider);
        const route = new Route([pair], input);

        setMidprice(parseFloat(route.midPrice.toSignificant(6)));
        setInverse(parseFloat(route.midPrice.invert().toSignificant(6)));
      } catch (e) {
        setMidprice(0);
        setInverse(0);
        console.error('UNISWAP PRICE NOT FOUND');
      }
    };
    getPrices();
  }, [tokenFrom, tokenTo]);

  return ['Uniswap', midprice, inverse];
}
