import { Tooltip, Image, IconButton, Spacer, Divider, Flex, Text } from '@chakra-ui/react';
import { IoAlertCircle } from 'react-icons/io5';
import React from 'react';

import Exchanges from '../constants/exchanges';

export default function SourceDisplay({
  watchTokenIn,
  watchTokenOut,
  price,
  defaults,
  exchanges,
  gasPrice,
  estimatedGas,
}) {
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
          <Text fontFamily="Poppins">{`1 ${watchTokenIn.value} = ${parseFloat(price).toFixed(6)} ${
            watchTokenOut.value
          }`}</Text>
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
              {exchanges.length === 1 ? Exchanges.data[exchanges[0].name].name : 'Split Routing'}
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
                      <Text style={{ fontWeight: 'bold', marginLeft: 5, fontFamily: 'Poppins' }}>
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
  );
}
