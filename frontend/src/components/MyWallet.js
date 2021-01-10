import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

export default function MyWallet() {
  return (
    <Container maxW="xl">
      <SimpleGrid columns={2} spacing={10}>
        <Box bg="tomato" height="80px" />
        <Box bg="tomato" height="80px" />
      </SimpleGrid>
    </Container>
  );
}
