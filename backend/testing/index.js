const testKyber = require('./testKyber');
const testUniswap = require('./testUniswap');
const testZeroX = require('./testZeroX');
const TOKENS = require('../src/shared/tokens');

async function runTests() {

    await testUniswap.getPriceTest(TOKENS.DAI, TOKENS.USDC, 1);
    await testUniswap.getPriceTest(TOKENS.DAI, TOKENS.USDT, 1);
    await testUniswap.getPriceTest(TOKENS.USDT, TOKENS.USDC, 1);
    await testUniswap.getPriceTest(TOKENS.USDT, TOKENS.DAI, 1);
    await testUniswap.getPriceTest(TOKENS.USDC, TOKENS.USDT, 1);
    await testUniswap.getPriceTest(TOKENS.USDC, TOKENS.DAI, 1);

    /* Kyber Tests */
    await testKyber.getPriceTest(TOKENS.DAI, TOKENS.USDC, 1);
    await testKyber.getPriceTest(TOKENS.DAI, TOKENS.USDT, 1);
    await testKyber.getPriceTest(TOKENS.USDT, TOKENS.USDC, 1);
    await testKyber.getPriceTest(TOKENS.USDT, TOKENS.DAI, 1);
    await testKyber.getPriceTest(TOKENS.USDC, TOKENS.USDT, 1);
    await testKyber.getPriceTest(TOKENS.USDC, TOKENS.DAI, 1);

    /* 0x Tests */

    /* 0x getPrice tests */
    // await testZeroX.getPriceTest(TOKENS.DAI, TOKENS.USDC);
    // await testZeroX.getPriceTest(TOKENS.DAI, TOKENS.USDT);
    // await testZeroX.getPriceTest(TOKENS.USDT, TOKENS.USDC);
    // await testZeroX.getPriceTest(TOKENS.USDT, TOKENS.DAI);
    // await testZeroX.getPriceTest(TOKENS.USDC, TOKENS.USDT);
    // await testZeroX.getPriceTest(TOKENS.USDC, TOKENS.DAI);

    /* 0x executeTrade tests */
    // await testZeroX.getExchangeTest(TOKENS.DAI, TOKENS.USDC);
    // await testZeroX.getExchangeTest(TOKENS.DAI, TOKENS.USDT);

    
    

}


async function volumeTests() {
    await testUniswap.getPriceTest(TOKENS.WETH, TOKENS.DAI, 1);
    await testKyber.getPriceTest(TOKENS.WETH, TOKENS.DAI, 1);
    await testZeroX.getPriceTest(TOKENS.WETH, TOKENS.DAI, 1);

    await testUniswap.getPriceTest(TOKENS.WETH, TOKENS.DAI, 100);
    await testKyber.getPriceTest(TOKENS.WETH, TOKENS.DAI, 100);
    await testZeroX.getPriceTest(TOKENS.WETH, TOKENS.DAI, 100);

    await testUniswap.getPriceTest(TOKENS.WETH, TOKENS.DAI, 10000);
    await testKyber.getPriceTest(TOKENS.WETH, TOKENS.DAI, 10000);
    await testZeroX.getPriceTest(TOKENS.WETH, TOKENS.DAI, 10000);
}

runTests();
