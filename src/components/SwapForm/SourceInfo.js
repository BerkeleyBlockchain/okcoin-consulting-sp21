import { Tooltip, Image, IconButton, Flex, Text } from '@chakra-ui/react';
import { IoAlertCircle } from 'react-icons/io5';
import React from 'react';

import Exchanges from '../../constants/exchanges';

export default function SourceInfo({ exchanges, defaults }) {
  return (
    <Tooltip
      hasArrow
      bg="gray.900"
      p={3}
      label={
        exchanges !== defaults.exchanges &&
        exchanges
          .sort((a, b) => parseFloat(b.proportion) - parseFloat(a.proportion))
          .map((item) => (
            <Flex alignItems="center" key={item.name}>
              <Image src={Exchanges.data[item.name]?.iconSVG} maxW="25px" maxH="25px" m={1} />
              <Text color="gray.50" fontWeight="bold" ml={1}>
                {Exchanges.data[item?.name]?.name} ({parseFloat(item.proportion * 100).toFixed(3)}%)
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
  );
}
