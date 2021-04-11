/* eslint-disable no-console */
import BD from 'js-big-decimal';
import erc20Abi from '../constants/abis/erc20.json';

const API_ENDPOINT =
  process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_ZEROEX_PROD
    : process.env.REACT_APP_ZEROEX_DEV;

export default async function swapTokens(tokenIn, tokenOut, sellAmount, web3) {
  // Convert sell amount to smallest units of input token
  const conversionRate = new BD(`1.0e${tokenIn.decimals}`);
  const converted = new BD(sellAmount).multiply(conversionRate);

  const params = {
    sellToken: tokenIn.symbol,
    buyToken: tokenOut.symbol,
    sellAmount: converted.getValue(),
  };

  // Get quote from 0x API
  const response = await fetch(
    `${API_ENDPOINT}/swap/v1/quote?${new URLSearchParams(params).toString()}`
  );

  const quote = await response.json();
  const accounts = await web3.eth.getAccounts();
  const accountAddress = accounts[0];

  // Approve ERC20 token allowance
  if (tokenIn.symbol !== 'ETH') {
    const tokenContract = new web3.eth.Contract(erc20Abi, tokenIn.address);
    const estimatedGas = await tokenContract.methods
      .approve(quote.allowanceTarget, quote.sellAmount)
      .estimateGas();

    const approvalRawTx = {
      from: accountAddress,
      gasPrice: `0x${parseInt(quote.gasPrice, 10).toString(16)}`,
      gasLimit: `0x${parseInt(estimatedGas * 1.1, 10).toString(16)}`,
      to: tokenIn.address,
      value: '0x0',
      data: tokenContract.methods.approve(quote.allowanceTarget, quote.sellAmount).encodeABI(),
    };

    const approvalReceipt = await web3.eth.sendTransaction(approvalRawTx);
    console.log(approvalReceipt);
  }

  // Execute the swap
  const swapRawTx = {
    from: accountAddress,
    gasPrice: `0x${parseInt(quote.gasPrice, 10).toString(16)}`,
    gasLimit: `0x${parseInt(quote.estimatedGas * 1.1, 10).toString(16)}`,
    to: quote.to,
    value: `0x${parseInt(quote.value, 10).toString(16)}`,
    data: quote.data,
  };

  const swapReceipt = await web3.eth.sendTransaction(swapRawTx);
  console.log(swapReceipt);
}
