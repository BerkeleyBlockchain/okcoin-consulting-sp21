/* eslint-disable no-console */
import erc20Abi from '../constants/abis/erc20.json';

const API_ENDPOINT = 'https://api.0x.org';

export default async function executeSwap(tokenFrom, tokenTo, inputAmount, web3) {
  const fromAddress = tokenFrom.mainnet;

  // Set user account
  const accounts = await web3.eth.getAccounts();
  const USER_ACCOUNT = accounts[0];

  // Get transaction details from 0x API
  const params = {
    sellToken: tokenFrom.ticker,
    buyToken: tokenTo.ticker,
    sellAmount: inputAmount * 10 ** tokenFrom.decimals,
  };

  const response = await fetch(
    `${API_ENDPOINT}/swap/v1/quote?${new URLSearchParams(params).toString()}`
  );

  const responseJSON = await response.json();

  // Create transaction for ERC20 token approval
  const tokenContract = new web3.eth.Contract(erc20Abi, fromAddress);

  console.log('TYPE OF', tokenContract.methods);

  let rawTx = {
    from: USER_ACCOUNT,
    gasPrice: `0x${parseInt(responseJSON.gasPrice, 10).toString(16)}`,
    gasLimit: `0x${parseInt(responseJSON.estimatedGas * 2, 10).toString(16)}`,
    to: fromAddress,
    value: '0x0',
    data: tokenContract.methods
      .approve(responseJSON.allowanceTarget, responseJSON.sellAmount)
      .encodeABI(),
  };

  let txReceipt = await web3.eth.sendTransaction(rawTx);
  console.log(txReceipt);

  rawTx = {
    from: USER_ACCOUNT,
    gasPrice: `0x${parseInt(responseJSON.gasPrice, 10).toString(16)}`,
    gasLimit: `0x${parseInt(responseJSON.estimatedGas * 2, 10).toString(16)}`,
    to: responseJSON.to,
    value: `0x${parseInt(responseJSON.value, 10).toString(16)}`,
    data: responseJSON.data,
  };

  txReceipt = await web3.eth.sendTransaction(rawTx);
  console.log(txReceipt);
}
