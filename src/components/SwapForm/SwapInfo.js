/* eslint-disable no-unused-vars */
import { Spacer, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import Exchanges from '../../constants/exchanges';
import SourceInfo from './SourceInfo';

export default function SwapInfo({
  watchTokenIn,
  watchTokenOut,
  price,
  defaults,
  exchanges,
  gasPrice,
  estimatedGas,
}) {
  const checkSource = () => {
    if (exchanges.length === 1) {
      return Exchanges.data[exchanges[0]?.name]?.name;
    }
    if (exchanges.length === 0) {
      return 'ETH <> WETH';
    }
    return 'Split Routing';
  };

  return (
    <>
      <Divider mb={3} />
      <Flex>
        <Text fontWeight="semibold">Rate</Text>
        <Spacer />
        {price === defaults.price ? (
          <>
            <Text>{`1 ${watchTokenIn.value} = `}</Text>
            {price}
            <Text>{` ${watchTokenOut.value}`}</Text>
          </>
        ) : (
          <Text>{`1 ${watchTokenIn.value} = ${parseFloat(price)
            .toFixed(6)
            .replace(/(0+)$/, '')
            .replace(/\.$/, '')} ${watchTokenOut.value}`}</Text>
        )}
      </Flex>
      <Flex>
        <Text fontWeight="semibold">Source</Text>
        <Spacer />
        {exchanges !== defaults.exchanges ? (
          <>
            <Text style={{ fontWeight: 'bold' }}>{checkSource()}</Text>
            {exchanges.length !== 0 ? (
              <SourceInfo exchanges={exchanges} defaults={defaults} />
            ) : null}
          </>
        ) : (
          defaults.exchanges
        )}
      </Flex>
      <Flex>
        <Text fontWeight="semibold">Gas Price</Text>
        <Spacer />
        {gasPrice === defaults.gasPrice ? gasPrice : <Text>{gasPrice}</Text>}
        <Text ml={1}>Gwei</Text>
      </Flex>
      <Flex>
        <Text fontWeight="semibold">Gas Estimate</Text>
        <Spacer />
        {estimatedGas === defaults.estimatedGas ? estimatedGas : <Text>{estimatedGas}</Text>}
      </Flex>

      <Divider mt={3} />
    </>
  );
}
