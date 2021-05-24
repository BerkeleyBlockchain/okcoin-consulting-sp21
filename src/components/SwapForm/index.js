/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { WarningIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import debounce from 'debounce';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import Toasts from '../../constants/toasts';
import Tokens from '../../constants/tokens';
import use0xPrice from '../../hooks/use0xPrice';
import use0xSwap from '../../hooks/use0xSwap';
import useTokenBalance from '../../hooks/useTokenBalance';
import { onboardAtom } from '../../utils/atoms';
import { getTokenIconPNG32 } from '../../utils/getTokenIcon';
import FullPageSpinner from '../FullPageSpinner';
import SwapButton from './SwapButton';
import SwapInfo from './SwapInfo';
import { DropdownStyle, IconOption, ValueOption } from './TokenDropdown';

export default function SwapForm({ web3 }) {
  const illegal = new RegExp('[\\("\\?@#\\$\\%\\^\\&\\*\\-=;:<>,.+\\[\\{\\]\\}\\)\\/\\\\]');
  const { register, handleSubmit, watch, setValue, errors, control } = useForm();
  const [isLoading, setIsLoading] = useState();
  const [sellAmount, setSellAmount] = useState();
  const { colorMode } = useColorMode();
  const toast = useToast();

  const watchTokenIn = watch('tokenIn', '');
  const watchTokenOut = watch('tokenOut', '');
  const watchAmountIn = watch('amountIn', 0);

  const [onboard] = useAtom(onboardAtom);
  const onboardState = onboard?.getState();

  const { balance: tokenBalance } = useTokenBalance(
    watchTokenIn.value,
    web3,
    onboardState?.balance,
    onboardState
  );

  // Token dropdown values
  const tokenArray = Tokens.tokens.map((symbol) => ({
    value: symbol,
    label: symbol,
    icon: getTokenIconPNG32(symbol),
  }));

  // 0x API quote
  const { data: zeroExQuote } = use0xPrice(
    Tokens.data[watchTokenIn.value],
    Tokens.data[watchTokenOut.value],
    sellAmount
  );

  // Placeholder values
  const defaults = {
    price: <Spinner size="xs" mt={1.5} mx={1} />,
    gasPrice: <Spinner size="xs" mt={1.5} mx={1} />,
    exchanges: <Spinner size="xs" mt={1.5} mx={1} />,
    estimatedGas: <Spinner size="xs" mt={1.5} mx={1} />,
    sources: [],
  };

  // Set quote values
  const { price, gasPrice, estimatedGas, exchanges, apiError } =
    zeroExQuote === undefined ? defaults : zeroExQuote;

  // Connect wallet function
  async function readyToTransact() {
    if (!onboardState?.address) {
      const walletSelected = await onboard.walletSelect();
      if (!walletSelected) return false;
    }

    const ready = await onboard.walletCheck();
    return ready;
  }

  // SwapButton text function
  const getButtonText = () => {
    if (!watchAmountIn || watchAmountIn <= 0) return 'Enter amount in';
    if (!watchTokenIn || !watchTokenOut) return 'Select tokens';
    if (apiError) {
      return (
        <>
          <WarningIcon mr={2} />
          {apiError}
        </>
      );
    }
    return 'Swap Tokens';
  };

  // Set amount out
  useEffect(() => {
    if (watchAmountIn > 0 && watchTokenIn && watchTokenOut && price !== defaults.price) {
      const n = watchAmountIn * price;
      setValue('amountOut', n.toFixed(6).replace(/(0+)$/, '').replace(/\.$/, ''));
    }
    if (!watchAmountIn || watchAmountIn <= 0 || apiError) {
      setValue('amountOut', '');
    }
  }, [price, watchAmountIn, watchTokenIn, watchTokenOut]);

  // Loading screen
  if (!onboard) return <FullPageSpinner />;

  // Execute the swap
  const onSubmit = async (data) => {
    const ready = await readyToTransact();
    if (!ready) return;

    const { amountIn, tokenIn, tokenOut } = data;
    setIsLoading(true);

    use0xSwap(Tokens.data[tokenIn.value], Tokens.data[tokenOut.value], amountIn, web3)
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
    <Box
      py={10}
      px={8}
      pb={0}
      boxShadow="lg"
      bgColor={colorMode === 'light' ? 'white' : 'gray.700'}
      borderRadius={30}
    >
      <Heading fontWeight="700" color={colorMode === 'light' ? 'gray.700' : 'white'} mb={10}>
        Swap
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex align="center" justify="space-between">
          <Text opacity={0.7} mb={2} ml={0.5}>
            PAY
          </Text>
          {tokenBalance && watchTokenIn ? (
            <Text opacity={0.7} mb={2} ml={0.5}>
              {`${tokenBalance.toFixed(6)} ${watchTokenIn.value} available`}
            </Text>
          ) : null}
        </Flex>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          bg={colorMode === 'light' ? 'white' : 'gray.800'}
          mb={6}
        >
          <Flex>
            <Controller
              name="tokenIn"
              control={control}
              render={({ onChange, name, value, ref }) => (
                <Select
                  styles={DropdownStyle}
                  options={tokenArray.filter((item) => item.value !== watchTokenOut.value)}
                  components={{ Option: IconOption, SingleValue: ValueOption }}
                  inputRef={ref}
                  value={value}
                  name={name}
                  onChange={onChange}
                  onKeyDown={(e) => {
                    if (illegal.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              )}
            />

            <Input
              placeholder="0.0"
              name="amountIn"
              type="number"
              step="0.000000000000000001"
              min="0"
              pattern="\d*\.?\d+"
              size="lg"
              ref={register({ required: true })}
              textAlign="end"
              variant="unstyled"
              mr={6}
              isReadOnly={isLoading}
              onKeyDown={(e) => {
                const char = e.key;
                if (char === 'e' || char === '-' || char === '+' || new RegExp('^(0+)$').test(e)) {
                  e.preventDefault();
                }
              }}
              onWheel={(e) => {
                e.currentTarget.blur();
              }}
              onChange={debounce((event) => setSellAmount(event.target.value), 1000)}
            />
          </Flex>
        </Box>
        <Text opacity={0.7} mb={2} ml={0.5}>
          RECEIVE
        </Text>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          bg={colorMode === 'light' ? 'white' : 'gray.800'}
          mb={6}
        >
          <Flex>
            <Controller
              name="tokenOut"
              control={control}
              render={({ onChange, name, value, ref }) => (
                <Select
                  styles={DropdownStyle}
                  options={tokenArray.filter((item) => item.value !== watchTokenIn.value)}
                  components={{ Option: IconOption, SingleValue: ValueOption }}
                  inputRef={ref}
                  value={value}
                  name={name}
                  onChange={onChange}
                  onKeyDown={(e) => {
                    if (illegal.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              )}
            />

            <Input
              isReadOnly
              placeholder="0.0"
              name="amountOut"
              type="number"
              size="lg"
              ref={register}
              variant="unstyled"
              textAlign="end"
              mr={6}
            />
          </Flex>
        </Box>
        {watchTokenIn && watchTokenOut && watchAmountIn > 0 && price ? (
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
          {onboardState?.address ? (
            <SwapButton
              type="submit"
              buttonText={getButtonText()}
              isLoading={isLoading}
              loadingText="Executing Swap"
              disabled={
                Object.keys(errors).length !== 0 ||
                isLoading ||
                watchAmountIn <= 0 ||
                !watchTokenIn ||
                !watchTokenOut ||
                apiError
              }
            />
          ) : (
            <SwapButton onClick={readyToTransact} buttonText="Connect Wallet" />
          )}
        </Center>
      </form>
    </Box>
  );
}
