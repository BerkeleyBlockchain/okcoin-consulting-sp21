/* eslint-disable no-console */
import {
  ChainId,
  TradeType,
  Fetcher,
  Percent,
  Route,
  Token,
  TokenAmount,
  Trade,
} from '@uniswap/sdk';
import { ethers } from 'ethers';
import IUniswapV2Router02 from '../constants/abis/IUniswapV2Router02.json';
import erc20Abi from '../constants/abis/erc20.json';

const UNISWAP_ROUTER_CONTRACT = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'; // Mainnet contract

export default async function executeSwap(tokenFrom, tokenTo, inputAmount, web3) {
  const provider = new ethers.providers.Web3Provider(web3.currentProvider);

  // Get pricing information from the SDK
  const inputToken = new Token(ChainId.MAINNET, tokenFrom.mainnet, tokenFrom.decimals);
  const outputToken = new Token(ChainId.MAINNET, tokenTo.mainnet, tokenTo.decimals);

  console.log(
    '🚀 ~ file: useUniswapSwap.js ~ line 37 ~ executeSwap ~ inputToken.decimals',
    inputToken.decimals
  );
  const amountIn = ethers.utils.parseUnits(inputAmount, inputToken.decimals);
  const pair = await Fetcher.fetchPairData(inputToken, outputToken, provider);
  const route = new Route([pair], inputToken);
  const trade = new Trade(
    route,
    new TokenAmount(inputToken, amountIn.toString()),
    TradeType.EXACT_INPUT
  );

  // Print pricing info
  console.log(
    `${tokenFrom.ticker} to ${tokenTo.ticker} execution price: ${trade.executionPrice.toSignificant(
      6
    )}`
  );

  // Get other trade parameters
  const accounts = await web3.eth.getAccounts();
  const userAddress = accounts[0];
  const slippageTolerance = new Percent('300', '10000'); // 300 bips, or 3%
  const amountOutMin = ethers.BigNumber.from(
    trade.minimumAmountOut(slippageTolerance).raw.toString()
  ); // needs to be converted to e.g. hex
  const path = [inputToken.address, outputToken.address];
  const to = userAddress;
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

  // Wallet information
  const account = provider.getSigner();

  // Construct uniswap router contract
  const uniswap = new ethers.Contract(UNISWAP_ROUTER_CONTRACT, IUniswapV2Router02.abi, account);

  // Construct erc20 contract
  const erc20Contract = new ethers.Contract(inputToken.address, erc20Abi, account);

  // Get gas price from Infura
  const gasPrice = await provider.getGasPrice();

  // Approve erc20 token amount
  const txApprove = await erc20Contract.approve(UNISWAP_ROUTER_CONTRACT, amountIn, {
    gasPrice,
    gasLimit: ethers.BigNumber.from(40000),
  });

  console.log(`Approval transaction hash: ${txApprove.hash}`);

  const approvalReceipt = await txApprove.wait();
  console.log(`Approval transaction was mined in block ${approvalReceipt.blockNumber}`);

  // Swap the tokens
  const txSwap = await uniswap.swapExactTokensForTokensSupportingFeeOnTransferTokens(
    amountIn,
    amountOutMin,
    path,
    to,
    deadline,
    {
      gasPrice,
      gasLimit: ethers.BigNumber.from(200000),
    }
  );

  console.log(`Swap transaction hash: ${txSwap.hash}`);

  const swapReceipt = await txSwap.wait();
  console.log(`Swap transaction was mined in block ${swapReceipt.blockNumber}`);
}
