import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import PasswordRecoveryForm from '../components/ResetLinkForm/ResetLinkForm';
import { useSelector } from 'react-redux';
import { selectResetLinkIsSuccess } from '../store/selectors/resetLinkSelectors';
import { handleGenericSuccess } from 'services/notificationHandlingService';

function PasswordRecoveryPage() {
  const isSuccess = useSelector(selectResetLinkIsSuccess);

  useEffect(() => {
    if (isSuccess) handleGenericSuccess("If there is an account associated with this email we've sent the reset link.");
  }, [isSuccess]);

  return (
    <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
      <PasswordRecoveryForm />
    </Box>
  );
}

export default PasswordRecoveryPage;
