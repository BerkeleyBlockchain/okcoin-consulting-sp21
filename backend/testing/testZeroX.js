const zeroX = require('../src/exchanges/ox');

module.exports = {

  getPriceTest: async (token1, token2) => {
    console.log('Testing 0x getPrice...');
    console.log('Token pair: %s to %s', token1.ticker, token2.ticker);
    console.log('Result: ', await zeroX.getPrices(token1, token2));
    console.log('Completed.\n'); 
  },

  getExchangeTest: async (token1, token2) => {
    console.log('Testing 0x executeTrade');
    console.log('Result: ', await zeroX.executeTrade(token1, token2, 10000000000));
    console.log('Completed.\n'); 
  }

}
