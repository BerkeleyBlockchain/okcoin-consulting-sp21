import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

const customTheme = extendTheme({ config });

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <ChakraProvider resetCSS theme={customTheme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
