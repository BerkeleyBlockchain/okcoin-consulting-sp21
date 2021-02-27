import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

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
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
