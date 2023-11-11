import { Box } from '@chakra-ui/react';
import LogInForm from './components/LogInForm/LogInForm';

const LoginPage = () => {
  return (
    <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
      <LogInForm />
    </Box>
  );
};

export default LoginPage;
