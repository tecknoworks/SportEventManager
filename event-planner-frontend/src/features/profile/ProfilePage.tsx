import { Box } from '@chakra-ui/react';
import EditProfileForm from './components/EditProfileForm';
import { selectProfileIsSuccess } from './store/selectors/profileSelector';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { handleGenericSuccess } from 'services/notificationHandlingService';

function ProfilePage() {
  const isSuccess = useSelector(selectProfileIsSuccess);

  useEffect(() => {
    if (isSuccess) handleGenericSuccess('You have successfully updated your profile.');
  }, [isSuccess]);
  return (
    <Box display="flex" justifyContent="center" alignItems="center" bgGradient="linear(to-r, #610C9F, #E95793)">
      <EditProfileForm />
    </Box>
  );
}

export default ProfilePage;
