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
  Tooltip,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { IoAlertCircle } from 'react-icons/io5';
import debounce from 'debounce';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';

import FullPageSpinner from './FullPageSpinner';

import zeroXSwap from '../hooks/use0xSwap';
import use0xPrice from '../hooks/use0xPrice';

import Tokens from '../constants/tokens';
import Toasts from '../constants/toasts';
import Exchanges from '../constants/exchanges';

export default function SwapForm({ web3, wallet, onboard }) {
  const { register, handleSubmit, watch, setValue, errors } = useForm();
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
    Tokens.data[watchTokenIn],
    Tokens.data[watchTokenOut],
    sellAmount
  );
  const { price, gasPrice, estimatedGas, exchanges } =
    zeroExQuote === undefined ? defaults : zeroExQuote;

  useEffect(() => {
    if (watchAmountIn && watchTokenIn && watchTokenOut && price !== defaults.price) {
      const n = watchAmountIn * price;
      setValue('amountOut', n.toFixed(Tokens.data[watchTokenOut].decimals));
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

    zeroXSwap(Tokens.data[tokenIn], Tokens.data[tokenOut], amountIn, web3)
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
              name="tokenIn"
              size="lg"
              variant="filled"
              ref={register}
              isReadOnly={isLoading}
            >
              {Tokens.tokens.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
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
              h="52px"
              placeholder="Select"
              name="tokenOut"
              size="lg"
              variant="filled"
              ref={register({
                validate: (value) => value !== watchTokenIn,
              })}
              isReadOnly={isLoading}
            >
              {Tokens.tokens.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
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
              {typeof exchanges === 'object' && (
                <Text style={{ fontWeight: 'bold' }}>
                  {exchanges[0].name && exchanges[0].name}{' '}
                  {`${parseFloat(exchanges[0].proportion * 100)}%`}
                </Text>
              )}
              <Tooltip
                hasArrow
                bgColor="#333333"
                padding="10px"
                label={
                  typeof exchanges === 'object' &&
                  exchanges.map((item) => (
                    <Flex alignItems="center">
                      <Image
                        src={Exchanges.data[item.name].iconSVG}
                        alt={item.name}
                        width="25px"
                        height="25px"
                      />
                      <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>
                        {item.name} {`${parseFloat(item.proportion * 100)}%`}
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
