import { Box } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import EditEventForm from '../components/forms/EditEventForm';

function EditEventPage() {
  let { eventId } = useParams();
  return (
    <Box display="flex" paddingTop="10vh" justifyContent="center" alignItems="center" width="100%" height="inherit">
      <EditEventForm eventId={eventId || ''} />
    </Box>
  );
}

export default EditEventPage;
