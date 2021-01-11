import { Text, Input, Box, Container, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import CoinCard from './CoinCard';

export default function MyWallet() {
  return (
    <Container maxW="4xl">
      <SimpleGrid columns={2} spacing={5} mb={5}>
        <Box borderColor="grey.200" borderWidth={2} borderRadius={10} height="200px" p={6}>
          <Text>$563.04</Text>
          <Input placeholder="search your tokens" />
          <CoinCard />
        </Box>
        <Box bg="tomato" height="200px" />
      </SimpleGrid>
      <Box bg="tomato" height="400px" />
    </Container>
  );
}
