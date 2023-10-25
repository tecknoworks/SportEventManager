import React, { useEffect } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import PasswordRecoveryForm from '../components/PasswordRecoveryForm/PasswordRecoveryForm';
import 'common/styles/form-page.scss';
import { useSelector } from 'react-redux';
import { selectIsSuccess } from '../store/selectors/passwordRecoverySelectors';

function PasswordRecoveryPage() {
  const isSuccess = useSelector(selectIsSuccess);
  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Success',
        description:
          "If there is an account associated with this email we've sent the reset link.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isSuccess, toast]);
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
