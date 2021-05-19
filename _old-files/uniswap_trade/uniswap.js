const {
  ChainId,
  TradeType,
  WETH,
  Fetcher,
  Percent,
  Route,
  Token,
  TokenAmount,
  Trade,
} = require('@uniswap/sdk');
const IUniswapV2Router02 = require('@uniswap/v2-periphery/build/IUniswapV2Router02.json');
const ethers = require('ethers');

// Make DAI to ETH swap
const swap = async () => {
  // get information from the sdk

  const DAI = new Token(ChainId.ROPSTEN, '0xad6d458402f60fd3bd25163575031acdce07538d', 18);
  const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);
  const route = new Route([pair], WETH[DAI.chainId]);
  const amountIn = '500000000000000000'; // 0.5 WETH
  const trade = new Trade(
    route,
    new TokenAmount(WETH[DAI.chainId], amountIn),
    TradeType.EXACT_INPUT
  );

  console.log(`ETH to DAI midprice: ${route.midPrice.toSignificant(6)}`);
  console.log(`DAI to ETH midprice: ${route.midPrice.invert().toSignificant(6)}`);
  console.log(`ETH to DAI execution price: ${trade.executionPrice.toSignificant(6)}`);
  console.log(`ETH to DAI next midprice: ${trade.nextMidPrice.toSignificant(6)}`);

  const slippageTolerance = new Percent('50', '10000'); // 50 bips, or 0.50%

  const amountOutMin = ethers.BigNumber.from(
    trade.minimumAmountOut(slippageTolerance).raw.toString()
  ); // needs to be converted to e.g. hex
  const path = [WETH[DAI.chainId].address, DAI.address];
  const to = '0x2d6b76f1ba6EcBb9d04e17683d26F93d0dd8D6b2'; // test ropsten account, should be a checksummed recipient address
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
  const value = ethers.BigNumber.from(trade.inputAmount.raw.toString()); // // needs to be converted to e.g. hex

  // make the transaction

  const provider = ethers.getDefaultProvider('ropsten', {
    infura: 'https://ropsten.infura.io/v3/b2e13b0a648e4c67b4a36951f5b1ed62',
  });

  const PRIVATE_KEY = '0x267a6757fae4e1c2151e16f27027ce7be27c0ec98158cb4b2abbf736c0e5259a'; // Ropsten test private key
  const signer = new ethers.Wallet(PRIVATE_KEY);
  const account = signer.connect(provider);
  const uniswap = new ethers.Contract(
    '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Ropsten contract
    IUniswapV2Router02.abi,
    account
  );

  const gasPrice = await provider.getGasPrice();
  const tx = await uniswap.swapETHForExactTokens(amountOutMin, path, to, deadline, {
    value,
    gasPrice: gasPrice,
    gasLimit: ethers.BigNumber.from(300000),
  });
  console.log(`Transaction hash: ${tx.hash}`);

  const receipt = await tx.wait();
  console.log(`Transaction was mined in block ${receipt.blockNumber}`);
};

swap();
