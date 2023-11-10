import { Box, Button, Text, calc, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import EventsPage from './components/events-page/EventsPage';

const BrowseEvents = () => {
  return (
    <Box height="100%" width="100%" display="flex" alignItems="center" justifyContent="center">
      <EventsPage />
    </Box>
  );
};

export default BrowseEvents;
