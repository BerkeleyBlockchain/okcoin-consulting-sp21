import { Box, Text, Image, Flex } from '@chakra-ui/react';
import React from 'react';

export default function CoinCard() {
  return (
    <Box boxShadow="base" w="100px" h="100px" p={3}>
      <Flex direction="row-reverse" mb={3}>
        <Image src="/static/eth.png" alt="eth-logo" />
      </Flex>
      <Text fontSize="xs" opacity={0.7}>
        Ethereum
      </Text>
      <Text fontSize="md">3.49 ETH</Text>
    </Box>
  );
}
