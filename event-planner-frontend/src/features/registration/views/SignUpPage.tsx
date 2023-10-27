import SignupForm from '../components/SignupForm/SignupForm';
import { Box } from '@chakra-ui/react';
import 'common/styles/form-page.scss';

const SignUpPage = () => {
  return (
    <Box className="form-page-wrapper" bgGradient="linear(to-r, #610C9F, #E95793)">
      <SignupForm />
    </Box>
  );
};

export default SignUpPage;
