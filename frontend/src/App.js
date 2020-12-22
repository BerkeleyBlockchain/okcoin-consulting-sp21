import { Box, ChakraProvider, extendTheme, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import ExchangesTable from './components/ExchangesTable';
import NavBar from './components/NavBar';
import SwapForm from './components/SwapForm';

function App() {
  const config = {
    useSystemColorMode: false,
    initialColorMode: 'light',
  };
  const [fromToken, setFromToken] = React.useState('');
  const [toToken, setToToken] = React.useState('');

  const customTheme = extendTheme({ config });
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Box bg="gray.200" h="100vh">
        <NavBar />
        <Grid h="100%" templateColumns="repeat(3, 1fr)" gap={4} mt={3}>
          <GridItem colSpan={2} bg="white">
            <ExchangesTable fromToken={fromToken} toToken={toToken} />
          </GridItem>
          <GridItem colSpan={1}>
            <SwapForm setFromToken={setFromToken} setToToken={setToToken} />
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
