import { useQuery } from 'react-query';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import web3Utils from 'web3-utils';

function handleError(err) {
  // Default message
  let reason = 'Server error';

  // Input out of range
  if (err.message && err.message === 'Cannot divide by 0') {
    reason = 'Input too large';
  }

  // Validation Error
  if (err.response && err.response.data.code === 100) {
    reason = err.response.data.validationErrors[0].reason;
    reason = reason.charAt(0) + reason.slice(1).toLowerCase().replaceAll('_', ' ');
  }

  return reason;
}

async function getPrice(tokenIn, tokenOut, sellAmount) {
  if (!tokenIn || !tokenOut || !sellAmount || sellAmount <= 0) {
    return [];
  }

  try {
    const conversionRate = new BigNumber(`1.0e${tokenIn.decimals}`);
    const converted = new BigNumber(sellAmount).times(conversionRate);

    const params = new URLSearchParams({
      sellToken: tokenIn.symbol,
      buyToken: tokenOut.symbol,
      sellAmount: converted.toFixed(),
    });

    const { data } = await axios.get(
      `${
        process.env.REACT_APP_ENV === 'production'
          ? process.env.REACT_APP_ZEROEX_PROD
          : process.env.REACT_APP_ZEROEX_DEV
      }/swap/v1/price?${params.toString()}`
    );
    const { price, gasPrice, estimatedGas, sources } = data;
    const getDex = data.sources.filter((item) => item.proportion !== '0');
    const inverse = new BigNumber(1).div(new BigNumber(data.price));

    return {
      exchanges: getDex,
      sources: sources.filter((source) => source.proportion !== '0'),
      price,
      inverse: inverse.toFixed(),
      gasPrice: web3Utils.fromWei(gasPrice, 'Gwei'),
      estimatedGas: new BigNumber(estimatedGas).toFormat(),
    };
  } catch (err) {
    return { apiError: handleError(err) };
  }
}

export default function use0xPrice(tokenIn, tokenOut, sellAmount, onError) {
  return useQuery(
    ['price', '0x', tokenIn, tokenOut, sellAmount],
    () => getPrice(tokenIn, tokenOut, sellAmount),
    { onError, retry: 3, retryDelay: (attempt) => attempt * 100 }
  );
}
