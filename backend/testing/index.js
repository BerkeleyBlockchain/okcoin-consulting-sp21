const testKyber = require('./testUniswap');
const testUniswap = require('./testUniswap');
const testZeroX = require('./testUniswap');
const TOKENS = require('../src/shared/tokens');

async function runTests() {

    /* Uniswap Tests */
    await testUniswap.getPriceTest(TOKENS.DAI, TOKENS.USDC);
    await testUniswap.getPriceTest(TOKENS.DAI, TOKENS.USDT);
    await testUniswap.getPriceTest(TOKENS.USDT, TOKENS.USDC);

    /* Kyber Tests */

    /* 0x Tests */

}

runTests();
