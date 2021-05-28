/* eslint-disable no-console */
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import web3Utils from 'web3-utils';
import Tokens from '../constants/tokens';
import erc20Abi from '../constants/abis/erc20.json';

const useTokenBalance = (token, eth, onboard, networkMismatch) => {
  const [balance, setBalance] = useState(null);

  const getTokenBalance = async () => {
    const onboardState = onboard?.getState();
    const bal = onboardState?.balance;
    if (!bal || !onboardState) return;

    const { address } = onboardState;
    const ethAmount = web3Utils.fromWei(bal.toString(), 'ether');

    const tokenAddress = Tokens.data[token].address.toLowerCase();
    const tokenDecimals = Tokens.data[token].decimals;
    const tokenContract = new eth.Contract(erc20Abi, tokenAddress);
    const divideBy = new BigNumber(10).pow(tokenDecimals);

    let tokenBalance;
    if (token === 'ETH') {
      tokenBalance = new BigNumber(ethAmount);
    } else {
      setBalance(0);
      const tokenBalanceResult = await tokenContract.methods.balanceOf(address).call();
      tokenBalance = new BigNumber(tokenBalanceResult).div(divideBy);
    }
    setBalance(tokenBalance);
  };

  useEffect(() => {
    if (token && eth && onboard && !networkMismatch) {
      getTokenBalance().catch((error) => console.log(error));
    } else {
      setBalance(null);
    }
  }, [token, eth, onboard, networkMismatch]);

  return balance;
};

export default useTokenBalance;
