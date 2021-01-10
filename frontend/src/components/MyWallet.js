import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

export default function MyWallet() {
  return (
    <Container maxW="4xl">
      <SimpleGrid columns={2} spacing={5} mb={5}>
        <Box bg="tomato" height="200px" />
        <Box bg="tomato" height="200px" />
      </SimpleGrid>
      <Box bg="tomato" height="400px" />
    </Container>
  );
}
