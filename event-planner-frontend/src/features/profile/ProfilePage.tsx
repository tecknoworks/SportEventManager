import { Box, useMediaQuery } from '@chakra-ui/react';
import EditProfileForm from './components/EditProfileForm';
import { selectProfileIsSuccess } from './store/selectors/profileSelector';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { handleGenericSuccess } from 'services/notificationHandlingService';

function ProfilePage() {
  const isSuccess = useSelector(selectProfileIsSuccess);
  const [isMobile] = useMediaQuery('(max-width: 1037px)');

  useEffect(() => {
    if (isSuccess) handleGenericSuccess('You have successfully updated your profile.');
  }, [isSuccess]);
  return (
    <Box display="flex" justifyContent="center" width="100%" alignItems="center">
      <EditProfileForm />
    </Box>
  );
}

export default ProfilePage;
