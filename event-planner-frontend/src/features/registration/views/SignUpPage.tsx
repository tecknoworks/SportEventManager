import SignupForm from '../components/SignupForm/SignupForm';
import { Box, useMediaQuery } from '@chakra-ui/react';

const SignUpPage = () => {
  const [isSmallHeight] = useMediaQuery('(max-height: 680px)');

  return (
    <Box
      width="100%"
      paddingTop={isSmallHeight ? '130px' : '0px'}
      height="inherit"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <SignupForm />
    </Box>
  );
};

export default SignUpPage;
