import { Box, Grid, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { SearchBar } from 'common/components/searchbar/SearchBar';
import React from 'react';
import EventsCardList from './events-card-list/EventsCardList';

const EventsPage = () => {
  return (
    <Stack spacing="3" width="100%" padding="20px" justifyContent="space-between">
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Text color="white" textAlign="center" fontSize="30px">
          Browse Events
        </Text>
        <SearchBar />
      </Box>
      <EventsCardList />
    </Stack>
  );
};

export default EventsPage;
