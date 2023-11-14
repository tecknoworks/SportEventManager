import { Box } from '@chakra-ui/react';
import EventsPage from './components/events-page/EventsPage';

const BrowseEvents = () => {
  return (
    <Box display="flex" h="100%">
      <EventsPage />
    </Box>
  );
};

export default BrowseEvents;
