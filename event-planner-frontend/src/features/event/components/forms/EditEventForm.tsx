import { Heading, FormControl, FormLabel, Box, useColorMode } from '@chakra-ui/react';
import LocationSearch from 'common/components/LocationSearch/LocationSearch';
import { LatLng } from 'common/components/Map/models';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { GetPositionForSportTypeDto, UpdateEventDto, UpsertEventPositionDto } from 'features/event/api/dtos';
import { EventPosition } from 'features/event/api/models';
import { selectCurrentEvent, selectEventPositions } from 'features/event/store/selectors/eventSelectors';
import { getEventThunk } from 'features/event/store/thunks/getEventThunk';
import { getPositionsForSportTypeThunk } from 'features/event/store/thunks/getPositionsForSportTypeThunk';
import { updateEventThunk } from 'features/event/store/thunks/updateEventThunk';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { handleGenericError } from 'services/notificationHandlingService';
import { usePositionManager } from 'features/event/hooks/PositionManagerHook';
import EventNameField from '../fields/EventNameField';
import EventDescriptionField from '../fields/EventDescriptionField';
import PositionSelection from '../fields/PositionSelection';
import SkillLevelField from '../fields/SkillLevelField';
import MaxParticipantsField from '../fields/MaxParticipantsField';
import DateTimeField from '../fields/DateTimeField';
import { useNavigate } from 'react-router-dom';

type Props = {
  eventId: string;
};

function EditEventForm({ eventId }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const event = useSelector(selectCurrentEvent);
  const [currentEvent, setCurrentEvent] = useState<UpdateEventDto>();
  const [coordinates, setCoordinates] = useState<LatLng | undefined>();
  const [locationName, setLocationName] = useState('');
  const positionsForSportType: GetPositionForSportTypeDto[] = useSelector(selectEventPositions) || [];
  const {
    selectedPositions,
    setSelectedPositions,
    handlePositionChange,
    handleAvailablePositionsChange,
    handleDeletePosition,
  } = usePositionManager(positionsForSportType);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEventThunk(eventId));
  }, []);

  
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [colorMode]);

  useEffect(() => {
    if (event) {
      const updatedEvent: UpdateEventDto = {
        name: event.name,
        description: event.description,
        location: event.location,
        startDate: event.startDate,
        endDate: event.endDate,
        maximumParticipants: event.maximumParticipants,
        skillLevel: event.skillLevel,
        isClosed: false,
        eventPositions: event.eventPositions,
      };

      const mappedEventPositions = event.eventPositions?.map(
        (position) =>
          ({
            positionId: position.positionId,
            positionName: position.positionName,
            availablePositions: position.availablePositions,
          }) as EventPosition
      );

      setLocationName(event.locationName);
      setSelectedPositions(mappedEventPositions || []);
      setCurrentEvent(updatedEvent);
      dispatch(getPositionsForSportTypeThunk(event.sportTypeId));
    }
  }, [event]);

  const validateForm = () => {
    if (!currentEvent?.name.trim()) return 'Event name is required.';
    if (!currentEvent.description?.trim()) return 'Event description is required.';
    if (currentEvent.skillLevel === undefined) return 'Skill level must be selected.';
    if (!currentEvent.startDate) return 'Start date is required.';
    if (!currentEvent.endDate) return 'End date is required.';
    if (new Date(currentEvent.startDate) >= new Date(currentEvent.endDate))
      return 'End date must be later than start date.';
    if (currentEvent.location === undefined) return 'Location must be set.';
    return '';
  };

  const handleUpdateEvent = () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      handleGenericError(errorMessage);
      return;
    }
    if (currentEvent) {
      const mappedEventPositions = selectedPositions.map(
        (position) =>
          ({
            positionId: position.positionId,
            availablePositions: position.availablePositions,
          }) as UpsertEventPositionDto
      );
      currentEvent.eventPositions = mappedEventPositions;
      currentEvent.location = coordinates?.lat + ',' + coordinates?.lng;
      currentEvent.locationName = locationName;
      dispatch(updateEventThunk({ eventId, data: currentEvent })).then((response) => {
        if (response) {
          navigate(`/event-details/${eventId}`);
        }
      });
    }
  };

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
      <Heading>Edit your event</Heading>
      <EventNameField
        eventName={currentEvent?.name || ''}
        onChange={(e) => setCurrentEvent({ ...currentEvent, name: e.target.value })}
      />
      <EventDescriptionField
        eventDescription={currentEvent?.description || ''}
        onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value } as UpdateEventDto)}
      />
      {event?.hasPositions && (
        <PositionSelection
          positionsForSportType={positionsForSportType}
          selectedPositions={selectedPositions}
          handlePositionChange={handlePositionChange}
          handleAvailablePositionsChange={handleAvailablePositionsChange}
          handleDeletePosition={handleDeletePosition}
        />
      )}
      <SkillLevelField
        skillLevel={currentEvent?.skillLevel || 0}
        onChange={(e) => setCurrentEvent({ ...currentEvent, skillLevel: Number(e.target.value) } as UpdateEventDto)}
      />

      {!event?.hasPositions && (
        <MaxParticipantsField
          maximumParticipants={currentEvent?.maximumParticipants || 0}
          onChange={(e) => {
            const value = parseInt(e.target.value, 0);
            setCurrentEvent({ ...currentEvent, maximumParticipants: value } as UpdateEventDto);
          }}
        />
      )}
      <DateTimeField
        label="Start Date"
        value={
          currentEvent?.startDate instanceof Date
            ? currentEvent.startDate.toISOString().slice(0, 16)
            : currentEvent?.startDate || ''
        }
        onChange={(e) =>
          setCurrentEvent({ ...currentEvent, startDate: e.target.value as unknown as Date } as UpdateEventDto)
        }
      />

      <DateTimeField
        label="End Date"
        value={
          currentEvent?.endDate instanceof Date
            ? currentEvent.endDate.toISOString().slice(0, 16)
            : currentEvent?.endDate || ''
        }
        onChange={(e) =>
          setCurrentEvent({ ...currentEvent, endDate: e.target.value as unknown as Date } as UpdateEventDto)
        }
      />
      <FormControl isRequired>
        <FormLabel>Location</FormLabel>
        <LocationSearch onCoordinatesChange={setCoordinates} onAddressChange={setLocationName} address={locationName} />
      </FormControl>
      <PrimaryButton text="Edit event" onClick={() => handleUpdateEvent()} />
    </Box>
  );
}

export default EditEventForm;
