import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export default function CoinCard() {
  return (
    <Box boxShadow="base" w="100px" h="100px">
      <Text>Ethereum</Text>
      <Text>3.495 ETH</Text>
    </Box>
  );
}
