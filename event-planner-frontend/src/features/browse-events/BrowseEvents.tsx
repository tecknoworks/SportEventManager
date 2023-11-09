import { Box, Button, Text, calc, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import EventsPage from './components/events-page/EventsPage';

const BrowseEvents = () => {
  return (
    <Box height="inherit" width="full" display="flex" justifyContent="center">
      <EventsPage />
    </Box>
  );
};

export default BrowseEvents;
