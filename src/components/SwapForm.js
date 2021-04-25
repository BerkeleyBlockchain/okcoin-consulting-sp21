/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  VStack,
  Input,
  Spacer,
  Text,
  useToast,
  Tooltip,
  Image,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import { IoAlertCircle } from 'react-icons/io5';
import debounce from 'debounce';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';

import BigNumber from 'bignumber.js';

import Select, { components } from 'react-select';
import FullPageSpinner from './FullPageSpinner';

import zeroXSwap from '../hooks/use0xSwap';
import use0xPrice from '../hooks/use0xPrice';

import Tokens from '../constants/tokens';
import Toasts from '../constants/toasts';
import Exchanges from '../constants/exchanges';

import { getTokenIconPNG32 } from '../utils/getTokenIcon';
import { tokenBalanceCheck, getTokenBalance } from '../utils/queryBalance';

export default function SwapForm({ onboardState, web3, onboard, balance }) {
  const { register, handleSubmit, watch, setValue, errors, control } = useForm();

  const [isLoading, setIsLoading] = useState();
  const [sellAmount, setSellAmount] = useState();
  const [tokenBalance, setTokenBalance] = useState();
  const toast = useToast();

  const watchTokenIn = watch('tokenIn', '');
  const watchTokenOut = watch('tokenOut', '');
  const watchAmountIn = watch('amountIn', 0);

  const defaults = {
    price: <Spinner size="xs" />,
    gasPrice: <Spinner size="xs" />,
    exchanges: <Spinner size="xs" />,
    estimatedGas: <Spinner size="xs" />,
    sources: [],
    tokenBalance: <Spinner size="xs" />,
  };

  const { data: zeroExQuote } = use0xPrice(
    Tokens.data[watchTokenIn.value],
    Tokens.data[watchTokenOut.value],
    sellAmount
  );

  const { price, gasPrice, estimatedGas, exchanges } =
    zeroExQuote === undefined ? defaults : zeroExQuote;

  async function handleDropdownSelect(token) {
    let tokenBal;
    if (onboardState && balance) {
      console.log(balance);
      console.log(onboardState);
      const balanceData = {
        wallet: {
          provider: onboardState.wallet.provider,
        },
        address: onboardState.address,
        BigNumber,
        ethAmount: web3.utils.fromWei(balance.toString(), 'ether'),
      };
      tokenBal = await getTokenBalance(token)(balanceData).then((res) => {
        return res;
      });
      console.log(token, tokenBal);
    }
    return tokenBal;
  }

  useEffect(() => {
    if (watchAmountIn && watchTokenIn && watchTokenOut && price !== defaults.price) {
      (async () => {
        const tb = await handleDropdownSelect(watchTokenIn.value).then((res) => {
          return res;
        });
        setTokenBalance(tb.toNumber());
      })();
      const n = watchAmountIn * price;
      setValue('amountOut', n.toFixed(6));
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
    console.log(onboard);
    console.log(onboardState);
    const balanceData = {
      wallet: {
        provider: onboardState.wallet.provider,
      },
      address: onboardState.address,
      BigNumber,
      ethAmount: web3.utils.fromWei(balance, 'ether'),
    };
    const walletBalanceResult = await tokenBalanceCheck(
      watchTokenIn.value,
      watchAmountIn
    )(balanceData).then((res) => {
      return res;
    });
    console.log(walletBalanceResult);
    if (walletBalanceResult.result === false) {
      console.log('false');
      toast(walletBalanceResult.balanceFailure);
      return false;
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
    // const bal = handleDropdownSelect(data.label).then((res) => {
    //   return res;
    // });
    // console.log(bal); // returns empty array
    return (
      <Option {...props}>
        <HStack>
          <img src={data.icon} defaultSource={data.icon} alt={data.label} />
          <VStack>
            <Text>{data.label}</Text>
            <Text fontSize="xs">HIHI</Text>
          </VStack>
        </HStack>
      </Option>
    );
  };

  const ValueOption = (props) => {
    const { data } = props;
    return (
      <SingleValue {...props}>
        <HStack>
          <img src={data.icon} defaultSource={data.icon} alt={data.label} />
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
        <Flex direction="row" justify="space-between">
          <Text fontFamily="Poppins" opacity={0.7} mb={2} ml={0.5}>
            PAY
          </Text>
          {tokenBalance !== defaults.tokenBalance && watchTokenIn ? (
            <Text fontFamily="Poppins" mb={2} ml={0.5}>
              {`${tokenBalance} ${watchTokenIn.value} available`}
            </Text>
          ) : (
            <div />
          )}
        </Flex>
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
          <>
            <Divider mb={3} />
            <Flex>
              <Text fontFamily="Poppins" fontWeight="600">
                Rate
              </Text>
              <Spacer />
              {price === defaults.price ? (
                <>
                  <Text fontFamily="Poppins">{`1 ${watchTokenIn.value} = `}</Text>
                  <Text mx={1}>{price}</Text>
                  <Text fontFamily="Poppins">{` ${watchTokenOut.value}`}</Text>
                </>
              ) : (
                <Text fontFamily="Poppins">{`1 ${watchTokenIn.value} = ${parseFloat(price).toFixed(
                  6
                )} ${watchTokenOut.value}`}</Text>
              )}
            </Flex>
            <Flex>
              <Text fontFamily="Poppins" fontWeight="600">
                Source
              </Text>
              <Spacer />
              {exchanges !== defaults.exchanges ? (
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
                      exchanges !== defaults.exchanges &&
                      exchanges
                        .sort((a, b) => parseFloat(b.proportion) - parseFloat(a.proportion))
                        .map((item) => (
                          <Flex alignItems="center">
                            <Image
                              src={Exchanges.data[item.name].iconSVG}
                              width="25px"
                              height="25px"
                              m={1}
                            />
                            <Text
                              style={{ fontWeight: 'bold', marginLeft: 5, fontFamily: 'Poppins' }}
                            >
                              {Exchanges.data[item.name].name}
                              {` (${parseFloat(item.proportion * 100).toFixed(3)}%)`}
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
              onClick={() => readyToTransact()}
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
