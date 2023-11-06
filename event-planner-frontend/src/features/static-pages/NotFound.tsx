import { Box, Text } from '@chakra-ui/react';
import React from 'react';

function NotFound() {
  return (
    <Box width="100%" display="flex" justifyContent="center" alignItems="center">
      <Box
        width="20%"
        height="auto"
        padding="20px"
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
