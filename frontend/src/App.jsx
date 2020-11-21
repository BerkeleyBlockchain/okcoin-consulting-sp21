import React from 'react';
import { extendTheme, Text, ChakraProvider } from '@chakra-ui/react';
import Swap from './components/Swap';
import Header from './components/Header';

function App() {
  const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  };

  const customTheme = extendTheme({ config });
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Header />
      <Swap />
    </ChakraProvider>
  );
}

export default App;
