// eslint-disable import/no-extraneous-dependencies
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';
import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { mode } from '@chakra-ui/theme-tools';
import App from './App';
import FullPageErrorFallback from './components/FullPageErrorFallback';
import '@fontsource/poppins/400.css';

const queryClient = new QueryClient();

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
  components: {
    Text: {
      baseStyle: {
        fontWeight: 'lighter',
      },
    },
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('gray.100', 'gray.800')(props),
      },
    }),
  },
};

const customTheme = extendTheme(config);

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <ChakraProvider resetCSS theme={customTheme}>
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
              <App />
              <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
            </ErrorBoundary>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
