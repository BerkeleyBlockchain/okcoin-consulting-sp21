const kyber = require('../src/exchanges/kyber');

module.exports = {

  getPriceTest: async (token1, token2, quantity) => {
    console.log('Testing kyber getPrice...');
    console.log('Token pair: %s to %s', token1.ticker, token2.ticker);
    console.log('Result: ', await kyber.getPrices(token1, token2, quantity));
    console.log('Completed.\n'); 

  }

}
