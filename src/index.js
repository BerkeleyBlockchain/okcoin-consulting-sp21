// eslint-disable import/no-extraneous-dependencies
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import '@fontsource/poppins/400.css';
import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import FullPageErrorFallback from './components/FullPageErrorFallback';
import Theme from './theme';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <ChakraProvider resetCSS theme={Theme}>
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
              <App />
              <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
            </ErrorBoundary>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
