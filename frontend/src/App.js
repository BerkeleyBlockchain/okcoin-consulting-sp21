import { ChakraProvider, extendTheme, Flex, Spacer } from '@chakra-ui/react';
import React from 'react';
import ConnectWallet from './components/ConnectWallet';
import SwapForm from './components/SwapForm';
import ColorModeSwitcher from './components/ColorModeSwitcher';

function App() {
  const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  };

  const customTheme = extendTheme({ config });
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Flex>
        <ColorModeSwitcher />
        <Spacer />
        <ConnectWallet />
      </Flex>
      <SwapForm />
    </ChakraProvider>
  );
}

export default App;
