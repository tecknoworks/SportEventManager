import { Box } from '@chakra-ui/react';
import CreateEventForm from '../components/forms/CreateEventForm';

function CreateEventPage() {
  return (
    <Box display="flex" paddingTop="10vh" justifyContent="center" alignItems="center" width="100%" height="inherit">
      <CreateEventForm />
    </Box>
  );
}

export default CreateEventPage;
