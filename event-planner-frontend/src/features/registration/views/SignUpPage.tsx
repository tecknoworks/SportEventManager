import SignupForm from '../components/SignupForm/SignupForm';
import { Box } from '@chakra-ui/react';

const SignUpPage = () => {
  return (
    <Box paddingTop="50px" display="flex" justifyContent="center">
      <SignupForm />
    </Box>
  );
};

export default SignUpPage;
