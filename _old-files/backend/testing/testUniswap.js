const uniswap = require('../src/exchanges/uniswap');

module.exports = {
  getPriceTest: async (token1, token2, quantity) => {
    console.log('Testing uniswap getPrice...');
    console.log('Token pair: %s to %s', token1.ticker, token2.ticker);
    console.log('Result: ', await uniswap.getPrices(token1, token2, quantity));
    console.log('Completed.\n');
  },
};
