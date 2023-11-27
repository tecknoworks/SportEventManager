import { Box, Drawer, DrawerContent, IconButton, Stack, Text, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { SearchBar } from 'common/components/searchbar/SearchBar';
import { useEffect, useState } from 'react';
import { SettingsIcon } from '@chakra-ui/icons';
import { FilterParams } from 'features/browse-events/api/dtos';
import { AppDispatch } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { joinEventIsSuccess, selectEvents } from 'features/browse-events/store/selectors/eventsPageSelector';
import { getEventsThunk } from 'features/browse-events/thunks/browseEventsThunks';
import FilterForm from 'features/browse-events/components/filter-sidebar/FilterForm';
import EventsCardList from 'features/browse-events/components/events-page/events-card-list/EventsCardList';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import { getUserFromToken } from 'services/auth/context/AuthContext';
import { selectCloseSuccess } from 'features/event/store/selectors/eventSelectors';

const MyEventsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const pageSize: number = 2;
  let page = 1;
  const browseEvents = useSelector(selectEvents);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width: 767px)');
  const token = useSelector(selectToken);
  const user = getUserFromToken(token || '');
  const [filter, setFilter] = useState<FilterParams>({
    pageSize: pageSize,
    authorId: user?.userId,
  });

  const isCloseSuccess = useSelector(selectCloseSuccess);
  const isJoinSuccess = useSelector(joinEventIsSuccess);

  useEffect(() => {
    if (isCloseSuccess || isJoinSuccess) {
      dispatch(getEventsThunk(filter));
    }
  }, [isCloseSuccess, isJoinSuccess]);

  useEffect(() => {
    dispatch(getEventsThunk(filter));
  }, [filter]);

  const showPagination = pageSize >= browseEvents.totalEvents;
  const handlePageClick = (p: number) => {
    setFilter((prevFilter) => {
      const updatedFilter: FilterParams = {
        ...prevFilter,
        pageNumber: p + 1,
      };
      return updatedFilter;
    });
  };

  const handleSearch = (value: string) => {
    const updatedFilter: FilterParams = {
      ...filter,
      searchData: value,
      pageNumber: 1,
    };
    setFilter(updatedFilter);
  };

  const handleSendFilter = (value: FilterParams) => {
    setFilter((prevFilter) => {
      const updatedFilter: FilterParams = {
        ...prevFilter,
        sportTypeId: value.sportTypeId,
        startDate: value.startDate,
        maximumDuration: value.maximumDuration,
        location: value.location,
        authorUserName: value.authorUserName,
        pageNumber: 1,
      };
      return updatedFilter;
    });
  };

  return (
    <Box display="flex" w="100%" h="100%" overflow="hidden">
      <Box h="100%">
        <FilterForm
          isMyEvents
          onClose={() => onClose}
          onSendFilter={handleSendFilter}
          display={{ base: 'none', md: 'flex' }}
          flexDirection="column"
          justifyContent="space-between"
          h={'100%'}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <FilterForm
              isMyEvents
              onClose={onClose}
              onSendFilter={handleSendFilter}
              display={{ base: 'block', md: 'none' }}
            />
          </DrawerContent>
        </Drawer>
      </Box>
      <Stack spacing="3" width="100%" h="100%" padding="20px" justifyContent="space-between">
        <Text color="white" textAlign="center" fontSize="30px">
          My Events
        </Text>
        <Box display="flex">
          {isMobile && (
            <IconButton
              bg={'white'}
              variant="outline"
              onClick={onOpen}
              aria-label="open menu"
              icon={<SettingsIcon />}
            />
          )}
          <SearchBar onSearch={handleSearch} />
        </Box>
        <EventsCardList
          events={browseEvents.events}
          showPagination={showPagination}
          page={page}
          count={browseEvents.totalEvents}
          pageSize={pageSize}
          onPageChange={handlePageClick}
        />
      </Stack>
    </Box>
  );
};

export default MyEventsPage;
