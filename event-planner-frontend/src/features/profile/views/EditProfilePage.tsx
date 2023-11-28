import { Box } from '@chakra-ui/react';
import EditProfileForm from '../components/EditProfileForm';
import { selectProfileIsSuccess } from '../store/selectors/profileSelector';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { handleGenericSuccess } from 'services/notificationHandlingService';

function EditProfilePage() {
  const isSuccess = useSelector(selectProfileIsSuccess);

  useEffect(() => {
    if (isSuccess) handleGenericSuccess('You have successfully updated your profile.');
  }, [isSuccess]);

  return (
    <Box paddingTop="50px">
      <EditProfileForm />
    </Box>
  );
}

export default EditProfilePage;
