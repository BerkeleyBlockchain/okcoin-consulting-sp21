const testKyber = require('./testKyber');
const testUniswap = require('./testUniswap');
const testZeroX = require('./testZeroX');
const TOKENS = require('../src/shared/tokens');

async function runTests() {

    /* Uniswap Tests */
    await testUniswap.getPriceTest(TOKENS.DAI, TOKENS.USDC);
    await testUniswap.getPriceTest(TOKENS.DAI, TOKENS.USDT);
    await testUniswap.getPriceTest(TOKENS.USDT, TOKENS.USDC);
    await testUniswap.getPriceTest(TOKENS.USDT, TOKENS.DAI);
    await testUniswap.getPriceTest(TOKENS.USDC, TOKENS.USDT);
    await testUniswap.getPriceTest(TOKENS.USDC, TOKENS.DAI);

    /* Kyber Tests */
    await testKyber.getPriceTest(TOKENS.DAI, TOKENS.USDC);
    await testKyber.getPriceTest(TOKENS.DAI, TOKENS.USDT);
    await testKyber.getPriceTest(TOKENS.USDT, TOKENS.USDC);
    await testKyber.getPriceTest(TOKENS.USDT, TOKENS.DAI);
    await testKyber.getPriceTest(TOKENS.USDC, TOKENS.USDT);
    await testKyber.getPriceTest(TOKENS.USDC, TOKENS.DAI);

    /* 0x Tests */

    /* 0x getPrice tests */
    await testZeroX.getPriceTest(TOKENS.DAI, TOKENS.USDC);
    await testZeroX.getPriceTest(TOKENS.DAI, TOKENS.USDT);
    await testZeroX.getPriceTest(TOKENS.USDT, TOKENS.USDC);
    await testZeroX.getPriceTest(TOKENS.USDT, TOKENS.DAI);
    await testZeroX.getPriceTest(TOKENS.USDC, TOKENS.USDT);
    await testZeroX.getPriceTest(TOKENS.USDC, TOKENS.DAI);

    /* 0x executeTrade tests */
    await testZeroX.executeTrade(TOKENS.DAI, TOKENS.USDC);
    await testZeroX.executeTrade(TOKENS.DAI, TOKENS.USDT);

}

runTests();
