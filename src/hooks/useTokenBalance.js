import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import web3Utils from 'web3-utils';
import Tokens from '../constants/tokens';

const erc20 = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (boolean)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
];

const useTokenBalance = (token, web3, userBalance, onboardState) => {
  const [status, setStatus] = useState('idle');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!token || !web3 || !userBalance || !onboardState) return;
    const getTokenBalance = async () => {
      const tokenAddress = Tokens.data[token].address.toLowerCase();
      let ethersProvider;
      let tokenContract;

      const bal = userBalance || 0;
      const { provider } = onboardState.wallet;
      const { address } = onboardState;
      const ethAmount = web3Utils.fromWei(bal.toString(), 'ether');

      if (!tokenContract) {
        ethersProvider = new ethers.providers.Web3Provider(provider);
        tokenContract = new ethers.Contract(tokenAddress, erc20, ethersProvider);
      }

      const tokenDecimals = Tokens.data[token].decimals;
      const divideBy = new BigNumber(10).pow(tokenDecimals);
      let tokenBalance;
      if (token === 'ETH') {
        tokenBalance = new BigNumber(ethAmount);
      } else {
        const tokenBalanceResult = await tokenContract
          .balanceOf(address)
          .catch((error) => console.log(error))
          .then((res) => res.toString());
        tokenBalance = new BigNumber(tokenBalanceResult).div(divideBy);
      }
      setBalance(tokenBalance);
      setStatus('fetched');
    };

    getTokenBalance();
  }, [token]);

  return { status, balance };
};

export default useTokenBalance;
