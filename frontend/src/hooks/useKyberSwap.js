/* eslint-disable */
import Web3 from 'web3';
import * as EthereumTx from 'ethereumjs-tx';
import * as Buffer from 'buffer';

const MAINNET = false;
const GAS_PRICE = 'medium';
const USER_ACCOUNT = '0x514FE66A514a5B73F8E78B31173eE913C810425E';
const PRIVATE_KEY = Buffer.Buffer.from(
  'd95ae2d664459c8f939a18772579c0d2898325d71411ba475d468a78c1860b1b',
  'hex'
);

const Tx = EthereumTx.Transaction;

const ETH_TOKEN_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

let web3;
let API_ENDPOINT;
if (MAINNET) {
  API_ENDPOINT = 'https://api.kyber.network';
  web3 = new Web3(
    new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/b2e13b0a648e4c67b4a36951f5b1ed62')
  );
} else {
  API_ENDPOINT = 'https://ropsten-api.kyber.network';
  web3 = new Web3(
    new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/b2e13b0a648e4c67b4a36951f5b1ed62')
  );
}

/**
 * Gets the data necessary to execute the given trade.
 */
export default async function executeSwap(tokenFrom, tokenTo, input_amount) {
  console.log('🚀 ~ file: useKyberSwap.js ~ line 66 ~ executeSwap ~ input_amount', input_amount);

  let input_address;
  let output_address;

  if (MAINNET) {
    input_address = tokenFrom.mainnet;
    output_address = tokenTo.mainnet;
  } else {
    input_address = tokenFrom.ropsten;
    output_address = tokenTo.ropsten;
  }

  // get trade price
  const ratesRequest = await fetch(
    `${API_ENDPOINT}/sell_rate?id=${input_address}&qty=${input_amount}`
  );
  const rates = await ratesRequest.json();
  const input_in_eth = rates.data[0].dst_qty;

  const ratesRequest_2 = await fetch(`${API_ENDPOINT}/buy_rate?id=${output_address}&qty=1`);

  const rates_2 = await ratesRequest_2.json();
  console.log('🚀 ~ file: useKyberSwap.js ~ line 104 ~ executeSwap ~ rates_2 =', rates_2);
  const output_in_eth = rates_2.data[0].src_qty;

  const output_amount = input_in_eth / output_in_eth;

  const result = await Kyber_Token_for_ETH(input_address, input_amount);

  if (result == true) {
    console.log('Trade 1 successful, awaiting trade 2.');
    await Kyber_ETH_for_Token(output_address, output_amount, true);
  } else {
    console.log('Trade 1 failed, transactions reverted.');
  }
}

async function Kyber_Token_for_ETH(token_address, QTY) {
  /*
  ####################################
  ### GET ENABLED STATUS OF WALLET ###
  ####################################
  */

  // Querying the API /users/<user_address>/currencies endpoint
  const enabledStatusesRequest = await fetch(`${API_ENDPOINT}/users/${USER_ACCOUNT}/currencies`);
  // Parsing the output
  const enabledStatuses = await enabledStatusesRequest.json();
  // Checking to see if DAI is enabled
  const enabled = enabledStatuses.data.some((token) => {
    if (token.id == token_address.toLowerCase()) {
      return token.enabled;
    }
  });

  /*
  ####################################
  ### ENABLE WALLET IF NOT ENABLED ###
  ####################################
  */

  if (!enabled) {
    // Querying the API /users/<user_address>/currencies/<currency_id>/enable_data?gas_price=<gas_price> endpoint
    const enableTokenDetailsRequest = await fetch(
      `${API_ENDPOINT}/users/${USER_ACCOUNT}/currencies/${token_address}/enable_data?gas_price=${GAS_PRICE}`
    );
    // Parsing the output
    const enableTokenDetails = await enableTokenDetailsRequest.json();
    // Extract the raw transaction details
    const rawTx = enableTokenDetails.data;

    // Create a new transaction
    var tx;
    if (MAINNET) {
      tx = new Tx(rawTx);
    } else {
      tx = new Tx(rawTx, { chain: 'ropsten' });
    }

    // Signing the transaction
    tx.sign(PRIVATE_KEY);
    // Serialise the transaction (RLP encoding)
    const serializedTx = tx.serialize();
    // Broadcasting the transaction
    const txReceipt = await web3.eth
      .sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
      .catch((error) => console.log(error));
    // Log the transaction receipt

    console.log(txReceipt);
  }

  /*
  ####################################
  ### GET DAI/ETH CONVERSION RATES ###
  ####################################
  */

  // Querying the API /sell_rate endpoint
  const ratesRequest = await fetch(`${API_ENDPOINT}/sell_rate?id=${token_address}&qty=${QTY}`);
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
    `${API_ENDPOINT}/trade_data?user_address=${USER_ACCOUNT}&src_id=${token_address}&dst_id=${ETH_TOKEN_ADDRESS}&src_qty=${QTY}&min_dst_qty=${
      dstQty * 0.97
    }&gas_price=${GAS_PRICE}`
  );
  // Parsing the output
  const tradeDetails = await tradeDetailsRequest.json();
  // Extract the raw transaction details
  const rawTx = tradeDetails.data[0];
  console.log(tradeDetails);

  // Create a new transaction
  var tx;
  if (MAINNET) {
    tx = new Tx(rawTx);
  } else {
    tx = new Tx(rawTx, { chain: 'ropsten' });
  }

  // Signing the transaction
  tx.sign(PRIVATE_KEY);
  // Serialise the transaction (RLP encoding)
  const serializedTx = tx.serialize();
  // Broadcasting the transaction

  let succeeded = true;

  const txReceipt = await web3.eth
    .sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
    .catch((error) => {
      console.log(error);
      succeeded = false;
    });
  // Log the transaction receipt

  console.log(txReceipt);

  return succeeded;
}

async function Kyber_ETH_for_Token(token_address, QTY, incrementNonce = false) {
  // Querying the API /buy_rate endpoint
  const ratesRequest = await fetch(`${API_ENDPOINT}/buy_rate?id=${token_address}&qty=${QTY}`);

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
    `${API_ENDPOINT}/trade_data?user_address=${USER_ACCOUNT}&src_id=${ETH_TOKEN_ADDRESS}&dst_id=${token_address}&src_qty=${srcQty}&min_dst_qty=${
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
    const transaction_count = await web3.eth.getTransactionCount(USER_ACCOUNT, 'pending');
    rawTx.nonce = `0x${parseInt(transaction_count).toString(16)}`;
  }

  // Create a new transaction
  let tx;
  if (MAINNET) {
    tx = new Tx(rawTx);
  } else {
    tx = new Tx(rawTx, { chain: 'ropsten' });
  }

  // Signing the transaction
  tx.sign(PRIVATE_KEY);
  // Serialise the transaction (RLP encoding)
  const serializedTx = tx.serialize();
  // Broadcasting the transaction
  const txReceipt = await web3.eth
    .sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
    .catch((error) => console.log(error));
  // Log the transaction receipt
  console.log(txReceipt);
}
