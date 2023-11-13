import { Box } from '@chakra-ui/react';
import MyEventsPage from './components/MyEventsPage';

const MyEvents = () => {
  return (
    <Box display="flex" justifyContent="center">
      <MyEventsPage />
    </Box>
  );
};

export default MyEvents;
