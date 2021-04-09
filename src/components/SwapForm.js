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
  Tooltip,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { IoAlertCircle } from 'react-icons/io5';
import debounce from 'debounce';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';

import Select from 'react-select';

import FullPageSpinner from './FullPageSpinner';

import zeroXSwap from '../hooks/use0xSwap';
import use0xPrice from '../hooks/use0xPrice';

import Tokens from '../constants/tokens';
import Toasts from '../constants/toasts';
import Exchanges from '../constants/exchanges';

export default function SwapForm({ web3, onboard, wallet }) {
  const { register, handleSubmit, watch, setValue, errors, control } = useForm();

  const [isLoading, setIsLoading] = useState();
  const [sellAmount, setSellAmount] = useState();
  const toast = useToast();

  const watchTokenIn = watch('tokenIn', '');
  const watchTokenOut = watch('tokenOut', '');
  const watchAmountIn = watch('amountIn', 0);

  const defaults = {
    price: '🔄',
    gasPrice: '🔄',
    exchanges: '🔄',
    estimatedGas: '🔄',
    sources: [],
  };

  const { data: zeroExQuote } = use0xPrice(
    Tokens.data[watchTokenIn.value],
    Tokens.data[watchTokenOut.value],
    sellAmount
  );
  const { price, gasPrice, estimatedGas, exchanges } =
    zeroExQuote === undefined ? defaults : zeroExQuote;

  // display tokens
  const tokenArray = new Array(Tokens.tokens.length);

  for (let i = 0; i < tokenArray.length; i += 1) {
    tokenArray[i] = {
      value: Tokens.tokens[i],
      label: Tokens.tokens[i],
      icon: 'public/static/token-icons/128/sushi.png',
    };
  }

  useEffect(() => {
    if (watchAmountIn && watchTokenIn && watchTokenOut && price !== defaults.price) {
      const n = watchAmountIn * price;
      setValue('amountOut', n.toFixed(Tokens.data[watchTokenOut.value].decimals));
    }
    if (!watchAmountIn) {
      setValue('amountOut', '');
    }
  }, [price, watchAmountIn, watchTokenIn, watchTokenOut]);

  async function readyToTransact() {
    if (!wallet.provider) {
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

    zeroXSwap(Tokens.data[tokenIn.label], Tokens.data[tokenOut.label], amountIn, web3)
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
  console.log(exchanges);
  if (!onboard) {
    return <FullPageSpinner />;
  }
  return (
    <Box py={12} px={12} pb={6} boxShadow="lg" bgColor="#fff" borderRadius={10}>
      <Heading fontFamily="Poppins" fontWeight="700" mb={10}>
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
                      width: 170,
                      height: 52,
                      display: 'flex',
                      flexDirection: 'row',
                      marginLeft: 6,
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
                  options={tokenArray}
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
                      width: 170,
                      height: 52,
                      display: 'flex',
                      flexDirection: 'row',
                      marginLeft: 6,
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
                  options={tokenArray}
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
          <>
            <Divider mb={3} />
            <Flex>
              <Text fontFamily="Poppins" fontWeight="600">
                Rate
              </Text>
              <Spacer />
              <Text fontFamily="Poppins">{`1 ${watchTokenIn.value} = ${price} ${watchTokenOut.value}`}</Text>
            </Flex>
            <Flex>
              <Text fontFamily="Poppins" fontWeight="600">
                Source
              </Text>
              <Spacer />
              {typeof exchanges === 'object' ? (
                <>
                  <Text fontFamily="Poppins" style={{ fontWeight: 'bold' }}>
                    {exchanges.length === 1
                      ? Exchanges.data[exchanges[0].name].name
                      : 'Split Routing'}
                  </Text>
                  <Tooltip
                    hasArrow
                    bgColor="#333333"
                    padding="10px"
                    label={
                      typeof exchanges === 'object' &&
                      exchanges
                        .sort((a, b) => parseFloat(b.proportion) - parseFloat(a.proportion))
                        .map((item) => (
                          <Flex alignItems="center">
                            <Image
                              src={Exchanges.data[item.name].iconSVG}
                              alt={item.name}
                              width="25px"
                              height="25px"
                              m={1}
                            />
                            <Text
                              style={{ fontWeight: 'bold', marginLeft: 5, fontFamily: 'Poppins' }}
                            >
                              {Exchanges.data[item.name].name}
                              {` (${parseFloat(item.proportion * 100).toFixed(2)}%)`}
                            </Text>
                          </Flex>
                        ))
                    }
                    placement="bottom"
                  >
                    <IconButton
                      variant="outline"
                      isRound
                      borderColor="transparent"
                      size="xs"
                      icon={<IoAlertCircle size="20" />}
                    />
                  </Tooltip>
                </>
              ) : (
                <Text fontFamily="Poppins">{defaults.exchanges}</Text>
              )}
            </Flex>
            <Flex>
              <Text fontFamily="Poppins" fontWeight="600">
                Gas Price
              </Text>
              <Spacer />
              <Text fontFamily="Poppins">{gasPrice} Gwei</Text>
            </Flex>
            <Flex>
              <Text fontFamily="Poppins" fontWeight="600">
                Gas Estimate
              </Text>
              <Spacer />
              <Text fontFamily="Poppins">{estimatedGas}</Text>
            </Flex>

            <Divider mt={3} />
          </>
        ) : null}

        <Center>
          {wallet.provider ? (
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
              fontFamily="Poppins"
              fontWeight="600"
              disabled={Object.keys(errors).length !== 0}
              onClick={() => onboard.walletSelect()}
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
