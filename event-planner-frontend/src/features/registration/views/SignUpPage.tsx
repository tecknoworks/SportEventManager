import SignupForm from '../components/SignupForm/SignupForm';
import { Box } from '@chakra-ui/react';

const SignUpPage = () => {
  return (
    <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
      <SignupForm />
    </Box>
  );
};

export default SignUpPage;
