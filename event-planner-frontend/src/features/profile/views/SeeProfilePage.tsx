import { Box } from '@chakra-ui/react';
import { selectProfileIsSuccess } from '../store/selectors/profileSelector';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { handleGenericSuccess } from 'services/notificationHandlingService';
import SeeProfile from '../components/SeeProfile';
import { useParams } from 'react-router-dom';

function SeeProfilePage() {
  const isSuccess = useSelector(selectProfileIsSuccess);
  let { userId } = useParams() || '';

  useEffect(() => {
    if (isSuccess) handleGenericSuccess('You have successfully updated your profile.');
  }, [isSuccess]);

  return (
    <Box display="flex" justifyContent="center" width="100%" alignItems="center" h="100%">
      <SeeProfile userId={userId} />
    </Box>
  );
}

export default SeeProfilePage;
