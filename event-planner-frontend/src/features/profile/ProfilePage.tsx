import { Box, useToast } from '@chakra-ui/react';
import EditProfileForm from './components/EditProfileForm';
import { selectProfileIsSuccess } from './store/selectors/profileSelector';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function ProfilePage() {
  const isSuccess = useSelector(selectProfileIsSuccess);

  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Success',
        description: 'You have successfully updated your profile.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isSuccess, toast]);
  return (
    <Box display="flex" justifyContent="center" alignItems="center" bgGradient="linear(to-r, #610C9F, #E95793)">
      <EditProfileForm />
    </Box>
  );
}

export default ProfilePage;
