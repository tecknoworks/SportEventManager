import React from 'react';
import { Box } from '@chakra-ui/react';
import PasswordRecoveryForm from '../components/PasswordRecoveryForm/PasswordRecoveryForm';
import 'common/styles/form-page.scss';

function PasswordRecoveryPage() {
  return (
    <Box
      className="form-page-wrapper"
      bgGradient="linear(to-r, #610C9F, #E95793)"
    >
      <PasswordRecoveryForm />
    </Box>
  );
}

export default PasswordRecoveryPage;
