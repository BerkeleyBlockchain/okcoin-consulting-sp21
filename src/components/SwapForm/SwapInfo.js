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
        <Text fontFamily="Poppins" fontWeight="600">
          Rate
        </Text>
        <Spacer />
        {price === defaults.price ? (
          <>
            <Text fontFamily="Poppins">{`1 ${watchTokenIn.value} = `}</Text>
            {price}
            <Text fontFamily="Poppins">{` ${watchTokenOut.value}`}</Text>
          </>
        ) : (
          <Text fontFamily="Poppins">{`1 ${watchTokenIn.value} = ${parseFloat(price)
            .toFixed(6)
            .replace(/(0+)$/, '')
            .replace(/\.$/, '')} ${watchTokenOut.value}`}</Text>
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
              {checkSource()}
            </Text>
            {exchanges.length !== 0 ? (
              <SourceInfo exchanges={exchanges} defaults={defaults} />
            ) : null}
          </>
        ) : (
          defaults.exchanges
        )}
      </Flex>
      <Flex>
        <Text fontFamily="Poppins" fontWeight="600">
          Gas Price
        </Text>
        <Spacer />
        {gasPrice === defaults.gasPrice ? gasPrice : <Text fontFamily="Poppins">{gasPrice}</Text>}
        <Text fontFamily="Poppins" ml={1}>
          Gwei
        </Text>
      </Flex>
      <Flex>
        <Text fontFamily="Poppins" fontWeight="600">
          Gas Estimate
        </Text>
        <Spacer />
        {estimatedGas === defaults.estimatedGas ? (
          estimatedGas
        ) : (
          <Text fontFamily="Poppins">{estimatedGas}</Text>
        )}
      </Flex>

      <Divider mt={3} />
    </>
  );
}
