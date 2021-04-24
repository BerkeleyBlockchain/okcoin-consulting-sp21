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
  function SourceCheck() {
    if (exchanges.length === 1) {
      return Exchanges.data[exchanges[0].name].name;
    }
    if (exchanges.length === 0) {
      return 'Weth <> Eth';
    }
    return 'Split Routing';
  }

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
            <Text mx={1}>{price}</Text>
            <Text fontFamily="Poppins">{` ${watchTokenOut.value}`}</Text>
          </>
        ) : (
          <Text fontFamily="Poppins">{`1 ${watchTokenIn.value} = ${parseFloat(price)
            .toFixed(6)
            .replace(/\.0+/, '')} ${watchTokenOut.value}`}</Text>
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
              {SourceCheck()}
            </Text>
            {exchanges.length === 0 ? null : (
              <SourceInfo exchanges={exchanges} defaults={defaults} />
            )}
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
  );
}