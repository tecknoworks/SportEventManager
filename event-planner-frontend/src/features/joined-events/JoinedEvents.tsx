import { Box, Button, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import EventCard from './components/EventCard';
import { useEffect } from 'react';
import { getJoinedEventsThunk } from './store/thunks/getJoinedEventsThunk';
import { AppDispatch } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import { getUserFromToken } from 'services/auth/context/AuthContext';
import React from 'react';
import { selectJoinedEvents } from './store/selectores/joinedEventsSelector';
import { useNavigate } from 'react-router-dom';

const JoinedEvents: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const events = useSelector(selectJoinedEvents)
  const navigate = useNavigate();

  const token = useSelector(selectToken);
  const user = getUserFromToken(token || '');

  useEffect(() => {
    user?.userId && dispatch(getJoinedEventsThunk(user?.userId));
  }, [user?.userId]);

  return (
    <Flex align="center" justify="center">
      <Box width="90%" p={5} >
        {events.length > 0 ? (
          <Grid templateColumns={{ base: 'repeat(1, 1fr)' }} gap={6}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Grid>
        ) : (
          <Box>
            <Heading color={'white'} p={9}>
              You didn't join an event yet?{' '}
            </Heading>
            <Button fontSize="xl" ml={9} onClick={() => navigate('/browseevents')} >
              Join one now!
            </Button>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default JoinedEvents;
