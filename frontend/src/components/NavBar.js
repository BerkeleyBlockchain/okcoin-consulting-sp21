import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import React from 'react';
import ConnectWallet from './ConnectWallet';

export default function NavBar() {
  return (
    <Flex>
      <Box p="2">
        <Heading size="md">OKCoin Dex Aggregator</Heading>
      </Box>
      <Spacer />
      <ConnectWallet />
    </Flex>
  );
}
