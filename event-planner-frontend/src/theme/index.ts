import { extendTheme } from '@chakra-ui/react';
import '@fontsource/poppins';

const colors = {
  purple: {
    dark: '#610c9f',
    light: '#940b92',
  },
  pink: {
    dark: '#da0c81',
    light: '#e95793',
  },
};

const overrides = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        fontFamily: '"Poppins", sans-serif',
        bg: 'linear-gradient(to right, #610C9F , #E95793);',
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: '"Poppins", sans-serif',
      },
    },
    Button: {
      baseStyle: {
        fontWeight: '400',
      },
    },
  },
});

const customTheme = extendTheme(overrides);

export default customTheme;
