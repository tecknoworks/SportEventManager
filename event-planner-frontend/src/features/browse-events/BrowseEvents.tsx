import { Box, Button, Text, calc, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import EventsPage from './components/events-page/EventsPage';

const BrowseEvents = () => {
  return (
    <Box display="flex" justifyContent="center" width="100%" alignItems="center">
      <EventsPage />
    </Box>
  );
};

export default BrowseEvents;
