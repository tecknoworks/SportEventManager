import { Box, Button, Text, calc, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import FilterSidebar from './components/filter-sidebar/FilterSideBar';
import EventsPage from './components/events-page/EventsPage';

const BrowseEvents = () => {
  return (
    <Box width="100vw" height="inherit" display="flex" flexDirection="row" zIndex="1">
      <FilterSidebar />
      <Box width="full" display="flex" justifyContent="center">
        <EventsPage />
      </Box>
    </Box>
  );
};

export default BrowseEvents;
