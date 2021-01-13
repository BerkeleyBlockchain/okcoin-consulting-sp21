import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  Select,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Tokens from '../constants/tokens';
import use0xPrice from '../hooks/use0xPrice';
import useGas from '../hooks/useGas';
import useKyberPrice from '../hooks/useKyberPrice';
import useUniswapPrice from '../hooks/useUniswapPrice';
import uniswapSwap from '../hooks/useUniswapSwap';
import { midpricesAtom } from '../utils/atoms';

const coins = [
  {
    ticker: 'DAI',
  },
  {
    ticker: 'USDC',
  },
  {
    ticker: 'USDT',
  },
  {
    ticker: 'TUSD',
  },
  {
    ticker: 'KNC',
  },
  {
    ticker: 'WETH',
  },
  {
    ticker: 'COMP',
  },
  {
    ticker: 'BAT',
  },
  {
    ticker: 'LINK',
  },
  {
    ticker: 'MKR',
  },
];

function useCheapestPrice({ uniswap, kyber, zeroX }) {
  const prices = [parseFloat(uniswap), parseFloat(kyber), parseFloat(zeroX)];
  const exchange = ['uniswap', 'kyber', 'zeroX'];
  const i = prices.indexOf(Math.max(...prices));

  return { midprice: prices[i], exchange: exchange[i] };
}

export default function SwapForm({ web3 }) {
  const { register, handleSubmit, watch, setValue, errors } = useForm();
  console.log('🚀 ~ file: SwapForm.js ~ line 61 ~ SwapForm ~ errors', errors);
  const watchFromToken = watch('fromToken', '');
  const watchToToken = watch('toToken', '');
  const watchFromAmount = watch('fromAmount', 0);
  const gas = useGas();
  const [, kyberMidprice] = useKyberPrice(Tokens[watchFromToken], Tokens[watchToToken]);
  const [, uniswapMidprice] = useUniswapPrice(Tokens[watchFromToken], Tokens[watchToToken]);
  const [, zeroXMidprice] = use0xPrice(Tokens[watchFromToken], Tokens[watchToToken]);
  const [midprices, setMidprices] = useAtom(midpricesAtom);

  // eslint-disable-next-line prefer-const
  let { midprice, exchange } = useCheapestPrice(midprices);

  exchange = 'Uniswap'; // HARD CODE EXCHANGE TO USE UNISWAP

  const onSubmit = (data) => {
    const { fromAmount, fromToken, toToken } = data;
    if (!exchange) {
      return;
    }
    // HARD CODE TO USE UNISWAP SWAP
    if (exchange === 'Uniswap') {
      uniswapSwap(Tokens[fromToken], Tokens[toToken], fromAmount, web3);
    } // else if (exchange === 'Kyber') {
    //   kyberSwap(Tokens[fromToken], Tokens[toToken], fromAmount, web3);
    // } else if (exchange === '0x') {
    //   zeroXSwap([fromToken], Tokens[toToken], fromAmount, web3);
    // }
    console.log('🚀 ~ file: SwapForm.jsx ~ line 46 ~ onSubmit ~ Tokens[toToken]', Tokens[toToken]);
    console.log(
      '🚀 ~ file: SwapForm.jsx ~ line 46 ~ onSubmit ~ Tokens[fromToken]',
      Tokens[fromToken]
    );
  };

  useEffect(() => {
    setMidprices({ kyber: kyberMidprice, uniswap: uniswapMidprice, zeroX: zeroXMidprice });
  }, [kyberMidprice, uniswapMidprice, zeroXMidprice]);

  useEffect(() => {
    if (watchFromAmount && watchFromToken && watchToToken) {
      const n = watchFromAmount * midprice;
      setValue('toAmount', n.toFixed(Tokens[watchFromToken].decimals));
    }
    if (!watchFromAmount) {
      setValue('toAmount', '');
    }
    if (!watchFromToken || !watchToToken || watchFromToken === watchToToken) {
      setMidprices({ uniswap: 0, kyber: 0, zeroX: 0 });
    }
  }, [midprice, watchFromAmount, watchFromToken, watchToToken]);

  return (
    <Box py={12} px={12} pb={6} boxShadow="lg">
      <Heading mb={10}>Swap</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text opacity={0.7} mb={2} ml={0.5}>
          PAY
        </Text>
        <Box borderWidth="1px" borderRadius="lg" mb={6}>
          <Flex>
            <Select
              h="52px"
              placeholder="Select"
              name="fromToken"
              size="lg"
              variant="filled"
              ref={register}
            >
              {coins.map(({ ticker }) => (
                <option key={ticker} value={ticker}>
                  {ticker}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Enter Amount"
              name="fromAmount"
              type="number"
              step="0.000000000000000001"
              size="lg"
              ref={register({ required: true })}
              textAlign="end"
              variant="unstyled"
              mr={6}
            />
          </Flex>
        </Box>
        <Text opacity={0.7} mb={2} ml={0.5}>
          RECEIVE
        </Text>
        <Box borderWidth="1px" borderRadius="lg" mb={6}>
          <Flex>
            <Select
              h="52px"
              placeholder="Select"
              name="toToken"
              size="lg"
              variant="filled"
              ref={register({
                validate: (value) => value !== watchFromToken,
              })}
            >
              {coins.map(({ ticker }) => (
                <option key={ticker} value={ticker}>
                  {ticker}
                </option>
              ))}
            </Select>
            <Input
              isReadOnly
              placeholder="To"
              name="toAmount"
              type="number"
              step="0.000000000000000001"
              size="lg"
              ref={register}
              variant="unstyled"
              textAlign="end"
              mr={6}
            />
          </Flex>
        </Box>

        {watchFromToken && watchToToken ? (
          <>
            <Divider mb={3} />
            <Flex>
              <Text>Rate</Text>
              <Spacer />
              <Text>{`1 ${watchFromToken} = ${midprice} ${watchToToken}`}</Text>
            </Flex>
            <Flex>
              <Text>Gas price (gwei)</Text>
              <Spacer />
              <Text>{gas}</Text>
            </Flex>

            <Divider mt={3} />
          </>
        ) : null}
        <Center>
          <Button
            w="100%"
            h="60px"
            _hover={{ backgroundColor: '#194BB6' }}
            backgroundColor="#205FEC"
            color="white"
            size="lg"
            type="submit"
            mt={6}
            mb={10}
            disabled={Object.keys(errors).length !== 0}
          >
            Swap Tokens
          </Button>
        </Center>
        <Text color="tomato">{errors.fromAmount ? 'From Amount is required' : null}</Text>
        <Text color="tomato">{errors.toToken ? 'Cannot swap the same tokens' : null}</Text>
      </form>
    </Box>
  );
}
