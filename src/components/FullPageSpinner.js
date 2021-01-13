import React from 'react';
import { Spinner, Center, Text, VStack } from '@chakra-ui/react';

export default function FullPageSpinner() {
  return (
    <Center h="100vh">
      <VStack spacing={6}>
        <Spinner />
        <Text>Connecting to Metamask</Text>
      </VStack>
    </Center>
  );
}
