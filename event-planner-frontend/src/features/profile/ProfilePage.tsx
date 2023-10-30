import { Box } from '@chakra-ui/react';
import EditProfileForm from './components/EditProfileForm';

function ProfilePage() {
  return (
    <Box className="form-page-wrapper" bgGradient="linear(to-r, #610C9F, #E95793)">
      <EditProfileForm />
    </Box>
  );
}

export default ProfilePage;
