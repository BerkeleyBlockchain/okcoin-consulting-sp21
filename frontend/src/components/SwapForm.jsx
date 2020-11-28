import { Box, Button, Center, Flex, Input, Select, Text } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

const tokens = [
  {
    key: 'eth',
    ticker: 'ETH',
  },
  {
    key: 'btc',
    ticker: 'BTC',
  },
  {
    key: 'dai',
    ticker: 'DAI',
  },
];

export default function SwapForm() {
  const { register, handleSubmit, watch } = useForm();
  /* eslint-disable no-console */
  const onSubmit = (data) => console.log(data);
  const watchFromAmount = watch('fromAmount', null);
  const watchToTicker = watch('toTicker', null);
  const watchToAmount = watch('toAmount', 0);

  /* eslint-disable no-console */
  console.log('watch fromAmount :>> ', watchFromAmount === null);
  return (
    <>
      <Center mt={6}>
        <Box bg="gray.700" pt={12} px={12} pb={6} borderRadius={40}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex>
              <Input
                placeholder="From"
                name="fromAmount"
                type="number"
                size="lg"
                ref={register}
                mr={3}
                mb={3}
              />
              <Select
                placeholder="Select a token"
                name="fromTicker"
                size="lg"
                variant="filled"
                ref={register}
              >
                {tokens.map(({ key, ticker }) => (
                  <option key={key} value={ticker}>
                    {ticker}
                  </option>
                ))}
              </Select>
            </Flex>
            <Flex>
              <Input
                placeholder="To"
                name="toAmount"
                type="number"
                size="lg"
                ref={register}
                mr={3}
                mb={3}
              />
              <Select
                placeholder="Select a token"
                name="toTicker"
                size="lg"
                variant="filled"
                ref={register}
              >
                {tokens.map((token) => (
                  <option key={token.ticker} value={token.ticker}>
                    {token.ticker}
                  </option>
                ))}
              </Select>
            </Flex>
            {watchFromAmount && (
              <Text>
                Price: {watchToAmount} {watchToTicker}
              </Text>
            )}
            <Center>
              <Button
                colorScheme="blue"
                backgroundColor="blue.600"
                color="white"
                size="lg"
                type="submit"
                /* eslint-disable no-console */
                onClick={() => console.log('Swap!')}
              >
                Swap
              </Button>
            </Center>
          </form>
        </Box>
      </Center>
    </>
  );
}
