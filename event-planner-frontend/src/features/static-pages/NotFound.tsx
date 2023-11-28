import { Box, Text, useColorMode } from '@chakra-ui/react';

function NotFound() {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'dark.background' : 'light.background';

  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center" >
      <Box
        width="20%"
        height="auto"
        padding="20px"
        bgColor={bgColor}
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
