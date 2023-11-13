import { Box, Stack } from '@chakra-ui/react';
import EventCard from 'common/components/card/EventCard';
import { EventDto } from 'features/browse-events/api/dtos';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import { useEffect } from 'react';
import { Paginate } from 'react-paginate-chakra-ui';
import { useSelector } from 'react-redux';
import { getUserFromToken } from 'services/auth/context/AuthContext';

interface Props {
  events: EventDto[];
  showPagination: boolean;
  page: number;
  count: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
}

const EventsCardList = ({ events, showPagination, page, count, pageSize, onPageChange }: Props) => {
  const token = useSelector(selectToken);
  const user = getUserFromToken(token || '');
  const eventCards = Array.from(events, (event) => <EventCard event={event} currentUser={user} />);

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      overflowY="hidden"
      justifyContent="space-between"
    >
      <Stack w="100%" h="100%" padding="10px" overflowY="auto">
        {eventCards}
      </Stack>
      {!showPagination && (
        <Paginate
          bg="whiteAlpha.800"
          page={page}
          count={count}
          pageSize={pageSize}
          onPageChange={onPageChange}
          margin={2}
          shadow="lg"
          fontWeight="blue"
          variant="outline"
          border="2px solid"
        />
      )}
    </Box>
  );
};

export default EventsCardList;