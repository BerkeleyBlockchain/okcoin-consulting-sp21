/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  Spinner,
  IconButton,
} from '@chakra-ui/react';
import { IoSwapVertical } from 'react-icons/io5';
import debounce from 'debounce';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';

import Select, { components } from 'react-select';
import FullPageSpinner from '../FullPageSpinner';

import zeroXSwap from '../../hooks/use0xSwap';
import use0xPrice from '../../hooks/use0xPrice';

import Tokens from '../../constants/tokens';
import Toasts from '../../constants/toasts';

import { getTokenIconPNG32 } from '../../utils/getTokenIcon';
import SwapInfo from './SwapInfo';

function useForceUpdate() {
  const [, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

export default function SwapForm({ onboardState, web3, onboard }) {
  const { register, handleSubmit, watch, setValue, getValues, errors, control } = useForm();

  const [isLoading, setIsLoading] = useState();
  const [sellAmount, setSellAmount] = useState();
  const toast = useToast();

  const watchTokenIn = watch('tokenIn', '');
  const watchTokenOut = watch('tokenOut', '');
  const watchAmountIn = watch('amountIn', 0);

  const forceUpdate = useForceUpdate();

  const defaults = {
    price: <Spinner size="xs" />,
    gasPrice: <Spinner size="xs" />,
    exchanges: <Spinner size="xs" />,
    estimatedGas: <Spinner size="xs" />,
    sources: [],
  };

  const { data: zeroExQuote } = use0xPrice(
    Tokens.data[watchTokenIn.value],
    Tokens.data[watchTokenOut.value],
    sellAmount
  );

  const { price, gasPrice, estimatedGas, exchanges } =
    zeroExQuote === undefined ? defaults : zeroExQuote;

  useEffect(() => {
    if (watchAmountIn && watchTokenIn && watchTokenOut && price !== defaults.price) {
      const n = watchAmountIn * price;
      setValue('amountOut', n.toFixed(6).replace(/\.0+/, ''));
    }
    if (!watchAmountIn) {
      setValue('amountOut', '');
    }
  }, [price, watchAmountIn, watchTokenIn, watchTokenOut]);

  async function readyToTransact() {
    if (!onboardState.address) {
      const walletSelected = await onboard.walletSelect();
      if (!walletSelected) return false;
    }

    const ready = await onboard.walletCheck();
    return ready;
  }

  // Execute the swap
  const onSubmit = async (data) => {
    const ready = await readyToTransact();
    if (!ready) return;

    const { amountIn, tokenIn, tokenOut } = data;
    setIsLoading(true);

    zeroXSwap(Tokens.data[tokenIn.value], Tokens.data[tokenOut.value], amountIn, web3)
      .then(() => {
        setIsLoading(false);
        toast(Toasts.success);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        toast(Toasts.error);
      });
  };

  if (!onboard) {
    return <FullPageSpinner />;
  }

  // display tokens
  const tokenArray = Tokens.tokens.map((symbol) => ({
    value: symbol,
    label: symbol,
    icon: getTokenIconPNG32(symbol),
  }));

  const { Option, SingleValue } = components;
  const IconOption = (props) => {
    const { data } = props;
    return (
      <Option {...props}>
        <HStack>
          <img src={data.icon} defaultsource={data.icon} alt={data.label} />
          <Text>{data.label}</Text>
        </HStack>
      </Option>
    );
  };

  const ValueOption = (props) => {
    const { data } = props;
    return (
      <SingleValue {...props}>
        <HStack>
          <img src={data.icon} defaultsource={data.icon} alt={data.label} />
          <Text>{data.label}</Text>
        </HStack>
      </SingleValue>
    );
  };

  return (
    <Box py={10} px={8} pb={0} boxShadow="lg" bgColor="#fff" borderRadius={30}>
      <Heading fontFamily="Poppins" fontWeight="700" color="gray.700" mb={10}>
        Swap
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontFamily="Poppins" opacity={0.7} mb={2} ml={0.5}>
          PAY
        </Text>
        <Box borderWidth="1px" borderRadius="lg" mb={6}>
          <Flex>
            <Controller
              name="tokenIn"
              control={control}
              render={({ onChange, name, value, ref }) => (
                <Select
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      width: 150,
                      margin: 0,
                      fontFamily: 'Poppins',
                      fontWeight: '600',
                    }),

                    dropdownIndicator: (provided) => ({
                      ...provided,
                      color: '#A0AEBF',
                    }),

                    control: () => ({
                      width: 160,
                      height: 52,
                      display: 'flex',
                      flexDirection: 'row',
                      marginLeft: 4,
                      color: '#A0AEBF',
                      fontFamily: 'Poppins',
                      fontWeight: '600',
                    }),

                    placeholder: (provided) => ({
                      ...provided,
                      color: '#A0AEBF',
                      fontSize: 19,
                      marginTop: 1,
                      fontWeight: '400',
                    }),

                    singleValue: (provided, state) => {
                      const opacity = state.isDisabled ? 0.5 : 1;
                      const transition = 'opacity 300ms';

                      return { ...provided, opacity, transition };
                    },
                  }}
                  options={tokenArray.filter((item) => item.value !== watchTokenOut.value)}
                  components={{ Option: IconOption, SingleValue: ValueOption }}
                  inputRef={ref}
                  value={value}
                  name={name}
                  onChange={onChange}
                />
              )}
            />

            <Input
              placeholder="Enter Amount"
              name="amountIn"
              type="number"
              pattern="\d*\.?\d+"
              fontFamily="Poppins"
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
        <Center mt={6}>
          <IconButton
            variant="outline"
            isRound
            borderColor="transparent"
            size="xs"
            icon={<IoSwapVertical size="20" opacity={0.7} />}
            onClick={() => {
              const values = getValues();
              setValue('amountIn', values.amountOut);
              setValue('amountOut', '');
              setValue('tokenIn', values.tokenOut);
              setValue('tokenOut', values.tokenIn);
              forceUpdate();
            }}
          />
        </Center>
        <Text fontFamily="Poppins" opacity={0.7} mb={2} ml={0.5}>
          RECEIVE
        </Text>
        <Box borderWidth="1px" borderRadius="lg" mb={6}>
          <Flex>
            <Controller
              name="tokenOut"
              control={control}
              render={({ onChange, name, value, ref }) => (
                <Select
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      width: 150,
                      margin: 0,
                      fontFamily: 'Poppins',
                      fontWeight: '600',
                    }),

                    dropdownIndicator: (provided) => ({
                      ...provided,
                      color: '#A0AEBF',
                    }),

                    control: () => ({
                      width: 160,
                      height: 52,
                      display: 'flex',
                      flexDirection: 'row',
                      marginLeft: 4,
                      color: '#A0AEBF',
                      fontFamily: 'Poppins',
                      fontWeight: '600',
                    }),

                    placeholder: (provided) => ({
                      ...provided,
                      color: '#A0AEBF',
                      fontSize: 19,
                      marginTop: 1,
                      fontWeight: '400',
                    }),

                    singleValue: (provided, state) => {
                      const opacity = state.isDisabled ? 0.5 : 1;
                      const transition = 'opacity 300ms';

                      return { ...provided, opacity, transition };
                    },
                  }}
                  options={tokenArray.filter((item) => item.value !== watchTokenIn.value)}
                  components={{ Option: IconOption, SingleValue: ValueOption }}
                  inputRef={ref}
                  value={value}
                  name={name}
                  onChange={onChange}
                />
              )}
            />

            <Input
              isReadOnly
              placeholder="To"
              name="amountOut"
              type="number"
              step="0.000000000000000001"
              fontFamily="Poppins"
              size="lg"
              ref={register}
              variant="unstyled"
              textAlign="end"
              mr={6}
            />
          </Flex>
        </Box>
        {watchTokenIn && watchTokenOut && watchAmountIn && price ? (
          <SwapInfo
            watchTokenIn={watchTokenIn}
            watchTokenOut={watchTokenOut}
            price={price}
            defaults={defaults}
            exchanges={exchanges}
            gasPrice={gasPrice}
            estimatedGas={estimatedGas}
          />
        ) : null}
        <Center>
          {onboardState.address ? (
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
              disabled={isLoading || Object.keys(errors).length !== 0}
              loadingText="Executing Swap"
              fontFamily="Poppins"
              fontWeight="600"
              isLoading={isLoading}
            >
              {errors.amountIn ? 'Input Amount required' : 'Swap Tokens'}
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
              fontFamily="Poppins"
              fontWeight="600"
              disabled={Object.keys(errors).length !== 0}
              onClick={() => readyToTransact()}
            >
              Connect Wallet
            </Button>
          )}
        </Center>
        {/* <Text color="tomato">{errors.amountIn ? 'Input amount is required' : null}</Text> */}
      </form>
    </Box>
  );
}
