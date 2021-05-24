/* eslint-disable no-shadow */
/* eslint-disable no-console */
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
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

function checkTokenBalance({ tokenAddress, minimumBalance, tokenName }) {
  let ethersProvider;
  let tokenContract;

  return async (stateAndHelpers) => {
    const {
      wallet: { provider },
      address,
      BigNumber,
      ethAmount,
    } = stateAndHelpers;

    if (!tokenContract) {
      ethersProvider = new ethers.providers.Web3Provider(provider);
      tokenContract = new ethers.Contract(tokenAddress, erc20, ethersProvider);
    }

    const tokenDecimals = Tokens.data[tokenName].decimals;
    const divideBy = new BigNumber(10).pow(tokenDecimals);
    let tokenBalance;
    if (tokenName === 'ETH') {
      tokenBalance = new BigNumber(ethAmount);
    } else {
      const tokenBalanceResult = await tokenContract
        .balanceOf(address)
        .then((res) => res.toString());
      tokenBalance = new BigNumber(tokenBalanceResult).div(divideBy);
    }

    if (tokenBalance.lt(minimumBalance)) {
      return {
        result: false,
        balanceFailure: {
          title: 'Unable to execute swap',
          description: `You do not have enough ${tokenName} in your balance`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        },
      };
    }
    return {
      result: true,
    };
  };
}

const getTokenBalance = (token) => {
  const tokenAddress = Tokens.data[token].address.toLowerCase();
  let ethersProvider;
  let tokenContract;

  return async (stateAndHelpers) => {
    const {
      wallet: { provider },
      address,
      BigNumber,
      ethAmount,
    } = stateAndHelpers;

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
    return tokenBalance;
  };
};

async function handleDropdownSelect(token, web3, userBalance, onboardState) {
  let tokenBal;
  if (onboardState) {
    const balance = userBalance ?? 0;
    const balanceData = {
      wallet: {
        provider: onboardState.wallet.provider,
      },
      address: onboardState.address,
      BigNumber,
      ethAmount: web3.utils.fromWei(balance.toString(), 'ether'),
    };
    tokenBal = await getTokenBalance(token)(balanceData);
  }
  return tokenBal;
}

// go through tokens.js for this or match their requested token
// get minimum balance to be the amount they entered
const tokenBalanceCheck = (tokenChoice, requestAmount) =>
  checkTokenBalance({
    tokenAddress: Tokens.data[tokenChoice].address,
    tokenName: tokenChoice,
    minimumBalance: requestAmount,
  });

export { tokenBalanceCheck, getTokenBalance, handleDropdownSelect };
