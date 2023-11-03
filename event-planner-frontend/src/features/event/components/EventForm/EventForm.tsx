import { FormControl, Box, FormLabel, Heading, Select, Input, Button, Textarea } from '@chakra-ui/react';
import LocationSearch from 'common/components/LocationSearch/LocationSearch';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { GetPositionForSportTypeDto, GetSportTypesDto } from 'features/event/api/dtos';
import { SkillLevel } from 'features/event/api/models';
import React, { useEffect, useState } from 'react';

type LatLng = {
  lat: number;
  lng: number;
};

function EventForm() {
  const [selectedSport, setSelectedSport] = React.useState<GetSportTypesDto | undefined>(undefined);
  const [selectedPositions, setSelectedPositions] = React.useState<EventPostion[]>([]);
  const [coordinates, setCoordinates] = useState<LatLng>({ lat: -34.397, lng: 150.644 });
  type EventPostion = {
    position: GetPositionForSportTypeDto;
    availablePositions: number;
  };

  useEffect(() => {
    console.log(coordinates);
  }, [coordinates]);

  const handlePositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const positionId = event.target.value;
    const positionObj = positionsForSportType.find((p) => p.id === positionId);

    if (positionObj) {
      setSelectedPositions((prev) => {
        const isPositionAlreadySelected = prev.some((p) => p.position.id === positionObj.id);
        if (isPositionAlreadySelected) {
          return prev;
        }
        const newPostion: EventPostion = {
          position: positionObj,
          availablePositions: 0,
        };

        return [...prev, newPostion];
      });
    }
  };

  const handleAvailablePositionsChange = (positionId: string, value: string) => {
    setSelectedPositions((prev) =>
      prev.map((pos) => (pos.position.id === positionId ? { ...pos, availablePositions: parseInt(value) } : pos))
    );
  };

  const handleDeletePosition = (positionId: string) => {
    setSelectedPositions((prev) => prev.filter((p) => p.position.id !== positionId));
  };

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sportId = event.target.value;
    const sport = sportTypes.find((s) => s.id === sportId) || undefined;
    setSelectedSport(sport);
    setSelectedPositions([]);
  };

  //TODO: validation of the fields, disable button before everything is valid
  const handleCreateEvent = () => {
    //TODO: dispatch the create event thunk
  };

  const sportTypes: GetSportTypesDto[] = [
    //TODO: fetch available sport types from backend
    {
      id: 'F6FE54D3-A451-4DE6-9FE9-AFC051A963B6',
      name: 'Football',
      hasPositions: true,
    },
    {
      id: '12354D3-A451-4DE6-ABCD-AFC051A963B6',
      name: 'Hiking',
      hasPositions: false,
    },
  ];

  const positionsForSportType: GetPositionForSportTypeDto[] = [
    //TODO: fetch positions for selected sport types from backend
    {
      id: '6A737AD1-7FE2-40BD-888A-0604186743B6',
      name: 'Quarterback',
      sportTypeId: 'F6FE54D3-A451-4DE6-9FE9-AFC051A963B6',
    },
    {
      id: '12737AD1-7FE2-40BD-888A-0604186743B6',
      name: 'Midfielder',
      sportTypeId: 'F6FE54D3-A451-4DE6-9FE9-AFC051A963B6',
    },
    {
      id: '13737AD1-7FE2-40BD-888A-0604186743B6',
      name: 'Goalkeeper',
      sportTypeId: 'F6FE54D3-A451-4DE6-9FE9-AFC051A963B6',
    },
  ];

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
      <FormControl isRequired>
        <FormLabel>Event Name</FormLabel>
        <Input type="text" placeholder="Give a meaningful name to your event." />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Event Description</FormLabel>
        <Textarea placeholder="Write a meaningful description for your event." rows={3} />
      </FormControl>
      <FormControl id="sportType" isRequired>
        <FormLabel>Sport Type</FormLabel>
        <Select placeholder="Select Sport" onChange={handleSportChange}>
          {sportTypes.map((sportType) => (
            <option value={sportType.id}>{sportType.name}</option>
          ))}
        </Select>
      </FormControl>

      {selectedSport && selectedSport.hasPositions && (
        <Box w="full">
          <FormLabel>Select Positions</FormLabel>
          <Select placeholder="Select Position" onChange={handlePositionChange}>
            {positionsForSportType.map((position) => (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            ))}
          </Select>
          {selectedPositions.map((position) => (
            <Box
              key={position.position.id}
              display="flex"
              justifyContent="center"
              alignItems="end"
              gap="1rem"
              paddingTop="0.5rem"
            >
              <FormControl id={`${position.position.id}`} isRequired>
                <FormLabel>{position.position.name}</FormLabel>
                <Input
                  min={0}
                  type="number"
                  value={position.availablePositions}
                  onChange={(event) => handleAvailablePositionsChange(position.position.id, event.target.value)}
                />
              </FormControl>
              <Button colorScheme="red" onClick={() => handleDeletePosition(position.position.id)}>
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      )}
      <FormControl isRequired>
        <FormLabel>Skill Level</FormLabel>
        <Select placeholder="Select skill level">
          <option value={SkillLevel.Beginner}>Beginner</option>
          <option value={SkillLevel.Intermediate}>Intermediate</option>
          <option value={SkillLevel.Advanced}>Advanced</option>
        </Select>
      </FormControl>
      {selectedSport && !selectedSport.hasPositions && (
        <FormControl isRequired>
          <FormLabel>Maximum number of articipants</FormLabel>
          <Input type="number" placeholder="Insert the maximum number of participants" />
        </FormControl>
      )}
      <FormControl isRequired>
        <FormLabel>Start Date</FormLabel>
        <Input type="datetime-local" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>End Date</FormLabel>
        <Input type="datetime-local" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Location</FormLabel>
        <LocationSearch onCoordinatesChange={setCoordinates} />
      </FormControl>
      <PrimaryButton text="Create event" onClick={() => handleCreateEvent()} />
    </Box>
  );
}

export default EventForm;
