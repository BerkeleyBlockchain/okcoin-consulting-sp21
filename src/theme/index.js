// theme.js
import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import Text from './components/text';

const overrides = {
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  components: {
    Text,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('gray.100', '#111111')(props),
      },
    }),
  },
};

export default extendTheme(overrides);
