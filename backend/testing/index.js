const testKyber = require('./testKyber');
const testUniswap = require('./testUniswap');
const testZeroX = require('./testZeroX');
const TOKENS = require('../src/shared/tokens');

async function runTests() {

    await testUniswap.getPriceTest(TOKENS.TUSD, TOKENS.DAI, 1);
    await testUniswap.getPriceTest(TOKENS.TUSD, TOKENS.USDC, 1);
    await testUniswap.getPriceTest(TOKENS.TUSD, TOKENS.USDT, 1);

    await testKyber.getPriceTest(TOKENS.TUSD, TOKENS.DAI, 1);
    await testKyber.getPriceTest(TOKENS.TUSD, TOKENS.USDC, 1);
    await testKyber.getPriceTest(TOKENS.TUSD, TOKENS.USDT, 1);

    await testZeroX.getPriceTest(TOKENS.TUSD, TOKENS.DAI, 1);
    await testZeroX.getPriceTest(TOKENS.TUSD, TOKENS.USDC, 1);
    await testZeroX.getPriceTest(TOKENS.TUSD, TOKENS.USDT, 1);

    
    

}

async function basicTests() {
    /* Uniswap Tests */
    await testUniswap.getPriceTest(TOKENS.DAI, TOKENS.USDC, 1);
    await testUniswap.getPriceTest(TOKENS.DAI, TOKENS.USDT, 1);
    await testUniswap.getPriceTest(TOKENS.USDT, TOKENS.USDC, 1);

    /* Kyber Tests */
    await testKyber.getPriceTest(TOKENS.DAI, TOKENS.USDC, 1);
    await testKyber.getPriceTest(TOKENS.DAI, TOKENS.USDT, 1);
    await testKyber.getPriceTest(TOKENS.USDT, TOKENS.USDC, 1);

    /* 0x Tests */

    await testZeroX.getPriceTest(TOKENS.DAI, TOKENS.USDC, 1);
    await testZeroX.getPriceTest(TOKENS.DAI, TOKENS.USDT, 1);
    await testZeroX.getPriceTest(TOKENS.USDT, TOKENS.USDC, 1);
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
