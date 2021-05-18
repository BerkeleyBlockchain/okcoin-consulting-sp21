// theme.js
import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import Text from './components/text';

const overrides = {
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  // Other foundational style overrides go here
  components: {
    Text,
    // Other components go here
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('gray.100', 'gray.800')(props),
      },
    }),
  },
};

export default extendTheme(overrides);
