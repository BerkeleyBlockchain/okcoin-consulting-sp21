import { ChakraProvider, extendTheme, Flex, Spacer } from '@chakra-ui/react';
import React from 'react';
import ConnectWallet from './components/ConnectWallet';
import SwapForm from './components/SwapForm';

function App() {
  const config = {
    useSystemColorMode: false,
    initialColorMode: 'light',
  };

  const customTheme = extendTheme({ config });
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Flex>
        <Spacer />
        <ConnectWallet />
      </Flex>
      <SwapForm />
    </ChakraProvider>
  );
}

export default App;
