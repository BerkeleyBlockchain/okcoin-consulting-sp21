import { ethers } from 'ethers';
import erc20 from './erc20';
import tokens from '../constants/tokens';

function getTokenBalance({ tokenAddress, minimumBalance, tokenName }) {
  console.log(tokenAddress);
  let ethersProvider;
  let tokenContract;

  return async (stateAndHelpers) => {
    const {
      wallet: { provider },
      address,
      BigNumber,
    } = stateAndHelpers;

    if (!tokenContract) {
      ethersProvider = new ethers.providers.Web3Provider(provider);
      tokenContract = new ethers.Contract(tokenAddress, erc20, ethersProvider);
    }

    const tokenDecimals = tokens.data[tokenName].decimals;
    console.log(tokenDecimals);
    const divideBy = new BigNumber(10).pow(tokenDecimals);
    const tokenBalanceResult = await tokenContract.balanceOf(address).then((res) => res.toString());
    const tokenBalance = new BigNumber(tokenBalanceResult).div(divideBy);

    console.log(tokenBalance.lt(minimumBalance));
    console.log(minimumBalance);

    if (tokenBalance.lt(minimumBalance)) {
      return {
        heading: `Get Some ${tokenName}`,
        description: `You need to have at least ${minimumBalance} ${tokenName} to interact with this Dapp. Send some more ${tokenName} to this address or switch to another address that has a higher ${tokenName} balance.`,
        eventCode: 'tokenBalance',
        icon: `
        	<svg 
        		height="18" 
        		viewBox="0 0 429 695" 
        		width="18" xmlns="http://www.w3.org/2000/svg"
        	>
        		<g 
        			fill="currentColor" 
        			fill-rule="evenodd"
            >
        		 <path d="m0 394 213 126.228516 214-126.228516-214 301z"/>
             <path d="m0 353.962264 213.5-353.962264 213.5 353.962264-213.5 126.037736z"/>
            </g>
           </svg>
        `,
      };
    }
    return {
      heading: `Success, you have enough ${tokenName}`,
      description: 'You have the minimum balance required, or more',
      eventCode: 'tokenBalance',
      icon: `
                <svg 
                    height="18" 
                    viewBox="0 0 429 695" 
                    width="18" xmlns="http://www.w3.org/2000/svg"
                >
                    <g 
                        fill="currentColor" 
                        fill-rule="evenodd"
                >
                     <path d="m0 394 213 126.228516 214-126.228516-214 301z"/>
                 <path d="m0 353.962264 213.5-353.962264 213.5 353.962264-213.5 126.037736z"/>
                </g>
               </svg>
            `,
    };
  };
}

// go through tokens.js for this or match their requested token
// get minimum balance to be the amount they entered
const tokenBalanceCheck = (tokenChoice, requestAmount) =>
  getTokenBalance({
    tokenAddress: tokens.data[tokenChoice].address,
    tokenName: tokenChoice,
    minimumBalance: requestAmount,
  });

export default tokenBalanceCheck;
