
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
  var Tx = require("ethereumjs-tx").Transaction;
}

async function executeTrade(tokenFrom, tokenTo, sellAmt) {

  let transactionJSON = await getTransaction(tokenFrom, tokenTo, sellAmt);
  // let transaction = {
  //   "data": "0x8bc8efb300000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000002faf080000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000cb744534a44083acd8c3b0b0b2d6e06faa50b9aa0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a258b39954cef5cb142fd567a46cddb31a67012400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000642461c49b3800000000000000000000000000000000000000000000000000006f05b59d3b2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005eaa6a5100000000000000000000000000000000000000000000000000000171a5a2cdbc00000000000000000000000000000000000000000000000000000000000001c00000000000000000000000000000000000000000000000000000000000000220000000000000000000000000000000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000024f47261b0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000024f47261b00000000000000000000000009f8f72aa9304c8b593d555f12ef6589cc3a579a20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000421c071bfac0372362a2535661d1b9f4e59c157a4905c01c223fd1fb1ed24d9425040a42cdeba5078f508373c1305d26dbce52ac25402703f96c3af407e9fdbc4cc703000000000000000000000000000000000000000000000000000000000000",
  //   "salt": "30007552728728725935139338344112382286974839535123538074006558836619765084422",
  //   "signerAddress": USER_ACCOUNT,
  //   "gasPrice": "12000000000",
  //   "expirationTimeSeconds": "1587650683",
  //   "domain": {
  //       "chainId": 1,
  //       "verifyingContract": "0x61935cbdd02287b511119ddb11aeb42f1593b7ef"
  //   }
  // }

  console.log(transactionJSON);

  if (transactionJSON.code) {
    // throw exception and exit this function
    return;
  }

  let transaction = await transaction.json().transaction;

  // TODO: call function to sign the transaction hash here

  let signature = "000";

  let params = {
    "signature": signature,
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
    sellToken: tokenFrom,
    buyToken: tokenTo,
    sellAmount: sellAmount,
  };

  let result = await fetch(
    API_ENDPOINT + `meta_transaction/v0/quote?${qs.stringify(request)}`,
  );

  let resJSON = await result.json();

  // console.log(resJSON);

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
