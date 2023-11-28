import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import CreateNewPasswordForm from '../components/NewPasswordForm/NewPasswordForm';
import { useSelector } from 'react-redux';
import { selectNewPasswordIsSuccess } from '../store/selectors/newPasswordSelectors';
import { handleGenericSuccess } from 'services/notificationHandlingService';

function CreateNewPasswordPage() {
  const isSuccess = useSelector(selectNewPasswordIsSuccess);

  useEffect(() => {
    if (isSuccess) handleGenericSuccess('You have successfully reset your password.');
  }, [isSuccess]);

  return (
    <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
      <CreateNewPasswordForm />
    </Box>
  );
}

export default CreateNewPasswordPage;
