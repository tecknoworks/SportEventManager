import { Box } from '@chakra-ui/react';
import React from 'react';
import EventForm from '../components/EventForm/EventForm';

function UpsertEventPage() {
  return (
    <Box className="form-page-wrapper" bgGradient="linear(to-r, #610C9F, #E95793)">
      <EventForm />
    </Box>
  );
}

export default UpsertEventPage;
