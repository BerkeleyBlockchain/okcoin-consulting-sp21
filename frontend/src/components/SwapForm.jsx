import { Box, Button, Center, Flex, Input, Select, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useKyberPrice from '../hooks/useKyberPrice';
import * as Tokens from '../constants/tokens';
import executeSwap from '../hooks/useKyberSwap';

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
  const { register, handleSubmit, watch, setValue } = useForm();
  /* eslint-disable no-console */
  const watchFromTicker = watch('fromTicker', '');
  const watchToTicker = watch('toTicker', '');
  const watchFromAmount = watch('fromAmount', 0);
  const [, midprice] = useKyberPrice(Tokens[watchFromTicker], Tokens[watchToTicker]);
  const onSubmit = (data) => {
    const { fromAmount, fromTicker, toTicker } = data;
    executeSwap(Tokens[fromTicker], Tokens[toTicker], parseInt(fromAmount, 10));
    console.log(
      '🚀 ~ file: SwapForm.jsx ~ line 46 ~ onSubmit ~ parseInt(data)',
      parseInt(fromAmount, 10)
    );
    console.log(
      '🚀 ~ file: SwapForm.jsx ~ line 46 ~ onSubmit ~ Tokens[toTicker]',
      Tokens[toTicker]
    );
    console.log(
      '🚀 ~ file: SwapForm.jsx ~ line 46 ~ onSubmit ~ Tokens[fromTicker]',
      Tokens[fromTicker]
    );
  };

  useEffect(() => {
    setValue('toAmount', Math.round(watchFromAmount / midprice));
  }, [midprice, watchFromAmount]);

  return (
    <>
      <Center mt={6}>
        <Box bg="gray.700" pt={12} px={12} pb={6} borderRadius={40}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex>
              <Input
                placeholder="From"
                name="fromAmount"
                type="number"
                size="lg"
                ref={register}
                mr={6}
                mb={6}
              />
              <Select
                placeholder="Select a token"
                name="fromTicker"
                size="lg"
                variant="filled"
                ref={register}
              >
                {coins?.map(({ ticker }) => (
                  <option key={ticker} value={ticker}>
                    {ticker}
                  </option>
                ))}
              </Select>
            </Flex>
            <Flex>
              <Input
                placeholder="To"
                name="toAmount"
                type="number"
                size="lg"
                ref={register}
                mr={6}
                mb={6}
              />
              <Select
                placeholder="Select a token"
                name="toTicker"
                size="lg"
                variant="filled"
                ref={register}
              >
                {coins?.map(({ ticker }) => (
                  <option key={ticker} value={ticker}>
                    {ticker}
                  </option>
                ))}
              </Select>
            </Flex>
            {watchFromTicker && watchToTicker && (
              <Text my={3}>{`Price: ${1 / midprice} ${watchFromTicker} per ${watchToTicker}`}</Text>
            )}
            <Center>
              <Button
                colorScheme="blue"
                backgroundColor="blue.600"
                color="white"
                size="lg"
                type="submit"
                /* eslint-disable no-console */
                onClick={() => console.log('Swap!')}
                mt={3}
              >
                Swap
              </Button>
            </Center>
          </form>
        </Box>
      </Center>
    </>
  );
}
