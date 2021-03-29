/* eslint-disable no-console */
import BD from 'js-big-decimal';
import erc20Abi from '../constants/abis/erc20.json';

const API_ENDPOINT = 'https://api.0x.org';

export default async function swapTokens(tokenIn, tokenOut, sellAmount, web3) {
  // Convert sell amount to smallest units of input token
  const conversionRate = new BD(`1.0e${tokenIn.decimals}`);
  const converted = new BD(sellAmount).multiply(conversionRate);

  const params = {
    sellToken: tokenIn.ticker,
    buyToken: tokenOut.ticker,
    sellAmount: converted.getValue(),
  };

  // Get quote from 0x API
  const response = await fetch(
    `${API_ENDPOINT}/swap/v1/quote?${new URLSearchParams(params).toString()}`
  );

  const quote = await response.json();

  // Approve ERC20 token allowance
  if (tokenIn.ticker !== 'ETH') {
    const tokenContract = new web3.eth.Contract(erc20Abi, tokenIn.mainnet);
    const approvalRawTx = {
      from: web3.eth.accounts[0],
      gasPrice: `0x${parseInt(quote.gasPrice, 10).toString(16)}`,
      gasLimit: `0x${parseInt(quote.estimatedGas * 2, 10).toString(16)}`,
      to: tokenIn.mainnet,
      value: '0x0',
      data: tokenContract.methods.approve(quote.allowanceTarget, quote.sellAmount).encodeABI(),
    };
    const approvalReceipt = await web3.eth.sendTransaction(approvalRawTx);
    console.log(approvalReceipt);
  }

  // Execute the swap
  const swapRawTx = {
    from: web3.eth.accounts[0],
    gasPrice: `0x${parseInt(quote.gasPrice, 10).toString(16)}`,
    gasLimit: `0x${parseInt(quote.estimatedGas * 2, 10).toString(16)}`,
    to: quote.to,
    value: `0x${parseInt(quote.value, 10).toString(16)}`,
    data: quote.data,
  };

  const swapReceipt = await web3.eth.sendTransaction(swapRawTx);
  console.log(swapReceipt);
}

// export default async function executeSwap(tokenIn, tokenOut, inputAmount, web3) {
//   const fromAddress = tokenIn.mainnet;

//   // Set user account
//   const accounts = await web3.eth.getAccounts();
//   const USER_ACCOUNT = accounts[0];

//   // Get transaction details from 0x API
//   const params = {
//     sellToken: tokenIn.ticker,
//     buyToken: tokenOut.ticker,
//     sellAmount: inputAmount * 10 ** tokenIn.decimals,
//   };

//   const response = await fetch(
//     `${API_ENDPOINT}/swap/v1/quote?${new URLSearchParams(params).toString()}`
//   );

//   const responseJSON = await response.json();

//   // Create transaction for ERC20 token approval
//   const tokenContract = new web3.eth.Contract(erc20Abi, fromAddress);

//   let rawTx = {
//     from: USER_ACCOUNT,
//     gasPrice: `0x${parseInt(responseJSON.gasPrice, 10).toString(16)}`,
//     gasLimit: `0x${parseInt(responseJSON.estimatedGas * 2, 10).toString(16)}`,
//     to: fromAddress,
//     value: '0x0',
//     data: tokenContract.methods
//       .approve(responseJSON.allowanceTarget, responseJSON.sellAmount)
//       .encodeABI(),
//   };

//   let txReceipt = await web3.eth.sendTransaction(rawTx);
//   console.log(txReceipt);

//   rawTx = {
//     from: USER_ACCOUNT,
//     gasPrice: `0x${parseInt(responseJSON.gasPrice, 10).toString(16)}`,
//     gasLimit: `0x${parseInt(responseJSON.estimatedGas * 2, 10).toString(16)}`,
//     to: responseJSON.to,
//     value: `0x${parseInt(responseJSON.value, 10).toString(16)}`,
//     data: responseJSON.data,
//   };

//   txReceipt = await web3.eth.sendTransaction(rawTx);
//   console.log(txReceipt);
// }
