import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import NavBar from './components/NavBar';
import SwapForm from './components/SwapForm';

function App() {
  const config = {
    useSystemColorMode: false,
    initialColorMode: 'light',
  };

  const customTheme = extendTheme({ config });
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Box bg="gray.200" h="100vh">
        <NavBar />
        <SwapForm />
      </Box>
    </ChakraProvider>
  );
}

export default App;
