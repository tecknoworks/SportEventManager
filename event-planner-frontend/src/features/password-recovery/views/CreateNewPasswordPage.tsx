import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import 'common/styles/form-page.scss';
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
    <Box className="form-page-wrapper" bgGradient="linear(to-r, #610C9F, #E95793)">
      <CreateNewPasswordForm />
    </Box>
  );
}

export default CreateNewPasswordPage;
