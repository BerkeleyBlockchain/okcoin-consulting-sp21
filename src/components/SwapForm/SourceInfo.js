import { Tooltip, Image, IconButton, Flex, Text } from '@chakra-ui/react';
import { IoAlertCircle } from 'react-icons/io5';
import React from 'react';

import Exchanges from '../../constants/exchanges';

export default function SourceInfo({ exchanges, defaults }) {
  return (
    <Tooltip
      hasArrow
      bgColor="#333333"
      padding="10px"
      label={
        exchanges !== defaults.exchanges &&
        exchanges
          .sort((a, b) => parseFloat(b.proportion) - parseFloat(a.proportion))
          .map((item) => (
            <Flex alignItems="center" key={item.name}>
              <Image src={Exchanges.data[item.name]?.iconSVG} width="25px" height="25px" m={1} />
              <Text style={{ fontWeight: 'bold', marginLeft: 5, fontFamily: 'Poppins' }}>
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
