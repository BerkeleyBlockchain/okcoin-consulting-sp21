import {
  Spacer,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  Divider,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Tokens from '../constants/tokens';
import useUniswapPrice from '../hooks/useUniswapPrice';
import useKyberPrice from '../hooks/useKyberPrice';
import use0xPrice from '../hooks/use0xPrice';
import useGas from '../hooks/useGas';
import uniswapSwap from '../hooks/useUniswapSwap';
import kyberSwap from '../hooks/useKyberSwap';
import zeroXSwap from '../hooks/use0xSwap';
import useCheapestPrice from '../hooks/useCheapestPrice';

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
    ticker: 'CDAI',
  },
  {
    ticker: 'ADAI',
  },
];

export default function SwapForm() {
  const { register, handleSubmit, watch, setValue, errors } = useForm();
  const watchFromToken = watch('fromToken', '');
  const watchToToken = watch('toToken', '');
  const watchFromAmount = watch('fromAmount', 0);
  const [, uniswapMidprice] = useUniswapPrice(Tokens[watchFromToken], Tokens[watchToToken]);
  const [, kyberMidprice] = useKyberPrice(Tokens[watchFromToken], Tokens[watchToToken]);
  const [, zeroXMidprice] = use0xPrice(Tokens[watchFromToken], Tokens[watchToToken]);
  const gas = useGas();
  const exchange = useCheapestPrice(Tokens[watchFromToken], Tokens[watchToToken]);
  const midprice = {
    Uniswap: uniswapMidprice,
    Kyber: kyberMidprice,
    '0x': zeroXMidprice,
  }[exchange];

  console.log('🚀 ~ file: SwapForm.jsx ~ line 56 ~ SwapForm ~ exchange', exchange);

  const onSubmit = (data) => {
    const { fromAmount, fromToken, toToken } = data;
    if (!exchange) {
      return;
    }
    if (exchange === 'Uniswap') {
      uniswapSwap(Tokens[fromToken], Tokens[toToken], fromAmount);
    } else if (exchange === 'Kyber') {
      kyberSwap(Tokens[fromToken], Tokens[toToken], fromAmount);
    } else if (exchange === '0x') {
      zeroXSwap([fromToken], Tokens[toToken], fromAmount);
    }
    console.log(
      '🚀 ~ file: SwapForm.jsx ~ line 46 ~ onSubmit ~ parseInt(data)',
      parseInt(fromAmount, 10)
    );
    console.log('🚀 ~ file: SwapForm.jsx ~ line 46 ~ onSubmit ~ Tokens[toToken]', Tokens[toToken]);
    console.log(
      '🚀 ~ file: SwapForm.jsx ~ line 46 ~ onSubmit ~ Tokens[fromToken]',
      Tokens[fromToken]
    );
  };

  useEffect(() => {
    if (watchFromAmount && watchFromToken && watchToToken) {
      const n = watchFromAmount * midprice;
      setValue('toAmount', n.toFixed(Tokens[watchFromToken]?.decimals));
    }
    if (!watchFromAmount) {
      setValue('toAmount', '');
    }
  }, [midprice, watchFromAmount]);

  return (
    <>
      <Center mt={6}>
        <Box py={12} px={12} pb={6} boxShadow="lg" bg="white">
          <Heading mb={10}>Swap</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text opacity={0.7} mb={2} ml={0.5}>
              PAY
            </Text>
            <Box borderWidth="1px" borderRadius="lg" mb={6}>
              <Flex>
                <Select
                  h="52px"
                  placeholder="Select Token"
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
                  placeholder="Select a token"
                  name="toToken"
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

            {watchFromToken && watchToToken && (
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

                {/* <Text my={3}>{`Price: ${1 / midprice} ${watchFromToken} per ${watchToToken}`}</Text> */}
                <Divider mt={3} />
              </>
            )}
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
              >
                Swap Tokens
              </Button>
            </Center>
            <Text color="tomato">{errors.fromAmount && 'From Amount is required'}</Text>
          </form>
        </Box>
      </Center>
    </>
  );
}
