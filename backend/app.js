

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const UNISWAP = require('@uniswap/sdk')
const ChainId = UNISWAP.ChainId;
const Token = UNISWAP.Token;
const Fetcher = UNISWAP.Fetcher;
const Trade = UNISWAP.Trade;
const Route = UNISWAP.Route;
const TokenAmount = UNISWAP.TokenAmount;
const TradeType = UNISWAP.TradeType;
const WETH = UNISWAP.WETH;

var app = express();

app.get("/data/:token1/:token2", (req, res) => {

  data(req.params.token1, req.params.token2).then(result => {
    // do some processing of result into finalData
    res.json({outputAmount: result});
  });

  
});

async function data(token1, token2) {

  const DAI = new Token(ChainId.MAINNET, '0x6b175474e89094c44da98b954eedeac495271d0f', 18)
  const USDT = new Token(ChainId.MAINNET, '0xdac17f958d2ee523a2206206994597c13d831ec7', 18)
  const USDC = new Token(ChainId.MAINNET, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', 18)
  const TUSD = new Token(ChainId.MAINNET, '0x8dd5fbce2f6a956c3022ba3663759011dd51e73e', 18)

  var input;
  var output;
  
  if (token1 == "DAI") {
    input = DAI;
  } else if (token1 == "USDT") {
    input = USDT;
  } else if (token1 == "USDC") {
    input = USDC;
  } 

  if (token2 == "DAI") {
    output = DAI;
  } else if (token2 == "USDT") {
    output = USDT;
  } else if (token2 == "USDC") {
    output = USDC;
  } 


  // note that you may want/need to handle this async code differently,
  // for example if top-level await is not an option


  const pair = await Fetcher.fetchPairData(output, input)
  const route = new Route([pair], input)

  console.log(pair);
  


  console.log(route.midPrice.toSignificant(6)) // 201.306
  console.log(route.midPrice.invert().toSignificant(6)) // 0.00496756
  
  return route.midPrice.toSignificant(6)
}




module.exports = app;



