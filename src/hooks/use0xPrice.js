import { useQuery } from 'react-query';
import axios from 'axios';
import BD from 'js-big-decimal';
import Web3 from 'web3';

const getPrice = async (tokenIn, tokenOut, sellAmount) => {
  if (!tokenIn || !tokenOut || !sellAmount || sellAmount <= 0) {
    return [];
  }

  try {
    const conversionRate = new BD(`1.0e${tokenIn.decimals}`);
    const converted = new BD(sellAmount).multiply(conversionRate);

    const params = new URLSearchParams({
      sellToken: tokenIn.symbol,
      buyToken: tokenOut.symbol,
      sellAmount: converted.getValue(),
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
    const inverse = new BD(1).divide(new BD(data.price));

    return {
      exchanges: getDex,
      sources: sources.filter((source) => source.proportion !== '0'),
      price,
      inverse: inverse.getValue(),
      gasPrice: Web3.utils.fromWei(gasPrice, 'Gwei'),
      estimatedGas: new BD(estimatedGas).getPrettyValue(),
    };
  } catch (err) {
    if (err.message && err.message === 'Cannot divide by 0') {
      return {
        apiError: 'INPUT_TOO_LARGE',
      };
    }
    return {
      apiError: err.response.data.validationErrors[0].reason,
    };
  }
};

export default function use0xPrice(tokenIn, tokenOut, sellAmount, onError) {
  return useQuery(
    ['price', '0x', tokenIn, tokenOut, sellAmount],
    () => getPrice(tokenIn, tokenOut, sellAmount),
    { onError, retry: 3, retryDelay: (attempt) => attempt * 100 }
  );
}
