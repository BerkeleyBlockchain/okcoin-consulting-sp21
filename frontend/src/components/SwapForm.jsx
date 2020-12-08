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
import useKyberPrice from '../hooks/useKyberPrice';
// import useGas from '../hooks/useGas';
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
  // const gas = useGas();
  const gas = 1;

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
        <Box py={12} px={12} pb={6} boxShadow="2xl" bg="white">
          <Heading mb={6}>Swap</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text opacity={0.7}>PAY</Text>
            <Box borderWidth="1px" borderRadius="lg" mb={6}>
              <Flex>
                <Select
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
                  ref={register}
                  textAlign="end"
                  variant="unstyled"
                  mr={6}
                />
              </Flex>
            </Box>
            <Text opacity={0.7}>RECEIVE</Text>
            <Box borderWidth="1px" borderRadius="lg" mb={6}>
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
                <Divider mb={3} />
                <Flex>
                  <Text>Rate</Text>
                  <Spacer />
                  <Text>{`1 ${watchFromToken} = ${1 / midprice} ${watchToToken}`}</Text>
                </Flex>
                <Flex>
                  <Text>Estimated Gas Fee</Text>
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
                colorScheme="blue"
                backgroundColor="blue.600"
                color="white"
                size="lg"
                type="submit"
                mt={6}
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
