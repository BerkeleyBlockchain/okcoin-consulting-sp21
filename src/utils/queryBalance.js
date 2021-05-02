import { ethers } from 'ethers';
import erc20 from './erc20';
import tokens from '../constants/tokens';

function checkTokenBalance({ tokenAddress, minimumBalance, tokenName }) {
  console.log(tokenAddress);
  let ethersProvider;
  let tokenContract;

  return async (stateAndHelpers) => {
    const {
      wallet: { provider },
      address,
      BigNumber,
      ethAmount,
    } = stateAndHelpers;

    console.log(provider);
    console.log(address, 'address!');

    if (!tokenContract) {
      ethersProvider = new ethers.providers.Web3Provider(provider);
      tokenContract = new ethers.Contract(tokenAddress, erc20, ethersProvider);
    }

    console.log(tokenContract, 'tokenContract');
    console.log(ethersProvider, 'ethersProvider');

    const tokenDecimals = tokens.data[tokenName].decimals;
    console.log(tokenDecimals);
    const divideBy = new BigNumber(10).pow(tokenDecimals);
    let tokenBalance;
    if (tokenName === 'ETH') {
      console.log(ethAmount);
      tokenBalance = new BigNumber(ethAmount);
    } else {
      const tokenBalanceResult = await tokenContract
        .balanceOf(address)
        .then((res) => res.toString());
      tokenBalance = new BigNumber(tokenBalanceResult).div(divideBy);
    }
    // const tokenBalance = tokenBalanceResult/tokenDecimals;

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

const getTokenBalance = (tokenChoice) => {
  const tokenAddress = tokens.data[tokenChoice].address;
  let ethersProvider;
  let tokenContract;

  return async (stateAndHelpers) => {
    const {
      wallet: { provider },
      address,
      BigNumber,
      ethAmount,
    } = stateAndHelpers;

    console.log(provider);
    console.log(address, 'address!');

    if (!tokenContract) {
      ethersProvider = new ethers.providers.Web3Provider(provider);
      tokenContract = new ethers.Contract(tokenAddress, erc20, ethersProvider);
    }

    console.log(tokenContract, 'tokenContract');
    console.log(ethersProvider, 'ethersProvider');

    const tokenDecimals = tokens.data[tokenChoice].decimals;
    console.log(tokenDecimals);
    const divideBy = new BigNumber(10).pow(tokenDecimals);
    let tokenBalance;
    if (tokenChoice === 'ETH') {
      console.log(ethAmount);
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

// go through tokens.js for this or match their requested token
// get minimum balance to be the amount they entered
const tokenBalanceCheck = (tokenChoice, requestAmount) =>
  checkTokenBalance({
    tokenAddress: tokens.data[tokenChoice].address,
    tokenName: tokenChoice,
    minimumBalance: requestAmount,
  });

export { tokenBalanceCheck, getTokenBalance };
