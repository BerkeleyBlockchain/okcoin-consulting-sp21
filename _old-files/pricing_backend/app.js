

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var qs = require('querystring')
var fetch = require("node-fetch");

const UNISWAP = require('@uniswap/sdk')
const ChainId = UNISWAP.ChainId;
const Token = UNISWAP.Token;
const Fetcher = UNISWAP.Fetcher;
const Trade = UNISWAP.Trade;
const Route = UNISWAP.Route;
const TokenAmount = UNISWAP.TokenAmount;
const TradeType = UNISWAP.TradeType;
const WETH = UNISWAP.WETH;

var token_addresses = {
  "DAI": '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  "USDT": '0xdac17f958d2ee523a2206206994597c13d831ec7',
  "USDC": '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
}


var app = express();


app.get("/data/:token1/:token2", (req, res) => {
  
  Pricing(req.params.token1, req.params.token2).then(result => {
    // do some processing of result into finalData
    res.json({uniswap: parseFloat(result[0]), kyber: parseFloat(result[1])});
  })


  
});

async function Pricing(token1, token2) {



  await Ox(token1, token2)


  prices = await Promise.all([Uniswap(token1, token2), Kyber(token1, token2)]);


  return prices
}

async function Ox(token_1, token_2) {


  // https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=WETH&sellAmount=100000000000000000
  
  const params = {
    sellToken: token_1,
    buyToken: token_2,
    sellAmount: '100',
  }
  const response = await fetch(
    //'https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=WETH&sellAmount=100000000000000000'
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
  );

  const response_json = await response.json()
 
  console.log(response_json.price)
  
  return response_json.price
}

async function Kyber(token_1, token_2) {

  let address_1 = token_addresses[token_1]
  let address_2 = token_addresses[token_2]


  let ratesRequest = await fetch(
    "https://api.kyber.network/sell_rate?id=" +
      address_1 +
      "&qty=1"
  );
  // Parsing the output
  let rates = await ratesRequest.json();
  // Getting the source quantity
  let input_in_eth = rates.data[0].dst_qty

  let ratesRequest_2 = await fetch(
    "https://api.kyber.network/buy_rate?id=" +
      address_2 +
      "&qty=1"
  );
  // Parsing the output
  let rates_2 = await ratesRequest_2.json();
  // Getting the source quantity
  let output_in_eth = rates_2.data[0].src_qty

  return input_in_eth/output_in_eth


};


async function Uniswap(token_1, token_2) {

  
  const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)
  const USDT = new Token(ChainId.MAINNET, '0xdac17f958d2ee523a2206206994597c13d831ec7', 6)
  const USDC = new Token(ChainId.MAINNET, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', 6)
  

  var input;
  var output;
  
  if (token_1 == "DAI") {
    input = DAI;
  } else if (token_1 == "USDT") {
    input = USDT;
  } else if (token_1 == "USDC") {
    input = USDC;
  } 

  if (token_2 == "DAI") {
    output = DAI;
  } else if (token_2 == "USDT") {
    output = USDT;
  } else if (token_2 == "USDC") {
    output = USDC;
  } 
  

  // note that you may want/need to handle this async code differently,
  // for example if top-level await is not an option


  const pair = await Fetcher.fetchPairData(input, output)
  const route = new Route([pair], input)
  
  
  return route.midPrice.toSignificant(6)
}

Pricing("USDC", "DAI")


module.exports = app;
