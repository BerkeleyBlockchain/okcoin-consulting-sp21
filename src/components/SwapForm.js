/* eslint-disable no-console */
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
  useToast,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Tokens from '../constants/tokens';
import * as Toasts from '../constants/toasts';
import use0xPrice from '../hooks/use0xPrice';
import useGas from '../hooks/useGas';
import useKyberPrice from '../hooks/useKyberPrice';
import useUniswapPrice from '../hooks/useUniswapPrice';
import uniswapSwap from '../hooks/useUniswapSwap';
import kyberSwap from '../hooks/useKyberSwap';
import zeroXSwap from '../hooks/use0xSwap';
import { midpricesAtom } from '../utils/atoms';

function useCheapestPrice({ uniswap, kyber, zeroX }) {
  const prices = [parseFloat(uniswap), parseFloat(kyber), parseFloat(zeroX)];
  const exchange = ['Uniswap', 'Kyber', '0x'];
  const i = prices.indexOf(Math.max(...prices));

  return { midprice: prices[i], exchange: exchange[i] };
}

export default function SwapForm({ web3, userAuthenticated, pressConnectWallet }) {
  const { register, handleSubmit, watch, setValue, errors } = useForm();
  const watchFromToken = watch('fromToken', '');
  const watchToToken = watch('toToken', '');
  const watchFromAmount = watch('fromAmount', 0);
  const gas = useGas();
  const [, kyberMidprice] = useKyberPrice(Tokens[watchFromToken], Tokens[watchToToken]);
  const [, uniswapMidprice] = useUniswapPrice(Tokens[watchFromToken], Tokens[watchToToken]);
  const { data: zeroXPrices } = use0xPrice(Tokens[watchFromToken], Tokens[watchToToken]);
  const [midprices, setMidprices] = useAtom(midpricesAtom);
  const [isLoading, setIsLoading] = React.useState();
  const toast = useToast();

  // eslint-disable-next-line prefer-const
  let { midprice, exchange } = useCheapestPrice(midprices); // highest midprice = cheapest Price
  exchange = '0x';

  const onSubmit = (data) => {
    const { fromAmount, fromToken, toToken } = data;
    if (!exchange) {
      return;
    }
    setIsLoading(true);

    if (exchange === 'Uniswap') {
      uniswapSwap(Tokens[fromToken], Tokens[toToken], fromAmount, web3)
        .then(() => {
          setIsLoading(false);
          toast(Toasts.success);
        })
        .catch((error) => {
          console.log('Error: ', error);
          setIsLoading(false);
          toast(Toasts.error);
        });
    } else if (exchange === 'Kyber') {
      kyberSwap(Tokens[fromToken], Tokens[toToken], fromAmount, web3)
        .then(() => {
          setIsLoading(false);
          toast(Toasts.success);
        })
        .catch((error) => {
          console.log('Error: ', error);
          setIsLoading(false);
          toast(Toasts.error);
        });
    } else if (exchange === '0x') {
      zeroXSwap(Tokens[fromToken], Tokens[toToken], fromAmount, web3)
        .then(() => {
          setIsLoading(false);
          toast(Toasts.success);
        })
        .catch((error) => {
          console.log('Error: ', error);
          setIsLoading(false);
          toast(Toasts.error);
        });
    }

    console.log('🚀 ~ file: SwapForm.jsx ~ line 46 ~ onSubmit ~ Tokens[toToken]', Tokens[toToken]);
    console.log(
      '🚀 ~ file: SwapForm.jsx ~ line 46 ~ onSubmit ~ Tokens[fromToken]',
      Tokens[fromToken]
    );
  };

  // Used to set global midprices
  useEffect(() => {
    setMidprices({ kyber: kyberMidprice, uniswap: uniswapMidprice, zeroX: zeroXPrices?.midprice });
  }, [kyberMidprice, uniswapMidprice, zeroXPrices]);

  // Used to calculate exchange amount and clear form/global midprices
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

    console.log(midprice);
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
              isReadOnly={isLoading}
            >
              {Object.keys(Tokens).map((t) => (
                <option key={Tokens[t].ticker} value={Tokens[t].ticker}>
                  {Tokens[t].ticker}
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
              isReadOnly={isLoading}
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
              isReadOnly={isLoading}
            >
              {Object.keys(Tokens).map((t) => (
                <option key={Tokens[t].ticker} value={Tokens[t].ticker}>
                  {Tokens[t].ticker}
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
          {userAuthenticated ? (
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
              loadingText="Executing Swap"
              isLoading={isLoading}
            >
              Swap Tokens
            </Button>
          ) : (
            <Button
              w="100%"
              h="60px"
              _hover={{ backgroundColor: '#194BB6' }}
              backgroundColor="#205FEC"
              color="white"
              size="lg"
              mt={6}
              mb={10}
              disabled={Object.keys(errors).length !== 0}
              onClick={pressConnectWallet}
            >
              Connect Wallet
            </Button>
          )}
        </Center>
        <Text color="tomato">{errors.fromAmount ? 'From Amount is required' : null}</Text>
        <Text color="tomato">{errors.toToken ? 'Cannot swap the same tokens' : null}</Text>
      </form>
    </Box>
  );
}
