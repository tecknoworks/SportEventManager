import { Box, SimpleGrid, Stack, Wrap, WrapItem, useMediaQuery } from '@chakra-ui/react';
import EventCard from 'common/components/card/EventCard';
import { Paginate } from 'react-paginate-chakra-ui';
import React from 'react';

const EventsCardList = () => {
  const [page, setPage] = React.useState(0);
  const handlePageClick = (p: number) => setPage(p);
  const totalElements: number = 298;
  const pageSize: number = 6;
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');
  const numberOfColumns = 1;

  const eventCards = Array.from({ length: totalElements }, (_, index) => (
    <WrapItem>
      <EventCard key={index} id={index + 1} />
    </WrapItem>
  ));

  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleEventCards = eventCards.slice(startIndex, endIndex);

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      overflowY="hidden"
      justifyContent="space-between"
    >
      <Wrap justify="center" overflowY="auto">
        {visibleEventCards}
      </Wrap>

      <Paginate
        bg="whiteAlpha.800"
        page={page}
        count={totalElements}
        pageSize={pageSize}
        onPageChange={handlePageClick}
        margin={2}
        shadow="lg"
        fontWeight="blue"
        variant="outline"
        border="2px solid"
      />
    </Box>
  );
};

export default EventsCardList;
