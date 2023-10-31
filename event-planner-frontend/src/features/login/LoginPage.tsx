import { Box } from '@chakra-ui/react';
import LogInForm from './components/LogInForm/LogInForm';
import 'common/styles/form-page.scss';

const LoginPage = () => {
  return (
    <Box className="form-page-wrapper" bgGradient="linear(to-r, #610C9F, #E95793)">
      <LogInForm />
    </Box>
  );
};

export default LoginPage;
