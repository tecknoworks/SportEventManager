import { Box, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import 'common/styles/form-page.scss';
import CreateNewPasswordForm from '../components/NewPasswordForm/NewPasswordForm';
import { useSelector } from 'react-redux';
import { selectNewPasswordIsSuccess } from '../store/selectors/newPasswordSelectors';
import { selectNewPasswordIsDone } from '../store/selectors/newPasswordSelectors';

function CreateNewPasswordPage() {
  const isSuccess = useSelector(selectNewPasswordIsSuccess);
  const isDone = useSelector(selectNewPasswordIsDone);
  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Success',
        description: 'You have successfully reset your password.',
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
      <CreateNewPasswordForm />
    </Box>
  );
}

export default CreateNewPasswordPage;
