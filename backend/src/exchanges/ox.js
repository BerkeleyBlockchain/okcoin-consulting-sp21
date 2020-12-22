
var fetch = require("node-fetch");
var qs = require('querystring');

/**
 * Gets the midprice for the given token pair as well as the inverse midprice.
 * @param tokenFrom An input token of type defined in shared/token.js
 * @param tokenTo An output token of type defined in shared/token.js
 */

var web3;
var MAINNET;
var API_ENDPOINT;
if (MAINNET) {
  API_ENDPOINT = "https://api.0x.org";
  // web3  = new Web3(
  //   new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/b2e13b0a648e4c67b4a36951f5b1ed62")
  // ); 
} else {
  API_ENDPOINT = "https://kovan.api.0x.org/"
  // web3  = new Web3(
  //   new Web3.providers.HttpProvider("https://kovan.infura.io/v3/b2e13b0a648e4c67b4a36951f5b1ed62")
  // ); 
}

const USER_ACCOUNT = "0x514FE66A514a5B73F8E78B31173eE913C810425E";
const PRIVATE_KEY = Buffer.from("d95ae2d664459c8f939a18772579c0d2898325d71411ba475d468a78c1860b1b", "hex");

async function getPrices(tokenFrom, tokenTo, quantityIn) {

  const params = {
    sellToken: tokenFrom.ticker,
    buyToken: tokenTo.ticker,
    sellAmount: quantityIn*(10**tokenFrom.decimals),
  }

  const response = await fetch(
    API_ENDPOINT + `swap/v1/quote?${qs.stringify(params)}`
  );
  const response_json = await response.json()
  const midprice = response_json.price
  const inverse = 1/response_json.price

  // price does not include slippage
  return {
    exchange: '0x',
    midprice: midprice,
    inverse: inverse,
    quantityIn: quantityIn,
    quantityOut: quantityIn*midprice
  };

}

async function signTransaction(transactionHash) {
  // seller will sign the transaction 
  // const commmon = new Common({ chain: 'kovan' });
  console.log(transactionHash);
  var Tx = require("ethereumjs-tx").Transaction;
  let txParams = {
    nonce: '0x00',
    gasPrice: '0x09184e72a000',
    gasLimit: '0x2710',
    to: USER_ACCOUNT,
    value: '0x00',
    data: transactionHash,
  };
  let tx = new Tx(txParams, {chain: 'kovan'});
  console.log(tx.toJSON());
  let signedTx = tx.sign(PRIVATE_KEY);
  console.log(signedTx);
  // console.log(signature);
  // return signature;
}

async function executeTrade(tokenFrom, tokenTo, sellAmt) {

  let transactionJSON = await getTransaction(tokenFrom, tokenTo, sellAmt);

  if (transactionJSON.code) {
    // throw exception and exit this function
    return;
  }
  
  let transaction = await transactionJSON.transaction;
  let hash = await transactionJSON.hash;
  // console.log(transaction);

  // TODO: call function to sign the transaction hash here
  let sign = await signTransaction(hash);

  let signature = "0x00000";

  let params = {
    signature: signature,
    zeroExTransaction: transaction,
  }

  let result = await fetch(
    API_ENDPOINT + `meta_transaction/v0/submit?${qs.stringify(params)}`,
    {method: 'POST', body: 'a=1'},
  );

  let resJSON = await result.json();

  // request failed, HTTP status 403
  // .catch(error => console.log(error));
  if (result.code) {
    return {
      "code": resJSON.code,
      "message": resJSON.reason,
      "transaction": resJSON.ethereumTransaction
    }
  }

  // request succeeded, HTTP status 200
  return {
    "hash": resJSON.ethereumTransactionHash,
    "signedTransaction": resJSON.signedEthereumTransaction,
  }

}

/**
 * Gets the data necessary to execute the given trade.
 */
async function getTransaction(tokenFrom, tokenTo, sellAmount) {
  // TODO: add slippage percentage.
  let request = {
    takerAddress: USER_ACCOUNT,
    sellToken: tokenFrom.ticker,
    buyToken: tokenTo.ticker,
    sellAmount: sellAmount,
  };

  let result = await fetch(
    API_ENDPOINT + `meta_transaction/v0/quote?${qs.stringify(request)}`,
  );

  let resJSON = await result.json();

  // request failed, HTTP status != 200
  if (result.code) {
    return {
      "code": resJSON.code,
      "reason": resJSON.reason,
    }
  }

  // request succeeded, HTTP status 200
  return {
    "hash": resJSON.zeroExTransactionHash,
    "transaction": resJSON.zeroExTransaction
  }

}

module.exports = { getTransaction, getPrices, executeTrade };
