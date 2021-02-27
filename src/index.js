import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const queryClient = new QueryClient();

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

const customTheme = extendTheme({ config });

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <ChakraProvider resetCSS theme={customTheme}>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
