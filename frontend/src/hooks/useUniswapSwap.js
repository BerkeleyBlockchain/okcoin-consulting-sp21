/* eslint-disable */
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
import IUniswapV2Router02 from '../constants/IUniswapV2Router02.json';
import erc20Abi from '../constants/erc20abi.json';

export default async function executeSwap(tokenFrom, tokenTo, inputAmount) {
  console.log('EXECUTING UNISWAP');
  // Get Ethereum provider
  const provider = new ethers.providers.InfuraProvider('mainnet', {
    projectId: process.env.REACT_APP_INFURA_PROJECT_ID,
  });

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
  const slippageTolerance = new Percent('300', '10000'); // 300 bips, or 3%
  const amountOutMin = ethers.BigNumber.from(
    trade.minimumAmountOut(slippageTolerance).raw.toString()
  ); // needs to be converted to e.g. hex
  const path = [inputToken.address, outputToken.address];
  const to = process.env.REACT_APP_WALLET_ADDRESS;
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

  // Wallet information
  const signer = new ethers.Wallet(process.env.REACT_APP_WALLET_PRIVATE_KEY);
  const account = signer.connect(provider);

  // Construct uniswap router contract
  const uniswap = new ethers.Contract(
    process.env.REACT_APP_UNISWAP_ROUTER_CONTRACT, // Mainnet contract
    IUniswapV2Router02.abi,
    account
  );

  // Construct erc20 contract
  const erc20Contract = new ethers.Contract(inputToken.address, erc20Abi, account);

  // Get gas price from Infura
  const gasPrice = await provider.getGasPrice();

  // Approve erc20 token amount
  const txApprove = await erc20Contract.approve(
    process.env.REACT_APP_UNISWAP_ROUTER_CONTRACT,
    amountIn,
    {
      gasPrice,
      gasLimit: ethers.BigNumber.from(30000),
    }
  );

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
      gasLimit: ethers.BigNumber.from(30000),
    }
  );

  console.log(`Swap transaction hash: ${txSwap.hash}`);

  const swapReceipt = await txSwap.wait();
  console.log(`Swap transaction was mined in block ${swapReceipt.blockNumber}`);
}
