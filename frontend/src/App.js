<<<<<<< HEAD
import { Container, ChakraProvider, extendTheme, Grid, GridItem } from '@chakra-ui/react';
=======
import { ChakraProvider, extendTheme, Grid, GridItem } from '@chakra-ui/react';
>>>>>>> 951a98a (Add exchanges view and wallet view (#11))
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ExchangesTable from './components/ExchangesTable';
import FullPageErrorFallback from './components/FullPageErrorFallback';
import MyWallet from './components/MyWallet';
import NavBar from './components/NavBar';
import SwapForm from './components/SwapForm';
import FullPageErrorFallback from './components/FullPageErrorFallback';
import MyWallet from './components/MyWallet';

function App() {
  const config = {
    useSystemColorMode: false,
    initialColorMode: 'light',
  };
  const [fromToken, setFromToken] = React.useState('');
  const [toToken, setToToken] = React.useState('');
  const [tabIndex, setTabIndex] = React.useState(0);

  const customTheme = extendTheme({ config });
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
        <NavBar setTabIndex={setTabIndex} />
<<<<<<< HEAD
        <Container maxW="10xl">
          <Grid h="100%" templateColumns="repeat(3, 1fr)" gap={4} mt={3}>
            <GridItem colSpan={2} bg="white" p={6}>
              {tabIndex === 0 ? <ExchangesTable fromToken={fromToken} toToken={toToken} /> : null}
              {tabIndex === 2 ? <MyWallet /> : null}
            </GridItem>
            <GridItem colSpan={1}>
              <SwapForm setFromToken={setFromToken} setToToken={setToToken} />
            </GridItem>
          </Grid>
        </Container>
=======
        <Grid h="100%" templateColumns="repeat(3, 1fr)" gap={4} mt={3}>
          <GridItem colSpan={2} bg="white" p={6}>
            {tabIndex === 0 ? <ExchangesTable fromToken={fromToken} toToken={toToken} /> : null}
            {tabIndex === 2 ? <MyWallet /> : null}
          </GridItem>
          <GridItem colSpan={1}>
            <SwapForm setFromToken={setFromToken} setToToken={setToToken} />
          </GridItem>
        </Grid>
>>>>>>> 951a98a (Add exchanges view and wallet view (#11))
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
