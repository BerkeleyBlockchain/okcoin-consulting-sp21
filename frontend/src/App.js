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

  const customTheme = extendTheme({ config });
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Box bg="gray.200" h="100vh">
        <NavBar />
        <Grid h="100%" templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem colSpan={2} bg="papayawhip">
            <ExchangesTable />
          </GridItem>
          <GridItem colSpan={1}>
            <SwapForm />
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
