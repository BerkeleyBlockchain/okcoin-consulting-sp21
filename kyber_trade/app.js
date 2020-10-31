


// Kyber/infura setup here

// Import web3 for broadcasting transactions
var Web3 = require("web3");
// Import node-fetch to query the trading API
var fetch = require("node-fetch");
// import ethereumjs-tx to sign and serialise transactions
var Tx = require("ethereumjs-tx").Transaction;

// Connect to Infura's ropsten node
const web3 = new Web3(
  new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/b2e13b0a648e4c67b4a36951f5b1ed62")
);

// Representation of ETH as an address on Ropsten
const ETH_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
// KNC contract address on Ropsten
const KNC_TOKEN_ADDRESS = "0xaD6D458402F60fD3Bd25163575031ACDce07538D";
const ETH_DECIMALS = 18;
const KNC_DECIMALS = 18;
// How many KNC you want to buy
const QTY = 10;
// Gas price of the transaction
const GAS_PRICE = "medium";
// Your Ethereum wallet address
const USER_ACCOUNT = "0x514FE66A514a5B73F8E78B31173eE913C810425E";
// Your private key
const PRIVATE_KEY = Buffer.from("d95ae2d664459c8f939a18772579c0d2898325d71411ba475d468a78c1860b1b", "hex");
// Your fee sharing address
// const WALLET_ID = "ENTER_FEE_SHARING_ADDRESS_HERE";






var app = express();

async function Kyber_Trade() {
  // Querying the API /currencies endpoint
  let tokenInfoRequest = await fetch(
    "https://ropsten-api.kyber.network/currencies"
  );
  // Parsing the output
  let tokens = await tokenInfoRequest.json();
  // Checking to see if KNC is supported
  let supported = tokens.data.some(token => {
    return "KNC" == token.symbol;
  });
  // If not supported, return.
  if (!supported) {
    console.log("Token is not supported");
    return;
  }

  //"https://ropsten-api.kyber.network/buy_rate?id=0x4E470dc7321E84CA96FcAEDD0C8aBCebbAEB68C6&qty=300"

  // Querying the API /buy_rate endpoint
  let ratesRequest = await fetch(
    "https://ropsten-api.kyber.network/buy_rate?id=" +
      KNC_TOKEN_ADDRESS +
      "&qty=" +
      QTY
  );
  // Parsing the output
  let rates = await ratesRequest.json();
  // Getting the source quantity
  let srcQty = rates.data[0].src_qty;

  /*
  #######################
  ### TRADE EXECUTION ###
  #######################
  */

  // Querying the API /trade_data endpoint
  // Note that a factor of 0.97 is used to account for slippage but you can use any value you want.
  let tradeDetailsRequest = await fetch(
    "https://ropsten-api.kyber.network/trade_data?user_address=" +
      USER_ACCOUNT +
      "&src_id=" +
      ETH_TOKEN_ADDRESS +
      "&dst_id=" +
      KNC_TOKEN_ADDRESS +
      "&src_qty=" +
      srcQty / 0.97 +
      "&min_dst_qty=" +
      QTY +
      "&gas_price=" +
      GAS_PRICE 
  );
  // Parsing the output
  let tradeDetails = await tradeDetailsRequest.json();
  // Extract the raw transaction details
  let rawTx = tradeDetails.data[0];
  // Create a new transaction
  let tx = new Tx(rawTx, {chain:'ropsten'});
  // Signing the transaction
  tx.sign(PRIVATE_KEY);
  // Serialise the transaction (RLP encoding)
  let serializedTx = tx.serialize();
  // Broadcasting the transaction
  txReceipt = await web3.eth
    .sendSignedTransaction("0x" + serializedTx.toString("hex"))
    .catch(error => console.log(error));
  // Log the transaction receipt
  console.log(txReceipt);
}



module.exports = app;



Kyber_Trade();