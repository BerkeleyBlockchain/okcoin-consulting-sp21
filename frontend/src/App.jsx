import React from 'react';
import { extendTheme, Text, ChakraProvider } from '@chakra-ui/react';
import SwapForm from './components/SwapForm';
import ConnectWallet from './components/ConnectWallet';

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
