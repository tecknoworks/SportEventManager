import { FormControl, Box, FormLabel, Heading, Select, Input, Button, Textarea } from '@chakra-ui/react';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { GetPositionForSportTypeDto, GetSportTypesDto } from 'features/event/api/dtos';
import React from 'react';

function EventForm() {
  const [selectedSport, setSelectedSport] = React.useState<GetSportTypesDto | undefined>(undefined);
  const [selectedPositions, setSelectedPositions] = React.useState<EventPostion[]>([]);

  type EventPostion = {
    position: GetPositionForSportTypeDto;
    availablePositions: number;
  };

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

  const handleSportChange = (event: any) => {
    const sportId = event.target.value;
    const sport = sportTypes.find((s) => s.id === sportId) || undefined;
    setSelectedSport(sport);
    setSelectedPositions([]);
  };

  const sportTypes: GetSportTypesDto[] = [
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
      width="500px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
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
          <option>Begginer</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </Select>
      </FormControl>
      {selectedSport && !selectedSport.hasPositions && (
        <FormControl isRequired>
          <FormLabel>Maximum number of articipants</FormLabel>
          <Input type="number" placeholder="Insert the maximum number of participants" />
        </FormControl>
      )}
      <FormControl isRequired>
        <FormLabel>Location</FormLabel>
        <Input type="location" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Start Date</FormLabel>
        <Input type="date" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>End Date</FormLabel>
        <Input type="date" />
      </FormControl>
      <PrimaryButton text="Create event" />
    </Box>
  );
}

export default EventForm;
