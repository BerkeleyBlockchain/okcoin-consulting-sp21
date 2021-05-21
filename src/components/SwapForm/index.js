/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable */
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import debounce from 'debounce';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { IconOption, ValueOption, DropdownStyle } from './TokenDropdown';

import Select, { components } from 'react-select';
import FullPageSpinner from '../FullPageSpinner';
import SwapModal from '../SwapModal';

import zeroXSwap from '../../hooks/use0xSwap';
import use0xPrice from '../../hooks/use0xPrice';
import { getTokenIconPNG32 } from '../../utils/getTokenIcon';
import SwapInfo from './SwapInfo';
import SwapButton from './SwapButton';
import Toasts from '../../constants/toasts';
import Tokens from '../../constants/tokens';

export default function SwapForm({ onboardState, web3, onboard }) {
  const { register, handleSubmit, watch, setValue, errors, control } = useForm();
  const [isLoading, setIsLoading] = useState();
  const [sellAmount, setSellAmount] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [swapConfirmed, setSwapConfirmed] = useState(false);
  const [formData, setFormData] = useState({});
  const toast = useToast();

  const watchTokenIn = watch('tokenIn', '');
  const watchTokenOut = watch('tokenOut', '');
  const watchAmountIn = watch('amountIn', 0);

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
    if (!onboardState.address) {
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

  useEffect(() => {
    if (!swapConfirmed) {
      return;
    }
    const { amountIn, tokenIn, tokenOut } = formData;
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
    setSwapConfirmed(false);
    setIsLoading(false);
  });

  // Loading screen
  if (!onboard) return <FullPageSpinner />;

  // Execute the swap
  const onSubmit = async (data) => {
    onOpen();
    const closed = await isOpen;
    console.log(closed);
    const ready = await readyToTransact();
    if (!ready) return;

    setFormData(data);
    setIsLoading(true);
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
                  styles={DropdownStyle}
                  options={tokenArray.filter((item) => item.value !== watchTokenOut.value)}
                  components={{ Option: IconOption, SingleValue: ValueOption }}
                  inputRef={ref}
                  value={value}
                  name={name}
                  onChange={onChange}
                  onKeyDown={(e) => {
                    const c = e.key;
                    const illegal = new RegExp(
                      '[\\("\\?@#\\$\\%\\^\\&\\*\\-=;:<>,.+\\[\\{\\]\\}\\)\\/\\\\]'
                    );
                    if (illegal.test(c)) {
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
              min="0"
              pattern="\d*\.?\d+"
              fontFamily="Poppins"
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
                  styles={DropdownStyle}
                  options={tokenArray.filter((item) => item.value !== watchTokenIn.value)}
                  components={{ Option: IconOption, SingleValue: ValueOption }}
                  inputRef={ref}
                  value={value}
                  name={name}
                  onChange={onChange}
                  onKeyDown={(e) => {
                    const c = e.key;
                    const illegal = new RegExp(
                      '[\\("\\?@#\\$\\%\\^\\&\\*\\-\\/\\\\=;:<>,.+\\[\\{\\]\\}\\)]'
                    );
                    if (illegal.test(c)) {
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
              fontFamily="Poppins"
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
          {onboardState.address ? (
            <>
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
              <SwapModal
                errors={errors}
                address={onboardState.address}
                onboard={onboard}
                isOpen={isOpen}
                onClose={onClose}
                setSwapConfirmed={setSwapConfirmed}
                watchAmountIn={watchAmountIn}
                watchTokenIn={watchTokenIn}
                watchTokenOut={watchTokenOut}
                price={price}
                defaults={defaults}
                exchanges={exchanges}
                gasPrice={gasPrice}
                estimatedGas={estimatedGas}
                getPicture={getTokenIconPNG32}
              />
            </>
          ) : (
            <SwapButton onClick={readyToTransact} buttonText="Connect Wallet" />
          )}
        </Center>
      </form>
    </Box>
  );
}
