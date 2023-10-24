import { Box } from '@chakra-ui/react';
import React from 'react';
import 'common/styles/form-page.scss';
import CreateNewPasswordForm from '../components/CreateNewPasswordForm/CreateNewPasswordForm';

function CreateNewPasswordPage() {
  return (
    <Box
      className="form-page-wrapper"
      bgGradient="linear(to-r, #610C9F, #E95793)"
    >
      <CreateNewPasswordForm />
    </Box>
  );
}

export default CreateNewPasswordPage;
