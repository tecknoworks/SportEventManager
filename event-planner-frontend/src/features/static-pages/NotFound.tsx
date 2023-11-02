import { Box, Text } from '@chakra-ui/react';
import React from 'react';

function NotFound() {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, #610C9F, #E95793)"
    >
      <Box
        width="20%"
        height="20%"
        bgColor="white"
        borderRadius="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="3xl" fontWeight="semibold" textAlign="center">
          404 <br></br> Page not Found
        </Text>
      </Box>
    </Box>
  );
}

export default NotFound;
