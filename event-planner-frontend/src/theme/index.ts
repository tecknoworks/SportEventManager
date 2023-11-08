import { extendTheme } from '@chakra-ui/react';

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

const customTheme = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        bg: 'linear-gradient(to right, #610C9F , #E95793);',
      },
    },
  },
});

export default customTheme;
