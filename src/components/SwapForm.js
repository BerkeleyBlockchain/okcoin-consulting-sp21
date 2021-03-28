/* eslint-disable */
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';

import debounce from 'debounce';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';

import { pricesAtom } from '../utils/atoms';
import { estimateAllSwapPrices } from '../utils/getSwapPrice';

import zeroXSwap from '../hooks/use0xSwap';
import use0xPrice from '../hooks/use0xPrice';

import * as Tokens from '../constants/tokens';
import * as Toasts from '../constants/toasts';

import Select from 'react-select';

export default function SwapForm({ web3, userAuthenticated, pressConnectWallet }) {
  const { register, handleSubmit, watch, setValue, errors } = useForm();
  const [isLoading, setIsLoading] = useState();
  const [sellAmount, setSellAmount] = useState();
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [, setPrices] = useAtom(pricesAtom);
  const toast = useToast();

  const watchTokenIn = watch('tokenIn', '');
  const watchTokenOut = watch('tokenOut', '');
  const watchAmountIn = watch('amountIn', 0);

  const defaults = {
    price: '🔄',
    gasPrice: '🔄',
    exchange: '🔄',
    estimatedGas: '🔄',
    sources: [],
  };

  const { data: zeroExQuote } = use0xPrice(Tokens[watchTokenIn], Tokens[watchTokenOut], sellAmount);
  const { price, gasPrice, estimatedGas, exchange } =
    zeroExQuote === undefined ? defaults : zeroExQuote;

  useEffect(() => {
    if (watchAmountIn && watchTokenIn && watchTokenOut && price !== defaults.price) {
      const n = watchAmountIn * price;
      setValue('amountOut', n.toFixed(Tokens[watchTokenOut].decimals));
    }
    if (!watchAmountIn) {
      setValue('amountOut', '');
    }
    if (!watchAmountIn || !watchTokenIn || !watchTokenOut) {
      setPrices({});
    }
  }, [price, watchAmountIn, watchTokenIn, watchTokenOut]);

  useEffect(() => {
    if (!loadingPrices) {
      setPrices({});
      if (sellAmount && watchTokenIn && watchTokenOut) {
        setLoadingPrices(true);
        estimateAllSwapPrices(watchTokenIn, watchTokenOut, sellAmount).then((values) => {
          setPrices(values);
          setLoadingPrices(false);
        });
      }
    }
  }, [sellAmount, watchTokenIn, watchTokenOut]);

  //Display tokens
  var tokenArray = new Array(Object.keys(Tokens).length);
  var count = 0;

for (var key in Tokens) {
    tokenArray[count] = {value: Tokens[key].ticker, label:Tokens[key].ticker, icon: "public/static/token-icons/128/sushi.png"}
    count++;
}


  // Execute the swap
  const onSubmit = (data) => {
    const { amountIn, tokenIn, tokenOut } = data;
    setIsLoading(true);

    zeroXSwap(Tokens[tokenIn], Tokens[tokenOut], amountIn, web3)
      .then(() => {
        setIsLoading(false);
        toast(Toasts.success);
      })
      .catch(() => {
        setIsLoading(false);
        toast(Toasts.error);
      });
  };

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
          styles= {{
            menu: (provided, state) => ({
              ...provided,
              width: 150,
              
              margin: 0
            }),
          
            control: (_, { selectProps: { width }}) => ({
              width: 170,
              height: 52,
              display: 'flex',
              flexDirection: 'row',
            }),
          
            singleValue: (provided, state) => {
              const opacity = state.isDisabled ? 0.5 : 1;
              const transition = 'opacity 300ms';
          
              return { ...provided, opacity, transition };
            }
          }}
          options={tokenArray} />
            <Input
              placeholder="Enter Amount"
              name="amountIn"
              type="number"
              step="0.000000000000000001"
              size="lg"
              ref={register({ required: true })}
              textAlign="end"
              variant="unstyled"
              mr={6}
              isReadOnly={isLoading}
              onChange={debounce((event) => setSellAmount(event.target.value), 1500)}
            />
          </Flex>
        </Box>
        <Text opacity={0.7} mb={2} ml={0.5}>
          RECEIVE
        </Text>
        <Box borderWidth="1px" borderRadius="lg" mb={6}>
          <Flex>

          <Select 
          
          styles= {{
            menu: (provided, state) => ({
              ...provided,
              width: 150,
              borderBottom: '1px dotted pink',
              color: state.selectProps.menuColor,
              padding: 0,
            }),
          
            control: (_, { selectProps: { width }}) => ({
              width: 170,
              height: 52,
              display: 'flex',
              flexDirection: 'row'
            }),
          
            singleValue: (provided, state) => {
              const opacity = state.isDisabled ? 0.5 : 1;
              const transition = 'opacity 300ms';
          
              return { ...provided, opacity, transition };
            }
          }}
          options={tokenArray} />
            
            <Input
              isReadOnly
              placeholder="To"
              name="amountOut"
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

        {watchTokenIn && watchTokenOut && watchAmountIn && price ? (
          <>
            <Divider mb={3} />
            <Flex>
              <Text>Rate</Text>
              <Spacer />
              <Text>{`1 ${watchTokenIn} = ${price} ${watchTokenOut}`}</Text>
            </Flex>
            <Flex>
              <Text>Dex Used</Text>
              <Spacer />
              <Text style={{ fontWeight: 'bold' }}>{exchange}</Text>
            </Flex>
            <Flex>
              <Text>Gas price</Text>
              <Spacer />
              <Text>{gasPrice} Gwei</Text>
            </Flex>
            <Flex>
              <Text>Gas estimate</Text>
              <Spacer />
              <Text>{estimatedGas}</Text>
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
        <Text color="tomato">{errors.amountIn ? 'Input amount is required' : null}</Text>
        <Text color="tomato">{errors.tokenOut ? 'Cannot swap to the same token' : null}</Text>
      </form>
    </Box>
  );
}
