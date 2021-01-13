/* eslint-disable */
const GAS_PRICE = 'medium';
const ETH_TOKEN_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
const API_ENDPOINT = 'https://api.kyber.network';

/**
 * Gets the data necessary to execute the given trade.
 */
export default async function executeSwap(tokenFrom, tokenTo, inputAmount, web3) {
  console.log('🚀 ~ file: useKyberSwap.js ~ line 66 ~ executeSwap ~ inputAmount', inputAmount);

  // Set user account
  const accounts = await web3.eth.getAccounts();
  const USER_ACCOUNT = accounts[0];

  const inputAddress = tokenFrom.mainnet;
  const outputAddress = tokenTo.mainnet;

  // Get trade price
  const ratesRequest = await fetch(
    `${API_ENDPOINT}/sell_rate?id=${inputAddress}&qty=${inputAmount}`
  );

  const rates = await ratesRequest.json();
  const inputInETH = rates.data[0].dst_qty;
  const ratesRequest2 = await fetch(`${API_ENDPOINT}/buy_rate?id=${outputAddress}&qty=1`);

  const rates2 = await ratesRequest2.json();
  console.log('🚀 ~ file: useKyberSwap.js ~ line 104 ~ executeSwap ~ rates2 =', rates2);
  const outputInETH = rates2.data[0].src_qty;

  const outputAmount = inputInETH / outputInETH;
  const result = await kyberTokenForETH(inputAddress, inputAmount, web3, USER_ACCOUNT);

  if (result === true) {
    console.log('Trade 1 successful, awaiting trade 2.');
    await kyberEthForToken(outputAddress, outputAmount, web3, USER_ACCOUNT, true);
  } else {
    throw new Error('Trade 1 failed, transactions reverted.');
  }
}

async function kyberTokenForETH(tokenAddress, QTY, web3, USER_ACCOUNT) {
  /*
  ####################################
  ### GET ENABLED STATUS OF WALLET ###
  ####################################
  */

  // Querying the API /users/<user_address>/currencies endpoint
  const enabledStatusesRequest = await fetch(`${API_ENDPOINT}/users/${USER_ACCOUNT}/currencies`);

  // Parsing the output
  const enabledStatuses = await enabledStatusesRequest.json();
  const enabled = enabledStatuses.data.some((token) => {
    if (token.id === tokenAddress.toLowerCase()) {
      return token.enabled;
    }
    return false;
  });

  /*
  ####################################
  ### ENABLE WALLET IF NOT ENABLED ###
  ####################################
  */

  if (!enabled) {
    // Querying the API /users/<user_address>/currencies/<currency_id>/enable_data?gas_price=<gas_price> endpoint
    const enableTokenDetailsRequest = await fetch(
      `${API_ENDPOINT}/users/${USER_ACCOUNT}/currencies/${tokenAddress}/enable_data?gas_price=${GAS_PRICE}`
    );

    // Parsing the output
    const enableTokenDetails = await enableTokenDetailsRequest.json();

    // Extract the raw transaction details
    const rawTx = enableTokenDetails.data;
    const txReceipt = await web3.eth.sendTransaction(rawTx);

    // Log the transaction receipt
    console.log(txReceipt);
  }

  /*
  ####################################
  ### GET DAI/ETH CONVERSION RATES ###
  ####################################
  */

  // Querying the API /sell_rate endpoint
  const ratesRequest = await fetch(`${API_ENDPOINT}/sell_rate?id=${tokenAddress}&qty=${QTY}`);
  // Parsing the output
  const rates = await ratesRequest.json();
  // Getting the source quantity
  const dstQty = rates.data[0].dst_qty;

  /*
  #######################
  ### TRADE EXECUTION ###
  #######################
  */

  // Querying the API /trade_data endpoint
  // Note that a factor of 0.97 is used to account for slippage but you can use any value you want.
  const tradeDetailsRequest = await fetch(
    `${API_ENDPOINT}/trade_data?user_address=${USER_ACCOUNT}&src_id=${tokenAddress}&dst_id=${ETH_TOKEN_ADDRESS}&src_qty=${QTY}&min_dst_qty=${
      dstQty * 0.97
    }&gas_price=${GAS_PRICE}`
  );

  // Parsing the output
  const tradeDetails = await tradeDetailsRequest.json();

  // Extract the raw transaction details
  const rawTx = tradeDetails.data[0];
  console.log(tradeDetails);

  // Broadcasting the transaction
  let succeeded = true;

  const txReceipt = await web3.eth.sendTransaction(rawTx).catch((error) => {
    console.log(error);
    succeeded = false;
  });

  // Log the transaction receipt
  console.log(txReceipt);

  return succeeded;
}

async function kyberEthForToken(tokenAddress, QTY, web3, USER_ACCOUNT, incrementNonce = false) {
  // Querying the API /buy_rate endpoint
  const ratesRequest = await fetch(`${API_ENDPOINT}/buy_rate?id=${tokenAddress}&qty=${QTY}`);

  // Parsing the output
  const rates = await ratesRequest.json();

  // Getting the source quantity
  // srcQty is equal to how much Eth to purchase the output token
  const srcQty = rates.data[0].src_qty;

  /*
  #######################
  ### TRADE EXECUTION ###
  #######################
  */

  // Querying the API /trade_data endpoint
  // Note that a factor of 0.97 is used to account for slippage but you can use any value you want.
  const tradeDetailsRequest = await fetch(
    `${API_ENDPOINT}/trade_data?user_address=${USER_ACCOUNT}&src_id=${ETH_TOKEN_ADDRESS}&dst_id=${tokenAddress}&src_qty=${srcQty}&min_dst_qty=${
      QTY * 0.97
    }&gas_price=${GAS_PRICE}`
  );

  // Parsing the output
  const tradeDetails = await tradeDetailsRequest.json();

  // Extract the raw transaction details
  const rawTx = tradeDetails.data[0];

  // Incrementing the nonce. This is only necessary when this is the second transaction in a row
  // as the nonce will not be set correctly by default.
  if (incrementNonce) {
    const transactionCount = await web3.eth.getTransactionCount(USER_ACCOUNT, 'pending');
    rawTx.nonce = `0x${parseInt(transactionCount, 16).toString(16)}`;
  }

  const txReceipt = await web3.eth.sendTransaction(rawTx);

  // Log the transaction receipt
  console.log(txReceipt);
}
