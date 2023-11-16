import { Box, Button, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Box
      height="100%"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="1rem"
      backgroundImage="url('https://res.cloudinary.com/dmzqbknlx/image/upload/v1699368590/hd9xgwdgds13x8xspqu9.jpg')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      position="relative"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="5rem"
        flexDirection="column"
        padding="4rem"
        borderRadius="2rem"
        bgColor="rgba(211, 211, 211, 0.5)"
      >
        <Heading color="white" textShadow="2px 2px 8px #000000" zIndex="2" size="3xl">
          Meet new people now!
        </Heading>

        <Button
          type="submit"
          colorScheme="purple"
          size="md"
          variant="solid"
          w="full"
          onClick={() => navigate('/browseevents')}
          zIndex="2"
        >
          Browse Events
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
