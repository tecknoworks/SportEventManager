import { Box, BoxProps, Text, Flex, FormControl, FormLabel, Input, Stack, CloseButton, Select, useColorMode } from '@chakra-ui/react';
import LocationSearch from 'common/components/LocationSearch/LocationSearch';
import { LatLng } from 'common/components/Map/models';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { FilterParams } from 'features/browse-events/api/dtos';
import { GetSportTypesDto } from 'features/event/api/dtos';
import { selectEventSportTypes } from 'features/event/store/selectors/eventSelectors';
import { getPositionsForSportTypeThunk } from 'features/event/store/thunks/getPositionsForSportTypeThunk';
import { getSportTypesThunk } from 'features/event/store/thunks/getSportTypesThunk';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  onSendFilter: (value: FilterParams) => void;
  isMyEvents: boolean;
}

const FilterForm = ({ onClose, onSendFilter, isMyEvents, ...rest }: SidebarProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedSport, setSelectedSport] = useState<GetSportTypesDto | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [author, setAuthor] = useState<string>('');
  const [maximumDuration, setMaximumDuration] = useState<number | undefined>(undefined);
  const [coordinates, setCoordinates] = useState<LatLng | undefined>();
  const [locationName, setLocationName] = useState('');
  const sportTypes: GetSportTypesDto[] = useSelector(selectEventSportTypes) || [];

  useEffect(() => {
    dispatch(getSportTypesThunk());
  }, []);

  const handleSendFilter = () => {
    const filterFormData: FilterParams = {
      sportTypeId: selectedSport?.id,
      startDate: startDate,
      maximumDuration: maximumDuration,
      location: locationName,
      authorUserName: author,
    };

    onSendFilter(filterFormData);
  };

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sportId = event.target.value;
    const sport = sportTypes.find((s) => s.id === sportId) || undefined;
    setSelectedSport(sport);
    if (sport !== undefined) {
      dispatch(getPositionsForSportTypeThunk(sportId));
    }
  };

  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'dark.background' : 'light.background';

  return (
    <Box overflow="auto" bg={bgColor} padding="20px" borderRightColor={'gray.200'} {...rest}>
      <Flex h="20" alignItems="center">
        <Text color="gray.500" as="b" fontSize="3xl">
          Filters
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Stack spacing={5}>
        <FormControl>
          <FormLabel>Sport Type</FormLabel>
          <Select placeholder="Select Sport" onChange={handleSportChange}>
            {sportTypes.map((sportType) => (
              <option key={sportType.id} value={sportType.id}>
                {sportType.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="datetime-local"
            value={startDate ? startDate.toISOString().slice(0, -8) : ''}
            onChange={(e) => {
              const inputValue = e.target.value;
              setStartDate(inputValue ? new Date(inputValue) : undefined);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Maximum Duration</FormLabel>
          <Input
            type="number"
            placeholder="Maximum Duration"
            value={maximumDuration || ''}
            onChange={(e) => {
              const inputValue = e.target.value;
              setMaximumDuration(inputValue ? parseFloat(inputValue) : undefined);
            }}
          />
        </FormControl>
        {!isMyEvents && (
          <FormControl>
            <FormLabel>Creator of Events</FormLabel>
            <Input
              type="text"
              placeholder="Creator of Events"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </FormControl>
        )}
        <FormControl>
          <FormLabel>Location</FormLabel>
          <LocationSearch
            onCoordinatesChange={setCoordinates}
            onAddressChange={setLocationName}
            address={locationName}
          />
        </FormControl>
      </Stack>
      <PrimaryButton type="submit" text="Apply Filters" w="100%" onClick={handleSendFilter} />
    </Box>
  );
};

export default FilterForm;
