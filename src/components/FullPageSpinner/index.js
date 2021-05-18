import React from 'react';
import { Spinner, Center, Text, VStack } from '@chakra-ui/react';

export default function FullPageSpinner() {
  return (
    <Center mt="50%">
      <VStack spacing={6}>
        <Spinner />
        <Text>Loading Application</Text>
      </VStack>
    </Center>
  );
}
