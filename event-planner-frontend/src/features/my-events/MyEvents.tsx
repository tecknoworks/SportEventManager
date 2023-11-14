import { Box } from '@chakra-ui/react';
import MyEventsPage from './components/MyEventsPage';

const MyEvents = () => {
  return (
    <Box display="flex" h="100%">
      <MyEventsPage />
    </Box>
  );
};

export default MyEvents;
