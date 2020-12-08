import { Box, Button, Center, Flex, Heading, Input, Select, Text, Divider } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Tokens from '../constants/tokens';
import useKyberPrice from '../hooks/useKyberPrice';
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
  const watchFromToken = watch('fromToken', '');
  const watchToToken = watch('toToken', '');
  const watchFromAmount = watch('fromAmount', 0);
  const [, midprice] = useKyberPrice(Tokens[watchFromToken], Tokens[watchToToken]);
  const onSubmit = (data) => {
    const { fromAmount, fromToken, toToken } = data;
    executeSwap(Tokens[fromToken], Tokens[toToken], parseInt(fromAmount, 10));
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
      const n = watchFromAmount / midprice;
      setValue('toAmount', n.toFixed(Tokens[watchFromToken]?.decimals));
    }
  }, [midprice, watchFromAmount]);

  return (
    <>
      <Center mt={6}>
        <Box bg="gray.300" py={8} px={12} pb={6}>
          <Heading>Swap</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box borderWidth="1px" borderRadius="lg">
              <Flex>
                <Select
                  placeholder="BAL"
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
                  ref={register}
                  textAlign="end"
                  variant="unstyled"
                  mr={6}
                />
              </Flex>
            </Box>
            <Box borderWidth="1px" borderRadius="lg">
              <Flex>
                <Select
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
                <Divider />
                <Text my={3}>{`Price: ${1 / midprice} ${watchFromToken} per ${watchToToken}`}</Text>
                <Divider />
              </>
            )}
            <Center>
              <Button
                w="100%"
                colorScheme="blue"
                backgroundColor="blue.600"
                color="white"
                size="lg"
                type="submit"
                mt={3}
              >
                Review Order
              </Button>
            </Center>
          </form>
        </Box>
      </Center>
    </>
  );
}
