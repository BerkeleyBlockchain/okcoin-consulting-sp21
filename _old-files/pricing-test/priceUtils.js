/* eslint-disable no-console */
const Web3 = require('web3');
const {
  ChainId,
  Price,
  Token,
  WETH,
  Fetcher,
  Trade,
  Route,
  TokenAmount,
  TradeType,
} = require('@uniswap/sdk');
const ethers = require('ethers');
const ContractAddresses = require('./addresses.json');
const CurveSwapABI = require('./abis/curveSwap.json');
const Tokens = require('./tokens.json');

const INFURA = 'https://mainnet.infura.io/v3/72bad8d7710242c193209a2e7ddc19bc';
const web3Provider = new Web3.providers.HttpProvider(INFURA);
const ethersProvider = new ethers.providers.Web3Provider(web3Provider);
const web3 = new Web3(web3Provider);

/**
 * Gets the estimated price (# tokenOut per # tokenIn) as a decimal string
 * @param tokenIn An input token of type defined in constants/tokens.json
 * @param tokenOut An output token of type defined in constants/tokens.json
 * @param amountIn An integer string denoting the amount of `tokenIn` in its smallest unit
 * @param displayDecimals An integer denoting how many decimals to display in the result string
 */
async function uniswapV2EstimatePrice(tokenIn, tokenOut, amountIn, displayDecimals) {
  const ethIn = tokenIn.symbol === 'WETH' || tokenIn.symbol === 'ETH';
  const ethOut = tokenOut.symbol === 'WETH' || tokenOut.symbol === 'ETH';

  // WETH to ETH or ETH to WETH is 1:1
  if (ethIn && ethOut) return '1.000000000000000000';

  const tokenFrom = ethIn
    ? WETH[ChainId.MAINNET]
    : new Token(ChainId.MAINNET, tokenIn.address, tokenIn.decimals);

  const tokenTo = ethOut
    ? WETH[ChainId.MAINNET]
    : new Token(ChainId.MAINNET, tokenOut.address, tokenOut.decimals);

  const pair = await Fetcher.fetchPairData(tokenTo, tokenFrom, ethersProvider);
  const route = new Route([pair], tokenFrom);
  const trade = new Trade(route, new TokenAmount(tokenFrom, amountIn), TradeType.EXACT_INPUT);

  return trade.executionPrice.toFixed(displayDecimals);
}

/**
 * Gets the estimated price (# tokenOut per # tokenIn) as a decimal string
 * @param tokenIn An input token of type defined in constants/tokens.json
 * @param tokenOut An output token of type defined in constants/tokens.json
 * @param amountIn An integer string denoting the amount of `tokenIn` in its smallest unit
 * @param displayDecimals An integer denoting how many decimals to display in the result string
 */
async function curveEstimatePrice(tokenIn, tokenOut, amountIn, displayDecimals) {
  const swapContract = new web3.eth.Contract(CurveSwapABI, ContractAddresses.curveSwap);
  const result = await swapContract.methods
    .get_best_rate(tokenIn.address, tokenOut.address, amountIn)
    .call();

  // Use Uniswap SDK libraries to get rate as a decimal string
  const tokenFrom = new Token(ChainId.MAINNET, tokenIn.address, tokenIn.decimals);
  const tokenTo = new Token(ChainId.MAINNET, tokenOut.address, tokenOut.decimals);
  const amountOut = result[1];

  const price = new Price(tokenFrom, tokenTo, amountIn, amountOut);
  return price.toFixed(displayDecimals);
}

// Test the price functions
async function testAll() {
  const amountIn = '1000000000'; // 1000 USDC
  const tokenIn = Tokens.USDC;
  const tokenOut = Tokens.DAI;
  const displayDecimals = Math.min(tokenIn.decimals, tokenOut.decimals);

  const results = {
    UniswapV2: await uniswapV2EstimatePrice(tokenIn, tokenOut, amountIn, displayDecimals),
    Curve: await curveEstimatePrice(tokenIn, tokenOut, amountIn, displayDecimals),
  };

  console.log(`\nRates for ${tokenIn.symbol} to ${tokenOut.symbol}:`);
  console.log(results);
}

testAll();
