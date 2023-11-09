import SignupForm from '../components/SignupForm/SignupForm';
import { Box, useMediaQuery } from '@chakra-ui/react';

const SignUpPage = () => {
  return (
    <Box width="100%" height="inherit" display="flex" alignItems="center" justifyContent="center">
      <SignupForm />
    </Box>
  );
};

export default SignUpPage;
