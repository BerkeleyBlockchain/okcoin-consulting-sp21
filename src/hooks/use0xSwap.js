/* eslint-disable */
import Web3 from 'web3';
import * as EthereumTx from 'ethereumjs-tx';

const Tx = EthereumTx.Transaction;

var web3 = false;
var MAINNET;
var API_ENDPOINT;
if (MAINNET) {
  API_ENDPOINT = "https://api.0x.org";
  web3  = new Web3(
    new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/b2e13b0a648e4c67b4a36951f5b1ed62")
  ); 
} else {
  API_ENDPOINT = "https://kovan.api.0x.org/"
  web3  = new Web3(
    new Web3.providers.HttpProvider("https://kovan.infura.io/v3/b2e13b0a648e4c67b4a36951f5b1ed62")
  ); 
}

const USER_ACCOUNT = "0x514FE66A514a5B73F8E78B31173eE913C810425E";
const PRIVATE_KEY = Buffer.from("d95ae2d664459c8f939a18772579c0d2898325d71411ba475d468a78c1860b1b", "hex");

export default async function executeSwap(tokenTo, tokenFrom, input_amount) {

  var fromAddress;
  if (MAINNET) {
    fromAddress = tokenFrom.mainnet;
  } else {
    fromAddress = tokenFrom.kovan;
  }


  var ABI;
  if (MAINNET) {
    ABI = await fetch(
      'https://api.etherscan.io/api?module=contract&action=getabi&address=' + fromAddress
    )
  } else {
    ABI = await fetch(
      'https://api-kovan.etherscan.io/api?module=contract&action=getabi&address='+ fromAddress
    )
  }


  // Get transaction details from 0x API
  const params = {
    sellToken: tokenFrom.ticker,
    buyToken: tokenTo.ticker,
    sellAmount: input_amount*(10**tokenFrom.decimals),
  }

  const response = await fetch(
      API_ENDPOINT + `swap/v1/quote?${new URLSearchParams(params).toString()}`
  );

  const response_json = await response.json()


  // Get ABI of ERC20 token contract for approval
  const ABI_json = await ABI.json()
  const ABI_json_parsed = await JSON.parse(ABI_json.result);


  // Create transaction for ERC20 token approval
  const token_contract = new web3.eth.Contract(ABI_json_parsed, fromAddress);
  var transaction_count = await web3.eth.getTransactionCount(USER_ACCOUNT, "pending")
  
  var rawTx = {
    from: USER_ACCOUNT,
    nonce: "0x" + (parseInt(transaction_count)).toString(16),
    gasPrice: "0x" + (parseInt(response_json.gasPrice)).toString(16),
    gasLimit: "0x" + (parseInt(response_json.estimatedGas * 2)).toString(16),
    to: fromAddress,
    value: "0x0",
    data: token_contract.methods.approve(response_json.allowanceTarget, response_json.sellAmount).encodeABI()

  };

  // Create a new transaction
  var tx;
  if (MAINNET) {
    tx = new Tx(rawTx);
  } else {
    tx = new Tx(rawTx, {chain:'kovan'})
  }
  
  // Signing the transaction
  tx.sign(PRIVATE_KEY);
  // Serialise the transaction (RLP encoding)
  var serializedTx = tx.serialize();
 
  // Broadcasting the transaction
  txReceipt = await web3.eth
    .sendSignedTransaction("0x" + serializedTx.toString("hex"))
    .catch(error => console.log(error));




  // Create transaction for token swap
  var transaction_count = await web3.eth.getTransactionCount(USER_ACCOUNT, "pending")
  
  var rawTx = {
    from: USER_ACCOUNT,
    nonce: "0x" + (parseInt(transaction_count)).toString(16),
    gasPrice: "0x" + (parseInt(response_json.gasPrice)).toString(16),
    gasLimit: "0x" + (parseInt(response_json.estimatedGas * 2)).toString(16),
    to: response_json.to,
    value: "0x" + (parseInt(response_json.value)).toString(16),
    data: response_json.data
    
  }

  // Create a new transaction
  var tx;
  if (MAINNET) {
    tx = new Tx(rawTx);
  } else {
    tx = new Tx(rawTx, {chain:'kovan'})
  }
  
  // Signing the transaction
  tx.sign(PRIVATE_KEY);
  // Serialise the transaction (RLP encoding)
  var serializedTx = tx.serialize();
 
  // Broadcasting the transaction
  txReceipt = await web3.eth
    .sendSignedTransaction("0x" + serializedTx.toString("hex"))
    .catch(error => console.log(error));

    console.log(txReceipt);
}
