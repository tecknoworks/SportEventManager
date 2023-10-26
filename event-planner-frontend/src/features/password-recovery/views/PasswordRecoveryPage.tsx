import { useEffect } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import PasswordRecoveryForm from '../components/ResetLinkForm/ResetLinkForm';
import 'common/styles/form-page.scss';
import { useSelector } from 'react-redux';
import { selectResetLinkIsDone, selectResetLinkIsSuccess } from '../store/selectors/resetLinkSelectors';

function PasswordRecoveryPage() {
  const isSuccess = useSelector(selectResetLinkIsSuccess);
  const isDone = useSelector(selectResetLinkIsDone);
  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Success',
        description: "If there is an account associated with this email we've sent the reset link.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } else if (!isSuccess && isDone) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isSuccess, isDone, toast]);

  return (
    <Box className="form-page-wrapper" bgGradient="linear(to-r, #610C9F, #E95793)">
      <PasswordRecoveryForm />
    </Box>
  );
}

export default PasswordRecoveryPage;
