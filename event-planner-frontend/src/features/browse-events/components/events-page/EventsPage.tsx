import { Box, Drawer, DrawerContent, IconButton, Stack, Text, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { SearchBar } from 'common/components/searchbar/SearchBar';
import { useEffect, useState } from 'react';
import EventsCardList from './events-card-list/EventsCardList';
import FilterForm from '../filter-sidebar/FilterForm';
import { SettingsIcon } from '@chakra-ui/icons';
import { FilterParams } from 'features/browse-events/api/dtos';
import { AppDispatch } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvents } from 'features/browse-events/store/eventsPageSelector';
import { getEventsThunk } from 'features/browse-events/thunks/browseEventsThunks';

const EventsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const pageSize: number = 2;
  let page = 1;
  const browseEvents = useSelector(selectEvents);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width: 767px)');
  const [filter, setFilter] = useState<FilterParams>({
    pageSize: pageSize,
  });

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
    <>
      <Box display="flex" flexDirection="row">
        <FilterForm onClose={() => onClose} onSendFilter={handleSendFilter} display={{ base: 'none', md: 'block' }} />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <FilterForm onClose={onClose} onSendFilter={handleSendFilter} display={{ base: 'block', md: 'none' }} />
          </DrawerContent>
        </Drawer>
      </Box>
      <Stack spacing="3" width="100%" padding="20px" justifyContent="space-between">
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Text color="white" textAlign="center" fontSize="30px">
            Browse Events
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
    </>
  );
};

export default EventsPage;
