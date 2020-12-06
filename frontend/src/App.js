import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ConnectWallet from './components/ConnectWallet';
import SwapForm from './components/SwapForm';

function App() {
  const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  };

  const customTheme = extendTheme({ config });
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <ConnectWallet />
      <SwapForm />
    </ChakraProvider>
  );
}

export default App;
