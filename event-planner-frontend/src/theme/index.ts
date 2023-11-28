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

  light: {
    background: 'white',
    text: '#000000',
    navbar: 'rgb(255,255,255, 0.8)',
  },
  dark: {
    background: '#2d3748',
    text: '#ffffff',
    navbar: '#2d3748',
  },
};

const overrides = extendTheme({
  colors,
  styles: {
    global: (props: any) => ({
      body: {
        fontFamily: '"Poppins", sans-serif',
        bg: 'linear-gradient(to right, #610C9F , #E95793);',
        color: props.colorMode === 'dark' ? colors.dark.text : colors.light.text,
      },
    }),
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
