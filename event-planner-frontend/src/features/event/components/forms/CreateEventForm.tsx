import { FormControl, Box, FormLabel, Heading, useColorMode } from '@chakra-ui/react';
import LocationSearch from 'common/components/LocationSearch/LocationSearch';
import { LatLng } from 'common/components/Map/models';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { CreateEventDto, GetPositionForSportTypeDto, GetSportTypesDto } from 'features/event/api/dtos';
import { selectEventPositions, selectEventSportTypes } from 'features/event/store/selectors/eventSelectors';
import { createEventThunk } from 'features/event/store/thunks/createEventThunk';
import { getPositionsForSportTypeThunk } from 'features/event/store/thunks/getPositionsForSportTypeThunk';
import { getSportTypesThunk } from 'features/event/store/thunks/getSportTypesThunk';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { getUserFromToken } from 'services/auth/context/AuthContext';
import { handleGenericError } from 'services/notificationHandlingService';
import { usePositionManager } from 'features/event/hooks/PositionManagerHook';
import EventNameField from '../fields/EventNameField';
import EventDescriptionField from '../fields/EventDescriptionField';
import SportTypeField from '../fields/SportTypeField';
import PositionSelection from '../fields/PositionSelection';
import SkillLevelField from '../fields/SkillLevelField';
import MaxParticipantsField from '../fields/MaxParticipantsField';
import DateTimeField from '../fields/DateTimeField';
import { useNavigate } from 'react-router-dom';

function CreateEventForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = React.useState<GetSportTypesDto | undefined>(undefined);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [maximumParticipants, setMaximumParticipants] = useState(0);
  const [skillLevel, setSkillLevel] = useState(0);
  const [startDate, setStartDate] = useState(Date());
  const [endDate, setEndDate] = useState(Date());
  const [coordinates, setCoordinates] = useState<LatLng | undefined>();
  const [locationName, setLocationName] = useState('');

  const sportTypes: GetSportTypesDto[] = useSelector(selectEventSportTypes) || [];
  const positionsForSportType: GetPositionForSportTypeDto[] = useSelector(selectEventPositions) || [];
  const {
    selectedPositions,
    setSelectedPositions,
    handlePositionChange,
    handleAvailablePositionsChange,
    handleDeletePosition,
  } = usePositionManager(positionsForSportType);

  const token = useSelector(selectToken);
  const user = getUserFromToken(token || '');

  useEffect(() => {
    dispatch(getSportTypesThunk());
  }, []);

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sportId = event.target.value;
    const sport = sportTypes.find((s) => s.id === sportId) || undefined;
    setSelectedSport(sport);
    setSelectedPositions([]);
    dispatch(getPositionsForSportTypeThunk(sportId));
  };

  const validateCreateForm = () => {
    if (!eventName.trim()) return 'Event name is required.';
    if (!eventDescription.trim()) return 'Event description is required.';
    if (!selectedSport) return 'Sport type must be selected.';
    if (!startDate) return 'Start date is required.';
    if (!endDate) return 'End date is required.';
    if (new Date(startDate) >= new Date(endDate)) return 'End date must be later than start date.';
    if (coordinates === undefined) return 'Location must be set.';
    return '';
  };

  const handleCreateEvent = () => {
    const errorMessage = validateCreateForm();
    if (errorMessage) {
      handleGenericError(errorMessage);
      return;
    }

    const eventPositions = selectedPositions.map((position) => ({
      positionId: position.positionId,
      availablePositions: position.availablePositions,
    }));

    const offsetStartDate = new Date(new Date(startDate).getTime() - new Date(startDate).getTimezoneOffset() * 60000);
    const offsetEndDate = new Date(new Date(endDate).getTime() - new Date(endDate).getTimezoneOffset() * 60000);

    const createEventDto: CreateEventDto = {
      name: eventName,
      description: eventDescription,
      sportTypeId: selectedSport?.id || '',
      location: coordinates?.lat + ',' + coordinates?.lng,
      locationName: locationName,
      startDate: offsetStartDate,
      endDate: offsetEndDate,
      maximumParticipants: maximumParticipants,
      isClosed: false,
      skillLevel: skillLevel,
      authorUserId: user?.userId || '',
      eventPositions: eventPositions,
    };

    dispatch(createEventThunk(createEventDto)).then((response) => {
      if (response) {
        navigate(`/event-details/${response.payload}`);
      }
    });
  };

  const { colorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [colorMode]);

  return (
    <Box
      className="form-wrapper"
      gap="1rem"
      display="flex"
      flexDirection="column"
      width="500px"
      borderWidth="1px"
      borderRadius="lg"
      overflowY="auto"
    >
      <Heading>Create your event</Heading>
      <EventNameField eventName={eventName} onChange={(e: any) => setEventName(e.target.value)} />
      <EventDescriptionField
        eventDescription={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
      />
      <SportTypeField sportTypes={sportTypes} handleSportChange={handleSportChange} />

      {selectedSport && selectedSport.hasPositions && (
        <PositionSelection
          positionsForSportType={positionsForSportType}
          handlePositionChange={handlePositionChange}
          selectedPositions={selectedPositions}
          handleAvailablePositionsChange={handleAvailablePositionsChange}
          handleDeletePosition={handleDeletePosition}
        />
      )}

      {selectedSport && !selectedSport.hasPositions && (
        <MaxParticipantsField
          maximumParticipants={maximumParticipants}
          onChange={(e) => setMaximumParticipants(parseInt(e.target.value, 10))}
        />
      )}

      <SkillLevelField skillLevel={skillLevel} onChange={(e) => setSkillLevel(Number(e.target.value))} />
      <DateTimeField label="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <DateTimeField label="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

      <FormControl isRequired>
        <FormLabel>Location</FormLabel>
        <LocationSearch onCoordinatesChange={setCoordinates} onAddressChange={setLocationName} address={locationName} />
      </FormControl>

      <PrimaryButton text="Create event" onClick={() => handleCreateEvent()} />
    </Box>
  );
}

export default CreateEventForm;
