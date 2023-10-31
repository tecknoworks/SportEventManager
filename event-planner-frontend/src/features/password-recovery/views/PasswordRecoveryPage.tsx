import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import PasswordRecoveryForm from '../components/ResetLinkForm/ResetLinkForm';
import 'common/styles/form-page.scss';
import { useSelector } from 'react-redux';
import { selectResetLinkIsSuccess } from '../store/selectors/resetLinkSelectors';
import { handleGenericSuccess } from 'services/notificationHandlingService';

function PasswordRecoveryPage() {
  const isSuccess = useSelector(selectResetLinkIsSuccess);

  useEffect(() => {
    if (isSuccess) handleGenericSuccess("If there is an account associated with this email we've sent the reset link.");
  }, [isSuccess]);

  return (
    <Box className="form-page-wrapper" bgGradient="linear(to-r, #610C9F, #E95793)">
      <PasswordRecoveryForm />
    </Box>
  );
}

export default PasswordRecoveryPage;
